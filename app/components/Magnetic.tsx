"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MagneticProps {
  children: React.ReactElement;
}

export default function Magnetic({ children }: MagneticProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Magnetic pull radius
      const distance = Math.sqrt(x * x + y * y);
      if (distance < 100) {
        xTo(x * 0.4);
        yTo(y * 0.4);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const onMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return React.cloneElement(children, { ref } as any);
}
