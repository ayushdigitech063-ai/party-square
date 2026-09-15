"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, Star, Heart, ArrowRight, ShieldCheck } from "lucide-react";

export default function RingDecorationPage() {
  // Slider Data for the section below cards
  const slideImages = [
    {
      image: "/ringceremany.png",
      title: "Royal Stage & Floral Canopy",
      desc: "Exquisite floral arrangements paired with warm ambient lighting to give you a fairytale engagement backdrop."
    },
    {
      image: "/ceremanybg.png",
      title: "Bespoke Couple Seating",
      desc: "Luxurious velvet styling and gold-accented props designed exclusively for the bride and groom."
    },
    {
      image: "/ceremanybg2.png",
      title: "Magical Ambient Lighting",
      desc: "Fairy lights, chandeliers, and cold pyro effects to illuminate your unforgettable ring exchange ceremony."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide effect every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slideImages.length]);

  // Ceremony Cards Data
  const ceremonyCards = [
    {
      image: "/ceremanypic1.png",
      title: "Floral Ring Arch Backdrop",
      price: "₹12,999",
      desc: "A magnificent circular floral loop decorated with fresh roses, orchids, and warm fairy lighting for the perfect engagement backdrop."
    },
    {
      image: "/ceremanypic2.png",
      title: "Royal Couple Seating & Stage",
      price: "₹18,999",
      desc: "Stunning couple sofa setup with rich velvet drapes, golden props, and grand chandelier lighting designed specifically for your special day."
    },
    {
      image: "/ceremanypic3.png",
      title: "Aisle & Entrance Pathway Decor",
      price: "₹8,499",
      desc: "Magical entry walkway adorned with flower petals, pillar candles, and elegant cold pyro fountains to welcome the couple in style."
    },
    {
      image: "/ceremanypic4.png",
      title: "Intimate Garden Ring Setup",
      price: "₹14,999",
      desc: "Open-air romantic canopy setup with hanging fairy lights, botanical greens, and pastel floral arrangements for outdoor celebrations."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 font-sans">
      
      {/* ================= HERO SECTION WITH SINGLE CLEAR ring.png BACKGROUND ================= */}
      <section className="relative h-[550px] flex items-center justify-center overflow-hidden text-white">
        {/* Fixed Background Image ring.png with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/70 to-neutral-950/40 z-10" />
          <img src="/ring.png" alt="Ring Ceremony Background" className="w-full h-full object-cover" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-center sm:text-left">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#C5A059]/30 border border-[#C5A059]/50 px-4 py-1.5 rounded-full text-[#DFBC71] text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
              <Sparkles size={13} />
              <span>Royal Ring Ceremony Specialists</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-md">
              Where Forever Begins With A Ring
            </h1>

            <p className="text-neutral-200 text-sm sm:text-base leading-relaxed">
              Immerse your engagement day in breathtaking floral arches, ambient mood lighting, and bespoke stage backdrops tailored for romance and elegance.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 justify-center sm:justify-start">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-[#DFBC71] to-[#C5A059] text-neutral-900 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-xl hover:brightness-105 transition flex items-center space-x-2"
              >
                <span>Book Ring Ceremony</span>
                <ArrowRight size={15} />
              </Link>
              
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider transition flex items-center space-x-2"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CEREMONY CARDS GRID SECTION ================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">Exclusive Collections</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">Ring Ceremony & Couple Decor Packages</h2>
          <p className="text-neutral-600 text-sm">Explore our specialized packages crafted to make your ring exchange ceremony an absolute fairy tale.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ceremonyCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8DFD1] shadow-md hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute top-4 right-4 bg-neutral-900/80 backdrop-blur-md text-[#DFBC71] text-xs font-bold px-3 py-1 rounded-full border border-[#C5A059]/40 shadow">
                  {card.price}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-neutral-900 mb-2 group-hover:text-[#C5A059] transition">
                    {card.title}
                  </h3>
                  <p className="text-neutral-600 text-xs leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="w-full block text-center py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#FAF8F5] border border-[#C5A059]/40 text-neutral-900 hover:bg-[#C5A059] hover:text-white transition duration-300"
                >
                  Select Package
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= AUTOMATIC SLIDING GALLERY SECTION (MOVED BELOW CARDS) ================= */}
      <section className="py-20 bg-[#F5F1E9] border-t border-[#E8DFD1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">Visual Showcase</span>
            <h2 className="font-serif text-3xl font-bold">Highlights & Stage Inspirations</h2>
            <p className="text-neutral-600 text-sm">Experience the grandeur of our previous setup themes through clear visual previews.</p>
          </div>

          {/* Slider Card Container */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFD1] bg-white grid grid-cols-1 lg:grid-cols-2">
            {/* Sliding Image */}
            <div className="relative h-80 lg:h-[420px] overflow-hidden">
              {slideImages.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                  }`}
                >
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent lg:hidden" />
                </div>
              ))}
            </div>

            {/* Slide Content */}
            <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6 bg-white">
              <div className="inline-flex items-center space-x-2 bg-[#C5A059]/10 border border-[#C5A059]/30 px-3 py-1 rounded-full text-[#C5A059] text-xs font-bold tracking-widest uppercase w-max">
                <Sparkles size={13} />
                <span>Featured Highlights</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
                {slideImages[currentSlide].title}
              </h3>

              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                {slideImages[currentSlide].desc}
              </p>

              {/* Slider Dots */}
              <div className="flex space-x-2 pt-2">
                {slideImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? "w-8 bg-[#C5A059]" : "w-2 bg-neutral-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOTTOM FEATURE BANNER (WITH cardcontainer.png) ================= */}
      <section className="py-16 bg-white border-t border-[#E8DFD1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#FAF8F5] rounded-3xl border border-[#E8DFD1] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center">
            
            {/* Left Content (Love Theme) */}
            <div className="p-8 sm:p-12 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#C5A059]/10 border border-[#C5A059]/30 px-3 py-1 rounded-full text-[#C5A059] text-xs font-bold tracking-widest uppercase">
                <Heart size={13} className="text-rose-500 fill-rose-500" />
                <span>Endless Romance</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                Designed With Love, <br /><span className="text-[#C5A059]">Remembered Forever</span>
              </h2>

              <p className="text-neutral-600 text-sm leading-relaxed">
                Your engagement is the first milestone of a lifelong journey together. Our expert decorators pour passion into every petal, light, and corner to ensure your story is told with utmost elegance and grace.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3 text-xs text-neutral-700 font-medium">
                  <CheckCircle size={16} className="text-[#C5A059]" />
                  <span>Customized Theme Consultation & 3D Preview</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-neutral-700 font-medium">
                  <CheckCircle size={16} className="text-[#C5A059]" />
                  <span>Fresh Imported Flowers & Organic Balloons</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-neutral-700 font-medium">
                  <CheckCircle size={16} className="text-[#C5A059]" />
                  <span>Punctual On-Site Setup & Dedicated Manager</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 bg-neutral-900 text-white hover:bg-[#C5A059] hover:text-neutral-900 transition px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  <span>Plan Your Engagement</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Image (cardcontainer.png) */}
            <div className="relative h-80 lg:h-full min-h-[350px]">
              <img
                src="/cardcontainer.png"
                alt="Love Theme Container"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}