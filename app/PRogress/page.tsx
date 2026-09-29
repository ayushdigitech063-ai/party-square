"use client";

import React, { useRef } from "react";
import { Sparkles, Crown, Flower2, Sparkle, Palette } from "lucide-react";

export default function ProgressBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative bg-[#FAF7F2] py-20 px-6 md:px-16 overflow-hidden border-y border-amber-200/80">
      
      {/* Background Animated Gradient Glow (Halka sa lehrata hua Red + Yellow effect) */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-red-500/20 via-amber-500/30 to-yellow-400/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-red-400/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-amber-300/60 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-amber-200/90 border border-amber-400 px-3.5 py-1 rounded-full text-xs font-bold text-amber-950 shadow-sm">
              <Sparkles size={13} className="text-amber-900" />
              <span>LIVE SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-950">
              Behind the <span className="italic font-normal text-amber-800">Decor Artistry</span>
            </h2>
            <p className="text-neutral-700 text-sm font-medium leading-relaxed">
              Experience the craftsmanship, lighting setups, and grand stage installations created by our core event team.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-950 bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-300">
              Interactive Preview
            </span>
          </div>
        </div>

        {/* Main Layout: Video (7 Cols) + Cards with Light Green Background (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Clean Video Player (Controls Removed completely) */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-300/80 bg-neutral-950 group min-h-[420px] lg:min-h-[500px]">
            <video
              ref={videoRef}
              src="/party-viedo.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/30 pointer-events-none" />

            {/* Video Live Badge */}
            <div className="absolute top-6 left-6 z-20 bg-neutral-950/80 border border-amber-400/50 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-amber-300 shadow-lg flex items-center space-x-2">
              <Sparkle size={14} className="text-amber-400 animate-pulse" />
              <span>Real Event Footage</span>
            </div>
          </div>

          {/* Right Side: Cards with Ekdum Halka Sa Green Background */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Card 1 */}
            <div className="relative bg-[#F2F8F4] text-neutral-900 rounded-3xl p-6 border border-emerald-600/30 shadow-xl overflow-hidden group hover:border-emerald-500 hover:-translate-y-1 transition duration-300">
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-300 to-emerald-600 opacity-80" />
              
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-600/30 flex items-center justify-center text-emerald-800 shrink-0 shadow-inner">
                    <Crown size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800/80">Feature 01</span>
                    <h3 className="text-lg font-serif font-bold text-neutral-950 group-hover:text-emerald-900 transition">
                      Royal Mandap & Stage Sets
                    </h3>
                  </div>
                </div>
                <span className="text-2xl font-serif italic text-emerald-900/20 group-hover:text-emerald-800/40 transition">01</span>
              </div>

              <p className="text-neutral-700 text-xs font-medium leading-relaxed mt-3 pl-13">
                Intricate stage backdrops designed with imported fresh flora, crystal chandeliers, and customized theme drapes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative bg-[#F2F8F4] text-neutral-900 rounded-3xl p-6 border border-emerald-600/30 shadow-xl overflow-hidden group hover:border-emerald-500 hover:-translate-y-1 transition duration-300">
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-300 to-emerald-600 opacity-80" />

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-600/30 flex items-center justify-center text-emerald-800 shrink-0 shadow-inner">
                    <Flower2 size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800/80">Feature 02</span>
                    <h3 className="text-lg font-serif font-bold text-neutral-950 group-hover:text-emerald-900 transition">
                      Custom Floral & Candle Aisles
                    </h3>
                  </div>
                </div>
                <span className="text-2xl font-serif italic text-emerald-900/20 group-hover:text-emerald-800/40 transition">02</span>
              </div>

              <p className="text-neutral-700 text-xs font-medium leading-relaxed mt-3 pl-13">
                Atmospheric aisle walkways lined with fairy lights, candle pillars, and scented exotic blooms.
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative bg-[#F2F8F4] text-neutral-900 rounded-3xl p-6 border border-emerald-600/30 shadow-xl overflow-hidden group hover:border-emerald-500 hover:-translate-y-1 transition duration-300">
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-300 to-emerald-600 opacity-80" />

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-600/30 flex items-center justify-center text-emerald-800 shrink-0 shadow-inner">
                    <Palette size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800/80">Feature 03</span>
                    <h3 className="text-lg font-serif font-bold text-neutral-950 group-hover:text-emerald-900 transition">
                      Bespoke Palette & Moodboards
                    </h3>
                  </div>
                </div>
                <span className="text-2xl font-serif italic text-emerald-900/20 group-hover:text-emerald-800/40 transition">03</span>
              </div>

              <p className="text-neutral-700 text-xs font-medium leading-relaxed mt-3 pl-13">
                Tailored 3D design previews before execution to ensure every color palette matches your vision.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}