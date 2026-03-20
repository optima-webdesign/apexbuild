'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FiAward, FiShield, FiClock, FiTrendingUp } from 'react-icons/fi';

const reasons = [
  {
    icon: FiAward,
    title: "Premium Quality",
    desc: "Uncompromising standards and premium materials ensuring lifelong structural integrity."
  },
  {
    icon: FiShield,
    title: "Master Craftsmen",
    desc: "Industry-leading architects, engineers, and builders dedicated to your vision."
  },
  {
    icon: FiClock,
    title: "On-Time Delivery",
    desc: "Strict adherence to timelines and schedules without ever sacrificing safety or precision."
  },
  {
    icon: FiTrendingUp,
    title: "Optimized Value",
    desc: "Transparent costing and intelligent resource management to maximize your budget."
  }
];

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      // 1. Header Animation
      gsap.fromTo(headerRef.current.children, 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%", 
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out"
        }
      );

      // 2. Cards Animation (Staggered fade up)
      cardsRef.current.forEach((card, index) => {
        if (!card) return; // Safety check
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.15 // Har card thoda delay ke baad aayega
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* ROW 1: TOP HEADER (Clean & Centered) */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gray-500 font-medium text-sm md:text-base mb-3">
            The Apex Advantage
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
            Why Partner With Us
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
            {/* FIXED: Escaped the single quote here */}
            We don&apos;t just build structures; we build relationships grounded in absolute trust, unwavering transparency, and superior engineering.
          </p>
        </div>

        {/* ROW 2: BOTTOM CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div 
                key={index} 
                ref={(el) => { cardsRef.current[index] = el; }} // FIXED: Safe ref assignment instead of .push()
                className="group bg-[#FFF8F5] p-8 md:p-10 rounded-3xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center" 
              >
                {/* Circular White Icon Container with Orange Icon */}
                <div className="w-16 h-16 bg-white rounded-full shadow-sm border border-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={26} className="text-[#FF5E14]" />
                </div>
                
                {/* Card Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {reason.title}
                </h3>
                
                {/* Card Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}