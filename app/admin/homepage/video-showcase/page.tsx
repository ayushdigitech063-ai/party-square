"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Video,
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Edit3,
  RefreshCw,
  Sparkles,
  Eye,
  Crown,
  Flower2,
  Palette,
  Upload,
  Play,
  CheckCircle2
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchHomePageSection, updateHomePageSection, uploadMedia } from "@/app/lib/api";

interface FeatureItem {
  id?: number | string;
  number?: string;
  tag: string;
  title: string;
  desc: string;
}

interface VideoShowcaseData {
  badge?: string;
  videoUrl: string;
  videoBadge?: string;
  features: FeatureItem[];
}

const DEFAULT_DATA: VideoShowcaseData = {
  badge: "LIVE SHOWCASE",
  videoUrl: "/party-viedo.mp4",
  videoBadge: "Real Event Footage",
  features: [
    {
      id: 1,
      number: "01",
      tag: "Feature 01",
      title: "Royal Mandap & Stage Sets",
      desc: "Intricate stage backdrops designed with imported fresh flora, crystal chandeliers, and customized theme drapes.",
    },
    {
      id: 2,
      number: "02",
      tag: "Feature 02",
      title: "Custom Floral & Candle Aisles",
      desc: "Atmospheric aisle walkways lined with fairy lights, candle pillars, and scented exotic blooms.",
    },
    {
      id: 3,
      number: "03",
      tag: "Feature 03",
      title: "Bespoke Palette & Moodboards",
      desc: "Tailored 3D design previews before execution to ensure every color palette matches your vision.",
    },
  ],
};

