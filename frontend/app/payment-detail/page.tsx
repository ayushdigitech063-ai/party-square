"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useCity } from "../context/CityContext";
import { API_URL } from "@/config";
import LoginModal from "../components/LoginModal";
import toast from "react-hot-toast";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  AlertCircle,
  FileText,
  User,
  Phone,
} from "lucide-react";

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isLoginModalOpen, openLoginModal, closeLoginModal } = useAuth();
  const { selectedCity } = useCity();

  // Product params state
  const [productId, setProductId] = useState(() => searchParams.get("productId") || searchParams.get("id") || "PS-CUSTOM");
  const [productName, setProductName] = useState(() => searchParams.get("name") || "Celebration Decor Package");
  const [productImage, setProductImage] = useState(() => searchParams.get("image") || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80");
  const [baseTotal, setBaseTotal] = useState(() => parseInt(searchParams.get("price") || "12000", 10));

  // Form Fields
  const [eventDate, setEventDate] = useState("");
  const [eventTimeSlot, setEventTimeSlot] = useState("Evening (04:00 PM - 08:00 PM)");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [contactName, setContactName] = useState(user?.name || "");
  const [contactPhone, setContactPhone] = useState(user?.phone || "");
  const [specialRequests, setSpecialRequests] = useState("");

  // Payment Options & Methods
  const [selectedMethod, setSelectedMethod] = useState<"upi" | "card" | "netbanking" | "wallet">("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Coupon
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState<{ text: string; error?: boolean } | null>(null);

  // Status
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Load from sessionStorage draft & normalize URL to clean /payment-detail for SEO
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("ps_booking_draft");
      if (stored) {
        try {
          const draft = JSON.parse(stored);
          if (draft.productId) setProductId(draft.productId);
          if (draft.name) setProductName(draft.name);
          if (draft.image) setProductImage(draft.image);
          if (draft.price) setBaseTotal(Number(draft.price) || 12000);
          if (draft.eventDate) setEventDate(draft.eventDate);
          if (draft.eventTimeSlot) setEventTimeSlot(draft.eventTimeSlot);
        } catch (e) {
          console.error("Error reading booking draft:", e);
        }
      }

      // Automatically clean messy query string from URL bar without page reload
      if (window.location.search) {
        window.history.replaceState({}, "", "/payment-detail");
      }
    }
  }, []);

  // Event date & time fallback from URL query if direct link
  const queryEventDate = searchParams.get("eventDate");
  const queryEventTimeSlot = searchParams.get("eventTimeSlot");

  // Sync user info if loaded after mount
  useEffect(() => {
    if (user) {
      if (!contactName) setContactName(user.name);
      if (!contactPhone && user.phone) setContactPhone(user.phone);
    }
  }, [user]);

  // Set default event date & time slot if not yet populated
  useEffect(() => {
    if (!eventDate) {
      if (queryEventDate) {
        setEventDate(queryEventDate);
      } else {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dateStr = tomorrow.toISOString().split("T")[0];
        setEventDate(dateStr);
      }
    }
    if (queryEventTimeSlot && !eventTimeSlot) {
      setEventTimeSlot(queryEventTimeSlot);
    }
  }, [queryEventDate, queryEventTimeSlot, eventDate, eventTimeSlot]);

  // 50% Advance & 50% On-Site Calculation
  const deliveryCharge = 500;
  const grandTotal = Math.max(0, baseTotal + deliveryCharge - couponDiscount);
  const advanceAmount = Math.round(grandTotal * 0.5);
  const onSitePendingAmount = grandTotal - advanceAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponMsg({ text: "Please enter a valid code", error: true });
      return;
    }
    if (code === "WELCOME1000" || code === "FESTIVE1000") {
      setAppliedCoupon(code);
      setCouponDiscount(1000);
      setCouponMsg({ text: `Coupon '${code}' applied! ₹1,000 saved.` });
    } else if (code === "PARTY500" || code === "FLORAL500") {
      setAppliedCoupon(code);
      setCouponDiscount(500);
      setCouponMsg({ text: `Coupon '${code}' applied! ₹500 saved.` });
    } else {
      setCouponMsg({ text: "Invalid or expired coupon code", error: true });
    }
  };

  const handleConfirmAndPay = async () => {
    setErrorMsg("");

    // Check login
    if (!user) {
      toast.error("Please login to proceed with booking");
      openLoginModal();
      return;
    }

    if (!deliveryAddress.trim()) {
      const msg = "Please provide complete delivery / event venue address";
      setErrorMsg(msg);
      toast.error(msg, { duration: 4000 });
      const el = document.getElementById("delivery-address-input");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus();
      }
      return;
    }

    if (!eventDate) {
      const msg = "Please select your event / celebration date";
      setErrorMsg(msg);
      toast.error(msg, { duration: 4000 });
      return;
    }

    if (!contactName.trim()) {
      const msg = "Please enter customer / contact name";
      setErrorMsg(msg);
      toast.error(msg, { duration: 4000 });
      return;
    }

    if (!contactPhone.trim() || contactPhone.length < 10) {
      const msg = "Please enter a valid 10-digit mobile number";
      setErrorMsg(msg);
      toast.error(msg, { duration: 4000 });
      return;
    }

    setIsProcessing(true);

    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          productName,
          productId,
          productImage,
          city: selectedCity || "Delhi",
          eventDate,
          eventTimeSlot,
          deliveryAddress,
          specialRequests,
          customerName: contactName || user.name,
          customerPhone: contactPhone || user.phone,
          totalAmount: grandTotal,
          advanceAmountPaid: advanceAmount,
          onSiteAmountPending: onSitePendingAmount,
          paymentMethod: selectedMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to submit booking");
      }

      setConfirmedBooking(data.booking);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong while confirming booking");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF7F2] text-[#17130B] pb-20">
      {/* Login Modal Popup if guest tries to book */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSuccess={() => {
          closeLoginModal();
        }}
      />


      {/* BOOKING SUCCESS SCREEN */}
      {confirmedBooking ? (
        <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
          <div className="bg-white rounded-3xl border border-[#E8D8B5] p-8 sm:p-12 text-center shadow-lg animate-scale-up">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 mx-auto flex items-center justify-center text-3xl mb-4">
              <CheckCircle2 size={42} />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
              Booking Confirmed
            </span>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#17130B] mb-2">
              Your Celebration is Booked!
            </h2>
            <p className="text-sm text-[#766F65] max-w-md mx-auto mb-6">
              Thank you, <strong>{confirmedBooking.customerName}</strong>. Your advance booking for <strong>{confirmedBooking.productName}</strong> has been received successfully.
            </p>

            {/* Split Details Card */}
            <div className="bg-[#FAF7F2] border border-[#E8D8B5] rounded-2xl p-5 text-left text-xs sm:text-sm space-y-3 mb-6">
              <div className="flex justify-between pb-2 border-b border-[#E8D8B5]">
                <span className="text-[#766F65]">Booking ID:</span>
                <span className="font-mono font-bold text-neutral-900">{confirmedBooking.bookingId}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#E8D8B5]">
                <span className="text-[#766F65]">Event Date &amp; Slot:</span>
                <span className="font-semibold text-neutral-900">{confirmedBooking.eventDate} ({confirmedBooking.eventTimeSlot})</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#E8D8B5]">
                <span className="text-[#766F65]">City &amp; Venue:</span>
                <span className="font-semibold text-neutral-900">{confirmedBooking.city} • {confirmedBooking.deliveryAddress}</span>
              </div>

              {/* Payment Split Breakdown */}
              <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 space-y-2">
                <div className="flex justify-between font-bold text-neutral-900">
                  <span>Total Event Amount:</span>
                  <span>₹{confirmedBooking.totalAmount?.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-bold text-sm">
                  <span>50% Advance Paid Online:</span>
                  <span>₹{confirmedBooking.advanceAmountPaid?.toLocaleString("en-IN")} (CONFIRMED)</span>
                </div>
                <div className="flex justify-between text-amber-900 font-bold text-sm pt-1 border-t border-amber-200">
                  <span>50% Balance (On-Site Setup):</span>
                  <span>₹{confirmedBooking.onSiteAmountPending?.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-[#766F65]">Transaction ID:</span>
                <span className="font-mono text-xs">{confirmedBooking.transactionId}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 rounded-xl bg-[#8B3F00] hover:bg-[#A0522D] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Back to Home
              </button>
              <button
                onClick={() => router.push("/services")}
                className="px-6 py-3 rounded-xl bg-white border border-[#E8D8B5] hover:bg-neutral-50 text-neutral-800 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Explore More Decor
              </button>
            </div>
          </div>
        </main>
      ) : (
        /* MAIN BOOKING & PAYMENT FORM */
        <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
          
          {/* Guest User Warning Banner */}
          {!user && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                  <User size={20} />
                </div>
                <div>
                  <p className="font-bold text-neutral-900 text-sm">Customer Login Required for Booking</p>
                  <p className="text-xs text-neutral-600">Please login or enter your mobile number to confirm your event slot.</p>
                </div>
              </div>
              <button
                onClick={openLoginModal}
                className="px-5 py-2 rounded-xl bg-neutral-900 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer shrink-0"
              >
                Quick Login
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 shadow-xs animate-in fade-in">
              <div className="flex items-center gap-2.5">
                <AlertCircle size={20} className="text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
              <button
                type="button"
                onClick={() => setErrorMsg("")}
                className="text-rose-500 hover:text-rose-800 text-xs font-bold px-2 py-1 rounded-lg hover:bg-rose-100 transition cursor-pointer"
              >
                ✕ Dismiss
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: EVENT DETAILS & PAYMENT METHOD */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Card 1: Event Schedule & Delivery Details */}
              <div className="bg-white rounded-3xl border border-[#E8D8B5] p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-[#E8D8B5] pb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={20} className="text-[#8B3F00]" />
                    <h2 className="text-lg font-bold text-[#17130B]">Event &amp; Venue Details</h2>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-amber-100 text-amber-900 rounded-full">
                    Location: {selectedCity || "Delhi"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Event Date */}
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-neutral-700">
                      Event / Decoration Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8D8B5] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3F00] bg-[#FFFDF9]"
                    />
                  </div>

                  {/* Time slot */}
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-neutral-700">
                      Setup Time Slot *
                    </label>
                    <select
                      value={eventTimeSlot}
                      onChange={(e) => setEventTimeSlot(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8D8B5] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3F00] bg-[#FFFDF9]"
                    >
                      <option value="Morning (09:00 AM - 01:00 PM)">Morning (09:00 AM - 01:00 PM)</option>
                      <option value="Afternoon (01:00 PM - 04:00 PM)">Afternoon (01:00 PM - 04:00 PM)</option>
                      <option value="Evening (04:00 PM - 08:00 PM)">Evening (04:00 PM - 08:00 PM)</option>
                      <option value="Night (08:00 PM - 11:30 PM)">Night (08:00 PM - 11:30 PM)</option>
                      <option value="Midnight Surprise (11:30 PM - 12:30 AM)">Midnight Surprise (11:30 PM - 12:30 AM)</option>
                    </select>
                  </div>
                </div>

                {/* Contact Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-neutral-700">
                      Customer / Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8D8B5] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3F00] bg-[#FFFDF9]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-neutral-700">
                      Contact Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8D8B5] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3F00] bg-[#FFFDF9]"
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-neutral-700">
                    Full Venue / Delivery Address *
                  </label>
                  <textarea
                    id="delivery-address-input"
                    rows={2}
                    required
                    value={deliveryAddress}
                    onChange={(e) => {
                      setDeliveryAddress(e.target.value);
                      if (errorMsg) setErrorMsg("");
                    }}
                    placeholder="Flat/House No., Building, Street, Landmark, City..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3F00] bg-[#FFFDF9] transition ${
                      !deliveryAddress.trim() && errorMsg.includes("address")
                        ? "border-rose-500 ring-2 ring-rose-100"
                        : "border-[#E8D8B5]"
                    }`}
                  />
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-neutral-700">
                    Special Decor Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Balloon colors preference, surprise entry, etc."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8D8B5] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3F00] bg-[#FFFDF9]"
                  />
                </div>
              </div>

              {/* Card 2: 50% Advance Online Payment Method */}
              <div className="bg-white rounded-3xl border border-[#E8D8B5] p-6 sm:p-8 shadow-xs space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-[#17130B]">Select 50% Advance Payment Method</h2>
                  <p className="text-xs text-[#766F65] mt-0.5">
                    Pay 50% (₹{advanceAmount.toLocaleString("en-IN")}) now to block your date. The remaining 50% (₹{onSitePendingAmount.toLocaleString("en-IN")}) is payable after setup.
                  </p>
                </div>

                {/* Payment Methods Tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* UPI */}
                  <label
                    onClick={() => setSelectedMethod("upi")}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedMethod === "upi" ? "bg-[#FFF8E7] border-[#8B3F00]" : "bg-white border-[#E8D8B5]"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selectedMethod === "upi" ? "border-[#8B3F00] bg-[#8B3F00]" : "border-[#766F65]"
                      }`}
                    >
                      {selectedMethod === "upi" && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-[#17130B]">UPI (Instant)</div>
                      <div className="text-[11px] text-[#766F65]">GPay, PhonePe, Paytm, BHIM</div>
                    </div>
                    <span className="text-xl">⚡</span>
                  </label>

                  {/* Card */}
                  <label
                    onClick={() => setSelectedMethod("card")}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedMethod === "card" ? "bg-[#FFF8E7] border-[#8B3F00]" : "bg-white border-[#E8D8B5]"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selectedMethod === "card" ? "border-[#8B3F00] bg-[#8B3F00]" : "border-[#766F65]"
                      }`}
                    >
                      {selectedMethod === "card" && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-[#17130B]">Debit / Credit Card</div>
                      <div className="text-[11px] text-[#766F65]">Visa, Mastercard, RuPay</div>
                    </div>
                    <span className="text-xl">💳</span>
                  </label>
                </div>

                {/* UPI form */}
                {selectedMethod === "upi" && (
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs font-semibold text-[#17130B]">
                      Enter UPI ID / VPA
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okaxis / mobile@upi"
                        className="flex-1 px-4 py-2.5 rounded-xl border border-[#E8D8B5] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3F00] bg-[#FFFDF9]"
                      />
                    </div>
                    <p className="text-[11px] text-[#766F65]">
                      Or scan the QR code or approve the mandate prompt on your UPI app.
                    </p>
                  </div>
                )}

                {/* Card Form */}
                {selectedMethod === "card" && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#17130B] mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 •••• •••• ••••"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8D8B5] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#8B3F00] bg-[#FFFDF9]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#17130B] mb-1">Expiry Date</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          placeholder="MM / YY"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E8D8B5] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#8B3F00] bg-[#FFFDF9]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#17130B] mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E8D8B5] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#8B3F00] bg-[#FFFDF9]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: 50% ADVANCE SUMMARY & CONFIRM BUTTON */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Order Summary Card */}
              <div className="bg-white rounded-3xl border border-[#E8D8B5] p-6 sm:p-7 shadow-xs space-y-5">
                <h3 className="font-serif font-bold text-lg text-neutral-900 border-b border-[#E8D8B5] pb-3">
                  Booking Summary
                </h3>

                {/* Selected Item */}
                <div className="flex gap-3.5 items-center">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 border border-[#E8D8B5] shrink-0">
                    <img src={productImage} alt={productName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#17130B] line-clamp-2 leading-tight">
                      {productName}
                    </h4>
                    <p className="text-xs text-[#766F65] mt-1">
                      Event Package Base: ₹{baseTotal.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Split Policy Highlight */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <Sparkles size={15} />
                    <span>50% Advance &amp; 50% On-Site Policy</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-amber-800/90">
                    Pay 50% now to confirm decorators slot. Balance 50% is verified &amp; paid on-site upon event decoration completion.
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2.5 text-xs sm:text-sm border-t border-[#E8D8B5] pt-4">
                  <div className="flex justify-between text-[#766F65]">
                    <span>Package Price</span>
                    <span className="font-medium text-neutral-900">₹{baseTotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between text-[#766F65]">
                    <span>Setup &amp; Delivery Fee</span>
                    <span className="font-medium text-neutral-900">₹{deliveryCharge}</span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Coupon Discount ({appliedCoupon})</span>
                      <span>- ₹{couponDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-bold text-base text-neutral-900 pt-2 border-t border-[#E8D8B5]">
                    <span>Total Event Cost</span>
                    <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>

                  {/* 50% Advance Split Display */}
                  <div className="pt-3 border-t border-dashed border-[#E8D8B5] space-y-2">
                    <div className="flex justify-between items-center text-sm font-extrabold text-[#8B3F00] bg-amber-100/60 p-2.5 rounded-xl border border-amber-300">
                      <span>50% Advance (Pay Now):</span>
                      <span className="text-lg">₹{advanceAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold text-neutral-600 px-2.5">
                      <span>50% On-Site Pending:</span>
                      <span>₹{onSitePendingAmount.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>



                {/* PAY NOW 50% ADVANCE BUTTON */}
                <div className="pt-2">
                  <button
                    onClick={handleConfirmAndPay}
                    disabled={isProcessing}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#8B3F00] to-[#B47A00] text-white font-bold text-sm tracking-wider shadow-lg hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin">⚙</span>
                        <span>CONFIRMING EVENT...</span>
                      </>
                    ) : (
                      <>
                        <span>PAY 50% ADVANCE (₹{advanceAmount.toLocaleString("en-IN")})</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-center text-[#766F65]">
                  🔒 Instant booking confirmation SMS &amp; email sent upon advance receipt.
                </p>
              </div>

            </div>

          </div>
        </main>
      )}
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-bold">Loading payment portal...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
