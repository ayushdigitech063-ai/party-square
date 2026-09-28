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
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M2 20h20v2H2v-2zm2-3h2v-4H4v4zm4 0h2v-6H8v6zm4 0h2v-8h-2v8zm4 0h2v-6h-2v6zm4 0h2v-4h-2v4zM12 2L2 7v2h20V7L12 2zm0 2.18L18.76 7H5.24L12 4.18z"/>
        </svg>
      );
    case "Mumbai":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M3 21h18v2H3v-2zm1-2h2V8H4v11zm14 0h2V8h-2v11zM10 5h4v2h-4V5zm-8 4h2v10H2V9zm18 0h2v10h-2V9zM11 8h2v11h-2V8z"/>
        </svg>
      );
    case "Chennai":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M12 2L2 8v2h20V8L12 2zm0 3.27L17.74 8H6.26L12 5.27zM3 20h18v2H3v-2zm2-2h2V10H5v8zm4 0h2V10H9v8zm4 0h2V10h-2v8zm4 0h2V10h-2v8z"/>
        </svg>
      );
    case "Hyderabad":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M4 21h16v2H4v-2zm1-3h3V8H5v10zm6 0h2V8h-2v10zm6 0h3V8h-3v10zM12 2L2 6v2h20V6L12 2zm0 2.18L18.76 6H5.24L12 4.18z"/>
        </svg>
      );
    case "Delhi":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M4 21h16v2H4v-2zm1-2h2V8H5v11zm12 0h2V8h-2v11zM9 5h6v2H9V5zm-7 6h2v8H2v-8zm18 0h2v8h-2v-8z"/>
        </svg>
      );
    case "Ahmedabad":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M3 21h18v2H3v-2zm2-2h2V9H5v10zm12 0h2V9h-2v10zM9 19h6V7H9v12zM12 2L3 6v1h18V6L12 2z"/>
        </svg>
      );
    case "Faridabad":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M12 2L4 7v2h16V7L12 2zm0 2.18L17.76 7H6.24L12 4.18zM3 20h18v2H3v-2zm2-2h2V10H5v8zm12 0h2V10h-2v8zM9 18h6V10H9v8z"/>
        </svg>
      );
    case "Ghaziabad":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M2 21h20v2H2v-2zm3-3h2V6H5v12zm4 0h2V4h-2v14zm4 0h2V8h-2v10zm4 0h2V10h-2v8z"/>
        </svg>
      );
    case "Gurugram":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M9 2h6v20H9V2zm2 2v2h2V4h-2zm0 4v2h2V8h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2zm-6 2h14v2H5v-2z"/>
        </svg>
      );
    case "Jaipur":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M3 21h18v2H3v-2zm1-3h2V9H4v9zm14 0h2V9h-2v9zM8 18h8V7H8v11zM12 3l-6 3h12L12 3z"/>
        </svg>
      );
    case "Kolkata":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M12 2L3 7v2h18V7L12 2zm0 2.18L17.76 7H6.24L12 4.18zM3 20h18v2H3v-2zm2-2h2V10H5v8zm12 0h2V10h-2v8zM9 16h6V10H9v6z"/>
        </svg>
      );
    case "Lucknow":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M12 2C7.03 2 3 6.03 3 11v10h18V11c0-4.97-4.03-9-9-9zm0 2c3.87 0 7 3.13 7 7v8H5v-8c0-3.87 3.13-7 7-7zm-4 9h8v2H8v-2z"/>
        </svg>
      );
    case "Mangalore":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M3 20h18v2H3v-2zm2-3h2v-4H5v4zm4 0h2v-6H9v6zm4 0h2v-8h-2v8zm4 0h2v-4h-2v4zM12 2L2 7v2h20V7L12 2z"/>
        </svg>
      );
    case "Mysore":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M3 21h18v2H3v-2zm1-2h2V9H4v10zm14 0h2V9h-2v10zM8 19h8V7H8v12zM12 4l-4 3h8l-4-3z"/>
        </svg>
      );
    case "Noida":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M2 20h20v2H2v-2zm1-3l4-8h10l4 8H3zm4.5-6L10 15h4l2.5-4H7.5z"/>
        </svg>
      );
    case "Pune":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M3 21h18v2H3v-2zm1-2h2V8H4v11zm14 0h2V8h-2v11zM8 19h8V6L12 3 8 6v13z"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      );
  }
};

export default function CityModal({ isOpen, onClose, onSelectCity, cities }: CityModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#FFFDF9] border border-amber-300/60 rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-amber-200/60 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 font-bold">
              📍
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-neutral-900 tracking-wide">
              SELECT YOUR CITY
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-amber-100 border border-neutral-200 hover:border-amber-300 flex items-center justify-center text-neutral-600 hover:text-amber-800 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cities Grid with Clean Custom Scrollbar & Perfectly Aligned Icons */}
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-6 overflow-y-auto pr-1"
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
              className="group flex flex-col items-center justify-center p-4 bg-white hover:bg-amber-50/80 border border-neutral-200/80 hover:border-amber-400 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50/80 group-hover:bg-amber-100 border border-amber-200/70 flex items-center justify-center text-amber-600 mb-2.5 transition group-hover:scale-110">
                {getCityIcon(city)}
              </div>
              <span className="text-xs md:text-sm font-semibold text-neutral-800 group-hover:text-amber-900 transition text-center">
                {city}
              </span>
            </button>
          ))}
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-amber-200/60 text-center shrink-0">
          <p className="text-xs text-neutral-500 font-medium">
            Select your delivery location to explore personalized decor packages available in your city.
          </p>
        </div>

      </div>
    </div>
  );
}