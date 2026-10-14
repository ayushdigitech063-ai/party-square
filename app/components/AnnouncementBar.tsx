"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Tag, Phone, Sparkles, X, ArrowRight, Check } from "lucide-react";
import { fetchHomePageSection, HomePageSection } from "../lib/api";

interface AnnouncementData {
  text?: string;
  couponCode?: string;
  phone?: string;
  buttonText?: string;
  buttonLink?: string;
  badge?: string;
  showCoupon?: boolean;
  showPhone?: boolean;
}

const DEFAULT_ANNOUNCEMENT: AnnouncementData = {
  text: "FLAT 20% OFF ON ALL EVENT BOOKINGS",
  couponCode: "PARTY20",
  phone: "+91 98765 43210",
  buttonText: "Book Now",
  buttonLink: "/services",
  badge: "LIMITED PERIOD OFFER",
  showCoupon: true,
  showPhone: true,
};

export default function AnnouncementBar() {
  const [data, setData] = useState<AnnouncementData>(DEFAULT_ANNOUNCEMENT);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    try {
      const dismissed = sessionStorage.getItem("ps_announcement_dismissed");
      if (dismissed === "true") {
        setIsDismissed(true);
      }
    } catch (e) {}

    let isMounted = true;
    async function loadData() {
      try {
        const res = await fetchHomePageSection<AnnouncementData>("announcement");
        if (isMounted && res) {
          if (typeof res.isEnabled === "boolean") {
            setIsEnabled(res.isEnabled);
          }
          if (res.contentData) {
            setData((prev) => ({ ...prev, ...res.contentData }));
          }
        }
      } catch (err) {
        // Fallback default retains silently
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem("ps_announcement_dismissed", "true");
    } catch (e) {}
  };

  const handleCopyCoupon = (code: string) => {
    if (!code) return;
    try {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {}
  };

  if (!isEnabled || isDismissed) {
    return null;
  }

  return (
    <div className="relative w-full bg-[#132c20] text-white text-xs sm:text-sm font-medium z-40 border-b border-emerald-950/40 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2 sm:gap-4 flex-wrap md:flex-nowrap">
        
        {/* Left: Badge + Main Text */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap min-w-0">
          {data.badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-[#8CBC67] text-[#132c20] shadow-sm shrink-0">
              <Sparkles size={11} className="shrink-0" />
              {data.badge}
            </span>
          )}

          <span className="font-semibold text-emerald-50 tracking-wide truncate max-w-[260px] sm:max-w-none">
            {data.text || DEFAULT_ANNOUNCEMENT.text}
          </span>
        </div>

        {/* Center / Right: Coupon + Phone + CTA Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto md:ml-0 flex-wrap">
          {data.showCoupon !== false && data.couponCode && (
            <button
              onClick={() => handleCopyCoupon(data.couponCode!)}
              title="Click to copy coupon code"
              className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-600/40 text-emerald-200 hover:border-emerald-400 hover:bg-emerald-900 transition-colors text-xs font-mono font-bold"
            >
              <Tag size={12} className="text-[#8CBC67]" />
              <span>Use Code: <strong className="text-white tracking-widest">{data.couponCode}</strong></span>
              {copied ? (
                <span className="text-[10px] text-[#8CBC67] flex items-center gap-0.5">
                  <Check size={11} /> Copied!
                </span>
              ) : (
                <span className="text-[10px] opacity-70 group-hover:opacity-100">Tap</span>
              )}
            </button>
          )}

          {data.showPhone !== false && data.phone && (
            <a
              href={`tel:${data.phone.replace(/[^0-9+]/g, "")}`}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs text-emerald-200 hover:text-white transition-colors"
            >
              <Phone size={12} className="text-[#8CBC67]" />
              <span>{data.phone}</span>
            </a>
          )}

          {data.buttonText && data.buttonLink && (
            <Link
              href={data.buttonLink}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#132c20] hover:bg-[#8CBC67] hover:text-white transition-all shadow-sm"
            >
              <span>{data.buttonText}</span>
              <ArrowRight size={12} />
            </Link>
          )}

          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            aria-label="Dismiss announcement"
            className="p-1 rounded-full text-emerald-300 hover:text-white hover:bg-emerald-900/60 transition-colors shrink-0 ml-1"
          >
            <X size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
