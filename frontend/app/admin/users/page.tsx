"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Eye,
  CalendarCheck,
  CreditCard,
  Sparkles,
  Clock,
  MapPin,
  RefreshCw,
  X,
} from "lucide-react";
import { API_URL } from "@/config";
import { useAuth } from "../../context/AuthContext";

interface CustomerUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  createdAt: string;
  bookingsCount?: number;
  latestBooking?: {
    bookingId: string;
    productName: string;
    eventDate: string;
    totalAmount: number;
    advanceAmountPaid: number;
    paymentStatus: string;
    bookingStatus: string;
    createdAt: string;
  };
}

export default function AdminUsers() {
  const { admin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<CustomerUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<CustomerUser | null>(null);
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = admin?.token || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("adminUser") || "{}")?.token : "");
      
      const res = await fetch(`${API_URL}/api/super-admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (e) {
      console.error("Failed to fetch users", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [admin]);

  const handleViewUser = async (user: CustomerUser) => {
    setSelectedUser(user);
    setLoadingBookings(true);
    try {
      const token = admin?.token || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("adminUser") || "{}")?.token : "");
      const res = await fetch(`${API_URL}/api/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const allBookings = await res.json();
        const filtered = allBookings.filter((b: any) => 
          (b.user && (b.user._id === user._id || b.user === user._id)) ||
          b.customerEmail === user.email ||
          (user.phone && b.customerPhone === user.phone)
        );
        setUserBookings(filtered);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBookings(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = searchTerm.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      (u.phone && u.phone.includes(q))
    );
  });

  return (
    <div className="space-y-6 w-full">
      
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#ECE9E2] p-6 rounded-3xl shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100/80 border border-amber-300/80 flex items-center justify-center text-amber-700">
              <Users size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#182033] tracking-tight">
                Customers &amp; Bookings
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                All registered clients, event dates, 50% advance payments and pending on-site balances.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-amber-200 text-xs focus:outline-none focus:border-amber-500 bg-[#FFFDF9]"
            />
          </div>

          <button
            onClick={fetchUsers}
            className="p-2.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition cursor-pointer"
            title="Refresh Users"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Stats Quick Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-500 font-medium">Total Registered Clients</p>
            <p className="text-2xl font-bold text-neutral-900 mt-1">{users.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users size={20} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-500 font-medium">Active Customer Accounts</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">
              {users.filter(u => u.role === "user").length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle size={20} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-500 font-medium">Administrators &amp; Super Admins</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">
              {users.filter(u => u.role !== "user").length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Sparkles size={20} />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-[#ECE9E2] rounded-3xl p-6 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-amber-100 text-neutral-400 uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-semibold">Customer Details</th>
                <th className="pb-3 font-semibold">Phone &amp; Email</th>
                <th className="pb-3 font-semibold">Total Bookings</th>
                <th className="pb-3 font-semibold">Latest Event / Payment</th>
                <th className="pb-3 font-semibold">Joined On</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-neutral-400 font-medium">
                    Loading customer accounts...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-neutral-400 font-medium">
                    No customers found matching &quot;{searchTerm}&quot;
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-amber-50/40 transition">
                    <td className="py-4 font-bold text-neutral-900 flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center font-serif text-xs font-bold shrink-0">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900 text-sm">{user.name}</p>
                        <p className="text-[11px] text-neutral-400 font-normal">ID: {user._id.slice(-6)}</p>
                      </div>
                    </td>

                    <td className="py-4 text-neutral-600">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-800">
                          <Phone size={12} className="text-amber-600" />
                          <span>{user.phone || "No phone"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                          <Mail size={12} className="text-neutral-400" />
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-mono font-bold text-xs">
                        <CalendarCheck size={12} />
                        <span>{user.bookingsCount || 0} Event{user.bookingsCount === 1 ? "" : "s"}</span>
                      </span>
                    </td>

                    <td className="py-4 text-xs">
                      {user.latestBooking ? (
                        <div className="space-y-0.5">
                          <p className="font-semibold text-neutral-900 line-clamp-1">{user.latestBooking.productName}</p>
                          <p className="text-[11px] text-neutral-500 flex items-center gap-1">
                            <Clock size={11} className="text-amber-600" />
                            <span>{user.latestBooking.eventDate}</span>
                            <span className="text-emerald-700 font-bold ml-1">
                              50% (₹{user.latestBooking.advanceAmountPaid?.toLocaleString("en-IN")})
                            </span>
                          </p>
                        </div>
                      ) : (
                        <span className="text-neutral-400 text-xs italic">No bookings yet</span>
                      )}
                    </td>

                    <td className="py-4 text-xs text-neutral-500">
                      {new Date(user.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          user.role === "superadmin"
                            ? "bg-purple-100 text-purple-800 border border-purple-200"
                            : user.role === "admin"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="py-4 text-right">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold flex items-center gap-1.5 ml-auto border border-amber-200 transition cursor-pointer"
                      >
                        <Eye size={13} />
                        <span>Bookings</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* USER BOOKINGS DETAILS POPUP MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#FFFDF9] border border-amber-300 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-amber-200 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-bold">
                  {selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-neutral-900">{selectedUser.name}</h3>
                  <p className="text-xs text-neutral-500">
                    {selectedUser.phone || "No phone"} • {selectedUser.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-amber-100 flex items-center justify-center text-neutral-600 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Bookings List */}
            <div className="py-4 overflow-y-auto space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <CalendarCheck size={16} />
                <span>Customer Bookings &amp; Payment Records ({userBookings.length})</span>
              </h4>

              {loadingBookings ? (
                <p className="text-xs text-neutral-400 py-6 text-center">Loading customer event bookings...</p>
              ) : userBookings.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-amber-100">
                  <p className="text-sm font-semibold text-neutral-700">No Bookings Yet</p>
                  <p className="text-xs text-neutral-500 mt-1">This customer has not confirmed any bookings.</p>
                </div>
              ) : (
                userBookings.map((b) => (
                  <div key={b._id || b.bookingId} className="bg-white border border-amber-200/90 rounded-2xl p-4 space-y-3 shadow-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                          {b.bookingId}
                        </span>
                        <h5 className="font-bold text-sm text-neutral-900 mt-1">{b.productName}</h5>
                        <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                          <MapPin size={12} className="text-amber-600" />
                          <span>{b.city} • {b.deliveryAddress}</span>
                        </p>
                      </div>

                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                        {b.bookingStatus}
                      </span>
                    </div>

                    {/* Financial split box */}
                    <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <span className="text-[10px] uppercase text-neutral-500 block">Total Cost</span>
                        <span className="font-bold text-xs text-neutral-900">₹{b.totalAmount?.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="border-x border-amber-200/60">
                        <span className="text-[10px] uppercase text-emerald-700 font-bold block">50% Advance</span>
                        <span className="font-bold text-xs text-emerald-800">₹{b.advanceAmountPaid?.toLocaleString("en-IN")} (PAID)</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-amber-800 font-bold block">50% On-Site</span>
                        <span className="font-bold text-xs text-amber-900">₹{b.onSiteAmountPending?.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-neutral-500 pt-1">
                      <span>Event Date: <strong>{b.eventDate} ({b.eventTimeSlot})</strong></span>
                      <span>Booked on: {new Date(b.createdAt).toLocaleDateString("en-IN")}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-amber-200 text-right">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-5 py-2 rounded-xl bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-black transition cursor-pointer"
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