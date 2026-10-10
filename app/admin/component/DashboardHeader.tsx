"use client";

import Link from "next/link";

import {
  Sparkles,
  Plus,
  ImagePlus,
  TicketPercent,
} from "lucide-react";
import CreateBookingModal from "./CreateBookingModal";
import { useState } from "react";

interface DashboardHeaderProps {
  pendingCount: number;
}

export default function DashboardHeader({
  pendingCount,
}: DashboardHeaderProps) {
  const quickActions = [
    {
      label: "New booking",
      icon: Plus,
      href: "/admin/bookings/new",
    },
    {
      label: "Add theme",
      icon: Sparkles,
      href: "/admin/themes/new",
    },
    {
      label: "Upload to gallery",
      icon: ImagePlus,
      href: "/admin/gallery",
    },
    {
      label: "Add coupon",
      icon: TicketPercent,
      href: "/admin/coupons",
    },
  ];

  const [showBookingModal , setShowBookingModal] = useState(false);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-neutral-900 via-stone-950 to-neutral-950 text-white p-9 sm:p-20 rounded-[30px] shadow-xl border border-[#8CBC67]/30">

      <div className="pointer-events-none absolute top-16 w-64 h-64 rounded-full bg-[#8CBC67]/10 blur-3xl" />

      <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-5">

        <div className="space-y-9">

          <div className="inline-flex items-center space-x-2 bg-[#8CBC67]/20 border border-[#8CBC67]/40 px-3 py-1 rounded-full text-[#8CBC67] text-[11px] font-bold uppercase tracking-widest">

            <Sparkles size={12} />

            <span>
              Dashboard Overview
            </span>

          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Welcome back, Super Admin
          </h2>

          <p className="text-neutral-300 text-xs sm:text-sm font-light">

            {pendingCount > 0
              ? `You have ${pendingCount} booking${
                  pendingCount > 1 ? "s" : ""
                } waiting for confirmation today.`
              : "All bookings are up to date. Nice work!"}

          </p>

        </div>

        <div className="flex flex-wrap gap-2">

          {quickActions.map(
            ({
              label,
              icon: Icon,
              href,
            }) => (
              <Link
                key={label}
                href={href}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-[#8CBC67] hover:text-stone-900 border border-white/15 px-4 py-2.5 rounded-full text-xs font-bold transition"
              >
                <Icon size={14} />

                {label}
              </Link>
            )
          )}

        </div>

      </div>

    </div>
  );
}