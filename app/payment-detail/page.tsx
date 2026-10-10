"use client";

import React, { Suspense, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
} from "lucide-react";

import { getProductById } from "@/app/data/productResolver";
import LoginModal from "@/app/components/LoginModal";

type PaymentMethod = "upi" | "card" | "netbanking" | "wallet";

function PaymentContent() {
  const searchParams = useSearchParams();

  // Product ID received from:
  // /payment-detail?productId=product-id
  const productId = searchParams.get("productId") || "";

  // Get the actual selected product
  const product = getProductById(productId);


  // PAYMENT STATES

  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>("upi");

  const [upiId, setUpiId] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const [selectedBank, setSelectedBank] = useState("");

  const [selectedWallet, setSelectedWallet] = useState("");

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState<{
    text: string;
    error?: boolean;
  } | null>(null);

  const [paymentMsg, setPaymentMsg] = useState<string | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const checkAuth = () => {
    const tokenCookie = document.cookie.includes("token=");
    const adminToken = typeof window !== 'undefined' && localStorage.getItem("adminToken");
    const adminCookie = document.cookie.includes("adminToken=");
    const isAuth = !!(tokenCookie || adminToken || adminCookie);
    setIsLoggedIn(isAuth);
    return isAuth;
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Generate transaction ID only once.
  const [transactionId] = useState(
    () => `TXN_PS_${Math.floor(100000 + Math.random() * 900000)}`
  );

  // ============================================================
  // PRODUCT NOT FOUND
  // ============================================================

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#E8E8E3] shadow-sm p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#EEF6EB] flex items-center justify-center mb-5">
            <AlertCircle size={30} className="text-[#8CBC67]" />
          </div>

          <h1 className="text-2xl font-bold text-[#202522]">
            Product Not Found
          </h1>

          <p className="text-sm text-[#6B706C] mt-3 leading-relaxed">
            The selected decoration package could not be found. Please return
            to the products page and select a package again.
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 mt-6 px-6 py-3 rounded-full bg-[#D7A84B] text-white text-sm font-semibold bg-[#8CBC67]

                      hover:bg-[#7AB055] transition"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // ============================================================
  // DYNAMIC PRODUCT INFORMATION
  // ============================================================

  const productName = product.name;
  const productImage = product.image;

  const productCategory =
    product.subcategory || product.category || "Event Decoration";

  const baseTotal = product.price;

  // ============================================================
  // CHARGES
  // ============================================================

  const deliveryCharge = 500;

  const finalTotal = Math.max(
    0,
    baseTotal + deliveryCharge - couponDiscount
  );

  
  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();

    setCouponMsg(null);

    if (!code) {
      setCouponMsg({
        text: "Please enter a coupon code.",
        error: true,
      });
      return;
    }

    const coupons: Record<string, number> = {
      WELCOME1000: 1000,
      FESTIVE1000: 1000,
      PARTY500: 500,
      FLORAL500: 500,
    };

    const discount = coupons[code];

    if (!discount) {
      setAppliedCoupon(null);
      setCouponDiscount(0);

      setCouponMsg({
        text: "Invalid coupon code.",
        error: true,
      });

      return;
    }

    setAppliedCoupon(code);
    setCouponDiscount(discount);

    setCouponMsg({
      text: `Coupon applied successfully. You saved ₹${discount.toLocaleString(
        "en-IN"
      )}.`,
    });
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponCode("");

    setCouponMsg(null);
  };

  // ============================================================
  // PAYMENT VALIDATION
  // ============================================================

  const validatePayment = (): string | null => {
    if (selectedMethod === "upi") {
      if (!upiId.trim()) {
        return "Please enter your UPI ID.";
      }

      if (!/^[\w.-]+@[\w.-]+$/.test(upiId.trim())) {
        return "Please enter a valid UPI ID.";
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

    if (selectedMethod === "netbanking") {
      if (!selectedBank) {
        return "Please select your bank.";
      }
    }

    if (selectedMethod === "wallet") {
      if (!selectedWallet) {
        return "Please select a wallet.";
      }
    }

    return null;
  };

  // ============================================================
  // PAY NOW
  // ============================================================

  const handlePayNow = () => {
    if (!checkAuth()) {
      setShowLoginModal(true);
      return;
    }

    setPaymentMsg(null);

    const validationError = validatePayment();

    if (validationError) {
      setPaymentMsg(validationError);
      return;
    }

    setIsProcessing(true);

    // Demo payment processing.
    // Replace this with your real payment gateway later.
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 1200);
  };

  // ============================================================
  // SUCCESS SCREEN
  // ============================================================

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center px-4 py-10">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-sm border border-[#E8E8E3] p-8 md:p-10 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#EEF6EB] flex items-center justify-center mb-6">
            <CheckCircle2
              size={42}
              className="text-[#8CBC67]"
            />
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-[#8CBC67] font-bold mb-2">
            Payment Successful
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-[#202522]">
            Your Booking is Confirmed
          </h1>

          <p className="text-sm text-[#6B706C] mt-4 leading-relaxed">
            Thank you for choosing Party Square. Your payment has been
            successfully processed.
          </p>

          <div className="mt-8 rounded-2xl bg-[#FCFBF7] border border-[#E8E8E3] p-5 text-left">
            <div className="flex items-center justify-between gap-4 py-2">
              <span className="text-sm text-[#6B706C]">
                Product
              </span>

              <strong className="text-sm text-[#202522] text-right">
                {productName}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-4 py-2">
              <span className="text-sm text-[#6B706C]">
                Amount Paid
              </span>

              <strong className="text-sm text-[#202522]">
                ₹{finalTotal.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-4 py-2">
              <span className="text-sm text-[#6B706C]">
                Payment Method
              </span>

              <strong className="text-sm text-[#202522] uppercase">
                {selectedMethod}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-4 py-2">
              <span className="text-sm text-[#6B706C]">
                Transaction ID
              </span>

              <span className="font-mono text-xs font-medium text-[#202522]">
                {transactionId}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white font-semibold text-sm bg-[#8CBC67]

                      hover:bg-[#7AB055] transition"
            >
              Back to Home
            </Link>

            <Link
              href="/services/birthday"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#E8E8E3] text-[#202522] font-semibold text-sm hover:bg-[#EEF6EB] transition"
            >
              Explore More
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // MAIN PAYMENT PAGE
  // ============================================================

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#202522]">
      {/* ========================================================
          CONTENT
      ========================================================= */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-7">
          {/* ====================================================
              LEFT SIDE
          ==================================================== */}

          <div className="space-y-6">
            {/* Payment Methods */}
            <section className="bg-white rounded-3xl border border-[#E8E8E3] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#E8E8E3]">
                <h2 className="text-lg font-bold">
                  Choose Payment Method
                </h2>

                <p className="text-xs text-[#6B706C] mt-1">
                  Select your preferred payment option
                </p>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                      className={
                        selectedMethod === "upi"
                          ? "text-[#8CBC67]"
                          : "text-[#6B706C]"
                      }
                    />

                    <p className="text-sm font-semibold mt-3">
                      UPI
                    </p>

                    <p className="text-[11px] text-[#6B706C] mt-1">
                      GPay, PhonePe
                    </p>
                  </button>

                  {/* CARD */}
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
                      className={
                        selectedMethod === "card"
                          ? "text-[#8CBC67]"
                          : "text-[#6B706C]"
                      }
                    />

                    <p className="text-sm font-semibold mt-3">
                      Card
                    </p>

                    <p className="text-[11px] text-[#6B706C] mt-1">
                      Credit / Debit
                    </p>
                  </button>

                  {/* NET BANKING */}
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
                      className={
                        selectedMethod === "netbanking"
                          ? "text-[#8CBC67]"
                          : "text-[#6B706C]"
                      }
                    />

                    <p className="text-sm font-semibold mt-3">
                      Net Banking
                    </p>

                    <p className="text-[11px] text-[#6B706C] mt-1">
                      All major banks
                    </p>
                  </button>

                  {/* WALLET */}
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
                      className={
                        selectedMethod === "wallet"
                          ? "text-[#8CBC67]"
                          : "text-[#6B706C]"
                      }
                    />

                    <p className="text-sm font-semibold mt-3">
                      Wallet
                    </p>

                    <p className="text-[11px] text-[#6B706C] mt-1">
                      Paytm, Amazon Pay
                    </p>
                  </button>
                </div>
              </div>
            </section>

            {/* ==================================================
                PAYMENT DETAILS
            ================================================== */}

            <section className="bg-white rounded-3xl border border-[#E8E8E3] shadow-sm p-6 sm:p-7">
              {/* UPI */}
              {selectedMethod === "upi" && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#EEF6EB] flex items-center justify-center">
                      <Smartphone
                        size={20}
                        className="text-[#8CBC67]"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        Pay with UPI
                      </h3>

                      <p className="text-xs text-[#6B706C]">
                        Enter your UPI ID to continue
                      </p>
                    </div>
                  </div>

                  <label className="block text-sm font-medium mb-2">
                    UPI ID
                  </label>

                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => {
                      setUpiId(e.target.value);
                      setPaymentMsg(null);
                    }}
                    placeholder="example@upi"
                    className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-4 text-sm outline-none focus:border-[#8CBC67] focus:ring-2 focus:ring-[#EEF6EB]"
                  />

                  <p className="text-xs text-[#6B706C] mt-3">
                    Example: yourname@okaxis, yourname@ybl,
                    yourname@paytm
                  </p>
                </div>
              )}

              {/* CARD */}
              {selectedMethod === "card" && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#EEF6EB] flex items-center justify-center">
                      <CreditCard
                        size={20}
                        className="text-[#8CBC67]"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        Card Details
                      </h3>

                      <p className="text-xs text-[#6B706C]">
                        Enter your card information
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Card Number
                      </label>

                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 19);

                          const formatted = value.replace(
                            /(.{4})/g,
                            "$1 "
                          );

                          setCardNumber(formatted.trim());
                          setPaymentMsg(null);
                        }}
                        placeholder="1234 5678 9012 3456"
                        className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-4 text-sm outline-none focus:border-[#8CBC67] focus:ring-2 focus:ring-[#EEF6EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Card Holder Name
                      </label>

                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => {
                          setCardHolder(e.target.value);
                          setPaymentMsg(null);
                        }}
                        placeholder="Name on card"
                        className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-4 text-sm outline-none focus:border-[#8CBC67] focus:ring-2 focus:ring-[#EEF6EB]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Expiry
                        </label>

                        <input
                          type="text"
                          maxLength={7}
                          value={expiry}
                          onChange={(e) => {
                            let value = e.target.value.replace(
                              /\D/g,
                              ""
                            );

                            if (value.length > 2) {
                              value =
                                value.slice(0, 2) +
                                " / " +
                                value.slice(2, 4);
                            }

                            setExpiry(value);
                            setPaymentMsg(null);
                          }}
                          placeholder="MM / YY"
                          className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-4 text-sm outline-none focus:border-[#8CBC67] focus:ring-2 focus:ring-[#EEF6EB]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          CVV
                        </label>

                        <input
                          type="password"
                          inputMode="numeric"
                          maxLength={4}
                          value={cvv}
                          onChange={(e) => {
                            setCvv(
                              e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 4)
                            );

                            setPaymentMsg(null);
                          }}
                          placeholder="â€¢â€¢â€¢"
                          className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-4 text-sm outline-none focus:border-[#8CBC67] focus:ring-2 focus:ring-[#EEF6EB]"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) =>
                          setSaveCard(e.target.checked)
                        }
                        className="accent-amber-600"
                      />

                      <span className="text-xs text-[#6B706C]">
                        Save card for future payments
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* NET BANKING */}
              {selectedMethod === "netbanking" && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#EEF6EB] flex items-center justify-center">
                      <Building2
                        size={20}
                        className="text-[#8CBC67]"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        Net Banking
                      </h3>

                      <p className="text-xs text-[#6B706C]">
                        Select your bank
                      </p>
                    </div>
                  </div>

                  <label className="block text-sm font-medium mb-2">
                    Select Bank
                  </label>

                  <select
                    value={selectedBank}
                    onChange={(e) => {
                      setSelectedBank(e.target.value);
                      setPaymentMsg(null);
                    }}
                    className="w-full h-12 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] px-4 text-sm outline-none focus:border-[#8CBC67]"
                  >
                    <option value="">
                      Select your bank
                    </option>

                    <option value="sbi">
                      State Bank of India
                    </option>

                    <option value="hdfc">
                      HDFC Bank
                    </option>

                    <option value="icici">
                      ICICI Bank
                    </option>

                    <option value="axis">
                      Axis Bank
                    </option>

                    <option value="kotak">
                      Kotak Mahindra Bank
                    </option>

                    <option value="pnb">
                      Punjab National Bank
                    </option>
                  </select>
                </div>
              )}

              {/* WALLET */}
              {selectedMethod === "wallet" && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#EEF6EB] flex items-center justify-center">
                      <Wallet
                        size={20}
                        className="text-[#8CBC67]"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        Select Wallet
                      </h3>

                      <p className="text-xs text-[#6B706C]">
                        Choose your preferred wallet
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "paytm",
                        name: "Paytm",
                      },
                      {
                        id: "amazonpay",
                        name: "Amazon Pay",
                      },
                      {
                        id: "mobikwik",
                        name: "MobiKwik",
                      },
                    ].map((wallet) => (
                      <button
                        key={wallet.id}
                        type="button"
                        onClick={() => {
                          setSelectedWallet(wallet.id);
                          setPaymentMsg(null);
                        }}
                        className={`rounded-xl border px-4 py-4 text-sm font-semibold transition ${
                          selectedWallet === wallet.id
                            ? "border-[#8CBC67] bg-[#EEF6EB] text-[#202522]"
                            : "border-[#E8E8E3] hover:border-[#8CBC67]"
                        }`}
                      >
                        {wallet.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PAYMENT ERROR */}
              {paymentMsg && (
                <div className="mt-5 flex items-start gap-2 rounded-xl bg-[#F7D6C7] border border-red-100 p-3">
                  <AlertCircle
                    size={16}
                    className="text-[#D7A84B] mt-0.5 shrink-0"
                  />

                  <p className="text-xs text-red-600">
                    {paymentMsg}
                  </p>
                </div>
              )}
            </section>
            {/* ==================================================
                SECURITY
            ================================================== */}

            <div className="rounded-2xl bg-[#EEF6EB]/70 border border-[#E8E8E3] p-5 flex items-start gap-3">
              <ShieldCheck
                size={22}
                className="text-[#8CBC67] shrink-0 mt-0.5"
              />

              <div>
                <p className="text-sm font-semibold text-[#202522]">
                  Your payment is secure
                </p>

                <p className="text-xs text-[#6B706C] mt-1 leading-relaxed">
                  Your payment information is protected using secure
                  encryption. Party Square does not store your complete
                  payment credentials.
                </p>
              </div>
            </div>
          </div>

          {/* ====================================================
              RIGHT SIDE â€” ORDER SUMMARY
          ==================================================== */}

          <aside className="lg:sticky lg:top-6 h-fit">
            <section className="bg-white rounded-3xl border border-[#E8E8E3] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#E8E8E3]">
                <h2 className="text-lg font-bold">
                  Order Summary
                </h2>
              </div>

              <div className="p-6">
                {/* PRODUCT */}
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#FCFBF7] shrink-0">
                    <img
                      src={productImage}
                      alt={productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider text-[#8CBC67] font-bold">
                      {productCategory}
                    </p>

                    <h3 className="font-bold text-sm leading-snug mt-1">
                      {productName}
                    </h3>

                    <p className="text-sm font-semibold text-[#202522] mt-2">
                      ₹{baseTotal.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="border-t border-[#E8E8E3] my-6" />

                {/* PRICE */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B706C]">
                      Package Price
                    </span>

                    <span className="font-medium">
                      ₹{baseTotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B706C]">
                      Delivery & Setup
                    </span>

                    <span className="font-medium">
                      ₹{deliveryCharge.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#8CBC67]">
                        Coupon Discount
                      </span>

                      <span className="font-medium text-[#8CBC67]">
                        -₹
                        {couponDiscount.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {/* TOTAL */}
                <div className="border-t border-[#E8E8E3] mt-5 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">
                      Total Payable
                    </span>

                    <span className="text-xl font-bold text-[#202522]">
                      ₹{finalTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* PAY BUTTON */}
                <button
                  type="button"
                  onClick={handlePayNow}
                  disabled={isProcessing}
                  className="w-full mt-6 h-14 rounded-2xl bg-[#8CBC67] hover:bg-[#7AB055]  text-white font-bold text-sm flex items-center justify-center gap-2  disabled:opacity-70 disabled:cursor-not-allowed transition shadow-sm"
                >
                  {isProcessing ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock size={17} />

                      Pay ₹{finalTotal.toLocaleString("en-IN")}
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#6B706C] mt-4 leading-relaxed">
                  By continuing, you agree to Party Square's
                  payment and booking terms.
                </p>
              </div>
            </section>
          </aside>
        </div>
      </main>
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => {
          setShowLoginModal(false);
          checkAuth();
        }} 
      />
    </div>
  );
}

// ================================================================
// PAGE
// ================================================================

export default function PaymentDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center">
          <Loader2
            size={28}
            className="animate-spin text-[#8CBC67]"
          />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
