"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* DEMO DATA: replace with API values. Add an image URL to show a photo thumbnail. */
const THEMES: { name: string; bookings: number; image?: string }[] = [
  { name: "Birthday Celebration", bookings: 182 },
  { name: "Ganpati Mandap", bookings: 141 },
  { name: "Romantic Candlelight", bookings: 118 },
  { name: "Baby Shower Bliss", bookings: 96 },
  { name: "Wedding Elegance", bookings: 84 },
];

export default function TopThemes() {
  const max = Math.max(...THEMES.map((t) => t.bookings));

  return (
    <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-neutral-900">Top Performing Themes</h3>
        <Link href="/admin/themes" className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:underline">
          View all <ArrowRight size={13} />
        </Link>
      </div>

      <ul className="mt-4 space-y-3.5">
        {THEMES.map((t) => (
          <li key={t.name} className="flex items-center gap-3">
            {t.image ? (
              <img src={t.image} alt="" className="w-9 h-9 rounded-lg object-cover shrink-0" />
            ) : (
              <span className="w-9 h-9 rounded-lg shrink-0 bg-gradient-to-br from-amber-300 to-amber-700 text-white text-xs font-bold flex items-center justify-center">
                {t.name[0]}
              </span>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-neutral-700 truncate">{t.name}</span>
                <span className="font-bold text-neutral-900 ml-2">{t.bookings}</span>
              </div>
              <div className="h-1.5 rounded-full bg-amber-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-700"
                  style={{ width: `${(t.bookings / max) * 100}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}