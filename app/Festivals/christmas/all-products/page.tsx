"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { christmasProducts } from "@/app/data/christmasProducts";
import { useWishlist } from "@/app/context/wishlistcontext";
import ProductCard from "@/app/components/ProductCard";


export default function AllChristmasProductsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen text-neutral-900 font-sans bg-[#FBF9F4] selection:bg-red-600 selection:text-white pb-20">
      {/* Header / Back Navigation */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4 flex items-center justify-between">
        <Link
          href="/Festivals/christmas"
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider bg-white border border-red-200 px-4 py-2 rounded-full hover:bg-neutral-950 hover:text-white transition shadow-sm cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Christmas</span>
        </Link>
        <span className="text-xs uppercase tracking-[0.2em] text-red-800 font-bold">
          Holiday Collection
        </span>
      </div>

      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto my-8 space-y-3 px-6">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">
          All Christmas Decor & Essentials
        </h1>
        <p className="text-neutral-600 text-sm font-light">
          Explore our complete collection of decorated trees, Santa setups,
          lighting, wreaths, and festive hampers.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {christmasProducts.map((product) => {
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
  );
}
