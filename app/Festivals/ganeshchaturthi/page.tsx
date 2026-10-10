"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle,
  ArrowRight,
  Star,
  ShieldCheck,
  Heart,
  ShoppingBag,
} from "lucide-react";

import { useWishlist } from "../../context/wishlistcontext";
import { useCart } from "@/app/context/CartContext";
import { ganeshProducts } from "@/app/data/ganeshProducts";
import ProductCard from "@/app/components/ProductCard";
import ProductSort from "@/app/components/ProductSort";
import FAQSection from "@/app/components/FAQSection";

export default function GaneshChaturthi() {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isMounted, setIsMounted] = useState(false);
  const [sortBy, setSortBy] = useState<
    "recommended" | "price-low" | "price-high"
  >("recommended");

  const { addToCart } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  /*
   * Product IDs are now strings because the common Product type
   * uses id: string.
   */
  const LOVED_IDS = ["6", "7", "8", "9"];
  const EXQUISITE_IDS = ["10", "11", "12", "13"];

  const handleAddToCart = (
    product: (typeof ganeshProducts)[number],
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    });
  };

  const bestLovedDecor = LOVED_IDS.map((id) =>
    ganeshProducts.find((product) => product.id === id),
  ).filter((product): product is NonNullable<typeof product> =>
    Boolean(product),
  );

  const exquisiteDecor = EXQUISITE_IDS.map((id) =>
    ganeshProducts.find((product) => product.id === id),
  ).filter((product): product is NonNullable<typeof product> =>
    Boolean(product),
  );

  /*
   * Mumbai Cha Raja special cards are still coming
   * directly from ganeshProducts.
   */
  const mumbaiChaRajaCards = ganeshProducts.filter(
    (product) => product.isSpecialCard,
  );
  const getPrice = (price: string | number) => {
    if (typeof price === "number") return price;

    const value = Number(price.replace(/[₹,]/g, "").trim());

    return Number.isNaN(value) ? Infinity : value;
  };

  const sortedProducts = [...ganeshProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return getPrice(a.price) - getPrice(b.price);

      case "price-high":
        return getPrice(b.price) - getPrice(a.price);

      case "recommended":
      default:
        return 0;
    }
  });

  const productsToDisplay =
    sortBy === "recommended" ? bestLovedDecor : sortedProducts;

  return (
    <div className="min-h-screen text-[#202522] font-sans bg-[#FCFBF7] selection:bg-[#8CBC67] selection:text-white overflow-x-hidden pb-20">
      {/* Hero Section */}
      <section className="relative w-full h-[350px] px-6 flex items-center justify-center text-center overflow-hidden my-4 sm:my-6 max-w-[96rem] mx-auto rounded-[35px] shadow-2xl">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-100"
          style={{ backgroundImage: "url('/bg.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/50 to-neutral-950/30" />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-[#8CBC67]/20 border border-[#8CBC67]/40 px-5 py-2 rounded-full text-[#8CBC67] text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md">
            <Sparkles size={15} className="text-[#8CBC67]" />
            <span>Ganpati Bappa Morya â€¢ Festive Special 2026</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Divine{" "}
            <span className="text-[#8CBC67] italic font-normal">
              Ganesh Chaturthi
            </span>{" "}
            Decorations
          </h1>

          <p className="text-neutral-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Welcome Lord Ganesha into your home with our breathtaking,
            handcrafted mandap and festive decoration setups. Pure devotion
            meets exquisite craftsmanship.
          </p>
        </div>
      </section>

      {/* Best Loved Decorations Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="relative mb-12">
          <div className="flex items-center justify-between gap-6">
            {/* LEFT - Heading */}
            <div className="text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8CBC67] font-bold">
                Most Loved
              </span>
              <div className="flex items-baseline gap-3">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
                  Best Loved Decorations
                </h2>
                <span className="text-[#6B706C] text-2xl">|</span>

                <span className="text-[#6B706C] text-2xl">
                  {productsToDisplay.length} Items
                </span>
              </div>

              <p className="text-[#6B706C] text-sm font-light mt-2">
                Our most sought-after traditional and modern mandap designs.
              </p>
            </div>

            {/* RIGHT - Sort */}
            <div className="shrink-0">
              <ProductSort value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsToDisplay.map((item) => {
            return (
              <ProductCard
                key={item.id}
                product={item}
                isInWishlist={isInWishlist}
                toggleWishlist={toggleWishlist}
              />
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/Festivals/ganeshchaturthi/all-products"
            className="inline-flex items-center space-x-2 bg-white hover:bg-neutral-950 hover:text-white text-neutral-950 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-sm border border-[#E8E8E3]"
          >
            <span>View More Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

  
      {/* Mumbai Cha Raja Special Cards */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#202522] font-bold bg-[#EEF6EB]/70 px-4 py-1.5 rounded-full inline-block">
            Grand Special Collection
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#202522]">
            Mumbai Cha Raja Special
          </h2>

          <p className="text-[#6B706C] text-sm sm:text-base font-light">
            Inspired by the grandeur of Mumbai's iconic pandals with
            crystal-clear picture highlights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mumbaiChaRajaCards.map((card) => (
            <div
              key={card.id}
              className={`rounded-[32px] overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-r ${
                card.gradientBg
              } text-white flex flex-col lg:flex-row items-stretch group`}
            >
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-4 order-2 lg:order-1">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow ${
                        card.badgeColor
                      }`}
                    >
                      {card.theme}
                    </span>

                    <span className="text-[10px] text-[#D7A84B]/80 font-medium">
                      Premium Large Scale
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {card.name}
                  </h3>

                  <p className="text-xs text-neutral-300 leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="flex items-center space-x-1.5 text-[11px] text-[#8CBC67] font-medium">
                    <ShieldCheck
                      size={14}
                      className="text-[#8CBC67] shrink-0"
                    />

                    <span>Includes Professional Setup & Lighting</span>
                  </div>

                  <Link
                    href={`/Festivals/ganeshchaturthi/${card.id}`}
                    className="inline-flex items-center justify-center space-x-1.5 bg-[#8CBC67] hover:bg-[#D7A84B] text-neutral-950 px-5 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-wider transition shadow-lg w-full sm:w-auto"
                  >
                    <span>Book Setup</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="relative w-full lg:w-64 h-64 lg:h-auto overflow-hidden bg-neutral-950 order-1 lg:order-2">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Masterpiece Showcase Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto mb-10">
        <div className="bg-gradient-to-r from-amber-950 via-[#202522] to-neutral-950 text-white rounded-[32px] overflow-hidden shadow-2xl border border-[#8CBC67]/40 grid grid-cols-1 lg:grid-cols-2 items-stretch">
          <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-[#8CBC67]/20 border border-[#8CBC67]/40 px-3.5 py-1.5 rounded-full text-[#8CBC67] text-xs font-bold uppercase tracking-widest">
                <Star size={14} className="text-[#8CBC67]" />
                <span>Masterpiece Showcase</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                The Ultimate Divine Experience with{" "}
                <span className="text-[#8CBC67] italic">CardGaneshJi</span>
              </h2>

              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light">
                Elevate your home pandal with our flagship masterpiece setup.
                Featuring intricate detailing, premium flower garlands,
                traditional backdrop panels, and synchronized warm lighting
                designed to make your Ganesh Chaturthi celebrations
                unforgettable.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle size={16} className="text-[#8CBC67] shrink-0" />
                  <span>Custom structural mandap with traditional pillars</span>
                </div>

                <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle size={16} className="text-[#8CBC67] shrink-0" />
                  <span>
                    Fresh marigold, rose, and exotic orchid decorations
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/contact"
                className="bg-[#8CBC67] hover:bg-[#D7A84B] text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition shadow-xl inline-flex items-center space-x-2"
              >
                <span>Book Masterpiece Setup</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="relative h-72 sm:h-auto w-full overflow-hidden bg-neutral-950 order-1 lg:order-2">
            <img
              src="/cardganeshji.png"
              alt="Card Ganesh Ji Masterpiece"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
          </div>
        </div>
      </section>
      <FAQSection />
    </div>
  );
}

