"use client";

import React from "react";
import { X } from "lucide-react";

interface CityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (city: string) => void;
  cities: string[];
}

// Har city ka properly aligned landmark/monument SVG icon
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
  }
};

export default function CityModal({ isOpen, onClose, onSelectCity, cities }: CityModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#FFFFFF] border border-[#8CBC67]/60 rounded-3xl shadow-2xl p-4 sm:p-5 overflow-hidden max-h-[80vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E3]/60 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-[#EEF6EB] border border-[#8CBC67] flex items-center justify-center text-[#202522] font-bold">
              ðŸ“
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#202522] tracking-wide">
              SELECT YOUR CITY
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-[#EEF6EB] border border-[#E8E8E3] hover:border-[#8CBC67] flex items-center justify-center text-[#6B706C] hover:text-[#202522] transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cities Grid with Clean Custom Scrollbar & Perfectly Aligned Icons */}
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 py-4 overflow-y-auto pr-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => {
                onSelectCity(city);
                onClose();
              }}
              className="group flex flex-col items-center justify-center p-2.5 bg-white hover:bg-[#EEF6EB]/80 border border-[#E8E8E3]/80 hover:border-[#8CBC67] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-[#EEF6EB]/80 group-hover:bg-[#EEF6EB] border border-[#E8E8E3]/70 flex items-center justify-center text-[#8CBC67] mb-2.5 transition group-hover:scale-110">
                {getCityIcon(city)}
              </div>
              <span className="text-xs md:text-sm font-semibold text-[#202522] group-hover:text-[#202522] transition text-center">
                {city}
              </span>
            </button>
          ))}
        </div>

        {/* Footer Note */}
        <div className="pt-3 border-t border-[#E8E8E3]/60 text-center shrink-0">
          <p className="text-[11px] leading-4 text-[#6B706C] font-medium">
            Select your delivery location to explore personalized decor packages available in your city.
          </p>
        </div>

      </div>
    </div>
  );
}

