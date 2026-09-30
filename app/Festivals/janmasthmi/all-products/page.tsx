"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { janmashtamiProducts, Product } from "@/app/data/janmashtamiProducts";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/wishlistcontext";

const formatPrice = (price: string) => `₹${Number(price).toLocaleString("en-IN")}`;

// Wishlist ko home page jaisi hi shape milti hai (price "₹5,499" format me)
const toWishlistItem = (product: Product) => ({
  id: product.id,
  name: product.name,
  price: formatPrice(product.price),
  image: product.image,
  desc: product.desc,
});

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

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault(); // Prevents card/link click conflict
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      desc: product.desc,
      category: "Janmashtami Celebration",
    });
  };

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
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">All Janmashtami Products</h1>
        <p className="text-neutral-600 text-sm font-light">
          Explore our complete collection of divine jhulas, aarti thalis, Laddu Gopal dresses, and festival essentials.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {janmashtamiProducts.map((product) => {
          const isLiked = isInWishlist(product.id);
          return (
            <div key={product.id} className="bg-white border border-amber-200/80 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              
              <div className="relative h-64 w-full overflow-hidden bg-neutral-100 p-3">
                <Link href={`/Festivals/janmasthmi/${product.id}`} className="block w-full h-full">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-500" />
                </Link>
                <span className="absolute top-5 left-5 bg-amber-800 text-amber-100 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow pointer-events-none">
                  Janmashtami Special
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(toWishlistItem(product));
                  }}
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
                  <Link href={`/Festivals/janmasthmi/${product.id}`}>
                    <h3 className="font-serif text-base font-bold text-neutral-900 hover:text-amber-800 transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-neutral-500 text-xs leading-relaxed font-light">{product.desc}</p>
                </div>
                
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">Starts At</span>
                    <span className="text-neutral-900 font-bold text-base">{formatPrice(product.price)}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Add to Cart Quick Button */}
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      title="Add to Cart"
                      className="bg-amber-50 hover:bg-amber-100 text-amber-900 p-2.5 rounded-full transition-colors border border-amber-200 shadow-sm"
                    >
                      <ShoppingBag size={16} />
                    </button>

                    {/* Book Button */}
                    <Link 
                      href={`/Festivals/janmasthmi/${product.id}`} 
                      className="bg-neutral-950 text-white px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-800 transition shadow flex items-center space-x-1"
                    >
                      <span>Book</span>
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