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
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Camera,
  Users,
  PenTool,
  X,
  MapPin,
  MessageCircle,
} from "lucide-react";
import toast from "react-hot-toast";

function WhatsAppIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.7.44 3.36 1.28 4.82L2 22l5.4-1.42a9.9 9.9 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm0 18.1h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.2.84.85-3.12-.2-.32a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.28-8.19 8.28zm4.52-6.19c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28z" />
    </svg>
  );
}

import { allProducts } from "@/app/data/specialCollections";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/wishlistcontext";
import { useAuth } from "@/app/context/AuthContext";
import { useCity } from "@/app/context/CityContext";
import ProductCard from "@/app/components/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user, openLoginModal } = useAuth();
  const { selectedCity, openCityModal } = useCity();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Overview");
  const [dbProduct, setDbProduct] = useState<any>(null);
  const [whatsappNumber, setWhatsappNumber] = useState("918010679679");
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Write a Review state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [customReviews, setCustomReviews] = useState<any[]>([]);

  const [selectedBookingDate, setSelectedBookingDate] = useState(() => {
    const tm = new Date();
    tm.setDate(tm.getDate() + 1);
    return tm.toISOString().split("T")[0];
  });
  const [selectedBookingTime, setSelectedBookingTime] = useState("Evening (04:00 PM - 08:00 PM)");

  const productId = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id;

  // Load custom reviews from localStorage if available
  useEffect(() => {
    if (!productId) return;
    try {
      const stored = localStorage.getItem(`reviews_${productId}`);
      if (stored) {
        setCustomReviews(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading reviews from localStorage", e);
    }
  }, [productId]);

  const handleOpenReviewModal = () => {
    if (!user) {
      toast.error("Please login to write a review");
      openLoginModal();
      return;
    }
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      toast.error("Please enter your review feedback");
      return;
    }

    setReviewSubmitting(true);
    try {
      const newReviewItem = {
        id: Date.now().toString(),
        name: user?.name || "Verified Customer",
        rating: reviewRating,
        comment: reviewComment.trim(),
        date: "Just now",
        verified: true,
      };

      const updated = [newReviewItem, ...customReviews];
      setCustomReviews(updated);
      try {
        localStorage.setItem(`reviews_${productId}`, JSON.stringify(updated));
      } catch (err) {
        console.error("LocalStorage write error", err);
      }

      toast.success("Thank you! Your review has been published.");
      setIsReviewModalOpen(false);
      setReviewComment("");
      setReviewRating(5);
    } catch (err) {
      toast.error("Failed to submit review");
    } finally {
      setReviewSubmitting(false);
    }
  };

  const [dbFetched, setDbFetched] = useState(false);

  // Fetch from DB if available
  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setDbFetched(true);
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
              faqs: match.faqs,
              availableCities: match.availableCities || [],
              cityOverrides: match.cityOverrides || []
            });
          } else {
            setDbProduct(null);
          }
        }
      })
      .catch(err => {
        console.error("Error fetching db product:", err);
      })
      .finally(() => setLoading(false));

    // Fetch live WhatsApp number
    const savedWp = typeof window !== "undefined" ? localStorage.getItem("party_whatsapp_number") : null;
    if (savedWp) {
      const clean = savedWp.replace(/\D/g, "");
      setWhatsappNumber(clean.startsWith("91") && clean.length > 10 ? clean : `91${clean.slice(-10)}`);
    }

    fetch(`${API_URL}/api/settings`)
      .then(res => res.json())
      .then(sData => {
        if (sData?.whatsappNumber) {
          const clean = sData.whatsappNumber.replace(/\D/g, "");
          setWhatsappNumber(clean.startsWith("91") && clean.length > 10 ? clean : `91${clean.slice(-10)}`);
        }
      })
      .catch(() => {});
  }, [productId]);

  const foundItem = useMemo(() => {
    if (dbProduct) return dbProduct;
    // If backend was successfully loaded and product was NOT in backend, don't show it (it was deleted)
    if (dbFetched && !dbProduct) return null;
    if (!productId) return null;

    return allProducts.find(
      (product) =>
        String(product.id) === String(productId) ||
        product.slug === productId
    );
  }, [productId, dbProduct, dbFetched]);

  /*
   * ============================================================
   * CITY-WISE CONTENT & META TAG OVERRIDES (HOOK MUST BE AT TOP LEVEL)
   * ============================================================
   */
  const activeCityOverride = useMemo(() => {
    if (!foundItem?.cityOverrides || !Array.isArray(foundItem.cityOverrides) || !selectedCity) return null;
    return foundItem.cityOverrides.find(
      (o: any) => o.cityName?.toLowerCase()?.trim() === selectedCity.toLowerCase()?.trim()
    );
  }, [foundItem, selectedCity]);

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
   * "₹2,499"
   *
   * Convert it into a number for calculations.
   */

  // Dynamic localized name, description, and price based on selected city
  const displayName = activeCityOverride?.customTitle?.trim() || foundItem.name;
  const displayDescription = activeCityOverride?.customDescription?.trim() || foundItem.description;

  const basePriceValue = activeCityOverride?.customPrice
    ? Number(String(activeCityOverride.customPrice).replace(/[^0-9]/g, ""))
    : Number(String(foundItem.price).replace(/[^0-9]/g, ""));

  const numericPrice = basePriceValue || 0;

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
      {/* DYNAMIC CITY-WISE SEO META TAGS */}
      {activeCityOverride?.metaTitle && (
        <title>{activeCityOverride.metaTitle}</title>
      )}
      {activeCityOverride?.metaDescription && (
        <meta name="description" content={activeCityOverride.metaDescription} />
      )}
      {activeCityOverride?.metaKeywords && (
        <meta name="keywords" content={activeCityOverride.metaKeywords} />
      )}

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
                    type="button"
                    aria-label="Previous Image"
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
                      hover:text-amber-800
                      hover:scale-105
                      transition
                      cursor-pointer
                    "
                  >
                    <ChevronLeft size={20} />
                  </button>


                  {/* RIGHT ARROW */}

                  <button
                    type="button"
                    aria-label="Next Image"
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
                      hover:text-amber-800
                      hover:scale-105
                      transition
                      cursor-pointer
                    "
                  >
                    <ChevronRight size={20} />
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
                    shadow-xs
                  "
                >

                  <div className="grid grid-cols-3 gap-3 text-center">

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs text-neutral-700 font-medium">
                      <ShieldCheck size={16} className="text-amber-600 shrink-0" />
                      <span>100% Verified</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs text-neutral-700 font-medium">
                      <Camera size={16} className="text-amber-600 shrink-0" />
                      <span>Real Photos</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs text-neutral-700 font-medium">
                      <Users size={16} className="text-amber-600 shrink-0" />
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
                  {foundItem.category || "Celebration Product"} {foundItem.subcategory ? `• ${foundItem.subcategory}` : ""}
                </p>

                {/* CITY AVAILABILITY CHECK */}
                <div className="mt-2.5 flex items-center justify-between gap-2 p-2.5 bg-neutral-50 rounded-2xl border border-neutral-200/80 text-xs">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <MapPin size={14} className="text-amber-600 shrink-0" />
                    <span className="truncate text-neutral-600">
                      Delivering to: <strong className="text-neutral-900">{selectedCity}</strong>
                    </span>
                  </div>
                  {foundItem.availableCities && foundItem.availableCities.length > 0 && !foundItem.availableCities.includes("All") && !foundItem.availableCities.includes(selectedCity) ? (
                    <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 shrink-0">
                      ⚠️ Not in {selectedCity}
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                      ✓ Available Here
                    </span>
                  )}
                  <button
                    onClick={openCityModal}
                    type="button"
                    className="text-[11px] font-bold text-[#8C6D24] hover:underline shrink-0 cursor-pointer"
                  >
                    Change
                  </button>
                </div>


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
                  {displayName}
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
                  Unit Price: ₹{numericPrice.toLocaleString("en-IN")}
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
                  {displayDescription}
                </p>

                {/* WHAT'S INCLUDED HIGHLIGHT */}
                {((foundItem.included && foundItem.included.length > 0) || foundItem.features) && (
                  <div className="mt-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-2.5">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                      <span>What's Included:</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(foundItem.included && foundItem.included.length > 0 
                        ? foundItem.included 
                        : (foundItem.features || [
                            "Premium product / decoration",
                            "Quality materials",
                            "Professional setup support",
                            "On-time service",
                          ])
                      ).map((inc: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 text-xs font-medium text-neutral-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span className="leading-snug">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}


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

                {/* WHATSAPP DIRECT INQUIRY BUTTON WITH FULL PRODUCT DETAILS */}
                {(() => {
                  const productPageUrl = typeof window !== "undefined" ? window.location.href : `https://partysquare.in/card/${foundItem.id || productId}`;
                  const wpMessage = `Hello Party Square! 🎉\n\nI want to enquire and book this decoration product:\n\n✨ *Product:* ${displayName}\n💰 *Price:* ₹${numericPrice.toLocaleString("en-IN")} (Qty: ${quantity} = ${formattedTotalPrice})\n🏷️ *Category:* ${foundItem.category || "Celebration Decor"}\n📅 *Event Date:* ${selectedBookingDate}\n⏰ *Time Slot:* ${selectedBookingTime}\n${selectedCity ? `📍 *City:* ${selectedCity}\n` : ""}🔗 *Product Link:* ${productPageUrl}\n\nPlease let me know if this slot and setup is available!`;
                  const wpHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(wpMessage)}`;

                  return (
                    <div className="mt-3">
                      <a
                        href={wpHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          w-full
                          h-12
                          rounded-xl
                          bg-[#25D366]
                          hover:bg-[#20bd5a]
                          text-white
                          font-bold
                          text-sm
                          flex
                          items-center
                          justify-center
                          gap-2.5
                          transition
                          shadow-md
                          hover:shadow-lg
                          cursor-pointer
                        "
                      >
                        <WhatsAppIcon size={19} />
                        <span>Book / Inquire on WhatsApp</span>
                      </a>
                    </div>
                  );
                })()}

                {/* CHECKOUT MESSAGE */}

                <p className="text-center text-xs text-neutral-400 mt-4">
                  Instant WhatsApp Booking • Secure Checkout • Guaranteed Satisfaction
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

            <div className="flex items-center justify-between">
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

              <button
                onClick={handleOpenReviewModal}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  bg-[#8C6D24]
                  hover:bg-[#72571B]
                  text-white
                  text-xs
                  font-semibold
                  px-3.5
                  py-2
                  rounded-full
                  shadow-sm
                  transition-all
                  cursor-pointer
                "
              >
                <PenTool size={13} />
                Write a Review
              </button>
            </div>

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
                  {Number(foundItem.reviewCount || 0) + customReviews.length} verified reviews
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
              justify-between
            "
          >
            <div>
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

            <div className="mt-6 pt-5 border-t border-amber-200/60 flex items-center justify-between">
              <span className="text-xs text-neutral-600">Have you experienced this decor?</span>
              <button
                onClick={handleOpenReviewModal}
                className="
                  text-xs
                  font-bold
                  text-[#8C6D24]
                  hover:text-[#6a5116]
                  underline
                  cursor-pointer
                "
              >
                Share your feedback →
              </button>
            </div>

          </div>

          {/* VERIFIED CUSTOMER REVIEWS LIST */}
          <div className="lg:col-span-2 mt-4 space-y-4">
            <h4 className="font-serif font-bold text-lg text-neutral-900">
              Verified Feedback ({customReviews.length + 3})
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Customer submitted reviews first */}
              {customReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white border border-amber-200/80 rounded-2xl p-5 shadow-sm space-y-3 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-neutral-900">{rev.name}</span>
                    <span className="text-[11px] text-neutral-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < rev.rating ? "fill-amber-500 text-amber-500" : "text-neutral-200"}
                      />
                    ))}
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full ml-auto">
                      ✓ Verified Buyer
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}

              {/* Seed reviews */}
              <div className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-neutral-900">Pooja Sharma</span>
                  <span className="text-[11px] text-neutral-400">2 days ago</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                  ))}
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full ml-auto">
                    ✓ Verified Buyer
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed italic">
                  "The decoration was exact as shown in the picture! Setup was completed well before the guests arrived. Highly recommended!"
                </p>
              </div>

              <div className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-neutral-900">Rahul Verma</span>
                  <span className="text-[11px] text-neutral-400">1 week ago</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                  ))}
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full ml-auto">
                    ✓ Verified Buyer
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed italic">
                  "Very neat and clean work. Balloon quality was great and lasted through the next day. Value for money!"
                </p>
              </div>

              <div className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-neutral-900">Ananya Roy</span>
                  <span className="text-[11px] text-neutral-400">2 weeks ago</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < 4 ? "fill-amber-500 text-amber-500" : "text-neutral-200"} />
                  ))}
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full ml-auto">
                    ✓ Verified Buyer
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed italic">
                  "Loved the theme and color combination! Team was very polite and cooperative."
                </p>
              </div>
            </div>
          </div>

        </section>

        {/* WRITE A REVIEW MODAL */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div 
              className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative border border-amber-100 animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsReviewModalOpen(false)}
                className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-700 transition"
              >
                <X size={20} />
              </button>

              <div className="space-y-1 mb-6">
                <span className="text-xs uppercase tracking-widest text-[#8C6D24] font-bold">Feedback</span>
                <h3 className="text-2xl font-serif font-bold text-neutral-900">Write a Review</h3>
                <p className="text-xs text-neutral-500">
                  Sharing your experience for <span className="font-semibold text-neutral-800">{foundItem.name}</span>
                </p>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-2">
                    Overall Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setReviewRating(s)}
                        className="cursor-pointer transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star 
                          size={28} 
                          className={s <= reviewRating ? "fill-amber-500 text-amber-500" : "text-neutral-200"} 
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-neutral-700 ml-2">
                      {reviewRating} out of 5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase mb-2">
                    Your Feedback
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Tell us what you liked about this decoration, quality, setup time..."
                    className="w-full text-sm bg-neutral-50 border border-neutral-200 rounded-2xl p-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8C6D24]/30 focus:border-[#8C6D24] transition resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="flex-1 py-3 text-xs uppercase font-bold tracking-wider rounded-full border border-neutral-300 text-neutral-600 hover:bg-neutral-50 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="flex-1 py-3 text-xs uppercase font-bold tracking-wider rounded-full bg-[#8C6D24] hover:bg-[#72571B] text-white shadow-md hover:shadow-lg transition cursor-pointer disabled:opacity-50"
                  >
                    {reviewSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


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