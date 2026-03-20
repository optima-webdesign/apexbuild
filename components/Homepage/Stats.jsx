'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

// 100% Bulletproof GSAP Counter Component
const Counter = ({ from = 0, to, suffix = "" }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    // Ek dummy object banayenge jisko hum animate karenge 0 se target number tak
    const counterObj = { val: from };

    const ctx = gsap.context(() => {
      gsap.to(counterObj, {
        val: to,
        duration: 2.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: nodeRef.current,
          start: "top 90%", // Jab element thoda sa screen mein aayega tabhi count shuru hoga
        },
        onUpdate: () => {
          if (nodeRef.current) {
            // Har frame par text ko update karega Math.floor() ke sath taaki decimals na aayein
            nodeRef.current.textContent = Math.floor(counterObj.val) + suffix;
          }
        }
      });
    });

    return () => ctx.revert();
  }, [from, to, suffix]);

  // Initial render par 'from' value dikhegi
  return <span ref={nodeRef} className="font-syne font-black">{from}{suffix}</span>;
};

export default function Stats() {
  const stats = [
    { label: "Projects Delivered", value: 250, suffix: "+" },
    { label: "Years Excellence", value: 15, suffix: "+" },
    { label: "Industry Awards", value: 40, suffix: "+" },
    { label: "Client Satisfaction", value: 100, suffix: "%" },
  ];

  return (
    // Fixed background attachment gives a beautiful premium Parallax effect on scroll
    <section className="relative py-24 md:py-32 bg-dark overflow-hidden bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2500&auto=format&fit=crop')" }}>
      
      {/* Absolute overlay to darken the background image perfectly */}
      <div className="absolute inset-0 bg-dark/90 mix-blend-multiply z-0"></div>
      
      {/* Decorative Grid Lines Overlay (Subtle Blueprint vibe) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[40px_40px] z-0"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Stats Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-white/10">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center pt-8 sm:pt-0">
              
              {/* The Animated Number */}
              <h3 className="text-5xl md:text-6xl lg:text-7xl mb-4 text-white drop-shadow-md">
                <Counter from={0} to={stat.value} suffix={stat.suffix} />
              </h3>
              
              {/* The Label */}
              <div className="flex flex-col items-center">
                {/* Small Yellow Accent Line */}
                <span className="w-8 h-0.5 bg-accent mb-4"></span>
                <p className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-white/70 text-center">
                  {stat.label}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}