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
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D7A84B]/30 bg-white px-4 py-2 text-sm font-medium text-[#8A6A32]">
              <Sparkles className="h-4 w-4" />
              {badge}
            </div>
          )}

          <h2 className="text-3xl font-semibold tracking-tight text-[#29251F] sm:text-4xl lg:text-5xl">
            {heading}
          </h2>

          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#756F66] sm:text-base">
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
                    ? "border-[#D7A84B]/50 shadow-[0_10px_35px_rgba(197,160,89,0.10)]"
                    : "border-[#E9E2D7] shadow-sm hover:border-[#D7A84B]/40"
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
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                        isOpen
                          ? "bg-[#D7A84B] text-white"
                          : "bg-[#FCFBF7] text-[#A47C35]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Question */}
                    <span
                      className={`text-sm font-semibold sm:text-base ${
                        isOpen
                          ? "text-[#8A6A32]"
                          : "text-[#29251F]"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  {/* Arrow */}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#8A6A32] transition-transform duration-300 ${
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
                    <div className="border-t border-[#EFE9DF] px-5 pb-6 pt-5 sm:px-7 sm:pl-[4.75rem]">
                      <p className="text-sm leading-7 text-[#756F66] sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="relative overflow-hidden rounded-[28px] bg-[#29251F] px-6 py-10 text-center sm:px-10">
            
            <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[#D7A84B]/20 blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#D7A84B] text-white">
                <MessageCircle className="h-5 w-5" />
              </div>

              <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                Still Have Questions?
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/70">
                Our team is here to help you plan the perfect celebration.
                Get in touch with us for any questions about your decoration.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex rounded-full bg-[#D7A84B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#B18D4C]"
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