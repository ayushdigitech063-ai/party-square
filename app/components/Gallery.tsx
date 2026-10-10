"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight, Sparkles, ShoppingBag } from "lucide-react";

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

  // =========================================================
  // ADD TO CART
  // =========================================================

  const handleDirectAdd = (
    item: Product,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
        category: item.category,
      },
      1,
    );
  };

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
            PRODUCTS
        ====================================================== */}

        <div className="space-y-16">
          {Object.entries(groupedProducts).map(([categoryName, products]) => (
            <div key={categoryName} className="space-y-6">
              {/* =================================================
                    CATEGORY HEADER
                ================================================== */}

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#E8E8E3]/60 pb-4 gap-1 sm:gap-2">
                <h3 className="text-xl sm:text-3xl font-serif font-normal text-gray-900 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7AB055] inline-block" />

                  {categoryName}
                </h3>

                <p className="text-xs sm:text-sm text-[#202522]/80 font-light italic">
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

              {/* =================================================
                    PRODUCT CARDS
                ================================================== */}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                {products.map((item) => {
                  const likedStatus = isInWishlist(item.id);
                  const { originalPrice, hasDiscount } = getPricing(item);
                  return (
                    <div
                      key={item.id}
                      className="group bg-white rounded-2xl overflow-hidden border border-[#E8E8E3] hover:border-[#8CBC67] shadow-sm hover:shadow-xl transition flex flex-col"
                    >
                      {/* =================================================
                            IMAGE
                        ================================================== */}

                      <div className="relative aspect-square bg-[#EEF6EB] overflow-hidden">
                        <Link
                          href={`/card/${item.id}`}
                          className="block w-full h-full"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                          />
                        </Link>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <DiscountBadge item={item} />

                        {/* Wishlist */}

                        <button
                          type="button"
                          onClick={() => toggleWishlist(item)}
                          aria-label={
                            likedStatus
                              ? "Remove from wishlist"
                              : "Add to wishlist"
                          }
                          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer z-10"
                        >
                          <Heart
                            size={16}
                            className={
                              likedStatus
                                ? "fill-rose-500 text-rose-500"
                                : "text-gray-700"
                            }
                          />
                        </button>
                      </div>

                      {/* =================================================
                            CONTENT
                        ================================================== */}

                      <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
                        <Link href={`/card/${item.id}`} className="block">
                          <h4 className="font-serif text-base font-medium text-gray-900 hover:text-[#202522] transition">
                            {item.name}
                          </h4>
                          <RatingRow item={item} />

                          <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                            {item.description}
                          </p>
                        </Link>

                        {/* =================================================
                              PRICE + ACTIONS
                          ================================================== */}

                        <div className="flex items-center justify-between pt-3 border-t border-[#E8E8E3] gap-2">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-medium">
                              Starts at
                            </span>

                            <div className="flex items-baseline space-x-1.5">
                              <span className="text-sm font-semibold text-[#202522]">
                                ₹{item.price.toLocaleString("en-IN")}
                              </span>
                              {hasDiscount && (
                                <span className="text-xs text-gray-400 line-through">
                                  ₹{originalPrice.toLocaleString("en-IN")}
                                </span>
                              )}
                            </div>
                            {hasDiscount && (
                              <span className="text-[11px] font-semibold text-emerald-700 block">
                                You save ₹
                                {(originalPrice - item.price).toLocaleString(
                                  "en-IN",
                                )}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            {/* Book */}

                            <Link
                              href={`/card/${item.id}`}
                              className="bg-[#8CBC67] hover:bg-[#7AB055] text-white text-[11px] font-bold uppercase px-3.5 py-2 rounded-full transition shadow-sm inline-flex items-center gap-1"
                            >
                              <span>Book</span>

                              <ArrowRight size={11} />
                            </Link>
                          </div>
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


