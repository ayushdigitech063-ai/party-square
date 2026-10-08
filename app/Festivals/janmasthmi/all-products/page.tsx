"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { janmashtamiProducts } from "@/app/data/janmashtamiProducts";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/wishlistcontext";
import ProductCard from "@/app/components/ProductCard";
import ProductSort from "@/app/components/ProductSort";

const formatPrice = (price: string) =>
  `₹${Number(price).toLocaleString("en-IN")}`;


export default function AllJanmashtamiProductsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [sortBy, setSortBy] = useState<
      "recommended" | "price-low" | "price-high"
    >("recommended");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }


    const sortedProducts = [...janmashtamiProducts].sort((a, b) => {
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
             All Janmashtami Products
           </h1>
           <span className="text-neutral-400 text-2xl">|</span>

                <span className="text-neutral-500 text-2xl">
                  {janmashtamiProducts.length} Items
                </span>
            </div>
           <p className="text-neutral-600 text-sm mb-8 font-light">
              Explore our complete collection of divine jhulas, aarti thalis, Laddu Gopal dresses, and festival essentials.
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
