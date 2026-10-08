"use client";

import React, { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
  Star,
} from "lucide-react";
import Link from "next/link";
import {
  weddingGifts,
  festivalsProducts,
  pujaSection,
  estheticProducts,
} from "../data/allCollections";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "../context/wishlistcontext";
import { useRouter } from "next/navigation";
import HeartButton from "../components/HeartButton";

const toNumber = (v: any) =>
  Number(String(v ?? "").replace(/[^0-9.]/g, "")) || 0;

const getPricing = (item: any) => {
  const salePrice = toNumber(item.price);
  const originalPrice = toNumber(item.originalPrice);
  const hasDiscount = originalPrice > salePrice && salePrice > 0;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;
  return { salePrice, originalPrice, hasDiscount, discountPercent };
};

const DiscountBadge = ({ item }: { item: any }) => {
  const { hasDiscount, discountPercent } = getPricing(item);
  if (!hasDiscount) return null;
  return (
    <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
      {discountPercent}% OFF
    </span>
  );
};

const RatingRow = ({ item }: { item: any }) => {
  const rating = Number(item.rating) || 0;
  const reviewCount = Number(item.reviewCount) || 0;
  if (rating <= 0) return null;
  return (
    <div className="flex items-center space-x-1.5">
      <span className="inline-flex items-center space-x-1 bg-emerald-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
        <span>{rating.toFixed(1)}</span>
        <Star size={10} className="fill-white" />
      </span>
      {reviewCount > 0 && (
        <span className="text-[11px] text-neutral-500">
          ({reviewCount.toLocaleString("en-IN")} reviews)
        </span>
      )}
    </div>
  );
};

