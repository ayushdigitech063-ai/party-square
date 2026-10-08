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
import { fatherbirthdayproduct } from "@/app/data/fatherBirthdayProduct";
import ProductCard from "@/app/components/ProductCard";
import ProductSort from "@/app/components/ProductSort";
import FAQSection from "@/app/components/FAQSection";

export default function FatherBirthdayPage() {
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  const [sortBy, setSortBy] = useState<
    "recommended" | "price-low" | "price-high"
  >("recommended");

  const getPrice = (price: string | number) => {
    if (typeof price === "number") return price;

    const value = Number(price.replace(/[₹,]/g, "").trim());

    return Number.isNaN(value) ? Infinity : value;
  };

  const sortedProducts = [...fatherbirthdayproduct].sort((a, b) => {
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
    sortBy === "recommended" ? fatherbirthdayproduct : sortedProducts;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 font-sans selection:bg-[#C5A059] selection:text-white">
      {/* ================= HERO SECTION WITH badbackgroundimage.png ================= */}
      <section className="relative h-[350px] flex items-center justify-center overflow-hidden text-white">
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
        <div className="relative mb-12">
          <div className="flex items-center justify-between gap-6">
            {/* LEFT - Heading */}
            <div className="text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-bold">
                Exclusive Collections
              </span>
              <div className="flex items-baseline gap-3">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
                  Crafted with Dignity & Style
                </h2>
                <span className="text-neutral-400 text-2xl">|</span>

                <span className="text-neutral-500 text-2xl">
                  {productsToDisplay.length} Items
                </span>
              </div>
              <p className="text-neutral-600 text-sm font-light mt-2">
                Distinctive, sophisticated themes tailored specifically for
                fathers and milestone birthdays.
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
      <FAQSection />
    </div>
  );
}
