"use client";

import Link from "next/link";
import { lohriProducts } from "@/app/data/lohriProducts";
import { use, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { ShoppingBag, X, Check, Plus, Minus } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function LohriProductDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const product = lohriProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold font-serif text-neutral-900 mb-2">404</h1>
        <p className="text-neutral-600 mb-6">Product nahi mila bhai!</p>
        <Link
          href="/Festivals/lohri/all-products"
          className="bg-neutral-950 text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold"
        >
          Back to Catalogue
        </Link>
      </div>
    );
  }

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
        price: String(product.price),
        image: product.image,
        desc: product.desc || "",
        category: "Lohri Celebration",
      });
    }
    // Silent add without alert
  };

  const handleConfirmOrder = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsConfirmed(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 py-10 relative">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link
          href="/Festivals/lohri/all-products"
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
              <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                Product ID: {product.id}
              </span>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900 mt-2">
                {product.name}
              </h1>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {product.fullDesc}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Key Features:
              </h3>
              <ul className="list-disc list-inside text-xs text-neutral-600 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector Section */}
            <div className="flex items-center space-x-4 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                Quantity:
              </span>
              <div className="flex items-center border border-amber-200 rounded-full bg-amber-50/50 px-3 py-1 space-x-3">
                <button
                  onClick={handleDecrease}
                  className="text-neutral-700 hover:text-amber-700 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-bold text-neutral-900 w-4 text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="text-neutral-700 hover:text-amber-700 transition-colors"
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
                  ₹{(product.price * quantity).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                {/* Proper Add to Cart Button with Text and Icon */}
                <button
                  onClick={handleAddToCart}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-5 py-3.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow-sm border border-amber-200 flex items-center space-x-2"
                >
                  <ShoppingBag size={16} />
                  <span>Add To Cart</span>
                </button>

                {/* Book Now Button opening Custom Modal */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-neutral-950 hover:bg-amber-500 hover:text-neutral-950 text-white font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative border border-amber-100 animate-in fade-in zoom-in duration-200">
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
                  Redirecting you to the home page...
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full tracking-widest">
                    Order Summary
                  </span>
                  <h3 className="text-xl font-serif font-bold text-neutral-900 mt-3">
                    Confirm Your Booking
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Review your item and quantity before finalizing.
                  </p>
                </div>

                {/* Item Card inside Modal */}
                <div className="flex items-center space-x-4 p-3 rounded-2xl border border-amber-200/60 bg-amber-50/30">
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
                      ₹{(product.price * quantity).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex items-center space-x-3 pt-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold py-3 rounded-2xl text-xs uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmOrder}
                    className="flex-1 bg-[#78350f] hover:bg-amber-900 text-white font-bold py-3 rounded-2xl text-xs uppercase tracking-wider transition-colors shadow"
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