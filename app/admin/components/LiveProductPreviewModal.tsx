"use client";

import React, { useState } from "react";
import {
  X,
  Eye,
  ExternalLink,
  Sparkles,
  Star,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  RotateCcw,
  Camera,
  MapPin,
  Plus,
  Minus,
  Check,
  ChevronRight,
  HelpCircle,
  AlertTriangle
} from "lucide-react";

export interface LiveProductPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: number | string;
    originalPrice?: number | string;
    image?: string;
    images?: string[];
    description?: string;
    fullDescription?: string;
    badge?: string;
    categoryName?: string;
    included?: string[];
    notIncluded?: string[];
    whyUs?: string[];
    guidelines?: string[];
    cancellationPolicy?: string;
    serviceablePincodes?: string[];
    availableCities?: string[];
  };
}

export default function LiveProductPreviewModal({
  isOpen,
  onClose,
  product,
}: LiveProductPreviewProps) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState("overview");
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [previewCity, setPreviewCity] = useState("Jaipur");
  const [testPincode, setTestPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<"idle" | "success" | "error">("idle");
  const [pincodeMsg, setPincodeMsg] = useState("");

  const salePrice = Number(product.price) || 2499;
  const originalPrice = product.originalPrice ? Number(product.originalPrice) : Math.round(salePrice * 1.25);
  const discountPercent = Math.max(10, Math.round(((originalPrice - salePrice) / originalPrice) * 100));

  const allImages = [
    product.image || "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=60",
    ...(product.images || []).filter(Boolean)
  ];
  const currentImg = allImages[activeImgIndex] || allImages[0];

  const handleTestPincode = () => {
    const clean = testPincode.trim();
    if (!/^\d{6}$/.test(clean)) {
      setPincodeStatus("error");
      setPincodeMsg("Please enter a valid 6-digit pincode.");
      return;
    }
    const pins = product.serviceablePincodes || [];
    if (pins.length > 0 && !pins.includes(clean)) {
      setPincodeStatus("error");
      setPincodeMsg(`Not serviceable at ${clean}. Allowed pincodes: ${pins.slice(0, 5).join(", ")}`);
    } else {
      setPincodeStatus("success");
      setPincodeMsg(`Service available in ${previewCity} at pincode ${clean}!`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-[#FCFBF7] rounded-3xl w-full max-w-5xl shadow-2xl border border-[#E8E8E3] overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Top Preview Bar */}
        <div className="bg-[#202522] text-white px-5 py-3.5 flex items-center justify-between shrink-0 border-b border-white/10">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8CBC67] animate-pulse" />
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8CBC67]">
                Customer Live Preview
              </span>
              <span className="text-[11px] text-neutral-400 hidden sm:inline">
                • Exactly how customers see this on the website
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Customer Viewport */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8 flex-1">
          {/* Breadcrumb preview */}
          <div className="flex items-center space-x-2 text-xs text-[#6B706C]">
            <span>Home</span>
            <ChevronRight size={12} />
            <span>{previewCity}</span>
            <ChevronRight size={12} />
            <span>{product.categoryName || "Decorations"}</span>
            <ChevronRight size={12} />
            <span className="font-bold text-[#202522] truncate max-w-xs">{product.name || "Untitled Product"}</span>
          </div>

          {/* Main 2-Column Product Detail Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Image Gallery + Trust Badges */}
            <div className="lg:col-span-6 space-y-4">
              {/* Primary Image View */}
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#EEF6EB] border border-[#E8E8E3] shadow-xs">
                <img
                  src={currentImg}
                  alt={product.name || "Product"}
                  className="w-full h-full object-cover"
                />

                <span className="absolute top-4 left-4 bg-[#F7D6C7] text-[#202522] text-xs font-bold px-3 py-1 rounded-md shadow-xs">
                  {discountPercent}% OFF
                </span>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs text-[#202522] text-[11px] font-bold px-3 py-1 rounded-full border border-[#E8E8E3] flex items-center space-x-1">
                  <Star size={12} className="fill-[#D7A84B] text-[#D7A84B]" />
                  <span>4.9 (126 reviews)</span>
                </div>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImgIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                        activeImgIndex === idx ? "border-[#8CBC67] ring-2 ring-[#8CBC67]/30" : "border-[#E8E8E3] opacity-75 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Strip */}
              <div className="bg-white border border-[#E8E8E3] rounded-2xl p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px] text-[#6B706C]">
                <div className="flex flex-col items-center p-2 rounded-xl bg-[#FCFBF7]">
                  <ShieldCheck size={18} className="text-[#8CBC67] mb-1" />
                  <span className="font-bold text-[#202522]">Secured</span>
                  <span>Payment</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-[#FCFBF7]">
                  <Clock size={18} className="text-[#8CBC67] mb-1" />
                  <span className="font-bold text-[#202522]">100% On-time</span>
                  <span>Guarantee</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-[#FCFBF7]">
                  <Camera size={18} className="text-[#8CBC67] mb-1" />
                  <span className="font-bold text-[#202522]">Original</span>
                  <span>Photos</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-[#FCFBF7]">
                  <RotateCcw size={18} className="text-[#8CBC67] mb-1" />
                  <span className="font-bold text-[#202522]">100% Happy</span>
                  <span>Promise</span>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Pricing, Pincode Test, Actions */}
            <div className="lg:col-span-6 space-y-4">
              {/* Product Heading Card */}
              <div className="bg-white rounded-3xl border border-[#E8E8E3] p-5 sm:p-6 shadow-xs space-y-3">
                <div className="inline-flex items-center space-x-1.5 bg-[#EEF6EB] text-[#8CBC67] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Sparkles size={12} />
                  <span>{product.badge || "Verified Quality Product"}</span>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#202522] leading-tight">
                  {product.name || "Product Name Here"}
                  <span className="text-sm sm:text-base font-normal text-[#6B706C] block mt-0.5">
                    in {previewCity}
                  </span>
                </h1>

                {/* Pricing row */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#202522]">
                    ₹{salePrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm text-[#6B706C] line-through font-medium">
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="bg-[#EEF6EB] text-[#8CBC67] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#8CBC67]/30">
                    Save {discountPercent}%
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#6B706C] leading-relaxed pt-1">
                  {product.description || "Grand celebration decoration designed to create a royal setting for your special day."}
                </p>
              </div>

              {/* Step 1: Pincode Live Test Card */}
              <div className="bg-white rounded-3xl border border-[#E8E8E3] p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-[#8CBC67] text-white text-xs font-bold flex items-center justify-center">1</span>
                    <h3 className="font-bold text-sm text-[#202522]">Where & When?</h3>
                  </div>
                  <span className="text-[11px] text-[#6B706C]">Live availability tester</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit pincode"
                    value={testPincode}
                    onChange={(e) => {
                      setTestPincode(e.target.value);
                      setPincodeStatus("idle");
                    }}
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-[#202522] font-mono focus:outline-none focus:border-[#8CBC67]"
                  />
                  <button
                    type="button"
                    onClick={handleTestPincode}
                    className="px-4 py-2 rounded-xl bg-[#8CBC67] hover:bg-[#7AB055] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    Check
                  </button>
                </div>

                {pincodeStatus === "success" && (
                  <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                    <CheckCircle2 size={14} className="shrink-0" />
                    <span>{pincodeMsg}</span>
                  </p>
                )}
                {pincodeStatus === "error" && (
                  <p className="text-xs text-rose-700 font-semibold flex items-center gap-1.5 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                    <AlertTriangle size={14} className="shrink-0" />
                    <span>{pincodeMsg}</span>
                  </p>
                )}
                {pincodeStatus === "idle" && (
                  <p className="text-[11px] text-[#6B706C]">
                    {(product.serviceablePincodes || []).length > 0
                      ? `Available exclusively in ${product.serviceablePincodes!.length} specific pincodes.`
                      : "Available in all serviceable areas of the selected city."}
                  </p>
                )}
              </div>

              {/* Step 2: Book Now Action Buttons */}
              <div className="bg-white rounded-3xl border border-[#E8E8E3] p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="flex-1 py-3 rounded-2xl bg-[#EEF6EB] text-[#202522] border border-[#8CBC67]/30 text-xs sm:text-sm font-bold hover:bg-[#EEF6EB]/80 transition text-center"
                  >
                    Add to Basket
                  </button>
                  <button
                    type="button"
                    className="flex-1 py-3 rounded-2xl bg-[#8CBC67] text-white text-xs sm:text-sm font-bold hover:bg-[#7AB055] transition shadow-md text-center"
                  >
                    Book Now • ₹{salePrice.toLocaleString("en-IN")}
                  </button>
                </div>
                <p className="text-[11px] text-center text-[#6B706C]">
                  🔒 100% Safe Checkout • 24hr Easy Cancellation Guarantee
                </p>
              </div>
            </div>
          </div>

          {/* 8 Tabs Strip Preview */}
          <div className="bg-white rounded-3xl border border-[#E8E8E3] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8E8E3] scrollbar-none">
              {[
                { id: "overview", label: "Overview" },
                { id: "inclusions", label: "Inclusions" },
                { id: "not-included", label: "What's not included" },
                { id: "why-us", label: "Why Us" },
                { id: "guidelines", label: "Guidelines" },
                { id: "cancel", label: "Cancellation / Refund" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-[#EEF6EB] text-[#202522] border border-[#8CBC67] ring-1 ring-[#8CBC67]/30"
                      : "bg-[#FCFBF7] text-[#6B706C] border border-[#E8E8E3] hover:text-[#202522]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            {activeTab === "overview" && (
              <div className="space-y-3 text-xs sm:text-sm text-[#6B706C] leading-relaxed">
                <p>{product.fullDescription || product.description || "No full description provided."}</p>
              </div>
            )}

            {activeTab === "inclusions" && (
              <div className="space-y-2">
                {(product.included && product.included.length > 0) ? (
                  product.included.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-[#202522]">
                      <CheckCircle2 size={15} className="text-[#8CBC67] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#6B706C]">Standard backdrop, themed balloons, fairy lights & on-site decorator.</p>
                )}
              </div>
            )}

            {activeTab === "not-included" && (
              <div className="space-y-2">
                {(product.notIncluded && product.notIncluded.length > 0) ? (
                  product.notIncluded.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-neutral-600">
                      <X size={15} className="text-rose-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#6B706C]">Teardown / cleanup service (available as separate add-on).</p>
                )}
              </div>
            )}

            {activeTab === "why-us" && (
              <div className="space-y-2">
                {(product.whyUs && product.whyUs.length > 0) ? (
                  product.whyUs.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-[#202522]">
                      <CheckCircle2 size={15} className="text-[#8CBC67] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#6B706C]">Verified professional decorators, 100% on-time guarantee, premium quality materials.</p>
                )}
              </div>
            )}

            {activeTab === "guidelines" && (
              <div className="space-y-2">
                {(product.guidelines && product.guidelines.length > 0) ? (
                  product.guidelines.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-[#202522]">
                      <span className="font-bold text-[#8CBC67]">•</span>
                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#6B706C]">Continuous electric socket required within 5-10m for balloon inflators.</p>
                )}
              </div>
            )}

            {activeTab === "cancel" && (
              <div className="space-y-2 text-xs sm:text-sm text-[#6B706C] leading-relaxed">
                <p>{product.cancellationPolicy || "Free cancellation up to 24 hours prior to scheduled event time slot with 100% full refund."}</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-white px-6 py-4 border-t border-[#E8E8E3] flex items-center justify-between shrink-0">
          <span className="text-xs text-[#6B706C]">
            Preview Mode • Click Close to return to editing
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#202522] text-white text-xs font-bold hover:bg-neutral-800 transition cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
