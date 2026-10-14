"use client";

import React, { useMemo, useState, useEffect } from "react";

import DashboardHeader from "./component/DashboardHeader";
import DashboardToolbar from "./component/DashboardToolbar";
import KpiCards from "./component/KpiCards";
import RevenueChart from "./component/RevenuChart";
import CategoryChart from "./component/CategoryChart";
import BookingsTable from "./component/BookingsTable";
import AttentionPanel from "./component/AttentionPanel";
import TopThemes from "./component/TopThemes";
import UpcomingEvents from "./component/UpcommingEvents";

import { INITIAL_BOOKINGS } from "./data/bookings";
import { Booking, Status } from "./types/dashboard";
import { fetchDashboardOverview, DashboardOverview } from "@/app/lib/api";

export default function AdminDashboard() {
  // =========================
  // DASHBOARD STATE
  // =========================

  const [range, setRange] = useState<"7D" | "30D" | "90D">("30D");

  const [bookings, setBookings] =
    useState<Booking[]>(INITIAL_BOOKINGS);

  const [tab, setTab] =
    useState<"All" | Status>("All");

  const [query, setQuery] = useState("");
  const [overview, setOverview] = useState<DashboardOverview | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchDashboardOverview();
        if (data) {
          setOverview(data);
        }
      } catch (err: any) {
        console.warn("Dashboard overview stats not loaded:", err?.message);
      }

      try {
        const liveBookings = await fetchAllBookings();
        if (Array.isArray(liveBookings) && liveBookings.length > 0) {
          const mapped: Booking[] = liveBookings.map((b) => {
            const rawStatus = (b.bookingStatus || "Confirmed").toLowerCase();
            let status: Status = "Confirmed";
            if (rawStatus === "pending") status = "Pending";
            else if (rawStatus === "completed") status = "Completed";
            else if (rawStatus === "cancelled") status = "Cancelled";

            return {
              id: b.bookingId || b._id?.slice(-7) || "BK-000",
              customer: b.customerName || b.user?.name || "Customer",
              theme: b.productName || b.theme || "Decoration",
              date: b.eventDate ? new Date(b.eventDate).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "Upcoming",
              amount: b.totalAmount ? `₹${Number(b.totalAmount).toLocaleString("en-IN")}` : "₹5,000",
              status,
              deposit: b.advanceAmountPaid ? `₹${Number(b.advanceAmountPaid).toLocaleString("en-IN")}` : "₹2,500",
              venue: b.deliveryAddress || b.city || "Venue",
            };
          });
          setBookings(mapped);
        }
      } catch (err: any) {
        console.warn("Live bookings not loaded on overview:", err?.message);
      }
    }
    loadData();
  }, []);

  // =========================
  // DASHBOARD CALCULATIONS
  // =========================

  const pendingCount = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  // =========================
  // FILTER BOOKINGS
  // =========================

  const filteredBookings = useMemo(() => {
    const search = query.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesStatus =
        tab === "All" || booking.status === tab;

      const matchesSearch =
        !search ||
        [
          booking.id,
          booking.customer,
          booking.theme,
        ].some((field) =>
          field.toLowerCase().includes(search)
        );

      return matchesStatus && matchesSearch;
    });
  }, [bookings, tab, query]);

  // =========================
  // UPDATE BOOKING STATUS
  // =========================

  const updateStatus = (
    id: string,
    status: Status
  ) => {
    setBookings((previousBookings) =>
      previousBookings.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              status,
            }
          : booking
      )
    );
  };

  // =========================
  // EXPORT BOOKINGS CSV
  // =========================

  const exportCsv = () => {
    const header = [
      "Booking ID",
      "Customer",
      "Theme",
      "Event Date",
      "Amount",
      "Status",
    ];

    const rows = filteredBookings.map((booking) => [
      booking.id,
      booking.customer,
      booking.theme,
      booking.date,
      booking.amount,
      booking.status,
    ]);

    const csv = [header, ...rows]
      .map((row) =>
        row
          .map(
            (cell) =>
              `"${String(cell).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob([csv], {
        type: "text/csv",
      })
    );

    const link = document.createElement("a");

    link.href = url;
    link.download = "bookings.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  // =========================
  // PAGE
  // =========================

  return (
    <div className="space-y-6 w-full">

      {/* Header */}
      <DashboardHeader
        pendingCount={pendingCount}
      />

      {/* Date Range */}
      <DashboardToolbar
        range={range}
        setRange={setRange}
      />

      {/* KPI Cards */}
      <KpiCards
        pendingCount={pendingCount}
        metrics={overview?.metrics}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <RevenueChart
          range={range}
        />

        <CategoryChart
          breakdown={overview?.categoryBreakdown}
        />
      </div>

      {/* Bookings + Side Panels */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        <BookingsTable
          bookings={filteredBookings}
          tab={tab}
          setTab={setTab}
          query={query}
          setQuery={setQuery}
          updateStatus={updateStatus}
          exportCsv={exportCsv}
        />

        <div className="space-y-5">

          <AttentionPanel
            pendingCount={pendingCount}
          />

          <TopThemes />

          <UpcomingEvents />

        </div>

      </div>

    </div>
  );
}