
"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { API_URL } from "@/config";

const fallbackSlides = [
  {
    image: "/homepage.png",
    subtitle: "PREMIUM EVENT DECORATION SERVICES",
    titleFirst: "Turning Your Dreams Into",
    titleItalic: "Beautiful Realities",
    description: "From intimate gatherings to grand celebrations, we create stunning decor experiences that make your special moments unforgettable.",
    buttonText: "Explore Our Services",
    buttonLink: "/decorations"
  },
  {
    image: "/diwalidecoration.png",
    subtitle: "FESTIVE LIGHTING & DECOR",
    titleFirst: "Illuminate Your",
    titleItalic: "Festive Celebrations",
    description: "Bring home the warmth and radiance with our bespoke Diwali decoration and traditional lighting designs.",
    buttonText: "Explore Our Services",
    buttonLink: "/decorations"
  },
  {
    image: "/ganeshchaturthi.png",
    subtitle: "DIVINE MANDAP SETUP",
    titleFirst: "Welcome Bappa With",
    titleItalic: "Exquisite Mandaps",
    description: "Grand floral arrangements and elegant backdrops crafted specially for Ganesh Chaturthi celebrations.",
    buttonText: "Explore Our Services",
    buttonLink: "/decorations"
  }
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState(fallbackSlides);

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/homepage`);
        if (res.ok) {
          const data = await res.json();
          const heroSection = data.sections?.find((s: any) => s.sectionKey === 'hero_banner');
          if (heroSection && heroSection.contentData?.banners?.length > 0) {
            const apiSlides = heroSection.contentData.banners.map((banner: any) => ({
              image: banner.backgroundImage || fallbackSlides[0].image,
              subtitle: "PREMIUM EVENT DECORATION SERVICES",
              titleFirst: banner.headline,
              titleItalic: "",
              description: banner.subheadline,
              buttonText: banner.buttonText || "Explore Our Services",
              buttonLink: banner.buttonLink || "/decorations"
            }));
            setSlides(apiSlides);
          }
        }
      } catch (error) {
        console.error("Error fetching hero banners:", error);
      }
    };
    fetchHomePageData();
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

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
      <div className="max-w-[1900px] mx-auto p-3 sm:p-4 md:p-6">
        <div className="relative w-full h-[550px] sm:h-[600px] md:h-[650px] rounded-[24px] md:rounded-[28px] overflow-hidden text-white shadow-xl">

          {/* Background Image with Lighter Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              key={currentSlide.image}
              src={currentSlide.image}
              alt="Decoration Background"
              className="w-full h-full object-cover transition-all duration-1000 ease-in-out scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
          </div>

          {/* Hero Content */}
          <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-10 md:px-14">
            <div className="max-w-xl mt-4 sm:mt-0">
              <p className="text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] text-amber-400 font-bold mb-3 sm:mb-4 uppercase">
                {currentSlide.subtitle}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.15] mb-4 sm:mb-6">
                {currentSlide.titleFirst} <br />
                {currentSlide.titleItalic && <span className="font-bold text-amber-300">{currentSlide.titleItalic}</span>}
              </h1>
              <p className="text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8 max-w-sm sm:max-w-md">
                {currentSlide.description}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <Link href={currentSlide.buttonLink}>
                  <button className="bg-amber-300 text-black px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm flex items-center space-x-2 sm:space-x-3 hover:bg-amber-400 transition shadow-md cursor-pointer w-full sm:w-auto justify-center">
                    <span>{currentSlide.buttonText}</span>
                    <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                </Link>
                <button className="flex items-center space-x-3 text-white group cursor-pointer w-full sm:w-auto">
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/40 flex items-center justify-center group-hover:border-amber-400 group-hover:bg-amber-400/10 transition">
                    <Play size={12} className="fill-white ml-0.5 sm:w-[14px] sm:h-[14px]" />
                  </span>
                  <span className="text-xs sm:text-sm font-medium tracking-wide">Watch Our Story</span>
                </button>
              </div>
            </div>
          </div>

          {/* Floating side arrows - Hidden on small mobile, visible on sm and up */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="hidden sm:flex absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/90 text-neutral-800 items-center justify-center hover:bg-white transition shadow-md cursor-pointer"
          >
            <ChevronLeft size={18} className="md:w-5 md:h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="hidden sm:flex absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/90 text-neutral-800 items-center justify-center hover:bg-white transition shadow-md cursor-pointer"
          >
            <ChevronRight size={18} className="md:w-5 md:h-5" />
          </button>

          {/* Dot pagination */}
          <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 bg-black/30 backdrop-blur-sm px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? "w-5 sm:w-6 bg-amber-400" : "w-1.5 sm:w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}