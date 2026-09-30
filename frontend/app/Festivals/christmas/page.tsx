"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle,
  ArrowRight,
  Star,
  Heart,
  Gift,
} from "lucide-react";
import { useWishlist } from "../../context/wishlistcontext";
import { christmasProducts } from "@/app/data/christmasProducts";
import { Product } from "@/app/types/product";
import ProductCard from "@/app/components/ProductCard";


const getProductsByIds = (ids: string[]): Product[] =>
  ids
    .map((id) => christmasProducts.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

// Wishlist ko pehle jaisi hi shape milti hai (price "₹6,499" format me)

export default function ChristmasPage() {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

    const HIGHLIGHT_IDS: string[] = [
  "christmas-11",
  "christmas-12",
  "christmas-13",
];

const PACKAGE_IDS: string[] = [
  "christmas-7",
  "christmas-8",
  "christmas-9",
  "christmas-10",
];

const christmasHighlights = getProductsByIds(HIGHLIGHT_IDS);
const christmasDecor = getProductsByIds(PACKAGE_IDS);
  return (
    
    <div className="min-h-screen text-neutral-900 font-sans bg-[#F3EFE9] selection:bg-amber-400 selection:text-black overflow-x-hidden pb-20">
      {/* Hero Section with background link */}
      <section className="relative w-full h-[85vh] min-h-[550px] px-6 flex items-center justify-center text-center overflow-hidden my-4 sm:my-6 max-w-[96rem] mx-auto rounded-[35px] shadow-2xl">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmhHn1L4k6qg_HB8dffCqMkJzok0Ac3Ds1uPDCN2x-QQ&s=10')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/50 to-neutral-950/30" />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-5 py-2 rounded-full text-amber-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md">
            <Sparkles size={15} className="text-amber-400" />
            <span>Merry Christmas • Season of Joy & Magic 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Enchanting{" "}
            <span className="text-amber-300 italic font-normal">Christmas</span>{" "}
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
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-red-700 font-bold bg-red-100 px-4 py-1.5 rounded-full inline-block">Christmas Specials</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">Holiday Celebration Highlights</h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light">
            Explore our exclusive Christmas tree setups, wrapped festive gifts, and special decoration essentials.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {christmasHighlights.map((item) => (
            <ProductCard  key={item.id}
                           product={item}
                           isInWishlist={isInWishlist}
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


      {/* Christmas Cards Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-bold">
            Holiday Highlights
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            Christmas Decoration Packages
          </h2>
          <p className="text-neutral-600 text-sm font-light">
            Transform your spaces with festive trees, lights, and magical winter
            wonderlands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {christmasDecor.map((item) => {
            return (
                <ProductCard  key={item.id}
                           product={item}
                           isInWishlist={isInWishlist}
                            toggleWishlist={toggleWishlist}
                            />  
            );
          })}
        </div>
      </section>

      {/* Full Width Video Section */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="relative w-full h-[450px] sm:h-[550px] rounded-[32px] overflow-hidden shadow-2xl border border-amber-500/30 bg-neutral-950 flex items-center justify-center">
          <video
            src="/crismas.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent flex flex-col items-center justify-end p-8 sm:p-12 text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-amber-500/30 border border-amber-500/50 px-4 py-1.5 rounded-full text-amber-200 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              <Gift size={15} className="text-amber-300" />
              <span>Magical Holiday Experience</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white max-w-2xl">
              Celebrate Christmas in{" "}
              <span className="text-amber-300 italic">Grand Style</span>
            </h2>
            <p className="text-neutral-200 text-xs sm:text-sm max-w-xl font-light">
              Let professional decorators turn your venue into a breathtaking
              winter wonderland with custom lights and ornaments.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2"
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
        <div className="bg-gradient-to-r from-neutral-900 via-stone-950 to-neutral-950 text-white rounded-[32px] overflow-hidden shadow-2xl border border-amber-400/30 grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 h-72 sm:h-96 w-full overflow-hidden bg-neutral-950 p-4 flex items-center justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBGNDDxdate3wKiX02hMXWRLTVGaun1kQpFGELKfORzOTZF-mVOHUWG9hs&s=10"
              alt="Candle and Festive Decoration"
              className="w-full h-full object-cover rounded-2xl shadow-lg hover:scale-105 transition duration-700"
            />
          </div>

          <div className="p-8 sm:p-12 lg:col-span-7 flex flex-col justify-center space-y-5">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest w-max">
              <Star size={14} className="text-amber-400" />
              <span>Warm Candlelight Ambiance</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Cozy{" "}
              <span className="text-amber-300 italic">
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
                <CheckCircle size={16} className="text-amber-400 shrink-0" />
                <span>
                  Custom aromatic candles and decorative glass candle holders
                </span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-amber-400 shrink-0" />
                <span>
                  Professional table styling and festive centerpiece execution
                </span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/contact"
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2"
              >
                <span>Your Order  is confirm</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}