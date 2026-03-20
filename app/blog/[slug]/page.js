'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { blogs } from '@/data/blogs';
import { FiArrowLeft, FiClock, FiCalendar, FiUser } from 'react-icons/fi';

export default function SingleBlogPost() {
  const params = useParams();
  const { slug } = params;
  
  const post = blogs.find((b) => b.slug === slug);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!post) return;
    const ctx = gsap.context(() => {
      // Smooth fade-in for the main image wrapper
      gsap.fromTo(".hero-wrapper", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.1 }
      );
      
      // Text reveals staggered
      gsap.from(".animate-up", {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.4
      });
    }, containerRef);
    return () => ctx.revert();
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFD]">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
        <Link href="/blog" className="text-[#FF5E14] hover:underline font-semibold">
          Return to Journal
        </Link>
      </div>
    );
  }

  return (
    <article ref={containerRef} className="min-h-screen bg-[#FDFDFD] pt-32 pb-32">
      
      {/* 1. TOP NAV & CATEGORY */}
      <div className="container mx-auto px-6 md:px-12 mb-10 max-w-5xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <Link href="/blog" className="animate-up inline-flex items-center gap-2 text-gray-400 hover:text-[#FF5E14] text-xs font-bold uppercase tracking-wider transition-colors group">
          <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#FF5E14] transition-all">
            <FiArrowLeft size={14} />
          </span>
          Back to Journal
        </Link>
        <div className="animate-up px-5 py-2 rounded-full bg-[#FFF8F5] text-[#FF5E14] text-[10px] font-bold uppercase tracking-[0.2em] border border-orange-50">
          {post.category}
        </div>
      </div>

      {/* 2. HUGE ROUNDED HERO IMAGE */}
      <div className="container mx-auto px-6 md:px-12 mb-16 max-w-6xl">
        <div className="hero-wrapper relative w-full h-[45vh] md:h-[65vh] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-sm border border-gray-100">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill 
            className="object-cover object-center" 
            priority 
            sizes="(max-width: 1024px) 100vw, 80vw"
          />
          {/* Subtle gradient so the image isn't too harsh */}
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
        </div>
      </div>

      {/* 3. OVERLAPPING HEADER TEXT */}
      <div className="container mx-auto px-6 md:px-12 max-w-4xl -mt-24 md:-mt-32 relative z-10">
        <div className="bg-white p-8 md:p-12 lg:p-16 rounded-4xl md:rounded-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 text-center animate-up">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-8">
            {post.title}
          </h1>
          
          {/* Refined Meta Data Strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-gray-500 text-sm font-medium">
            <span className="flex items-center gap-2">
              <FiUser className="text-[#FF5E14]" /> By <strong className="text-gray-900">{post.author}</strong>
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300 hidden md:block"></span>
            <span className="flex items-center gap-2">
              <FiCalendar className="text-[#FF5E14]" /> {post.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300 hidden md:block"></span>
            <span className="flex items-center gap-2">
              <FiClock className="text-[#FF5E14]" /> {post.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* 4. THE EDITORIAL CONTENT */}
      <div className="container mx-auto px-6 md:px-12 mt-16 max-w-3xl">
        {/* We use a specialized prose class to make the typography look like a high-end magazine */}
        <div 
          className="animate-up prose prose-lg md:prose-xl prose-gray max-w-none text-gray-600 leading-relaxed font-medium marker:bg-[#FF5E14] selection:bg-orange-100 selection:text-[#FF5E14]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* 5. AUTHOR BIO CARD (Bottom) */}
        <div className="animate-up mt-24 bg-[#FFF8F5] rounded-4xl p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 border border-orange-50">
          <div className="w-20 h-20 shrink-0 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#FF5E14] text-2xl font-bold shadow-sm">
            {post.author.charAt(0)}
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold text-gray-900 mb-2">Written by {post.author}</h4>
            <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
              Lead visionary at ApexBuild, sharing insights on structural engineering, modern architecture, and the future of sustainable urban development.
            </p>
          </div>
        </div>

        {/* 6. SOFT BOTTOM DIVIDER & BACK LINK */}
        <div className="animate-up mt-16 pt-10 border-t border-gray-100 flex justify-center">
           <Link href="/blog" className="inline-flex items-center gap-2 text-[#FF5E14] font-bold text-xs tracking-widest uppercase hover:text-gray-900 transition-colors">
             <FiArrowLeft /> Return to Journal
           </Link>
        </div>
      </div>

    </article>
  );
}