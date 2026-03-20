'use client';

import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

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
    <section className="py-20 md:py-32 bg-[#FDFDFD] overflow-hidden">
      
      {/* 1. CLEAN SECTION HEADER */}
      <div className="container mx-auto px-6 md:px-12 mb-16 md:mb-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <p className="text-gray-500 font-medium text-sm md:text-base mb-3">
            Client Success Stories
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
            Built on Trust.
          </h2>
        </div>
        <div className="md:max-w-sm">
          <p className="text-gray-500 text-base md:text-lg leading-relaxed font-medium">
            Don&apos;t just take our word for it. Hear from the visionaries, leaders, and families who trusted us to build their dreams.
          </p>
        </div>
      </div>

      {/* 2. INFINITE SCROLLING SLIDER */}
      <div className="relative w-full overflow-hidden py-10">
        
        {/* Soft Fading Edges for the Premium Look */}
        <div className="absolute top-0 left-0 w-20 md:w-64 h-full bg-linear-to-r from-[#FDFDFD] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-20 md:w-64 h-full bg-linear-to-l from-[#FDFDFD] to-transparent z-10 pointer-events-none" />

        {/* The Infinite Track */}
        <motion.div
          className="flex gap-6 md:gap-8 w-max px-4"
          animate={{ x: ['0%', '-33.333333%'] }} // Adjusted for 3 exact copies
          transition={{
            ease: 'linear',
            duration: 50, // Slowed down slightly for better readability
            repeat: Infinity,
          }}
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

// 3. SOFT PREMIUM CARD COMPONENT
function TestimonialCard({ testimonial }) {
  return (
    <div className="w-[85vw] sm:w-100 md:w-120 shrink-0 bg-white p-8 md:p-12 rounded-4xl md:rounded-[2.5rem] border border-gray-100 hover:border-orange-50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(255,94,20,0.08)] hover:-translate-y-2 transition-all duration-500 relative flex flex-col justify-between group">
      
      <div>
        {/* Star Ratings */}
        <div className="flex gap-1.5 text-[#FF5E14] mb-6 md:mb-8">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} size={18} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
        
        {/* Review Text */}
        <p className="text-gray-600 text-lg md:text-[22px] leading-relaxed mb-10 font-medium">
          &quot;{testimonial.review}&quot;
        </p>
      </div>
      
      {/* Client Info */}
      <div className="flex items-center gap-4 relative z-10 mt-auto">
        {/* User Initial Avatar */}
        <div className="w-12 h-12 rounded-full bg-[#FFF8F5] text-[#FF5E14] flex items-center justify-center font-bold text-xl border border-orange-100">
          {testimonial.name.charAt(0)}
        </div>
        
        <div>
          <h4 className="font-bold text-lg md:text-xl text-gray-900 leading-tight">
            {testimonial.name}
          </h4>
          <p className="text-sm font-medium text-gray-500">
            {testimonial.role}
          </p>
        </div>
      </div>
      
    </div>
  );
}