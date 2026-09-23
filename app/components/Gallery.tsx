"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight, Sparkles, ShoppingBag } from "lucide-react";

import { useWishlist } from "../context/wishlistcontext";
import { useCart } from "../context/CartContext";

const categories = [
  {
    title: "Wedding Decoration",
    note: "Grand mandaps, floral aisles & royal setups",
    items: [
      {
        id: 1,
        src: "/wedding1.png",
        name: "Royal Mandap Setup",
        desc: "Floral mandap with drapes & chandeliers",
        price: "₹45,000",
      },
      {
        id: 2,
        src: "/wedding2.png",
        name: "Entrance Gate Decor",
        desc: "Grand floral welcome gate",
        price: "₹18,000",
      },
      {
        id: 3,
        src: "/wedding3.png",
        name: "Stage Backdrop",
        desc: "Elegant floral & fairy-light backdrop",
        price: "₹22,000",
      },
      {
        id: 4,
        src: "/wedding4.png",
        name: "Aisle Walkway",
        desc: "Petal-lined aisle with lanterns",
        price: "₹15,000",
      },
      {
        id: 5,
        src: "/wedding5.png",
        name: "Reception Setup",
        desc: "Full reception hall styling",
        price: "₹35,000",
      },
    ],
  },

  {
    title: "Home Decoration",
    note: "Everyday spaces, made a little more special",
    items: [
      {
        id: 6,
        src: "/home1.png",
        name: "Living Room Refresh",
        desc: "Seasonal florals & accent styling",
        price: "₹6,000",
      },
      {
        id: 7,
        src: "/home2.png",
        name: "Balcony Makeover",
        desc: "Fairy lights & potted greens",
        price: "₹4,500",
      },
      {
        id: 8,
        src: "/home3.png",
        name: "Puja Room Decor",
        desc: "Traditional festive styling",
        price: "₹5,000",
      },
      {
        id: 9,
        src: "/home4.png",
        name: "Dining Setup",
        desc: "Table centerpiece & lighting",
        price: "₹3,500",
      },
      {
        id: 10,
        src: "/home5.png",
        name: "Entrance Decor",
        desc: "Doorway rangoli & floral toran",
        price: "₹2,500",
      },
    ],
  },

  {
    title: "Anniversary Decoration",
    note: "Candlelight, florals & romantic themes",
    items: [
      {
        id: 11,
        src: "/aniversarry1.png",
        name: "Candlelight Setup",
        desc: "Romantic candle & rose petal path",
        price: "₹8,000",
      },
      {
        id: 12,
        src: "/aniversarry2.png",
        name: "Balloon Backdrop",
        desc: "Themed balloon wall with lights",
        price: "₹6,500",
      },
      {
        id: 13,
        src: "/aniversarry3.png",
        name: "Floral Arch",
        desc: "Rose & fairy-light arch",
        price: "₹9,500",
      },
      {
        id: 14,
        src: "/aniversarry4.png",
        name: "Table for Two",
        desc: "Private dinner setup",
        price: "₹7,000",
      },
      {
        id: 15,
        src: "/aniversarry5.png",
        name: "Terrace Theme",
        desc: "Fairy-lit terrace celebration",
        price: "₹11,000",
      },
    ],
  },

  {
    title: "Child Birthday",
    note: "Playful themes, balloons & bright colours",
    items: [
      {
        id: 16,
        src: "/childbirthday1.png",
        name: "Balloon Theme Party",
        desc: "Colourful balloon arch & backdrop",
        price: "₹7,500",
      },
      {
        id: 17,
        src: "/childbirthday2.png",
        name: "Cartoon Theme Setup",
        desc: "Character cutouts & banners",
        price: "₹9,000",
      },
      {
        id: 18,
        src: "/childbirthday3.png",
        name: "Photo Booth Corner",
        desc: "Themed props & backdrop",
        price: "₹4,000",
      },
      {
        id: 19,
        src: "/childbirthday4.png",
        name: "Table & Cake Decor",
        desc: "Themed cake table styling",
        price: "₹5,500",
      },
      {
        id: 20,
        src: "/childbirthday5.png",
        name: "Full Venue Setup",
        desc: "Complete themed venue styling",
        price: "₹15,000",
      },
    ],
  },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All");

  const { addToCart, toggleLike, isLiked: isCartLiked } = useCart();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const filteredCategories =
    activeTab === "All"
      ? categories
      : categories.filter((category) => category.title === activeTab);

  const handleDirectAdd = (
    item: (typeof categories)[number]["items"][number],
    categoryTitle: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.src,
        desc: item.desc,
        category: categoryTitle,
      },
      1
    );
  };

  return (
    <section className="bg-[#FAF7F2] py-16 px-4 sm:px-8 md:px-16 text-[#1A1A1A] relative font-sans">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-amber-100 px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={14} className="text-amber-700" />

            <span className="text-xs uppercase tracking-widest font-semibold text-amber-900">
              OUR EXCLUSIVE PORTFOLIO
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-gray-900 leading-[1.15]">
            A closer look at{" "}
            <span className="italic font-light text-amber-800">
              every celebration
            </span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 gap-2 mb-12 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("All")}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition cursor-pointer ${
              activeTab === "All"
                ? "bg-amber-900 text-white"
                : "bg-white text-gray-700 border border-amber-200"
            }`}
          >
            All Collections
          </button>

          {categories.map((category) => (
            <button
              type="button"
              key={category.title}
              onClick={() => setActiveTab(category.title)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition cursor-pointer ${
                activeTab === category.title
                  ? "bg-amber-900 text-white"
                  : "bg-white text-gray-700 border border-amber-200"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="space-y-16">
          {filteredCategories.map((category) => (
            <div key={category.title} className="space-y-6">

              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-amber-200/60 pb-4 gap-1 sm:gap-2">
                <h3 className="text-xl sm:text-3xl font-serif font-normal text-gray-900 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-700 inline-block" />

                  {category.title}
                </h3>

                <p className="text-xs sm:text-sm text-amber-800/80 font-light italic">
                  {category.note}
                </p>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                {category.items.map((item) => {
                  const likedStatus = isInWishlist(item.id);

                  return (
                    <div
                      key={item.id}
                      className="group bg-white rounded-2xl overflow-hidden border border-amber-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition flex flex-col"
                    >

                      {/* Image */}
                      <div className="relative aspect-[4/5] bg-amber-50 overflow-hidden">
                        <Link
                          href={`/gallery/${item.id}`}
                          className="block w-full h-full"
                        >
                          <img
                            src={item.src}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                          />
                        </Link>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        {/* Wishlist Button */}
                        <button
                          type="button"
                          onClick={() => toggleWishlist(item)}
                          aria-label={
                            likedStatus
                              ? "Remove from wishlist"
                              : "Add to wishlist"
                          }
                          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer z-10"
                        >
                          <Heart
                            size={16}
                            className={
                              likedStatus
                                ? "fill-rose-500 text-rose-500"
                                : "text-gray-700"
                            }
                          />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col justify-between flex-1 space-y-3">

                        <Link
                          href={`/gallery/${item.id}`}
                          className="block"
                        >
                          <h4 className="font-serif text-base font-medium text-gray-900 hover:text-amber-800 transition">
                            {item.name}
                          </h4>

                          <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                            {item.desc}
                          </p>
                        </Link>

                        {/* Price + Actions */}
                        <div className="flex items-center justify-between pt-3 border-t border-amber-100 gap-2">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-medium">
                              Starts at
                            </span>

                            <span className="text-sm font-semibold text-amber-900">
                              {item.price}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">

                            {/* Add To Cart */}
                            <button
                              type="button"
                              onClick={(e) =>
                                handleDirectAdd(item, category.title, e)
                              }
                              title="Add to Basket"
                              className="w-9 h-9 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center shadow-sm transition cursor-pointer shrink-0"
                            >
                              <ShoppingBag size={15} />
                            </button>

                            {/* Book */}
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