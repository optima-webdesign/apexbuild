'use client';

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

export default function Footer() {
  
  // Custom Social Links Data
  const socialLinks = [
    { icon: FaFacebookF, url: "https://www.facebook.com/profile.php?id=61571101167407", name: "Facebook" },
    { icon: FaTwitter, url: "https://x.com/optimaweb12", name: "Twitter" },
    { icon: FaInstagram, url: "https://www.instagram.com/_optimawebdesign/", name: "Instagram" },
    { icon: FaLinkedinIn, url: "https://www.linkedin.com/in/optima-webdesign-28a011342/", name: "LinkedIn" },
  ];

  return (
    // Top corners heavily rounded to match the soft premium theme
    <footer className="bg-[#1A1A1A] text-white pt-20 md:pt-32 pb-10 rounded-t-[2.5rem] md:rounded-t-[4rem] mt-10 md:mt-20 overflow-hidden relative">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 lg:mb-24">
          
          {/* 1. Brand Vision & Logo */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-8 group w-max">
              <div className="w-10 h-10 bg-[#FF5E14] rounded-full flex items-center justify-center transform group-hover:scale-105 transition-transform shadow-md">
                <span className="text-white font-black text-xl leading-none tracking-tighter">A</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                ApexBuild.
              </span>
            </Link>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm mb-8 font-medium">
              Building the future with modern engineering, high-end architecture, and unparalleled precision. We engineer legacies that stand the test of time.
            </p>
            <a href="mailto:hello@apexbuild.com" className="inline-flex items-center gap-2 text-[#FF5E14] font-semibold text-base hover:text-white transition-colors group">
              hello@apexbuild.com 
              <FiArrowUpRight className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* 2. Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-bold text-lg mb-6">Company</h4>
            <ul className="flex flex-col gap-4">
              {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-[#FF5E14] hover:translate-x-1 transition-all duration-300 text-sm md:text-base font-medium block w-max"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Expertise / Services */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-lg mb-6">Expertise</h4>
            <ul className="flex flex-col gap-4">
              {['Commercial Spaces', 'Luxury Residential', 'Industrial Facilities', 'Renovation'].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-gray-400 hover:text-[#FF5E14] hover:translate-x-1 transition-all duration-300 text-sm md:text-base font-medium block w-max">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Headquarters & Socials */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-lg mb-6">Headquarters</h4>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium mb-8">
              123 Build Street, <br />
              Ahmedabad, Gujarat 380015
            </p>

            <h4 className="text-white font-bold text-lg mb-6">Follow Us</h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#FF5E14] hover:border-[#FF5E14] transition-all duration-300 transform hover:-translate-y-1 shadow-sm"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* MASSIVE SUBTLE WATERMARK TEXT */}
        <div className="w-full flex justify-center mb-8 select-none pointer-events-none">
          <h2 className="text-[12vw] leading-none font-bold tracking-tighter text-white/3 text-center">
            APEXBUILD.
          </h2>
        </div>

        {/* COPYRIGHT & CREDITS */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs md:text-sm font-medium gap-6 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} ApexBuild. All Rights Reserved.</p>
          
          {/* Optima Web Design Credit */}
          <p>
            Designed & Developed by{' '}
            <a 
              href="https://optimawebdesign.in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-300 hover:text-[#FF5E14] transition-colors font-bold border-b border-gray-700 hover:border-[#FF5E14] pb-0.5"
            >
              Optima Web Design
            </a>
          </p>

          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#FF5E14] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#FF5E14] transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}