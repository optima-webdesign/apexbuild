'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap'; 
import { FiPhone } from 'react-icons/fi';

export default function Hero() {
  const containerRef = useRef(null);
  const textContentRef = useRef(null);
  const imageRef = useRef(null);
  const bottomBarRef = useRef(null);

  // GSAP Animation
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Background Image smooth subtle zoom
      gsap.fromTo(imageRef.current, 
        { scale: 1.05 },
        { scale: 1, duration: 2.5, ease: 'power2.out' }
      );

      // Hero Text & Buttons slide up
      gsap.from(textContentRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        delay: 0.2,
        ease: 'power3.out'
      });

      // Bottom Logo bar fade in
      gsap.from(bottomBarRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // FIX 1: Use min-h-svh for mobile browsers and flex column layout
    <section ref={containerRef} className="relative min-h-svh w-full overflow-hidden flex flex-col justify-center">
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 h-full w-full bg-[#1a1a1a]">
        <div ref={imageRef} className="relative w-full h-full">
          <Image
            src="/hero.png" 
            alt="Modern Construction Excavator"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        
        {/* FIX 2: Better mobile gradient so white text is always readable */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/30 z-10" />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/20 to-transparent z-10 hidden md:block" />
      </div>

      {/* MAIN CONTENT AREA */}
      {/* FIX 3: Added pt-32 (safe area for navbar) and pb-40 (safe area for bottom logos) */}
      <div className="container mx-auto px-6 md:px-12 relative z-20 pt-32 pb-40 md:py-0 flex flex-col justify-center grow">
        <div ref={textContentRef} className="max-w-2xl w-full text-white mt-auto md:mt-0">
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold leading-[1.1] mb-6 tracking-tight drop-shadow-md">
            Building the Shape <br className="hidden md:block" />
            You&apos;ve Always Wanted
          </h1>

          <p className="text-white/90 text-base md:text-lg mb-8 md:mb-10 leading-relaxed max-w-xl font-medium drop-shadow-md">
            Construction is more than just bricks and mortar: it&apos;s about transforming ideas into reality. It&apos;s about creating spaces that inspire, connect, and uplift.
          </p>

          {/* Buttons: Stack on mobile, inline on desktop */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/projects" 
              className="bg-[#FF5E14] hover:bg-[#e04f0d] text-white px-8 py-4 md:py-3.5 rounded-full font-semibold transition-colors duration-300 text-center text-base shadow-lg"
            >
              Start your project
            </Link>
            
            <Link 
              href="tel:+1234567890" 
              className="group flex items-center justify-center gap-2 bg-white/10 border border-white/50 text-white px-8 py-4 md:py-3.5 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 text-base backdrop-blur-md"
            >
              <FiPhone className="text-white group-hover:text-black transition-colors" size={18} />
              Call now
            </Link>
          </div>
        </div>
      </div>

      {/* BOTTOM TRUSTED BY LOGOS BAR */}
      <div 
        ref={bottomBarRef}
        className="absolute bottom-0 left-0 w-full z-20 bg-linear-to-t from-black/90 to-transparent pt-16 pb-6 md:pb-8 pointer-events-none"
      >
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-center text-white/60 text-xs md:text-sm font-semibold uppercase tracking-widest mb-4 md:mb-6">
            Trusted by 120+ Businesses
          </p>
          
          {/* FIX 4: Hide extra logos on small mobile screens to prevent wrapping and breaking */}
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16 lg:gap-24 opacity-80">
            <span className="text-white font-bold text-base md:text-lg tracking-widest italic">Logoipsum</span>
            <span className="text-white font-bold text-base md:text-lg flex items-center gap-2">
              <span className="text-xl">⬡</span> ATMANTARA
            </span>
            {/* Hidden on mobile, shows on sm and up */}
            <span className="text-white font-bold text-base md:text-lg tracking-widest italic hidden sm:block">Logoipsum</span>
            <span className="text-white font-bold text-base md:text-lg hidden md:flex items-center gap-2">
              <span className="text-xl">⬡</span> ATMANTARA
            </span>
          </div>
        </div>
      </div>

    </section> 
  );
}