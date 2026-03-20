'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

export default function CTA() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Massive Card Reveal (Slides up and fades in)
      gsap.fromTo(cardRef.current,
        { y: 80, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out"
        }
      );

      // 2. Inner Text and Button Reveal
      gsap.fromTo(textRef.current.children,
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          delay: 0.3,
          ease: "power3.out"
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Outer container keeps the light theme flow
    <section ref={containerRef} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* THE MONOLITH CARD */}
        <div 
          ref={cardRef} 
          className="relative bg-dark w-full overflow-hidden flex flex-col lg:flex-row items-center justify-between p-10 sm:p-16 md:p-24 opacity-0 border-l-8 border-accent shadow-2xl"
        >
          
          {/* ARCHITECTURAL BACKGROUND ELEMENTS */}
          {/* 1. Subtle Blueprint Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] z-0 pointer-events-none" style={{ backgroundSize: '40px 40px' }} />
          
          {/* 2. Geometric Accent Square (Top Right) */}
          <div className="absolute -top-32 -right-32 w-64 h-64 border-40 border-white/5 z-0 pointer-events-none" />
          
          {/* 3. Construction Crosshairs */}
          <div className="absolute top-10 right-10 w-8 h-8 flex items-center justify-center opacity-20 z-0 pointer-events-none">
            <div className="w-full h-px bg-white absolute" />
            <div className="h-full w-px bg-white absolute" />
          </div>

          {/* LEFT: MASSIVE TYPOGRAPHY */}
          <div ref={textRef} className="relative z-10 max-w-2xl lg:w-3/5 mb-16 lg:mb-0">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-0.5 bg-accent"></span>
              <span className="text-white/60 font-bold uppercase tracking-[0.2em] text-xs">
                Start Your Journey
              </span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-[5.5rem] font-black font-syne uppercase tracking-tighter text-white mb-6 leading-[0.95]">
              Ready to <br />
              Build Your <br />
              <span className="text-accent inline-block mt-2">Legacy?</span>
            </h2>
            
            <p className="text-white/70 text-lg md:text-xl font-medium leading-relaxed max-w-lg mb-8">
              Let&apos;s discuss your project requirements. Our engineering and design teams are ready to turn your architectural dreams into concrete reality.
            </p>

            {/* Micro-trust indicators */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-white/50 text-sm font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-accent" size={16} /> Free Consultation
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-accent" size={16} /> Expert Blueprinting
              </div>
            </div>
          </div>

          {/* RIGHT: BRUTALIST CTA BUTTON & CONTACT INFO */}
          <div className="relative z-10 lg:w-2/5 flex flex-col items-start lg:items-end w-full">
            <Link 
              href="/contact" 
              className="group relative flex items-center justify-center gap-4 bg-accent text-dark px-10 py-6 uppercase font-black tracking-wider text-sm w-full sm:w-auto overflow-hidden transition-all duration-300 shadow-[8px_8px_0px_rgba(255,255,255,0.1)] hover:shadow-[0px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-2 hover:translate-y-2"
            >
              {/* Button Background Slide Effect */}
              <div className="absolute inset-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full z-0" />
              
              <span className="relative z-10 group-hover:text-dark transition-colors duration-300">
                Request A Quote
              </span>
              <FiArrowRight size={22} className="relative z-10 transform group-hover:translate-x-2 transition-transform duration-300 group-hover:text-dark" />
            </Link>

            {/* Sub-text for button */}
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-6 text-center lg:text-right w-full sm:w-auto">
              Or call us directly at <br className="hidden lg:block" />
              <span className="text-white mt-1 inline-block">+91 98765 43210</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}