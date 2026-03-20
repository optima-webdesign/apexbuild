'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { services } from '@/data/services';
import { FiArrowRight } from 'react-icons/fi';

export default function ServicesPage() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Reveal (Soft slide up)
      gsap.from(headerRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.1
      });

      // 2. 3-Column Grid Cards Reveal
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.2
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-32 pb-24 overflow-hidden">
      
      {/* 1. CLEAN MODERN HEADER */}
      <div className="container mx-auto px-6 md:px-12 mb-20 text-center max-w-4xl">
        <div ref={headerRef}>
          <p className="text-[#FF5E14] font-bold uppercase tracking-[0.2em] text-sm mb-4">
            Our Capabilities
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
            Build Without <br className="hidden md:block" /> Limits.
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            From visionary architectural designs to robust industrial builds, we provide end-to-end construction solutions engineered for modern excellence. We turn blueprints into breathtaking realities.
          </p>
        </div>
      </div>

      {/* 2. THE SOFT PREMIUM 3-COLUMN GRID */}
      <div className="container mx-auto px-6 md:px-12 mb-32">
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => {
            return (
              <div 
                key={service.id || index} 
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group flex flex-col bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-orange-50 transition-all duration-500 overflow-hidden h-full"
              >
                <Link href={`/services/${service.slug || '#'}`} className="flex flex-col h-full">
                  
                  {/* TOP HALF: Expanded Rounded Image Box */}
                  <div className="relative h-70 w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* BOTTOM HALF: Spacious Text Content */}
                  <div className="p-8 md:p-10 flex flex-col grow bg-white">
                    
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-4 group-hover:text-[#FF5E14] transition-colors duration-300">
                      {service.title}
                    </h2>

                    <p className="text-gray-500 text-sm leading-relaxed mb-10 grow">
                      {service.description}
                    </p>

                    {/* Elegant Text Link */}
                    <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-gray-900 font-bold text-sm tracking-wide group-hover:text-[#FF5E14] transition-colors duration-300">
                        Explore Service
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#FFF8F5] flex items-center justify-center text-[#FF5E14] group-hover:bg-[#FF5E14] group-hover:text-white transition-colors duration-300">
                        <FiArrowRight size={16} className="transform group-hover:translate-x-0.5 transition-transform duration-300" />
                      </div>
                    </div>

                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. SOFT CTA BANNER */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="bg-[#FFF8F5] p-12 md:p-20 rounded-[3rem] relative overflow-hidden flex flex-col items-center text-center shadow-sm border border-orange-50">
          
          {/* Subtle blurred decor */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-white/60 rounded-full blur-3xl z-0 pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-orange-100/40 rounded-full blur-3xl z-0 pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
              Ready to break <br className="hidden md:block" /> ground?
            </h2>
            <p className="text-gray-500 text-lg md:text-xl mb-10 font-medium">
              Every legacy project begins with a conversation. Let our engineering team craft a tailored approach for your structural vision.
            </p>
            <Link 
              href="/contact" 
              style={{ backgroundColor: '#FF5E14', color: '#FFFFFF' }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold tracking-wide text-sm md:text-base hover:opacity-90 transition-opacity duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 group"
            >
              Start The Conversation 
              <FiArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" size={18} />
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}