"use client";
import Swal from "sweetalert2";

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
  MapPin,
  Phone,
  Mail,
  X,
  CreditCard,
  User,
} from "lucide-react";
import { API_URL } from "@/config";
import { useAuth } from "../../context/AuthContext";

export interface BookingData {
  _id: string;
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productName: string;
  productId: string;
  productImage?: string;
  city: string;
  eventDate: string;
  eventTimeSlot: string;
  deliveryAddress: string;
  specialRequests?: string;
  totalAmount: number;
  advanceAmountPaid: number;
  onSiteAmountPending: number;
  paymentMethod: string;
  paymentStatus: string;
  bookingStatus: string;
  createdAt: string;
}

export default function AdminBookings() {
  const { admin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = admin?.token || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("adminUser") || "{}")?.token : "");
      const res = await fetch(`${API_URL}/api/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (e) {
      console.error("Failed to load bookings", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [admin]);

  const updateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const token = admin?.token || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("adminUser") || "{}")?.token : "");
      const res = await fetch(`${API_URL}/api/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingStatus: newStatus }),
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, bookingStatus: newStatus } : b))
        );
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `Status set to ${newStatus}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const markFullyPaid = async (id: string) => {
    try {
      const token = admin?.token || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("adminUser") || "{}")?.token : "");
      const res = await fetch(`${API_URL}/api/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentStatus: "FULLY_PAID",
          onSiteAmountPending: 0,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, paymentStatus: "FULLY_PAID", onSiteAmountPending: 0 } : b))
        );
        if (selectedBooking && selectedBooking._id === id) {
          setSelectedBooking({ ...selectedBooking, paymentStatus: "FULLY_PAID", onSiteAmountPending: 0 });
        }
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Full Payment Recorded (50% On-site received)!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBooking = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete this booking?",
      text: "This booking entry will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete!",
    });

    if (!result.isConfirmed) return;

    try {
      const token = admin?.token || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("adminUser") || "{}")?.token : "");
      const res = await fetch(`${API_URL}/api/bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
        if (selectedBooking && selectedBooking._id === id) {
          setSelectedBooking(null);
        }
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Booking deleted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.bookingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.customerPhone && b.customerPhone.includes(searchTerm));
    const matchesTab = statusFilter === "ALL" || b.bookingStatus === statusFilter;
    return matchesSearch && matchesTab;
  });

  // Calculate totals
  const totalBookingsValue = bookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
  const totalAdvanceCollected = bookings.reduce((sum, b) => sum + (Number(b.advanceAmountPaid) || 0), 0);
  const totalOnSitePending = bookings.reduce((sum, b) => sum + (Number(b.onSiteAmountPending) || 0), 0);

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#ECE9E2] p-6 rounded-3xl shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100/80 border border-amber-300/80 flex items-center justify-center text-amber-700">
              <CalendarCheck size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#182033] tracking-tight">
                Event Bookings
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                Track client decoration bookings with 50% advance received and 50% balance on-site.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by ID, client or decor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-amber-200 text-xs focus:outline-none focus:border-amber-500 bg-[#FFFDF9]"
            />
          </div>

          <button
            onClick={fetchBookings}
            className="p-2.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition cursor-pointer"
            title="Refresh Bookings"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Metrics Bar with 50% Advance & On-Site Split */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs">
          <p className="text-xs text-neutral-500 font-medium">Total Bookings</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">{bookings.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs">
          <p className="text-xs text-neutral-500 font-medium">Total Gross Booked Value</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">₹{totalBookingsValue.toLocaleString("en-IN")}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-xs">
          <p className="text-xs text-emerald-800 font-medium">50% Advance Online Collected</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">₹{totalAdvanceCollected.toLocaleString("en-IN")}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-xs">
          <p className="text-xs text-amber-800 font-medium">50% Pending Balance (On-Site)</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">₹{totalOnSitePending.toLocaleString("en-IN")}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["ALL", "CONFIRMED", "PENDING", "COMPLETED", "CANCELLED"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              statusFilter === status
                ? "bg-[#182033] text-white shadow-xs"
                : "bg-white border border-[#ECE9E2] text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            {status} ({status === "ALL" ? bookings.length : bookings.filter((b) => b.bookingStatus === status).length})
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="bg-white border border-[#ECE9E2] rounded-3xl p-6 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-amber-100 text-neutral-400 uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-semibold">Booking ID</th>
                <th className="pb-3 font-semibold">Customer</th>
                <th className="pb-3 font-semibold">Event Theme &amp; City</th>
                <th className="pb-3 font-semibold">Event Date &amp; Time</th>
                <th className="pb-3 font-semibold">Payment Split (50/50)</th>
                <th className="pb-3 font-semibold">Booking Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-neutral-400 font-medium">
                    Loading live bookings...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-neutral-400 font-medium">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filtered.map((b) => (
                  <tr key={b._id} className="hover:bg-amber-50/40 transition">
                    <td className="py-4">
                      <span className="font-mono font-bold text-xs bg-amber-100/70 border border-amber-200 text-amber-900 px-2.5 py-1 rounded-lg">
                        {b.bookingId}
                      </span>
                      <p className="text-[10px] text-neutral-400 mt-1">
                        {new Date(b.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </td>

                    <td className="py-4">
                      <div className="font-bold text-neutral-900">{b.customerName}</div>
                      <div className="text-xs text-neutral-500 font-mono">{b.customerPhone}</div>
                      <div className="text-[11px] text-neutral-400 truncate max-w-[150px]">{b.customerEmail}</div>
                    </td>

                    <td className="py-4">
                      <div className="font-semibold text-neutral-900 line-clamp-1">{b.productName}</div>
                      <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                        <MapPin size={11} className="text-amber-600 shrink-0" />
                        <span>{b.city}</span>
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="font-bold text-neutral-800 flex items-center gap-1">
                        <Clock size={12} className="text-amber-600 shrink-0" />
                        <span>{b.eventDate}</span>
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-0.5 truncate max-w-[170px]">{b.eventTimeSlot}</div>
                    </td>

                    <td className="py-4">
                      <div className="space-y-1">
                        <div className="font-extrabold text-neutral-900">₹{b.totalAmount?.toLocaleString("en-IN")}</div>
                        <div className="text-emerald-700 text-xs font-semibold">
                          50% Adv: ₹{b.advanceAmountPaid?.toLocaleString("en-IN")} (PAID)
                        </div>
                        <div className="text-amber-800 text-[11px] font-medium">
                          {b.onSiteAmountPending > 0 ? (
                            <span>50% Due: ₹{b.onSiteAmountPending?.toLocaleString("en-IN")}</span>
                          ) : (
                            <span className="text-emerald-600 font-bold">✓ FULLY SETTLED</span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      <select
                        value={b.bookingStatus}
                        onChange={(e) => updateBookingStatus(b._id, e.target.value)}
                        className={`text-xs font-bold rounded-full px-3 py-1 outline-none border cursor-pointer ${
                          b.bookingStatus === "CONFIRMED"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : b.bookingStatus === "COMPLETED"
                            ? "bg-blue-50 text-blue-800 border-blue-300"
                            : b.bookingStatus === "CANCELLED"
                            ? "bg-rose-50 text-rose-800 border-rose-300"
                            : "bg-amber-50 text-amber-800 border-amber-300"
                        }`}
                      >
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>

                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 transition cursor-pointer"
                          title="View Full Booking Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => deleteBooking(b._id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition cursor-pointer"
                          title="Delete Booking"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL BOOKING DETAILS POPUP MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#FFFDF9] border border-amber-300 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-amber-200 shrink-0">
              <div>
                <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                  {selectedBooking.bookingId}
                </span>
                <h3 className="font-serif text-xl font-bold text-neutral-900 mt-1">
                  {selectedBooking.productName}
                </h3>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-amber-100 flex items-center justify-center text-neutral-600 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Details */}
            <div className="py-5 overflow-y-auto space-y-5 text-xs sm:text-sm">
              
              {/* Client Info */}
              <div className="p-4 bg-white rounded-2xl border border-amber-200 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900">
                  Client Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-700">
                  <p><strong>Name:</strong> {selectedBooking.customerName}</p>
                  <p><strong>Phone:</strong> {selectedBooking.customerPhone}</p>
                  <p><strong>Email:</strong> {selectedBooking.customerEmail}</p>
                  <p><strong>Operational City:</strong> {selectedBooking.city}</p>
                </div>
              </div>

              {/* Event Timing & Address */}
              <div className="p-4 bg-white rounded-2xl border border-amber-200 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900">
                  Event Timing &amp; Venue
                </h4>
                <p><strong>Date &amp; Slot:</strong> {selectedBooking.eventDate} ({selectedBooking.eventTimeSlot})</p>
                <p><strong>Venue Address:</strong> {selectedBooking.deliveryAddress}</p>
                {selectedBooking.specialRequests && (
                  <p className="text-amber-800">
                    <strong>Special Instructions:</strong> {selectedBooking.specialRequests}
                  </p>
                )}
              </div>

              {/* Financial 50% Advance & On-Site Split */}
              <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl border border-amber-300 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900">
                  Payment Details (50% Advance Model)
                </h4>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-white rounded-xl border border-neutral-200">
                    <span className="text-[10px] text-neutral-500 uppercase block font-semibold">Total Price</span>
                    <span className="text-base font-extrabold text-neutral-900">₹{selectedBooking.totalAmount?.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300">
                    <span className="text-[10px] text-emerald-800 uppercase block font-bold">50% Advance Paid</span>
                    <span className="text-base font-extrabold text-emerald-700">₹{selectedBooking.advanceAmountPaid?.toLocaleString("en-IN")}</span>
                    <span className="text-[9px] text-emerald-600 block mt-0.5 font-semibold">ONLINE CONFIRMED</span>
                  </div>

                  <div className="p-3 bg-amber-100/70 rounded-xl border border-amber-300">
                    <span className="text-[10px] text-amber-900 uppercase block font-bold">50% Balance Due</span>
                    <span className="text-base font-extrabold text-amber-900">₹{selectedBooking.onSiteAmountPending?.toLocaleString("en-IN")}</span>
                    <span className="text-[9px] text-amber-700 block mt-0.5 font-semibold">ON-SITE SETUP</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-neutral-600 pt-2 border-t border-amber-200">
                  <span>Payment Mode: <strong className="capitalize">{selectedBooking.paymentMethod}</strong></span>
                  <span>Payment Status: <strong className="uppercase text-emerald-700">{selectedBooking.paymentStatus}</strong></span>
                </div>

                {selectedBooking.onSiteAmountPending > 0 && (
                  <button
                    onClick={() => markFullyPaid(selectedBooking._id)}
                    className="w-full mt-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-sm"
                  >
                    ✓ Mark 50% On-Site Balance As Paid (Fully Settled)
                  </button>
                )}
              </div>

            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-amber-200 flex justify-between items-center shrink-0">
              <span className="text-xs text-neutral-500">
                Created on: {new Date(selectedBooking.createdAt).toLocaleString("en-IN")}
              </span>
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-6 py-2 rounded-xl bg-neutral-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
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