"use client";

import Link from "next/link";
import { ganeshProducts } from "@/app/data/ganeshProducts";
import { useWishlist } from "@/app/context/wishlistcontext";
import ProductCard from "@/app/components/ProductCard";
import ProductSort from "@/app/components/ProductSort";
import { useState } from "react";

export default function GaneshAllProductsPage() {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [sortBy, setSortBy] = useState<
    "recommended" | "price-low" | "price-high"
  >("recommended");

  const sortedProducts = [...ganeshProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return Number(a.price) - Number(b.price);
    }

    if (sortBy === "price-high") {
      return Number(b.price) - Number(a.price);
    }

    return 0;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline gap-3">
          <h1 className="text-neutral-900 text-3xl font-serif font-bold mb-2">
            Ganesh Chaturthi - All Products Catalogue
          </h1>
          <span className="text-neutral-400 text-2xl">|</span>

          <span className="text-neutral-500 text-2xl">
            {ganeshProducts.length} Items
          </span>
        </div>

        <p className="text-neutral-600 text-sm mb-8 font-light">
          Explore our complete collection of divine decoration and puja packages
          for Bappa.
        </p>

        {/* Sort Button */}
        <div className="flex justify-end mb-6">
          <ProductSort value={sortBy} onChange={setSortBy} />
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => {
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
