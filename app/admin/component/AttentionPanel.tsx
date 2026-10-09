"use client";

import React from "react";
import Link from "next/link";
import { CalendarCheck, MessageSquare, TicketPercent, AlertTriangle, ChevronRight, ArrowRight } from "lucide-react";

export default function AttentionPanel({ pendingCount }: { pendingCount: number }) {
  // Only the first count is live; wire the others to your data
  const items = [
    { label: "Bookings to confirm", count: pendingCount, icon: CalendarCheck, tint: "bg-rose-100 text-rose-500", href: "/admin/bookings" },
    { label: "Reviews to approve", count: 2, icon: MessageSquare, tint: "bg-green-100 text-green-600", href: "/admin/reviews" },
    { label: "Coupons expiring soon", count: 1, icon: TicketPercent, tint: "bg-amber-100 text-amber-600", href: "/admin/coupons" },
    { label: "Low inventory themes", count: 3, icon: AlertTriangle, tint: "bg-rose-100 text-rose-500", href: "/admin/themes" },
  ];

  return (
    <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-neutral-900">Needs Your Attention</h3>
        <Link href="/admin/bookings" className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:underline">
          View all <ArrowRight size={13} />
        </Link>
      </div>

      <ul className="mt-4 space-y-2">
        {items.map(({ label, count, icon: Icon, tint, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="flex items-center gap-3 rounded-xl bg-amber-50/60 hover:bg-amber-50 px-3 py-2.5 transition"
            >
              <span className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${tint}`}>
                <Icon size={15} />
              </span>
              <span className="flex-1 text-sm text-neutral-700">{label}</span>
              <span className="font-bold text-sm text-amber-800">{count}</span>
              <ChevronRight size={15} className="text-amber-600" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}