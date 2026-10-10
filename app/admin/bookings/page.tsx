"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import CreateBookingModal from "../component/CreateBookingModal";

export default function AdminBookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  // kjawFGASDKLJG
  const [bookings, setBookings] = useState([
    {
      id: "BK-9021",
      customer: "Rahul Sharma",
      theme: "Christmas Magic",
      date: "Dec 24, 2026",
      amount: "₹6,499",
      status: "CONFIRMED",
    },
    {
      id: "BK-9022",
      customer: "Priya Verma",
      theme: "Ganpati Mandap",
      date: "Sep 07, 2026",
      amount: "₹12,499",
      status: "PENDING",
    },
    {
      id: "BK-9023",
      customer: "Amit Patel",
      theme: "Romantic Candlelight",
      date: "Oct 15, 2026",
      amount: "₹4,599",
      status: "CONFIRMED",
    },
    {
      id: "BK-9024",
      customer: "Sneha Gupta",
      theme: "Birthday Balloon Bash",
      date: "Nov 10, 2026",
      amount: "₹3,999",
      status: "CANCELLED",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newBooking, setNewBooking] = useState({
    customer: "",
    theme: "",
    date: "",
    amount: "",
  });

  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.customer || !newBooking.theme) return;
    const created = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: newBooking.customer,
      theme: newBooking.theme,
      date: newBooking.date || "Today",
      amount: newBooking.amount ? `₹${newBooking.amount}` : "₹5,000",
      status: "PENDING",
    };
    setBookings([created, ...bookings]);
    setNewBooking({ customer: "", theme: "", date: "", amount: "" });
    setShowAddModal(false);
  };

  const updateStatus = (id: string, newStatus: string) => {
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b)),
    );
  };

  const deleteBooking = (id: string) => {
    setBookings(bookings.filter((b) => b.id !== id));
  };

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.theme.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = statusFilter === "ALL" || b.status === statusFilter;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#E8E8E3]/80 p-6 rounded-3xl shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#202522]">
            Manage Bookings
          </h2>
          <p className="text-[#6B706C] text-xs font-light mt-1">
            Accept, track, or update customer decoration event schedules.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-neutral-950 text-[#8CBC67] hover:bg-neutral-900 px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md transition"
        >
          <Plus size={16} />
          <span>Add New Booking</span>
        </button>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white border border-[#E8E8E3]/80 p-6 rounded-3xl shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {["ALL", "CONFIRMED", "PENDING", "CANCELLED"].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  statusFilter === tab
                    ? "bg-[#8CBC67] text-neutral-950 shadow-sm"
                    : "bg-[#FFFFFF] text-[#6B706C] hover:bg-[#EEF6EB] border border-[#E8E8E3]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B706C]"
            />
            <input
              type="text"
              placeholder="Search by ID, client, theme..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#E8E8E3] text-xs focus:outline-none focus:border-[#8CBC67] bg-[#FFFFFF]"
            />
          </div>
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E8E8E3] text-[#6B706C] uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-semibold">Booking ID</th>
                <th className="pb-3 font-semibold">Customer</th>
                <th className="pb-3 font-semibold">Theme</th>
                <th className="pb-3 font-semibold">Event Date</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-50">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-8 text-center text-[#6B706C] italic"
                  >
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-[#EEF6EB]/50 transition">
                    <td className="py-4 font-mono font-bold text-[#202522]">
                      {b.id}
                    </td>
                    <td className="py-4 font-bold text-[#202522]">
                      {b.customer}
                    </td>
                    <td className="py-4 text-[#6B706C]">{b.theme}</td>
                    <td className="py-4 text-[#6B706C]">{b.date}</td>
                    <td className="py-4 font-bold text-[#202522]">
                      {b.amount}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          b.status === "CONFIRMED"
                            ? "bg-green-100 text-green-800"
                            : b.status === "PENDING"
                              ? "bg-[#EEF6EB] text-[#202522]"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {b.status === "CONFIRMED" && <CheckCircle2 size={11} />}
                        {b.status === "PENDING" && <Clock size={11} />}
                        {b.status === "CANCELLED" && <XCircle size={11} />}
                        <span>{b.status}</span>
                      </span>
                    </td>
                    <td className="py-4 text-right space-x-2">
                      {b.status !== "CONFIRMED" && (
                        <button
                          onClick={() => updateStatus(b.id, "CONFIRMED")}
                          className="text-green-700 bg-[#EEF6EB] hover:bg-green-100 px-2.5 py-1 rounded-lg text-[11px] font-bold transition"
                        >
                          Confirm
                        </button>
                      )}
                      {b.status !== "CANCELLED" && (
                        <button
                          onClick={() => updateStatus(b.id, "CANCELLED")}
                          className="text-[#202522] bg-[#EEF6EB] hover:bg-[#EEF6EB] px-2.5 py-1 rounded-lg text-[11px] font-bold transition"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => deleteBooking(b.id)}
                        className="text-red-600 hover:bg-[#F7D6C7] p-1.5 rounded-lg transition inline-block"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Booking Modal */}
      {showAddModal && (
        <CreateBookingModal
          newBooking={newBooking}
          setNewBooking={setNewBooking}
          handleAddBooking={handleAddBooking}
          setShowAddModal={setShowAddModal}
        />
      )}
    </div>
  );
}
