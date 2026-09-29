"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Calendar,
  Hotel,
  Trees,
} from "lucide-react";
import { useWishlist } from "../../../context/wishlistcontext";
import { newYearCards } from "@/app/data/youngBirthdayProduct";
import { hotelCards } from "@/app/data/youngBirthdayProduct";
import { outdoorCards } from "@/app/data/youngBirthdayProduct";
import ProductCard from "@/app/components/ProductCard";
export default function HomePage() {
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 font-sans selection:bg-[#C5A059] selection:text-white">
      {/* ================= HERO / MAIN BANNER SECTION ================= */}
      <section className="relative h-[85vh] min-h-[650px] flex items-center justify-center overflow-hidden text-white">
        <div
          className="absolute inset-0 z-0 w-full h-full transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: "url('/bggg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-neutral-950/90 via-neutral-950/70 to-neutral-950/40" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/30" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#C5A059]/20 border border-[#C5A059]/50 px-4 py-2 rounded-full text-[#DFBC71] text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-lg">
              <Sparkles size={14} className="text-[#DFBC71]" />
              <span>Elite Event & Party Decorators</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] drop-shadow-md">
              Transforming Every Space Into{" "}
              <span className="text-[#DFBC71] italic font-normal">
                Pure Magic
              </span>
            </h1>

            <p className="text-neutral-200 text-base sm:text-lg font-light leading-relaxed drop-shadow">
              From grand hotel banquets and outdoor landscapes to unforgettable
              New Year parties, we bring your dream celebrations to life with
              unmatched elegance.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/contact"
                className="group relative bg-gradient-to-r from-[#DFBC71] to-[#C5A059] text-neutral-950 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Book Your Event</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white/25 px-7 py-4 rounded-full font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-20 transform -translate-x-1/2 animate-bounce opacity-80 text-white">
          <ChevronDown size={28} />
        </div>
      </section>

      {/* ================= SECTION 1: NEW YEAR PARTY BANNER & CARDS ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-bold flex items-center justify-center gap-1.5">
            <Calendar size={14} /> Festive Collection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900">
            New Year Party Celebrations
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light">
            Ring in the New Year with breathtaking party decor, glowing
            ambience, and luxurious vibes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newYearCards.map((item) => {
            return (
              <ProductCard
                key={item.id}
                product={item}
                isInWishlist={isInWishlist}
                toggleWishlist={toggleWishlist}
              />
            );
          })}
        </div>
      </section>

      {/* ================= SECTION 2: HOTEL DECORATION ================= */}
      <section className="py-24 bg-[#EFEADB]/50 border-t border-[#E2D2B0]/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8C6D24] font-bold flex items-center justify-center gap-1.5">
              <Hotel size={14} /> Hospitality Decor
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900">
              Hotel Room & Banquets
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base font-light">
              Exquisite room surprises and grand banquet styling tailored for
              luxury hotel stays.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelCards.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                isInWishlist={isInWishlist}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: OUTSIDE LOOKING / OUTDOOR DECOR ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-bold flex items-center justify-center gap-1.5">
            <Trees size={14} /> Open-Air & Lawns
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900">
            Outdoor & Landscape Styling
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light">
            Magnificent outdoor lighting, canopy arrangements, and lawn
            decorations that shine under the stars.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {outdoorCards.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              isInWishlist={isInWishlist}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
