"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const philosophies = [
  {
    title: "Neural Synergy",
    desc: "Bridging the gap between biological intuition and machine precision through high-fidelity neural pipelines.",
    index: "01"
  },
  {
    title: "Zero-Trust Logic",
    desc: "Inbuilt security at the atomic level, ensuring data integrity without compromising computational speed.",
    index: "02"
  },
  {
    title: "Scalable Insight",
    desc: "Turning petabytes of raw interaction into actionable enterprise intelligence in real-time.",
    index: "03"
  },
  {
    title: "Creative Freedom",
    desc: "Automating the repetitive to unlock human creativity at unprecedented scale.",
    index: "04"
  }
];

export default function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const horizontalWidth = horizontalRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;

      gsap.to(horizontalRef.current, {
        x: () => -(horizontalWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${horizontalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-10 bg-[#050505] overflow-hidden shadow-[0_-50px_100px_rgba(0,0,0,0.8)]">
      <div
        ref={horizontalRef}
        className="flex h-screen items-center px-[10vw] gap-[20vw]"
        style={{ width: 'fit-content' }}
      >
        {/* Intro Slide */}
        <div className="flex-shrink-0 w-[40vw]">
          <h2 className="text-5xl md:text-8xl font-bold text-white leading-none uppercase tracking-tighter">
            Our <br /> <span className="text-[#8B5CF6]">Philosophy</span>
          </h2>
          <p className="mt-8 text-xl text-[#C4A7F7] opacity-60 max-w-md">
            At Infinitica, we don't just build software. We architect the future of intelligent systems.
          </p>
        </div>

        {/* Philosophy Cards */}
        {philosophies.map((p, i) => (
          <div key={i} className="flex-shrink-0 w-[60vw] md:w-[35vw] relative">
            <span className="text-8xl md:text-[12rem] font-black text-[#6A3FD6]/30 absolute -top-20 -left-10 select-none">
              {p.index}
            </span>
            <div className="relative z-10 border-l border-white/10 pl-10 py-4">
              <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
                {p.title}
              </h3>
              <p className="mt-6 text-lg md:text-xl text-[#C4A7F7] opacity-80 leading-relaxed">
                {p.desc}
              </p>
            </div>
          </div>
        ))}

        {/* Closing Slide */}
        <div className="flex-shrink-0 w-[40vw]">
          <div className="w-20 h-[1px] bg-[#8B5CF6] mb-8"></div>
          <h2 className="text-4xl md:text-6xl font-bold text-white uppercase leading-tight">
            Ready to <br /> Explore the <br /> Ecosystem?
          </h2>
        </div>
      </div>
    </section>
  );
}
