"use client";
import Link from "next/link";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
    ShoppingCart,
  Star,
  Truck,
  X,
} from "lucide-react";

import { fatherCards } from "../page";
import { useCart } from "@/app/context/CartContext";

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

export default function FatherBookingPage({ params }: PageProps) {
  const router = useRouter();

  const resolvedParams = use(params);
  const productId = Number(resolvedParams.id);

  const { addToCart } = useCart();

  const product = fatherCards.find(
    (item) => item.id == productId
  );

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] =
    useState<TabKey>("overview");
const [relatedStart, setRelatedStart] = useState(0);
  const [cartMessage, setCartMessage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  /* ================================================================ */
  /* PRODUCT NOT FOUND                                                */
  /* ================================================================ */

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fbf8f3] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mb-3">
            Product Not Found
          </h1>

          <p className="text-neutral-500 mb-6">
            The decoration package you&apos;re looking for
            doesn&apos;t exist.
          </p>

          <button
            type="button"
            onClick={() => router.back()}
            className="bg-[#4b2014] text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#602a19] transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /* PRODUCT DATA                                                     */
  /* ================================================================ */

  const numericPrice = Number(
    String(product.price).replace(/[^\d.]/g, "")
  );

  const unitPrice = Number.isNaN(numericPrice)
    ? 0
    : numericPrice;

  const totalPrice = unitPrice * quantity;

  const rating = (product as any).rating ?? 4.9;

  const reviewCount =
    (product as any).reviewCount ?? 184;

  const originalPrice =
    (product as any).originalPrice ??
    Math.round(unitPrice * 1.25);

  const discountPercent =
    originalPrice > 0
      ? Math.round(
          ((originalPrice - unitPrice) / originalPrice) *
            100
        )
      : 0;

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

  const ratingBreakdown = [
    { star: 5, percent: 71 },
    { star: 4, percent: 26 },
    { star: 3, percent: 0 },
    { star: 2, percent: 0 },
    { star: 1, percent: 0 },
  ];
const relatedProducts = fatherCards.filter(
  (item) => item.id !== product.id
);

const visibleRelatedProducts =
  relatedProducts.length === 0
    ? []
    : Array.from(
        { length: Math.min(5, relatedProducts.length) },
        (_, index) =>
          relatedProducts[
            (relatedStart + index) % relatedProducts.length
          ]
      );

const handleRelatedPrevious = () => {
  if (relatedProducts.length <= 1) return;

  setRelatedStart((prev) =>
    (prev - 1 + relatedProducts.length) % relatedProducts.length
  );
};

