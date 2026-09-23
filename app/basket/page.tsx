"use client";

import React, { useState, useEffect } from "react";
import { Trash2, ShoppingBag, ArrowRight, Sparkles, Eye, X, Calendar } from "lucide-react";
import Link from "next/link";

export default function BasketPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Component load hone par aur localStorage change hone par cart load karna
  useEffect(() => {
    const fetchCart = () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
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
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Events dispatch karna taaki header aur baaki components update ho jayein
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Calculate Overall Summary safely
  const totalItemsCount = cart.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);
  const grandTotalPrice = cart.reduce((acc, item) => {
    const price = Number(item.numericPrice) || Number(item.price?.toString().replace(/[^0-9]/g, "")) || item.price || 0;
    const qty = Number(item.quantity) || 1;
    return acc + (Number(price) * qty);
  }, 0);
  const formattedGrandTotal = `₹${grandTotalPrice.toLocaleString("en-IN")}`;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center text-center px-4 font-sans">
        <div className="w-20 h-20 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <ShoppingBag size={36} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Your Basket is Empty</h2>
        <p className="text-gray-600 text-sm max-w-md mb-6">Looks like you haven't added any decoration packages to your basket yet.</p>
        <Link href="/" className="bg-amber-900 hover:bg-black text-white px-8 py-3 rounded-full text-xs uppercase font-bold tracking-widest transition shadow-lg">
          Explore Decorations
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 px-4 sm:px-8 md:px-16 text-gray-900 font-sans relative">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-200 pb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Your Basket</h1>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Review your selected decoration packages</p>
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
            const unitNumeric = Number(item.numericPrice) || Number(item.price?.toString().replace(/[^0-9]/g, "")) || item.price || 0;
            const quantity = Number(item.quantity) || 1;
            const itemTotal = Number(unitNumeric) * quantity;
            const formattedItemTotal = `₹${itemTotal.toLocaleString("en-IN")}`;

            return (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl border border-amber-200 shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition hover:shadow-md"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-amber-50 border border-amber-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-serif font-bold text-gray-900">{item.name}</h3>
                    <p className="text-xs text-gray-500">Unit Price: ₹{Number(unitNumeric).toLocaleString("en-IN")}</p>
                    <div className="inline-flex items-center space-x-1 bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                      <span>Quantity: {quantity} Unit{quantity > 1 ? "s" : ""}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-amber-100">
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Total Price</p>
                    <p className="text-lg font-bold text-amber-900">{formattedItemTotal}</p>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => setSelectedItem({ ...item, unitNumeric, quantity, formattedItemTotal })}
                    className="px-3.5 py-2 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition cursor-pointer"
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
        <div className="bg-white rounded-3xl border border-amber-300 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center space-x-2 text-amber-900">
            <Sparkles size={18} />
            <h3 className="text-xl font-serif font-bold">Overall Order Summary</h3>
          </div>

          <div className="space-y-3 border-t border-b border-amber-100 py-4 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Total Unique Items:</span>
              <span className="font-semibold text-gray-900">{cart.length}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Total Quantity Added:</span>
              <span className="font-semibold text-gray-900">{totalItemsCount} Units</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-amber-50">
              <span>Grand Total Price:</span>
              <span className="text-amber-900 text-xl">{formattedGrandTotal}</span>
            </div>
          </div>

          <button
            onClick={() => alert("Proceeding to checkout/booking confirmation!")}
            className="w-full bg-[#A0522D] hover:bg-amber-900 text-white font-bold py-4 rounded-full text-xs uppercase tracking-widest transition shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>

      {/* View Details Popup Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-amber-200 space-y-6 relative animate-scale-up">
            
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center space-x-4 border-b border-amber-100 pb-4">
              <img src={selectedItem.image} alt={selectedItem.name} className="w-16 h-16 rounded-xl object-cover border border-amber-200" />
              <div>
                <h3 className="text-xl font-serif font-bold text-gray-900">{selectedItem.name}</h3>
                <p className="text-xs text-amber-800 font-semibold uppercase tracking-wider">Package Details</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between bg-amber-50 px-4 py-2.5 rounded-xl">
                <span className="text-gray-500">Unit Price:</span>
                <span className="font-bold text-gray-900">₹{Number(selectedItem.unitNumeric).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between bg-amber-50 px-4 py-2.5 rounded-xl">
                <span className="text-gray-500">Selected Quantity:</span>
                <span className="font-bold text-amber-900">{selectedItem.quantity} Unit{selectedItem.quantity > 1 ? "s" : ""}</span>
              </div>
              <div className="flex justify-between bg-amber-50 px-4 py-2.5 rounded-xl">
                <span className="text-gray-500">Total Calculated Price:</span>
                <span className="font-bold text-amber-900">{selectedItem.formattedItemTotal}</span>
              </div>
              <div className="flex items-center justify-between bg-emerald-50 px-4 py-2.5 rounded-xl text-emerald-900">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span className="text-xs font-semibold uppercase">Event/Booking Date:</span>
                </div>
                <span className="font-bold text-xs">Standard Slot (As Selected)</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="w-full bg-amber-900 hover:bg-black text-white font-bold py-3 rounded-full text-xs uppercase tracking-widest transition shadow-md cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
}