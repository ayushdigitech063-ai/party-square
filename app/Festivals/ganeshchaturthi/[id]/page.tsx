"use client";

import Link from "next/link";
import { ganeshProducts } from "@/app/data/ganeshProducts";
import { use, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { ShoppingBag, Plus, Minus, CheckCircle2, X, Sparkles } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function GaneshProductDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const product = ganeshProducts.find((p) => p.id === productId);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold font-serif text-neutral-900 mb-2">404</h1>
        <p className="text-neutral-600 mb-6">Product nahi mila!</p>
        <Link
          href="/Festivals/ganeshchaturthi/all-products"
          className="bg-neutral-950 text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold"
        >
          Back to Catalogue
        </Link>
      </div>
    );
  }

  // Quantity handlers
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Calculate total price based on quantity
  const unitNumeric = Number(product.numericPrice) || Number(product.price?.toString().replace(/[^0-9]/g, "")) || 0;
  const totalPrice = unitNumeric * quantity;
  const formattedTotalPrice = `₹${totalPrice.toLocaleString("en-IN")}`;

  const handleAddToCartClick = () => {
    addToCart(product, quantity);
  };

  const handleFinalBooking = () => {
    setOrderConfirmed(true);
    setTimeout(() => {
      setShowConfirmModal(false);
      setOrderConfirmed(false);
      window.location.href = "/";
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 py-10 relative">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link
          href="/Festivals/ganeshchaturthi/all-products"
          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-amber-600"
        >
          &larr; Back to All Products
        </Link>

        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-amber-200/60 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
          <div className="w-full h-80 md:h-[420px] bg-neutral-50 rounded-2xl overflow-hidden relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900">
                {product.name}
              </h1>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {product.fullDesc || product.desc}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Key Features:
              </h3>
              <ul className="list-disc list-inside text-xs text-neutral-600 space-y-1">
                {product.features?.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-4 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">Quantity:</span>
              <div className="flex items-center border border-amber-200 rounded-full px-3 py-1 bg-amber-50/50">
                <button 
                  onClick={handleDecrease}
                  className="w-7 h-7 flex items-center justify-center text-neutral-700 hover:text-black cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-xs font-bold text-neutral-900">{quantity}</span>
                <button 
                  onClick={handleIncrease}
                  className="w-7 h-7 flex items-center justify-center text-neutral-700 hover:text-black cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-neutral-400 block font-semibold">
                  Total Price
                </span>
                <span className="text-neutral-900 font-bold text-2xl">
                  {formattedTotalPrice}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Add To Cart Button */}
                <button
                  onClick={handleAddToCartClick}
                  className="bg-[#FFF5DC] border border-amber-300 hover:bg-amber-400 text-amber-900 font-bold px-5 py-3.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag size={15} />
                  <span>Add to Cart</span>
                </button>

                {/* Book Now Button */}
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="bg-neutral-950 hover:bg-amber-600 text-white font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-amber-200 space-y-6 relative animate-scale-up">
            
            <button 
              onClick={() => { setShowConfirmModal(false); setOrderConfirmed(false); }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {!orderConfirmed ? (
              <>
                <div className="text-center space-y-1">
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full uppercase tracking-widest">Order Summary</span>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 pt-2">Confirm Your Booking</h3>
                  <p className="text-xs text-gray-500">Review your item and quantity before finalizing.</p>
                </div>

                <div className="flex items-center space-x-4 bg-amber-50/60 p-4 rounded-2xl border border-amber-100">
                  <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover border border-amber-200" />
                  <div className="space-y-0.5">
                    <h4 className="font-serif font-bold text-gray-900 text-sm">{product.name}</h4>
                    <p className="text-xs text-gray-500">Qty: {quantity} Unit{quantity > 1 ? "s" : ""}</p>
                    <p className="text-sm font-bold text-amber-900">{formattedTotalPrice}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-full text-xs uppercase tracking-widest transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFinalBooking}
                    className="flex-1 bg-amber-900 hover:bg-black text-white font-bold py-3 rounded-full text-xs uppercase tracking-widest transition shadow-md cursor-pointer"
                  >
                    Confirm Order
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif font-bold text-gray-900">Your order is confirmed!</h3>
                  <p className="text-xs text-gray-500">Redirecting you to the home page...</p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}