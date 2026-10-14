"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  Sparkles,
  ShoppingBag,
  RefreshCw,
  Loader2,
  ExternalLink,
  MessageCircle,
  X,
  UserCheck,
  UserX,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import { fetchCustomers, CustomerUser } from "@/app/lib/api";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<CustomerUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTab, setFilterTab] = useState<"ALL" | "WITH_BOOKINGS" | "NO_BOOKINGS" | "ADMINS">("ALL");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerUser | null>(null);

  const loadCustomers = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCustomers();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.warn("Initial loadCustomers failed, attempting fallback:", err?.message);
      try {
        const res = await fetch("http://localhost:5000/api/super-admin/users", { cache: "no-store" });
        if (res.ok) {
          const fallbackData = await res.json();
          setCustomers(Array.isArray(fallbackData) ? fallbackData : []);
          setIsLoading(false);
          return;
        }
      } catch (e) {}
      toast.error(err?.message || "Failed to load customers list");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  // Filter logic
  const filtered = customers.filter((c) => {
    const s = searchTerm.toLowerCase();
    const name = (c.name || "").toLowerCase();
    const email = (c.email || "").toLowerCase();
    const phone = (c.phone || "").toLowerCase();

    const matchesSearch = name.includes(s) || email.includes(s) || phone.includes(s);

    let matchesTab = true;
    if (filterTab === "WITH_BOOKINGS") {
      matchesTab = (c.bookingsCount || 0) > 0;
    } else if (filterTab === "NO_BOOKINGS") {
      matchesTab = (c.bookingsCount || 0) === 0 && c.role === "user";
    } else if (filterTab === "ADMINS") {
      matchesTab = c.role === "admin" || c.role === "superadmin";
    }

    return matchesSearch && matchesTab;
  });

  // KPI Metrics
  const totalUsers = customers.length;
  const withBookingsCount = customers.filter((c) => (c.bookingsCount || 0) > 0).length;
  const noBookingsCount = customers.filter((c) => (c.bookingsCount || 0) === 0 && c.role === "user").length;
  const totalBookingsSum = customers.reduce((acc, c) => acc + (c.bookingsCount || 0), 0);

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#E8E8E3]/80 p-6 rounded-3xl shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-[#202522]">
              Customers & Registered Users
            </h2>
            <span className="text-xs bg-[#EEF6EB] text-[#8CBC67] font-bold px-2.5 py-0.5 rounded-full">
              Live Database
            </span>
          </div>
          <p className="text-[#6B706C] text-xs font-light mt-1">
            Complete list of all users who logged in or signed up, including both booked clients and new leads.
          </p>
        </div>

        <button
          onClick={loadCustomers}
          disabled={isLoading}
          className="p-2.5 rounded-2xl border border-[#E8E8E3] hover:bg-gray-50 text-[#6B706C] transition cursor-pointer self-start sm:self-auto flex items-center gap-2 text-xs font-semibold"
          title="Refresh customers list"
        >
          <RefreshCw size={15} className={isLoading ? "animate-spin text-[#8CBC67]" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Customers */}
        <div className="bg-white p-5 rounded-3xl border border-[#E8E8E3] shadow-sm">
          <div className="flex items-center justify-between text-[#6B706C]">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Total Logged In</span>
            <Users size={18} className="text-[#8CBC67]" />
          </div>
          <p className="text-2xl font-bold text-[#202522] mt-2">{totalUsers}</p>
          <p className="text-[11px] text-[#6B706C] mt-0.5">All registered accounts</p>
        </div>

        {/* Logged in without booking (Lead / Prospective) */}
        <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-sm bg-gradient-to-br from-white to-amber-50/30">
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Registered (No Booking Yet)</span>
            <UserX size={18} className="text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-800 mt-2">{noBookingsCount}</p>
          <p className="text-[11px] text-amber-700 mt-0.5">Signed in, prospective leads</p>
        </div>

        {/* Customers with Bookings */}
        <div className="bg-white p-5 rounded-3xl border border-green-200 shadow-sm bg-gradient-to-br from-white to-green-50/30">
          <div className="flex items-center justify-between text-green-700">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Converted Clients</span>
            <UserCheck size={18} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-800 mt-2">{withBookingsCount}</p>
          <p className="text-[11px] text-green-700 mt-0.5">Placed at least 1 order</p>
        </div>

        {/* Total Events Booked */}
        <div className="bg-white p-5 rounded-3xl border border-[#E8E8E3] shadow-sm">
          <div className="flex items-center justify-between text-[#6B706C]">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Total Orders Placed</span>
            <ShoppingBag size={18} className="text-[#8CBC67]" />
          </div>
          <p className="text-2xl font-bold text-[#202522] mt-2">{totalBookingsSum}</p>
          <p className="text-[11px] text-[#6B706C] mt-0.5">Cumulative decoration events</p>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="bg-white border border-[#E8E8E3]/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          {/* Filter Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
            {[
              { id: "ALL", label: `All Users (${customers.length})` },
              { id: "NO_BOOKINGS", label: `No Bookings (${noBookingsCount})` },
              { id: "WITH_BOOKINGS", label: `Booked Clients (${withBookingsCount})` },
              { id: "ADMINS", label: `Staff & Admins` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  filterTab === tab.id
                    ? "bg-[#8CBC67] text-white shadow-sm"
                    : "bg-[#FFFFFF] text-[#6B706C] hover:bg-[#EEF6EB] border border-[#E8E8E3]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B706C]"
            />
            <input
              type="text"
              placeholder="Search name, phone, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full border border-[#E8E8E3] text-xs focus:outline-none focus:border-[#8CBC67] bg-[#FCFBF7]"
            />
          </div>
        </div>

        {/* Customers Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <Loader2 size={32} className="animate-spin text-[#8CBC67] mb-2" />
              <p className="text-xs text-[#6B706C]">Loading registered customers...</p>
            </div>
          ) : (
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E8E8E3] text-[#6B706C] uppercase tracking-wider text-[11px]">
                  <th className="pb-3 font-semibold">Customer Name</th>
                  <th className="pb-3 font-semibold">Mobile Number</th>
                  <th className="pb-3 font-semibold">Email</th>
                  <th className="pb-3 font-semibold">Joined On</th>
                  <th className="pb-3 font-semibold">Booking Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E3]/60">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#6B706C] italic text-xs">
                      No customers found in this category.
                    </td>
                  </tr>
                ) : (
                  filtered.map((user) => {
                    const hasBookings = (user.bookingsCount || 0) > 0;
                    const cleanPhone = (user.phone || "").replace(/\D/g, "").slice(-10);
                    const formattedDate = user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "—";

                    return (
                      <tr key={user._id} className="hover:bg-[#EEF6EB]/40 transition">
                        {/* Name + Initial Avatar */}
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-full bg-[#EEF6EB] text-[#202522] flex items-center justify-center font-serif text-xs font-bold shrink-0 border border-[#8CBC67]/30">
                              {(user.name || "C").charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-[#202522]">{user.name || "Customer"}</p>
                              {user.role !== "user" && (
                                <span className="inline-block text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-stone-900 text-white mt-0.5">
                                  {user.role}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Phone */}
                        <td className="py-4">
                          {user.phone ? (
                            <span className="font-mono text-xs font-medium text-[#202522] flex items-center gap-1.5">
                              <Phone size={12} className="text-[#8CBC67]" />
                              +91 {cleanPhone}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs italic">Not provided</span>
                          )}
                        </td>

                        {/* Email */}
                        <td className="py-4 text-[#6B706C]">
                          <span className="flex items-center gap-1.5 text-xs">
                            <Mail size={12} className="text-[#8CBC67] shrink-0" />
                            <span className="truncate max-w-[180px]">{user.email || "—"}</span>
                          </span>
                        </td>

                        {/* Joined Date */}
                        <td className="py-4 text-[#6B706C] text-xs">
                          {formattedDate}
                        </td>

                        {/* Booking Status */}
                        <td className="py-4">
                          {hasBookings ? (
                            <div>
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800">
                                <CheckCircle size={11} />
                                <span>{user.bookingsCount} Event{user.bookingsCount > 1 ? "s" : ""} Booked</span>
                              </span>
                              {user.latestBooking?.productName && (
                                <p className="text-[10px] text-[#6B706C] truncate max-w-[160px] mt-0.5">
                                  {user.latestBooking.productName}
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                              <Clock size={11} />
                              <span>Registered Only</span>
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 text-right space-x-2 whitespace-nowrap">
                          {/* Direct WhatsApp Follow-up */}
                          {cleanPhone && (
                            <a
                              href={`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
                                `Hello ${user.name || "Customer"}, thank you for visiting Party Square! How can we assist you with decoration services today?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle size={15} />
                            </a>
                          )}

                          {/* View details */}
                          <button
                            onClick={() => setSelectedCustomer(user)}
                            className="px-3 py-1.5 rounded-lg bg-[#FCFBF7] border border-[#E8E8E3] hover:bg-[#EEF6EB] text-xs font-bold text-[#202522] transition cursor-pointer"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#8CBC67] shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E3]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8CBC67] tracking-wider">
                  Customer Profile
                </span>
                <h3 className="font-serif text-lg font-bold text-[#202522]">
                  {selectedCustomer.name || "Customer"}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="bg-[#FCFBF7] p-4 rounded-2xl border border-[#E8E8E3] space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-[#6B706C]">Mobile:</span>
                  <strong className="text-[#202522]">
                    {selectedCustomer.phone ? `+91 ${selectedCustomer.phone}` : "Not provided"}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#6B706C]">Email:</span>
                  <strong className="text-[#202522] truncate max-w-[200px]">
                    {selectedCustomer.email || "—"}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#6B706C]">Account Role:</span>
                  <span className="uppercase font-bold text-[#202522]">{selectedCustomer.role}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#6B706C]">Registration Date:</span>
                  <span className="text-[#202522]">
                    {selectedCustomer.createdAt ? new Date(selectedCustomer.createdAt).toLocaleString() : "—"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#6B706C]">Auth Method:</span>
                  <span className="text-[#202522]">{selectedCustomer.authProvider || "Standard"}</span>
                </div>
              </div>

              {/* Booking History Box */}
              <div className="p-4 rounded-2xl border border-[#E8E8E3] bg-white">
                <span className="text-xs font-bold text-[#202522] block mb-2">Order Activity</span>
                {selectedCustomer.bookingsCount > 0 ? (
                  <div className="space-y-1.5 text-xs text-[#6B706C]">
                    <p className="font-semibold text-green-700">
                      ✓ {selectedCustomer.bookingsCount} booking(s) registered
                    </p>
                    {selectedCustomer.latestBooking && (
                      <div className="bg-[#EEF6EB]/50 p-2.5 rounded-xl border border-[#8CBC67]/20 text-[#202522] mt-2">
                        <p className="font-bold text-xs">{selectedCustomer.latestBooking.productName}</p>
                        <p className="text-[11px] text-[#6B706C] mt-0.5">
                          ID: {selectedCustomer.latestBooking.bookingId} • ₹{selectedCustomer.latestBooking.totalAmount}
                        </p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded">
                          {selectedCustomer.latestBooking.bookingStatus}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-800 text-xs">
                    <p className="font-semibold">No bookings placed yet</p>
                    <p className="text-[11px] text-amber-700 mt-1">
                      This customer has logged in / signed up on Party Square, but hasn't completed an order yet. You can contact them to assist with decor packages!
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8E8E3] flex justify-between items-center">
              {selectedCustomer.phone ? (
                <a
                  href={`tel:+91${selectedCustomer.phone.replace(/\D/g, "").slice(-10)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8CBC67] text-white text-xs font-bold hover:bg-[#7AB055] transition"
                >
                  <Phone size={13} />
                  <span>Call Customer</span>
                </a>
              ) : <div />}

              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-black transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
