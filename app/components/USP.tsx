"use client";

import React, { useState, useEffect } from "react";
import { PartyPopper, Star, Users, BadgeCheck } from "lucide-react";
import { fetchHomePageSection } from "../lib/api";

interface StatItem {
  id?: number | string;
  label: string;
  value: string;
  caption: string;
}

interface StatsData {
  topLabel?: string;
  heading?: string;
  stats: StatItem[];
}

const DEFAULT_USPS: StatItem[] = [
  {
    label: "Celebrations",
    value: "10,000+",
    caption: "Happy events decorated",
  },
  {
    label: "Rating",
    value: "4.8 / 5",
    caption: "from 2,000+ customer reviews",
  },
  {
    label: "Community",
    value: "50K+",
    caption: "followers on social media",
  },
  {
    label: "Promise",
    value: "On-time Setup",
    caption: "Verified decorators, fixed pricing",
  },
];

const ICONS = [PartyPopper, Star, Users, BadgeCheck];

export default function USP() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [topLabel, setTopLabel] = useState("Trusted since 2020");
  const [heading, setHeading] = useState("Event partner for 10,000+ celebrations");
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_USPS);

  useEffect(() => {
    let isMounted = true;
    async function loadStats() {
      try {
        const sec = await fetchHomePageSection<StatsData>("stats");
        if (isMounted && sec) {
          if (typeof sec.isEnabled === "boolean") {
            setIsEnabled(sec.isEnabled);
          }
          if (sec.contentData) {
            if (sec.contentData.topLabel) setTopLabel(sec.contentData.topLabel);
            if (sec.contentData.heading) setHeading(sec.contentData.heading);
            if (Array.isArray(sec.contentData.stats) && sec.contentData.stats.length > 0) {
              setStats(sec.contentData.stats);
            }
          }
        }
      } catch (e) {
        // Fallback default retained
      }
    }
    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!isEnabled) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#FCFBF7] py-16 sm:py-20 px-4 sm:px-8">
      {/* soft background glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#F7D6C7]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-rose-200/40 blur-3xl" />

      <div className="relative max-w-5xl mx-auto text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#202522]">
          {topLabel}
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-gray-900">
          {heading}
        </h2>
        <div className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-[#A0522D]" />

        {/* Stats card */}
        <div className="mt-12 bg-white rounded-3xl border border-[#E8E8E3] shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
          {stats.map((item, i) => {
            const Icon = ICONS[i % ICONS.length] || BadgeCheck;
            return (
              <div
                key={item.id || item.label || i}
                className={`p-6 sm:p-8 text-left transition hover:bg-[#EEF6EB]/60 ${
                  i !== 0 ? "border-t sm:border-t-0 lg:border-l border-[#E8E8E3]" : ""
                }`}
              >
                <div className="flex items-center space-x-2 text-[#202522]">
                  <span className="w-8 h-8 rounded-full bg-[#EEF6EB] flex items-center justify-center">
                    <Icon size={16} />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                    {item.label}
                  </span>
                </div>
                <p className="mt-4 text-3xl font-serif font-bold text-gray-900 lining-nums">{item.value}</p>
                <p className="mt-1 text-sm text-gray-500 min-h-[2.5rem]">{item.caption}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}