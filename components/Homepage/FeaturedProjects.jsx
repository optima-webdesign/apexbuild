'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap'; 
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { projects } from '@/data/projects'; 

// Simple Star Icon component for the 4.5 rating
const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FF5E14" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

export default function FeaturedProjects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const projectRefs = useRef([]);

  const addToRefs = (el) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header Reveal
      gsap.fromTo(headerRef.current.children,
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out"
        }
      );

      // 2. 3-Column Cards Reveal
      projectRefs.current.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: (index % 3) * 0.15 // Stagger effect for row
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Sirf pehle 3 projects dikhayenge jaisa reference image mein hai
  const featured = projects.slice(0, 3);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* CENTERED HEADER */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gray-500 font-medium text-sm md:text-base mb-3">
            Our Recent Projects
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
            Shaping Skylines building Dreams
          </h2>
        </div>

        {/* 3-COLUMN CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project, index) => (
            <div 
              key={project.id || index} 
              ref={addToRefs}
              className="bg-[#FFF8F5] p-5 md:p-6 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl flex flex-col"
            >
              {/* Project Image */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-gray-200">
                <Image
                  // Make sure your data has project.image or project.images[0]
                  src={project.image || (project.images && project.images[0]) || "/fallback-image.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Text Content */}
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                
                {/* Fallback description if not in data */}
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {project.description || "Showcase of Our Premier Construction"}
                </p>

                {/* Rating Section (Static 4.5 as per design) */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-gray-700 text-sm font-semibold">4.5</span>
                  <div className="flex items-center gap-0.5">
                    <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <Link 
                  href={`/projects/${project.slug || '#'}`}
                  style={{ backgroundColor: '#FF5E14', color: '#FFFFFF' }}
                  className="inline-block px-7 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-90 shadow-md hover:shadow-lg"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}