const handleRelatedNext = () => {
  if (relatedProducts.length <= 1) return;

  setRelatedStart((prev) =>
    (prev + 1) % relatedProducts.length
  );
};
  /* ================================================================ */
  /* HANDLERS                                                         */
  /* ================================================================ */

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

  /* ================================================================ */
  /* ADD TO CART                                                      */
  /* ================================================================ */

  const handleAddToCart = () => {
    addToCart(
      {
        id: String(product.id),
        name: product.name,
        price: String(unitPrice),
        image: product.image,
        desc: product.desc || "",
        category: "Father Birthday Decoration",
      },
      quantity
    );

    setCartMessage(true);

    setTimeout(() => {
      setCartMessage(false);
    }, 2000);
  };

  /* ================================================================ */
  /* BOOKING                                                          */
  /* ================================================================ */

  const handleConfirmBooking = () => {
    setIsConfirmed(true);

    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

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

  return (
    <div className="min-h-screen bg-[#fbf8f3] px-3 sm:px-5 lg:px-8 py-6 md:py-8 relative">

      <div className="max-w-[1400px] mx-auto">

        {/* ========================================================== */}
        {/* BACK BUTTON                                                */}
        {/* ========================================================== */}

        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 mb-4 text-[11px] font-semibold text-neutral-500 hover:text-[#b45a14] transition"
        >
          <ArrowLeft size={14} />
          Back to All Products
        </button>

        {/* ========================================================== */}
        {/* MAIN PRODUCT CARD                                          */}
        {/* ========================================================== */}

        <section className="bg-white border border-[#e6e0d8] rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-3 sm:p-4 lg:p-5">

          <div className="grid grid-cols-1 lg:grid-cols-[64px_minmax(0,1.55fr)_minmax(330px,1fr)] gap-3 lg:gap-5">

            {/* ====================================================== */}
            {/* LEFT THUMBNAILS                                        */}
            {/* ====================================================== */}

            <div className="hidden lg:flex flex-col gap-2">

              {galleryImages
                .slice(0, 5)
                .map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setActiveImage(index)
                    }
                    className={`w-[62px] h-[62px] rounded-[6px] overflow-hidden bg-white transition border-2 ${
                      activeImage === index
                        ? "border-[#e59a21]"
                        : "border-[#e5e5e5] hover:border-[#e5b563]"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}

              <button
                type="button"
                onClick={handlePreviousImage}
                className="w-[62px] h-[28px] border border-[#e4ded6] rounded-[6px] flex items-center justify-center text-neutral-400 bg-white hover:text-[#c66a16]"
              >
                <ChevronLeft size={14} />
              </button>

            </div>

            {/* ====================================================== */}
            {/* MAIN IMAGE COLUMN                                      */}
            {/* ====================================================== */}

            <div>

              {/* MAIN IMAGE */}

              <div className="relative overflow-hidden rounded-[10px] bg-[#f5f3ef] h-[310px] sm:h-[420px] lg:h-[455px]">

                <img
                  src={galleryImages[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* HEART */}

                <button
                  type="button"
                  aria-label="Add to wishlist"
                  className="absolute top-3 right-3 w-8 h-8 bg-white/95 rounded-full shadow flex items-center justify-center hover:scale-105 transition"
                >
                  <Heart
                    size={15}
                    className="text-neutral-600"
                  />
                </button>

                {/* PREVIOUS */}

                <button
                  type="button"
                  onClick={handlePreviousImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/95 rounded-full shadow flex items-center justify-center text-neutral-500 hover:text-[#b45a14]"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* NEXT */}

                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/95 rounded-full shadow flex items-center justify-center text-neutral-500 hover:text-[#b45a14]"
                >
                  <ChevronRight size={16} />
                </button>

                {/* COUNTER */}

                <div className="absolute bottom-3 right-3 bg-black/60 text-white rounded-full px-2.5 py-1 text-[10px]">
                  {activeImage + 1}/{galleryImages.length}
                </div>

              </div>

              {/* ==================================================== */}
              {/* MOBILE THUMBNAILS                                    */}
              {/* ==================================================== */}

              <div className="flex lg:hidden gap-2 overflow-x-auto py-3">

                {galleryImages.map(
                  (img, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() =>
                        setActiveImage(index)
                      }
                      className={`flex-shrink-0 w-14 h-14 overflow-hidden rounded-md border-2 ${
                        activeImage === index
                          ? "border-[#e59a21]"
                          : "border-neutral-200"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )
                )}

              </div>

              {/* ==================================================== */}
              {/* VERIFIED STRIP                                       */}
              {/* ==================================================== */}

              <div className="mt-3 w-full border border-[#e9c76a] bg-[#fffdf7] rounded-[10px] px-4 py-3">

                <div className="flex items-center justify-around gap-3 text-[9px] font-semibold text-neutral-500">

                  <span className="flex items-center justify-center gap-1.5">
                    <Sparkles
                      size={10}
                      className="text-[#d88a18]"
                    />
                    <span>100% Verified</span>
                  </span>

                  <span className="flex items-center justify-center gap-1.5">
                    <CheckCircle2
                      size={10}
                      className="text-[#d88a18]"
                    />
                    <span>Real Photos</span>
                  </span>

                  <span className="flex items-center justify-center gap-1.5">
                    <ShieldCheck
                      size={10}
                      className="text-[#d88a18]"
                    />
                    <span>Real Buyers</span>
                  </span>

                </div>

              </div>

            </div>

            {/* ====================================================== */}
            {/* PRODUCT INFORMATION                                    */}
            {/* ====================================================== */}

            <div className="px-1 lg:px-2 flex flex-col">

              {/* VERIFIED */}

              <span className="w-fit inline-flex items-center gap-1.5 bg-[#fff0f0] text-[#e75252] px-2.5 py-1 rounded-full text-[8px] uppercase tracking-[0.12em] font-bold">
                ✿ Verified Quality Product
              </span>

              {/* CATEGORY */}

              <p className="mt-3 text-[10px] uppercase tracking-[0.20em] font-bold text-[#b65815]">
                Father&apos;s Birthday Decoration
              </p>

              {/* NAME */}

              <h1 className="mt-2 font-serif text-[27px] md:text-[30px] leading-[1.05] font-bold text-[#17100c]">
                {product.name}
              </h1>

              {/* RATING */}

              <div className="mt-3 flex items-center gap-2">

                <div className="flex gap-[1px]">

                  {Array.from({
                    length: 5,
                  }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={
                        i < Math.round(rating)
                          ? "fill-[#e89517] text-[#e89517]"
                          : "text-neutral-300"
                      }
                    />
                  ))}

                </div>

                <span className="text-[11px] font-bold text-neutral-700">
                  {rating}
                </span>

                <span className="text-[10px] text-neutral-400">
                  ({reviewCount} reviews)
                </span>

              </div>

              {/* ==================================================== */}
              {/* PRICE                                                */}
              {/* ==================================================== */}

              <div className="mt-5 flex flex-wrap items-center gap-2">

                <span className="text-[25px] font-extrabold text-[#17100c]">
                  ₹{unitPrice.toLocaleString()}
                </span>

                <span className="text-[10px] text-neutral-400 line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>

                <span className="bg-[#e7f7e8] text-[#218447] px-2 py-[3px] rounded text-[8px] uppercase font-bold">
                  {discountPercent}% OFF
                </span>

              </div>

              {/* DESCRIPTION */}

              <p className="mt-3 text-[10px] leading-5 text-neutral-500">
                {product.desc}
              </p>

              <div className="border-t border-neutral-100 mt-4" />

              {/* ==================================================== */}
              {/* BENEFITS                                             */}
              {/* ==================================================== */}

              <div className="grid grid-cols-3 py-5">

                {/* CUSTOMIZABLE */}

                <div className="flex flex-col items-center text-center gap-2 border-r border-neutral-100">

                  <div className="w-8 h-8 rounded-full bg-[#fff7e7] flex items-center justify-center">
                    <Sparkles
                      size={14}
                      className="text-[#c66a16]"
                    />
                  </div>

                  <span className="text-[8px] uppercase font-bold text-neutral-500">
                    Customizable
                  </span>

                </div>

                {/* ON TIME */}

                <div className="flex flex-col items-center text-center gap-2 border-r border-neutral-100">

                  <div className="w-8 h-8 rounded-full bg-[#fff7e7] flex items-center justify-center">
                    <Clock3
                      size={14}
                      className="text-[#c66a16]"
                    />
                  </div>

                  <span className="text-[8px] uppercase font-bold text-neutral-500">
                    On-Time Setup
                  </span>

                </div>

                {/* PREMIUM */}

                <div className="flex flex-col items-center text-center gap-2">

                  <div className="w-8 h-8 rounded-full bg-[#fff7e7] flex items-center justify-center">
                    <ShieldCheck
                      size={14}
                      className="text-[#c66a16]"
                    />
                  </div>

                  <span className="text-[8px] uppercase font-bold text-neutral-500">
                    Premium Quality
                  </span>

                </div>

              </div>

              {/* ==================================================== */}
              {/* AVAILABILITY                                         */}
              {/* ==================================================== */}

              <div className="flex items-center gap-1.5 border border-[#cde7cb] bg-[#f7fff6] rounded-md px-3 py-2 text-[9px] font-semibold text-[#39824b]">
                <Check size={11} />
                Service available in your area
              </div>

              {/* ==================================================== */}
              {/* QUANTITY                                             */}
              {/* ==================================================== */}

              <div className="flex items-center justify-between mt-5">

                <span className="text-[8px] uppercase tracking-[0.12em] font-semibold text-neutral-400">
                  Quantity
                </span>

                <div className="flex items-center border border-neutral-200 rounded-full p-1 gap-2 bg-[#fafafa]">

                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-neutral-500 shadow-sm"
                  >
                    <Minus size={11} />
                  </button>

                  <span className="w-5 text-center text-[11px] font-bold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-neutral-500 shadow-sm"
                  >
                    <Plus size={11} />
                  </button>

                </div>

              </div>

              {/* TOTAL PRICE */}

              <div className="flex items-center justify-between mt-3">

                <span className="text-[8px] uppercase tracking-[0.12em] font-semibold text-neutral-400">
                  Total Price
                </span>

                <span className="text-[15px] font-bold text-[#17100c]">
                  ₹{totalPrice.toLocaleString()}
                </span>

              </div>

              {/* CART MESSAGE */}

              <div className="h-5 mt-1">

                {cartMessage && (
                  <p className="text-[10px] font-semibold text-green-600">
                    ✓ Successfully added to cart!
                  </p>
                )}

              </div>

              {/* ==================================================== */}
              {/* BUTTONS                                              */}
              {/* ==================================================== */}

              <div className="grid grid-cols-2 gap-2">

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="h-[42px] border border-[#dda62b] bg-[#fffdf7] hover:bg-[#fff8e5] rounded-lg text-[9px] uppercase tracking-[0.08em] font-bold flex items-center justify-center gap-2 transition"
                >
                  <ShoppingBag size={13} />
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setIsModalOpen(true)
                  }
                  className="h-[42px] bg-[#4b2014] hover:bg-[#602a19] text-white rounded-lg text-[9px] uppercase tracking-[0.08em] font-bold transition"
                >
                  Book Now
                </button>

              </div>

              <p className="mt-3 text-center text-[9px] text-neutral-400 flex items-center justify-center gap-1">
                <ShieldCheck size={10} />
                Secure checkout · Guaranteed satisfaction
              </p>

            </div>

          </div>

        </section>

        {/* ========================================================== */}
        {/* TABS                                                       */}
        {/* ========================================================== */}

      {/* ========================================================== */}
{/* TABS */}
{/* ========================================================== */}

