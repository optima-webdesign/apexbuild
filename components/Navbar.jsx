'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check if we are on the homepage. Only the homepage has the dark full-screen hero image at the top.
  const isHome = pathname === '/';

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to handle reloads midway down the page
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // LOGIC FOR COLORS:
  // - If Mobile Menu is Open: ALWAYS Dark Text / White BG
  // - If Not on Homepage: ALWAYS Dark Text / White BG (Scrolled or not)
  // - If On Homepage AND Scrolled: Dark Text / White BG
  // - If On Homepage AND Not Scrolled (Top): White Text / Transparent BG
  
  const forceDarkTheme = isMobileMenuOpen || !isHome || isScrolled;

  const headerClasses = clsx(
    'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out',
    forceDarkTheme
      ? 'bg-white/95 backdrop-blur-md py-4 shadow-[0_4px_30px_rgba(0,0,0,0.04)] border-b border-dark/5' 
      : 'bg-transparent py-6 lg:py-8'
  );

  const textColorClass = forceDarkTheme ? 'text-dark' : 'text-white';
  const buttonClass = forceDarkTheme 
    ? 'bg-dark text-white hover:bg-accent hover:text-dark border-transparent' 
    : 'bg-white text-dark hover:bg-accent hover:text-dark border-white hover:border-accent';
  const hamburgerLineClass = forceDarkTheme ? 'bg-dark' : 'bg-white';

  return (
    <>
      <header className={headerClasses}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* 1. BRAND LOGO */}
          <Link 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={clsx(
              "text-2xl md:text-3xl font-black tracking-tighter uppercase font-syne relative z-50 transition-colors duration-300",
              textColorClass
            )}
          >
            Apex<span className="text-accent">Build.</span>
          </Link>

          {/* 2. DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex gap-8 lg:gap-10 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={clsx(
                    "text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 hover:text-accent relative group",
                    isActive ? "text-accent opacity-100" : `${textColorClass} opacity-80 hover:opacity-100`
                  )}
                >
                  <span>{link.name}</span>
                  
                  {/* Premium Active Tab Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3. DESKTOP CTA BUTTON */}
          <div className="hidden lg:flex items-center">
            <Link 
              href="/contact" 
              className={clsx(
                "px-6 lg:px-8 py-3.5 text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all duration-300 border",
                buttonClass
              )}
            >
              Start A Project
            </Link>
          </div>

          {/* 4. CUSTOM ANIMATED HAMBURGER MENU (Mobile) */}
          <button
            className="lg:hidden relative z-50 w-8 h-6 flex flex-col justify-between items-end group focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={clsx(`h-0.5 transition-all duration-300 ease-out ${hamburgerLineClass}`, isMobileMenuOpen ? "w-8 rotate-45 translate-y-2.75" : "w-8")} />
            <span className={clsx(`h-0.5 transition-all duration-300 ease-out ${hamburgerLineClass}`, isMobileMenuOpen ? "w-0 opacity-0" : "w-6 group-hover:w-8")} />
            <span className={clsx(`h-0.5 transition-all duration-300 ease-out ${hamburgerLineClass}`, isMobileMenuOpen ? "w-8 -rotate-45 -translate-y-2.75" : "w-8")} />
          </button>

        </div>
      </header>

      {/* 5. EDITORIAL FULLSCREEN MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%', transition: { delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col px-6 pt-32 pb-12 lg:hidden"
          >
            {/* Staggered Links */}
            <div className="flex flex-col gap-6 mt-10">
              {[...navLinks, { name: 'Contact Us', path: '/contact' }].map((link, i) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%', opacity: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={clsx(
                        'text-4xl sm:text-5xl font-syne font-black uppercase tracking-tighter block',
                        pathname === link.path ? 'text-accent' : 'text-dark hover:text-accent transition-colors'
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Bottom Contact Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-auto border-t border-dark/10 pt-8"
            >
              <p className="text-dark/50 text-xs font-bold uppercase tracking-widest mb-4">
                Get In Touch
              </p>
              <a href="mailto:hello@apexbuild.com" className="block text-dark font-syne font-bold text-lg mb-1">
                hello@apexbuild.com
              </a>
              <a href="tel:+919876543210" className="block text-dark font-syne font-bold text-lg">
                +91 98765 43210
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}