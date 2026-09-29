"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  ArrowRight,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { janmashtamiProducts } from "@/app/data/janmashtamiProducts";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/wishlistcontext";
import ProductCard from "@/app/components/ProductCard";

const formatPrice = (price: string) =>
  `₹${Number(price).toLocaleString("en-IN")}`;


export default function AllJanmashtamiProductsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen text-neutral-900 font-sans bg-[#FAF6EE] selection:bg-amber-600 selection:text-white pb-20">
      {/* Header / Back Navigation */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4 flex items-center justify-between">
        <Link
          href="/Festivals/janmasthmi"
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider bg-white border border-amber-300/60 px-4 py-2 rounded-full hover:bg-amber-950 hover:text-white transition shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>Back to Janmashtami</span>
        </Link>
        <div className="inline-flex items-center space-x-1.5 bg-amber-100/80 border border-amber-300 px-4 py-1.5 rounded-full text-amber-900 text-xs font-bold uppercase tracking-widest shadow-sm">
          <Sparkles size={13} className="text-amber-600" />
          <span>Divine Collection</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto my-8 space-y-3 px-6">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">
          All Janmashtami Products
        </h1>
        <p className="text-neutral-600 text-sm font-light">
          Explore our complete collection of divine jhulas, aarti thalis, Laddu
          Gopal dresses, and festival essentials.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {janmashtamiProducts.map((product) => {
          const isLiked = isInWishlist(product.id);
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
