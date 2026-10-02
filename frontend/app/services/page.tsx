"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Heart, Award, CheckCircle2, ArrowRight, Calendar, Building2, Baby, Flame, PartyPopper, Home, Flag, Gift, Sun, MessageCircle } from "lucide-react";
import Link from "next/link";
import { API_URL } from "@/config";

function WhatsAppIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.7.44 3.36 1.28 4.82L2 22l5.4-1.42a9.9 9.9 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm0 18.1h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.2.84.85-3.12-.2-.32a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.28-8.19 8.28zm4.52-6.19c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28z" />
    </svg>
  );
}

const DEFAULT_THEME_ITEMS = [
  {
    id: "th-1",
    name: "Radiant Diwali Decor",
    category: "Diwali Festive",
    image: "/diwali.png",
    price: "₹14,999",
    description: "Traditional diyas, grand floral rangolis, golden lighting, and warm festive backdrops for homes and commercial offices.",
    tag: "Diwali Festive"
  },
  {
    id: "th-2",
    name: "Bespoke Home Makeovers",
    category: "Home Styling",
    image: "/homedecoration.png",
    price: "₹8,999",
    description: "Elevating living spaces with aesthetic floral arrangements, ambient lighting, and elegant corners tailored for housewarmings.",
    tag: "Home Styling"
  },
  {
    id: "th-3",
    name: "Winter Wonderland Christmas",
    category: "Christmas Joy",
    image: "/crismasdecoration1.png",
    price: "₹12,499",
    description: "Custom decorated Christmas trees, snowy themes, fairy lights, and cozy festive corners that capture holiday magic.",
    tag: "Christmas Joy"
  },
  {
    id: "th-4",
    name: "Glamorous New Year Parties",
    category: "New Year Bash",
    image: "/newyearparty.png",
    price: "₹15,999",
    description: "Glittering metallic backdrops, balloon installations, champagne-themed setups, and high-energy party environments.",
    tag: "New Year Bash"
  },
  {
    id: "th-5",
    name: "Patriotic & National Events",
    category: "National Pride",
    image: "/indepencedaydecoration.png",
    price: "₹9,999",
    description: "Tricolor floral installations, themed backdrops, and respectful patriotic setups for institutions, schools, and corporate offices.",
    tag: "National Pride"
  },
  {
    id: "th-6",
    name: "Welcome Baby & Cradle Ceremonies",
    category: "New Arrival",
    image: "/welcomebabaydecoration.png",
    price: "₹7,999",
    description: "Soft pastel balloon arches, teddy-themed props, and delicate floral settings to welcome your newborn home with warmth and love.",
    tag: "New Arrival"
  }
];

export default function AboutPage() {
  const [whatsappNumber, setWhatsappNumber] = useState("918010679679");
  const [themesList, setThemesList] = useState(DEFAULT_THEME_ITEMS);

  useEffect(() => {
    // 1. Fetch live WhatsApp Number from settings
    const cached = typeof window !== "undefined" ? localStorage.getItem("party_whatsapp_number") : null;
    if (cached) {
      const clean = cached.replace(/\D/g, "");
      setWhatsappNumber(clean.startsWith("91") && clean.length > 10 ? clean : `91${clean.slice(-10)}`);
    }

    fetch(`${API_URL}/api/settings`)
      .then(res => res.json())
      .then(data => {
        if (data?.whatsappNumber) {
          const clean = data.whatsappNumber.replace(/\D/g, "");
          const formatted = clean.startsWith("91") && clean.length > 10 ? clean : `91${clean.slice(-10)}`;
          setWhatsappNumber(formatted);
          if (typeof window !== "undefined") localStorage.setItem("party_whatsapp_number", data.whatsappNumber);
        }
      })
      .catch(() => {});

    // 2. Fetch live Theme Decorations from /api/homepage
    fetch(`${API_URL}/api/homepage`)
      .then(res => res.json())
      .then(data => {
        const themeSection = data.sections?.find((s: any) => s.sectionKey === 'theme_decorations');
        if (themeSection?.contentData?.themes && Array.isArray(themeSection.contentData.themes) && themeSection.contentData.themes.length > 0) {
          setThemesList(themeSection.contentData.themes);
        }
      })
      .catch(() => {});
  }, []);
  return (
    <div className="w-full bg-[#F3EFE9] font-sans text-neutral-900 selection:bg-[#DFBC71] selection:text-neutral-900 overflow-hidden">
      
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
          <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md border border-[#C5A059]/60 px-4 py-1.5 rounded-full text-[#DFBC71] text-xs uppercase tracking-[0.25em] font-medium shadow-lg">
            <Sparkles size={13} />
            <span>The Party Square Legacy</span>
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
          {themesList.map((theme) => {
            const wpText = `Hello Party Square! I want to enquire and book this Theme Decoration: "${theme.name}" (${theme.price || "Custom"}). Please share details and availability.`;
            const wpUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(wpText)}`;

            return (
              <div 
                key={theme.id}
                className="bg-[#FFFDF9] border border-[#E2D2B0] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-60 overflow-hidden bg-neutral-100">
                    <img 
                      src={theme.image} 
                      alt={theme.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#DFBC71] px-3.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-[#C5A059]/30">
                      <Sparkles size={12} /> {theme.tag || theme.category}
                    </div>

                    {theme.price && (
                      <div className="absolute bottom-3 right-3 bg-neutral-900/85 backdrop-blur-md text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold border border-white/10 font-mono shadow-md">
                        {theme.price}
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-2.5">
                    <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                      {theme.category}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-neutral-900 group-hover:text-amber-800 transition">
                      {theme.name}
                    </h3>
                    <p className="text-neutral-600 text-xs font-light leading-relaxed">
                      {theme.description}
                    </p>
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <div className="p-5 pt-0">
                  <a
                    href={wpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <WhatsAppIcon size={16} />
                    <span>Book on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
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