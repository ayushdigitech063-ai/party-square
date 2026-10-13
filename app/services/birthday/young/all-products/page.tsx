"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { newYearCards, hotelCards, outdoorCards } from "@/app/data/youngBirthdayProduct";
import { useWishlist } from "@/app/context/wishlistcontext";
import ProductCard from "@/app/components/ProductCard";
import ProductSort from "@/app/components/ProductSort";

export default function YoungAllProductsPage() {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [sortBy, setSortBy] = useState<
    "recommended" | "price-low" | "price-high"
  >("recommended");

  const allYoungProducts = [...newYearCards, ...hotelCards, ...outdoorCards];

  const getPrice = (price: string | number) => {
    if (typeof price === "number") return price;
    const value = Number(String(price).replace(/[₹,]/g, "").trim());
    return Number.isNaN(value) ? Infinity : value;
  };

  const sortedProducts = [...allYoungProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return getPrice(a.price) - getPrice(b.price);
    }
    if (sortBy === "price-high") {
      return getPrice(b.price) - getPrice(a.price);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#FCFBF7] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            href="/services/birthday/young"
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#6B706C] hover:text-[#202522] transition"
          >
            <ArrowLeft size={14} />
            <span>Back to Milestone Celebrations</span>
          </Link>
        </div>

        <div className="flex items-baseline gap-3">
          <h1 className="text-[#202522] text-3xl font-serif font-bold mb-2">
            Youngsters & Milestones - All Products Catalogue
          </h1>
          <span className="text-[#6B706C] text-2xl">|</span>
          <span className="text-[#6B706C] text-2xl">
            {allYoungProducts.length} Items
          </span>
        </div>

        <p className="text-[#6B706C] text-sm mb-8 font-light">
          Explore our complete collection of neon light aesthetics, boho cabanas, and hotel room milestone surprises.
        </p>

        {/* Sort Button */}
        <div className="flex justify-end mb-6">
          <ProductSort value={sortBy} onChange={setSortBy} />
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isInWishlist={isInWishlist}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
