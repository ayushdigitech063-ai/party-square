"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  ArrowRight,
  CheckCircle2,
  Clock,
  XCircle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Booking, Status } from "../types/dashboard";

type Tab = "All" | Status;

const TABS: Tab[] = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

const PAGE_SIZE = 5;

const statusStyle: Record<Status, string> = {
  Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Pending: "bg-amber-50 text-amber-700 border-amber-100",
  Completed: "bg-blue-50 text-blue-700 border-blue-100",
  Cancelled: "bg-rose-50 text-rose-700 border-rose-100",
};

const avatarColors = [
  "bg-amber-100 text-amber-800",
  "bg-pink-100 text-pink-700",
  "bg-sky-100 text-sky-700",
  "bg-orange-100 text-orange-700",
  "bg-emerald-100 text-emerald-700",
  "bg-violet-100 text-violet-700",
];

const inr = (n: number) => `₹${Number(n).toLocaleString("en-IN")}`;

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const pageList = (total: number, current: number): (number | string)[] => {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "…", total];
  if (current >= total - 2) return [1, "…", total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
};

interface Props {
  bookings: Booking[];
  counts: Record<Tab, number>;
  tab: Tab;
  setTab: (tab: Tab) => void;
  query: string;
  setQuery: (query: string) => void;
  updateStatus: (id: string, status: Status) => void;
  exportCsv: () => void;
}

