'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

export default function CTA() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Soft Card Slide up and fade in
      gsap.fromTo(cardRef.current,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out"
        }
      );

      // 2. Inner Text and Button Reveal
      gsap.fromTo(textRef.current.children,
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.2,
          ease: "power2.out"
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* THE SOFT ROUNDED CTA CARD */}
        <div 
          ref={cardRef} 
          className="relative bg-[#FFF8F5] w-full overflow-hidden rounded-[2.5rem] md:rounded-[3rem] p-12 sm:p-16 md:p-24 shadow-sm border border-orange-50/50 flex flex-col items-center justify-center text-center opacity-0"
        >
          
          {/* Subtle Decorative Elements (Optional light circles) */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-white/40 rounded-full blur-3xl z-0 pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl z-0 pointer-events-none" />

          {/* MAIN CONTENT AREA */}
          <div ref={textRef} className="relative z-10 max-w-3xl w-full flex flex-col items-center">
            
            {/* Top Label */}
            <p className="text-gray-500 font-medium text-sm md:text-base mb-4">
              Start Your Journey
            </p>
            
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
              Ready to Build Your <br className="hidden md:block" />
              Dream Project?
            </h2>
            
            {/* Description */}
            {/* FIXED: Escaped the single quote here */}
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
              Let&apos;s discuss your project requirements. Our engineering and design teams are ready to turn your architectural dreams into reality.
            </p>

            {/* Micro-trust indicators */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-gray-700 text-sm font-semibold mb-12">
              <div className="flex items-center justify-center gap-2">
                <FiCheckCircle className="text-[#FF5E14]" size={18} /> Free Consultation
              </div>
              <div className="flex items-center justify-center gap-2">
                <FiCheckCircle className="text-[#FF5E14]" size={18} /> Expert Blueprinting
              </div>
            </div>

            {/* CTA BUTTONS & CONTACT INFO */}
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto justify-center">
              
              <Link 
                href="/contact" 
                style={{ backgroundColor: '#FF5E14', color: '#FFFFFF' }}
                className="group flex items-center justify-center gap-3 px-10 py-4 rounded-full font-semibold tracking-wide text-sm md:text-base w-full sm:w-auto transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                Request A Quote
                <FiArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              {/* Quick Call Link */}
              <div className="text-center sm:text-left">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">
                  Or call us directly
                </p>
                <a 
                  href="tel:+919876543210" 
                  className="text-gray-900 font-bold text-lg hover:text-[#FF5E14] transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}