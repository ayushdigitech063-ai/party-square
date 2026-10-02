"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, Star, Heart, ArrowRight, ShieldCheck, ShoppingBag, Eye } from "lucide-react";
import { API_URL } from "@/config";

function WhatsAppIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.7.44 3.36 1.28 4.82L2 22l5.4-1.42a9.9 9.9 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm0 18.1h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.2.84.85-3.12-.2-.32a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.28-8.19 8.28zm4.52-6.19c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28z" />
    </svg>
  );
}

const DEFAULT_RING_PACKAGES = [
  {
    _id: "rp-1",
    image: "/ceremanypic1.png",
    name: "Floral Ring Arch Backdrop",
    price: 12999,
    description: "A magnificent circular floral loop decorated with fresh roses, orchids, and warm fairy lighting for the perfect engagement backdrop.",
    features: ["Circular Floral Arch", "Fresh Roses & Orchids", "Warm Fairy Lights", "2-3 Hours Setup"]
  },
  {
    _id: "rp-2",
    image: "/ceremanypic2.png",
    name: "Royal Couple Seating & Stage",
    price: 18999,
    description: "Stunning couple sofa setup with rich velvet drapes, golden props, and grand chandelier lighting designed specifically for your special day.",
    features: ["Royal Couple Sofa", "Velvet Drapes & Gold Props", "Grand Chandelier Lighting", "Dedicated Setup Manager"]
  },
  {
    _id: "rp-3",
    image: "/ceremanypic3.png",
    name: "Aisle & Entrance Pathway Decor",
    price: 8499,
    description: "Magical entry walkway adorned with flower petals, pillar candles, and elegant cold pyro fountains to welcome the couple in style.",
    features: ["Walkway Petal Carpet", "Pillar Candles & Lanterns", "Cold Pyro Entry Fountains", "Entry Archway"]
  },
  {
    _id: "rp-4",
    image: "/ceremanypic4.png",
    name: "Intimate Garden Ring Setup",
    price: 14999,
    description: "Open-air romantic canopy setup with hanging fairy lights, botanical greens, and pastel floral arrangements for outdoor celebrations.",
    features: ["Open-Air Romantic Canopy", "Botanical Greens & Pastels", "Fairy Lights Cluster", "Sound & Light Ready"]
  }
];

