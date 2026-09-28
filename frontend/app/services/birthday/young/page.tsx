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

export  const newYearCards = [
    {
      id: 1,
      image: "/party.png",
      name: "Midnight Glow Setup",
      desc: "Dazzling metallic balloons, LED counts & gold confetti aesthetics.",
      price: "₹6,999",
    },
    {
      id: 2,
      image: "/party2.png",
      name: "Grand Countdown Lounge",
      desc: "Luxury seating backdrop, neon signs & ambient club lighting.",
      price: "₹10,999",
    },
    {
      id: 3,
      image: "/party3.png",
      name: "Starry Night Gala",
      desc: "Fairy light canopy, champagne table styling & photo booth.",
      price: "₹14,999",
    },
    {
      id: 4,
      image: "/party4.png",
      name: "VIP Celebration Bundle",
      desc: "Complete party transformation with entrance arch & cold pyros.",
      price: "₹19,999",
    },
  ];

  export const hotelCards = [
    {
      id: 5,
      image: "/hoteldecoration.png",
      name: "Luxury Suite Romance",
      desc: "Rose petal pathways, candlelit room styling & swan towel decor.",
      price: "₹4,499",
    },
    {
      id: 6,
      image: "/hoteldecoration1.png",
      name: "Royal Banquet Styling",
      desc: "Grand floral pillars, crystal chandeliers & stage draping.",
      price: "₹24,999",
    },
    {
      id: 7,
      image: "/hoteldecoration2.png",
      name: "Boutique Anniversary Room",
      desc: "Customized balloon ceiling, glowing numbers & memory frames.",
      price: "₹5,999",
    },
    {
      id: 8,
      image: "/hoteldecoration3.png",
      name: "Executive Birthday Setup",
      desc: "Sophisticated backdrop with thematic balloons and cake table.",
      price: "₹7,999",
    },
    {
      id: 9,
      image: "/hoteldecoration4.png",
      name: "Grand Ballroom Gala",
      desc: "Full-scale ceiling draping, royal seating & entrance archway.",
      price: "₹34,999",
    },
    {
      id: 10,
      image: "/hoteldecoration5.png",
      name: "Imperial Suite Experience",
      desc: "Premium thematic setup with special lighting and floral curation.",
      price: "₹18,999",
    },
  ];

  export  const outdoorCards = [
    {
      id: 11,
      image: "/outsidelooking.png",
      name: "Garden Canopy Lights",
      desc: "Stunning fairy light canopy stretching across outdoor trees.",
      price: "₹12,999",
    },
    {
      id: 12,
      image: "/outsidelooking1.png",
      name: "Open-Air Lawn Stage",
      desc: "Floral gateway, open-air seating decor & warm ambient glow.",
      price: "₹18,999",
    },
    {
      id: 13,
      image: "/outsidelooking2.png",
      name: "Terrace Sunset Setup",
      desc: "Boho-chic outdoor cabana with cozy cushions and lanterns.",
      price: "₹8,999",
    },
    {
      id: 14,
      image: "/outsidelooking3.png",
      name: "Path of Lights Entrance",
      desc: "Illuminated floral pathway welcoming guests in style.",
      price: "₹6,499",
    },
    {
      id: 15,
      image: "/outsidelooking4.png",
      name: "Grand Farmhouse Open Lawn",
      desc: "Complete perimeter ambient lighting & royal outdoor Mandap.",
      price: "₹29,999",
    },
    {
      id: 16,
      image: "/outsidelooking5.png",
      name: "Starlit Garden Terrace",
      desc: "Exquisite string lighting and open-air luxury seating arrangement.",
      price: "₹21,999",
    },
  ];

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
            const isLiked = isInWishlist(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E2D2B0]/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
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
                      href={`young/${item.id}`}
                      className="bg-neutral-950 text-white hover:bg-[#C5A059] hover:text-neutral-950 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 shadow-sm"
                    >
                      <span>Book</span> <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
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
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E2D2B0]/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => toggleWishlist(item)}
                    aria-label={
                      isInWishlist(item.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md text-neutral-700 hover:text-rose-500 transition-colors"
                  >
                    <Heart
                      size={18}
                      className={
                        isInWishlist(item.id)
                          ? "fill-rose-500 text-rose-500"
                          : ""
                      }
                    />
                  </button>
                </div>

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
                      href={`young/${item.id}`}
                      className="bg-neutral-950 text-white hover:bg-[#C5A059] hover:text-neutral-950 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 shadow-sm"
                    >
                      <span>Book</span> <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
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
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E2D2B0]/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleWishlist(item)}
                  aria-label={
                    isInWishlist(item.id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md text-neutral-700 hover:text-rose-500 transition-colors"
                >
                  <Heart
                    size={18}
                    className={
                      isInWishlist(item.id) ? "fill-rose-500 text-rose-500" : ""
                    }
                  />
                </button>
              </div>

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
                    href={`young/${item.id}`}
                    className="bg-neutral-950 text-white hover:bg-[#C5A059] hover:text-neutral-950 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 shadow-sm"
                  >
                    <span>Book</span> <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
