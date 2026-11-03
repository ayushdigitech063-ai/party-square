"use client";

import { fetchProducts } from "@/app/lib/api";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { decorationItems } from "@/app/data/decorationThemeData";
import { useWishlist } from "@/app/context/wishlistcontext";
import ProductCard from "@/app/components/ProductCard";
import ProductSort from "@/app/components/ProductSort";

interface CategoryPill {
  id: string;
  slug: string;
  name: string;
  image: string;
  keywords: string[];
}

const THEME_CATEGORIES: CategoryPill[] = [
  {
    id: "all",
    slug: "all",
    name: "All Themes",
    image: "/homepage.png",
    keywords: [],
  },
  {
    id: "kids-birthday",
    slug: "kids-birthday",
    name: "Kids Birthday",
    image: "/birthdaykids.png",
    keywords: ["kid", "baby", "cartoon", "dinosaur", "princess", "superhero", "avenger", "toy", "child"],
  },
  {
    id: "adult-romantic",
    slug: "adult-romantic",
    name: "Adult / Romantic",
    image: "/romaticvibe.png",
    keywords: ["adult", "romantic", "cabana", "candlelight", "canopy", "anniversary", "couples", "love", "propose"],
  },
  {
    id: "premium-decor",
    slug: "premium-decor",
    name: "Premium Decor",
    image: "/homepage.png",
    keywords: ["premium", "royal", "luxury", "stage", "golden", "mandap", "grand"],
  },
  {
    id: "birthday-gifts",
    slug: "birthday-gifts",
    name: "Birthday Gifts",
    image: "/card.png",
    keywords: ["gift", "hamper", "keepsake", "present", "box"],
  },
  {
    id: "same-day-decors",
    slug: "same-day-decors",
    name: "Same Day Decors",
    image: "/card2.png",
    keywords: ["same day", "express", "fast", "instant", "balloon", "room"],
  },
  {
    id: "simple-birthday",
    slug: "simple-birthday",
    name: "Simple Birthday",
    image: "/birthdaydesign.png",
    keywords: ["simple", "home", "wall", "room", "pastel", "garland", "balloon"],
  },
  {
    id: "car-boot",
    slug: "car-boot",
    name: "Car Boot Decors",
    image: "/card3.png",
    keywords: ["car", "boot", "trunk", "dicky", "surprise", "outdoor"],
  },
  {
    id: "ring-decorations",
    slug: "ring-decorations",
    name: "Ring Decorations",
    image: "/ring.png",
    keywords: ["ring", "circle", "round", "ceremony", "arch", "halo", "engagement"],
  },
];

