"use client";

import React from "react";
import { TrendingUp, BarChart3, PieChart, ArrowUpRight, DollarSign, Award, Calendar } from "lucide-react";

export default function AdminAnalytics() {
  const topThemes = [
    { name: "Christmas Magic Decor", bookings: 420, revenue: "₹27,29,580" },
    { name: "Ganpati Mandap Setup", bookings: 310, revenue: "₹27,89,690" },
    { name: "Romantic Candlelight Vibe", bookings: 280, revenue: "₹12,87,720" },
    { name: "Birthday Balloon Party", bookings: 238, revenue: "₹9,51,762" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-white border border-amber-200/80 p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-neutral-900">Analytics & Reports</h2>
          <p className="text-neutral-500 text-xs font-light mt-1">Detailed performance metrics, earnings growth, and top performing decoration themes.</p>
        </div>
        <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center space-x-2 text-amber-900 text-xs font-bold">
          <TrendingUp size={16} />
          <span>Growth Rate: +24.8% This Month</span>
        </div>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-amber-200 p-6 rounded-3xl shadow-sm space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Average Booking Value</span>
          <h3 className="font-serif text-3xl font-bold text-neutral-900">₹6,450</h3>
          <p className="text-xs text-green-600 font-medium flex items-center space-x-1">
            <ArrowUpRight size={14} />
            <span>+8.2% from last month</span>
          </p>
        </div>

        <div className="bg-white border border-amber-200 p-6 rounded-3xl shadow-sm space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Successful Events</span>
          <h3 className="font-serif text-3xl font-bold text-neutral-900">1,180</h3>
          <p className="text-xs text-green-600 font-medium flex items-center space-x-1">
            <ArrowUpRight size={14} />
            <span>94.5% completion rate</span>
          </p>
        </div>

        <div className="bg-white border border-amber-200 p-6 rounded-3xl shadow-sm space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Client Satisfaction</span>
          <h3 className="font-serif text-3xl font-bold text-neutral-900">4.9 / 5.0</h3>
          <p className="text-xs text-amber-700 font-medium">Based on 840+ reviews</p>
        </div>
      </div>

      {/* Top Performing Themes Table */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="font-serif text-xl font-bold text-neutral-900">Top Performing Decoration Themes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-amber-100 text-neutral-400 uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-semibold">Theme Name</th>
                <th className="pb-3 font-semibold">Total Bookings</th>
                <th className="pb-3 font-semibold">Total Revenue Generated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-50">
              {topThemes.map((t, idx) => (
                <tr key={idx} className="hover:bg-amber-50/50 transition">
                  <td className="py-4 font-bold text-neutral-900 flex items-center space-x-2">
                    <Award size={16} className="text-amber-500" />
                    <span>{t.name}</span>
                  </td>
                  <td className="py-4 font-mono font-medium text-neutral-700">{t.bookings} Bookings</td>
                  <td className="py-4 font-bold text-neutral-900">{t.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}