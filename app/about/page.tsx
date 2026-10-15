"use client";

import React, { useState } from "react";
import { Sparkles, Heart, Award, CheckCircle2, ArrowRight, ShieldCheck, Users, Compass, Building2 } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/app/context/wishlistcontext";
import ProductCard from "@/app/components/ProductCard";
import ProductSort from "@/app/components/ProductSort";
import { corporateProducts } from "@/app/data/corporateProducts";

export default function AboutPage() {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [sortBy, setSortBy] = useState<"recommended" | "price-low" | "price-high">("recommended");

  const getPrice = (price: string | number) => {
    if (typeof price === "number") return price;
    const value = Number(String(price).replace(/[₹,]/g, "").trim());
    return Number.isNaN(value) ? Infinity : value;
  };

  const sortedProducts = [...corporateProducts].sort((a, b) => {
    if (sortBy === "price-low") return getPrice(a.price) - getPrice(b.price);
    if (sortBy === "price-high") return getPrice(b.price) - getPrice(a.price);
    return 0;
  });

  const productsToDisplay = sortBy === "recommended" ? corporateProducts : sortedProducts;
  return (
    <div className="w-full bg-[#F3EFE9] font-sans text-[#202522] selection:bg-[#8CBC67] selection:text-white overflow-hidden">
      
      {/* ================= HERO BANNER ================= */}
      <section className="relative w-full min-h-[480px] sm:h-[520px] py-10 sm:py-0 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/home2.png" 
            alt="Party Square Luxury Story" 
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-4 pt-10">
          <div className="inline-flex items-center space-x-2 bg-[#8CBC67]/20 backdrop-blur-md border border-[#8CBC67]/50 px-4 py-1.5 rounded-full text-[#8CBC67] text-xs uppercase tracking-[0.25em] font-semibold shadow-lg">
            <Sparkles size={13} className="text-[#8CBC67]" />
            <span>The Art of Celebration</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-wide text-white drop-shadow-md">
            Designing Dreams, <br />
            <span className="italic font-normal text-[#8CBC67]">Inspiring Emotions</span>
          </h1>

          <p className="text-neutral-200 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Discover the philosophy, passion, and meticulous craftsmanship behind Party Square — India&apos;s premier luxury event styling house.
          </p>
        </div>
      </section>

      {/* ================= OUR STORY & VISION (Asymmetric Layout) ================= */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[450px] sm:h-[520px] rounded-[32px] overflow-hidden border border-[#E8E8E3] shadow-2xl">
              <img 
                src="/homepage.png" 
                alt="Party Square Craftsmanship" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md border border-[#E8E8E3] p-6 rounded-2xl shadow-lg">
                <p className="font-serif italic text-[#202522] text-base leading-relaxed">
                  "We don't just decorate venues; we curate immersive environments where your happiest memories come to life."
                </p>
              </div>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#EEF6EB] border border-[#E8E8E3] px-3.5 py-1 rounded-full text-[#8CBC67] text-xs uppercase tracking-widest font-medium">
              <Heart size={12} className="text-[#8CBC67]" />
              <span>Our Heritage</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-[#202522] leading-tight">
              Rooted in Passion, <span className="italic text-[#8CBC67]">Elevated by Design</span>
            </h2>

            <p className="text-[#6B706C] text-sm md:text-base font-light leading-relaxed">
              Founded over a decade ago, Party Square started with a simple belief: that every milestone deserves a stage as grand as the emotions behind it. What began as a boutique floral styling initiative has evolved into an elite creative agency trusted by families, corporate giants, and luxury hosts across the country.
            </p>

            <p className="text-[#6B706C] text-sm md:text-base font-light leading-relaxed">
              Our team consists of master florists, spatial architects, lighting technicians, and dedicated producers who treat every project like a blank canvas waiting to be transformed into high art.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#E8E8E3]/60">
              <div>
                <h4 className="text-3xl font-serif font-bold text-[#8CBC67]">100%</h4>
                <p className="text-xs text-[#6B706C] uppercase tracking-wider mt-1">Bespoke Customization</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif font-bold text-[#8CBC67]">5,000+</h4>
                <p className="text-xs text-[#6B706C] uppercase tracking-wider mt-1">Stories Celebrated</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= THE Party Square APPROACH (3-Step Philosophy) ================= */}
      <section className="bg-[#FAF6EE] border-y border-[#E8E8E3] py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 bg-[#EEF6EB] border border-[#E8E8E3] px-3.5 py-1 rounded-full text-[#8CBC67] text-xs uppercase tracking-widest font-medium">
              <Compass size={13} className="text-[#8CBC67]" />
              <span>How We Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#202522]">
              The Blueprint of Our <span className="italic text-[#8CBC67]">Perfection</span>
            </h2>
            <p className="text-[#6B706C] text-sm font-light">
              A seamless journey from your first thought to the grand reveal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white/80 border border-[#EAE2CE] p-8 rounded-3xl space-y-4 shadow-sm relative group hover:border-[#8CBC67] transition">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF6EB] text-[#8CBC67] flex items-center justify-center font-serif text-xl font-bold">
                01
              </div>
              <h3 className="text-xl font-serif text-[#202522]">Vision & Concepting</h3>
              <p className="text-[#6B706C] text-sm font-light leading-relaxed">
                We sit down with you to understand your aesthetic preferences, emotional goals, and cultural nuances to draft custom mood boards.
              </p>
            </div>

            <div className="bg-white/80 border border-[#EAE2CE] p-8 rounded-3xl space-y-4 shadow-sm relative group hover:border-[#8CBC67] transition">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF6EB] text-[#8CBC67] flex items-center justify-center font-serif text-xl font-bold">
                02
              </div>
              <h3 className="text-xl font-serif text-[#202522]">Artisanal Sourcing</h3>
              <p className="text-[#6B706C] text-sm font-light leading-relaxed">
                From hand-picked imported blooms and bespoke structures to sustainable props, we source elements that guarantee unmatched quality.
              </p>
            </div>

            <div className="bg-white/80 border border-[#EAE2CE] p-8 rounded-3xl space-y-4 shadow-sm relative group hover:border-[#8CBC67] transition">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF6EB] text-[#8CBC67] flex items-center justify-center font-serif text-xl font-bold">
                03
              </div>
              <h3 className="text-xl font-serif text-[#202522]">Flawless Execution</h3>
              <p className="text-[#6B706C] text-sm font-light leading-relaxed">
                Our on-ground production crew orchestrates the setup with clockwork precision, ensuring everything is pristine before your guests arrive.
              </p>
            </div>

          </div>

        </div>
      </section>



      {/* ================= CORPORATE PLANNER PRODUCTS SECTION ================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-[#E8E8E3]/60">
        <div className="relative mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* LEFT - Heading */}
            <div className="text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8CBC67] font-bold">
                Corporate Planner Collection
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
                  Corporate Event & Office Products
                </h2>
                <span className="text-[#6B706C] text-2xl">|</span>
                <span className="text-[#6B706C] text-2xl">
                  {productsToDisplay.length} Items
                </span>
              </div>
              <p className="text-[#6B706C] text-sm font-light mt-2 max-w-2xl">
                Elevate your company celebrations with professional office anniversary setups, conference stages, gala dinners, and product launch backdrops.
              </p>
            </div>

            {/* RIGHT - Sort */}
            <div className="shrink-0">
              <ProductSort value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsToDisplay.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isInWishlist={isInWishlist}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>

        {/* VIEW MORE PRODUCTS BUTTON */}
        <div className="text-center mt-12">
          <Link
            href="/about/all-products"
            className="inline-flex items-center space-x-2 bg-white hover:bg-neutral-950 hover:text-white text-neutral-950 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-sm border border-[#E8E8E3]"
          >
            <span>View More Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-20 px-6 md:px-16 max-w-5xl mx-auto text-center">
        <div className="bg-gradient-to-br from-[#202522] to-[#2D2D2D] text-white rounded-[40px] p-10 md:p-16 space-y-6 shadow-2xl relative overflow-hidden border border-[#8CBC67]/30">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8CBC67]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-[#8CBC67]/40 px-4 py-1.5 rounded-full text-[#8CBC67] text-xs uppercase tracking-widest font-medium">
            <ShieldCheck size={13} className="text-[#8CBC67]" />
            <span>Start Your Journey</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-light">
            Ready to Create Something <span className="italic font-normal text-[#8CBC67]">Extraordinary?</span>
          </h2>

          <p className="text-neutral-300 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
            Let's discuss how we can turn your upcoming celebration into an unforgettable work of art.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact" 
              className="bg-[#8CBC67] hover:bg-[#7AB055] text-white px-8 py-3.5 rounded-full font-bold text-sm inline-flex items-center space-x-2 transition shadow-lg cursor-pointer"
            >
              <span>Get in Touch with Us</span>
              <ArrowRight size={16} />
            </Link>
            <Link 
              href="/services" 
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-full font-medium text-sm transition"
            >
              Explore Our Services
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
