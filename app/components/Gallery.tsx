"use client";

import React, { useState } from "react";
import { Heart, ArrowRight, Sparkles } from "lucide-react";

const categories = [
  {
    title: "Wedding Decoration",
    note: "Grand mandaps, floral aisles & royal setups",
    items: [
      { src: "/wedding1.png", name: "Royal Mandap Setup", desc: "Floral mandap with drapes & chandeliers", price: "₹45,000" },
      { src: "/wedding2.png", name: "Entrance Gate Decor", desc: "Grand floral welcome gate", price: "₹18,000" },
      { src: "/wedding3.png", name: "Stage Backdrop", desc: "Elegant floral & fairy-light backdrop", price: "₹22,000" },
      { src: "/wedding4.png", name: "Aisle Walkway", desc: "Petal-lined aisle with lanterns", price: "₹15,000" },
      { src: "/wedding5.png", name: "Reception Setup", desc: "Full reception hall styling", price: "₹35,000" },
    ],
  },
  {
    title: "Home Decoration",
    note: "Everyday spaces, made a little more special",
    items: [
      { src: "/home1.png", name: "Living Room Refresh", desc: "Seasonal florals & accent styling", price: "₹6,000" },
      { src: "/home2.png", name: "Balcony Makeover", desc: "Fairy lights & potted greens", price: "₹4,500" },
      { src: "/home3.png", name: "Puja Room Decor", desc: "Traditional festive styling", price: "₹5,000" },
      { src: "/home4.png", name: "Dining Setup", desc: "Table centerpiece & lighting", price: "₹3,500" },
      { src: "/home5.png", name: "Entrance Decor", desc: "Doorway rangoli & floral toran", price: "₹2,500" },
    ],
  },
  {
    title: "Anniversary Decoration",
    note: "Candlelight, florals & romantic themes",
    items: [
      { src: "/aniversarry1.png", name: "Candlelight Setup", desc: "Romantic candle & rose petal path", price: "₹8,000" },
      { src: "/aniversarry2.png", name: "Balloon Backdrop", desc: "Themed balloon wall with lights", price: "₹6,500" },
      { src: "/aniversarry3.png", name: "Floral Arch", desc: "Rose & fairy-light arch", price: "₹9,500" },
      { src: "/aniversarry4.png", name: "Table for Two", desc: "Private dinner setup", price: "₹7,000" },
      { src: "/aniversarry5.png", name: "Terrace Theme", desc: "Fairy-lit terrace celebration", price: "₹11,000" },
    ],
  },
  {
    title: "Child Birthday",
    note: "Playful themes, balloons & bright colours",
    items: [
      { src: "/childbirthday1.png", name: "Balloon Theme Party", desc: "Colourful balloon arch & backdrop", price: "₹7,500" },
      { src: "/childbirthday2.png", name: "Cartoon Theme Setup", desc: "Character cutouts & banners", price: "₹9,000" },
      { src: "/childbirthday3.png", name: "Photo Booth Corner", desc: "Themed props & backdrop", price: "₹4,000" },
      { src: "/childbirthday4.png", name: "Table & Cake Decor", desc: "Themed cake table styling", price: "₹5,500" },
      { src: "/childbirthday5.png", name: "Full Venue Setup", desc: "Complete themed venue styling", price: "₹15,000" },
    ],
  },
];

export default function Gallery() {
  const [liked, setLiked] = useState(new Set());
  const [activeTab, setActiveTab] = useState("All");

  const toggleLike = (key) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const filteredCategories = activeTab === "All" 
    ? categories 
    : categories.filter((c) => c.title === activeTab);

  return (
    <section className="bg-[#FAF7F2] py-16 sm:py-24 px-4 sm:px-8 md:px-16 text-[#1A1A1A] relative overflow-hidden font-sans">
      {/* Soft Golden Background Glows */}
      <div className="absolute top-20 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-amber-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-amber-300/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 bg-amber-100/80 border border-amber-300/60 px-4 py-1.5 rounded-full shadow-sm mb-4">
            <Sparkles size={14} className="text-amber-700" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-amber-900">
              OUR EXCLUSIVE PORTFOLIO
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal leading-[1.15] text-gray-900">
            A closer look at <br />
            <span className="italic font-light text-amber-800">every celebration</span>
          </h2>
        </div>

        {/* Category Filter Tabs (Scrollable on mobile) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 sm:pb-0 gap-2 sm:gap-3 mb-12 sm:mb-16 scrollbar-none">
          <button
            onClick={() => setActiveTab("All")}
            className={`whitespace-nowrap px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all shadow-sm shrink-0 cursor-pointer ${
              activeTab === "All"
                ? "bg-amber-900 text-white shadow-amber-900/20"
                : "bg-white text-gray-700 border border-amber-200 hover:border-amber-400 hover:bg-amber-50/50"
            }`}
          >
            All Collections
          </button>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(cat.title)}
              className={`whitespace-nowrap px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all shadow-sm shrink-0 cursor-pointer ${
                activeTab === cat.title
                  ? "bg-amber-900 text-white shadow-amber-900/20"
                  : "bg-white text-gray-700 border border-amber-200 hover:border-amber-400 hover:bg-amber-50/50"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Categories & Items Listing */}
        <div className="space-y-16 sm:space-y-20">
          {filteredCategories.map((category, ci) => (
            <div key={ci} className="space-y-6">
              
              {/* Category Title Bar */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-amber-200/60 pb-4 gap-1 sm:gap-2">
                <h3 className="text-xl sm:text-3xl font-serif font-normal text-gray-900 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-700 inline-block"></span>
                  {category.title}
                </h3>
                <p className="text-xs sm:text-sm text-amber-800/80 font-light italic">
                  {category.note}
                </p>
              </div>

              {/* Items Grid (1 col on mobile, 2 on sm, 3 on md/lg, 5 on xl) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                {category.items.map((item, idx) => {
                  const key = `${ci}-${idx}`;
                  const isLiked = liked.has(key);
                  return (
                    <div
                      key={idx}
                      className="group bg-white rounded-2xl overflow-hidden border border-amber-200/75 hover:border-amber-400 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(217,119,6,0.12)] transition-all duration-300 flex flex-col"
                    >
                      {/* Image Container */}
                      <div className="relative aspect-[4/5] bg-amber-50 overflow-hidden">
                        <img
                          src={item.src}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Like Button */}
                        <button
                          onClick={() => toggleLike(key)}
                          aria-label={isLiked ? "Remove from favourites" : "Add to favourites"}
                          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Heart
                            size={16}
                            className={isLiked ? "fill-rose-500 text-rose-500" : "text-gray-700"}
                          />
                        </button>
                      </div>

                      {/* Content Box */}
                      <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
                        <div className="space-y-1">
                          <h4 className="font-serif text-base font-medium text-gray-900 group-hover:text-amber-900 transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500 font-light leading-relaxed line-clamp-2">
                            {item.desc}
                          </p>
                        </div>

                        {/* Price & Action Button */}
                        <div className="flex items-center justify-between pt-3 border-t border-amber-100 mt-auto">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-medium">Starts at</span>
                            <span className="text-sm font-semibold text-amber-900">{item.price}</span>
                          </div>
                          <button className="group/btn inline-flex items-center gap-1.5 bg-black hover:bg-amber-900 text-white text-xs font-medium px-3.5 py-2 rounded-full transition-colors shadow-sm cursor-pointer">
                            <span>Book</span>
                            <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                          </button>
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