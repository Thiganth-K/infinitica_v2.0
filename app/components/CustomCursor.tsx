"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      // Main dot
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
      // Lagging follower
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "expo.out"
      });
    };

    const onMouseDown = () => {
      gsap.to(follower, { scale: 0.8, duration: 0.3 });
    };

    const onMouseUp = () => {
      gsap.to(follower, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Interaction with hoverable elements
    const handleHover = () => {
      const hoverables = document.querySelectorAll('a, button, [data-hover]');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(follower, { 
            scale: 2.5, 
            backgroundColor: "rgba(139, 92, 246, 0.2)", // infinitica purple
            mixBlendMode: "screen",
            duration: 0.4 
          });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(follower, { 
            scale: 1, 
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            mixBlendMode: "normal",
            duration: 0.4 
          });
        });
      });
    };

    handleHover();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          zIndex: 10001,
          pointerEvents: 'none',
          mixBlendMode: 'difference'
        }}
      />
      <div 
        ref={followerRef}
        style={{
          position: 'fixed',
          top: -20,
          left: -20,
          width: 40,
          height: 40,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          zIndex: 10000,
          pointerEvents: 'none',
          transition: 'background-color 0.3s, border 0.3s'
        }}
      />
    </>
  );
}
