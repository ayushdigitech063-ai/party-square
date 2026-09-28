"use client";

import Link from "next/link";
import { navratriProducts, Product } from "@/app/data/navratriProducts";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/wishlistcontext";
import { ShoppingBag, Heart } from "lucide-react";

const formatPrice = (price: string) => `₹${Number(price).toLocaleString("en-IN")}`;

// Wishlist ko home page jaisi hi shape milti hai (price "₹1,299" format me)
const toWishlistItem = (product: Product) => ({
  id: product.id,
  name: product.name,
  price: formatPrice(product.price),
  image: product.image,
  desc: product.desc,
});

export default function AllProductsPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      desc: product.desc,
      category: "Navratri Decoration",
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-neutral-900 text-3xl font-serif font-bold mb-2">
          Navratri - All Products Catalogue
        </h1>
        <p className="text-neutral-600 text-sm mb-8 font-light">
          Explore our complete collection of Navratri puja essentials, Mata Ji pandal and Garba decoration packages.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {navratriProducts.map((product) => {
            const isLiked = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-rose-200/60 flex flex-col justify-between group"
              >
                <div className="w-full h-56 bg-neutral-50 flex items-center justify-center overflow-hidden relative p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-5 left-5 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    Navratri Special
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(toWishlistItem(product));
                    }}
                    aria-label={
                      isLiked ? "Remove from wishlist" : "Add to wishlist"
                    }
                    className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Heart
                      size={16}
                      className={
                        isLiked
                          ? "fill-rose-500 text-rose-500"
                          : "text-gray-700"
                      }
                    />
                  </button>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h2 className="text-neutral-900 text-base font-serif font-bold group-hover:text-rose-600 transition-colors">
                      {product.name}
                    </h2>
                    <p className="text-neutral-500 text-xs leading-relaxed font-light">
                      {product.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">Starts At</span>
                      <span className="text-neutral-900 font-bold text-base">{formatPrice(product.price)}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        title="Add to Cart"
                        className="bg-rose-100 hover:bg-rose-200 text-rose-900 p-2.5 rounded-full transition-colors cursor-pointer border border-rose-200 shadow-sm"
                      >
                        <ShoppingBag size={16} />
                      </button>

                      <Link
                        href={`/Festivals/navratri/${product.id}`}
                        className="bg-neutral-950 hover:bg-rose-600 text-white font-bold px-4 py-2.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow inline-block text-center"
                      >
                        Book Now
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