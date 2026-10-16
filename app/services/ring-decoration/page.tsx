"use client";

import { fetchProducts } from "@/app/lib/api";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle, Star, Heart, ArrowRight, ShieldCheck } from "lucide-react";
import { useWishlist } from "@/app/context/wishlistcontext";
import ProductCard from "@/app/components/ProductCard";
import ProductSort from "@/app/components/ProductSort";
import { ringDecorationProducts } from "@/app/data/ringDecorationProducts";
import { fetchPackages, fetchGalleryItems } from "@/app/lib/api";

const DEFAULT_CEREMONY_CARDS = [
  {
    id: "1",
    image: "/ceremanypic1.png",
    title: "Floral Ring Arch Backdrop",
    price: "₹12,999",
    rawPrice: 12999,
    desc: "A magnificent circular floral loop decorated with fresh roses, orchids, and warm fairy lighting for the perfect engagement backdrop."
  },
  {
    id: "2",
    image: "/ceremanypic2.png",
    title: "Royal Couple Seating & Stage",
    price: "₹18,999",
    rawPrice: 18999,
    desc: "Stunning couple sofa setup with rich velvet drapes, golden props, and grand chandelier lighting designed specifically for your special day."
  },
  {
    id: "3",
    image: "/ceremanypic3.png",
    title: "Aisle & Entrance Pathway Decor",
    price: "₹8,499",
    rawPrice: 8499,
    desc: "Magical entry walkway adorned with flower petals, pillar candles, and elegant cold pyro fountains to welcome the couple in style."
  },
  {
    id: "4",
    image: "/ceremanypic4.png",
    title: "Intimate Garden Ring Setup",
    price: "₹14,999",
    rawPrice: 14999,
    desc: "Open-air romantic canopy setup with hanging fairy lights, botanical greens, and pastel floral arrangements for outdoor celebrations."
  }
];

