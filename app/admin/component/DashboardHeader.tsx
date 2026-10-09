"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Bell, MessageSquare, ChevronDown, CalendarDays } from "lucide-react";

type Range = "7D" | "30D" | "90D";

const DAYS: Record<Range, number> = { "7D": 7, "30D": 30, "90D": 90 };

const OPTIONS: { value: Range; label: string }[] = [
  { value: "7D", label: "Last 7 days" },
  { value: "30D", label: "Last 30 days" },
  { value: "90D", label: "Last 90 days" },
];

const fmt = (d: Date) =>
  d.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });

interface Props {
  pendingCount: number;
  range: Range;
  setRange: (range: Range) => void;
  adminName?: string;
  /** Number of unread messages; the dot on the message icon shows when > 0 */
  unreadMessages?: number;
  /** Called when the search is submitted. Defaults to /admin/bookings?q=... */
  onSearch?: (query: string) => void;
  onLogout?: () => void;
}

export default function DashboardHeader({
  pendingCount,
  range,
  setRange,
  adminName = "Super Admin",
  unreadMessages = 0,
  onSearch,
  onLogout,
}: Props) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Computed after mount so server and browser dates can never mismatch
  const [label, setLabel] = useState("");

  useEffect(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - (DAYS[range] - 1));
    setLabel(`${fmt(start)} - ${fmt(end)}`);
  }, [range]);

  // Close the profile menu on outside click or Escape
  useEffect(() => {
    if (!menuOpen) return;

    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-profile-menu]")) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (onSearch) onSearch(q);
    else router.push(`/admin/bookings${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  };

  const goBackToLogin = ()=>{
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    router.replace('admin/login');
  }

  const initials = adminName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      {/* =====================================================
          STICKY TOP BAR (stays visible while the page scrolls)
      ====================================================== */}
      <div className="fixed top-0 z-30 -mx-1 px-1 py-5 w-375 bg-[#F3F0EA]/90 backdrop-blur-md border-b border-amber-100/80">
        <div className="flex items-center justify-between gap-4">
          <form onSubmit={handleSearch} role="search" className="relative w-full max-w-md">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bookings, customers, themes..."
              aria-label="Search bookings, customers and themes"
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-amber-100 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
            />
          </form>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Notifications */}
            <Link
              href="/admin/bookings"
              aria-label={pendingCount > 0 ? `${pendingCount} bookings need confirmation` : "Notifications"}
              className="relative w-10 h-10 rounded-full bg-white border border-amber-100 flex items-center justify-center text-neutral-600 hover:text-amber-800 transition"
            >
              <Bell size={17} />
              {pendingCount > 0 && (
                <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </Link>

            {/* Messages */}
            <Link
              href="/admin/messages"
              aria-label="Messages"
              className="relative w-10 h-10 rounded-full bg-white border border-amber-100 flex items-center justify-center text-neutral-600 hover:text-amber-800 transition"
            >
              <MessageSquare size={17} />
              {unreadMessages > 0 && (
                <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </Link>

            {/* Profile menu */}
            <div className="relative" data-profile-menu>
              <button
                onClick={() => setMenuOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className="flex items-center gap-2 bg-white border border-amber-100 rounded-full pl-1.5 pr-3 py-1.5 hover:border-amber-300 transition cursor-pointer"
              >
                <span className="w-8 h-8 rounded-full bg-amber-400 text-stone-900 text-xs font-bold flex items-center justify-center">
                  {initials}
                </span>
                <span className="hidden sm:block text-xs font-bold text-neutral-800">{adminName}</span>
                <ChevronDown
                  size={14}
                  className={`text-neutral-500 transition ${menuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-44 rounded-xl border border-amber-100 bg-white shadow-xl py-1.5 text-sm"
                >
                  <Link href="/admin/settings" role="menuitem" className="block px-4 py-2 text-neutral-700 hover:bg-amber-50">
                    Settings
                  </Link>
                  <Link href="/" role="menuitem" className="block px-4 py-2 text-neutral-700 hover:bg-amber-50">
                    Exit to website
                  </Link>
                  <button
                    role="menuitem"
                    onClick={goBackToLogin}
                    className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 cursor-pointer"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          WELCOME + DATE RANGE
      ====================================================== */}
      <div className="flex flex-col py-15 sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
            Welcome back, {adminName} <span aria-hidden="true">👋</span>
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Here&apos;s what&apos;s happening with your event decoration business today.
            {pendingCount > 0 && (
              <span className="ml-1 font-semibold text-amber-700">
                {pendingCount} booking{pendingCount > 1 ? "s" : ""} need your confirmation.
              </span>
            )}
          </p>
        </div>

        {/* Date range picker */}
        <label className="relative inline-flex items-center gap-2.5 self-start sm:self-auto bg-white border border-amber-200 rounded-xl px-4 py-2.5 shadow-sm cursor-pointer hover:border-amber-400 transition">
          <CalendarDays size={15} className="text-amber-700" />
          <span className="text-xs font-semibold text-neutral-700 min-w-[170px]">
            {label || "\u00A0"}
          </span>
          <ChevronDown size={14} className="text-neutral-500" />
          <select
            aria-label="Date range"
            value={range}
            onChange={(e) => setRange(e.target.value as Range)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          >
            {OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </>
  );
}