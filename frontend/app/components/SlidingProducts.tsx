"use client";

import React from "react";

export default function SlidingProductsSection() {
  const slidingItems = [
    {
      id: 1,
      title: "Handcrafted Wooden Elegance",
      subtitle: "Traditional Lighting & Decor",
      description: "Carved by expert artisans to bring warmth and heritage into your living spaces.",
      image: "https://cdn.shopify.com/s/files/1/2690/0106/files/Lamps_3.webp?v=1726743247&width=300",
    },
    {
      id: 2,
      title: "Terracotta Ethnic Artistry",
      subtitle: "Authentic Home Accents",
      description: "Timeless clay masterpieces reflecting rich cultural roots and pure craftsmanship.",
      image: "https://exclusivelane.com/cdn/shop/products/EL-003-187_A_580x.jpg?v=1583559923",
    },
    {
      id: 3,
      title: "Rajasthani Puppet Craft",
      subtitle: "Handmade Tealight Holders",
      description: "Vibrant colors and intricate detailing designed to brighten up your festive corners.",
      image: "https://itokri.com/cdn/shop/files/rajasthani-puppet-couple-handmade-tealight-candle-holders-set-2-189.jpg?v=1765696387&width=480",
    },
    {
      id: 4,
      title: "Heritage Showpieces",
      subtitle: "Royal Festive Decor",
      description: "Exquisite decorative pieces that add an aura of grace and regal charm to your home.",
      image: "https://cdn.dotpe.in/longtail/item_thumbnails/7454576/AQNdYSzN-400-400.webp",
    },
    {
      id: 5,
      title: "Golden Lit Ambiance",
      subtitle: "Festive Illumination",
      description: "Create a serene, glowing atmosphere with our specially curated decorative lights.",
      image: "https://www.satvikstore.in/cdn/shop/collections/golden-candles-lit_1524x.jpg?v=1693309642",
    },
    {
      id: 6,
      title: "Satvik Festive Collection",
      subtitle: "Celebration Essentials",
      description: "Everything you need to make your celebrations vibrant, auspicious, and memorable.",
      image: "https://www.satvikstore.in/cdn/shop/collections/3_b52da4bb-19d2-47d2-a877-3b7680a3d694_1524x.png?v=1789728509",
    },
  ];

  const duplicatedItems = [...slidingItems, ...slidingItems];

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50/40 via-white to-orange-50/30 overflow-hidden w-full">
      {/* Section Heading */}
      <div className="text-center mb-14 px-4">
        <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase bg-amber-100/60 px-3 py-1 rounded-full">
          Artisan Showcase
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
          Handcrafted Heritage & Decor
        </h2>
        <p className="text-sm md:text-base text-gray-600 mt-2 max-w-lg mx-auto">
          Explore our exclusive design collection celebrating traditional Indian craftsmanship
        </p>
      </div>

      {/* Auto Sliding Container */}
      <div className="w-full overflow-hidden relative py-4">
        {/* Left & Right Gradient Shadows */}
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Sliding Track */}
        <div className="flex w-max animate-auto-slide gap-8 px-4 hover:[animation-play-state:paused]">
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="product-card relative w-80 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between border border-amber-100/60"
            >
              {/* Image Section */}
              <div className="relative h-56 w-full overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
                  {item.subtitle}
                </span>
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col justify-between flex-grow bg-white">
                <div>
                  <h3 className="text-base font-bold text-gray-900 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider">
                    Handmade Art
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    Pure Craft
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind Custom Animation CSS */}
      <style jsx global>{`
        @keyframes autoSlide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-auto-slide {
          animation: autoSlide 35s linear infinite;
        }
      `}</style>
    </section>
  );
}