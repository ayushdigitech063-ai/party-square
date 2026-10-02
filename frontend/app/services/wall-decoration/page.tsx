"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, Calendar, Star, ShieldCheck, ArrowRight, Heart, ShoppingBag, Eye } from "lucide-react";
import { API_URL } from "@/config";

function WhatsAppIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.7.44 3.36 1.28 4.82L2 22l5.4-1.42a9.9 9.9 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm0 18.1h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.2.84.85-3.12-.2-.32a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.28-8.19 8.28zm4.52-6.19c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28z" />
    </svg>
  );
}

const DEFAULT_WALL_PACKAGES = [
  {
    _id: "wp-1",
    name: "Classic Wall Arch",
    price: 2999,
    image: "/walldecoration.png",
    description: "Elegant and neat wall balloon styling, perfect for compact spaces.",
    isPopular: false,
    features: [
      "Half/Full Wall Balloon Arch",
      "Matching Foil Curtains & Banners",
      "Easy peel-off safe wall hooks",
      "Professional installation team",
      "Duration: 2-3 Hours Setup"
    ]
  },
  {
    _id: "wp-2",
    name: "Floral & Ring Wall Decor",
    price: 5499,
    image: "/walldecoration1.png",
    isPopular: true,
    description: "Stunning combination of floral loops, fairy lights, and themed wall accents.",
    features: [
      "Everything in Classic Wall Arch",
      "Metal/Wooden Ring Backdrop Setup",
      "LED Neon Sign / Custom Name Cutout",
      "Fairy lights & ambient lighting",
      "Premium organic biodegradable balloons"
    ]
  },
  {
    _id: "wp-3",
    name: "Grand Entrance & Wall Combo",
    price: 8999,
    image: "/doordecoration.png",
    isPopular: false,
    description: "Complete wall and door decoration bundle for maximum visual impact.",
    features: [
      "Comprehensive Wall Decoration",
      "Matching Door Entrance Styling",
      "Special Photo-Booth Corner",
      "Fog or Cold Pyro entry elements",
      "Dedicated event stylist support"
    ]
  }
];

