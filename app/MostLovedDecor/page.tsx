"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchHomePageSection } from "../lib/api";
import { useCity } from "../context/CityContext";

interface MostLovedItem {
  id?: number | string;
  name: string;
  image: string;
  price?: string | number;
  slug: string;
  subcategory?: string;
  description?: string;
}

interface MostLovedData {
  badge?: string;
  items: MostLovedItem[];
}

const DEFAULT_ITEMS: MostLovedItem[] = [
  { id: 1, name: "Royal Stage Floral Mandap", image: "/homepage.png", price: "₹14,999", slug: "royal-stage-mandap" },
  { id: 2, name: "Kids Cartoon Balloon Wonderland", image: "/birthdaykids.png", price: "₹6,499", slug: "kids-cartoon-balloon" },
  { id: 3, name: "Romantic Candlelight Canopy", image: "/marriageaniversary.png", price: "₹8,999", slug: "romantic-candlelight" },
  { id: 4, name: "Traditional Diya & Flower Decor", image: "/diwalidecoration.png", price: "₹5,999", slug: "traditional-diya-decor" },
  { id: 5, name: "Ganpati Grand Floral Backdrop", image: "/ganeshchaturthi.png", price: "₹11,999", slug: "ganpati-grand-floral" },
  { id: 6, name: "Pastel Luxe Balloon Arch", image: "/childbirthday1.png", price: "₹4,499", slug: "pastel-luxe-balloon" },
  { id: 7, name: "Neon Glow Couple Stage", image: "/ceremanybg.png", price: "₹12,499", slug: "neon-glow-couple-stage" },
  { id: 8, name: "Mom Special Golden Canopy", image: "/motherbirthdaymom.png", price: "₹7,499", slug: "mom-special-golden-canopy" },
];

export default function MostLovedDecor() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [badge, setBadge] = useState("Our Speciality");
  const [title, setTitle] = useState("Most Loved Decorations");
  const [items, setItems] = useState<MostLovedItem[]>(DEFAULT_ITEMS);
  const router = useRouter();
  const { selectedCity } = useCity();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const sec = await fetchHomePageSection<MostLovedData>("most_loved_decor");
        if (isMounted && sec) {
          if (typeof sec.isEnabled === "boolean") {
            setIsEnabled(sec.isEnabled);
          }
          if (sec.title) setTitle(sec.title);
          if (sec.contentData) {
            if (sec.contentData.badge) setBadge(sec.contentData.badge);
            if (Array.isArray(sec.contentData.items) && sec.contentData.items.length > 0) {
              setItems(sec.contentData.items);
            }
          }
        }
      } catch (e) {
        // Fallback default retained
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const openDetailPage = (item: MostLovedItem) => {
    if (item.slug && item.slug.startsWith("/")) {
      router.push(item.slug);
      return;
    }
    const cleanSlug = (item.slug || "royal-stage-mandap")
      .toLowerCase()
      .trim()
      .replace(/^\/card\//, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const citySlug = (selectedCity || "jaipur").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const catSlug = (item.subcategory || "decorations").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    router.push(`/${citySlug}/${catSlug}/${cleanSlug}`);
  };

  if (!isEnabled) {
    return null;
  }

  const displayItems = items.length > 0 ? items : DEFAULT_ITEMS;

  return (
    <section className="relative bg-[#FCFBF7] text-[#202522] py-8 sm:py-14 px-4 sm:px-6 md:px-16 overflow-hidden font-sans border-t border-[#E8E8E3]">
      
      {/* Background Soft Ambient Warm Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#EEF6EB]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6 sm:space-y-8">
        
        {/* Section Header with Title & Controls */}
        <div className="flex items-center justify-between gap-4 border-b border-[#E8E8E3] pb-4 sm:pb-6">
          <div className="space-y-1">
            {badge && (
              <div className="inline-flex items-center space-x-1.5 bg-[#EEF6EB] border border-[#E8E8E3] px-3 py-0.5 rounded-full text-[#8CBC67] text-[10px] uppercase tracking-wider font-semibold">
                <Sparkles size={11} />
                <span>{badge}</span>
              </div>
            )}
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-[#202522]">
              {title || "Most Loved Decorations"}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Scroll Arrow Buttons */}
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#E8E8E3] bg-white text-[#202522] hover:bg-[#EEF6EB] hover:border-[#8CBC67] hover:text-[#8CBC67] transition flex items-center justify-center shadow-2xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#E8E8E3] bg-white text-[#202522] hover:bg-[#EEF6EB] hover:border-[#8CBC67] hover:text-[#8CBC67] transition flex items-center justify-center shadow-2xs active:scale-95 cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>

            {/* View All Button */}
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-[#E8E8E3] hover:border-[#8CBC67] bg-white text-xs sm:text-sm font-semibold text-[#202522] hover:bg-[#EEF6EB] transition shrink-0 shadow-2xs"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Circular Items Horizontal Track with Smooth Scroll */}
        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex items-start gap-4 sm:gap-6 overflow-x-auto scroll-smooth py-2 px-1 scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayItems.map((item, index) => (
              <div 
                key={`${item.id || item.slug}-${index}`}
                onClick={() => openDetailPage(item)}
                className="flex flex-col items-center group/card cursor-pointer w-[86px] sm:w-[130px] md:w-[145px] shrink-0"
              >
                {/* Circular Image Card */}
                <div className="w-[78px] h-[78px] sm:w-[115px] sm:h-[115px] rounded-full overflow-hidden border-2 sm:border-4 border-[#E8E8E3] group-hover/card:border-[#8CBC67] shadow-xs group-hover/card:shadow-md transition-all duration-300 relative bg-white shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500 ease-out" 
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-black/15 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 text-[#202522] flex items-center justify-center shadow-md">
                      <ArrowRight size={13} className="sm:w-3.5 sm:h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Title Below Circle with 2-line wrap */}
                <h3 className="mt-2 text-xs sm:text-sm font-medium sm:font-semibold text-[#202522] group-hover/card:text-[#8CBC67] transition-colors text-center line-clamp-2 leading-tight w-full px-0.5">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}