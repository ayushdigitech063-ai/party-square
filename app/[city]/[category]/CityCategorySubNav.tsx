"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Sparkles, Check } from "lucide-react";

export interface SubCategoryItem {
  id: string;
  slug: string;
  name: string;
  image: string;
  gradientBg: string;
  badge?: string;
  customHref?: string;
}

const DEFAULT_BIRTHDAY_SUB_CATEGORIES: SubCategoryItem[] = [
  {
    id: "kids-birthday",
    slug: "kids-birthday",
    name: "Kids Birthday",
    image: "/birthdaykids.png",
    gradientBg: "from-[#EEF6EB] via-[#DCFCE7] to-[#8CBC67]/30",
  },
  {
    id: "adult-birthday",
    slug: "adult-birthday",
    name: "Adult / Romantic Birthday",
    image: "/romaticvibe.png",
    gradientBg: "from-[#FFEDD5] via-[#FED7AA] to-[#FB923C]/40",
  },
  {
    id: "premium-decor",
    slug: "premium-decor",
    name: "Premium Decor",
    image: "/homepage.png",
    gradientBg: "from-[#FEF9C3] via-[#FEF08A] to-[#FACC15]/40",
  },
  {
    id: "birthday-gifts",
    slug: "birthday-gifts",
    name: "Birthday Gifts",
    image: "/card.png",
    gradientBg: "from-[#E0F2FE] via-[#BAE6FD] to-[#38BDF8]/40",
  },
  {
    id: "same-day-decors",
    slug: "same-day-decors",
    name: "Same Day Decors",
    image: "/card2.png",
    gradientBg: "from-[#EEF6EB] via-[#FCFBF7] to-[#8CBC67]/20",
  },
  {
    id: "simple-birthday",
    slug: "simple-birthday",
    name: "Simple Birthday Decors",
    image: "/birthdaydesign.png",
    gradientBg: "from-[#F3E8FF] via-[#E9D5FF] to-[#C084FC]/40",
  },
  {
    id: "car-boot",
    slug: "car-boot",
    name: "Car Boot Decors",
    image: "/card3.png",
    gradientBg: "from-[#F1F5F9] via-[#E2E8F0] to-[#94A3B8]/40",
  },
  {
    id: "ring-decor",
    slug: "ring-decor",
    name: "Ring Decorations",
    image: "/ring.png",
    gradientBg: "from-[#DCFCE7] via-[#BBF7D0] to-[#4ADE80]/40",
  },
];

