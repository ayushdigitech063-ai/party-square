
"use client"; 
"use client";

import Link from "next/link";
import { diwaliProducts } from "@/app/data/diwaliProducts";
import { use, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { ShoppingBag, Calendar, CheckCircle2, Minus, Plus } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DiwaliProductDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = Number(resolvedParams.id);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  const product = diwaliProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold font-serif text-neutral-900 mb-2">404</h1>
        <p className="text-neutral-600 mb-6">No products available</p>
        <Link
          href="/Festivals/diwali/all-products"
          className="bg-neutral-950 text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold"
        >
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: String(product.id),
        name: product.name,
        price: String(product.price),
        image: product.image,
        desc: product.fullDesc || product.desc || "",
        category: "Diwali Decoration",
      });
    }
  };

  const handleBookNow = () => {
    setShowModal(true);
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 py-10 relative">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link
          href="/Festivals/diwali/all-products"
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

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                Quantity:
              </span>
              <div className="flex items-center border border-neutral-300 rounded-full overflow-hidden px-3 py-1 bg-neutral-50">
                <button
                  onClick={handleDecrement}
                  className="p-1 hover:text-amber-600 text-neutral-600 cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 text-sm font-bold text-neutral-900">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="p-1 hover:text-amber-600 text-neutral-600 cursor-pointer"
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
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleAddToCart}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center space-x-2 cursor-pointer"
                >
                  <ShoppingBag size={15} />
                  <span>Add to cart</span>
                </button>

                <button
                  onClick={handleBookNow}
                  className="bg-[#5c2c16] hover:bg-[#431f10] text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md flex items-center space-x-2 cursor-pointer"
                >
                  <Calendar size={15} />
                  <span>Book now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-4 border border-amber-100">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-xl font-serif font-bold text-neutral-900">
              Booking Confirmed!
            </h2>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Aapka <span className="font-semibold text-neutral-900">{product.name}</span> (Qty: {quantity}) successfully book ho gaya hai.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-neutral-950 text-white font-bold py-3 rounded-full text-xs uppercase tracking-wider hover:bg-amber-500 hover:text-neutral-950 transition-colors cursor-pointer"
              >
                OK / Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}