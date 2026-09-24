"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { ArrowLeft, Plus, Minus, X, Check, ShoppingBag } from "lucide-react";
import { ganeshProducts } from "@/app/data/ganeshProducts";
import { useCart } from "@/app/context/CartContext";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function GaneshProductDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = Number(resolvedParams.id);
  const router = useRouter();

  const product = ganeshProducts.find((p) => p.id === productId);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [cartMessage, setCartMessage] = useState(false);

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

 const totalPrice = Number(product.price) * quantity;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

const handleAddToCart = () => {
  addToCart(
    {
      id: String(product.id),
      name: product.name,
      price: String(product.price),
      image: product.image,
      desc: product.desc || "",
      category: "Ganesh Chaturthi Decoration",
    },
    quantity  // ✅ ab quantity alag second argument ki tarah jaa rahi hai
  );
  setCartMessage(true);
  setTimeout(() => setCartMessage(false), 2000);
};
  const handleBookNowClick = () => setIsModalOpen(true);

  const handleConfirmBooking = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 py-10 relative">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link
          href="/Festivals/ganeshchaturthi/all-products"
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-amber-600"
        >
          <ArrowLeft size={14} />
          <span>Back to All Products</span>
        </Link>

        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-amber-200/60 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
          <div className="w-full h-80 md:h-[420px] bg-neutral-50 rounded-2xl overflow-hidden relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900">{product.name}</h1>
              <p className="text-neutral-500 text-sm leading-relaxed">{product.fullDesc}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Key Features:</h3>
              <ul className="list-disc list-inside text-xs text-neutral-600 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider mb-1">Quantity</span>
                <div className="flex items-center space-x-3 bg-neutral-100 border border-neutral-200 rounded-full px-3 py-1.5">
                  <button onClick={handleDecrement} className="w-6 h-6 rounded-full bg-white text-neutral-700 flex items-center justify-center hover:bg-amber-500 hover:text-neutral-950 transition shadow-sm">
                    <Minus size={12} />
                  </button>
                  <span className="text-sm font-bold text-neutral-900 w-6 text-center">{quantity}</span>
                  <button onClick={handleIncrement} className="w-6 h-6 rounded-full bg-white text-neutral-700 flex items-center justify-center hover:bg-amber-500 hover:text-neutral-950 transition shadow-sm">
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase text-neutral-400 block font-semibold">Total Price</span>
                <span className="text-neutral-900 font-bold text-2xl">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Add to Cart + Book Now */}
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
                className="w-full sm:w-auto bg-neutral-950 hover:bg-amber-500 hover:text-neutral-950 text-white font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                Book Now
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
                <h3 className="text-xl font-serif font-bold text-neutral-900">Your order is confirmed!</h3>
                <p className="text-xs text-neutral-500">Redirecting you to the home page...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">
                    Order Summary
                  </span>
                  <h3 className="text-xl font-serif font-bold text-neutral-900">Confirm Your Booking</h3>
                  <p className="text-xs text-neutral-500">Review your item and quantity before finalizing.</p>
                </div>

                <div className="bg-neutral-50 rounded-2xl p-4 flex items-center gap-4 border border-neutral-200/60">
                  <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-neutral-900">{product.name}</p>
                    <p className="text-xs text-neutral-500">Qty: {quantity}</p>
                    <p className="text-sm font-bold text-amber-700 mt-1">₹{totalPrice.toLocaleString()}</p>
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
                    className="flex-1 bg-neutral-950 hover:bg-amber-500 hover:text-neutral-950 text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-md"
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