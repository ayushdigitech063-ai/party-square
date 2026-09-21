"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, ArrowRight, Star, ShieldCheck, Heart, Flame } from "lucide-react";

export default function DiwaliPage() {
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const bestLovedDecor = [
    { id: 1, name: "Royal Marigold & Diya Mandap", price: "₹5,499", image: "/diwali1.png", desc: "Auspicious marigold strings combined with traditional clay diyas." },
    { id: 2, name: "Grand Floral Laxmi Pujan Setup", price: "₹7,999", image: "/diwali2.png", desc: "Exquisite backdrop styling specially curated for auspicious Laxmi Pujan." },
    { id: 3, name: "Golden Fairy Light Arch", price: "₹6,299", image: "/diwali3.png", desc: "Dazzling warm fairy lights creating a magical festive aura for your home." },
    { id: 4, name: "Traditional Lotus & Toran Decor", price: "₹4,899", image: "/diwali4.png", desc: "Handcrafted torans and fresh lotus motifs to welcome Goddess Lakshmi." }
  ];

  const societyDecor = [
    { id: 5, name: "Grand Gate & Entrance Arch", price: "₹18,499", image: "/socity.png", desc: "Massive welcoming entrance gate styling with heavy lights and floral pillars for housing societies." },
    { id: 6, name: "Society Compound Lighting & Stage", price: "₹24,999", image: "/socity2.png", desc: "Complete community area illumination, stage decoration, and festive photo booths." },
    { id: 7, name: "Community Center Floral Mandap", price: "₹15,499", image: "/socity1.png", desc: "Vibrant traditional decor setup for grand community celebrations and gatherings." },
    { id: 8, name: "Festive Pathway & Tree Wrapping", price: "₹12,999", image: "/socity4.png", desc: "Stunning fairy light tree wraps and illuminated pathways across the society complex." }
  ];

  return (
    <div className="min-h-screen text-neutral-900 font-sans bg-[#FAF7F2] selection:bg-amber-500 selection:text-white overflow-x-hidden pb-20">
      
      {/* Hero Section with diwali.png */}
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

      {/* Full Width Autoplay Video Section using party-viedo.mp4 */}
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

      {/* Dipak Card Section (dipak.png with content) */}
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
              <Link href="/contact" className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2">
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
      {/* Trending Picks - 3 Product Cards + View More */}
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
    {bestLovedDecor.slice(0, 3).map((item) => (
      <div
        key={item.id}
        className="bg-white border border-amber-100 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group"
      >
        <div className="relative h-72 w-full overflow-hidden bg-neutral-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />
          <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-700 hover:text-rose-500 shadow transition">
            <Heart size={18} />
          </button>
        </div>
        <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
          <div className="space-y-1.5">
            <h3 className="font-serif text-lg font-bold text-neutral-900">
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
                {item.price}
              </span>
            </div>
            <Link
              href="/contact"
              className="bg-neutral-950 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-500 hover:text-neutral-950 transition shadow flex items-center space-x-1"
            >
              <span>Book</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* View More Button */}
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

      {/* Most Loved Decorations (diwali1 to diwali4) */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-bold">Most Loved</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">Best Loved Diwali Decorations</h2>
          <p className="text-neutral-600 text-sm font-light">Our most sought-after festive home mandap and lighting packages.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestLovedDecor.map((item) => (
            <div key={item.id} className="bg-white border border-amber-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-700 hover:text-rose-500 shadow transition">
                  <Heart size={18} />
                </button>
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
                  <Link href="/contact" className="bg-neutral-950 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-500 hover:text-neutral-950 transition shadow flex items-center space-x-1">
                    <span>Book</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Decoration in Society (socity, socity2, socity1, socity4) */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-700 font-bold bg-amber-100/70 px-4 py-1.5 rounded-full inline-block">Community Celebrations</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">Best Decoration in Society</h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light">
            Grand scale lighting, entrance gates, and community area setups for housing societies and residential complexes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {societyDecor.map((item) => (
            <div key={item.id} className="bg-white border border-amber-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute top-3 left-3 bg-amber-500 text-neutral-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">Society Special</span>
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
                  <Link href="/contact" className="bg-amber-500 text-neutral-950 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition shadow flex items-center space-x-1">
                    <span>Book</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bada Sa Card with rangoli.png */}
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
              <Link href="/contact" className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2">
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