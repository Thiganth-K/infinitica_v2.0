"use client";

import React, { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import styles from './UseCases.module.css';

import { Brain, Shield, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function UseCasesSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  // Configuration
  const itemDistance = 120;
  const itemScale = 0.03;
  const itemStackDistance = 40;
  const stackPosition = '20%';
  const scaleEndPosition = '10%';
  const baseScale = 0.8;

  const useCases = [
    {
      title: "Neural Talent Intelligence",
      description: "Leverage Hiresapien's AI to match talent with precision, reducing hiring cycles by 60% while increasing retention through deep skill mapping.",
      color: "#6A3FD6", // infinitica-purple
      textColor: "#ffffff",
      icon: <Brain size={120} strokeWidth={1} />
    },
    {
      title: "Secure Data Infrastructure",
      description: "Sentra provides a zero-trust foundation for enterprise data, ensuring multi-cloud compliance and real-time threat neutralization without performance overhead.",
      color: "#EDE9FE", // infinitica-glow
      textColor: "#050505",
      icon: <Shield size={120} strokeWidth={1} />
    },
    {
      title: "Creative Neural Workflow",
      description: "Automate brand-consistent visual assets with Zippy Mind. A neural pipeline that understands your brand's DNA to generate high-fidelity creative content at scale.",
      color: "#8B5CF6", // infinitica-accent
      textColor: "#ffffff",
      icon: <Sparkles size={120} strokeWidth={1} />
    },
    {
      title: "The Infinitica Vision",
      description: "Building the next generation of intelligent systems where human creativity and machine precision converge to solve the world's most complex challenges.",
      color: "#EDE9FE", // infinitica-glow
      textColor: "#050505",
      icon: <Zap size={120} strokeWidth={1} />
    }
  ];

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length) return;

    const scrollTop = window.scrollY;
    const containerHeight = window.innerHeight;
    const stackPositionPx = (parseFloat(stackPosition) / 100) * containerHeight;
    const scaleEndPositionPx = (parseFloat(scaleEndPosition) / 100) * containerHeight;

    const endElement = scroller.querySelector(`.${styles.scrollStackEnd}`) as HTMLElement;
    const scrollerRect = scroller.getBoundingClientRect();
    const scrollerPageTop = scrollerRect.top + window.scrollY;
    const endElementTop = endElement ? (scrollerPageTop + endElement.offsetTop) : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const originalCardTop = scrollerPageTop + card.offsetTop;

      const triggerStart = originalCardTop - stackPositionPx - (itemStackDistance * i);
      const triggerEnd = originalCardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = endElementTop - (containerHeight / 2);

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + (i * itemScale);
      const scale = 1 - (scaleProgress * (1 - targetScale));

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - originalCardTop + stackPositionPx + (itemStackDistance * i);
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - originalCardTop + stackPositionPx + (itemStackDistance * i);
      }

      card.style.transform = `translate3d(0, ${Math.round(translateY * 100) / 100}px, 0) scale(${Math.round(scale * 1000) / 1000})`;
    });
  }, [calculateProgress, baseScale, itemScale, itemStackDistance, stackPosition, scaleEndPosition]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll(`.${styles.scrollStackCard}`)) as HTMLElement[];
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
    });

    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      smoothWheel: true,
    });

    const onScroll = () => updateCardTransforms();
    lenis.on('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      lenis.destroy();
      window.removeEventListener('scroll', onScroll);
    };
  }, [itemDistance, updateCardTransforms]);

  return (
    <section id="use-cases" className="relative z-30 w-full bg-[#050505] flex flex-col py-20 overflow-hidden shadow-[0_-50px_100px_rgba(0,0,0,0.8)]">
      <div className="px-10 mb-20 relative z-10 text-center">
        <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-none">
          Enterprise <span className="text-[#8B5CF6]">Use Cases</span>
        </h2>
        <p className="text-[#C4A7F7] mt-6 max-w-2xl text-lg md:text-xl opacity-80 mx-auto">
          Explore how Infinitica's neural ecosystem is transforming industry standards across talent, security, and creativity.
        </p>
      </div>
      
      <div className="w-full">
        <div className={styles.scrollStackScroller} ref={scrollerRef}>
          <div className={styles.scrollStackInner}>
            {useCases.map((uc, index) => (
              <div 
                key={index}
                className={styles.scrollStackCard}
                style={{ backgroundColor: uc.color, color: uc.textColor }}
              >
                <div className="h-full flex flex-row items-center justify-between gap-10">
                  <div className="flex-1 flex flex-col justify-between h-full">
                    <div>
                      <span className="text-sm font-bold uppercase tracking-widest opacity-60">
                        Use Case 0{index + 1}
                      </span>
                      <h3 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
                        {uc.title}
                      </h3>
                    </div>
                    <p className="text-lg md:text-xl font-medium max-w-xl opacity-90 leading-relaxed mt-10">
                      {uc.description}
                    </p>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    whileInView={{ opacity: 0.3, scale: 1, rotate: 0 }}
                    animate={{ 
                      y: [0, -15, 0],
                    }}
                    transition={{ 
                      y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      opacity: { duration: 1 },
                      scale: { duration: 1 },
                      rotate: { duration: 1 }
                    }}
                    className="hidden lg:flex flex-shrink-0"
                  >
                    {uc.icon}
                  </motion.div>
                </div>
              </div>
            ))}
            <div className={styles.scrollStackEnd} />
          </div>
        </div>
      </div>
    </section>
  );
}