const PriceBlock = ({ item }: { item: any }) => {
  const { salePrice, originalPrice, hasDiscount } = getPricing(item);
  // No discount: show the price exactly as before
  if (!hasDiscount) {
    return (
      <span className="text-neutral-900 font-bold text-sm">₹{item.price}</span>
    );
  }
  return (
    <div className="flex flex-col leading-tight">
      <div className="flex items-baseline space-x-1.5">
        <span className="text-neutral-900 font-bold text-sm">
          ₹{salePrice.toLocaleString("en-IN")}
        </span>
        <span className="text-neutral-400 text-xs line-through">
          ₹{originalPrice.toLocaleString("en-IN")}
        </span>
      </div>
      <span className="text-[11px] font-semibold text-emerald-700">
        You save ₹{(originalPrice - salePrice).toLocaleString("en-IN")}
      </span>
    </div>
  );
};
export default function CardPage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  // Refs for horizontal scrolling containers
  const weddingRef = useRef<HTMLDivElement>(null);
  const festivalRef = useRef<HTMLDivElement>(null);
  const pujaRef = useRef<HTMLDivElement>(null);
  const estheticRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right",
  ) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleAddToCart = (item: any, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents card link click event

    // Sirf global cart function call hoga, jisse ek hi single toast aayega
    addToCart(item, 1);
  };

  const openProductDetailPage = (item: any) => {
    router.push(`/card/${item.slug}`);
  };
  return (
    <div className="bg-[#FAF7F2] text-[#1A1A1A] font-sans min-h-screen relative">
      {/* 1. Wedding Gift Products Section */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-t border-amber-200/50">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-800 font-bold bg-amber-100 px-4 py-1.5 rounded-full inline-block">
            Special Collection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            Wedding Gift Products
          </h2>
          <p className="text-neutral-600 text-sm font-light">
            Handpicked luxury presents and hampers for grand weddings and couple
            milestones.
          </p>
        </div>

        <div
          ref={weddingRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
        >
          {weddingGifts.map((item) => (
            <div
              key={item.id}
              onClick={() => openProductDetailPage(item)}
              className="min-w-[240px] sm:min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border border-amber-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group snap-start"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 block">
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-60"
                />

                {/* Main image: always fully visible */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="relative w-full h-full object-contain group-hover:scale-105 transition duration-500"
                />
                <DiscountBadge item={item} />
                <HeartButton
                  product={item}
                  isInWishlist={isInWishlist}
                  toggleWishlist={toggleWishlist}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-1">
                  <Link href={`/card/${item.slug}`}>
                    <h3 className="font-serif text-sm font-bold text-neutral-900 line-clamp-1 hover:text-amber-800 transition">
                      {item.name}
                    </h3>
                  </Link>
                  <RatingRow item={item} />
                  <p className="text-neutral-500 text-xs leading-relaxed font-light line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <PriceBlock item={item} />
                  <div className="flex items-center space-x-1.5">
                    <Link
                      href={`/card/${item.slug}`}
                      className="bg-amber-800 text-white px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-900 transition shadow"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => scrollContainer(weddingRef, "left")}
            className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => scrollContainer(weddingRef, "right")}
            className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </section>

      {/* 2. Festivals Products Section */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-t border-amber-200/50">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-800 font-bold bg-amber-100 px-4 py-1.5 rounded-full inline-block">
            Festive Vibes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            Festivals Products
          </h2>
          <p className="text-neutral-600 text-sm font-light">
            Brighten up seasonal celebrations with vibrant cultural and
            traditional decorations.
          </p>
        </div>

        <div
          ref={festivalRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
        >
          {festivalsProducts.map((item) => (
            <div
              key={item.id}
              onClick={() => openProductDetailPage(item)}
              className="min-w-[240px] sm:min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border border-amber-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group snap-start"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 block">
               <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-60"
                />

                {/* Main image: always fully visible */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="relative w-full h-full object-contain group-hover:scale-105 transition duration-500"
                />
                <DiscountBadge item={item} />
                <HeartButton
                  product={item}
                  isInWishlist={isInWishlist}
                  toggleWishlist={toggleWishlist}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-1">
                  <Link href={`/card/${item.slug}`}>
                    <h3 className="font-serif text-sm font-bold text-neutral-900 line-clamp-1 hover:text-amber-800 transition">
                      {item.name}
                    </h3>
                  </Link>
                  <RatingRow item={item} />
                  <p className="text-neutral-500 text-xs leading-relaxed font-light line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <PriceBlock item={item} />
                  <div className="flex items-center space-x-1.5">
                    <Link
                      href={`/card/${item.slug}`}
                      className="bg-amber-800 text-white px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-900 transition shadow"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => scrollContainer(festivalRef, "left")}
            className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => scrollContainer(festivalRef, "right")}
            className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </section>

      {/* 3. Puja Section */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-t border-amber-200/50">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-800 font-bold bg-amber-100 px-4 py-1.5 rounded-full inline-block">
            Sacred & Devotional
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            Puja Section
          </h2>
          <p className="text-neutral-600 text-sm font-light">
            Exquisite mandaps, sacred thalis, and serene decor elements for
            divine prayers.
          </p>
        </div>

        <div
          ref={pujaRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
        >
          {pujaSection.map((item) => (
            <div
              key={item.id}
              onClick={() => openProductDetailPage(item)}
              className="min-w-[240px] sm:min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border border-amber-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group snap-start"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 block">
               <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-60"
                />

                {/* Main image: always fully visible */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="relative w-full h-full object-contain group-hover:scale-105 transition duration-500"
                />
                <DiscountBadge item={item} />
                <HeartButton
                  product={item}
                  isInWishlist={isInWishlist}
                  toggleWishlist={toggleWishlist}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-1">
                  <Link href={`/card/${item.slug}`}>
                    <h3 className="font-serif text-sm font-bold text-neutral-900 line-clamp-1 hover:text-amber-800 transition">
                      {item.name}
                    </h3>
                  </Link>
                  <RatingRow item={item} />
                  <p className="text-neutral-500 text-xs leading-relaxed font-light line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <PriceBlock item={item} />
                  <div className="flex items-center space-x-1.5">
                    <Link
                      href={`/card/${item.slug}`}
                      className="bg-amber-800 text-white px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-900 transition shadow"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => scrollContainer(pujaRef, "left")}
            className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => scrollContainer(pujaRef, "right")}
            className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </section>

      {/* 4. Esthetic Products Section */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-t border-amber-200/50 pb-20">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-800 font-bold bg-amber-100 px-4 py-1.5 rounded-full inline-block">
            Modern Elegance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            Esthetic Products
          </h2>
          <p className="text-neutral-600 text-sm font-light">
            Minimalist and trend-setting artistic home decor accents for modern
            aesthetics.
          </p>
        </div>

        <div
          ref={estheticRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
        >
          {estheticProducts.map((item) => (
            <div
              key={item.id}
              onClick={() => openProductDetailPage(item)}
              className="min-w-[240px] sm:min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border border-amber-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group snap-start"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 block">
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-60"
                />

                {/* Main image: always fully visible */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="relative w-full h-full object-contain group-hover:scale-105 transition duration-500"
                />
                <DiscountBadge item={item} />
                <HeartButton
                  product={item}
                  isInWishlist={isInWishlist}
                  toggleWishlist={toggleWishlist}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-1">
                  <Link href={`/card/${item.slug}`}>
                    <h3 className="font-serif text-sm font-bold text-neutral-900 line-clamp-1 hover:text-amber-800 transition">
                      {item.name}
                    </h3>
                  </Link>
                  <RatingRow item={item} />
                  <p className="text-neutral-500 text-xs leading-relaxed font-light line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <PriceBlock item={item} />
                  <div className="flex items-center space-x-1.5">
                    <Link
                      href={`/card/${item.slug}`}
                      className="bg-amber-800 text-white px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-900 transition shadow"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => scrollContainer(estheticRef, "left")}
            className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => scrollContainer(estheticRef, "right")}
            className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </section>
    </div>
  );
}
