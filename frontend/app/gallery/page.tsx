"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Camera, 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2,
  Calendar
} from "lucide-react";
import { API_URL } from "@/config";

interface GalleryPhoto {
  id: string | number;
  title: string;
  category: string;
  image: string;
  price?: number;
  description?: string;
  date?: string;
}

export default function FullGalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/homepage`)
      .then(res => res.json())
      .then(data => {
        const gallerySec = data.sections?.find((s: any) => s.sectionKey === "gallery");
        if (gallerySec?.contentData?.photos && Array.isArray(gallerySec.contentData.photos)) {
          setPhotos(gallerySec.contentData.photos);
        }
      })
      .catch(err => console.error("Error loading gallery:", err))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    photos.forEach(p => {
      if (p.category) cats.add(p.category);
    });
    return ["All", ...Array.from(cats)];
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "All") return photos;
    return photos.filter(p => p.category === activeCategory);
  }, [activeCategory, photos]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    if (typeof document !== "undefined") document.body.style.overflow = "auto";
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  const currentItem = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans pb-24">
      {/* Header */}
      <div className="bg-[#181818] text-white pt-20 pb-16 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-amber-400 text-xs uppercase tracking-widest font-semibold border border-white/15">
            <Camera size={14} />
            <span>Complete Showcase Gallery</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light">
            Our Celebration <span className="text-amber-400 italic">Portfolio</span>
          </h1>

          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Explore authentic photos of our real event decorations across weddings, birthdays, anniversaries, and grand celebrations.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2.5 pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs ${
                activeCategory === cat
                  ? "bg-neutral-900 text-white shadow-md scale-105"
                  : "bg-white text-neutral-700 border border-neutral-200 hover:border-amber-400 hover:text-amber-900"
              }`}
            >
              {cat === "All" ? "All Moments" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-neutral-500 text-sm">Loading gallery photos...</p>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center max-w-md mx-auto border border-neutral-200">
            <Camera size={38} className="text-neutral-300 mx-auto mb-2" />
            <p className="font-bold text-neutral-800">No photos in this category yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo, idx) => (
              <div
                key={photo.id || idx}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-3xl overflow-hidden bg-white border border-neutral-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-end min-h-[320px]"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
                    {photo.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-md">
                  <Maximize2 size={16} />
                </div>

                <div className="relative z-10 p-5 text-white space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-300 text-[11px] font-medium">
                    <Sparkles size={12} />
                    <span>{photo.date || "Event Showcase"}</span>
                    {photo.price && (
                      <>
                        <span className="text-white/40">•</span>
                        <span className="text-white font-bold">₹{Number(photo.price).toLocaleString("en-IN")}</span>
                      </>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-white text-lg leading-tight line-clamp-1">
                    {photo.title}
                  </h3>
                  {photo.description && (
                    <p className="text-neutral-300 text-xs line-clamp-2 font-light">
                      {photo.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && currentItem && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition border border-white/20 cursor-pointer shadow-lg"
          >
            <X size={22} />
          </button>

          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition border border-white/20 cursor-pointer backdrop-blur-md"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition border border-white/20 cursor-pointer backdrop-blur-md"
          >
            <ChevronRight size={24} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row bg-neutral-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] sm:min-h-[460px] p-2">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl"
              />
              <span className="absolute bottom-4 left-4 text-[11px] bg-black/60 backdrop-blur-md text-white/80 px-3 py-1 rounded-full border border-white/20 font-mono">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
            </div>

            <div className="w-full md:w-80 lg:w-96 bg-[#161616] p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 text-white space-y-6">
              <div className="space-y-4">
                <div className="inline-block bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                  {currentItem.category}
                </div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white leading-tight">
                  {currentItem.title}
                </h3>
                {currentItem.price && (
                  <div className="text-amber-400 font-bold text-xl font-mono">
                    ₹{Number(currentItem.price).toLocaleString("en-IN")}
                  </div>
                )}
                <div className="h-px bg-white/10 my-2" />
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                  {currentItem.description || "Real celebration decoration setup tailored with premium florals, lighting elements, and custom themes."}
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <Link
                  href="/all-products"
                  onClick={closeLightbox}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-neutral-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
                >
                  <span>Book / Enquire Decoration</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
