"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, ArrowRight, Star, ShieldCheck, Heart } from "lucide-react";

export default function GaneshChaturthiPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const bestLovedDecor = [
    { id: 1, name: "Royal Lotus Mandap Decor", price: "₹4,999", image: "/ganesh1.png", desc: "Traditional floral backdrop with auspicious marigold and fresh greens." },
    { id: 2, name: "Traditional Banana Leaf Arch", price: "₹6,499", image: "/ganesh2.png", desc: "Eco-friendly natural banana trunk styling with ethnic elements." },
    { id: 3, name: "Golden Glow Backdrop", price: "₹5,999", image: "/ganesh3.png", desc: "Warm fairy lights and rich fabric drapes for a divine aura." },
    { id: 4, name: "Divine Floral Jhula Setup", price: "₹7,999", image: "/ganesh4.png", desc: "Exquisite swing decoration adorned with exotic imported flowers." }
  ];

  const exquisiteDecor = [
    { id: 5, name: "Peacock Theme Mandap", price: "₹8,499", image: "/ganesh5.png", desc: "Vibrant blue and green color palette inspired by Lord Ganesha's favorite motifs." },
    { id: 6, name: "Modak Special Floral Setup", price: "₹5,299", image: "/ganesh6.png", desc: "Sweet and charming floral arrangements focusing on divine elegance." },
    { id: 7, name: "Royal Velvet Drapes Decor", price: "₹6,999", image: "/ganesh7.png", desc: "Rich velvet textures combined with brass bells and warm lighting." },
    { id: 8, name: "Eco-Friendly Traditional Decor", price: "₹4,599", image: "/ganesh8.png", desc: "Sustainable elements designed to keep traditions alive with modern finesse." }
  ];

  const mumbaiChaRajaCards = [
    { 
      id: 11, 
      name: "The Golden Imperial Raja", 
      theme: "Golden Glow", 
      image: "/ganesh11.png", 
      desc: "Majestic golden fabric backdrops paired with royal heavy props fit for a grand celebration.",
      gradientBg: "from-amber-950 via-amber-900 to-neutral-950",
      badgeColor: "bg-amber-400 text-neutral-950"
    },
    { 
      id: 12, 
      name: "The Emerald Divine Green", 
      theme: "Green Halka", 
      image: "/ganesh12.png", 
      desc: "Lush green foliage arrangements symbolizing nature and fresh beginnings.",
      gradientBg: "from-emerald-950 via-emerald-900 to-neutral-950",
      badgeColor: "bg-emerald-400 text-neutral-950"
    },
    { 
      id: 13, 
      name: "The Crimson Royal Red", 
      theme: "Red Theme", 
      image: "/ganesh13.png", 
      desc: "Deep auspicious red drapes combined with traditional brass elements.",
      gradientBg: "from-rose-950 via-rose-900 to-neutral-950",
      badgeColor: "bg-rose-500 text-white"
    },
    { 
      id: 14, 
      name: "The Sapphire Celestial Blue", 
      theme: "Blue Theme", 
      image: "/ganesh14.png", 
      desc: "Serene celestial blue styling creating a peaceful atmosphere for Bappa.",
      gradientBg: "from-sky-950 via-sky-900 to-neutral-950",
      badgeColor: "bg-sky-400 text-neutral-950"
    }
  ];

  return (
    <div className="min-h-screen text-neutral-900 font-sans bg-[#FAF7F2] selection:bg-amber-500 selection:text-white overflow-x-hidden pb-20">
      
      {/* Hero Section with Clear bg.png Image */}
      <section className="relative w-full h-[85vh] min-h-[550px] px-6 flex items-center justify-center text-center overflow-hidden my-4 sm:my-6 max-w-[96rem] mx-auto rounded-[35px] shadow-2xl">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-100"
          style={{ backgroundImage: "url('/bg.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/50 to-neutral-950/30" />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-5 py-2 rounded-full text-amber-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md">
            <Sparkles size={15} className="text-amber-400" />
            <span>Ganpati Bappa Morya • Festive Special 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Divine <span className="text-amber-400 italic font-normal">Ganesh Chaturthi</span> Decorations
          </h1>
          <p className="text-neutral-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Welcome Lord Ganesha into your home with our breathtaking, handcrafted mandap and festive decoration setups. Pure devotion meets exquisite craftsmanship.
          </p>
        </div>
      </section>

      {/* Best Loved Decorations */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-bold">Most Loved</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">Best Loved Decorations</h2>
          <p className="text-neutral-600 text-sm font-light">Our most sought-after traditional and modern mandap designs.</p>
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

      {/* Exquisite Themes */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-bold">Exclusive Styles</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">More Exquisite Themes</h2>
          <p className="text-neutral-600 text-sm font-light">Explore alternative vibrant designs curated for your celebrations.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {exquisiteDecor.map((item) => (
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

      {/* Mumbai Cha Raja Special Cards (Fixed Mobile Order: Image on top, Content below) */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-700 font-bold bg-amber-100/70 px-4 py-1.5 rounded-full inline-block">Grand Special Collection</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">Mumbai Cha Raja Special</h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light">
            Inspired by the grandeur of Mumbai's iconic pandals with crystal-clear picture highlights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mumbaiChaRajaCards.map((card) => (
            <div key={card.id} className={`rounded-[32px] overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-r ${card.gradientBg} text-white flex flex-col lg:flex-row items-stretch group`}>
              
              {/* Content: mobile me neeche (order-2), desktop me left (lg:order-1) */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-4 order-2 lg:order-1">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow ${card.badgeColor}`}>
                      {card.theme}
                    </span>
                    <span className="text-[10px] text-amber-200/80 font-medium">Premium Large Scale</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">{card.name}</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light">
                    {card.desc}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="flex items-center space-x-1.5 text-[11px] text-amber-300 font-medium">
                    <ShieldCheck size={14} className="text-amber-400 shrink-0" />
                    <span>Includes Professional Setup & Lighting</span>
                  </div>
                  <Link href="/contact" className="inline-flex items-center justify-center space-x-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 px-5 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-wider transition shadow-lg w-full sm:w-auto">
                    <span>Book Setup</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Image: mobile me upar (order-1), desktop me right (lg:order-2) */}
              <div className="relative w-full lg:w-64 h-64 lg:h-auto overflow-hidden bg-neutral-950 order-1 lg:order-2">
                <img src={card.image} alt={card.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Masterpiece Showcase Section (Fixed Mobile Order: Image on top, Content below) */}
      <section className="py-16 px-6 max-w-7xl mx-auto mb-10">
        <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-neutral-950 text-white rounded-[32px] overflow-hidden shadow-2xl border border-amber-500/40 grid grid-cols-1 lg:grid-cols-2 items-stretch">
          
          {/* Content: mobile me neeche (order-2), desktop me left (lg:order-1) */}
          <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest">
                <Star size={14} className="text-amber-400" />
                <span>Masterpiece Showcase</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                The Ultimate Divine Experience with <span className="text-amber-400 italic">CardGaneshJi</span>
              </h2>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light">
                Elevate your home pandal with our flagship masterpiece setup. Featuring intricate detailing, premium flower garlands, traditional backdrop panels, and synchronized warm lighting designed to make your Ganesh Chaturthi celebrations unforgettable.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle size={16} className="text-amber-400 shrink-0" />
                  <span>Custom structural mandap with traditional pillars</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle size={16} className="text-amber-400 shrink-0" />
                  <span>Fresh marigold, rose, and exotic orchid decorations</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/contact" className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2">
                <span>Book Masterpiece Setup</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Image: mobile me upar (order-1), desktop me right (lg:order-2) */}
          <div className="relative h-72 sm:h-auto w-full overflow-hidden bg-neutral-950 order-1 lg:order-2">
            <img src="/cardganeshji.png" alt="Card Ganesh Ji Masterpiece" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
          </div>
        </div>
      </section>

    </div>
  );
}