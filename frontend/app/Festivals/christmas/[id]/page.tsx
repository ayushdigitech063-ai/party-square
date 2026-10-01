"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Calendar,
  AlertCircle,
  HelpCircle,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";

import { christmasProducts } from "@/app/data/christmasProducts";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/wishlistcontext";
import { useAuth } from "@/app/context/AuthContext";
import { Product } from "@/app/types/product";

interface PageProps {
  params: Promise<{ id: string }>;
}

type TabKey = "overview" | "included" | "notIncluded" | "cancellation" | "faq";

export default function ChristmasProductDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user, openLoginModal } = useAuth();

  const rawId = resolvedParams.id;

  // Find product by id or slug
  const product = christmasProducts.find(
    (p) => String(p.id) === String(rawId) || p.slug === rawId
  );

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  // Booking fields
  const [selectedBookingDate, setSelectedBookingDate] = useState(() => {
    const tm = new Date();
    tm.setDate(tm.getDate() + 1);
    return tm.toISOString().split("T")[0];
  });
  const [selectedBookingTime, setSelectedBookingTime] = useState(
    "Evening (04:00 PM - 08:00 PM)"
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FBF8F3] flex flex-col items-center justify-center px-6">
        <h1 className="font-serif text-4xl font-bold text-neutral-900">404</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Christmas theme or package not found.
        </p>
        <Link
          href="/Festivals/christmas"
          className="mt-6 bg-[#8B3F00] text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold hover:bg-[#703200] transition"
        >
          Back to Christmas Collection
        </Link>
      </div>
    );
  }

  const unitPrice = Number(product.price);
  const originalPrice =
    Number(product.originalPrice) || Math.round(unitPrice * 1.3);
  const advanceAmount = Math.round(unitPrice * 0.5);
  const onSitePending = unitPrice - advanceAmount;

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  // Book 50% advance direct checkout
  const handleBookNow = () => {
    if (!selectedBookingDate) {
      toast.error("Please choose an event date before booking!");
      return;
    }

    const draft = {
      productId: product.id,
      name: product.name,
      price: unitPrice,
      image: product.image,
      eventDate: selectedBookingDate,
      eventTimeSlot: selectedBookingTime,
      quantity,
    };

    if (typeof window !== "undefined") {
      sessionStorage.setItem("ps_booking_draft", JSON.stringify(draft));
    }

    toast.success("Proceeding to 50% Advance Checkout!", { duration: 1800 });
    router.push("/payment-detail");
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const relatedProducts = christmasProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-neutral-900 font-sans pb-24">
      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-[#E8D8B5] py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#766F65]">
          <div className="flex items-center gap-2 truncate">
            <Link href="/" className="hover:text-[#8B3F00]">
              Home
            </Link>
            <span>/</span>
            <Link href="/Festivals/christmas" className="hover:text-[#8B3F00]">
              Christmas
            </Link>
            <span>/</span>
            <span className="font-semibold text-neutral-900 truncate">
              {product.name}
            </span>
          </div>

          <Link
            href="/Festivals/christmas"
            className="hidden sm:flex items-center gap-1.5 font-bold text-[#8B3F00] hover:underline"
          >
            <ArrowLeft size={14} />
            <span>All Christmas Themes</span>
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ================= LEFT: IMAGE GALLERY ================= */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#E8D8B5] shadow-lg group">
              <img
                src={galleryImages[activeImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Tag / Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-amber-300 text-[#8B3F00] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-500" />
                <span>Festive Winter Wonderland</span>
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center transition shadow-md backdrop-blur-md cursor-pointer ${
                  isInWishlist(product.id)
                    ? "bg-rose-50 text-rose-500 border border-rose-300"
                    : "bg-white/90 text-neutral-700 hover:text-rose-500 border border-neutral-200"
                }`}
                aria-label="Wishlist"
              >
                <Heart
                  size={20}
                  className={
                    isInWishlist(product.id)
                      ? "fill-rose-500 text-rose-500"
                      : ""
                  }
                />
              </button>

              {/* Gallery Arrow Nav */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev === 0 ? galleryImages.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md transition"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev === galleryImages.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md transition"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition shrink-0 cursor-pointer ${
                      activeImage === idx
                        ? "border-[#8B3F00] ring-2 ring-amber-300"
                        : "border-[#E8D8B5] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quality Guarantees Bar */}
            <div className="grid grid-cols-3 gap-3 pt-3">
              <div className="p-3 bg-white rounded-2xl border border-[#E8D8B5] text-center space-y-1">
                <Truck size={18} className="mx-auto text-[#8B3F00]" />
                <p className="text-[11px] font-bold text-neutral-900">
                  On-Time Setup
                </p>
                <p className="text-[10px] text-[#766F65]">
                  Professional decorators
                </p>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-[#E8D8B5] text-center space-y-1">
                <ShieldCheck size={18} className="mx-auto text-emerald-600" />
                <p className="text-[11px] font-bold text-neutral-900">
                  50% Advance Only
                </p>
                <p className="text-[10px] text-[#766F65]">Pay rest on-site</p>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-[#E8D8B5] text-center space-y-1">
                <Star size={18} className="mx-auto text-amber-500 fill-amber-400" />
                <p className="text-[11px] font-bold text-neutral-900">
                  4.9★ Rated Decor
                </p>
                <p className="text-[10px] text-[#766F65]">Verified clients</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: BOOKING & DETAILS ================= */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E8D8B5] p-6 sm:p-7 shadow-sm space-y-5">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#8B3F00] uppercase tracking-wider bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                  🎄 Festive Decor
                </span>

                <div className="flex items-center gap-1 font-bold text-amber-600">
                  <Star size={14} className="fill-amber-400 text-amber-500" />
                  <span>4.9</span>
                  <span className="text-neutral-400 font-normal">
                    (48 Reviews)
                  </span>
                </div>
              </div>

              {/* Title & Short Description */}
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-[#FFF8E7] border border-[#E8D8B5] flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#766F65] block font-medium">
                    Total Event Cost
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#8B3F00]">
                      ₹{unitPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-neutral-400 line-through">
                      ₹{originalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                  Save ₹{(originalPrice - unitPrice).toLocaleString("en-IN")}
                </span>
              </div>

              {/* 50% Advance Policy Card */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#8B3F00]">
                  <span>50% Advance Online:</span>
                  <span className="text-sm font-extrabold">
                    ₹{advanceAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-600">
                  <span>50% Balance on Venue Setup:</span>
                  <span>₹{onSitePending.toLocaleString("en-IN")}</span>
                </div>
                <p className="text-[11px] text-neutral-500 pt-1 border-t border-amber-200/60 leading-normal">
                  ⚡ Pay 50% advance to lock decorators. The remaining 50% is
                  verified and paid upon decoration setup at your venue.
                </p>
              </div>

              {/* DATE & TIME SELECTION */}
              <div className="space-y-4 pt-2 border-t border-[#E8D8B5]">
                {/* Event Date Picker */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 mb-2">
                    <Calendar size={14} className="text-[#8B3F00]" />
                    <span>Select Celebration Date *</span>
                  </label>
                  <input
                    type="date"
                    min={(() => {
                      const tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      return tomorrow.toISOString().split("T")[0];
                    })()}
                    value={selectedBookingDate}
                    onChange={(e) => setSelectedBookingDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8D8B5] bg-[#FFFDF9] text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#8B3F00]"
                  />
                </div>

                {/* Event Time Slot Picker */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 mb-2">
                    <Clock size={14} className="text-[#8B3F00]" />
                    <span>Select Event Time Slot *</span>
                  </label>
                  <select
                    value={selectedBookingTime}
                    onChange={(e) => setSelectedBookingTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8D8B5] bg-[#FFFDF9] text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#8B3F00]"
                  >
                    <option value="Morning (09:00 AM - 01:00 PM)">
                      Morning (09:00 AM - 01:00 PM)
                    </option>
                    <option value="Afternoon (01:00 PM - 04:00 PM)">
                      Afternoon (01:00 PM - 04:00 PM)
                    </option>
                    <option value="Evening (04:00 PM - 08:00 PM)">
                      Evening (04:00 PM - 08:00 PM) [Popular]
                    </option>
                    <option value="Night (08:00 PM - 11:30 PM)">
                      Night (08:00 PM - 11:30 PM)
                    </option>
                  </select>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-2.5 pt-3">
                {/* 1. Book Now with 50% Advance */}
                <button
                  type="button"
                  onClick={handleBookNow}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#8B3F00] to-[#B47A00] text-white font-bold text-sm tracking-wider shadow-lg hover:brightness-105 active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles size={16} />
                  <span>
                    BOOK NOW (50% ADVANCE: ₹
                    {advanceAmount.toLocaleString("en-IN")})
                  </span>
                </button>

                {/* 2. Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3 rounded-2xl bg-white border border-[#E8D8B5] hover:border-[#8B3F00] text-neutral-900 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <ShoppingBag size={15} />
                  <span>Add Theme to Basket</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-[#766F65]">
                🔒 100% Secure 256-bit booking &amp; instant slot confirmation.
              </p>
            </div>
          </div>
        </div>

        {/* ================= TABS SECTION ================= */}
        <section className="mt-14 bg-white rounded-3xl border border-[#E8D8B5] overflow-hidden shadow-xs">
          {/* Tab Headers */}
          <div className="flex border-b border-[#E8D8B5] overflow-x-auto bg-[#FAF7F2]">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition cursor-pointer border-b-2 shrink-0 ${
                activeTab === "overview"
                  ? "border-[#8B3F00] text-[#8B3F00] bg-white"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Overview &amp; Design
            </button>

            <button
              onClick={() => setActiveTab("included")}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition cursor-pointer border-b-2 shrink-0 ${
                activeTab === "included"
                  ? "border-[#8B3F00] text-[#8B3F00] bg-white"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              What&apos;s Included
            </button>

            <button
              onClick={() => setActiveTab("notIncluded")}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition cursor-pointer border-b-2 shrink-0 ${
                activeTab === "notIncluded"
                  ? "border-[#8B3F00] text-[#8B3F00] bg-white"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              What&apos;s Not Included
            </button>

            <button
              onClick={() => setActiveTab("cancellation")}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition cursor-pointer border-b-2 shrink-0 ${
                activeTab === "cancellation"
                  ? "border-[#8B3F00] text-[#8B3F00] bg-white"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Cancellation Policy
            </button>

            <button
              onClick={() => setActiveTab("faq")}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition cursor-pointer border-b-2 shrink-0 ${
                activeTab === "faq"
                  ? "border-[#8B3F00] text-[#8B3F00] bg-white"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              FAQs
            </button>
          </div>

          {/* Tab Body */}
          <div className="p-6 sm:p-8">
            {activeTab === "overview" && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-serif text-xl font-bold text-neutral-900">
                  Celebrate with the Magic of Christmas
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {product.description}
                </p>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Our professional decorators set up warm ambient lighting,
                  flawless festive foliage, hand-finished baubles, and festive
                  winter styling tailored to your venue space.
                </p>
              </div>
            )}

            {activeTab === "included" && (
              <div className="max-w-2xl space-y-3">
                <h3 className="font-serif text-xl font-bold text-neutral-900 mb-4">
                  Package Inclusions
                </h3>
                {product.included && product.included.length > 0 ? (
                  product.included.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-neutral-700">
                      <CheckCircle2 size={17} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-neutral-500">
                    Standard theme props, festive illumination, and setup included.
                  </p>
                )}
              </div>
            )}

            {activeTab === "notIncluded" && (
              <div className="max-w-2xl space-y-3">
                <h3 className="font-serif text-xl font-bold text-neutral-900 mb-4">
                  Items Not Included
                </h3>
                {product.notIncluded && product.notIncluded.length > 0 ? (
                  product.notIncluded.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-neutral-700">
                      <X size={17} className="text-rose-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-neutral-500">
                    Additional customized props or external power supplies are not included.
                  </p>
                )}
              </div>
            )}

            {activeTab === "cancellation" && (
              <div className="max-w-2xl space-y-4">
                <h3 className="font-serif text-xl font-bold text-neutral-900">
                  Easy Cancellation &amp; Rescheduling
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {product.cancellationPolicy ||
                    "Cancellation is allowed up to 24 hours prior to scheduled decoration setup time for a full advance refund."}
                </p>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <p className="font-bold">Need to change your date?</p>
                  <p>
                    Free date rescheduling is supported up to 12 hours before event slot.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="max-w-2xl space-y-4">
                <h3 className="font-serif text-xl font-bold text-neutral-900 mb-4">
                  Frequently Asked Questions
                </h3>
                {product.faqs && product.faqs.length > 0 ? (
                  product.faqs.map((faq, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8D8B5] space-y-1.5">
                      <p className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                        <HelpCircle size={15} className="text-[#8B3F00]" />
                        <span>{faq.question}</span>
                      </p>
                      <p className="text-xs text-neutral-600 leading-relaxed pl-6">
                        {faq.answer}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8D8B5] space-y-1.5">
                    <p className="text-sm font-bold text-neutral-900">
                      When will decorators arrive at my venue?
                    </p>
                    <p className="text-xs text-neutral-600">
                      Our decorators arrive 2 to 3 hours prior to your chosen event time slot.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ================= RELATED CHRISTMAS PRODUCTS ================= */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900">
                  More Christmas Themes &amp; Decor
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Explore other seasonal holiday arrangements
                </p>
              </div>
              <Link
                href="/Festivals/christmas"
                className="text-xs font-bold text-[#8B3F00] hover:underline"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/Festivals/christmas/${rel.slug || rel.id}`}
                  className="bg-white rounded-3xl border border-[#E8D8B5] overflow-hidden shadow-xs hover:shadow-lg transition group flex flex-col justify-between"
                >
                  <div className="h-44 w-full overflow-hidden bg-neutral-100 relative">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-white/90 px-2 py-0.5 rounded-full text-[#8B3F00]">
                      50% Advance
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-serif text-sm font-bold text-neutral-900 group-hover:text-[#8B3F00] transition line-clamp-1">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-neutral-500 line-clamp-2">
                      {rel.description}
                    </p>
                    <div className="pt-1 flex items-center justify-between">
                      <span className="font-bold text-sm text-[#8B3F00]">
                        ₹{Number(rel.price).toLocaleString("en-IN")}
                      </span>
                      <span className="text-[11px] font-bold text-amber-600">
                        Book Now →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
