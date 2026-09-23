"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { galleryCategories, GalleryItem } from "@/app/data/galleryData";
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag, Sparkles, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function GalleryItemDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [foundItem, setFoundItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (params?.id) {
      const resolvedId = Array.isArray(params.id) ? params.id[0] : params.id;
      let matchedItem: GalleryItem | null = null;
      
      for (const cat of galleryCategories) {
        const item = cat.items.find((i) => i.id === resolvedId);
        if (item) {
          matchedItem = item;
          break;
        }
      }
      setFoundItem(matchedItem);
      setLoading(false);
    }
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center text-center">
        <p className="text-amber-900 font-serif text-lg">Loading...</p>
      </div>
    );
  }

  if (!foundItem) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center text-center px-4 font-sans">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Item Not Found</h2>
        <Link href="/" className="bg-amber-900 text-white px-6 py-2.5 rounded-full text-xs uppercase font-bold transition">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "inc") setQuantity((prev) => prev + 1);
    if (type === "dec" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const totalPrice = foundItem.numericPrice * quantity;
  const formattedTotalPrice = `₹${totalPrice.toLocaleString("en-IN")}`;

  const handleAddToCart = () => {
    if (foundItem) {
      addToCart(
        {
          id: foundItem.id,
          name: foundItem.name,
          price: foundItem.price,
          numericPrice: foundItem.numericPrice,
          image: foundItem.src,
          desc: foundItem.desc,
        },
        quantity
      );
    }
  };

  const handleConfirmBooking = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 px-4 sm:px-8 md:px-16 text-gray-900 font-sans relative">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-900 bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-full transition cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-3xl border border-amber-200 shadow-xl p-6 sm:p-10">
          
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-amber-50 border border-amber-100">
            <img src={foundItem.src} alt={foundItem.name} className="w-full h-full object-cover" />
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow hover:scale-110 transition cursor-pointer"
            >
              <Heart size={18} className={isLiked ? "fill-rose-500 text-rose-500" : "text-gray-700"} />
            </button>
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-1.5 bg-amber-100 px-3 py-1 rounded-full text-amber-900 text-xs font-semibold uppercase">
                <Sparkles size={13} className="text-amber-700" />
                <span>{foundItem.categoryTitle}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">{foundItem.name}</h1>

              <div className="space-y-1">
                <p className="text-2xl font-bold text-amber-900">
                  {formattedTotalPrice} <span className="text-xs font-light text-gray-500">({quantity} Unit{quantity > 1 ? "s" : ""})</span>
                </p>
                <p className="text-xs text-gray-400">Unit Price: {foundItem.price}</p>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed font-light">{foundItem.desc}. Crafted professionally for your event.</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-amber-100">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-gray-700">Select Quantity:</span>
                <div className="flex items-center space-x-3 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
                  <button onClick={() => handleQuantityChange("dec")} className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow hover:bg-amber-100 transition cursor-pointer">
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-sm w-6 text-center">{quantity}</span>
                  <button onClick={() => handleQuantityChange("inc")} className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow hover:bg-amber-100 transition cursor-pointer">
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3.5 rounded-full text-xs uppercase tracking-widest transition shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <ShoppingBag size={16} />
                  <span>Add to Basket</span>
                </button>

                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="w-full bg-[#A0522D] hover:bg-amber-900 text-white font-bold py-3.5 rounded-full text-xs uppercase tracking-widest transition shadow-lg flex items-center justify-center space-x-2 text-center cursor-pointer"
                >
                  <span>Book Now</span>
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-amber-200 space-y-6 text-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <AlertCircle size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-gray-900">Are you sure?</h3>
              <p className="text-sm text-gray-600">
                Do you want to confirm the booking for <span className="font-semibold text-amber-900">{foundItem.name}</span> ({quantity} unit{quantity > 1 ? "s" : ""} - {formattedTotalPrice})?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-full text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="w-full bg-amber-900 hover:bg-black text-white font-bold py-3 rounded-full text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
              >
                Yes, Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-emerald-200 space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-gray-900">Booking Successful!</h3>
              <p className="text-sm text-gray-600">
                Your booking for <span className="font-semibold text-amber-900">{foundItem.name}</span> has been successfully placed. Our team will contact you soon!
              </p>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                router.push("/");
              }}
              className="w-full bg-amber-900 hover:bg-black text-white font-bold py-3.5 rounded-full text-xs uppercase tracking-widest transition shadow-md cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}