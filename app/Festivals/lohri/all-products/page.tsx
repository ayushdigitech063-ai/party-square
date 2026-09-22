"use client";

import Link from "next/link";
import { lohriProducts } from "@/app/data/lohriProducts";
import { useCart } from "@/app/context/CartContext";
import { ShoppingBag } from "lucide-react";

export default function LohriAllProductsPage() {
  const { addToCart } = useCart();

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: String(product.id),
      name: product.name,
      price: String(product.price),
      image: product.image,
      desc: product.desc || "",
      category: "Lohri Celebration",
    });
    // Koi alert ya popup nahi aayega, silent add hoga.
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-neutral-900 text-3xl font-serif font-bold mb-2">
          Lohri - All Products Catalogue
        </h1>
        <p className="text-neutral-600 text-sm mb-8 font-light">
          Explore our complete collection of traditional food, bonfire props, and decorative packages for Lohri.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lohriProducts.map((product) => (
            <Link
              key={product.id}
              href={`/Festivals/lohri/${product.id}`}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-amber-200/60 flex flex-col justify-between group block"
            >
              <div>
                <div className="w-full h-56 bg-neutral-50 flex items-center justify-center overflow-hidden relative p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-5 left-5 bg-amber-500 text-neutral-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    Lohri Special
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h2 className="text-neutral-900 text-base font-serif font-bold group-hover:text-amber-600 transition-colors line-clamp-1">
                    {product.name}
                  </h2>
                  <p className="text-neutral-500 text-xs leading-relaxed font-light line-clamp-2">
                    {product.desc}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">Starts At</span>
                    <span className="text-neutral-900 font-bold text-base">₹{product.price.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Add to Cart Symbol Button (No Alert) */}
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      title={`Add ${product.name} to Cart`}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-900 p-2.5 rounded-full transition-colors cursor-pointer border border-amber-200 shadow-sm"
                    >
                      <ShoppingBag size={16} />
                    </button>
                    
                    {/* Book Now Button */}
                    <span className="bg-neutral-950 hover:bg-amber-500 hover:text-neutral-950 text-white font-bold px-4 py-2.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow inline-block text-center">
                      Book Now
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}