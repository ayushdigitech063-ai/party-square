"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getProductById } from "@/app/data/productResolver";

function PaymentContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") || "";
  const product = getProductById(productId);

  const productName = product?.name || "Grand Floral Welcome Gate";
  const productImage = product?.image || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80";
  const productCategory = product?.category || "Event Decoration";
  const baseTotal = product?.rawPrice || 18000;

  const [selectedMethod, setSelectedMethod] = useState<"upi" | "card" | "netbanking" | "wallet">("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState<{ text: string; error?: boolean } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const deliveryCharge = 500;
  const finalTotal = Math.max(0, baseTotal + deliveryCharge - couponDiscount);

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

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 1200);
  };

  return (
    <div
      style={{
        backgroundColor: "#FAF7F2",
        color: "#17130B",
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
      className="w-full pb-16"
    >
      {/* HEADER */}
      <header
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E8D8B5",
        }}
        className="w-full sticky top-0 z-30 shadow-xs"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              style={{
                backgroundColor: "#FFF8E7",
                color: "#8B3F00",
                borderColor: "#E8D8B5",
              }}
              className="w-9 h-9 rounded-full border flex items-center justify-center font-bold text-lg"
            >
              ✦
            </span>
            <div>
              <h1 style={{ color: "#17130B" }} className="text-xl sm:text-2xl font-bold tracking-tight">
                Payment Details
              </h1>
              <p style={{ color: "#766F65" }} className="text-xs">
                Party Square Premium Event Decor
              </p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#FFF8E7",
              color: "#8B3F00",
              border: "1px solid #E8D8B5",
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-xs"
          >
            <span>🔒</span>
            <span>Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* CHECKOUT PROGRESS */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E8D8B5",
          }}
          className="rounded-2xl p-4 sm:p-5 shadow-xs max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <span
                style={{
                  backgroundColor: "#FAF7F2",
                  color: "#766F65",
                  border: "1px solid #E8D8B5",
                }}
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
              >
                ✓
              </span>
              <span style={{ color: "#766F65" }} className="xs:inline">
                Booking Details
              </span>
            </div>

            <div style={{ color: "#E8D8B5" }} className="text-lg font-light px-1">
              →
            </div>

            {/* Step 2 - Active */}
            <div className="flex items-center gap-2">
              <span
                style={{
                  backgroundColor: "#8B3F00",
                  color: "#FFFFFF",
                }}
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shadow-xs"
              >
                2
              </span>
              <span style={{ color: "#8B3F00" }} className="font-bold underline decoration-2 underline-offset-4">
                Payment
              </span>
            </div>

            <div style={{ color: "#E8D8B5" }} className="text-lg font-light px-1">
              →
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-2">
              <span
                style={{
                  backgroundColor: "#FAF7F2",
                  color: "#766F65",
                  border: "1px solid #E8D8B5",
                }}
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
              >
                3
              </span>
              <span style={{ color: "#766F65" }} className="xs:inline">
                Confirmation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
        {paymentSuccess ? (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E8D8B5",
            }}
            className="rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm mt-8"
          >
            <div
              style={{
                backgroundColor: "#FFF8E7",
                borderColor: "#F4A300",
                color: "#8B3F00",
              }}
              className="w-20 h-20 rounded-full border-2 mx-auto flex items-center justify-center text-3xl mb-4"
            >
              ✓
            </div>
            <h2 style={{ color: "#17130B" }} className="text-2xl font-bold mb-2">
              Payment Confirmed!
            </h2>
            <p style={{ color: "#766F65" }} className="text-sm mb-6">
              Thank you for booking with Party Square. Your order for <strong>{productName}</strong> has been placed successfully.
            </p>
            <div
              style={{
                backgroundColor: "#FAF7F2",
                border: "1px dashed #E8D8B5",
              }}
              className="p-4 rounded-xl text-left text-sm mb-6 space-y-1"
            >
              <div className="flex justify-between">
                <span style={{ color: "#766F65" }}>Transaction ID:</span>
                <span className="font-mono font-medium">TXN_PS_{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#766F65" }}>Amount Paid:</span>
                <span className="font-bold text-[#8B3F00]">₹{finalTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#766F65" }}>Payment Mode:</span>
                <span className="capitalize">{selectedMethod}</span>
              </div>
            </div>
            <button
              onClick={() => setPaymentSuccess(false)}
              style={{
                backgroundColor: "#8B3F00",
                color: "#FFFFFF",
              }}
              className="px-6 py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Return to Checkout Demo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: PAYMENT DETAILS */}
            <div className="lg:col-span-7 space-y-6">
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E8D8B5",
                }}
                className="rounded-3xl p-6 sm:p-8 shadow-xs"
              >
                {/* Title */}
                <div className="mb-6">
                  <h2 style={{ color: "#17130B" }} className="text-xl sm:text-2xl font-bold">
                    Payment Details
                  </h2>
                  <p style={{ color: "#766F65" }} className="text-sm mt-1">
                    Choose your preferred payment method
                  </p>
                </div>

                {/* Payment Methods Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {/* UPI */}
                  <label
                    onClick={() => setSelectedMethod("upi")}
                    style={{
                      backgroundColor: selectedMethod === "upi" ? "#FFF8E7" : "#FFFFFF",
                      borderColor: selectedMethod === "upi" ? "#8B3F00" : "#E8D8B5",
                      cursor: "pointer",
                    }}
                    className="flex items-center gap-3 p-4 rounded-2xl border-2 transition-all shadow-2xs"
                  >
                    <span
                      style={{
                        borderColor: selectedMethod === "upi" ? "#8B3F00" : "#766F65",
                        backgroundColor: selectedMethod === "upi" ? "#8B3F00" : "transparent",
                      }}
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                    >
                      {selectedMethod === "upi" && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                    <div className="flex-1">
                      <div className="font-semibold text-sm" style={{ color: "#17130B" }}>
                        UPI
                      </div>
                      <div className="text-xs" style={{ color: "#766F65" }}>
                        GPay, PhonePe, Paytm, BHIM
                      </div>
                    </div>
                    <span className="text-lg">⚡</span>
                  </label>

                  {/* Credit / Debit Card */}
                  <label
                    onClick={() => setSelectedMethod("card")}
                    style={{
                      backgroundColor: selectedMethod === "card" ? "#FFF8E7" : "#FFFFFF",
                      borderColor: selectedMethod === "card" ? "#8B3F00" : "#E8D8B5",
                      cursor: "pointer",
                    }}
                    className="flex items-center gap-3 p-4 rounded-2xl border-2 transition-all shadow-2xs"
                  >
                    <span
                      style={{
                        borderColor: selectedMethod === "card" ? "#8B3F00" : "#766F65",
                        backgroundColor: selectedMethod === "card" ? "#8B3F00" : "transparent",
                      }}
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                    >
                      {selectedMethod === "card" && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                    <div className="flex-1">
                      <div className="font-semibold text-sm" style={{ color: "#17130B" }}>
                        Credit / Debit Card
                      </div>
                      <div className="text-xs" style={{ color: "#766F65" }}>
                        Visa, Mastercard, RuPay
                      </div>
                    </div>
                    <span className="text-lg">💳</span>
                  </label>

                  {/* Net Banking */}
                  <label
                    onClick={() => setSelectedMethod("netbanking")}
                    style={{
                      backgroundColor: selectedMethod === "netbanking" ? "#FFF8E7" : "#FFFFFF",
                      borderColor: selectedMethod === "netbanking" ? "#8B3F00" : "#E8D8B5",
                      cursor: "pointer",
                    }}
                    className="flex items-center gap-3 p-4 rounded-2xl border-2 transition-all shadow-2xs"
                  >
                    <span
                      style={{
                        borderColor: selectedMethod === "netbanking" ? "#8B3F00" : "#766F65",
                        backgroundColor: selectedMethod === "netbanking" ? "#8B3F00" : "transparent",
                      }}
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                    >
                      {selectedMethod === "netbanking" && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                    <div className="flex-1">
                      <div className="font-semibold text-sm" style={{ color: "#17130B" }}>
                        Net Banking
                      </div>
                      <div className="text-xs" style={{ color: "#766F65" }}>
                        All major Indian banks
                      </div>
                    </div>
                    <span className="text-lg">🏛️</span>
                  </label>

                  {/* Wallet */}
                  <label
                    onClick={() => setSelectedMethod("wallet")}
                    style={{
                      backgroundColor: selectedMethod === "wallet" ? "#FFF8E7" : "#FFFFFF",
                      borderColor: selectedMethod === "wallet" ? "#8B3F00" : "#E8D8B5",
                      cursor: "pointer",
                    }}
                    className="flex items-center gap-3 p-4 rounded-2xl border-2 transition-all shadow-2xs"
                  >
                    <span
                      style={{
                        borderColor: selectedMethod === "wallet" ? "#8B3F00" : "#766F65",
                        backgroundColor: selectedMethod === "wallet" ? "#8B3F00" : "transparent",
                      }}
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                    >
                      {selectedMethod === "wallet" && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                    <div className="flex-1">
                      <div className="font-semibold text-sm" style={{ color: "#17130B" }}>
                        Wallet
                      </div>
                      <div className="text-xs" style={{ color: "#766F65" }}>
                        Paytm, Amazon Pay, Mobikwik
                      </div>
                    </div>
                    <span className="text-lg">👛</span>
                  </label>
                </div>

                {/* DYNAMIC METHOD ACCORDION / SUB-SECTION */}
                {selectedMethod === "upi" && (
                  <div
                    style={{
                      backgroundColor: "#FFF8E7",
                      borderColor: "#E8D8B5",
                    }}
                    className="p-4 sm:p-5 rounded-2xl border mb-6 space-y-3"
                  >
                    <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: "#8B3F00" }}>
                      Instant UPI Payment
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="Enter UPI ID (e.g. yourname@okhdfcbank)"
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderColor: "#E8D8B5",
                          color: "#17130B",
                        }}
                        className="flex-1 px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3F00]"
                      />
                      <button
                        type="button"
                        style={{
                          backgroundColor: "#8B3F00",
                          color: "#FFFFFF",
                        }}
                        className="px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm hover:opacity-90"
                      >
                        Verify & Pay
                      </button>
                    </div>
                    <div className="flex items-center gap-2 pt-1 text-xs" style={{ color: "#766F65" }}>
                      <span>Or scan via UPI app on the next screen.</span>
                    </div>
                  </div>
                )}

                {selectedMethod === "netbanking" && (
                  <div
                    style={{
                      backgroundColor: "#FFF8E7",
                      borderColor: "#E8D8B5",
                    }}
                    className="p-4 sm:p-5 rounded-2xl border mb-6 space-y-3"
                  >
                    <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: "#8B3F00" }}>
                      Select Bank
                    </label>
                    <select
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E8D8B5",
                        color: "#17130B",
                      }}
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3F00]"
                    >
                      <option>HDFC Bank</option>
                      <option>State Bank of India (SBI)</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                      <option>Other Banks</option>
                    </select>
                  </div>
                )}

                {selectedMethod === "wallet" && (
                  <div
                    style={{
                      backgroundColor: "#FFF8E7",
                      borderColor: "#E8D8B5",
                    }}
                    className="p-4 sm:p-5 rounded-2xl border mb-6 space-y-3"
                  >
                    <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: "#8B3F00" }}>
                      Choose Wallet
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {["Paytm Wallet", "Amazon Pay", "PhonePe Wallet", "MobiKwik"].map((w, idx) => (
                        <div
                          key={idx}
                          style={{
                            backgroundColor: "#FFFFFF",
                            borderColor: "#E8D8B5",
                          }}
                          className="p-3 rounded-xl border font-medium text-center hover:border-[#8B3F00] cursor-pointer"
                        >
                          {w}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CARD PAYMENT AREA */}
                <div
                  style={{
                    backgroundColor: "#FAF7F2",
                    borderColor: "#E8D8B5",
                  }}
                  className="p-5 sm:p-6 rounded-2xl border space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 style={{ color: "#17130B" }} className="text-base font-bold flex items-center gap-2">
                      <span>Card Payment Form</span>
                    </h3>
                    <div className="flex gap-1.5 text-xs font-semibold px-2 py-0.5 rounded bg-white border border-[#E8D8B5] text-[#766F65]">
                      <span>VISA</span> • <span>MC</span> • <span>RUPAY</span>
                    </div>
                  </div>

                  {/* Card Number */}
                  <div>
                    <label style={{ color: "#17130B" }} className="block text-xs font-semibold mb-1.5">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderColor: "#E8D8B5",
                          color: "#17130B",
                        }}
                        className="w-full px-4 py-3 rounded-xl border text-sm font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-[#8B3F00]"
                      />
                      <span className="absolute right-3.5 top-3 text-sm text-[#766F65]">💳</span>
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label style={{ color: "#17130B" }} className="block text-xs font-semibold mb-1.5">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Enter cardholder name"
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E8D8B5",
                        color: "#17130B",
                      }}
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3F00]"
                    />
                  </div>

                  {/* Expiry Date and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={{ color: "#17130B" }} className="block text-xs font-semibold mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM / YY"
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderColor: "#E8D8B5",
                          color: "#17130B",
                        }}
                        className="w-full px-4 py-3 rounded-xl border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#8B3F00]"
                      />
                    </div>
                    <div>
                      <label style={{ color: "#17130B" }} className="block text-xs font-semibold mb-1.5">
                        CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="CVV"
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderColor: "#E8D8B5",
                          color: "#17130B",
                        }}
                        className="w-full px-4 py-3 rounded-xl border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#8B3F00]"
                      />
                    </div>
                  </div>

                  {/* Save Card Checkbox */}
                  <label className="flex items-center gap-2.5 pt-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#8B3F00]"
                    />
                    <span style={{ color: "#766F65" }} className="text-xs sm:text-sm">
                      Save card for future payments
                    </span>
                  </label>

                  {/* Security message */}
                  <div
                    style={{
                      borderTop: "1px solid #E8D8B5",
                      color: "#766F65",
                    }}
                    className="pt-3 flex items-center gap-2 text-xs"
                  >
                    <span>🔒</span>
                    <span>Your payment information is encrypted and secure.</span>
                  </div>
                </div>

                <div style={{ color: "#766F65" }} className="text-xs text-center mt-4">
                  <em>This is a visual / demo page only. No real payment processing occurs.</em>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY */}
            <div className="lg:col-span-5 space-y-6">
              {/* ORDER SUMMARY CARD */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E8D8B5",
                }}
                className="rounded-3xl p-6 sm:p-7 shadow-xs"
              >
                <h2 style={{ color: "#17130B" }} className="text-xl font-bold mb-5 pb-3 border-b border-[#E8D8B5]">
                  Order Summary
                </h2>

                {/* Product details */}
                <div
                  style={{
                    backgroundColor: "#FAF7F2",
                    borderColor: "#E8D8B5",
                  }}
                  className="p-4 rounded-2xl border flex items-center gap-4 mb-5"
                >
                  <img
                    src={productImage}
                    alt={productName}
                    style={{ borderColor: "#E8D8B5" }}
                    className="w-14 h-14 rounded-xl border object-cover shrink-0 shadow-2xs"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#8B3F00] block mb-0.5">
                      {productCategory}
                    </span>
                    <h3 style={{ color: "#17130B" }} className="font-semibold text-sm truncate">
                      {productName}
                    </h3>
                    <div className="flex items-center justify-between text-xs mt-1" style={{ color: "#766F65" }}>
                      <span>Quantity: 1</span>
                      <span className="font-bold text-sm" style={{ color: "#8B3F00" }}>
                        ₹{baseTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 text-sm py-2">
                  <div className="flex justify-between" style={{ color: "#766F65" }}>
                    <span>Package Total</span>
                    <span style={{ color: "#17130B" }} className="font-medium">
                      ₹{baseTotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between" style={{ color: "#766F65" }}>
                    <span>Add-ons</span>
                    <span style={{ color: "#17130B" }} className="font-medium">
                      ₹0
                    </span>
                  </div>

                  <div className="flex justify-between" style={{ color: "#766F65" }}>
                    <span>Delivery Charges</span>
                    <span style={{ color: "#17130B" }} className="font-medium">
                      ₹500
                    </span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Coupon Discount ({appliedCoupon})</span>
                      <span>- ₹{couponDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div
                    style={{ borderColor: "#E8D8B5" }}
                    className="border-t pt-3 flex justify-between items-baseline"
                  >
                    <span style={{ color: "#17130B" }} className="text-base font-bold">
                      Total
                    </span>
                    <span style={{ color: "#8B3F00" }} className="text-2xl font-black">
                      ₹{finalTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="pt-4 mt-2 border-t border-[#E8D8B5]">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      style={{
                        backgroundColor: "#FAF7F2",
                        borderColor: "#E8D8B5",
                        color: "#17130B",
                      }}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm uppercase tracking-wide focus:outline-none focus:ring-1 focus:ring-[#8B3F00]"
                    />
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#FFF8E7",
                        borderColor: "#8B3F00",
                        color: "#8B3F00",
                      }}
                      className="px-4 py-2.5 rounded-xl border font-bold text-xs hover:bg-[#8B3F00] hover:text-white transition-colors"
                    >
                      APPLY
                    </button>
                  </form>
                  {couponMsg && (
                    <p
                      className={`text-xs mt-2 ${
                        couponMsg.error ? "text-rose-600 font-medium" : "text-emerald-700 font-medium"
                      }`}
                    >
                      {couponMsg.text}
                    </p>
                  )}
                  <p style={{ color: "#766F65" }} className="text-2xs text-[11px] mt-1.5">
                    Try demo coupon: <span className="font-mono font-semibold text-[#8B3F00]">FESTIVE1000</span> or{" "}
                    <span className="font-mono font-semibold text-[#8B3F00]">FLORAL500</span>
                  </p>
                </div>

                {/* PAY NOW CTA BUTTON */}
                <div className="pt-6">
                  <button
                    onClick={handlePayNow}
                    disabled={isProcessing}
                    style={{
                      backgroundColor: isProcessing ? "#9A4505" : "#8B3F00",
                      color: "#FFFFFF",
                    }}
                    className="w-full py-4 rounded-2xl font-bold text-base tracking-wide shadow-md hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin text-lg">⚙</span>
                        <span>PROCESSING...</span>
                      </>
                    ) : (
                      <>
                        <span>PAY NOW</span>
                        <span className="text-sm font-normal">
                          (₹{finalTotal.toLocaleString("en-IN")})
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* SECURITY SECTION */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E8D8B5",
                }}
                className="rounded-3xl p-6 shadow-xs space-y-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  <h3 style={{ color: "#17130B" }} className="font-bold text-sm sm:text-base">
                    100% Secure Payment
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs" style={{ color: "#766F65" }}>
                  <div className="flex items-center gap-1.5">
                    <span style={{ color: "#8B3F00" }} className="font-bold">
                      ✓
                    </span>
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span style={{ color: "#8B3F00" }} className="font-bold">
                      ✓
                    </span>
                    <span>Encrypted Payment</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span style={{ color: "#8B3F00" }} className="font-bold">
                      ✓
                    </span>
                    <span>Trusted Gateway</span>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#FAF7F2",
                    borderColor: "#E8D8B5",
                  }}
                  className="p-3 rounded-2xl border flex flex-wrap items-center justify-around gap-2 text-xs font-bold"
                >
                  <span style={{ color: "#8B3F00" }}>UPI</span>
                  <span style={{ color: "#766F65" }}>•</span>
                  <span style={{ color: "#17130B" }}>VISA</span>
                  <span style={{ color: "#766F65" }}>•</span>
                  <span style={{ color: "#17130B" }}>Mastercard</span>
                  <span style={{ color: "#766F65" }}>•</span>
                  <span style={{ color: "#8B3F00" }}>Razorpay</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function PaymentDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center font-serif text-amber-900">
          Loading Checkout...
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
