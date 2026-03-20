'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { projects } from '@/data/projects';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export default function ProjectDetail() {
  const params = useParams();
  const { slug } = params;

  // Find the exact project
  const project = projects.find((p) => p.slug === slug);

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const galleryRefs = useRef([]);

  useEffect(() => {
    if (!project) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header Text Animation
      gsap.from(headerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.1
      });

      // 2. Floating Hero Image Reveal & Parallax
      gsap.fromTo(".hero-wrapper", 
        { scale: 0.95, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.4 }
      );

      gsap.to(".hero-image", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-wrapper",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // 3. Horizontal Stats Strip Reveal
      gsap.from(statsRef.current.children, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });

      // 4. Gallery Reveal
      galleryRefs.current.forEach((img) => {
        if (!img) return;
        gsap.fromTo(img,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out"
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFD]">
        <h1 className="text-[8rem] md:text-[10rem] font-bold text-gray-100 mb-4 leading-none">404</h1>
        <p className="text-gray-500 mb-8 uppercase tracking-widest font-bold">Project Not Found</p>
        <Link href="/projects" className="inline-flex items-center justify-center gap-2 bg-[#FF5E14] text-white px-8 py-3 rounded-full hover:shadow-lg transition-all group">
          <FiArrowLeft className="transform group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
        </Link>
      </div>
    );
  }

  // Gallery Images (Excluding the first one used in Hero)
  const galleryImages = project.images && project.images.length > 1 ? project.images.slice(1) : [];

  return (
    <article ref={containerRef} className="min-h-screen bg-[#FDFDFD] pt-32 pb-24 overflow-hidden">
      
      {/* 1. CLEAN TOP HEADER */}
      <section className="container mx-auto px-6 md:px-12 mb-12">
        <Link href="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#FF5E14] text-sm font-semibold uppercase tracking-wider mb-10 transition-colors group">
          <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#FF5E14] transition-all">
            <FiArrowLeft size={14} />
          </span>
          Back to Works
        </Link>

        <div ref={headerRef} className="max-w-5xl">
          <p className="text-[#FF5E14] font-bold uppercase tracking-[0.2em] text-xs md:text-sm mb-4">
            {project.category}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-bold text-gray-900 tracking-tight leading-[1.05]">
            {project.title}
          </h1>
        </div>
      </section>

      {/* 2. FLOATING HERO IMAGE */}
      <section className="container mx-auto px-6 md:px-12 mb-16">
        <div className="hero-wrapper relative w-full h-[50vh] md:h-[70vh] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100">
          <div className="absolute inset-[-10%] w-[120%] h-[120%]">
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="hero-image object-cover object-center"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* 3. HORIZONTAL STATS STRIP (Unique Layout) */}
      <section className="container mx-auto px-6 md:px-12 mb-20 md:mb-32">
        <div ref={statsRef} className="bg-[#FFF8F5] rounded-4xl p-8 md:p-12 border border-orange-50 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-orange-100">
          
          <div className="flex flex-col pt-4 sm:pt-0 lg:px-6 first:px-0">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Location</span>
            <span className="text-gray-900 font-bold text-lg">{project.location}</span>
          </div>
          
          <div className="flex flex-col pt-4 sm:pt-0 lg:px-6">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Area</span>
            <span className="text-gray-900 font-bold text-lg">{project.area || "Confidential"}</span>
          </div>
          
          <div className="flex flex-col pt-4 sm:pt-0 lg:px-6">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Timeline</span>
            <span className="text-gray-900 font-bold text-lg">{project.timeline || "Completed"}</span>
          </div>
          
          <div className="flex flex-col pt-4 sm:pt-0 lg:px-6">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Client</span>
            <span className="text-gray-900 font-bold text-lg">{project.client || "Private"}</span>
          </div>

        </div>
      </section>

      {/* 4. THE NARRATIVE (Centered & Clean) */}
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-8">
            The Vision
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 font-medium">
            {project.description}
          </p>
          <p className="text-gray-500 text-base leading-relaxed">
            Every detail of this development was meticulously planned to balance aesthetic brilliance with structural integrity. We utilized cutting-edge engineering techniques, sustainable materials, and rigorous safety protocols to ensure that this structure stands as a timeless landmark in {project.location}.
          </p>
        </div>
      </section>

      {/* 5. PREMIUM ROUNDED GALLERY */}
      {galleryImages.length > 0 && (
        <section className="container mx-auto px-6 md:px-12 mb-32">
          <div className="flex flex-col gap-6 md:gap-10">
            {galleryImages.map((imgUrl, index) => {
              
              // If there are exactly 2 images left, make them side-by-side
              const isSideBySide = galleryImages.length === 2;

              if (isSideBySide) {
                if (index === 0) {
                  return (
                    <div key="grid-container" className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                      <div ref={(el) => { galleryRefs.current[0] = el; }} className="relative h-[40vh] md:h-[60vh] w-full rounded-4xl overflow-hidden bg-gray-100 shadow-sm">
                        <Image src={galleryImages[0]} alt={`${project.title} Detail 1`} fill className="object-cover hover:scale-105 transition-transform duration-1000 ease-out" sizes="(max-width: 768px) 100vw, 50vw" />
                      </div>
                      <div ref={(el) => { galleryRefs.current[1] = el; }} className="relative h-[40vh] md:h-[60vh] w-full rounded-4xl overflow-hidden bg-gray-100 shadow-sm md:mt-12">
                        <Image src={galleryImages[1]} alt={`${project.title} Detail 2`} fill className="object-cover hover:scale-105 transition-transform duration-1000 ease-out" sizes="(max-width: 768px) 100vw, 50vw" />
                      </div>
                    </div>
                  );
                }
                return null;
              }

              // Default full width panorama
              return (
                <div key={index} ref={(el) => { galleryRefs.current[index] = el; }} className="relative h-[50vh] md:h-[70vh] w-full rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-sm">
                  <Image
                    src={imgUrl}
                    alt={`${project.title} Gallery Image ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                    sizes="100vw"
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. SOFT CTA BANNER */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="bg-[#FFF8F5] p-12 md:p-20 rounded-[3rem] relative overflow-hidden flex flex-col items-center text-center border border-orange-50 shadow-sm">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
              Ready to start <br /> <span className="text-[#FF5E14]">yours?</span>
            </h2>
            <Link 
              href="/contact" 
              style={{ backgroundColor: '#FF5E14', color: '#FFFFFF' }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold tracking-wide text-sm md:text-base hover:opacity-90 transition-opacity duration-300 shadow-md hover:-translate-y-1 group"
            >
              Request A Quote <FiArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" size={18} />
            </Link>
          </div>
        </div>
      </section>

    </article>
  );
}