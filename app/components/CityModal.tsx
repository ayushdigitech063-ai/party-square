"use client";

import React, { useEffect } from "react";
import { X, MapPin, Check } from "lucide-react";
import { useCity } from "@/app/context/CityContext";
import { useRouter, usePathname } from "next/navigation";

interface CityModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectCity?: (city: string) => void;
  cities?: string[];
}

// Har city ka landmark / monument icon
const getCityIcon = (cityName: string) => {
  switch (cityName) {
    case "Bangalore":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M2 20h20v2H2v-2zm2-3h2v-4H4v4zm4 0h2v-6H8v6zm4 0h2v-8h-2v8zm4 0h2v-6h-2v6zm4 0h2v-4h-2v4zM12 2L2 7v2h20V7L12 2zm0 2.18L18.76 7H5.24L12 4.18z"/>
        </svg>
      );
    case "Mumbai":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M3 21h18v2H3v-2zm1-2h2V8H4v11zm14 0h2V8h-2v11zM10 5h4v2h-4V5zm-8 4h2v10H2V9zm18 0h2v10h-2V9zM11 8h2v11h-2V8z"/>
        </svg>
      );
    case "Chennai":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12 2L2 8v2h20V8L12 2zm0 3.27L17.74 8H6.26L12 5.27zM3 20h18v2H3v-2zm2-2h2V10H5v8zm4 0h2V10H9v8zm4 0h2V10h-2v8zm4 0h2V10h-2v8z"/>
        </svg>
      );
    case "Hyderabad":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M4 21h16v2H4v-2zm1-3h3V8H5v10zm6 0h2V8h-2v10zm6 0h3V8h-3v10zM12 2L2 6v2h20V6L12 2zm0 2.18L18.76 6H5.24L12 4.18z"/>
        </svg>
      );
    case "Delhi":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M4 21h16v2H4v-2zm1-2h2V8H5v11zm12 0h2V8h-2v11zM9 5h6v2H9V5zm-7 6h2v8H2v-8zm18 0h2v8h-2v-8z"/>
        </svg>
      );
    case "Ahmedabad":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
      );
    default:
      return <MapPin size={18} />;
  }
};

export default function CityModal({
  isOpen,
  onClose,
  onSelectCity,
  cities: propCities,
}: CityModalProps) {
  const {
    isCityModalOpen: ctxIsOpen,
    setIsCityModalOpen: ctxSetIsOpen,
    selectedCity,
    setSelectedCity,
    cityNames,
  } = useCity();

  const showModal = isOpen !== undefined ? isOpen : ctxIsOpen;
  const handleClose = () => {
    if (onClose) onClose();
    ctxSetIsOpen(false);
  };

  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = (city: string) => {
    if (onSelectCity) {
      onSelectCity(city);
    }
    setSelectedCity(city);
    handleClose();

    const citySlug = city.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (!pathname || (!pathname.startsWith("/admin") && !pathname.startsWith("/login"))) {
      const segments = pathname ? pathname.split("/").filter(Boolean) : [];
      if (segments.length > 0) {
        const first = segments[0].toLowerCase();
        const allCities = availableCities.map((c) => c.toLowerCase());
        if (allCities.includes(first) || ["delhi", "mumbai", "jaipur", "bangalore"].includes(first)) {
          const rest = segments.slice(1).join("/");
          router.push(`/${citySlug}${rest ? `/${rest}` : ""}`);
          return;
        }
        router.push(`/${citySlug}/${segments.join("/")}`);
        return;
      }
      router.push(`/${citySlug}`);
    }
  };

  const availableCities = propCities && propCities.length > 0 ? propCities : cityNames;

  useEffect(() => {
    if (showModal) {
      const scrollY = window.scrollY;
      const prevOverflow = document.body.style.overflow;
      const prevPosition = document.body.style.position;
      const prevTop = document.body.style.top;
      const prevWidth = document.body.style.width;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = prevPosition;
        document.body.style.top = prevTop;
        document.body.style.width = prevWidth;
        document.body.style.overflow = prevOverflow;
        window.scrollTo(0, scrollY);
      };
    }
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white border border-[#8CBC67]/60 rounded-3xl shadow-2xl p-4 sm:p-6 overflow-hidden max-h-[85vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E3]/60 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-[#EEF6EB] border border-[#8CBC67] flex items-center justify-center text-[#8CBC67]">
              <MapPin size={18} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#202522] tracking-wide">
                SELECT YOUR CITY
              </h2>
              <p className="text-[11px] text-[#6B706C]">
                Currently selected: <span className="font-bold text-[#8CBC67]">{selectedCity}</span>
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            type="button"
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-[#EEF6EB] border border-[#E8E8E3] hover:border-[#8CBC67] flex items-center justify-center text-[#6B706C] hover:text-[#202522] transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cities Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 py-4 overflow-y-auto pr-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {availableCities.map((city) => {
            const isSelected = selectedCity.toLowerCase() === city.toLowerCase();

            return (
              <button
                key={city}
                type="button"
                onClick={() => handleSelect(city)}
                className={`group relative flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-200 cursor-pointer text-left ${
                  isSelected
                    ? "bg-[#EEF6EB] border-[#8CBC67] shadow-sm ring-2 ring-[#8CBC67]/30"
                    : "bg-white hover:bg-[#EEF6EB]/40 border-[#E8E8E3] hover:border-[#8CBC67] shadow-xs hover:shadow-sm"
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#8CBC67] text-white flex items-center justify-center">
                    <Check size={11} strokeWidth={3} />
                  </span>
                )}
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-2 transition group-hover:scale-105 ${
                    isSelected
                      ? "bg-[#8CBC67] text-white border-[#8CBC67]"
                      : "bg-[#EEF6EB]/70 group-hover:bg-[#EEF6EB] text-[#8CBC67] border-[#E8E8E3]"
                  }`}
                >
                  {getCityIcon(city)}
                </div>
                <span
                  className={`text-xs sm:text-sm font-semibold transition text-center ${
                    isSelected ? "text-[#202522] font-bold" : "text-[#202522] group-hover:text-[#8CBC67]"
                  }`}
                >
                  {city}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="pt-3 border-t border-[#E8E8E3]/60 text-center shrink-0">
          <p className="text-[11px] leading-4 text-[#6B706C] font-medium">
            Select your city to explore exclusive decorations and on-time service available in your location.
          </p>
        </div>
      </div>
    </div>
  );
}
