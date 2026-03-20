'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { motion } from 'framer-motion';

// Maine list badi kar di hai taaki slider lamba aur premium lage
const clients = [
  "Horizon Corp", 
  "Apex Logistics", 
  "Lumina Real Estate", 
  "Vertex Holdings", 
  "Zenith Designs",
  "Quantum Build",
  "Stellar Architecture",
  "Nexus Engineering",
  "Orion Structures",
  "Atlas Heavy Industries"
];

export default function Clients() {
  const containerRef = useRef(null);

  // Infinite scroll ko smooth banane ke liye hum array ko duplicate kar rahe hain
  const duplicatedClients = [...clients, ...clients];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pura section smoothly fade in hoga scroll karne par
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-12 md:py-20 bg-white border-b border-dark/10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-10 md:mb-14">
        
        {/* Premium Section Header with Minimal Dividers */}
        <div className="flex items-center justify-center gap-4">
          <span className="w-12 h-px bg-dark/20"></span>
          <p className="text-center text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-dark/50">
            Trusted By Industry Leaders
          </p>
          <span className="w-12 h-px bg-dark/20"></span>
        </div>
      </div>

      {/* INFINITE SLIDER CONTAINER */}
      <div className="relative w-full flex items-center">
        
        {/* Left & Right Fade Gradients (Premium Effect) */}
        <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Framer Motion Auto-Scrolling Track */}
        <motion.div
          className="flex items-center gap-16 md:gap-24 w-max px-8"
          animate={{
            x: ['0%', '-50%'], // Array duplicate kiya hai isliye -50% tak jayega phir reset hoga
          }}
          transition={{
            ease: 'linear',
            duration: 30, // Speed control (jitna zyada, utna slow). 30 is perfect.
            repeat: Infinity,
          }}
        >
          {duplicatedClients.map((client, index) => (
            <div key={index} className="group relative cursor-pointer py-2 shrink-0">
              {/* Client Name */}
              <h3 className="text-2xl md:text-3xl font-syne font-bold uppercase tracking-tighter text-dark/30 group-hover:text-dark transition-colors duration-300">
                {client}
              </h3>
              
              {/* Hover Effect: Yellow Accent Underline */}
              <div className="absolute bottom-0 left-0 w-0 h-0.75 bg-accent group-hover:w-full transition-all duration-500 ease-out"></div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}