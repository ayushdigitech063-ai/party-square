"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Star,
  Truck,
  Calendar,
  MapPin,
  Check,
  ChevronRight,
  ChevronLeft,
  X,
  ShieldCheck,
  Clock,
  Camera,
  RotateCcw,
} from "lucide-react";

import { allProducts } from "@/app/data/allCollections";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/wishlistcontext";
import ProductCard from "@/app/components/ProductCard";
import AddOnSection from "@/app/components/AddOneSection";
import { AddOnItem } from "@/app/data/addonsData";
import { fetchProductByIdOrSlug, fetchPackages, fetchReviewsByProduct, ReviewItem } from "@/app/lib/api";
import LoginModal from "@/app/components/LoginModal";
import toast from "react-hot-toast";

/*
 * Delivery charge applied after the pincode is checked.
 * Keep 0 for free delivery, or replace this with an API / pincode lookup later.
 */
const DELIVERY_CHARGE = 0;

const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;

const toNumber = (v: any) => Number(String(v ?? "").replace(/[₹,\s]/g, "")) || 0;

const INCLUDED_ITEMS = [
  "Complete balloon decoration setup as per image/theme",
  "High-quality metallic, chrome & pastel latex balloons",
  "Professional on-site decorator setup & styling",
  "Removable, damage-free wall adhesive tape & ribbons",
  "On-time setup guarantee before your event begins",
  "Dedicated event coordination & support",
];

const NOT_INCLUDED_ITEMS = [
  "Venue or hall booking charges and permissions",
  "Special food, cake, catering, and cutlery items",
  "Additional high-voltage power backup or extension boards",
  "Post-event teardown/dismantling (available as add-on)",
  "Compensation for damage caused by external guests/kids",
];

const FALLBACK_PRODUCT_REVIEWS = [
  {
    _id: "rev-1",
    customerName: "Atharv Surana",
    rating: 5,
    comment: "Thank you for the decoration. It was nicely done and everyone loved it. Very cooperative and budget friendly.",
    createdAt: "2025-01-15T10:00:00Z",
    location: "Bhopal",
  },
  {
    _id: "rev-2",
    customerName: "Sourav Dugar",
    rating: 5,
    comment: "I have contacted this vendor just a day before my kid's birthday and they have done an awesome job. Loved this whole decor.",
    createdAt: "2025-02-02T10:00:00Z",
    location: "Thane",
  },
  {
    _id: "rev-3",
    customerName: "Simran Nigam",
    rating: 4.8,
    comment: "Great Job Done.. Extremely Professional, Reasonable and great at work.. You get what you ask for and little more delights.",
    createdAt: "2025-02-18T10:00:00Z",
    location: "Ahmedabad",
  },
];

const WHY_US_ITEMS = [
  {
    title: "100% On-Time Setup Guarantee",
    desc: "Our decorators arrive strictly at your chosen time slot so your surprise or party is never delayed.",
  },
  {
    title: "Verified & Background-Checked Decorators",
    desc: "Every professional partner undergoes rigorous identity and skill verification for complete safety at your venue.",
  },
  {
    title: "Zero Wall Damage Guarantee",
    desc: "We only use damage-free painter's masking tape and safe adhesives that leave no stains or peel paint.",
  },
  {
    title: "Premium Materials Only",
    desc: "Metallic, chrome, pastel and matte balloons of the highest grade that retain shine and volume for hours.",
  },
  {
    title: "Dedicated Event Coordinator",
    desc: "Direct support from booking to execution to ensure all customization requests are met smoothly.",
  },
];

const GUIDELINES_ITEMS = [
  {
    title: "Continuous Power Socket",
    desc: "Please provide a working electric plug point within 5-10 meters of the decoration wall for balloon inflators and fairy lights.",
  },
  {
    title: "Stool or Step Ladder",
    desc: "For backdrop or ceiling-height balloon setups, kindly provide a sturdy stool or ladder to the decorator.",
  },
  {
    title: "Clean & Ready Space",
    desc: "Keep the designated wall or area clear of obstacles before the decorator arrives to ensure smooth, timely execution.",
  },
  {
    title: "Balloon Care Indoors",
    desc: "Air-filled balloon arrangements typically last 24 to 48 hours indoors. Keep away from direct sunlight, air conditioner vents, and sharp surfaces.",
  },
  {
    title: "Post-Event Dismantling",
    desc: "Cleanup/removal service is not included in standard decoration unless opted as an additional add-on service.",
  },
];

const CANCELLATION_REFUND_POINTS = [
  {
    title: "Free Cancellation (100% Refund)",
    desc: "Cancel your booking up to 24 hours prior to the scheduled setup time slot for a full 100% refund.",
  },
  {
    title: "Free Date / Time Rescheduling",
    desc: "Need to change your event date or slot? Reschedule at zero extra cost up to 12 hours before setup (subject to slot availability).",
  },
  {
    title: "Within 12-24 Hours Notice",
    desc: "Cancellations made between 12 and 24 hours prior incur a nominal 20% deduction to cover materials already prepped.",
  },
  {
    title: "Fast Refund Processing",
    desc: "Eligible refunds are initiated within 24 hours and credited to your original payment method in 3-5 business days.",
  },
];

const DEFAULT_FAQS = [
  {
    question: "Can I customize the balloon colors or theme?",
    answer: "Yes, absolutely! Once your booking is placed, our team connects with you to customize balloon shades and specific themes as per your preference.",
  },
  {
    question: "How long does the decorator take to complete the setup?",
    answer: "Most room and balloon decorations take between 1.5 to 2.5 hours depending on the design complexity.",
  },
  {
    question: "How early should I book the service?",
    answer: "We recommend booking at least 24-48 hours in advance to secure your preferred date and time slot, though same-day rush slots may also be available.",
  },
  {
    question: "Will the tape damage my wall paint or wallpaper?",
    answer: "No. Our decorators use professional removable masking tape specially engineered for walls, ensuring safe removal with zero peeling.",
  },
  {
    question: "Are the decorators background-verified?",
    answer: "Yes, 100%. Every decorator is identity-verified and trained to follow strict professional and hygiene protocols.",
  },
];

const FAQS = DEFAULT_FAQS.map(f => [f.question, f.answer]);

