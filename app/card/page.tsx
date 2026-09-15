"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Calendar, Heart } from "lucide-react";

const bannerData = [
  {
    id: 1,
    title: "Romantic Anniversary",
    highlight: "Milestones",
    subtitle: "TIMELESS ROMANCE",
    description: "Celebrate years of togetherness with our enchanting setup. Featuring soft lighting, custom floral arrangements, and breathtaking aesthetics.",
    image: "/aniversarry4.png",
    tag: "Special Couple Offer",
  },
  {
    id: 2,
    title: "Joyful Kids Birthday",
    highlight: "Celebrations",
    subtitle: "MAGICAL MOMENTS",
    description: "Bring endless smiles to your little ones with whimsical balloon arches, cartoon themes, and vibrant party decorations.",
    image: "/childbirthday3.png",
    tag: "Most Popular for Kids",
  },
  {
    id: 3,
    title: "Grand New Year",
    highlight: "Party Bash",
    subtitle: "WELCOME THE FUTURE",
    description: "Ring in the new year with glittering golden decor, ambient lighting, and luxurious party setups designed to amaze your guests.",
    image: "/newyearcelebrate.png",
    tag: "Festive Exclusive",
  },
  {
    id: 4,
    title: "Intimate Candlelight",
    highlight: "Dinner Setup",
    subtitle: "COZY & DREAMY",
    description: "Create unforgettable romantic memories with a private setup surrounded by hundreds of candles, rose petals, and soulful ambiance.",
    image: "/candellightdinnerdecoration.png",
    tag: "Romantic Date Night",
  },
];

export default function AestheticBannerPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerData.length);
    },  8000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentItem = bannerData[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + bannerData.length) % bannerData.length);
  };

  return (
    <section 
      className="bg-[#FAF7F2] py-20 px-6 md:px-16 text-[#1A1A1A] font-sans relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Soft Golden Background Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-amber-200/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-300/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">
          
          {/* Left Side: Dynamic Content (6 Columns) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Golden Badge */}
              <div className="inline-flex items-center space-x-2 bg-amber-100/80 border border-amber-300/60 px-4 py-1.5 rounded-full shadow-sm">
                <Sparkles size={14} className="text-amber-700" />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-900">
                  {currentItem.subtitle}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h2 className="text-4xl sm:text-5xl font-serif font-normal leading-[1.15] text-gray-900">
                  {currentItem.title} <br />
                  <span className="italic font-light text-amber-800">{currentItem.highlight}</span>
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light pt-2">
                  {currentItem.description}
                </p>
              </div>

              {/* Tag & Info */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-amber-800 shadow-sm">
                  {currentItem.tag}
                </span>
                <span className="text-xs text-gray-500 flex items-center space-x-1.5 font-medium">
                  <Calendar size={13} className="text-amber-700" /> 
                  <span>Bookings Open 24/7</span>
                </span>
              </div>
            </div>

            {/* CTA Buttons & Pagination */}
            <div className="space-y-6 pt-6 border-t border-amber-200/60">
              <div className="flex flex-wrap items-center gap-4">
                <button className="bg-black hover:bg-amber-900 text-white px-7 py-3.5 rounded-full font-medium text-sm flex items-center space-x-3 transition shadow-lg">
                  <span>Book This Theme</span>
                  <ArrowRight size={16} />
                </button>
                <button className="border border-amber-300 hover:border-amber-500 text-amber-900 px-6 py-3.5 rounded-full font-medium text-sm transition bg-amber-50/50 hover:bg-amber-100/50">
                  Explore Gallery
                </button>
              </div>

              {/* Counter & Arrows */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 font-mono text-amber-900">
                  <span className="text-lg font-bold">0{currentIndex + 1}</span>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-500">0{bannerData.length}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full border border-amber-300 flex items-center justify-center text-amber-900 hover:bg-amber-900 hover:text-white hover:border-amber-900 transition shadow-sm bg-white"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full border border-amber-300 flex items-center justify-center text-amber-900 hover:bg-amber-900 hover:text-white hover:border-amber-900 transition shadow-sm bg-white"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Clean Full Image Showcase without Card Container (6 Columns) */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-amber-50">
              <img
                key={currentItem.image}
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-all duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Floating Bottom Info on Image */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between bg-white/9য়ন backdrop-blur-md px-5 py-3.5 rounded-2xl border border-amber-200/60 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold text-xs shadow">
                    ★
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 tracking-wide">{currentItem.title}</p>
                    <p className="text-[11px] text-amber-800 font-medium">Customized Aesthetic Decor</p>
                  </div>
                </div>
                <Heart size={18} className="text-rose-500 fill-rose-500 animate-pulse" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}