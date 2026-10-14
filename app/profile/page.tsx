"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  Clock,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Search,
  Phone,
  User,
  Mail,
  LogOut,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import { fetchMyBookings, fetchBookingsByPhone } from "@/app/lib/api";
import LoginModal from "@/app/components/LoginModal";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Phone lookup fallback
  const [phoneQuery, setPhoneQuery] = useState("");
  const [isSearchingPhone, setIsSearchingPhone] = useState(false);
  const [phoneSearchDone, setPhoneSearchDone] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Helper to extract token
  const getStoredToken = () => {
    if (typeof window === "undefined") return null;
    const cookieMatch = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    const cookieToken = cookieMatch ? cookieMatch.split("=")[1] : null;
    const localToken = localStorage.getItem("token");
    return cookieToken || localToken || null;
  };

  // Load profile and bookings
  const loadUserAndBookings = async () => {
    setIsLoading(true);
    const activeToken = getStoredToken();
    setToken(activeToken);

    if (activeToken) {
      try {
        // 1. Fetch user info
        const profileRes = await fetch("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${activeToken}` },
        });
        if (profileRes.ok) {
          const userData = await profileRes.json();
          setUser(userData);
        } else {
          // Fallback from localStorage
          const localUser = localStorage.getItem("user");
          if (localUser) setUser(JSON.parse(localUser));
        }

        // 2. Fetch bookings
        const userBookings = await fetchMyBookings();
        setBookings(Array.isArray(userBookings) ? userBookings : []);
      } catch (err) {
        console.warn("Could not fetch user bookings:", err);
        // Try fallback with stored phone number
        const localUser = localStorage.getItem("user");
        if (localUser) {
          try {
            const parsed = JSON.parse(localUser);
            setUser(parsed);
            if (parsed.phone) {
              const phoneBookings = await fetchBookingsByPhone(parsed.phone);
              setBookings(Array.isArray(phoneBookings) ? phoneBookings : []);
            }
          } catch (e) {}
        }
      }
    } else {
      // Check if user object was stored
      const localUser = localStorage.getItem("user");
      if (localUser) {
        try {
          const parsed = JSON.parse(localUser);
          setUser(parsed);
          if (parsed.phone) {
            const phoneBookings = await fetchBookingsByPhone(parsed.phone);
            setBookings(Array.isArray(phoneBookings) ? phoneBookings : []);
          }
        } catch (e) {}
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadUserAndBookings();
  }, []);

  // Quick lookup by phone number
  const handlePhoneLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = phoneQuery.trim().replace(/\D/g, "").slice(-10);
    if (!/^\d{10}$/.test(clean)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsSearchingPhone(true);
    try {
      const results = await fetchBookingsByPhone(clean);
      setBookings(Array.isArray(results) ? results : []);
      setPhoneSearchDone(true);
      if (!results || results.length === 0) {
        toast("No bookings found for this mobile number.");
      } else {
        toast.success(`Found ${results.length} booking(s)!`);
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to lookup bookings");
    } finally {
      setIsSearchingPhone(false);
    }
  };

  // Logout
  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "user=; path=/; max-age=0";
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    setUser(null);
    setToken(null);
    setBookings([]);
    toast.success("Logged out successfully");
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] flex flex-col items-center justify-center p-4">
        <Loader2 size={36} className="animate-spin text-[#8CBC67] mb-3" />
        <p className="text-sm font-semibold text-[#202522]">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#202522] py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E8E3]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8CBC67] flex items-center gap-1.5 mb-1">
              <Sparkles size={14} />
              Party Square Customer Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#202522]">
              My Bookings & Profile
            </h1>
          </div>

          {user && (
            <button
              onClick={handleLogout}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold transition cursor-pointer"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          )}
        </div>

        {/* User Account Details Card (If Logged In) */}
        {user ? (
          <div className="overflow-hidden rounded-3xl bg-white border border-[#E8E8E3] shadow-sm">
            <div className="bg-[#EEF6EB]/60 px-6 py-4 border-b border-[#E8E8E3] flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-[#202522]">Customer Account</h2>
                <p className="text-xs text-[#6B706C]">Your verified details and contact records</p>
              </div>
              <span className="text-xs bg-[#8CBC67] text-white font-bold px-3 py-1 rounded-full">
                Active
              </span>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF6EB] flex items-center justify-center text-[#8CBC67] shrink-0">
                    <User size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-[#6B706C] block">Full Name</span>
                    <strong className="text-sm text-[#202522]">{user.name || "Customer"}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF6EB] flex items-center justify-center text-[#8CBC67] shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-[#6B706C] block">Phone Number</span>
                    <strong className="text-sm text-[#202522]">
                      {user.phone ? `+91 ${user.phone}` : "Not linked"}
                    </strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF6EB] flex items-center justify-center text-[#8CBC67] shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-[#6B706C] block">Email Address</span>
                    <strong className="text-sm text-[#202522] truncate block max-w-[200px]">
                      {user.email || "—"}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Phone Lookup / Login Box for Guests */
          <div className="rounded-3xl bg-white border border-[#E8E8E3] p-6 sm:p-8 shadow-sm">
            <div className="max-w-xl">
              <h2 className="text-lg font-bold text-[#202522]">Look Up Your Bookings</h2>
              <p className="text-xs text-[#6B706C] mt-1 leading-relaxed">
                Enter the 10-digit mobile number you entered during checkout to view your confirmed bookings, event schedule, and payment records.
              </p>

              <form onSubmit={handlePhoneLookup} className="mt-4 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#6B706C]">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phoneQuery}
                    onChange={(e) => setPhoneQuery(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full h-12 rounded-2xl border border-[#E8E8E3] bg-[#FCFBF7] pl-12 pr-4 text-sm font-semibold outline-none focus:border-[#8CBC67] focus:ring-2 focus:ring-[#EEF6EB]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSearchingPhone}
                  className="h-12 px-6 rounded-2xl bg-[#8CBC67] hover:bg-[#7AB055] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSearchingPhone ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Search size={16} />
                  )}
                  <span>Find Bookings</span>
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-[#E8E8E3] flex items-center justify-between text-xs text-[#6B706C]">
                <span>Have an account password / OTP?</span>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="font-bold text-[#8CBC67] hover:underline cursor-pointer"
                >
                  Sign in with OTP
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bookings List Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-serif font-bold text-[#202522]">
              Confirmed Bookings ({bookings.length})
            </h3>
            <Link
              href="/"
              className="text-xs font-bold text-[#8CBC67] hover:text-[#7AB055] flex items-center gap-1"
            >
              <span>Book Another Service</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="rounded-3xl bg-white border border-[#E8E8E3] p-10 text-center shadow-sm">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#EEF6EB] flex items-center justify-center mb-4 text-[#8CBC67]">
                <Calendar size={28} />
              </div>
              <h4 className="text-base font-bold text-[#202522]">No Bookings Found Yet</h4>
              <p className="text-xs text-[#6B706C] mt-1 max-w-md mx-auto leading-relaxed">
                {phoneSearchDone
                  ? "We couldn't find any bookings matching this phone number. Make sure you entered the same number used during checkout."
                  : "You haven't placed any decoration bookings yet. Explore our top birthday, anniversary, and festival decoration packages."}
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#8CBC67] hover:bg-[#7AB055] text-white rounded-full font-bold text-xs uppercase tracking-wider transition shadow-sm"
              >
                <span>Browse Decoration Packages</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {bookings.map((booking: any) => {
                const isConfirmed = booking.bookingStatus === "CONFIRMED";
                const isPending = booking.bookingStatus === "PENDING";
                const isCompleted = booking.bookingStatus === "COMPLETED";

                return (
                  <div
                    key={booking._id || booking.bookingId}
                    className="rounded-3xl bg-white border border-[#E8E8E3] p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Status & ID Badge */}
                      <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#E8E8E3]">
                        <div>
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                              isConfirmed
                                ? "bg-green-100 text-green-800"
                                : isCompleted
                                ? "bg-blue-100 text-blue-800"
                                : isPending
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            <CheckCircle2 size={13} />
                            {booking.bookingStatus || "CONFIRMED"}
                          </span>
                          <p className="font-mono text-xs font-semibold text-[#6B706C] mt-2">
                            ID: {booking.bookingId}
                          </p>
                        </div>

                        {booking.productImage && (
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-[#E8E8E3] shrink-0">
                            <img
                              src={booking.productImage}
                              alt={booking.productName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>

                      {/* Theme Name */}
                      <h4 className="mt-3 text-base font-bold text-[#202522] line-clamp-1">
                        {booking.productName}
                      </h4>

                      {/* Event Details */}
                      <div className="mt-4 space-y-2 text-xs text-[#6B706C]">
                        <div className="flex items-center gap-2">
                          <Calendar size={15} className="text-[#8CBC67] shrink-0" />
                          <span className="font-medium text-[#202522]">
                            {booking.eventDate ? new Date(booking.eventDate).toLocaleDateString("en-IN", {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }) : "—"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock size={15} className="text-[#8CBC67] shrink-0" />
                          <span>{booking.eventTimeSlot || "Evening Slot"}</span>
                        </div>

                        <div className="flex items-start gap-2">
                          <MapPin size={15} className="text-[#8CBC67] shrink-0 mt-0.5" />
                          <span className="line-clamp-2">
                            {booking.deliveryAddress || booking.city || "Venue specified"}
                          </span>
                        </div>

                        {booking.specialRequests && (
                          <div className="pt-2 text-[11px] text-[#202522] bg-[#FCFBF7] p-2.5 rounded-xl border border-[#E8E8E3]">
                            <strong>Custom Note:</strong> {booking.specialRequests}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Financial Footer */}
                    <div className="mt-5 pt-4 border-t border-[#E8E8E3] bg-[#FCFBF7] -mx-6 -mb-6 p-4 rounded-b-3xl space-y-1.5 text-xs">
                      <div className="flex justify-between items-center text-[#6B706C]">
                        <span>Total Package:</span>
                        <span className="font-bold text-[#202522]">
                          ₹{(booking.totalAmount || 0).toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-green-700 font-semibold">
                        <span>Advance Paid:</span>
                        <span>₹{(booking.advanceAmountPaid || 0).toLocaleString("en-IN")} (PAID)</span>
                      </div>

                      {booking.onSiteAmountPending > 0 && (
                        <div className="flex justify-between items-center text-amber-800 text-[11px]">
                          <span>On-site Pending:</span>
                          <span className="font-bold">
                            ₹{(booking.onSiteAmountPending || 0).toLocaleString("en-IN")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          loadUserAndBookings();
        }}
      />
    </div>
  );
}