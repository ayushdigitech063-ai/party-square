"use client";

import React from "react";
import { Sparkles, CalendarCheck, Users, TrendingUp, ArrowUpRight, Clock, CheckCircle2 } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Bookings", value: "1,248", change: "+12%", icon: CalendarCheck, color: "bg-amber-500" },
    { title: "Active Themes", value: "24", change: "+4 new", icon: Sparkles, color: "bg-stone-900 text-white" },
    { title: "Total Revenue", value: "₹24,80,000", change: "+18%", icon: TrendingUp, color: "bg-amber-400" },
    { title: "Registered Users", value: "3,840", change: "+250", icon: Users, color: "bg-stone-800 text-white" },
  ];

  const recentBookings = [
    { id: "BK-9021", customer: "Rahul Sharma", theme: "Christmas Magic", date: "Dec 24, 2026", amount: "₹6,499", status: "Confirmed" },
    { id: "BK-9022", customer: "Priya Verma", theme: "Ganpati Mandap", date: "Sep 07, 2026", amount: "₹12,499", status: "Pending" },
    { id: "BK-9023", customer: "Amit Patel", theme: "Romantic Candlelight", date: "Oct 15, 2026", amount: "₹4,999", status: "Completed" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-stone-950 to-neutral-950 text-white p-8 rounded-[32px] shadow-xl border border-amber-400/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles size={13} />
            <span>Dashboard Overview</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">Welcome back, Super Admin</h2>
          <p className="text-neutral-300 text-xs sm:text-sm font-light">Here is what's happening with DreamDeco decoration bookings today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white border border-amber-200/80 p-6 rounded-3xl shadow-sm hover:shadow-md transition space-y-4">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${stat.color}`}>
                  <Icon size={22} />
                </div>
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">{stat.change}</span>
              </div>
              <div>
                <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">{stat.title}</span>
                <h3 className="font-serif text-2xl font-bold text-neutral-900 mt-1">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-neutral-900">Recent Customer Bookings</h3>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider cursor-pointer hover:underline">View All</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-amber-100 text-neutral-400 uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-semibold">Booking ID</th>
                <th className="pb-3 font-semibold">Customer Name</th>
                <th className="pb-3 font-semibold">Selected Theme</th>
                <th className="pb-3 font-semibold">Event Date</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-50">
              {recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-amber-50/50 transition">
                  <td className="py-4 font-mono font-bold text-neutral-900">{b.id}</td>
                  <td className="py-4 font-medium text-neutral-800">{b.customer}</td>
                  <td className="py-4 text-neutral-600">{b.theme}</td>
                  <td className="py-4 text-neutral-500">{b.date}</td>
                  <td className="py-4 font-bold text-neutral-900">{b.amount}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      b.status === "Confirmed" ? "bg-green-100 text-green-800" :
                      b.status === "Pending" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
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