"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  ShieldCheck,
  ChevronRight,
  ShoppingBag,
  ExternalLink,
  ArrowLeft,
  CalendarDays,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "@/config";

interface BookingRecord {
  _id: string;
  bookingId: string;
  productName: string;
  productId?: string;
  productImage?: string;
  city: string;
  eventDate: string;
  eventTimeSlot: string;
  deliveryAddress: string;
  totalAmount: number;
  advanceAmountPaid: number;
  onSiteAmountPending: number;
  paymentMethod: string;
  paymentStatus: string;
  bookingStatus: string;
  createdAt: string;
}

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isUserAuthenticated, openLoginModal } = useAuth();

  const [activeTab, setActiveTab] = useState<"bookings" | "profile">(
    searchParams.get("tab") === "bookings" ? "bookings" : "bookings"
  );
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileData, setProfileData] = useState<any>(null);

  // Fetch bookings and user profile details
  useEffect(() => {
    if (!user || !user.token) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        // Fetch My Bookings
        const resBookings = await fetch(`${API_URL}/api/bookings/my`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (resBookings.ok) {
          const bData = await resBookings.json();
          setBookings(Array.isArray(bData) ? bData : []);
        }

        // Fetch User Profile with latest createdAt info
        const resProfile = await fetch(`${API_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (resProfile.ok) {
          const pData = await resProfile.json();
          setProfileData(pData);
        }
      } catch (err: any) {
        console.error("Error loading profile data:", err);
        setError("Could not load bookings. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-[#FAF7F2]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-amber-200/80 shadow-sm text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-4">
            <User size={32} />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900">Welcome to Party Square</h2>
          <p className="text-sm text-neutral-600 mt-2 mb-6">
            Please log in or sign up to view your profile, manage celebration bookings, and track event dates.
          </p>
          <button
            onClick={openLoginModal}
            className="w-full py-3.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition shadow-sm cursor-pointer"
          >
            Login / Register Now
          </button>
        </div>
      </div>
    );
  }

  // Account creation date
  const accountCreatedDate = profileData?.createdAt || user?.createdAt;
  const formattedCreatedDate = accountCreatedDate
    ? new Date(accountCreatedDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Active Member";

  const totalAdvancePaid = bookings.reduce(
    (sum, b) => sum + (Number(b.advanceAmountPaid) || 0),
    0
  );
  const totalOnSitePending = bookings.reduce(
    (sum, b) => sum + (Number(b.onSiteAmountPending) || 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-neutral-900 pb-20">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-gradient-to-r from-[#182033] via-[#212C45] to-[#182033] text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-neutral-950 font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg ring-4 ring-white/10 shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold">{user.name || "Customer"}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {user.role === "superadmin" ? "Super Admin" : user.role === "admin" ? "Admin" : "Verified Customer"}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-neutral-300 mt-1">
                {user.phone && (
                  <span className="flex items-center gap-1">
                    <Phone size={13} className="text-amber-400" />
                    {user.phone}
                  </span>
                )}
                {user.email && (
                  <span className="flex items-center gap-1">
                    <Mail size={13} className="text-amber-400" />
                    {user.email}
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-200/90 mt-1 flex items-center gap-1.5 font-medium">
                <CalendarDays size={13} />
                <span>Account Created: <strong className="text-white">{formattedCreatedDate}</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user.role === "superadmin" || user.role === "admin" ? (
              <Link
                href="/admin"
                className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles size={14} />
                <span>Admin Dashboard</span>
              </Link>
            ) : null}
            <Link
              href="/services"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold transition flex items-center gap-1.5"
            >
              <ShoppingBag size={14} />
              <span>Book New Decor</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-100 shadow-xs">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Total Bookings</span>
            <p className="text-2xl sm:text-3xl font-black text-neutral-900 mt-1">{bookings.length}</p>
            <span className="text-[11px] text-amber-700 font-medium">Recorded in your profile</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-100 shadow-xs">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">50% Advance Paid</span>
            <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">₹{totalAdvancePaid.toLocaleString("en-IN")}</p>
            <span className="text-[11px] text-emerald-700 font-medium">Verified online payments</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200 shadow-xs">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">50% Due On-Site</span>
            <p className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">₹{totalOnSitePending.toLocaleString("en-IN")}</p>
            <span className="text-[11px] text-amber-700 font-medium">Payable on event setup</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-xs">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Account Member</span>
            <p className="text-base sm:text-lg font-bold text-neutral-900 mt-1 truncate">{formattedCreatedDate}</p>
            <span className="text-[11px] text-neutral-500 font-medium">User since creation</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-amber-200/80 mb-6 gap-2">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === "bookings"
                ? "border-amber-500 text-amber-700"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <Calendar size={16} />
            <span>My Bookings ({bookings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === "profile"
                ? "border-amber-500 text-amber-700"
                : "border-transparent text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <User size={16} />
            <span>Account Details</span>
          </button>
        </div>

        {/* TAB 1: BOOKINGS LIST */}
        {activeTab === "bookings" && (
          <div>
            {loading ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-amber-100 shadow-xs">
                <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm font-semibold text-neutral-600">Loading your celebration bookings...</p>
              </div>
            ) : error ? (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-sm text-rose-700 flex items-center gap-2">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            ) : bookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-amber-100 shadow-xs max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto mb-4">
                  <CalendarDays size={32} />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">No Bookings Yet</h3>
                <p className="text-sm text-neutral-500 mt-2 mb-6">
                  You haven&apos;t booked any decoration packages yet. Select your event date and reserve with just 50% advance online!
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition shadow-sm"
                >
                  <Sparkles size={16} />
                  <span>Browse Decoration Themes</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => {
                  const bDateFormatted = booking.eventDate
                    ? new Date(booking.eventDate).toLocaleDateString("en-IN", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Date Not Set";

                  const bookedOnDate = booking.createdAt
                    ? new Date(booking.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "";

                  return (
                    <div
                      key={booking._id}
                      className="bg-white rounded-3xl border border-amber-200/90 overflow-hidden shadow-xs hover:border-amber-400 transition"
                    >
                      {/* Top Bar of Card */}
                      <div className="bg-amber-50/70 px-5 py-3 border-b border-amber-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-neutral-800 bg-white px-2.5 py-1 rounded-lg border border-amber-200">
                            {booking.bookingId || `#BK-${booking._id.slice(-6)}`}
                          </span>
                          <span className="text-neutral-500">Booked on {bookedOnDate}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full font-bold text-[11px] uppercase tracking-wider ${
                              booking.bookingStatus === "CONFIRMED"
                                ? "bg-emerald-100 text-emerald-800"
                                : booking.bookingStatus === "COMPLETED"
                                ? "bg-blue-100 text-blue-800"
                                : booking.bookingStatus === "CANCELLED"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {booking.bookingStatus}
                          </span>
                          <span className="px-2.5 py-1 rounded-full font-semibold text-[10px] bg-white border border-amber-200 text-neutral-700">
                            {booking.city}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        {/* Image & Decor Title */}
                        <div className="md:col-span-4 flex items-center gap-4">
                          <img
                            src={
                              booking.productImage ||
                              "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80"
                            }
                            alt={booking.productName}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-amber-100 shrink-0"
                          />
                          <div>
                            <h4 className="text-base font-bold text-neutral-900 leading-snug">
                              {booking.productName}
                            </h4>
                            <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                              <MapPin size={12} className="text-amber-600 shrink-0" />
                              <span className="line-clamp-1">{booking.deliveryAddress || booking.city}</span>
                            </p>
                          </div>
                        </div>

                        {/* Event Date & Time Slot - Prominent Highlight */}
                        <div className="md:col-span-4 bg-amber-50/50 rounded-2xl p-3.5 border border-amber-200/70 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1">
                              <Calendar size={13} className="text-amber-600" />
                              Event / Booking Date:
                            </span>
                          </div>
                          <p className="text-base font-black text-amber-950">
                            {bDateFormatted}
                          </p>
                          <p className="text-xs text-neutral-600 flex items-center gap-1">
                            <Clock size={12} className="text-neutral-400" />
                            <span>{booking.eventTimeSlot || "Evening Slot"}</span>
                          </p>
                        </div>

                        {/* 50% Split Pricing */}
                        <div className="md:col-span-4 bg-neutral-50 rounded-2xl p-3.5 border border-neutral-200 text-xs space-y-1.5">
                          <div className="flex justify-between items-center text-neutral-700">
                            <span>Total Booking Cost:</span>
                            <span className="font-bold text-neutral-950 text-sm">
                              ₹{(booking.totalAmount || 0).toLocaleString("en-IN")}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-lg">
                            <span className="flex items-center gap-1">
                              <CheckCircle2 size={12} />
                              50% Advance Online:
                            </span>
                            <span>₹{(booking.advanceAmountPaid || 0).toLocaleString("en-IN")} (PAID)</span>
                          </div>
                          <div className="flex justify-between items-center text-amber-800 font-semibold bg-amber-50 px-2 py-1 rounded-lg">
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              50% Balance On-Site:
                            </span>
                            <span>₹{(booking.onSiteAmountPending || 0).toLocaleString("en-IN")} (DUE ON SETUP)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROFILE DETAILS */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 max-w-2xl mx-auto shadow-xs">
            <h3 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
              <ShieldCheck size={20} className="text-amber-600" />
              <span>Customer Account Information</span>
            </h3>

            <div className="space-y-4 text-sm">
              <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase">Full Name</span>
                  <p className="text-base font-bold text-neutral-900 mt-0.5">{user.name || "Customer"}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <span className="text-xs font-semibold text-neutral-500 uppercase">Registered Mobile Number</span>
                <p className="text-base font-bold text-neutral-900 mt-0.5">{user.phone || "Not provided"}</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <span className="text-xs font-semibold text-neutral-500 uppercase">Email Address</span>
                <p className="text-base font-bold text-neutral-900 mt-0.5">{user.email || "Not provided"}</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
                <span className="text-xs font-semibold text-amber-800 uppercase flex items-center gap-1">
                  <CalendarDays size={13} />
                  Account Created On / Joining Date
                </span>
                <p className="text-base font-bold text-amber-950 mt-0.5">
                  {formattedCreatedDate}
                </p>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Your Party Square profile was created on this date.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
