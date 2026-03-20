'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// GSAP from library
import gsap from 'gsap'; 
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Small custom icons representing the ones in the image
const IconBox = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z" stroke="#FF5E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12L12 6" stroke="#FF5E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12L8 6" stroke="#FF5E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 12L16 6" stroke="#FF5E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconBuilding = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21H21" stroke="#FF5E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 21V5C5 4.44772 5.44772 4 6 4H14C14.5523 4 15 4.44772 15 5V21" stroke="#FF5E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 21V11C19 10.4477 18.5523 10 18 10H15" stroke="#FF5E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 9H11" stroke="#FF5E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 13H11" stroke="#FF5E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 17H11" stroke="#FF5E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function AboutPreview() {
  const sectionRef = useRef(null);
  const textContentRef = useRef(null);
  const imageRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger safely
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Image fade and slight scale up
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      // Text elements slide up
      gsap.from(textContentRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textContentRef.current,
          start: "top 80%",
        }
      });

      // Feature cards slide up from bottom
      gsap.from(cardsRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textContentRef.current, 
          start: "top 80%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Text Content & Feature Cards */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            
            {/* TEXT CONTENT WRAPPER */}
            <div ref={textContentRef} className="mb-10">
              
              {/* Minimal Top Label */}
              <p className="text-gray-500 font-medium text-sm md:text-base mb-4">
                About Us
              </p>
              
              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-8">
                Our Reputation is as Solid <br className="hidden md:block" />
                as Concrete
              </h2>
              
              {/* CTA BUTTON FIX: Wrapped in div & using inline style for guaranteed color */}
              <div>
                <Link 
                  href="/about" 
                  style={{ backgroundColor: '#FF5E14', color: '#FFFFFF' }}
                  className="inline-block px-8 py-3.5 rounded-full font-semibold transition-all duration-300 text-sm md:text-base shadow-md hover:shadow-lg hover:opacity-90"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Feature Cards Grid */}
            <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Card 1 */}
              <div className="bg-[#FFF8F5] p-8 rounded-3xl transition-transform hover:-translate-y-1 duration-300">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-orange-100">
                  <IconBox />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Results For You
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Bringing transparency, trust, and value to every property deal.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#FFF8F5] p-8 rounded-3xl transition-transform hover:-translate-y-1 duration-300">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-orange-100">
                  <IconBuilding />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Real Estate Gets Real
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Dedicated to delivering success and expectations in every transaction.
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT: Large Rounded Image */}
          <div className="order-1 lg:order-2">
            <div ref={imageRef} className="relative w-full aspect-square md:aspect-[4/5] lg:aspect-square overflow-hidden rounded-3xl shadow-xl bg-gray-100 border border-gray-100">
              
              <Image
                src="/construction-site.png" 
                alt="Construction Team"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}