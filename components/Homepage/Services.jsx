'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { services } from '@/data/services';
import { FiArrowRight } from 'react-icons/fi';

export default function Services() {
  const sectionRef = useRef(null);
  
  // Array of refs to make GSAP 100% reliable in Next.js
  const cardsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Individual trigger for each card ensures it ALWAYS fires on scroll
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%", // Screen mein thoda aate hi animate hoga
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          // 2-column grid ke liye delay taaki left aur right thoda aage-peeche aayein
          delay: index % 2 === 0 ? 0 : 0.2 
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // FIXED: Changed bg-[#F9F9F9] to bg-light (Assuming bg-light is defined in tailwind.config, otherwise use standard like bg-gray-50)
    <section ref={sectionRef} className="py-24 md:py-32 bg-light">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-dark/10 pb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              {/* FIXED: Changed h-[2px] to h-0.5 */}
              <span className="w-10 h-0.5 bg-accent"></span>
              <span className="text-dark font-bold uppercase tracking-[0.2em] text-xs">
                Our Capabilities
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-syne uppercase tracking-tight text-dark leading-[1.05]">
              Engineering Your <br />
              <span className="text-accent">Vision.</span>
            </h2>
          </div>
          
          <Link 
            href="/services" 
            className="group flex items-center gap-3 text-dark uppercase font-bold tracking-widest text-sm hover:text-accent transition-all duration-300"
          >
            All Services 
            <span className="w-8 h-8 rounded-full border border-dark/20 flex items-center justify-center group-hover:border-accent transition-colors">
              <FiArrowRight />
            </span>
          </Link>
        </div>

        {/* EDITORIAL GRID (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
          {services.map((service, index) => {
            return (
              // Changed div to Link so the entire card is clickable and working
              <Link 
                href="/services" 
                key={service.id} 
                ref={addToRefs}
                className="group block"
              >
                {/* Large Crisp Image */}
                {/* FIXED: Changed h-[350px] to h-87.5 and md:h-[450px] to md:h-112.5 */}
                <div className="relative h-87.5 md:h-112.5 w-full overflow-hidden mb-8 bg-dark">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Sleek Content Layout */}
                <div className="flex gap-6 md:gap-8">
                  
                  {/* Premium Numbering */}
                  <div className="text-2xl md:text-3xl font-black font-syne text-accent mt-1">
                    0{index + 1}
                  </div>
                  
                  {/* Text Details */}
                  <div className="flex flex-col">
                    <h3 className="text-2xl md:text-3xl font-bold font-syne text-dark mb-4 uppercase tracking-wide group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-dark/70 text-base leading-relaxed mb-8 max-w-md">
                      {service.description}
                    </p>

                    {/* Minimal Read More Arrow */}
                    <div className="inline-flex items-center gap-3 text-dark font-bold uppercase tracking-widest text-xs group-hover:text-accent transition-colors duration-300">
                      Explore Details 
                      <FiArrowRight className="transform group-hover:translate-x-2 transition-transform duration-300" size={16} />
                    </div>
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