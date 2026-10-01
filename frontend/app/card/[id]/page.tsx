"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { API_URL } from "@/config";

import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Star,
  Truck,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { allProducts } from "@/app/data/specialCollections";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/wishlistcontext";
import { useAuth } from "@/app/context/AuthContext";
import ProductCard from "@/app/components/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user, openLoginModal } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Overview");
  const [dbProduct, setDbProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedBookingDate, setSelectedBookingDate] = useState(() => {
    const tm = new Date();
    tm.setDate(tm.getDate() + 1);
    return tm.toISOString().split("T")[0];
  });
  const [selectedBookingTime, setSelectedBookingTime] = useState("Evening (04:00 PM - 08:00 PM)");

  const productId = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id;

  // Fetch from DB if available
  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const match = data.find(
            (p: any) => String(p._id) === String(productId) || p.slug === productId
          );
          if (match) {
            setDbProduct({
              id: match._id,
              name: match.name,
              slug: match.slug,
              description: match.description,
              fullDescription: match.fullDescription || match.description,
              price: match.price,
              originalPrice: match.originalPrice || Math.round(Number(match.price) * 1.25),
              image: match.image,
              images: match.images && match.images.length > 0 ? match.images : [match.image],
              category: match.category ? match.category.name : "Celebration Product",
              subcategory: match.subcategory ? match.subcategory.name : "",
              badge: match.badge || "Verified Quality Product",
              rating: match.rating || 4.8,
              reviewCount: match.reviewCount || 98,
              cancellationPolicy: match.cancellationPolicy,
              included: match.included,
              notIncluded: match.notIncluded,
              faqs: match.faqs
            });
          }
        }
      })
      .catch(err => console.error("Error fetching db product:", err))
      .finally(() => setLoading(false));
  }, [productId]);

  const foundItem = useMemo(() => {
    if (dbProduct) return dbProduct;
    if (!productId) return null;

    return allProducts.find(
      (product) =>
        String(product.id) === String(productId) ||
        product.slug === productId
    );
  }, [productId, dbProduct]);

  /*
   * ============================================================
   * LOADING / NOT FOUND
   * ============================================================
   */

  if (!productId || loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-amber-900 font-serif text-lg">Loading Product Details...</p>
        </div>
      </div>
    );
  }

  if (!foundItem) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
          Product Not Found
        </h2>

        <p className="text-sm text-gray-500 mb-5">
          The product you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="bg-amber-900 text-white px-6 py-2.5 rounded-full text-xs uppercase font-bold transition hover:bg-black"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  /*
   * ============================================================
   * PRICE
   * ============================================================
   *
   * Your price is stored like:
   *
   * "Ã Â¢ Ã Â¹2,499"
   *
   * Convert it into a number for calculations.
   */

  const numericPrice = Number(
    String(foundItem.price).replace(/[^0-9]/g, "")
  );

  const totalPrice = numericPrice * quantity;

  const formattedTotalPrice = `₹${totalPrice.toLocaleString("en-IN")}`;

  const originalPrice = numericPrice * 1.25 * quantity;

  const formattedOriginalPrice = `₹${Math.round(
    originalPrice
  ).toLocaleString("en-IN")}`;

  /*
   * ============================================================
   * WISHLIST
   * ============================================================
   */

  const liked = isInWishlist(foundItem.id);

  const handleWishlist = () => {
    toggleWishlist(foundItem);
  };

  /*
   * ============================================================
   * QUANTITY
   * ============================================================
   */

  const handleQuantityChange = (type : any) => {
    if (type === "inc") {
      setQuantity((prev) => prev + 1);
    }

    if (type === "dec") {
      setQuantity((prev) => Math.max(1, prev - 1));
    }
  };

  /*
   * ============================================================
   * ADD TO CART
   * ============================================================
   */

  const handleAddToCart = () => {
    addToCart(foundItem, quantity);
  };

  /*
   * ============================================================
   * BOOK NOW
   * ============================================================
   *
   * Send the selected product to payment-detail through URL.
   */

  const handleBookNow = () => {
    if (!user) {
      openLoginModal();
      return;
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "ps_booking_draft",
        JSON.stringify({
          productId: foundItem.id,
          name: foundItem.name,
          price: totalPrice || numericPrice || foundItem.price,
          image: foundItem.image,
          eventDate: selectedBookingDate,
          eventTimeSlot: selectedBookingTime,
        })
      );
    }

    // Clean, SEO-friendly route without query string clutter
    router.push("/payment-detail");
  };

  /*
   * ============================================================
   * RELATED PRODUCTS
   * ============================================================
   *
   * For now, show other products from the common product list.
   */

  const relatedProducts = allProducts
    .filter((product) => product.id !== foundItem.id)
    .slice(0, 6);

  /*
   * ============================================================
   * PAGE
   * ============================================================
   */

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
            className="flex items-center gap-1 hover:text-amber-800 transition"
          >
            <ArrowLeft size={14} />
            Back
          </button>

          <span>/</span>

          <Link
            href="/"
            className="hover:text-amber-800 transition"
          >
            Home
          </Link>

          <span>/</span>

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
                  THUMBNAILS
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
                      src={foundItem.image}
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
                    src={foundItem.image}
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


                  {/* PRODUCT BADGE */}

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

                      Premium Product
                    </span>

                  </div>


                  {/* WISHLIST */}

                  <button
                    onClick={handleWishlist}
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
                        liked
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
                    Ã Â¢ Ã Â¹
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
                    Ã Â¢ Ã Âº
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

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs text-neutral-700">
                      <span className="text-amber-600">Ã Â¢ Ã Â¦</span>
                      <span>100% Verified</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs text-neutral-700">
                      <span className="text-amber-600">Ã Â¢-Ã Â£</span>
                      <span>Real Photos</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs text-neutral-700">
                      <span className="text-amber-600">Ã Â¢  </span>
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

                  {foundItem.badge || "Verified Quality Product"}
                </div>


                {/* CATEGORY */}

                <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide">
                  {foundItem.category || "Celebration Product"} {foundItem.subcategory ? `Ã Â¢ Ã Â¢ ${foundItem.subcategory}` : ""}
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
                        className={
                          i < Math.round(foundItem.rating)
                            ? "fill-amber-500 text-amber-500"
                            : "text-neutral-300"
                        }
                      />
                    ))}

                  </div>

                  <span className="font-bold text-neutral-900">
                    {foundItem.rating}
                  </span>

                  <span className="text-sm text-neutral-500">
                    ({foundItem.reviewCount} reviews)
                  </span>

                </div>


                {/* PRICE */}

                <div className="flex flex-wrap items-center gap-3 mt-5">

                  <span className="text-3xl font-extrabold text-neutral-900">
                    {formattedTotalPrice}
                  </span>

                  <span className="text-sm text-neutral-400 line-through">
                    {formattedOriginalPrice}
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
                    20% OFF
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
                  {foundItem.description}
                </p>


                {/* =================================================
                    FEATURE PILLS
                ================================================== */}

                <div className="grid grid-cols-3 gap-2 mt-5">

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
                      <CheckCircle2
                        size={17}
                        className="text-amber-700"
                      />
                    </div>

                    <p className="mt-2 text-[10px] sm:text-xs text-neutral-600">
                      Customizable
                    </p>

                  </div>


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
                      <Truck
                        size={17}
                        className="text-amber-700"
                      />
                    </div>

                    <p className="mt-2 text-[10px] sm:text-xs text-neutral-600">
                      On-Time Setup
                    </p>

                  </div>


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
                      <Sparkles
                        size={17}
                        className="text-amber-700"
                      />
                    </div>

                    <p className="mt-2 text-[10px] sm:text-xs text-neutral-600">
                      Premium Quality
                    </p>

                  </div>

                </div>


                {/* SERVICE AVAILABLE */}
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

                {/* EVENT DATE & TIME SELECTION */}
                <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-white border-2 border-amber-200/90 shadow-xs space-y-3.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                      <Calendar size={15} className="text-amber-600" />
                      <span>Select Event Date &amp; Setup Time</span>
                    </label>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      50% Advance Online
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Event Date Picker */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-neutral-600 flex items-center gap-1">
                        <Calendar size={12} className="text-amber-600" />
                        Event Date *
                      </span>
                      <input
                        type="date"
                        required
                        value={selectedBookingDate}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setSelectedBookingDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-sm font-semibold text-neutral-800 bg-amber-50/40 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      />
                    </div>

                    {/* Event Time Slot Selector */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-neutral-600 flex items-center gap-1">
                        <Clock size={12} className="text-amber-600" />
                        Setup Time Slot *
                      </span>
                      <select
                        value={selectedBookingTime}
                        onChange={(e) => setSelectedBookingTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-sm font-semibold text-neutral-800 bg-amber-50/40 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Morning (09:00 AM - 01:00 PM)">Morning (09:00 AM - 01:00 PM)</option>
                        <option value="Afternoon (01:00 PM - 04:00 PM)">Afternoon (01:00 PM - 04:00 PM)</option>
                        <option value="Evening (04:00 PM - 08:00 PM)">Evening (04:00 PM - 08:00 PM)</option>
                        <option value="Night (08:00 PM - 11:30 PM)">Night (08:00 PM - 11:30 PM)</option>
                        <option value="Midnight Surprise (11:30 PM - 12:30 AM)">Midnight Surprise (11:30 PM - 12:30 AM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Quick Time Slot Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {[
                      { label: "Morning (9-1 PM)", val: "Morning (09:00 AM - 01:00 PM)" },
                      { label: "Afternoon (1-4 PM)", val: "Afternoon (01:00 PM - 04:00 PM)" },
                      { label: "Evening (4-8 PM)", val: "Evening (04:00 PM - 08:00 PM)" },
                      { label: "Night (8-11:30 PM)", val: "Night (08:00 PM - 11:30 PM)" },
                    ].map((slot) => {
                      const isSelected = selectedBookingTime === slot.val;
                      return (
                        <button
                          key={slot.val}
                          type="button"
                          onClick={() => setSelectedBookingTime(slot.val)}
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                            isSelected
                              ? "bg-amber-500 text-white border-amber-500 shadow-xs"
                              : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-amber-300"
                          }`}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[11px] text-neutral-500 leading-tight">
                    Both booking date &amp; setup time are saved. 50% advance online, remaining 50% on-site setup.
                  </p>
                </div>


                {/* QUANTITY */}

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


                {/* ACTION BUTTONS */}

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
                    onClick={handleBookNow}
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
                  Secure checkout Ã ,Ã Â· Guaranteed satisfaction
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            LOWER INFORMATION SECTION
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

          {/* TABS */}

          <div className="border-b border-neutral-100 overflow-x-auto sticky top-0 bg-white/95 backdrop-blur-md z-20">

            <div className="flex min-w-max">

              {[
                "Overview",
                "What's Included",
                "What's Not Included",
                "Cancellation Policy",
                "Reviews",
                "FAQ",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-5
                    sm:px-7
                    py-4
                    text-sm
                    font-medium
                    transition
                    cursor-pointer
                    ${
                      activeTab === tab
                        ? "text-amber-800 border-b-2 border-amber-500 font-bold"
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
            className={`
              scroll-mt-28
              p-5
              sm:p-8
              border-b
              border-neutral-100
              ${activeTab !== "Overview" && activeTab !== "All" ? "hidden" : "block"}
            `}
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
                whitespace-pre-line
              "
            >
              {foundItem.fullDescription || foundItem.description}
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
                  Premium Product
                </p>

                <p className="text-[11px] text-neutral-500 mt-1">
                  Quality
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
            className={`
              grid
              grid-cols-1
              lg:grid-cols-12
              gap-6
              p-5
              sm:p-8
              border-b
              border-neutral-100
              ${activeTab !== "What's Included" && activeTab !== "What's Not Included" && activeTab !== "All" && activeTab !== "Overview" ? "hidden" : ""}
            `}
          >

            {/* INCLUDED */}

            <div
              id="included"
              className={`
                scroll-mt-28
                lg:col-span-6
                rounded-2xl
                bg-[#FFF9E8]
                border
                border-amber-100
                p-6
                ${activeTab === "What's Not Included" ? "hidden" : "block"}
              `}
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
                <CheckCircle2
                  size={20}
                  className="text-emerald-700"
                />

                What's Included
              </h3>

              <div className="mt-5 space-y-3">

                {(foundItem.included && foundItem.included.length > 0 ? foundItem.included : [
                  "Premium product / decoration",
                  "Quality materials",
                  "Professional setup support",
                  "On-time service",
                  "Customer support",
                ]).map((item: string) => (
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


            {/* NOT INCLUDED */}

            <div
              id="not-included"
              className={`
                scroll-mt-28
                lg:col-span-6
                rounded-2xl
                bg-rose-50/50
                border
                border-rose-100
                p-6
                ${activeTab === "What's Included" ? "hidden" : "block"}
              `}
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
                <AlertCircle
                  size={20}
                  className="text-rose-600"
                />

                What's Not Included
              </h3>

              <div className="mt-5 space-y-3">

                {(foundItem.notIncluded && foundItem.notIncluded.length > 0 ? foundItem.notIncluded : [
                  "Venue booking charges",
                  "Custom catering and food items",
                  "Additional power backup",
                  "Damage caused by guests",
                ]).map((item: string) => (
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
            className={`
              scroll-mt-28
              p-5
              sm:p-8
              border-b
              border-neutral-100
              bg-[#FAF7F2]/40
              ${activeTab !== "Cancellation Policy" && activeTab !== "All" && activeTab !== "Overview" ? "hidden" : "block"}
            `}
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
                  whitespace-pre-line
                "
              >
                {foundItem.cancellationPolicy || "Please contact our team as early as possible if you need to cancel or reschedule your booking. Cancellation and rescheduling availability may depend on the booking status, event date, and preparation already completed."}
              </p>

            </div>

          </div>


          {/* =================================================
              FAQ
          ================================================== */}

          <div
            id="faq"
            className={`
              scroll-mt-28
              p-5
              sm:p-8
              border-b
              border-neutral-100
              ${activeTab !== "FAQ" && activeTab !== "All" && activeTab !== "Overview" ? "hidden" : "block"}
            `}
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

            <div className="space-y-3 max-w-4xl">

              {(foundItem.faqs && foundItem.faqs.length > 0
                ? foundItem.faqs.map((f: any) => [f.question, f.answer])
                : [
                  [
                    "Can I customize the product?",
                    "Yes. Customization can be discussed with the team according to your event requirements and selected product."
                  ],
                  [
                    "How early should I book?",
                    "Booking in advance is recommended so the required date, materials and service team can be arranged."
                  ],
                  [
                    "Is setup included?",
                    "The service includes the setup items described in the What's Included section."
                  ],
                  [
                    "How do I confirm my booking?",
                    "Use the Book Now button to continue to the payment and booking flow."
                  ],
                ]
              ).map(([question, answer]: [string, string], index: number) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={question + index}
                    className={`
                      rounded-2xl
                      border
                      transition-all
                      duration-200
                      overflow-hidden
                      ${isOpen ? "border-amber-300 bg-amber-50/20 shadow-sm" : "border-neutral-100 bg-white hover:border-amber-200"}
                    `}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <h4 className="font-semibold text-sm sm:text-base text-neutral-900 flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">
                          Q
                        </span>
                        {question}
                      </h4>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 shrink-0 ${isOpen ? "bg-amber-100 text-amber-800 rotate-180" : "bg-neutral-100 text-neutral-500"}`}>
                        <ChevronDown size={16} />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-neutral-600 leading-relaxed border-t border-amber-100/60 pl-14">
                        {answer}
                      </div>
                    )}
                  </div>
                );
              })}

            </div>

          </div>

        </section>


        {/* =====================================================
            REVIEW SECTION
        ====================================================== */}

        <section
          id="reviews"
          className={`
            scroll-mt-28
            mt-6
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            ${activeTab !== "Reviews" && activeTab !== "All" && activeTab !== "Overview" ? "hidden" : "grid"}
          `}
        >

          {/* RATING SUMMARY */}

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

              <span className="text-3xl font-bold">
                {foundItem.rating}
              </span>

              <div>

                <div className="flex">

                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.round(foundItem.rating)
                          ? "fill-amber-500 text-amber-500"
                          : "text-neutral-300"
                      }
                    />
                  ))}

                </div>

                <p className="text-xs text-neutral-500 mt-1">
                  {foundItem.reviewCount} verified reviews
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
                <div
                  key={rating}
                  className="flex items-center gap-3 text-xs"
                >

                  <span className="w-4 text-neutral-600">
                    {rating}
                  </span>

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


          {/* QUOTE CARD */}

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

            <Sparkles
              size={24}
              className="text-amber-600"
            />

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
              products and memorable experiences.
            </p>

          </div>

        </section>


        {/* =====================================================
            RELATED PRODUCTS
        ====================================================== */}

        {relatedProducts.length > 0 && (
          <section
            className="
              mt-10
              border-t
              border-amber-200/50
              pt-12
              pb-10
            "
          >

            {/* HEADING */}

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
                Explore More
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                Explore more products from our collection.
              </p>

            </div>


            {/* PRODUCT CARDS */}

            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">

              {relatedProducts.map((item) => (

                <ProductCard key={item.id}
                 product={item}
                           isInWishlist={isInWishlist}
                            toggleWishlist={toggleWishlist}/>

              ))}

            </div>

          </section>
        )}

      </main>

    </div>
  );
}