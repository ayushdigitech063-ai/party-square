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

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);
  };

  const openProductDetailPage = () => {
    router.push(productUrl);
  };
  const salePrice = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice) || (salePrice * 1.25);
  const hasDiscount = originalPrice > salePrice && salePrice > 0;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;
  const rating = Number(product.rating) || 0;
  const reviewCount = Number(product.reviewCount) || 0;
  return (
    <div
      className="bg-white border border-[#E8E8E3] hover:border-[#8CBC67] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
      onClick={openProductDetailPage}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EEF6EB]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />

        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-[#E11D48] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm z-10">
            {discountPercent}% OFF
          </span>
        )}

        {/* Wishlist */}
        <HeartButton
          product={product}
          isInWishlist={isInWishlist}
          toggleWishlist={toggleWishlist}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-2">
        <div className="space-y-1">
          <Link href={productUrl}>
            <h3 className="font-serif text-[15px] sm:text-base font-semibold text-gray-950 hover:text-[#8CBC67] transition line-clamp-2 leading-snug min-h-[44px]">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Bottom */}
        <div className="pt-3 border-t border-[#E8E8E3] flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-medium">
              Starts at
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-sm sm:text-base font-semibold text-gray-950">
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
          <div className="flex items-center space-x-1.5">
            {/* Book */}
            <button
              onClick={openProductDetailPage}
              className="bg-[#8CBC67] hover:bg-[#7AB055] text-white text-[11px] font-bold uppercase px-3.5 py-2 rounded-full transition shadow-sm inline-flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>Book</span>
              <ArrowRight size={11} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



