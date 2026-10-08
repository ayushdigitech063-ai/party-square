"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, ArrowRight, Flame } from "lucide-react";

import { useWishlist } from "../../context/wishlistcontext";
import { useCart } from "@/app/context/CartContext";
import { lohriProducts } from "@/app/data/lohriProducts";
import type { Product } from "@/app/types/product";
import ProductCard from "@/app/components/ProductCard";
import ProductSort from "@/app/components/ProductSort";
import FAQSection from "@/app/components/FAQSection";

const TRADITIONAL_IDS: string[] = ["1", "2", "3", "4"];

const SPECIAL_PUNJABI_IDS: string[] = ["100", "102", "103", "105"];

const getProductsByIds = (ids: string[]): Product[] => {
  return ids
    .map((id) => lohriProducts.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));
};

const formatPrice = (price: string) => {
  return `₹${Number(price).toLocaleString("en-IN")}`;
};

const toWishlistItem = (product: Product) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.image,
  desc: product.description,
});

export default function LohriPage() {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState<
    "recommended" | "price-low" | "price-high"
  >("recommended");

  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleAddToCart = (
    product: Product,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description || "",
      category: "Lohri Decoration",
    });
  };
  const getPrice = (price: string | number) => {
    if (typeof price === "number") return price;

    const value = Number(price.replace(/[₹,]/g, "").trim());

    return Number.isNaN(value) ? Infinity : value;
  };

  const sortedProducts = [...lohriProducts].sort((a, b) => {
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

  const traditionalLohriDecor = getProductsByIds(TRADITIONAL_IDS);
  const specialPunjabiLohri = getProductsByIds(SPECIAL_PUNJABI_IDS);
  const productsToDisplay =
    sortBy === "recommended" ? traditionalLohriDecor : sortedProducts;

  return (
    <div className="min-h-screen text-neutral-900 font-sans bg-[#FFF9F5] selection:bg-orange-600 selection:text-white overflow-x-hidden pb-20">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="relative w-full h-[350px] px-6 flex items-center justify-center text-center overflow-hidden my-4 sm:my-6 max-w-[96rem] mx-auto rounded-[35px] shadow-2xl">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/loribgpic.png')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/50 to-neutral-950/30" />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-orange-500/20 border border-orange-500/40 px-5 py-2 rounded-full text-orange-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md">
            <Flame size={15} className="text-orange-400" />

            <span>Happy Lohri • Festival of Harvest & Warmth 2026</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Joyful{" "}
            <span className="text-orange-400 italic font-normal">Lohri</span>{" "}
            Celebrations
          </h1>

          <p className="text-neutral-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Celebrate the harvest season around the sacred bonfire with
            traditional Punjabi decor, folk music vibes, and vibrant cultural
            setups.
          </p>
        </div>
      </section>

      {/* =====================================================
          TRADITIONAL LOHRI PRODUCTS
      ====================================================== */}

      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="relative mb-12">
          <div className="flex items-center justify-between gap-6">
            {/* LEFT - Heading */}
            <div className="text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-bold">
                Traditional Setup
              </span>
              <div className="flex items-baseline gap-3">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
                  Essential Lohri Decorations
                </h2>
                <span className="text-neutral-400 text-2xl">|</span>

                <span className="text-neutral-500 text-2xl">
                  {productsToDisplay.length} Items
                </span>
              </div>

              <p className="text-neutral-600 text-sm font-light mt-2">
                 Bring warmth and authentic Punjabi tradition to your home
                festivities.
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

        {/* VIEW MORE */}

        <div className="text-center mt-12">
          <Link
            href="/Festivals/lohri/all-products"
            className="inline-flex items-center space-x-2 bg-white hover:bg-neutral-950 hover:text-white text-neutral-950 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-sm border border-orange-200"
          >
            <span>View More Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* =====================================================
          BANNER SECTION
      ====================================================== */}

      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-orange-950 via-amber-950 to-neutral-950 text-white rounded-[28px] overflow-hidden shadow-xl border border-orange-500/30 grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="p-6 sm:p-10 lg:col-span-7 flex flex-col justify-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-orange-500/20 border border-orange-500/40 px-3 py-1 rounded-full text-orange-300 text-[11px] font-bold uppercase tracking-widest w-max">
              <Sparkles size={13} className="text-orange-400" />

              <span>Grand Festival Highlight</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              The Spirit of{" "}
              <span className="text-orange-400 italic">Punjabi Festivity</span>
            </h2>

            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light">
              Immerse yourself in high-spirited folk dances, soul-stirring
              music, and traditional bonfire rituals. Our grand Lohri setups
              guarantee an unforgettable celebration filled with joy, peanuts,
              popcorn, and prosperity.
            </p>

            <div className="space-y-2 pt-1">
              <div className="flex items-center space-x-2 text-xs text-neutral-200">
                <CheckCircle size={14} className="text-orange-400 shrink-0" />

                <span>
                  Safe and managed bonfire styling with seating arrangements
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs text-neutral-200">
                <CheckCircle size={14} className="text-orange-400 shrink-0" />

                <span>Authentic cultural props and ethnic photo booths</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/Festivals/lohri/all-products"
                className="bg-orange-500 hover:bg-orange-400 text-neutral-950 px-6 py-3 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-lg inline-flex items-center space-x-2"
              >
                <span>Explore All Packages</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 h-64 sm:h-80 w-full overflow-hidden bg-neutral-900 p-3 sm:p-4 flex items-center justify-center">
            <img
              src="/lori.png"
              alt="Grand Lohri Celebration Banner"
              className="w-full h-full object-cover rounded-2xl shadow-md"
            />
          </div>
        </div>
      </section>
      <FAQSection />
    </div>
  );
}
