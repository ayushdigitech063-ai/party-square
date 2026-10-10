"use client";

import React, { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

import ProductCard from "./ProductCard";
import { Product } from "@/app/types/product";
import { getRelatedProducts } from "@/app/data/productResolver";

interface AddOnSectionProps {
  currentProduct: Product;
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

export default function AddOnSection({
  currentProduct,
  isInWishlist,
  toggleWishlist,
}: AddOnSectionProps) {
  const relatedProducts = useMemo(() => {
    return getRelatedProducts(currentProduct, 10);
  }, [currentProduct]);

  if (relatedProducts.length === 0) {
    return null;
  }

  const scrollProducts = (direction: "left" | "right") => {
    const container = document.getElementById("addon-products-container");

    if (!container) return;

    container.scrollBy({
      left: direction === "right" ? 600 : -600,
      behavior: "smooth",
    });
  };
  const productsContainerRef = useRef<HTMLDivElement>(null);

  const slideProducts = (direction: "left" | "right") => {
    if (!productsContainerRef.current) return;

    const scrollAmount = 500;

    productsContainerRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1264px]">
        {/* Main Container */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-[#E8E8E3]
            bg-[#FFFCF8]
            shadow-sm
          "
        >
          {/* Decorative Background */}
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-56
              w-56
              rounded-full
              bg-[#EEF6EB]/40
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-24
              -left-20
              h-56
              w-56
              rounded-full
              bg-[#F7EBD8]/60
              blur-3xl
            "
          />

          <div className="relative p-5 sm:p-7">
            {/* -------------------------------- */}
            {/* Header */}
            {/* -------------------------------- */}

            <div className="flex items-center justify-between gap-4">
              <div>
                {/* Small Label */}
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles size={16} className="text-[#8CBC67]" />

                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#202522]">
                    Complete your celebration
                  </span>
                </div>

                {/* Heading */}
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-serif text-2xl font-bold text-[#202522] sm:text-3xl">
                    Make the celebration bigger
                  </h2>

                  <span className="rounded-full bg-[#EEF6EB] px-2.5 py-1 text-[10px] font-medium text-[#6B706C]">
                    Optional
                  </span>
                </div>

                <p className="mt-2 text-sm text-[#6B706C]">
                  Add something extra to make your special day even more
                  memorable.
                </p>
              </div>
            </div>

            {/* -------------------------------- */}
            {/* Category Pills */}
            {/* -------------------------------- */}

            <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                type="button"
                className="
                  flex
                  shrink-0
                  items-center
                  gap-2
                  rounded-full
                  bg-[#7AB055]
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-white
                  shadow-sm
                "
              >
                <Sparkles size={13} />
                Recommended
              </button>
            </div>

            {/* -------------------------------- */}
            {/* Product Cards */}
            {/* -------------------------------- */}

            <div className="relative mt-6">
              {/* Left side button  */}

              <button
                type="button"
                onClick={() => slideProducts("left")}
                aria-label="Previous products"
                className="
                    absolute
                 left-2
                  top-1/2
                   z-20
      flex
      h-10
      w-10
                -translate-y-1/2
      items-center
      justify-center
      rounded-full
      border
      border-[#E8E8E3]
      bg-white
      text-[#202522]
      shadow-lg
      transition-all
      duration-200
      hover:bg-[#7AB055]
      hover:text-white
      hover:scale-105
    "
              >
                <ChevronLeft size={20} />
              </button>

              <div
                ref={productsContainerRef}
                className="
                  flex
                  gap-4
                  overflow-x-auto
                  scroll-smooth
                  pb-4
                  scrollbar-hide
                "
              >
                {relatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="
                      w-[220px]
                      min-w-[220px]
                      sm:w-[235px]
                      sm:min-w-[235px]
                    "
                  >
                    <ProductCard
                      product={product}
                      isInWishlist={isInWishlist}
                      toggleWishlist={toggleWishlist}
                    />
                  </div>
                ))}
                {/* rigth side button  */}
                <button
                  type="button"
                  onClick={() => slideProducts("right")}
                  aria-label="Next products"
                  className="
      absolute
      right-2
      top-1/2
      z-20
      flex
      h-10
      w-10
      -translate-y-1/2
      items-center
      justify-center
      rounded-full
      border
      border-[#E8E8E3]
      bg-white
      text-[#202522]
      shadow-lg
      transition-all
      duration-200
      hover:bg-[#7AB055]
      hover:text-white
      hover:scale-105
    "
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Right fade */}
              <div
                className="
                  pointer-events-none
                  absolute
                  right-0
                  top-0
                  h-full
                  w-12
                  bg-gradient-to-l
                  from-[#FFFCF8]
                  to-transparent
                "
              />
            </div>

            {/* -------------------------------- */}
            {/* Bottom */}
            {/* -------------------------------- */}

            <div className="mt-2 flex items-center justify-between border-t border-[#E8E8E3] pt-4">
              <p className="text-xs text-[#6B706C]">
                ✨ Choose anything you like to complete your celebration.
              </p>

              <span className="hidden text-xs font-medium text-[#202522] sm:block">
                {relatedProducts.length} recommendations
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