export default function WallDecorationPage() {
  const [packages, setPackages] = useState(DEFAULT_WALL_PACKAGES);
  const [whatsappNumber, setWhatsappNumber] = useState("918010679679");
  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  // Gallery Images
  const [galleryImages, setGalleryImages] = useState<string[]>([
    "/walldecoration.png",
    "/walldecoration1.png",
    "/doordecoration.png",
    "/doordecoration1.png"
  ]);

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

  // Fetch dynamic packages and WhatsApp number
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

        // 2. Wall Decoration Packages
        const pkgRes = await fetch(`${API_URL}/api/packages?pageTarget=wall-decoration`);
        if (pkgRes.ok) {
          const data = await pkgRes.json();
          if (Array.isArray(data) && data.length > 0) {
            setPackages(data);
          }
        }

        // 3. Related Products for Wall & Door Decoration
        const prodRes = await fetch(`${API_URL}/api/products`);
        if (prodRes.ok) {
          const prods = await prodRes.json();
          if (Array.isArray(prods)) {
            const matched = prods.filter((p: any) => {
              const str = `${p.name} ${p.description || ""} ${p.category?.name || ""}`.toLowerCase();
              return str.includes("wall") || str.includes("door") || str.includes("backdrop") || str.includes("curtain") || str.includes("balloon");
            });
            setProducts(matched.length > 0 ? matched.slice(0, 8) : prods.slice(0, 8));
          }
        }

        // 4. Wall & Door Showcase Gallery from Super Admin
        const homeRes = await fetch(`${API_URL}/api/homepage`);
        if (homeRes.ok) {
          const hData = await homeRes.json();
          const wallGalSection = hData.sections?.find((s: any) => s.sectionKey === 'wall_gallery');
          if (wallGalSection?.contentData?.images && Array.isArray(wallGalSection.contentData.images) && wallGalSection.contentData.images.length > 0) {
            setGalleryImages(wallGalSection.contentData.images);
          }
        }
      } catch (err) {
        console.error("Error fetching wall decoration packages/products:", err);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchData();
  }, []);

  const heroWpText = "Hello Party Square! I want to enquire about Wall and Door decoration services.";
  const heroWpUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(heroWpText)}`;

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
              <a
                href="#packages-section"
                className="group relative bg-gradient-to-r from-[#DFBC71] to-[#C5A059] text-neutral-950 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>View Wall Packages</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href={heroWpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-emerald-400/50 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white px-7 py-4 rounded-full font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg flex items-center space-x-2 backdrop-blur-md"
              >
                <WhatsAppIcon size={16} />
                <span>Chat on WhatsApp</span>
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
              <a
                href={heroWpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-rose-950 hover:bg-rose-50 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition inline-flex items-center space-x-2 shadow-lg"
              >
                <span>Book This Setup on WhatsApp</span>
                <ArrowRight size={15} />
              </a>
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

      {/* ================= PACKAGES SECTION WITH DIRECT WHATSAPP BOOKING ================= */}
      <section id="packages-section" className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">Pricing Plans</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">Choose Wall & Door Packages</h2>
          <p className="text-neutral-600 text-sm">Select from our specialized decoration packages for walls, corners, and doorways.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => {
            const formattedPrice = typeof pkg.price === "number" ? `₹${pkg.price.toLocaleString("en-IN")}` : String(pkg.price);
            const wpText = `Hello Party Square! I want to book this Wall Decoration Package: "${pkg.name}" (${formattedPrice}). Please share details and availability.`;
            const wpUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(wpText)}`;

            return (
              <div
                key={pkg._id || idx}
                className={`relative rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-xl overflow-hidden group ${
                  pkg.isPopular ? "border-[#C5A059] ring-2 ring-[#C5A059]/20 scale-105 md:-translate-y-2" : "border-neutral-200"
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute top-4 right-4 z-10 bg-[#C5A059] text-neutral-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                {/* Package Image Preview */}
                <a
                  href={wpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative h-56 w-full overflow-hidden bg-neutral-100 border-b border-neutral-100 cursor-pointer"
                >
                  <img 
                    src={pkg.image} 
                    alt={pkg.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </a>

                <div className="p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <a
                      href={wpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-serif text-2xl font-bold text-neutral-900 mb-2 hover:text-[#C5A059] transition cursor-pointer"
                    >
                      {pkg.name}
                    </a>
                    <p className="text-neutral-600 text-xs leading-relaxed mb-6">{pkg.description}</p>
                    <div className="text-3xl font-bold text-[#C5A059] mb-6">{formattedPrice}</div>

                    {pkg.features && pkg.features.length > 0 && (
                      <div className="space-y-2 border-t border-neutral-100 pt-4 mb-6">
                        {pkg.features.slice(0, 4).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start space-x-2 text-xs text-neutral-700">
                            <CheckCircle size={15} className="text-[#C5A059] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <a
                      href={wpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block text-center py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <WhatsAppIcon size={16} />
                      <span>Book on WhatsApp</span>
                    </a>
                  </div>
                </div>                                                          
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= RELATED PRODUCTS & WALL PROPS SECTION ================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-t border-[#E8DFD1]">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C5A059] font-bold mb-1">
              <ShoppingBag size={14} />
              <span>Wall Props & Add-ons</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
              Matching Wall & Door Accessories
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-1">
              Enhance your wall setup with individual foil curtains, neon signs, and themed party props.
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
              const pImage = prod.image || (prod.images && prod.images[0]) || "/walldecoration.png";
              const pPrice = typeof prod.price === "number" ? `₹${prod.price.toLocaleString("en-IN")}` : String(prod.price);
              const pWpText = `Hello Party Square! I want to order this product for Wall Decoration: "${prod.name}" (${pPrice}). Product Link: ${typeof window !== "undefined" ? window.location.origin : ""}/card/${prod._id}`;
              const pWpUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(pWpText)}`;

              return (
                <div
                  key={prod._id || pIdx}
                  className="bg-white rounded-3xl overflow-hidden border border-[#E8DFD1] hover:border-rose-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
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
                      <h3 className="font-serif text-base font-bold text-neutral-900 group-hover:text-rose-600 transition line-clamp-1">
                        {prod.name}
                      </h3>
                      <p className="text-neutral-500 text-xs line-clamp-2 leading-relaxed">
                        {prod.description || "Premium wall and doorway accent for home and event decor."}
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

      {/* ================= GALLERY PREVIEW ================= */}
      <section className="py-16 bg-[#F5F1E9] border-t border-[#E8DFD1] mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">Visual Showcase</span>
              <h2 className="font-serif text-3xl font-bold mt-1">Wall & Door Decoration Gallery</h2>
            </div>
            <Link href="/services" className="mt-4 md:mt-0 text-xs font-bold text-[#C5A059] hover:underline flex items-center space-x-1">
              <span>View Full Gallery</span>
              <ArrowRight size={14} />
            </Link>
          </div>                                   

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => {
              const galleryWpText = `Hello Party Square! I liked this Wall & Door decoration design from your gallery (Photo #${idx + 1}). Can you share quotation and customization options?`;
              const galleryWpUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(galleryWpText)}`;

              return (
                <a 
                  key={idx} 
                  href={galleryWpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl overflow-hidden shadow-md group relative h-60 border border-[#E8DFD1] block cursor-pointer"
                  title="Enquire this design on WhatsApp"
                >
                  <img src={img} alt="Wall & Door Decor" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                    <span className="text-white text-xs font-semibold tracking-wide flex items-center gap-1.5 mb-1">
                      <WhatsAppIcon size={14} className="text-[#25D366]" />
                      <span>Enquire on WhatsApp</span>
                    </span>
                    <span className="text-amber-300 text-[10px] uppercase tracking-wider font-bold">
                      {idx % 2 === 0 ? "Wall Decoration" : "Door Decoration"}
                    </span>
                  </div>
                </a>   
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}