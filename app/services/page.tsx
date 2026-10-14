"use client";

import React, { useState } from "react";
import { Sparkles, Heart, Award, CheckCircle2, ArrowRight, Calendar, Building2, Baby, Flame, PartyPopper, Home, Flag, Gift, Sun, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/app/context/wishlistcontext";
import ProductCard from "@/app/components/ProductCard";
import ProductSort from "@/app/components/ProductSort";
import { decorationItems } from "@/app/data/decorationThemeData";

export default function AboutPage() {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [sortBy, setSortBy] = useState<"recommended" | "price-low" | "price-high">("recommended");

  const getPrice = (price: string | number) => {
    if (typeof price === "number") return price;
    const value = Number(String(price).replace(/[₹,]/g, "").trim());
    return Number.isNaN(value) ? Infinity : value;
  };

  const sortedProducts = [...decorationItems].sort((a, b) => {
    if (sortBy === "price-low") return getPrice(a.price) - getPrice(b.price);
    if (sortBy === "price-high") return getPrice(b.price) - getPrice(a.price);
    return 0;
  });

  const productsToDisplay = sortBy === "recommended" ? decorationItems : sortedProducts;
  return (
    <div className="w-full bg-[#F3EFE9] font-sans text-[#202522] selection:bg-[#8CBC67] selection:text-white overflow-hidden">
      
      {/* ================= TOP HERO BANNER (With home2.png full-width & height) ================= */}
      <section className="relative w-full h-[60vh] md:h-[70vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/wedding1.png" 
            alt="Party Square Luxury Setup" 
            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
          />
          {/* Dark luxury gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-4 pt-10">
          <div className="inline-flex items-center space-x-2 bg-[#8CBC67]/20 backdrop-blur-md border border-[#8CBC67]/50 px-4 py-1.5 rounded-full text-[#8CBC67] text-xs uppercase tracking-[0.25em] font-semibold shadow-lg">
            <Sparkles size={13} className="text-[#8CBC67]" />
            <span>The Party Square Legacy</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-wide text-white drop-shadow-md">
            Crafting Elegance, <br />
            <span className="italic font-normal text-[#8CBC67]">Defining Memories</span>
          </h1>

          <p className="text-neutral-200 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            We transform spaces into extraordinary emotional landscapes, merging luxury design aesthetics with flawless execution.
          </p>
        </div>
      </section>

      {/* ================= WHO WE ARE & VISION ================= */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Dual Image Collage */}
          <div className="relative space-y-4">
            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-[#E8E8E3] shadow-xl">
              <img 
                src="/homepage.png" 
                alt="Luxury Event Setup" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating Highlight Card */}
            <div className="absolute -bottom-8 -right-4 sm:right-6 bg-[#FFFFFF] border border-[#E8E8E3] p-6 rounded-2xl shadow-2xl max-w-xs hidden sm:block">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-[#EEF6EB] text-[#8CBC67] flex items-center justify-center font-bold text-lg">
                  10+
                </div>
                <div>
                  <h4 className="font-serif text-[#202522] font-medium">Years of Excellence</h4>
                  <p className="text-xs text-[#6B706C]">Creating magic across India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Story Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#EEF6EB] border border-[#E8E8E3] px-3.5 py-1 rounded-full text-[#8CBC67] text-xs uppercase tracking-widest font-medium">
              <Heart size={12} className="text-[#8CBC67]" />
              <span>Passionate Decorators</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-[#202522] leading-snug">
              Transforming Your Vision Into <span className="italic text-[#8CBC67]">Breathtaking Reality</span>
            </h2>

            <p className="text-[#6B706C] text-sm md:text-base font-light leading-relaxed">
              At Party Square, we believe every milestone deserves a canvas as unique as your story. From grand royal weddings and traditional mandaps to intimate candlelight dinners and vibrant festive setups, our expert artisans design atmospheres that leave lasting impressions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                "Customized Theme Conceptions",
                "Fresh Floral Artistry",
                "Bespoke Lighting Solutions",
                "End-to-End Execution"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <CheckCircle2 size={18} className="text-[#8CBC67] shrink-0" />
                  <span className="text-sm font-medium text-[#202522]">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link href="/services" className="bg-[#8CBC67] hover:bg-[#7AB055] text-white px-8 py-3.5 rounded-full font-bold text-sm inline-flex items-center space-x-2 transition shadow-md">
                <span>Discover Our Services</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="bg-[#FAF6EE] border-y border-[#E8E8E3] py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          
          <div className="space-y-2 p-6 rounded-2xl bg-white/60 border border-[#EAE2CE] shadow-sm">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#8CBC67]">5,000+</h3>
            <p className="text-xs uppercase tracking-widest text-[#6B706C] font-medium">Events Decorated</p>
          </div>

          <div className="space-y-2 p-6 rounded-2xl bg-white/60 border border-[#EAE2CE] shadow-sm">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#8CBC67]">15+</h3>
            <p className="text-xs uppercase tracking-widest text-[#6B706C] font-medium">Major Cities</p>
          </div>

          <div className="space-y-2 p-6 rounded-2xl bg-white/60 border border-[#EAE2CE] shadow-sm">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#8CBC67]">99%</h3>
            <p className="text-xs uppercase tracking-widest text-[#6B706C] font-medium">Happy Clients</p>
          </div>

          <div className="space-y-2 p-6 rounded-2xl bg-white/60 border border-[#EAE2CE] shadow-sm">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#8CBC67]">50+</h3>
            <p className="text-xs uppercase tracking-widest text-[#6B706C] font-medium">Design Experts</p>
          </div>

        </div>
      </section>

      {/* ================= SPECIALIZED EXPERTISE SHOWCASE (Part 1: Core Occasions) ================= */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-[#EEF6EB] border border-[#E8E8E3] px-3.5 py-1 rounded-full text-[#8CBC67] text-xs uppercase tracking-widest font-medium">
            <Sparkles size={13} className="text-[#8CBC67]" />
            <span>Our Specialized Domains</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-[#202522]">
            Bringing Every Milestone to Life with <span className="italic text-[#8CBC67]">Mastery</span>
          </h2>
          <p className="text-[#6B706C] text-sm md:text-base font-light leading-relaxed">
            From grand royal weddings to cozy corporate spaces and intimate moments, explore our diverse design portfolio.
          </p>
        </div>

        {/* Grid 1: Original 4 Specializations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Corporate Office */}
          <div className="bg-[#FFFFFF] border border-[#E8E8E3] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-64 overflow-hidden">
              <img src="/coprateoffice.png" alt="Corporate Office Decoration" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#8CBC67] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#8CBC67]/30">
                <Building2 size={13} /> Corporate Events
              </div>
            </div>
            <div className="p-8 space-y-3">
              <h3 className="text-2xl font-serif text-[#202522]">Corporate Office & Brand Aesthetics</h3>
              <p className="text-[#6B706C] text-sm font-light leading-relaxed">
                Elevate your workplace environment for annual meets, product launches, festivals, and corporate milestones with sophisticated branding and decor.
              </p>
            </div>
          </div>

          {/* Anniversaries */}
          <div className="bg-[#FFFFFF] border border-[#E8E8E3] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-64 overflow-hidden">
              <img src="/aniversarry5.png" alt="Anniversary Decoration" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#8CBC67] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#8CBC67]/30">
                <Calendar size={13} /> Milestone Anniversaries
              </div>
            </div>
            <div className="p-8 space-y-3">
              <h3 className="text-2xl font-serif text-[#202522]">Romantic & Grand Anniversaries</h3>
              <p className="text-[#6B706C] text-sm font-light leading-relaxed">
                Celebrate years of togetherness with breathtaking thematic backdrops, floral arches, and custom romantic lighting designed for timeless luxury.
              </p>
            </div>
          </div>

          {/* Kids Birthdays */}
          <div className="bg-[#FFFFFF] border border-[#E8E8E3] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-64 overflow-hidden">
              <img src="/childbirthday3.png" alt="Kids Birthday Decoration" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#8CBC67] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#8CBC67]/30">
                <Baby size={13} /> Kids Birthdays
              </div>
            </div>
            <div className="p-8 space-y-3">
              <h3 className="text-2xl font-serif text-[#202522]">Magical Kids Birthday Themes</h3>
              <p className="text-[#6B706C] text-sm font-light leading-relaxed">
                Turn your child's dream world into reality! From fairy-tale castles and superhero universes to whimsical balloon art and safe prop setups.
              </p>
            </div>
          </div>

          {/* Candlelight Dinners */}
          <div className="bg-[#FFFFFF] border border-[#E8E8E3] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-64 overflow-hidden">
              <img src="/bgpic.png" alt="Candlelight Dinner Setup" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#8CBC67] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#8CBC67]/30">
                <Flame size={13} /> Candlelight & Intimate
              </div>
            </div>
            <div className="p-8 space-y-3">
              <h3 className="text-2xl font-serif text-[#202522]">Intimate Candlelight & Date Nights</h3>
              <p className="text-[#6B706C] text-sm font-light leading-relaxed">
                Create deeply personal romantic moments with signature candlelight settings, ambient fairy lights, rose petal pathways, and cozy luxury.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= GRAND CELEBRATIONS & PRE-WEDDING SHOWCASE (wedding5, haldi, mehandi) ================= */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto space-y-16 bg-[#FAF6EE] rounded-[40px] border border-[#E8E8E3] my-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-[#EEF6EB] border border-[#E8E8E3] px-3.5 py-1 rounded-full text-[#8CBC67] text-xs uppercase tracking-widest font-medium">
            <Heart size={13} className="text-[#8CBC67]" />
            <span>Royal Weddings & Pre-Wedding Rituals</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-[#202522]">
            Tradition Meets <span className="italic text-[#8CBC67]">Modern Luxury</span>
          </h2>
          <p className="text-[#6B706C] text-sm md:text-base font-light leading-relaxed">
            Immerse your celebrations in vibrant cultural aesthetics, exquisite floral mandaps, and breathtaking pre-wedding functions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Wedding Grandeur */}
          <div className="bg-[#FFFFFF] border border-[#E8E8E3] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-64 overflow-hidden">
              <img src="/wedding5.png" alt="Royal Wedding Decoration" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#8CBC67] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#8CBC67]/30">
                <Heart size={13} /> Royal Weddings
              </div>
            </div>
            <div className="p-8 space-y-3">
              <h3 className="text-2xl font-serif text-[#202522]">Grand Wedding Mandaps & Stages</h3>
              <p className="text-[#6B706C] text-sm font-light leading-relaxed">
                Crafting royal union backdrops with majestic floral installations, regal seating, and mesmerizing lighting to make your big day unforgettable.
              </p>
            </div>
          </div>

          {/* Haldi Ceremony */}
          <div className="bg-[#FFFFFF] border border-[#E8E8E3] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-64 overflow-hidden">
              <img src="/haldiprogramdecoration.png" alt="Haldi Program Decoration" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#8CBC67] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#8CBC67]/30">
                <Sun size={13} /> Haldi Rituals
              </div>
            </div>
            <div className="p-8 space-y-3">
              <h3 className="text-2xl font-serif text-[#202522]">Vibrant Haldi Program Aesthetics</h3>
              <p className="text-[#6B706C] text-sm font-light leading-relaxed">
                Bright, cheerful yellow marigold setups, traditional gaddas, floral jewellery backdrops, and sunny outdoor arrangements full of traditional charm.
              </p>
            </div>
          </div>

          {/* Mehandi Ceremony */}
          <div className="bg-[#FFFFFF] border border-[#E8E8E3] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-64 overflow-hidden">
              <img src="/mehandidecoration.png" alt="Mehandi Decoration" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#8CBC67] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#8CBC67]/30">
                <Sparkles size={13} /> Mehandi Celebration
              </div>
            </div>
            <div className="p-8 space-y-3">
              <h3 className="text-2xl font-serif text-[#202522]">Colorful Mehandi Celebrations</h3>
              <p className="text-[#6B706C] text-sm font-light leading-relaxed">
                Boho-chic seating, colorful drapes, vibrant cushion clusters, and floral swings creating a joyful, festive atmosphere for family and friends.
              </p>
            </div>
          </div>

        </div>
      </section>



      {/* ================= THEME DECORATION PRODUCTS SECTION ================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-[#E8E8E3]/60">
        <div className="relative mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* LEFT - Heading */}
            <div className="text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8CBC67] font-bold">
                Specialized Catalog
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
                  Theme Decoration Products
                </h2>
                <span className="text-[#6B706C] text-2xl">|</span>
                <span className="text-[#6B706C] text-2xl">
                  {productsToDisplay.length} Items
                </span>
              </div>
              <p className="text-[#6B706C] text-sm font-light mt-2 max-w-2xl">
                Explore our signature themed decoration packages curated for milestone birthdays, romantic surprises, royal festivals, and grand celebrations.
              </p>
            </div>

            {/* RIGHT - Sort */}
            <div className="shrink-0">
              <ProductSort value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productsToDisplay.slice(0, 8).map((product) => (
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
            href="/services/all-products"
            className="inline-flex items-center space-x-2 bg-white hover:bg-neutral-950 hover:text-white text-neutral-950 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-sm border border-[#E8E8E3]"
          >
            <span>View More Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ================= OUR CORE VALUES ================= */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto text-center space-y-16 border-t border-[#E8E8E3]/60">
        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-[#EEF6EB] border border-[#E8E8E3] px-3.5 py-1 rounded-full text-[#8CBC67] text-xs uppercase tracking-widest font-medium">
            <Award size={13} className="text-[#8CBC67]" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-[#202522]">
            The Pillars of Our <span className="italic text-[#8CBC67]">Perfection</span>
          </h2>
          <p className="text-[#6B706C] text-sm font-light">
            We uphold the highest standards of creativity, punctuality, and attention to detail for every single event.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#FFFFFF] border border-[#E8E8E3] p-8 rounded-3xl space-y-4 shadow-sm hover:border-[#8CBC67] transition">
            <div className="w-14 h-14 rounded-2xl bg-[#EEF6EB] text-[#8CBC67] flex items-center justify-center mx-auto text-2xl font-serif">
              ✦
            </div>
            <h3 className="text-xl font-serif text-[#202522]">Unmatched Creativity</h3>
            <p className="text-[#6B706C] text-sm font-light leading-relaxed">
              Every design is custom-crafted to reflect your personal taste, keeping modern trends and timeless elegance in harmony.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E8E8E3] p-8 rounded-3xl space-y-4 shadow-sm hover:border-[#8CBC67] transition">
            <div className="w-14 h-14 rounded-2xl bg-[#EEF6EB] text-[#8CBC67] flex items-center justify-center mx-auto text-2xl font-serif">
              🌿
            </div>
            <h3 className="text-xl font-serif text-[#202522]">Premium Quality Florals</h3>
            <p className="text-[#6B706C] text-sm font-light leading-relaxed">
              We source the freshest, highest quality blooms and eco-friendly props to ensure your venue looks radiant and fresh throughout.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E8E8E3] p-8 rounded-3xl space-y-4 shadow-sm hover:border-[#8CBC67] transition">
            <div className="w-14 h-14 rounded-2xl bg-[#EEF6EB] text-[#8CBC67] flex items-center justify-center mx-auto text-2xl font-serif">
              ⏱️
            </div>
            <h3 className="text-xl font-serif text-[#202522]">On-Time Execution</h3>
            <p className="text-[#6B706C] text-sm font-light leading-relaxed">
              Our professional coordination team ensures hassle-free setup and timely completion well before your guests arrive.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
