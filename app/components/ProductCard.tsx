"use client";

import React from "react";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { Product } from "@/app/types/product";
import { useRouter } from "next/navigation";
import HeartButton from "./HeartButton";

import { useCity } from "@/app/context/CityContext";

interface ProductCardProps {
  product: Product;
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

export default function ProductCard({
  product,
  isInWishlist,
  toggleWishlist,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { selectedCity } = useCity();
  const router = useRouter();

  const citySlug = (selectedCity || "jaipur").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const rawCat =
    typeof product.category === "string"
      ? product.category
      : (product.category as any)?.slug || (product.category as any)?.name || "decorations";
  const categorySlug =
    rawCat
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "decorations";
  const productSlug = (product.slug || product.id).toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const productUrl = `/${citySlug}/${categorySlug}/${productSlug}`;

  const openProductDetailPage = () => {
    router.push(productUrl);
  };

  const parseNumeric = (val: any) => {
    if (typeof val === "number") return val;
    const num = Number(String(val || "").replace(/[^0-9.]/g, ""));
    return Number.isNaN(num) ? 0 : num;
  };

  const salePrice = parseNumeric(product.price) || 2499;
  const rawOriginal = parseNumeric(product.originalPrice);
  const originalPrice = rawOriginal > salePrice ? rawOriginal : Math.round(salePrice * 1.25);
  const discountPercent = Math.max(
    10,
    Math.round(((originalPrice - salePrice) / originalPrice) * 100)
  );

  const rating = Number(product.rating) > 0 ? Number(product.rating) : 4.8;
  const reviewCount = Number(product.reviewCount) > 0 ? Number(product.reviewCount) : 126;

  return (
    <div
      className="bg-white border border-[#E8E8E3] hover:border-[#8CBC67] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
      onClick={openProductDetailPage}
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#EEF6E8]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />

        {/* 28% OFF Soft Peach Badge matching reference */}
        <span className="absolute top-3 left-3 bg-[#F7D6C7] text-[#202522] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs z-10">
            {discountPercent}% OFF
          </span>

        {/* Wishlist */}
        <HeartButton
          product={product}
          isInWishlist={isInWishlist}
          toggleWishlist={toggleWishlist}
        />
      </div>

      {/* Content */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-grow justify-between space-y-1.5 sm:space-y-2">
        <div className="space-y-1">
          <Link href={productUrl}>
            <h3 className="text-xs sm:text-base font-bold text-[#202522] hover:text-[#8CBC67] transition line-clamp-2 leading-snug min-h-[34px] sm:min-h-[44px]">
              {product.name}
            </h3>
          </Link>

          {/* Ratings & Reviews */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="inline-flex items-center gap-1 bg-[#FCFBF7] text-[#202522] border border-[#E8E8E3] px-2 py-0.5 rounded-md text-[11px] font-bold">
              <Star size={11} className="fill-[#D7A84B] text-[#D7A84B]" />
              <span>{rating.toFixed(1)}</span>
              <span className="text-[#6B706C] font-normal">({reviewCount})</span>
            </span>
            <span className="text-[11px] text-[#6B706C] font-medium flex items-center gap-1">
              • {selectedCity || "Bangalore"}
            </span>
          </div>

          <p className="text-xs text-[#6B706C] line-clamp-2 mt-1 leading-relaxed hidden sm:block">
            {product.description}
          </p>
        </div>

        {/* Bottom */}
        <div className="pt-2 sm:pt-3 border-t border-[#E8E8E3] flex flex-col min-[420px]:flex-row min-[420px]:items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
            <span className="text-sm sm:text-lg font-bold text-[#202522]">
              ₹{salePrice.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] sm:text-xs text-[#6B706C] line-through">
                ₹{Math.round(originalPrice).toLocaleString("en-IN")}
              </span>
          </div>

          <button
            onClick={openProductDetailPage}
            className="w-full min-[420px]:w-auto bg-[#8CBC67] hover:bg-[#7AB055] text-white text-[11px] sm:text-xs font-bold py-1.5 px-2.5 sm:px-4 sm:py-2 rounded-lg transition shadow-2xs inline-flex items-center justify-center gap-1 shrink-0 cursor-pointer whitespace-nowrap"
          >
            <span className="hidden min-[360px]:inline min-[420px]:hidden">Book</span>
            <span className="inline min-[360px]:hidden min-[420px]:inline">Book Now</span>
            <ArrowRight size={11} className="shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}