export default function RingDecorationPage() {
  const [liveProducts, setLiveProducts] = useState<any[]>(ringDecorationProducts);

  useEffect(() => {
    let active = true;
    async function loadDynamic() {
      try {
        const res = await fetchProducts({ category: 'ring-decoration', limit: 100 });
        let list: any[] = res.products || [];
        if (active && list.length > 0) {
          const mapped = list.map((item: any) => ({
            ...item,
            id: item._id || item.id || item.slug,
          }));
          const existingIds = new Set(mapped.map((m: any) => String(m.id)));
          const fallbackList = Array.isArray(ringDecorationProducts) ? ringDecorationProducts : [];
          const combined = [...mapped, ...fallbackList.filter((x: any) => !existingIds.has(String(x.id)))];
          setLiveProducts(combined);
        }
      } catch (err) {
        console.warn("Could not load dynamic products for ring-decoration:", err);
      }
    }
    loadDynamic();
    return () => {
      active = false;
    };
  }, []);

  const { toggleWishlist, isInWishlist } = useWishlist();
  const [sortBy, setSortBy] = useState<"recommended" | "price-low" | "price-high">("recommended");

  const getPrice = (price: string | number) => {
    if (typeof price === "number") return price;
    const value = Number(String(price).replace(/[₹,]/g, "").trim());
    return Number.isNaN(value) ? Infinity : value;
  };

  const sortedProducts = [...liveProducts].sort((a, b) => {
    if (sortBy === "price-low") return getPrice(a.price) - getPrice(b.price);
    if (sortBy === "price-high") return getPrice(b.price) - getPrice(a.price);
    return 0;
  });

  const productsToDisplay = sortedProducts;
  // Slider Data for the section below cards
  const DEFAULT_SLIDE_IMAGES = [
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

  const [slideImages, setSlideImages] = useState(DEFAULT_SLIDE_IMAGES);

  useEffect(() => {
    async function loadDynamicRingGallery() {
      try {
        const data = await fetchGalleryItems("ring-decoration");
        if (Array.isArray(data) && data.length > 0) {
          setSlideImages(
            data.map((item) => ({
              image: item.image,
              title: item.title,
              desc: item.category || "Exquisite setup with warm ambient lighting.",
            }))
          );
        }
      } catch (err) {
        console.warn("Could not load dynamic ring gallery:", err);
      }
    }
    loadDynamicRingGallery();
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide effect every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slideImages.length]);

  // Ceremony Cards Data
  const [ceremonyCards, setCeremonyCards] = useState(DEFAULT_CEREMONY_CARDS);

  useEffect(() => {
    async function loadDynamicRingPackages() {
      try {
        const data = await fetchPackages("ring-decoration");
        if (Array.isArray(data) && data.length > 0) {
          setCeremonyCards(
            data.map((p) => ({
              id: p._id,
              image: p.image || "/ceremanypic1.png",
              title: p.name,
              price: `₹${Number(p.price).toLocaleString("en-IN")}`,
              rawPrice: p.price,
              popular: !!p.isPopular,
              desc: p.description,
            }))
          );
        }
      } catch (err) {
        console.warn("Could not load dynamic ring decoration packages:", err);
      }
    }
    loadDynamicRingPackages();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#202522] font-sans">
      
      {/* ================= HERO SECTION WITH SINGLE CLEAR ring.png BACKGROUND ================= */}
      <section className="relative min-h-[480px] sm:h-[520px] py-10 sm:py-0 flex items-center justify-center overflow-hidden text-white">
        {/* Fixed Background Image ring.png with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/70 to-neutral-950/40 z-10" />
          <img src="/ring.png" alt="Ring Ceremony Background" className="w-full h-full object-cover" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-center sm:text-left">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#8CBC67]/20 border border-[#8CBC67]/50 px-4 py-1.5 rounded-full text-[#8CBC67] text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
              <Sparkles size={13} className="text-[#8CBC67]" />
              <span>Royal Ring Ceremony Specialists</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-md">
              Where Forever Begins <span className="text-[#8CBC67] italic font-normal">With A Ring</span>
            </h1>

            <p className="text-neutral-200 text-sm sm:text-base leading-relaxed">
              Immerse your engagement day in breathtaking floral arches, ambient mood lighting, and bespoke stage backdrops tailored for romance and elegance.
            </p>

            <div className="flex flex-row items-center gap-2 sm:gap-4 pt-2 justify-center sm:justify-start w-full">
              <Link
                href="/contact"
                className="flex-1 sm:flex-initial bg-[#8CBC67] hover:bg-[#7AB055] text-white px-3 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-lg hover:shadow-[#8CBC67]/30 transition-all flex items-center justify-center space-x-1.5 sm:space-x-2 whitespace-nowrap cursor-pointer"
              >
                <span>Book Ring Ceremony</span>
                <ArrowRight size={14} className="shrink-0" />
              </Link>
              
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial border border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 px-3 sm:px-6 py-3 sm:py-3.5 rounded-full font-semibold text-[11px] sm:text-xs uppercase tracking-wider transition flex items-center justify-center space-x-1.5 sm:space-x-2 whitespace-nowrap"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CEREMONY CARDS GRID SECTION ================= */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8CBC67] font-bold">Exclusive Collections</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">Ring Ceremony & Couple Decor Packages</h2>
          <p className="text-[#6B706C] text-xs sm:text-sm">Explore our specialized packages crafted to make your ring exchange ceremony an absolute fairy tale.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ceremonyCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-[#E8DFD1] shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="relative h-40 sm:h-44 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 right-3 bg-[#202522]/90 backdrop-blur-md text-[#8CBC67] text-xs font-bold px-2.5 py-1 rounded-full border border-[#8CBC67]/30 shadow-xs">
                  {card.price}
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow space-y-3">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#202522] mb-1.5 group-hover:text-[#8CBC67] transition leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-[#6B706C] text-xs leading-relaxed line-clamp-3">
                    {card.desc}
                  </p>
                </div>

                <Link
                  href={`/payment-detail?productId=${card.id}&name=${encodeURIComponent(card.title)}&price=${card.rawPrice || String(card.price).replace(/[^0-9]/g, '')}&image=${encodeURIComponent(card.image)}`}
                  className="w-full block text-center py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#EEF6EB] border border-[#8CBC67]/40 text-[#202522] hover:bg-[#8CBC67] hover:text-white transition duration-300 shadow-xs"
                >
                  Select Package
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= RING CEREMONY PRODUCTS SECTION ================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-t border-[#E8DFD1]">
        <div className="relative mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* LEFT - Heading */}
            <div className="text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8CBC67] font-bold">
                Ring Ceremony Collection
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
                  Ring Decoration Products
                </h2>
                <span className="text-[#6B706C] text-2xl">|</span>
                <span className="text-[#6B706C] text-2xl">
                  {productsToDisplay.length} Items
                </span>
              </div>
              <p className="text-[#6B706C] text-sm font-light mt-2 max-w-2xl">
                Discover bespoke floral arches, royal couple stages, cold pyro walkway arches, and romantic garden setups for an unforgettable engagement.
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
            href="/services/ring-decoration/all-products"
            className="inline-flex items-center space-x-2 bg-white hover:bg-neutral-950 hover:text-white text-neutral-950 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-sm border border-[#E8DFD1]"
          >
            <span>View More Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ================= AUTOMATIC SLIDING GALLERY SECTION (MOVED BELOW CARDS) ================= */}
      <section className="py-20 bg-[#F5F1E9] border-t border-[#E8DFD1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8CBC67] font-bold">Visual Showcase</span>
            <h2 className="font-serif text-3xl font-bold">Highlights & Stage Inspirations</h2>
            <p className="text-[#6B706C] text-sm">Experience the grandeur of our previous setup themes through clear visual previews.</p>
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
              <div className="inline-flex items-center space-x-2 bg-[#EEF6EB] border border-[#8CBC67]/40 px-3.5 py-1.5 rounded-full text-[#8CBC67] text-xs font-semibold tracking-widest uppercase w-max">
                <Sparkles size={13} className="text-[#8CBC67]" />
                <span>Featured Highlights</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522]">
                {slideImages[currentSlide].title}
              </h3>

              <p className="text-[#6B706C] text-sm sm:text-base leading-relaxed">
                {slideImages[currentSlide].desc}
              </p>

              {/* Slider Dots */}
              <div className="flex space-x-2 pt-2">
                {slideImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? "w-8 bg-[#8CBC67]" : "w-2 bg-neutral-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}