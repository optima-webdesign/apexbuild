'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap'; 
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { services } from '@/data/services'; // Ensure this has at least 3 items
import { FiArrowRight } from 'react-icons/fi';

export default function Services() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 3-column ke hisaab se stagger aur slide up animation
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%", 
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          // 3 items in a row, so delay based on modulo 3
          delay: (index % 3) * 0.15 
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* CENTERED SECTION HEADER (Matching your previous About section style) */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <p className="text-gray-500 font-medium text-sm md:text-base mb-4">
            About Us
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
            Construction Your Vision
          </h2>
        </div>

        {/* 3-COLUMN IMAGE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Default to a fallback array if services data isn't 3 items */}
          {services.map((service, index) => {
            return (
              <Link 
                href="/services" 
                key={service.id || index} 
                ref={addToRefs}
                className="group relative block w-full h-[450px] md:h-[500px] lg:h-[550px] rounded-[2rem] overflow-hidden shadow-lg"
              >
                
                {/* 1. Card Background Image */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* 2. Dark Gradient Overlay (For Text Readability) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

                {/* 3. Text Content (Positioned at bottom) */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end z-10">
                  
                  <h3 className="text-2xl md:text-[26px] font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-white/80 text-sm leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Explore Now Link */}
                  <div className="inline-flex items-center gap-2 text-white text-sm font-semibold tracking-wide transition-colors duration-300 group-hover:text-[#FF5E14]">
                    Explore Now 
                    <FiArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" size={16} />
                  </div>

                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}