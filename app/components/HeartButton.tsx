"use client";

import React from "react";
import { Heart } from "lucide-react";
import { Product } from "@/app/types/product";

interface HeartButtonProps {
  product: Product;
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

export default function HeartButton({
  product,
  isInWishlist,
  toggleWishlist,
}: HeartButtonProps) {
  const handleWishlistClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist(product);
  };

  const liked = isInWishlist(product.id);

  return (
    <button
      type="button"
      onClick={handleWishlistClick}
      aria-label={
        liked
          ? "Remove from wishlist"
          : "Add to wishlist"
      }
      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
    >
      <Heart
        size={16}
        className={
          liked
            ? "fill-rose-500 text-rose-500"
            : "text-gray-700"
        }
      />
    </button>
  );
}