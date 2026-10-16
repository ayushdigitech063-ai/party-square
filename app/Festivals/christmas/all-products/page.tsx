"use client";

import { fetchProducts } from "@/app/lib/api";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { christmasProducts } from "@/app/data/christmasProducts";
import { useWishlist } from "@/app/context/wishlistcontext";
import ProductCard from "@/app/components/ProductCard";
import ProductSort from "@/app/components/ProductSort";


export default function AllChristmasProductsPage() {
  const [liveProducts, setLiveProducts] = useState<any[]>(christmasProducts);

  useEffect(() => {
    let active = true;
    async function loadDynamic() {
      try {
        const res = await fetchProducts({ search: 'christmas', limit: 100 });
        let list: any[] = res.products || [];
        if (active && list.length > 0) {
          const mapped = list.map((item: any) => ({
            ...item,
            id: item._id || item.id || item.slug,
          }));
          const existingIds = new Set(mapped.map((m: any) => String(m.id)));
          const fallbackList = Array.isArray(christmasProducts) ? christmasProducts : [];
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

  const [isMounted, setIsMounted] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [sortBy, setSortBy] = useState<
      "recommended" | "price-low" | "price-high"
    >("recommended");
  
    const sortedProducts = [...liveProducts].sort((a, b) => {
      if (sortBy === "price-low") {
        return Number(a.price) - Number(b.price);
      }
  
      if (sortBy === "price-high") {
        return Number(b.price) - Number(a.price);
      }
  
      return 0;
    });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FCFBF7] px-6 py-10">
          <div className="max-w-7xl mx-auto">
           <div className="flex items-baseline gap-3">
            <h1 className="text-[#202522] text-3xl font-serif font-bold mb-2">
              Christmas Celebration - All Products Catalogue
            </h1>
            <span className="text-[#6B706C] text-2xl">|</span>

                <span className="text-[#6B706C] text-2xl">
                  {liveProducts.length} Items
                </span>
            </div>
    
            <p className="text-[#6B706C] text-sm mb-8 font-light">
              Explore our complete collection of christmas.
            </p>
    
            {/* Sort Button */}
            <div className="flex justify-end mb-6">
              <ProductSort
                value={sortBy}
                onChange={setSortBy}
              />
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
