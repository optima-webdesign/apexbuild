'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll on mobile menu
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  const isHome = pathname === '/';
  // Text darkens if we scroll, if we open mobile menu, or if we aren't on the homepage
  const isDarkTheme = isScrolled || !isHome || isMobileMenuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6 lg:py-8'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center relative">
          
          {/* 1. BRAND LOGO (Now Soft & Circular) */}
          <Link 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 z-50 group"
          >
            <div className="w-10 h-10 bg-[#FF5E14] rounded-full flex items-center justify-center transform group-hover:scale-105 transition-transform shadow-md">
              <span className="text-white font-black text-xl leading-none tracking-tighter">A</span>
            </div>
            <span className={`text-2xl font-bold tracking-tight transition-colors ${
              isDarkTheme ? 'text-gray-900' : 'text-white'
            }`}>
              ApexBuild.
            </span>
          </Link>

          {/* 2. DESKTOP NAVIGATION (Centered with Premium Dot Indicator) */}
          <nav className="hidden lg:flex gap-10 items-center absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-[15px] font-semibold transition-colors duration-200 relative group ${
                    isActive 
                      ? 'text-[#FF5E14]' 
                      : isDarkTheme ? 'text-gray-600 hover:text-gray-900' : 'text-gray-200 hover:text-white'
                  }`}
                >
                  {link.name}
                  {/* Subtle Dot Indicator instead of a heavy line */}
                  <span 
                    className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF5E14] transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                    }`}
                  ></span>
                </Link>
              );
            })}
          </nav>

          {/* 3. DESKTOP CTA BUTTON (Pill-shaped) */}
          <div className="hidden lg:block z-50">
            <Link 
              href="/contact" 
              className="bg-[#FF5E14] hover:bg-[#e04f0d] text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Get a Quote
            </Link>
          </div>

          {/* 4. MOBILE HAMBURGER */}
          <button
            className="lg:hidden relative z-50 w-7 h-5 flex flex-col justify-between items-center focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`w-full h-0.5 rounded-full transition-all duration-300 origin-left ${isDarkTheme ? 'bg-gray-900' : 'bg-white'} ${isMobileMenuOpen ? 'rotate-45' : ''}`} />
            <span className={`w-full h-0.5 rounded-full transition-all duration-300 ${isDarkTheme ? 'bg-gray-900' : 'bg-white'} ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 rounded-full transition-all duration-300 origin-left ${isDarkTheme ? 'bg-gray-900' : 'bg-white'} ${isMobileMenuOpen ? '-rotate-45' : ''}`} />
          </button>
        </div>
      </header>

      {/* 5. MOBILE MENU (Soft Dropdown) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#FDFDFD] px-6 pt-32 pb-12 lg:hidden flex flex-col overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-3xl font-bold tracking-tight border-b border-gray-100 pb-4 ${
                    pathname === link.path ? 'text-[#FF5E14]' : 'text-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <Link 
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-[#FF5E14] text-white py-4 rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Get a Quote
              </Link>
            </div>
            
            {/* Quick Contact Info in Mobile Menu */}
            <div className="mt-auto pt-10">
              <p className="text-gray-500 text-sm font-medium mb-2">Call us directly:</p>
              <a href="tel:+919876543210" className="text-2xl font-bold text-gray-900">+91 98765 43210</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}