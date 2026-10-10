"use client";

import React from "react";

export interface TermsAndConditionsProps {
  number: string;
  title: string;
  content: React.ReactNode;
}

export default function TermsAndConditionPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] px-4 py-12 md:py-24">
      {/* 1. Header Section */}
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-serif text-4xl font-extrabold tracking-tight text-[#2c3e2d] md:text-5xl lg:text-6xl">
          Terms & Conditions
        </h1>
        <p className="mt-4 text-base text-[#5c6856] md:text-lg">
          Please read these terms carefully before using Party Square services.
        </p>
      </div>

      {/* 2. Content Sections */}
      <div className="mx-auto mt-12 max-w-4xl space-y-6 md:mt-16 md:space-y-8">
        <TermsSection
          number="01"
          title="Booking & Payments"
          content={
            <div className="space-y-3">
              <p>Booking requires advance payment to confirm your slot.</p>
              <p>Full payment must be completed before the event starts.</p>
            </div>
          }
        />
        <TermsSection
          number="02"
          title="Cancellations & Refunds"
          content={
            <div className="space-y-3">
              <p>Cancellations made 48 hours prior will receive a 50% refund.</p>
              <p>No refunds for cancellations within 48 hours of the event.</p>
            </div>
          }
        />
        <TermsSection
          number="03"
          title="Damages & Liability"
          content={
            <div className="space-y-3">
              <p>The client is responsible for any damage to our equipment during the event.</p>
            </div>
          }
        />
      </div>
    </main>
  );
}


/* =========================================================
   REUSABLE TERMS SECTION
========================================================= */

function TermsSection({ number, title, content }: TermsAndConditionsProps) {
  return (
    <section className="group rounded-3xl border border-[#eee5d8] bg-white p-6 shadow-[0_5px_20px_rgba(0,0,0,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ffbd59] hover:shadow-[0_10px_30px_rgba(255,159,28,0.10)] md:p-8">

      <div className="flex gap-4 md:gap-6">

        {/* Number */}
        <div className="flex-shrink-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0d2] text-sm font-extrabold text-[#ef8d00] md:h-12 md:w-12">
            {number}
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">

          <h2 className="text-lg font-bold text-[#222] md:text-xl">
            {title}
          </h2>

          <div className="mt-3 text-[15px] leading-7 text-gray-600 md:text-base">
            {content}
          </div>

        </div>

      </div>
    </section>
  );
}


/* =========================================================
   CONTACT CARD
========================================================= */

function ContactCard({ icon, label, value }: any) {
  return (
    <div className="rounded-2xl border border-[#eee4d5] bg-[#fffaf2] p-4 transition hover:border-[#ffb84d]">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {label}
          </p>

          <p className="mt-1 break-all text-sm font-semibold text-[#333]">
            {value}
          </p>
        </div>

      </div>

    </div>
  );
}





