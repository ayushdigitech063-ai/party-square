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
import ProductSort from "@/app/components/ProductSort";
import FAQSection from "@/app/components/FAQSection";

export default function HomePage() {
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  const [sortBy, setSortBy] = useState<
    "recommended" | "price-low" | "price-high"
  >("recommended");

  const getPrice = (price: string | number) => {
    if (typeof price === "number") return price;

    const value = Number(price.replace(/[₹,]/g, "").trim());

    return Number.isNaN(value) ? Infinity : value;
  };

  const sortedProducts = [...newYearCards].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return getPrice(a.price) - getPrice(b.price);

      case "price-high":
        return getPrice(b.price) - getPrice(a.price);

      case "recommended":
      default:
        return 0;
    }
  });

  const productsToDisplay =
    sortBy === "recommended" ? newYearCards : sortedProducts;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#202522] font-sans selection:bg-[#8CBC67] selection:text-white">
      {/* ================= HERO / MAIN BANNER SECTION ================= */}
      <section className="relative min-h-[500px] sm:min-h-[520px] py-12 sm:py-16 flex items-center justify-center overflow-hidden text-white">
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

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-10 w-full text-center sm:text-left">
          <div className="max-w-2xl space-y-4 sm:space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#8CBC67]/20 border border-[#8CBC67]/50 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[#8CBC67] text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-lg">
              <Sparkles size={14} className="text-[#8CBC67]" />
              <span>Elite Event & Party Decorators</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] drop-shadow-md">
              Transforming Every Space Into{" "}
              <span className="text-[#8CBC67] italic font-normal">
                Pure Magic
              </span>
            </h1>

            <p className="text-neutral-200 text-xs sm:text-base font-light leading-relaxed drop-shadow">
              From grand hotel banquets and outdoor landscapes to unforgettable
              New Year parties, we bring your dream celebrations to life with
              unmatched elegance.
            </p>

            <div className="flex flex-row items-center gap-2 sm:gap-4 pt-2 sm:pt-4 w-full justify-center sm:justify-start">
              <Link
                href="/contact"
                className="flex-1 sm:flex-initial group relative bg-[#8CBC67] hover:bg-[#7AB055] text-white px-3 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-lg hover:shadow-[#8CBC67]/30 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-1.5 sm:space-x-2 cursor-pointer whitespace-nowrap"
              >
                <span>Book Your Event</span>
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform shrink-0"
                />
              </Link>

              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial border border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white/25 px-3 sm:px-7 py-3 sm:py-4 rounded-full font-semibold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center justify-center whitespace-nowrap"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="hidden sm:block absolute bottom-6 left-1/2 z-20 transform -translate-x-1/2 animate-bounce opacity-80 text-white">
          <ChevronDown size={28} />
        </div>
      </section>

      {/* ================= SECTION 1: NEW YEAR PARTY BANNER & CARDS ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="relative mb-12">
          <div className="flex items-center justify-between gap-6">
            {/* LEFT - Heading */}
            <div className="text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8CBC67] font-bold">
                 Festive Collection
              </span>
              <div className="flex items-baseline gap-3">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522] mt-1">
                  New Year Party Celebrations
                </h2>
                <span className="text-[#6B706C] text-2xl">|</span>

                <span className="text-[#6B706C] text-2xl">
                  {productsToDisplay.length} Items
                </span>
              </div>

              <p className="text-[#6B706C] text-sm font-light mt-2">
                Ring in the New Year with breathtaking party decor, glowing
                ambience, and luxurious vibes.
              </p>
            </div>

            {/* RIGHT - Sort */}
            <div className="shrink-0">
              <ProductSort value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsToDisplay.map((item) => {
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

        {/* VIEW MORE PRODUCTS */}
        <div className="text-center mt-12">
          <Link
            href="/services/birthday/young/all-products"
            className="inline-flex items-center space-x-2 bg-white hover:bg-neutral-950 hover:text-white text-neutral-950 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-sm border border-[#E8E8E3]"
          >
            <span>View More Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ================= SECTION 2: HOTEL DECORATION ================= */}
      <section className="py-24 bg-[#EFEADB]/50 border-t border-[#E8E8E3]/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8CBC67] font-bold flex items-center justify-center gap-1.5">
              <Hotel size={14} /> Hospitality Decor
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#202522]">
              Hotel Room & Banquets
            </h2>
            <p className="text-[#6B706C] text-sm sm:text-base font-light">
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
          <span className="text-xs uppercase tracking-[0.3em] text-[#8CBC67] font-bold flex items-center justify-center gap-1.5">
            <Trees size={14} /> Open-Air & Lawns
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#202522]">
            Outdoor & Landscape Styling
          </h2>
          <p className="text-[#6B706C] text-sm sm:text-base font-light">
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
      <FAQSection />
    </div>
  );
}
