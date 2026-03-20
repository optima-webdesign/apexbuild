'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
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
  
  // Array of refs for cards
  const cardsRef = useRef([]);
  // No need to clear array during render anymore! We use index assignment.

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Top Header Animation (Using fromTo for safety)
      gsap.fromTo(headerRef.current.children, 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%", // Thoda jaldi trigger karega
            toggleActions: "play none none reverse" // Ensure it reverses if scrolled up
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out"
        }
      );

      // 2. Cards Animation (Using fromTo for safety)
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-white border-t border-dark/5">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* ROW 1: TOP HEADER (Centered) */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-8 h-0.5 bg-accent"></span>
            <span className="text-dark font-bold uppercase tracking-[0.2em] text-xs">
              The Apex Advantage
            </span>
            <span className="w-8 h-0.5 bg-accent"></span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-syne uppercase tracking-tight text-dark leading-[1.05] mb-6">
            Why Partner <span className="text-accent">With Us.</span>
          </h2>
          
          <p className="text-dark/70 text-lg leading-relaxed font-medium">
            We don&apos;t just build structures; we build relationships grounded in absolute trust, unwavering transparency, and superior engineering.
          </p>
        </div>

        {/* ROW 2: BOTTOM CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div 
                key={index} 
                ref={(el) => { cardsRef.current[index] = el; }} // 🟢 INDEX ASSIGNMENT FIX
                className="group bg-light p-8 md:p-10 border border-dark/5 hover:border-accent hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col items-center text-center opacity-0" 
              >
                <div className="w-16 h-16 bg-white border border-dark/10 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:border-accent transition-colors duration-300">
                  <Icon size={28} strokeWidth={1.5} className="text-dark" />
                </div>
                
                <h3 className="text-xl font-bold font-syne uppercase tracking-wide text-dark mb-4">
                  {reason.title}
                </h3>
                
                <p className="text-dark/70 text-sm leading-relaxed mb-6">
                  {reason.desc}
                </p>

                <div className="w-8 h-0.5 bg-dark/20 mt-auto group-hover:bg-dark transition-colors duration-300"></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}