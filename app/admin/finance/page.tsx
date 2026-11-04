"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  IndianRupee,
  CreditCard,
  Banknote,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  Download,
  Calendar,
  Building,
  ArrowUpRight,
  User,
  Phone,
  Sparkles,
  Loader2,
  Check
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchAllBookings, updateBookingStatus } from "@/app/lib/api";

export default function AdminFinancePage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "FULLY_PAID" | "50%_ADVANCE_PAID" | "PENDING">("ALL");
  const [cityFilter, setCityFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAllBookings();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load financial records");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Mark Cash Received on-site
  const handleMarkCashReceived = async (booking: any) => {
    if (!confirm(`Confirm cash receipt of ₹${(booking.onSiteAmountPending || 0).toLocaleString("en-IN")} from ${booking.customerName}?`)) return;

    setUpdatingId(booking._id);
    try {
      await updateBookingStatus(booking._id, booking.bookingStatus, "FULLY_PAID");
      toast.success(`Payment verified! Cash collection of ₹${booking.onSiteAmountPending || 0} recorded.`);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === booking._id
            ? { ...b, paymentStatus: "FULLY_PAID", onSiteAmountPending: 0 }
            : b
        )
      );
    } catch (err: any) {
      toast.error(err.message || "Failed to update payment status");
    } finally {
      setUpdatingId(null);
    }
  };

  // Unique Cities
  const cities = Array.from(new Set(bookings.map((b) => b.city).filter(Boolean)));

  // Filtered
  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const s = search.toLowerCase();
      const matchSearch =
        (b.customerName || "").toLowerCase().includes(s) ||
        (b.customerPhone || "").toLowerCase().includes(s) ||
        (b.bookingId || "").toLowerCase().includes(s) ||
        (b.productName || "").toLowerCase().includes(s) ||
        (b.city || "").toLowerCase().includes(s);

      const matchStatus = statusFilter === "ALL" || b.paymentStatus === statusFilter;
      const matchCity = cityFilter === "ALL" || b.city === cityFilter;

      return matchSearch && matchStatus && matchCity;
    });
  }, [bookings, search, statusFilter, cityFilter]);

  // Financial KPI Metrics
  const totalBookedValue = bookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
  const totalAdvanceCollected = bookings.reduce((sum, b) => sum + (Number(b.advanceAmountPaid) || 0), 0);
  const totalPendingCash = bookings.reduce((sum, b) => {
    if (b.paymentStatus === "FULLY_PAID") return sum;
    return sum + (Number(b.onSiteAmountPending) || 0);
  }, 0);
  const fullyPaidCount = bookings.filter((b) => b.paymentStatus === "FULLY_PAID").length;
  const pendingCashCount = bookings.filter((b) => b.paymentStatus !== "FULLY_PAID" && Number(b.onSiteAmountPending) > 0).length;

  // Export Financial Ledger CSV
  const handleExportFinanceCSV = () => {
    if (filtered.length === 0) {
      toast.error("No financial records to export");
      return;
    }

    const headers = [
      "Booking ID",
      "Customer Name",
      "Phone",
      "City",
      "Decoration Package",
      "Total Amount (INR)",
      "Online Advance Paid (INR)",
      "Pending Cash Amount (INR)",
      "Payment Status",
      "Payment Mode",
      "Event Date",
      "Booking Status"
    ];

    const rows = filtered.map((b) => [
      b.bookingId || b._id || "",
      b.customerName || "Customer",
      b.customerPhone || "",
      b.city || "Delhi",
      b.productName || "Decoration Setup",
      b.totalAmount || 0,
      b.advanceAmountPaid || 0,
      b.paymentStatus === "FULLY_PAID" ? 0 : b.onSiteAmountPending || 0,
      b.paymentStatus || "PENDING",
      b.paymentMethod || "upi",
      b.eventDate ? new Date(b.eventDate).toLocaleDateString("en-IN") : "",
      b.bookingStatus || "CONFIRMED"
    ]);

    const csvString =
      "\uFEFF" +
      [
        headers.map((h) => `"${h}"`).join(","),
        ...rows.map((e) => e.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      ].join("\r\n");

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const dateStr = new Date().toISOString().split("T")[0];
    link.download = `party_square_finance_ledger_${dateStr}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${filtered.length} financial transactions!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-[#E8E8E3]/80 p-6 rounded-3xl shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522]">
              Finance & Payment Reconciliation
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EEF6EB] text-[#558234] border border-[#8CBC67]/30">
              Accounts Hub
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#6B706C] mt-1">
            Track online advance receipts, reconcile on-site decorator cash collections & download revenue ledgers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadData}
            disabled={loading}
            className="p-2.5 rounded-2xl border border-[#E8E8E3] hover:bg-neutral-50 text-[#6B706C] transition cursor-pointer"
            title="Refresh Ledger"
          >
            <RefreshCw size={15} className={loading ? "animate-spin text-[#8CBC67]" : ""} />
          </button>

          <button
            type="button"
            onClick={handleExportFinanceCSV}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl bg-[#FCFBF7] border border-[#E8E8E3] text-[#202522] hover:bg-[#EEF6EB] hover:text-[#558234] hover:border-[#8CBC67] text-xs font-bold transition shadow-2xs cursor-pointer"
          >
            <Download size={14} className="text-[#8CBC67]" />
            <span>Export Finance CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Financial Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Booked Value */}
        <div className="p-5 rounded-3xl bg-white border border-[#E8E8E3] shadow-xs space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#6B706C]">Total Gross Bookings</p>
          <p className="text-2xl font-bold text-[#202522]">₹{totalBookedValue.toLocaleString("en-IN")}</p>
          <p className="text-[10px] text-neutral-400 font-mono">Across {bookings.length} orders</p>
        </div>

        {/* Online Advance Collected */}
        <div className="p-5 rounded-3xl bg-[#EEF6EB]/70 border border-[#8CBC67]/30 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Advance Paid Online</p>
            <CreditCard size={15} className="text-emerald-700" />
          </div>
          <p className="text-2xl font-bold text-emerald-900">₹{totalAdvanceCollected.toLocaleString("en-IN")}</p>
          <p className="text-[10px] text-emerald-700 font-medium">Auto-credited via Razorpay/UPI</p>
        </div>

        {/* Pending Cash to Collect */}
        <div className="p-5 rounded-3xl bg-[#FCFBF7]/70 border border-[#8CBC67]/30 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#202522]">On-Site Cash Pending</p>
            <Banknote size={15} className="text-[#8CBC67]" />
          </div>
          <p className="text-2xl font-bold text-[#202522]">₹{totalPendingCash.toLocaleString("en-IN")}</p>
          <p className="text-[10px] text-[#8CBC67] font-medium">{pendingCashCount} events remaining</p>
        </div>

        {/* Fully Cleared Accounts */}
        <div className="p-5 rounded-3xl bg-blue-50/60 border border-blue-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-900">Accounts Cleared</p>
            <CheckCircle2 size={15} className="text-blue-700" />
          </div>
          <p className="text-2xl font-bold text-blue-900">{fullyPaidCount} Orders</p>
          <p className="text-[10px] text-blue-700 font-medium">100% Payment settled</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#E8E8E3] shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B706C]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search booking ID, customer name, phone or theme..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs text-[#202522] focus:outline-none focus:border-[#8CBC67]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
            {[
              { id: "ALL", label: "All" },
              { id: "50%_ADVANCE_PAID", label: "Cash Due" },
              { id: "FULLY_PAID", label: "Settled" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  statusFilter === tab.id
                    ? "bg-white text-[#202522] shadow-xs"
                    : "text-[#6B706C] hover:text-[#202522]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* City Filter */}
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs font-semibold text-[#202522] focus:outline-none focus:border-[#8CBC67] cursor-pointer"
          >
            <option value="ALL">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Financial Transactions Table */}
      <div className="bg-white rounded-3xl border border-[#E8E8E3] shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 size={32} className="animate-spin text-[#8CBC67]" />
            <p className="text-xs text-[#6B706C]">Reconciling financial records & payments...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <p className="text-sm font-bold text-[#202522]">No payment records found</p>
            <p className="text-xs text-[#6B706C]">
              {search ? "No records matched your search." : "No bookings in the system yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E8E8E3] bg-[#FCFBF7] text-[#6B706C] text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Order & Customer</th>
                  <th className="py-4 px-6">Event Details</th>
                  <th className="py-4 px-6">Total Amount</th>
                  <th className="py-4 px-6">Online Advance</th>
                  <th className="py-4 px-6">On-Site Cash Pending</th>
                  <th className="py-4 px-6 text-center">Payment Status</th>
                  <th className="py-4 px-6 text-right">Cash Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E3]">
                {filtered.map((b) => {
                  const isFullyPaid = b.paymentStatus === "FULLY_PAID";
                  const pendingAmount = isFullyPaid ? 0 : Number(b.onSiteAmountPending) || 0;

                  return (
                    <tr key={b._id} className="hover:bg-neutral-50/70 transition">
                      {/* Customer & ID */}
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-bold text-sm text-[#202522]">
                            {b.customerName || b.user?.name || "Customer"}
                          </p>
                          <p className="text-[11px] font-mono text-[#6B706C]">
                            {b.customerPhone || b.user?.phone || "No phone"}
                          </p>
                          <span className="text-[10px] font-mono text-neutral-400 block mt-0.5">
                            ID: {b.bookingId || b._id?.slice(-8)}
                          </span>
                        </div>
                      </td>

                      {/* Event Details */}
                      <td className="py-4 px-6">
                        <p className="font-semibold text-xs text-[#202522] line-clamp-1">
                          {b.productName || b.theme || "Setup"}
                        </p>
                        <p className="text-[11px] text-[#6B706C]">
                          {b.city} • {b.eventDate ? new Date(b.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "TBD"}
                        </p>
                      </td>

                      {/* Total Amount */}
                      <td className="py-4 px-6 font-bold text-[#202522] text-sm font-mono">
                        ₹{(Number(b.totalAmount) || 0).toLocaleString("en-IN")}
                      </td>

                      {/* Advance Paid */}
                      <td className="py-4 px-6 text-emerald-800 font-bold text-xs font-mono">
                        <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200">
                          <Check size={11} strokeWidth={3} className="text-emerald-600" />
                          <span>₹{(Number(b.advanceAmountPaid) || 0).toLocaleString("en-IN")}</span>
                        </div>
                      </td>

                      {/* On-Site Cash Pending */}
                      <td className="py-4 px-6 font-bold text-xs font-mono">
                        {isFullyPaid ? (
                          <span className="text-neutral-400 font-normal">₹0 (Cleared)</span>
                        ) : (
                          <span className="text-[#8CBC67] bg-[#FCFBF7] border border-[#8CBC67]/30 px-2.5 py-1 rounded-lg inline-block">
                            ₹{pendingAmount.toLocaleString("en-IN")}
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                            isFullyPaid
                              ? "bg-[#EEF6EB] text-emerald-800"
                              : "bg-[#EEF6EB] text-[#202522]"
                          }`}
                        >
                          {isFullyPaid ? (
                            <>
                              <CheckCircle2 size={12} className="text-emerald-600" />
                              <span>Settled 100%</span>
                            </>
                          ) : (
                            <>
                              <Clock size={12} className="text-[#8CBC67]" />
                              <span>Cash Due On-Site</span>
                            </>
                          )}
                        </span>
                      </td>

                      {/* Action: Receive Cash */}
                      <td className="py-4 px-6 text-right">
                        {isFullyPaid ? (
                          <span className="text-[11px] text-neutral-400 font-medium italic">
                            Payment Complete
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleMarkCashReceived(b)}
                            disabled={updatingId === b._id}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#8CBC67] hover:bg-[#7AB055] text-white text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
                            title="Verify decorator collected cash from customer"
                          >
                            {updatingId === b._id ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <Banknote size={13} />
                            )}
                            <span>Mark Cash Received</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
