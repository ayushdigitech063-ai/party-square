"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";
import { independencedayProducts } from "@/app/data/independencedayProducts";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function IndependenceDayProductDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const product = independencedayProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FBF9F4] flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold font-serif text-neutral-900 mb-2">404</h1>
        <p className="text-neutral-600 mb-6">Product nahi mila bhai!</p>
        <Link
          href="/Festivals/independenceday/all-products"
          className="bg-neutral-950 text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold hover:bg-orange-600 transition"
        >
          Back to Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link
          href="/Festivals/independenceday/all-products"
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-orange-700 hover:text-neutral-950 bg-white border border-orange-200 px-4 py-2 rounded-full transition shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>Back to All Products</span>
        </Link>

        {/* Product Details Section */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-orange-200/60 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
          <div className="w-full h-80 md:h-[450px] bg-neutral-50 rounded-2xl overflow-hidden relative p-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="bg-orange-100 text-orange-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full inline-block">
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
                    <CheckCircle size={14} className="text-orange-600 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">
                  Price
                </span>
                <span className="text-neutral-900 font-bold text-2xl">
                  ₹{product.price.toLocaleString()}
                </span>
              </div>

              <Link
                href="/contact"
                className="bg-neutral-950 hover:bg-orange-600 hover:text-white text-white font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-md flex items-center space-x-1"
              >
                <span>Book Now</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}