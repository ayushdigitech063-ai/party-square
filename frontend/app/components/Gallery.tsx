"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Camera, ArrowRight, Sparkles, Maximize2 } from "lucide-react";
import { API_URL } from "@/config";

interface GalleryPhoto {
  id: string | number;
  title: string;
  category: string;
  image: string;
  price?: number;
  description?: string;
}

const DEFAULT_HOMEPAGE_PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    title: "Royal Wedding Mandap Setup",
    category: "Wedding Decoration",
    image: "/wedding1.png",
    price: 45000,
  },
  {
    id: "g2",
    title: "Birthday Balloon Garland Arch",
    category: "Birthday Decoration",
    image: "/aniversarry2.png",
    price: 6500,
  },
  {
    id: "g3",
    title: "Candlelight Dinner Setup",
    category: "Proposal & Romantic Setup",
    image: "/aniversarry1.png",
    price: 8000,
  },
  {
    id: "g4",
    title: "Floral Celebration Arch",
    category: "Anniversary Decoration",
    image: "/wedding3.png",
    price: 9500,
  },
];

export default function Gallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(DEFAULT_HOMEPAGE_PHOTOS);

  // Live sync with Super Admin Gallery
  useEffect(() => {
    fetch(`${API_URL}/api/homepage`)
      .then((res) => res.json())
      .then((data) => {
        const gallerySec = data.sections?.find((s: any) => s.sectionKey === "gallery");
        if (
          gallerySec?.contentData?.photos &&
          Array.isArray(gallerySec.contentData.photos) &&
          gallerySec.contentData.photos.length > 0
        ) {
          setPhotos(gallerySec.contentData.photos);
        }
      })
      .catch((err) => console.error("Error loading gallery for homepage:", err));
  }, []);

  // Display only first 4 on homepage (just like admin panel overview)
  const displayPhotos = photos.slice(0, 4);

  return (
    <section id="gallery" className="bg-[#FAF7F2] py-20 px-4 sm:px-6 md:px-12 text-neutral-900 font-sans relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-amber-100/90 border border-amber-300 px-3.5 py-1 rounded-full">
              <Camera size={13} className="text-amber-800" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-amber-950">
                Live Event Portfolio
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 tracking-tight leading-tight">
              Moments We’ve <span className="italic text-amber-700 font-light">Crafted With Love</span>
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed">
              Explore authentic photos of our real setups. From royal wedding mandaps to intimate birthday celebrations.
            </p>
          </div>

          {/* Show All Gallery Button */}
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-md shrink-0 cursor-pointer self-start md:self-auto"
          >
            <span>View All Gallery</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 4 Photo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPhotos.map((photo, index) => (
            <Link
              key={photo.id || index}
              href="/gallery"
              className="group relative rounded-3xl overflow-hidden bg-white border border-neutral-200/90 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end min-h-[340px]"
            >
              {/* Photo */}
              <img
                src={photo.image}
                alt={photo.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                loading="lazy"
              />

              {/* Gradient Shade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Category Pill Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
                  {photo.category}
                </span>
              </div>

              {/* View Full Screen Icon */}
              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <Maximize2 size={14} />
              </div>

              {/* Info at bottom */}
              <div className="relative z-10 p-5 text-white space-y-1">
                {photo.price && (
                  <span className="text-amber-300 text-xs font-bold drop-shadow-sm block">
                    ₹{Number(photo.price).toLocaleString("en-IN")}
                  </span>
                )}
                <h3 className="font-serif font-bold text-white text-base leading-snug line-clamp-1">
                  {photo.title}
                </h3>
                <span className="text-[11px] text-amber-400/90 font-medium flex items-center gap-1 group-hover:underline pt-1">
                  <span>View in Gallery</span>
                  <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/gallery"
            className="w-full inline-flex items-center justify-center gap-2 bg-neutral-900 text-white font-bold py-3.5 rounded-full text-xs uppercase tracking-wider"
          >
            <span>View All Gallery Photos</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}