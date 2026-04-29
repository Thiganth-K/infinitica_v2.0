"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        delay: 0.5
      });

      gsap.from(subTextRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.8
      });

      // Pin the section while the next one overlays it
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      // Cinematic Scale on Scroll - Using fromTo to ensure it doesn't capture the initial entrance state
      gsap.fromTo(textRef.current, 
        { scale: 1, opacity: 1 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          scale: 0.9,
          opacity: 1,
          ease: "none",
          immediateRender: false
        }
      );

      gsap.fromTo(subTextRef.current,
        { scale: 1, opacity: 1 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          scale: 0.95,
          opacity: 1,
          ease: "none",
          immediateRender: false
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative z-0 min-h-screen flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6A3FD6] opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center px-6">
        <h1 
          ref={textRef}
          className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.8] text-white uppercase select-none"
        >
          Infinitica<span className="text-[#8B5CF6]">.</span>
        </h1>
        
        <div 
          ref={subTextRef}
          className="mt-12 max-w-2xl mx-auto"
        >
          <p className="text-lg md:text-2xl font-light text-[#C4A7F7] opacity-80 leading-relaxed tracking-wide">
            Architecting neural ecosystems for the next generation of intelligent enterprise logic.
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-white/40">
              <span className="w-10 h-[1px] bg-white/20"></span>
              Technical Precision
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-white/40">
              <span className="w-10 h-[1px] bg-white/20"></span>
              Neural Scalability
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-white">Scroll</div>
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
}
