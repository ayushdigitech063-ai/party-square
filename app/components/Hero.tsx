"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/homepage.png",
    subtitle: "Premium event decoration services",
    titleFirst: "Turning your dreams into",
    titleItalic: "beautiful realities",
    description:
      "From intimate gatherings to grand celebrations, we create stunning decor experiences that make your special moments unforgettable.",
    category: "Weddings",
  },
  {
    image: "/diwalidecoration.png",
    subtitle: "Festive lighting & decor",
    titleFirst: "Illuminate your",
    titleItalic: "festive celebrations",
    description:
      "Bring home the warmth and radiance with our bespoke Diwali decoration and traditional lighting designs.",
    category: "Diwali",
  },
  {
    image: "/ganeshchaturthi.png",
    subtitle: "Divine mandap setup",
    titleFirst: "Welcome Bappa with",
    titleItalic: "exquisite mandaps",
    description:
      "Grand floral arrangements and elegant backdrops crafted specially for Ganesh Chaturthi celebrations.",
    category: "Ganesh Chaturthi",
  },
  {
    image: "/marriageaniversary.png",
    subtitle: "Romantic milestones",
    titleFirst: "Celebrate love with",
    titleItalic: "timeless elegance",
    description:
      "Recreate the magic of your special day with romantic candlelights, floral arches, and customized themes.",
    category: "Anniversary",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-[80vh] min-h-[520px] max-h-[700px] overflow-hidden bg-black text-white font-sans flex flex-col justify-between my-4 sm:my-6 max-w-[96rem] mx-auto rounded-[35px] shadow-2xl">
      {/* Background image + overlay, sits behind everything */}
      <div className="absolute inset-0 z-0">
        <img
          key={currentSlide.image}
          src={currentSlide.image}
          alt=""
          className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/95 via-black/75 to-black/40" />
      </div>

      {/* Main container */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pt-12 pb-6">
        
        {/* Spacer */}
        <div className="shrink-0" />

        {/* Main content */}
        <div className="flex-1 flex items-center min-h-0 my-auto py-2">
          <div className="max-w-2xl w-full space-y-4">
            <p className="text-[10px] sm:text-xs tracking-[0.2em] text-amber-400 font-bold uppercase">
              {currentSlide.subtitle}
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light leading-[1.12]">
              {currentSlide.titleFirst} <br />
              <span className="italic font-normal text-amber-100">
                {currentSlide.titleItalic}
              </span>
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-lg font-light">
              {currentSlide.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="bg-amber-200 text-black px-6 sm:px-7 py-3 rounded-full font-medium text-xs sm:text-sm flex items-center space-x-2 hover:bg-amber-300 transition shadow-xl cursor-pointer">
                <span>Explore our services</span>
                <ArrowRight size={16} />
              </button>
              <button className="flex items-center space-x-3 text-white group cursor-pointer">
                <span className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center group-hover:border-amber-400 group-hover:bg-amber-400/10 transition">
                  <Play size={13} className="fill-white ml-0.5" />
                </span>
                <span className="text-xs sm:text-sm font-medium tracking-wide">Watch our story</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="shrink-0 flex items-center justify-between border-t border-white/10 pt-4 pb-2">
          <span className="text-xs sm:text-sm tracking-widest text-amber-200 font-mono">
            {String(currentIndex + 1).padStart(2, "0")}{" "}
            <span className="text-gray-500">/ {String(slides.length).padStart(2, "0")}</span>
          </span>
          <div className="flex items-center space-x-3">
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
              }
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition text-white cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition text-white cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}