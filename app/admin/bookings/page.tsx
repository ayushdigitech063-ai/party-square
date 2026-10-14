"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarCheck,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Trash2,
  Eye,
  RefreshCw,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  X,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

import CreateBookingModal, { NewBookingData } from "../component/CreateBookingModal";
import {
  fetchAllBookings,
  updateBookingStatus,
  deleteBooking,
  createBooking,
} from "@/app/lib/api";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [cityFilter, setCityFilter] = useState("ALL");

  // View details modal
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  // Add booking modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSavingBooking, setIsSavingBooking] = useState(false);
  const [newBooking, setNewBooking] = useState<NewBookingData>({
    customerName: "",
    customerPhone: "",
    theme: "",
    city: "Delhi",
    eventDate: new Date().toISOString().split("T")[0],
    eventTimeSlot: "Evening (04:00 PM - 08:00 PM)",
    deliveryAddress: "",
    amount: "5000",
  });

  // Load bookings from MongoDB
  const loadBookings = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllBookings();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.warn("Initial loadBookings failed, attempting fallback:", err?.message);
      try {
        const res = await fetch("http://localhost:5000/api/bookings", { cache: "no-store" });
        if (res.ok) {
          const fallbackData = await res.json();
          setBookings(Array.isArray(fallbackData) ? fallbackData : []);
          setIsLoading(false);
          return;
        }
      } catch (e) {}
      toast.error(err?.message || "Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // Update Status
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateBookingStatus(id, newStatus);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, bookingStatus: newStatus } : b))
      );
      if (selectedBooking && selectedBooking._id === id) {
        setSelectedBooking({ ...selectedBooking, bookingStatus: newStatus });
      }
      toast.success(`Booking status updated to ${newStatus}`);
    } catch (err: any) {
      toast.error(err?.message || "Failed to update booking status");
    }
  };

  // Delete Booking
  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this booking?")) return;
    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      if (selectedBooking && selectedBooking._id === id) {
        setSelectedBooking(null);
      }
      toast.success("Booking deleted successfully");
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete booking");
    }
  };

  // Create Manual Booking
  const handleAddBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newBooking.customerName || !newBooking.theme || !newBooking.customerPhone) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsSavingBooking(true);
    try {
      const totalAmount = Number(newBooking.amount) || 5000;
      const advanceAmount = Math.round(totalAmount * 0.5);

      const res = await createBooking({
        productName: newBooking.theme,
        customerName: newBooking.customerName,
        customerPhone: newBooking.customerPhone,
        city: newBooking.city || "Delhi",
        eventDate: newBooking.eventDate,
        eventTimeSlot: newBooking.eventTimeSlot,
        deliveryAddress: newBooking.deliveryAddress,
        totalAmount,
        advanceAmountPaid: advanceAmount,
        onSiteAmountPending: totalAmount - advanceAmount,
        paymentMethod: "upi",
      });

      if (res?.booking) {
        setBookings([res.booking, ...bookings]);
        toast.success("Booking created & saved to database!");
      } else {
        await loadBookings();
      }

      setShowAddModal(false);
      setNewBooking({
        customerName: "",
        customerPhone: "",
        theme: "",
        city: "Delhi",
        eventDate: new Date().toISOString().split("T")[0],
        eventTimeSlot: "Evening (04:00 PM - 08:00 PM)",
        deliveryAddress: "",
        amount: "5000",
      });
    } catch (err: any) {
      toast.error(err?.message || "Failed to create booking");
    } finally {
      setIsSavingBooking(false);
    }
  };

  // Unique cities for filter
  const uniqueCities = Array.from(
    new Set(bookings.map((b) => b.city).filter(Boolean))
  );

  // Filtered Bookings
  const filtered = bookings.filter((b) => {
    const s = searchTerm.toLowerCase();
    const customer = (b.customerName || b.user?.name || "").toLowerCase();
    const phone = (b.customerPhone || b.user?.phone || "").toLowerCase();
    const id = (b.bookingId || b._id || "").toLowerCase();
    const theme = (b.productName || b.theme || "").toLowerCase();
    const city = (b.city || "").toLowerCase();

    const matchesSearch =
      customer.includes(s) ||
      phone.includes(s) ||
      id.includes(s) ||
      theme.includes(s) ||
      city.includes(s);

    const matchesStatus =
      statusFilter === "ALL" || (b.bookingStatus || "").toUpperCase() === statusFilter;

    const matchesCity = cityFilter === "ALL" || b.city === cityFilter;

    return matchesSearch && matchesStatus && matchesCity;
  });

  // KPI metrics
  const totalBookings = bookings.length;
  const confirmedCount = bookings.filter(
    (b) => (b.bookingStatus || "").toUpperCase() === "CONFIRMED"
  ).length;
  const pendingCount = bookings.filter(
    (b) => (b.bookingStatus || "").toUpperCase() === "PENDING"
  ).length;
  const completedCount = bookings.filter(
    (b) => (b.bookingStatus || "").toUpperCase() === "COMPLETED"
  ).length;
  const totalAdvanceCollected = bookings.reduce(
    (acc, b) => acc + (Number(b.advanceAmountPaid) || Number(b.totalAmount) || 0),
    0
  );

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#E8E8E3]/80 p-6 rounded-3xl shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-[#202522]">
              Customer Bookings
            </h2>
            <span className="text-xs bg-[#EEF6EB] text-[#8CBC67] font-bold px-2.5 py-0.5 rounded-full">
              Live Database
            </span>
          </div>
          <p className="text-[#6B706C] text-xs font-light mt-1">
            Accept, track, and update customer event schedules, venue setups, and payment statuses.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={loadBookings}
            disabled={isLoading}
            className="p-2.5 rounded-2xl border border-[#E8E8E3] hover:bg-gray-50 text-[#6B706C] transition cursor-pointer"
            title="Refresh bookings"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin text-[#8CBC67]" : ""} />
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-neutral-950 text-[#8CBC67] hover:bg-neutral-900 px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md transition cursor-pointer"
          >
            <Plus size={16} />
            <span>Add Manual Booking</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#E8E8E3] shadow-sm">
          <span className="text-[11px] uppercase tracking-wider text-[#6B706C] font-semibold block">Total Orders</span>
          <p className="text-2xl font-bold text-[#202522] mt-1">{totalBookings}</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E8E3] shadow-sm">
          <span className="text-[11px] uppercase tracking-wider text-green-700 font-semibold block">Confirmed</span>
          <p className="text-2xl font-bold text-green-700 mt-1">{confirmedCount}</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E8E3] shadow-sm">
          <span className="text-[11px] uppercase tracking-wider text-amber-700 font-semibold block">Pending</span>
          <p className="text-2xl font-bold text-amber-700 mt-1">{pendingCount}</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E8E3] shadow-sm">
          <span className="text-[11px] uppercase tracking-wider text-blue-700 font-semibold block">Completed</span>
          <p className="text-2xl font-bold text-blue-700 mt-1">{completedCount}</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E8E3] shadow-sm col-span-2 lg:col-span-1">
          <span className="text-[11px] uppercase tracking-wider text-[#8CBC67] font-semibold block">Advance Collected</span>
          <p className="text-2xl font-bold text-[#202522] mt-1">₹{totalAdvanceCollected.toLocaleString("en-IN")}</p>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white border border-[#E8E8E3]/80 p-6 rounded-3xl shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          {/* Status Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
            {["ALL", "CONFIRMED", "PENDING", "COMPLETED", "CANCELLED"].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  statusFilter === tab
                    ? "bg-[#8CBC67] text-white shadow-sm"
                    : "bg-[#FFFFFF] text-[#6B706C] hover:bg-[#EEF6EB] border border-[#E8E8E3]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* City Filter */}
            {uniqueCities.length > 0 && (
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[#E8E8E3] text-xs font-semibold bg-[#FCFBF7] text-[#202522] outline-none focus:border-[#8CBC67]"
              >
                <option value="ALL">All Cities ({uniqueCities.length})</option>
                {uniqueCities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            )}

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B706C]"
              />
              <input
                type="text"
                placeholder="Search ID, client, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full border border-[#E8E8E3] text-xs focus:outline-none focus:border-[#8CBC67] bg-[#FCFBF7]"
              />
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto pt-2">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <Loader2 size={30} className="animate-spin text-[#8CBC67] mb-2" />
              <p className="text-xs text-[#6B706C]">Loading customer bookings...</p>
            </div>
          ) : (
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E8E8E3] text-[#6B706C] uppercase tracking-wider text-[11px]">
                  <th className="pb-3 font-semibold">Booking ID</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Package / Theme</th>
                  <th className="pb-3 font-semibold">City & Event Date</th>
                  <th className="pb-3 font-semibold">Financials</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E3]/60">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-[#6B706C] italic text-xs">
                      No customer bookings found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((b) => {
                    const status = (b.bookingStatus || "CONFIRMED").toUpperCase();
                    const customerName = b.customerName || b.user?.name || "Customer";
                    const customerPhone = b.customerPhone || b.user?.phone || "—";
                    const formattedDate = b.eventDate
                      ? new Date(b.eventDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "—";

                    return (
                      <tr key={b._id || b.bookingId} className="hover:bg-[#EEF6EB]/40 transition">
                        {/* ID */}
                        <td className="py-4 font-mono font-bold text-[#202522]">
                          {b.bookingId || b._id?.slice(-8)}
                        </td>

                        {/* Customer */}
                        <td className="py-4">
                          <p className="font-bold text-[#202522]">{customerName}</p>
                          <p className="text-[11px] text-[#6B706C] font-mono flex items-center gap-1 mt-0.5">
                            <Phone size={10} />
                            +91 {customerPhone}
                          </p>
                        </td>

                        {/* Theme */}
                        <td className="py-4 text-[#202522] max-w-[200px]">
                          <span className="font-semibold line-clamp-1">{b.productName || b.theme}</span>
                          <span className="text-[11px] text-[#6B706C] line-clamp-1">{b.eventTimeSlot}</span>
                        </td>

                        {/* City & Date */}
                        <td className="py-4 text-[#6B706C]">
                          <span className="font-medium text-[#202522] block">{formattedDate}</span>
                          <span className="text-[11px] flex items-center gap-1 mt-0.5">
                            <MapPin size={11} className="text-[#8CBC67]" />
                            {b.city || "Delhi"}
                          </span>
                        </td>

                        {/* Financials */}
                        <td className="py-4">
                          <span className="font-bold text-[#202522] block">
                            ₹{(b.totalAmount || 0).toLocaleString("en-IN")}
                          </span>
                          <span className="text-[11px] text-green-700 font-semibold block">
                            Adv: ₹{(b.advanceAmountPaid || 0).toLocaleString("en-IN")}
                          </span>
                          {b.onSiteAmountPending > 0 && (
                            <span className="text-[10px] text-amber-700 block">
                              Pending: ₹{b.onSiteAmountPending.toLocaleString("en-IN")}
                            </span>
                          )}
                        </td>

                        {/* Status Badge */}
                        <td className="py-4">
                          <span
                            className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              status === "CONFIRMED"
                                ? "bg-green-100 text-green-800"
                                : status === "PENDING"
                                ? "bg-amber-100 text-amber-800"
                                : status === "COMPLETED"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {status === "CONFIRMED" && <CheckCircle2 size={11} />}
                            {status === "PENDING" && <Clock size={11} />}
                            {status === "CANCELLED" && <XCircle size={11} />}
                            <span>{status}</span>
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 text-right space-x-1.5 whitespace-nowrap">
                          {/* Quick Status Changers */}
                          <select
                            value={status}
                            onChange={(e) => handleUpdateStatus(b._id, e.target.value)}
                            className="text-[11px] font-semibold bg-[#FCFBF7] border border-[#E8E8E3] rounded-lg px-2 py-1 outline-none text-[#202522]"
                          >
                            <option value="CONFIRMED">Confirm</option>
                            <option value="PENDING">Pending</option>
                            <option value="COMPLETED">Complete</option>
                            <option value="CANCELLED">Cancel</option>
                          </select>

                          {/* View details */}
                          <button
                            onClick={() => setSelectedBooking(b)}
                            className="p-1.5 rounded-lg text-gray-600 hover:bg-[#EEF6EB] hover:text-[#8CBC67] transition inline-block cursor-pointer"
                            title="View full booking & venue details"
                          >
                            <Eye size={15} />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteBooking(b._id)}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition inline-block cursor-pointer"
                            title="Delete booking"
                          >
                            <Trash2 size={15} />
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

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#8CBC67] shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E3]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8CBC67] tracking-wider">
                  Booking Overview
                </span>
                <h3 className="font-mono text-lg font-bold text-[#202522]">
                  {selectedBooking.bookingId || selectedBooking._id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-[#FCFBF7] p-3.5 rounded-2xl border border-[#E8E8E3]">
                <div>
                  <span className="text-[#6B706C] block text-[11px]">Customer Name:</span>
                  <strong className="text-sm text-[#202522]">
                    {selectedBooking.customerName || selectedBooking.user?.name || "Customer"}
                  </strong>
                </div>
                <div>
                  <span className="text-[#6B706C] block text-[11px]">Mobile Number:</span>
                  <strong className="text-sm text-[#202522]">
                    +91 {selectedBooking.customerPhone || selectedBooking.user?.phone || "—"}
                  </strong>
                </div>
                <div className="col-span-2">
                  <span className="text-[#6B706C] block text-[11px]">Email:</span>
                  <span className="text-xs text-[#202522]">
                    {selectedBooking.customerEmail || selectedBooking.user?.email || "—"}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[#6B706C] block text-[11px] font-bold">Package / Theme:</span>
                <p className="text-sm font-bold text-[#202522]">{selectedBooking.productName || selectedBooking.theme}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[#6B706C] block text-[11px]">Event Date:</span>
                  <strong className="text-xs text-[#202522]">
                    {selectedBooking.eventDate ? new Date(selectedBooking.eventDate).toLocaleDateString() : "—"}
                  </strong>
                </div>
                <div>
                  <span className="text-[#6B706C] block text-[11px]">Time Slot:</span>
                  <strong className="text-xs text-[#202522]">{selectedBooking.eventTimeSlot || "Evening"}</strong>
                </div>
              </div>

              <div>
                <span className="text-[#6B706C] block text-[11px] font-bold">Venue & Setup Address:</span>
                <p className="text-xs text-[#202522] bg-[#FCFBF7] p-2.5 rounded-xl border border-[#E8E8E3] mt-1">
                  {selectedBooking.deliveryAddress || selectedBooking.city || "Venue address not specified"}
                </p>
              </div>

              {selectedBooking.specialRequests && (
                <div>
                  <span className="text-[#6B706C] block text-[11px] font-bold">Special Requests:</span>
                  <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 mt-1">
                    {selectedBooking.specialRequests}
                  </p>
                </div>
              )}

              <div className="border-t border-[#E8E8E3] pt-3 grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#FCFBF7] p-2.5 rounded-xl border border-[#E8E8E3]">
                  <span className="text-[10px] text-[#6B706C] block">Total Amount</span>
                  <strong className="text-sm text-[#202522]">₹{selectedBooking.totalAmount || 0}</strong>
                </div>
                <div className="bg-green-50 p-2.5 rounded-xl border border-green-200">
                  <span className="text-[10px] text-green-700 block">Advance Paid</span>
                  <strong className="text-sm text-green-800">₹{selectedBooking.advanceAmountPaid || 0}</strong>
                </div>
                <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <span className="text-[10px] text-amber-700 block">On-site Balance</span>
                  <strong className="text-sm text-amber-800">₹{selectedBooking.onSiteAmountPending || 0}</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8E8E3] flex justify-between items-center">
              <span className="text-[11px] text-[#6B706C]">
                Status: <strong className="text-[#202522]">{selectedBooking.bookingStatus}</strong>
              </span>
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-5 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-black transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Booking Modal */}
      {showAddModal && (
        <CreateBookingModal
          newBooking={newBooking}
          setNewBooking={setNewBooking}
          handleAddBooking={handleAddBooking}
          setShowAddModal={setShowAddModal}
          isSaving={isSavingBooking}
        />
      )}
    </div>
  );
}
