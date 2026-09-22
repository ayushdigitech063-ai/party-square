"use client";
import SlidingProducts from "@/app/components/SlidingProducts";
import DiwaliSection from "@/app/Festivals/diwali/DiwaliSection";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, ArrowRight, Star, Heart, Flame, ShoppingBag } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { diwaliProducts } from "@/app/data/diwaliProducts";

export default function DiwaliPage() {
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    setIsMounted(true);
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay was prevented:", error);
      });
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: String(product.id),
      name: product.name,
      price: String(product.price),
      image: product.image,
      desc: product.desc || "",
      category: "Diwali Decoration",
    });
  };

  // Best Loved Decor (items mapping to IDs 111 to 114)
  const bestLovedDecor = diwaliProducts.slice(0, 4);

  // Society Decor (items mapping to IDs 115 to 118)
  const societyDecor = diwaliProducts.slice(4, 8);

  return (
    <div className="min-h-screen text-neutral-900 font-sans bg-[#FAF7F2] selection:bg-amber-500 selection:text-white overflow-x-hidden pb-20">
      
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[550px] px-6 flex items-center justify-center text-center overflow-hidden my-4 sm:my-6 max-w-[96rem] mx-auto rounded-[35px] shadow-2xl">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/diwali.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/50 to-neutral-950/30" />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-5 py-2 rounded-full text-amber-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md">
            <Sparkles size={15} className="text-amber-400" />
            <span>Shubh Deepawali • Festival of Lights 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Divine <span className="text-amber-400 italic font-normal">Diwali</span> Celebrations
          </h1>
          <p className="text-neutral-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Illuminate your homes and societies with our breathtaking, handcrafted festive decorations, royal diya setups, and magical lighting.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 px-6 w-full max-w-[96rem] mx-auto">
        <div className="relative w-full h-[85vh] min-h-[500px] rounded-[35px] overflow-hidden shadow-2xl border border-amber-500/30 bg-neutral-950">
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/party-viedo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Signature Dipak Section linked with product id "111" */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-neutral-950 text-white rounded-[32px] overflow-hidden shadow-2xl border border-amber-500/40 grid grid-cols-1 lg:grid-cols-2 items-stretch">
          <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest">
                <Flame size={14} className="text-amber-400" />
                <span>Signature Diwali Special</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                The Auspicious Glow of <span className="text-amber-400 italic">Divine Diyas</span>
              </h2>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light">
                Welcome Goddess Lakshmi with our magnificent traditional lighting and handcrafted decorative oil lamps. Designed to bring prosperity, warmth, and divine radiance to your home during Deepawali.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle size={16} className="text-amber-400 shrink-0" />
                  <span>Handcrafted terracotta and brass designer diyas</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle size={16} className="text-amber-400 shrink-0" />
                  <span>Synchronized warm lighting & floral corner styling</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link 
                href="/Festivals/diwali/111" 
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2"
              >
                <span>Book Diwali Special</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="relative h-72 sm:h-auto w-full overflow-hidden bg-neutral-950">
            <img src="/dipak.png" alt="Diwali Dipak Setup" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
          </div>
        </div>
      </section>
<SlidingProducts/>
      {/* Trending Picks Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-bold">
            Trending This Season
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            Our Top Diwali Picks
          </h2>
          <p className="text-neutral-600 text-sm font-light">
            Handpicked festive favourites loved by our customers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestLovedDecor.slice(0, 3).map((item, index) => {
            const dynamicId = 111 + index;
            return (
              <Link
                key={dynamicId}
                href={`/Festivals/diwali/${dynamicId}`}
                className="bg-white border border-amber-100 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group justify-between cursor-pointer"
              >
                <div className="relative h-72 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} 
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-700 hover:text-rose-500 shadow transition"
                  >
                    <Heart size={18} />
                  </button>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg font-bold text-neutral-900 group-hover:text-amber-700 transition-colors">
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
                      <span className="text-neutral-900 font-bold text-lg">
                        ₹{item.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => handleAddToCart({ ...item, id: dynamicId }, e)}
                        title="Add to Cart"
                        className="bg-amber-100 hover:bg-amber-200 text-amber-900 p-2.5 rounded-full transition-colors cursor-pointer border border-amber-200 shadow-sm"
                      >
                        <ShoppingBag size={16} />
                      </button>
                      <span className="bg-neutral-950 text-white px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider group-hover:bg-amber-500 group-hover:text-neutral-950 transition shadow flex items-center space-x-1">
                        <span>Book</span>
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/Festivals/diwali/all-products"
            className="inline-flex items-center space-x-2 border-2 border-amber-500 text-amber-700 hover:bg-amber-500 hover:text-neutral-950 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition shadow-md"
          >
            <span>View More Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <DiwaliSection/>

      {/* Rangoli Showcase Card linked with product id "114" */}
      <section className="py-16 px-6 max-w-7xl mx-auto mb-10">
        <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-neutral-950 text-white rounded-[32px] overflow-hidden shadow-2xl border border-amber-500/40 grid grid-cols-1 lg:grid-cols-2 items-stretch">
          <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest">
                <Star size={14} className="text-amber-400" />
                <span>Artistic Rangoli Showcase</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Traditional & Floral <span className="text-amber-400 italic">Rangoli Masterpieces</span>
              </h2>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light">
                Enhance the beauty of your entrance with intricate floral and colored powder rangoli patterns. Handcrafted by master artists to welcome prosperity, guests, and festive joy into your home.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle size={16} className="text-amber-400 shrink-0" />
                  <span>Fresh flower petals and eco-friendly vibrant colors</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle size={16} className="text-amber-400 shrink-0" />
                  <span>Customized auspicious symbols and traditional motifs</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link 
                href="/Festivals/diwali/114" 
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2"
              >
                <span>Book Rangoli Styling</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="relative h-72 sm:h-auto w-full overflow-hidden bg-neutral-950">
            <img src="/rangoli.png" alt="Rangoli Masterpiece Setup" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
          </div>
        </div>
      </section>

    </div>
  );
}