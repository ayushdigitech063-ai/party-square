"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
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

const DEFAULT_OCCASIONS: MostLovedItem[] = [
  { id: "occ-1", name: "Diwali", image: "/diwalidecoration.png", slug: "/Festivals/diwali" },
  { id: "occ-2", name: "Birthday", image: "/birthdaydesign.png", slug: "/services/birthday" },
  { id: "occ-3", name: "Wedding", image: "/wedding.png", slug: "/services" },
  { id: "occ-4", name: "Theme Decor", image: "/homedecoration.png", slug: "/services/wall-decoration" },
  { id: "occ-5", name: "Anniversary", image: "/marriageaniversary.png", slug: "/services/ring-decoration" },
  { id: "occ-6", name: "Baby Welcome", image: "/babaywelcom.png", slug: "/services/birthday/babaywelcom" },
  { id: "occ-7", name: "Corporate", image: "/coprateoffice.png", slug: "/about" },
];

export default function MostLovedDecor() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [badge, setBadge] = useState("");
  const [title, setTitle] = useState("Shop by Occasion");
  const [items, setItems] = useState<MostLovedItem[]>(DEFAULT_OCCASIONS);
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
    if (item.slug && item.slug.startsWith("/")) {
      router.push(item.slug);
      return;
    }
    const slug = item.slug || "birthday-celebration";
    router.push(`/card/${slug.replace(/^\/card\//, "")}`);
  };

  if (!isEnabled) {
    return null;
  }

  const displayItems = items.length > 0 ? items : DEFAULT_OCCASIONS;

  return (
    <section className="relative bg-[#FCFBF7] text-[#202522] py-8 sm:py-16 px-4 sm:px-6 md:px-16 overflow-hidden font-sans border-t border-[#E8E8E3]">
      
      {/* Background Soft Ambient Warm Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#EEF6EB]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6 sm:space-y-8">
        
        {/* Section Header: Matching Reference with View All pill button */}
        <div className="flex items-center justify-between gap-4 border-b border-[#E8E8E3] pb-4 sm:pb-6">
          <div className="space-y-1">
            {badge && (
              <div className="inline-flex items-center space-x-1.5 bg-[#EEF6EB] border border-[#E8E8E3] px-3 py-0.5 rounded-full text-[#8CBC67] text-[10px] uppercase tracking-wider font-semibold">
                <Sparkles size={11} />
                <span>{badge}</span>
              </div>
            )}
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-[#202522]">
              {title || "Shop by Occasion"}
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-[#E8E8E3] hover:border-[#8CBC67] bg-white text-xs sm:text-sm font-semibold text-[#202522] hover:bg-[#EEF6EB] transition shrink-0 shadow-2xs"
          >
            <span>View All</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Circular Occasion Items Track: Responsive on mobile & desktop */}
        <div className="relative w-full overflow-x-auto scrollbar-none py-1 sm:py-3">
          <div className="flex items-start gap-4 sm:gap-8 min-w-max px-1">
            {displayItems.map((item, index) => (
              <div 
                key={`${item.id || item.slug}-${index}`}
                onClick={() => openDetailPage(item)}
                className="flex flex-col items-center group cursor-pointer w-[76px] sm:w-[130px] shrink-0"
              >
                {/* Circular Image Card */}
                <div className="w-[74px] h-[74px] sm:w-[125px] sm:h-[125px] rounded-full overflow-hidden border-2 sm:border-4 border-[#E8E8E3] group-hover:border-[#8CBC67] shadow-xs group-hover:shadow-md transition-all duration-300 relative bg-white shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" 
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/95 text-[#202522] flex items-center justify-center shadow-md">
                      <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                    </span>
                  </div>
                </div>

                {/* Title Below Circle */}
                <h3 className="mt-2 text-xs sm:text-sm font-semibold text-[#202522] group-hover:text-[#8CBC67] transition-colors text-center line-clamp-1 w-full">
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