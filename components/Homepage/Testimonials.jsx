'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

// Premium dummy data with detailed reviews
const premiumTestimonials = [
  {
    name: "Vikram Singhania",
    role: "CEO, Horizon Corp",
    review: "ApexBuild delivered our corporate headquarters 2 months ahead of schedule. The attention to structural detail and the seamless integration of modern aesthetics exceeded our highest expectations."
  },
  {
    name: "Aarti Desai",
    role: "Director, Lumina Real Estate",
    review: "Finding a reliable construction partner is tough, but Apex proved themselves. Their transparent process, budget management, and zero safety incidents on-site were truly impressive."
  },
  {
    name: "Rahul Mehta",
    role: "Founder, Zenith Designs",
    review: "As an architectural firm, we demand perfection from our builders. Apex executed our complex vision flawlessly. The finishing quality is world-class, making them our go-to partner."
  },
  {
    name: "Sunil Verma",
    role: "MD, Vertex Holdings",
    review: "The industrial facility they engineered for us handles massive load requirements effortlessly. Their team's technical knowledge and problem-solving skills on the ground are unmatched."
  },
  {
    name: "Kavita Shah",
    role: "Private Investor",
    review: "My luxury residential project was handled with utmost care. The premium materials sourced and the craftsmanship displayed in every corner of the house is simply breathtaking."
  }
];

export default function Testimonials() {
  // Duplicating the array to create a seamless infinite loop
  const duplicatedTestimonials = [...premiumTestimonials, ...premiumTestimonials, ...premiumTestimonials];

  return (
    <section className="py-24 md:py-32 bg-light overflow-hidden border-t border-dark/5">
      
      {/* 1. EDITORIAL SECTION HEADER */}
      <div className="container mx-auto px-6 md:px-12 mb-20 md:mb-28 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-0.5 bg-accent"></span>
            <span className="text-dark font-bold uppercase tracking-[0.2em] text-xs">
              Client Success Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black font-syne uppercase tracking-tighter text-dark leading-[0.95]">
            Built on <br />
            <span className="text-accent">Trust.</span>
          </h2>
        </div>
        <div className="md:max-w-sm">
          <p className="text-dark/60 text-lg leading-relaxed font-medium">
            Don&apos;t just take our word for it. Hear from the visionaries, leaders, and families who trusted us to engineer their legacies.
          </p>
        </div>
      </div>

      {/* 2. THE GRAND SINGLE-ROW SLIDER */}
      <div className="relative w-full overflow-hidden group/sliders">
        
        {/* Cinematic Fading Edges */}
        <div className="absolute top-0 left-0 w-16 md:w-64 h-full bg-linear-to-r from-light to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 md:w-64 h-full bg-linear-to-l from-light to-transparent z-10 pointer-events-none" />

        {/* The Infinite Track */}
        <motion.div
          className="flex gap-8 md:gap-12 w-max px-4 md:px-8"
          animate={{ x: ['0%', '-33.333333%'] }} // Adjusted for 3 exact copies
          transition={{
            ease: 'linear',
            duration: 40, // Nice, slow, premium panning speed
            repeat: Infinity,
          }}
          // Pauses perfectly when a user hovers to read
          whileHover={{ animationPlayState: "paused" }} 
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={`test-${index}`} testimonial={testimonial} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

// 3. WIDE, PREMIUM CARD COMPONENT
function TestimonialCard({ testimonial }) {
  return (
    // Width increased to 500px for desktop to make it look like a feature quote, not a tiny widget
    <div className="w-[85vw] sm:w-100 md:w-125 shrink-0 bg-white p-10 md:p-14 border border-dark/5 hover:border-accent shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 relative group cursor-grab active:cursor-grabbing flex flex-col justify-between">
      
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-500 ease-out" />

      <div>
        {/* Modern Minimal Star Ratings */}
        <div className="flex gap-1.5 text-accent mb-8">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} size={18} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
        
        {/* Review Text (Larger Typography) */}
        <p className="text-dark/80 text-lg md:text-xl leading-relaxed mb-12 font-medium">
          &quot;{testimonial.review}&quot;
        </p>
      </div>
      
      {/* Client Info */}
      <div className="border-t border-dark/10 pt-6 flex items-center justify-between relative z-10">
        <div>
          <h4 className="font-syne font-bold text-xl md:text-2xl text-dark uppercase tracking-wide mb-1">
            {testimonial.name}
          </h4>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-dark/40">
            {testimonial.role}
          </p>
        </div>
      </div>
      
      {/* Massive Background Quote Mark */}
      <div className="absolute -bottom-10 right-4 text-[12rem] text-dark/2 font-syne leading-none select-none z-0 pointer-events-none group-hover:text-accent/5 transition-colors duration-500">
        &quot;
      </div>
    </div>
  );
}