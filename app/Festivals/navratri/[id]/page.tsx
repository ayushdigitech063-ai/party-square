
"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react";

import { navratriProducts } from "@/app/data/navratriProducts";
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

export default function NavratriProductDetail({
  params,
}: PageProps) {
  const resolvedParams = use(params);
  const productId = Number(resolvedParams.id);

  const router = useRouter();
  const { addToCart } = useCart();

  const product = navratriProducts.find(
    (p) => p.id === productId
  );

  const [quantity, setQuantity] = useState(1);
  const [isBookModalOpen, setIsBookModalOpen] =
    useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] =
    useState(false);
  const [isCartAdded, setIsCartAdded] =
    useState(false);

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] =
    useState<TabKey>("overview");
    const [relatedStart, setRelatedStart] = useState(0);

  /* ========================================================= */
  /* PRODUCT NOT FOUND                                         */
  /* ========================================================= */

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold font-serif text-neutral-900 mb-2">
          404
        </h1>

        <p className="text-neutral-600 mb-6">
          Product nahi mila bhai!
        </p>

        <Link
          href="/Festivals/navratri/all-products"
          className="bg-[#4a2014] text-white px-6 py-3 rounded-lg text-xs uppercase tracking-wider font-bold"
        >
          Back to Catalogue
        </Link>
      </div>
    );
  }

  /* ========================================================= */
  /* PRODUCT DATA                                              */
  /* ========================================================= */

  const unitPrice = Number(product.price);
  const totalPrice = unitPrice * quantity;

  const rating =
    (product as any).rating ?? 4.8;

  const reviewCount =
    (product as any).reviewCount ?? 128;

  const originalPrice =
    (product as any).originalPrice ??
    Math.round(unitPrice * 1.25);

  const discountPercent = Math.round(
    ((originalPrice - unitPrice) / originalPrice) *
      100
  );

  const galleryImages: string[] =
    (product as any).gallery ?? [
      product.image,
      product.image,
      product.image,
      product.image,
      product.image,
      product.image,
    ];

  const whatsIncluded: string[] =
    (product as any).whatsIncluded ?? [
      "Premium Navratri decoration setup",
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

  const ratingBreakdown: {
    star: number;
    percent: number;
  }[] =
    (product as any).ratingBreakdown ?? [
      { star: 5, percent: 71 },
      { star: 4, percent: 29 },
      { star: 3, percent: 0 },
      { star: 2, percent: 0 },
      { star: 1, percent: 0 },
    ];
const relatedProducts = navratriProducts
  .filter(
    (item) =>
      item.id !== product.id &&
      item.id >= 11
  )
  .slice(0, 7);

const visibleRelatedProducts =
  relatedProducts.length <= 5
    ? relatedProducts
    : Array.from({ length: 5 }, (_, index) => {
        return relatedProducts[
          (relatedStart + index) %
            relatedProducts.length
        ];
      });

const handleRelatedPrevious = () => {
  setRelatedStart((prev) =>
    prev === 0
      ? relatedProducts.length - 1
      : prev - 1
  );
};

const handleRelatedNext = () => {
  setRelatedStart((prev) =>
    (prev + 1) % relatedProducts.length
  );
};
  /* ========================================================= */
  /* HANDLERS                                                  */
  /* ========================================================= */

  const handleIncrement = () =>
    setQuantity((prev) => prev + 1);

  const handleDecrement = () =>
    setQuantity((prev) =>
      prev > 1 ? prev - 1 : 1
    );

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

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: String(product.id),
        name: product.name,
        price: product.price,
        image: product.image,
        desc: product.desc,
        category: "Navratri Decoration",
      });
    }

    setIsCartAdded(true);

    setTimeout(() => {
      setIsCartAdded(false);
    }, 3500);
  };

  const handleConfirmOrder = () => {
    setIsBookModalOpen(false);
    setIsSuccessModalOpen(true);

    setTimeout(() => {
      setIsSuccessModalOpen(false);
      router.push("/");
    }, 2500);
  };

  /* ========================================================= */
  /* TABS                                                      */
  /* ========================================================= */

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

  /* ========================================================= */
  /* PAGE                                                      */
  /* ========================================================= */

  return (
    <div className="min-h-screen bg-[#f8f5f0] px-3 sm:px-5 lg:px-8 py-5 md:py-7 relative">

      {/* ===================================================== */}
      {/* CART TOAST                                            */}
      {/* ===================================================== */}

      {isCartAdded && (
        <div className="fixed bottom-6 left-6 z-50 bg-neutral-950 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-neutral-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-10 h-10 rounded-lg object-cover"
          />

          <div>
            <div className="text-xs font-bold text-amber-400">
              {product.name} ({quantity} Units)
            </div>

            <div className="text-[10px] text-neutral-300">
              Successfully added to your basket!
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1540px] mx-auto">

        {/* =================================================== */}
        {/* BREADCRUMB                                          */}
        {/* =================================================== */}

        <div className="mb-7 flex items-center flex-wrap gap-2 text-[14px] text-[#626262]">
          <Link
            href="/"
            className="hover:text-[#bd5500] transition"
          >
            Home
          </Link>

          <span className="text-neutral-400">
            ›
          </span>

          <Link
            href="/Festivals/navratri/all-products"
            className="hover:text-[#bd5500] transition"
          >
            Decorations
          </Link>

          <span className="text-neutral-400">
            ›
          </span>

          <span className="text-black">
            {product.name}
          </span>
        </div>

        {/* =================================================== */}
        {/* TOP PRODUCT AREA                                    */}
        {/* =================================================== */}

        <section>
          <div className="grid grid-cols-1 lg:grid-cols-[105px_minmax(0,1.5fr)_minmax(430px,0.95fr)] gap-5 lg:gap-6 items-stretch">

            {/* ================================================= */}
            {/* LEFT THUMBNAILS                                   */}
            {/* ================================================= */}

            <div className="hidden lg:flex flex-col gap-[14px]">

              {galleryImages
                .slice(0, 4)
                .map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setActiveImage(index)
                    }
                    className={`w-[105px] h-[85px] rounded-[14px] overflow-hidden bg-white border-2 transition ${
                      activeImage === index
                        ? "border-[#e39a1f]"
                        : "border-transparent hover:border-[#e39a1f]"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${
                        index + 1
                      }`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}

              {galleryImages.length > 4 && (
                <button
                  type="button"
                  onClick={() =>
                    setActiveImage(
                      Math.min(
                        4,
                        galleryImages.length - 1
                      )
                    )
                  }
                  className="w-[105px] h-[85px] rounded-[14px] border border-[#f1d98e] bg-[#fffaf0] flex items-center justify-center text-[13px] font-bold text-[#a94d00]"
                >
                  +{galleryImages.length - 4}
                </button>
              )}

            </div>

            {/* ================================================= */}
            {/* MAIN IMAGE                                       */}
            {/* ================================================= */}

            <div>
              <div className="relative w-full h-[390px] sm:h-[520px] lg:h-[640px] rounded-[24px] overflow-hidden bg-[#eee8df]">

                <img
                  src={galleryImages[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* CATEGORY BADGE */}

                <div className="absolute top-6 left-6 bg-white/95 px-5 py-2.5 rounded-full shadow-sm flex items-center gap-2">

                  <Sparkles
                    size={15}
                    className="text-[#bd5500]"
                  />

                  <span className="text-[12px] sm:text-[13px] font-bold text-[#813509]">
                    Navratri Decoration
                  </span>

                </div>

                {/* HEART */}

                <button
                  type="button"
                  aria-label="Add to wishlist"
                  className="absolute top-6 right-6 w-11 h-11 bg-white rounded-full shadow flex items-center justify-center hover:scale-105 transition"
                >
                  <Heart
                    size={20}
                    className="text-neutral-600"
                  />
                </button>

                {/* LEFT */}

                <button
                  type="button"
                  onClick={handlePreviousImage}
                  className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow flex items-center justify-center text-neutral-700 hover:text-[#bd5500] transition"
                >
                  <ChevronLeft size={19} />
                </button>

                {/* RIGHT */}

                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow flex items-center justify-center text-neutral-700 hover:text-[#bd5500] transition"
                >
                  <ChevronRight size={19} />
                </button>

                {/* COUNTER */}

                <div className="absolute bottom-5 right-5 bg-black/65 text-white rounded-full px-3 py-1.5 text-[12px] font-medium">
                  {activeImage + 1}/
                  {galleryImages.length}
                </div>

              </div>

              {/* MOBILE THUMBNAILS */}

              <div className="flex lg:hidden gap-2 overflow-x-auto py-3">

                {galleryImages.map(
                  (img, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() =>
                        setActiveImage(index)
                      }
                      className={`flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg border-2 ${
                        activeImage === index
                          ? "border-[#e59a21]"
                          : "border-neutral-200"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${
                          index + 1
                        }`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )
                )}

              </div>
            </div>

            {/* ================================================= */}
            {/* RIGHT PRODUCT CARD                                */}
            {/* ================================================= */}

            <div className="bg-white border border-[#f0dc98] rounded-[24px] px-6 sm:px-7 py-6 flex flex-col h-fit lg:min-h-[640px]">

              {/* VERIFIED */}

              <span className="w-fit inline-flex items-center gap-2 bg-[#fff1bf] text-[#a94700] px-4 py-2 rounded-full text-[11px] sm:text-[12px] font-bold">

                <Sparkles size={13} />

                Verified Quality Product

              </span>

              {/* TITLE */}

              <h1 className="mt-6 font-serif text-[36px] sm:text-[42px] lg:text-[44px] leading-[1.08] font-bold text-[#090909]">
                {product.name}
              </h1>

              {/* RATING */}

              <div className="mt-6 flex items-center flex-wrap gap-3">

                <div className="flex gap-[2px]">

                  {Array.from({
                    length: 5,
                  }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.round(rating)
                          ? "fill-[#ff9800] text-[#ff9800]"
                          : "text-neutral-300"
                      }
                    />
                  ))}

                </div>

                <span className="text-[15px] font-bold text-black">
                  {rating}
                </span>

                <span className="text-[14px] text-neutral-500">
                  ({reviewCount} reviews)
                </span>

              </div>

              {/* PRICE */}

              <div className="mt-8 flex items-center flex-wrap gap-4">

                <span className="text-[34px] sm:text-[38px] leading-none font-extrabold text-[#090909]">
                  ₹{unitPrice.toLocaleString()}
                </span>

                <span className="text-[14px] text-neutral-400 line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>

                <span className="bg-[#fff1bf] text-[#a94700] px-4 py-2 rounded-full text-[11px] font-bold">
                  {discountPercent}% OFF
                </span>

              </div>

              {/* DESCRIPTION */}

              <p className="mt-7 text-[15px] sm:text-[16px] leading-[1.85] text-[#424242]">
                {product.fullDesc ||
                  product.desc}
              </p>

              {/* BENEFITS */}

              <div className="grid grid-cols-3 gap-3 mt-7">

                <div className="flex flex-col items-center text-center">

                  <div className="w-11 h-11 rounded-full bg-[#fff8e7] flex items-center justify-center">
                    <CheckCircle2
                      size={20}
                      strokeWidth={1.8}
                      className="text-[#d65d00]"
                    />
                  </div>

                  <span className="mt-3 text-[13px] sm:text-[14px] text-[#333]">
                    Customizable
                  </span>

                </div>

                <div className="flex flex-col items-center text-center">

                  <div className="w-11 h-11 rounded-full bg-[#fff8e7] flex items-center justify-center">
                    <Truck
                      size={20}
                      strokeWidth={1.8}
                      className="text-[#d65d00]"
                    />
                  </div>

                  <span className="mt-3 text-[13px] sm:text-[14px] text-[#333]">
                    On-Time Setup
                  </span>

                </div>

                <div className="flex flex-col items-center text-center">

                  <div className="w-11 h-11 rounded-full bg-[#fff8e7] flex items-center justify-center">
                    <Sparkles
                      size={20}
                      strokeWidth={1.8}
                      className="text-[#d65d00]"
                    />
                  </div>

                  <span className="mt-3 text-[13px] sm:text-[14px] text-[#333]">
                    Premium Quality
                  </span>

                </div>

              </div>

              {/* AVAILABILITY */}

              <div className="mt-6 flex items-center gap-3 border border-[#f0dc98] bg-[#fffdf7] rounded-[16px] px-4 py-4 text-[13px] sm:text-[14px] font-medium text-[#008a3d]">

                <CheckCircle2
                  size={17}
                  strokeWidth={2}
                />

                Service available in your area

              </div>

              {/* QUANTITY */}

              <div className="flex items-center justify-between mt-7">

                <span className="text-[13px] font-bold text-neutral-800">
                  Quantity
                </span>

                <div className="flex items-center border border-[#e8a825] rounded-[12px] h-[45px] overflow-hidden">

                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="w-11 h-full flex items-center justify-center text-[#b85a13]"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="w-12 text-center text-[16px] font-bold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="w-11 h-full flex items-center justify-center text-[#b85a13]"
                  >
                    <Plus size={16} />
                  </button>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="grid grid-cols-2 gap-3 mt-6">

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="h-[50px] border border-[#dda62b] bg-[#fffdf7] hover:bg-[#fff8e5] rounded-[12px] text-[12px] uppercase tracking-[0.05em] font-bold flex items-center justify-center gap-2 transition"
                >
                  <ShoppingCart size={17} />
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setIsBookModalOpen(true)
                  }
                  className="h-[50px] bg-[#4b2014] hover:bg-[#602a19] text-white rounded-[12px] text-[12px] uppercase tracking-[0.05em] font-bold flex items-center justify-center gap-2 transition"
                >
                  <Calendar size={16} />
                  Book Now
                </button>

              </div>

              <p className="mt-4 text-center text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
                <ShieldCheck size={13} />
                Secure checkout · Guaranteed
                satisfaction
              </p>

            </div>
          </div>
        </section>

        {/* =================================================== */}
        {/* OVERVIEW/TABS CARD                                  */}
        {/* =================================================== */}

        <section className="mt-8 bg-white border border-[#f0dc98] rounded-[28px] overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
{/* ========================================================== */}
{/* TABS */}
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
          {/* ================================================= */}
          {/* OVERVIEW                                          */}
          {/* ================================================= */}

          {activeTab === "overview" && (
            <div className="px-7 sm:px-8 py-8">

              <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-8">

                {/* LEFT */}

                <div>

                  <h2 className="font-serif font-bold text-[32px] sm:text-[38px] lg:text-[40px] leading-[1.25] text-[#080808] max-w-[800px]">
                    Turn Your Special Moments Into
                    Magical Memories
                  </h2>

                  <p className="mt-6 text-[15px] sm:text-[17px] leading-[1.8] text-[#4d4d4d] max-w-[820px]">
                    {product.fullDesc ||
                      product.desc}
                  </p>

                  {/* FEATURE CARDS */}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-9">

                    {/* PREMIUM */}

                    <div className="min-h-[145px] bg-[#fff9e9] rounded-[22px] px-5 py-5 flex flex-col justify-between">

                      <Sparkles
                        size={24}
                        strokeWidth={1.8}
                        className="text-[#cf5d00]"
                      />

                      <div className="mt-5">
                        <p className="text-[16px] sm:text-[17px] font-bold text-[#111]">
                          Premium Decor
                        </p>

                        <p className="mt-2 text-[15px] sm:text-[16px] text-[#707070]">
                          &amp; Setup
                        </p>
                      </div>

                    </div>

                    {/* VERIFIED */}

                    <div className="min-h-[145px] bg-[#fff9e9] rounded-[22px] px-5 py-5 flex flex-col justify-between">

                      <CheckCircle2
                        size={24}
                        strokeWidth={1.8}
                        className="text-[#cf5d00]"
                      />

                      <div className="mt-5">
                        <p className="text-[16px] sm:text-[17px] font-bold text-[#111]">
                          Verified
                        </p>

                        <p className="mt-2 text-[15px] sm:text-[16px] text-[#707070]">
                          Quality
                        </p>
                      </div>

                    </div>

                    {/* ON TIME */}

                    <div className="min-h-[145px] bg-[#fff9e9] rounded-[22px] px-5 py-5 flex flex-col justify-between">

                      <Truck
                        size={24}
                        strokeWidth={1.8}
                        className="text-[#cf5d00]"
                      />

                      <div className="mt-5">
                        <p className="text-[16px] sm:text-[17px] font-bold text-[#111]">
                          On-Time
                        </p>

                        <p className="mt-2 text-[15px] sm:text-[16px] text-[#707070]">
                          Setup
                        </p>
                      </div>

                    </div>

                    {/* EASY */}

                    <div className="min-h-[145px] bg-[#fff9e9] rounded-[22px] px-5 py-5 flex flex-col justify-between">

                      <Calendar
                        size={24}
                        strokeWidth={1.8}
                        className="text-[#cf5d00]"
                      />

                      <div className="mt-5">
                        <p className="text-[16px] sm:text-[17px] font-bold text-[#111]">
                          Easy
                        </p>

                        <p className="mt-2 text-[15px] sm:text-[16px] text-[#707070]">
                          Booking
                        </p>
                      </div>

                    </div>

                  </div>
                </div>

                {/* =========================================== */}
                {/* WHAT'S INCLUDED                             */}
                {/* =========================================== */}

                <div className="bg-[#fff9e9] border border-[#f2dfa0] rounded-[22px] px-8 py-8">

                  <h3 className="font-serif font-bold text-[28px] sm:text-[30px] text-[#080808]">
                    What&apos;s Included
                  </h3>

                  <div className="mt-8 space-y-5">

                    {whatsIncluded.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4"
                        >

                          <div className="w-[20px] h-[20px] rounded-full border-2 border-[#d55e00] flex items-center justify-center flex-shrink-0">

                            <Check
                              size={12}
                              strokeWidth={2.5}
                              className="text-[#d55e00]"
                            />

                          </div>

                          <span className="text-[15px] sm:text-[16px] text-[#292929]">
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

          {/* ================================================= */}
          {/* INCLUDED                                          */}
          {/* ================================================= */}

          {activeTab === "included" && (
            <div className="p-8 sm:p-10">

              <h2 className="font-serif text-[30px] font-bold mb-7">
                What&apos;s Included
              </h2>

              <div className="space-y-5">

                {whatsIncluded.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 text-[16px] text-neutral-700"
                    >

                      <div className="w-5 h-5 rounded-full border-2 border-[#d55e00] flex items-center justify-center">
                        <Check
                          size={12}
                          className="text-[#d55e00]"
                        />
                      </div>

                      {item}

                    </div>
                  )
                )}

              </div>

            </div>
          )}

          {/* ================================================= */}
          {/* NOT INCLUDED                                      */}
          {/* ================================================= */}

          {activeTab === "notIncluded" && (
            <div className="p-8 sm:p-10">

              <h2 className="font-serif text-[30px] font-bold mb-7">
                What&apos;s Not Included
              </h2>

              <div className="space-y-5">

                {whatsNotIncluded.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 text-[16px] text-neutral-600"
                    >
                      <X
                        size={18}
                        className="text-neutral-400"
                      />

                      {item}
                    </div>
                  )
                )}

              </div>

            </div>
          )}

          {/* ================================================= */}
          {/* CANCELLATION                                      */}
          {/* ================================================= */}

          {activeTab === "cancellation" && (
            <div className="p-8 sm:p-10">

              <h2 className="font-serif text-[30px] font-bold mb-5">
                Cancellation Policy
              </h2>

              <p className="text-[16px] leading-8 text-neutral-600 max-w-4xl">
                Free cancellation up to 48 hours
                before the event. Cancellations
                within 48 hours may be subject to
                a partial charge for materials
                already arranged.
              </p>

            </div>
          )}

          {/* ================================================= */}
          {/* REVIEWS TAB                                       */}
          {/* ================================================= */}

          {activeTab === "reviews" && (
            <div className="p-8 sm:p-10">

              <h3 className="font-serif font-bold text-[30px] text-[#111]">
                Customer Reviews
              </h3>

              <div className="mt-6 flex items-center gap-4">

                <span className="text-[34px] font-bold">
                  {rating}
                </span>

                <div>
                  <div className="flex gap-[2px]">

                    {Array.from({
                      length: 5,
                    }).map((_, i) => (
                      <Star
                        key={i}
                        size={19}
                        className={
                          i < Math.round(rating)
                            ? "fill-[#ff9800] text-[#ff9800]"
                            : "text-neutral-300"
                        }
                      />
                    ))}

                  </div>

                  <p className="mt-1 text-[14px] text-neutral-500">
                    {reviewCount} verified reviews
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* ================================================= */}
          {/* FAQ                                               */}
          {/* ================================================= */}

          {activeTab === "faq" && (
            <div className="p-8 sm:p-10">

              <h2 className="font-serif text-[30px] font-bold mb-5">
                Frequently Asked Questions
              </h2>

              <p className="text-[16px] leading-8 text-neutral-600 max-w-4xl">
                Have questions about setup timing,
                customization, or delivery? Reach
                out to us before booking and our
                team will guide you through
                everything.
              </p>

            </div>
          )}

        </section>

        {/* =================================================== */}
        {/* REVIEWS + MOMENTS                                   */}
        {/* =================================================== */}

        {activeTab === "overview" && (
   <section className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-8 bg-white border-x border-b border-[#eadba7] rounded-b-[30px] p-8">
            {/* CUSTOMER REVIEWS */}

            <div className="bg-white border border-[#f0dc98] rounded-[28px] px-8 sm:px-10 py-10 min-h-[380px]">

              <h3 className="font-serif font-bold text-[28px] sm:text-[30px] text-[#090909]">
                Customer Reviews
              </h3>

              <div className="mt-7 flex items-center gap-5">

                <span className="font-serif text-[36px] font-bold leading-none text-[#090909]">
                  {rating}
                </span>

                <div>

                  <div className="flex gap-[2px]">

                    {Array.from({
                      length: 5,
                    }).map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={
                          i < Math.round(rating)
                            ? "fill-[#ff9800] text-[#ff9800]"
                            : "text-neutral-300"
                        }
                      />
                    ))}

                  </div>

                  <p className="mt-2 text-[15px] text-neutral-500">
                    {reviewCount} verified reviews
                  </p>

                </div>

              </div>

              {/* RATING BARS */}

              <div className="mt-9 space-y-5">

                {ratingBreakdown.map(
                  (item) => (
                    <div
                      key={item.star}
                      className="grid grid-cols-[20px_1fr_45px] items-center gap-4"
                    >

                      <span className="text-[13px] text-neutral-600">
                        {item.star}
                      </span>

                      <div className="h-[9px] bg-[#f0f0f0] rounded-full overflow-hidden">

                        <div
                          className="h-full bg-[#ff9800] rounded-full"
                          style={{
                            width: `${item.percent}%`,
                          }}
                        />

                      </div>

                      <span className="text-[13px] text-right text-neutral-500">
                        {item.percent}%
                      </span>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* MOMENTS */}

            <div className="bg-[#fff9e9] border border-[#f0dc98] rounded-[28px] px-10 sm:px-12 py-10 min-h-[380px] flex flex-col justify-center">

              <Sparkles
                size={30}
                strokeWidth={1.8}
                className="text-[#e36b00]"
              />

              <h3 className="mt-7 font-serif font-bold text-[28px] sm:text-[31px] leading-[1.25] text-[#090909]">
                Because the little moments matter.
              </h3>

              <p className="mt-6 max-w-[600px] text-[15px] sm:text-[16px] leading-[1.8] text-[#4d4d4d]">
                Create beautiful Navratri
                celebrations with thoughtfully
                designed decorations and memorable
                experiences.
              </p>

            </div>

          </section>
        )}

      </div>
{/* =================================================== */}
{/* RELATED PRODUCTS                                    */}
{/* =================================================== */}
{/* =================================================== */}
{/* RELATED PRODUCTS                                    */}
{/* =================================================== */}

<section className="mt-14 mb-10 overflow-hidden">

  {/* ================= HEADER ================= */}

  <div className="text-center">

    <span className="inline-flex items-center justify-center bg-[#fff0bf] text-[#a94b00] rounded-full px-6 py-[7px] text-[10px] font-bold uppercase tracking-[0.35em]">
Related Products
    </span>

    <h2 className="mt-3 font-serif text-[28px] sm:text-[32px] lg:text-[34px] leading-tight font-bold text-[#17110e]">
      Navratri Special Products
    </h2>

    <p className="mt-2 text-[12px] sm:text-[13px] text-[#66615e]">
      Handpicked festive decorations and celebration essentials
      for your special Navratri moments.
    </p>

  </div>

  {/* ================= PRODUCTS ================= */}

  <div className="mt-10">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[24px]">

      {visibleRelatedProducts.map((relatedProduct) => (

        <div
          key={relatedProduct.id}
          className="group bg-white border border-[#efcc63] rounded-[22px] overflow-hidden shadow-[0_3px_7px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_18px_rgba(0,0,0,0.14)]"
        >

          {/* ===================================== */}
          {/* IMAGE                                 */}
          {/* ===================================== */}

          <div className="relative h-[220px] overflow-hidden bg-[#f3f0eb]">

            <Link
              href={`/Festivals/navratri/${relatedProduct.id}`}
              className="block w-full h-full"
            >
              <img
                src={relatedProduct.image}
                alt={relatedProduct.name}
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
                strokeWidth={1.8}
              />
            </button>

          </div>

          {/* ===================================== */}
          {/* PRODUCT CONTENT                       */}
          {/* ===================================== */}

          <div className="px-[16px] pt-[16px] pb-[13px]">

            {/* TITLE */}

            <Link
              href={`/Festivals/navratri/${relatedProduct.id}`}
              className="block"
            >
              <h3 className="font-serif text-[19px] sm:text-[20px] leading-[1.15] font-bold text-[#17110e] truncate hover:text-[#a94700] transition">
                {relatedProduct.name}
              </h3>
            </Link>

            {/* DESCRIPTION */}

            <p className="mt-[6px] text-[12px] sm:text-[13px] leading-[1.65] text-[#77716d] line-clamp-2 min-h-[42px]">
              {relatedProduct.desc}
            </p>

            {/* DIVIDER */}

            <div className="mt-[13px] border-t border-[#efefef]" />

            {/* ===================================== */}
            {/* PRICE + ACTIONS                       */}
            {/* ===================================== */}

            <div className="mt-[11px] flex items-center justify-between gap-2">

              {/* PRICE */}

              <p className="text-[13px] font-extrabold text-[#17110e] whitespace-nowrap">
                ₹
                {Number(
                  relatedProduct.price
                ).toLocaleString()}
              </p>

              {/* ACTIONS */}

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
                        "Navratri Decoration",
                    });
                  }}
                  aria-label="Add related product to cart"
                  className="w-[31px] h-[31px] rounded-full bg-[#fff2cd] flex items-center justify-center text-[#a64b00] hover:bg-[#ffe8a8] transition"
                >
                  <ShoppingCart
                    size={13}
                    strokeWidth={1.8}
                  />
                </button>

                {/* BOOK */}

                <Link
                  href={`/Festivals/navratri/${relatedProduct.id}`}
                  className="h-[31px] px-[14px] rounded-full bg-[#a83e00] hover:bg-[#873100] text-white flex items-center justify-center text-[10px] font-bold uppercase transition"
                >
                  Book
                </Link>

              </div>

            </div>

          </div>

        </div>
      ))}

    </div>

  </div>

  {/* ================= ARROWS ================= */}

  {relatedProducts.length > 5 && (

    <div className="mt-10 flex items-center justify-center gap-[14px]">

      {/* PREVIOUS */}

      <button
        type="button"
        onClick={handleRelatedPrevious}
        aria-label="Previous related products"
        className="w-[46px] h-[46px] rounded-full bg-[#fff0bd] shadow-[0_2px_5px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#a84b00] hover:bg-[#ffe7a1] transition"
      >
        <ChevronLeft
          size={20}
          strokeWidth={2}
        />
      </button>

      {/* NEXT */}

      <button
        type="button"
        onClick={handleRelatedNext}
        aria-label="Next related products"
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
      {/* ===================================================== */}
      {/* BOOKING MODAL                                         */}
      {/* ===================================================== */}

      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4">

  <div className="bg-white">

            <button
              type="button"
              onClick={() =>
                setIsBookModalOpen(false)
              }
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900"
            >
              <X size={18} />
            </button>

            <span className="inline-block bg-[#fff3cf] text-[#9d570d] text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Order Summary
            </span>

            <h3 className="font-serif text-xl font-bold text-neutral-900 mt-3">
              Confirm Your Booking
            </h3>

            <p className="text-xs text-neutral-500 mt-1">
              Review your item and quantity before
              finalizing.
            </p>

            {/* PRODUCT */}

            <div className="mt-5 bg-[#faf8f5] p-4 rounded-xl border border-neutral-200 flex items-center gap-4">

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

                <span className="text-sm font-bold text-[#b45a14] mt-1 block">
                  ₹{totalPrice.toLocaleString()}
                </span>

              </div>

            </div>

            {/* PRICE */}

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

            {/* BUTTONS */}

            <div className="grid grid-cols-2 gap-3 mt-6">

              <button
                type="button"
                onClick={() =>
                  setIsBookModalOpen(false)
                }
                className="h-11 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold rounded-lg text-[10px] uppercase tracking-wider"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmOrder}
                className="h-11 bg-[#4b2014] hover:bg-[#602a19] text-white font-bold rounded-lg text-[10px] uppercase tracking-wider"
              >
                Confirm Order
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ===================================================== */}
      {/* SUCCESS MODAL                                         */}
      {/* ===================================================== */}

      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white rounded-[20px] max-w-sm w-full p-8 shadow-2xl border border-[#eadba7] text-center">

            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">

              <Check
                size={28}
                strokeWidth={3}
              />

            </div>

            <h3 className="font-serif text-xl font-bold text-neutral-900 mt-5">
              Your order is confirmed!
            </h3>

            <p className="text-xs text-neutral-500 mt-2">
              Redirecting you to the home page...
            </p>

          </div>

        </div>
      )}

    </div>
  );
}