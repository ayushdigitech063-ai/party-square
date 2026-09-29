"use client";

import React, { Suspense, useState } from "react";
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

  // Generate transaction ID only once.
  const [transactionId] = useState(
    () => `TXN_PS_${Math.floor(100000 + Math.random() * 900000)}`
  );

  // ============================================================
  // PRODUCT NOT FOUND
  // ============================================================

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-amber-100 shadow-sm p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 flex items-center justify-center mb-5">
            <AlertCircle size={30} className="text-amber-600" />
          </div>

          <h1 className="text-2xl font-bold text-[#17130B]">
            Product Not Found
          </h1>

          <p className="text-sm text-[#766F65] mt-3 leading-relaxed">
            The selected decoration package could not be found. Please return
            to the products page and select a package again.
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 mt-6 px-6 py-3 rounded-full bg-[#C5A059] text-white text-sm font-semibold bg-[#8B3F05]

                      hover:bg-[#713200] transition"
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
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4 py-10">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-sm border border-amber-100 p-8 md:p-10 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-6">
            <CheckCircle2
              size={42}
              className="text-green-600"
            />
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-[#8B3F05] font-bold mb-2">
            Payment Successful
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-[#17130B]">
            Your Booking is Confirmed
          </h1>

          <p className="text-sm text-[#766F65] mt-4 leading-relaxed">
            Thank you for choosing Party Square. Your payment has been
            successfully processed.
          </p>

          <div className="mt-8 rounded-2xl bg-[#FAF7F2] border border-amber-100 p-5 text-left">
            <div className="flex items-center justify-between gap-4 py-2">
              <span className="text-sm text-[#766F65]">
                Product
              </span>

              <strong className="text-sm text-[#17130B] text-right">
                {productName}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-4 py-2">
              <span className="text-sm text-[#766F65]">
                Amount Paid
              </span>

              <strong className="text-sm text-[#17130B]">
                ₹{finalTotal.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-4 py-2">
              <span className="text-sm text-[#766F65]">
                Payment Method
              </span>

              <strong className="text-sm text-[#17130B] uppercase">
                {selectedMethod}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-4 py-2">
              <span className="text-sm text-[#766F65]">
                Transaction ID
              </span>

              <span className="font-mono text-xs font-medium text-[#17130B]">
                {transactionId}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white font-semibold text-sm bg-[#8B3F05]

                      hover:bg-[#713200] transition"
            >
              Back to Home
            </Link>

            <Link
              href="/services/birthday"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-amber-200 text-[#17130B] font-semibold text-sm hover:bg-amber-50 transition"
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
    <div className="min-h-screen bg-[#FAF7F2] text-[#17130B]">
      {/* ========================================================
          HEADER
      ========================================================= */}

      <header className="bg-white border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold text-[#8B3F05] hover:text-#713200 transition"
            >
              <ArrowLeft size={18} />
              Back
            </Link>

            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-[#8B3F05]">
                Secure Checkout
              </h1>

              <p className="text-xs text-[#766F65] mt-1 text-[#8B3F05]">
                Complete your booking securely
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#766F65]">
              <Lock size={14} />
              Secure
            </div>
          </div>
        </div>
      </header>

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
            <section className="bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-amber-100">
                <h2 className="text-lg font-bold">
                  Choose Payment Method
                </h2>

                <p className="text-xs text-[#766F65] mt-1">
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
                        ? "border-amber-500 bg-amber-50"
                        : "border-amber-100 hover:border-amber-300"
                    }`}
                  >
                    <Smartphone
                      size={22}
                      className={
                        selectedMethod === "upi"
                          ? "text-amber-600"
                          : "text-[#766F65]"
                      }
                    />

                    <p className="text-sm font-semibold mt-3">
                      UPI
                    </p>

                    <p className="text-[11px] text-[#766F65] mt-1">
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
                        ? "border-amber-500 bg-amber-50"
                        : "border-amber-100 hover:border-amber-300"
                    }`}
                  >
                    <CreditCard
                      size={22}
                      className={
                        selectedMethod === "card"
                          ? "text-amber-600"
                          : "text-[#766F65]"
                      }
                    />

                    <p className="text-sm font-semibold mt-3">
                      Card
                    </p>

                    <p className="text-[11px] text-[#766F65] mt-1">
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
                        ? "border-amber-500 bg-amber-50"
                        : "border-amber-100 hover:border-amber-300"
                    }`}
                  >
                    <Building2
                      size={22}
                      className={
                        selectedMethod === "netbanking"
                          ? "text-amber-600"
                          : "text-[#766F65]"
                      }
                    />

                    <p className="text-sm font-semibold mt-3">
                      Net Banking
                    </p>

                    <p className="text-[11px] text-[#766F65] mt-1">
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
                        ? "border-amber-500 bg-amber-50"
                        : "border-amber-100 hover:border-amber-300"
                    }`}
                  >
                    <Wallet
                      size={22}
                      className={
                        selectedMethod === "wallet"
                          ? "text-amber-600"
                          : "text-[#766F65]"
                      }
                    />

                    <p className="text-sm font-semibold mt-3">
                      Wallet
                    </p>

                    <p className="text-[11px] text-[#766F65] mt-1">
                      Paytm, Amazon Pay
                    </p>
                  </button>
                </div>
              </div>
            </section>

            {/* ==================================================
                PAYMENT DETAILS
            ================================================== */}

            <section className="bg-white rounded-3xl border border-amber-100 shadow-sm p-6 sm:p-7">
              {/* UPI */}
              {selectedMethod === "upi" && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                      <Smartphone
                        size={20}
                        className="text-amber-600"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        Pay with UPI
                      </h3>

                      <p className="text-xs text-[#766F65]">
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
                    className="w-full h-12 rounded-xl border border-amber-100 bg-[#FAF7F2] px-4 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  />

                  <p className="text-xs text-[#766F65] mt-3">
                    Example: yourname@okaxis, yourname@ybl,
                    yourname@paytm
                  </p>
                </div>
              )}

              {/* CARD */}
              {selectedMethod === "card" && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                      <CreditCard
                        size={20}
                        className="text-amber-600"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        Card Details
                      </h3>

                      <p className="text-xs text-[#766F65]">
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
                        className="w-full h-12 rounded-xl border border-amber-100 bg-[#FAF7F2] px-4 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
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
                        className="w-full h-12 rounded-xl border border-amber-100 bg-[#FAF7F2] px-4 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
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
                          className="w-full h-12 rounded-xl border border-amber-100 bg-[#FAF7F2] px-4 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
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
                          placeholder="•••"
                          className="w-full h-12 rounded-xl border border-amber-100 bg-[#FAF7F2] px-4 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
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

                      <span className="text-xs text-[#766F65]">
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
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                      <Building2
                        size={20}
                        className="text-amber-600"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        Net Banking
                      </h3>

                      <p className="text-xs text-[#766F65]">
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
                    className="w-full h-12 rounded-xl border border-amber-100 bg-[#FAF7F2] px-4 text-sm outline-none focus:border-amber-400"
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
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                      <Wallet
                        size={20}
                        className="text-amber-600"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        Select Wallet
                      </h3>

                      <p className="text-xs text-[#766F65]">
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
                            ? "border-amber-500 bg-amber-50 text-amber-700"
                            : "border-amber-100 hover:border-amber-300"
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
                <div className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 p-3">
                  <AlertCircle
                    size={16}
                    className="text-red-500 mt-0.5 shrink-0"
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

            <div className="rounded-2xl bg-amber-50/70 border border-amber-100 p-5 flex items-start gap-3">
              <ShieldCheck
                size={22}
                className="text-amber-600 shrink-0 mt-0.5"
              />

              <div>
                <p className="text-sm font-semibold text-[#17130B]">
                  Your payment is secure
                </p>

                <p className="text-xs text-[#766F65] mt-1 leading-relaxed">
                  Your payment information is protected using secure
                  encryption. Party Square does not store your complete
                  payment credentials.
                </p>
              </div>
            </div>
          </div>

          {/* ====================================================
              RIGHT SIDE — ORDER SUMMARY
          ==================================================== */}

          <aside className="lg:sticky lg:top-6 h-fit">
            <section className="bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-amber-100">
                <h2 className="text-lg font-bold">
                  Order Summary
                </h2>
              </div>

              <div className="p-6">
                {/* PRODUCT */}
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#FAF7F2] shrink-0">
                    <img
                      src={productImage}
                      alt={productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider text-amber-600 font-bold">
                      {productCategory}
                    </p>

                    <h3 className="font-bold text-sm leading-snug mt-1">
                      {productName}
                    </h3>

                    <p className="text-sm font-semibold text-[#17130B] mt-2">
                      ₹{baseTotal.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="border-t border-amber-100 my-6" />

                {/* PRICE */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#766F65]">
                      Package Price
                    </span>

                    <span className="font-medium">
                      ₹{baseTotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#766F65]">
                      Delivery & Setup
                    </span>

                    <span className="font-medium">
                      ₹{deliveryCharge.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600">
                        Coupon Discount
                      </span>

                      <span className="font-medium text-green-600">
                        -₹
                        {couponDiscount.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {/* TOTAL */}
                <div className="border-t border-amber-100 mt-5 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">
                      Total Payable
                    </span>

                    <span className="text-xl font-bold text-[#17130B]">
                      ₹{finalTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* PAY BUTTON */}
                <button
                  type="button"
                  onClick={handlePayNow}
                  disabled={isProcessing}
                  className="w-full mt-6 h-14 rounded-2xl bg-[#8B3F05] hover:bg-[#713200]  text-white font-bold text-sm flex items-center justify-center gap-2  disabled:opacity-70 disabled:cursor-not-allowed transition shadow-sm"
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

                <p className="text-[11px] text-center text-[#766F65] mt-4 leading-relaxed">
                  By continuing, you agree to Party Square's
                  payment and booking terms.
                </p>
              </div>
            </section>
          </aside>
        </div>
      </main>
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
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <Loader2
            size={28}
            className="animate-spin text-amber-600"
          />
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}