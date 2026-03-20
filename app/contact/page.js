'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiMapPin, FiPhone, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';

export default function ContactPage() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  
  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Residential',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Page Load Animation
      gsap.from(".contact-elem", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        delay: 0.2,
        ease: "power3.out"
      });

      // 2. Left Column Reveal
      gsap.from(leftColRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.4
      });

      // 3. Right Column (Form) Reveal
      gsap.fromTo(rightColRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log("Form Submitted Successfully:", formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setFormData({
        name: '', email: '', phone: '', interest: 'Residential', message: ''
      });

      setTimeout(() => setIsSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-32 pb-24 overflow-hidden">
      
      {/* 1. CLEAN HEADER */}
      <div className="container mx-auto px-6 md:px-12 mb-16 md:mb-24 text-center max-w-4xl">
        <p className="contact-elem text-[#FF5E14] font-bold uppercase tracking-[0.2em] text-sm mb-4">
          Let&apos;s Talk
        </p>
        <h1 className="contact-elem text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
          Build Your <span className="text-[#FF5E14]">Vision.</span>
        </h1>
        <p className="contact-elem text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
          Whether you have a clear blueprint or need expert architectural guidance, our engineering team is ready to turn your ideas into a concrete reality.
        </p>
      </div>

      {/* 2. CONTACT LAYOUT (Split Screen) */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: Contact Details & Image */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col gap-12 sticky top-32">
            
            {/* Headquarters */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFF8F5] flex items-center justify-center text-[#FF5E14]">
                  <FiMapPin size={18} />
                </div>
                Headquarters
              </h3>
              <p className="text-gray-500 text-base leading-relaxed mb-6 font-medium pl-13">
                123 Apex Boulevard,<br />
                SG Highway, Ahmedabad,<br />
                Gujarat 380015, India
              </p>
              
              {/* Premium Rounded HQ Image */}
              <div className="relative w-full h-62.5 rounded-3xl overflow-hidden mb-6 shadow-md border border-gray-100">
                 <Image 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop"
                    alt="ApexBuild Headquarters"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                 />
              </div>
            </div>

            <div className="w-full h-px bg-gray-100" />

            {/* Direct Contact */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFF8F5] flex items-center justify-center text-[#FF5E14]">
                  <FiPhone size={18} />
                </div>
                Connect
              </h3>
              <div className="flex flex-col gap-5 pl-13">
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Phone</p>
                  <a href="tel:+919428884809" className="text-gray-900 text-lg font-bold hover:text-[#FF5E14] transition-colors">+91 94288 84809</a>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Email</p>
                  <a href="mailto:hello@apexbuild.com" className="text-gray-900 text-lg font-bold hover:text-[#FF5E14] transition-colors">hello@apexbuild.com</a>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: The Soft Premium Form */}
          <div className="lg:col-span-7">
            <div ref={rightColRef} className="bg-[#FFF8F5] p-8 sm:p-12 md:p-16 rounded-[2.5rem] md:rounded-[3rem] border border-orange-50 shadow-sm relative">
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-10">
                Request A Quote
              </h2>

              {isSuccess ? (
                <div className="h-full min-h-100 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-orange-100">
                    <FiCheckCircle className="text-[#FF5E14] text-4xl" />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Message Received.</h4>
                  <p className="text-gray-500 text-lg max-w-md">
                    Thank you for reaching out. Our engineering team will review your requirements and contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="text-gray-700 text-sm font-semibold mb-2">Full Name *</label>
                      <input 
                        type="text" name="name" required value={formData.name} onChange={handleChange}
                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#FF5E14]/20 focus:border-[#FF5E14] transition-all text-gray-900 placeholder-gray-400"
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-700 text-sm font-semibold mb-2">Phone Number *</label>
                      <input 
                        type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#FF5E14]/20 focus:border-[#FF5E14] transition-all text-gray-900 placeholder-gray-400"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* Email & Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
                      <input 
                        type="email" name="email" required value={formData.email} onChange={handleChange}
                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#FF5E14]/20 focus:border-[#FF5E14] transition-all text-gray-900 placeholder-gray-400"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-700 text-sm font-semibold mb-2">Project Category</label>
                      <select 
                        name="interest" value={formData.interest} onChange={handleChange}
                        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#FF5E14]/20 focus:border-[#FF5E14] transition-all text-gray-900 cursor-pointer"
                      >
                        <option value="Residential">Luxury Residential</option>
                        <option value="Commercial">Commercial & Corporate</option>
                        <option value="Industrial">Industrial Facilities</option>
                        <option value="Renovation">Renovation & Restoration</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 text-sm font-semibold mb-2">Project Details *</label>
                    <textarea 
                      name="message" required rows="4" value={formData.message} onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#FF5E14]/20 focus:border-[#FF5E14] transition-all text-gray-900 placeholder-gray-400 resize-none"
                      placeholder="Tell us about your vision, location, and timeline..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4">
                    <button 
                      type="submit" disabled={isSubmitting}
                      style={{ backgroundColor: isSubmitting ? '#e5e7eb' : '#FF5E14', color: isSubmitting ? '#9ca3af' : '#FFFFFF' }}
                      className="group flex items-center justify-center gap-3 px-10 py-4 rounded-full font-semibold tracking-wide text-sm md:text-base w-full sm:w-auto transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                    >
                      {isSubmitting ? 'Transmitting Data...' : 'Submit Inquiry'}
                      {!isSubmitting && <FiArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}