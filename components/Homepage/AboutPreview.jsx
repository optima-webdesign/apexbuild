'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { FiArrowRight } from 'react-icons/fi';

export default function AboutPreview() {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const textContentRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Premium Image Reveal (Bottom to Top Wipe)
      gsap.fromTo(".image-mask", 
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );

      // Image Parallax Effect (Slight scale down & move)
      gsap.fromTo(".about-image", 
        { scale: 1.2, y: 30 },
        {
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );

      // 2. Black Experience Badge slides in
      gsap.from(badgeRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      // 3. Text Content Reveal
      gsap.from(textContentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textContentRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // Background pure white for the light theme
    <section ref={sectionRef} className="py-24 md:py-32 bg-white overflow-hidden border-b border-dark/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT: Premium Architectural Image Section */}
          <div className="relative pl-4 pt-4 md:pl-8 md:pt-8" ref={imageContainerRef}>
            
            {/* Geometric Yellow Accent Box (Behind Image) */}
            <div className="absolute top-0 left-0 w-3/4 h-[90%] border-l-4 border-t-4 border-accent z-0" />
            
            {/* Image Mask Container */}
            <div className="image-mask relative h-125 md:h-162.5 w-full z-10 bg-dark overflow-hidden shadow-2xl">
              <Image
                // Suggestion: A clean architectural shot with strong lines
                src="/construction-site.png"
                alt="Construction Site"
                fill
                className="about-image object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Sharp Dark Experience Badge */}
            <div 
              ref={badgeRef} 
              className="absolute -bottom-8 -left-4 md:-bottom-12 md:-left-8 bg-dark text-white p-8 md:p-10 z-20 shadow-xl border-b-4 border-accent flex items-center gap-6"
            >
              <p className="text-6xl md:text-7xl font-black font-syne text-accent leading-none">15</p>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] leading-snug">Years Of <br/> Excellence</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Text Content (Clean & Editorial) */}
          <div ref={textContentRef} className="pt-16 lg:pt-0">
            
            {/* Minimal Subheading */}
            <div className="flex items-center gap-4 mb-6">
              <span className="w-10 h-0.5 bg-accent"></span>
              <span className="text-dark font-bold uppercase tracking-[0.2em] text-xs">
                Who We Are
              </span>
            </div>
            
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-syne uppercase tracking-tight text-dark mb-8 leading-[1.05]">
              Shaping skylines, <br />
              Building <span className="text-accent">legacies.</span>
            </h2>
            
            {/* Description */}
            <p className="text-dark/70 text-lg mb-10 leading-relaxed font-medium">
              We are a premier construction and architectural firm based in Ahmedabad. 
              Our commitment to innovation, quality materials, and unparalleled engineering 
              has made us the trusted choice for commercial and luxury residential projects.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-8 mb-12 border-t border-dark/10 pt-10">
              <div>
                <p className="text-4xl md:text-5xl font-black text-dark font-syne mb-2">250<span className="text-accent">+</span></p>
                <p className="text-xs font-bold text-dark/50 uppercase tracking-widest">Projects Completed</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-black text-dark font-syne mb-2">100<span className="text-accent">%</span></p>
                <p className="text-xs font-bold text-dark/50 uppercase tracking-widest">Client Satisfaction</p>
              </div>
            </div>

            {/* Premium CTA Button */}
            <Link 
              href="/about" 
              className="group inline-flex items-center gap-4 bg-dark text-white px-8 py-4 uppercase font-bold tracking-wider text-sm hover:bg-accent hover:text-dark transition-all duration-300"
            >
              Read Full Story
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}