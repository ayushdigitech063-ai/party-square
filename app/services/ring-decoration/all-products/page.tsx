"use client";

import { fetchProducts } from "@/app/lib/api";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ringDecorationProducts } from "@/app/data/ringDecorationProducts";
import { useWishlist } from "@/app/context/wishlistcontext";
import ProductCard from "@/app/components/ProductCard";
import ProductSort from "@/app/components/ProductSort";

export default function RingDecorationAllProductsPage() {
  const [liveProducts, setLiveProducts] = useState<any[]>(ringDecorationProducts);

  useEffect(() => {
    let active = true;
    async function loadDynamic() {
      try {
        const res = await fetchProducts({ category: 'ring-decoration', limit: 100 });
        let list: any[] = res.products || [];
        if (active && list.length > 0) {
          const mapped = list.map((item: any) => ({
            ...item,
            id: item._id || item.id || item.slug,
          }));
          const existingIds = new Set(mapped.map((m: any) => String(m.id)));
          const fallbackList = Array.isArray(ringDecorationProducts) ? ringDecorationProducts : [];
          const combined = [...mapped, ...fallbackList.filter((x: any) => !existingIds.has(String(x.id)))];
          setLiveProducts(combined);
        }
      } catch (err) {
        console.warn("Could not load dynamic products for all-products:", err);
      }
    }
    loadDynamic();
    return () => {
      active = false;
    };
  }, []);

  const { toggleWishlist, isInWishlist } = useWishlist();

  const [sortBy, setSortBy] = useState<
    "recommended" | "price-low" | "price-high"
  >("recommended");

  const getPrice = (price: string | number) => {
    if (typeof price === "number") return price;
    const value = Number(String(price).replace(/[₹,]/g, "").trim());
    return Number.isNaN(value) ? Infinity : value;
  };

  const sortedProducts = [...liveProducts].sort((a, b) => {
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
            href="/services/ring-decoration"
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#6B706C] hover:text-[#202522] transition"
          >
            <ArrowLeft size={14} />
            <span>Back to Ring Decoration</span>
          </Link>
        </div>

        <div className="flex items-baseline gap-3">
          <h1 className="text-[#202522] text-3xl font-serif font-bold mb-2">
            Ring Ceremony - All Products Catalogue
          </h1>
          <span className="text-[#6B706C] text-2xl">|</span>
          <span className="text-[#6B706C] text-2xl">
            {liveProducts.length} Items
          </span>
        </div>

        <p className="text-[#6B706C] text-sm mb-8 font-light">
          Explore our complete collection of royal ring ceremony stages, floral canopies, couple seating, and entry pathways.
        </p>

        {/* Sort Button */}
        <div className="flex justify-end mb-6">
          <ProductSort value={sortBy} onChange={setSortBy} />
        </div>

        {/* Products Grid */}
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
