"use client";

import Link from "next/link";
import { ganeshProducts } from "@/app/data/ganeshProducts";
import { ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/wishlistcontext";

export default function GaneshAllProductsPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-neutral-900 text-3xl font-serif font-bold mb-2">
          Ganesh Chaturthi - All Products Catalogue
        </h1>
        <p className="text-neutral-600 text-sm mb-8 font-light">
          Explore our complete collection of divine decoration and puja packages for Bappa.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ganeshProducts.map((product) => {
            const isLiked = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-amber-200/60 flex flex-col justify-between group"
              >
                <div className="w-full h-56 bg-neutral-50 flex items-center justify-center overflow-hidden relative p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-5 left-5 bg-amber-500 text-neutral-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    Ganpati Special
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                    className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Heart size={16} className={isLiked ? "fill-rose-500 text-rose-500" : "text-gray-700"} />
                  </button>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h2 className="text-neutral-900 text-base font-serif font-bold transition-colors">{product.name}</h2>
                    <p className="text-neutral-500 text-xs leading-relaxed font-light">{product.desc}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">Starts At</span>
                      <span className="text-neutral-900 font-bold text-base">₹{product.price.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          addToCart({
                            id: String(product.id),
                            name: product.name,
                            price: String(product.price),
                            image: product.image,
                            desc: product.desc || "",
                            category: "Ganesh Chaturthi Decoration",
                          })
                        }
                        title="Add to Cart"
                        className="w-10 h-10 rounded-full bg-[#FFF5DC] border border-amber-200 text-amber-900 flex items-center justify-center hover:bg-amber-500 hover:text-neutral-950 transition-colors shadow-sm cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>

                      <Link
                        href={`/Festivals/ganeshchaturthi/${product.id}`}
                        className="bg-[#D97706] hover:bg-[#B45309] text-white font-bold px-4 py-2.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow inline-flex items-center gap-1 text-center"
                      >
                        Book &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}