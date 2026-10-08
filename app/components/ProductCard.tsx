"use client";

import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { Product } from "@/app/types/product";
import { useRouter } from "next/navigation";
import HeartButton from "./HeartButton";

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
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);
  };

  const openProductDetailPage = () => {
    router.push(`/card/${product.slug}`);
  };
  const salePrice = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice) || 0;
  const hasDiscount = originalPrice > salePrice && salePrice > 0;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;
  const rating = Number(product.rating) || 0;
  const reviewCount = Number(product.reviewCount) || 0;
  return (
    <div
      className="bg-white border border-amber-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group"
      onClick={openProductDetailPage}
    >
      {/* Image */}
      <div className="relative aspect-square  w-full overflow-hidden bg-neutral-100">
        <img
          src={product.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-60"
        />

        {/* Main image: always fully visible */}
        <img
          src={product.image}
          alt={product.name}
          className="relative w-full h-full object-contain group-hover:scale-105 transition duration-500"
        />

        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
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
      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
        <div className="space-y-1">
          <Link href={`/card/${product.slug}`}>
            <h3 className="font-serif text-sm font-bold text-neutral-900 line-clamp-1 hover:text-amber-800 transition">
              {product.name}
            </h3>
          </Link>

          {rating > 0 && (
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
          )}

          <p className="text-neutral-500 text-xs leading-relaxed font-light line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Bottom */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex flex-col leading-tight">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-neutral-900 font-bold text-sm">
                ₹{salePrice.toLocaleString("en-IN")}
              </span>
              {hasDiscount && (
                <span className="text-neutral-400 text-xs line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            {hasDiscount && (
              <span className="text-[11px] font-semibold text-emerald-700">
                You save ₹{(originalPrice - salePrice).toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1.5">
            {/* Book */}
            <button
              onClick={openProductDetailPage}
              className="bg-amber-800 text-white px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-900 transition shadow"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
