'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { blogs } from '@/data/blogs'; // Aapka same blog data
import { FiArrowRight } from 'react-icons/fi';

export default function HomeBlog() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header Animation
      gsap.from(headerRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // 2. Blog Cards Animation (Staggered)
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".blog-grid",
            start: "top 85%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Home page par sirf latest 3 blogs dikhayenge
  const recentBlogs = blogs.slice(0, 3);

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* 1. SECTION HEADER */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-[#FF5E14] font-bold uppercase tracking-[0.2em] text-xs md:text-sm mb-3">
              Industry Insights
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
              Read Our <br className="hidden md:block" />
              Latest News.
            </h2>
          </div>
          
          {/* View All Button for Desktop */}
          <Link 
            href="/blog" 
            className="hidden md:flex items-center gap-2 text-gray-900 font-bold uppercase tracking-widest text-sm hover:text-[#FF5E14] transition-colors group"
          >
            View All Articles
            <span className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#FF5E14] transition-all duration-300">
              <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* 2. BLOG CARDS GRID (3 Columns) */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentBlogs.map((blog, index) => (
            <div 
              key={blog.id} 
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group flex flex-col bg-[#FFF8F5] border border-orange-50 rounded-4xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full"
            >
              <Link href={`/blog/${blog.slug}`} className="flex flex-col h-full p-4 md:p-5">
                
                {/* Image with Padding Frame */}
                <div className="relative h-55 w-full rounded-2xl bg-white overflow-hidden mb-6">
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  
                  {/* Floating Category Pill */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#FF5E14] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {blog.category}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col grow px-2 pb-2">
                  <div className="flex items-center gap-3 text-gray-400 text-[11px] font-bold tracking-wider uppercase mb-3">
                    <span>{blog.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{blog.readTime}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight mb-3 group-hover:text-[#FF5E14] transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 grow line-clamp-2">
                    {blog.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="mt-auto pt-5 border-t border-orange-100 flex items-center justify-between">
                    <span className="text-gray-900 font-bold text-sm tracking-wide group-hover:text-[#FF5E14] transition-colors">
                      Read Article
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#FF5E14] group-hover:bg-[#FF5E14] group-hover:text-white transition-all shadow-sm border border-orange-50">
                      <FiArrowRight size={18} className="-rotate-45 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

              </Link>
            </div>
          ))}
        </div>

        {/* View All Button for Mobile */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link 
            href="/blog" 
            className="flex items-center justify-center gap-3 bg-[#FF5E14] text-white w-full py-4 rounded-full font-semibold tracking-wide text-sm shadow-md"
          >
            View All Articles <FiArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}