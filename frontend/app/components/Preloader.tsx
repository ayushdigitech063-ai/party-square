"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, PartyPopper } from "lucide-react";
import { useCity } from "../context/CityContext";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const { setPreloaderFinished } = useCity();

  useEffect(() => {
    // Only show preloader on initial page load / session
    const timer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        setLoading(false);
        setPreloaderFinished(true);
      }, 600); // 600ms fade transition
    }, 1800); // display for ~1.8 seconds

    return () => clearTimeout(timer);
  }, [setPreloaderFinished]);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FFFDF9] transition-opacity duration-600 select-none ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Soft Glow Circles */}
      <div className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-amber-200/35 via-orange-100/25 to-amber-50/15 blur-2xl pointer-events-none animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center scale-90 sm:scale-100">
        
        {/* Animated Jumping Floating Icons above Brand Name - Compact */}
        <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 h-10">
          
          {/* Icon 1: Party Hat / Cone */}
          <div
            className="w-8 h-8 rounded-xl bg-[#FFF3DC] border border-amber-300/80 shadow-xs flex items-center justify-center animate-bounce text-amber-600"
            style={{
              animationDuration: "0.85s",
              animationDelay: "0s",
              animationIterationCount: "infinite"
            }}
          >
            <PartyPopper size={15} className="rotate-[-20deg]" />
          </div>

          {/* Icon 2: Center Party Square Favicon */}
          <div
            className="w-10 h-10 rounded-xl bg-white border border-amber-300 shadow-md flex items-center justify-center p-1 animate-bounce"
            style={{
              animationDuration: "0.85s",
              animationDelay: "0.15s",
              animationIterationCount: "infinite"
            }}
          >
            <img src="/favicon.webp" alt="PS" className="w-full h-full object-contain" />
          </div>

          {/* Icon 3: Balloon / Party Cone */}
          <div
            className="w-8 h-8 rounded-xl bg-[#FFF3DC] border border-amber-300/80 shadow-xs flex items-center justify-center animate-bounce text-amber-600"
            style={{
              animationDuration: "0.85s",
              animationDelay: "0.3s",
              animationIterationCount: "infinite"
            }}
          >
            <PartyPopper size={15} className="rotate-[20deg]" />
          </div>
        </div>

        {/* Brand Name "PARTY SQUARE" - Refined & Compact */}
        <div className="text-center mt-1">
          <div className="flex items-center justify-center gap-1.5 font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#182033]">
            <span>PARTY</span>
            <span className="text-[#F5A000] relative">
              SQUARE
              <Sparkles
                size={13}
                className="absolute -top-2 -right-3.5 text-amber-500 animate-spin"
                style={{ animationDuration: "3s" }}
              />
            </span>
          </div>

          <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-neutral-400 mt-1 font-sans">
            Celebrations &amp; Decor
          </p>
        </div>

        {/* Elegant Loading Progress Bar - Slim & Short */}
        <div className="w-32 sm:w-36 h-1 bg-neutral-100 rounded-full mt-4 overflow-hidden border border-neutral-200/50">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-[#F5A000] to-orange-500 rounded-full"
            style={{
              width: "100%",
              transformOrigin: "left",
              animation: "preloader-progress 1.4s ease-in-out infinite"
            }}
          />
        </div>

      </div>

      {/* Embedded CSS for smooth progress animation */}
      <style jsx>{`
        @keyframes preloader-progress {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
