"use client";

import React from "react";
import { Sparkles, Heart, Award, CheckCircle2, ArrowRight, Calendar, Building2, Baby, Flame, PartyPopper, Home, Flag, Gift, Sun } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="w-full bg-[#F3EFE9] font-sans text-neutral-900 selection:bg-[#DFBC71] selection:text-neutral-900 overflow-hidden">
      
      {/* ================= TOP HERO BANNER (With home2.png full-width & height) ================= */}
      <section className="relative w-full h-[60vh] md:h-[70vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/wedding1.png" 
            alt="DreamDeco Luxury Setup" 
            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
          />
          {/* Dark luxury gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-4 pt-10">
          <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md border border-[#C5A059]/60 px-4 py-1.5 rounded-full text-[#DFBC71] text-xs uppercase tracking-[0.25em] font-medium shadow-lg">
            <Sparkles size={13} />
            <span>The DreamDeco Legacy</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-wide text-white drop-shadow-md">
            Crafting Elegance, <br />
            <span className="italic font-normal text-[#DFBC71]">Defining Memories</span>
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
            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-[#E2D2B0] shadow-xl">
              <img 
                src="/homepage.png" 
                alt="Luxury Event Setup" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating Highlight Card */}
            <div className="absolute -bottom-8 -right-4 sm:right-6 bg-[#FFFDF9] border border-[#E2D2B0] p-6 rounded-2xl shadow-2xl max-w-xs hidden sm:block">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-[#F3EAD3] text-[#8C6D24] flex items-center justify-center font-bold text-lg">
                  10+
                </div>
                <div>
                  <h4 className="font-serif text-neutral-900 font-medium">Years of Excellence</h4>
                  <p className="text-xs text-neutral-500">Creating magic across India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Story Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#F3EAD3] border border-[#E2D2B0] px-3.5 py-1 rounded-full text-[#8C6D24] text-xs uppercase tracking-widest font-medium">
              <Heart size={12} className="text-[#C5A059]" />
              <span>Passionate Decorators</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-neutral-900 leading-snug">
              Transforming Your Vision Into <span className="italic text-[#8C6D24]">Breathtaking Reality</span>
            </h2>

            <p className="text-neutral-600 text-sm md:text-base font-light leading-relaxed">
              At DreamDeco, we believe every milestone deserves a canvas as unique as your story. From grand royal weddings and traditional mandaps to intimate candlelight dinners and vibrant festive setups, our expert artisans design atmospheres that leave lasting impressions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                "Customized Theme Conceptions",
                "Fresh Floral Artistry",
                "Bespoke Lighting Solutions",
                "End-to-End Execution"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <CheckCircle2 size={18} className="text-[#C5A059] shrink-0" />
                  <span className="text-sm font-medium text-neutral-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link href="/services" className="bg-gradient-to-r from-[#DFBC71] to-[#C5A059] text-neutral-900 px-8 py-3.5 rounded-full font-bold text-sm inline-flex items-center space-x-2 hover:brightness-105 transition shadow-md">
                <span>Discover Our Services</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="bg-[#FAF6EE] border-y border-[#E6DEC9] py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          
          <div className="space-y-2 p-6 rounded-2xl bg-white/60 border border-[#EAE2CE] shadow-sm">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#8C6D24]">5,000+</h3>
            <p className="text-xs uppercase tracking-widest text-neutral-600 font-medium">Events Decorated</p>
          </div>

          <div className="space-y-2 p-6 rounded-2xl bg-white/60 border border-[#EAE2CE] shadow-sm">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#8C6D24]">15+</h3>
            <p className="text-xs uppercase tracking-widest text-neutral-600 font-medium">Major Cities</p>
          </div>

          <div className="space-y-2 p-6 rounded-2xl bg-white/60 border border-[#EAE2CE] shadow-sm">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#8C6D24]">99%</h3>
            <p className="text-xs uppercase tracking-widest text-neutral-600 font-medium">Happy Clients</p>
          </div>

          <div className="space-y-2 p-6 rounded-2xl bg-white/60 border border-[#EAE2CE] shadow-sm">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#8C6D24]">50+</h3>
            <p className="text-xs uppercase tracking-widest text-neutral-600 font-medium">Design Experts</p>
          </div>

        </div>
      </section>

      {/* ================= SPECIALIZED EXPERTISE SHOWCASE (Part 1: Core Occasions) ================= */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-[#F3EAD3] border border-[#E2D2B0] px-3.5 py-1 rounded-full text-[#8C6D24] text-xs uppercase tracking-widest font-medium">
            <Sparkles size={13} className="text-[#C5A059]" />
            <span>Our Specialized Domains</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-neutral-900">
            Bringing Every Milestone to Life with <span className="italic text-[#8C6D24]">Mastery</span>
          </h2>
          <p className="text-neutral-600 text-sm md:text-base font-light leading-relaxed">
            From grand royal weddings to cozy corporate spaces and intimate moments, explore our diverse design portfolio.
          </p>
        </div>

        {/* Grid 1: Original 4 Specializations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Corporate Office */}
          <div className="bg-[#FFFDF9] border border-[#E2D2B0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-64 overflow-hidden">
              <img src="/coprateoffice.png" alt="Corporate Office Decoration" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#DFBC71] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#C5A059]/30">
                <Building2 size={13} /> Corporate Events
              </div>
            </div>
            <div className="p-8 space-y-3">
              <h3 className="text-2xl font-serif text-neutral-900">Corporate Office & Brand Aesthetics</h3>
              <p className="text-neutral-600 text-sm font-light leading-relaxed">
                Elevate your workplace environment for annual meets, product launches, festivals, and corporate milestones with sophisticated branding and decor.
              </p>
            </div>
          </div>

          {/* Anniversaries */}
          <div className="bg-[#FFFDF9] border border-[#E2D2B0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-64 overflow-hidden">
              <img src="/aniversarry5.png" alt="Anniversary Decoration" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#DFBC71] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#C5A059]/30">
                <Calendar size={13} /> Milestone Anniversaries
              </div>
            </div>
            <div className="p-8 space-y-3">
              <h3 className="text-2xl font-serif text-neutral-900">Romantic & Grand Anniversaries</h3>
              <p className="text-neutral-600 text-sm font-light leading-relaxed">
                Celebrate years of togetherness with breathtaking thematic backdrops, floral arches, and custom romantic lighting designed for timeless luxury.
              </p>
            </div>
          </div>

          {/* Kids Birthdays */}
          <div className="bg-[#FFFDF9] border border-[#E2D2B0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-64 overflow-hidden">
              <img src="/childbirthday3.png" alt="Kids Birthday Decoration" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#DFBC71] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#C5A059]/30">
                <Baby size={13} /> Kids Birthdays
              </div>
            </div>
            <div className="p-8 space-y-3">
              <h3 className="text-2xl font-serif text-neutral-900">Magical Kids Birthday Themes</h3>
              <p className="text-neutral-600 text-sm font-light leading-relaxed">
                Turn your child's dream world into reality! From fairy-tale castles and superhero universes to whimsical balloon art and safe prop setups.
              </p>
            </div>
          </div>

          {/* Candlelight Dinners */}
          <div className="bg-[#FFFDF9] border border-[#E2D2B0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-64 overflow-hidden">
              <img src="/bgpic.png" alt="Candlelight Dinner Setup" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#DFBC71] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#C5A059]/30">
                <Flame size={13} /> Candlelight & Intimate
              </div>
            </div>
            <div className="p-8 space-y-3">
              <h3 className="text-2xl font-serif text-neutral-900">Intimate Candlelight & Date Nights</h3>
              <p className="text-neutral-600 text-sm font-light leading-relaxed">
                Create deeply personal romantic moments with signature candlelight settings, ambient fairy lights, rose petal pathways, and cozy luxury.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= GRAND CELEBRATIONS & PRE-WEDDING SHOWCASE (wedding5, haldi, mehandi) ================= */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto space-y-16 bg-[#FAF6EE] rounded-[40px] border border-[#E6DEC9] my-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-[#F3EAD3] border border-[#E2D2B0] px-3.5 py-1 rounded-full text-[#8C6D24] text-xs uppercase tracking-widest font-medium">
            <Heart size={13} className="text-[#C5A059]" />
            <span>Royal Weddings & Pre-Wedding Rituals</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-neutral-900">
            Tradition Meets <span className="italic text-[#8C6D24]">Modern Luxury</span>
          </h2>
          <p className="text-neutral-600 text-sm md:text-base font-light leading-relaxed">
            Immerse your celebrations in vibrant cultural aesthetics, exquisite floral mandaps, and breathtaking pre-wedding functions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Wedding Grandeur */}
          <div className="bg-[#FFFDF9] border border-[#E2D2B0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-64 overflow-hidden">
              <img src="/wedding5.png" alt="Royal Wedding Decoration" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#DFBC71] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#C5A059]/30">
                <Heart size={13} /> Royal Weddings
              </div>
            </div>
            <div className="p-8 space-y-3">
              <h3 className="text-2xl font-serif text-neutral-900">Grand Wedding Mandaps & Stages</h3>
              <p className="text-neutral-600 text-sm font-light leading-relaxed">
                Crafting royal union backdrops with majestic floral installations, regal seating, and mesmerizing lighting to make your big day unforgettable.
              </p>
            </div>
          </div>

          {/* Haldi Ceremony */}
          <div className="bg-[#FFFDF9] border border-[#E2D2B0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-64 overflow-hidden">
              <img src="/haldiprogramdecoration.png" alt="Haldi Program Decoration" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#DFBC71] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#C5A059]/30">
                <Sun size={13} /> Haldi Rituals
              </div>
            </div>
            <div className="p-8 space-y-3">
              <h3 className="text-2xl font-serif text-neutral-900">Vibrant Haldi Program Aesthetics</h3>
              <p className="text-neutral-600 text-sm font-light leading-relaxed">
                Bright, cheerful yellow marigold setups, traditional gaddas, floral jewellery backdrops, and sunny outdoor arrangements full of traditional charm.
              </p>
            </div>
          </div>

          {/* Mehandi Ceremony */}
          <div className="bg-[#FFFDF9] border border-[#E2D2B0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-64 overflow-hidden">
              <img src="/mehandidecoration.png" alt="Mehandi Decoration" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#DFBC71] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#C5A059]/30">
                <Sparkles size={13} /> Mehandi Celebration
              </div>
            </div>
            <div className="p-8 space-y-3">
              <h3 className="text-2xl font-serif text-neutral-900">Colorful Mehandi Celebrations</h3>
              <p className="text-neutral-600 text-sm font-light leading-relaxed">
                Boho-chic seating, colorful drapes, vibrant cushion clusters, and floral swings creating a joyful, festive atmosphere for family and friends.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FESTIVE & SPECIAL OCCASIONS SHOWCASE (Diwali, Christmas, New Year, Independence Day, Welcome Baby, Home Decor) ================= */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-[#F3EAD3] border border-[#E2D2B0] px-3.5 py-1 rounded-full text-[#8C6D24] text-xs uppercase tracking-widest font-medium">
            <PartyPopper size={13} className="text-[#C5A059]" />
            <span>Festivals & Special Milestones</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-neutral-900">
            Celebrating Every Season in <span className="italic text-[#8C6D24]">Splendor</span>
          </h2>
          <p className="text-neutral-600 text-sm md:text-base font-light leading-relaxed">
            From festive lights to welcoming new family members, discover our specialized themed decor solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Diwali */}
          <div className="bg-[#FFFDF9] border border-[#E2D2B0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-56 overflow-hidden">
              <img src="/diwali.png" alt="Diwali Decoration" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#DFBC71] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#C5A059]/30">
                <Flame size={13} /> Diwali Festive
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="text-xl font-serif text-neutral-900">Radiant Diwali Decor</h3>
              <p className="text-neutral-600 text-xs font-light leading-relaxed">
                Traditional diyas, grand floral rangolis, golden lighting, and warm festive backdrops for homes and commercial offices.
              </p>
            </div>
          </div>

          {/* Home Decoration */}
          <div className="bg-[#FFFDF9] border border-[#E2D2B0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-56 overflow-hidden">
              <img src="/homedecoration.png" alt="Home Decoration" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#DFBC71] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#C5A059]/30">
                <Home size={13} /> Home Styling
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="text-xl font-serif text-neutral-900">Bespoke Home Makeovers</h3>
              <p className="text-neutral-600 text-xs font-light leading-relaxed">
                Elevating living spaces with aesthetic floral arrangements, ambient lighting, and elegant corners tailored for housewarmings.
              </p>
            </div>
          </div>

          {/* Christmas */}
          <div className="bg-[#FFFDF9] border border-[#E2D2B0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-56 overflow-hidden">
              <img src="/crismasdecoration1.png" alt="Christmas Decoration" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#DFBC71] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#C5A059]/30">
                <Gift size={13} /> Christmas Joy
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="text-xl font-serif text-neutral-900">Winter Wonderland Christmas</h3>
              <p className="text-neutral-600 text-xs font-light leading-relaxed">
                Custom decorated Christmas trees, snowy themes, fairy lights, and cozy festive corners that capture holiday magic.
              </p>
            </div>
          </div>

          {/* New Year Party */}
          <div className="bg-[#FFFDF9] border border-[#E2D2B0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-56 overflow-hidden">
              <img src="/newyearparty.png" alt="New Year Party Decoration" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#DFBC71] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#C5A059]/30">
                <PartyPopper size={13} /> New Year Bash
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="text-xl font-serif text-neutral-900">Glamorous New Year Parties</h3>
              <p className="text-neutral-600 text-xs font-light leading-relaxed">
                Glittering metallic backdrops, balloon installations, champagne-themed setups, and high-energy party environments.
              </p>
            </div>
          </div>

          {/* Independence Day */}
          <div className="bg-[#FFFDF9] border border-[#E2D2B0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-56 overflow-hidden">
              <img src="/indepencedaydecoration.png" alt="Independence Day Decoration" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#DFBC71] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#C5A059]/30">
                <Flag size={13} /> National Pride
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="text-xl font-serif text-neutral-900">Patriotic & National Events</h3>
              <p className="text-neutral-600 text-xs font-light leading-relaxed">
                Tricolor floral installations, themed backdrops, and respectful patriotic setups for institutions, schools, and corporate offices.
              </p>
            </div>
          </div>

          {/* Welcome Baby */}
          <div className="bg-[#FFFDF9] border border-[#E2D2B0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition group">
            <div className="relative h-56 overflow-hidden">
              <img src="/welcomebabaydecoration.png" alt="Welcome Baby Decoration" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#DFBC71] px-3.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-[#C5A059]/30">
                <Baby size={13} /> New Arrival
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="text-xl font-serif text-neutral-900">Welcome Baby & Cradle Ceremonies</h3>
              <p className="text-neutral-600 text-xs font-light leading-relaxed">
                Soft pastel balloon arches, teddy-themed props, and delicate floral settings to welcome your newborn home with warmth and love.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= OUR CORE VALUES ================= */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto text-center space-y-16 border-t border-[#E6DEC9]/60">
        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-[#F3EAD3] border border-[#E2D2B0] px-3.5 py-1 rounded-full text-[#8C6D24] text-xs uppercase tracking-widest font-medium">
            <Award size={13} className="text-[#C5A059]" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-neutral-900">
            The Pillars of Our <span className="italic text-[#8C6D24]">Perfection</span>
          </h2>
          <p className="text-neutral-600 text-sm font-light">
            We uphold the highest standards of creativity, punctuality, and attention to detail for every single event.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#FFFDF9] border border-[#E2D2B0] p-8 rounded-3xl space-y-4 shadow-sm hover:border-[#C5A059] transition">
            <div className="w-14 h-14 rounded-2xl bg-[#F3EAD3] text-[#8C6D24] flex items-center justify-center mx-auto text-2xl font-serif">
              ✨
            </div>
            <h3 className="text-xl font-serif text-neutral-900">Unmatched Creativity</h3>
            <p className="text-neutral-600 text-sm font-light leading-relaxed">
              Every design is custom-crafted to reflect your personal taste, keeping modern trends and timeless elegance in harmony.
            </p>
          </div>

          <div className="bg-[#FFFDF9] border border-[#E2D2B0] p-8 rounded-3xl space-y-4 shadow-sm hover:border-[#C5A059] transition">
            <div className="w-14 h-14 rounded-2xl bg-[#F3EAD3] text-[#8C6D24] flex items-center justify-center mx-auto text-2xl font-serif">
              🌿
            </div>
            <h3 className="text-xl font-serif text-neutral-900">Premium Quality Florals</h3>
            <p className="text-neutral-600 text-sm font-light leading-relaxed">
              We source the freshest, highest quality blooms and eco-friendly props to ensure your venue looks radiant and fresh throughout.
            </p>
          </div>

          <div className="bg-[#FFFDF9] border border-[#E2D2B0] p-8 rounded-3xl space-y-4 shadow-sm hover:border-[#C5A059] transition">
            <div className="w-14 h-14 rounded-2xl bg-[#F3EAD3] text-[#8C6D24] flex items-center justify-center mx-auto text-2xl font-serif">
              ⏱️
            </div>
            <h3 className="text-xl font-serif text-neutral-900">On-Time Execution</h3>
            <p className="text-neutral-600 text-sm font-light leading-relaxed">
              Our professional coordination team ensures hassle-free setup and timely completion well before your guests arrive.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}