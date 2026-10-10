"use client";
// jhdsbfhvb
import React, { useState, useEffect } from "react";
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Eye,
  X,
  Calendar,
  Minus,
  Plus,
  Tag,
} from "lucide-react";
import Link from "next/link";

export default function BasketPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    type: "percent" | "flat";
    value: number;
  } | null>(null);
  const [couponMsg, setCouponMsg] = useState<{
    text: string;
    ok: boolean;
  } | null>(null);

  // Component load hone par aur localStorage change hone par Party Square_cart load karna
  useEffect(() => {
    const fetchCart = () => {
      try {
        const storedCart = JSON.parse(
          localStorage.getItem("Party Square_cart") || "[]",
        );
        setCart(storedCart);
      } catch (error) {
        console.error("Error reading cart from localStorage:", error);
      }
    };

    fetchCart();

    // Event listeners taaki real-time sync ho jaye
    window.addEventListener("storage", fetchCart);
    window.addEventListener("cartUpdated", fetchCart);

    return () => {
      window.removeEventListener("storage", fetchCart);
      window.removeEventListener("cartUpdated", fetchCart);
    };
  }, []);

  // Item remove karne ka function
  const handleRemoveFromCart = (id: any) => {
    try {
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
      localStorage.setItem("Party Square_cart", JSON.stringify(updatedCart));

      // Events dispatch karna taaki header aur baaki components update ho jayein
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleUpdateQuantity = (id: any, delta: number) => {
    const updatedCart = cart.map((item) => {
      if (item.id !== id) return item;
      const newQty = Math.max(1, (Number(item.quantity) || 1) + delta);
      return { ...item, quantity: newQty };
    });
    setCart(updatedCart);
    localStorage.setItem("Party Square_cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    const coupon = COUPONS[code];
    if (!coupon) {
      setAppliedCoupon(null);
      setCouponMsg({ text: "Invalid coupon code", ok: false });
      return;
    }
    setAppliedCoupon({ code, ...coupon });
    setCouponMsg({ text: `Coupon ${code} applied!`, ok: true });
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponMsg(null);
  };

  // Calculate Overall Summary safely
  const totalItemsCount = cart.reduce(
    (acc, item) => acc + (Number(item.quantity) || 1),
    0,
  );
  const grandTotalPrice = cart.reduce((acc, item) => {
    const price =
      Number(item.numericPrice) ||
      Number(item.price?.toString().replace(/[^0-9]/g, "")) ||
      item.price ||
      0;
    const qty = Number(item.quantity) || 1;
    return acc + Number(price) * qty;
  }, 0);
  const discountAmount = appliedCoupon
    ? appliedCoupon.type === "percent"
      ? Math.round((grandTotalPrice * appliedCoupon.value) / 100)
      : Math.min(appliedCoupon.value, grandTotalPrice)
    : 0;
  const finalTotal = grandTotalPrice - discountAmount;
  const formattedGrandTotal = `₹${finalTotal.toLocaleString("en-IN")}`;

  // Replace with your backend validation later
  const COUPONS: Record<string, { type: "percent" | "flat"; value: number }> = {
    DREAM10: { type: "percent", value: 10 },
    WELCOME500: { type: "flat", value: 500 },
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] flex flex-col items-center justify-center text-center px-4 font-sans">
        <div className="w-20 h-20 bg-[#EEF6EB] text-[#202522] rounded-full flex items-center justify-center mb-4 shadow-inner">
          <ShoppingBag size={36} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
          Your Basket is Empty
        </h2>
        <p className="text-gray-600 text-sm max-w-md mb-6">
          Looks like you haven't added any decoration packages to your basket
          yet.
        </p>
        <Link
          href="/"
          className="bg-[#202522] hover:bg-black text-white px-8 py-3 rounded-full text-xs uppercase font-bold tracking-widest transition shadow-lg"
        >
          Explore Decorations
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFBF7] py-12 px-4 sm:px-8 md:px-16 text-gray-900 font-sans relative">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8E8E3] pb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              Your Basket
            </h1>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">
              Review your selected decoration packages
            </p>
          </div>
          <Link
            href="/"
            className="text-xs font-bold text-rose-600 hover:text-rose-800 uppercase tracking-wider bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-full transition cursor-pointer"
          >
            Back Home
          </Link>
        </div>

        {/* Cart Items List */}
        <div className="space-y-4">
          {cart.map((item) => {
            const unitNumeric =
              Number(item.numericPrice) ||
              Number(item.price?.toString().replace(/[^0-9]/g, "")) ||
              item.price ||
              0;
            const quantity = Number(item.quantity) || 1;
            const itemTotal = Number(unitNumeric) * quantity;
            const formattedItemTotal = `₹${itemTotal.toLocaleString("en-IN")}`;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#E8E8E3] shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition hover:shadow-md"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#EEF6EB] border border-[#E8E8E3] flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-serif font-bold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Unit Price: ₹{Number(unitNumeric).toLocaleString("en-IN")}
                    </p>
                    <div className="inline-flex items-center bg-[#EEF6EB] text-[#202522] rounded-full">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        disabled={quantity <= 1}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#F7D6C7] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#F7D6C7] transition cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E8E8E3]">
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      Total Price
                    </p>
                    <p className="text-lg font-bold text-[#202522]">
                      {formattedItemTotal}
                    </p>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() =>
                      setSelectedItem({
                        ...item,
                        unitNumeric,
                        quantity,
                        formattedItemTotal,
                      })
                    }
                    className="px-3.5 py-2 rounded-full bg-[#EEF6EB] hover:bg-[#EEF6EB] text-[#202522] text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition cursor-pointer"
                    title="View Details"
                  >
                    <Eye size={15} />
                    <span>View</span>
                  </button>

                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition cursor-pointer shadow-sm"
                    title="Remove Item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Summary Box */}
        <div className="bg-white rounded-3xl border border-[#8CBC67] shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center space-x-2 text-[#202522]">
            <Sparkles size={18} />
            <h3 className="text-xl font-serif font-bold">
              Overall Order Summary
            </h3>
          </div>

          <div className="space-y-3 border-t border-b border-[#E8E8E3] py-4 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Total Unique Items:</span>
              <span className="font-semibold text-gray-900">{cart.length}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Total Quantity Added:</span>
              <span className="font-semibold text-gray-900">
                {totalItemsCount} Units
              </span>
            </div>
            {/* Coupon */}
            <div className="pt-2">
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 px-4 py-2.5 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Tag size={15} />
                    <span className="text-xs font-bold uppercase">
                      {appliedCoupon.code} applied
                    </span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-xs font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 border border-[#E8E8E3] rounded-full px-4 py-2 text-sm uppercase focus:outline-none focus:border-[#202522]"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-[#202522] hover:bg-black text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponMsg && !appliedCoupon && (
                <p
                  className={`text-xs mt-1.5 ml-2 ${couponMsg.ok ? "text-emerald-700" : "text-rose-600"}`}
                >
                  {couponMsg.text}
                </p>
              )}
            </div>

            {appliedCoupon && (
              <div className="flex justify-between text-emerald-700">
                <span>Coupon Discount:</span>
                <span className="font-semibold">
                  - ₹{discountAmount.toLocaleString("en-IN")}
                </span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-amber-50">
              <span>Grand Total Price:</span>
              <span className="text-[#202522] text-xl">
                {formattedGrandTotal}
              </span>
            </div>
          </div>

          <button
            onClick={() =>
              alert("Proceeding to checkout/booking confirmation!")
            }
            className="w-full bg-[#A0522D] hover:bg-[#202522] text-white font-bold py-4 rounded-full text-xs uppercase tracking-widest transition shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* View Details Popup Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8E8E3] space-y-6 relative animate-scale-up">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center space-x-4 border-b border-[#E8E8E3] pb-4">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-16 h-16 rounded-xl object-cover border border-[#E8E8E3]"
              />
              <div>
                <h3 className="text-xl font-serif font-bold text-gray-900">
                  {selectedItem.name}
                </h3>
                <p className="text-xs text-[#202522] font-semibold uppercase tracking-wider">
                  Package Details
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between bg-[#EEF6EB] px-4 py-2.5 rounded-xl">
                <span className="text-gray-500">Unit Price:</span>
                <span className="font-bold text-gray-900">
                  ₹{Number(selectedItem.unitNumeric).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between bg-[#EEF6EB] px-4 py-2.5 rounded-xl">
                <span className="text-gray-500">Selected Quantity:</span>
                <span className="font-bold text-[#202522]">
                  {selectedItem.quantity} Unit
                  {selectedItem.quantity > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex justify-between bg-[#EEF6EB] px-4 py-2.5 rounded-xl">
                <span className="text-gray-500">Total Calculated Price:</span>
                <span className="font-bold text-[#202522]">
                  {selectedItem.formattedItemTotal}
                </span>
              </div>
              <div className="flex items-center justify-between bg-emerald-50 px-4 py-2.5 rounded-xl text-emerald-900">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span className="text-xs font-semibold uppercase">
                    Event/Booking Date:
                  </span>
                </div>
                <span className="font-bold text-xs">
                  Standard Slot (As Selected)
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="w-full bg-[#202522] hover:bg-black text-white font-bold py-3 rounded-full text-xs uppercase tracking-widest transition shadow-md cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