const INFO_TABS = [
  { key: "overview", label: "Overview" },
  { key: "included", label: "Inclusions" },
  { key: "not-included", label: "Whats not included" },
  { key: "why-us", label: "Why Us" },
  { key: "about", label: "About this package" },
  { key: "guidelines", label: "Guidelines" },
  { key: "cancel", label: "Cancellation/Refunds" },
  { key: "faqs", label: "FAQs" },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);

  // New UI state (hooks must stay above the early returns)
  const [activeTab, setActiveTab] = useState("overview");
  const tabsScrollRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsScrollRef.current) {
      const amount = direction === "left" ? -180 : 180;
      tabsScrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };
  const [pincode, setPincode] = useState("");
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [pincodeError, setPincodeError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [customTime, setCustomTime] = useState("");
  const [dates, setDates] = useState<
    { iso: string; top: string; num: number }[]
  >([]);
  const [activeTab2, setActiveTab2] = useState<"overview" | "addons" | "reviews">("overview");
  const [selectedAddons, setSelectedAddons] = useState<AddOnItem[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [calendarViewDate, setCalendarViewDate] = useState(() => new Date());
  const [showLoginModal, setShowLoginModal] = useState(false);
  // Live reviews from backend
  const [productReviews, setProductReviews] = useState<ReviewItem[]>([]);
  const [reviewsAvg, setReviewsAvg] = useState<string | null>(null);
  const [reviewsLoading, setReviewsLoading] = useState(false);
 
  useEffect(() => {
    const list = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      list.push({
        iso: toISO(d),
        top:
          i === 0
            ? "Today"
            : i === 1
              ? "Tmrw"
              : d.toLocaleDateString("en-IN", { weekday: "short" }),
        num: d.getDate(),
      });
    }
    setDates(list);
  }, []);

  // Scroll spy to highlight active quick-nav pill according to user scroll position
  useEffect(() => {
    const handleScroll = () => {
      const addonsEl = document.getElementById("addons");
      const reviewsEl = document.getElementById("reviews");
      const scrollPos = window.scrollY + 250;

      if (reviewsEl && scrollPos >= reviewsEl.offsetTop) {
        setActiveTab2("reviews");
      } else if (addonsEl && scrollPos >= addonsEl.offsetTop) {
        setActiveTab2("addons");
      } else {
        setActiveTab2("overview");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rawParam = params?.product || params?.id;
  const productId = Array.isArray(rawParam) ? rawParam[0] : rawParam;
  const cityParam = Array.isArray(params?.city) ? params.city[0] : params?.city;
  const categoryParam = Array.isArray(params?.category) ? params.category[0] : params?.category;
  const [liveProduct, setLiveProduct] = useState<any>(null);
  const [fetchingLive, setFetchingLive] = useState(true);

  useEffect(() => {
    async function loadLiveProduct() {
      if (!productId) return;
      try {
        setFetchingLive(true);
        // 1. Try to fetch as product
        try {
          const data = await fetchProductByIdOrSlug(productId);
          if (data && (data._id || data.name)) {
            setLiveProduct({
              ...data,
              id: data._id || productId,
              category: typeof data.category === "object" ? data.category?.name : data.category,
              subcategory: typeof data.subcategory === "object" ? data.subcategory?.name : data.subcategory,
            });
            return;
          }
        } catch {
          // Product not found, continue to check packages
        }

        // 2. Try to fetch as package from backend
        try {
          const pkgs = await fetchPackages();
          if (Array.isArray(pkgs)) {
            const matchedPkg = pkgs.find(
              (p) =>
                String(p._id || (p as any).id).toLowerCase() === String(productId).toLowerCase() ||
                p.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") === String(productId).toLowerCase()
            );
            if (matchedPkg) {
              setLiveProduct({
                id: matchedPkg._id || productId,
                name: matchedPkg.name,
                price: matchedPkg.price,
                image: matchedPkg.image,
                description: matchedPkg.description,
                fullDescription: matchedPkg.description,
                included: matchedPkg.features && matchedPkg.features.length > 0 ? matchedPkg.features : INCLUDED_ITEMS,
                category: "Packages",
                subcategory: matchedPkg.pageTarget || "Special Package",
                availability: true,
                rating: 4.9,
                reviewCount: 48,
              });
              return;
            }
          }
        } catch {
          // Ignore
        }
      } catch (err) {
        // Fallback
      } finally {
        setFetchingLive(false);
      }
    }
    loadLiveProduct();
  }, [productId]);

  // Fetch real reviews for this product from backend
  useEffect(() => {
    if (!productId) return;
    setReviewsLoading(true);
    fetchReviewsByProduct(productId)
      .then((data) => {
        setProductReviews(data.reviews || []);
        setReviewsAvg(data.averageRating || null);
      })
      .catch(() => {})
      .finally(() => setReviewsLoading(false));
  }, [productId]);

  const foundItem = useMemo(() => {
    if (liveProduct) return liveProduct;
    if (!productId) return null;

    const matched = allProducts.find(
      (product) =>
        String(product.id).toLowerCase() === String(productId).toLowerCase() ||
        product.slug?.toLowerCase() === String(productId).toLowerCase() ||
        (product.name &&
          product.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") === String(productId).toLowerCase()),
    );
    if (matched) return matched;

    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const name = sp.get("name");
      const price = sp.get("price");
      const image = sp.get("image");
      if (name || price || image) {
        return {
          id: productId,
          slug: productId,
          name: name ? decodeURIComponent(name) : productId.replace(/[-_]+/g, " "),
          description: "Exclusive luxury decoration theme handcrafted by Party Square for memorable celebrations.",
          price: Number(price?.replace(/[^0-9]/g, "")) || 4999,
          image: image ? decodeURIComponent(image) : "/homepage.png",
          category: "Decoration",
          subcategory: "Speciality Theme",
          availability: true,
          included: INCLUDED_ITEMS,
          rating: 4.8,
          reviewCount: 36,
        };
      }
    }

    return null;
  }, [liveProduct, productId]);

  // SEO & Clean URL handler
  useEffect(() => {
    if (foundItem) {
      // Dynamic SEO Title
      document.title = `${foundItem.name} | Party Square Event & Party Decoration`;

      // Automatically strip any dirty query parameters from browser address bar for pure SEO URL
      if (typeof window !== "undefined" && window.location.search) {
        window.history.replaceState(null, "", window.location.pathname);
      }

      // Dynamic SEO Meta Description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute(
        "content",
        foundItem.description || `Book ${foundItem.name} with Party Square. Best price, verified decorators, and on-time service.`
      );

      // Dynamic SEO Canonical Tag
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      if (typeof window !== "undefined") {
        canonicalLink.setAttribute("href", `https://partysquare.in${window.location.pathname}`);
      }
    }
  }, [foundItem]);

  if (!productId || (fetchingLive && !foundItem)) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <p className="text-amber-900 font-serif text-lg">Loading...</p>
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

  /* ---------------- PRICE ---------------- */

  const numericPrice = Number(String(foundItem.price).replace(/[^0-9]/g, ""));

  const totalPrice = numericPrice * quantity;

  const formattedTotalPrice = `₹${totalPrice.toLocaleString("en-IN")}`;

  const baseOriginalPrice =
    Number(String(foundItem.originalPrice || "").replace(/[^0-9]/g, "")) ||
    numericPrice * 1.25;

  const originalPrice = baseOriginalPrice * quantity;

  const formattedOriginalPrice = `₹${Math.round(originalPrice).toLocaleString("en-IN")}`;

  const discountPercent =
    originalPrice > totalPrice && totalPrice > 0
      ? Math.round(((originalPrice - totalPrice) / originalPrice) * 100)
      : 20;

  const rawRating = Number(foundItem?.rating) || 0;
  const rawReviewCount = Number(foundItem?.reviewCount) || 0;
  const hasReviews = rawRating > 0 && rawReviewCount > 0;

  const deliveryCharge = pincodeChecked ? DELIVERY_CHARGE : 0;
  const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = totalPrice + deliveryCharge + addonsTotal;
  const formattedGrandTotal = `₹${grandTotal.toLocaleString("en-IN")}`;

  const handleToggleAddon = (addon: AddOnItem) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.id === addon.id);
      if (exists) {
        toast(`Removed ${addon.name}`, { icon: "â„¹ï¸" });
        return prev.filter((a) => a.id !== addon.id);
      } else {
        toast.success(`Added ${addon.name} (+₹${addon.price.toLocaleString("en-IN")})`);
        return [...prev, addon];
      }
    });
  };

  /* ---------------- WISHLIST ---------------- */

  const liked = isInWishlist(foundItem.id);

  const handleWishlist = () => {
    toggleWishlist(foundItem);
  };

  /* ---------------- QUANTITY ---------------- */

  const handleQuantityChange = (type: any) => {
    if (type === "inc") {
      setQuantity((prev) => prev + 1);
    }

    if (type === "dec") {
      setQuantity((prev) => Math.max(1, prev - 1));
    }
  };

  /* ---------------- ADD TO CART ---------------- */

  const handleAddToCart = () => {
    addToCart(foundItem, quantity);
  };

  /* ---------------- BOOK NOW ---------------- */

  const handleBookNow = (foundItem: any) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      toast("Please login to proceed with your booking", { icon: "ðŸ”’" });
      setShowLoginModal(true);
      return;
    }

    // date / pincode / addons are added to query params
    const addonsParam = selectedAddons.length > 0 ? `&addons=${encodeURIComponent(JSON.stringify(selectedAddons))}` : "";
    const extra = `${selectedDate ? `&date=${selectedDate}` : ""}${pincodeChecked ? `&pincode=${pincode}` : ""}${selectedSlot ? `&slot=${selectedSlot === "Custom Time" ? customTime : selectedSlot}` : ""}${cityParam ? `&city=${encodeURIComponent(cityParam)}` : ""}${addonsParam}`;

    router.push(
      `/payment-detail?productId=${encodeURIComponent(foundItem.id)}${extra}`,
    );
  };

  /* ---------------- PINCODE ---------------- */

  const handleCheckPincode = () => {
    const cleanPin = pincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setPincodeChecked(false);
      setPincodeError("Please enter a valid 6-digit pincode");
      return;
    }

    // Check if this product has custom serviceable pincodes configured
    const customPins = (foundItem as any)?.serviceablePincodes;
    if (Array.isArray(customPins) && customPins.length > 0) {
      const isAllowed = customPins.some((p: string) => p.trim() === cleanPin);
      if (!isAllowed) {
        setPincodeChecked(false);
        setPincodeError(`Sorry, this package is currently not serviceable at pincode ${cleanPin}.`);
        return;
      }
    }

    setPincodeError("");
    setPincodeChecked(true);
  };

  /* ---------------- RELATED PRODUCTS ---------------- */

  const relatedProducts = allProducts
    .filter((product) => product.id !== foundItem.id)
    .slice(0, 6);

  /* ---------------- STYLE OPTIONS ---------------- */

  const category = (foundItem as any).category;

  const styleOptions = [
    foundItem,
    ...allProducts
      .filter(
        (p: any) =>
          p.id !== foundItem.id && (!category || p.category === category),
      )
      .slice(0, 3),
  ];

  const scrollToSection = (section: "overview" | "addons" | "reviews") => {
    setActiveTab2(section);
    if (section === "overview") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (section === "addons") {
      document
        .getElementById("addons")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (section === "reviews") {
      document
        .getElementById("reviews")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const scrollToAddons = () => scrollToSection("addons");
  const isCustomDate = selectedDate && !dates.some((d) => d.iso === selectedDate);

  // Collect all product images (primary + gallery)
  const galleryImages: string[] = (() => {
    const list: string[] = [];
    if (foundItem?.image) list.push(foundItem.image);
    if (Array.isArray(foundItem?.images)) {
      foundItem.images.forEach((img: string) => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    return list.length > 0 ? list : [foundItem?.image || "/birthdaydesign.png"];
  })();

  // Calendar Modal calculations
  const calendarYear = calendarViewDate.getFullYear();
  const calendarMonth = calendarViewDate.getMonth();
  const firstDayOfWeek = new Date(calendarYear, calendarMonth, 1).getDay();
  const totalDaysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const todayIso = toISO(new Date());

  const isCurrentOrPastMonth = (() => {
    const now = new Date();
    return (
      calendarYear < now.getFullYear() ||
      (calendarYear === now.getFullYear() && calendarMonth <= now.getMonth())
    );
  })();

  const handlePrevMonth = () => {
    if (!isCurrentOrPastMonth) {
      setCalendarViewDate(new Date(calendarYear, calendarMonth - 1, 1));
    }
  };

  const handleNextMonth = () => {
    setCalendarViewDate(new Date(calendarYear, calendarMonth + 1, 1));
  };

  const handleSelectDateFromCalendar = (dayNumber: number) => {
    const selected = new Date(calendarYear, calendarMonth, dayNumber);
    const iso = toISO(selected);
    setSelectedDate(iso);
    setIsCalendarModalOpen(false);
  };

  const displayIncluded: string[] =
    Array.isArray(foundItem?.included) && foundItem.included.length > 0
      ? foundItem.included
      : INCLUDED_ITEMS;

  const displayNotIncluded: string[] =
    Array.isArray(foundItem?.notIncluded) && foundItem.notIncluded.length > 0
      ? foundItem.notIncluded
      : NOT_INCLUDED_ITEMS;

  const displayFaqs: Array<{ question: string; answer: string }> = (() => {
    if (Array.isArray(foundItem?.faqs) && foundItem.faqs.length > 0) {
      return foundItem.faqs.map((f: any) => ({
        question: f.question || f.q || "",
        answer: f.answer || f.a || "",
      }));
    }
    return DEFAULT_FAQS;
  })();

  const customCancellation: string = foundItem?.cancellationPolicy || "";

  /* ---------------- PAGE ---------------- */

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1A1A] font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-28">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-neutral-500 mb-4 flex-wrap">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 hover:text-amber-800 transition"
          >
            <ArrowLeft size={14} />
            Back
          </button>

          <ChevronRight size={13} className="text-neutral-400 shrink-0" />

          <Link href="/" className="hover:text-amber-800 transition">
            Home
          </Link>

          {cityParam && (
            <>
              <ChevronRight size={13} className="text-neutral-400 shrink-0" />
              <Link href={`/${cityParam.toLowerCase()}`} className="hover:text-amber-800 transition capitalize">
                {cityParam}
              </Link>
            </>
          )}

          {categoryParam && (
            <>
              <ChevronRight size={13} className="text-neutral-400 shrink-0" />
              <Link
                href={cityParam ? `/${cityParam.toLowerCase()}/${categoryParam.toLowerCase()}` : `/services/${categoryParam.toLowerCase()}`}
                className="hover:text-amber-800 transition capitalize"
              >
                {categoryParam.replace(/-/g, " ")}
              </Link>
            </>
          )}

          <ChevronRight size={13} className="text-neutral-400 shrink-0" />

          <span className="text-neutral-900 font-medium truncate max-w-xs sm:max-w-md">
            {foundItem.name}
          </span>
        </div>

        

        {/* MAIN PRODUCT SECTION */}

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          {/* =================================================
              LEFT - IMAGE + TRUST STRIP + INFO TABS
          ================================================== */}

          <div className="lg:col-span-6 w-full min-w-0 max-w-full lg:sticky lg:top-24 self-start">
            <div className="flex flex-col-reverse sm:grid sm:grid-cols-12 gap-3 sm:gap-4">
              {/* THUMBNAILS */}

              <div className="sm:col-span-2 flex sm:flex-col flex-row gap-2 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 scrollbar-none">
                {galleryImages.slice(0, 5).map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-12 sm:w-auto sm:h-[58px] shrink-0 rounded-xl overflow-hidden border bg-white cursor-pointer transition ${
                      activeImageIndex === idx
                        ? "border-[#8CBC67] ring-2 ring-[#8CBC67]/30 shadow-sm"
                        : "border-[#E8E8E3] hover:border-[#8CBC67]/50"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${foundItem.name} preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {galleryImages.length > 5 && (
                  <div className="w-12 h-12 sm:w-auto sm:h-[58px] shrink-0 rounded-xl bg-neutral-100 border border-[#E8E8E3] flex items-center justify-center text-[11px] font-semibold text-[#6B706C]">
                    +{galleryImages.length - 5}
                  </div>
                )}
              </div>

              {/* MAIN IMAGE */}

              <div className="sm:col-span-10 w-full">
                <div className="relative aspect-[4/3] sm:aspect-[4/3] max-h-[380px] sm:max-h-[420px] rounded-2xl overflow-hidden bg-neutral-100 border border-[#E8E8E3] shadow-sm flex items-center justify-center">
                  <img
                    src={galleryImages[activeImageIndex] || foundItem.image}
                    alt={foundItem.name}
                    className="w-full h-full object-cover transition duration-700 hover:scale-[1.03]"
                  />

                  {/* PRODUCT BADGE */}

                  <div className="absolute top-5 left-5">
                    <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-amber-900 px-4 py-2 rounded-full text-xs font-bold shadow-sm">
                      <Sparkles size={13} />
                      Premium Product
                    </span>
                  </div>

                  {/* WISHLIST */}

                  <button
                    onClick={handleWishlist}
                    className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition cursor-pointer"
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

                  <div className="absolute bottom-5 right-5 bg-black/65 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                    {activeImageIndex + 1} / {galleryImages.length}
                  </div>

                  {/* LEFT ARROW */}

                  {galleryImages.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === 0 ? galleryImages.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-neutral-800 transition cursor-pointer"
                    >
                      ‹
                    </button>
                  )}

                  {/* RIGHT ARROW */}

                  {galleryImages.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === galleryImages.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-neutral-800 transition cursor-pointer"
                    >
                      ›
                    </button>
                  )}
                </div>
              </div>
            </div>


            {/* TRUST STRIP (4 items) */}

            <div className="mt-4 bg-white border border-amber-100 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-amber-100">
                {[
                  { Icon: ShieldCheck, text: "Secured payment" },
                  { Icon: Clock, text: "100% service record" },
                  { Icon: Camera, text: "Original photos & reviews" },
                  { Icon: RotateCcw, text: "100% satisfaction guaranteed" },
                ].map(({ Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 px-3 py-4 text-xs font-medium text-neutral-700"
                  >
                    <Icon size={18} className="text-amber-700 shrink-0" />
                    <span className="leading-tight">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------- INFO CARD WITH 8 TABS ---------- */}

            <section className="mt-4 bg-white rounded-2xl sm:rounded-3xl border border-[#E8E8E3] shadow-xs p-4 sm:p-6 w-full max-w-full min-w-0 overflow-hidden">
              {/* TAB PILLS WITH SMOOTH HORIZONTAL SCROLL & ARROWS */}
              <div className="relative pb-3 border-b border-[#E8E8E3]">
                <div className="flex items-center gap-1.5">
                  {/* Left scroll arrow */}
                  <button
                    type="button"
                    onClick={() => scrollTabs("left")}
                    aria-label="Scroll tabs left"
                    className="w-7 h-7 shrink-0 rounded-full bg-[#FCFBF7] border border-[#E8E8E3] hover:border-[#8CBC67] hover:bg-[#EEF6EB] text-[#202522] flex items-center justify-center transition shadow-2xs cursor-pointer"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  {/* Scrollable tabs track */}
                  <div
                    ref={tabsScrollRef}
                    onWheel={(e) => {
                      if (e.deltaY !== 0 && tabsScrollRef.current) {
                        tabsScrollRef.current.scrollLeft += e.deltaY;
                      }
                    }}
                    className="flex gap-2 overflow-x-auto scroll-smooth py-1 px-1 scrollbar-none select-none cursor-grab active:cursor-grabbing"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {INFO_TABS.map((tab) => {
                      const isActive = activeTab === tab.key;
                      return (
                        <button
                          key={tab.key}
                          type="button"
                          onClick={(e) => {
                            setActiveTab(tab.key);
                            (e.currentTarget as HTMLElement).scrollIntoView({
                              behavior: "smooth",
                              inline: "center",
                              block: "nearest"
                            });
                          }}
                          className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 cursor-pointer ${
                            isActive
                              ? "bg-[#EEF6E8] text-[#202522] shadow-xs border border-[#8CBC67] font-bold ring-1 ring-[#8CBC67]/30"
                              : "text-[#6B706C] hover:text-[#202522] hover:bg-[#EEF6EB]/40 border border-transparent"
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Right scroll arrow */}
                  <button
                    type="button"
                    onClick={() => scrollTabs("right")}
                    aria-label="Scroll tabs right"
                    className="w-7 h-7 shrink-0 rounded-full bg-[#FCFBF7] border border-[#E8E8E3] hover:border-[#8CBC67] hover:bg-[#EEF6EB] text-[#202522] flex items-center justify-center transition shadow-2xs cursor-pointer"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* 1. OVERVIEW */}

              {activeTab === "overview" && (
                <div id="overview" className="mt-5 space-y-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 leading-tight">
                      Turn Your Special Moments Into Magical Memories
                    </h2>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-neutral-600">
                      {foundItem?.description ||
                        "Grand celebration decoration designed to create a royal and memorable setting for your special day."}
                    </p>
                  </div>

                  {/* 4 Feature Badges (Matching Client Wireframe & Brand Palette) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="rounded-2xl bg-[#EEF6E8] border border-[#E8E8E3] p-4 transition hover:border-[#8CBC67]">
                      <Sparkles size={20} className="text-[#8CBC67]" />
                      <p className="mt-3 text-xs font-bold text-[#202522]">
                        Premium Product
                      </p>
                      <p className="text-[11px] text-[#6B706C] mt-0.5">Quality</p>
                    </div>

                    <div className="rounded-2xl bg-[#EEF6E8] border border-[#E8E8E3] p-4 transition hover:border-[#8CBC67]">
                      <CheckCircle2 size={20} className="text-[#8CBC67]" />
                      <p className="mt-3 text-xs font-bold text-[#202522]">
                        Verified
                      </p>
                      <p className="text-[11px] text-[#6B706C] mt-0.5">Quality</p>
                    </div>

                    <div className="rounded-2xl bg-[#EEF6E8] border border-[#E8E8E3] p-4 transition hover:border-[#8CBC67]">
                      <Truck size={20} className="text-[#8CBC67]" />
                      <p className="mt-3 text-xs font-bold text-[#202522]">
                        On-Time
                      </p>
                      <p className="text-[11px] text-[#6B706C] mt-0.5">Setup</p>
                    </div>

                    <div className="rounded-2xl bg-[#EEF6E8] border border-[#E8E8E3] p-4 transition hover:border-[#8CBC67]">
                      <Calendar size={20} className="text-[#8CBC67]" />
                      <p className="mt-3 text-xs font-bold text-[#202522]">
                        Easy
                      </p>
                      <p className="text-[11px] text-[#6B706C] mt-0.5">Booking</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. INCLUSIONS */}

              {activeTab === "included" && (
                <div id="included" className="mt-5">
                  <p className="text-xs sm:text-sm text-neutral-500">
                    Everything below is provided and professionally arranged by our decorators:
                  </p>

                  <div className="mt-3 space-y-2">
                    {displayIncluded.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-3 rounded-xl border border-neutral-100 bg-neutral-50/60 px-3.5 py-2.5 text-xs sm:text-sm text-neutral-800"
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                        <span className="shrink-0 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                          Included
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. WHATS NOT INCLUDED */}

              {activeTab === "not-included" && (
                <div id="not-included" className="mt-5">
                  <p className="text-xs sm:text-sm text-neutral-500">
                    The following items or services are excluded from this decoration package:
                  </p>

                  <div className="mt-3 space-y-2">
                    {displayNotIncluded.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-3 rounded-xl border border-neutral-100 bg-neutral-50/60 px-3.5 py-2.5 text-xs sm:text-sm text-neutral-800"
                      >
                        <div className="flex items-center gap-2.5">
                          <X size={16} className="text-rose-500 shrink-0" />
                          <span>{item}</span>
                        </div>
                        <span className="shrink-0 bg-rose-50 text-rose-600 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                          Not included
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. WHY US */}

              {activeTab === "why-us" && (
                <div id="why-us" className="mt-5 space-y-3">
                  <p className="text-xs sm:text-sm text-neutral-500">
                    Why Party Square is India&apos;s trusted choice for event decorations:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    {((foundItem as any)?.whyUs && (foundItem as any).whyUs.length > 0
                      ? (foundItem as any).whyUs.map((w: string, idx: number) => {
                          const parts = w.split(":");
                          const title = parts.length > 1 ? parts[0].trim() : "Party Square Guarantee";
                          const desc = parts.length > 1 ? parts.slice(1).join(":").trim() : w;
                          return { title, desc };
                        })
                      : WHY_US_ITEMS
                    ).map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl border border-amber-100/80 bg-amber-50/40"
                      >
                        <h4 className="font-bold text-xs sm:text-sm text-neutral-900 flex items-center gap-2">
                          <Check size={15} className="text-amber-700 shrink-0" />
                          {item.title}
                        </h4>
                        <p className="text-xs text-neutral-600 mt-1 leading-relaxed pl-5">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. ABOUT THIS PACKAGE */}

              {activeTab === "about" && (
                <div id="about-package" className="mt-5 space-y-4 w-full max-w-full min-w-0 overflow-hidden break-words">
                  <div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-neutral-900">
                      About {foundItem?.name || "This Package"}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#6B706C] whitespace-pre-line break-words [overflow-wrap:anywhere]">
                      {foundItem?.fullDescription ||
                        foundItem?.description ||
                        "Carefully curated decoration experience designed by our master decorators. Perfect for intimate family events as well as grand celebrations."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 pt-1">
                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-between sm:flex-col sm:items-start">
                      <p className="text-[10px] text-neutral-500 uppercase font-semibold">Setup Duration</p>
                      <p className="text-xs sm:text-sm font-bold text-neutral-900 mt-0 sm:mt-0.5">Approx. 1.5 - 2 Hours</p>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-between sm:flex-col sm:items-start">
                      <p className="text-[10px] text-neutral-500 uppercase font-semibold">Setup Type</p>
                      <p className="text-xs sm:text-sm font-bold text-neutral-900 mt-0 sm:mt-0.5">Doorstep Professional</p>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-between sm:flex-col sm:items-start">
                      <p className="text-[10px] text-neutral-500 uppercase font-semibold">Customization</p>
                      <p className="text-xs sm:text-sm font-bold text-neutral-900 mt-0 sm:mt-0.5">Color & Theme Options</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. GUIDELINES */}

              {activeTab === "guidelines" && (
                <div id="guidelines" className="mt-5 space-y-3">
                  <p className="text-xs sm:text-sm text-neutral-500">
                    Essential setup requirements for a smooth and hassle-free experience:
                  </p>

                  <div className="space-y-2.5 mt-3">
                    {((foundItem as any)?.guidelines && (foundItem as any).guidelines.length > 0
                      ? (foundItem as any).guidelines.map((g: string, idx: number) => {
                          const parts = g.split(":");
                          const title = parts.length > 1 ? parts[0].trim() : `Guideline ${idx + 1}`;
                          const desc = parts.length > 1 ? parts.slice(1).join(":").trim() : g;
                          return { title, desc };
                        })
                      : GUIDELINES_ITEMS
                    ).map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-neutral-100 bg-neutral-50/60"
                      >
                        <h4 className="font-semibold text-xs sm:text-sm text-neutral-900 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          {item.title}
                        </h4>
                        <p className="text-xs text-neutral-600 mt-1 pl-7 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. CANCELLATION & REFUNDS */}

              {activeTab === "cancel" && (
                <div id="cancellation-refunds" className="mt-5 space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-neutral-900 mb-1">
                      Cancellation & Refund Policy
                    </h3>
                    {customCancellation ? (
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-3">
                        {customCancellation}
                      </p>
                    ) : (
                      <p className="text-xs sm:text-sm text-neutral-500 mb-3">
                        Transparent and customer-first cancellation and refund guidelines:
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CANCELLATION_REFUND_POINTS.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-neutral-100 bg-neutral-50/70"
                      >
                        <h4 className="font-bold text-xs sm:text-sm text-neutral-900 flex items-center gap-2">
                          <ShieldCheck size={16} className="text-amber-700 shrink-0" />
                          {item.title}
                        </h4>
                        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. FAQS */}

              {activeTab === "faqs" && (
                <div id="faqs" className="mt-5 space-y-3">
                  <p className="text-xs sm:text-sm text-neutral-500">
                    Frequently asked questions about booking, decorators, and setup:
                  </p>

                  <div className="space-y-2.5 mt-3">
                    {displayFaqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4 transition hover:bg-neutral-50"
                      >
                        <h4 className="font-semibold text-xs sm:text-sm text-neutral-900 flex items-start gap-2">
                          <span className="font-bold text-amber-700 shrink-0">Q:</span>
                          <span>{faq.question}</span>
                        </h4>
                        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-neutral-600 pl-5">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* =================================================
              RIGHT - PRODUCT INFO + STEP CARDS
          ================================================== */}

          <div className="lg:col-span-6 space-y-4 w-full min-w-0 max-w-full overflow-hidden">
            {/* ---------- TITLE / PRICE CARD ---------- */}

            <div className="bg-white rounded-3xl border border-amber-100 p-5 shadow-sm">
              {/* BADGE */}

              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4">
                <Sparkles size={12} />
                Verified Quality Product
              </div>

              {/* CATEGORY */}

              <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide">
                Celebration Product
              </p>

              {/* TITLE */}

              <h1 className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-neutral-900 leading-tight">
                {foundItem.name}
              </h1>

              {/* RATING & REVIEWS (Show ONLY if there are reviews/ratings given, otherwise hide as requested) */}
              {hasReviews && (
                <div className="flex items-center gap-2.5 sm:gap-3 mt-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={17}
                        className={
                          i < Math.round(rawRating)
                            ? "fill-[#D7A84B] text-[#D7A84B]"
                            : "text-neutral-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="font-bold text-neutral-900 text-sm">
                    {rawRating.toFixed(1)}
                  </span>
                  <span className="text-xs sm:text-sm text-neutral-500">
                    ({rawReviewCount.toLocaleString("en-IN")} reviews)
                  </span>
                  <span className="text-xs text-[#8CBC67] font-semibold hidden sm:inline">• Verified Decor</span>
                </div>
              )}

              {/* PRICE & DISCOUNT */}

              <div className="flex flex-wrap items-center gap-3 mt-5">
                <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                  {formattedTotalPrice}
                </span>

                <span className="text-sm text-neutral-400 line-through">
                  {formattedOriginalPrice}
                </span>

                <span className="bg-rose-50 border border-rose-200 text-rose-600 px-3 py-1 rounded-full text-xs font-bold">
                  {discountPercent}% OFF
                </span>
              </div>

              {/* UNIT PRICE (Removed for decor business; only visible if explicitly enabled via admin switch) */}
              {Boolean(foundItem?.showUnitPrice) && (
                <p className="mt-1 text-xs text-neutral-500 font-medium">
                  Unit Price: {formattedTotalPrice}
                </p>
              )}

              {/* DESCRIPTION */}

              <p className="mt-4 text-sm leading-6 text-neutral-600">
                {foundItem.description}
              </p>

              {/* FEATURE PILLS */}

              <div className="grid grid-cols-3 gap-2 mt-5">
                {[
                  { Icon: CheckCircle2, label: "Customizable" },
                  { Icon: Truck, label: "On-Time Setup" },
                  { Icon: Sparkles, label: "Premium Quality" },
                ].map(({ Icon, label }) => (
                  <div key={label} className="text-center">
                    <div className="w-9 h-9 mx-auto rounded-full bg-amber-50 flex items-center justify-center border border-amber-100">
                      <Icon size={17} className="text-amber-700" />
                    </div>

                    <p className="mt-2 text-[10px] sm:text-xs text-neutral-600">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* ---------- STEP 2: WHERE & WHEN ---------- */}

            <div className="bg-white rounded-3xl border border-amber-100 p-5 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#8CBC67] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-bold text-[#202522]">Where & when?</h3>
              </div>

              {/* PINCODE */}

              <div className="mt-4 flex gap-2">
                <div className="relative flex-1">
                  <MapPin
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    value={pincode}
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter pincode"
                    onChange={(e) => {
                      setPincode(e.target.value.replace(/\D/g, ""));
                      setPincodeChecked(false);
                      setPincodeError("");
                    }}
                    className="w-full h-11 pl-9 pr-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:border-[#8CBC67]"
                  />
                </div>

                <button
                  onClick={handleCheckPincode}
                  className={`h-11 px-5 rounded-xl text-sm font-bold flex items-center gap-1.5 transition cursor-pointer ${
                    pincodeChecked
                      ? "bg-[#EEF6E8] text-[#8CBC67]"
                      : "bg-[#8CBC67] hover:bg-[#7AB055] text-white"
                  }`}
                >
                  {pincodeChecked && <Check size={15} />}
                  {pincodeChecked ? "Checked" : "Check"}
                </button>
              </div>

              {pincodeError && (
                <p className="mt-2 text-xs font-medium text-rose-600">
                  {pincodeError}
                </p>
              )}

              {pincodeChecked && (
                <p className="mt-2 text-xs font-semibold text-emerald-700">
                  {deliveryCharge > 0
                    ? `For this pincode you have to pay delivery charge of Rs ${deliveryCharge}`
                    : "Service available in your area — free delivery for this pincode"}
                </p>
              )}

              {!pincodeChecked && !pincodeError && (
                <p className="mt-2 text-xs text-neutral-500 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-green-600" />
                  Service available in your area
                </p>
              )}

              {/* DATE CHIPS */}

              <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
                {dates.map((d) => (
                  <button
                    key={d.iso}
                    type="button"
                    onClick={() => setSelectedDate(d.iso)}
                    className={`h-[66px] rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                      selectedDate === d.iso
                        ? "border-[#8CBC67] bg-[#EEF6E8] ring-1 ring-[#8CBC67]"
                        : "border-[#E8E8E3] hover:border-[#8CBC67]"
                    }`}
                  >
                    <span className="text-[10px] font-semibold text-[#6B706C]">
                      {d.top}
                    </span>
                    <span className="text-lg font-bold text-[#202522]">
                      {d.num}
                    </span>
                  </button>
                ))}

                {/* MORE (calendar picker modal) */}
                <button
                  type="button"
                  onClick={() => {
                    if (selectedDate) {
                      const parsed = new Date(selectedDate);
                      if (!isNaN(parsed.getTime())) {
                        setCalendarViewDate(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
                      }
                    } else {
                      setCalendarViewDate(new Date());
                    }
                    setIsCalendarModalOpen(true);
                  }}
                  className={`h-[66px] rounded-xl border border-dashed flex flex-col items-center justify-center transition cursor-pointer select-none ${
                    isCustomDate
                      ? "border-[#8CBC67] bg-[#EEF6E8] ring-1 ring-[#8CBC67] text-[#202522]"
                      : "border-[#E8E8E3] hover:border-[#8CBC67] text-[#202522] hover:bg-[#EEF6E8]/40"
                  }`}
                  title="Choose from calendar"
                >
                  <Calendar size={16} className={isCustomDate ? "text-[#8CBC67]" : "text-[#6B706C]"} />
                  <span className="text-[10px] font-bold text-[#202522] mt-1">
                    {isCustomDate
                      ? new Date(selectedDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })
                      : "More"}
                  </span>
                  <span className="text-[9px] text-[#6B706C] font-medium">
                    {isCustomDate ? "Change" : "Dates"}
                  </span>
                </button>
              </div>

                {/* TIME SLOT */}
                <div className="mt-5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-800 mb-3">Time Slot</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Morning (8-12)", "Noon (12-4)", "Night (6-10)", "Full Day", "Custom Time"].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`h-[42px] rounded-xl border flex items-center justify-center text-xs font-semibold transition cursor-pointer ${selectedSlot === slot ? "border-[#D7A84B] bg-[#FDF8E1] text-neutral-900 ring-1 ring-[#D7A84B]" : "border-neutral-200 text-neutral-600 hover:border-[#D7A84B] hover:text-neutral-900"}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  {selectedSlot === "Custom Time" && (
                    <div className="mt-3">
                      <input 
                        type="text" 
                        placeholder="e.g. 10:00 AM to 2:00 PM" 
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#D7A84B] focus:ring-1 focus:ring-[#D7A84B]"
                      />
                    </div>
                  )}
                </div>
              </div>

            {/* ---------- STEP 3: MAKE IT BIGGER ---------- */}

            <div className="bg-white rounded-3xl border border-amber-100 p-5 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#8CBC67] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-bold text-[#202522]">Make it bigger</h3>
                <span className="text-xs text-neutral-400">optional</span>
              </div>

              {selectedAddons.length > 0 ? (
                <button
                  type="button"
                  onClick={scrollToAddons}
                  className="mt-4 w-full flex items-center gap-3 rounded-xl border border-[#8CBC67]/40 bg-[#EEF6EB]/50 hover:bg-[#EEF6EB] px-3.5 py-3 text-left transition cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-[#8CBC67] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    <Check size={18} strokeWidth={3} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-neutral-900">
                      {selectedAddons.length} Add-on{selectedAddons.length > 1 ? "s" : ""} selected
                    </p>
                    <p className="text-xs text-[#8CBC67] font-semibold">
                      +₹{addonsTotal.toLocaleString("en-IN")} • Tap to view/edit
                    </p>
                  </div>

                  <ChevronRight size={18} className="text-neutral-500 shrink-0" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={scrollToAddons}
                  className="mt-4 w-full flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50/50 hover:bg-amber-50 px-3.5 py-3 text-left transition cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-[#8CBC67]/20 text-[#8CBC67] flex items-center justify-center font-bold text-xs shrink-0">
                    <Plus size={18} strokeWidth={2.5} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-neutral-900">
                      Add-ons & Extras
                    </p>
                    <p className="text-xs text-neutral-500">
                      Balloons, Roses, Fairy lights & more
                    </p>
                  </div>

                  <ChevronRight size={18} className="text-neutral-500 shrink-0" />
                </button>
              )}
            </div>

            {/* ---------- SUMMARY + ACTIONS ---------- */}

            <div className="bg-white rounded-3xl border border-amber-100 p-5 shadow-sm">
              <div className="rounded-xl bg-amber-50/70 border border-amber-100 px-4 py-3 text-sm space-y-2">
                <div className="flex justify-between gap-3 text-neutral-700">
                  <span className="truncate">
                    {foundItem.name}
                    {quantity > 1 ? ` Ã— ${quantity}` : ""}
                  </span>
                  <span className="font-semibold shrink-0">
                    {formattedTotalPrice}
                  </span>
                </div>

                {selectedAddons.map((ad) => (
                  <div key={ad.id} className="flex justify-between items-center text-xs text-neutral-700">
                    <span className="truncate pr-2 flex items-center gap-1.5">
                      <span className="text-[#8CBC67] font-bold">+</span>
                      <span className="truncate">{ad.name}</span>
                    </span>
                    <span className="font-semibold shrink-0">
                      ₹{ad.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}

                {pincodeChecked && deliveryCharge > 0 && (
                  <div className="flex justify-between text-neutral-700">
                    <span>
                      Delivery Charges
                      <span className="block text-xs text-neutral-400">
                        Checked for {pincode}
                      </span>
                    </span>
                    <span className="font-semibold">₹{deliveryCharge}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-semibold text-neutral-700">
                  Total
                </span>
                <span className="text-2xl font-extrabold text-neutral-900">
                  {formattedGrandTotal}
                </span>
              </div>

              {/* QUANTITY */}

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-semibold text-neutral-700">
                  Quantity
                </span>

                <div className="flex items-center border border-amber-300 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => handleQuantityChange("dec")}
                    className="w-10 h-10 flex items-center justify-center text-amber-800 hover:bg-amber-50 transition cursor-pointer"
                  >
                    <Minus size={15} />
                  </button>

                  <span className="w-10 text-center text-sm font-bold">
                    {quantity}
                  </span>

                  <button
                    onClick={() => handleQuantityChange("inc")}
                    className="w-10 h-10 flex items-center justify-center text-amber-800 hover:bg-amber-50 transition cursor-pointer"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              {/* ACTION BUTTONS */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                <button
                  onClick={handleAddToCart}
                  className="h-12 rounded-full border border-[#E8E8E3] hover:border-[#8CBC67] bg-white hover:bg-[#EEF6EB]/60 text-[#202522] font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <ShoppingBag size={17} className="text-[#8CBC67]" />

                  <span>Add to Basket</span>
                </button>

                <button
                  onClick={() => handleBookNow(foundItem)}
                  className="h-12 rounded-full bg-[#8CBC67] hover:bg-[#7AB055] text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg cursor-pointer"
                >
                  <Calendar size={17} />

                  <span>Book Now</span>
                </button>
              </div>

              {/* CHECKOUT MESSAGE */}

              <p className="text-center text-xs text-neutral-400 mt-4">
                Secure checkout • Guaranteed satisfaction
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            ABOUT THIS PACKAGE DETAILED SECTION (As requested by client)
        ====================================================== */}
        {(foundItem?.fullDescription || foundItem?.description) && (
          <div id="about" className="scroll-mt-28 mt-10">
            <section className="bg-white rounded-3xl border border-[#E8E8E3] shadow-xs p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-neutral-100 gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8CBC67]">
                    Detailed Overview & Specifications
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
                    About the Package
                  </h3>
                </div>
                <span className="text-xs text-[#6B706C] bg-neutral-100 px-3 py-1 rounded-full font-medium w-max">
                  Verified Setup Details
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <p className="text-sm sm:text-base leading-relaxed text-[#202522] whitespace-pre-line break-words [overflow-wrap:anywhere]">
                  {foundItem?.fullDescription || foundItem?.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                  <div className="p-4 rounded-2xl bg-[#EEF6EB]/50 border border-[#8CBC67]/30">
                    <p className="text-[11px] text-[#6B706C] uppercase font-bold tracking-wider">Setup Duration</p>
                    <p className="text-sm font-bold text-[#202522] mt-1">Approx. 1.5 - 2 Hours</p>
                    <p className="text-xs text-[#6B706C] mt-0.5">Professional on-site decorator</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#EEF6EB]/50 border border-[#8CBC67]/30">
                    <p className="text-[11px] text-[#6B706C] uppercase font-bold tracking-wider">Service Mode</p>
                    <p className="text-sm font-bold text-[#202522] mt-1">Doorstep Execution</p>
                    <p className="text-xs text-[#6B706C] mt-0.5">All materials & tools included</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#EEF6EB]/50 border border-[#8CBC67]/30">
                    <p className="text-[11px] text-[#6B706C] uppercase font-bold tracking-wider">Customization</p>
                    <p className="text-sm font-bold text-[#202522] mt-1">Colors & Balloon Themes</p>
                    <p className="text-xs text-[#6B706C] mt-0.5">Tailored to your celebration</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* =====================================================
            ADD-ONS (scroll target for step 3 and the floating bar)
        ====================================================== */}
        <div id="addons" className="scroll-mt-28 mt-10">
          <AddOnSection
            currentProduct={foundItem}
            selectedAddonIds={selectedAddons.map((a) => a.id)}
            onToggleAddon={handleToggleAddon}
            isInWishlist={isInWishlist}
            toggleWishlist={toggleWishlist}
          />
        </div>

        {/* =====================================================
            CUSTOMER REVIEWS ANCHOR (#reviews) (Render only if product has reviews)
        ====================================================== */}
        {(hasReviews || productReviews.length > 0) && (
        <div id="reviews" className="scroll-mt-28 mt-12 mb-8">
          <section className="bg-white rounded-3xl border border-[#E8E8E3] shadow-xs p-6 sm:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-100 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8CBC67]">
                  Verified Customer Experiences
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
                  Reviews & Ratings for {foundItem.name}
                </h3>
              </div>

              <div className="flex items-center gap-3 bg-amber-50/80 border border-amber-200/80 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl w-max">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className={
                        i < Math.round(Number(reviewsAvg || rawRating || 5))
                          ? "fill-[#D7A84B] text-[#D7A84B]"
                          : "text-neutral-200"
                      }
                    />
                  ))}
                </div>
                <div className="border-l border-amber-200 pl-3">
                  <span className="font-extrabold text-sm text-neutral-900">
                    {reviewsAvg || rawRating || "5.0"} / 5
                  </span>
                  <span className="text-[11px] text-neutral-500 block">
                    {productReviews.length > 0 ? productReviews.length : rawReviewCount} verified reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Reviews Grid */}
            {reviewsLoading ? (
              <div className="flex items-center justify-center py-12 text-neutral-400 gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                <span className="text-sm font-medium">Loading reviews...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 mt-6">
                {(productReviews.length > 0 ? productReviews : (FALLBACK_PRODUCT_REVIEWS as any[])).map((rev) => (
                  <div
                    key={rev._id}
                    className="bg-neutral-50/80 border border-neutral-100 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 shadow-2xs hover:border-[#8CBC67]/40 transition"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={13}
                              className={
                                i < rev.rating
                                  ? "fill-[#D7A84B] text-[#D7A84B]"
                                  : "text-neutral-200"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-neutral-400 font-medium">
                          {new Date(rev.createdAt || Date.now()).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed italic">
                        "{rev.comment}"
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-200/50 flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-xs text-neutral-900">{rev.customerName}</h5>
                        {(rev.city || rev.location) && (
                          <span className="text-[10px] text-neutral-500">{rev.city || rev.location}</span>
                        )}
                      </div>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                        <CheckCircle2 size={10} />
                        {rev.status === "FEATURED" ? "Featured" : "Verified"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
        )}

      </main>

      {/* =====================================================
          FLOATING QUICK NAV (Matching Brand Theme & Color Palette)
      ====================================================== */}

      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 sm:gap-2 bg-[#202522]/95 backdrop-blur-md rounded-full p-1.5 shadow-2xl max-w-[calc(100vw-20px)] w-max border border-[#E8E8E3]/30">
        <button
          type="button"
          onClick={() => scrollToSection("overview")}
          className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold cursor-pointer transition ${
            activeTab2 === "overview"
              ? "bg-[#FCFBF7] text-[#202522] shadow-sm"
              : "text-[#FCFBF7]/85 hover:text-white"
          }`}
        >
          Overview
        </button>

        <button
          type="button"
          onClick={() => scrollToSection("addons")}
          className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold cursor-pointer transition flex items-center gap-1.5 ${
            activeTab2 === "addons"
              ? "bg-[#FCFBF7] text-[#202522] shadow-sm"
              : "text-[#FCFBF7]/85 hover:text-white"
          }`}
        >
          <span>Add-ons</span>
          {selectedAddons.length > 0 && (
            <span className="bg-[#8CBC67] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {selectedAddons.length}
            </span>
          )}
        </button>

        {(hasReviews || productReviews.length > 0) && (
          <button
            type="button"
            onClick={() => scrollToSection("reviews")}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold cursor-pointer transition ${
              activeTab2 === "reviews"
                ? "bg-[#FCFBF7] text-[#202522] shadow-sm"
                : "text-[#FCFBF7]/85 hover:text-white"
            }`}
          >
            Reviews
          </button>
        )}

        <button
          type="button"
          onClick={() => handleBookNow(foundItem)}
          className="ml-1 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#8CBC67] hover:bg-[#7AB055] active:scale-95 text-white text-xs sm:text-sm font-bold cursor-pointer transition whitespace-nowrap shadow-md flex items-center gap-1.5"
        >
          <span>₹{grandTotal.toLocaleString("en-IN")} - Book now</span>
        </button>
      </div>

      {/* =====================================================
          CALENDAR POPUP MODAL (FUTURE DATES PICKER)
      ====================================================== */}
      {isCalendarModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-amber-100 relative animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-800">
                  <Calendar size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">Select Event Date</h4>
                  <p className="text-[11px] text-neutral-500">Pick any upcoming booking date</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCalendarModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition cursor-pointer"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Month & Year Navigator */}
            <div className="flex items-center justify-between py-4">
              <button
                type="button"
                onClick={handlePrevMonth}
                disabled={isCurrentOrPastMonth}
                className="w-8 h-8 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                title="Previous Month"
              >
                <ChevronLeft size={16} />
              </button>

              <span className="font-serif font-bold text-neutral-900 text-sm">
                {calendarViewDate.toLocaleDateString("en-IN", {
                  month: "long",
                  year: "numeric",
                })}
              </span>

              <button
                type="button"
                onClick={handleNextMonth}
                className="w-8 h-8 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 transition cursor-pointer"
                title="Next Month"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase text-neutral-400 mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="h-9 w-9" />
              ))}

              {Array.from({ length: totalDaysInMonth }).map((_, i) => {
                const dayNumber = i + 1;
                const dObj = new Date(calendarYear, calendarMonth, dayNumber);
                const dIso = toISO(dObj);
                const isPast = dIso < todayIso;
                const isSelected = selectedDate === dIso;
                const isToday = dIso === todayIso;

                if (isPast) {
                  return (
                    <div
                      key={dayNumber}
                      className="h-9 w-9 flex items-center justify-center text-neutral-300 text-xs cursor-not-allowed mx-auto"
                    >
                      {dayNumber}
                    </div>
                  );
                }

                return (
                  <button
                    key={dayNumber}
                    type="button"
                    onClick={() => handleSelectDateFromCalendar(dayNumber)}
                    className={`h-9 w-9 rounded-xl flex items-center justify-center text-xs font-bold transition mx-auto cursor-pointer ${
                      isSelected
                        ? "bg-amber-800 text-white shadow-md ring-2 ring-amber-800/30 font-extrabold"
                        : isToday
                          ? "border border-amber-600 bg-amber-50 text-amber-900 hover:bg-amber-100"
                          : "hover:bg-amber-50 text-neutral-800"
                    }`}
                  >
                    {dayNumber}
                  </button>
                );
              })}
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-100 text-xs">
              <button
                type="button"
                onClick={() => {
                  setSelectedDate(todayIso);
                  setIsCalendarModalOpen(false);
                }}
                className="text-amber-800 font-semibold hover:underline cursor-pointer"
              >
                Select Today
              </button>

              <button
                type="button"
                onClick={() => setIsCalendarModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-black transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal for unauthenticated Book Now clicks */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        redirectTo={null}
        onSuccess={() => {
          setShowLoginModal(false);
          if (foundItem) {
            const extra = `${selectedDate ? `&date=${selectedDate}` : ""}${pincodeChecked ? `&pincode=${pincode}` : ""}${selectedSlot ? `&slot=${selectedSlot === "Custom Time" ? customTime : selectedSlot}` : ""}${cityParam ? `&city=${encodeURIComponent(cityParam)}` : ""}`;
            router.push(
              `/payment-detail?productId=${encodeURIComponent(foundItem.id)}${extra}`,
            );
          }
        }}
      />
    </div>
  );
}
