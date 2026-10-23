"use client";

import React, { useState, useRef, useMemo } from "react";
import {
  Sparkles,
  Star,
  Type,
  Heart,
  Cake,
  Hash,
  DoorOpen,
  Lightbulb,
  Flag,
  Gift,
  Zap,
  SunMedium,
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  X,
  Info,
} from "lucide-react";
import {
  ADDON_CATEGORIES,
  ADDON_PRODUCTS,
  AddOnItem,
  AddOnCategory,
} from "@/app/data/addonsData";

export interface AddOnSectionProps {
  currentProduct?: any;
  selectedAddonIds?: string[];
  onToggleAddon?: (addon: AddOnItem) => void;
  isInWishlist?: (id: string) => boolean;
  toggleWishlist?: (product: any) => void;
}

export default function AddOnSection({
  currentProduct,
  selectedAddonIds = [],
  onToggleAddon,
}: AddOnSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [modalItem, setModalItem] = useState<AddOnItem | null>(null);

  // Local state fallback if onToggleAddon isn't provided
  const [localSelectedIds, setLocalSelectedIds] = useState<string[]>([]);
  const activeSelectedIds = onToggleAddon ? selectedAddonIds : localSelectedIds;

  const handleToggle = (addon: AddOnItem) => {
    if (onToggleAddon) {
      onToggleAddon(addon);
    } else {
      setLocalSelectedIds((prev) =>
        prev.includes(addon.id)
          ? prev.filter((id) => id !== addon.id)
          : [...prev, addon.id]
      );
    }
  };

  // Filtered products based on active category
  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return ADDON_PRODUCTS;
    if (activeCategory === "recommended")
      return ADDON_PRODUCTS.filter((item) => item.category === "recommended" || item.popular);
    return ADDON_PRODUCTS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Horizontal scroll refs
  const categoriesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (dir: "left" | "right") => {
    if (!categoriesRef.current) return;
    categoriesRef.current.scrollBy({
      left: dir === "left" ? -240 : 240,
      behavior: "smooth",
    });
  };

  const scrollProducts = (dir: "left" | "right") => {
    if (!productsRef.current) return;
    productsRef.current.scrollBy({
      left: dir === "left" ? -460 : 460,
      behavior: "smooth",
    });
  };

  const renderCategoryIcon = (iconName: string) => {
    const props = { size: 14 };
    switch (iconName) {
      case "Star":
        return <Star {...props} />;
      case "Type":
        return <Type {...props} />;
      case "Heart":
        return <Heart {...props} />;
      case "Cake":
        return <Cake {...props} />;
      case "Hash":
        return <Hash {...props} />;
      case "DoorOpen":
        return <DoorOpen {...props} />;
      case "Lightbulb":
        return <Lightbulb {...props} />;
      case "Flag":
        return <Flag {...props} />;
      case "Gift":
        return <Gift {...props} />;
      case "Zap":
        return <Zap {...props} />;
      case "SunMedium":
        return <SunMedium {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  return (
    <section className="w-full py-8 sm:py-12 border-t border-[#E8E8E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Card Container with soft ambient card styling */}
        <div className="bg-white rounded-3xl border border-[#E8E8E3] shadow-xs p-5 sm:p-8 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-50/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-50/40 rounded-full blur-3xl pointer-events-none" />

          {/* 1. SECTION HEADER (Matching Screenshot) */}
          <div className="relative z-10 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-serif sm:font-sans text-xl sm:text-2xl md:text-3xl font-extrabold text-[#202522] tracking-tight">
                Make the surprise bigger
              </h2>
              <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-100 border border-neutral-200/80 px-2.5 py-0.5 rounded-full">
                optional
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#6B706C] mt-1 leading-relaxed">
              Arrives with the same visit — one payment, no separate delivery.
            </p>
          </div>

          {/* 2. CATEGORY FILTER CHIPS (Horizontal Scroll matching Screenshot) */}
          <div className="relative z-10 mb-6">
            <div className="relative flex items-center">
              {/* Left Arrow */}
              <button
                type="button"
                onClick={() => scrollCategories("left")}
                aria-label="Scroll categories left"
                className="hidden sm:flex absolute -left-3 z-20 w-8 h-8 rounded-full bg-white border border-[#E8E8E3] shadow-md items-center justify-center text-neutral-700 hover:bg-[#8CBC67] hover:text-white transition"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Scrollable Container */}
              <div
                ref={categoriesRef}
                className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto scroll-smooth py-1 scrollbar-hide px-0.5"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {ADDON_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                        isActive
                          ? "bg-[#202522] text-white shadow-sm"
                          : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200/70"
                      }`}
                    >
                      <span className={isActive ? "text-[#8CBC67]" : "text-neutral-500"}>
                        {renderCategoryIcon(cat.iconName)}
                      </span>
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Arrow */}
              <button
                type="button"
                onClick={() => scrollCategories("right")}
                aria-label="Scroll categories right"
                className="hidden sm:flex absolute -right-3 z-20 w-8 h-8 rounded-full bg-white border border-[#E8E8E3] shadow-md items-center justify-center text-neutral-700 hover:bg-[#8CBC67] hover:text-white transition"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* 3. ADD-ON PRODUCTS CAROUSEL / GRID */}
          <div className="relative z-10">
            {/* Left Nav Arrow for Products */}
            <button
              type="button"
              onClick={() => scrollProducts("left")}
              aria-label="Scroll products left"
              className="hidden md:flex absolute -left-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-[#E8E8E3] shadow-lg items-center justify-center text-neutral-800 hover:bg-[#8CBC67] hover:text-white hover:scale-105 transition"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Products Horizontal Slider */}
            <div
              ref={productsRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth pb-3 pt-1 scrollbar-hide px-0.5"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {filteredProducts.map((addon) => {
                const isSelected = activeSelectedIds.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    className={`w-[210px] sm:w-[230px] shrink-0 bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-2xs hover:shadow-md ${
                      isSelected
                        ? "border-[#8CBC67] ring-2 ring-[#8CBC67]/30"
                        : "border-neutral-200/80 hover:border-neutral-300"
                    }`}
                  >
                    {/* Image Area with Bottom-Right + Button */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                      <img
                        src={addon.image}
                        alt={addon.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />

                      {/* + / Check Toggle Button (Exactly as in Competitor Screenshot) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggle(addon);
                        }}
                        aria-label={isSelected ? `Remove ${addon.name}` : `Add ${addon.name}`}
                        className={`absolute bottom-2.5 right-2.5 z-10 w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#8CBC67] text-white scale-105"
                            : "bg-white text-neutral-800 hover:bg-[#8CBC67] hover:text-white hover:scale-110"
                        }`}
                      >
                        {isSelected ? <Check size={16} strokeWidth={3} /> : <Plus size={18} strokeWidth={2.5} />}
                      </button>

                      {/* Selected Ribbon Badge */}
                      {isSelected && (
                        <span className="absolute top-2 left-2 z-10 bg-[#8CBC67] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                          Added
                        </span>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-3.5 flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className="font-bold text-xs sm:text-[13px] text-neutral-900 line-clamp-1 leading-snug">
                          {addon.name}
                        </h3>

                        <div className="mt-1 flex items-baseline gap-1">
                          <span className="text-sm font-extrabold text-neutral-950">
                            ₹{addon.price.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <p className="mt-1 text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                          {addon.description}
                        </p>
                      </div>

                      {/* View More Trigger */}
                      <button
                        type="button"
                        onClick={() => setModalItem(addon)}
                        className="text-[11px] font-semibold text-purple-700 hover:text-purple-900 mt-2.5 text-left inline-block cursor-pointer transition hover:underline"
                      >
                        View more
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Nav Arrow for Products */}
            <button
              type="button"
              onClick={() => scrollProducts("right")}
              aria-label="Scroll products right"
              className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-[#E8E8E3] shadow-lg items-center justify-center text-neutral-800 hover:bg-[#8CBC67] hover:text-white hover:scale-105 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* 4. FOOTER NOTE & SELECTION COUNTER */}
          <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#8CBC67]" />
              <span>Tap the <strong>+</strong> button on any item to add it to your celebration booking.</span>
            </span>

            {activeSelectedIds.length > 0 && (
              <span className="font-bold text-[#8CBC67] bg-[#EEF6EB] px-3 py-1 rounded-full w-max">
                {activeSelectedIds.length} Add-on{activeSelectedIds.length > 1 ? "s" : ""} selected
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 5. VIEW MORE DETAILS MODAL */}
      {modalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-neutral-200 relative animate-in zoom-in-95 duration-150">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setModalItem(null)}
              className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black transition cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
              <img
                src={modalItem.image}
                alt={modalItem.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full">
                ₹{modalItem.price.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6 space-y-3">
              <h3 className="font-serif sm:font-sans text-lg font-bold text-neutral-900 leading-snug">
                {modalItem.name}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {modalItem.description}
              </p>

              {modalItem.details && (
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-xs text-neutral-600 space-y-1">
                  <span className="font-bold text-neutral-800 block">Package details:</span>
                  <p>{modalItem.details}</p>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleToggle(modalItem);
                    setModalItem(null);
                  }}
                  className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 ${
                    activeSelectedIds.includes(modalItem.id)
                      ? "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                      : "bg-[#8CBC67] hover:bg-[#7AB055] text-white shadow-md"
                  }`}
                >
                  {activeSelectedIds.includes(modalItem.id) ? (
                    <>
                      <X size={14} />
                      <span>Remove from Booking</span>
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      <span>Add for ₹{modalItem.price.toLocaleString("en-IN")}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
