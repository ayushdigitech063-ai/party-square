"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, ArrowRight, Star, Heart, ShieldCheck } from "lucide-react";

export default function IndependenceDayPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const independenceDecor = [
    { id: 1, name: "Tiranga Floral & Balloon Stage Arch", price: "₹5,499", image: "/pic1.png", desc: "Vibrant saffron, white, and green floral and balloon decorations for patriotic flag hoisting ceremonies." },
    { id: 2, name: "Freedom Fighter & National Hero Backdrop", price: "₹7,899", image: "/pic2.png", desc: "Inspiring thematic stage backdrop celebrating India's freedom struggle and national pride." },
    { id: 3, name: "Society & Office Tricolor Gate Styling", price: "₹4,299", image: "/pic3.png", desc: "Grand entrance decoration with tricolor ribbons, drapes, and welcoming patriotic banners." },
    { id: 4, name: "Patriotic Lighting & Canopy Setup", price: "₹9,499", image: "/pic4.png", desc: "Special saffron-white-green ambient lighting and canopy setup for community celebrations." }
  ];

  return (
    <div className="min-h-screen text-neutral-900 font-sans bg-[#F8FAFC] selection:bg-orange-600 selection:text-white overflow-x-hidden pb-20">
      
      {/* Hero Section with background.png as Full Width & Height Background */}
      <section className="relative w-full h-[85vh] min-h-[550px] px-6 flex items-center justify-center text-center overflow-hidden my-4 sm:my-6 max-w-[96rem] mx-auto rounded-[35px] shadow-2xl">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/background.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/50 to-neutral-950/30" />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-orange-500/20 border border-orange-500/40 px-5 py-2 rounded-full text-orange-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md">
            <Sparkles size={15} className="text-orange-400" />
            <span>Happy Independence Day • Celebrating Freedom 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Proud <span className="text-orange-400 italic font-normal">Independence Day</span> Celebrations
          </h1>
          <p className="text-neutral-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Honor the spirit of freedom with majestic tricolor decorations, inspiring backdrops, and grand community event setups.
          </p>
        </div>
      </section>

      {/* Cards Section (pic1.png to pic4.png) */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-orange-600 font-bold">Patriotic Setups</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">Independence Day Decorations</h2>
          <p className="text-neutral-600 text-sm font-light">Bring out national pride with exquisite tricolor arches, stages, and entrance gates.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {independenceDecor.map((item) => (
            <div key={item.id} className="bg-white border border-orange-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">Tricolor Special</span>
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
      </section>

      {/* Video Banner Section using indepence.mp4 */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-orange-950 via-neutral-950 to-emerald-950 text-white rounded-[32px] overflow-hidden shadow-2xl border border-orange-500/30 grid grid-cols-1 lg:grid-cols-12 items-center">
          
          <div className="p-8 sm:p-12 lg:col-span-7 flex flex-col justify-center space-y-5">
            <div className="inline-flex items-center space-x-2 bg-orange-500/20 border border-orange-500/40 px-3.5 py-1.5 rounded-full text-orange-300 text-xs font-bold uppercase tracking-widest w-max">
              <ShieldCheck size={14} className="text-orange-400" />
              <span>Patriotic Spirit Showcase</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Saluting the Pride of <span className="text-orange-400 italic">Our Motherland</span>
            </h2>
            <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed font-light">
              Experience the unmatched zeal of Independence Day celebrations. From flag hoisting grounds to cultural society events, our expert decoration services bring ultimate patriotic grandeur and discipline.
            </p>
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-orange-400 shrink-0" />
                <span>Professional flag podium setup and floral decoration</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-orange-400 shrink-0" />
                <span>Complete sound system and patriotic backdrop styling</span>
              </div>
            </div>

            <div className="pt-3">
              <Link href="/contact" className="bg-orange-500 hover:bg-orange-400 text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2">
                <span>Book Independence Day Package</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 h-72 sm:h-96 w-full overflow-hidden bg-neutral-950 p-4 flex items-center justify-center">
            <video 
              src="/indepence.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
          </div>

        </div>
      </section>

    </div>
  );
}