const SUB_CATEGORIES_BY_CATEGORY: Record<string, SubCategoryItem[]> = {
  birthday: DEFAULT_BIRTHDAY_SUB_CATEGORIES,
  "birthday-decorations": DEFAULT_BIRTHDAY_SUB_CATEGORIES,
  "theme-decoration": [
    {
      id: "kids-themes",
      slug: "kids-birthday",
      name: "Kids Themes",
      image: "/birthdaykids.png",
      gradientBg: "from-[#EEF6EB] to-[#8CBC67]/30",
    },
    {
      id: "jungle-theme",
      slug: "jungle-theme",
      name: "Jungle Safari",
      image: "/childbirthday1.png",
      gradientBg: "from-[#DCFCE7] to-[#22C55E]/40",
    },
    {
      id: "superhero-theme",
      slug: "superhero-theme",
      name: "Superhero & Cartoon",
      image: "/childbirthday2.png",
      gradientBg: "from-[#E0F2FE] to-[#38BDF8]/40",
    },
    {
      id: "princess-theme",
      slug: "princess-theme",
      name: "Fairytale Princess",
      image: "/childbirthday3.png",
      gradientBg: "from-[#EEF6EB] to-[#8CBC67]/25",
    },
    {
      id: "premium-theme",
      slug: "premium-decor",
      name: "Luxury Milestone",
      image: "/homepage.png",
      gradientBg: "from-[#FEF9C3] to-[#EAB308]/40",
    },
    {
      id: "neon-theme",
      slug: "neon-signs",
      name: "Neon Glow Night",
      image: "/card1.png",
      gradientBg: "from-[#F3E8FF] to-[#A855F7]/40",
    },
    {
      id: "floral-theme",
      slug: "floral-backdrops",
      name: "Artistic Floral",
      image: "/wallbg.png",
      gradientBg: "from-[#F7D6C7]/50 to-[#EEF6EB]",
    },
    {
      id: "car-boot",
      slug: "car-boot",
      name: "Car Boot Themes",
      image: "/card3.png",
      gradientBg: "from-[#F1F5F9] to-[#94A3B8]/40",
    },
  ],
  anniversary: [
    {
      id: "candlelight-dinner",
      slug: "candlelight-dinner",
      name: "Candlelight Dinner",
      image: "/candellightdinnerdecoration.png",
      gradientBg: "from-[#F7D6C7]/40 to-[#FCFBF7]",
    },
    {
      id: "cabana-setup",
      slug: "cabana-setup",
      name: "Canopy / Cabana Setups",
      image: "/marriageaniversary.png",
      gradientBg: "from-[#FEF9C3] to-[#FDE047]/40",
    },
    {
      id: "room-decor",
      slug: "room-decor",
      name: "Romantic Room Decor",
      image: "/romaticvibe.png",
      gradientBg: "from-[#EEF6EB] to-[#8CBC67]/25",
    },
    {
      id: "terrace-setup",
      slug: "terrace-setup",
      name: "Terrace & Balcony",
      image: "/card2.png",
      gradientBg: "from-[#E0F2FE] to-[#60A5FA]/40",
    },
    {
      id: "car-boot-surprise",
      slug: "car-boot-surprise",
      name: "Car Boot Surprise",
      image: "/card3.png",
      gradientBg: "from-[#F1F5F9] to-[#94A3B8]/40",
    },
    {
      id: "proposal-setup",
      slug: "proposal-setup",
      name: "Marriage Proposal",
      image: "/ring.png",
      gradientBg: "from-[#DCFCE7] to-[#4ADE80]/40",
    },
    {
      id: "anniv-gifts",
      slug: "birthday-gifts",
      name: "Anniversary Gifts",
      image: "/card.png",
      gradientBg: "from-[#E0F2FE] to-[#38BDF8]/40",
    },
    {
      id: "same-day",
      slug: "same-day-decors",
      name: "Same Day Setups",
      image: "/card2.png",
      gradientBg: "from-[#FCFBF7] to-[#8CBC67]/20",
    },
  ],
  romantic: [
    {
      id: "candlelight-dinner",
      slug: "candlelight-dinner",
      name: "Candlelight Dinner",
      image: "/candellightdinnerdecoration.png",
      gradientBg: "from-[#F7D6C7]/40 to-[#FCFBF7]",
    },
    {
      id: "cabana-setup",
      slug: "cabana-setup",
      name: "Canopy Cabana",
      image: "/marriageaniversary.png",
      gradientBg: "from-[#FEF9C3] to-[#FDE047]/40",
    },
    {
      id: "room-decor",
      slug: "room-decor",
      name: "Room & Bed Decor",
      image: "/romaticvibe.png",
      gradientBg: "from-[#EEF6EB] to-[#8CBC67]/25",
    },
    {
      id: "terrace-setup",
      slug: "terrace-setup",
      name: "Terrace Date",
      image: "/card2.png",
      gradientBg: "from-[#E0F2FE] to-[#60A5FA]/40",
    },
    {
      id: "car-boot-surprise",
      slug: "car-boot-surprise",
      name: "Car Boot Surprise",
      image: "/card3.png",
      gradientBg: "from-[#F1F5F9] to-[#94A3B8]/40",
    },
    {
      id: "proposal-setup",
      slug: "proposal-setup",
      name: "Proposal Setups",
      image: "/ring.png",
      gradientBg: "from-[#DCFCE7] to-[#4ADE80]/40",
    },
    {
      id: "same-day",
      slug: "same-day-decors",
      name: "Same Day Setup",
      image: "/card2.png",
      gradientBg: "from-[#FCFBF7] to-[#8CBC67]/20",
    },
  ],
  "ring-decoration": [
    {
      id: "stage-backdrops",
      slug: "stage-backdrops",
      name: "Royal Stage Backdrops",
      image: "/ceremanypic1.png",
      gradientBg: "from-[#FEF9C3] to-[#FACC15]/40",
    },
    {
      id: "floral-arch",
      slug: "floral-arch",
      name: "Floral Ring Arch",
      image: "/ring.png",
      gradientBg: "from-[#F7D6C7]/50 to-[#8CBC67]/20",
    },
    {
      id: "couple-seating",
      slug: "couple-seating",
      name: "Couple Seating Decor",
      image: "/ceremanypic2.png",
      gradientBg: "from-[#E0F2FE] to-[#38BDF8]/40",
    },
    {
      id: "fairy-lighting",
      slug: "fairy-lighting",
      name: "Fairy Lights Ambiance",
      image: "/ceremanypic3.png",
      gradientBg: "from-[#F3E8FF] to-[#A855F7]/40",
    },
    {
      id: "ring-platters",
      slug: "ring-platters",
      name: "Bespoke Ring Platters",
      image: "/ceremanypic4.png",
      gradientBg: "from-[#DCFCE7] to-[#22C55E]/40",
    },
    {
      id: "haldi-mehendi",
      slug: "haldi-mehendi",
      name: "Haldi & Mehendi Vibes",
      image: "/haldiprogramdecoration.png",
      gradientBg: "from-[#FFEDD5] to-[#FB923C]/40",
    },
    {
      id: "entrance-gate",
      slug: "entrance-gate",
      name: "Grand Couple Entry",
      image: "/wedding2.png",
      gradientBg: "from-[#FEF08A] to-[#EAB308]/40",
    },
    {
      id: "same-day",
      slug: "same-day-decors",
      name: "Express Setup",
      image: "/card2.png",
      gradientBg: "from-[#FCFBF7] to-[#8CBC67]/20",
    },
  ],
  "wall-decoration": [
    {
      id: "balloon-walls",
      slug: "balloon-walls",
      name: "Organic Balloon Walls",
      image: "/walldecoration.png",
      gradientBg: "from-[#E0F2FE] to-[#38BDF8]/40",
    },
    {
      id: "floral-backdrops",
      slug: "floral-backdrops",
      name: "Floral & Leafy Walls",
      image: "/wallbg.png",
      gradientBg: "from-[#F7D6C7]/50 to-[#EEF6EB]",
    },
    {
      id: "door-styling",
      slug: "door-styling",
      name: "Welcome Door Arches",
      image: "/doordecoration.png",
      gradientBg: "from-[#DCFCE7] to-[#22C55E]/40",
    },
    {
      id: "neon-signs",
      slug: "neon-signs",
      name: "Neon Lights & Signage",
      image: "/card1.png",
      gradientBg: "from-[#FEF9C3] to-[#EAB308]/40",
    },
    {
      id: "shimmer-walls",
      slug: "shimmer-walls",
      name: "Glamorous Shimmer Walls",
      image: "/card2.png",
      gradientBg: "from-[#F3E8FF] to-[#A855F7]/40",
    },
    {
      id: "terrace-wall",
      slug: "terrace-wall",
      name: "Terrace Backdrop Wall",
      image: "/card3.png",
      gradientBg: "from-[#F1F5F9] to-[#94A3B8]/40",
    },
  ],
  baby: [
    {
      id: "welcome-boy",
      slug: "welcome-boy",
      name: "Welcome Baby Boy",
      image: "/babayborn1.png",
      gradientBg: "from-[#E0F2FE] to-[#38BDF8]/40",
    },
    {
      id: "welcome-girl",
      slug: "welcome-girl",
      name: "Welcome Baby Girl",
      image: "/babayborn2.png",
      gradientBg: "from-[#F7D6C7]/50 to-[#8CBC67]/20",
    },
    {
      id: "cradle-decor",
      slug: "cradle-decor",
      name: "Floral Cradle Setup",
      image: "/babayborn3.png",
      gradientBg: "from-[#FEF9C3] to-[#EAB308]/40",
    },
    {
      id: "baby-shower",
      slug: "baby-shower",
      name: "Baby Shower Themes",
      image: "/welcomebabaydecoration.png",
      gradientBg: "from-[#F3E8FF] to-[#A855F7]/40",
    },
    {
      id: "annaprashan",
      slug: "annaprashan",
      name: "Annaprashan Ceremony",
      image: "/babaywelcom.png",
      gradientBg: "from-[#FFEDD5] to-[#F97316]/40",
    },
    {
      id: "naming-ceremony",
      slug: "naming-ceremony",
      name: "Naming Ceremony",
      image: "/babayborn.png",
      gradientBg: "from-[#DCFCE7] to-[#10B981]/40",
    },
  ],
  "baby-welcome": [
    {
      id: "welcome-boy",
      slug: "welcome-boy",
      name: "Welcome Baby Boy",
      image: "/babayborn1.png",
      gradientBg: "from-[#E0F2FE] to-[#38BDF8]/40",
    },
    {
      id: "welcome-girl",
      slug: "welcome-girl",
      name: "Welcome Baby Girl",
      image: "/babayborn2.png",
      gradientBg: "from-[#F7D6C7]/50 to-[#8CBC67]/20",
    },
    {
      id: "cradle-decor",
      slug: "cradle-decor",
      name: "Floral Cradle Setup",
      image: "/babayborn3.png",
      gradientBg: "from-[#FEF9C3] to-[#EAB308]/40",
    },
    {
      id: "baby-shower",
      slug: "baby-shower",
      name: "Baby Shower Themes",
      image: "/welcomebabaydecoration.png",
      gradientBg: "from-[#F3E8FF] to-[#A855F7]/40",
    },
    {
      id: "annaprashan",
      slug: "annaprashan",
      name: "Annaprashan Ceremony",
      image: "/babaywelcom.png",
      gradientBg: "from-[#FFEDD5] to-[#F97316]/40",
    },
    {
      id: "naming-ceremony",
      slug: "naming-ceremony",
      name: "Naming Ceremony",
      image: "/babayborn.png",
      gradientBg: "from-[#DCFCE7] to-[#10B981]/40",
    },
  ],
};

