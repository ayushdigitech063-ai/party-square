"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Smartphone,
  Banknote,
  Sparkles,
} from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#202522] font-sans selection:bg-[#8CBC67] selection:text-white pb-20">
      {/* Header Banner */}
      <section className="relative bg-gradient-to-b from-[#EEF6E8] to-[#FCFBF7] pt-14 pb-12 px-4 sm:px-6 md:px-12 border-b border-[#E8E8E3]">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E8E8E3] px-4 py-1.5 rounded-full text-[#8CBC67] text-xs font-bold uppercase tracking-wider shadow-2xs">
            <ShieldCheck size={13} />
            <span>100% Secure & Verified</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#202522] tracking-tight">
            Payments & Security Guidelines
          </h1>
          <p className="text-sm sm:text-base text-[#6B706C] max-w-2xl mx-auto leading-relaxed">
            Party Square offers smooth, encrypted, and flexible payment options so you can book your celebrations with total peace of mind.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-10 space-y-8">
        
        {/* Security Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E8E8E3] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#EEF6E8] text-[#8CBC67] flex items-center justify-center font-bold">
              <Lock size={20} />
            </div>
            <h3 className="font-bold text-sm text-[#202522]">256-Bit SSL Encryption</h3>
            <p className="text-xs text-[#6B706C] leading-relaxed">
              Every transaction is processed through bank-grade 256-bit SSL encrypted payment gateways.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E8E8E3] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#F7D6C7] text-[#202522] flex items-center justify-center font-bold">
              <CreditCard size={20} />
            </div>
            <h3 className="font-bold text-sm text-[#202522]">Zero Extra Fees</h3>
            <p className="text-xs text-[#6B706C] leading-relaxed">
              No hidden checkout surcharges, platform fees, or credit card handling fees on our platform.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E8E8E3] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#EEF6E8] text-[#8CBC67] flex items-center justify-center font-bold">
              <Banknote size={20} />
            </div>
            <h3 className="font-bold text-sm text-[#202522]">Flexible Partial Advance</h3>
            <p className="text-xs text-[#6B706C] leading-relaxed">
              Book your date by paying a small advance token, and pay the remaining balance after on-site setup.
            </p>
          </div>
        </div>

        {/* Section 1: Accepted Payment Methods */}
        <div className="bg-white rounded-2xl border border-[#E8E8E3] p-6 sm:p-8 shadow-xs space-y-5">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#202522] flex items-center gap-2.5">
            <CreditCard className="text-[#8CBC67]" size={24} />
            <span>Supported Payment Modes</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#FCFBF7] border border-[#E8E8E3] space-y-2">
              <div className="flex items-center gap-2">
                <Smartphone className="text-[#8CBC67]" size={18} />
                <h4 className="font-bold text-sm text-[#202522]">UPI & Digital Wallets</h4>
              </div>
              <p className="text-xs text-[#6B706C] leading-relaxed">
                Pay instantly via Google Pay, PhonePe, Paytm, BHIM, or any UPI app with 1-click verification.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FCFBF7] border border-[#E8E8E3] space-y-2">
              <div className="flex items-center gap-2">
                <CreditCard className="text-[#8CBC67]" size={18} />
                <h4 className="font-bold text-sm text-[#202522]">Credit & Debit Cards</h4>
              </div>
              <p className="text-xs text-[#6B706C] leading-relaxed">
                We accept all major domestic and international cards including Visa, MasterCard, RuPay, and Maestro.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FCFBF7] border border-[#E8E8E3] space-y-2">
              <div className="flex items-center gap-2">
                <Banknote className="text-[#8CBC67]" size={18} />
                <h4 className="font-bold text-sm text-[#202522]">Net Banking & NEFT</h4>
              </div>
              <p className="text-xs text-[#6B706C] leading-relaxed">
                Direct net banking access supported across 50+ leading Indian private and public banks.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FCFBF7] border border-[#E8E8E3] space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-[#8CBC67]" size={18} />
                <h4 className="font-bold text-sm text-[#202522]">Cash / UPI After Setup</h4>
              </div>
              <p className="text-xs text-[#6B706C] leading-relaxed">
                For eligible locations, you can pay the remaining balance amount directly to the decorator once you inspect the decor.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Advance Payment Policy */}
        <div className="bg-white rounded-2xl border border-[#E8E8E3] p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#202522] flex items-center gap-2.5">
            <Lock className="text-[#8CBC67]" size={24} />
            <span>Advance Payment & Booking Confirmation</span>
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-[#6B706C] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#8CBC67] shrink-0 mt-0.5" />
              <span>To block a decorator time slot and lock materials for your celebration, an advance payment (or full payment as selected) is required during online checkout.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#8CBC67] shrink-0 mt-0.5" />
              <span>Once payment is processed, you immediately receive an automated invoice, order tracking ID, and decorator assignment updates via SMS and WhatsApp.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#8CBC67] shrink-0 mt-0.5" />
              <span>In the rare event that a payment is debited from your account but the order page fails to update, our automated webhook automatically verifies the payment or initiates a reversal within 24 hours.</span>
            </li>
          </ul>
        </div>

        {/* Section 3: Tax & Invoicing */}
        <div className="bg-white rounded-2xl border border-[#E8E8E3] p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#202522] flex items-center gap-2.5">
            <Banknote className="text-[#8CBC67]" size={24} />
            <span>GST & Official Tax Invoices</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#6B706C] leading-relaxed">
            All prices displayed on Party Square are transparent and all-inclusive. For corporate clients or business bookings requiring GST input credit invoices, you can enter your registered GSTIN at checkout or contact support with your booking ID.
          </p>
        </div>

        {/* Support Help Box */}
        <div className="rounded-2xl bg-[#EEF6E8] border border-[#8CBC67]/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-[#202522]">Payment Discrepancy or Questions?</h3>
            <p className="text-xs sm:text-sm text-[#6B706C]">
              Reach out to our accounts team for quick resolution and instant payment receipts.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-[#8CBC67] hover:bg-[#7AB055] text-white font-bold text-xs px-5 py-3 rounded-full transition shadow-xs"
          >
            Contact Accounts Desk
          </Link>
        </div>

      </div>
    </div>
  );
}
