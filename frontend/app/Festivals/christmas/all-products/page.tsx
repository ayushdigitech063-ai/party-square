"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, ArrowRight, ShoppingBag } from "lucide-react";
import { christmasProducts, Product } from "@/app/data/christmasProducts";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/wishlistcontext";

const formatPrice = (price: string) => `₹${Number(price).toLocaleString("en-IN")}`;

// Wishlist ko home page jaisi hi shape milti hai (price "₹6,499" format me)
const toWishlistItem = (product: Product) => ({
  id: product.id,
  name: product.name,
  price: formatPrice(product.price),
  image: product.image,
  desc: product.desc,
});

export default function AllChristmasProductsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      desc: product.desc,
      category: "Christmas Decoration",
    });
  };

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
        <span className="text-xs uppercase tracking-[0.2em] text-red-800 font-bold">Holiday Collection</span>
      </div>

      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto my-8 space-y-3 px-6">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">All Christmas Decor & Essentials</h1>
        <p className="text-neutral-600 text-sm font-light">
          Explore our complete collection of decorated trees, Santa setups, lighting, wreaths, and festive hampers.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {christmasProducts.map((product) => {
          const isLiked = isInWishlist(product.id);
          return (
            <div key={product.id} className="bg-white border border-red-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative h-64 w-full overflow-hidden bg-neutral-100 p-3">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-500" />
                <span className="absolute top-5 left-5 bg-red-700 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                  Christmas Special
                </span>
                <button
                  onClick={() => toggleWishlist(toWishlistItem(product))}
                  aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-700 hover:text-rose-500 shadow transition cursor-pointer"
                >
                  <Heart
                    size={18}
                    className={isLiked ? "fill-rose-500 text-rose-500" : "text-gray-700"}
                  />
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
                    <span className="text-neutral-900 font-bold text-base">{formatPrice(product.price)}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Shopping Bag Icon Button for Add to Cart */}
                    <button 
                      onClick={() => handleAddToCart(product)}
                      style={{ padding: '8px' }}
                      className="rounded-full bg-amber-100 hover:bg-amber-200 text-[#b45309] flex items-center justify-center transition shadow-sm cursor-pointer"
                      title="Add to Basket"
                    >
                      <ShoppingBag size={16} />
                    </button>

                    {/* BOOK Link Button for specific product page navigation */}
                    <Link 
                      href={`/Festivals/christmas/${product.id}`}
                      style={{ padding: '6px 12px' }}
                      className="bg-[#b45309] text-white rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#92400e] transition shadow flex items-center space-x-1 cursor-pointer"
                    >
                      <span>BOOK</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}