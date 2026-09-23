"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, ArrowRight, Plus, Minus, X, Check, ShoppingBag } from "lucide-react";
import { independencedayProducts } from "@/app/data/independencedayProducts";
import { useCart } from "@/app/context/CartContext";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function IndependenceDayProductDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const product = independencedayProducts.find((p) => p.id === productId);
  const { addToCart } = useCart();

  // State for quantity management
  const [quantity, setQuantity] = useState(1);
  // State for confirmation modal popup / success message
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [cartMessage, setCartMessage] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FBF9F4] flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold font-serif text-neutral-900 mb-2">404</h1>
        <p className="text-neutral-600 mb-6">Product nahi mila bhai!</p>
        <Link
          href="/Festivals/independenceday/all-products"
          className="bg-neutral-950 text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold hover:bg-amber-600 transition"
        >
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Fixed Add to Cart Handler: passing product object and quantity as second argument
  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        numericPrice: product.price,
      },
      quantity
    );

    setCartMessage(true);
    setTimeout(() => {
      setCartMessage(false);
    }, 2000);
  };

  const handleBookNowClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmBooking = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsConfirmed(false);
    }, 2000);
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="min-h-screen bg-[#FBF9F4] px-6 py-10 relative">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link
          href="/Festivals/independenceday/all-products"
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-700 hover:text-neutral-950 bg-white border border-amber-200 px-4 py-2 rounded-full transition shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>Back to All Products</span>
        </Link>

        {/* Product Details Section */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-amber-200/60 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
          <div className="w-full h-80 md:h-[450px] bg-neutral-50 rounded-2xl overflow-hidden relative p-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full inline-block">
                Patriotic Special
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
                    <CheckCircle size={14} className="text-amber-600 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector Section */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider mb-1">
                  Quantity
                </span>
                <div className="flex items-center space-x-3 bg-neutral-100 border border-neutral-200 rounded-full px-3 py-1.5">
                  <button
                    onClick={handleDecrement}
                    className="w-6 h-6 rounded-full bg-white text-neutral-700 flex items-center justify-center hover:bg-amber-600 hover:text-white transition shadow-sm"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm font-bold text-neutral-900 w-6 text-center">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    className="w-6 h-6 rounded-full bg-white text-neutral-700 flex items-center justify-center hover:bg-amber-600 hover:text-white transition shadow-sm"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">
                  Total Price
                </span>
                <span className="text-neutral-900 font-bold text-2xl">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Action Buttons: Add to Cart & Book Now */}
            <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-end gap-3 relative">
              {cartMessage && (
                <span className="text-xs text-green-600 font-bold animate-pulse absolute -top-6 right-0">
                  ✓ Successfully added to cart!
                </span>
              )}
              
              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center space-x-2"
              >
                <ShoppingBag size={16} />
                <span>Add To Cart</span>
              </button>

              <button
                onClick={handleBookNowClick}
                className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-white font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center space-x-1"
              >
                <span>Book Now</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Confirmation Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-100 animate-in fade-in zoom-in duration-200 relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 transition"
            >
              <X size={20} />
            </button>

            {isConfirmed ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Check size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold text-neutral-900">Booking Confirmed!</h3>
                <p className="text-xs text-neutral-500">Aapki booking successfully submit ho gayi hai. Hum jald hi aapse contact karenge.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">
                    Order Summary
                  </span>
                  <h3 className="text-xl font-serif font-bold text-neutral-900">{product.name}</h3>
                </div>

                <div className="bg-neutral-50 rounded-2xl p-4 space-y-2 border border-neutral-200/60 text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>Quantity:</span>
                    <span className="font-bold text-neutral-900">{quantity}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Price per item:</span>
                    <span className="font-bold text-neutral-900">₹{product.price.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-neutral-200 pt-2 flex justify-between text-sm">
                    <span className="font-bold text-neutral-900">Total Amount:</span>
                    <span className="font-bold text-amber-600 text-base">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="flex-1 bg-amber-600 hover:bg-amber-500 text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-md"
                  >
                    Confirm Booking
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