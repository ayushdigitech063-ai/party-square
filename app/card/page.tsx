"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { bannerData, weddingGifts, festivalsProducts, pujaSection, estheticProducts } from "./productDetails";

export default function CardPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Refs for horizontal scrolling containers
  const weddingRef = useRef(null);
  const festivalRef = useRef(null);
  const pujaRef = useRef(null);
  const estheticRef = useRef(null);

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Auto slide every 8 seconds for banner
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="bg-[#FAF7F2] text-[#1A1A1A] font-sans min-h-screen">
      
      {/* 1. Wedding Gift Products Section */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-t border-amber-200/50">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-800 font-bold bg-amber-100 px-4 py-1.5 rounded-full inline-block">Special Collection</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">Wedding Gift Products</h2>
          <p className="text-neutral-600 text-sm font-light">Handpicked luxury presents and hampers for grand weddings and couple milestones.</p>
        </div>

        <div ref={weddingRef} className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory">
          {weddingGifts.map((item) => (
            <div key={item.id} className="min-w-[240px] sm:min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border border-amber-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group snap-start">
              <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-1">
                  <h3 className="font-serif text-sm font-bold text-neutral-900 line-clamp-1">{item.name}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed font-light line-clamp-2">{item.desc}</p>
                </div>
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-neutral-900 font-bold text-sm">{item.price}</span>
                  <Link href={`/card/${item.slug}`} className="bg-amber-800 text-white px-3.5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-900 transition shadow">
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Buttons - Centered Below Cards */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button onClick={() => scrollContainer(weddingRef, "left")} className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md">
            <ChevronLeft size={22} />
          </button>
          <button onClick={() => scrollContainer(weddingRef, "right")} className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md">
            <ChevronRight size={22} />
          </button>
        </div>
      </section>

      {/* 2. Festivals Products Section */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-t border-amber-200/50">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-800 font-bold bg-amber-100 px-4 py-1.5 rounded-full inline-block">Festive Vibes</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">Festivals Products</h2>
          <p className="text-neutral-600 text-sm font-light">Brighten up seasonal celebrations with vibrant cultural and traditional decorations.</p>
        </div>

        <div ref={festivalRef} className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory">
          {festivalsProducts.map((item) => (
            <div key={item.id} className="min-w-[240px] sm:min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border border-amber-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group snap-start">
              <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-1">
                  <h3 className="font-serif text-sm font-bold text-neutral-900 line-clamp-1">{item.name}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed font-light line-clamp-2">{item.desc}</p>
                </div>
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-neutral-900 font-bold text-sm">{item.price}</span>
                  <Link href={`/card/${item.slug}`} className="bg-amber-800 text-white px-3.5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-900 transition shadow">
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Buttons - Centered Below Cards */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button onClick={() => scrollContainer(festivalRef, "left")} className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md">
            <ChevronLeft size={22} />
          </button>
          <button onClick={() => scrollContainer(festivalRef, "right")} className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md">
            <ChevronRight size={22} />
          </button>
        </div>
      </section>

      {/* 3. Puja Section */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-t border-amber-200/50">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-800 font-bold bg-amber-100 px-4 py-1.5 rounded-full inline-block">Sacred & Devotional</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">Puja Section</h2>
          <p className="text-neutral-600 text-sm font-light">Exquisite mandaps, sacred thalis, and serene decor elements for divine prayers.</p>
        </div>

        <div ref={pujaRef} className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory">
          {pujaSection.map((item) => (
            <div key={item.id} className="min-w-[240px] sm:min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border border-amber-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group snap-start">
              <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-1">
                  <h3 className="font-serif text-sm font-bold text-neutral-900 line-clamp-1">{item.name}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed font-light line-clamp-2">{item.desc}</p>
                </div>
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-neutral-900 font-bold text-sm">{item.price}</span>
                  <Link href={`/card/${item.slug}`} className="bg-amber-800 text-white px-3.5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-900 transition shadow">
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Buttons - Centered Below Cards */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button onClick={() => scrollContainer(pujaRef, "left")} className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md">
            <ChevronLeft size={22} />
          </button>
          <button onClick={() => scrollContainer(pujaRef, "right")} className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md">
            <ChevronRight size={22} />
          </button>
        </div>
      </section>

      {/* 4. Esthetic Products Section */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-t border-amber-200/50 pb-20">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-800 font-bold bg-amber-100 px-4 py-1.5 rounded-full inline-block">Modern Elegance</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">Esthetic Products</h2>
          <p className="text-neutral-600 text-sm font-light">Minimalist and trend-setting artistic home decor accents for modern aesthetics.</p>
        </div>

        <div ref={estheticRef} className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory">
          {estheticProducts.map((item) => (
            <div key={item.id} className="min-w-[240px] sm:min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border border-amber-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group snap-start">
              <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-1">
                  <h3 className="font-serif text-sm font-bold text-neutral-900 line-clamp-1">{item.name}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed font-light line-clamp-2">{item.desc}</p>
                </div>
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-neutral-900 font-bold text-sm">{item.price}</span>
                  <Link href={`/card/${item.slug}`} className="bg-amber-800 text-white px-3.5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-900 transition shadow">
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Buttons - Centered Below Cards */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button onClick={() => scrollContainer(estheticRef, "left")} className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md">
            <ChevronLeft size={22} />
          </button>
          <button onClick={() => scrollContainer(estheticRef, "right")} className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md">
            <ChevronRight size={22} />
          </button>
        </div>
      </section>

    </div>
  );
}