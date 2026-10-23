"use client";

import React, { useState, useEffect } from "react";
import {
  Award,
  Star,
  Users,
  Building2,
  ShieldCheck,
  Clock,
  Headphones,
  CheckCircle2,
} from "lucide-react";
import { fetchHomePageSection } from "@/app/lib/api";

interface StatItem {
  id?: number | string;
  label: string;
  value: string;
  caption: string;
}

interface StatsData {
  heading?: string;
  stats?: StatItem[];
}

const DEFAULT_MILESTONES: StatItem[] = [
  {
    id: "celebrations",
    label: "CELEBRATIONS",
    value: "1 Million+",
    caption: "Happy customers over 10 years",
  },
  {
    id: "rating",
    label: "RATING",
    value: "4.8 / 5",
    caption: "from 5,000+ verified customer reviews",
  },
  {
    id: "community",
    label: "COMMUNITY",
    value: "1 Lakh+",
    caption: "followers on social media",
  },
  {
    id: "partners",
    label: "PARTNERS",
    value: "Top brands",
    caption: "Marriott, Radisson, Taj & more",
  },
];

const TRUST_PILLARS = [
  {
    id: "verified",
    icon: CheckCircle2,
    title: "Verified Professionals",
    subtitle: "Trained & background-checked decorators",
  },
  {
    id: "pricing",
    icon: ShieldCheck,
    title: "Transparent Pricing",
    subtitle: "Zero hidden charges, upfront pricing",
  },
  {
    id: "ontime",
    icon: Clock,
    title: "On-Time Setup",
    subtitle: "Punctual setup guaranteed before event starts",
  },
  {
    id: "support",
    icon: Headphones,
    title: "Dedicated Support",
    subtitle: "24/7 dedicated celebration specialist",
  },
];

export default function USP() {
  const [heading, setHeading] = useState("India's Most Trusted Celebration Platform");
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_MILESTONES);

  useEffect(() => {
    let isMounted = true;
    async function loadStats() {
      try {
        const sec = await fetchHomePageSection<StatsData>("stats_section");
        if (isMounted && sec && sec.isEnabled && sec.contentData) {
          if (sec.contentData.heading) setHeading(sec.contentData.heading);
          if (
            Array.isArray(sec.contentData.stats) &&
            sec.contentData.stats.length > 0
          ) {
            setStats(sec.contentData.stats);
          }
        }
      } catch {
        // Fallback to default
      }
    }
    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

  const getIconForIndex = (index: number, label: string) => {
    const l = (label || "").toLowerCase();
    if (l.includes("rating") || l.includes("star") || l.includes("review")) {
      return { Component: Star, isStar: true };
    }
    if (l.includes("community") || l.includes("user") || l.includes("follower")) {
      return { Component: Users, isStar: false };
    }
    if (l.includes("partner") || l.includes("brand") || l.includes("hotel")) {
      return { Component: Building2, isStar: false };
    }
    if (index === 0) return { Component: Award, isStar: false };
    if (index === 1) return { Component: Star, isStar: true };
    if (index === 2) return { Component: Users, isStar: false };
    return { Component: Building2, isStar: false };
  };

  return (
    <section className="w-full bg-[#FCFBF7] overflow-hidden">
      {/* 1. Milestone & Social Proof Section */}
      <div className="py-6 sm:py-12 border-t border-[#E8E8E3]">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          {/* Main Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#202522] tracking-tight leading-tight">
              {heading}
            </h2>
            <div className="w-10 h-0.5 sm:h-1 bg-[#8CBC67] rounded-full mx-auto mt-2 sm:mt-3" />
          </div>

          {/* 4 Stat Cards — Clean 2x2 on Mobile, 4-col on Desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
            {stats.map((card, idx) => {
              const { Component: IconComponent, isStar } = getIconForIndex(idx, card.label);
              return (
                <div
                  key={card.id || card.label || idx}
                  className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-[#E8E8E3] shadow-2xs hover:border-[#8CBC67] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top Tag Row */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <IconComponent
                      size={13}
                      className={isStar ? "text-[#D7A84B] fill-[#D7A84B] shrink-0" : "text-[#8CBC67] shrink-0"}
                    />
                    <span className="text-[9px] sm:text-[11px] font-bold tracking-wider text-[#8CBC67] uppercase truncate">
                      {card.label}
                    </span>
                  </div>

                  {/* Stat Value */}
                  <div className="text-lg sm:text-2xl font-extrabold text-[#202522] tracking-tight mt-1.5 sm:mt-2.5 mb-0.5 sm:mb-1">
                    {card.value}
                  </div>

                  {/* Subtitle / Description */}
                  <p className="text-[10px] sm:text-xs text-[#6B706C] font-normal leading-tight sm:leading-relaxed line-clamp-2">
                    {card.caption}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Customer Trust & Why Choose Us Section — 2x2 Grid on Mobile */}
      <div className="bg-[#EEF6E8]/40 border-t border-b border-[#E8E8E3] py-6 sm:py-10">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="text-center mb-5 sm:mb-7">
            <span className="text-[10px] sm:text-xs font-bold text-[#8CBC67] uppercase tracking-widest">WHY CHOOSE US</span>
            <h3 className="text-base sm:text-xl font-bold text-[#202522] mt-0.5">Peace of Mind for Your Special Day</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
            {TRUST_PILLARS.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.id} className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E8E8E3] flex flex-col items-center text-center gap-2 sm:gap-3 shadow-2xs hover:border-[#8CBC67] transition">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#EEF6E8] flex items-center justify-center text-[#8CBC67] shrink-0">
                    <IconComponent size={16} strokeWidth={2.2} className="sm:hidden" />
                    <IconComponent size={22} strokeWidth={2.2} className="hidden sm:block" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-[14px] text-[#202522] leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-[#6B706C] mt-0.5 leading-tight sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
