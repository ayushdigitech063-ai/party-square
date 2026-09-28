"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Heart, ShieldCheck, Smile } from "lucide-react";
import { useWishlist } from "../../../context/wishlistcontext";

export const babyWelcomeDecor = [
    {
      id: 1,
      name: "Cradle Floral Welcome",
      price: "₹4,999",
      image: "/babayborn.png",
      desc: "Soft pastel balloon clusters paired with a traditional floral cradle setup for the newborn.",
    },
    {
      id: 2,
      name: "Celestial Star & Moon Arch",
      price: "₹6,499",
      image: "/babayborn1.png",
      desc: "Dreamy golden moon and twinkling star props with pastel drapes for a magical arrival.",
    },
    {
      id: 3,
      name: "Welcome Little Prince/Princess",
      price: "₹5,999",
      image: "/babayborn2.png",
      desc: "Elegant blue/pink theme setups with customized name boards and glowing fairy lights.",
    },
    {
      id: 4,
      name: "Joyful Teddy & Balloon Haven",
      price: "₹7,999",
      image: "/babayborn3.png",
      desc: "Cute giant teddy bear integration with rich organic balloon styling for lovely memories.",
    },
  ];

  export const cartoonAndToyDecor = [
    {
      id: 5,
      name: "Classic Toyland Setup",
      price: "₹6,999",
      image: "/mytoyes.png",
      desc: "Vibrant play-zone elements and joyful toy props to give a cheerful vibe.",
    },
    {
      id: 6,
      name: "Tom & Jerry Fun Theme",
      price: "₹7,499",
      image: "/tomandjery.png",
      desc: "Playful cartoon-themed backdrops featuring classic mischief and laughter.",
    },
    {
      id: 7,
      name: "Oggy & The Cockroaches Magic",
      price: "₹7,299",
      image: "/ogy.png",
      desc: "Fun-filled lively cartoon setup specially loved by kids and family guests.",
    },
    {
      id: 8,
      name: "Doraemon Dream Gadgets",
      price: "₹7,999",
      image: "/dorempn.png",
      desc: "Magical futuristic blue & white balloon decor with classic Doraemon themes.",
    },
    {
      id: 9,
      name: "Ultimate Toy Wonderland",
      price: "₹8,499",
      image: "/toyes.png",
      desc: "Grand interactive toy-inspired backdrop setup designed for high visual appeal.",
    },
    {
      id: 10,
      name: "SchineChain The Best Cartoon",
      price: "₹8,499",
      image: "/schinechain.png",
      desc: "Grand interactive cartoon backdrop setup designed for ultimate kids fun and visual appeal.",
    },
  ];

  export const toyThemeDecor = [
    {
      id: 5,
      name: "Toyland Wonderland Setup",
      theme: "Playful Toy Theme",
      image: "/toyes.png",
      desc: "Vibrant and colorful toy-inspired decor elements designed to bring immense joy and a playful vibe to your baby's welcome celebration.",
      gradientBg: "from-sky-950 via-indigo-950 to-neutral-950",
      badgeColor: "bg-amber-400 text-neutral-950",
    },
  ];

export default function BabyWelcomePage() {
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="min-h-screen text-neutral-900 font-sans bg-[#FAF7F2] selection:bg-amber-500 selection:text-white overflow-x-hidden pb-20">
      {/* Hero Section with backgroundbacbypic.png */}
      <section className="relative w-full h-[85vh] min-h-[550px] px-6 flex items-center justify-center text-center overflow-hidden my-4 sm:my-6 max-w-[96rem] mx-auto rounded-[35px] shadow-2xl">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-100"
          style={{ backgroundImage: "url('/backgroundbacbypic.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/50 to-neutral-950/30" />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-5 py-2 rounded-full text-amber-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md">
            <Sparkles size={15} className="text-amber-400" />
            <span>Welcome Little One • Newborn Special 2026</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Magical{" "}
            <span className="text-amber-400 italic font-normal">
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
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-bold">
            Newborn Special
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            Baby Welcome Packages
          </h2>
          <p className="text-neutral-600 text-sm font-light">
            Delightful decorations curated with love and safe materials for your
            baby.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {babyWelcomeDecor.map((item) => {
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
                    onClick={() => {
                      toggleWishlist(item);
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
                        {item.price}
                      </span>
                    </div>
                    <Link
                      href={`babaywelcom/${item.id}`}
                      className="bg-neutral-950 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-500 hover:text-neutral-950 transition shadow flex items-center space-x-1"
                    >
                      <span>Book</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Full Width Autoplay Video Section (micymouse.mp4) */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="relative rounded-[32px] overflow-hidden shadow-2xl bg-neutral-950 aspect-video w-full max-h-[600px] border border-amber-500/20">
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
              <span className="bg-amber-400 text-neutral-950 text-[10px] sm:text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
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
          <span className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-[0.3em] text-amber-800 font-bold bg-amber-100 px-4 py-1.5 rounded-full shadow-sm">
            <Smile size={14} className="text-amber-600" />
            <span>Kids Favorite Themes</span>
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">
            Cartoon & Toy Wonderland
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light">
            Bring alive your child's favorite fantasy worlds with our exclusive
            character and toy-themed setups.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cartoonAndToyDecor.map((item) => {
            const isLiked = isInWishlist(item.id);
            return (
            <div
              key={item.id}
              className="bg-white border border-amber-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-72 w-full overflow-hidden bg-neutral-950">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-amber-500/90 text-neutral-950 font-extrabold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full shadow backdrop-blur-md">
                  Featured Theme
                </div>
                 <button
                                    onClick={() => {
                                      toggleWishlist(item);
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
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-neutral-900">
                    {item.name}
                  </h3>
                  <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-wider">
                      Starting From
                    </span>
                    <span className="text-neutral-900 font-extrabold text-lg">
                      {item.price}
                    </span>
                  </div>
                  <Link
                    href={`babaywelcom/${item.id}`}
                    className="bg-neutral-950 text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-500 hover:text-neutral-950 transition shadow flex items-center space-x-1.5"
                  >
                    <span>Book Now</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </section>

      {/* Toy Theme Showcase Section using toyes.png */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-700 font-bold bg-amber-100/70 px-4 py-1.5 rounded-full inline-block">
            Kids Favorite
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">
            Toy Theme Special
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-light">
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
                    <span className="text-[10px] text-amber-200/80 font-medium">
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
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-amber-300 font-medium">
                    <ShieldCheck
                      size={16}
                      className="text-amber-400 shrink-0"
                    />
                    <span>
                      Includes Child-Safe Material, Setup & Balloon Styling
                    </span>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center space-x-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider transition shadow-lg w-full sm:w-auto"
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
    </div>
  );
}