export default function BookingsTable({
  bookings,
  counts,
  tab,
  setTab,
  query,
  setQuery,
  updateStatus,
  exportCsv,
}: Props) {
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);

  // Back to page 1 whenever the filters change
  useEffect(() => setPage(1), [tab, query]);

  // Close the row menu when clicking anywhere else
  useEffect(() => {
    if (!openId) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-row-menu]")) setOpenId(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [openId]);

  const totalPages = Math.max(1, Math.ceil(bookings.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const visible = bookings.slice(start, start + PAGE_SIZE);

  return (
    <div className="xl:col-span-2 bg-white border border-amber-100 rounded-2xl p-5 shadow-sm">
      {/* Title row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-serif text-lg font-bold text-neutral-900">Recent Customer Bookings</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-amber-800 cursor-pointer"
          >
            <Download size={14} /> Export CSV
          </button>
          <Link href="/admin/bookings" className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:underline">
            View all <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Tabs + search */}
      <div className="mt-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer ${
                tab === t
                  ? "bg-stone-900 text-white border-stone-900"
                  : "bg-white text-neutral-600 border-amber-200 hover:text-amber-800"
              }`}
            >
              {t} ({counts[t].toLocaleString("en-IN")})
            </button>
          ))}
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search booking, customer, theme..."
            aria-label="Search bookings"
            className="w-full lg:w-64 h-9 pl-9 pr-3 rounded-full border border-amber-200 text-xs focus:outline-none focus:border-amber-600"
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-xs">
          <thead>
            <tr className="border-b border-amber-100 text-neutral-400 uppercase tracking-wider text-[10px]">
              <th className="pb-3 pr-4 font-semibold">Booking ID</th>
              <th className="pb-3 pr-4 font-semibold">Customer</th>
              <th className="pb-3 pr-4 font-semibold">Theme</th>
              <th className="pb-3 pr-4 font-semibold">Event Date</th>
              <th className="pb-3 pr-4 font-semibold">Amount</th>
              <th className="pb-3 pr-4 font-semibold">Status</th>
              <th className="pb-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-amber-50">
            {visible.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-neutral-400">
                  No bookings match your filters.
                </td>
              </tr>
            )}

            {visible.map((b, index) => {
              const canConfirm = b.status === "Pending";
              const canCancel = b.status === "Pending" || b.status === "Confirmed";
              const color = avatarColors[(start + index) % avatarColors.length];

              return (
                <tr key={b.id} className="hover:bg-amber-50/40 transition">
                  <td className="py-3 pr-4 font-mono font-bold text-neutral-900 whitespace-nowrap">{b.id}</td>

                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2.5 whitespace-nowrap">
                      <span className={`w-8 h-8 rounded-full text-[11px] font-bold flex items-center justify-center ${color}`}>
                        {initials(b.customer)}
                      </span>
                      <span className="font-medium text-neutral-800">{b.customer}</span>
                    </div>
                  </td>

                  <td className="py-3 pr-4 text-neutral-600 whitespace-nowrap">{b.theme}</td>
                  <td className="py-3 pr-4 text-neutral-500 whitespace-nowrap">{b.date}</td>
                  <td className="py-3 pr-4 font-bold text-neutral-900 whitespace-nowrap">{inr(b.amount)}</td>

                  <td className="py-3 pr-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${statusStyle[b.status]}`}
                    >
                      {b.status === "Confirmed" ? (
                        <CheckCircle2 size={11} />
                      ) : b.status === "Cancelled" ? (
                        <XCircle size={11} />
                      ) : (
                        <Clock size={11} />
                      )}
                      {b.status}
                    </span>
                  </td>

                  <td className="py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/admin/bookings/${b.id}`}
                        className="px-3 py-1.5 rounded-lg border border-amber-200 text-amber-800 hover:bg-amber-50 text-[11px] font-bold"
                      >
                        View
                      </Link>

                      {/* Row menu */}
                      <div className="relative" data-row-menu>
                        <button
                          onClick={() => setOpenId(openId === b.id ? null : b.id)}
                          aria-label={`More actions for ${b.id}`}
                          aria-expanded={openId === b.id}
                          className="w-8 h-8 rounded-lg border border-amber-100 hover:bg-amber-50 text-neutral-500 flex items-center justify-center cursor-pointer"
                        >
                          <MoreVertical size={15} />
                        </button>

                        {openId === b.id && (
                          <div className="absolute right-0 top-full mt-1 z-20 w-40 rounded-xl border border-amber-100 bg-white shadow-xl py-1.5 text-xs">
                            {canConfirm && (
                              <button
                                onClick={() => {
                                  updateStatus(b.id, "Confirmed");
                                  setOpenId(null);
                                }}
                                className="w-full text-left px-3.5 py-2 font-semibold text-green-700 hover:bg-green-50 cursor-pointer"
                              >
                                Confirm booking
                              </button>
                            )}
                            {canCancel && (
                              <button
                                onClick={() => {
                                  updateStatus(b.id, "Cancelled");
                                  setOpenId(null);
                                }}
                                className="w-full text-left px-3.5 py-2 font-semibold text-rose-600 hover:bg-rose-50 cursor-pointer"
                              >
                                Cancel booking
                              </button>
                            )}
                            {!canConfirm && !canCancel && (
                              <p className="px-3.5 py-2 text-neutral-400">No actions available</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-neutral-500">
          {bookings.length === 0
            ? "Showing 0 bookings"
            : `Showing ${start + 1}-${Math.min(start + PAGE_SIZE, bookings.length)} of ${bookings.length}`}
        </p>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage(Math.max(1, current - 1))}
            disabled={current === 1}
            aria-label="Previous page"
            className="w-8 h-8 rounded-lg border border-amber-100 flex items-center justify-center text-neutral-500 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft size={15} />
          </button>

          {pageList(totalPages, current).map((p, i) =>
            typeof p === "string" ? (
              <span key={`dots-${i}`} className="w-6 text-center text-xs text-neutral-400">
                {p}
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p)}
                aria-current={p === current ? "page" : undefined}
                className={`w-8 h-8 rounded-lg text-xs font-bold cursor-pointer ${
                  p === current ? "bg-amber-500 text-white" : "text-neutral-600 hover:bg-amber-50"
                }`}
              >
                {p}
              </button>
            ),
          )}

          <button
            onClick={() => setPage(Math.min(totalPages, current + 1))}
            disabled={current === totalPages}
            aria-label="Next page"
            className="w-8 h-8 rounded-lg border border-amber-100 flex items-center justify-center text-neutral-500 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}