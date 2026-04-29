"use client";

import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";

export default function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-[#6A3FD6] min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Infinitica Neural Flow Powers Enterprise Logic
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            With over 500,000 processed neural inferences per second, Infinitica is the backbone of modern AI talent intelligence.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1400&auto=format&fit=crop"
          width={500}
          height={500}
          alt="neural demo image"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl opacity-50"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-[#050505] border border-white/10">
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Zero-Trust. Zero-Latency.
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          Sentra's secure infrastructure ensures your data remains immutable and private, even in multi-cloud environments.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-[#4B1D8F] min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Scale your creative output with Zippy Mind's generative neural pipeline today.
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Generate high-fidelity, brand-consistent assets at the speed of thought. Automate the mundane, amplify the creative.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1400&auto=format&fit=crop"
          width={500}
          height={500}
          alt="creative demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl opacity-40"
        />
      </WobbleCard>
    </div>
  );
}
