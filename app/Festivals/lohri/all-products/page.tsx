"use client";

import Link from "next/link";
import { lohriProducts } from "@/app/data/lohriProducts";
import { useWishlist } from "@/app/context/wishlistcontext";
import ProductCard from "@/app/components/ProductCard";
import ProductSort from "@/app/components/ProductSort";
import { useState } from "react";


export default function LohriAllProductsPage() {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [sortBy, setSortBy] = useState<
      "recommended" | "price-low" | "price-high"
    >("recommended");
  
    const sortedProducts = [...lohriProducts].sort((a, b) => {
      if (sortBy === "price-low") {
        return Number(a.price) - Number(b.price);
      }
  
      if (sortBy === "price-high") {
        return Number(b.price) - Number(a.price);
      }
  
      return 0;
    });



  return (
   <div className="min-h-screen bg-[#FCFBF7] px-6 py-10">
         <div className="max-w-7xl mx-auto">
            <div className="flex items-baseline gap-3">
           <h1 className="text-[#202522] text-3xl font-serif font-bold mb-2">
            Lohri - All Products Catalogue
           </h1>
            <span className="text-[#6B706C] text-2xl">|</span>

                <span className="text-[#6B706C] text-2xl">
                  {lohriProducts.length} Items
                </span>
           </div>
   
           <p className="text-[#6B706C] text-sm mb-8 font-light">
            Explore our complete collection of traditional food, bonfire props,and decorative packages for Lohri.
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
