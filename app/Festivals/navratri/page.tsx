"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { useWishlist } from "../../context/wishlistcontext";
import { useCart } from "@/app/context/CartContext";
import { navratriProducts, Product } from "@/app/data/navratriProducts";

// Home page par dikhne wale products ki sirf IDs (number). Data navratriProducts.ts me hai.
const ESSENTIAL_IDS: number[] = [8, 9, 10];
const MATA_JI_IDS: number[] = [11, 12, 13, 14];
const GARBA_IDS: number[] = [15, 16, 17, 18];

const getProductsByIds = (ids: number[]): Product[] =>
  ids
    .map((id) => navratriProducts.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

const formatPrice = (price: string) => `₹${Number(price).toLocaleString("en-IN")}`;

// Wishlist ko pehle jaisi hi shape milti hai (price "₹1,299" format me)
const toWishlistItem = (product: Product) => ({
  id: product.id,
  name: product.name,
  price: formatPrice(product.price),
  image: product.image,
  desc: product.desc,
});

export default function NavratriPage() {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isMounted, setIsMounted] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      desc: product.desc,
      category: "Navratri Decoration",
    });
  };

  const divineEssentials = getProductsByIds(ESSENTIAL_IDS);
  const mataJiPandalDecor = getProductsByIds(MATA_JI_IDS);
  const specialGarbaPandal = getProductsByIds(GARBA_IDS);

  return (
    <div className="min-h-screen text-neutral-900 font-sans bg-[#FFFDF9] selection:bg-rose-600 selection:text-white overflow-x-hidden pb-20">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[550px] px-6 flex items-center justify-center text-center overflow-hidden my-4 sm:my-6 max-w-[96rem] mx-auto rounded-[35px] shadow-2xl">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/beground.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/50 to-neutral-950/30" />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-rose-500/20 border border-rose-500/40 px-5 py-2 rounded-full text-rose-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md">
            <Sparkles size={15} className="text-rose-400" />
            <span>Shubh Navratri • Festival of Divine Grace 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Divine{" "}
            <span className="text-rose-400 italic font-normal">Navratri</span>{" "}
            Celebrations
          </h1>
          <p className="text-neutral-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Welcome Goddess Durga with exquisite Mata Ji pandals, vibrant Garba
            nights, and mesmerizing traditional decorations.
          </p>
        </div>
      </section>

      {/* Exclusive Divine Essentials Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-rose-700 font-bold bg-rose-100 px-4 py-1.5 rounded-full inline-block">Divine Essentials</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">Exclusive Puja Offerings</h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light">
            Essential festival items including sacred flower decorations, Mata Ji poshak, and holy prasad hampers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {divineEssentials.map((item) => {
            const isLiked = isInWishlist(item.id);
            return (
              <div key={item.id} className="bg-white border border-rose-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">Puja Special</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(toWishlistItem(item));
                    }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-700 hover:text-rose-500 shadow transition cursor-pointer"
                  >
                    <Heart
                      size={18}
                      className={
                        isLiked
                          ? "fill-rose-500 text-rose-500"
                          : "text-gray-700"
                      }
                    />
                  </button>
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-base font-bold text-neutral-900">{item.name}</h3>
                    <p className="text-neutral-500 text-xs leading-relaxed font-light">{item.desc}</p>
                  </div>
                  
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">Starts At</span>
                      <span className="text-neutral-900 font-bold text-base">{formatPrice(item.price)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(item, e)}
                        title="Add to Cart"
                        className="bg-rose-100 hover:bg-rose-200 text-rose-900 p-2.5 rounded-full transition-colors cursor-pointer border border-rose-200 shadow-sm"
                      >
                        <ShoppingBag size={16} />
                      </button>
                      <Link href={`/Festivals/navratri/${item.id}`} className="bg-rose-600 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-rose-500 transition shadow flex items-center space-x-1">
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
            href="/Festivals/navratri/all-products" 
            className="inline-flex items-center space-x-2 bg-white hover:bg-neutral-950 hover:text-white text-neutral-950 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-sm border border-rose-200"
          >
            <span>View More Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Mata Ji Pandal Cards Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-rose-600 font-bold">
            Mata Ji Pandal
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            Sacred Mata Ji Decorations
          </h2>
          <p className="text-neutral-600 text-sm font-light">
            Bring divine blessings and spiritual aura to your home and community
            pandals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mataJiPandalDecor.map((item) => {
            const isLiked = isInWishlist(item.id);
            return (
              <div
                key={item.id}
                className="bg-white border border-rose-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(toWishlistItem(item));
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
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-base font-bold text-neutral-900">
                      {item.name}
                    </h3>
                    <p className="text-neutral-500 text-xs leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">
                        Starts At
                      </span>
                      <span className="text-neutral-900 font-bold text-base">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(item, e)}
                        title="Add to Cart"
                        className="bg-rose-100 hover:bg-rose-200 text-rose-900 p-2.5 rounded-full transition-colors cursor-pointer border border-rose-200 shadow-sm"
                      >
                        <ShoppingBag size={16} />
                      </button>
                      <Link href={`/Festivals/navratri/${item.id}`} className="bg-neutral-950 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-rose-600 transition shadow flex items-center space-x-1">
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

      {/* Special Garba Pandal Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-rose-700 font-bold bg-rose-100 px-4 py-1.5 rounded-full inline-block">
            Garba Nights
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">
            Special Garba Pandal Decor
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light">
            High-energy stage setups, traditional umbrella decorations, and
            vibrant lighting for unforgettable Dandiya nights.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {specialGarbaPandal.map((item) => {
            const isLiked = isInWishlist(item.id);
            return (
              <div
                key={item.id}
                className="bg-white border border-rose-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(toWishlistItem(item));
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
                  <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    Garba Special
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-base font-bold text-neutral-900">
                      {item.name}
                    </h3>
                    <p className="text-neutral-500 text-xs leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">
                        Starts At
                      </span>
                      <span className="text-neutral-900 font-bold text-base">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(item, e)}
                        title="Add to Cart"
                        className="bg-rose-100 hover:bg-rose-200 text-rose-900 p-2.5 rounded-full transition-colors cursor-pointer border border-rose-200 shadow-sm"
                      >
                        <ShoppingBag size={16} />
                      </button>
                      <Link href={`/Festivals/navratri/${item.id}`} className="bg-rose-600 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-rose-500 transition shadow flex items-center space-x-1">
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
    </div>
  );
}