"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import MostLovedDecor from "../MostLovedDecor/page";
import { fetchHomePageSection } from "../lib/api";

interface HeroSlide {
  id?: number | string;
  image: string;
  subtitle: string;
  titleFirst: string;
  titleItalic: string;
  description: string;
  category?: string;
  buttonText?: string;
  buttonLink?: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    image: "/homepage.png",
    subtitle: "PREMIUM EVENT DECORATION SERVICES",
    titleFirst: "Turning Your Dreams Into",
    titleItalic: "Beautiful Realities",
    description: "From intimate gatherings to grand celebrations, we create stunning decor experiences that make your special moments unforgettable.",
    category: "Weddings",
    buttonText: "Explore Our Services",
    buttonLink: "/services",
  },
  {
    image: "/diwalidecoration.png",
    subtitle: "FESTIVE LIGHTING & DECOR",
    titleFirst: "Illuminate Your",
    titleItalic: "Festive Celebrations",
    description: "Bring home the warmth and radiance with our bespoke Diwali decoration and traditional lighting designs.",
    category: "Diwali",
    buttonText: "View Festival Setups",
    buttonLink: "/Festivals/diwali",
  },
  {
    image: "/ganeshchaturthi.png",
    subtitle: "DIVINE MANDAP SETUP",
    titleFirst: "Welcome Bappa With",
    titleItalic: "Exquisite Mandaps",
    description: "Grand floral arrangements and elegant backdrops crafted specially for Ganesh Chaturthi celebrations.",
    category: "Ganesh Chaturthi",
    buttonText: "Explore Mandap Themes",
    buttonLink: "/Festivals/ganeshchaturthi",
  },
  {
    image: "/marriageaniversary.png",
    subtitle: "ROMANTIC MILESTONES",
    titleFirst: "Celebrate Love With",
    titleItalic: "Timeless Elegance",
    description: "Recreate the magic of your special day with romantic candlelights, floral arches, and customized themes.",
    category: "Anniversary",
    buttonText: "Book Anniversary Theme",
    buttonLink: "/services/ring-decoration",
  },
];

export default function Hero() {
  const [slides, setSlides] = useState<HeroSlide[]>(DEFAULT_SLIDES);
  const [autoplaySpeed, setAutoplaySpeed] = useState<number>(5000);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch live hero banner configuration
  useEffect(() => {
    let isMounted = true;
    async function loadHero() {
      try {
        const sec = await fetchHomePageSection<{ autoplaySpeed?: number; slides?: HeroSlide[] }>("hero_banner");
        if (isMounted && sec) {
          if (typeof sec.isEnabled === "boolean") {
            setIsEnabled(sec.isEnabled);
          }
          if (sec.contentData) {
            if (sec.contentData.autoplaySpeed) {
              setAutoplaySpeed(sec.contentData.autoplaySpeed);
            }
            if (Array.isArray(sec.contentData.slides) && sec.contentData.slides.length > 0) {
              setSlides(sec.contentData.slides);
            }
          }
        }
      } catch (e) {
        // Fallback default retained
      }
    }
    loadHero();
    return () => {
      isMounted = false;
    };
  }, []);

  // Auto slide with configurable speed
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, autoplaySpeed || 5000);
    return () => clearInterval(timer);
  }, [slides.length, autoplaySpeed]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex] || slides[0] || DEFAULT_SLIDES[0];

  return (
    <div className="w-full bg-[#F3EFE9] font-sans text-[#202522] selection:bg-[#8CBC67] selection:text-black">

      {/* ================= HERO SECTION CARD ================= */}
      {isEnabled && (
        <div className="max-w-[1264px] mx-auto p-3 sm:p-4 lg:px-0">
          <div className="relative w-full h-[260px] sm:h-[280px] md:h-[301px] rounded-[20px] sm:rounded-[24px] overflow-hidden text-white shadow-xl flex flex-col justify-center">

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                key={currentSlide.image}
                src={currentSlide.image}
                alt="Decoration Background"
                className="w-full h-full object-cover transition-all duration-1000 ease-in-out scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
            </div>

            {/* Hero Content */}
            <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-10 md:px-12 py-4 sm:py-0">
              <div className="max-w-xl">
                <p className="text-[10px] sm:text-xs tracking-[0.18em] text-[#8CBC67] font-bold mb-1.5 sm:mb-2 uppercase">
                  {currentSlide.subtitle}
                </p>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold text-white leading-tight mb-2 sm:mb-2.5">
                  <span className="text-white drop-shadow-sm">{currentSlide.titleFirst}</span> <br />
                  <span className="font-bold text-[#8CBC67]">{currentSlide.titleItalic}</span>
                </p>
                <p className="text-gray-100 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 max-w-md line-clamp-2 font-normal">
                  {currentSlide.description}
                </p>

                <div className="flex items-center gap-2.5 sm:gap-4 flex-row flex-nowrap sm:flex-wrap">
                  <Link
                    href={currentSlide.buttonLink || "/services"}
                    className="bg-[#8CBC67] hover:bg-[#7AB055] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm flex items-center space-x-1.5 sm:space-x-2 transition shadow-md cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>{currentSlide.buttonText || "Explore Our Services"}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating side arrows */}
            {slides.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="hidden sm:flex absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 text-[#202522] items-center justify-center hover:bg-white transition shadow-md cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="hidden sm:flex absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 text-[#202522] items-center justify-center hover:bg-white transition shadow-md cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Dot pagination */}
                <div className="absolute bottom-3 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        currentIndex === idx ? "w-5 bg-[#8CBC67]" : "w-1.5 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

          </div>
        </div>
      )}

      <MostLovedDecor />
    </div>
  );
}