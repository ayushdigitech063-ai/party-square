"use client";

import React from "react";
import Link from "next/link";
import {
  CalendarDays,
  LayoutGrid,
  IndianRupee,
  Users,
  Clock,
  Star,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

/* DEMO DATA: replace with API values */
const KPI = [
  { title: "Total Bookings", value: "1,248", change: "12%", up: true, icon: CalendarDays, tint: "bg-amber-100 text-amber-600", spark: "#F59E0B", href: "/admin/bookings", trend: [8, 10, 9, 13, 12, 16, 18] },
  { title: "Active Themes", value: "24", change: "4%", up: true, icon: LayoutGrid, tint: "bg-violet-100 text-violet-600", spark: "#7C3AED", href: "/admin/themes", trend: [14, 15, 15, 18, 17, 22, 24] },
  { title: "Total Revenue", value: "₹24,80,000", change: "15%", up: true, icon: IndianRupee, tint: "bg-orange-100 text-orange-600", spark: "#F59E0B", href: "/admin/analytics", trend: [5, 7, 6, 9, 11, 10, 14] },
  { title: "Registered Customers", value: "3,840", change: "20%", up: true, icon: Users, tint: "bg-sky-100 text-sky-600", spark: "#2563EB", href: "/admin/customers", trend: [20, 22, 25, 24, 28, 31, 34] },
  { title: "Pending Bookings", value: "", change: "8%", up: false, icon: Clock, tint: "bg-rose-100 text-rose-500", spark: "#EF4444", href: "/admin/bookings", trend: [7, 6, 6, 5, 5, 4, 3] },
  { title: "Average Rating", value: "4.8 / 5", change: "0.1", up: true, icon: Star, tint: "bg-amber-100 text-amber-500", spark: "#16A34A", href: "/admin/reviews", trend: [46, 47, 47, 48, 48, 48, 49] },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${26 - ((v - min) / range) * 22}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 30" className="w-full h-7" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function KpiCards({ pendingCount }: { pendingCount: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {KPI.map((k) => {
        const Icon = k.icon;
        const Arrow = k.up ? ArrowUp : ArrowDown;
        const value = k.title === "Pending Bookings" ? String(pendingCount) : k.value;

        return (
          <Link
            key={k.title}
            href={k.href}
            className="bg-white border border-amber-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition flex flex-col gap-2"
          >
            <div className="flex items-center gap-2.5">
              <span className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${k.tint}`}>
                <Icon size={17} />
              </span>
              <span className="text-[11px] font-semibold text-neutral-500 leading-tight">{k.title}</span>
            </div>

            <p className="font-serif text-xl font-bold text-neutral-900 lining-nums">{value}</p>

            <div className="flex items-end justify-between gap-2">
              <span className={`text-[11px] font-bold flex items-center gap-0.5 flex-wrap ${k.up ? "text-green-600" : "text-rose-500"}`}>
                <Arrow size={11} />
                {k.change}
                <span className="font-normal text-neutral-400 ml-0.5">vs last month</span>
              </span>
              <div className="w-12 shrink-0">
                <Sparkline data={k.trend} color={k.spark} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}