"use client";

import { fetchProducts } from "@/app/lib/api";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCity } from "@/app/context/CityContext";
import { kidsbirthdayProducts } from "@/app/data/kidsBirthdayProduct";
import { fetchPackages, fetchGalleryItems } from "@/app/lib/api";
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
import { useWishlist } from "../../context/wishlistcontext";
import ProductCard from "@/app/components/ProductCard";
import ProductSort from "@/app/components/ProductSort";
import FAQSection from "@/app/components/FAQSection";

export default function BirthdayServicePage() {
  const router = useRouter();
  const { selectedCity } = useCity();
  const [liveProducts, setLiveProducts] = useState<any[]>(kidsbirthdayProducts);

  useEffect(() => {
    let active = true;
    async function loadDynamic() {
      try {
        const res = await fetchProducts({ category: 'birthday', limit: 100 });
        let list: any[] = res.products || [];
        if (active && list.length > 0) {
          const mapped = list.map((item: any) => ({
            ...item,
            id: item._id || item.id || item.slug,
          }));
          const existingIds = new Set(mapped.map((m: any) => String(m.id)));
          const fallbackList = Array.isArray(kidsbirthdayProducts) ? kidsbirthdayProducts : [];
          const combined = [...mapped, ...fallbackList.filter((x: any) => !existingIds.has(String(x.id)))];
          setLiveProducts(combined);
        }
      } catch (err) {
        console.warn("Could not load dynamic products for birthday:", err);
      }
    }
    loadDynamic();
    return () => {
      active = false;
    };
  }, []);

  // Gallery images for child birthdays
  const DEFAULT_CHILD_GALLERY = [
    "/childbirthday1.png",
    "/childbirthday2.png",
    "/childbirthday3.png",
    "/childbirthday4.png",
    "/childbirthday5.png",
  ];
  const [childGallery, setChildGallery] = useState(DEFAULT_CHILD_GALLERY);

  useEffect(() => {
    async function loadDynamicChildGallery() {
      try {
        const data = await fetchGalleryItems("birthday");
        if (Array.isArray(data) && data.length > 0) {
          setChildGallery(data.map((item) => item.image));
        }
      } catch (err) {
        console.warn("Could not load dynamic birthday gallery:", err);
      }
    }
    loadDynamicChildGallery();
  }, []);
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  const [sortBy, setSortBy] = useState<
    "recommended" | "price-low" | "price-high"
  >("recommended");

  // Birthday Packages Cards
  const DEFAULT_BIRTHDAY_PACKAGES = [
    {
      id: "classic-kids-theme",
      slug: "classic-kids-theme",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=60",
      name: "Classic Kids Theme",
      price: "₹3,499",
      rawPrice: 3499,
      desc: "A vibrant setup with 150+ metallic balloons, birthday banner, and fairy lights.",
      popular: false,
    },
    {
      id: "pastel-luxe-canopy",
      slug: "pastel-luxe-canopy",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=60",
      name: "Pastel Luxe Canopy",
      price: "₹6,999",
      rawPrice: 6999,
      popular: true,
      desc: "Bespoke pastel balloon arch with premium sheer canopy, fairy lights, and neon sign.",
    },
    {
      id: "grand-balloon-castle",
      slug: "grand-balloon-castle",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&auto=format&fit=crop&q=60",
      name: "Grand Balloon Castle",
      price: "₹12,499",
      rawPrice: 12499,
      popular: false,
      desc: "Showstopper themed balloon castle setup with customized cutouts and ambient styling.",
    },
  ];

  const [birthdayPackages, setBirthdayPackages] = useState(DEFAULT_BIRTHDAY_PACKAGES);

  useEffect(() => {
    async function loadDynamicBirthdayPackages() {
      try {
        const data = await fetchPackages("birthday");
        if (Array.isArray(data) && data.length > 0) {
          setBirthdayPackages(
            data.map((p) => ({
              id: p._id,
              slug: (p.name || p._id).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
              image: p.image || "/birthdaydesign.png",
              name: p.name,
              price: `₹${Number(p.price).toLocaleString("en-IN")}`,
              rawPrice: p.price,
              popular: !!p.isPopular,
              desc: p.description,
            }))
          );
        }
      } catch (err) {
        console.warn("Could not load dynamic birthday packages:", err);
      }
    }
    loadDynamicBirthdayPackages();
  }, []);

  const getPrice = (price: string | number) => {
    if (typeof price === "number") return price;

    const value = Number(price.replace(/[₹,]/g, "").trim());

    return Number.isNaN(value) ? Infinity : value;
  };

  const sortedProducts = [...liveProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return getPrice(a.price) - getPrice(b.price);

      case "price-high":
        return getPrice(b.price) - getPrice(a.price);

      case "recommended":
      default:
        return 0;
    }
  });

  const productsToDisplay = sortedProducts;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#202522] font-sans">
      {/* ================= HERO SECTION (COMPACT HALF-HEIGHT BANNER) ================= */}
      <section className="relative h-[180px] sm:h-[200px] md:h-[230px] flex items-center justify-center overflow-hidden text-white">
        {/* Background Image Container with full cover and center positioning */}
        <div
          className="absolute inset-0 z-0 w-full h-full"
          style={{
            backgroundImage: "url('/birthdayhomepage.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Luxury gradient overlay for text readability on left side */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-neutral-950/40" />

        {/* Hero Content on Left Side */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full text-center sm:text-left">
          <div className="max-w-2xl space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center space-x-1.5 bg-[#8CBC67]/20 border border-[#8CBC67]/50 px-2.5 sm:px-3.5 py-0.5 rounded-full text-[#8CBC67] text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase backdrop-blur-sm shadow-sm">
              <Gift size={12} className="text-[#8CBC67]" />
              <span>India's Premier Birthday Stylists</span>
            </div>

            <p className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-md">
              <span className="text-white drop-shadow-sm">Make Every Birthday</span>{" "}
              <span className="text-[#8CBC67] font-bold">Unforgettable</span>
            </p>

            <p className="text-neutral-200 text-[11px] sm:text-xs md:text-sm max-w-xl font-light leading-relaxed line-clamp-1 sm:line-clamp-2">
              Transform your special day into a magical wonderland with vibrant colors and elegance.
            </p>

            <div className="flex flex-row items-center gap-2 sm:gap-3 pt-1 w-full justify-center sm:justify-start">
              <Link
                href="/contact"
                className="bg-[#8CBC67] hover:bg-[#7AB055] text-white px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-md hover:shadow-[#8CBC67]/30 transition flex items-center justify-center space-x-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Book Birthday Decor</span>
                <ArrowRight size={13} className="shrink-0" />
              </Link>

              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white/25 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full font-semibold text-[10px] sm:text-xs uppercase tracking-wider transition flex items-center justify-center space-x-1.5 whitespace-nowrap"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BIRTHDAY PACKAGES CARDS SECTION ================= */}
      <section id="packages" className="py-10 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8CBC67] font-bold">
            Party Packages
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522]">
            Choose Your Birthday Theme
          </h1>
          <p className="text-[#6B706C] text-xs sm:text-sm">
            Explore our specialized decoration packages crafted to bring smiles
            and unforgettable memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {birthdayPackages.map((pkg) => {
            const packageSlug = (pkg.name || pkg.id).toLowerCase().replace(/[^a-z0-9]+/g, "-");
            const packageDetailUrl = `/${(selectedCity || "bangalore").toLowerCase()}/birthday/${packageSlug || pkg.id}`;
            return (
              <div
                key={pkg.id}
                onClick={() => router.push(packageDetailUrl)}
                className={`relative rounded-2xl bg-white border transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 cursor-pointer select-none group ${
                  pkg.popular
                    ? "border-[#8CBC67] ring-1 ring-[#8CBC67]/30 shadow-md"
                    : "border-[#E8E8E3] hover:border-[#8CBC67]"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#8CBC67] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md z-10">
                    Most Loved
                  </div>
                )}

                <div>
                  <div className="relative h-44 sm:h-48 rounded-xl overflow-hidden mb-4 border border-[#E8E8E3] shadow-inner">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-[#202522]/90 text-[#8CBC67] text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-xs border border-[#8CBC67]/30">
                      {pkg.price}
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 bg-[#202522]/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                      Tap to view details
                    </div>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#202522] mb-1.5 leading-snug group-hover:text-[#8CBC67] transition">
                    {pkg.name}
                  </h3>
                  <p className="text-[#6B706C] text-xs leading-relaxed mb-4">
                    {pkg.desc}
                  </p>
                </div>

                <div>
                  <Link
                    href={packageDetailUrl}
                    onClick={(e) => e.stopPropagation()}
                    className={`w-full block text-center py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                      pkg.popular
                        ? "bg-[#8CBC67] text-white hover:bg-[#7AB055] shadow-sm"
                        : "bg-neutral-900 text-white hover:bg-[#8CBC67]"
                    }`}
                  >
                    SELECT PACKAGE
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Kids Birthday products */}

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="relative mb-12">
          <div className="flex items-center justify-between gap-6">
            {/* LEFT - Heading */}
            <div className="text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8CBC67] font-bold">
                Â  Kids Collection
              </span>
              <div className="flex items-baseline gap-3">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522] mt-1">
                  Kids Birthday Products
                </h2>
                <span className="text-[#6B706C] text-2xl">|</span>

                <span className="text-[#6B706C] text-2xl">
                  {productsToDisplay.length} Items
                </span>
              </div>

              <p className="text-[#6B706C] text-sm font-light mt-2">
                Â Discover fun and colorful birthday products designed to make
                every child's celebration extra special.
              </p>
            </div>

            {/* RIGHT - Sort */}
            <div className="shrink-0">
              <ProductSort value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {productsToDisplay.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                isInWishlist={isInWishlist}
                toggleWishlist={toggleWishlist}
              />
            );
          })}
        </div>

        {/* VIEW MORE PRODUCTS */}
        <div className="text-center mt-12">
          <Link
            href="/services/birthday/all-products"
            className="inline-flex items-center space-x-2 bg-white hover:bg-neutral-950 hover:text-white text-neutral-950 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-sm border border-[#E8E8E3]"
          >
            <span>View More Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ================= KIDS & SPECIAL BIRTHDAY GALLERY SECTION ================= */}
      <section className="py-24 bg-[#EFEADB] border-t border-[#E8E8E3]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8CBC67] font-medium">
                Moments of Joy
              </span>
              <h2 className="font-serif text-5xl md:text-6xl text-[#202522] mt-2 leading-tight">
                Kids & Special Birthday Gallery
              </h2>
              <p className="text-[#202522] text-lg font-light mt-4">
                A glimpse into our joyous setups featuring wonderful decorations
                for kids and milestones.
              </p>
            </div>
            <Link
              href="/gallery"
              className="shrink-0 bg-white text-[#202522] px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest border border-neutral-300 hover:border-[#8CBC67] hover:text-[#8CBC67] hover:bg-[#EEF6EB] transition flex items-center space-x-2 shadow-sm"
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
            <div className="inline-flex items-center space-x-2 bg-[#8CBC67]/20 border border-[#8CBC67]/40 px-4 py-1.5 rounded-full text-[#8CBC67] text-xs font-semibold tracking-widest uppercase">
              <Star size={13} className="text-[#8CBC67] fill-[#8CBC67]" />
              <span>Book Your Experience</span>
            </div>

            <h2 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
              Ready to Create a <br />
              <span className="text-[#8CBC67]">Masterpiece of Joy?</span>
            </h2>

            <p className="text-neutral-200 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              Contact Party Square today to discuss your vision. Our expert
              stylists are excited to craft a bespoke, magical celebration that
              you and your guests will remember forever.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-5 pt-10 lg:pt-0 shrink-0 justify-center">
            <Link
              href="/contact"
              className="bg-[#8CBC67] hover:bg-[#7AB055] text-white px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest shadow-2xl hover:shadow-[#8CBC67]/30 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
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
      <FAQSection />
    </div>
  );
}

