"use client";

import React from "react";
import Link from "next/link";
import { birthdayProducts } from "./data/kidsbirthdayproduct";
import {
  Sparkles,
  CheckCircle,
  Star,
  Heart,
  ShieldCheck,
  Gift,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

export default function BirthdayServicePage() {
  // Gallery images for child birthdays
  const childGallery = [
    "/childbirthday1.png",
    "/childbirthday2.png",
    "/childbirthday3.png",
    "/childbirthday4.png",
    "/childbirthday5.png",
  ];

  // Birthday Packages Cards
  const birthdayPackages = [
    {
      id: 1,
      image: "/birthdaydesign.png",
      name: "Luxury Balloon Styling",
      price: "₹3,999",
      desc: "Elegant pastel or metallic balloon arches, thematic backdrop curtains, and premium foil number/name cutouts.",
    },
    {
      id: 2,
      image: "/birthdaykids.png",
      name: "Kids Magical Theme Decor",
      price: "₹6,499",
      popular: true,
      desc: "Cartoon/Superheroes thematic setups, cutouts, welcoming balloon pillars, and vibrant kids-friendly party props.",
    },
    {
      id: 3,
      image: "/bithdayparty.png",
      name: "Grand Birthday Party Bundle",
      price: "₹10,999",
      desc: "Complete end-to-end birthday decoration including cake table styling, entrance gates, fairy lights, and cold pyro.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 font-sans">
      {/* ================= HERO SECTION WITH FULL BACKGROUND IMAGE ================= */}
      <section className="relative h-[75vh] min-h-[600px] flex items-center justify-center overflow-hidden text-white">
        {/* Background Image Container with full cover and center positioning */}
        <div
          className="absolute inset-0 z-0 w-full h-full"
          style={{
            backgroundImage: "url('/birthdayhomepage.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Luxury gradient overlay for text readability on left side */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-neutral-950/95 via-neutral-950/70 to-neutral-950/30" />

        {/* Hero Content on Left Side */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center space-x-3 bg-[#C5A059]/20 border border-[#C5A059]/50 px-5 py-2.5 rounded-full text-[#DFBC71] text-sm font-medium tracking-widest uppercase backdrop-blur-sm">
              <Gift size={16} />
              <span>India's Premier Birthday Stylists</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-xl">
              Make Every Birthday{" "}
              <span className="text-[#DFBC71] italic">Unforgettable</span>
            </h1>

            <p className="text-neutral-200 text-lg max-w-2xl font-light leading-relaxed">
              Transform your special day into a magical wonderland. From
              whimsical kids' themes to luxurious milestone birthday setups, we
              create joy filled with vibrant colors and elegance.
            </p>

            <div className="flex flex-wrap gap-5 pt-4">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-[#DFBC71] to-[#C5A059] text-neutral-950 px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest shadow-xl hover:brightness-105 transition flex items-center space-x-3"
              >
                <span>Book Birthday Decor</span>
                <ArrowRight size={18} />
              </Link>

              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/25 px-10 py-4 rounded-full font-semibold text-sm uppercase tracking-widest transition flex items-center space-x-3"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 z-20 transform -translate-x-1/2 animate-bounce opacity-75 text-white">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* ================= BIRTHDAY PACKAGES CARDS SECTION ================= */}
      <section id="packages" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">
            Party Packages
          </span>
          <h2 className="font-serif text-5xl md:text-6xl font-bold">
            Choose Your Birthday Theme
          </h2>
          <p className="text-neutral-600 text-lg font-light">
            Explore our specialized decoration packages crafted to bring smiles
            and unforgettable memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {birthdayPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-3xl bg-white border transition-all duration-300 p-8 flex flex-col justify-between shadow-xl hover:shadow-2xl ${
                pkg.popular
                  ? "border-2 border-[#C5A059] ring-4 ring-[#C5A059]/10 scale-105 md:-translate-y-3"
                  : "border-neutral-200"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-[#C5A059] text-neutral-900 text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-full shadow-xl">
                  Most Loved
                </div>
              )}

              <div>
                <div className="relative h-56 rounded-2xl overflow-hidden mb-8 border border-neutral-100 shadow-inner">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-neutral-900/80 text-[#DFBC71] text-sm font-bold px-5 py-2.5 rounded-full backdrop-blur-md shadow-lg">
                    {pkg.price}
                  </div>
                </div>

                <h3 className="font-serif text-3xl font-semibold text-neutral-900 mb-3">
                  {pkg.name}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-8">
                  {pkg.desc}
                </p>
              </div>

              <div>
                <Link
                  href="/contact"
                  className={`w-full block text-center py-4 rounded-full text-sm font-bold uppercase tracking-wider transition ${
                    pkg.popular
                      ? "bg-[#C5A059] text-neutral-900 hover:bg-[#b08d4b] shadow-lg"
                      : "bg-neutral-900 text-white hover:bg-neutral-800"
                  }`}
                >
                  Select Package
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kids Birthday products */}

      <section className="py-16 px-6 max-w-7xl mx-auto">
  <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
    <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-bold">
       Kids Collection
    </span>
    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
       Kids Birthday Products
    </h2>
    <p className="text-neutral-600 text-sm font-light">
      Discover fun and colorful birthday products designed to make every
            child's celebration extra special.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {birthdayProducts.map((product) => (
      <div
        key={product.id}
        className="bg-white border border-amber-100 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group"
      >
        <div className="relative h-72 w-full overflow-hidden bg-neutral-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />
          <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-700 hover:text-rose-500 shadow transition">
            <Heart size={18} />
          </button>
        </div>
        <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
          <div className="space-y-1.5">
            <h3 className="font-serif text-lg font-bold text-neutral-900">
              {product.name}
            </h3>
            <p className="text-neutral-500 text-xs leading-relaxed font-light">
              {product.description}
            </p>
          </div>

          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">
                Starts At
              </span>
              <span className="text-neutral-900 font-bold text-lg">
                {product.price}
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
</section>

      {/* ================= KIDS & SPECIAL BIRTHDAY GALLERY SECTION ================= */}
      <section className="py-24 bg-[#EFEADB] border-t border-[#E2D2B0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C6D24] font-medium">
                Moments of Joy
              </span>
              <h2 className="font-serif text-5xl md:text-6xl text-neutral-900 mt-2 leading-tight">
                Kids & Special Birthday Gallery
              </h2>
              <p className="text-neutral-700 text-lg font-light mt-4">
                A glimpse into our joyous setups featuring wonderful decorations
                for kids and milestones.
              </p>
            </div>
            <Link
              href="/gallery"
              className="shrink-0 bg-white text-neutral-900 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest border border-neutral-300 hover:border-[#C5A059] hover:text-[#8C6D24] transition flex items-center space-x-2 shadow-sm"
            >
              <span>View Full Gallery</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            {childGallery.map((img, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-3xl overflow-hidden shadow-lg border border-white group"
              >
                <img
                  src={img}
                  alt={`Child Birthday Scene ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GRAND BOTTOM BANNER SECTION (cardbanner.png) ================= */}
      <section className="relative w-full py-24 mt-16 overflow-hidden">
        <div
          className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/cardbanner.png')",
          }}
        />

        <div className="absolute inset-0 z-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-neutral-950/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 text-center lg:text-left lg:flex lg:items-center lg:justify-between gap-12">
          <div className="space-y-6 lg:max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-[#C5A059]/20 border border-[#C5A059]/40 px-4 py-1.5 rounded-full text-[#DFBC71] text-xs font-semibold tracking-widest uppercase">
              <Star size={13} className="text-rose-400 fill-rose-400" />
              <span>Book Your Experience</span>
            </div>

            <h2 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
              Ready to Create a <br />
              <span className="text-[#DFBC71]">Masterpiece of Joy?</span>
            </h2>

            <p className="text-neutral-200 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              Contact DreamDeco today to discuss your vision. Our expert
              stylists are excited to craft a bespoke, magical celebration that
              you and your guests will remember forever.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-5 pt-10 lg:pt-0 shrink-0 justify-center">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-[#DFBC71] to-[#C5A059] text-neutral-950 px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform duration-300 flex items-center justify-center space-x-2"
            >
              <span>Get Free Quote</span>
              <ArrowRight size={18} />
            </Link>

            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur-sm border border-white/20 text-white px-12 py-5 rounded-full font-medium text-sm uppercase tracking-widest hover:bg-white/15 transition duration-300 text-center"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
