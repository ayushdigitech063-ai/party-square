"use client";

import React, { Suspense, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Lock,
  Smartphone,
  Wallet,
  Building2,
  ShieldCheck,
  Tag,
  Loader2,
  AlertCircle,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  FileText,
  Sparkles,
} from "lucide-react";

import { getProductById } from "@/app/data/productResolver";
import { fetchProductByIdOrSlug, createBooking } from "@/app/lib/api";
import { useCity } from "@/app/context/CityContext";
import LoginModal from "@/app/components/LoginModal";

type PaymentMethod = "upi" | "card" | "netbanking" | "wallet";
type PaymentPlan = "advance" | "full";

const TIME_SLOTS = [
  "Morning (09:00 AM - 01:00 PM)",
  "Afternoon (01:00 PM - 05:00 PM)",
  "Evening (04:00 PM - 08:00 PM)",
  "Late Evening / Night (08:00 PM - 11:30 PM)",
];

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedCity } = useCity();

  // Search params
  const productId = searchParams.get("productId") || "";
  const initialDate = searchParams.get("date") || "";
  const initialSlot = searchParams.get("slot") || "";
  const initialPincode = searchParams.get("pincode") || "";
  const paramName = searchParams.get("name") || "";
  const paramPrice = searchParams.get("price") || "";
  const paramImage = searchParams.get("image") || "";

  // Product state
  const [product, setProduct] = useState<any>(() => {
    if (paramName && paramPrice) {
      return {
        id: productId || "pkg-" + Date.now(),
        name: paramName,
        price: Number(paramPrice.toString().replace(/[^0-9]/g, '')) || 0,
        image: paramImage || "/walldecoration.png",
        category: "Decoration Package",
        subcategory: "Exclusive Theme",
      };
    }
    return getProductById(productId) || null;
  });
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  // Customer & Event details state
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [eventDate, setEventDate] = useState(initialDate);
  const [eventTimeSlot, setEventTimeSlot] = useState(
    initialSlot || TIME_SLOTS[2]
  );
  const [venueAddress, setVenueAddress] = useState("");
  const [city, setCity] = useState(selectedCity || "Delhi");
  const [pincode, setPincode] = useState(initialPincode);
  const [specialRequests, setSpecialRequests] = useState("");

  // Payment plan: 50% Advance (Industry Standard) or 100% Full Payment
  const [paymentPlan, setPaymentPlan] = useState<PaymentPlan>("advance");

  // Payment Method states
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");

  // Coupon states
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState<{ text: string; error?: boolean } | null>(null);

  // Flow & processing states
  const [paymentMsg, setPaymentMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Generate fallback transaction ID
  const [transactionId] = useState(() => `TXN_PS_${Math.floor(100000 + Math.random() * 900000)}`);

  // Load product if dynamic or from MongoDB
  useEffect(() => {
    async function resolveProduct() {
      if (!product) {
        if (paramName && paramPrice) {
          setProduct({
            id: productId || "pkg-" + Date.now(),
            name: paramName,
            price: Number(paramPrice.toString().replace(/[^0-9]/g, '')) || 0,
            image: paramImage || "/walldecoration.png",
            category: "Decoration Package",
            subcategory: "Exclusive Theme",
          });
          return;
        }
        if (productId) {
          setIsLoadingProduct(true);
          try {
            const apiProduct = await fetchProductByIdOrSlug(productId);
            if (apiProduct) {
              setProduct({
                id: apiProduct._id || apiProduct.id,
                name: apiProduct.name,
                price: apiProduct.price,
                image: apiProduct.images?.[0] || apiProduct.image || "/birthdaydesign.png",
                category: apiProduct.category?.name || "Decoration",
                subcategory: apiProduct.subcategory?.name || "",
              });
            }
          } catch (err) {
            console.warn("Could not load product from API:", err);
          } finally {
            setIsLoadingProduct(false);
          }
        }
      }
    }
    resolveProduct();
  }, [productId, product, paramName, paramPrice, paramImage]);

  // Sync city and auto-load logged in customer details
  useEffect(() => {
    if (selectedCity) {
      setCity(selectedCity);
    }

    const checkLogin = () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
      if (token) {
        setIsLoggedIn(true);
        if (userStr) {
          try {
            const u = JSON.parse(userStr);
            if (u.name) setCustomerName((prev) => prev || u.name);
            if (u.phone) setCustomerPhone((prev) => prev || u.phone);
            if (u.email) setCustomerEmail((prev) => prev || u.email);
          } catch (e) {}
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLogin();
    window.addEventListener("auth-changed", checkLogin);
    window.addEventListener("storage", checkLogin);
    return () => {
      window.removeEventListener("auth-changed", checkLogin);
      window.removeEventListener("storage", checkLogin);
    };
  }, [selectedCity]);

  // Loading product state
  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] flex flex-col items-center justify-center p-4">
        <Loader2 size={36} className="animate-spin text-[#8CBC67] mb-3" />
        <p className="text-sm font-semibold text-[#202522]">Loading booking details...</p>
      </div>
    );
  }

  // Product not found fallback
  if (!product) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#E8E8E3] shadow-sm p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#EEF6EB] flex items-center justify-center mb-5">
            <AlertCircle size={30} className="text-[#8CBC67]" />
          </div>

          <h1 className="text-2xl font-bold text-[#202522]">Package Not Found</h1>

          <p className="text-sm text-[#6B706C] mt-3 leading-relaxed">
            The selected decoration package could not be found or has expired. Please choose a package to continue.
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 mt-6 px-6 py-3 rounded-full bg-[#8CBC67] text-white text-sm font-semibold hover:bg-[#7AB055] transition"
          >
            <ArrowLeft size={16} />
            Explore Decorations
          </Link>
        </div>
      </div>
    );
  }

  // Financial calculations
  const productName = product.name;
  const productImage = product.image || "/birthdaydesign.png";
  const productCategory = product.subcategory || product.category || "Event Decoration";
  const baseTotal = Number(product.price) || 0;
  const deliveryCharge = 0; // Free delivery & setup included

  const finalTotal = Math.max(0, baseTotal + deliveryCharge - couponDiscount);
  const advanceAmountPayable = paymentPlan === "advance" ? Math.round(finalTotal * 0.5) : finalTotal;
  const pendingOnSite = finalTotal - advanceAmountPayable;

  // Coupons
  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    setCouponMsg(null);

    if (!code) {
      setCouponMsg({ text: "Please enter a coupon code.", error: true });
      return;
    }

    const coupons: Record<string, number> = {
      WELCOME1000: 1000,
      FESTIVE1000: 1000,
      PARTY500: 500,
      FLORAL500: 500,
      DREAM10: Math.round(baseTotal * 0.1),
    };

    const discount = coupons[code];

    if (!discount) {
      setAppliedCoupon(null);
      setCouponDiscount(0);
      setCouponMsg({ text: "Invalid coupon code.", error: true });
      return;
    }

    setAppliedCoupon(code);
    setCouponDiscount(discount);
    setCouponMsg({
      text: `Coupon applied successfully! You saved ₹${discount.toLocaleString("en-IN")}.`,
    });
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponCode("");
    setCouponMsg(null);
  };

  // Payment method validation
  const validatePayment = (): string | null => {
    // 1. Customer Details Validation
    if (!customerName.trim()) {
      return "Please enter your full name.";
    }

    const cleanPhone = customerPhone.replace(/\D/g, "");
    if (!/^\d{10}$/.test(cleanPhone.slice(-10))) {
      return "Please enter a valid 10-digit mobile number for booking updates.";
    }

    if (!eventDate.trim()) {
      return "Please select your event date.";
    }

    if (!venueAddress.trim() || venueAddress.trim().length < 5) {
      return "Please enter a complete venue address (house/flat no, street, area).";
    }

    // 2. Payment Method Validation
    if (selectedMethod === "upi") {
      if (!upiId.trim()) {
        return "Please enter your UPI ID.";
      }
      if (!/^[\w.-]+@[\w.-]+$/.test(upiId.trim())) {
        return "Please enter a valid UPI ID (e.g. yourname@oksbi or 9876543210@paytm).";
      }
    }

    if (selectedMethod === "card") {
      const digits = cardNumber.replace(/\s/g, "");
      if (!/^\d{12,19}$/.test(digits)) {
        return "Please enter a valid card number.";
      }
      if (!cardHolder.trim()) {
        return "Please enter the cardholder name.";
      }
      if (!/^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/.test(expiry.trim())) {
        return "Please enter expiry as MM / YY.";
      }
      if (!/^\d{3,4}$/.test(cvv)) {
        return "Please enter a valid CVV.";
      }
    }

    if (selectedMethod === "netbanking" && !selectedBank) {
      return "Please select your bank.";
    }

    if (selectedMethod === "wallet" && !selectedWallet) {
      return "Please select a wallet.";
    }

    return null;
  };

  // Pay and Confirm Booking
  const handlePayNow = async () => {
    setPaymentMsg(null);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      toast.error("Please login to proceed with your booking", { id: "payment-login-req" });
      setShowLoginModal(true);
      return;
    }

    const validationError = validatePayment();
    if (validationError) {
      setPaymentMsg(validationError);
      toast.error(validationError);
      return;
    }

    setIsProcessing(true);

    try {
      const cleanPhone = customerPhone.replace(/\D/g, "").slice(-10);
      const fullDeliveryAddress = `${venueAddress.trim()}${pincode ? `, Pincode: ${pincode}` : ""}, City: ${city}`;

      const res = await createBooking({
        productName,
        productId: product.id || product._id || productId,
        productImage,
        city: city || selectedCity || "Delhi",
        eventDate,
        eventTimeSlot,
        deliveryAddress: fullDeliveryAddress,
        specialRequests,
        totalAmount: finalTotal,
        advanceAmountPaid: advanceAmountPayable,
        onSiteAmountPending: pendingOnSite,
        paymentMethod: selectedMethod,
        customerPhone: cleanPhone,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim() || `customer_${cleanPhone}@partysquare.in`,
      });

      if (res.token) {
        document.cookie = `token=${res.token}; path=/; max-age=2592000`;
        localStorage.setItem("token", res.token);
      }
      if (res.user) {
        document.cookie = `user=${encodeURIComponent(JSON.stringify(res.user))}; path=/; max-age=2592000`;
        localStorage.setItem("user", JSON.stringify(res.user));
      }

      setCreatedBooking(res.booking);
      setPaymentSuccess(true);
      toast.success("Booking confirmed successfully!");
    } catch (err: any) {
      console.error("Booking failed:", err);
      const msg = err?.message || "Failed to confirm booking. Please try again.";
      setPaymentMsg(msg);
      toast.error(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  // ============================================================
  // CONFIRMATION SCREEN (SUCCESS)
  // ============================================================
  if (paymentSuccess) {
    const bookingId = createdBooking?.bookingId || transactionId;
    const finalEventDate = createdBooking?.eventDate || eventDate;
    const finalSlot = createdBooking?.eventTimeSlot || eventTimeSlot;

    return (
      <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-lg border border-[#8CBC67]/30 p-8 md:p-10 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#EEF6EB] flex items-center justify-center mb-5 ring-8 ring-[#EEF6EB]/50">
            <CheckCircle2 size={46} className="text-[#8CBC67]" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF6EB] text-[#8CBC67] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={13} />
            Booking Confirmed & Recorded
          </span>

          <h1 className="text-3xl md:text-4xl font-bold font-serif text-[#202522]">
            Celebration is Set!
          </h1>

          <p className="text-sm text-[#6B706C] mt-2 max-w-lg mx-auto leading-relaxed">
            Thank you, <strong className="text-[#202522]">{customerName || "Customer"}</strong>! Your decoration slot has been confirmed and saved to your account.
          </p>

          {/* Booking Summary Card */}
          <div className="mt-8 rounded-2xl bg-[#FCFBF7] border border-[#E8E8E3] p-6 text-left space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E8E8E3] gap-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#6B706C] font-semibold">Booking ID</p>
                <p className="font-mono text-base font-bold text-[#202522]">{bookingId}</p>
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wide self-start sm:self-auto">
                {createdBooking?.bookingStatus || "CONFIRMED"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs sm:text-sm">
              <div>
                <span className="text-[#6B706C] block text-xs">Decoration Package:</span>
                <strong className="text-[#202522] line-clamp-1">{productName}</strong>
              </div>

              <div>
                <span className="text-[#6B706C] block text-xs">Customer Mobile:</span>
                <strong className="text-[#202522]">+91 {customerPhone}</strong>
              </div>

              <div>
                <span className="text-[#6B706C] block text-xs">Event Date & Slot:</span>
                <strong className="text-[#202522]">{finalEventDate} ({finalSlot})</strong>
              </div>

              <div>
                <span className="text-[#6B706C] block text-xs">Setup City & Venue:</span>
                <strong className="text-[#202522] line-clamp-1">{city} - {venueAddress}</strong>
              </div>
            </div>

            <div className="border-t border-[#E8E8E3] pt-4 mt-2 space-y-2 text-sm">
              <div className="flex justify-between items-center text-[#6B706C]">
                <span>Total Package Price:</span>
                <span className="font-medium text-[#202522]">₹{finalTotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between items-center text-green-700 font-bold">
                <span>Advance Paid ({selectedMethod.toUpperCase()}):</span>
                <span>₹{advanceAmountPayable.toLocaleString("en-IN")} (PAID)</span>
              </div>

              {pendingOnSite > 0 && (
                <div className="flex justify-between items-center text-amber-700 text-xs">
                  <span>Balance Pending (On-site after setup):</span>
                  <span className="font-bold">₹{pendingOnSite.toLocaleString("en-IN")}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 mt-8">
            <Link
              href="/profile"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full text-white font-bold text-sm bg-[#8CBC67] hover:bg-[#7AB055] transition shadow-md"
            >
              <CheckCircle2 size={17} />
              View in My Bookings
            </Link>

            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-[#E8E8E3] text-[#202522] font-semibold text-sm hover:bg-[#EEF6EB] transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // MAIN CHECKOUT & BOOKING PAGE
  // ============================================================
  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#202522]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-[#6B706C]">
          <Link href="/" className="hover:text-[#202522] transition">Home</Link>
          <span>/</span>
          <span>Checkout & Booking</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_390px] gap-8">
          {/* ====================================================
              LEFT COLUMN: CUSTOMER, VENUE & PAYMENT DETAILS
          ==================================================== */}
          <div className="space-y-6">

            {/* 1. Customer Contact Details */}
            <section className="bg-white rounded-3xl border border-[#E8E8E3] shadow-sm p-6 sm:p-7">
              <div className="flex items-center gap-3 pb-5 border-b border-[#E8E8E3]">
                <div className="w-10 h-10 rounded-2xl bg-[#EEF6EB] flex items-center justify-center text-[#8CBC67]">
                  <User size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#202522]">1. Customer Information</h2>
                  <p className="text-xs text-[#6B706C]">Your booking & invoice will be linked to this contact</p>
                </div>
              </div>

              {!isLoggedIn ? (
                <div className="mt-4 p-3.5 rounded-2xl bg-[#EEF6EB] border border-[#8CBC67]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#8CBC67] text-white flex items-center justify-center shrink-0">
                      <Lock size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#202522]">Login Required to Book</p>
                      <p className="text-[11px] text-[#6B706C]">Login to auto-fill details and confirm your slot instantly</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowLoginModal(true)}
                    className="px-4 py-2 rounded-full bg-[#8CBC67] hover:bg-[#7AB055] text-white text-xs font-bold transition shadow-sm shrink-0 cursor-pointer text-center"
                  >
                    Login / Register
                  </button>
                </div>
              ) : (
                <div className="mt-4 p-3 rounded-2xl bg-[#EEF6EB]/60 border border-[#8CBC67]/20 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-[#202522]">
                    <CheckCircle2 size={16} className="text-[#8CBC67] shrink-0" />
                    <span>Logged in as <strong>{customerName || "Customer"}</strong> {customerPhone ? `(+91 ${customerPhone})` : ""}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowLoginModal(true)}
                    className="text-[11px] text-[#8CBC67] font-semibold hover:underline cursor-pointer shrink-0"
                  >
                    Switch Account
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <div>
                  <label className="block text-xs font-bold text-[#6B706C] mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      setPaymentMsg(null);
                    }}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-4 text-sm outline-none focus:border-[#8CBC67] focus:ring-2 focus:ring-[#EEF6EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6B706C] mb-1.5">
                    10-Digit Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#6B706C]">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      autoComplete="off"
                      maxLength={10}
                      value={customerPhone}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                        setPaymentMsg(null);
                      }}
                      placeholder="98765 43210"
                      className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] pl-12 pr-4 text-sm font-semibold outline-none focus:border-[#8CBC67] focus:ring-2 focus:ring-[#EEF6EB]"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#6B706C] mb-1.5">
                    Email Address <span className="text-[#6B706C] font-normal">(Optional, for invoice)</span>
                  </label>
                  <input
                    type="email"
                    autoComplete="off"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-4 text-sm outline-none focus:border-[#8CBC67] focus:ring-2 focus:ring-[#EEF6EB]"
                  />
                </div>
              </div>
            </section>

            {/* 2. Event & Venue Details */}
            <section className="bg-white rounded-3xl border border-[#E8E8E3] shadow-sm p-6 sm:p-7">
              <div className="flex items-center gap-3 pb-5 border-b border-[#E8E8E3]">
                <div className="w-10 h-10 rounded-2xl bg-[#EEF6EB] flex items-center justify-center text-[#8CBC67]">
                  <Calendar size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#202522]">2. Event Schedule & Venue</h2>
                  <p className="text-xs text-[#6B706C]">Specify where and when the decoration should be installed</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <div>
                  <label className="block text-xs font-bold text-[#6B706C] mb-1.5">
                    Event Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={eventDate}
                    onChange={(e) => {
                      setEventDate(e.target.value);
                      setPaymentMsg(null);
                    }}
                    className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-4 text-sm outline-none focus:border-[#8CBC67] focus:ring-2 focus:ring-[#EEF6EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6B706C] mb-1.5">
                    Preferred Time Slot <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={eventTimeSlot}
                    onChange={(e) => setEventTimeSlot(e.target.value)}
                    className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-4 text-sm outline-none focus:border-[#8CBC67]"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#6B706C] mb-1.5">
                    Full Venue / Setup Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={venueAddress}
                    onChange={(e) => {
                      setVenueAddress(e.target.value);
                      setPaymentMsg(null);
                    }}
                    placeholder="Flat / House No, Building Name, Street / Landmark, Area..."
                    className="w-full rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] p-3 text-sm outline-none focus:border-[#8CBC67] focus:ring-2 focus:ring-[#EEF6EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6B706C] mb-1.5">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Delhi, Mumbai, etc."
                    className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-4 text-sm outline-none focus:border-[#8CBC67]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6B706C] mb-1.5">
                    Pincode
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="e.g. 110001"
                    className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-4 text-sm outline-none focus:border-[#8CBC67]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#6B706C] mb-1.5">
                    Special Requests / Customization Notes <span className="text-[#6B706C] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Color preference: Gold & White, Age number: 25, Surprise setup"
                    className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-4 text-sm outline-none focus:border-[#8CBC67]"
                  />
                </div>
              </div>
            </section>

            {/* 3. Payment Plan (50% Advance vs Full) */}
            <section className="bg-white rounded-3xl border border-[#E8E8E3] shadow-sm p-6 sm:p-7">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E3]">
                <div>
                  <h2 className="text-base font-bold text-[#202522]">3. Select Payment Plan</h2>
                  <p className="text-xs text-[#6B706C]">Choose how you want to complete payment</p>
                </div>
                <span className="text-xs bg-[#EEF6EB] text-[#8CBC67] font-bold px-3 py-1 rounded-full">
                  100% Risk Free
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5">
                {/* 50% Advance Option */}
                <button
                  type="button"
                  onClick={() => setPaymentPlan("advance")}
                  className={`text-left p-4 rounded-2xl border transition relative ${
                    paymentPlan === "advance"
                      ? "border-[#8CBC67] bg-[#EEF6EB]/60 ring-2 ring-[#8CBC67]/30"
                      : "border-[#E8E8E3] hover:border-[#8CBC67]/50"
                  }`}
                >
                  <span className="absolute -top-2.5 right-3 bg-[#8CBC67] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Recommended
                  </span>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentPlan === "advance" ? "border-[#8CBC67] bg-[#8CBC67]" : "border-gray-400"
                    }`}>
                      {paymentPlan === "advance" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm font-bold text-[#202522]">50% Advance Booking</span>
                  </div>
                  <p className="text-xs text-[#6B706C] mt-2">
                    Pay <strong className="text-[#202522]">₹{Math.round(finalTotal * 0.5).toLocaleString("en-IN")}</strong> now to confirm team & slot.
                  </p>
                  <p className="text-[11px] text-green-700 font-semibold mt-1">
                    Remaining ₹{(finalTotal - Math.round(finalTotal * 0.5)).toLocaleString("en-IN")} paid at venue after setup!
                  </p>
                </button>

                {/* 100% Full Payment Option */}
                <button
                  type="button"
                  onClick={() => setPaymentPlan("full")}
                  className={`text-left p-4 rounded-2xl border transition ${
                    paymentPlan === "full"
                      ? "border-[#8CBC67] bg-[#EEF6EB]/60 ring-2 ring-[#8CBC67]/30"
                      : "border-[#E8E8E3] hover:border-[#8CBC67]/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentPlan === "full" ? "border-[#8CBC67] bg-[#8CBC67]" : "border-gray-400"
                    }`}>
                      {paymentPlan === "full" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm font-bold text-[#202522]">100% Full Payment</span>
                  </div>
                  <p className="text-xs text-[#6B706C] mt-2">
                    Pay entire <strong className="text-[#202522]">₹{finalTotal.toLocaleString("en-IN")}</strong> online.
                  </p>
                  <p className="text-[11px] text-[#6B706C] mt-1">
                    Zero hassle on the day of event!
                  </p>
                </button>
              </div>
            </section>

            {/* 4. Payment Method Options */}
            <section className="bg-white rounded-3xl border border-[#E8E8E3] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#E8E8E3]">
                <h2 className="text-base font-bold text-[#202522]">4. Payment Method</h2>
                <p className="text-xs text-[#6B706C] mt-0.5">Select how you want to pay</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* UPI */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMethod("upi");
                      setPaymentMsg(null);
                    }}
                    className={`rounded-2xl border p-4 text-left transition ${
                      selectedMethod === "upi"
                        ? "border-[#8CBC67] bg-[#EEF6EB]"
                        : "border-[#E8E8E3] hover:border-[#8CBC67]"
                    }`}
                  >
                    <Smartphone
                      size={22}
                      className={selectedMethod === "upi" ? "text-[#8CBC67]" : "text-[#6B706C]"}
                    />
                    <p className="text-sm font-semibold mt-3">UPI</p>
                    <p className="text-[11px] text-[#6B706C] mt-0.5">GPay, PhonePe</p>
                  </button>

                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMethod("card");
                      setPaymentMsg(null);
                    }}
                    className={`rounded-2xl border p-4 text-left transition ${
                      selectedMethod === "card"
                        ? "border-[#8CBC67] bg-[#EEF6EB]"
                        : "border-[#E8E8E3] hover:border-[#8CBC67]"
                    }`}
                  >
                    <CreditCard
                      size={22}
                      className={selectedMethod === "card" ? "text-[#8CBC67]" : "text-[#6B706C]"}
                    />
                    <p className="text-sm font-semibold mt-3">Card</p>
                    <p className="text-[11px] text-[#6B706C] mt-0.5">Credit / Debit</p>
                  </button>

                  {/* Net Banking */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMethod("netbanking");
                      setPaymentMsg(null);
                    }}
                    className={`rounded-2xl border p-4 text-left transition ${
                      selectedMethod === "netbanking"
                        ? "border-[#8CBC67] bg-[#EEF6EB]"
                        : "border-[#E8E8E3] hover:border-[#8CBC67]"
                    }`}
                  >
                    <Building2
                      size={22}
                      className={selectedMethod === "netbanking" ? "text-[#8CBC67]" : "text-[#6B706C]"}
                    />
                    <p className="text-sm font-semibold mt-3">Net Banking</p>
                    <p className="text-[11px] text-[#6B706C] mt-0.5">All major banks</p>
                  </button>

                  {/* Wallet */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMethod("wallet");
                      setPaymentMsg(null);
                    }}
                    className={`rounded-2xl border p-4 text-left transition ${
                      selectedMethod === "wallet"
                        ? "border-[#8CBC67] bg-[#EEF6EB]"
                        : "border-[#E8E8E3] hover:border-[#8CBC67]"
                    }`}
                  >
                    <Wallet
                      size={22}
                      className={selectedMethod === "wallet" ? "text-[#8CBC67]" : "text-[#6B706C]"}
                    />
                    <p className="text-sm font-semibold mt-3">Wallet</p>
                    <p className="text-[11px] text-[#6B706C] mt-0.5">Paytm, Amazon</p>
                  </button>
                </div>

                {/* Sub-inputs for Selected Method */}
                <div className="mt-6 pt-5 border-t border-[#E8E8E3]">
                  {selectedMethod === "upi" && (
                    <div>
                      <label className="block text-xs font-bold text-[#6B706C] mb-2">
                        Enter UPI ID (Virtual Payment Address)
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => {
                          setUpiId(e.target.value);
                          setPaymentMsg(null);
                        }}
                        placeholder="yourname@okaxis or 9876543210@paytm"
                        className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-4 text-sm outline-none focus:border-[#8CBC67] focus:ring-2 focus:ring-[#EEF6EB]"
                      />
                      <p className="text-xs text-[#6B706C] mt-2">
                        A payment request will be sent directly to your UPI app.
                      </p>
                    </div>
                  )}

                  {selectedMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-[#6B706C] mb-1.5">Card Number</label>
                        <input
                          type="text"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => {
                            setCardNumber(e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim());
                            setPaymentMsg(null);
                          }}
                          placeholder="4532 â€¢â€¢â€¢â€¢ â€¢â€¢â€¢â€¢ 8901"
                          className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-4 text-sm outline-none focus:border-[#8CBC67]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-[#6B706C] mb-1.5">Cardholder Name</label>
                          <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-4 text-sm outline-none focus:border-[#8CBC67]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-bold text-[#6B706C] mb-1.5">Expiry</label>
                            <input
                              type="text"
                              maxLength={5}
                              value={expiry}
                              onChange={(e) => setExpiry(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-3 text-sm outline-none focus:border-[#8CBC67]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#6B706C] mb-1.5">CVV</label>
                            <input
                              type="password"
                              maxLength={4}
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                              placeholder="â€¢â€¢â€¢"
                              className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-3 text-sm outline-none focus:border-[#8CBC67]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMethod === "netbanking" && (
                    <div>
                      <label className="block text-xs font-bold text-[#6B706C] mb-2">Select Your Bank</label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-4 text-sm outline-none focus:border-[#8CBC67]"
                      >
                        <option value="">-- Choose Bank --</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}

                  {selectedMethod === "wallet" && (
                    <div className="grid grid-cols-3 gap-3">
                      {["Paytm Wallet", "Amazon Pay", "PhonePe Wallet"].map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setSelectedWallet(w)}
                          className={`p-3 rounded-xl border text-xs font-bold transition ${
                            selectedWallet === w
                              ? "border-[#8CBC67] bg-[#EEF6EB] text-[#202522]"
                              : "border-[#E8E8E3] hover:border-[#8CBC67]"
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Payment Error message */}
                  {paymentMsg && (
                    <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 p-3">
                      <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                      <p className="text-xs text-red-700 font-medium">{paymentMsg}</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Trust badge */}
            <div className="rounded-2xl bg-[#EEF6EB]/60 border border-[#E8E8E3] p-4 flex items-center gap-3">
              <ShieldCheck size={24} className="text-[#8CBC67] shrink-0" />
              <p className="text-xs text-[#6B706C]">
                <strong>Party Square Assurance:</strong> Verified decorators, on-time setup, and hassle-free cancellation support.
              </p>
            </div>
          </div>

          {/* ====================================================
              RIGHT COLUMN: ORDER SUMMARY & CONFIRM BUTTON
          ==================================================== */}
          <aside className="lg:sticky lg:top-6 h-fit">
            <section className="bg-white rounded-3xl border border-[#E8E8E3] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#E8E8E3]">
                <h2 className="text-lg font-bold text-[#202522]">Order Summary</h2>
              </div>

              <div className="p-6">
                {/* Product Info */}
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#FCFBF7] shrink-0 border border-[#E8E8E3]">
                    <img
                      src={productImage}
                      alt={productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-[#8CBC67] font-bold">
                      {productCategory}
                    </p>
                    <h3 className="font-bold text-sm text-[#202522] leading-snug mt-1 line-clamp-2">
                      {productName}
                    </h3>
                    <p className="text-sm font-bold text-[#202522] mt-1.5">
                      ₹{baseTotal.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Coupon Code Input */}
                <div className="mt-5 pt-5 border-t border-[#E8E8E3]">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 px-3.5 py-2.5 rounded-xl border border-emerald-200">
                      <div className="flex items-center gap-2">
                        <Tag size={14} />
                        <span className="text-xs font-bold uppercase">{appliedCoupon} Applied</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon (e.g. PARTY500)"
                        className="flex-1 border border-[#E8E8E3] rounded-xl px-3.5 py-2 text-xs uppercase focus:outline-none focus:border-[#8CBC67]"
                      />
                      <button
                        type="button"
                        onClick={applyCoupon}
                        className="bg-[#202522] text-white hover:bg-black px-4 py-2 rounded-xl text-xs font-bold transition"
                      >
                        Apply
                      </button>
                    </div>
                  )}

                  {couponMsg && (
                    <p className={`text-xs mt-2 ${couponMsg.error ? "text-red-600" : "text-emerald-700 font-semibold"}`}>
                      {couponMsg.text}
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="mt-5 pt-4 border-t border-[#E8E8E3] space-y-2.5 text-xs text-[#6B706C]">
                  <div className="flex justify-between">
                    <span>Package Price:</span>
                    <span className="font-semibold text-[#202522]">₹{baseTotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery & Installation:</span>
                    <span className="font-semibold text-emerald-700">FREE</span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Coupon Discount:</span>
                      <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-2 border-t border-dashed border-[#E8E8E3] text-sm font-bold text-[#202522]">
                    <span>Total Package Price:</span>
                    <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Amount Payable Box */}
                <div className="mt-5 p-4 rounded-2xl bg-[#EEF6EB] border border-[#8CBC67]/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-[#8CBC67]">
                        {paymentPlan === "advance" ? "50% Advance Payable Today" : "Total Payable Online"}
                      </p>
                      <p className="text-xs text-[#6B706C]">To confirm your decoration slot</p>
                    </div>
                    <span className="text-2xl font-bold font-serif text-[#202522]">
                      ₹{advanceAmountPayable.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {pendingOnSite > 0 && (
                    <div className="pt-2 border-t border-[#8CBC67]/20 flex justify-between text-[11px] text-amber-800">
                      <span>Pending at Venue (Post Setup):</span>
                      <span className="font-bold">₹{pendingOnSite.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                </div>

                {/* Pay and Confirm Button */}
                <button
                  type="button"
                  onClick={handlePayNow}
                  disabled={isProcessing}
                  className="w-full mt-5 h-14 rounded-2xl bg-[#8CBC67] hover:bg-[#7AB055] text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition shadow-md cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Confirming Booking...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      <span>Confirm & Pay ₹{advanceAmountPayable.toLocaleString("en-IN")}</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#6B706C] mt-3.5 leading-relaxed">
                  By clicking, your booking will be confirmed and added to your <strong>My Bookings</strong> account.
                </p>
              </div>
            </section>
          </aside>
        </div>
      </main>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        redirectTo={null}
        onSuccess={(loggedUser) => {
          setIsLoggedIn(true);
          setShowLoginModal(false);
          if (loggedUser) {
            if (loggedUser.name) setCustomerName(loggedUser.name);
            if (loggedUser.phone) setCustomerPhone(loggedUser.phone);
            if (loggedUser.email) setCustomerEmail(loggedUser.email);
          }
          toast.success("Logged in successfully! You can now complete your booking.");
        }}
      />
    </div>
  );
}

export default function PaymentDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-[#8CBC67]" />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
