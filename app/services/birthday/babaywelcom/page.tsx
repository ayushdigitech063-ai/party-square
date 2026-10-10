"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Heart, ShieldCheck, Smile } from "lucide-react";
import { useWishlist } from "../../../context/wishlistcontext";
import { babyWelcomeDecor } from "@/app/data/babyWelcomeProduct";
import { cartoonAndToyDecor } from "@/app/data/babyWelcomeProduct";
import ProductCard from "@/app/components/ProductCard";
import ProductSort from "@/app/components/ProductSort";
import FAQSection from "@/app/components/FAQSection";

export const toyThemeDecor = [
  {
    id: 5,
    name: "Toyland Wonderland Setup",
    theme: "Playful Toy Theme",
    image: "/toyes.png",
    desc: "Vibrant and colorful toy-inspired decor elements designed to bring immense joy and a playful vibe to your baby's welcome celebration.",
    gradientBg: "from-sky-950 via-indigo-950 to-neutral-950",
    badgeColor: "bg-[#8CBC67] text-neutral-950",
  },
];

export default function BabyWelcomePage() {
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  const [isMounted, setIsMounted] = useState(false);
  const [sortBy, setSortBy] = useState<
    "recommended" | "price-low" | "price-high"
  >("recommended");

  const getPrice = (price: string | number) => {
    if (typeof price === "number") return price;

    const value = Number(price.replace(/[₹,]/g, "").trim());

    return Number.isNaN(value) ? Infinity : value;
  };

  const sortedProducts = [...babyWelcomeDecor].sort((a, b) => {
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
    sortBy === "recommended" ? babyWelcomeDecor : sortedProducts;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="min-h-screen text-[#202522] font-sans bg-[#FCFBF7] selection:bg-[#8CBC67] selection:text-white overflow-x-hidden pb-20">
      {/* Hero Section with backgroundbacbypic.png */}
      <section className="relative w-full h-[350px] px-6 flex items-center justify-center text-center overflow-hidden my-4 sm:my-6 max-w-[96rem] mx-auto rounded-[35px] shadow-2xl">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-100"
          style={{ backgroundImage: "url('/backgroundbacbypic.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/50 to-neutral-950/30" />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-[#8CBC67]/20 border border-[#8CBC67]/40 px-5 py-2 rounded-full text-[#8CBC67] text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md">
            <Sparkles size={15} className="text-[#8CBC67]" />
            <span>Welcome Little One • Newborn Special 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Magical{" "}
            <span className="text-[#8CBC67] italic font-normal">
              Baby Welcome
            </span>{" "}
            Decorations
          </h1>
          <p className="text-neutral-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Celebrate the most precious arrival of your life with our
            heartwarming, handcrafted balloon arches, floral cradles, and joyful
            theme setups.
          </p>
        </div>
      </section>

      {/* Baby Welcome Collection Cards */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="relative mb-12">
          <div className="flex items-center justify-between gap-6">
            {/* LEFT - Heading */}
            <div className="text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8CBC67] font-bold">
                 Newborn Special
              </span>
              <div className="flex items-baseline gap-3">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522] mt-1">
                Baby Welcome Packages
              </h2>
               <span className="text-[#6B706C] text-2xl">|</span>

                <span className="text-[#6B706C] text-2xl">
                  {productsToDisplay.length} Items
                </span>
              </div>

              <p className="text-[#6B706C] text-sm font-light mt-2">
                Delightful decorations curated with love and safe materials for
                your baby.
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
      </section>

      {/* Full Width Autoplay Video Section (micymouse.mp4) */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="relative rounded-[32px] overflow-hidden shadow-2xl bg-neutral-950 aspect-video w-full max-h-[600px] border border-[#8CBC67]/20">
          <video
            src="/micymouse.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent pointer-events-none flex items-end p-6 sm:p-10">
            <div className="text-white space-y-2">
              <span className="bg-[#8CBC67] text-neutral-950 text-[10px] sm:text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                Live Preview & Vibe
              </span>
              <h3 className="font-serif text-xl sm:text-3xl font-bold text-white drop-shadow-md">
                Magical Baby Welcome Moments in Action
              </h3>
              <p className="text-neutral-200 text-xs sm:text-sm font-light max-w-xl">
                Experience the joy and warmth brought to life through our expert
                decoration standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Toys & Cartoon Wonderland Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-[0.3em] text-[#202522] font-bold bg-[#EEF6EB] px-4 py-1.5 rounded-full shadow-sm">
            <Smile size={14} className="text-[#8CBC67]" />
            <span>Kids Favorite Themes</span>
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#202522]">
            Cartoon & Toy Wonderland
          </h2>
          <p className="text-[#6B706C] text-sm sm:text-base font-light">
            Bring alive your child's favorite fantasy worlds with our exclusive
            character and toy-themed setups.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cartoonAndToyDecor.map((item) => {
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
      </section>

      {/* Toy Theme Showcase Section using toyes.png */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#202522] font-bold bg-[#EEF6EB]/70 px-4 py-1.5 rounded-full inline-block">
            Kids Favorite
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#202522]">
            Toy Theme Special
          </h2>
          <p className="text-[#6B706C] text-sm sm:text-base font-light">
            Bring your little one's favorite playful fantasy to life with our
            exclusive toy-themed backdrop setups.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {toyThemeDecor.map((card) => (
            <div
              key={card.id}
              className={`rounded-[32px] overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-r ${card.gradientBg} text-white flex flex-col lg:flex-row items-stretch group`}
            >
              <div className="p-6 sm:p-10 flex flex-col justify-between flex-1 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow ${card.badgeColor}`}
                    >
                      {card.theme}
                    </span>
                    <span className="text-[10px] text-[#D7A84B]/80 font-medium">
                      Interactive Play Zone Decor
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                    {card.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                    {card.desc}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#8CBC67] font-medium">
                    <ShieldCheck
                      size={16}
                      className="text-[#8CBC67] shrink-0"
                    />
                    <span>
                      Includes Child-Safe Material, Setup & Balloon Styling
                    </span>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center space-x-2 bg-[#8CBC67] hover:bg-[#D7A84B] text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider transition shadow-lg w-full sm:w-auto"
                  >
                    <span>Book Toy Theme Setup</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="relative w-full lg:w-[45%] h-72 lg:h-auto overflow-hidden bg-neutral-950">
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
      <FAQSection />
    </div>
  );
}
