"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, ShoppingBag, Plus, Minus, X, Check } from "lucide-react";
import { janmashtamiProducts } from "@/app/data/janmashtamiProducts";
import { useCart } from "@/app/context/CartContext";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function JanmashtamiProductDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = Number(resolvedParams.id);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const product = janmashtamiProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold font-serif text-neutral-900 mb-2">404</h1>
        <p className="text-neutral-600 mb-6">Product nahi mila bhai!</p>
        <Link
          href="/Festivals/janmasthmi"
          className="bg-neutral-950 text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold hover:bg-emerald-600 transition"
        >
          Back to Main Page
        </Link>
      </div>
    );
  }

  const totalPrice = Number(product.price) * quantity;

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: String(product.id),
        name: product.name,
        price: product.price,
        image: product.image,
        desc: product.desc,
        category: "Janmashtami Celebration",
      });
    }
  };

  const handleConfirmOrder = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsConfirmed(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] px-6 py-10 relative">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link
          href="/Festivals/janmasthmi"
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-900 hover:text-neutral-950 bg-white border border-emerald-300/60 px-4 py-2 rounded-full transition shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>Back to Main Page</span>
        </Link>

        {/* Product Details Section */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-emerald-200/80 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
          <div className="w-full h-80 md:h-[450px] bg-neutral-50 rounded-2xl overflow-hidden relative p-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full inline-block">
                Janmashtami Special
              </span>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900">
                {product.name}
              </h1>
              <p className="text-neutral-600 text-sm leading-relaxed font-light">
                {product.fullDesc}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-neutral-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Key Features:
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-xs text-neutral-600 font-light">
                    <CheckCircle size={14} className="text-emerald-700 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector Section */}
            <div className="flex items-center space-x-4 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                Quantity:
              </span>
              <div className="flex items-center border border-emerald-200 rounded-full bg-emerald-50/50 px-3 py-1 space-x-3">
                <button
                  onClick={handleDecrease}
                  className="text-neutral-700 hover:text-emerald-800 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-bold text-neutral-900 w-4 text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="text-neutral-700 hover:text-emerald-800 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">
                  Total Price
                </span>
                <span className="text-neutral-900 font-bold text-2xl">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAddToCart}
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold px-5 py-3.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow-sm border border-emerald-200 flex items-center space-x-2"
                >
                  <ShoppingBag size={16} />
                  <span>Add To Cart</span>
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-neutral-950 hover:bg-emerald-800 text-white font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-md"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Confirmation Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative border border-emerald-100 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 p-1 rounded-full bg-neutral-100"
            >
              <X size={18} />
            </button>

            {isConfirmed ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check size={24} />
                </div>
                <h3 className="text-xl font-serif font-bold text-neutral-900">
                  Your order is confirmed!
                </h3>
                <p className="text-xs text-neutral-500">
                  Thank you for booking with us. Happy Janmashtami!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full tracking-widest">
                    Order Summary
                  </span>
                  <h3 className="text-xl font-serif font-bold text-neutral-900 mt-3">
                    Confirm Your Booking
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Review your item and quantity before finalizing.
                  </p>
                </div>

                <div className="flex items-center space-x-4 p-3 rounded-2xl border border-emerald-200/60 bg-emerald-50/30">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 font-serif">
                      {product.name}
                    </h4>
                    <p className="text-xs text-neutral-500 mt-0.5">Qty: {quantity}</p>
                    <p className="text-sm font-extrabold text-neutral-900 mt-1">
                      ₹{totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold py-3 rounded-2xl text-xs uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmOrder}
                    className="flex-1 bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-3 rounded-2xl text-xs uppercase tracking-wider transition-colors shadow"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}