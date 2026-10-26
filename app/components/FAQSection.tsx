"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { faqData as fallbackFaqData } from "../data/faqData";
import { fetchHomePageSection } from "../lib/api";

interface FAQItem {
  id?: number | string;
  question: string;
  answer: string;
}

interface FAQData {
  badge?: string;
  heading?: string;
  description?: string;
  items: FAQItem[];
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isEnabled, setIsEnabled] = useState(true);
  const [badge, setBadge] = useState("Frequently Asked Questions");
  const [heading, setHeading] = useState("Everything You Need to Know");
  const [description, setDescription] = useState(
    "Find answers to the most common questions about our decorations, bookings, customization, and celebrations."
  );
  const [faqs, setFaqs] = useState<FAQItem[]>(fallbackFaqData as any);

  useEffect(() => {
    let isMounted = true;
    async function loadFaqs() {
      try {
        const sec = await fetchHomePageSection<FAQData>("faqs");
        if (isMounted && sec) {
          if (typeof sec.isEnabled === "boolean") {
            setIsEnabled(sec.isEnabled);
          }
          if (sec.contentData) {
            if (sec.contentData.badge) setBadge(sec.contentData.badge);
            if (sec.contentData.heading) setHeading(sec.contentData.heading);
            if (sec.contentData.description) setDescription(sec.contentData.description);
            if (Array.isArray(sec.contentData.items) && sec.contentData.items.length > 0) {
              setFaqs(sec.contentData.items);
            }
          }
        }
      } catch (e) {
        // Fallback default retained
      }
    }
    loadFaqs();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!isEnabled) {
    return null;
  }

  return (
    <section className="bg-[#FCFBF7] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          {badge && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8CBC67]/30 bg-[#EEF6E8] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#8CBC67]">
              <Sparkles className="h-4 w-4 text-[#8CBC67]" />
              {badge}
            </div>
          )}

          <h2 className="text-3xl font-bold tracking-tight text-[#202522] sm:text-4xl lg:text-5xl">
            {heading}
          </h2>

          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#6B706C] sm:text-base">
              {description}
            </p>
          )}
        </div>

        {/* FAQ List */}
        <div className="mx-auto max-w-4xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question || index}
                className={`overflow-hidden rounded-[24px] border bg-white transition-all duration-300 ${
                  isOpen
                    ? "border-[#8CBC67] shadow-sm"
                    : "border-[#E8E8E3] shadow-xs hover:border-[#8CBC67]/50"
                }`}
              >
                {/* Question */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7 sm:py-6"
                >
                  <div className="flex items-center gap-4">

                    {/* Number */}
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                        isOpen
                          ? "bg-[#8CBC67] text-white"
                          : "bg-[#EEF6E8] text-[#8CBC67]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Question */}
                    <span
                      className={`text-sm font-bold sm:text-base ${
                        isOpen
                          ? "text-[#8CBC67]"
                          : "text-[#202522]"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  {/* Arrow */}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#8CBC67] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[#E8E8E3] px-5 pb-6 pt-5 sm:px-7 sm:pl-[4.75rem]">
                      <div
                        className="text-sm leading-7 text-[#6B706C] sm:text-base prose prose-sm max-w-none break-words"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA — Matching Brand Palette (#FCFBF7 / #EEF6E8 / #8CBC67) */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="relative overflow-hidden rounded-[28px] bg-[#EEF6E8] border border-[#8CBC67]/40 px-6 py-10 text-center sm:px-10 shadow-sm">
            
            <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[#8CBC67]/15 blur-3xl" />
            <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-[#F7D6C7]/20 blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#8CBC67] text-white shadow-xs">
                <MessageCircle className="h-5 w-5" />
              </div>

              <h3 className="text-2xl font-bold text-[#202522] sm:text-3xl">
                Still Have Questions?
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#6B706C]">
                Our team is here to help you plan the perfect celebration.
                Get in touch with us for any questions about your decoration.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex rounded-full bg-[#8CBC67] hover:bg-[#7AB055] px-7 py-3 text-sm font-bold text-white transition shadow-sm cursor-pointer"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;