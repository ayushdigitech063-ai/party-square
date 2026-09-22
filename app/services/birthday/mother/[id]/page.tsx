"use client";

import Link from "next/link";
import { birthdayProducts } from "../../data/motherbirthdayproduct";
import { use } from "react";
import { useRouter } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BirthdayProduct({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const productId = Number(resolvedParams.id);

  const product = birthdayProducts.find((p) => p.id == productId);

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-amber-600"
        >
          &larr; Back to All Products
        </button>

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
                {product.description}
              </p>
            </div>

            {/* <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Key Features:
              </h3>
              <ul className="list-disc list-inside text-xs text-neutral-600 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div> */}

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
                onClick={() => alert(`Booked successfully!`)}
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
