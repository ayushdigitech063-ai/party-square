"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight, Gift, ChevronDown, Sparkles, Star } from "lucide-react";

export default function MotherBirthdayPage() {
  // Gallery images for mother's special decor
  const motherGallery = [
    "/motherbirthday.png",
    "/motherbirthdaymom.png",
    "/motherbirthdaymom1.png",
    "/motherbirthdaymom2.png"
  ];

  // Compact & Elegant Birthday Packages
  const motherPackages = [
    {
      id: 1,
      image: "/motherbirthday.png",
      name: "Graceful Floral Arch",
      price: "₹4,999",
      desc: "Soft pastel floral arrangements paired with warm fairy lights and elegant cake table styling."
    },
    {
      id: 2,
      image: "/motherbirthdaymom.png",
      name: "Queen Mother Milestone",
      price: "₹7,999",
      popular: true,
      desc: "Grand backdrop styling with luxurious drapes, metallic balloon accents & memory photo corner."
    },
    {
      id: 3,
      image: "/motherbirthdaymom1.png",
      name: "Family Celebration Bundle",
      price: "₹11,999",
      desc: "Complete luxury transformation including entrance pathway decor, cold pyros & LED setup."
    }
  ];

  // Active hover state for interactive cards feedback
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 font-sans selection:bg-[#C5A059] selection:text-white">
      
      {/* ================= HERO SECTION WITH motherbirthdayhome.png ================= */}
      <section className="relative h-[85vh] min-h-[650px] flex items-center justify-center overflow-hidden text-white">
        <div 
          className="absolute inset-0 z-0 w-full h-full transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: "url('/motherbirthdayhome.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Rich gradient overlays for absolute clarity & readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-neutral-950/90 via-neutral-950/70 to-neutral-950/40" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/30" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#C5A059]/20 border border-[#C5A059]/50 px-4 py-2 rounded-full text-[#DFBC71] text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-lg">
              <Heart size={14} className="text-rose-400 fill-rose-400" />
              <span>Mother's Special Tribute Celebration</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] drop-shadow-md">
              Celebrate the Woman Who <span className="text-[#DFBC71] italic font-normal">Gave You Everything</span>
            </h1>

            <p className="text-neutral-200 text-base sm:text-lg font-light leading-relaxed drop-shadow">
              Make her birthday as warm, loving, and beautiful as her heart. From graceful floral aesthetics to emotional memory setups, we design moments she will treasure forever.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/contact"
                className="group relative bg-gradient-to-r from-[#DFBC71] to-[#C5A059] text-neutral-950 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-2xl hover:shadow-[#C5A059]/30 hover:scale-105 transition-all duration-300 flex items-center space-x-2 overflow-hidden"
              >
                <span className="relative z-10">Book Mother's Decor</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white/25 hover:border-white px-7 py-4 rounded-full font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg flex items-center space-x-2"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-20 transform -translate-x-1/2 animate-bounce opacity-80 text-white">
          <ChevronDown size={28} />
        </div>
      </section>

      {/* ================= COMPACT & SLEEK CARDS SECTION ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-bold">Bespoke Collections</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900">Designed with Love & Elegance</h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light">Compact, hand-picked themes crafted exclusively for mothers and milestone birthdays.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {motherPackages.map((pkg) => (
            <div
              key={pkg.id}
              onMouseEnter={() => setActiveCard(pkg.id)}
              onMouseLeave={() => setActiveCard(null)}
              className={`group relative rounded-3xl bg-white transition-all duration-500 p-7 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-2 border ${
                pkg.popular 
                  ? "border-2 border-[#C5A059] ring-4 ring-[#C5A059]/10" 
                  : activeCard === pkg.id 
                    ? "border-[#C5A059]/60 shadow-xl" 
                    : "border-neutral-200/80"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#DFBC71] to-[#C5A059] text-neutral-950 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                  Most Preferred
                </div>
              )}

              <div>
                <div className="relative h-56 rounded-2xl overflow-hidden mb-6 bg-neutral-100 border border-neutral-100">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 bg-neutral-950/85 text-[#DFBC71] text-xs font-bold px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-md border border-white/10">
                    {pkg.price}
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-2.5 group-hover:text-[#C5A059] transition-colors">{pkg.name}</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6 font-light">{pkg.desc}</p>
              </div>

              <div>
                <Link
                  href="/contact"
                  className={`w-full block text-center py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    pkg.popular
                      ? "bg-gradient-to-r from-[#DFBC71] to-[#C5A059] text-neutral-950 hover:shadow-lg hover:scale-[1.02]"
                      : "bg-neutral-900 text-white hover:bg-[#C5A059] hover:text-neutral-950 shadow-md"
                  }`}
                >
                  Select This Theme
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= GALLERY SECTION ================= */}
      <section className="py-24 bg-[#EFEADB]/60 border-t border-[#E2D2B0]/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#8C6D24] font-semibold">Precious Moments</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 mt-2">Moments That Bring Tears of Joy</h2>
            </div>
            <Link 
              href="/contact" 
              className="shrink-0 bg-white text-neutral-900 px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest border border-neutral-300 hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all duration-300 flex items-center space-x-2 shadow-sm"
            >
                <span>Plan Her Surprise</span>
                <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {motherGallery.map((img, idx) => (
              <div key={idx} className="h-72 rounded-3xl overflow-hidden shadow-lg border-2 border-white group relative bg-neutral-200">
                <img src={img} alt={`Mother Setup ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-white text-xs font-semibold tracking-wider translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    Elegance Decor #{idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEW GRAND MOM CONTENT & mom.png BANNER ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white shadow-2xl border border-white/10">
          
          {/* Subtle background glow accents */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center p-8 sm:p-12 lg:p-16 gap-12">
            
            {/* Left Column: Emotional Mom Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#C5A059]/20 border border-[#C5A059]/40 px-4 py-1.5 rounded-full text-[#DFBC71] text-xs font-semibold tracking-widest uppercase">
                <Sparkles size={13} className="text-[#DFBC71]" />
                <span>A Tribute to Motherly Love</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Because Her Smile Means <span className="text-[#DFBC71] italic">The World to Us</span>
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                A mother is our first friend, our constant guide, and our greatest protector. Day after day, she pours her heart into nurturing our happiness without asking for anything in return. Her birthday isn't just a day on the calendar—it’s a celebration of her grace, her boundless sacrifices, and the endless warmth she brings into our lives.
              </p>

              <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                Let’s honor her with a surprise that tells her just how deeply she is loved. Our bespoke decor designs are thoughtfully curated to bring tears of joy to her eyes and create a memory she will cherish for a lifetime.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-[#DFBC71] to-[#C5A059] text-neutral-950 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                >
                  <span>Book Surprise for Mom</span>
                  <ArrowRight size={15} />
                </Link>
                
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/25 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 hover:border-white px-7 py-4 rounded-full font-medium text-xs uppercase tracking-widest transition-all duration-300"
                >
                  Chat with Designer
                </a>
              </div>
            </div>

            {/* Right Column: mom.png image with luxurious border & frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C5A059]/50 group">
                <img 
                  src="/mom.png" 
                  alt="Mom Special Moment" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent flex items-end p-6">
                  <div>
                    <p className="text-[#DFBC71] text-xs font-semibold uppercase tracking-widest mb-1">Forever Loved</p>
                    <p className="text-white font-serif text-xl font-medium">Mom, You Are Our Queen</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}