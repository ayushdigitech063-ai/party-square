"use client";

import React, { useRef, useState, useEffect } from "react";
import { Sparkles, Crown, Flower2, Sparkle, Palette } from "lucide-react";
import { fetchHomePageSection } from "../lib/api";

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

const ICONS = [Crown, Flower2, Palette];

export default function ProgressBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [title, setTitle] = useState("Behind the Decor Artistry");
  const [subtitle, setSubtitle] = useState(
    "Experience the craftsmanship, lighting setups, and grand stage installations created by our core event team."
  );
  const [data, setData] = useState<VideoShowcaseData>(DEFAULT_DATA);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const sec = await fetchHomePageSection<VideoShowcaseData>("video_showcase");
        if (isMounted && sec) {
          if (typeof sec.isEnabled === "boolean") {
            setIsEnabled(sec.isEnabled);
          }
          if (sec.title) setTitle(sec.title);
          if (sec.subtitle) setSubtitle(sec.subtitle);
          if (sec.contentData) {
            setData((prev) => ({ ...prev, ...sec.contentData }));
          }
        }
      } catch (e) {
        // Fallback default retained
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!isEnabled) {
    return null;
  }

  return (
    <section className="relative bg-[#FCFBF7] py-20 px-6 md:px-16 overflow-hidden border-y border-[#E8E8E3]/80">
      
      {/* Background Animated Gradient Glow */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-red-500/20 via-[#8CBC67]/30 to-yellow-400/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-red-400/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#8CBC67]/60 pb-8">
          <div className="space-y-3 max-w-2xl">
            {data.badge && (
              <div className="inline-flex items-center space-x-2 bg-[#F7D6C7]/90 border border-[#8CBC67] px-3.5 py-1 rounded-full text-xs font-bold text-[#202522] shadow-sm">
                <Sparkles size={13} className="text-[#202522]" />
                <span>{data.badge}</span>
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-950">
              {title}
            </h2>
            <p className="text-[#202522] text-sm font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-[#202522] bg-[#EEF6EB] px-3 py-1.5 rounded-lg border border-[#8CBC67]">
              Interactive Preview
            </span>
          </div>
        </div>

        {/* Main Layout: Video + Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Clean Video Player */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#8CBC67]/80 bg-neutral-950 group min-h-[420px] lg:min-h-[500px]">
            <video
              ref={videoRef}
              key={data.videoUrl}
              src={data.videoUrl || "/party-viedo.mp4"}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/30 pointer-events-none" />

            {/* Video Live Badge */}
            {data.videoBadge && (
              <div className="absolute top-6 left-6 z-20 bg-neutral-950/80 border border-[#8CBC67]/50 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-[#8CBC67] shadow-lg flex items-center space-x-2">
                <Sparkle size={14} className="text-[#8CBC67] animate-pulse" />
                <span>{data.videoBadge}</span>
              </div>
            )}
          </div>

          {/* Right Side: Feature Highlight Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {data.features?.map((feat, index) => {
              const IconComp = ICONS[index % ICONS.length] || Crown;
              const displayNum = feat.number || String(index + 1).padStart(2, "0");

              return (
                <div
                  key={feat.id || index}
                  className="relative bg-[#F2F8F4] text-[#202522] rounded-3xl p-6 border border-emerald-600/30 shadow-xl overflow-hidden group hover:border-emerald-500 hover:-translate-y-1 transition duration-300"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-[#D7A84B] to-emerald-600 opacity-80" />
                  
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-600/30 flex items-center justify-center text-emerald-800 shrink-0 shadow-inner">
                        <IconComp size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800/80">
                          {feat.tag || `Feature ${displayNum}`}
                        </span>
                        <h3 className="text-lg font-serif font-bold text-neutral-950 group-hover:text-emerald-900 transition">
                          {feat.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-2xl font-serif italic text-emerald-900/20 group-hover:text-emerald-800/40 transition">
                      {displayNum}
                    </span>
                  </div>

                  <p className="text-[#202522] text-xs font-medium leading-relaxed mt-3 pl-13">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
