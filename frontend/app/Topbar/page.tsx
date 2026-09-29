"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/homepage.png",
    subtitle: "PREMIUM EVENT DECORATION SERVICES",
    titleFirst: "Turning Your Dreams Into",
    titleItalic: "Beautiful Realities",
    description: "From intimate gatherings to grand celebrations, we create stunning decor experiences that make your special moments unforgettable.",
    category: "Weddings",
  },
  {
    image: "/diwalidecoration.png",
    subtitle: "FESTIVE LIGHTING & DECOR",
    titleFirst: "Illuminate Your",
    titleItalic: "Festive Celebrations",
    description: "Bring home the warmth and radiance with our bespoke Diwali decoration and traditional lighting designs.",
    category: "Diwali",
  },
  {
    image: "/ganeshchaturthi.png",
    subtitle: "DIVINE MANDAP SETUP",
    titleFirst: "Welcome Bappa With",
    titleItalic: "Exquisite Mandaps",
    description: "Grand floral arrangements and elegant backdrops crafted specially for Ganesh Chaturthi celebrations.",
    category: "Ganesh Chaturthi",
  },
  {
    image: "/marriageaniversary.png",
    subtitle: "ROMANTIC MILESTONES",
    titleFirst: "Celebrate Love With",
    titleItalic: "Timeless Elegance",
    description: "Recreate the magic of your special day with romantic candlelights, floral arches, and customized themes.",
    category: "Anniversary",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="w-full min-h-screen bg-[#F3EFE9] font-sans text-neutral-900 selection:bg-amber-400 selection:text-black">

      {/* ================= HERO SECTION CARD ================= */}
      <div className="max-w-[1900px] mx-auto p-4 sm:p-6">
        <div className="relative w-full h-[650px] rounded-[28px] overflow-hidden text-white shadow-xl">

          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              key={currentSlide.image}
              src={currentSlide.image}
              alt="Decoration Background"
              className="w-full h-full object-cover transition-all duration-1000 ease-in-out scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
          </div>

          {/* Hero Content */}
          <div className="relative z-20 h-full flex flex-col justify-center px-8 sm:px-14">
            <div className="max-w-xl">
              <p className="text-xs tracking-[0.2em] text-amber-400 font-semibold mb-4 uppercase">
                {currentSlide.subtitle}
              </p>
              <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">
                {currentSlide.titleFirst} <br />
                <span className="font-bold text-amber-300">{currentSlide.titleItalic}</span>
              </h1>
              <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                {currentSlide.description}
              </p>

              <div className="flex items-center space-x-6">
                <button className="bg-amber-300 text-black px-7 py-3.5 rounded-full font-semibold text-sm flex items-center space-x-3 hover:bg-amber-400 transition shadow-md cursor-pointer">
                  <span>Explore Our Services</span>
                  <ArrowRight size={18} />
                </button>
                <button className="flex items-center space-x-3 text-white group cursor-pointer">
                  <span className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center group-hover:border-amber-400 group-hover:bg-amber-400/10 transition">
                    <Play size={14} className="fill-white ml-0.5" />
                  </span>
                  <span className="text-sm font-medium tracking-wide">Watch Our Story</span>
                </button>
              </div>
            </div>
          </div>

          {/* Floating side arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 text-neutral-800 flex items-center justify-center hover:bg-white transition shadow-md cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 text-neutral-800 flex items-center justify-center hover:bg-white transition shadow-md cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dot pagination */}
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? "w-6 bg-amber-400" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}