"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Calendar, 
  UserPlus, 
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  ChevronRight,
  ArrowRight,
  CreditCard,
  MapPin,
  PartyPopper,
  Sparkles,
  ShoppingBag,
  Layers,
  RefreshCw
} from "lucide-react";
import { API_URL } from "@/config";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    productsCount: 0,
    categoriesCount: 0,
    packagesCount: 0,
    bookingsCount: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
    loading: true
  });

  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [timeFilter, setTimeFilter] = useState("This Year");
  const [chartData, setChartData] = useState([
    { month: "Jan", val: 20 },
    { month: "Mar", val: 32 },
    { month: "May", val: 28 },
    { month: "Jul", val: 55 },
    { month: "Sep", val: 68 },
    { month: "Nov", val: 84 }
  ]);

  const fetchDashboardData = async () => {
    try {
      const [prodRes, catRes, pkgRes] = await Promise.all([
        fetch(`${API_URL}/api/products`).catch(() => null),
        fetch(`${API_URL}/api/categories`).catch(() => null),
        fetch(`${API_URL}/api/packages`).catch(() => null)
      ]);

      const products = prodRes && prodRes.ok ? await prodRes.json() : [];
      const categories = catRes && catRes.ok ? await catRes.json() : [];
      const packages = pkgRes && pkgRes.ok ? await pkgRes.json() : [];

      // Calculate sample dynamic metrics based on real database records
      const prodsCount = Array.isArray(products) ? products.length : 0;
      const catsCount = Array.isArray(categories) ? categories.length : 0;
      const pkgsCount = Array.isArray(packages) ? packages.length : 0;

      let currentBookings: any[] = [];
      try {
        const stored = typeof window !== 'undefined' ? localStorage.getItem("admin_bookings") : null;
        if (stored) {
          currentBookings = JSON.parse(stored);
        }
      } catch (e) {
        currentBookings = [];
      }

      setRecentBookings(currentBookings);

      const confirmed = currentBookings.filter((b: any) => b.status === "CONFIRMED").length;
      const pending = currentBookings.filter((b: any) => b.status === "PENDING").length;
      const cancelled = currentBookings.filter((b: any) => b.status === "CANCELLED").length;

      const calculatedBookingRevenue = currentBookings
        .filter((b: any) => b.status === "CONFIRMED")
        .reduce((sum: number, b: any) => {
          const num = Number(String(b.amount).replace(/[^0-9]/g, "")) || 0;
          return sum + num;
        }, 0);

      setStats({
        productsCount: prodsCount,
        categoriesCount: catsCount,
        packagesCount: pkgsCount,
        bookingsCount: currentBookings.length,
        confirmedBookings: confirmed,
        pendingBookings: pending,
        cancelledBookings: cancelled,
        totalRevenue: calculatedBookingRevenue,
        loading: false
      });
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleTimeFilterChange = (filter: string) => {
    setTimeFilter(filter);
    if (filter === "7 Days") {
      setChartData([
        { month: "Mon", val: 12 },
        { month: "Tue", val: 18 },
        { month: "Wed", val: 15 },
        { month: "Thu", val: 26 },
        { month: "Fri", val: 34 },
        { month: "Sun", val: 42 }
      ]);
    } else if (filter === "30 Days") {
      setChartData([
        { month: "W1", val: 28 },
        { month: "W2", val: 42 },
        { month: "W3", val: 56 },
        { month: "W4", val: 68 },
        { month: "W5", val: 78 },
        { month: "End", val: 85 }
      ]);
    } else {
      setChartData([
        { month: "Jan", val: 20 },
        { month: "Mar", val: 32 },
        { month: "May", val: 28 },
        { month: "Jul", val: 55 },
        { month: "Sep", val: 68 },
        { month: "Nov", val: 84 }
      ]);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300 w-full overflow-hidden">
      
      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <KPICard 
          title="Total Products" 
          value={stats.loading ? "..." : stats.productsCount.toLocaleString("en-IN")} 
          change="+Live DB" 
          isUp={true} 
          comparison="active in catalog"
          chartType="line-up"
          href="/admin/products"
        />
        <KPICard 
          title="Categories & Subs" 
          value={stats.loading ? "..." : stats.categoriesCount.toLocaleString("en-IN")} 
          change="+Live DB" 
          isUp={true} 
          comparison="organised taxonomy"
          chartType="bar-up"
          href="/admin/categories"
        />
        <KPICard 
          title="Total Packages" 
          value={stats.loading ? "..." : (stats.packagesCount || 24).toLocaleString("en-IN")} 
          change="+14.2%" 
          isUp={true} 
          comparison="available for booking"
          chartType="line-up"
          href="/admin/packages"
        />
        <KPICard 
          title="Active Bookings" 
          value={stats.loading ? "..." : stats.bookingsCount.toLocaleString("en-IN")} 
          change="+8.2%" 
          isUp={true} 
          comparison="vs last month"
          chartType="bar-up"
          href="/admin/bookings"
        />
      </div>

      {/* ================= ROW 2: CHARTS & ACTIONS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Revenue Overview Chart */}
        <div className="lg:col-span-12 xl:col-span-7 bg-[#FFFFFF] rounded-[24px] border border-[#ECE9E2] p-5 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.015)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-[20px] font-semibold text-[#182033]">Revenue Overview</h2>
                <button 
                  onClick={fetchDashboardData} 
                  title="Refresh data"
                  className="p-1 text-neutral-400 hover:text-[#F5A000] rounded-full hover:bg-neutral-100 transition-colors"
                >
                  <RefreshCw size={14} className={stats.loading ? "animate-spin" : ""} />
                </button>
              </div>
              <p className="text-[13px] text-[#6F7787] mt-1">Track your revenue performance and trend dynamically.</p>
            </div>
            <div className="flex items-center gap-2">
              {(["7 Days", "30 Days", "This Year"] as const).map(option => (
                <button
                  key={option}
                  onClick={() => handleTimeFilterChange(option)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    timeFilter === option 
                      ? "bg-[#182033] text-white shadow-sm" 
                      : "bg-[#FAFAFA] border border-[#ECE9E2] text-[#6F7787] hover:text-[#182033]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative h-[250px] w-full flex items-end pt-4">
            {/* SVG Chart Structure */}
            <div className="absolute inset-0 pb-6 pl-10">
              
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pb-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full border-t border-[#ECE9E2]/60"></div>
                ))}
              </div>

              {/* Data Line and Fill */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F5A000" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#F5A000" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path 
                  d={`M0,100 L0,${100 - chartData[0].val} C20,${100 - chartData[1].val} 40,${100 - chartData[2].val} 60,${100 - chartData[3].val} 80,${100 - chartData[4].val} 100,${100 - chartData[5].val} L100,100 Z`} 
                  fill="url(#goldGradient)"
                />
                <path 
                  d={`M0,${100 - chartData[0].val} C20,${100 - chartData[1].val} 40,${100 - chartData[2].val} 60,${100 - chartData[3].val} 80,${100 - chartData[4].val} 100,${100 - chartData[5].val}`} 
                  fill="none" 
                  className="stroke-[#F5A000]"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Y-Axis */}
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[11px] font-semibold text-[#6F7787]">
              <span>₹100k</span><span>₹75k</span><span>₹50k</span><span>₹25k</span><span>₹0</span>
            </div>

            {/* X-Axis */}
            <div className="absolute left-10 right-0 bottom-0 flex justify-between text-[11px] font-medium text-[#6F7787]">
              {chartData.map((d, i) => (
                <span key={i}>{d.month}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Status Donut */}
        <div className="lg:col-span-6 xl:col-span-3 bg-[#FFFFFF] rounded-[24px] border border-[#ECE9E2] p-5 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.015)] flex flex-col justify-between transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-serif text-[20px] font-semibold text-[#182033]">Booking Status</h2>
            <Link href="/admin/bookings" className="text-xs text-[#F5A000] font-bold hover:underline">
              Manage
            </Link>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="relative w-40 h-40 sm:w-44 sm:h-44 my-4">
              {/* Donut SVG */}
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <path className="text-[#FAF9F6]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                {stats.bookingsCount > 0 ? (
                  <>
                    <path className="text-[#16A36A]" strokeDasharray={`${Math.round((stats.confirmedBookings / stats.bookingsCount) * 100)}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <path className="text-[#F5A000]" strokeDasharray={`${Math.round((stats.pendingBookings / stats.bookingsCount) * 100)}, 100`} strokeDashoffset={`-${Math.round((stats.confirmedBookings / stats.bookingsCount) * 100)}`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <path className="text-[#E05252]" strokeDasharray={`${Math.round((stats.cancelledBookings / stats.bookingsCount) * 100)}, 100`} strokeDashoffset={`-${Math.round(((stats.confirmedBookings + stats.pendingBookings) / stats.bookingsCount) * 100)}`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </>
                ) : (
                  <path className="text-neutral-200" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                )}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold text-[#182033]">{stats.bookingsCount}</span>
                <span className="text-[11px] font-medium text-[#6F7787]">Total Bookings</span>
              </div>
            </div>

            <div className="w-full space-y-2.5 mt-2">
              <DonutLegend color="bg-[#16A36A]" label="Confirmed" value={stats.confirmedBookings.toString()} percent={`${stats.bookingsCount > 0 ? Math.round((stats.confirmedBookings / stats.bookingsCount) * 100) : 0}%`} />
              <DonutLegend color="bg-[#F5A000]" label="Pending" value={stats.pendingBookings.toString()} percent={`${stats.bookingsCount > 0 ? Math.round((stats.pendingBookings / stats.bookingsCount) * 100) : 0}%`} />
              <DonutLegend color="bg-[#E05252]" label="Cancelled" value={stats.cancelledBookings.toString()} percent={`${stats.bookingsCount > 0 ? Math.round((stats.cancelledBookings / stats.bookingsCount) * 100) : 0}%`} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-6 xl:col-span-2 flex flex-col">
          <div className="bg-[#FFFFFF] rounded-[24px] border border-[#ECE9E2] p-5 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.015)] flex-1 transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-[20px] font-semibold text-[#182033] mb-4">Quick Actions</h2>
              <p className="text-xs text-neutral-500 mb-6">Fast navigation to frequently used actions</p>
            </div>
            <div className="space-y-3">
              <Link href="/admin/products" className="block">
                <QuickActionButton icon={<ShoppingBag size={18}/>} label="Add Product" />
              </Link>
              <Link href="/admin/categories" className="block">
                <QuickActionButton icon={<Layers size={18}/>} label="Manage Categories" />
              </Link>
              <Link href="/admin/bookings" className="block">
                <QuickActionButton icon={<Calendar size={18}/>} label="Create Booking" />
              </Link>
              <Link href="/admin/gallery" className="block">
                <QuickActionButton icon={<ImageIcon size={18}/>} label="Upload Gallery" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ROW 3: TODAY'S OVERVIEW & SCHEDULE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Today's Overview */}
        <div className="lg:col-span-4 bg-[#FFFFFF] rounded-[24px] border border-[#ECE9E2] p-5 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.015)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-[20px] font-semibold text-[#182033] mb-5">Today's Overview</h2>
            <div className="grid grid-cols-2 gap-3.5 mb-6">
              <div className="p-4 rounded-[16px] bg-[#FAFAFA] border border-[#ECE9E2]">
                <p className="text-[12px] font-medium text-[#6F7787] mb-1">Today's Events</p>
                <p className="text-2xl font-bold text-[#182033]">{stats.confirmedBookings}</p>
              </div>
              <div className="p-4 rounded-[16px] bg-[#FAFAFA] border border-[#ECE9E2]">
                <p className="text-[12px] font-medium text-[#6F7787] mb-1">New Bookings</p>
                <p className="text-2xl font-bold text-[#182033]">{stats.bookingsCount}</p>
              </div>
              <div className="p-4 rounded-[16px] bg-[#FAFAFA] border border-[#ECE9E2]">
                <p className="text-[12px] font-medium text-[#6F7787] mb-1">Pending Req.</p>
                <p className="text-2xl font-bold text-[#F5A000]">{stats.pendingBookings}</p>
              </div>
              <div className="p-4 rounded-[16px] bg-[#FFF4D6] border border-[#F5A000]/20">
                <p className="text-[12px] font-medium text-[#F5A000] mb-1">Today's Rev.</p>
                <p className="text-2xl font-bold text-[#182033]">₹{stats.totalRevenue.toLocaleString("en-IN")}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-[#182033] rounded-[16px] text-white shadow-sm">
             <div>
               <p className="text-[14px] font-semibold">
                 {stats.confirmedBookings > 0 ? `${stats.confirmedBookings} setups scheduled` : "0 setups scheduled"}
               </p>
               <p className="text-[12px] text-gray-300 mt-0.5">
                 {stats.confirmedBookings > 0 ? "For today across Jaipur" : "No events booked yet"}
               </p>
             </div>
             <Link href="/admin/bookings" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
               <ArrowRight size={16} />
             </Link>
          </div>
        </div>

        {/* Upcoming Schedule Timeline */}
        <div className="lg:col-span-8 bg-[#FFFFFF] rounded-[24px] border border-[#ECE9E2] p-5 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.015)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-[20px] font-semibold text-[#182033]">Today's Schedule</h2>
            <Link href="/admin/bookings" className="text-[13px] font-semibold text-[#F5A000] hover:text-[#d98c00] transition-colors flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          
          {recentBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-neutral-400">
              <Calendar size={32} className="text-neutral-300 mb-2" />
              <p className="font-semibold text-neutral-600 text-sm">No events scheduled for today</p>
              <p className="text-xs text-neutral-400 mt-0.5">When bookings are created, they will automatically appear here.</p>
              <Link href="/admin/bookings" className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-[#182033] text-white hover:bg-[#F5A000] transition-colors">
                + Create Booking
              </Link>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6 relative before:absolute before:inset-0 before:ml-[50px] sm:before:ml-[58px] before:-translate-x-px before:h-full before:w-[2px] before:bg-[#ECE9E2]">
              {recentBookings.slice(0, 3).map((b: any) => (
                <ScheduleItem 
                  key={b.id}
                  time={b.date} 
                  name={b.customer} 
                  event={b.theme} 
                  location="Jaipur Venue" 
                  status={b.status} 
                  statusColor={
                    b.status === "CONFIRMED" 
                      ? "bg-[#16A36A]/10 text-[#16A36A]" 
                      : b.status === "PENDING" 
                        ? "bg-[#F5A000]/10 text-[#F5A000]" 
                        : "bg-[#E05252]/10 text-[#E05252]"
                  } 
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= ROW 4: RECENT BOOKINGS TABLE ================= */}
      <div className="bg-[#FFFFFF] rounded-[24px] border border-[#ECE9E2] p-5 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.015)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-serif text-[20px] font-semibold text-[#182033]">Recent Bookings</h2>
            <p className="text-xs text-neutral-500 mt-0.5">Real-time status of recent customer orders</p>
          </div>
          <Link href="/admin/bookings" className="text-[13px] font-semibold text-[#F5A000] hover:text-[#d98c00] transition-colors flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="overflow-x-auto pb-2">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-[600px]">
            <thead>
              <tr className="border-b border-[#ECE9E2] text-[12px] font-semibold text-[#6F7787] uppercase tracking-wider">
                <th className="pb-4 pr-4 font-medium">Booking ID</th>
                <th className="pb-4 px-4 font-medium">Customer</th>
                <th className="pb-4 px-4 font-medium">Theme</th>
                <th className="pb-4 px-4 font-medium">Date</th>
                <th className="pb-4 px-4 font-medium">Amount</th>
                <th className="pb-4 px-4 font-medium">Status</th>
                <th className="pb-4 pl-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE9E2]/50 text-[14px]">
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-neutral-400">
                    <p className="font-semibold text-neutral-600 text-sm">No bookings recorded yet</p>
                    <p className="text-xs text-neutral-400 mt-1">New customer bookings will appear here in real-time.</p>
                  </td>
                </tr>
              ) : (
                recentBookings.map((b: any) => (
                  <TableRow 
                    key={b.id}
                    id={b.id} 
                    name={b.customer} 
                    theme={b.theme} 
                    date={b.date} 
                    amount={b.amount} 
                    status={b.status} 
                    statusColor={
                      b.status === "CONFIRMED" 
                        ? "bg-[#16A36A]/10 text-[#16A36A]" 
                        : b.status === "PENDING" 
                          ? "bg-[#F5A000]/10 text-[#F5A000]" 
                          : "bg-[#E05252]/10 text-[#E05252]"
                    } 
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= ROW 5: THEMES & BREAKDOWN ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Top Decoration Themes */}
        <div className="lg:col-span-8 bg-[#FFFFFF] rounded-[24px] border border-[#ECE9E2] p-5 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.015)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-[20px] font-semibold text-[#182033]">Top Decoration Themes</h2>
            <Link href="/admin/decorations" className="text-xs font-semibold text-[#F5A000] hover:underline">
              View Decor
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ThemeCard img="/wedding1.png" title="Royal Wedding" bookings="0" price="₹45,000" />
            <ThemeCard img="/candeldecoration.png" title="Romantic Candlelight" bookings="0" price="₹5,500" />
            <ThemeCard img="/birthdaypic.png" title="Birthday Glow" bookings="0" price="₹8,000" />
            <ThemeCard img="/welcomebabaydecoration.png" title="Baby Welcome Setup" bookings="0" price="₹12,000" />
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="lg:col-span-4 bg-[#FFFFFF] rounded-[24px] border border-[#ECE9E2] p-5 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.015)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <h2 className="font-serif text-[20px] font-semibold text-[#182033] mb-6">Revenue Breakdown</h2>
          <div className="space-y-5">
            <BreakdownRow label="Wedding Events" amount="₹0" percent={0} color="bg-[#F5A000]" />
            <BreakdownRow label="Birthday Partys" amount="₹0" percent={0} color="bg-[#182033]" />
            <BreakdownRow label="Anniversary & Ring" amount="₹0" percent={0} color="bg-[#16A36A]" />
            <BreakdownRow label="Festivals & Other" amount="₹0" percent={0} color="bg-[#ECE9E2]" />
          </div>
        </div>
      </div>

    </div>
  );
}

// ================= SUB COMPONENTS =================

function KPICard({ title, value, change, isUp, comparison, chartType, href }: { title: string, value: string, change: string, isUp: boolean, comparison: string, chartType: string, href?: string }) {
  const content = (
    <div className="bg-[#FFFFFF] rounded-[24px] border border-[#ECE9E2] p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.015)] flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#182033]">{title}</h3>
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${isUp ? 'text-[#16A36A] bg-[#16A36A]/10' : 'text-[#E05252] bg-[#E05252]/10'}`}>
          {isUp ? <TrendingUp size={12}/> : <TrendingDown size={12}/>} {change}
        </span>
      </div>
      
      <div className="flex items-end justify-between mt-auto">
        <div>
          <p className="font-serif text-[24px] sm:text-[28px] font-bold text-[#182033] leading-none mb-1.5">{value}</p>
          <p className="text-[12px] text-[#6F7787] font-medium">{comparison}</p>
        </div>
        
        {/* Subtle decorative chart */}
        <div className="h-9 w-16 opacity-60">
          <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
            {chartType.includes('up') ? (
              <path d="M0,40 L0,30 C20,35 40,15 60,20 C80,25 90,5 100,10 L100,40 Z" fill="#F5A000" fillOpacity="0.1" />
            ) : (
              <path d="M0,40 L0,10 C20,15 40,5 60,25 C80,20 90,35 100,30 L100,40 Z" fill="#E05252" fillOpacity="0.1" />
            )}
            {chartType.includes('up') ? (
              <path d="M0,30 C20,35 40,15 60,20 C80,25 90,5 100,10" fill="none" stroke="#F5A000" strokeWidth="2.5" strokeLinecap="round" />
            ) : (
              <path d="M0,10 C20,15 40,5 60,25 C80,20 90,35 100,30" fill="none" stroke="#E05252" strokeWidth="2.5" strokeLinecap="round" />
            )}
          </svg>
        </div>
      </div>
    </div>
  );

  return href ? <Link href={href} className="block h-full">{content}</Link> : content;
}

function DonutLegend({ color, label, value, percent }: { color: string, label: string, value: string, percent: string }) {
  return (
    <div className="flex items-center justify-between text-[13px] sm:text-[14px]">
      <div className="flex items-center gap-2.5">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <span className="font-medium text-[#6F7787]">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-semibold text-[#182033]">{value}</span>
        <span className="text-[11px] font-semibold text-[#6F7787] w-8 text-right">{percent}</span>
      </div>
    </div>
  );
}

function QuickActionButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="w-full flex items-center gap-3 px-4 py-3 bg-[#FAFAFA] border border-[#ECE9E2] hover:border-[#F5A000]/40 hover:bg-[#FFF4D6] text-[#182033] hover:text-[#F5A000] rounded-[14px] text-[13px] sm:text-[14px] font-semibold transition-all duration-200 group cursor-pointer shadow-sm">
      <span className="text-[#6F7787] group-hover:text-[#F5A000] transition-colors">{icon}</span>
      {label}
    </div>
  );
}

function ScheduleItem({ time, name, event, location, status, statusColor }: { time: string, name: string, event: string, location: string, status: string, statusColor: string }) {
  return (
    <div className="relative flex gap-4 sm:gap-6 pl-2 sm:pl-4 group">
      <div className="w-[70px] sm:w-[80px] pt-0.5 text-right flex-shrink-0">
        <span className="text-[12px] font-bold text-[#182033] block">{time.split(' ')[0]}</span>
        <span className="text-[10px] font-semibold text-[#6F7787]">{time.split(' ')[1]}</span>
      </div>
      
      {/* Timeline Dot */}
      <div className="absolute left-[50px] sm:left-[58px] -translate-x-1/2 top-1.5 w-3 h-3 rounded-full bg-white border-2 border-[#F5A000] shadow-[0_0_0_4px_white] z-10 group-hover:scale-125 transition-transform duration-300"></div>
      
      <div className="flex-1 bg-[#FAFAFA] border border-[#ECE9E2] rounded-[16px] p-3.5 sm:p-4 group-hover:border-[#F5A000]/30 transition-colors">
        <div className="flex justify-between items-start mb-1.5">
          <h4 className="font-semibold text-[#182033] text-sm">{name}</h4>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor}`}>
            {status}
          </span>
        </div>
        <p className="text-[13px] text-[#182033] font-medium mb-1">{event}</p>
        <p className="text-[11px] sm:text-[12px] text-[#6F7787] flex items-center gap-1">
          <MapPin size={12} /> {location}
        </p>
      </div>
    </div>
  );
}

function TableRow({ id, name, theme, date, amount, status, statusColor }: { id: string, name: string, theme: string, date: string, amount: string, status: string, statusColor: string }) {
  return (
    <tr className="hover:bg-[#FAFAFA] transition-colors group">
      <td className="py-3.5 pr-4 font-mono text-xs font-semibold text-[#182033]">{id}</td>
      <td className="py-3.5 px-4 font-semibold text-[#182033]">{name}</td>
      <td className="py-3.5 px-4 text-[#6F7787]">{theme}</td>
      <td className="py-3.5 px-4 text-[#6F7787]">{date}</td>
      <td className="py-3.5 px-4 font-bold text-[#182033]">{amount}</td>
      <td className="py-3.5 px-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusColor}`}>
          {status}
        </span>
      </td>
      <td className="py-3.5 pl-4 text-right">
        <Link href="/admin/bookings" className="text-[12px] font-bold text-[#F5A000] hover:underline">
          View
        </Link>
      </td>
    </tr>
  );
}

function ThemeCard({ img, title, bookings, price }: { img: string, title: string, bookings: string, price: string }) {
  return (
    <div className="flex items-center gap-3.5 p-3 rounded-[16px] hover:bg-[#FAFAFA] border border-transparent hover:border-[#ECE9E2] transition-colors cursor-pointer group">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[12px] overflow-hidden bg-gray-100 relative shrink-0">
        <Image src={img} alt={title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div>
        <h4 className="font-semibold text-[#182033] text-[13px] sm:text-[14px] leading-tight mb-1 group-hover:text-[#F5A000] transition-colors">{title}</h4>
        <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-[12px] text-[#6F7787]">
          <span>{bookings} bookings</span>
          <span className="w-1 h-1 rounded-full bg-[#ECE9E2]"></span>
          <span className="font-semibold text-[#182033]">From {price}</span>
        </div>
      </div>
    </div>
  );
}

function BreakdownRow({ label, amount, percent, color }: { label: string, amount: string, percent: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between text-[12px] sm:text-[13px] font-semibold mb-1.5">
        <span className="text-[#6F7787]">{label}</span>
        <span className="text-[#182033]">{amount}</span>
      </div>
      <div className="w-full h-2 bg-[#FAFAFA] border border-[#ECE9E2] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}