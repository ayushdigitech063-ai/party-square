"use client";

import React from "react";
import { Sparkles, CalendarCheck, Users, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Bookings", value: "1,248", change: "+12%", icon: CalendarCheck, color: "bg-amber-500 text-neutral-950" },
    { title: "Active Themes", value: "24", change: "+4 new", icon: Sparkles, color: "bg-neutral-950 text-amber-400" },
    { title: "Total Revenue", value: "₹24,80,000", change: "+18%", icon: TrendingUp, color: "bg-amber-400 text-neutral-950" },
    { title: "Registered Users", value: "3,840", change: "+250", icon: Users, color: "bg-neutral-900 text-white" },
  ];

  const recentBookings = [
    { id: "BK-9021", customer: "Rahul Sharma", theme: "Christmas Magic", date: "Dec 24, 2026", amount: "₹6,499", status: "Confirmed" },
    { id: "BK-9022", customer: "Priya Verma", theme: "Ganpati Mandap", date: "Sep 07, 2026", amount: "₹12,499", status: "Pending" },
    { id: "BK-9023", customer: "Amit Patel", theme: "Romantic Candlelight", date: "Oct 15, 2026", amount: "₹4,999", status: "Completed" },
  ];

  return (
    <div className="w-full space-y-7 sm:space-y-8 font-sans">
      
      {/* Welcome / Hero Banner - Spans full width */}
      <div className="w-full bg-gradient-to-r from-neutral-950 via-neutral-900 to-stone-950 text-white p-6 sm:p-8 rounded-[28px] shadow-xl border border-amber-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 min-h-[120px]">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Welcome back, Super Admin</h2>
          <p className="text-neutral-300 text-xs sm:text-sm font-normal">Here is what's happening with Party Square decoration bookings today.</p>
        </div>
      </div>

      {/* Stats Grid - 4 Columns Desktop, 2 Tablet, 1 Mobile */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white border border-amber-200/80 p-5 sm:p-6 rounded-[24px] shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-full">{stat.change}</span>
              </div>
              <div>
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold block mb-1">{stat.title}</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings Section - Full width table card */}
      <div className="w-full bg-white border border-amber-200/80 rounded-[28px] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900 tracking-tight">Recent Customer Bookings</h3>
            <p className="text-xs text-neutral-500 font-medium">Latest decoration orders and event schedules</p>
          </div>
          <button className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/60 px-4 py-2 rounded-xl uppercase tracking-wider transition-all cursor-pointer">
            View All
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-amber-100 text-neutral-500 uppercase tracking-wider text-[11px]">
                <th className="pb-3.5 font-bold">Booking ID</th>
                <th className="pb-3.5 font-bold">Customer Name</th>
                <th className="pb-3.5 font-bold">Selected Theme</th>
                <th className="pb-3.5 font-bold">Event Date</th>
                <th className="pb-3.5 font-bold">Amount</th>
                <th className="pb-3.5 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-50/80">
              {recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-4 font-mono font-bold text-neutral-900">{b.id}</td>
                  <td className="py-4 font-semibold text-neutral-900">{b.customer}</td>
                  <td className="py-4 font-medium text-neutral-700">{b.theme}</td>
                  <td className="py-4 font-medium text-neutral-500">{b.date}</td>
                  <td className="py-4 font-bold text-neutral-950">{b.amount}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      b.status === "Confirmed" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" :
                      b.status === "Pending" ? "bg-amber-100 text-amber-900 border border-amber-200" : "bg-blue-100 text-blue-800 border border-blue-200"
                    }`}>
                      {b.status === "Confirmed" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      <span>{b.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}