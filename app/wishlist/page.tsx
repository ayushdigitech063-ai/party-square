"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ArrowRight, Sparkles, Trash2, ShoppingBag } from "lucide-react";
import { useWishlist } from "../context/wishlistcontext";
import { useCity } from "../context/CityContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const router = useRouter();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { selectedCity } = useCity();
  const { addToCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const citySlug = (selectedCity || "jaipur").toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const getItemCategory = (product: any) => {
    if (!product) return "decorations";
    if (typeof product.category === "string") return product.category;
    if (typeof product.category === "object" && product.category?.name) return product.category.name;
    if (product.subcategory) return product.subcategory;
    return "decorations";
  };

  const getItemUrl = (product: any) => {
    const rawCat = getItemCategory(product);
    const catSlug = rawCat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "decorations";
    const prodSlug = (product.slug || product.id || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `/${citySlug}/${catSlug}/${prodSlug}`;
  };

  const getNumericPrice = (p: any) => {
    if (!p) return 0;
    if (typeof p === "number") return p;
    return Number(String(p).replace(/[^0-9]/g, "")) || 0;
  };

  if (!mounted) {
    return (
      <section className="min-h-screen bg-[#FCFBF7] px-6 py-12 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#8CBC67] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-wider text-[#6B706C]">Loading your wishlist...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#FCFBF7] text-[#202522] font-sans px-4 sm:px-6 md:px-12 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E8E8E3] pb-6 gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-[#EEF6EB] text-[#8CBC67] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#8CBC67]/30">
              <Sparkles size={12} />
              <span>Saved Items</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#202522]">
              My Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-[#6B706C]">
              Keep your favorite celebrations and decoration themes saved here for easy booking.
            </p>
          </div>

          {wishlist.length > 0 && (
            <div className="text-xs font-semibold text-[#6B706C] bg-white border border-[#E8E8E3] px-4 py-2 rounded-xl shadow-2xs self-start sm:self-auto">
              Total Saved: <span className="text-[#8CBC67] font-bold">{wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}</span>
            </div>
          )}
        </div>

        {/* EMPTY WISHLIST */}
        {wishlist.length === 0 ? (
          <div className="rounded-3xl border border-[#E8E8E3] bg-white p-8 sm:p-16 text-center shadow-xs max-w-2xl mx-auto space-y-5">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EEF6EB] text-[#8CBC67]">
              <Heart size={36} strokeWidth={1.5} />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522]">
                Your wishlist is empty
              </h2>
              <p className="text-xs sm:text-sm text-[#6B706C] leading-relaxed max-w-md mx-auto">
                You haven&apos;t saved any decorations yet. Explore our birthday, anniversary, and celebration packages and click the heart icon on any card to save your favorites!
              </p>
            </div>

            <div className="pt-2">
              <Link
                href={`/${citySlug}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#8CBC67] hover:bg-[#7AB055] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition shadow-sm"
              >
                <span>Explore Collections</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          /* PRODUCTS LIST */
          <div className="grid grid-cols-1 gap-4">
            {wishlist.map((product, idx) => {
              const numPrice = getNumericPrice(product.price);
              const formattedPrice = numPrice > 0 ? `₹${numPrice.toLocaleString("en-IN")}` : "₹4,999";
              const productUrl = getItemUrl(product);
              const categoryLabel = getItemCategory(product);
              const imgSrc = product.image || product.src || "/homepage.png";

              return (
                <div
                  key={product.id || `wish-${idx}`}
                  className="bg-white rounded-2xl border border-[#E8E8E3] hover:border-[#8CBC67] shadow-xs p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:shadow-md"
                >
                  {/* Image + Product Information */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <Link
                      href={productUrl}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#EEF6EB] border border-[#E8E8E3] shrink-0 block group"
                    >
                      <img
                        src={imgSrc}
                        alt={product.name || "Decoration Theme"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-[#8CBC67] font-bold block">
                        {categoryLabel}
                      </span>

                      <Link href={productUrl}>
                        <h3 className="text-base sm:text-lg font-serif font-bold text-[#202522] hover:text-[#8CBC67] transition line-clamp-1">
                          {product.name || "Special Decoration Package"}
                        </h3>
                      </Link>

                      {product.desc && (
                        <p className="text-xs text-[#6B706C] line-clamp-1 max-w-md">
                          {product.desc}
                        </p>
                      )}

                      <div className="inline-flex items-center gap-1.5 bg-[#EEF6EB] text-[#202522] px-2.5 py-0.5 rounded-md text-[11px] font-bold">
                        <span>Price:</span>
                        <span className="text-[#8CBC67] font-bold">{formattedPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Price */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E8E8E3]">
                    <div className="text-left sm:text-right">
                      <p className="text-[10px] text-[#6B706C] uppercase tracking-wider font-semibold">
                        Starting At
                      </p>
                      <p className="text-base sm:text-lg font-bold text-[#202522]">
                        {formattedPrice}
                      </p>
                    </div>

                    {/* View / Book Button */}
                    <button
                      type="button"
                      onClick={() => router.push(productUrl)}
                      className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#8CBC67] hover:bg-[#7AB055] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                    >
                      <span>Book Now</span>
                      <ArrowRight size={14} />
                    </button>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeFromWishlist(product.id)}
                      className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200/50 flex items-center justify-center transition cursor-pointer shrink-0"
                      title="Remove from wishlist"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
