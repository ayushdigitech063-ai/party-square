"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { decorationItems } from "../data/decorationThemeData";
import { fetchHomePageSection } from "../lib/api";

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

export default function MostLovedDecor() {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [badge, setBadge] = useState("Our Speciality");
  const [title, setTitle] = useState("Most Loved Decorations");
  const [subtitle, setSubtitle] = useState(
    "Explore our curated themes. Click on any circular picture to view full decoration details."
  );
  const [items, setItems] = useState<MostLovedItem[]>(decorationItems as any);
  const router = useRouter();

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
          if (sec.subtitle) setSubtitle(sec.subtitle);
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

  const openDetailPage = (item: any) => {
    const slug = item.slug || "birthday-celebration";
    router.push(`/card/${slug.replace(/^\/card\//, "")}`);
  };

  if (!isEnabled) {
    return null;
  }

  // Ensure there are enough items for smooth infinite loop
  const displayItems = items.length > 0 ? items : (decorationItems as any);
  const loopedItems = [...displayItems, ...displayItems];

  return (
    <section className="relative bg-[#FCFBF7] text-[#202522] py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-16 overflow-hidden font-sans border-t border-[#E8E8E3]">
      
      {/* Background Soft Ambient Warm Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EEF6EB]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 border-b border-[#E8E8E3] pb-6 sm:pb-8 text-center md:text-left">
          <div className="space-y-2.5 sm:space-y-3">
            {badge && (
              <div className="inline-flex items-center space-x-2 bg-[#EEF6EB] border border-[#E8E8E3] px-3.5 py-1 rounded-full text-[#8CBC67] text-xs uppercase tracking-[0.25em] font-medium shadow-sm">
                <Sparkles size={13} />
                <span>{badge}</span>
              </div>
            )}
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-light tracking-wide text-[#202522]">
              {title}
            </h2>
            <p className="text-[#6B706C] text-xs sm:text-sm max-w-xl font-light">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Infinite Auto-Sliding Circular Track */}
        <div className="relative w-full overflow-hidden py-3 sm:py-4">
          <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused] gap-6 sm:gap-10">
            {loopedItems.map((item, index) => (
              <div 
                key={`${item.id || item.slug}-${index}`}
                onClick={() => openDetailPage(item)}
                className="flex flex-col items-center group cursor-pointer"
              >
                {/* Circular Image Card */}
                <div className="w-[125px] h-[125px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden border-4 border-[#E8E8E3] group-hover:border-[#8CBC67] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative bg-white shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-white/90 text-[#202522] flex items-center justify-center shadow-md">
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </div>

                {/* Title & Price Below Circle */}
                <div className="mt-4 text-center space-y-0.5 max-w-[150px]">
                  {item.price && (
                    <span className="text-[11px] font-bold text-[#8CBC67] block">
                      {typeof item.price === "number" ? `₹${item.price.toLocaleString("en-IN")}` : item.price}
                    </span>
                  )}
                  <h3 className="text-sm font-serif font-semibold text-[#202522] group-hover:text-[#8CBC67] transition-colors truncate">
                    {item.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Tailwind Custom Animation Style */}
      <style jsx global>{`
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-infinite-scroll {
          display: flex;
          animation: infiniteScroll 35s linear infinite;
        }
      `}</style>
    </section>
  );
}