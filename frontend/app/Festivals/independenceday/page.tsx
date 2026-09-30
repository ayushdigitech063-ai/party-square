"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, ArrowRight, Heart, ShieldCheck, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/app/context/wishlistcontext";
import { useCart } from "@/app/context/CartContext";
import { independencedayProducts } from "@/app/data/independencedayProducts";

const FEATURED_IDS = [12, 1, 13];
const DECOR_IDS = [8, 9, 10, 11];

const parsePrice = (price: string) => Number(price.replace(/[₹,]/g, ""));

export default function IndependenceDayPage() {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [cartMessageId, setCartMessageId] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const featuredProducts = FEATURED_IDS.map((id) =>
    independencedayProducts.find((p) => p.id === id)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const independenceDecor = DECOR_IDS.map((id) =>
    independencedayProducts.find((p) => p.id === id)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

const handleAddToCart = (item: (typeof independencedayProducts)[number]) => {
  addToCart({ ...item, id: String(item.id), numericPrice: parsePrice(item.price) }, 1);
  setCartMessageId(item.id);
  setTimeout(() => setCartMessageId(null), 1500);
};

  return (
    <div className="min-h-screen text-neutral-900 font-sans bg-[#F8FAFC] selection:bg-orange-600 selection:text-white overflow-x-hidden pb-20">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[550px] px-6 flex items-center justify-center text-center overflow-hidden my-4 sm:my-6 max-w-[96rem] mx-auto rounded-[35px] shadow-2xl">
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
            <span className="text-orange-400 italic font-normal">Independence Day</span>{" "}
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
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-orange-700 font-bold bg-orange-100 px-4 py-1.5 rounded-full inline-block">
            Featured Collections
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">Patriotic Decoration Specials</h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light">
            Explore our handpicked tricolor decoration specials for grand national celebrations and events.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map((item) => {
            const isLiked = isInWishlist(item.id);
            return (
              <div key={item.id} className="bg-white border border-orange-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">Featured</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Heart size={16} className={isLiked ? "fill-rose-500 text-rose-500" : "text-neutral-700"} />
                  </button>
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-base font-bold text-neutral-900">{item.name}</h3>
                    <p className="text-neutral-500 text-xs leading-relaxed font-light">{item.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between relative">
                    {cartMessageId === item.id && (
                      <span className="absolute -top-5 left-0 text-[10px] text-green-600 font-bold animate-pulse">
                        ✓ Added to cart
                      </span>
                    )}
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">Starts At</span>
                      <span className="text-neutral-900 font-bold text-base">{item.price}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        title="Add to Cart"
                        className="w-9 h-9 rounded-full bg-orange-50 border border-orange-200 hover:bg-orange-100 text-orange-700 flex items-center justify-center transition shadow-sm cursor-pointer"
                      >
                        <ShoppingBag size={15} />
                      </button>
                      <Link href={`/Festivals/independenceday/${item.id}`} className="bg-orange-600 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-orange-500 transition shadow flex items-center space-x-1">
                        <span>Book</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
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

      {/* Cards Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-orange-600 font-bold">Patriotic Setups</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">Independence Day Decorations</h2>
          <p className="text-neutral-600 text-sm font-light">
            Bring out national pride with exquisite tricolor arches, stages, and entrance gates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {independenceDecor.map((item) => {
            const isLiked = isInWishlist(item.id);
            return (
              <div key={item.id} className="bg-white border border-orange-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Heart size={16} className={isLiked ? "fill-rose-500 text-rose-500" : "text-neutral-700"} />
                  </button>
                  <span className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    Tricolor Special
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-base font-bold text-neutral-900">{item.name}</h3>
                    <p className="text-neutral-500 text-xs leading-relaxed font-light">{item.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between relative">
                    {cartMessageId === item.id && (
                      <span className="absolute -top-5 left-0 text-[10px] text-green-600 font-bold animate-pulse">
                        ✓ Added to cart
                      </span>
                    )}
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">Starts At</span>
                      <span className="text-neutral-900 font-bold text-base">{item.price}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        title="Add to Cart"
                        className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-neutral-800 flex items-center justify-center transition shadow-sm cursor-pointer"
                      >
                        <ShoppingBag size={15} />
                      </button>
                      <Link href={`/Festivals/independenceday/${item.id}`} className="bg-neutral-950 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition shadow flex items-center space-x-1">
                        <span>Book</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
              Saluting the Pride of <span className="text-orange-400 italic">Our Motherland</span>
            </h2>
            <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed font-light">
              Experience the unmatched zeal of Independence Day celebrations.
              From flag hoisting grounds to cultural society events, our expert
              decoration services bring ultimate patriotic grandeur and discipline.
            </p>
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-orange-400 shrink-0" />
                <span>Professional flag podium setup and floral decoration</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-orange-400 shrink-0" />
                <span>Complete sound system and patriotic backdrop styling</span>
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
            <video src="/indepence.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover rounded-2xl shadow-lg" />
          </div>
        </div>
      </section>
    </div>
  );
}