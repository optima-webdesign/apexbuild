'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FiShield, FiCpu, FiUsers, FiClock, FiCheck } from 'react-icons/fi';

export default function AboutPage() {
  const containerRef = useRef(null);
  const heroImageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Text Reveal
      gsap.from(".hero-elem", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // 2. Hero Image Parallax & Scale
      gsap.fromTo(heroImageRef.current,
        { scale: 0.9, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.4 }
      );

      gsap.to(heroImageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // 3. Section Fade Ups
      gsap.utils.toArray('.reveal-up').forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const values = [
    { icon: FiShield, title: "Uncompromising Integrity", desc: "Honesty and transparency in every contract and every brick laid." },
    { icon: FiCpu, title: "Smart Engineering", desc: "Using latest BIM and AI tools to optimize structural efficiency." },
    { icon: FiUsers, title: "Client Centricity", desc: "Your vision is our blueprint. We build what matters to you." },
    { icon: FiClock, title: "Timely Handover", desc: "Adhering to strict schedules to ensure your project is ready on time." }
  ];

  const timeline = [
    { year: "2010", title: "The Foundation", desc: "Started as a small consultancy in Ahmedabad with a big dream." },
    { year: "2015", title: "Going National", desc: "Completed our first major commercial high-rise in Mumbai." },
    { year: "2020", title: "Tech Revolution", desc: "Adopted fully sustainable and LEED-certified building practices." },
    { year: "2026", title: "Apex Today", desc: "Leading the industry with 250+ iconic projects across India." }
  ];

  const team = [
    { name: "Vikram Mehta", role: "Founder & CEO", image: "/vikram.png" },
    { name: "Ananya Patel", role: "Chief Architect", image: "/ananya.png" },
    { name: "Rohan Desai", role: "Head of Engineering", image: "/rohan.png" }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-32 pb-24 overflow-hidden">
      
      {/* 1. UNIQUE HERO SECTION (Centered Text + Overlapping Image) */}
      <section className="container mx-auto px-6 md:px-12 mb-20 md:mb-32">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="hero-elem text-[#FF5E14] font-bold uppercase tracking-[0.2em] text-sm mb-6">
            EST. 2010 • Ahmedabad
          </p>
          <h1 className="hero-elem text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-gray-900 tracking-tight leading-[1.05] mb-8">
            Shaping India&apos;s <br />
            Architectural Future.
          </h1>
          <p className="hero-elem text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            ApexBuild is a multi-disciplinary construction firm dedicated to high-performance buildings, premium estates, and innovative urban infrastructure.
          </p>
        </div>

        {/* Panoramic Parallax Image */}
        <div className="relative w-full h-[50vh] md:h-[70vh] rounded-4xl overflow-hidden shadow-2xl">
          <div ref={heroImageRef} className="absolute inset-[-10%] w-[120%] h-[120%]">
            <Image
              src="/construction-site.png" 
              alt="ApexBuild Projects" 
              fill 
              className="object-cover object-center" 
              priority
              sizes="100vw"
            />
            {/* Soft overlay */}
            <div className="absolute inset-0 bg-black/20 z-10" />
          </div>
        </div>
      </section>

      {/* 2. CORE PHILOSOPHY (Unique Sticky Scroll Layout) */}
      <section className="bg-[#FFF8F5] py-20 md:py-32 mb-24 rounded-4xl mx-4 md:mx-8">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
            
            {/* Left Column (Sticky) */}
            <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit reveal-up">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
                Our Core Philosophy
              </h2>
              <p className="text-gray-500 leading-relaxed mb-10 text-lg">
                Building is more than just assembly; it&apos;s the meticulous fusion of technology, safety, and human-centric design.
              </p>
              
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-orange-50">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FiCheck className="text-[#FF5E14]" /> The Mission
                  </h4>
                  <p className="text-gray-500 text-sm">To provide engineering solutions that stand the test of time through absolute transparency.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-orange-50">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FiCheck className="text-[#FF5E14]" /> The Vision
                  </h4>
                  <p className="text-gray-500 text-sm">To be the catalyst for sustainable and intelligent urban environments across the globe.</p>
                </div>
              </div>
            </div>

            {/* Right Column (Scrolling Values) */}
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {values.map((v, i) => (
                <div key={i} className="reveal-up p-8 md:p-10 bg-white rounded-4xl shadow-sm border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 bg-[#FFF8F5] rounded-full flex items-center justify-center mb-6">
                    <v.icon className="text-[#FF5E14]" size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{v.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 3. THE JOURNEY (Zig-Zag Vertical Timeline) */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="text-center mb-20 reveal-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">The Journey</h2>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute top-0 left-8 md:left-1/2 w-0.5 h-full bg-gray-100 -translate-x-1/2 z-0" />
          
          <div className="space-y-12">
            {timeline.map((item, i) => {
              // Alternate left/right alignment for desktop
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`reveal-up relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Content Box */}
                  <div className={`md:w-1/2 w-full pl-20 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                    <div className="bg-white p-8 rounded-4xl shadow-lg border border-gray-50 hover:border-orange-100 transition-colors duration-300">
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>

                  {/* Year Marker (Center Dot) */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-[#FF5E14] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-[0_0_0_8px_white]">
                    {item.year}
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. LEADERSHIP (Soft Portrait Cards) */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 reveal-up">
          <p className="text-gray-500 font-medium text-sm md:text-base mb-3">
            The Minds Behind The Concrete
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Meet Our Leaders</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {team.map((member, i) => (
            <div key={i} className="reveal-up group relative rounded-4xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-white">
              
              <div className="relative h-100 md:h-112.5 w-full overflow-hidden">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent opacity-80" />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-[#FF5E14] font-semibold text-sm mb-1">{member.role}</p>
                <h3 className="text-2xl font-bold">{member.name}</h3>
              </div>
              
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}