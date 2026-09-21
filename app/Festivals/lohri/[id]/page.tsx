"use client";

import Link from "next/link";
import { lohriProducts } from "@/app/data/lohriProducts";
import { use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function LohriProductDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

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

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 py-10">
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

            <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-neutral-400 block font-semibold">
                  Price
                </span>
                <span className="text-neutral-900 font-bold text-2xl">
                  ₹{product.price.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => alert(`Booking confirmed for ${product.name}!`)}
                className="bg-neutral-950 hover:bg-amber-500 hover:text-neutral-950 text-white font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}