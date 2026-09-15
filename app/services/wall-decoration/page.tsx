"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, Calendar, Star, ShieldCheck, ArrowRight, Heart } from "lucide-react";

export default function WallDecorationPage() {
  // Packages updated with individual images for each card
  const packages = [
    {
      id: "silver",
      name: "Classic Wall Arch",
      price: "₹2,999",
      image: "/walldecoration.png",
      desc: "Elegant and neat wall balloon styling, perfect for compact spaces.",
      features: [
        "Half/Full Wall Balloon Arch",
        "Matching Foil Curtains & Banners",
        "Easy peel-off safe wall hooks",
        "Professional installation team",
        "Duration: 2-3 Hours Setup"
      ]
    },
    {
      id: "gold",
      name: "Floral & Ring Wall Decor",
      price: "₹5,499",
      image: "/walldecoration1.png",
      popular: true,
      desc: "Stunning combination of floral loops, fairy lights, and themed wall accents.",
      features: [
        "Everything in Classic Wall Arch",
        "Metal/Wooden Ring Backdrop Setup",
        "LED Neon Sign / Custom Name Cutout",
        "Fairy lights & ambient lighting",
        "Premium organic biodegradable balloons"
      ]
    },
    {
      id: "platinum",
      name: "Grand Entrance & Wall Combo",
      price: "₹8,999",
      image: "/doordecoration.png",
      desc: "Complete wall and door decoration bundle for maximum visual impact.",
      features: [
        "Comprehensive Wall Decoration",
        "Matching Door Entrance Styling",
        "Special Photo-Booth Corner",
        "Fog or Cold Pyro entry elements",
        "Dedicated event stylist support"
      ]
    }
  ];

  // Gallery Images
  const galleryImages = [
    "/walldecoration.png",
    "/walldecoration1.png",
    "/doordecoration.png",
    "/doordecoration1.png"
  ];

  // Slider Images for the Red Card
  const sliderImages = [
    "/card.png",
    "/card2.png",
    "/card3.png"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic sliding effect every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 font-sans selection:bg-[#C5A059] selection:text-white">
      
      {/* ================= HERO BANNER (FULLY FIXED & CENTERED) ================= */}
      <section className="relative min-h-[75vh] flex items-center justify-center text-white py-24 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 w-full h-full"
          style={{
            backgroundImage: "url('/wallbg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-neutral-950/50" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/30" />

        <div className="max-w-7xl mx-auto relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#C5A059]/20 border border-[#C5A059]/50 px-4 py-2 rounded-full text-[#DFBC71] text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-lg">
              <Sparkles size={14} className="text-[#DFBC71]" />
              <span>Wall & Door Styling Specialists</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-md">
              Transform Your Walls Into <span className="text-[#DFBC71] italic font-normal">Pure Elegance</span>
            </h1>

            <p className="text-neutral-200 text-sm sm:text-base leading-relaxed drop-shadow font-light">
              Give your empty walls and entryways a stunning makeover. From mesmerizing balloon arches to artistic floral backdrops and door styling, we bring life to your celebrations.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/contact"
                className="group relative bg-gradient-to-r from-[#DFBC71] to-[#C5A059] text-neutral-950 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Book Wall Decor</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white/25 px-7 py-4 rounded-full font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="relative group flex justify-center">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#DFBC71] to-transparent rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition duration-500"></div>
            <div className="relative rounded-3xl overflow-hidden border border-[#C5A059]/40 shadow-2xl w-full h-80 sm:h-96 bg-neutral-900">
              <img src="/walldecoration.png" alt="Wall Decoration Showcase" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES HIGHLIGHTS ================= */}
      <section className="py-12 bg-white border-b border-[#E8DFD1]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD1]">
            <Star className="w-8 h-8 text-[#C5A059] mx-auto mb-2" />
            <h3 className="font-bold text-sm">Damage-Free Tape</h3>
            <p className="text-xs text-neutral-600 mt-1">Safe for paint & walls</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD1]">
            <ShieldCheck className="w-8 h-8 text-[#C5A059] mx-auto mb-2" />
            <h3 className="font-bold text-sm">Expert Installers</h3>
            <p className="text-xs text-neutral-600 mt-1">Clean & professional fitting</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD1]">
            <Calendar className="w-8 h-8 text-[#C5A059] mx-auto mb-2" />
            <h3 className="font-bold text-sm">Quick Setup</h3>
            <p className="text-xs text-neutral-600 mt-1">Ready within 2 hours</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD1]">
            <Heart className="w-8 h-8 text-[#C5A059] mx-auto mb-2" />
            <h3 className="font-bold text-sm">Custom Themes</h3>
            <p className="text-xs text-neutral-600 mt-1">Tailored to your choice</p>
          </div>
        </div>
      </section>


      {/* ================= SPECIAL RED CARD WITH IMAGE SLIDER ================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-rose-900 via-rose-800 to-red-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-rose-700/50 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-6">
            <span className="bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-rose-200 text-xs font-semibold tracking-widest uppercase inline-block backdrop-blur-md">
              Special Festive Offer
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Exclusive Premium Romantic & Festive Wall Makeover
            </h2>
            <p className="text-rose-100 text-sm sm:text-base leading-relaxed font-light">
              Enhance your special moments with our premium customized thematic packages. Designed specifically to give your living rooms or bedroom walls an elite royal touch with automatic sliding previews.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="bg-white text-rose-950 hover:bg-rose-50 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition inline-flex items-center space-x-2 shadow-lg"
              >
                <span>Book This Special Setup</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-72 sm:h-80 shadow-inner bg-black/30 border border-white/10">
            {sliderImages.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              >
                <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {sliderImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentSlide ? "bg-white w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ================= PACKAGES SECTION WITH PROPER IMAGES ================= */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">Pricing Plans</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">Choose Wall & Door Packages</h2>
          <p className="text-neutral-600 text-sm">Select from our specialized decoration packages for walls, corners, and doorways.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-xl overflow-hidden group ${
                pkg.popular ? "border-[#C5A059] ring-2 ring-[#C5A059]/20 scale-105 md:-translate-y-2" : "border-neutral-200"
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-4 right-4 z-10 bg-[#C5A059] text-neutral-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              {/* Package Image Preview */}
              <div className="relative h-56 w-full overflow-hidden bg-neutral-100 border-b border-neutral-100">
                <img 
                  src={pkg.image} 
                  alt={pkg.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>

              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-2">{pkg.name}</h3>
                  <p className="text-neutral-600 text-xs leading-relaxed mb-6">{pkg.desc}</p>
                  <div className="text-3xl font-bold text-[#C5A059] mb-6">{pkg.price}</div>

                  <div className="space-y-3 border-t border-neutral-100 pt-6">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-3 text-xs text-neutral-700">
                        <CheckCircle size={16} className="text-[#C5A059] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href="/contact"
                    className={`w-full block text-center py-3 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                      pkg.popular
                        ? "bg-[#C5A059] text-neutral-900 hover:bg-[#b08d4b] shadow-md"
                        : "bg-neutral-900 text-white hover:bg-neutral-800"
                    }`}
                  >
                    Select Package
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= GALLERY PREVIEW ================= */}
      <section className="py-16 bg-[#F5F1E9] border-t border-[#E8DFD1] mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">Visual Showcase</span>
              <h2 className="font-serif text-3xl font-bold mt-1">Wall & Door Decoration Gallery</h2>
            </div>
            <Link href="/gallery" className="mt-4 md:mt-0 text-xs font-bold text-[#C5A059] hover:underline flex items-center space-x-1">
              <span>View Full Gallery</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden shadow-md group relative h-60 border border-[#E8DFD1]">
                <img src={img} alt="Wall & Door Decor" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                  <span className="text-white text-xs font-medium tracking-wide">
                    {idx < 2 ? "Wall Decoration" : "Door Decoration"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}