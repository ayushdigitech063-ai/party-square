"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export default function ProgressBanner() {
  return (
    <div className="relative bg-[#0B0B0B] text-white font-sans overflow-hidden">
      
      {/* Full Screen / Full Width Video Section */}
      <section className="relative w-full h-[80vh] sm:h-[90vh] lg:h-screen overflow-hidden">
        <video
          src="/party-viedo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-black/50" />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Optional Aesthetic Overlay Content on Video */}
        <div className="absolute bottom-12 left-6 md:left-16 z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-4 py-1.5 rounded-full text-amber-300 text-xs uppercase tracking-[0.3em] backdrop-blur-md shadow-lg">
            <Sparkles size={14} />
            <span>Exclusive Moments</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-wide text-white drop-shadow-lg">
            Where Elegance <span className="italic font-normal text-amber-300">Meets Perfection</span>
          </h1>
        </div>

      </section>

    </div>
  );
}