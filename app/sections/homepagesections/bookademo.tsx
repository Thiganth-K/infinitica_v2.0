"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '../../components/Magnetic';

gsap.registerPlugin(ScrollTrigger);

export default function BookADemoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.from(".animate-text", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.2
      })
      .from(".animate-btn", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1
      }, "-=0.6")
      .from(".animate-grid", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="book-a-demo" 
      className="w-full bg-[#050505] py-32 px-10 relative z-50 overflow-hidden flex items-center justify-center shadow-[0_-50px_100px_rgba(0,0,0,0.8)]"
    >
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6A3FD6] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10 px-10">
        <h2 className="animate-text text-5xl md:text-8xl font-bold text-white tracking-tighter leading-none mb-8 drop-shadow-2xl">
          Ready to <span className="text-[#8B5CF6]">Evolve?</span>
        </h2>
        
        <p className="animate-text text-[#C4A7F7] text-xl md:text-2xl max-w-2xl mx-auto mb-12 opacity-90 leading-relaxed drop-shadow-lg">
          Join the vanguard of enterprises leveraging neural intelligence to redefine the limits of human productivity.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Magnetic>
            <div className="animate-btn">
              <button 
                suppressHydrationWarning
                className="px-10 py-5 bg-[#6A3FD6] text-white font-bold rounded-xl text-lg hover:bg-[#8B5CF6] transition-all duration-300 shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] transform"
              >
                Book a Strategy Call
              </button>
            </div>
          </Magnetic>
          
          <Magnetic>
            <div className="animate-btn">
              <button 
                suppressHydrationWarning
                className="px-10 py-5 bg-transparent border border-white/20 text-white font-bold rounded-xl text-lg hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
              >
                Request Private Access
              </button>
            </div>
          </Magnetic>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
          <div className="animate-grid">
            <h4 className="text-white font-bold text-lg mb-2">Personalized Strategy</h4>
            <p className="text-white/50 text-sm">Tailored neural mapping for your specific industry challenges.</p>
          </div>
          <div className="animate-grid">
            <h4 className="text-white font-bold text-lg mb-2">Live Ecosystem Demo</h4>
            <p className="text-white/50 text-sm">See Hiresapien, Sentra, and Zippy Mind working in sync.</p>
          </div>
          <div className="animate-grid">
            <h4 className="text-white font-bold text-lg mb-2">Technical Deep Dive</h4>
            <p className="text-white/50 text-sm">Direct access to our neural architecture team.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
