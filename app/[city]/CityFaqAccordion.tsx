"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { CityFaq } from "@/app/lib/api";

interface Props {
  faqs: CityFaq[];
}

export default function CityFaqAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-[#E8E8E3] bg-white overflow-hidden transition-all duration-200 shadow-2xs"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/60 transition"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-xs sm:text-sm text-[#202522] flex items-center gap-2">
                <HelpCircle size={15} className="text-[#8CBC67] shrink-0" />
                <span>{faq.question}</span>
              </span>
              <ChevronDown
                size={16}
                className={`text-[#6B706C] shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-[#8CBC67]" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#6B706C] leading-relaxed border-t border-neutral-100/70 bg-[#FCFBF7]/50">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
