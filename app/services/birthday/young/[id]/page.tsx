"use client";

import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import {newYearCards,  hotelCards,  outdoorCards } from "../page";
import { ArrowLeft, Check } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function YoungBirthdayPage({ params }: PageProps) {
    const router = useRouter();
  const resolvedParams = use(params);

  const productId = Number(resolvedParams.id);
   const product = newYearCards.find((item) => item.id == productId) || hotelCards.find((item) => item.id == productId) || outdoorCards.find((item) => item.id == productId);

  
   if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mb-3">
            Product Not Found
          </h1>

          <p className="text-neutral-500 mb-6">
            The decoration package you're looking for doesn't exist.
          </p>

          <button
            onClick={() => router.back()}
            className="bg-neutral-950 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-[#C5A059] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to All Products
        </button>

        {/* Product Details */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-[#E2D2B0]/50 grid grid-cols-1 md:grid-cols-2">

          {/* Product Image */}
          <div className="relative h-[400px] md:h-[600px] bg-neutral-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6">
              <span className="bg-[#C5A059] text-neutral-950 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">
                New Year's Collection
              </span>
            </div>
          </div>

          {/* Product Information */}
          <div className="p-8 md:p-12 flex flex-col justify-between">

            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                Exclusive Decoration
              </span>

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mt-3 mb-5">
                {product.name}
              </h1>

              <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                {product.desc}
              </p>

              {/* Features */}
              <div className="border-t border-neutral-100 pt-6 space-y-4">

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#C5A059]/10 flex items-center justify-center">
                    <Check size={14} className="text-[#C5A059]" />
                  </div>

                  <span className="text-sm text-neutral-700">
                    Premium decoration setup
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#C5A059]/10 flex items-center justify-center">
                    <Check size={14} className="text-[#C5A059]" />
                  </div>

                  <span className="text-sm text-neutral-700">
                    Professional setup team
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#C5A059]/10 flex items-center justify-center">
                    <Check size={14} className="text-[#C5A059]" />
                  </div>

                  <span className="text-sm text-neutral-700">
                    Customized according to your celebration
                  </span>
                </div>

              </div>
            </div>

            {/* Price + Book */}
            <div className="border-t border-neutral-100 mt-10 pt-6">

              <div className="flex items-end justify-between mb-6">

                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                    Starts At
                  </span>

                  <span className="text-neutral-900 font-bold text-3xl">
                    {product.price}
                  </span>
                </div>

              </div>

              <button
                onClick={() => {
                  alert(`Booking ${product.name}`);
                }}
                className="w-full bg-neutral-950 hover:bg-[#C5A059] hover:text-neutral-950 text-white font-bold px-8 py-4 rounded-full text-xs uppercase tracking-widest transition-all duration-300 shadow-md"
              >
                Book This Package
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}