"use client";

import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Brain,
  Box,
  Zap,
  Activity,
  Cpu,
  Server,
  TrendingUp,
  CheckCircle2,
  ChevronDown,
  Grid,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Mini Sparkline Component
function Sparkline({ data, color = "#8B5CF6", height = 20, width = 70 }: { data: number[]; color?: string; height?: number; width?: number }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

// Canvas Neural Particle Infinity Core with Holographic Pedestal Grid
function NeuralInfinityCore() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse tracking
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // High Density Ribbon Particles (450 Particles)
    const ribbonParticleCount = 380;
    const freeParticleCount = 70;

    interface Particle {
      t?: number;
      speed?: number;
      offsetRadius?: number;
      offsetAngle?: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseAlpha: number;
      alpha: number;
      pulse: number;
      color: string;
      isInfinityNode: boolean;
    }

    const particles: Particle[] = [];

    const colors = [
      "rgba(255, 255, 255,",
      "rgba(216, 180, 254,",
      "rgba(192, 132, 252,",
      "rgba(147, 51, 234,",
      "rgba(126, 34, 206,",
    ];

    // Create Dense Ribbon Particles along Lemniscate
    for (let i = 0; i < ribbonParticleCount; i++) {
      const t = (i / ribbonParticleCount) * Math.PI * 2;
      particles.push({
        t,
        speed: 0.001 + Math.random() * 0.0016,
        offsetRadius: (Math.random() - 0.5) * 28,
        offsetAngle: Math.random() * Math.PI * 2,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: 0.8 + Math.random() * 2.2,
        baseAlpha: 0.35 + Math.random() * 0.55,
        alpha: 0.6,
        pulse: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        isInfinityNode: true,
      });
    }

    // Ambient Floating Neural Particles
    for (let i = 0; i < freeParticleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 0.8 + Math.random() * 1.5,
        baseAlpha: 0.15 + Math.random() * 0.35,
        alpha: 0.3,
        pulse: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        isInfinityNode: false,
      });
    }

    // Glowing Data Stream Pulses
    const pulses = [
      { t: 0, speed: 0.006, color: "rgba(255, 255, 255, 0.95)" },
      { t: Math.PI * 0.65, speed: 0.005, color: "rgba(216, 180, 254, 0.9)" },
      { t: Math.PI * 1.35, speed: 0.0055, color: "rgba(168, 85, 247, 0.95)" },
    ];

    // Asymmetric Infinity Loop Point Calculation
    const getInfinityPoint = (tVal: number, w: number, h: number) => {
      const isDesktop = w >= 1024;
      const baseScale = Math.min(w, h) * (isDesktop ? 0.36 : 0.28);
      const sinT = Math.sin(tVal);
      const cosT = Math.cos(tVal);
      const denom = 1 + sinT * sinT;

      const centerX = isDesktop ? w * 0.68 : w / 2;
      const centerY = isDesktop ? h * 0.42 : h * 0.40;

      // Left loop smaller (0.62x), Right loop larger (1.38x)
      const lobeFactor = cosT >= 0 ? 1.38 : 0.62;
      const scale = baseScale * lobeFactor;

      const x = (scale * cosT) / denom + centerX;
      const y = (scale * sinT * cosT) / denom + centerY;
      return { x, y };
    };

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const isDesktop = width >= 1024;
      const pedX = isDesktop ? width * 0.68 : width / 2;
      const pedY = isDesktop ? height * 0.72 : height * 0.68;

      // Render Cybernetic Holographic Pedestal Grid under Infinity Core
      ctx.save();
      ctx.translate(pedX, pedY);

      // Concentric Glowing Rings
      [90, 65, 42, 22].forEach((radius, idx) => {
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * 1.8, radius * 0.5, 0, 0, Math.PI * 2);
        ctx.strokeStyle = idx === 0 ? "rgba(147, 51, 234, 0.2)" : `rgba(168, 85, 247, ${0.15 + idx * 0.08})`;
        ctx.lineWidth = 1 + idx * 0.5;
        ctx.stroke();
      });

      // Pedestal Core Glow Ring
      ctx.beginPath();
      ctx.ellipse(0, 0, 10, 3, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(236, 72, 153, 0.8)";
      ctx.fill();

      // Vertical Light Beam upwards
      const beamGrad = ctx.createLinearGradient(0, 0, 0, -180);
      beamGrad.addColorStop(0, "rgba(168, 85, 247, 0.35)");
      beamGrad.addColorStop(0.5, "rgba(147, 51, 234, 0.12)");
      beamGrad.addColorStop(1, "rgba(3, 3, 5, 0)");

      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(-50, 0);
      ctx.lineTo(50, 0);
      ctx.lineTo(120, -180);
      ctx.lineTo(-120, -180);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // Update Particles
      particles.forEach((p) => {
        p.pulse += 0.02;

        if (p.isInfinityNode && p.t !== undefined && p.speed !== undefined) {
          if (!prefersReducedMotion) {
            p.t += p.speed;
          }
          const pos = getInfinityPoint(p.t, width, height);

          const offX = Math.cos(p.offsetAngle! + p.pulse * 0.5) * p.offsetRadius!;
          const offY = Math.sin(p.offsetAngle! + p.pulse * 0.5) * p.offsetRadius!;

          p.x = pos.x + offX;
          p.y = pos.y + offY;
        } else {
          if (!prefersReducedMotion) {
            p.x += p.vx;
            p.y += p.vy;
          }

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150 && mouse.active) {
          const factor = 1 - dist / 150;
          p.alpha = Math.min(1, p.baseAlpha + factor * 0.55);
        } else {
          p.alpha = p.baseAlpha + Math.sin(p.pulse) * 0.12;
        }
      });

      // Proximity Neural Lines
      const maxConnectDist = 85;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.2 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const p = particles[i];
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(216, 180, 254, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Draw Data Pulses
      if (!prefersReducedMotion) {
        pulses.forEach((pulse) => {
          pulse.t += pulse.speed;
          const pos = getInfinityPoint(pulse.t, width, height);

          const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 35);
          gradient.addColorStop(0, "rgba(168, 85, 247, 0.5)");
          gradient.addColorStop(0.5, "rgba(126, 34, 206, 0.18)");
          gradient.addColorStop(1, "rgba(3, 3, 5, 0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 35, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = pulse.color;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 3.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Render Dense Luminous Particle Ribbon
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        if (p.isInfinityNode) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(168, 85, 247, 0.85)";
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0 opacity-90"
    />
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  // Live Updating Metrics
  const [dataFlow, setDataFlow] = useState(8.6);
  const [activeNodes, setActiveNodes] = useState(12842);
  const [latency, setLatency] = useState(18);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataFlow((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
      setActiveNodes((prev) => prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3));
      setLatency((prev) => Math.min(22, Math.max(15, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        leftColRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, delay: 0.2 }
      )
        .fromTo(
          rightColRef.current,
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.3 },
          "-=0.9"
        )
        .fromTo(
          bottomBarRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0 },
          "-=0.8"
        );

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      gsap.to([leftColRef.current, rightColRef.current, bottomBarRef.current], {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        scale: 0.94,
        opacity: 0.15,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (targetId: string) => {
    const el = document.querySelector(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative z-0 min-h-screen flex flex-col justify-between bg-[#030305] overflow-hidden select-none pt-28 pb-4 px-4 sm:px-8 lg:px-12"
    >
      {/* Background Atmosphere Glows */}
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] bg-[#6A3FD6] opacity-18 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#1A0047] opacity-30 blur-[150px] rounded-full pointer-events-none" />

      {/* Interactive Particle Infinity Core Canvas */}
      <NeuralInfinityCore />

      {/* Main Grid Layout Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
        
        {/* LEFT COLUMN */}
        <div ref={leftColRef} className="lg:col-span-6 flex flex-col items-start text-left">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-[0.25em] text-[#C4A7F7] uppercase mb-4">
            <span className="w-6 h-[1.5px] bg-[#8B5CF6]"></span>
            <span>INTELLIGENCE, ENGINEERED.</span>
          </div>

          {/* Title */}
          <h1 className="text-6xl sm:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] font-extrabold tracking-tighter leading-[0.85] text-white uppercase select-none font-sans drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
            Infinitica<span className="text-[#8B5CF6] drop-shadow-[0_0_30px_rgba(139,92,246,0.9)]">.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg font-light text-[#C4A7F7]/85 leading-relaxed max-w-lg text-balance">
            Architecting neural ecosystems for the next generation of intelligent enterprise logic.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => scrollToSection("#hiresapien")}
              className="px-7 py-3.5 bg-gradient-to-r from-[#5B21B6] via-[#7C3AED] to-[#8B5CF6] hover:from-[#6D28D9] hover:to-[#A855F7] text-white font-semibold rounded-full text-sm sm:text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_35px_rgba(139,92,246,0.4)] hover:shadow-[0_0_55px_rgba(139,92,246,0.7)] hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <span>ENTER THE ECOSYSTEM</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection("#use-cases")}
              className="px-7 py-3.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/15 hover:border-white/30 text-white font-medium rounded-full text-sm sm:text-base flex items-center justify-center gap-3 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <span>EXPLORE SYSTEMS</span>
              <Grid className="w-4 h-4 text-[#C4A7F7]" />
            </button>
          </div>

          {/* Inline Capability Items */}
          <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {/* Item 1 */}
            <div className="flex items-start gap-2.5">
              <Brain className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white tracking-wider uppercase">NEURAL INTELLIGENCE</div>
                <div className="text-[11px] font-mono text-[#C4A7F7]/65 mt-0.5">Adaptive. Predictive. Scalable.</div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-2.5">
              <Box className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white tracking-wider uppercase">ENTERPRISE READY</div>
                <div className="text-[11px] font-mono text-[#C4A7F7]/65 mt-0.5">Secure. Reliable. Compliant.</div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white tracking-wider uppercase">REAL-TIME BY DESIGN</div>
                <div className="text-[11px] font-mono text-[#C4A7F7]/65 mt-0.5">Low latency. High impact.</div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Floating System Cards */}
        <div ref={rightColRef} className="lg:col-span-6 relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
          
          {/* Card 1: DATA FLOW */}
          <div className="absolute top-2 left-2 sm:left-6 p-3.5 rounded-xl bg-[#090514]/80 border border-[#8B5CF6]/30 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-[#8B5CF6] transition-all duration-300 hover:scale-105 z-10 w-44">
            <div className="flex items-center justify-between text-[10px] font-mono font-semibold tracking-wider text-white/50 uppercase mb-1">
              <span>DATA FLOW</span>
            </div>
            <div className="text-lg font-bold font-mono text-white mb-1">{dataFlow} <span className="text-xs font-normal text-[#C4A7F7]">Tb/s</span></div>
            <Sparkline data={[6.2, 7.1, 7.8, 8.2, 8.4, dataFlow]} color="#A855F7" height={16} width={130} />
          </div>

          {/* Card 2: NEURAL NODES */}
          <div className="absolute top-8 right-2 sm:right-4 p-3.5 rounded-xl bg-[#090514]/80 border border-[#8B5CF6]/30 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-[#8B5CF6] transition-all duration-300 hover:scale-105 z-10 w-48">
            <div className="flex items-center justify-between text-[10px] font-mono font-semibold tracking-wider text-white/50 uppercase mb-1">
              <span>NEURAL NODES</span>
              <Cpu className="w-3.5 h-3.5 text-[#C4A7F7]" />
            </div>
            <div className="text-lg font-bold font-mono text-white mb-1">{activeNodes.toLocaleString()} <span className="text-xs font-normal text-emerald-400">Active</span></div>
            <Sparkline data={[11500, 12000, 12400, 12700, activeNodes]} color="#8B5CF6" height={16} width={150} />
          </div>

          {/* Card 3: SYSTEM HEALTH */}
          <div className="absolute bottom-16 left-4 sm:left-10 p-3.5 rounded-xl bg-[#090514]/80 border border-[#8B5CF6]/30 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-[#8B5CF6] transition-all duration-300 hover:scale-105 z-10 w-44">
            <div className="flex items-center justify-between text-[10px] font-mono font-semibold tracking-wider text-white/50 uppercase mb-1">
              <span>SYSTEM HEALTH</span>
            </div>
            <div className="text-base font-bold text-white flex items-center gap-2 mb-1">
              <span>Optimal</span>
            </div>
            <Sparkline data={[98, 99, 99.5, 100, 100]} color="#10B981" height={16} width={130} />
          </div>

          {/* Card 4: LATENCY */}
          <div className="absolute bottom-6 right-4 sm:right-8 p-3.5 rounded-xl bg-[#090514]/80 border border-[#8B5CF6]/30 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-[#8B5CF6] transition-all duration-300 hover:scale-105 z-10 w-44">
            <div className="flex items-center justify-between text-[10px] font-mono font-semibold tracking-wider text-white/50 uppercase mb-1">
              <span>LATENCY</span>
            </div>
            <div className="text-lg font-bold font-mono text-white mb-1">{latency} <span className="text-xs font-normal text-[#C4A7F7]">ms</span></div>
            <Sparkline data={[24, 22, 20, 19, latency]} color="#A855F7" height={16} width={130} />
          </div>

        </div>

      </div>

      {/* BOTTOM SYSTEM STATUS PANEL */}
      <div ref={bottomBarRef} className="relative z-10 w-full max-w-7xl mx-auto mt-4">
        <div className="p-4 rounded-2xl bg-[#080412]/85 border border-[#8B5CF6]/25 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.9)] flex flex-wrap items-center justify-between gap-6">
          
          {/* Status Metrics */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs font-mono">
            {/* Metric 1 */}
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] animate-pulse" />
              <div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider">SYSTEMS ONLINE</div>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <span>248</span>
                  <span className="text-xs text-[#C4A7F7] font-normal">+12</span>
                </div>
              </div>
              <Sparkline data={[200, 215, 230, 240, 248]} color="#8B5CF6" height={18} width={60} />
            </div>

            <div className="hidden sm:block w-[1px] h-8 bg-white/10" />

            {/* Metric 2 */}
            <div className="flex items-center gap-3">
              <Box className="w-4 h-4 text-[#8B5CF6]" />
              <div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider">TASKS PROCESSED</div>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <span>3.27M</span>
                  <span className="text-xs text-[#C4A7F7] font-normal">+8.4%</span>
                </div>
              </div>
              <Sparkline data={[2.4, 2.7, 3.0, 3.2, 3.27]} color="#C4A7F7" height={18} width={60} />
            </div>

            <div className="hidden md:block w-[1px] h-8 bg-white/10" />

            {/* Metric 3 */}
            <div className="hidden md:flex items-center gap-3">
              <Activity className="w-4 h-4 text-[#8B5CF6]" />
              <div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider">ACCURACY RATE</div>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <span>99.98%</span>
                  <span className="text-[10px] text-[#C4A7F7] font-normal">+0.02%</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block w-[1px] h-8 bg-white/10" />

            {/* Metric 4 */}
            <div className="hidden lg:flex items-center gap-3">
              <Server className="w-4 h-4 text-[#8B5CF6]" />
              <div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider">UPTIME</div>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <span>99.99%</span>
                  <span className="text-[10px] text-[#C4A7F7] font-normal">+0.01%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Far Right: Cybernetic Radar Card */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3 ml-auto">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-[#8B5CF6]/50 animate-ping" />
              <span className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
            </div>
            <div className="text-left font-mono">
              <div className="text-[9px] text-white/40 uppercase tracking-widest">POWERED BY</div>
              <div className="text-xs font-bold text-white tracking-wider">INFINITICA CORE</div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Cue at Very Bottom */}
      <button
        onClick={() => scrollToSection("#philosophy")}
        className="mt-3 flex flex-col items-center justify-center gap-1 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer mx-auto"
      >
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#C4A7F7]">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-[#8B5CF6] to-transparent" />
        <ChevronDown className="w-3.5 h-3.5 text-[#C4A7F7] -mt-1 animate-bounce" />
      </button>
    </section>
  );
}


