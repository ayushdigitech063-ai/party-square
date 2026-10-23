"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  RefreshCw,
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchHomePageSection, updateHomePageSection } from "@/app/lib/api";

interface PointItem {
  title: string;
  desc: string;
}

interface SEOContentData {
  mainHeading: string;
  introParagraph: string;
  subHeading: string;
  servicesIntro: string;
  points: PointItem[];
}

const DEFAULT_DATA: SEOContentData = {
  mainHeading: "Party Square - Your Ultimate Event Planner & Decoration Specialists",
  introParagraph:
    "Are you searching for the perfect birthday party decoration that will make your child's special day unforgettable? Look no further! Party Square is your dedicated, detail-oriented birthday event planner, specializing in creating magical and seamless celebrations. We don't just plan events; we craft experiences that perfectly match your vision and exceed every expectation.",
  subHeading: "Our Uniquely Crafted Services",
  servicesIntro:
    "As a leading kids birthday decoration and event planning company, we offer a comprehensive suite of services to cover every aspect of your celebration:",
  points: [
    {
      title: "Spectacular Theme Decorations",
      desc: "From fairytale castles to superhero headquarters, we transform any space into the world of your dreams. Our custom balloon arches, floral backdrops, and props create jaw-dropping visuals.",
    },
    {
      title: "2-Hour Doorstep Setup Guarantee",
      desc: "Our verified local decorators arrive punctually with all materials, commercial electric inflators, and damage-free masking tapes for 100% clean, peel-free wall installations.",
    },
    {
      title: "End-to-End Event Coordination",
      desc: "Direct support from booking to execution to ensure all customization requests, color themes, and special props are arranged smoothly.",
    },
  ],
};

export default function AdminSEOContentPage() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<SEOContentData>(DEFAULT_DATA);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const sec = await fetchHomePageSection<SEOContentData>("seo_content");
        if (sec) {
          if (typeof sec.isEnabled === "boolean") {
            setIsEnabled(sec.isEnabled);
          }
          if (sec.contentData && sec.contentData.mainHeading) {
            setFormData({
              mainHeading: sec.contentData.mainHeading || DEFAULT_DATA.mainHeading,
              introParagraph: sec.contentData.introParagraph || DEFAULT_DATA.introParagraph,
              subHeading: sec.contentData.subHeading || DEFAULT_DATA.subHeading,
              servicesIntro: sec.contentData.servicesIntro || DEFAULT_DATA.servicesIntro,
              points: Array.isArray(sec.contentData.points) && sec.contentData.points.length > 0
                ? sec.contentData.points
                : DEFAULT_DATA.points,
            });
          }
        }
      } catch (err: any) {
        toast.error("Failed to load SEO content settings");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handlePointChange = (index: number, field: "title" | "desc", value: string) => {
    const updated = [...formData.points];
    updated[index][field] = value;
    setFormData({ ...formData, points: updated });
  };

  const handleAddPoint = () => {
    setFormData({
      ...formData,
      points: [...formData.points, { title: "New Service Highlight", desc: "Service description and details..." }],
    });
  };

  const handleRemovePoint = (index: number) => {
    const updated = formData.points.filter((_, i) => i !== index);
    setFormData({ ...formData, points: updated });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateHomePageSection("seo_content", {
        title: formData.mainHeading,
        isEnabled,
        contentData: formData,
      });
      toast.success("SEO Content saved successfully! Visible on frontend.");
    } catch (err: any) {
      toast.error(err.message || "Failed to save SEO content");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E8E3]">
        <div>
          <Link
            href="/admin/homepage"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition mb-2"
          >
            <ArrowLeft size={14} /> Back to Homepage Sections
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <FileText size={20} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900">
                SEO & About Content Editor
              </h1>
              <p className="text-xs text-neutral-500">
                Displayed above the footer across the website to boost Google search ranking and explain services.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer bg-white px-3.5 py-2 rounded-xl border border-[#E8E8E3] shadow-xs">
            <span className="text-xs font-medium text-neutral-700">
              {isEnabled ? "Visible on Frontend" : "Hidden"}
            </span>
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-9 h-5 rounded-full transition-colors relative ${
                isEnabled ? "bg-[#8CBC67]" : "bg-neutral-300"
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-0.5 ${
                  isEnabled ? "translate-x-4.5" : "translate-x-0.5"
                }`}
              />
            </div>
          </label>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || loading}
            className="inline-flex items-center gap-2 bg-[#8CBC67] hover:bg-[#7AB055] text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
          >
            {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-neutral-500">
          <RefreshCw size={24} className="animate-spin mx-auto text-[#8CBC67] mb-2" />
          <p className="text-xs">Loading SEO content...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Main Content Card */}
          <div className="bg-white p-5 sm:p-7 rounded-2xl border border-[#E8E8E3] shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={14} className="text-[#8CBC67]" />
              Main SEO Header & Introduction
            </h2>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Main Green Title (H2 Header)
              </label>
              <input
                type="text"
                value={formData.mainHeading}
                onChange={(e) => setFormData({ ...formData, mainHeading: e.target.value })}
                placeholder="Party Square - Your Ultimate Event Planner & Decoration Specialists"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8E8E3] focus:border-[#8CBC67] focus:ring-1 focus:ring-[#8CBC67] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Introductory Paragraph (Keywords & Overview)
              </label>
              <textarea
                rows={4}
                value={formData.introParagraph}
                onChange={(e) => setFormData({ ...formData, introParagraph: e.target.value })}
                placeholder="Are you searching for the perfect party decoration..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8E8E3] focus:border-[#8CBC67] focus:ring-1 focus:ring-[#8CBC67] focus:outline-none"
              />
            </div>
          </div>

          {/* Subheading & Services List */}
          <div className="bg-white p-5 sm:p-7 rounded-2xl border border-[#E8E8E3] shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
              Services & Highlights Section
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Sub-heading (H3 Title)
                </label>
                <input
                  type="text"
                  value={formData.subHeading}
                  onChange={(e) => setFormData({ ...formData, subHeading: e.target.value })}
                  placeholder="Our Uniquely Crafted Services"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8E8E3] focus:border-[#8CBC67] focus:ring-1 focus:ring-[#8CBC67] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Services Intro Line
                </label>
                <input
                  type="text"
                  value={formData.servicesIntro}
                  onChange={(e) => setFormData({ ...formData, servicesIntro: e.target.value })}
                  placeholder="As a leading kids birthday decoration and event planning company..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8E8E3] focus:border-[#8CBC67] focus:ring-1 focus:ring-[#8CBC67] focus:outline-none"
                />
              </div>
            </div>

            {/* Points List */}
            <div className="pt-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                  Bullet Points / Highlights ({formData.points.length})
                </span>
                <button
                  type="button"
                  onClick={handleAddPoint}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#8CBC67] hover:underline cursor-pointer"
                >
                  <Plus size={13} /> Add Highlight Point
                </button>
              </div>

              {formData.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900">Point #{idx + 1}</span>
                    {formData.points.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePoint(idx)}
                        className="text-rose-500 hover:text-rose-700 text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    value={pt.title}
                    onChange={(e) => handlePointChange(idx, "title", e.target.value)}
                    placeholder="e.g. Spectacular Theme Decorations"
                    className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-[#E8E8E3] bg-white focus:outline-none focus:border-[#8CBC67]"
                  />

                  <textarea
                    rows={2}
                    value={pt.desc}
                    onChange={(e) => handlePointChange(idx, "desc", e.target.value)}
                    placeholder="Details about this service..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8E8E3] bg-white focus:outline-none focus:border-[#8CBC67]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
