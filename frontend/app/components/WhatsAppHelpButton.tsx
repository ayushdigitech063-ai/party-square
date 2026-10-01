"use client";

import React, { useState, useEffect } from "react";
import { API_URL } from "@/config";

export default function WhatsAppHelpButton() {
  const [phoneNumber, setPhoneNumber] = useState("918010679679");

  useEffect(() => {
    // Check local storage cache first
    const cachedNumber = localStorage.getItem("party_whatsapp_number");
    if (cachedNumber) {
      const clean = cachedNumber.replace(/\D/g, "");
      setPhoneNumber(clean.startsWith("91") && clean.length > 10 ? clean : `91${clean.slice(-10)}`);
    }

    // Fetch active dynamic number from backend settings
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_URL}/api/settings`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.whatsappNumber) {
            const clean = data.whatsappNumber.replace(/\D/g, "");
            const formatted = clean.startsWith("91") && clean.length > 10 ? clean : `91${clean.slice(-10)}`;
            setPhoneNumber(formatted);
            localStorage.setItem("party_whatsapp_number", data.whatsappNumber);
          }
        }
      } catch {
        // Fallback to default
      }
    };

    fetchSettings();
  }, []);

  const defaultMessage = encodeURIComponent(
    "Hi Party Square! I need help with party & celebration decoration booking."
  );

  return (
    <aside
      aria-label="WhatsApp Support"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 select-none print:hidden"
    >
      <a
        href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Help? Whatsapp Us - 1 unread message"
        className="relative group flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-[#96554E] hover:bg-[#854740] text-white shadow-[0_10px_25px_rgba(150,85,78,0.45)] hover:shadow-[0_14px_30px_rgba(150,85,78,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 border border-[#b26b63]/40"
      >
        {/* WhatsApp Icon */}
        <span className="shrink-0 flex items-center justify-center">
          <svg
            className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-none stroke-current"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* WhatsApp Speech Bubble */}
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            {/* Inner Phone receiver */}
            <path
              d="M9.5 9a1.5 1.5 0 0 0 1.5 1.5c.5 0 1 .5 1.5 1s1 1 1 1.5a1.5 1.5 0 0 0 1.5 1.5"
              strokeWidth="2"
            />
          </svg>
        </span>

        {/* Text */}
        <span className="text-sm sm:text-[15px] font-medium tracking-wide whitespace-nowrap text-white drop-shadow-xs">
          Help? Whatsapp Us
        </span>

        {/* Top-Right Green Notification Badge "1" */}
        <span
          className="absolute -top-2.5 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#70B34E] text-white text-xs font-bold shadow-md ring-2 ring-white"
          aria-hidden="true"
        >
          1
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#70B34E] opacity-40 animate-ping" />
        </span>
      </a>
    </aside>
  );
}
