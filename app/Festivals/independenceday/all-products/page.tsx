"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, ArrowRight, ShoppingBag } from "lucide-react";
import { independencedayProducts } from "@/app/data/independencedayProducts";
import { useCart } from "@/app/context/CartContext";

export default function AllIndependenceDayProductsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen text-neutral-900 font-sans bg-[#FBF9F4] selection:bg-amber-600 selection:text-white pb-20">
      
      {/* Header / Back Navigation */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4 flex items-center justify-between">
        <Link 
          href="/Festivals/independenceday" 
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider bg-white border border-amber-200 px-4 py-2 rounded-full hover:bg-neutral-950 hover:text-white transition shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>Back to Independence Day</span>
        </Link>
        <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-bold">Patriotic Collection</span>
      </div>

      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto my-8 space-y-3 px-6">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">All National Celebration Products</h1>
        <p className="text-neutral-600 text-sm font-light">
          Explore our complete collection of tricolor decorations, stage setups, badges, costumes, and event kits.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {independencedayProducts.map((product) => (
          <div key={product.id} className="bg-white border border-amber-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="relative h-64 w-full overflow-hidden bg-neutral-100 p-3">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-500" />
              <span className="absolute top-5 left-5 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                Patriotic Special
              </span>
              <button className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-700 hover:text-amber-600 shadow transition">
                <Heart size={18} />
              </button>
            </div>
            
            <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-serif text-base font-bold text-neutral-900">{product.name}</h3>
                <p className="text-neutral-500 text-xs leading-relaxed font-light">{product.desc}</p>
              </div>
              
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">Starts At</span>
                  <span className="text-neutral-900 font-bold text-base">₹{product.price.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Add to Cart Button with explicit numericPrice and quantity */}
                  <button
                    type="button"
                    onClick={() => addToCart({
                      ...product,
                      numericPrice: product.price,
                      quantity: 1
                    })}
                    title="Add to Cart"
                    className="w-9 h-9 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center transition shadow cursor-pointer"
                  >
                    <ShoppingBag size={16} />
                  </button>

                  <Link 
                    href={`/Festivals/independenceday/${product.id}`} 
                    className="bg-amber-600 text-white px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-500 transition shadow flex items-center space-x-1"
                  >
                    <span>Book</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}