export default function AdminVideoShowcasePage() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [title, setTitle] = useState("Behind the Decor Artistry");
  const [subtitle, setSubtitle] = useState(
    "Experience the craftsmanship, lighting setups, and grand stage installations created by our core event team."
  );
  const [content, setContent] = useState<VideoShowcaseData>(DEFAULT_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file (MP4, WebM, MOV)");
      return;
    }

    if (file.size > 80 * 1024 * 1024) {
      toast.error("Video file is too large! Maximum allowed size is 80MB.");
      return;
    }

    setUploadingVideo(true);
    const loadingToast = toast.loading("Uploading video to Cloudinary... Please wait");
    try {
      const res = await uploadMedia(file);
      if (res?.url) {
        setContent((prev) => ({ ...prev, videoUrl: res.url }));
        toast.success("Video uploaded successfully to Cloudinary!", { id: loadingToast });
      } else {
        toast.error("Could not retrieve video URL", { id: loadingToast });
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to upload video", { id: loadingToast });
    } finally {
      setUploadingVideo(false);
    }
  };

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const sec = await fetchHomePageSection<VideoShowcaseData>("video_showcase");
        if (sec) {
          setIsEnabled(sec.isEnabled ?? true);
          if (sec.title) setTitle(sec.title);
          if (sec.subtitle) setSubtitle(sec.subtitle);
          if (sec.contentData) {
            setContent({ ...DEFAULT_DATA, ...sec.contentData });
          }
        }
      } catch (err: any) {
        toast.error("Loaded default video configuration");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const handleUpdateFeature = (index: number, key: keyof FeatureItem, val: string) => {
    const updated = [...content.features];
    updated[index] = { ...updated[index], [key]: val };
    setContent({ ...content, features: updated });
  };

  const handleAddFeature = () => {
    const nextNum = String(content.features.length + 1).padStart(2, "0");
    setContent({
      ...content,
      features: [
        ...content.features,
        {
          id: Date.now(),
          number: nextNum,
          tag: `Feature ${nextNum}`,
          title: "New Highlight Feature",
          desc: "Description of your stage styling or luxury craftsmanship.",
        },
      ],
    });
  };

  const handleDeleteFeature = (index: number) => {
    if (content.features.length <= 1) {
      toast.error("At least one highlight card is required");
      return;
    }
    setContent({
      ...content,
      features: content.features.filter((_, i) => i !== index),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateHomePageSection("video_showcase", {
        title,
        subtitle,
        isEnabled,
        contentData: content,
      });
      toast.success("Video Showcase section saved successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save video showcase");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
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
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <Video size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#111111]">
                Video Showcase ("Behind the Decor Artistry")
              </h1>
              <p className="text-xs text-[#6B706C]">
                Real event footage player with side highlight feature cards.
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

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white border border-[#E8E8E3] rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
            General Header & Video Setup
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                Top Badge (Left chip)
              </label>
              <input
                type="text"
                value={content.badge || ""}
                onChange={(e) => setContent({ ...content, badge: e.target.value })}
                placeholder="LIVE SHOWCASE"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                Video Overlay Badge
              </label>
              <input
                type="text"
                value={content.videoBadge || ""}
                onChange={(e) => setContent({ ...content, videoBadge: e.target.value })}
                placeholder="Real Event Footage"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                Section Main Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Behind the Decor Artistry"
                className="w-full px-3.5 py-2 text-xs font-bold rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                Subtitle / Description
              </label>
              <textarea
                rows={2}
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Experience the craftsmanship, lighting setups, and grand stage installations..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-[#202522]">
                  Showcase Video File * (Upload MP4 or Enter URL)
                </label>
                {uploadingVideo && (
                  <span className="text-xs text-[#8CBC67] font-semibold flex items-center gap-1.5 animate-pulse">
                    <RefreshCw size={12} className="animate-spin" /> Uploading to Cloudinary...
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  required
                  value={content.videoUrl}
                  onChange={(e) => setContent({ ...content, videoUrl: e.target.value })}
                  placeholder="/party-viedo.mp4 or https://res.cloudinary.com/..."
                  className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
                />

                <label className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white transition-all cursor-pointer shrink-0 shadow-sm ${
                  uploadingVideo ? "bg-neutral-600 pointer-events-none" : "bg-neutral-900 hover:bg-[#8CBC67]"
                }`}>
                  {uploadingVideo ? (
                    <RefreshCw size={14} className="animate-spin" />
                  ) : (
                    <Upload size={14} />
                  )}
                  <span>{uploadingVideo ? "Uploading..." : "Upload Video"}</span>
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/ogg,video/quicktime"
                    disabled={uploadingVideo}
                    onChange={handleVideoUpload}
                    className="sr-only"
                  />
                </label>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#6B706C] gap-1">
                <span>📁 Supports MP4, WebM, MOV video files up to 80MB. Directly uploaded to Cloudinary.</span>
                {content.videoUrl && content.videoUrl !== "/party-viedo.mp4" && (
                  <button
                    type="button"
                    onClick={() => setContent({ ...content, videoUrl: "/party-viedo.mp4" })}
                    className="text-xs text-[#8CBC67] hover:underline text-left"
                  >
                    Reset to default video
                  </button>
                )}
              </div>

              {/* Video Player Preview */}
              {content.videoUrl && (
                <div className="mt-3 p-4 rounded-2xl bg-neutral-950 text-white border border-[#E8E8E3]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#8CBC67] flex items-center gap-1.5">
                      <Play size={13} className="fill-[#8CBC67]" /> Live Video Preview
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 truncate max-w-xs">
                      {content.videoUrl}
                    </span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden aspect-video max-h-64 bg-black flex items-center justify-center">
                    <video
                      key={content.videoUrl}
                      src={content.videoUrl}
                      controls
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature Cards Manager */}
        <div className="bg-white border border-[#E8E8E3] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8E8E3]">
            <div>
              <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
                Feature Highlight Cards ({content.features.length})
              </h3>
              <p className="text-xs text-[#6B706C]">
                Cards displayed alongside the video showcasing stage sets, florals, and lighting.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddFeature}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-[#8CBC67] transition-all"
            >
              <Plus size={14} />
              <span>Add Feature Card</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {content.features.map((feat, index) => (
              <div
                key={feat.id || index}
                className="bg-neutral-50 border border-[#E8E8E3] rounded-xl p-4 space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white border border-[#E8E8E3] text-[#202522]">
                    Card #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteFeature(index)}
                    className="p-1 rounded text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete card"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B706C] mb-1">
                      Badge / Tag
                    </label>
                    <input
                      type="text"
                      value={feat.tag}
                      onChange={(e) => handleUpdateFeature(index, "tag", e.target.value)}
                      placeholder="Feature 01"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E8E8E3] bg-white focus:outline-none focus:border-[#8CBC67]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B706C] mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={feat.title}
                      onChange={(e) => handleUpdateFeature(index, "title", e.target.value)}
                      placeholder="Royal Mandap & Stage Sets"
                      className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#E8E8E3] bg-white focus:outline-none focus:border-[#8CBC67]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-[#6B706C] mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={feat.desc}
                      onChange={(e) => handleUpdateFeature(index, "desc", e.target.value)}
                      placeholder="Intricate stage backdrops designed with imported fresh flora..."
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E8E8E3] bg-white focus:outline-none focus:border-[#8CBC67]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#8CBC67] text-white text-sm font-semibold hover:bg-[#7ba859] transition-all shadow-sm"
          >
            <Save size={16} />
            <span>Save Video Showcase</span>
          </button>
        </div>
      </form>
    </div>
  );
}
