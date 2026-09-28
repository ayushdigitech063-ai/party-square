"use client";

import React, { use, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
    Truck,
  X,
} from "lucide-react";

import { diwaliProducts } from "@/app/data/diwaliProducts";
import { useCart } from "@/app/context/CartContext";

/* ========================================================= */
/* TYPES                                                     */
/* ========================================================= */

interface PageProps {
  params: Promise<{ id: string }>;
}

type TabKey =
  | "overview"
  | "included"
  | "notIncluded"
  | "cancellation"
  | "reviews"
  | "faq";

/* ========================================================= */
/* PAGE                                                      */
/* ========================================================= */

export default function DiwaliProductDetail({
  params,
}: PageProps) {
  const resolvedParams = use(params);
  const productId = Number(resolvedParams.id);

  const { addToCart } = useCart();

  /* ======================================================= */
  /* PRODUCT                                                 */
  /* ======================================================= */

  const product = diwaliProducts.find(
    (item) => item.id === productId
  );

  /* ======================================================= */
  /* STATES                                                  */
  /* ======================================================= */

  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const [activeTab, setActiveTab] =
    useState<TabKey>("overview");

  const [cartMessage, setCartMessage] =
    useState(false);

  const [relatedStart, setRelatedStart] =
    useState(0);

  /* ======================================================= */
  /* PRODUCT NOT FOUND                                       */
  /* ======================================================= */

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fbf8f3] flex flex-col items-center justify-center px-6">
        <h1 className="font-serif text-4xl font-bold text-neutral-900">
          404
        </h1>

        <p className="mt-2 text-sm text-neutral-600">
          Product nahi mila bhai!
        </p>

        <Link
          href="/Festivals/diwali/all-products"
          className="mt-6 bg-[#4b2014] text-white px-6 py-3 rounded-lg text-xs uppercase tracking-wider font-bold"
        >
          Back to Catalogue
        </Link>
      </div>
    );
  }

  /* ======================================================= */
  /* PRODUCT DATA                                            */
  /* ======================================================= */

  const unitPrice = Number(product.price);

  const rating =
    (product as any).rating ?? 5;

  const reviewCount =
    (product as any).reviewCount ?? 262;

  const originalPrice = Number(
    (product as any).originalPrice ??
      Math.round(unitPrice * 1.25)
  );

  const discountPercent =
    originalPrice > 0
      ? Math.round(
          ((originalPrice - unitPrice) /
            originalPrice) *
            100
        )
      : 0;

  const totalPrice =
    unitPrice * quantity;

  /* ======================================================= */
  /* GALLERY                                                 */
  /* ======================================================= */

  const galleryImages: string[] =
    (product as any).gallery?.length
      ? (product as any).gallery
      : [
          product.image,
          product.image,
          product.image,
          product.image,
          product.image,
        ];

  /* ======================================================= */
  /* INCLUDED                                                */
  /* ======================================================= */

  const whatsIncluded: string[] =
    (product as any).whatsIncluded ?? [
      "Premium decoration setup",
      "Professional setup team",
      "Quality decoration materials",
      "On-time service",
      "Post-event cleanup",
    ];

  const whatsNotIncluded: string[] =
    (product as any).whatsNotIncluded ?? [
      "Food and beverages",
      "Venue charges",
      "Additional custom requirements",
    ];

  /* ======================================================= */
  /* REVIEWS                                                 */
  /* ======================================================= */

  const ratingBreakdown = [
    {
      star: 5,
      percent: 71,
    },
    {
      star: 4,
      percent: 29,
    },
    {
      star: 3,
      percent: 0,
    },
    {
      star: 2,
      percent: 0,
    },
    {
      star: 1,
      percent: 0,
    },
  ];

  /* ======================================================= */
  /* RELATED PRODUCTS                                        */
  /* ======================================================= */

  const relatedProducts = diwaliProducts
    .filter(
      (item) =>
        item.id !== product.id
    )
    .slice(0, 8);

  const visibleRelatedProducts =
    relatedProducts.length <= 5
      ? relatedProducts
      : Array.from(
          {
            length: 5,
          },
          (_, index) =>
            relatedProducts[
              (relatedStart + index) %
                relatedProducts.length
            ]
        );

  /* ======================================================= */
  /* HANDLERS                                                */
  /* ======================================================= */

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) =>
      prev > 1 ? prev - 1 : 1
    );
  };

  const handlePreviousImage = () => {
    setActiveImage((prev) =>
      prev === 0
        ? galleryImages.length - 1
        : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveImage((prev) =>
      prev === galleryImages.length - 1
        ? 0
        : prev + 1
    );
  };

  /* ======================================================= */
  /* RELATED SLIDER                                          */
  /* ======================================================= */

  const handleRelatedPrevious = () => {
    setRelatedStart((prev) =>
      prev === 0
        ? relatedProducts.length - 1
        : prev - 1
    );
  };

  const handleRelatedNext = () => {
    setRelatedStart(
      (prev) =>
        (prev + 1) %
        relatedProducts.length
    );
  };

  /* ======================================================= */
  /* ADD TO CART                                             */
  /* ======================================================= */

  const handleAddToCart = () => {
    for (
      let i = 0;
      i < quantity;
      i++
    ) {
      addToCart({
        id: String(product.id),
        name: product.name,
        price: product.price,
        image: product.image,
        desc: product.desc,
        category:
          "Diwali Decoration",
      });
    }

    setCartMessage(true);

    setTimeout(() => {
      setCartMessage(false);
    }, 2000);
  };

  /* ======================================================= */
  /* BOOK NOW                                                */
  /* ======================================================= */

  const handleBookNow = () => {
    setShowModal(true);
  };

  /* ======================================================= */
  /* TABS                                                    */
  /* ======================================================= */

  const tabs: {
    key: TabKey;
    label: string;
  }[] = [
    {
      key: "overview",
      label: "Overview",
    },
    {
      key: "included",
      label: "What's Included",
    },
    {
      key: "notIncluded",
      label: "What's Not Included",
    },
    {
      key: "cancellation",
      label: "Cancellation Policy",
    },
    {
      key: "reviews",
      label: "Reviews",
    },
    {
      key: "faq",
      label: "FAQ",
    },
  ];

  /* ======================================================= */
  /* PAGE                                                    */
  /* ======================================================= */

  return (
    <div className="min-h-screen bg-[#fbf8f3] px-3 sm:px-5 lg:px-8 py-6 md:py-8">

      <div className="max-w-[1400px] mx-auto">

        {/* ================================================= */}
        {/* BACK                                              */}
        {/* ================================================= */}

        <Link
          href="/Festivals/diwali/all-products"
          className="inline-flex items-center gap-2 mb-4 text-[11px] font-semibold text-neutral-500 hover:text-[#b45a14] transition"
        >
          <ArrowLeft size={14} />

          Back to All Products
        </Link>

        {/* ================================================= */}
        {/* TOP PRODUCT CARD                                  */}
        {/* ================================================= */}

        <section className="bg-white border border-[#eadba7] rounded-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-3 sm:p-4 lg:p-5">

          <div className="grid grid-cols-1 lg:grid-cols-[64px_minmax(0,1.55fr)_minmax(330px,1fr)] gap-3 lg:gap-5">

            {/* ============================================= */}
            {/* THUMBNAILS                                    */}
            {/* ============================================= */}

            <div className="hidden lg:flex flex-col gap-2">

              {galleryImages
                .slice(0, 4)
                .map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setActiveImage(index)
                    }
                    className={`w-[62px] h-[62px] rounded-[10px] overflow-hidden transition border-2 ${
                      activeImage === index
                        ? "border-[#e59a21]"
                        : "border-[#e5e5e5]"
                    }`}
                  >
                    <img
                      src={image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}

              {galleryImages.length > 4 && (
                <div className="w-[62px] h-[62px] rounded-[10px] bg-[#fff9e9] border border-[#eadba7] flex items-center justify-center text-[11px] font-bold text-[#a84b00]">
                  +
                  {galleryImages.length -
                    4}
                </div>
              )}

            </div>

            {/* ============================================= */}
            {/* MAIN IMAGE                                    */}
            {/* ============================================= */}

            <div>

              <div className="relative h-[310px] sm:h-[420px] lg:h-[455px] overflow-hidden rounded-[14px] bg-[#f3f0eb]">

                <img
                  src={
                    galleryImages[
                      activeImage
                    ]
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* CATEGORY */}

                <div className="absolute top-4 left-4 bg-white/95 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                  <Sparkles
                    size={13}
                    className="text-[#b85a13]"
                  />

                  <span className="text-[10px] font-bold text-[#8c3d0d]">
                    Diwali Products
                  </span>
                </div>

                {/* HEART */}

                <button
                  type="button"
                  className="absolute top-4 right-4 w-[38px] h-[38px] bg-white rounded-full shadow flex items-center justify-center"
                >
                  <Heart
                    size={17}
                    className="text-neutral-600"
                  />
                </button>

                {/* PREVIOUS */}

                <button
                  type="button"
                  onClick={
                    handlePreviousImage
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-[46px] h-[46px] bg-white/95 rounded-full shadow flex items-center justify-center text-neutral-600 hover:text-[#a84b00]"
                >
                  <ChevronLeft
                    size={18}
                  />
                </button>

                {/* NEXT */}

                <button
                  type="button"
                  onClick={
                    handleNextImage
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-[46px] h-[46px] bg-white/95 rounded-full shadow flex items-center justify-center text-neutral-600 hover:text-[#a84b00]"
                >
                  <ChevronRight
                    size={18}
                  />
                </button>

                {/* COUNTER */}

                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-[10px]">
                  {activeImage + 1}/
                  {galleryImages.length}
                </div>

              </div>

              {/* MOBILE THUMBNAILS */}

              <div className="lg:hidden flex gap-2 mt-3 overflow-x-auto">

                {galleryImages.map(
                  (image, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        setActiveImage(
                          index
                        )
                      }
                      className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 ${
                        activeImage ===
                        index
                          ? "border-[#e59a21]"
                          : "border-neutral-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )
                )}

              </div>

              {/* VERIFIED STRIP */}

              <div className="mt-3 w-full border border-[#e9c76a] bg-[#fffdf7] rounded-[10px] px-4 py-3">

                <div className="flex items-center justify-around gap-3 text-[9px] font-semibold text-neutral-500">

                  <span className="flex items-center gap-1.5">
                    <span className="text-[#d88a18]">
                      ✦
                    </span>
                    100% Verified
                  </span>

                  <span className="flex items-center gap-1.5">
                    <span className="text-[#d88a18]">
                      ✦
                    </span>
                    Real Photos
                  </span>

                  <span className="flex items-center gap-1.5">
                    <span className="text-[#d88a18]">
                      ✦
                    </span>
                    Real Buyers
                  </span>

                </div>

              </div>

            </div>

            {/* ============================================= */}
            {/* PRODUCT INFO                                  */}
            {/* ============================================= */}

            <div className="px-1 lg:px-2 flex flex-col">

              {/* VERIFIED */}

              <span className="w-fit inline-flex items-center gap-1.5 bg-[#fff0bf] text-[#a94b00] px-3 py-1.5 rounded-full text-[9px] font-bold">
                <Sparkles size={11} />

                Verified Quality Product
              </span>

              {/* NAME */}

              <h1 className="mt-5 font-serif text-[30px] sm:text-[34px] lg:text-[38px] leading-[1.05] font-bold text-[#17100c]">
                {product.name}
              </h1>

              {/* RATING */}

              <div className="mt-5 flex items-center gap-2">

                <div className="flex gap-[2px]">

                  {Array.from({
                    length: 5,
                  }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={
                        index <
                        Math.round(
                          rating
                        )
                          ? "fill-[#ff9200] text-[#ff9200]"
                          : "text-neutral-300"
                      }
                    />
                  ))}

                </div>

                <span className="text-[13px] font-bold">
                  {rating}
                </span>

                <span className="text-[12px] text-neutral-500">
                  ({reviewCount} reviews)
                </span>

              </div>

              {/* PRICE */}

              <div className="mt-7 flex flex-wrap items-center gap-3">

                <span className="text-[32px] sm:text-[36px] font-extrabold text-[#17100c]">
                  ₹
                  {unitPrice.toLocaleString()}
                </span>

                <span className="text-[12px] text-neutral-400 line-through">
                  ₹
                  {originalPrice.toLocaleString()}
                </span>

                <span className="bg-[#fff0bf] text-[#a94b00] px-3 py-1.5 rounded-full text-[10px] font-bold">
                  {discountPercent}% OFF
                </span>

              </div>

              {/* DESCRIPTION */}

              <p className="mt-5 text-[13px] sm:text-[14px] leading-[1.7] text-neutral-600">
                {product.desc}
              </p>

              {/* BENEFITS */}

              <div className="grid grid-cols-3 mt-6">

                <div className="flex flex-col items-center text-center gap-3">

                  <div className="w-[42px] h-[42px] rounded-full bg-[#fff9e9] flex items-center justify-center">
                    <CheckCircle2
                      size={18}
                      className="text-[#d35f00]"
                    />
                  </div>

                  <span className="text-[11px] text-neutral-600">
                    Customizable
                  </span>

                </div>

                <div className="flex flex-col items-center text-center gap-3">

                  <div className="w-[42px] h-[42px] rounded-full bg-[#fff9e9] flex items-center justify-center">
                    <Clock
                      size={18}
                      className="text-[#d35f00]"
                    />
                  </div>

                  <span className="text-[11px] text-neutral-600">
                    On-Time Setup
                  </span>

                </div>

                <div className="flex flex-col items-center text-center gap-3">

                  <div className="w-[42px] h-[42px] rounded-full bg-[#fff9e9] flex items-center justify-center">
                    <Sparkles
                      size={18}
                      className="text-[#d35f00]"
                    />
                  </div>

                  <span className="text-[11px] text-neutral-600">
                    Premium Quality
                  </span>

                </div>

              </div>

              {/* AVAILABILITY */}

              <div className="mt-6 flex items-center gap-2 border border-[#eadba7] bg-[#fffdf4] rounded-[12px] px-4 py-3 text-[11px] text-green-700">

                <CheckCircle2
                  size={15}
                />

                Service available in your area

              </div>

              {/* QUANTITY */}

              <div className="mt-5 flex items-center justify-between">

                <span className="text-[11px] font-semibold">
                  Quantity
                </span>

                <div className="flex items-center border border-[#e8b84e] rounded-[12px] overflow-hidden">

                  <button
                    type="button"
                    onClick={
                      handleDecrement
                    }
                    className="w-[42px] h-[38px] flex items-center justify-center text-[#a94b00]"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="w-[45px] text-center text-[13px] font-bold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={
                      handleIncrement
                    }
                    className="w-[42px] h-[38px] flex items-center justify-center text-[#a94b00]"
                  >
                    <Plus size={14} />
                  </button>

                </div>

              </div>

              {/* TOTAL */}

              <div className="mt-4 flex items-center justify-between">

                <span className="text-[11px] text-neutral-500">
                  Total
                </span>

                <span className="text-[17px] font-bold">
                  ₹
                  {totalPrice.toLocaleString()}
                </span>

              </div>

              {/* MESSAGE */}

              <div className="h-[22px] mt-1">

                {cartMessage && (
                  <p className="text-[10px] font-semibold text-green-600">
                    ✓ Successfully added to cart!
                  </p>
                )}

              </div>

              {/* BUTTONS */}

              <div className="grid grid-cols-2 gap-3 mt-2">

                <button
                  type="button"
                  onClick={
                    handleAddToCart
                  }
                  className="h-[46px] border border-[#d8a42e] rounded-[10px] bg-[#fffdf7] text-[10px] uppercase font-bold flex items-center justify-center gap-2 hover:bg-[#fff7e5]"
                >
                  <ShoppingBag
                    size={15}
                  />

                  Add To Cart
                </button>

                <button
                  type="button"
                  onClick={
                    handleBookNow
                  }
                  className="h-[46px] bg-[#4b2014] rounded-[10px] text-white text-[10px] uppercase font-bold flex items-center justify-center gap-2 hover:bg-[#602a19]"
                >
                  <CalendarDays
                    size={15}
                  />

                  Book Now
                </button>

              </div>

              <p className="mt-4 text-center text-[9px] text-neutral-400 flex justify-center items-center gap-1">
                <ShieldCheck
                  size={11}
                />
                Secure checkout · Guaranteed satisfaction
              </p>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* OVERVIEW TABS CARD                                */}
        {/* ================================================= */}

        <section className="mt-6 bg-white border border-[#eadba7] rounded-[18px] overflow-hidden shadow-[0_2px_2px_rgba(0,0,0,0.08)]">

          {/* ========================================================== */}
          {/* TABS                                                      */}
          {/* ========================================================== */}

          <div className="border-b border-[#eadba7] overflow-x-auto">
            <div className="flex min-w-max">

              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative px-6 py-5 text-[13px] sm:text-[14px] font-bold uppercase tracking-wide whitespace-nowrap transition-colors ${
                    activeTab === tab.key
                      ? "text-[#b74300]"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {tab.label}

                  {activeTab === tab.key && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff8a00]" />
                  )}
                </button>
              ))}

            </div>
          </div>

          {/* =============================================== */}
          {/* OVERVIEW                                        */}
          {/* =============================================== */}

          {activeTab ===
            "overview" && (
            <div className="p-[18px] sm:p-[20px]">

              <div className="grid grid-cols-1 lg:grid-cols-[1.38fr_1fr] gap-[18px]">

                {/* LEFT */}

                <div className="pt-0 sm:pt-1">

                  <h2 className="font-serif font-bold text-[24px] sm:text-[27px] leading-[1.12] text-[#090909] max-w-[650px]">
                    Turn Your Special Moments Into Magical Memories
                  </h2>

                  <p className="mt-[15px] text-[11px] sm:text-[12px] leading-[1.7] text-neutral-700">
                    {product.fullDesc}
                  </p>

                  {/* FEATURE CARDS */}

<div className="grid grid-cols-2 md:grid-cols-4 gap-[9px] mt-[20px]">

  {/* PREMIUM DECOR */}
  <div className="min-h-[88px] bg-[#fff9e9] rounded-[14px] px-[12px] py-[12px] flex flex-col justify-between">

    <Sparkles
      size={15}
      className="text-[#e36000]"
    />

    <div className="mt-[10px]">
      <p className="text-[11px] sm:text-[12px] font-semibold">
        Premium Decor
      </p>

      <p className="mt-[6px] text-[10px] sm:text-[11px] text-neutral-600">
        &amp; Setup
      </p>
    </div>

  </div>


  {/* VERIFIED */}
  <div className="min-h-[88px] bg-[#fff9e9] rounded-[14px] px-[12px] py-[12px] flex flex-col justify-between">

    <CheckCircle2
      size={15}
      className="text-[#e36000]"
    />

    <div className="mt-[10px]">
      <p className="text-[11px] sm:text-[12px] font-semibold">
        Verified
      </p>

      <p className="mt-[6px] text-[10px] sm:text-[11px] text-neutral-600">
        Quality
      </p>
    </div>

  </div>


  {/* ON-TIME */}
  <div className="min-h-[88px] bg-[#fff9e9] rounded-[14px] px-[12px] py-[12px] flex flex-col justify-between">

    <Truck
      size={15}
      strokeWidth={1.8}
      className="text-[#e36000]"
    />

    <div className="mt-[10px]">
      <p className="text-[11px] sm:text-[12px] font-semibold">
        On-Time
      </p>

      <p className="mt-[6px] text-[10px] sm:text-[11px] text-neutral-600">
        Setup
      </p>
    </div>

  </div>


  {/* EASY BOOKING */}
  <div className="min-h-[88px] bg-[#fff9e9] rounded-[14px] px-[12px] py-[12px] flex flex-col justify-between">

    <CalendarDays
      size={15}
      className="text-[#e36000]"
    />

    <div className="mt-[10px]">
      <p className="text-[11px] sm:text-[12px] font-semibold">
        Easy
      </p>

      <p className="mt-[6px] text-[10px] sm:text-[11px] text-neutral-600">
        Booking
      </p>
    </div>

  </div>

</div>

</div>

                {/* WHAT'S INCLUDED */}

                <div className="bg-[#fff9e9] border border-[#f0dda2] rounded-[14px] px-[18px] sm:px-[20px] py-[18px]">

                  <h3 className="font-serif font-bold text-[20px] sm:text-[22px] text-[#090909]">
                    What&apos;s Included
                  </h3>

                  <div className="mt-[15px] space-y-[10px]">

                    {whatsIncluded.map(
                      (
                        item,
                        index
                      ) => (
                        <div
                          key={index}
                          className="flex items-center gap-[9px]"
                        >
                          <div className="w-[13px] h-[13px] rounded-full border border-[#e86611] flex items-center justify-center flex-shrink-0">
                            <Check
                              size={8}
                              strokeWidth={
                                2.5
                              }
                              className="text-[#e86611]"
                            />
                          </div>

                          <span className="text-[10px] sm:text-[11px] text-neutral-800">
                            {item}
                          </span>
                        </div>
                      )
                    )}

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* INCLUDED */}

          {activeTab ===
            "included" && (
            <div className="p-6">

              <h2 className="font-serif text-[22px] font-bold">
                What&apos;s Included
              </h2>

              <div className="mt-5 space-y-3">

                {whatsIncluded.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-[12px] text-neutral-600"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-[#d7650b]"
                      />

                      {item}
                    </div>
                  )
                )}

              </div>

            </div>
          )}

          {/* NOT INCLUDED */}

          {activeTab ===
            "notIncluded" && (
            <div className="p-6">

              <h2 className="font-serif text-[22px] font-bold">
                What&apos;s Not Included
              </h2>

              <div className="mt-5 space-y-3">

                {whatsNotIncluded.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-[12px] text-neutral-600"
                    >
                      <X
                        size={14}
                        className="text-neutral-400"
                      />

                      {item}
                    </div>
                  )
                )}

              </div>

            </div>
          )}

          {/* CANCELLATION */}

          {activeTab ===
            "cancellation" && (
            <div className="p-6">

              <h2 className="font-serif text-[22px] font-bold">
                Cancellation Policy
              </h2>

              <p className="mt-4 text-[12px] leading-6 text-neutral-600">
                Free cancellation up to 48 hours before the event.
                Cancellations within 48 hours may be subject to a
                partial charge for materials already arranged.
              </p>

            </div>
          )}

          {/* REVIEWS */}

          {activeTab ===
            "reviews" && (
            <div className="p-6">

              <h2 className="font-serif text-[22px] font-bold">
                Customer Reviews
              </h2>

              <p className="mt-3 text-[12px] text-neutral-600">
                {reviewCount} verified customers have reviewed this
                Diwali product.
              </p>

            </div>
          )}

          {/* FAQ */}

          {activeTab === "faq" && (
            <div className="p-6">

              <h2 className="font-serif text-[22px] font-bold">
                Frequently Asked Questions
              </h2>

              <div className="mt-5 space-y-5">

                <div>
                  <p className="text-[12px] font-bold">
                    How long does setup take?
                  </p>

                  <p className="mt-1 text-[11px] text-neutral-600">
                    Setup timing depends on the selected decoration
                    package and venue size.
                  </p>
                </div>

                <div>
                  <p className="text-[12px] font-bold">
                    Can this decoration be customized?
                  </p>

                  <p className="mt-1 text-[11px] text-neutral-600">
                    Yes, customization can be discussed before final
                    booking.
                  </p>
                </div>

              </div>

            </div>
          )}

        </section>

        {/* ================================================= */}
        {/* CUSTOMER REVIEWS + MOMENTS                        */}
        {/* ================================================= */}

        {activeTab ===
          "overview" && (
          <section className="mt-[18px] grid grid-cols-1 lg:grid-cols-[1fr_1.02fr] gap-[18px]">

            {/* REVIEWS */}

        <div className="bg-white">

              <h3 className="font-serif font-bold text-[20px] sm:text-[21px] text-[#090909]">
                Customer Reviews
              </h3>

              <div className="mt-[15px] flex items-center gap-[10px]">

                <span className="font-serif text-[25px] sm:text-[27px] font-bold">
                  {rating}
                </span>

                <div>

                  <div className="flex gap-[1px]">

                    {Array.from({
                      length: 5,
                    }).map((_, index) => (
                      <Star
                        key={index}
                        size={14}
                        className={
                          index <
                          Math.round(
                            rating
                          )
                            ? "fill-[#ff9200] text-[#ff9200]"
                            : "text-neutral-300"
                        }
                      />
                    ))}

                  </div>

                  <p className="mt-[4px] text-[10px] text-neutral-500">
                    {reviewCount} verified reviews
                  </p>

                </div>

              </div>

              <div className="mt-[18px] space-y-[10px]">

                {ratingBreakdown.map(
                  (item) => (
                    <div
                      key={item.star}
                      className="grid grid-cols-[12px_1fr_30px] items-center gap-[10px]"
                    >
                      <span className="text-[9px] text-neutral-500">
                        {item.star}
                      </span>

                      <div className="h-[6px] bg-[#f2f2f2] rounded-full overflow-hidden">

                        <div
                          className="h-full bg-[#ff9200] rounded-full"
                          style={{
                            width: `${item.percent}%`,
                          }}
                        />

                      </div>

                      <span className="text-[9px] text-right text-neutral-500">
                        {item.percent}%
                      </span>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* MOMENTS */}

            <div className="bg-[#fff9e9] border border-[#eadba7] rounded-[18px] px-[24px] sm:px-[28px] py-[28px] min-h-[230px] flex flex-col justify-center">

              <Sparkles
                size={20}
                className="text-[#e36000]"
              />

              <h3 className="mt-[18px] font-serif font-bold text-[19px] sm:text-[21px] text-[#090909]">
                Because the little moments matter.
              </h3>

              <p className="mt-[12px] max-w-[430px] text-[11px] sm:text-[12px] leading-[1.65] text-neutral-700">
                Create beautiful Diwali celebrations with thoughtfully
                designed decorations and memorable experiences.
              </p>

            </div>

          </section>
        )}

        {/* ================================================= */}
        {/* RELATED PRODUCTS                                  */}
        {/* ================================================= */}

  <section className="bg-white border-x border-b border-[#eadba7] rounded-b-[30px] p-8">

          {/* HEADER */}

          <div className="text-center max-w-[640px] mx-auto">

            <span className="inline-flex items-center justify-center bg-[#fff0bf] text-[#a94b00] rounded-full px-6 py-[7px] text-[10px] font-bold uppercase tracking-[0.35em]">
              Special Collection
            </span>

            <h2 className="mt-3 font-serif text-[28px] sm:text-[32px] lg:text-[34px] leading-tight font-bold text-[#17110e]">
              Diwali Special Products
            </h2>

            <p className="mt-2 text-[12px] sm:text-[13px] text-[#66615e]">
              Handpicked festive decorations and celebration essentials
              for your special Diwali moments.
            </p>

          </div>

          {/* PRODUCTS */}

          <div className="mt-10">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[24px]">

              {visibleRelatedProducts.map(
                (
                  relatedProduct
                ) => (
                  <div
                    key={
                      relatedProduct.id
                    }
                    className="group bg-white border border-[#efcc63] rounded-[22px] overflow-hidden shadow-[0_3px_7px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_18px_rgba(0,0,0,0.14)]"
                  >

                    {/* IMAGE */}

                    <div className="relative h-[220px] overflow-hidden bg-[#f3f0eb]">

                      <Link
                        href={`/Festivals/diwali/${relatedProduct.id}`}
                        className="block w-full h-full"
                      >
                        <img
                          src={
                            relatedProduct.image
                          }
                          alt={
                            relatedProduct.name
                          }
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </Link>

                      {/* HEART */}

                      <button
                        type="button"
                        aria-label="Add to wishlist"
                        className="absolute top-[12px] right-[12px] w-[38px] h-[38px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.16)] flex items-center justify-center text-[#4d5962] hover:text-[#a94700] transition"
                      >
                        <Heart
                          size={17}
                          strokeWidth={
                            1.8
                          }
                        />
                      </button>

                    </div>

                    {/* CONTENT */}

                    <div className="px-[16px] pt-[16px] pb-[13px]">

                      <Link
                        href={`/Festivals/diwali/${relatedProduct.id}`}
                      >
                        <h3 className="font-serif text-[19px] sm:text-[20px] leading-[1.15] font-bold text-[#17110e] truncate hover:text-[#a94700] transition">
                          {
                            relatedProduct.name
                          }
                        </h3>
                      </Link>

                      <p className="mt-[6px] text-[12px] sm:text-[13px] leading-[1.65] text-[#77716d] line-clamp-2 min-h-[42px]">
                        {
                          relatedProduct.desc
                        }
                      </p>

                      <div className="mt-[13px] border-t border-[#efefef]" />

                      {/* PRICE + ACTIONS */}

                      <div className="mt-[11px] flex items-center justify-between gap-2">

                        <p className="text-[13px] font-extrabold text-[#17110e] whitespace-nowrap">
                          ₹
                          {Number(
                            relatedProduct.price
                          ).toLocaleString()}
                        </p>

                        <div className="flex items-center gap-[7px]">

                          {/* CART */}

                          <button
                            type="button"
                            onClick={() => {
                              addToCart({
                                id: String(
                                  relatedProduct.id
                                ),
                                name:
                                  relatedProduct.name,
                                price:
                                  relatedProduct.price,
                                image:
                                  relatedProduct.image,
                                desc:
                                  relatedProduct.desc,
                                category:
                                  "Diwali Decoration",
                              });
                            }}
                            className="w-[31px] h-[31px] rounded-full bg-[#fff2cd] flex items-center justify-center text-[#a64b00] hover:bg-[#ffe8a8] transition"
                          >
                            <ShoppingBag
                              size={13}
                              strokeWidth={
                                1.8
                              }
                            />
                          </button>

                          {/* BOOK */}

                          <Link
                            href={`/Festivals/diwali/${relatedProduct.id}`}
                            className="h-[31px] px-[14px] rounded-full bg-[#a83e00] hover:bg-[#873100] text-white flex items-center justify-center text-[10px] font-bold uppercase transition"
                          >
                            Book
                          </Link>

                        </div>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

          {/* RELATED ARROWS */}

          {relatedProducts.length >
            5 && (
            <div className="mt-10 flex items-center justify-center gap-[14px]">

              <button
                type="button"
                onClick={
                  handleRelatedPrevious
                }
                className="w-[46px] h-[46px] rounded-full bg-[#fff0bd] shadow-[0_2px_5px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#a84b00] hover:bg-[#ffe7a1] transition"
              >
                <ChevronLeft
                  size={20}
                  strokeWidth={2}
                />
              </button>

              <button
                type="button"
                onClick={
                  handleRelatedNext
                }
                className="w-[46px] h-[46px] rounded-full bg-[#fff0bd] shadow-[0_2px_5px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#a84b00] hover:bg-[#ffe7a1] transition"
              >
                <ChevronRight
                  size={20}
                  strokeWidth={2}
                />
              </button>

            </div>
          )}

        </section>

      </div>

      {/* =================================================== */}
      {/* BOOKING MODAL                                       */}
      {/* =================================================== */}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">

          <div className="relative bg-white rounded-[20px] p-6 max-w-md w-full shadow-2xl border border-[#eadba7]">

            {/* CLOSE */}

            <button
              type="button"
              onClick={() =>
                setShowModal(false)
              }
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800"
            >
              <X size={20} />
            </button>

            {/* ICON */}

            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2
                size={30}
              />
            </div>

            {/* TITLE */}

            <h2 className="mt-4 text-center font-serif text-[22px] font-bold">
              Booking Confirmed!
            </h2>

            <p className="mt-2 text-center text-[11px] leading-5 text-neutral-600">
              Aapka{" "}
              <span className="font-semibold text-neutral-900">
                {product.name}
              </span>{" "}
              (Qty: {quantity}) successfully
              book ho gaya hai.
            </p>

            {/* ORDER */}

            <div className="mt-5 bg-[#faf8f5] border border-neutral-200 rounded-xl p-4 flex items-center gap-4">

              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div className="flex-1 min-w-0">

                <p className="text-[13px] font-bold truncate">
                  {product.name}
                </p>

                <p className="mt-1 text-[11px] text-neutral-500">
                  Qty: {quantity}
                </p>

                <p className="mt-1 text-[14px] font-bold text-[#b45a14]">
                  ₹
                  {totalPrice.toLocaleString()}
                </p>

              </div>

            </div>

            {/* MODAL BUTTONS */}

            <div className="mt-5 grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
                className="h-[42px] rounded-lg bg-neutral-100 hover:bg-neutral-200 text-[10px] uppercase font-bold"
              >
                Close
              </button>

              <Link
                href="/Festivals/diwali/all-products"
                className="h-[42px] rounded-lg bg-[#4b2014] hover:bg-[#602a19] text-white text-[10px] uppercase font-bold flex items-center justify-center"
              >
                Your Order is Confirm
              </Link>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}