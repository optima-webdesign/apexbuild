'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1.5 seconds delay so it doesn't clash with initial page load animations
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-90 transition-all duration-700 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
    >
      <a
        href="https://wa.me/919428884809" // Apna number yahan dalein
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_35px_rgba(37,211,102,0.4)] hover:-translate-y-1 transition-all duration-300"
        aria-label="Chat with us on WhatsApp"
      >
        
        {/* Soft, Elegant Pulse Ring */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-0 transition-opacity duration-300"></div>

        <div className="relative z-10 flex items-center justify-center">
          {/* WhatsApp Icon */}
          <FaWhatsapp size={28} className="shrink-0" />
          
          {/* Smooth Expanding Text (Desktop only) */}
          <span className="font-semibold text-sm md:text-base max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-25 group-hover:opacity-100 group-hover:ml-3 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hidden md:block">
            Let&apos;s Chat
          </span>
        </div>
        
      </a>
    </div>
  );
}