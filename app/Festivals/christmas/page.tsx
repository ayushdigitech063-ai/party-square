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

export default function ChristmasPage() {
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // IMPORTANT: ids yahan christmasProducts.ts ke id se EXACT match hone chahiye (string)
  const christmasDecor = [
    {
      id: "7",
      name: "Grand Christmas Tree & Lighting Setup",
      price: "₹6,499",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBGNDDxdate3wKiX02hMXWRLTVGaun1kQpFGELKfORzOTZF-mVOHUWG9hs&s=10",
      desc: "Exquisitely decorated giant Christmas tree adorned with glittering baubles, stars, and fairy lights.",
    },
    {
      id: "8",
      name: "Snowy Winter Wonderland Theme",
      price: "₹8,999",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwBYs6LfDeJ58ZmW5HwEZNKn_qpAjwdWdzCnVcbiJhLg&s=10",
      desc: "Magical artificial snow sprays, white faux fur accents, and frosty winter decor elements.",
    },
    {
      id: "9",
      name: "Santa's Grotto & Gift Corner",
      price: "₹5,899",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxK90e4AlKRqbOnIp93VEWcG9F1JeDc4Bx74lFVstsyw&s=10",
      desc: "Festive corner setup with Santa props, gift boxes, stockings, and warm festive backdrops.",
    },
    {
      id: "10",
      name: "Merry & Bright Entrance Archway",
      price: "₹7,499",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9B2yevJe49MW_IGD1rIyizOIXX7aKGfcqTaOY9nEDLg&s=10",
      desc: "Grand holiday entrance arch decorated with red-gold ornaments, pine cones, and green garlands.",
    },
  ];

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
          {[
            {
              id: "11",
              name: "Classic Christmas Tree Setup",
              price: "₹2,999",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJNpF-N-ORl2VSyHFlkFw0hadAloYxEr1HaV88lzHaiA&s=10",
              desc: "Beautifully styled festive Christmas tree adorned with ornaments and glowing fairy lights."
            },
            {
              id: "12",
              name: "Festive Gift Box Hamper",
              price: "₹1,499",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7rtYWF8eVTmkemyLGUIVHYl6Y9v4zqSq0BIFfw-w9rA&s=10",
              desc: "Exquisitely wrapped holiday gift boxes filled with seasonal surprises and festive treats."
            },
            {
              id: "13",
              name: "Premium Christmas Decoration Pack",
              price: "₹1,999",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT20nDAak0Bp07QwjqSoWK5U8M-CXEQlkx7zRgOdM2mNA&s=10",
              desc: "Complete winter decoration collection featuring hanging baubles, ribbons, and star accents."
            }
          ].map((item) => (
            <div key={item.id} className="bg-white border border-red-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">Xmas Special</span>
              </div>
              <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-base font-bold text-neutral-900">{item.name}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed font-light">{item.desc}</p>
                </div>
                
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">Starts At</span>
                    <span className="text-neutral-900 font-bold text-base">{item.price}</span>
                  </div>
                  <Link href={`/Festivals/christmas/${item.id}`} className="bg-red-600 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-red-500 transition shadow flex items-center space-x-1">
                    <span>Book</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
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
            const isLiked = isInWishlist(item.id);
            return (
              <div
                key={item.id}
                className="bg-white border border-amber-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <button
                    onClick={() => {
                      toggleWishlist(item);
                    }}
                    aria-label={
                      isLiked ? "Remove from wishlist" : "Add to wishlist"
                    }
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Heart
                      size={16}
                      className={
                        isLiked
                          ? "fill-rose-500 text-rose-500"
                          : "text-gray-700"
                      }
                    />
                  </button>
                  <span className="absolute top-3 left-3 bg-amber-500 text-neutral-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    Christmas Special
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-base font-bold text-neutral-900">
                      {item.name}
                    </h3>
                    <p className="text-neutral-500 text-xs leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">
                        Starts At
                      </span>
                      <span className="text-neutral-900 font-bold text-base">
                        {item.price}
                      </span>
                    </div>
                    <Link
                      href={`/Festivals/christmas/${item.id}`}
                      className="bg-neutral-950 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-400 hover:text-black transition shadow flex items-center space-x-1"
                    >
                      <span>Book</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
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
                <span>Book Candle Setup</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}