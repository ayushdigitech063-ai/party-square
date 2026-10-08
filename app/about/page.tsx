"use client";

import React from "react";
import { Sparkles, Heart, Award, CheckCircle2, ArrowRight, ShieldCheck, Users, Compass } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="w-full bg-[#F3EFE9] font-sans text-neutral-900 selection:bg-[#DFBC71] selection:text-neutral-900 overflow-hidden">
      
      {/* ================= HERO BANNER ================= */}
      <section className="relative w-full h-[60vh] md:h-[70vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/home2.png" 
            alt="DreamDeco Luxury Story" 
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-4 pt-10">
          <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md border border-[#C5A059]/60 px-4 py-1.5 rounded-full text-[#DFBC71] text-xs uppercase tracking-[0.25em] font-medium shadow-lg">
            <Sparkles size={13} />
            <span>The Art of Celebration</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-wide text-white drop-shadow-md">
            Designing Dreams, <br />
            <span className="italic font-normal text-[#DFBC71]">Inspiring Emotions</span>
          </h1>

          <p className="text-neutral-200 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Discover the philosophy, passion, and meticulous craftsmanship behind DreamDeco—India’s premier luxury event styling house.
          </p>
        </div>
      </section>

      {/* ================= OUR STORY & VISION (Asymmetric Layout) ================= */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[450px] sm:h-[520px] rounded-[32px] overflow-hidden border border-[#E2D2B0] shadow-2xl">
              <img 
                src="/homepage.png" 
                alt="DreamDeco Craftsmanship" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md border border-[#E2D2B0] p-6 rounded-2xl shadow-lg">
                <p className="font-serif italic text-neutral-800 text-base leading-relaxed">
                  "We don't just decorate venues; we curate immersive environments where your happiest memories come to life."
                </p>
              </div>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#F3EAD3] border border-[#E2D2B0] px-3.5 py-1 rounded-full text-[#8C6D24] text-xs uppercase tracking-widest font-medium">
              <Heart size={12} className="text-[#C5A059]" />
              <span>Our Heritage</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-neutral-900 leading-tight">
              Rooted in Passion, <span className="italic text-[#8C6D24]">Elevated by Design</span>
            </h2>

            <p className="text-neutral-600 text-sm md:text-base font-light leading-relaxed">
              Founded over a decade ago, DreamDeco started with a simple belief: that every milestone deserves a stage as grand as the emotions behind it. What began as a boutique floral styling initiative has evolved into an elite creative agency trusted by families, corporate giants, and luxury hosts across the country.
            </p>

            <p className="text-neutral-600 text-sm md:text-base font-light leading-relaxed">
              Our team consists of master florists, spatial architects, lighting technicians, and dedicated producers who treat every project like a blank canvas waiting to be transformed into high art.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#E2D2B0]/60">
              <div>
                <h4 className="text-3xl font-serif font-bold text-[#8C6D24]">100%</h4>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Bespoke Customization</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif font-bold text-[#8C6D24]">5,000+</h4>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Stories Celebrated</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= THE DREAMDECO APPROACH (3-Step Philosophy) ================= */}
      <section className="bg-[#FAF6EE] border-y border-[#E6DEC9] py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 bg-[#F3EAD3] border border-[#E2D2B0] px-3.5 py-1 rounded-full text-[#8C6D24] text-xs uppercase tracking-widest font-medium">
              <Compass size={13} className="text-[#C5A059]" />
              <span>How We Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-900">
              The Blueprint of Our <span className="italic text-[#8C6D24]">Perfection</span>
            </h2>
            <p className="text-neutral-600 text-sm font-light">
              A seamless journey from your first thought to the grand reveal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white/80 border border-[#EAE2CE] p-8 rounded-3xl space-y-4 shadow-sm relative group hover:border-[#C5A059] transition">
              <div className="w-12 h-12 rounded-2xl bg-[#F3EAD3] text-[#8C6D24] flex items-center justify-center font-serif text-xl font-bold">
                01
              </div>
              <h3 className="text-xl font-serif text-neutral-900">Vision & Concepting</h3>
              <p className="text-neutral-600 text-sm font-light leading-relaxed">
                We sit down with you to understand your aesthetic preferences, emotional goals, and cultural nuances to draft custom mood boards.
              </p>
            </div>

            <div className="bg-white/80 border border-[#EAE2CE] p-8 rounded-3xl space-y-4 shadow-sm relative group hover:border-[#C5A059] transition">
              <div className="w-12 h-12 rounded-2xl bg-[#F3EAD3] text-[#8C6D24] flex items-center justify-center font-serif text-xl font-bold">
                02
              </div>
              <h3 className="text-xl font-serif text-neutral-900">Artisanal Sourcing</h3>
              <p className="text-neutral-600 text-sm font-light leading-relaxed">
                From hand-picked imported blooms and bespoke structures to sustainable props, we source elements that guarantee unmatched quality.
              </p>
            </div>

            <div className="bg-white/80 border border-[#EAE2CE] p-8 rounded-3xl space-y-4 shadow-sm relative group hover:border-[#C5A059] transition">
              <div className="w-12 h-12 rounded-2xl bg-[#F3EAD3] text-[#8C6D24] flex items-center justify-center font-serif text-xl font-bold">
                03
              </div>
              <h3 className="text-xl font-serif text-neutral-900">Flawless Execution</h3>
              <p className="text-neutral-600 text-sm font-light leading-relaxed">
                Our on-ground production crew orchestrates the setup with clockwork precision, ensuring everything is pristine before your guests arrive.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= LEADERSHIP / CORPORATE EXCELLENCE SECTION (Using coprateoffice.png) ================= */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="bg-[#FFFDF9] border border-[#E2D2B0] rounded-[40px] p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center shadow-sm">
          
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#F3EAD3] border border-[#E2D2B0] px-3.5 py-1 rounded-full text-[#8C6D24] text-xs uppercase tracking-widest font-medium">
              <Users size={12} className="text-[#C5A059]" />
              <span>Enterprise & Scale</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif text-neutral-900 leading-tight">
              Trusted by Leading Brands & <span className="italic text-[#8C6D24]">Discerning Hosts</span>
            </h2>

            <p className="text-neutral-600 text-sm md:text-base font-light leading-relaxed">
              Beyond intimate celebrations, DreamDeco brings architectural scale and brand-aligned aesthetics to corporate environments. We partner with top enterprises to transform offices and venue spaces for annual galas, brand launches, and festive celebrations.
            </p>

            <div className="space-y-3 pt-2">
              {[
                "Strict adherence to corporate compliance & timelines",
                "Scalable design solutions for massive corporate venues",
                "Dedicated account managers for seamless coordination"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <CheckCircle2 size={16} className="text-[#C5A059] shrink-0" />
                  <span className="text-sm text-neutral-700 font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-[#E2D2B0] shadow-lg">
            <img 
              src="/coprateoffice.png" 
              alt="DreamDeco Corporate Standards" 
              className="w-full h-full object-cover hover:scale-105 transition duration-700"
            />
          </div>

        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-20 px-6 md:px-16 max-w-5xl mx-auto text-center">
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] text-white rounded-[40px] p-10 md:p-16 space-y-6 shadow-2xl relative overflow-hidden border border-[#C5A059]/30">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-[#C5A059]/40 px-4 py-1.5 rounded-full text-[#DFBC71] text-xs uppercase tracking-widest font-medium">
            <ShieldCheck size={13} />
            <span>Start Your Journey</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-light">
            Ready to Create Something <span className="italic font-normal text-[#DFBC71]">Extraordinary?</span>
          </h2>

          <p className="text-neutral-300 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
            Let's discuss how we can turn your upcoming celebration into an unforgettable work of art.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact" 
              className="bg-gradient-to-r from-[#DFBC71] to-[#C5A059] text-neutral-900 px-8 py-3.5 rounded-full font-bold text-sm inline-flex items-center space-x-2 hover:brightness-105 transition shadow-lg"
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