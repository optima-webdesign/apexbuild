'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Page load hone ke 1.5 seconds baad button smoothly appear hoga
    // Taaki GSAP animations disturb na hon
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-90 transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <a
        href="https://wa.me/919876543210" // Apna number yahan dalein
        target="_blank"
        rel="noopener noreferrer"
        // Group class for the expanding hover effect
        className="group relative flex items-center justify-center gap-2 bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
        aria-label="Chat with us on WhatsApp"
      >
        
        {/* Subtle Pulse Ring Behind the Button */}
        <span className="absolute inset-0 flex h-full w-full -z-10">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40"></span>
        </span>

        {/* WhatsApp Icon */}
        <FaWhatsapp size={28} className="relative z-10 shrink-0" />
        
        {/* Expanding Text (Hidden by default, expands smoothly on hover on Desktop) */}
        <span className="relative z-10 font-syne font-bold uppercase tracking-widest text-xs max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-37.5 group-hover:opacity-100 group-hover:pl-2 group-hover:pr-1 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hidden md:block">
          Let&apos;s Talk
        </span>
        
      </a>
    </div>
  );
}