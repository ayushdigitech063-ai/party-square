

"use client";
import SlidingProducts from "@/app/components/SlidingProducts";
import DiwaliSection from "@/app/Festivals/diwali/DiwaliSection";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle,
  ArrowRight,
  Star,
  ShieldCheck,
  Heart,
  Flame,
  ShoppingBag,
} from "lucide-react";
import { useWishlist } from "../../context/wishlistcontext";
import { useCart } from "@/app/context/CartContext";
import { diwaliProducts, Product } from "@/app/data/diwaliProducts";

// Home page par jo products dikhane hain unki sirf IDs (number) yahan hain.
// Poora data app/data/diwaliProducts.ts se aata hai.
const TRENDING_IDS: number[] = [111, 112, 113];
const BEST_LOVED_IDS: number[] = [111, 112, 113, 114];
const SOCIETY_IDS: number[] = [115, 116, 117, 118];

const getProductsByIds = (ids: number[]): Product[] =>
  ids
    .map((id) => diwaliProducts.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

// Wishlist ko pehle ki tarah hi same shape milti hai (price string me)
const toWishlistItem = (product: Product) => ({
  id: product.id,
  name: product.name,
  price: formatPrice(product.price),
  image: product.image,
  desc: product.desc,
});

export default function DiwaliPage() {
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addToCart } = useCart();
  

  useEffect(() => {
    setIsMounted(true);
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay was prevented:", error);
      });
    }
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
      price: String(product.price),
      image: product.image,
      desc: product.desc || "",
      category: "Diwali Decoration",
    });
  };

  const trendingProducts = getProductsByIds(TRENDING_IDS);
  const bestLovedDecor = getProductsByIds(BEST_LOVED_IDS);
  const societyDecor = getProductsByIds(SOCIETY_IDS);

  return (
    <div className="min-h-screen text-neutral-900 font-sans bg-[#FAF7F2] selection:bg-amber-500 selection:text-white overflow-x-hidden pb-20">
      {/* Hero Section with diwali.png */}
      <section className="relative w-full h-[85vh] min-h-[550px] px-6 flex items-center justify-center text-center overflow-hidden my-4 sm:my-6 max-w-[96rem] mx-auto rounded-[35px] shadow-2xl">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/diwali.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/50 to-neutral-950/30" />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-5 py-2 rounded-full text-amber-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md">
            <Sparkles size={15} className="text-amber-400" />
            <span>Shubh Deepawali • Festival of Lights 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Divine{" "}
            <span className="text-amber-400 italic font-normal">Diwali</span>{" "}
            Celebrations
          </h1>
          <p className="text-neutral-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Illuminate your homes and societies with our breathtaking,
            handcrafted festive decorations, royal diya setups, and magical
            lighting.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 px-6 w-full max-w-[96rem] mx-auto">
        <div className="relative w-full h-[85vh] min-h-[500px] rounded-[35px] overflow-hidden shadow-2xl border border-amber-500/30 bg-neutral-950">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/party-viedo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

 {/* Signature Diwali Special Section */}
<section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto">
  <div className="relative overflow-hidden rounded-[28px] border border-amber-500/30 bg-gradient-to-r from-[#4a1702] via-[#702500] to-[#1a0b05] shadow-[0_25px_70px_rgba(70,25,0,0.25)]">
    
    {/* Decorative Glow */}
    <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

    <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] items-stretch">
      
      {/* Left Content */}
      <div className="relative z-10 flex flex-col justify-center p-7 sm:p-10 lg:p-12 xl:p-14">
        
        {/* Badge */}
        <div className="mb-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
            <Flame size={14} className="text-amber-400" />
            <span>Signature Diwali Special</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="max-w-xl font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.12] text-white">
          The Auspicious Glow of{" "}
          <span className="italic text-amber-400">
            Divine Diyas
          </span>
        </h2>

        {/* Description */}
        <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-300">
          Welcome Goddess Lakshmi with our magnificent traditional lighting and
          handcrafted decorative oil lamps. Designed to bring prosperity,
          warmth, and divine radiance to your home during Deepawali.
        </p>

        {/* Features */}
        <div className="mt-7 space-y-4">
          <div className="flex items-start gap-3 text-sm text-neutral-200">
            <CheckCircle
              size={18}
              className="mt-0.5 shrink-0 text-amber-400"
            />
            <span>
              Handcrafted terracotta and brass designer diyas
            </span>
          </div>

          <div className="flex items-start gap-3 text-sm text-neutral-200">
            <CheckCircle
              size={18}
              className="mt-0.5 shrink-0 text-amber-400"
            />
            <span>
              Synchronized warm lighting & floral corner styling
            </span>
          </div>
        </div>

        {/* Button */}
        <div className="mt-9">
          <button
            type="button"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.13em] text-neutral-950 shadow-[0_10px_30px_rgba(251,191,36,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(251,191,36,0.35)] cursor-pointer"
          >
            <span>Book Diwali Special</span>

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative min-h-[320px] sm:min-h-[400px] lg:min-h-[520px] overflow-hidden">
        <img
          src="/dipak.png"
          alt="Diwali Dipak Setup"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#5a1c03]/45 via-transparent to-transparent lg:block hidden" />

        {/* Mobile Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#4a1702]/40 via-transparent to-transparent lg:hidden" />
      </div>
    </div>
  </div>
</section>
      {/* Trending Picks Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-bold">
            Trending This Season
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            Our Top Diwali Picks
          </h2>
          <p className="text-neutral-600 text-sm font-light">
            Handpicked festive favourites loved by our customers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingProducts.map((item) => {
            const isLiked = isInWishlist(item.id);
            return (
              <div
                key={item.id}
                className="bg-white border border-amber-100 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-72 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
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
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg font-bold text-neutral-900">
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
                      <span className="text-neutral-900 font-bold text-lg">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(item, e)}
                        title="Add to Cart"
                        className="bg-amber-100 hover:bg-amber-200 text-amber-900 p-2.5 rounded-full transition-colors cursor-pointer border border-amber-200 shadow-sm"
                      >
                        <ShoppingBag size={16} />
                      </button>
                      <Link
                        href={`/Festivals/diwali/${item.id}`}
                        className="bg-neutral-950 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-500 hover:text-neutral-950 transition shadow flex items-center space-x-1"
                      >
                        <span>Book</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/Festivals/diwali/all-products"
            className="inline-flex items-center space-x-2 border-2 border-amber-500 text-amber-700 hover:bg-amber-500 hover:text-neutral-950 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition shadow-md"
          >
            <span>View More Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Most Loved Decorations */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-bold">
            Most Loved
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            Best Loved Diwali Decorations
          </h2>
          <p className="text-neutral-600 text-sm font-light">
            Our most sought-after festive home mandap and lighting packages.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestLovedDecor.map((item) => {
            const isLiked = isInWishlist(item.id);
            return (
              <div
                key={item.id}
                className="bg-white border border-amber-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
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
                        className="bg-amber-100 hover:bg-amber-200 text-amber-900 p-2.5 rounded-full transition-colors cursor-pointer border border-amber-200 shadow-sm"
                      >
                        <ShoppingBag size={16} />
                      </button>
                      <Link
                        href={`/Festivals/diwali/${item.id}`}
                        className="bg-neutral-950 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-500 hover:text-neutral-950 transition shadow flex items-center space-x-1"
                      >
                        <span>Book</span>
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

      {/* Best Decoration in Society */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-700 font-bold bg-amber-100/70 px-4 py-1.5 rounded-full inline-block">
            Community Celebrations
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">
            Best Decoration in Society
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light">
            Grand scale lighting, entrance gates, and community area setups for
            housing societies and residential complexes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {societyDecor.map((item) => {
            const isLiked = isInWishlist(item.id);
            return (
              <div
                key={item.id}
                className="bg-white border border-amber-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-amber-500 text-neutral-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    Society Special
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
                        className="bg-amber-100 hover:bg-amber-200 text-amber-900 p-2.5 rounded-full transition-colors cursor-pointer border border-amber-200 shadow-sm"
                      >
                        <ShoppingBag size={16} />
                      </button>
                      <Link
                        href={`/Festivals/diwali/${item.id}`}
                        className="bg-amber-500 text-neutral-950 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition shadow flex items-center space-x-1"
                      >
                        <span>Book</span>
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

      <SlidingProducts />
      <DiwaliSection />

      {/* Rangoli Showcase Card linked with product id "114" */}
      <section className="py-16 px-6 max-w-7xl mx-auto mb-10">
        <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-neutral-950 text-white rounded-[32px] overflow-hidden shadow-2xl border border-amber-500/40 grid grid-cols-1 lg:grid-cols-2 items-stretch">
          <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest">
                <Star size={14} className="text-amber-400" />
                <span>Artistic Rangoli Showcase</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Traditional & Floral{" "}
                <span className="text-amber-400 italic">
                  Rangoli Masterpieces
                </span>
              </h2>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light">
                Enhance the beauty of your entrance with intricate floral and
                colored powder rangoli patterns. Handcrafted by master artists
                to welcome prosperity, guests, and festive joy into your home.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle size={16} className="text-amber-400 shrink-0" />
                  <span>
                    Fresh flower petals and eco-friendly vibrant colors
                  </span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle size={16} className="text-amber-400 shrink-0" />
                  <span>
                    Customized auspicious symbols and traditional motifs
                  </span>
                </div>
              </div>
            </div>
<div className="pt-4">
              <button 
                type="button"
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2 cursor-pointer"
              >
                <span>Book Rangoli Styling</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="relative h-72 sm:h-auto w-full overflow-hidden bg-neutral-950">
            <img
              src="/rangoli.png"
              alt="Rangoli Masterpiece Setup"
              className="w-full h-full object-cover hover:scale-105 transition duration-700"
            />
          </div>
        </div>
      </section>
    </div>
  );
}