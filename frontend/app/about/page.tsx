"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Heart, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Compass, 
  Briefcase, 
  ShoppingBag, 
  Eye, 
  PhoneCall 
} from "lucide-react";
import Link from "next/link";
import { API_URL } from "@/config";

function WhatsAppIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.7.44 3.36 1.28 4.82L2 22l5.4-1.42a9.9 9.9 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm0 18.1h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.2.84.85-3.12-.2-.32a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.28-8.19 8.28zm4.52-6.19c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28z" />
    </svg>
  );
}

const DEFAULT_CORP_PACKAGES = [
  {
    _id: "corp-1",
    name: "Corporate Annual Gala & Awards",
    price: 34999,
    image: "/coprateoffice.png",
    description: "Full stage fabrication with premium branding, VIP lounge seating, LED backdrops, and acoustic stage lighting.",
    isPopular: true,
    features: [
      "Custom branded LED wall backdrop",
      "Executive podium & awards table",
      "Warm ambient lighting & trusses",
      "Dedicated floor supervisor"
    ]
  },
  {
    _id: "corp-2",
    name: "Office Townhall & Launch Decor",
    price: 19999,
    image: "/homepage.png",
    description: "Dynamic workspace setup including entrance balloon arches, branding flex backdrops, and registration counters.",
    isPopular: false,
    features: [
      "Branded entry archway",
      "Stage backdrop with company logo",
      "Photo booth with custom cutout props",
      "Clean & swift 2-hour setup"
    ]
  },
  {
    _id: "corp-3",
    name: "Corporate Festive & Cultural Bash",
    price: 24999,
    image: "/diwali.png",
    description: "Festive styling for offices with traditional floral installations, ceiling drapes, and fairy light ambiance.",
    isPopular: false,
    features: [
      "Ceiling drapes & fairy lights",
      "Floral welcome rangoli & props",
      "Festive photobooth corner",
      "Full post-event removal included"
    ]
  }
];

