"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, ArrowRight, Star, Heart, Gift } from "lucide-react";

export default function ChristmasPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const christmasDecor = [
    { id: 1, name: "Grand Christmas Tree & Lighting Setup", price: "₹6,499", image: "/crismas.png", desc: "Exquisitely decorated giant Christmas tree adorned with glittering baubles, stars, and fairy lights." },
    { id: 2, name: "Snowy Winter Wonderland Theme", price: "₹8,999", image: "/crismas1.png", desc: "Magical artificial snow sprays, white faux fur accents, and frosty winter decor elements." },
    { id: 3, name: "Santa's Grotto & Gift Corner", price: "₹5,899", image: "/crismas2.png", desc: "Festive corner setup with Santa props, gift boxes, stockings, and warm festive backdrops." },
    { id: 4, name: "Merry & Bright Entrance Archway", price: "₹7,499", image: "/crismas3.png", desc: "Grand holiday entrance arch decorated with red-gold ornaments, pine cones, and green garlands." }
  ];

  return (
    <div className="min-h-screen text-neutral-900 font-sans bg-[#F4F7FB] selection:bg-blue-600 selection:text-white overflow-x-hidden pb-20">
      
      {/* Hero Section with backgrounddecoration.png as Full Width & Height Background */}
      <section className="relative w-full h-[85vh] min-h-[550px] px-6 flex items-center justify-center text-center overflow-hidden my-4 sm:my-6 max-w-[96rem] mx-auto rounded-[35px] shadow-2xl">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/backgrounddecoration.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/50 to-neutral-950/30" />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-500/40 px-5 py-2 rounded-full text-blue-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md">
            <Sparkles size={15} className="text-blue-400" />
            <span>Merry Christmas • Season of Joy & Magic 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Enchanting <span className="text-blue-400 italic font-normal">Christmas</span> Celebrations
          </h1>
          <p className="text-neutral-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Bring the magic of the North Pole to your home and parties with stunning Christmas trees, sparkling lights, and snowy winter themes.
          </p>
        </div>
      </section>

      {/* Christmas Cards Section (crismas.png to crismas3.png) */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-blue-600 font-bold">Holiday Highlights</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">Christmas Decoration Packages</h2>
          <p className="text-neutral-600 text-sm font-light">Transform your spaces with festive trees, lights, and magical winter wonderlands.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {christmasDecor.map((item) => (
            <div key={item.id} className="bg-white border border-blue-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">Christmas Special</span>
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
                  <Link href="/contact" className="bg-neutral-950 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-blue-600 transition shadow flex items-center space-x-1">
                    <span>Book</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Width Video Section using crismas.mp4 (Edge-to-Edge Stretched) */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="relative w-full h-[450px] sm:h-[550px] rounded-[32px] overflow-hidden shadow-2xl border border-blue-500/30 bg-neutral-950 flex items-center justify-center">
          <video 
            src="/crismas.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent flex flex-col items-center justify-end p-8 sm:p-12 text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-blue-500/30 border border-blue-500/50 px-4 py-1.5 rounded-full text-blue-200 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              <Gift size={15} className="text-blue-300" />
              <span>Magical Holiday Experience</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white max-w-2xl">
              Celebrate Christmas in <span className="text-blue-400 italic">Grand Style</span>
            </h2>
            <p className="text-neutral-200 text-xs sm:text-sm max-w-xl font-light">
              Let professional decorators turn your venue into a breathtaking winter wonderland with custom lights and ornaments.
            </p>
            <div className="pt-2">
              <Link href="/contact" className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2">
                <span>Book Christmas Package</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Special Card with Blue Background & candeldecoration.png on Left */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-neutral-950 text-white rounded-[32px] overflow-hidden shadow-2xl border border-blue-400/30 grid grid-cols-1 lg:grid-cols-12 items-center">
          
          <div className="lg:col-span-5 h-72 sm:h-96 w-full overflow-hidden bg-neutral-950 p-4 flex items-center justify-center">
            <img src="/candeldecoration.png" alt="Candle and Festive Decoration" className="w-full h-full object-cover rounded-2xl shadow-lg hover:scale-105 transition duration-700" />
          </div>

          <div className="p-8 sm:p-12 lg:col-span-7 flex flex-col justify-center space-y-5">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-500/40 px-3.5 py-1.5 rounded-full text-blue-300 text-xs font-bold uppercase tracking-widest w-max">
              <Star size={14} className="text-blue-400" />
              <span>Warm Candlelight Ambiance</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Cozy <span className="text-blue-400 italic">Candlelight & Floral</span> Glow
            </h2>
            <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed font-light">
              Enhance your Christmas Eve dinner or party table setups with our exclusive handcrafted candle arrangements, warm glowing lanterns, and festive centerpiece designs.
            </p>
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-blue-400 shrink-0" />
                <span>Custom aromatic candles and decorative glass candle holders</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-blue-400 shrink-0" />
                <span>Professional table styling and festive centerpiece execution</span>
              </div>
            </div>

            <div className="pt-3">
              <Link href="/contact" className="bg-blue-400 hover:bg-blue-300 text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2">
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