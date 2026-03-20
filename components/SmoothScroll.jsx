'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    let locomotiveScroll;
    
    // Dynamic import to avoid SSR issues with Locomotive Scroll
    import('locomotive-scroll').then((LocomotiveScroll) => {
      locomotiveScroll = new LocomotiveScroll.default({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 1, // Scroll speed
        class: 'is-reveal',
      });
    });

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, [pathname]); // Jab bhi page change hoga, scroll wapas top par aayega

  return (
    <div data-scroll-container className="min-h-screen bg-white text-black">
      {children}
    </div>
  );
}