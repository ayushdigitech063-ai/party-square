"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, ArrowRight, Star, Heart, Flame } from "lucide-react";

export default function NavratriPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const mataJiPandalDecor = [
    { id: 1, name: "Divine Mata Ji Royal Darbar Setup", price: "₹8,499", image: "/mata.png", desc: "Auspicious flower backdrops and traditional chowki setup for divine Mata Ji worship." },
    { id: 2, name: "Grand Navdurga Floral Mandap", price: "₹12,999", image: "/mata1.png", desc: "Exquisite floral decorations and lighting dedicated to the nine forms of Goddess Durga." },
    { id: 3, name: "Akhand Jyoti & Prasad Station", price: "₹4,599", image: "/mata2.png", desc: "Sacred corner arrangement for sacred flames, traditional offerings, and bhog." },
    { id: 4, name: "Traditional Ghatasthapana Decor", price: "₹6,299", image: "/mata3.png", desc: "Authentic ritualistic setup for Kalash sthapana with fresh mango leaves and holy coconuts." }
  ];

  const specialGarbaPandal = [
    { id: 5, name: "Vibrant Garba Night Stage & Backdrop", price: "₹18,999", image: "/garba.png", desc: "High-energy colorful stage styling with traditional hangings and ethnic motifs for dandiya nights." },
    { id: 6, name: "Society Dandiya Ground Illumination", price: "₹24,999", image: "/garba1.png", desc: "Complete ground fairy lighting, colorful umbrellas, and traditional dandiya event setup." },
    { id: 7, name: "Traditional Chaniya Choli Photo Booth", price: "₹9,499", image: "/garba2.png", desc: "Stunning ethnic photo corner styled with traditional props and colourful Gujarati prints." },
    { id: 8, name: "Dhol & Folk Beats Pandal Canopy", price: "₹15,499", image: "/garba3.png", desc: "Overhead canopy drapes and vibrant cultural elements for community Garba celebrations." }
  ];

  return (
    <div className="min-h-screen text-neutral-900 font-sans bg-[#FFFDF9] selection:bg-rose-600 selection:text-white overflow-x-hidden pb-20">
      
      {/* Hero Section with beground.png as Full Width & Height Background */}
      <section className="relative w-full h-[85vh] min-h-[550px] px-6 flex items-center justify-center text-center overflow-hidden my-4 sm:my-6 max-w-[96rem] mx-auto rounded-[35px] shadow-2xl">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/beground.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/50 to-neutral-950/30" />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-rose-500/20 border border-rose-500/40 px-5 py-2 rounded-full text-rose-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md">
            <Sparkles size={15} className="text-rose-400" />
            <span>Shubh Navratri • Festival of Divine Grace 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Divine <span className="text-rose-400 italic font-normal">Navratri</span> Celebrations
          </h1>
          <p className="text-neutral-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Welcome Goddess Durga with exquisite Mata Ji pandals, vibrant Garba nights, and mesmerizing traditional decorations.
          </p>
        </div>
      </section>

      {/* Mata Ji Pandal Cards Section (mata.png to mata3.png) */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-rose-600 font-bold">Mata Ji Pandal</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">Sacred Mata Ji Decorations</h2>
          <p className="text-neutral-600 text-sm font-light">Bring divine blessings and spiritual aura to your home and community pandals.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mataJiPandalDecor.map((item) => (
            <div key={item.id} className="bg-white border border-rose-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
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
                  <Link href="/contact" className="bg-neutral-950 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-rose-600 transition shadow flex items-center space-x-1">
                    <span>Book</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Garba Pandal Section (garba.png to garba3.png) */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-rose-700 font-bold bg-rose-100 px-4 py-1.5 rounded-full inline-block">Garba Nights</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">Special Garba Pandal Decor</h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light">
            High-energy stage setups, traditional umbrella decorations, and vibrant lighting for unforgettable Dandiya nights.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {specialGarbaPandal.map((item) => (
            <div key={item.id} className="bg-white border border-rose-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">Garba Special</span>
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
                  <Link href="/contact" className="bg-rose-600 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-rose-500 transition shadow flex items-center space-x-1">
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