'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { projects } from '@/data/projects';
import { FiArrowRight } from 'react-icons/fi';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const headerRef = useRef(null);

  // Extract unique categories safely
  const categories = ['All', ...new Set(projects.map((item) => item.category))];

  // Filter logic
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter((project) => project.category === activeCategory);

  // Initial Page Load Animation (GSAP)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.1 
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-24 md:pt-32 pb-32">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* 1. CLEAN CENTERED HEADER */}
        <div ref={headerRef} className="max-w-4xl mx-auto mb-12 md:mb-16 text-center">
          <p className="text-[#FF5E14] font-bold uppercase tracking-[0.2em] text-xs md:text-sm mb-4">
            Our Portfolio
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[5rem] font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
            Selected Works.
          </h1>
          <p className="text-gray-500 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Explore our collection of meticulously crafted spaces. Each project is a testament to our engineering excellence and architectural vision.
          </p>
        </div>

        {/* 2. PREMIUM PILL-SHAPED FILTERS */}
        <div className="flex overflow-x-auto md:flex-wrap justify-start md:justify-center gap-3 md:gap-4 mb-16 px-2 pb-4 scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 relative px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 shadow-sm whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-[#FF5E14] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 3. FIXED GALLERY GRID (3 COLUMNS) */}
        {/* Changed lg:grid-cols-2 to lg:grid-cols-3 here */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  key={project.id || index}
                  className="group cursor-pointer flex h-full"
                >
                  <Link href={`/projects/${project.slug || '#'}`} className="block w-full h-full">
                    
                    {/* The Premium Soft Card */}
                    <div className="bg-white p-4 md:p-6 rounded-4xl md:rounded-[2.5rem] border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(255,94,20,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                      
                      {/* Rounded Image Inside (Height adjusted slightly for 3-column layout) */}
                      <div className="relative h-55 sm:h-62.5 md:h-75 w-full rounded-3xl overflow-hidden bg-gray-100 mb-6">
                        <Image
                          src={project.images && project.images[0] ? project.images[0] : "/fallback-image.jpg"}
                          alt={project.title}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          priority={index < 3} // Preload first 3 images now
                        />
                      </div>
                      
                      {/* Clean Typography Layout */}
                      <div className="px-2 pb-2 flex items-center justify-between gap-2 mt-auto">
                        <div className="max-w-[75%]">
                          <p className="text-[#FF5E14] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">
                            {project.category}
                          </p>
                          <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight group-hover:text-[#FF5E14] transition-colors duration-300 truncate">
                            {project.title}
                          </h3>
                        </div>

                        {/* Diagonal Up Arrow Button */}
                        <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FFF8F5] flex items-center justify-center text-[#FF5E14] group-hover:bg-[#FF5E14] group-hover:text-white transition-all duration-300 border border-orange-50">
                          <FiArrowRight size={18} className="-rotate-45 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" /> 
                        </div>
                      </div>

                    </div>

                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-medium text-sm uppercase tracking-widest">
            No projects found in this category.
          </div>
        )}

      </div>
    </div>
  );
}