export default function RingDecorationPage() {
  const [packages, setPackages] = useState(DEFAULT_RING_PACKAGES);
  const [whatsappNumber, setWhatsappNumber] = useState("918010679679");
  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

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

  // Fetch dynamic packages and WhatsApp number from database
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

        // 2. Ring Ceremony Packages
        const pkgRes = await fetch(`${API_URL}/api/packages?pageTarget=ring-decoration`);
        if (pkgRes.ok) {
          const data = await pkgRes.json();
          if (Array.isArray(data) && data.length > 0) {
            setPackages(data);
          }
        }

        // 3. Related Products for Ring Ceremony & Wedding
        const prodRes = await fetch(`${API_URL}/api/products`);
        if (prodRes.ok) {
          const prods = await prodRes.json();
          if (Array.isArray(prods)) {
            // Filter products matching ring / wedding / couple / keepsake / flower
            const matched = prods.filter((p: any) => {
              const str = `${p.name} ${p.description || ""} ${p.category?.name || ""}`.toLowerCase();
              return str.includes("ring") || str.includes("couple") || str.includes("wedding") || str.includes("bride") || str.includes("ceremony");
            });
            setProducts(matched.length > 0 ? matched.slice(0, 8) : prods.slice(0, 8));
          }
        }
      } catch (err) {
        console.error("Error fetching ring decoration packages/products:", err);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchData();
  }, []);

  const heroWpText = "Hello Party Square! I want to enquire about Ring Ceremony decoration services.";
  const heroWpUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(heroWpText)}`;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 font-sans">
      
      {/* ================= HERO SECTION WITH SINGLE CLEAR ring.png BACKGROUND ================= */}
      <section className="relative h-[550px] flex items-center justify-center overflow-hidden text-white">
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
              <a
                href="#packages-section"
                className="bg-gradient-to-r from-[#DFBC71] to-[#C5A059] text-neutral-900 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-xl hover:brightness-105 transition flex items-center space-x-2"
              >
                <span>View Packages</span>
                <ArrowRight size={15} />
              </a>
              
              <a
                href={heroWpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-emerald-400/50 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider transition flex items-center space-x-2 backdrop-blur-md"
              >
                <WhatsAppIcon size={16} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CEREMONY PACKAGES GRID SECTION ================= */}
      <section id="packages-section" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">Exclusive Collections</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">Ring Ceremony & Couple Decor Packages</h2>
          <p className="text-neutral-600 text-sm">Explore our specialized packages crafted to make your ring exchange ceremony an absolute fairy tale.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((card, idx) => {
            const formattedPrice = typeof card.price === "number" ? `₹${card.price.toLocaleString("en-IN")}` : String(card.price);
            const wpText = `Hello Party Square! I want to book this Ring Ceremony Package: "${card.name}" (${formattedPrice}). Please share availability and details.`;
            const wpUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(wpText)}`;

            return (
              <div
                key={card._id || idx}
                className="bg-white rounded-3xl overflow-hidden border border-[#E8DFD1] shadow-md hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  <a
                    href={wpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative h-56 overflow-hidden bg-neutral-100 cursor-pointer"
                  >
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-neutral-900/85 backdrop-blur-md text-[#DFBC71] text-xs font-bold px-3 py-1 rounded-full border border-[#C5A059]/40 shadow">
                      {formattedPrice}
                    </div>
                  </a>

                  <div className="p-6 space-y-3">
                    <a
                      href={wpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-serif text-lg font-bold text-neutral-900 group-hover:text-[#C5A059] transition hover:text-emerald-700 cursor-pointer"
                    >
                      {card.name}
                    </a>
                    <p className="text-neutral-600 text-xs leading-relaxed line-clamp-3">
                      {card.description}
                    </p>

                    {card.features && card.features.length > 0 && (
                      <div className="pt-2 border-t border-neutral-100 space-y-1">
                        {card.features.slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="text-[11px] text-neutral-600 flex items-center gap-1.5">
                            <CheckCircle size={12} className="text-[#C5A059] shrink-0" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <a
                    href={wpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center py-3 rounded-2xl text-xs font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <WhatsAppIcon size={15} />
                    <span>Book on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= RELATED PRODUCTS & PROPS SECTION ================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-t border-[#E8DFD1]">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C5A059] font-bold mb-1">
              <ShoppingBag size={14} />
              <span>Matching Props & Products</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
              Ring Ceremony Items & Accessories
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-1">
              Complement your package with handcrafted keepsakes, platters, and romantic lighting elements.
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
            Loading products...
          </div>
        ) : products.length === 0 ? null : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((prod, pIdx) => {
              const pImage = prod.image || (prod.images && prod.images[0]) || "/ceremanypic1.png";
              const pPrice = typeof prod.price === "number" ? `₹${prod.price.toLocaleString("en-IN")}` : String(prod.price);
              const pWpText = `Hello Party Square! I want to order this product for Ring Ceremony: "${prod.name}" (${pPrice}). Product Link: ${typeof window !== "undefined" ? window.location.origin : ""}/card/${prod._id}`;
              const pWpUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(pWpText)}`;

              return (
                <div
                  key={prod._id || pIdx}
                  className="bg-white rounded-3xl overflow-hidden border border-[#E8DFD1] hover:border-[#C5A059] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
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
                      <h3 className="font-serif text-base font-bold text-neutral-900 group-hover:text-[#C5A059] transition line-clamp-1">
                        {prod.name}
                      </h3>
                      <p className="text-neutral-500 text-xs line-clamp-2 leading-relaxed">
                        {prod.description || "Handcrafted ceremonial decoration element for luxury events."}
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
                      <span>Order on WhatsApp</span>
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

      {/* ================= AUTOMATIC SLIDING GALLERY SECTION ================= */}
      <section className="py-20 bg-[#F5F1E9] border-t border-[#E8DFD1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">Visual Showcase</span>
            <h2 className="font-serif text-3xl font-bold">Highlights & Stage Inspirations</h2>
            <p className="text-neutral-600 text-sm">Experience the grandeur of our previous setup themes through clear visual previews.</p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFD1] bg-white grid grid-cols-1 lg:grid-cols-2">
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
                <a
                  href={heroWpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#25D366] text-white hover:bg-[#20bd5a] transition px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  <WhatsAppIcon size={16} />
                  <span>Plan on WhatsApp</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

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