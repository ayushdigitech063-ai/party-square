"use client";

import Link from "next/link";

import {
  Search,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

import {
  Booking,
  Status,
} from "../types/dashboard";

interface BookingsTableProps {
  bookings: Booking[];

  tab: "All" | Status;

  setTab: (
    tab: "All" | Status
  ) => void;

  query: string;

  setQuery: (
    query: string
  ) => void;

  updateStatus: (
    id: string,
    status: Status
  ) => void;

  exportCsv: () => void;
}

const STATUS_TABS: (
  | "All"
  | Status
)[] = [
  "All",
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

const statusStyle: Record<
  Status,
  string
> = {
  Confirmed:
    "bg-green-100 text-green-800",

  Pending:
    "bg-amber-100 text-amber-800",

  Completed:
    "bg-blue-100 text-blue-800",

  Cancelled:
    "bg-rose-100 text-rose-700",
};

const inr = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;

export default function BookingsTable({
  bookings,
  tab,
  setTab,
  query,
  setQuery,
  updateStatus,
  exportCsv,
}: BookingsTableProps) {
  return (
    <div className="xl:col-span-2 bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-5">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-3">

        <h3 className="font-serif text-xl font-bold text-neutral-900">
          Recent Customer Bookings
        </h3>

        <div className="flex items-center gap-3">

          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-amber-800 cursor-pointer"
          >
            <Download size={14} />
            Export CSV
          </button>

          <Link
            href="/admin/bookings"
            className="text-xs font-bold text-amber-700 uppercase tracking-wider hover:underline"
          >
            View All
          </Link>

        </div>

      </div>

      {/* Filters */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

        <div className="flex gap-1.5 overflow-x-auto pb-1">

          {STATUS_TABS.map(
            (status) => (
              <button
                key={status}
                onClick={() =>
                  setTab(status)
                }
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer ${
                  tab === status
                    ? "bg-stone-900 text-white border-stone-900"
                    : "bg-white text-neutral-500 border-amber-200 hover:text-amber-800"
                }`}
              >
                {status}
              </button>
            )
          )}

        </div>

        <div className="relative">

          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />

          <input
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search booking, customer, theme"
            aria-label="Search bookings"
            className="w-full sm:w-64 h-9 pl-9 pr-3 rounded-full border border-amber-200 text-xs focus:outline-none focus:border-amber-600"
          />

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full text-left text-xs sm:text-sm">

          <thead>

            <tr className="border-b border-amber-100 text-neutral-400 uppercase tracking-wider text-[11px]">

              <th className="pb-3 font-semibold">
                Booking
              </th>

              <th className="pb-3 font-semibold">
                Customer
              </th>

              <th className="pb-3 font-semibold hidden md:table-cell">
                Theme
              </th>

              <th className="pb-3 font-semibold hidden md:table-cell">
                Event Date
              </th>

              <th className="pb-3 font-semibold">
                Amount
              </th>

              <th className="pb-3 font-semibold">
                Status
              </th>

              <th className="pb-3 font-semibold text-right">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-amber-50">

            {bookings.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 text-center text-neutral-400"
                >
                  No bookings match your filters.
                </td>
              </tr>
            )}

            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-amber-50/50 transition"
              >

                <td className="py-3.5 font-mono font-bold text-neutral-900">
                  {booking.id}
                </td>

                <td className="py-3.5">

                  <div className="flex items-center gap-2.5">

                    <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold flex items-center justify-center">
                      {booking.customer
                        .split(" ")
                        .map(
                          (part) =>
                            part[0]
                        )
                        .join("")
                        .slice(0, 2)}
                    </span>

                    <span className="font-medium text-neutral-800">
                      {booking.customer}
                    </span>

                  </div>

                </td>

                <td className="py-3.5 text-neutral-600 hidden md:table-cell">
                  {booking.theme}
                </td>

                <td className="py-3.5 text-neutral-500 hidden md:table-cell">
                  {booking.date}
                </td>

                <td className="py-3.5 font-bold text-neutral-900">
                  {inr(booking.amount)}
                </td>

                <td className="py-3.5">

                  <span
                    className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyle[booking.status]}`}
                  >

                    {booking.status ===
                    "Confirmed" ? (
                      <CheckCircle2 size={12} />
                    ) : booking.status ===
                      "Cancelled" ? (
                      <XCircle size={12} />
                    ) : (
                      <Clock size={12} />
                    )}

                    <span>
                      {booking.status}
                    </span>

                  </span>

                </td>

                <td className="py-3.5">

                  <div className="flex justify-end gap-1.5">

                    {booking.status ===
                      "Pending" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            booking.id,
                            "Confirmed"
                          )
                        }
                        className="px-2.5 py-1 rounded-full bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold uppercase cursor-pointer"
                      >
                        Confirm
                      </button>
                    )}

                    {(
                      booking.status ===
                        "Pending" ||
                      booking.status ===
                        "Confirmed"
                    ) && (
                      <button
                        onClick={() =>
                          updateStatus(
                            booking.id,
                            "Cancelled"
                          )
                        }
                        className="px-2.5 py-1 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 text-[10px] font-bold uppercase cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}

                    <Link
                      href={`/admin/bookings/${booking.id}`}
                      className="px-2.5 py-1 rounded-full border border-amber-200 text-amber-800 hover:bg-amber-50 text-[10px] font-bold uppercase"
                    >
                      View
                    </Link>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}