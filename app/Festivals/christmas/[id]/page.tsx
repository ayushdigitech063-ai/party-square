"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, ArrowRight, Plus, Minus, ShoppingBag, X } from "lucide-react";
import { christmasProducts } from "@/app/data/christmasProducts";
import { useCart } from "@/app/context/CartContext";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ChristmasProductDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const product = christmasProducts.find((p) => p.id === productId);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FBF9F4] flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold font-serif text-neutral-900 mb-2">404</h1>
        <p className="text-neutral-600 mb-6">Product nahi mila bhai!</p>
        <Link
          href="/Festivals/christmas/all-products"
          className="bg-neutral-950 text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold hover:bg-red-600 transition"
        >
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: `₹${product.price.toLocaleString("en-IN")}`,
        numericPrice: product.numericPrice || product.price,
        image: product.image,
        desc: product.desc,
      },
      quantity
    );
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link
          href="/Festivals/christmas/all-products"
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-red-700 hover:text-neutral-950 bg-white border border-red-200 px-4 py-2 rounded-full transition shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>Back to All Products</span>
        </Link>

        {/* Product Details Section */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-red-200/60 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
          <div className="w-full h-80 md:h-[450px] bg-neutral-50 rounded-2xl overflow-hidden relative p-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="bg-red-100 text-red-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full inline-block">
                Christmas Special
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
                    <CheckCircle size={14} className="text-red-600 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 pt-4 border-t border-neutral-100">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">Quantity:</span>
              <div className="flex items-center border border-neutral-300 rounded-full px-3 py-1 space-x-3 bg-neutral-50">
                <button onClick={handleDecrement} className="text-neutral-600 hover:text-black cursor-pointer">
                  <Minus size={14} />
                </button>
                <span className="text-sm font-bold text-neutral-900">{quantity}</span>
                <button onClick={handleIncrement} className="text-neutral-600 hover:text-black cursor-pointer">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">
                  Price
                </span>
                <span className="text-neutral-900 font-bold text-2xl">
                  ₹{(product.price * quantity).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-5 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-sm flex items-center space-x-1.5 cursor-pointer"
                >
                  <ShoppingBag size={16} />
                  <span>Add to Cart</span>
                </button>

                {/* Book Now Button triggering Popup */}
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-neutral-950 hover:bg-red-600 hover:text-white text-white font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-md flex items-center space-x-1 cursor-pointer"
                >
                  <span>Book Now</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Confirmation Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 space-y-4 text-center relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X size={20} />
            </button>
            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-lg font-serif font-bold text-neutral-900">Booking Confirmed!</h3>
            <p className="text-xs text-neutral-600 font-light">
              Aapka order (<span className="font-semibold">{product.name}</span>) quantity <span className="font-semibold">{quantity}</span> ke sath successfully book ho gaya hai.
            </p>
            <div className="pt-4 flex space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs uppercase font-bold py-3 rounded-full transition cursor-pointer"
              >
                Close
              </button>
              <Link
                href="/Festivals/christmas/all-products"
                className="flex-1 bg-neutral-950 hover:bg-red-600 text-white text-xs uppercase font-bold py-3 rounded-full transition flex items-center justify-center cursor-pointer"
              >
                Back to Catalogue
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}