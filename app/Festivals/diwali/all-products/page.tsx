"use client";

import { diwaliProducts } from "@/app/data/diwaliProducts";
import { useWishlist } from "@/app/context/wishlistcontext";
import { fetchProducts } from "@/app/lib/api";
import ProductCard from "@/app/components/ProductCard";
import ProductSort from "@/app/components/ProductSort";
import { useState, useEffect } from "react";

export default function AllProductsPage() {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [liveProducts, setLiveProducts] = useState<any[]>(diwaliProducts);

  const [sortBy, setSortBy] = useState<
    "recommended" | "price-low" | "price-high"
  >("recommended");

  useEffect(() => {
    let active = true;
    async function loadDynamicDiwali() {
      try {
        const res = await fetchProducts({ search: "diwali", limit: 100 });
        const list: any[] = res.products || [];
        if (active && list.length > 0) {
          const mapped = list.map((p) => ({
            ...p,
            id: p._id || p.id || p.slug,
          }));
          const existingIds = new Set(mapped.map((m) => String(m.id)));
          const combined = [...mapped, ...diwaliProducts.filter((p) => !existingIds.has(String(p.id)))];
          setLiveProducts(combined);
        }
      } catch (err) {
        console.warn("Could not load dynamic diwali products:", err);
      }
    }
    loadDynamicDiwali();
    return () => {
      active = false;
    };
  }, []);

  const sortedProducts = [...liveProducts].sort((a, b) => {
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
            Diwali - All Products Catalogue
          </h1>
          <span className="text-[#6B706C] text-2xl">|</span>

          <span className="text-[#6B706C] text-2xl">
            {liveProducts.length} Items
          </span>
        </div>

        <p className="text-[#6B706C] text-sm mb-8 font-light">
          Explore our complete collection of diwali.
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
