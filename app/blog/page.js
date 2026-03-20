'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { blogs } from '@/data/blogs';
import { FiArrowRight } from 'react-icons/fi';

export default function BlogPage() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".blog-header > *", {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.1
      });

      // Cards Reveal
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: { trigger: ".blog-grid", start: "top 85%" },
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out"
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFDFD] pt-32 pb-24">
      
      {/* HEADER */}
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center max-w-3xl blog-header">
        <p className="text-[#FF5E14] font-bold uppercase tracking-[0.2em] text-sm mb-4">Our Journal</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
          Insights & News.
        </h1>
        <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
          Thoughts, engineering updates, and architectural trends from the experts at ApexBuild.
        </p>
      </div>

      {/* BLOG GRID */}
      <div className="container mx-auto px-6 md:px-12 blog-grid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {blogs.map((blog, index) => (
            <div 
              key={blog.id} 
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group flex flex-col bg-white border border-gray-100 rounded-4xl shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-2 hover:border-orange-50 transition-all duration-500 overflow-hidden h-full"
            >
              <Link href={`/blog/${blog.slug}`} className="flex flex-col h-full p-4 md:p-5">
                
                {/* Image */}
                <div className="relative h-50 sm:h-55 w-full rounded-2xl bg-gray-100 overflow-hidden mb-6">
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  
                  {/* Category Pill Over Image */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#FF5E14] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {blog.category}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col grow px-2 md:px-3 pb-2">
                  <div className="flex items-center gap-3 text-gray-400 text-[11px] font-bold tracking-wider uppercase mb-3">
                    <span>{blog.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{blog.readTime}</span>
                  </div>

                  {/* Added line-clamp-2 to keep title size consistent */}
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight mb-3 group-hover:text-[#FF5E14] transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h2>
                  
                  {/* Added line-clamp-2 to excerpt */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 grow line-clamp-2">
                    {blog.excerpt}
                  </p>

                  <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-gray-900 font-bold text-sm tracking-wide group-hover:text-[#FF5E14] transition-colors">
                      Read Article
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#FFF8F5] flex items-center justify-center text-[#FF5E14] group-hover:bg-[#FF5E14] group-hover:text-white transition-all border border-orange-50">
                      <FiArrowRight size={18} className="-rotate-45 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}