export default function AboutPage() {
  const [packages, setPackages] = useState(DEFAULT_CORP_PACKAGES);
  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState("918010679679");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. WhatsApp Number
        const savedWp = typeof window !== "undefined" ? localStorage.getItem("party_whatsapp_number") : null;
        if (savedWp) {
          const clean = savedWp.replace(/\D/g, "");
          setWhatsappNumber(clean.startsWith("91") && clean.length > 10 ? clean : `91${clean.slice(-10)}`);
        }

        const settingsRes = await fetch(`${API_URL}/api/settings`);
        if (settingsRes.ok) {
          const sData = await settingsRes.json();
          if (sData?.whatsappNumber) {
            const clean = sData.whatsappNumber.replace(/\D/g, "");
            setWhatsappNumber(clean.startsWith("91") && clean.length > 10 ? clean : `91${clean.slice(-10)}`);
          }
        }

        // 2. Corporate Packages from backend
        const pkgRes = await fetch(`${API_URL}/api/packages?pageTarget=corporate-planner`);
        if (pkgRes.ok) {
          const data = await pkgRes.json();
          if (Array.isArray(data) && data.length > 0) {
            setPackages(data);
          }
        }

        // 3. Corporate & Event Products
        const prodRes = await fetch(`${API_URL}/api/products`);
        if (prodRes.ok) {
          const prods = await prodRes.json();
          if (Array.isArray(prods)) {
            const matched = prods.filter((p: any) => {
              const str = `${p.name} ${p.description || ""} ${p.category?.name || ""}`.toLowerCase();
              return str.includes("corporate") || str.includes("office") || str.includes("stage") || str.includes("event") || str.includes("premium");
            });
            setProducts(matched.length > 0 ? matched.slice(0, 8) : prods.slice(0, 8));
          }
        }
      } catch (err) {
        console.error("Error fetching corporate packages/products:", err);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="w-full bg-[#F3EFE9] font-sans text-neutral-900 selection:bg-[#DFBC71] selection:text-neutral-900 overflow-hidden">
      
      {/* ================= HERO BANNER ================= */}
      <section className="relative w-full h-[60vh] md:h-[70vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/home2.png" 
            alt="Party Square Luxury Story" 
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
            Discover the philosophy, passion, and meticulous craftsmanship behind Party Square—India’s premier luxury event styling house.
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
                alt="Party Square Craftsmanship" 
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
              Founded over a decade ago, Party Square started with a simple belief: that every milestone deserves a stage as grand as the emotions behind it. What began as a boutique floral styling initiative has evolved into an elite creative agency trusted by families, corporate giants, and luxury hosts across the country.
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
              Beyond intimate celebrations, Party Square brings architectural scale and brand-aligned aesthetics to corporate environments. We partner with top enterprises to transform offices and venue spaces for annual galas, brand launches, and festive celebrations.
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
              alt="Party Square Corporate Standards" 
              className="w-full h-full object-cover hover:scale-105 transition duration-700"
            />
          </div>

        </div>
      </section>

      {/* ================= CORPORATE PLANNER PACKAGES SECTION ================= */}
      <section id="corporate-packages" className="py-20 px-6 md:px-16 max-w-7xl mx-auto border-t border-[#E6DEC9]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-[#F3EAD3] border border-[#E2D2B0] px-3.5 py-1 rounded-full text-[#8C6D24] text-xs uppercase tracking-widest font-medium">
            <Briefcase size={12} className="text-[#C5A059]" />
            <span>Corporate Solutions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            Corporate Event & Office Packages
          </h2>
          <p className="text-neutral-600 text-sm">
            All-inclusive event styling packages engineered for office townhalls, gala nights, and executive celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => {
            const formattedPrice = typeof pkg.price === "number" ? `₹${pkg.price.toLocaleString("en-IN")}` : String(pkg.price);
            const wpText = `Hello Party Square! I want to enquire about Corporate Package: "${pkg.name}" (${formattedPrice}). Please share proposal and timeline.`;
            const wpUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(wpText)}`;

            return (
              <div
                key={pkg._id || idx}
                className={`bg-white rounded-3xl overflow-hidden border shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group ${
                  pkg.isPopular ? "border-[#C5A059] ring-2 ring-[#C5A059]/30" : "border-[#E8DFD1]"
                }`}
              >
                <div>
                  <a
                    href={wpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative h-60 overflow-hidden bg-neutral-100 cursor-pointer"
                  >
                    <img
                      src={pkg.image || "/coprateoffice.png"}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-neutral-900/85 backdrop-blur-md text-[#DFBC71] text-xs font-bold px-3 py-1 rounded-full border border-[#C5A059]/40 shadow">
                      {formattedPrice}
                    </div>

                    {pkg.isPopular && (
                      <div className="absolute top-4 right-4 bg-[#C5A059] text-neutral-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                        Recommended
                      </div>
                    )}
                  </a>

                  <div className="p-6 space-y-3">
                    <a
                      href={wpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-serif text-xl font-bold text-neutral-900 group-hover:text-[#8C6D24] transition cursor-pointer"
                    >
                      {pkg.name}
                    </a>
                    <p className="text-neutral-600 text-xs leading-relaxed line-clamp-3">
                      {pkg.description}
                    </p>

                    {pkg.features && pkg.features.length > 0 && (
                      <div className="pt-3 border-t border-neutral-100 space-y-1.5">
                        {pkg.features.map((feat, fIdx) => (
                          <div key={fIdx} className="text-xs text-neutral-700 flex items-center gap-2">
                            <CheckCircle2 size={13} className="text-[#C5A059] shrink-0" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href={wpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <WhatsAppIcon size={16} />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= RELATED CORPORATE PRODUCTS & RENTALS SECTION ================= */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-t border-[#E6DEC9]">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#8C6D24] font-bold mb-1">
              <ShoppingBag size={14} />
              <span>Event Elements & Rentals</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
              Corporate Products & Event Props
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-1">
              Individual branded podiums, welcome easels, floral centerpieces, and stage rentals.
            </p>
          </div>

          <Link
            href="/all-products"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#8C6D24] hover:text-black uppercase tracking-wider transition shrink-0"
          >
            <span>View All Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {productsLoading ? (
          <div className="py-16 text-center text-neutral-400 text-sm">
            Loading corporate event items...
          </div>
        ) : products.length === 0 ? null : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((prod, pIdx) => {
              const pImage = prod.image || (prod.images && prod.images[0]) || "/coprateoffice.png";
              const pPrice = typeof prod.price === "number" ? `₹${prod.price.toLocaleString("en-IN")}` : String(prod.price);
              const pWpText = `Hello Party Square! I want to inquire about Corporate Product: "${prod.name}" (${pPrice}). Product Link: ${typeof window !== "undefined" ? window.location.origin : ""}/card/${prod._id}`;
              const pWpUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(pWpText)}`;

              return (
                <div
                  key={prod._id || pIdx}
                  className="bg-white rounded-3xl overflow-hidden border border-[#E8DFD1] hover:border-[#8C6D24] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-52 bg-neutral-100 overflow-hidden">
                      <img
                        src={pImage}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md text-[#DFBC71] text-xs font-bold px-3 py-1 rounded-full border border-[#C5A059]/40">
                        {pPrice}
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="font-serif text-base font-bold text-neutral-900 group-hover:text-[#8C6D24] transition line-clamp-1">
                        {prod.name}
                      </h3>
                      <p className="text-neutral-500 text-xs line-clamp-2 leading-relaxed">
                        {prod.description || "Executive corporate decor element designed for premium gatherings."}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 space-y-2">
                    <a
                      href={pWpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#20bd5a] text-white transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <WhatsAppIcon size={14} />
                      <span>Inquire on WhatsApp</span>
                    </a>

                    <Link
                      href={`/card/${prod._id}`}
                      className="w-full py-2 rounded-xl text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center gap-1 text-center"
                    >
                      <Eye size={13} />
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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