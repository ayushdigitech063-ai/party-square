"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Shield,
  Award,
} from "lucide-react";
import { useWishlist } from "../../../context/wishlistcontext";

 export const fatherCards = [
    {
      id: 1,
      image: "/dad.png",
      name: "The Gentleman's Milestone",
      desc: "Sophisticated navy & gold backdrop styling with elegant metallic balloon clusters.",
      price: "₹5,499",
    },
    {
      id: 2,
      image: "/dad1.png",
      name: "Royal King Father Setup",
      desc: "Grand royal drapes, custom marquee number/name highlights, and premium cake pedestal.",
      price: "₹8,499",
    },
    {
      id: 3,
      image: "/dad2.png",
      name: "Legacy Celebration Bundle",
      desc: "Complete elite transformation featuring entrance pathway decor, cold pyros & LED ambiance.",
      price: "₹12,999",
    },
    {
      id: 4,
      image: "/dad3.png",
      name: "Classic Tribute Setup",
      desc: "Warm fairy lights, floral arches and beautiful memory wall integration for dad.",
      price: "₹6,499",
    },
  ];

export default function FatherBirthdayPage() {
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 font-sans selection:bg-[#C5A059] selection:text-white">
      {/* ================= HERO SECTION WITH badbackgroundimage.png ================= */}
      <section className="relative h-[85vh] min-h-[650px] flex items-center justify-center overflow-hidden text-white">
        <div
          className="absolute inset-0 z-0 w-full h-full transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: "url('/badbackgroundimage.png')",
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
              <Shield size={14} className="text-[#DFBC71]" />
              <span>Father's Special Tribute Celebration</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] drop-shadow-md">
              Honor the Pillar of Strength Who{" "}
              <span className="text-[#DFBC71] italic font-normal">
                Built Your World
              </span>
            </h1>

            <p className="text-neutral-200 text-base sm:text-lg font-light leading-relaxed drop-shadow">
              Celebrate his wisdom, guidance, and unconditional love. From
              sophisticated themes to grand milestone setups, we design
              unforgettable moments for your hero.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/contact"
                className="group relative bg-gradient-to-r from-[#DFBC71] to-[#C5A059] text-neutral-950 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Book Father's Decor</span>
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

      {/* ================= EXACT SCREENSHOT STYLE CARDS SECTION ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-bold">
            Exclusive Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900">
            Crafted with Dignity & Style
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light">
            Distinctive, sophisticated themes tailored specifically for fathers
            and milestone birthdays.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fatherCards.map((item) => {
            const isLiked = isInWishlist(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E2D2B0]/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Card Image Wrapper with Wishlist Icon */}
                <div className="relative h-72 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => {
                      toggleWishlist(item);
                    }}
                    aria-label={
                      isLiked ? "Remove from wishlist" : "Add to wishlist"
                    }
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Heart
                      size={16}
                      className={
                        isLiked
                          ? "fill-rose-500 text-rose-500"
                          : "text-gray-700"
                      }
                    />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-neutral-900 mb-1.5 group-hover:text-[#C5A059] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="border-t border-neutral-100 pt-4 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                        Starts At
                      </span>
                      <span className="font-bold text-neutral-900 text-base">
                        {item.price}
                      </span>
                    </div>
                    <Link
                      href={`father/${item.id}`}
                      className="bg-neutral-950 text-white hover:bg-[#C5A059] hover:text-neutral-950 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 shadow-sm"
                    >
                      <span>Book</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= FIXED LARGE BANNER CARD SECTION (card1.png) ================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white shadow-2xl border border-[#C5A059]/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center p-8 sm:p-12 lg:p-16 gap-10">
            {/* Left Image Box */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#C5A059]/40 group">
                <img
                  src="/card1.png"
                  alt="Father Grand Celebration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <p className="text-[#DFBC71] text-xs font-semibold uppercase tracking-widest mb-1">
                      Elite Signature Setup
                    </p>
                    <p className="text-white font-serif text-xl font-medium">
                      The Ultimate Tribute to Dad
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content Box */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 bg-[#C5A059]/20 border border-[#C5A059]/40 px-4 py-1.5 rounded-full text-[#DFBC71] text-xs font-semibold tracking-widest uppercase">
                <Award size={13} className="text-[#DFBC71]" />
                <span>Celebrating A Lifetime of Guidance</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Because His Silent Strength{" "}
                <span className="text-[#DFBC71] italic">
                  Deserves the Grandest Stage
                </span>
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                A father is the quiet anchor of the family—the one who works
                tirelessly behind the scenes, offering wisdom, security, and
                unwavering support. His birthday is more than just another year;
                it is a profound occasion to honor his legacy, his sacrifices,
                and the incredible values he has instilled in us.
              </p>

              <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                Make his special day truly remarkable with our specially curated
                grand decor bundle. Designed with masculine elegance, rich
                textures, and majestic lighting, we turn his celebration into a
                cherished memory.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-[#DFBC71] to-[#C5A059] text-neutral-950 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                >
                  <span>Book Grand Setup for Dad</span>
                  <ArrowRight size={15} />
                </Link>

                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/25 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 px-7 py-4 rounded-full font-medium text-xs uppercase tracking-widest transition-all duration-300"
                >
                  Chat with Designer
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
