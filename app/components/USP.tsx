import React from "react";
import { PartyPopper, Star, Users, BadgeCheck } from "lucide-react";

// Edit these with your real numbers
const USPS = [
  {
    icon: PartyPopper,
    label: "Celebrations",
    value: "10,000+",
    caption: "Happy events decorated",
  },
  {
    icon: Star,
    label: "Rating",
    value: "4.8 / 5",
    caption: "from 2,000+ customer reviews",
  },
  {
    icon: Users,
    label: "Community",
    value: "50K+",
    caption: "followers on social media",
  },
  {
    icon: BadgeCheck,
    label: "Promise",
    value: "On-time Setup",
    caption: "Verified decorators, fixed pricing",
  },
];

export default function USP() {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] py-16 sm:py-20 px-4 sm:px-8">
      {/* soft background glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-rose-200/40 blur-3xl" />

      <div className="relative max-w-5xl mx-auto text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-800">
          Trusted since 2020
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-gray-900">
          Event partner for 10,000+ celebrations
        </h2>
        <div className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-[#A0522D]" />

        {/* Stats card */}
        <div className="mt-12 bg-white rounded-3xl border border-amber-200 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
          {USPS.map(({ icon: Icon, label, value, caption }, i) => (
            <div
              key={label}
              className={`p-6 sm:p-8 text-left transition hover:bg-amber-50/60 ${
                i !== 0 ? "border-t sm:border-t-0 lg:border-l border-amber-100" : ""
              }`}
            >
              <div className="flex items-center space-x-2 text-amber-900">
                <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Icon size={16} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  {label}
                </span>
              </div>
              <p className="mt-4 text-3xl font-serif font-bold text-gray-900 lining-nums">{value}</p>
              <p className="mt-1 text-sm text-gray-500 min-h-[2.5rem]">{caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}