<div className="mt-6 bg-white border border-[#eadba7] rounded-t-[30px] overflow-x-auto">
  <div className="flex min-w-max">

    {tabs.map((tab) => (
      <button
        key={tab.key}
        type="button"
        onClick={() => setActiveTab(tab.key)}
        className={`relative px-9 py-7 text-[18px] font-normal whitespace-nowrap transition-colors ${
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

        {/* ========================================================== */}
        {/* OVERVIEW                                                   */}
        {/* ========================================================== */}

        {activeTab === "overview" && (
          <>
  <section className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-8 bg-white border-x border-b border-[#eadba7] rounded-b-[30px] p-8">

              {/* LEFT OVERVIEW */}

<div className="bg-white">
       <h2 className="font-serif font-bold text-[21px] sm:text-[24px] leading-[1.05] text-[#18100c] max-w-[500px]">
                  Turn Your Special Moments Into Magical Memories
                </h2>

                <p className="mt-3 text-[11px] leading-5 text-neutral-500">
                  {product.desc}
                </p>

                {/* ================================================== */}
                {/* 4 FEATURE CARDS                                    */}
                {/* ================================================== */}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-5">

                  {/* PREMIUM DECOR */}

                  <div className="min-h-[135px] bg-[#fff9e9] rounded-[14px] px-4 py-4 flex flex-col justify-center">

                    <Sparkles
                      size={20}
                      className="text-[#d45f00]"
                    />

                    <p className="mt-5 text-[12px] font-bold text-neutral-900">
                      Premium Decor
                    </p>

                    <p className="mt-1 text-[11px] text-neutral-500">
                      & Setup
                    </p>

                  </div>

                  {/* VERIFIED */}

                  <div className="min-h-[135px] bg-[#fff9e9] rounded-[14px] px-4 py-4 flex flex-col justify-center">

                    <CheckCircle2
                      size={20}
                      className="text-[#d45f00]"
                    />

                    <p className="mt-5 text-[12px] font-bold text-neutral-900">
                      Verified
                    </p>

                    <p className="mt-1 text-[11px] text-neutral-500">
                      Quality
                    </p>

                  </div>

                  {/* ON-TIME */}

                  <div className="min-h-[135px] bg-[#fff9e9] rounded-[14px] px-4 py-4 flex flex-col justify-center">

                    <Truck
                      size={20}
                      className="text-[#d45f00]"
                    />

                    <p className="mt-5 text-[12px] font-bold text-neutral-900">
                      On-Time
                    </p>

                    <p className="mt-1 text-[11px] text-neutral-500">
                      Setup
                    </p>

                  </div>

                  {/* EASY BOOKING */}

                  <div className="min-h-[135px] bg-[#fff9e9] rounded-[14px] px-4 py-4 flex flex-col justify-center">

                    <CalendarDays
                      size={20}
                      className="text-[#d45f00]"
                    />

                    <p className="mt-5 text-[12px] font-bold text-neutral-900">
                      Easy
                    </p>

                    <p className="mt-1 text-[11px] text-neutral-500">
                      Booking
                    </p>

                  </div>

                </div>

              </div>

              {/* ==================================================== */}
              {/* WHAT'S INCLUDED                                      */}
              {/* ==================================================== */}

              <div className="bg-[#fff9e9] border border-[#eadba7] rounded-[13px] p-5">

                <h3 className="font-serif font-bold text-[18px] text-[#18100c] mb-4">
                  What&apos;s Included
                </h3>

                <div className="space-y-3">

                  {whatsIncluded.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-[10px] text-neutral-600"
                      >
                        <Check
                          size={12}
                          strokeWidth={2.5}
                          className="text-[#d45f00] flex-shrink-0"
                        />

                        <span>{item}</span>

                      </div>
                    )
                  )}

                </div>

              </div>

            </section>

            {/* ====================================================== */}
            {/* REVIEWS                                                */}
            {/* ====================================================== */}

            <section className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">

              <div className="bg-white border border-[#e1ddd7] rounded-[13px] p-5 sm:p-6">

                <h3 className="font-serif font-bold text-[16px] text-[#18100c]">
                  Customer Reviews
                </h3>

                <div className="mt-2 flex items-center gap-2">

                  <span className="text-[20px] font-bold">
                    {rating}
                  </span>

                  <div className="flex">

                    {Array.from({
                      length: 5,
                    }).map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        className={
                          i < Math.round(rating)
                            ? "fill-[#e89517] text-[#e89517]"
                            : "text-neutral-300"
                        }
                      />
                    ))}

                  </div>

                </div>

                <p className="text-[9px] text-neutral-400 mt-1">
                  {reviewCount} verified reviews
                </p>

                <div className="mt-4 space-y-2">

                  {ratingBreakdown.map(
                    (item) => (
                      <div
                        key={item.star}
                        className="flex items-center gap-3 text-[9px] text-neutral-400"
                      >

                        <span className="w-2">
                          {item.star}
                        </span>

                        <div className="flex-1 h-[5px] bg-[#f1f1f1] rounded-full overflow-hidden">

                          <div
                            className="h-full bg-[#f59e0b] rounded-full"
                            style={{
                              width: `${item.percent}%`,
                            }}
                          />

                        </div>

                        <span className="w-7 text-right">
                          {item.percent}%
                        </span>

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* MOMENT CARD */}

              <div className="bg-[#fff9e9] border border-[#eadba7] rounded-[13px] p-6 sm:p-8 flex flex-col justify-center min-h-[220px]">

                <Sparkles
                  size={19}
                  className="text-[#d97706] mb-5"
                />

                <h3 className="font-serif font-bold text-[19px] text-[#18100c]">
                  Because the little moments matter.
                </h3>

                <p className="mt-3 text-[10px] leading-5 text-neutral-500 max-w-[450px]">
                  Make your father&apos;s birthday extra special with
                  thoughtfully designed decorations and unforgettable
                  memories.
                </p>

              </div>

            </section>
          </>
        )}

        {/* ========================================================== */}
        {/* INCLUDED TAB                                               */}
        {/* ========================================================== */}

        {activeTab === "included" && (
          <section className="mt-5 bg-[#fff9e9] border border-[#eadba7] rounded-[13px] p-6">

            <h2 className="font-serif text-xl font-bold mb-5">
              What&apos;s Included
            </h2>

            <div className="space-y-3">

              {whatsIncluded.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm text-neutral-600"
                  >
                    <Check
                      size={15}
                      className="text-green-600"
                    />

                    {item}

                  </div>
                )
              )}

            </div>

          </section>
        )}

        {/* ========================================================== */}
        {/* NOT INCLUDED                                               */}
        {/* ========================================================== */}

        {activeTab === "notIncluded" && (
          <section className="mt-5 bg-white border border-[#e1ddd7] rounded-[13px] p-6">

            <h2 className="font-serif text-xl font-bold mb-5">
              What&apos;s Not Included
            </h2>

            <div className="space-y-3">

              {whatsNotIncluded.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm text-neutral-500"
                  >
                    <X
                      size={14}
                      className="text-neutral-300"
                    />

                    {item}

                  </div>
                )
              )}

            </div>

          </section>
        )}

        {/* ========================================================== */}
        {/* CANCELLATION                                               */}
        {/* ========================================================== */}

        {activeTab === "cancellation" && (
          <section className="mt-5 bg-white border border-[#e1ddd7] rounded-[13px] p-6">

            <h2 className="font-serif text-xl font-bold mb-3">
              Cancellation Policy
            </h2>

            <p className="text-sm leading-6 text-neutral-600">
              Free cancellation up to 48 hours before the event.
              Cancellations within 48 hours may be subject to a
              partial charge for materials already arranged.
            </p>

          </section>
        )}

        {/* ========================================================== */}
        {/* REVIEWS TAB                                                */}
        {/* ========================================================== */}

        {activeTab === "reviews" && (
          <section className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">

            <div className="bg-white border border-[#e1ddd7] rounded-[13px] p-6">

              <h3 className="font-serif font-bold text-lg">
                Customer Reviews
              </h3>

              <div className="flex items-center gap-2 mt-3">

                <span className="text-2xl font-bold">
                  {rating}
                </span>

                <div className="flex">

                  {Array.from({
                    length: 5,
                  }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={
                        i < Math.round(rating)
                          ? "fill-[#e89517] text-[#e89517]"
                          : "text-neutral-300"
                      }
                    />
                  ))}

                </div>

              </div>

              <p className="text-xs text-neutral-400 mt-1">
                {reviewCount} verified reviews
              </p>

              <div className="mt-5 space-y-2">

                {ratingBreakdown.map(
                  (item) => (
                    <div
                      key={item.star}
                      className="flex items-center gap-3 text-xs text-neutral-500"
                    >

                      <span className="w-4">
                        {item.star}
                      </span>

                      <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-amber-500"
                          style={{
                            width: `${item.percent}%`,
                          }}
                        />

                      </div>

                      <span className="w-8 text-right">
                        {item.percent}%
                      </span>

                    </div>
                  )
                )}

              </div>

            </div>

            <div className="bg-[#fff9e9] border border-[#eadba7] rounded-[13px] p-8 flex flex-col justify-center">

              <Sparkles
                size={19}
                className="text-[#d97706] mb-5"
              />

              <h3 className="font-serif text-xl font-bold">
                Because the little moments matter.
              </h3>

              <p className="text-xs leading-5 text-neutral-500 mt-3">
                Make your father&apos;s birthday extra special with
                beautiful decorations and unforgettable memories.
              </p>

            </div>

          </section>
        )}

        {/* ========================================================== */}
        {/* FAQ                                                        */}
        {/* ========================================================== */}

        {activeTab === "faq" && (
          <section className="mt-5 bg-white border border-[#e1ddd7] rounded-[13px] p-6">

            <h2 className="font-serif text-xl font-bold mb-3">
              Frequently Asked Questions
            </h2>

            <p className="text-sm leading-6 text-neutral-600">
              Have questions about setup timing, birthday themes,
              customization, or delivery? Contact our team before
              booking and we&apos;ll guide you through everything.
            </p>

          </section>
        )}

      </div>
{/* ===================== RELATED PRODUCTS ===================== */}

<section className="mt-10 sm:mt-12 pb-6">

  {/* HEADING */}
  <div className="text-center">
    <span className="inline-flex items-center justify-center rounded-full bg-[#fff0bd] px-7 py-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.32em] text-[#a94708]">
      Related Products
    </span>

    <h2 className="mt-4 font-serif text-[26px] sm:text-[31px] font-bold text-[#17100c]">
      Birthday Special Products
    </h2>

    <p className="mt-2 text-[11px] sm:text-[13px] text-neutral-500">
      Handpicked birthday decorations and celebration essentials for your
      special moments.
    </p>
  </div>

  {/* RELATED PRODUCT CARDS */}
  <div className="mt-9 overflow-hidden">
    <div className="flex gap-5">

      {visibleRelatedProducts.map((item) => (
        <article
          key={item.id}
          className="group flex-none w-[calc((100%-80px)/4.35)] min-w-[280px] overflow-hidden rounded-[28px] border border-[#edc95d] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
        >

          {/* IMAGE */}
          <div className="relative h-[260px] overflow-hidden bg-[#f5f2ed]">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />

            {/* WISHLIST */}
            <button
              type="button"
              aria-label="Add to wishlist"
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-neutral-600 hover:text-[#b45a14] transition"
            >
              <Heart size={21} strokeWidth={1.8} />
            </button>
          </div>

          {/* CONTENT */}
          <div className="px-5 pt-5 pb-5">

            <h3 className="font-serif text-[23px] sm:text-[25px] font-bold leading-tight text-[#17100c] truncate">
              {item.name}
            </h3>

            <p className="mt-2 min-h-[55px] text-[14px] sm:text-[15px] leading-[1.7] text-neutral-500 line-clamp-2">
              {item.desc}
            </p>

            {/* PRICE + ACTION */}
            <div className="mt-5 border-t border-neutral-100 pt-4 flex items-center justify-between gap-3">

              <span className="text-[15px] font-extrabold text-[#17100c] whitespace-nowrap">
                {item.price}
              </span>

              <div className="flex items-center gap-2">

                {/* ADD TO CART */}
                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      id: String(item.id),
                      name: item.name,
                      price: item.price,
                      image: item.image,
           desc: item.desc,
                      category: "Birthday Celebration",
                    })
                  }
                  aria-label="Add to cart"
                  className="w-10 h-10 rounded-full bg-[#fff2c8] text-[#b45a14] flex items-center justify-center hover:bg-[#ffe8ae] transition"
                >
                  <ShoppingCart size={16} strokeWidth={1.8} />
                </button>
<Link
  href={`/services/birthday/father/${item.id}`}
  className="h-10 px-5 rounded-full bg-[#b74300] hover:bg-[#943700] text-white text-[12px] font-bold uppercase flex items-center justify-center transition"
>
  Book
</Link>

              </div>
            </div>
          </div>
        </article>
      ))}

    </div>
  </div>

  {/* PREVIOUS / NEXT */}
  <div className="mt-10 flex items-center justify-center gap-5">

    <button
      type="button"
      onClick={handleRelatedPrevious}
      aria-label="Previous related products"
      className="w-[62px] h-[62px] rounded-full bg-[#fff0bd] text-[#a94708] flex items-center justify-center shadow-md hover:bg-[#ffe6a0] transition"
    >
      <ChevronLeft size={25} strokeWidth={2} />
    </button>

    <button
      type="button"
      onClick={handleRelatedNext}
      aria-label="Next related products"
      className="w-[62px] h-[62px] rounded-full bg-[#fff0bd] text-[#a94708] flex items-center justify-center shadow-md hover:bg-[#ffe6a0] transition"
    >
      <ChevronRight size={25} strokeWidth={2} />
    </button>

  </div>

</section>
      {/* ============================================================ */}
      {/* BOOKING MODAL                                                */}
      {/* ============================================================ */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white rounded-[20px] shadow-2xl max-w-md w-full p-6 relative border border-[#eadba7]">

            {/* CLOSE */}

            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setIsConfirmed(false);
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700"
            >
              <X size={18} />
            </button>

            {isConfirmed ? (
              /* ==================================================== */
              /* SUCCESS                                              */
              /* ==================================================== */

              <div className="text-center py-8">

                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <Check size={28} />
                </div>

                <h3 className="mt-5 text-xl font-serif font-bold text-neutral-900">
                  Your order is confirmed!
                </h3>

                <p className="mt-2 text-xs text-neutral-500">
                  Redirecting you to the home page...
                </p>

              </div>
            ) : (
              /* ==================================================== */
              /* ORDER SUMMARY                                       */
              /* ==================================================== */

              <div>

                <span className="inline-block text-[9px] uppercase font-bold text-[#9d570d] bg-[#fff3cf] px-3 py-1 rounded-full tracking-widest">
                  Order Summary
                </span>

                <h3 className="text-xl font-serif font-bold text-neutral-900 mt-3">
                  Confirm Your Booking
                </h3>

                <p className="text-xs text-neutral-500 mt-1">
                  Review your item and quantity before finalizing.
                </p>

                {/* PRODUCT */}

                <div className="mt-5 flex items-center gap-4 p-4 rounded-xl border border-neutral-200 bg-[#faf8f5]">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div className="flex-1 min-w-0">

                    <h4 className="text-sm font-bold text-neutral-900 truncate">
                      {product.name}
                    </h4>

                    <p className="text-xs text-neutral-500 mt-1">
                      Qty: {quantity}
                    </p>

                    <p className="text-sm font-bold text-[#b45a14] mt-1">
                      ₹{totalPrice.toLocaleString()}
                    </p>

                  </div>

                </div>

                {/* ================================================== */}
                {/* PRICE SUMMARY                                      */}
                {/* ================================================== */}

                <div className="mt-4 bg-neutral-50 rounded-xl p-4 space-y-2 border border-neutral-200 text-xs">

                  <div className="flex justify-between text-neutral-600">
                    <span>Quantity:</span>

                    <span className="font-bold text-neutral-900">
                      {quantity}
                    </span>
                  </div>

                  <div className="flex justify-between text-neutral-600">
                    <span>Price per item:</span>

                    <span className="font-bold text-neutral-900">
                      ₹{unitPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="border-t border-neutral-200 pt-2 flex justify-between text-sm">

                    <span className="font-bold">
                      Total Amount:
                    </span>

                    <span className="font-bold text-[#b45a14] text-base">
                      ₹{totalPrice.toLocaleString()}
                    </span>

                  </div>

                </div>

                {/* ================================================== */}
                {/* ACTIONS                                            */}
                {/* ================================================== */}

                <div className="grid grid-cols-2 gap-3 mt-6">

                  <button
                    type="button"
                    onClick={() =>
                      setIsModalOpen(false)
                    }
                    className="h-11 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold rounded-lg text-[10px] uppercase tracking-wider"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    className="h-11 bg-[#4b2014] hover:bg-[#602a19] text-white font-bold rounded-lg text-[10px] uppercase tracking-wider"
                  >
                    Confirm Order
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}