"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  Sliders,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Megaphone,
  Image as ImageIcon,
  Video,
  Heart,
  Wrench,
  BarChart3,
  HelpCircle,
  Eye,
  ShieldCheck
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchHomePageSections, updateHomePageSection, HomePageSection } from "@/app/lib/api";

const SECTION_METADATA: Record<
  string,
  {
    name: string;
    description: string;
    editUrl: string;
    icon: any;
    color: string;
    bgColor: string;
  }
> = {
  announcement: {
    name: "Top Announcement Bar",
    description: "Promotional discount banner with coupon code at the very top of frontend",
    editUrl: "/admin/homepage/announcement",
    icon: Megaphone,
    color: "text-amber-600",
    bgColor: "bg-amber-50 border-amber-200",
  },
  hero_banner: {
    name: "Hero Banner Slider",
    description: "Main rotating carousel slider with premium high-res photos and CTA buttons",
    editUrl: "/admin/homepage/hero",
    icon: ImageIcon,
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
  },
  video_showcase: {
    name: "Behind the Decor Artistry",
    description: "High-impact video player showcasing grand stage setups, chandeliers & floral craft",
    editUrl: "/admin/homepage/video-showcase",
    icon: Video,
    color: "text-rose-600",
    bgColor: "bg-rose-50 border-rose-200",
  },
  most_loved_decor: {
    name: "Most Loved Decorations",
    description: "Interactive circular decoration themes with instant preview and price tags",
    editUrl: "/admin/homepage/most-loved",
    icon: Heart,
    color: "text-pink-600",
    bgColor: "bg-pink-50 border-pink-200",
  },
  services: {
    name: "Our Signature Services",
    description: "Flagship wedding showcase, card categories, and quality assurance points",
    editUrl: "/admin/homepage/services",
    icon: Wrench,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 border-emerald-200",
  },
  stats: {
    name: "Trusted Stats & USP Bar",
    description: "10,000+ celebrations counter, ratings, social community and guarantees",
    editUrl: "/admin/homepage/stats",
    icon: BarChart3,
    color: "text-purple-600",
    bgColor: "bg-purple-50 border-purple-200",
  },
  faqs: {
    name: "FAQ Section",
    description: "Interactive collapsible accordion answering customer questions & booking queries",
    editUrl: "/admin/homepage/faqs",
    icon: HelpCircle,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50 border-cyan-200",
  },
};

export default function AdminHomePageHub() {
  const [sections, setSections] = useState<HomePageSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [togglingKey, setTogglingKey] = useState<string | null>(null);

  const loadSections = async () => {
    setIsLoading(true);
    try {
      const data = await fetchHomePageSections();
      setSections(data || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load homepage sections");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSections();
  }, []);

  const handleToggle = async (section: HomePageSection) => {
    const newStatus = !section.isEnabled;
    setTogglingKey(section.sectionKey);
    try {
      await updateHomePageSection(section.sectionKey, { isEnabled: newStatus });
      setSections((prev) =>
        prev.map((s) => (s.sectionKey === section.sectionKey ? { ...s, isEnabled: newStatus } : s))
      );
      toast.success(
        `${section.title || section.sectionKey} is now ${newStatus ? "Visible" : "Hidden"} on Frontend`
      );
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
    } finally {
      setTogglingKey(null);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E8E8E3] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-[#8CBC67]/15 flex items-center justify-center text-[#8CBC67]">
              <Home size={20} />
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#111111]">
              Home Page Sections Manager
            </h1>
          </div>
          <p className="text-sm text-[#6B706C]">
            Manage all dynamic sections displayed on the Party Square homepage. Toggle visibility, edit content, and customize layouts in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadSections}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E8E8E3] bg-white text-xs font-semibold text-[#202522] hover:border-[#8CBC67] hover:text-[#8CBC67] transition-all"
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8CBC67] text-white text-xs font-semibold hover:bg-[#7ba859] transition-all shadow-sm"
          >
            <Eye size={14} />
            <span>View Live Site</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Grid of Sections */}
      {isLoading ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-[#E8E8E3]">
          <RefreshCw className="w-8 h-8 text-[#8CBC67] animate-spin mx-auto mb-3" />
          <p className="text-sm text-[#6B706C]">Loading homepage sections from database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {sections.map((section, idx) => {
            const meta = SECTION_METADATA[section.sectionKey] || {
              name: section.title,
              description: section.subtitle || "Homepage section",
              editUrl: `/admin/homepage/${section.sectionKey}`,
              icon: Sliders,
              color: "text-emerald-600",
              bgColor: "bg-emerald-50 border-emerald-200",
            };
            const IconComponent = meta.icon;

            return (
              <div
                key={section.sectionKey}
                className="bg-white rounded-2xl border border-[#E8E8E3] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar inside card */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center border ${meta.bgColor} ${meta.color}`}
                      >
                        <IconComponent size={22} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-[#6B706C]">
                            #{idx + 1}
                          </span>
                          <h3 className="font-semibold text-base text-[#111111] group-hover:text-[#8CBC67] transition-colors">
                            {meta.name}
                          </h3>
                        </div>
                        <p className="text-xs text-[#6B706C] mt-0.5 font-mono">
                          {section.sectionKey}
                        </p>
                      </div>
                    </div>

                    {/* Enable / Disable switch */}
                    <button
                      onClick={() => handleToggle(section)}
                      disabled={togglingKey === section.sectionKey}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        section.isEnabled ? "bg-[#8CBC67]" : "bg-neutral-300"
                      }`}
                      title={section.isEnabled ? "Click to disable" : "Click to enable"}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${
                          section.isEnabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <p className="text-xs text-[#6B706C] leading-relaxed mb-4">
                    {meta.description}
                  </p>

                  {/* Status Pills */}
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                        section.isEnabled
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-neutral-100 text-neutral-500 border-neutral-200"
                      }`}
                    >
                      {section.isEnabled ? (
                        <>
                          <CheckCircle2 size={12} /> Active on Homepage
                        </>
                      ) : (
                        <>
                          <XCircle size={12} /> Hidden
                        </>
                      )}
                    </span>

                    {section.contentData && (
                      <span className="text-[11px] text-[#6B706C] bg-neutral-50 px-2.5 py-0.5 rounded-full border border-neutral-200">
                        {Array.isArray(section.contentData?.slides)
                          ? `${section.contentData.slides.length} Slides`
                          : Array.isArray(section.contentData?.items)
                          ? `${section.contentData.items.length} Items`
                          : Array.isArray(section.contentData?.otherServices)
                          ? "Multi-service layout"
                          : Array.isArray(section.contentData?.stats)
                          ? `${section.contentData.stats.length} Milestones`
                          : "Configured"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-[#E8E8E3] flex items-center justify-between">
                  <span className="text-[11px] text-[#8A8F8B]">
                    Order: <strong className="text-[#202522]">{section.order}</strong>
                  </span>

                  <Link
                    href={meta.editUrl}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-[#8CBC67] transition-all group-hover:shadow"
                  >
                    <span>Edit Section</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Helper Banner */}
      <div className="bg-[#111111] text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8CBC67]/20 flex items-center justify-center text-[#8CBC67] shrink-0">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-white">
              Instant Live Updates & Fallback Protection
            </h4>
            <p className="text-xs text-neutral-400 mt-0.5">
              Every section saved here updates in real-time. If database access is momentarily delayed, the website automatically displays elegant fallback content so customers always have a seamless experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
