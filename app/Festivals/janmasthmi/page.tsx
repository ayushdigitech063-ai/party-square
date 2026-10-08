"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, ArrowRight, Star } from "lucide-react";
import { useWishlist } from "../../context/wishlistcontext";
import { janmashtamiProducts } from "@/app/data/janmashtamiProducts";
import type { Product } from "@/app/types/product";
import ProductCard from "@/app/components/ProductCard";
import ProductSort from "@/app/components/ProductSort";
import FAQSection from "@/app/components/FAQSection";

// Home page par dikhne wale products ki sirf IDs (number). Data janmashtamiProducts.ts me hai.
const CELEBRATION_IDS: string[] = ["4", "9", "10", "11"];
const TEMPLE_IDS: string[] = ["12", "13", "14", "15"];

const getProductsByIds = (ids: string[]): Product[] =>
  ids
    .map((id) => janmashtamiProducts.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

export default function JanmashtamiPage() {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isMounted, setIsMounted] = useState(false);
  const [sortBy, setSortBy] = useState<
    "recommended" | "price-low" | "price-high"
  >("recommended");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const getPrice = (price: string | number) => {
    if (typeof price === "number") return price;

    const value = Number(price.replace(/[₹,]/g, "").trim());

    return Number.isNaN(value) ? Infinity : value;
  };

  const sortedProducts = [...janmashtamiProducts].sort((a, b) => {
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

  const celebrationDecor = getProductsByIds(CELEBRATION_IDS);
  const templeDecor = getProductsByIds(TEMPLE_IDS);
  const productsToDisplay =
    sortBy === "recommended" ? celebrationDecor : sortedProducts;

  return (
    <div className="min-h-screen text-neutral-900 font-sans bg-[#FBF9F4] selection:bg-emerald-600 selection:text-white overflow-x-hidden pb-20">
      {/* Hero Section */}
      <section className="relative w-full h-[350px] px-6 flex items-center justify-center text-center overflow-hidden my-4 sm:my-6 max-w-[96rem] mx-auto rounded-[35px] shadow-2xl">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/bgcolor.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/50 to-neutral-950/30" />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-500/40 px-5 py-2 rounded-full text-emerald-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md">
            <Sparkles size={15} className="text-emerald-400" />
            <span>Shubh Krishna Janmashtami • Festival of Divine Joy 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Divine{" "}
            <span className="text-amber-400 italic font-normal">
              Janmashtami
            </span>{" "}
            Celebrations
          </h1>
          <p className="text-neutral-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Welcome Kanha ji with breathtaking jhulas, magnificent temple
            decorations, and enchanting divine setups.
          </p>
        </div>
      </section>

      {/* Celebration Cards Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="relative mb-12">
          <div className="flex items-center justify-between gap-6">
            {/* LEFT - Heading */}
            <div className="text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-bold">
                  Festive Highlights
              </span>
              <div className="flex items-baseline gap-3">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
                  Krishna Janmashtami Decorations
                </h2>
                <span className="text-neutral-400 text-2xl">|</span>

                <span className="text-neutral-500 text-2xl">
                  {productsToDisplay.length} Items
                </span>
              </div>

              <p className="text-neutral-600 text-sm font-light mt-2">
                Handcrafted jhulas and ethnic makhan handi setups for joyful
                celebrations.
              </p>
            </div>

            {/* RIGHT - Sort */}
            <div className="shrink-0">
              <ProductSort value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

        <div className="text-center mt-12">
          <Link
            href="/Festivals/janmasthmi/all-products"
            className="inline-flex items-center space-x-2 bg-white hover:bg-neutral-950 hover:text-white text-neutral-950 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-sm border border-emerald-200"
          >
            <span>View More Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Grand Green & Golden Banner */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-950 to-neutral-950 text-white rounded-[32px] overflow-hidden shadow-2xl border border-amber-500/30 grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="p-8 sm:p-12 lg:col-span-7 flex flex-col justify-center space-y-5">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest w-max">
              <Sparkles size={14} className="text-amber-400" />
              <span>Grand Festival Celebration</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              The Grand{" "}
              <span className="text-amber-400 italic">
                Janmotsav Experience
              </span>
            </h2>
            <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed font-light">
              Immerse your family and society in the divine ecstasy of Lord
              Krishna&apos;s birth. Our professional decorators weave
              traditional Pichwai art, fresh fragrant florals, and majestic
              lighting into an unforgettable celebration.
            </p>
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-amber-400 shrink-0" />
                <span>
                  Customized theme planning tailored to your exact venue space
                </span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-amber-400 shrink-0" />
                <span>
                  End-to-end professional installation, maintenance, and cleanup
                </span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/Festivals/janmasthmi/8"
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2"
              >
                <span>View Grand Package</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 h-72 sm:h-96 w-full overflow-hidden bg-neutral-950 p-4 flex items-center justify-center">
            <img
              src="/contnet.png"
              alt="Grand Janmashtami Banner Content"
              className="w-full h-full object-cover rounded-2xl shadow-lg hover:scale-105 transition duration-700"
            />
          </div>
        </div>
      </section>

      {/* Special Shrinath Ji Card with srenath.png on Right */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-amber-950 text-white rounded-[32px] overflow-hidden shadow-2xl border border-amber-500/40 grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="p-8 sm:p-12 lg:col-span-7 flex flex-col justify-center space-y-5">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest w-max">
              <Star size={14} className="text-amber-400" />
              <span>Divine Masterpiece Showcase</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Shrinath Ji{" "}
              <span className="text-amber-400 italic">
                Divine Darshan Setup
              </span>
            </h2>
            <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed font-light">
              Experience transcendental devotion with our exclusive Shrinath Ji
              Pichwai artwork and royal decorative backdrop, curated
              specifically to bring supreme grace and tranquility to your
              Janmashtami festivities.
            </p>
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-amber-400 shrink-0" />
                <span>
                  Hand-painted traditional Pichwai motifs & gold-leaf styling
                </span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-amber-400 shrink-0" />
                <span>
                  Complete divine altar setup with lotus motifs & warm focus
                  lights
                </span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/contact"
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2"
              >
                <span>Book Shrinath Ji Setup</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 h-72 sm:h-96 w-full overflow-hidden bg-neutral-950 p-4 flex items-center justify-center">
            <img
              src="/srenath.png"
              alt="Shrinath Ji Special Setup"
              className="w-full h-full object-cover rounded-2xl shadow-lg hover:scale-105 transition duration-700"
            />
          </div>
        </div>
      </section>
      <FAQSection />
    </div>
  );
}
