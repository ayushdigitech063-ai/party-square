"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Lock,
  RotateCcw,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Phone,
  Mail,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function CancellationAndRefundPage() {
  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#202522] font-sans selection:bg-[#8CBC67] selection:text-white pb-20">
      {/* Header Banner */}
      <section className="relative bg-gradient-to-b from-[#EEF6EB] to-[#FCFBF7] pt-14 pb-12 px-4 sm:px-6 md:px-12 border-b border-[#E8E8E3]">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E8E8E3] px-4 py-1.5 rounded-full text-[#8CBC67] text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles size={13} />
            <span>Customer Friendly Policy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#202522] tracking-tight">
            Cancellation & Refund Policy
          </h1>
          <p className="text-sm sm:text-base text-[#6B706C] max-w-2xl mx-auto leading-relaxed">
            At Party Square, we understand that celebrations and event schedules can change. We have designed a transparent, fair, and flexible cancellation and refund process for all our decoration services.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-10 space-y-8">
        
        {/* Quick Highlights Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E8E8E3] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#EEF6EB] text-[#8CBC67] flex items-center justify-center font-bold">
              100%
            </div>
            <h3 className="font-bold text-sm text-[#202522]">Free Cancellation</h3>
            <p className="text-xs text-[#6B706C] leading-relaxed">
              Cancel up to 24 hours prior to your booked setup slot for a full 100% refund with zero questions asked.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E8E8E3] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#F7D6C7] text-[#202522] flex items-center justify-center font-bold">
              0₹
            </div>
            <h3 className="font-bold text-sm text-[#202522]">Free Rescheduling</h3>
            <p className="text-xs text-[#6B706C] leading-relaxed">
              Shift your celebration date or time slot at zero extra cost up to 12 hours prior to execution.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E8E8E3] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#EEF6EB] text-[#8CBC67] flex items-center justify-center font-bold">
              3-5
            </div>
            <h3 className="font-bold text-sm text-[#202522]">Days Fast Refund</h3>
            <p className="text-xs text-[#6B706C] leading-relaxed">
              Refunds are initiated immediately and credited to your original payment method in 3 to 5 business days.
            </p>
          </div>
        </div>

        {/* Section 1: Detailed Policy Table */}
        <div className="bg-white rounded-2xl border border-[#E8E8E3] p-6 sm:p-8 shadow-xs space-y-5">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#202522] flex items-center gap-2.5">
            <Clock className="text-[#8CBC67]" size={24} />
            <span>Cancellation Slabs & Refund Percentages</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E8E8E3] bg-[#FCFBF7]">
                  <th className="py-3 px-4 font-bold text-[#202522]">Cancellation Timeline</th>
                  <th className="py-3 px-4 font-bold text-[#202522]">Refund Percentage</th>
                  <th className="py-3 px-4 font-bold text-[#202522]">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E3]">
                <tr>
                  <td className="py-3.5 px-4 font-medium text-[#202522]">More than 24 hours before setup slot</td>
                  <td className="py-3.5 px-4 font-bold text-[#8CBC67]">100% Full Refund</td>
                  <td className="py-3.5 px-4 text-[#6B706C]">Zero cancellation fee applied</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-[#202522]">Between 12 to 24 hours before setup slot</td>
                  <td className="py-3.5 px-4 font-bold text-[#8CBC67]">80% Refund</td>
                  <td className="py-3.5 px-4 text-[#6B706C]">Nominal 20% material preparation cost deduction</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-[#202522]">Within 12 hours of setup slot</td>
                  <td className="py-3.5 px-4 font-bold text-rose-600">50% Refund</td>
                  <td className="py-3.5 px-4 text-[#6B706C]">Covers custom balloons, transport & allocated team</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-[#202522]">After decorator reaches venue / No-Show</td>
                  <td className="py-3.5 px-4 font-bold text-neutral-500">Non-Refundable</td>
                  <td className="py-3.5 px-4 text-[#6B706C]">Service executed or decorator deployed on site</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Rescheduling Guidelines */}
        <div className="bg-white rounded-2xl border border-[#E8E8E3] p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#202522] flex items-center gap-2.5">
            <Calendar className="text-[#8CBC67]" size={24} />
            <span>Free Rescheduling Guidelines</span>
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-[#6B706C] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#8CBC67] shrink-0 mt-0.5" />
              <span>You can reschedule your decoration event date or time slot up to <strong>12 hours prior</strong> to the original slot at zero extra charges.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#8CBC67] shrink-0 mt-0.5" />
              <span>Rescheduling is subject to decorator availability on the requested new date and time.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#8CBC67] shrink-0 mt-0.5" />
              <span>Customized name boards, specific neon signs, or personalized print items that have already been fabricated cannot be altered upon rescheduling.</span>
            </li>
          </ul>
        </div>

        {/* Section 3: Process to Cancel */}
        <div className="bg-white rounded-2xl border border-[#E8E8E3] p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#202522] flex items-center gap-2.5">
            <RotateCcw className="text-[#8CBC67]" size={24} />
            <span>How to Initiate a Cancellation or Refund</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#6B706C] leading-relaxed">
            Cancelling your booking is quick and effortless:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-[#FCFBF7] border border-[#E8E8E3] space-y-1.5">
              <span className="text-xs font-bold text-[#8CBC67] uppercase tracking-wider">Step 1</span>
              <h4 className="font-bold text-sm text-[#202522]">Go to Profile</h4>
              <p className="text-xs text-[#6B706C]">Visit your Party Square account bookings dashboard or click your booking link.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FCFBF7] border border-[#E8E8E3] space-y-1.5">
              <span className="text-xs font-bold text-[#8CBC67] uppercase tracking-wider">Step 2</span>
              <h4 className="font-bold text-sm text-[#202522]">Select Cancel / Reschedule</h4>
              <p className="text-xs text-[#6B706C]">Select the relevant booking and click &quot;Cancel Booking&quot; or &quot;Change Date&quot;.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FCFBF7] border border-[#E8E8E3] space-y-1.5">
              <span className="text-xs font-bold text-[#8CBC67] uppercase tracking-wider">Step 3</span>
              <h4 className="font-bold text-sm text-[#202522]">Instant Confirmation</h4>
              <p className="text-xs text-[#6B706C]">You receive an immediate SMS/Email confirmation with your refund reference ID.</p>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="rounded-2xl bg-[#EEF6EB] border border-[#8CBC67]/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-[#202522]">Need Help with a Booking or Cancellation?</h3>
            <p className="text-xs sm:text-sm text-[#6B706C]">
              Our customer happiness team is available from 8:00 AM to 10:00 PM every day.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/contact"
              className="bg-[#8CBC67] hover:bg-[#7AB055] text-white font-bold text-xs px-5 py-3 rounded-full transition shadow-xs"
            >
              Contact Support
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
