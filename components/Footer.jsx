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
    <footer className="bg-dark text-white pt-24 pb-10 overflow-hidden relative">
      
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-50" />

      <div className="container mx-auto px-6 md:px-12">
        
        {/* 1. MASSIVE BRAND TEXT (Awwwards Style) */}
        <div className="mb-20">
          <h2 className="text-[15vw] leading-none font-syne font-black uppercase tracking-tighter text-white/5 select-none text-center md:text-left">
            Apex<span className="text-accent/20">Build.</span>
          </h2>
        </div>

        {/* 2. MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20 border-b border-white/10 pb-20">
          
          {/* Brand Vision */}
          <div className="lg:col-span-4">
            <Link href="/" className="text-3xl font-black tracking-tighter uppercase font-syne mb-6 inline-block text-white">
              Apex<span className="text-accent">Build.</span>
            </Link>
            <p className="text-white/50 text-base leading-relaxed max-w-sm mb-8 font-medium">
              Building the future with modern engineering, high-end architecture, and unparalleled precision. We engineer legacies that stand the test of time.
            </p>
            <a href="mailto:hello@apexbuild.com" className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-sm hover:text-white transition-colors group">
              hello@apexbuild.com 
              <FiArrowUpRight className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-syne text-xs font-bold mb-8 text-white/40 uppercase tracking-[0.2em]">Company</h4>
            <ul className="flex flex-col gap-4">
              {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="text-white/80 hover:text-accent hover:pl-2 transition-all duration-300 text-sm uppercase tracking-widest font-bold block w-max"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="font-syne text-xs font-bold mb-8 text-white/40 uppercase tracking-[0.2em]">Expertise</h4>
            <ul className="flex flex-col gap-4">
              {['Commercial Spaces', 'Luxury Residential', 'Industrial Facilities', 'Renovation'].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-white/80 hover:text-accent hover:pl-2 transition-all duration-300 text-sm uppercase tracking-widest font-bold block w-max">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Address */}
          <div className="lg:col-span-2">
            <h4 className="font-syne text-xs font-bold mb-8 text-white/40 uppercase tracking-[0.2em]">Follow Us</h4>
            <div className="flex gap-4 mb-10">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent hover:text-dark transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
            
            <h4 className="font-syne text-xs font-bold mb-4 text-white/40 uppercase tracking-[0.2em]">Headquarters</h4>
            <p className="text-white/60 text-xs leading-relaxed font-medium">
              123 Build Street, <br />
              Ahmedabad, Gujarat 380015
            </p>
          </div>

        </div>

        {/* 3. COPYRIGHT & CREDITS */}
        <div className="flex flex-col md:flex-row justify-between items-center text-white/40 text-xs font-medium tracking-widest uppercase gap-6 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} ApexBuild. All Rights Reserved.</p>
          
          {/* Optima Web Design Credit */}
          <p>
            Designed & Developed by{' '}
            <a 
              href="https://optimawebdesign.in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-accent transition-colors font-bold border-b border-white/20 hover:border-accent pb-1"
            >
              Optima Web Design
            </a>
          </p>

          <div className="flex gap-6">
            <Link href="#" className="hover:text-accent transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-accent transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}