"use client";

import React from "react";

/* DEMO DATA: replace with API values */
const CATEGORIES = [
  { name: "Birthday", value: 38, count: 474, color: "#F59E0B" },
  { name: "Wedding", value: 24, count: 299, color: "#B45309" },
  { name: "Festival", value: 20, count: 250, color: "#1C1917" },
  { name: "Anniversary", value: 12, count: 149, color: "#FCD34D" },
  { name: "Corporate", value: 6, count: 76, color: "#A8A29E" },
];

const TOTAL = CATEGORIES.reduce((sum, c) => sum + c.count, 0);

export default function CategoryChart() {
  let acc = 0;
  const gradient = CATEGORIES.map((c) => {
    const start = acc;
    acc += c.value;
    return `${c.color} ${start}% ${acc}%`;
  }).join(", ");

  return (
    <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm">
      <h3 className="font-serif text-lg font-bold text-neutral-900">Bookings by Category</h3>

      <div className="mt-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-5">
        <div
          className="relative w-36 h-36 shrink-0 rounded-full"
          style={{ background: `conic-gradient(${gradient})` }}
          role="img"
          aria-label="Bookings by category"
        >
          <div className="absolute inset-[22px] rounded-full bg-white flex flex-col items-center justify-center">
            <span className="font-serif text-2xl font-bold text-neutral-900 lining-nums">
              {TOTAL.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-neutral-400">Bookings</span>
          </div>
        </div>

        <ul className="w-full space-y-2.5">
          {CATEGORIES.map((c) => (
            <li key={c.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 text-xs">
              <span className="flex items-center gap-2 text-neutral-700">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                {c.name}
              </span>
              <span className="font-bold text-neutral-900 w-9 text-right">{c.value}%</span>
              <span className="text-neutral-500 w-9 text-right">{c.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}