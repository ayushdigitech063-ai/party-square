"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Lock scroll when loading
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setFade(true); // Start fading out
      
      setTimeout(() => {
        setLoading(false); // Remove from DOM after fade
        document.body.style.overflow = ""; // Restore scroll
      }, 500); // Matches the CSS transition duration
      
    }, 1200); // 1.2 seconds preloader display time

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#FCFBF7] flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer Ring */}
        <div className="w-20 h-20 rounded-full border-[3px] border-[#EEF6EB] border-t-[#8CBC67] animate-spin"></div>
        
        {/* Inner Heart/Star/Dot (Pulsing) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-[#F7D6C7] rounded-full animate-pulse"></div>
        </div>
      </div>

      <p className="mt-6 text-[#202522] font-serif font-extrabold text-xl tracking-[0.2em] animate-pulse">
        PARTY <span className="text-[#8CBC67]">SQUARE</span>
      </p>
    </div>
  );
}
