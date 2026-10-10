"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, ArrowRight, Gift, Star } from "lucide-react";
import FAQSection from "@/app/components/FAQSection";
import { useWishlist } from "@/app/context/wishlistcontext";

import { christmasProducts } from "@/app/data/christmasProducts";
import ProductSort from "@/app/components/ProductSort";
import ProductCard from "@/app/components/ProductCard";
export default function ChristmasPage() {
  const [sortBy, setSortBy] = useState<any>("popular"); const { wishlist, toggleWishlist } = useWishlist();
  const productsToDisplay = christmasProducts;
  return (
    <div className="min-h-screen bg-[#FCFBF7]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[60vh] sm:h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105"
          style={{
            backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuPDCN2x-QQ&s=10')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/50 to-neutral-950/30" />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-[#8CBC67]/20 border border-[#8CBC67]/40 px-5 py-2 rounded-full text-[#8CBC67] text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md">
            <Sparkles size={15} className="text-[#8CBC67]" />
            <span>Merry Christmas â€¢ Season of Joy & Magic 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Enchanting{" "}
            <span className="text-[#8CBC67] italic font-normal">Christmas</span>{" "}
            Celebrations
          </h1>
          <p className="text-neutral-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Bring the magic of the North Pole to your home and parties with
            stunning Christmas trees, sparkling lights, and snowy winter themes.
          </p>
        </div>
      </section>

      {/* Naya Section: Christmas Special Highlights */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="relative mb-12">
          <div className="flex items-center justify-between gap-6">
            {/* LEFT - Heading */}
            <div className="text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8CBC67] font-bold">
                Christmas Specials
              </span>
              <div className="flex items-baseline gap-3">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522] mt-1">
                Holiday Celebration Highlights
              </h2>
              <span className="text-[#6B706C] text-2xl">|</span>

                <span className="text-[#6B706C] text-2xl">
                  {productsToDisplay.length} Items
                </span>
              </div>

              <p className="text-[#6B706C] text-sm font-light mt-2">
                Â Explore our exclusive Christmas tree setups, wrapped festive
                gifts, and special decoration essentials.
              </p>
            </div>

            {/* RIGHT - Sort */}
            <div className="shrink-0">
              <ProductSort value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productsToDisplay.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              isInWishlist={(id: string) => wishlist.some((w: any) => w.id === id)}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>

        {/* View More Products Button linked to all-products */}
        <div className="text-center mt-12">
          <Link
            href="/Festivals/christmas/all-products"
            className="inline-flex items-center space-x-2 bg-white hover:bg-neutral-950 hover:text-white text-neutral-950 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-sm border border-red-200"
          >
            <span>View More Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Full Width Video Section */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="relative w-full h-[450px] sm:h-[550px] rounded-[32px] overflow-hidden shadow-2xl border border-[#8CBC67]/30 bg-neutral-950 flex items-center justify-center">
          <video
            src="/crismas.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent flex flex-col items-center justify-end p-8 sm:p-12 text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-[#8CBC67]/30 border border-[#8CBC67]/50 px-4 py-1.5 rounded-full text-[#D7A84B] text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              <Gift size={15} className="text-[#8CBC67]" />
              <span>Magical Holiday Experience</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white max-w-2xl">
              Celebrate Christmas in{" "}
              <span className="text-[#8CBC67] italic">Grand Style</span>
            </h2>
            <p className="text-neutral-200 text-xs sm:text-sm max-w-xl font-light">
              Let professional decorators turn your venue into a breathtaking
              winter wonderland with custom lights and ornaments.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="bg-[#8CBC67] hover:bg-[#D7A84B] text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2"
              >
                <span>Book Christmas Package</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Special Card Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-neutral-900 via-stone-950 to-neutral-950 text-white rounded-[32px] overflow-hidden shadow-2xl border border-[#8CBC67]/30 grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 h-72 sm:h-96 w-full overflow-hidden bg-neutral-950 p-4 flex items-center justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBGNDDxdate3wKiX02hMXWRLTVGaun1kQpFGELKfORzOTZF-mVOHUWG9hs&s=10"
              alt="Candle and Festive Decoration"
              className="w-full h-full object-cover rounded-2xl shadow-lg hover:scale-105 transition duration-700"
            />
          </div>

          <div className="p-8 sm:p-12 lg:col-span-7 flex flex-col justify-center space-y-5">
            <div className="inline-flex items-center space-x-2 bg-[#8CBC67]/20 border border-[#8CBC67]/40 px-3.5 py-1.5 rounded-full text-[#8CBC67] text-xs font-bold uppercase tracking-widest w-max">
              <Star size={14} className="text-[#8CBC67]" />
              <span>Warm Candlelight Ambiance</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Cozy{" "}
              <span className="text-[#8CBC67] italic">
                Candlelight & Floral
              </span>{" "}
              Glow
            </h2>
            <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed font-light">
              Enhance your Christmas Eve dinner or party table setups with our
              exclusive handcrafted candle arrangements, warm glowing lanterns,
              and festive centerpiece designs.
            </p>
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-[#8CBC67] shrink-0" />
                <span>
                  Custom aromatic candles and decorative glass candle holders
                </span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-[#8CBC67] shrink-0" />
                <span>
                  Professional table styling and festive centerpiece execution
                </span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/contact"
                className="bg-[#8CBC67] hover:bg-[#D7A84B] text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2"
              >
                <span>Your Order is confirm</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <FAQSection />
    </div>
  );
}










