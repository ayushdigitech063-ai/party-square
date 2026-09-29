"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle,
  ArrowRight,
  Star,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { useWishlist } from "../../context/wishlistcontext";
import { useCart } from "@/app/context/CartContext";
import { janmashtamiProducts, Product } from "@/app/data/janmashtamiProducts";

// Home page par dikhne wale products ki sirf IDs (number). Data janmashtamiProducts.ts me hai.
const CELEBRATION_IDS: number[] = [8, 9, 10, 11];
const TEMPLE_IDS: number[] = [12, 13, 14, 15];

const getProductsByIds = (ids: number[]): Product[] =>
  ids
    .map((id) => janmashtamiProducts.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

const formatPrice = (price: string) => `₹${Number(price).toLocaleString("en-IN")}`;

// Wishlist ko pehle jaisi hi shape milti hai (price "₹5,499" format me)
const toWishlistItem = (product: Product) => ({
  id: product.id,
  name: product.name,
  price: formatPrice(product.price),
  image: product.image,
  desc: product.desc,
});

export default function JanmashtamiPage() {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isMounted, setIsMounted] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      desc: product.desc,
      category: "Janmashtami Decoration",
    });
  };

  const celebrationDecor = getProductsByIds(CELEBRATION_IDS);
  const templeDecor = getProductsByIds(TEMPLE_IDS);

  return (
    <div className="min-h-screen text-neutral-900 font-sans bg-[#FBF9F4] selection:bg-emerald-600 selection:text-white overflow-x-hidden pb-20">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[550px] px-6 flex items-center justify-center text-center overflow-hidden my-4 sm:my-6 max-w-[96rem] mx-auto rounded-[35px] shadow-2xl">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/bgcolor.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/50 to-neutral-950/30" />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-500/40 px-5 py-2 rounded-full text-emerald-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md">
            <Sparkles size={15} className="text-emerald-400" />
            <span>Shubh Krishna Janmashtami • Festival of Divine Joy 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Divine{" "}
            <span className="text-amber-400 italic font-normal">
              Janmashtami
            </span>{" "}
            Celebrations
          </h1>
          <p className="text-neutral-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Welcome Kanha ji with breathtaking jhulas, magnificent temple
            decorations, and enchanting divine setups.
          </p>
        </div>
      </section>

      {/* Celebration Cards Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-emerald-700 font-bold">
            Festive Highlights
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            Krishna Janmashtami Decorations
          </h2>
          <p className="text-neutral-600 text-sm font-light">
            Handcrafted jhulas and ethnic makhan handi setups for joyful
            celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {celebrationDecor.map((item) => {
            const isLiked = isInWishlist(item.id);
            return (
              <div
                key={item.id}
                className="bg-white border border-emerald-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(toWishlistItem(item));
                    }}
                    aria-label={
                      isLiked ? "Remove from wishlist" : "Add to wishlist"
                    }
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
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
                    <h3 className="font-serif text-base font-bold text-neutral-900">
                      {item.name}
                    </h3>
                    <p className="text-neutral-500 text-xs leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">
                        Starts At
                      </span>
                      <span className="text-neutral-900 font-bold text-base">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(item, e)}
                        title="Add to Cart"
                        className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 p-2.5 rounded-full transition-colors cursor-pointer border border-emerald-200 shadow-sm"
                      >
                        <ShoppingBag size={16} />
                      </button>
                      <Link
                        href={`/Festivals/janmasthmi/${item.id}`}
                        className="bg-neutral-950 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-emerald-600 transition shadow flex items-center space-x-1"
                      >
                        <span>Explore</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/Festivals/janmasthmi/all-products" 
            className="inline-flex items-center space-x-2 bg-white hover:bg-neutral-950 hover:text-white text-neutral-950 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-sm border border-emerald-200"
          >
            <span>View More Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Grand Green & Golden Banner */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-950 to-neutral-950 text-white rounded-[32px] overflow-hidden shadow-2xl border border-amber-500/30 grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="p-8 sm:p-12 lg:col-span-7 flex flex-col justify-center space-y-5">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest w-max">
              <Sparkles size={14} className="text-amber-400" />
              <span>Grand Festival Celebration</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              The Grand{" "}
              <span className="text-amber-400 italic">
                Janmotsav Experience
              </span>
            </h2>
            <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed font-light">
              Immerse your family and society in the divine ecstasy of Lord Krishna&apos;s birth. Our professional decorators weave traditional Pichwai art, fresh fragrant florals, and majestic lighting into an unforgettable celebration.
            </p>
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-amber-400 shrink-0" />
                <span>
                  Customized theme planning tailored to your exact venue space
                </span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-amber-400 shrink-0" />
                <span>
                  End-to-end professional installation, maintenance, and cleanup
                </span>
              </div>
            </div>

            <div className="pt-3">
              <Link href="/Festivals/janmasthmi/8" className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2">
                <span>View Grand Package</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 h-72 sm:h-96 w-full overflow-hidden bg-neutral-950 p-4 flex items-center justify-center">
            <img
              src="/contnet.png"
              alt="Grand Janmashtami Banner Content"
              className="w-full h-full object-cover rounded-2xl shadow-lg hover:scale-105 transition duration-700"
            />
          </div>
        </div>
      </section>

      {/* Mandir Decoration Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-emerald-800 font-bold bg-emerald-100 px-4 py-1.5 rounded-full inline-block">
            Mandir Decor
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">
            Exquisite Temple Decorations
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light">
            Transform your sacred spaces into divine abodes with grand floral
            arrangements and midnight glow illuminations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {templeDecor.map((item) => {
            const isLiked = isInWishlist(item.id);
            return (
              <div
                key={item.id}
                className="bg-white border border-emerald-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    Mandir Special
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(toWishlistItem(item));
                    }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-700 hover:text-rose-500 shadow transition cursor-pointer"
                  >
                    <Heart
                      size={18}
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
                    <h3 className="font-serif text-base font-bold text-neutral-900">
                      {item.name}
                    </h3>
                    <p className="text-neutral-500 text-xs leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">
                        Starts At
                      </span>
                      <span className="text-neutral-900 font-bold text-base">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(item, e)}
                        title="Add to Cart"
                        className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 p-2.5 rounded-full transition-colors cursor-pointer border border-emerald-200 shadow-sm"
                      >
                        <ShoppingBag size={16} />
                      </button>
                      <Link href={`/Festivals/janmasthmi/${item.id}`} className="bg-emerald-700 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-emerald-600 transition shadow flex items-center space-x-1">
                        <span>Explore</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Special Shrinath Ji Card with srenath.png on Right */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-amber-950 text-white rounded-[32px] overflow-hidden shadow-2xl border border-amber-500/40 grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="p-8 sm:p-12 lg:col-span-7 flex flex-col justify-center space-y-5">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest w-max">
              <Star size={14} className="text-amber-400" />
              <span>Divine Masterpiece Showcase</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Shrinath Ji{" "}
              <span className="text-amber-400 italic">
                Divine Darshan Setup
              </span>
            </h2>
            <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed font-light">
              Experience transcendental devotion with our exclusive Shrinath Ji
              Pichwai artwork and royal decorative backdrop, curated
              specifically to bring supreme grace and tranquility to your
              Janmashtami festivities.
            </p>
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-amber-400 shrink-0" />
                <span>
                  Hand-painted traditional Pichwai motifs & gold-leaf styling
                </span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                <CheckCircle size={16} className="text-amber-400 shrink-0" />
                <span>
                  Complete divine altar setup with lotus motifs & warm focus
                  lights
                </span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/contact"
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2"
              >
                <span>Book Shrinath Ji Setup</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 h-72 sm:h-96 w-full overflow-hidden bg-neutral-950 p-4 flex items-center justify-center">
            <img
              src="/srenath.png"
              alt="Shrinath Ji Special Setup"
              className="w-full h-full object-cover rounded-2xl shadow-lg hover:scale-105 transition duration-700"
            />
          </div>
        </div>
      </section>
    </div>
  );
}