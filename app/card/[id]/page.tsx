"use client";

import { useEffect, useMemo, useState } from "react";
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

/*
 * Delivery charge applied after the pincode is checked.
 * Keep 0 for free delivery, or replace this with an API / pincode lookup later.
 */
const DELIVERY_CHARGE = 0;

const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;

const toNumber = (v: any) => Number(String(v ?? "").replace(/[â‚¹,\s]/g, "")) || 0;

const INCLUDED_ITEMS = [
  "Premium product / decoration",
  "Quality materials",
  "Professional setup support",
  "On-time service",
  "Customer support",
];

const NOT_INCLUDED_ITEMS = [
  "Venue booking charges",
  "Custom catering and food items",
  "Additional power backup",
  "Damage caused by guests",
];

const FAQS = [
  [
    "Can I customize the product?",
    "Yes. Customization can be discussed with the team according to your event requirements and selected product.",
  ],
  [
    "How early should I book?",
    "Booking in advance is recommended so the required date, materials and service team can be arranged.",
  ],
  [
    "Is setup included?",
    "The service includes the setup items described in the What's Included section.",
  ],
  [
    "How do I confirm my booking?",
    "Use the Book Now button to continue to the payment and booking flow.",
  ],
];

const INFO_TABS = [
  { key: "included", label: "Inclusions" },
  { key: "good", label: "Why us" },
  { key: "about", label: "About this package" },
  { key: "cancel", label: "Cancellation" },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);

  // New UI state (hooks must stay above the early returns)
  const [activeTab, setActiveTab] = useState("included");
  const [pincode, setPincode] = useState("");
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [pincodeError, setPincodeError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [customTime, setCustomTime] = useState("");
  const [dates, setDates] = useState<
    { iso: string; top: string; num: number }[]
  >([]);
  const [activeTab2 , setActiveTab2] = useState<"overview" | "addons">("overview");
 
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

  const productId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const foundItem = useMemo(() => {
    if (!productId) return null;

    return allProducts.find(
      (product) =>
        String(product.id) === String(productId) || product.slug === productId,
    );
  }, [productId]);

  if (!productId) {
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

  const originalPrice = numericPrice * 1.25 * quantity;

  const formattedOriginalPrice = `₹${Math.round(originalPrice).toLocaleString("en-IN")}`;

  const deliveryCharge = pincodeChecked ? DELIVERY_CHARGE : 0;
  const grandTotal = totalPrice + deliveryCharge;
  const formattedGrandTotal = `₹${grandTotal.toLocaleString("en-IN")}`;

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
    // date / pincode are added only when the user has chosen them
    const extra = `${selectedDate ? `&date=${selectedDate}` : ""}${pincodeChecked ? `&pincode=${pincode}` : ""}${selectedSlot ? `&slot=${selectedSlot === "Custom Time" ? customTime : selectedSlot}` : ""}`;

    router.push(
      `/payment-detail?productId=${encodeURIComponent(foundItem.id)}${extra}`,
    );
  };

  /* ---------------- PINCODE ---------------- */

  const handleCheckPincode = () => {
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeChecked(false);
      setPincodeError("Please enter a valid 6-digit pincode");
      return;
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

  const scrollToAddons = () =>{
    setActiveTab2("addons");
    document
      .getElementById("addons")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  const isCustomDate = selectedDate && !dates.some((d) => d.iso === selectedDate);

  /* ---------------- PAGE ---------------- */

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1A1A] font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-28">
        {/* BREADCRUMB */}

        <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 hover:text-amber-800 transition"
          >
            <ArrowLeft size={14} />
            Back
          </button>

          <span>â€º</span>

          <Link href="/" className="hover:text-amber-800 transition">
            Home
          </Link>

          <span>â€º</span>

          <span className="text-neutral-900 font-medium truncate">
            {foundItem.name}
          </span>
        </div>

        {/* MAIN PRODUCT SECTION */}

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          {/* =================================================
              LEFT - IMAGE + TRUST STRIP + INFO TABS
          ================================================== */}

          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-4">
              {/* THUMBNAILS */}

              <div className="col-span-2 flex flex-col gap-3">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className={`h-16 sm:h-[72px] rounded-xl overflow-hidden border bg-white cursor-pointer transition ${
                      item === 1
                        ? "border-amber-500 ring-2 ring-amber-100"
                        : "border-amber-100 hover:border-amber-300"
                    }`}
                  >
                    <img
                      src={foundItem.image}
                      alt={`${foundItem.name} preview ${item}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                <div className="h-16 sm:h-[72px] rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-xs font-semibold text-amber-800">
                  +5
                </div>
              </div>

              {/* MAIN IMAGE */}

              <div className="col-span-10">
                <div className="relative aspect-[16/16] rounded-3xl overflow-hidden bg-neutral-100 border border-amber-100 shadow-sm">
                  <img
                    src={foundItem.image}
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
                    1 / 5
                  </div>

                  {/* LEFT ARROW */}

                  <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-neutral-800 transition">
                    â€¹
                  </button>

                  {/* RIGHT ARROW */}

                  <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-neutral-800 transition">
                    â€º
                  </button>
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

            {/* ---------- INFO CARD WITH TABS ---------- */}

            <section className="mt-4 bg-white rounded-3xl border border-amber-100 shadow-sm p-5">
              {/* TAB PILLS */}

              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {INFO_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold border transition cursor-pointer ${
                      activeTab === tab.key
                        ? "border-amber-700 bg-amber-50 text-amber-900"
                        : "border-transparent text-neutral-500 hover:text-amber-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* WHAT'S INCLUDED */}

              {activeTab === "included" && (
                <div id="included" className="mt-4">
                  <p className="text-sm text-neutral-500">
                    Everything below arrives with your booking â€” nothing to
                    arrange yourself.
                  </p>

                  <div className="mt-3 space-y-2">
                    {INCLUDED_ITEMS.map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between gap-3 rounded-lg border border-neutral-100 px-3.5 py-2.5 text-sm text-neutral-800"
                      >
                        <span>{item}</span>
                        <span className="shrink-0 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                          Included
                        </span>
                      </div>
                    ))}
                  </div>

                  <p
                    id="not-included"
                    className="mt-5 mb-2 text-[11px] font-bold uppercase tracking-widest text-amber-800"
                  >
                    What's Not Included
                  </p>

                  <div className="space-y-2">
                    {NOT_INCLUDED_ITEMS.map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between gap-3 rounded-lg border border-neutral-100 px-3.5 py-2.5 text-sm text-neutral-800"
                      >
                        <span>{item}</span>
                        <span className="shrink-0 bg-rose-50 text-rose-600 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                          Not included
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* GOOD TO KNOW (FAQ) */}

              {activeTab === "good" && (
                <div id="faq" className="mt-4 space-y-3">
                  {FAQS.map(([question, answer]) => (
                    <div
                      key={question}
                      className="rounded-xl border border-neutral-100 bg-white p-4"
                    >
                      <h4 className="font-semibold text-sm text-neutral-900">
                        {question}
                      </h4>

                      <p className="mt-1.5 text-sm leading-6 text-neutral-600">
                        {answer}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* ABOUT THIS EXPERIENCE */}

              {activeTab === "about" && (
                <div id="overview" className="mt-4">
                  <h2 className="text-xl font-serif font-bold text-neutral-900 leading-tight">
                    Turn Your Special Moments Into Magical Memories
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-neutral-600">
                    {foundItem.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                    {[
                      { Icon: Sparkles, t: "Premium Product", s: "Quality" },
                      { Icon: CheckCircle2, t: "Verified", s: "Quality" },
                      { Icon: Truck, t: "On-Time", s: "Setup" },
                      { Icon: Calendar, t: "Easy", s: "Booking" },
                    ].map(({ Icon, t, s }) => (
                      <div key={t} className="rounded-2xl bg-amber-50 p-4">
                        <Icon size={19} className="text-amber-700" />
                        <p className="mt-3 text-xs font-semibold text-neutral-800">
                          {t}
                        </p>
                        <p className="text-[11px] text-neutral-500 mt-1">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CANCELLATION */}

              {activeTab === "cancel" && (
                <div id="cancellation" className="mt-4">
                  <h3 className="font-serif font-bold text-lg text-neutral-900 mb-2">
                    Cancellation & Rescheduling Policy
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Please contact our team as early as possible if you need to
                    cancel or reschedule your booking. Cancellation and
                    rescheduling availability may depend on the booking status,
                    event date, and preparation already completed.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* =================================================
              RIGHT - PRODUCT INFO + STEP CARDS
          ================================================== */}

          <div className="lg:col-span-5 space-y-4">
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

              {/* RATING */}

              <div className="flex items-center gap-3 mt-4">
                {foundItem?.rating && (
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
                )}
                {foundItem?.rating && (
                  <span className="font-bold text-neutral-900">
                    {foundItem?.rating}
                  </span>
                )}
                {foundItem?.reviewCount && (
                  <span className="text-sm text-neutral-500">
                    ({foundItem?.reviewCount} reviews)
                  </span>
                )}
              </div>

              {/* PRICE */}

              <div className="flex flex-wrap items-center gap-3 mt-5">
                <span className="text-3xl font-extrabold text-neutral-900">
                  {formattedTotalPrice}
                </span>

                <span className="text-sm text-neutral-400 line-through">
                  {formattedOriginalPrice}
                </span>

                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold">
                  20% OFF
                </span>
              </div>

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
                <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-bold text-neutral-900">Where & when?</h3>
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
                    className="w-full h-11 pl-9 pr-3 rounded-xl border border-amber-200 bg-amber-50/40 text-sm focus:outline-none focus:border-amber-700"
                  />
                </div>

                <button
                  onClick={handleCheckPincode}
                  className={`h-11 px-5 rounded-xl text-sm font-bold flex items-center gap-1.5 transition cursor-pointer ${
                    pincodeChecked
                      ? "bg-amber-100 text-amber-900"
                      : "bg-amber-800 hover:bg-amber-900 text-white"
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
                    : "Service available in your area â€” free delivery for this pincode"}
                </p>
              )}

              {!pincodeChecked && !pincodeError && (
                <p className="mt-2 text-xs text-neutral-500 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-green-600" />
                  Service available in your area
                </p>
              )}

              {/* DATE CHIPS */}

              <div className="mt-4 grid grid-cols-6 gap-2">
                {dates.map((d) => (
                  <button
                    key={d.iso}
                    type="button"
                    onClick={() => setSelectedDate(d.iso)}
                    className={`h-[66px] rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                      selectedDate === d.iso
                        ? "border-amber-700 bg-amber-50 ring-1 ring-amber-700"
                        : "border-neutral-200 hover:border-amber-400"
                    }`}
                  >
                    <span className="text-[10px] font-semibold text-neutral-500">
                      {d.top}
                    </span>
                    <span className="text-lg font-bold text-neutral-900">
                      {d.num}
                    </span>
                  </button>
                ))}

                {/* MORE (native date picker) */}

                <label
                  className={`relative h-[66px] rounded-xl border border-dashed flex flex-col items-center justify-center cursor-pointer transition ${
                    isCustomDate
                      ? "border-amber-700 bg-amber-50 ring-1 ring-amber-700"
                      : "border-neutral-300 hover:border-amber-400"
                  }`}
                >
                  <Calendar size={16} className="text-neutral-700" />
                  <span className="text-[10px] font-semibold text-neutral-600 mt-1">
                    {isCustomDate
                      ? new Date(selectedDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })
                      : "More"}
                  </span>
                  <input
                    type="date"
                    min={dates[0]?.iso}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </label>
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
                <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-bold text-neutral-900">Make it bigger</h3>
                <span className="text-xs text-neutral-400">optional</span>
              </div>

              <button
                type="button"
                onClick={scrollToAddons}
                className="mt-4 w-full flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50/50 hover:bg-amber-50 px-3 py-3 text-left transition cursor-pointer"
              >
                <div className="flex -space-x-2">
                  {relatedProducts.slice(0, 3).map((p: any) => (
                    <img
                      key={p.id}
                      src={p.image}
                      alt={p.name}
                      className="w-9 h-9 rounded-full object-cover border-2 border-white"
                    />
                  ))}
                  {relatedProducts.length > 3 && (
                    <span className="w-9 h-9 rounded-full bg-amber-800 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                      +{relatedProducts.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-neutral-900">
                    Add-ons & more
                  </p>
                  <p className="text-xs text-neutral-500">
                    Complete your celebration Â· same visit
                  </p>
                </div>

                <ChevronRight size={18} className="text-neutral-500 shrink-0" />
              </button>
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

                {pincodeChecked && deliveryCharge > 0 && (
                  <div className="flex justify-between text-neutral-700">
                    <span>
                      Delivery Charges
                      <span className="block text-xs text-neutral-400">
                        Checked for {pincode}
                      </span>
                    </span>
                    <span className="font-semibold">â‚¹{deliveryCharge}</span>
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
                  className="h-12 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <ShoppingBag size={17} />

                  <span>Add to Basket</span>
                </button>

                <button
                  onClick={() => handleBookNow(foundItem)}
                  className="h-12 rounded-xl bg-[#8CBC67] hover:bg-[#7AB055] text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg cursor-pointer"
                >
                  <Calendar size={17} />

                  <span>Book Now</span>
                </button>
              </div>

              {/* CHECKOUT MESSAGE */}

              <p className="text-center text-xs text-neutral-400 mt-4">
                Secure checkout Â· Guaranteed satisfaction
              </p>
            </div>
          </div>
        </section>

        {/* ADD-ONS (scroll target for step 3 and the floating bar) */}

        <div id="addons" className="scroll-mt-28">
          <AddOnSection
            currentProduct={foundItem}
            isInWishlist={isInWishlist}
            toggleWishlist={toggleWishlist}
          />
        </div>
      </main>

      {/* =====================================================
          FLOATING QUICK NAV
      ====================================================== */}

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 bg-neutral-900/90 backdrop-blur-md rounded-full p-1.5 shadow-2xl">
        <button
          onClick={() =>{setActiveTab2("overview"); window.scrollTo({ top: 0, behavior: "smooth" })}}
          className={`px-4 py-2 rounded-full text-neutral-900 text-xs font-bold cursor-pointer ${activeTab2 === 'overview' ? "bg-white text-neutral-900" : "text-white/90 hover:text-white"}`}
        >
          Overview
        </button>

        <button
          onClick={scrollToAddons}
          className={`px-4 py-2 rounded-full text-nautral-900 text-xs font-bold cursor-pointer ${activeTab2 === 'addons' ? "bg-white text-neutral-900"
      : "text-white/90 hover:text-white"}`}
        >
          Add-ons
        </button>

        <button
          onClick={() => handleBookNow(foundItem)}
          className="px-4 py-2 rounded-full bg-[#8CBC67] hover:bg-[#7AB055] text-white text-xs font-bold cursor-pointer transition"
        >
          {formattedGrandTotal} → Book now
        </button>
      </div>
    </div>
  );
}
