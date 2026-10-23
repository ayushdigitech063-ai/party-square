"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  Phone,
  Mail,
  Zap,
} from "lucide-react";

interface TermSection {
  number: string;
  title: string;
  content: React.ReactNode;
}

const TERMS: TermSection[] = [
  {
    number: "01",
    title: "Acceptance of Terms & Service Scope",
    content: (
      <div className="space-y-2 text-xs sm:text-sm text-[#6B706C] leading-relaxed">
        <p>
          By accessing the Party Square platform (website, web applications, or telephone booking desks) and placing a service booking, you agree to be bound by these Terms and Conditions and our Privacy Policy.
        </p>
        <p>
          Party Square provides on-site balloon decoration, party styling, backdrop installations, and festive setup services at your specified residential or commercial venue across India.
        </p>
      </div>
    ),
  },
  {
    number: "02",
    title: "Booking, Slots & Advance Confirmation",
    content: (
      <div className="space-y-2 text-xs sm:text-sm text-[#6B706C] leading-relaxed">
        <p>
          To secure your desired date and decorator arrival time slot, an advance payment (or full payment as selected) is required at the time of online booking.
        </p>
        <p>
          Our decorator slots are scheduled in batches (e.g. 10:00 AM – 1:00 PM, 2:00 PM – 5:00 PM, etc.). We guarantee decorator arrival within the confirmed window. Decorator setup usually takes between 1.5 to 2.5 hours depending on theme complexity.
        </p>
      </div>
    ),
  },
  {
    number: "03",
    title: "Customer Venue Responsibilities & Safety",
    content: (
      <div className="space-y-2 text-xs sm:text-sm text-[#6B706C] leading-relaxed">
        <p>
          To ensure timely and smooth execution, the customer agrees to provide:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-1">
          <li><strong>Power Supply:</strong> A functional electric power socket within 5-10 meters of the setup wall for electric balloon inflators and fairy lights.</li>
          <li><strong>Stool or Step Ladder:</strong> A sturdy stool or household ladder for setups reaching ceiling or backdrop heights exceeding 6 feet.</li>
          <li><strong>Clear Space:</strong> Clear the designated wall, floor, or stage of obstructions before the decorator arrives.</li>
          <li><strong>Venue Permissions:</strong> If the event is in a hotel, banquet hall, or gated society, all necessary entry permissions and gate passes must be arranged by the client in advance.</li>
        </ul>
      </div>
    ),
  },
  {
    number: "04",
    title: "Wall Safety & Material Quality",
    content: (
      <div className="space-y-2 text-xs sm:text-sm text-[#6B706C] leading-relaxed">
        <p>
          Party Square strictly uses high-grade, removable painter&apos;s masking tape and safe adhesives engineered specifically to prevent peeling paint or leaving stains on standard walls.
        </p>
        <p>
          However, for walls with already damp, peeling, or chalky whitewashed surfaces, or delicate imported wallpapers, clients are requested to advise the decorator to use free-standing stands or alternative anchor points.
        </p>
      </div>
    ),
  },
  {
    number: "05",
    title: "Cancellations, Date Rescheduling & Refunds",
    content: (
      <div className="space-y-2 text-xs sm:text-sm text-[#6B706C] leading-relaxed">
        <p>
          Cancellations and rescheduling are governed by our official Cancellation & Refund Policy:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-1">
          <li>Free 100% cancellation refund up to 24 hours prior to the booked setup time slot.</li>
          <li>Zero-cost date and time slot rescheduling up to 12 hours prior to execution.</li>
          <li>Cancellations within 12 to 24 hours incur a nominal 20% deduction to cover materials already inflated or prepped.</li>
        </ul>
        <p>
          <Link href="/cancellation-and-refund" className="text-[#8CBC67] font-bold underline">
            Read our full Cancellation & Refund Policy →
          </Link>
        </p>
      </div>
    ),
  },
  {
    number: "06",
    title: "Balloon Care & Environmental Conditions",
    content: (
      <div className="space-y-2 text-xs sm:text-sm text-[#6B706C] leading-relaxed">
        <p>
          Air-filled balloons typically retain volume and shine for 24 to 48 hours indoors under air-conditioned or normal ambient room conditions.
        </p>
        <p>
          For outdoor gardens, terrace setups, or areas under direct sunlight and high wind, balloon expansion and oxidation may naturally occur sooner. Party Square is not liable for punctures caused by external weather, pets, or sharp party props after the decorator handover.
        </p>
      </div>
    ),
  },
  {
    number: "07",
    title: "Post-Event Dismantling & Removal",
    content: (
      <div className="space-y-2 text-xs sm:text-sm text-[#6B706C] leading-relaxed">
        <p>
          Standard decoration packages include complete on-site installation and styling. Post-event cleanup or dismantling is not included unless specifically booked as an add-on removal service during checkout.
        </p>
      </div>
    ),
  },
  {
    number: "08",
    title: "Governing Law & Dispute Resolution",
    content: (
      <div className="space-y-2 text-xs sm:text-sm text-[#6B706C] leading-relaxed">
        <p>
          These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or related to our services shall be subject to the exclusive jurisdiction of the competent courts in Jaipur / New Delhi, India.
        </p>
      </div>
    ),
  },
];

export default function TermsAndConditionPage() {
  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#202522] font-sans selection:bg-[#8CBC67] selection:text-white pb-20">
      {/* Header Banner */}
      <section className="relative bg-gradient-to-b from-[#EEF6E8] to-[#FCFBF7] pt-14 pb-12 px-4 sm:px-6 md:px-12 border-b border-[#E8E8E3]">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E8E8E3] px-4 py-1.5 rounded-full text-[#8CBC67] text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles size={13} />
            <span>Clear & Transparent</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#202522] tracking-tight">
            Terms & Conditions of Service
          </h1>
          <p className="text-sm sm:text-base text-[#6B706C] max-w-2xl mx-auto leading-relaxed">
            Please review these terms before booking your decoration package. They outline our mutual commitments to make your party flawless and memorable.
          </p>
          <p className="text-xs text-[#6B706C] font-medium pt-1">
            Effective: October 2026 • Applicable across all Party Square services
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-10 space-y-6">
        {TERMS.map((term) => (
          <div
            key={term.number}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E8E3] shadow-xs space-y-3 transition hover:border-[#8CBC67]"
          >
            <div className="flex items-center gap-3 border-b border-[#E8E8E3] pb-3">
              <span className="w-9 h-9 rounded-xl bg-[#EEF6E8] text-[#8CBC67] flex items-center justify-center font-bold text-xs shrink-0">
                {term.number}
              </span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#202522]">
                {term.title}
              </h2>
            </div>
            <div>{term.content}</div>
          </div>
        ))}

        {/* Footer Support Notice */}
        <div className="rounded-2xl bg-[#EEF6E8] border border-[#8CBC67]/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-[#202522]">Have questions regarding our terms?</h3>
            <p className="text-xs sm:text-sm text-[#6B706C]">
              We are here to assist with every customization and booking requirement.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-[#8CBC67] hover:bg-[#7AB055] text-white font-bold text-xs px-5 py-3 rounded-full transition shadow-xs shrink-0"
          >
            Contact Customer Team
          </Link>
        </div>
      </div>
    </div>
  );
}
