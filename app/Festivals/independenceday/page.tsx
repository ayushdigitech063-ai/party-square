"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle,
  ArrowRight,
  Heart,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { useWishlist } from "@/app/context/wishlistcontext";
import { useCart } from "@/app/context/CartContext";
import { independencedayProducts } from "@/app/data/independencedayProducts";
import ProductCard from "@/app/components/ProductCard";
import ProductSort from "@/app/components/ProductSort";
import FAQSection from "@/app/components/FAQSection";

const FEATURED_IDS = [
  "independenceday-12",
  "independenceday-1",
  "independenceday-13",
];
const DECOR_IDS = [
  "independenceday-8",
  "independenceday-9",
  "independenceday-10",
  "independenceday-11",
];

export default function IndependenceDayPage() {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [cartMessageId, setCartMessageId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<
    "recommended" | "price-low" | "price-high"
  >("recommended");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const featuredProducts = FEATURED_IDS.map((id) =>
    independencedayProducts.find((p) => p.id === id),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const independenceDecor = DECOR_IDS.map((id) =>
    independencedayProducts.find((p) => p.id === id),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const handleAddToCart = (item: (typeof independencedayProducts)[number]) => {
    addToCart({ ...item, id: String(item.id), numericPrice: item.price }, 1);
    setCartMessageId(item.id);
    setTimeout(() => setCartMessageId(null), 1500);
  };

  const getPrice = (price: string | number) => {
    if (typeof price === "number") return price;

    const value = Number(price.replace(/[₹,]/g, "").trim());

    return Number.isNaN(value) ? Infinity : value;
  };

  const sortedProducts = [...independencedayProducts].sort((a, b) => {
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
    sortBy === "recommended" ? featuredProducts : sortedProducts;

  return (
    <div className="min-h-screen text-neutral-900 font-sans bg-[#F8FAFC] selection:bg-orange-600 selection:text-white overflow-x-hidden pb-20">
      {/* Hero Section */}
      <section className="relative w-full h-[350px] px-6 flex items-center justify-center text-center overflow-hidden my-4 sm:my-6 max-w-[96rem] mx-auto rounded-[35px] shadow-2xl">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/background.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/50 to-neutral-950/30" />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-orange-500/20 border border-orange-500/40 px-5 py-2 rounded-full text-orange-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md">
            <Sparkles size={15} className="text-orange-400" />
            <span>Happy Independence Day • Celebrating Freedom 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Proud{" "}
            <span className="text-orange-400 italic font-normal">
              Independence Day
            </span>{" "}
            Celebrations
          </h1>
          <p className="text-neutral-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Honor the spirit of freedom with majestic tricolor decorations,
            inspiring backdrops, and grand community event setups.
          </p>
        </div>
      </section>

      {/* Featured Patriotic Collections */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="relative mb-12">
          <div className="flex items-center justify-between gap-6">
            {/* LEFT - Heading */}
            <div className="text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-bold">
                 Featured Collections
              </span>
               <div className="flex items-baseline gap-3">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
                Patriotic Decoration Specials
              </h2>
              <span className="text-neutral-400 text-2xl">|</span>

                <span className="text-neutral-500 text-2xl">
                  {productsToDisplay.length} Items
                </span>
              </div>

              <p className="text-neutral-600 text-sm font-light mt-2">
                 Explore our handpicked tricolor decoration specials for grand
                national celebrations and events.
              </p>
            </div>

            {/* RIGHT - Sort */}
            <div className="shrink-0">
              <ProductSort value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
            href="/Festivals/independenceday/all-products"
            className="inline-flex items-center space-x-2 bg-white hover:bg-neutral-950 hover:text-white text-neutral-950 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-sm border border-orange-200"
          >
            <span>View More Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

  
      {/* Video Banner */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-orange-950 via-neutral-950 to-emerald-950 text-white rounded-[32px] overflow-hidden shadow-2xl border border-orange-500/30 grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="p-8 sm:p-12 lg:col-span-7 flex flex-col justify-center space-y-5">
            <div className="inline-flex items-center space-x-2 bg-orange-500/20 border border-orange-500/40 px-3.5 py-1.5 rounded-full text-orange-300 text-xs font-bold uppercase tracking-widest w-max">
              <ShieldCheck size={14} className="text-orange-400" />
              <span>Patriotic Spirit Showcase</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Saluting the Pride of{" "}
              <span className="text-orange-400 italic">Our Motherland</span>
            </h2>
            <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed font-light">
              Experience the unmatched zeal of Independence Day celebrations.
              From flag hoisting grounds to cultural society events, our expert
              decoration services bring ultimate patriotic grandeur and
              discipline.
            </p>
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-orange-400 shrink-0" />
                <span>
                  Professional flag podium setup and floral decoration
                </span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-orange-400 shrink-0" />
                <span>
                  Complete sound system and patriotic backdrop styling
                </span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/contact"
                className="bg-orange-500 hover:bg-orange-400 text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2"
              >
                <span>Book Independence Day Package</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 h-72 sm:h-96 w-full overflow-hidden bg-neutral-950 p-4 flex items-center justify-center">
            <video
              src="/indepence.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>
      <FAQSection />
    </div>
  );
}
