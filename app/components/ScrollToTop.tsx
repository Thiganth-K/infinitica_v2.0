"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          className="fixed bottom-10 right-10 z-[1000]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 bg-[#6A3FD6] text-white p-4 rounded-full shadow-[0_0_30px_rgba(106,63,214,0.4)] hover:shadow-[0_0_50px_rgba(106,63,214,0.6)] transition-all duration-500 ease-out group overflow-hidden"
            style={{
              width: isHovered ? 'auto' : '56px',
              paddingLeft: isHovered ? '24px' : '16px',
              paddingRight: isHovered ? '24px' : '16px',
            }}
          >
            <ArrowUp 
              size={24} 
              className={`transition-transform duration-500 ${isHovered ? 'rotate-0' : ''}`}
            />
            
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="whitespace-nowrap font-bold text-sm tracking-widest uppercase"
                >
                  Click to top
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
