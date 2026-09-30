"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { Product } from "@/app/types/product";
import { useRouter } from "next/navigation";

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

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);
  };

  const openProductDetailPage =()=>{
     router.push(`/card/${product.slug}`)
  }

  return (
    <div className="bg-white border border-amber-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group">

      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-neutral-100">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            isInWishlist(product.id)
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
        >
          <Heart
            size={16}
            className={
              isInWishlist(product.id)
                ? "fill-rose-500 text-rose-500"
                : "text-gray-700"
            }
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">

        <div className="space-y-1">
          <Link href={`/card/${product.slug}`}>
            <h3 className="font-serif text-sm font-bold text-neutral-900 line-clamp-1 hover:text-amber-800 transition">
              {product.name}
            </h3>
          </Link>

          <p className="text-neutral-500 text-xs leading-relaxed font-light line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Bottom */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">

          <span className="text-neutral-900 font-bold text-sm">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </span>

          <div className="flex items-center space-x-1.5">

            {/* Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              title="Add to Cart"
              className="bg-amber-100 hover:bg-amber-200 text-amber-900 p-2 rounded-full transition shadow-sm cursor-pointer"
            >
              <ShoppingBag size={14} />
            </button>

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