interface Props {
  citySlug: string;
  cityName: string;
  categorySlug: string;
  categoryName: string;
  dynamicSubcategories?: SubCategoryItem[];
}

export default function CityCategorySubNav({
  citySlug,
  cityName,
  categorySlug,
  categoryName,
  dynamicSubcategories,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSub = searchParams.get("sub") || "";
  const [apiSubcategories, setApiSubcategories] = useState<SubCategoryItem[]>([]);
  const [loadingApiSubs, setLoadingApiSubs] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchDynamicSubs() {
      try {
        setLoadingApiSubs(true);
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://decoration-backend-qtx7.onrender.com";
        const catRes = await fetch(`${apiBase}/api/categories?search=${encodeURIComponent(categorySlug)}`);
        const catData = await catRes.json();
        const cats = Array.isArray(catData) ? catData : (catData.categories || []);
        const currentCat = cats.find((c: any) => c.slug === categorySlug.toLowerCase() || c.name.toLowerCase() === categoryName.toLowerCase());
        
        if (currentCat && currentCat._id) {
          const subRes = await fetch(`${apiBase}/api/categories?parentCategory=${currentCat._id}&isActive=true`);
          const subData = await subRes.json();
          const subs = Array.isArray(subData) ? subData : (subData.categories || []);
          if (isMounted && subs.length > 0) {
            const mapped: SubCategoryItem[] = subs.map((s: any, idx: number) => ({
              id: s._id || s.slug,
              slug: s.slug,
              name: s.name,
              image: s.image || "/birthdaydesign.png",
              gradientBg: idx % 2 === 0 ? "from-[#EEF6EB] to-[#8CBC67]/25" : "from-[#FEF9C3] to-[#FACC15]/40",
            }));
            setApiSubcategories(mapped);
          }
        }
      } catch (e) {
        console.warn("Failed to load dynamic subcategories:", e);
      } finally {
        if (isMounted) setLoadingApiSubs(false);
      }
    }
    fetchDynamicSubs();
    return () => { isMounted = false; };
  }, [categorySlug, categoryName]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Normalize slug to lookup dictionary
  const normalizedSlug = categorySlug.toLowerCase().trim();
  const list: SubCategoryItem[] =
    dynamicSubcategories && dynamicSubcategories.length > 0
      ? dynamicSubcategories
      : apiSubcategories.length > 0
      ? apiSubcategories
      : SUB_CATEGORIES_BY_CATEGORY[normalizedSlug] ||
        SUB_CATEGORIES_BY_CATEGORY["birthday"];

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [list]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distance = 260;
    el.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
    setTimeout(checkScroll, 300);
  };

  const handleSubClick = (subSlug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeSub === subSlug) {
      params.delete("sub");
    } else {
      params.set("sub", subSlug);
    }
    const queryString = params.toString();
    const targetUrl = `/${citySlug.toLowerCase()}/${categorySlug.toLowerCase()}${queryString ? `?${queryString}` : ""}`;
    router.push(targetUrl, { scroll: false });
  };

  return (
    <div className="w-full relative my-4 sm:my-6">
      {/* Category Strip Container */}
      <div className="relative group">
        {/* Left Arrow Button for Desktop */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="hidden md:flex absolute -left-3 top-1/2 -translate-y-8 z-20 w-8 h-8 rounded-full bg-white text-[#202522] border border-[#E8DFD1] items-center justify-center shadow-md hover:bg-[#8CBC67] hover:text-white hover:border-[#8CBC67] transition-all cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        {/* Right Arrow Button for Desktop */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="hidden md:flex absolute -right-3 top-1/2 -translate-y-8 z-20 w-8 h-8 rounded-full bg-white text-[#202522] border border-[#E8DFD1] items-center justify-center shadow-md hover:bg-[#8CBC67] hover:text-white hover:border-[#8CBC67] transition-all cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        )}

        {/* Scrollable Cards Strip */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex items-start gap-3 sm:gap-4.5 overflow-x-auto scroll-smooth py-1 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {list.map((item) => {
            const isSelected = activeSub === item.slug;
            return (
              <button
                key={item.id}
                onClick={() => handleSubClick(item.slug)}
                className="group flex flex-col items-center shrink-0 text-center cursor-pointer focus:outline-none transition-transform"
              >
                {/* Visual Square Card with Soft Pastel Tint Gradient */}
                <div
                  className={`w-[78px] h-[78px] sm:w-[98px] sm:h-[98px] md:w-[108px] md:h-[108px] rounded-2xl p-1 sm:p-1.5 flex items-center justify-center relative overflow-hidden transition-all duration-300 bg-gradient-to-br ${
                    item.gradientBg
                  } ${
                    isSelected
                      ? "ring-2.5 ring-[#8CBC67] border-2 border-[#8CBC67] shadow-md scale-102"
                      : "border border-[#E8DFD1]/80 hover:border-[#8CBC67] shadow-2xs hover:shadow-md hover:-translate-y-1"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Active Selected Check Badge */}
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-[#8CBC67] text-white p-0.5 rounded-full shadow-xs">
                      <Check size={10} strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* Subcategory Label Below Card */}
                <span
                  className={`text-[11px] sm:text-xs text-center leading-tight mt-2 w-[78px] sm:w-[98px] md:w-[108px] line-clamp-2 transition-colors ${
                    isSelected
                      ? "text-[#8CBC67] font-bold"
                      : "text-[#202522] font-semibold group-hover:text-[#8CBC67]"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Pill Bar (Allows quick clear/reset) */}
      {activeSub && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span className="text-[#6B706C]">Filtering by:</span>
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#8CBC67]/15 text-[#202522] border border-[#8CBC67]/40 font-semibold">
            <span>
              {list.find((x) => x.slug === activeSub)?.name || activeSub}
            </span>
            <button
              onClick={() => handleSubClick(activeSub)}
              className="text-[#6B706C] hover:text-[#202522] font-bold ml-1 cursor-pointer"
              title="Clear filter"
            >
              ✕
            </button>
          </span>
          <button
            onClick={() => handleSubClick(activeSub)}
            className="text-[11px] text-[#8CBC67] hover:underline font-semibold cursor-pointer"
          >
            Show All {categoryName}
          </button>
        </div>
      )}
    </div>
  );
}
