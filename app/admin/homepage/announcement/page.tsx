"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Megaphone,
  ArrowLeft,
  Save,
  Eye,
  Sparkles,
  Tag,
  Phone,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Info
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchHomePageSection, updateHomePageSection, HomePageSection } from "@/app/lib/api";

interface AnnouncementContent {
  text: string;
  couponCode: string;
  phone: string;
  buttonText: string;
  buttonLink: string;
  badge: string;
  showCoupon: boolean;
  showPhone: boolean;
}

const DEFAULT_CONTENT: AnnouncementContent = {
  text: "FLAT 20% OFF ON ALL EVENT BOOKINGS",
  couponCode: "PARTY20",
  phone: "+91 98765 43210",
  buttonText: "Book Now",
  buttonLink: "/services",
  badge: "LIMITED PERIOD OFFER",
  showCoupon: true,
  showPhone: true,
};

export default function AdminAnnouncementPage() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [content, setContent] = useState<AnnouncementContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const sec = await fetchHomePageSection<AnnouncementContent>("announcement");
        if (sec) {
          setIsEnabled(sec.isEnabled ?? true);
          if (sec.contentData) {
            setContent({ ...DEFAULT_CONTENT, ...sec.contentData });
          }
        }
      } catch (err: any) {
        toast.error("Loaded default configuration");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateHomePageSection("announcement", {
        title: "Top Announcement Bar",
        subtitle: "Promotional offer & helpline at very top of website",
        isEnabled,
        contentData: content,
      });
      toast.success("Top Announcement Bar updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update announcement");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#E8E8E3] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Link
              href="/admin/homepage"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B706C] hover:text-[#202522]"
            >
              <ArrowLeft size={14} /> Back to Homepage Sections
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Megaphone size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#111111]">
                Top Announcement Bar
              </h1>
              <p className="text-xs text-[#6B706C]">
                Promotional headline banner displayed at the absolute top of every public customer page.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2.5 cursor-pointer bg-neutral-50 px-4 py-2 rounded-xl border border-[#E8E8E3]">
            <span className="text-xs font-medium text-[#202522]">
              {isEnabled ? "Visible on Frontend" : "Hidden"}
            </span>
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-10 h-5 rounded-full transition-colors relative ${
                isEnabled ? "bg-[#8CBC67]" : "bg-neutral-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-0.5 ${
                  isEnabled ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </div>
          </label>

          <button
            onClick={handleSave}
            disabled={isSaving || isLoading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8CBC67] text-white text-xs font-semibold hover:bg-[#7ba859] transition-all shadow-sm disabled:opacity-50"
          >
            {isSaving ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Live Interactive Preview */}
      <div className="bg-white border border-[#E8E8E3] rounded-2xl p-5 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B706C] flex items-center gap-1.5">
            <Eye size={14} /> Live Visual Preview (How it looks on site)
          </span>
          {!isEnabled && (
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Notice: Announcement is currently hidden
            </span>
          )}
        </div>

        <div className="rounded-xl overflow-hidden border border-emerald-950/40 shadow-inner">
          <div className="w-full bg-[#132c20] text-white text-xs sm:text-sm font-medium py-2.5 px-4 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              {content.badge && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#8CBC67] text-[#132c20]">
                  <Sparkles size={11} />
                  {content.badge}
                </span>
              )}
              <span className="font-semibold text-emerald-50 tracking-wide">
                {content.text || "Announcement Text Preview"}
              </span>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {content.showCoupon && content.couponCode && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-600/40 text-emerald-200 text-xs font-mono font-bold">
                  <Tag size={12} className="text-[#8CBC67]" />
                  <span>Use Code: <strong className="text-white">{content.couponCode}</strong></span>
                </div>
              )}

              {content.showPhone && content.phone && (
                <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-200">
                  <Phone size={12} className="text-[#8CBC67]" />
                  <span>{content.phone}</span>
                </div>
              )}

              {content.buttonText && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#132c20]">
                  <span>{content.buttonText}</span>
                  <ArrowRight size={12} />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSave} className="bg-white border border-[#E8E8E3] rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-[#111111] pb-3 border-b border-[#E8E8E3]">
          Announcement Content & Offer Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Promotional Announcement Headline *
            </label>
            <input
              type="text"
              required
              value={content.text}
              onChange={(e) => setContent({ ...content, text: e.target.value })}
              placeholder="e.g. FLAT 20% OFF ON ALL EVENT BOOKINGS"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Badge Tag (Left pill)
            </label>
            <input
              type="text"
              value={content.badge}
              onChange={(e) => setContent({ ...content, badge: e.target.value })}
              placeholder="e.g. LIMITED PERIOD OFFER"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Discount Coupon Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={content.couponCode}
                onChange={(e) => setContent({ ...content, couponCode: e.target.value.toUpperCase() })}
                placeholder="e.g. PARTY20"
                className="w-full px-4 py-2.5 text-sm font-mono font-bold tracking-wider rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none transition-colors uppercase"
              />
              <label className="flex items-center gap-1.5 text-xs text-[#6B706C] shrink-0 px-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={content.showCoupon}
                  onChange={(e) => setContent({ ...content, showCoupon: e.target.checked })}
                  className="rounded text-[#8CBC67] focus:ring-[#8CBC67]"
                />
                <span>Show</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Customer Helpline / Phone
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={content.phone}
                onChange={(e) => setContent({ ...content, phone: e.target.value })}
                placeholder="e.g. +91 98765 43210"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none transition-colors"
              />
              <label className="flex items-center gap-1.5 text-xs text-[#6B706C] shrink-0 px-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={content.showPhone}
                  onChange={(e) => setContent({ ...content, showPhone: e.target.checked })}
                  className="rounded text-[#8CBC67] focus:ring-[#8CBC67]"
                />
                <span>Show</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Button Text (CTA)
            </label>
            <input
              type="text"
              value={content.buttonText}
              onChange={(e) => setContent({ ...content, buttonText: e.target.value })}
              placeholder="e.g. Book Now"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none transition-colors"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Button Link URL
            </label>
            <input
              type="text"
              value={content.buttonLink}
              onChange={(e) => setContent({ ...content, buttonLink: e.target.value })}
              placeholder="e.g. /services or /Festivals/diwali"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none transition-colors font-mono"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#E8E8E3] flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#8CBC67] text-white text-sm font-semibold hover:bg-[#7ba859] transition-all shadow-sm"
          >
            <Save size={16} />
            <span>Save Announcement Bar</span>
          </button>
        </div>
      </form>
    </div>
  );
}
