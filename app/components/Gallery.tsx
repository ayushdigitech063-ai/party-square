"use client";

import React, { useMemo, useState, useRef } from "react";
import Link from "next/link";
import { Heart, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCity } from "../context/CityContext";

import { useWishlist } from "../context/wishlistcontext";
import { useCart } from "../context/CartContext";
import { galleryProducts } from "../data/galleryData";
import { Product } from "@/app/types/product";
import {
  getPricing,
  DiscountBadge,
  RatingRow,
} from "../components/ProductExtras";

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All");
  const router = useRouter();
  const { selectedCity } = useCity();
  const citySlug = (selectedCity || "jaipur").toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const containerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollContainer = (catName: string, direction: "left" | "right") => {
    const el = containerRefs.current[catName];
    if (el) {
      const scrollAmount = direction === "left" ? -320 : 320;
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // =========================================================
  // GET UNIQUE CATEGORIES FROM galleryProducts
  // =========================================================

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(galleryProducts.map((product) => product.category)),
      ),
    ];
  }, []);

  // =========================================================
  // FILTER PRODUCTS
  // =========================================================

  const filteredProducts = useMemo(() => {
    if (activeTab === "All") {
      return galleryProducts;
    }

    return galleryProducts.filter((product) => product.category === activeTab);
  }, [activeTab]);

  // =========================================================
  // GROUP PRODUCTS BY CATEGORY
  // =========================================================

  const groupedProducts = useMemo(() => {
    const groups: Record<string, Product[]> = {};

    filteredProducts.forEach((product) => {
      if (!groups[product.category]) {
        groups[product.category] = [];
      }

      groups[product.category].push(product);
    });

    return groups;
  }, [filteredProducts]);

  return (
    <section className="bg-[#FCFBF7] py-16 px-4 sm:px-8 md:px-16 text-[#202522] relative font-sans">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#EEF6EB] px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={14} className="text-[#202522]" />

            <span className="text-xs uppercase tracking-widest font-semibold text-[#202522]">
              OUR EXCLUSIVE PORTFOLIO
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-gray-900 leading-[1.15]">
            A closer look at{" "}
            <span className="italic font-light text-[#202522]">
              every celebration
            </span>
          </h2>
        </div>

        {/* =====================================================
            CATEGORY TABS
        ====================================================== */}

        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 gap-2 mb-12 scrollbar-none">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setActiveTab(category)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition cursor-pointer ${
                activeTab === category
                  ? "bg-[#202522] text-white"
                  : "bg-white text-gray-700 border border-[#E8E8E3]"
              }`}
            >
              {category === "All" ? "All Collections" : category}
            </button>
          ))}
        </div>

        {/* =====================================================
            PRODUCTS WITH HORIZONTAL SCROLLER & HOVER SLIDE-UP DRAWER
        ====================================================== */}

        <div className="space-y-16">
          {Object.entries(groupedProducts).map(([categoryName, products]) => (
            <div key={categoryName} className="space-y-6">
              {/* CATEGORY HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E8E8E3]/60 pb-4 gap-2">
                <div>
                  <h3 className="text-xl sm:text-3xl font-serif font-normal text-gray-900 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7AB055] inline-block" />
                    {categoryName}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#202522]/80 font-light italic mt-1">
                    {categoryName === "Wedding Decoration" &&
                      "Grand mandaps, floral aisles & royal setups"}

                    {categoryName === "Home Decoration" &&
                      "Everyday spaces, made a little more special"}

                    {categoryName === "Anniversary Decoration" &&
                      "Candlelight, florals & romantic themes"}

                    {categoryName === "Child Birthday" &&
                      "Playful themes, balloons & bright colours"}
                  </p>
                </div>

                {/* Slider Navigation Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => scrollContainer(categoryName, "left")}
                    aria-label={`Scroll ${categoryName} left`}
                    className="w-9 h-9 rounded-full border border-[#E8E8E3] bg-white text-[#202522] hover:bg-[#EEF6EB] hover:border-[#8CBC67] flex items-center justify-center transition shadow-2xs cursor-pointer"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollContainer(categoryName, "right")}
                    aria-label={`Scroll ${categoryName} right`}
                    className="w-9 h-9 rounded-full border border-[#E8E8E3] bg-white text-[#202522] hover:bg-[#EEF6EB] hover:border-[#8CBC67] flex items-center justify-center transition shadow-2xs cursor-pointer"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* HORIZONTAL CAROUSEL TRACK */}
              <div
                ref={(el) => {
                  containerRefs.current[categoryName] = el;
                }}
                className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: "none" }}
              >
                {products.map((item) => {
                  const likedStatus = isInWishlist(item.id);
                  const { originalPrice, hasDiscount, salePrice } = getPricing(item);

                  const rawCat =
                    typeof item.category === "string"
                      ? item.category
                      : (item.category as any)?.slug || (item.category as any)?.name || "decorations";
                  const categorySlug =
                    rawCat
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, "") || "decorations";
                  const productSlug = (item.slug || item.id).toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  const productUrl = `/${citySlug}/${categorySlug}/${productSlug}`;

                  return (
                    <div
                      key={item.id}
                      onClick={() => router.push(productUrl)}
                      className="relative w-[275px] sm:w-[290px] h-[395px] flex-shrink-0 bg-white border border-[#E8E8E3] hover:border-[#8CBC67] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group snap-start cursor-pointer select-none"
                    >
                      {/* 1. IMAGE CONTAINER */}
                      <div className="relative h-[255px] w-full overflow-hidden bg-[#EEF6EB] shrink-0 block">
                        <img
                          src={item.image}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover blur-lg scale-110 opacity-30"
                        />
                        <img
                          src={item.image}
                          alt={item.name}
                          className="relative w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                        <DiscountBadge item={item} />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(item);
                          }}
                          aria-label={likedStatus ? "Remove from wishlist" : "Add to wishlist"}
                          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer z-10"
                        >
                          <Heart
                            size={16}
                            className={likedStatus ? "fill-rose-500 text-rose-500" : "text-gray-700"}
                          />
                        </button>
                      </div>

                      {/* 2. BASE CARD BODY (Pura Name + Starts at + Details Button) */}
                      <div className="p-3.5 flex flex-col justify-between flex-1 bg-white">
                        <Link href={productUrl} onClick={(e) => e.stopPropagation()} className="block">
                          <h3 className="font-serif text-[15px] sm:text-base font-semibold text-gray-950 hover:text-[#8CBC67] transition line-clamp-2 leading-snug">
                            {item.name}
                          </h3>
                        </Link>

                        <div className="pt-2 border-t border-[#E8E8E3] flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-medium">
                              Starts at
                            </span>
                            <span className="text-base font-bold text-gray-950">
                              ₹{salePrice.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <span className="text-[11px] font-medium text-[#8CBC67] bg-[#EEF6EB] px-2.5 py-1 rounded-full flex items-center gap-1 group-hover:bg-[#8CBC67] group-hover:text-white transition">
                            <span>Details</span>
                            <ChevronRight size={12} />
                          </span>
                        </div>
                      </div>

                      {/* 3. HOVER SLIDE-UP DRAWER (Cursor aane par niche se smooth open hoga) */}
                      <div
                        className="absolute inset-x-0 bottom-0 bg-white/98 backdrop-blur-md p-4 rounded-b-2xl border-t border-[#E8E8E3] shadow-2xl transition-all duration-300 ease-out z-20 flex flex-col justify-between opacity-0 invisible translate-y-6 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="space-y-1.5">
                          <Link href={productUrl} onClick={(e) => e.stopPropagation()}>
                            <h4 className="font-serif text-[15px] font-bold text-gray-950 hover:text-[#8CBC67] transition leading-snug">
                              {item.name}
                            </h4>
                          </Link>
                          <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mt-1">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-3 mt-2 border-t border-[#E8E8E3] flex items-center justify-between gap-2">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-medium">
                              Starts at
                            </span>
                            <div className="flex items-baseline space-x-1.5">
                              <span className="text-base font-bold text-gray-950">
                                ₹{salePrice.toLocaleString("en-IN")}
                              </span>
                              {hasDiscount && (
                                <span className="text-xs text-gray-400 line-through">
                                  ₹{originalPrice.toLocaleString("en-IN")}
                                </span>
                              )}
                            </div>
                            {hasDiscount && (
                              <span className="text-[11px] font-semibold text-emerald-700 block">
                                You save ₹{(originalPrice - salePrice).toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(productUrl);
                            }}
                            className="bg-[#8CBC67] hover:bg-[#7AB055] text-white text-[11px] font-bold uppercase px-4 py-2.5 rounded-full transition shadow-md inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                          >
                            <span>Book</span>
                            <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


