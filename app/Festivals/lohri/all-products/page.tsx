"use client";

import Link from "next/link";
import { lohriProducts } from "@/app/data/lohriProducts";
import { useWishlist } from "@/app/context/wishlistcontext";
import ProductCard from "@/app/components/ProductCard";

export default function LohriAllProductsPage() {
  const { toggleWishlist, isInWishlist } = useWishlist();



  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-neutral-900 text-3xl font-serif font-bold mb-2">
          Lohri - All Products Catalogue
        </h1>
        <p className="text-neutral-600 text-sm mb-8 font-light">
          Explore our complete collection of traditional food, bonfire props,
          and decorative packages for Lohri.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lohriProducts.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                isInWishlist={isInWishlist}
                toggleWishlist={toggleWishlist}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
