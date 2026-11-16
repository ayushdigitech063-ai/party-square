"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  UserCheck,
  Database,
  Mail,
  MapPin,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface PrivacySection {
  number: number;
  title: string;
  icon: any;
  content: React.ReactNode;
}

const privacySections: PrivacySection[] = [
  {
    number: 1,
    title: "Introduction & Commitment",
    icon: ShieldCheck,
    content: (
      <>
        <p>
          Party Square (&quot;Party Square&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is India&apos;s trusted event planning and decoration platform. We value the trust you place in us when sharing your personal details, celebration venues, and preferences. We are deeply committed to protecting your privacy and ensuring your personal data is handled responsibly.
        </p>
        <p className="mt-2.5">
          This Privacy Policy describes how we collect, process, store, protect, and use your information when you access our website, book our party decoration packages, or interact with our customer support teams across India.
        </p>
      </>
    ),
  },
  {
    number: 2,
    title: "Information We Collect",
    icon: Database,
    content: (
      <>
        <p>
          To deliver delightful, on-time decoration experiences at your doorstep, we collect the following categories of information:
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside text-[#6B706C]">
          <li><strong>Personal Contact Details:</strong> Full name, mobile phone number, and email address for account authentication and booking communications.</li>
          <li><strong>Event & Delivery Location:</strong> Doorstep address, flat/floor details, landmark, and postal pincode where our decorator team will set up the decor.</li>
          <li><strong>Event Scheduling & Customization:</strong> Event date, preferred decorator arrival time slot, celebratory person&apos;s name/age, and customization notes.</li>
          <li><strong>Transaction Information:</strong> Order ID, amount paid, payment mode, and transaction references (we do not store your credit card CVV or net banking passwords).</li>
        </ul>
      </>
    ),
  },
  {
    number: 3,
    title: "How We Use Your Information",
    icon: UserCheck,
    content: (
      <>
        <p>
          We use your data strictly for legitimate business and fulfillment purposes:
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside text-[#6B706C]">
          <li>To assign verified decorator partners to your location and ensure 100% on-time arrival.</li>
          <li>To send instant booking confirmations, invoice receipts, and live decorator tracking via WhatsApp/SMS.</li>
          <li>To assist you with date changes, customizations, cancellations, and customer support requests.</li>
          <li>To continuously improve our balloon themes, user interface, and service catalog.</li>
        </ul>
      </>
    ),
  },
  {
    number: 4,
    title: "Data Security & Protection",
    icon: Lock,
    content: (
      <>
        <p>
          We employ state-of-the-art security measures to safeguard your personal data:
        </p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-[#FCFBF7] border border-[#E8E8E3]">
            <h4 className="font-bold text-xs text-[#202522]">256-Bit SSL Encryption</h4>
            <p className="text-xs text-[#6B706C] mt-1">All data transmission between your browser and our servers is encrypted using bank-grade protocols.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#FCFBF7] border border-[#E8E8E3]">
            <h4 className="font-bold text-xs text-[#202522]">Verified Decorator Access</h4>
            <p className="text-xs text-[#6B706C] mt-1">Decorators only receive event venue details required strictly on the date of execution.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    number: 5,
    title: "Third-Party Sharing & Disclosure",
    icon: Eye,
    content: (
      <>
        <p>
          We never sell, rent, or trade your personal information to external advertising brokers. We only share essential details with:
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside text-[#6B706C]">
          <li><strong>RBI-Authorized Payment Gateways:</strong> To securely process UPI, card, and net banking transactions.</li>
          <li><strong>SMS & Notification Providers:</strong> To deliver real-time booking alerts, OTPs, and receipts.</li>
          <li><strong>Legal Authorities:</strong> Only when legally required to comply with applicable Indian laws, subpoenas, or lawful government orders.</li>
        </ul>
      </>
    ),
  },
  {
    number: 6,
    title: "Cookies & Tracking Technologies",
    icon: FileText,
    content: (
      <>
        <p>
          Party Square uses session and preference cookies to remember your selected city, preserve your cart during checkout, and analyze website speed and traffic. You can adjust your browser cookie settings at any time without losing core website functionality.
        </p>
      </>
    ),
  },
  {
    number: 7,
    title: "Your Rights & Contact Details",
    icon: Mail,
    content: (
      <>
        <p>
          You have full rights to review, update, or request the deletion of your account and personal data from our servers. If you have any inquiries or privacy requests, please reach out to our grievance officer:
        </p>
        <div className="mt-3 p-4 rounded-xl bg-[#EEF6EB] border border-[#8CBC67]/40 space-y-1.5 text-xs sm:text-sm">
          <p><strong>Grievance & Privacy Officer:</strong> Party Square Legal & Security Team</p>
          <p><strong>Email:</strong> privacy@partysquare.in / support@partysquare.in</p>
          <p><strong>Operating Office:</strong> Party Square Headquarters, Jaipur & Bangalore, India</p>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState(1);

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#202522] font-sans selection:bg-[#8CBC67] selection:text-white pb-20">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-[#EEF6EB] to-[#FCFBF7] pt-14 pb-12 px-4 sm:px-6 md:px-12 border-b border-[#E8E8E3]">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E8E8E3] px-4 py-1.5 rounded-full text-[#8CBC67] text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles size={13} />
            <span>Privacy & Trust</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#202522] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-[#6B706C] max-w-2xl mx-auto leading-relaxed">
            Your privacy is sacred to us. Learn how Party Square safely handles your celebration bookings, venue addresses, and personal details.
          </p>
          <p className="text-xs text-[#6B706C] font-medium pt-1">
            Last Updated: October 2026 • Effective across all Indian cities
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Quick Jump Sidebar */}
          <div className="md:col-span-4 sticky top-24 space-y-2 hidden md:block">
            <div className="bg-white rounded-2xl border border-[#E8E8E3] p-4 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8CBC67] block mb-3">
                Table of Contents
              </span>
              <nav className="space-y-1">
                {privacySections.map((sec) => (
                  <a
                    key={sec.number}
                    href={`#section-${sec.number}`}
                    onClick={() => setActiveSection(sec.number)}
                    className={`block px-3 py-2 rounded-xl text-xs font-medium transition ${
                      activeSection === sec.number
                        ? "bg-[#EEF6EB] text-[#8CBC67] font-bold"
                        : "text-[#6B706C] hover:text-[#202522] hover:bg-neutral-50"
                    }`}
                  >
                    {sec.number}. {sec.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="md:col-span-8 space-y-6">
            {privacySections.map((sec) => {
              const Icon = sec.icon;
              return (
                <section
                  key={sec.number}
                  id={`section-${sec.number}`}
                  className="bg-white rounded-2xl border border-[#E8E8E3] p-6 sm:p-8 shadow-xs space-y-3"
                >
                  <div className="flex items-center gap-3 border-b border-[#E8E8E3] pb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EEF6EB] text-[#8CBC67] flex items-center justify-center shrink-0">
                      <Icon size={18} />
                    </div>
                    <h2 className="text-lg sm:text-xl font-serif font-bold text-[#202522]">
                      {sec.number}. {sec.title}
                    </h2>
                  </div>
                  <div className="text-xs sm:text-sm text-[#6B706C] leading-relaxed">
                    {sec.content}
                  </div>
                </section>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
