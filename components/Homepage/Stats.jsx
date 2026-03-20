'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Optimized GSAP Counter Component
const Counter = ({ from = 0, to }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const counterObj = { val: from };

    const ctx = gsap.context(() => {
      gsap.to(counterObj, {
        val: to,
        duration: 2.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: nodeRef.current,
          start: "top 90%", 
        },
        onUpdate: () => {
          if (nodeRef.current) {
            // Sirf number update hoga, suffix humne bahar nikal diya hai styling ke liye
            nodeRef.current.textContent = Math.floor(counterObj.val);
          }
        }
      });
    });

    return () => ctx.revert();
  }, [from, to]);

  return <span ref={nodeRef}>{from}</span>;
};

export default function Stats() {
  const sectionRef = useRef(null);

  const stats = [
    { label: "Projects Delivered", value: 250, suffix: "+" },
    { label: "Years of Excellence", value: 15, suffix: "+" },
    { label: "Industry Awards", value: 40, suffix: "+" },
    { label: "Client Satisfaction", value: 100, suffix: "%" },
  ];

  // Container fade-up animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%"
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Soft Premium Container */}
        <div ref={sectionRef} className="bg-[#FFF8F5] rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-16 lg:p-20 shadow-sm border border-orange-50/50">
          
          {/* Stats Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-gray-200/60">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center pt-8 sm:pt-0 first:pt-0">
                
                {/* The Animated Number + Styled Suffix */}
                <h3 className="text-5xl md:text-6xl font-bold text-gray-900 mb-3 flex items-center">
                  <Counter from={0} to={stat.value} />
                  <span className="text-[#FF5E14] ml-1">{stat.suffix}</span>
                </h3>
                
                {/* The Clean Label */}
                <div className="flex flex-col items-center text-center">
                  <p className="text-sm md:text-base font-medium text-gray-500">
                    {stat.label}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}