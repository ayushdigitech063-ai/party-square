"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, ArrowRight, Star, Flame, Heart } from "lucide-react";

export default function LohriPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const traditionalLohriDecor = [
    { id: 1, name: "Traditional Bonfire & Seating Setup", price: "₹6,499", image: "/loripic1.png", desc: "Authentic traditional bonfire arrangement with comfortable ethnic floor seating for family." },
    { id: 2, name: "Peanuts, Popcorn & Revri Station", price: "₹3,999", image: "/loripic2.png", desc: "Traditional festive snacking station decorated with rustic Punjabi elements and bells." },
    { id: 3, name: "Dhol & Folk Music Corner", price: "₹8,499", image: "/loripic3.png", desc: "Vibrant cultural corner styling featuring traditional Dhol, phulkari props, and folk elements." },
    { id: 4, name: "Warm Marigold & Sugarcane Arch", price: "₹5,899", image: "/loripic4.png", desc: "Fresh sugarcane stalks intertwined with bright marigold flowers for auspicious welcomes." }
  ];

  const specialPunjabiLohri = [
    { id: 5, name: "Royal Phulkari Backdrop & Mandap", price: "₹12,499", image: "/loripic5.png", desc: "Exquisite handmade colorful phulkari cloth backdrop curated for grand Lohri celebrations." },
    { id: 6, name: "Bhangra & Folk Dance Stage Decor", price: "₹16,999", image: "/loripic6.png", desc: "High-energy stage decoration with traditional Punjabi props, lights, and vibrant drapes." },
    { id: 7, name: "Desi Ghee & Til Sweets Station", price: "₹4,999", image: "/loripic7.png", desc: "Traditional winter festive counter highlighting sesame sweets, jaggery, and festive treats." },
    { id: 8, name: "Grand Bonfire & Lighting Canopy", price: "₹19,999", image: "/loripic8.png", desc: "Spectacular overhead canopy lights and bonfire enclosure for community and family feasts." }
  ];

  return (
    <div className="min-h-screen text-neutral-900 font-sans bg-[#FFF9F5] selection:bg-orange-600 selection:text-white overflow-x-hidden pb-20">
      
      {/* Hero Section with loribgpic.png as Background */}
      <section className="relative w-full h-[85vh] min-h-[550px] px-6 flex items-center justify-center text-center overflow-hidden my-4 sm:my-6 max-w-[96rem] mx-auto rounded-[35px] shadow-2xl">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/loribgpic.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/50 to-neutral-950/30" />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-orange-500/20 border border-orange-500/40 px-5 py-2 rounded-full text-orange-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md">
            <Flame size={15} className="text-orange-400" />
            <span>Happy Lohri • Festival of Harvest & Warmth 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Joyful <span className="text-orange-400 italic font-normal">Lohri</span> Celebrations
          </h1>
          <p className="text-neutral-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Celebrate the harvest season around the sacred bonfire with traditional Punjabi decor, folk music vibes, and vibrant cultural setups.
          </p>
        </div>
      </section>

      {/* Traditional Lohri Cards Section (3 Cards + View More Button) */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-orange-600 font-bold">Traditional Setup</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">Essential Lohri Decorations</h2>
          <p className="text-neutral-600 text-sm font-light">Bring warmth and authentic Punjabi tradition to your home festivities.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {traditionalLohriDecor.slice(0, 3).map((item) => (
            <div key={item.id} className="bg-white border border-orange-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
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
                  <Link href="/contact" className="bg-neutral-950 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition shadow flex items-center space-x-1">
                    <span>Book</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Products Button */}
        <div className="text-center mt-12">
          <Link 
            href="/Festivals/lohri/all-products" 
            className="inline-flex items-center space-x-2 bg-white hover:bg-neutral-950 hover:text-white text-neutral-950 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-sm border border-orange-200"
          >
            <span>View More Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Compact Grand Banner using lori.png with Clear Image Display */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-orange-950 via-amber-950 to-neutral-950 text-white rounded-[28px] overflow-hidden shadow-xl border border-orange-500/30 grid grid-cols-1 lg:grid-cols-12 items-center">
          
          <div className="p-6 sm:p-10 lg:col-span-7 flex flex-col justify-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-orange-500/20 border border-orange-500/40 px-3 py-1 rounded-full text-orange-300 text-[11px] font-bold uppercase tracking-widest w-max">
              <Sparkles size={13} className="text-orange-400" />
              <span>Grand Festival Highlight</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              The Spirit of <span className="text-orange-400 italic">Punjabi Festivity</span>
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light">
              Immerse yourself in high-spirited folk dances, soul-stirring music, and traditional bonfire rituals. Our grand Lohri setups guarantee an unforgettable celebration filled with joy, peanuts, popcorn, and prosperity.
            </p>
            <div className="space-y-2 pt-1">
              <div className="flex items-center space-x-2 text-xs text-neutral-200">
                <CheckCircle size={14} className="text-orange-400 shrink-0" />
                <span>Safe and managed bonfire styling with seating arrangements</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-neutral-200">
                <CheckCircle size={14} className="text-orange-400 shrink-0" />
                <span>Authentic cultural props and ethnic photo booths</span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/contact" className="bg-orange-500 hover:bg-orange-400 text-neutral-950 px-6 py-3 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-lg inline-flex items-center space-x-2">
                <span>Book Grand Lohri Package</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 h-64 sm:h-80 w-full overflow-hidden bg-neutral-900 p-3 sm:p-4 flex items-center justify-center">
            <img src="/lori.png" alt="Grand Lohri Celebration Banner" className="w-full h-full object-cover rounded-2xl shadow-md" />
          </div>

        </div>
      </section>

      {/* Special Punjabi Lohri Section (loripic5 to loripic8) */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-orange-700 font-bold bg-orange-100 px-4 py-1.5 rounded-full inline-block">Cultural Special</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">Special Punjabi Lohri Decor</h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light">
            Exquisite phulkari styling, bhangra dance stages, and rich traditional arrangements for ultimate festive delight.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {specialPunjabiLohri.map((item) => (
            <div key={item.id} className="bg-white border border-orange-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">Punjabi Special</span>
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
                  <Link href="/contact" className="bg-orange-600 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-orange-500 transition shadow flex items-center space-x-1">
                    <span>Book</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}