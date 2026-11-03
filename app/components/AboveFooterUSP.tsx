"use client";

import React from "react";
import {
  ShieldCheck,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Users,
} from "lucide-react";

interface USPItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  badgeBg: string;
}

const CLIENT_USPS: USPItem[] = [
  {
    id: "quality",
    title: "Uncompromising Quality",
    icon: ShieldCheck,
    badgeBg: "bg-[#FCE7F3]",
  },
  {
    id: "experience",
    title: "10+ Years of Success",
    icon: TrendingUp,
    badgeBg: "bg-[#FED7AA]",
  },
  {
    id: "planner",
    title: "Leading Event & Surprise Planner",
    icon: Sparkles,
    badgeBg: "bg-[#FEF08A]",
  },
  {
    id: "guarantee",
    title: "100% Guaranteed Service",
    icon: CheckCircle2,
    badgeBg: "bg-[#FBCFE8]",
  },
  {
    id: "team",
    title: "Professional Team",
    icon: Users,
    badgeBg: "bg-[#FCE7F3]",
  },
];

export default function AboveFooterUSP() {
  return (
    <section className="w-full bg-[#FCFBF7] py-6 sm:py-8 border-t border-[#E8E8E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 5 USP Cards Grid matching client wireframe screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {CLIENT_USPS.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="relative bg-[#FDE8DF] rounded-2xl sm:rounded-3xl p-4 sm:p-5 pt-7 sm:pt-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-sm"
              >
                {/* Floating Top Icon with soft organic background */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-xs border border-[#F7D6C7] flex items-center justify-center text-[#202522]">
                  <div className={`w-7 h-7 rounded-full ${item.badgeBg} flex items-center justify-center`}>
                    <IconComponent size={16} strokeWidth={2.2} className="text-[#202522]" />
                  </div>
                </div>

                {/* USP Title */}
                <h4 className="font-bold text-xs sm:text-[13px] md:text-sm text-[#202522] leading-snug line-clamp-2">
                  {item.title}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
