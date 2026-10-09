"use client";

import React, { useEffect, useState } from "react";
import { Search, Bell, MessageSquare, ChevronDown } from "lucide-react";

/*
 * Replace the old "Super Admin Portal" heading bar in your admin layout with this.
 * Example:  <AdminTopBar onSearch={(q) => router.push(`/admin/bookings?q=${q}`)} />
 */
interface Props {
  adminName?: string;
  onSearch?: (query: string) => void;
  onLogout?: () => void;
}

export default function AdminTopBar({ adminName = "Super Admin", onSearch, onLogout }: Props) {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-profile-menu]")) setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 bg-[#F3F0EA]/90 backdrop-blur-md border-b border-amber-100 px-4 sm:px-8 py-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch?.(query.trim());
        }}
        className="relative w-full max-w-md"
      >
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search bookings, customers, themes..."
          aria-label="Search"
          className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-amber-100 text-sm focus:outline-none focus:border-amber-500"
        />
      </form>

      <div className="flex items-center gap-2 sm:gap-3">
        <button aria-label="Notifications" className="relative w-10 h-10 rounded-full bg-white border border-amber-100 flex items-center justify-center text-neutral-600 hover:text-amber-800 cursor-pointer">
          <Bell size={17} />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-rose-500" />
        </button>

        <button aria-label="Messages" className="relative w-10 h-10 rounded-full bg-white border border-amber-100 flex items-center justify-center text-neutral-600 hover:text-amber-800 cursor-pointer">
          <MessageSquare size={17} />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-rose-500" />
        </button>

        <div className="relative" data-profile-menu>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            className="flex items-center gap-2 bg-white border border-amber-100 rounded-full pl-1.5 pr-3 py-1.5 cursor-pointer"
          >
            <span className="w-8 h-8 rounded-full bg-amber-400 text-stone-900 text-xs font-bold flex items-center justify-center">
              {adminName.split(" ").map((p) => p[0]).join("").slice(0, 2)}
            </span>
            <span className="hidden sm:block text-xs font-bold text-neutral-800">{adminName}</span>
            <ChevronDown size={14} className="text-neutral-500" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-amber-100 bg-white shadow-xl py-1.5 text-sm">
              <a href="/admin/settings" className="block px-4 py-2 text-neutral-700 hover:bg-amber-50">Settings</a>
              <a href="/" className="block px-4 py-2 text-neutral-700 hover:bg-amber-50">Exit to website</a>
              <button onClick={onLogout} className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 cursor-pointer">Log out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}