export default function ThemeDecorationAllProductsPage() {
  const [liveProducts, setLiveProducts] = useState<any[]>(decorationItems);
  const [selectedSub, setSelectedSub] = useState<string>("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    async function loadDynamic() {
      try {
        const res = await fetchProducts({ limit: 150 });
        let list: any[] = res.products || [];
        if (active && list.length > 0) {
          const mapped = list.map((item: any) => ({
            ...item,
            id: item._id || item.id || item.slug,
          }));
          const existingIds = new Set(mapped.map((m: any) => String(m.id)));
          const fallbackList = Array.isArray(decorationItems) ? decorationItems : [];
          const combined = [...mapped, ...fallbackList.filter((x: any) => !existingIds.has(String(x.id)))];
          setLiveProducts(combined);
        }
      } catch (err) {
        console.warn("Could not load dynamic products for all-products:", err);
      }
    }
    loadDynamic();
    return () => {
      active = false;
    };
  }, []);

  const { toggleWishlist, isInWishlist } = useWishlist();

  const [sortBy, setSortBy] = useState<
    "recommended" | "price-low" | "price-high"
  >("recommended");

  const getPrice = (price: string | number) => {
    if (typeof price === "number") return price;
    const value = Number(String(price).replace(/[₹,]/g, "").trim());
    return Number.isNaN(value) ? Infinity : value;
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Unique products de-duplication
  const uniqueProducts = React.useMemo(() => {
    const seen = new Set();
    return liveProducts.filter((p, idx) => {
      const key = String(p.id ?? p._id ?? p.slug ?? idx);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [liveProducts]);

  // Filter products by selected category
  const filteredProducts = uniqueProducts.filter((product) => {
    if (selectedSub === "all") return true;

    const currentCatObj = THEME_CATEGORIES.find((c) => c.slug === selectedSub);
    if (!currentCatObj) return true;

    const fullText = `${product.name || ""} ${product.description || ""} ${product.category || ""} ${product.subcategory || ""} ${product.theme || ""}`.toLowerCase();

    return currentCatObj.keywords.some((kw) => fullText.includes(kw.toLowerCase()));
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return getPrice(a.price) - getPrice(b.price);
    }
    if (sortBy === "price-high") {
      return getPrice(b.price) - getPrice(a.price);
    }
    return 0;
  });

  const selectedCategoryName =
    THEME_CATEGORIES.find((c) => c.slug === selectedSub)?.name || "All Themes";

  return (
    <div className="min-h-screen bg-[#FCFBF7] px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#6B706C] hover:text-[#202522] transition mb-4"
          >
            <ArrowLeft size={14} />
            <span>Back to Theme Decoration</span>
          </Link>

          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
            <h1 className="text-[#202522] text-2xl sm:text-3xl font-serif font-bold">
              Theme Decoration - All Products Catalogue
            </h1>
            <span className="text-[#6B706C] text-xl hidden sm:inline">|</span>
            <span className="text-[#8CBC67] font-semibold text-lg sm:text-xl">
              {sortedProducts.length} Items
            </span>
          </div>

          <p className="text-[#6B706C] text-sm mt-1 font-light max-w-3xl">
            Explore our complete collection of theme decoration packages, luxury backdrops, festive setups, and celebration aesthetics.
          </p>
        </div>

        {/* ========================================================
            TOP CATEGORIES SECTION (Interactive filter on click)
        ========================================================= */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#E8E8E3] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#8CBC67]" />
              <h3 className="text-sm sm:text-base font-bold text-[#202522]">
                Explore By Categories
              </h3>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="w-8 h-8 rounded-full border border-[#E8E8E3] bg-[#FCFBF7] text-[#202522] hover:bg-[#EEF6EB] hover:border-[#8CBC67] transition flex items-center justify-center cursor-pointer shadow-2xs"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="w-8 h-8 rounded-full border border-[#E8E8E3] bg-[#FCFBF7] text-[#202522] hover:bg-[#EEF6EB] hover:border-[#8CBC67] transition flex items-center justify-center cursor-pointer shadow-2xs"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Categories Horizontal Carousel */}
          <div
            ref={scrollRef}
            className="flex items-start gap-3 sm:gap-4 overflow-x-auto scroll-smooth py-2 px-1 scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {THEME_CATEGORIES.map((cat) => {
              const isSelected = selectedSub === cat.slug;
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedSub(cat.slug)}
                  className={`flex flex-col items-center group cursor-pointer w-[95px] sm:w-[115px] md:w-[125px] shrink-0 p-2 rounded-2xl transition-all duration-200 ${
                    isSelected
                      ? "bg-[#EEF6EB] border border-[#8CBC67] shadow-xs -translate-y-1"
                      : "hover:bg-[#FCFBF7] border border-transparent hover:border-[#E8E8E3]"
                  }`}
                >
                  {/* Category Image Card */}
                  <div
                    className={`relative w-18 h-18 sm:w-22 sm:h-22 rounded-2xl overflow-hidden shadow-xs border transition-transform duration-300 group-hover:scale-105 ${
                      isSelected
                        ? "border-[#8CBC67] ring-2 ring-[#8CBC67]/30"
                        : "border-[#E8E8E3]"
                    }`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title */}
                  <p
                    className={`mt-2 text-center text-xs font-bold line-clamp-2 leading-tight transition-colors ${
                      isSelected
                        ? "text-[#8CBC67]"
                        : "text-[#202522] group-hover:text-[#8CBC67]"
                    }`}
                  >
                    {cat.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sort & Info Controls Bar */}
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-[#6B706C]">
            Showing <strong className="text-[#202522]">{sortedProducts.length}</strong> items in{" "}
            <span className="text-[#8CBC67] font-bold">{selectedCategoryName}</span>
          </p>
          <ProductSort value={sortBy} onChange={setSortBy} />
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E8E3]">
            <p className="text-[#202522] font-semibold text-base mb-1">
              No products found for {selectedCategoryName}
            </p>
            <p className="text-xs text-[#6B706C] mb-4">
              Try selecting "All Themes" or another category above.
            </p>
            <button
              onClick={() => setSelectedSub("all")}
              className="px-4 py-2 bg-[#8CBC67] hover:bg-[#7AB055] text-white text-xs font-bold rounded-xl transition cursor-pointer"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isInWishlist={isInWishlist}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
