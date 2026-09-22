"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
import { galleryCategories } from "@/app/data/galleryData";
import { useCart } from "@/app/context/CartContext";

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All");
  const { addToCart, toggleLike, isLiked } = useCart();

  const handleDirectAdd = (item: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Mapping format to match Product interface with default quantity 1
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.src,
      desc: item.desc,
      category: item.categoryTitle,
    }, 1);
  };

  const filteredCategories = activeTab === "All" 
    ? galleryCategories 
    : galleryCategories.filter((c) => c.title === activeTab);

  return (
    <section className="bg-[#FAF7F2] py-16 px-4 sm:px-8 md:px-16 text-[#1A1A1A] relative font-sans">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-amber-100 px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={14} className="text-amber-700" />
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-900">OUR EXCLUSIVE PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-gray-900">
            A closer look at <span className="italic font-light text-amber-800">every celebration</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 gap-2 mb-12 scrollbar-none">
          <button
            onClick={() => setActiveTab("All")}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition cursor-pointer ${
              activeTab === "All" ? "bg-amber-900 text-white" : "bg-white text-gray-700 border border-amber-200"
            }`}
          >
            All Collections
          </button>
          {galleryCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(cat.title)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition cursor-pointer ${
                activeTab === cat.title ? "bg-amber-900 text-white" : "bg-white text-gray-700 border border-amber-200"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="space-y-16">
          {filteredCategories.map((category, ci) => (
            <div key={ci} className="space-y-6">
              <div className="border-b border-amber-200 pb-4 flex justify-between items-baseline">
                <h3 className="text-2xl font-serif text-gray-900">{category.title}</h3>
                <span className="text-sm text-amber-800 italic">{category.note}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                {category.items.map((item) => {
                  const likedStatus = isLiked(item.id);
                  return (
                    <div
                      key={item.id}
                      className="group bg-white rounded-2xl overflow-hidden border border-amber-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition flex flex-col"
                    >
                      {/* Image & Like Button Container (Clickable to Details) */}
                      <Link href={`/gallery/${item.id}`} className="relative aspect-[4/5] bg-amber-50 overflow-hidden block">
                        <img src={item.src} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleLike({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              image: item.src,
                              desc: item.desc,
                              category: item.categoryTitle,
                              quantity: 1,
                            });
                          }}
                          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow hover:scale-110 transition cursor-pointer z-10"
                        >
                          <Heart size={16} className={likedStatus ? "fill-rose-500 text-rose-500" : "text-gray-700"} />
                        </button>
                      </Link>

                      {/* Content Section */}
                      <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
                        <Link href={`/gallery/${item.id}`} className="block">
                          <h4 className="font-serif text-base font-medium text-gray-900 hover:text-amber-800 transition">{item.name}</h4>
                          <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.desc}</p>
                        </Link>

                        <div className="flex items-center justify-between pt-3 border-t border-amber-100 gap-2">
                          <div>
                            <span className="text-[10px] uppercase text-gray-400 block">Starts at</span>
                            <span className="text-sm font-semibold text-amber-900">{item.price}</span>
                          </div>
                          
                          {/* Actions: Add to Cart Icon + BOOK Button */}
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={(e) => handleDirectAdd(item, e)}
                              title="Add to Basket"
                              className="w-9 h-9 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center shadow-sm transition cursor-pointer shrink-0"
                            >
                              <ShoppingBag size={15} />
                            </button>

                            <Link 
                              href={`/gallery/${item.id}`}
                              className="bg-amber-900 hover:bg-black text-white text-[11px] font-bold uppercase px-3.5 py-2 rounded-full transition shadow-sm inline-flex items-center gap-1"
                            >
                              <span>Book</span>
                              <ArrowRight size={11} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}