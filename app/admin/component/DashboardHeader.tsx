"use client";

import Link from "next/link";
import {
  Sparkles,
  Plus,
  ImagePlus,
  TicketPercent,
  Layers
} from "lucide-react";

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
      href: "/admin/bookings",
    },
    {
      label: "Pricing Packages",
      icon: Layers,
      href: "/admin/packages",
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

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-neutral-900 via-stone-950 to-neutral-950 text-white p-5 sm:p-7 rounded-2xl shadow-lg border border-[#8CBC67]/30">
      <div className="pointer-events-none absolute -top-10 right-20 w-48 h-48 rounded-full bg-[#8CBC67]/15 blur-3xl" />

      <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Info */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-1.5 bg-[#8CBC67]/20 border border-[#8CBC67]/40 px-2.5 py-0.5 rounded-full text-[#8CBC67] text-[10px] font-bold uppercase tracking-wider">
            <Sparkles size={11} />
            <span>Dashboard Overview</span>
          </div>

          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
            Welcome, Super Admin
          </h2>

          <p className="text-neutral-300 text-xs font-light">
            {pendingCount > 0
              ? `You have ${pendingCount} booking${
                  pendingCount > 1 ? "s" : ""
                } waiting for confirmation today.`
              : "All bookings are up to date. Nice work!"}
          </p>
        </div>

        {/* Right Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {quickActions.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-[#8CBC67] hover:text-stone-950 border border-white/15 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm"
            >
              <Icon size={13} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}