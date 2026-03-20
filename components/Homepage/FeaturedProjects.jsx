'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { projects } from '@/data/projects';
import { FiArrowRight } from 'react-icons/fi';

export default function FeaturedProjects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  
  // Use array strictly for robust GSAP targeting
  const projectRefs = useRef([]);
  // Error Fix: Removed 'projectRefs.current = []' from the render body.

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Reveal
      gsap.fromTo(headerRef.current.children,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out"
        }
      );

      // 2. Project Cards Reveal
      gsap.fromTo(projectRefs.current,
        { y: 80, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out"
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Sirf pehle 3 projects dikhayenge
  const featured = projects.slice(0, 3);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white border-t border-dark/5">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* EDITORIAL HEADER */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8 border-b border-dark/10 pb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              {/* FIXED: Changed h-[2px] to h-0.5 */}
              <span className="w-10 h-0.5 bg-accent"></span>
              <span className="text-dark font-bold uppercase tracking-[0.2em] text-xs">
                Selected Works
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-syne uppercase tracking-tight text-dark leading-[1.05]">
              Featured <span className="text-accent">Projects.</span>
            </h2>
          </div>
          
          <Link 
            href="/projects" 
            className="group hidden md:flex items-center gap-3 text-dark uppercase font-bold tracking-widest text-sm hover:text-accent transition-all duration-300"
          >
            View All Projects 
            <span className="w-8 h-8 rounded-full border border-dark/20 flex items-center justify-center group-hover:border-accent transition-colors">
              <FiArrowRight />
            </span>
          </Link>
        </div>

        {/* WIDE IMPACT GRID LAYOUT */}
        <div className="flex flex-col gap-16 md:gap-24">
          {featured.map((project, index) => {
            
            // Layout Logic:
            // Index 0: Full width panorama
            // Index 1 & 2: 50% width side-by-side but slightly offset
            
            if (index === 0) {
              return (
                <div 
                  key={project.id} 
                  ref={(el) => { projectRefs.current[0] = el; }} // 🟢 FIX: Used index assignment
                  className="group block cursor-pointer w-full opacity-0"
                >
                  <Link href={`/projects/${project.slug}`}>
                    {/* FIXED: Replaced arbitrary heights with canonical variants */}
                    <div className="relative h-100 md:h-150 xl:h-175 w-full overflow-hidden mb-6 bg-dark border border-dark/5 shadow-sm">
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        sizes="100vw"
                      />
                    </div>
                    
                    {/* Text Below First Huge Project */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark/10 pb-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                        <h3 className="text-3xl md:text-4xl font-syne font-bold text-dark uppercase tracking-wide group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-dark/50 text-sm font-bold uppercase tracking-[0.2em] md:mt-1">
                          — {project.category}
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-3 text-dark font-bold uppercase tracking-widest text-xs group-hover:text-accent transition-colors duration-300">
                        View Case Study <FiArrowRight className="transform group-hover:translate-x-2 transition-transform duration-300" size={16} />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            }

            // Wrapping index 1 and 2 in a flex container for the split layout
            if (index === 1) {
              const nextProject = featured[2];
              return (
                <div key="split-container" className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                  
                  {/* Left Column (Index 1) */}
                  <div 
                    ref={(el) => { projectRefs.current[1] = el; }} // 🟢 FIX
                    className="group block cursor-pointer opacity-0"
                  >
                    <Link href={`/projects/${project.slug}`}>
                      {/* FIXED: Replaced arbitrary heights */}
                      <div className="relative h-87.5 md:h-125 w-full overflow-hidden mb-6 bg-dark border border-dark/5 shadow-sm">
                        <Image
                          src={project.images[0]}
                          alt={project.title}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="border-b border-dark/10 pb-6">
                        <p className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-2">
                          {project.category}
                        </p>
                        <h3 className="text-2xl md:text-3xl font-syne font-bold text-dark uppercase tracking-wide mb-4 group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>
                        <div className="inline-flex items-center gap-3 text-dark/70 font-bold uppercase tracking-widest text-xs group-hover:text-dark transition-colors duration-300">
                          View Details <FiArrowRight className="transform group-hover:translate-x-2 transition-transform duration-300" size={14} />
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Right Column (Index 2) - Pushed down for Staggered effect */}
                  {nextProject && (
                    <div 
                      ref={(el) => { projectRefs.current[2] = el; }} // 🟢 FIX
                      className="group block cursor-pointer opacity-0 md:mt-24 lg:mt-32"
                    >
                      <Link href={`/projects/${nextProject.slug}`}>
                        {/* FIXED: Replaced arbitrary heights */}
                        <div className="relative h-87.5 md:h-125 w-full overflow-hidden mb-6 bg-dark border border-dark/5 shadow-sm">
                          <Image
                            src={nextProject.images[0]}
                            alt={nextProject.title}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <div className="border-b border-dark/10 pb-6">
                          <p className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-2">
                            {nextProject.category}
                          </p>
                          <h3 className="text-2xl md:text-3xl font-syne font-bold text-dark uppercase tracking-wide mb-4 group-hover:text-accent transition-colors duration-300">
                            {nextProject.title}
                          </h3>
                          <div className="inline-flex items-center gap-3 text-dark/70 font-bold uppercase tracking-widest text-xs group-hover:text-dark transition-colors duration-300">
                            View Details <FiArrowRight className="transform group-hover:translate-x-2 transition-transform duration-300" size={14} />
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}

                </div>
              );
            }
            return null; // Handled inside index === 1
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-16 text-center md:hidden border-t border-dark/10 pt-8">
          <Link 
            href="/projects" 
            className="inline-flex items-center justify-center gap-3 bg-dark text-white w-full py-5 uppercase font-bold tracking-wider text-sm hover:bg-accent hover:text-dark transition-all duration-300"
          >
            Explore All Projects
          </Link>
        </div>

      </div>
    </section>
  );
}