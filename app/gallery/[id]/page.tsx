"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { galleryCategories, GalleryItem } from "@/app/data/galleryData";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Star,
  Truck,
  Calendar,
} from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { useWishlist } from "@/app/context/wishlistcontext";

export default function GalleryItemDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

   const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  const [foundItem, setFoundItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (params?.id) {
      const resolvedId = Array.isArray(params.id) ? params.id[0] : params.id;

      let matchedItem: GalleryItem | null = null;

      for (const cat of galleryCategories) {
        const item = cat.items.find((i) => i.id === resolvedId);

        if (item) {
          matchedItem = item;
          break;
        }
      }

      setFoundItem(matchedItem);
      setLoading(false);
    }
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center text-center">
        <p className="text-amber-900 font-serif text-lg">Loading...</p>
      </div>
    );
  }

  if (!foundItem) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center text-center px-4 font-sans">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
          Item Not Found
        </h2>

        <Link
          href="/"
          className="bg-amber-900 text-white px-6 py-2.5 rounded-full text-xs uppercase font-bold transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "inc") {
      setQuantity((prev) => prev + 1);
    }

    if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const totalPrice = foundItem.numericPrice * quantity;

  const formattedTotalPrice = `₹${totalPrice.toLocaleString("en-IN")}`;

   const relatedProducts = galleryCategories
  .find((category) =>
    category.items.some((item) => item.id === foundItem.id)
  )
  ?.items.filter((item) => item.id !== foundItem.id) || [];

  const handleAddToCart = () => {
    if (foundItem) {
      addToCart(
        {
          id: foundItem.id,
          name: foundItem.name,
          price: foundItem.price,
          numericPrice: foundItem.numericPrice,
          image: foundItem.src,
          desc: foundItem.desc,
        },
        quantity,
      );
    }
  };

  const handleConfirmBooking = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1A1A] font-sans">
      {/* =====================================================
      PAGE CONTENT
  ====================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-8">
        {/* =====================================================
        BREADCRUMB
    ====================================================== */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 mb-6">
          <button
            onClick={() => router.back()}
            className="hover:text-amber-800 transition"
          >
            Back
          </button>

          <span>›</span>

          <span className="hover:text-amber-800 transition">Decorations</span>

          <span>›</span>

          <span className="text-neutral-900 font-medium truncate">
            {foundItem.name}
          </span>
        </div>

        {/* =====================================================
        MAIN PRODUCT SECTION
    ====================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          {/* =================================================
          LEFT - IMAGE
      ================================================== */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-4">
              {/* =================================================
              THUMBNAIL COLUMN
          ================================================== */}
              <div className="col-span-2 flex flex-col gap-3">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className={`
                  h-16 sm:h-[72px]
                  rounded-xl
                  overflow-hidden
                  border
                  bg-white
                  cursor-pointer
                  transition
                  ${
                    item === 1
                      ? "border-amber-500 ring-2 ring-amber-100"
                      : "border-amber-100 hover:border-amber-300"
                  }
                `}
                  >
                    <img
                      src={foundItem.src}
                      alt={`${foundItem.name} preview ${item}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                <div
                  className="
                h-16
                sm:h-[72px]
                rounded-xl
                bg-amber-50
                border
                border-amber-100
                flex
                items-center
                justify-center
                text-xs
                font-semibold
                text-amber-800
              "
                >
                  +5
                </div>
              </div>

              {/* =================================================
              MAIN IMAGE
          ================================================== */}
              <div className="col-span-10">
                <div
                  className="
                relative
                aspect-[16/16]
                rounded-3xl
                overflow-hidden
                bg-neutral-100
                border
                border-amber-100
                shadow-sm
              "
                >
                  <img
                    src={foundItem.src}
                    alt={foundItem.name}
                    className="
                  w-full
                  h-full
                  object-cover
                  transition
                  duration-700
                  hover:scale-[1.03]
                "
                  />

                  {/* PRODUCT CATEGORY */}
                  <div className="absolute top-5 left-5">
                    <span
                      className="
                    inline-flex
                    items-center
                    gap-2
                    bg-white/95
                    backdrop-blur-sm
                    text-amber-900
                    px-4
                    py-2
                    rounded-full
                    text-xs
                    font-bold
                    shadow-sm
                  "
                    >
                      <Sparkles size={13} />

                      {foundItem.categoryTitle}
                    </span>
                  </div>

                  {/* WISHLIST */}
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="
                  absolute
                  top-5
                  right-5
                  w-11
                  h-11
                  rounded-full
                  bg-white/95
                  backdrop-blur-sm
                  flex
                  items-center
                  justify-center
                  shadow-md
                  hover:scale-110
                  transition
                  cursor-pointer
                "
                  >
                    <Heart
                      size={19}
                      className={
                        isLiked
                          ? "fill-rose-500 text-rose-500"
                          : "text-neutral-700"
                      }
                    />
                  </button>

                  {/* IMAGE COUNTER */}
                  <div
                    className="
                  absolute
                  bottom-5
                  right-5
                  bg-black/65
                  backdrop-blur-sm
                  text-white
                  px-3
                  py-1.5
                  rounded-full
                  text-xs
                  font-medium
                "
                  >
                    1 / 5
                  </div>

                  {/* LEFT ARROW */}
                  <button
                    className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  w-10
                  h-10
                  rounded-full
                  bg-white/90
                  hover:bg-white
                  shadow-md
                  flex
                  items-center
                  justify-center
                  text-neutral-800
                  transition
                "
                  >
                    ‹
                  </button>

                  {/* RIGHT ARROW */}
                  <button
                    className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  w-10
                  h-10
                  rounded-full
                  bg-white/90
                  hover:bg-white
                  shadow-md
                  flex
                  items-center
                  justify-center
                  text-neutral-800
                  transition
                "
                  >
                    ›
                  </button>
                </div>

                {/* =================================================
                TRUST STRIP
            ================================================== */}
                <div
                  className="
                mt-4
                bg-white
                border
                border-amber-100
                rounded-2xl
                px-4
                py-4
              "
                >
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div
                      className="
                    flex
                    flex-col
                    sm:flex-row
                    items-center
                    justify-center
                    gap-1.5
                    text-xs
                    text-neutral-700
                  "
                    >
                      <span className="text-amber-600">✦</span>

                      <span>100% Verified</span>
                    </div>

                    <div
                      className="
                    flex
                    flex-col
                    sm:flex-row
                    items-center
                    justify-center
                    gap-1.5
                    text-xs
                    text-neutral-700
                  "
                    >
                      <span className="text-amber-600">▣</span>

                      <span>Real Photos</span>
                    </div>

                    <div
                      className="
                    flex
                    flex-col
                    sm:flex-row
                    items-center
                    justify-center
                    gap-1.5
                    text-xs
                    text-neutral-700
                  "
                    >
                      <span className="text-amber-600">♟</span>

                      <span>Real Buyers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
          RIGHT - PRODUCT INFORMATION
      ================================================== */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* =================================================
              PRODUCT INFORMATION CARD
          ================================================== */}
              <div
                className="
              bg-white
              rounded-3xl
              border
              border-amber-100
              p-5
              shadow-sm
            "
              >
                {/* BADGE */}
                <div
                  className="
                inline-flex
                items-center
                gap-2
                bg-amber-100
                text-amber-800
                px-3.5
                py-1.5
                rounded-full
                text-xs
                font-bold
                mb-4
              "
                >
                  <Sparkles size={12} />
                  Verified Quality Product
                </div>

                {/* CATEGORY */}
                <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide">
                  {foundItem.categoryTitle}
                </p>

                {/* TITLE */}
                <h1
                  className="
                mt-2
                text-2xl
                sm:text-3xl
                font-serif
                font-bold
                text-neutral-900
                leading-tight
              "
                >
                  {foundItem.name}
                </h1>

                {/* RATING */}
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={17}
                        className="fill-amber-500 text-amber-500"
                      />
                    ))}
                  </div>

                  <span className="font-bold text-neutral-900">4.8</span>

                  <span className="text-sm text-neutral-500">
                    (128 reviews)
                  </span>
                </div>

                {/* PRICE */}
                <div className="flex flex-wrap items-center gap-3 mt-5">
                  <span
                    className="
                  text-3xl
                  font-extrabold
                  text-neutral-900
                "
                  >
                    {formattedTotalPrice}
                  </span>

                  <span
                    className="
                  text-sm
                  text-neutral-400
                  line-through
                "
                  >
                    ₹{(Number(foundItem.price) * quantity * 1.25).toFixed(0)}
                  </span>

                  <span
                    className="
                  bg-amber-100
                  text-amber-800
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-bold
                "
                  >
                    25% OFF
                  </span>
                </div>

                {/* UNIT PRICE */}
                <p className="mt-2 text-xs text-neutral-400">
                  Unit Price: {foundItem.price}
                </p>

                {/* DESCRIPTION */}
                <p
                  className="
                mt-4
                text-sm
                leading-6
                text-neutral-600
              "
                >
                  {foundItem.desc}
                </p>

                {/* =================================================
                FEATURE PILLS
            ================================================== */}
                <div className="grid grid-cols-3 gap-2 mt-5">
                  {/* CUSTOMIZABLE */}
                  <div className="text-center">
                    <div
                      className="
                    w-9
                    h-9
                    mx-auto
                    rounded-full
                    bg-amber-50
                    flex
                    items-center
                    justify-center
                    border
                    border-amber-100
                  "
                    >
                      <CheckCircle2 size={17} className="text-amber-700" />
                    </div>

                    <p className="mt-2 text-[10px] sm:text-xs text-neutral-600">
                      Customizable
                    </p>
                  </div>

                  {/* ON TIME */}
                  <div className="text-center">
                    <div
                      className="
                    w-9
                    h-9
                    mx-auto
                    rounded-full
                    bg-amber-50
                    flex
                    items-center
                    justify-center
                    border
                    border-amber-100
                  "
                    >
                      <Truck size={17} className="text-amber-700" />
                    </div>

                    <p className="mt-2 text-[10px] sm:text-xs text-neutral-600">
                      On-Time Setup
                    </p>
                  </div>

                  {/* PREMIUM */}
                  <div className="text-center">
                    <div
                      className="
                    w-9
                    h-9
                    mx-auto
                    rounded-full
                    bg-amber-50
                    flex
                    items-center
                    justify-center
                    border
                    border-amber-100
                  "
                    >
                      <Sparkles size={17} className="text-amber-700" />
                    </div>

                    <p className="mt-2 text-[10px] sm:text-xs text-neutral-600">
                      Premium Quality
                    </p>
                  </div>
                </div>

                {/* =================================================
                SERVICE AVAILABLE
            ================================================== */}
                <div
                  className="
                mt-5
                rounded-2xl
                bg-amber-50/70
                border
                border-amber-100
                px-4
                py-3
              "
                >
                  <div
                    className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-green-700
                "
                  >
                    <CheckCircle2 size={16} />
                    Service available in your area
                  </div>
                </div>

                {/* =================================================
                QUANTITY
            ================================================== */}
                <div className="flex items-center justify-between mt-5">
                  <span className="text-sm font-semibold text-neutral-700">
                    Quantity
                  </span>

                  <div
                    className="
                  flex
                  items-center
                  border
                  border-amber-300
                  rounded-xl
                  overflow-hidden
                  bg-white
                "
                  >
                    <button
                      onClick={() => handleQuantityChange("dec")}
                      className="
                    w-10
                    h-10
                    flex
                    items-center
                    justify-center
                    text-amber-800
                    hover:bg-amber-50
                    transition
                    cursor-pointer
                  "
                    >
                      <Minus size={15} />
                    </button>

                    <span
                      className="
                    w-10
                    text-center
                    text-sm
                    font-bold
                  "
                    >
                      {quantity}
                    </span>

                    <button
                      onClick={() => handleQuantityChange("inc")}
                      className="
                    w-10
                    h-10
                    flex
                    items-center
                    justify-center
                    text-amber-800
                    hover:bg-amber-50
                    transition
                    cursor-pointer
                  "
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                {/* =================================================
                ACTION BUTTONS
            ================================================== */}
                <div
                  className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-3
                mt-5
              "
                >
                  {/* ADD TO BASKET */}
                  <button
                    onClick={handleAddToCart}
                    className="
                  h-12
                  rounded-xl
                  border
                  border-amber-300
                  bg-amber-50
                  hover:bg-amber-100
                  text-amber-900
                  font-bold
                  text-sm
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                  cursor-pointer
                "
                  >
                    <ShoppingBag size={17} />

                    <span>Add to Basket</span>
                  </button>

                  {/* BOOK NOW */}
                  <button
                    onClick={()=>router.push("/payment-detail")}
                    className="
                  h-12
                  rounded-xl
                  bg-[#8B3F05]
                  hover:bg-[#713200]
                  text-white
                  font-bold
                  text-sm
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                  shadow-md
                  hover:shadow-lg
                  cursor-pointer
                "
                  >
                    <Calendar size={17} />

                    <span>Book Now</span>
                  </button>
                </div>

                {/* CHECKOUT MESSAGE */}
                <p className="text-center text-xs text-neutral-400 mt-4">
                  Secure checkout · Guaranteed satisfaction
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
        LOWER INFORMATION SECTION
        STRUCTURE ALIGNED WITH PRODUCT DETAIL PAGE
        FUNCTIONALITY / EXISTING PRODUCT DATA UNCHANGED
    ====================================================== */}
        <section
          className="
        mt-8
        bg-white
        rounded-3xl
        border
        border-amber-100
        shadow-sm
        overflow-hidden
      "
        >
          {/* =================================================
          TABS
      ================================================== */}
          <div className="border-b border-neutral-100 overflow-x-auto sticky top-0 bg-white/95 backdrop-blur-md z-20">
            <div className="flex min-w-max">
              {[
                "Overview",
                "What's Included",
                "What's Not Included",
                "Cancellation Policy",
                "Reviews",
                "FAQ",
              ].map((tab, index) => (
                <button
                  key={tab}
                  className={`
                px-5
                sm:px-7
                py-4
                text-sm
                font-medium
                transition
                ${
                  index === 0
                    ? "text-amber-800 border-b-2 border-amber-500"
                    : "text-neutral-500 hover:text-amber-800"
                }
              `}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* =================================================
          OVERVIEW
      ================================================== */}
          <div
            id="overview"
            className="
          scroll-mt-28
          p-5
          sm:p-8
          border-b
          border-neutral-100
        "
          >
            <h2
              className="
            text-xl
            sm:text-2xl
            font-serif
            font-bold
            text-neutral-900
            leading-tight
          "
            >
              Turn Your Special Moments Into Magical Memories
            </h2>

            <p
              className="
            mt-4
            text-sm
            sm:text-base
            leading-7
            text-neutral-600
          "
            >
              {foundItem.desc}
            </p>

            {/* FEATURE CARDS */}
            <div
              className="
            grid
            grid-cols-2
            sm:grid-cols-4
            gap-3
            mt-7
          "
            >
              <div className="rounded-2xl bg-amber-50 p-4">
                <Sparkles size={19} className="text-amber-700" />

                <p className="mt-3 text-xs font-semibold text-neutral-800">
                  Premium Decor
                </p>

                <p className="text-[11px] text-neutral-500 mt-1">
                  & Setup
                </p>
              </div>

              <div className="rounded-2xl bg-amber-50 p-4">
                <CheckCircle2 size={19} className="text-amber-700" />

                <p className="mt-3 text-xs font-semibold text-neutral-800">
                  Verified
                </p>

                <p className="text-[11px] text-neutral-500 mt-1">
                  Quality
                </p>
              </div>

              <div className="rounded-2xl bg-amber-50 p-4">
                <Truck size={19} className="text-amber-700" />

                <p className="mt-3 text-xs font-semibold text-neutral-800">
                  On-Time
                </p>

                <p className="text-[11px] text-neutral-500 mt-1">
                  Setup
                </p>
              </div>

              <div className="rounded-2xl bg-amber-50 p-4">
                <Calendar size={19} className="text-amber-700" />

                <p className="mt-3 text-xs font-semibold text-neutral-800">
                  Easy
                </p>

                <p className="text-[11px] text-neutral-500 mt-1">
                  Booking
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
          INCLUDED / NOT INCLUDED
      ================================================== */}
          <div
            className="
          grid
          grid-cols-1
          lg:grid-cols-12
          gap-6
          p-5
          sm:p-8
          border-b
          border-neutral-100
        "
          >
            {/* WHAT'S INCLUDED */}
            <div
              id="included"
              className="
            scroll-mt-28
            lg:col-span-6
            rounded-2xl
            bg-[#FFF9E8]
            border
            border-amber-100
            p-6
          "
            >
              <h3
                className="
              font-serif
              font-bold
              text-lg
              text-neutral-900
              flex
              items-center
              gap-2
            "
              >
                <CheckCircle2 size={20} className="text-emerald-700" />
                What's Included
              </h3>

              <div className="mt-5 space-y-3">
                {[
                  "Premium decoration setup",
                  "Professional setup team",
                  "Quality decoration materials",
                  "On-time service",
                  "Post-event cleanup",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                  flex
                  items-center
                  gap-3
                  text-sm
                  text-neutral-700
                "
                  >
                    <CheckCircle2
                      size={16}
                      className="text-emerald-600 shrink-0"
                    />

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WHAT'S NOT INCLUDED */}
            <div
              id="not-included"
              className="
            scroll-mt-28
            lg:col-span-6
            rounded-2xl
            bg-rose-50/50
            border
            border-rose-100
            p-6
          "
            >
              <h3
                className="
              font-serif
              font-bold
              text-lg
              text-neutral-900
              flex
              items-center
              gap-2
            "
              >
                <AlertCircle size={20} className="text-rose-600" />
                What's Not Included
              </h3>

              <div className="mt-5 space-y-3">
                {[
                  "Venue booking charges and venue permissions",
                  "Custom catering, cake and food items",
                  "Dedicated heavy generator / power backup",
                  "Repairs for physical damage caused by venue guests",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                  flex
                  items-center
                  gap-3
                  text-sm
                  text-neutral-700
                "
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =================================================
          CANCELLATION POLICY
      ================================================== */}
          <div
            id="cancellation"
            className="
          scroll-mt-28
          p-5
          sm:p-8
          border-b
          border-neutral-100
          bg-[#FAF7F2]/40
        "
          >
            <div className="max-w-3xl">
              <h3
                className="
              font-serif
              font-bold
              text-lg
              text-neutral-900
              mb-2
            "
              >
                Cancellation & Rescheduling Policy
              </h3>

              <p
                className="
              text-sm
              text-neutral-600
              leading-relaxed
            "
              >
                Please contact our team as early as possible if you need to
                cancel or reschedule your booking. Cancellation and
                rescheduling availability may depend on the booking status,
                event date, and preparation already completed.
              </p>
            </div>
          </div>

          {/* =================================================
          FAQ
      ================================================== */}
          <div
            id="faq"
            className="
          scroll-mt-28
          p-5
          sm:p-8
          border-b
          border-neutral-100
        "
          >
            <h3
              className="
            font-serif
            font-bold
            text-xl
            text-neutral-900
            mb-6
          "
            >
              Frequently Asked Questions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-neutral-100 bg-white p-5">
                <h4 className="font-semibold text-sm text-neutral-900">
                  Can I customize the decoration?
                </h4>

                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Yes. Customization can be discussed with the team according
                  to your event requirements and selected service.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-100 bg-white p-5">
                <h4 className="font-semibold text-sm text-neutral-900">
                  How early should I book?
                </h4>

                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Booking in advance is recommended so the required date,
                  materials, and setup team can be arranged.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-100 bg-white p-5">
                <h4 className="font-semibold text-sm text-neutral-900">
                  Is setup included?
                </h4>

                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  The listed decoration service includes the setup items
                  described in the What's Included section.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-100 bg-white p-5">
                <h4 className="font-semibold text-sm text-neutral-900">
                  How do I confirm my booking?
                </h4>

                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Use the Book Now button to continue to the existing booking
                  flow for this product.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
        REVIEW SECTION
    ====================================================== */}
        <section
          id="reviews"
          className="
        scroll-mt-28
        mt-6
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
      "
        >
          {/* =================================================
          RATING SUMMARY
      ================================================== */}
          <div
            className="
          bg-white
          border
          border-amber-100
          rounded-3xl
          p-6
          sm:p-8
        "
          >
            <h3
              className="
            text-xl
            font-serif
            font-bold
            text-neutral-900
          "
            >
              Customer Reviews
            </h3>

            <div className="flex items-center gap-3 mt-3">
              <span className="text-3xl font-bold">4.8</span>

              <div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>

                <p className="text-xs text-neutral-500 mt-1">
                  128 verified reviews
                </p>
              </div>
            </div>

            {/* RATING BARS */}
            <div className="mt-6 space-y-3">
              {[
                ["5", "71%"],
                ["4", "29%"],
                ["3", "0%"],
                ["2", "0%"],
                ["1", "0%"],
              ].map(([rating, percentage]) => (
                <div key={rating} className="flex items-center gap-3 text-xs">
                  <span className="w-4 text-neutral-600">{rating}</span>

                  <div
                    className="
                  flex-1
                  h-2
                  bg-neutral-100
                  rounded-full
                  overflow-hidden
                "
                  >
                    <div
                      className="
                    h-full
                    bg-amber-500
                    rounded-full
                  "
                      style={{
                        width: percentage,
                      }}
                    />
                  </div>

                  <span className="w-10 text-right text-neutral-500">
                    {percentage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* =================================================
          QUOTE CARD
      ================================================== */}
          <div
            className="
          bg-[#FFF9E8]
          border
          border-amber-100
          rounded-3xl
          p-8
          flex
          flex-col
          justify-center
        "
          >
            <Sparkles size={24} className="text-amber-600" />

            <h3
              className="
            mt-4
            text-2xl
            font-serif
            font-bold
            text-neutral-900
          "
            >
              Because the little moments matter.
            </h3>

            <p
              className="
            mt-3
            text-sm
            leading-6
            text-neutral-600
          "
            >
              Create beautiful celebrations with thoughtfully designed
              decorations and memorable experiences.
            </p>
          </div>
        </section>
                {/* =====================================================
        RELATED PRODUCTS SECTION
    ====================================================== */}
        {relatedProducts.length > 0 && (
          <section className="mt-10 border-t border-amber-200/50 pt-12 pb-10">
            {/* SECTION HEADING */}
            <div className="text-center mb-8">
              <span
                className="
                inline-flex
                items-center
                justify-center
                bg-amber-100
                text-amber-800
                px-4
                py-1.5
                rounded-full
                text-[10px]
                font-bold
                uppercase
                tracking-[0.3em]
              "
              >
                Related Products
              </span>

              <h2
                className="
                mt-3
                text-2xl
                sm:text-3xl
                font-serif
                font-bold
                text-neutral-900
              "
              >
                {galleryCategories.find((category) =>
                  category.items.some((item) => item.id === foundItem.id)
                )?.title || "Related Products"}
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                Explore more products from this collection.
              </p>
            </div>

            {/* PRODUCT CARDS */}
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  className="
                    min-w-[215px]
                    sm:min-w-[230px]
                    bg-white
                    rounded-2xl
                    border
                    border-amber-200
                    overflow-hidden
                    shadow-sm
                    hover:shadow-md
                    transition
                    shrink-0
                  "
                >
                  {/* IMAGE */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.name}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition
                        duration-500
                        hover:scale-105
                      "
                    />

                    {/* WISHLIST */}
                    <button
                      className="
                        absolute
                        top-3
                        right-3
                        w-9
                        h-9
                        rounded-full
                        bg-white/95
                        flex
                        items-center
                        justify-center
                        shadow-sm
                        hover:scale-110
                        transition
                      "
                    >
                      <Heart size={17} className="text-neutral-700" />
                    </button>
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="p-4">
                    <h3
                      className="
                        text-lg
                        font-serif
                        font-bold
                        text-neutral-900
                        truncate
                      "
                    >
                      {item.name}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-neutral-500
                        line-clamp-2
                        min-h-[32px]
                      "
                    >
                      {item.desc}
                    </p>

                    {/* PRICE + BOOK */}
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-bold text-neutral-900">
                        {item.price}
                      </span>

                      <Link
                        href={`/gallery/${item.id}`}
                        className="
                          bg-[#8B3F05]
                          hover:bg-[#713200]
                          text-white
                          px-4
                          py-2
                          rounded-full
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-wide
                          transition
                        "
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* =====================================================
      CONFIRM BOOKING MODAL
      FUNCTIONALITY UNCHANGED
  ====================================================== */}
      {showConfirmModal && (
        <div
          className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/60
        backdrop-blur-sm
        p-4
      "
        >
          <div
            className="
          bg-white
          rounded-3xl
          max-w-md
          w-full
          p-6
          sm:p-8
          shadow-2xl
          border
          border-amber-200
          space-y-6
          text-center
        "
          >
            <div
              className="
            w-16
            h-16
            bg-amber-100
            text-amber-900
            rounded-full
            flex
            items-center
            justify-center
            mx-auto
            shadow-inner
          "
            >
              <AlertCircle size={32} />
            </div>

            <div className="space-y-2">
              <h3
                className="
              text-2xl
              font-serif
              font-bold
              text-gray-900
            "
              >
                Are you sure?
              </h3>

              <p className="text-sm text-gray-600">
                Do you want to confirm the booking for{" "}
                <span className="font-semibold text-amber-900">
                  {foundItem.name}
                </span>{" "}
                ({quantity} unit
                {quantity > 1 ? "s" : ""} - {formattedTotalPrice}
                )?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="
              w-full
              bg-gray-100
              hover:bg-gray-200
              text-gray-800
              font-bold
              py-3
              rounded-full
              text-xs
              uppercase
              tracking-wider
              transition
              cursor-pointer
            "
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmBooking}
                className="
              w-full
              bg-amber-900
              hover:bg-black
              text-white
              font-bold
              py-3
              rounded-full
              text-xs
              uppercase
              tracking-wider
              transition
              shadow-md
              cursor-pointer
            "
              >
                Yes, Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
      SUCCESS MODAL
      FUNCTIONALITY UNCHANGED
  ====================================================== */}
      {showSuccessModal && (
        <div
          className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/60
        backdrop-blur-sm
        p-4
      "
        >
          <div
            className="
          bg-white
          rounded-3xl
          max-w-md
          w-full
          p-6
          sm:p-8
          shadow-2xl
          border
          border-emerald-200
          space-y-6
          text-center
        "
          >
            <div
              className="
            w-16
            h-16
            bg-emerald-100
            text-emerald-700
            rounded-full
            flex
            items-center
            justify-center
            mx-auto
            shadow-inner
          "
            >
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <h3
                className="
              text-2xl
              font-serif
              font-bold
              text-gray-900
            "
              >
                Booking Successful!
              </h3>

              <p className="text-sm text-gray-600">
                Your booking for{" "}
                <span className="font-semibold text-amber-900">
                  {foundItem.name}
                </span>{" "}
                has been successfully placed. Our team will contact you soon!
              </p>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                router.push("/");
              }}
              className="
            w-full
            bg-amber-900
            hover:bg-black
            text-white
            font-bold
            py-3.5
            rounded-full
            text-xs
            uppercase
            tracking-widest
            transition
            shadow-md
            cursor-pointer
          "
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
