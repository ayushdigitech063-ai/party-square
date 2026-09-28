"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, ShoppingCart, X, Plus, Minus, Check } from "lucide-react";
import { navratriProducts } from "@/app/data/navratriProducts";
import { useCart } from "@/app/context/CartContext";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function NavratriProductDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = Number(resolvedParams.id);
  const router = useRouter();
  const { addToCart } = useCart();

  const product = navratriProducts.find((p) => p.id === productId);

  // States for quantity, modals & cart notifications
  const [quantity, setQuantity] = useState(1);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isCartAdded, setIsCartAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FBF9F4] flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold font-serif text-neutral-900 mb-2">404</h1>
        <p className="text-neutral-600 mb-6">Product nahi mila bhai!</p>
        <Link
          href="/Festivals/navratri/all-products"
          className="bg-neutral-950 text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold hover:bg-rose-600 transition"
        >
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const totalPrice = Number(product.price) * quantity;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: String(product.id),
        name: product.name,
        price: product.price,
        image: product.image,
        desc: product.desc,
        category: "Navratri Decoration",
      });
    }

    setIsCartAdded(true);
    setTimeout(() => {
      setIsCartAdded(false);
    }, 3500);
  };

  const handleConfirmOrder = () => {
    setIsBookModalOpen(false);
    setIsSuccessModalOpen(true);
    setTimeout(() => {
      setIsSuccessModalOpen(false);
      router.push("/");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] px-4 sm:px-6 py-10 relative">
      
      {/* Cart Notification Toast */}
      {isCartAdded && (
        <div className="fixed bottom-6 left-6 z-50 bg-neutral-950 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-neutral-800 animate-in fade-in slide-in-from-bottom duration-300">
          <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover shadow" />
          <div>
            <div className="text-xs font-bold text-amber-400 font-serif">{product.name} ({quantity} Units)</div>
            <div className="text-[11px] text-neutral-300">successfully added to your basket!</div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link
          href="/Festivals/navratri/all-products"
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-rose-700 hover:text-neutral-950 bg-white border border-rose-200 px-4 py-2 rounded-full transition shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>Back to All Products</span>
        </Link>

        {/* Product Details Section */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-rose-100 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10 items-center">
          
          {/* Image Container */}
          <div className="w-full h-80 sm:h-96 md:h-[420px] bg-neutral-50 rounded-2xl overflow-hidden relative p-3 border border-neutral-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Details Container */}
          <div className="flex flex-col justify-between space-y-6 h-full">
            <div className="space-y-3">
              <span className="bg-rose-100 text-rose-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full inline-block">
                Navratri Special
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 leading-snug">
                {product.name}
              </h1>
              <p className="text-neutral-600 text-sm leading-relaxed font-light">
                {product.fullDesc}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                KEY FEATURES:
              </h3>
              <ul className="space-y-1.5">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2 text-xs text-neutral-600 font-light">
                    <CheckCircle size={14} className="text-rose-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">Quantity:</span>
              <div className="flex items-center border border-neutral-300 rounded-full px-3 py-1.5 bg-neutral-50 shadow-inner">
                <button 
                  onClick={handleDecrement}
                  className="text-neutral-600 hover:text-neutral-950 transition p-1"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 text-sm font-bold text-neutral-900">{quantity}</span>
                <button 
                  onClick={handleIncrement}
                  className="text-neutral-600 hover:text-neutral-950 transition p-1"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Total Price & Action Buttons */}
            <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">
                  Total Price
                </span>
                <span className="text-neutral-900 font-bold text-2xl">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 sm:flex-none bg-[#F5E6BE] hover:bg-[#ebd59f] text-neutral-950 font-bold px-5 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center space-x-2 border border-[#dfca96]"
                >
                  <ShoppingCart size={14} />
                  <span>Add to Cart</span>
                </button>

                {/* Book Now Button triggering Modal */}
                <button
                  onClick={() => setIsBookModalOpen(true)}
                  className="flex-1 sm:flex-none bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center space-x-1"
                >
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Booking Confirmation Modal Popup */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-rose-200 relative space-y-6 animate-in fade-in zoom-in duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsBookModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 bg-neutral-100 p-2 rounded-full transition"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-2">
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-1">
                ORDER SUMMARY
              </span>
              <h3 className="font-serif text-2xl font-bold text-neutral-900">Confirm Your Booking</h3>
              <p className="text-xs text-neutral-500">Review your item and quantity before finalizing.</p>
            </div>

            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 flex items-center space-x-4">
              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-xl shadow" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-neutral-900 font-serif">{product.name}</h4>
                <p className="text-xs text-neutral-500 font-medium">Qty: {quantity}</p>
                <span className="text-sm font-bold text-neutral-900">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleConfirmOrder}
                className="w-full bg-[#5c2c16] hover:bg-[#45200f] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center space-x-2"
              >
                <span>Confirm Order</span>
              </button>

              <button
                onClick={() => setIsBookModalOpen(false)}
                className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Success Popup Modal (Redirects to Home) */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-8 shadow-2xl border border-rose-200 text-center space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Check size={28} strokeWidth={3} />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-neutral-900">Your order is confirmed!</h3>
              <p className="text-xs text-neutral-500">Redirecting you to the home page...</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}