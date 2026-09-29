"use client";

import React from "react";
import Image from "next/image";
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
  PartyPopper
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard 
          title="Total Revenue" 
          value="₹48,420" 
          change="+12.5%" 
          isUp={true} 
          comparison="vs last month"
          chartType="line-up"
        />
        <KPICard 
          title="Bookings" 
          value="1,642" 
          change="+8.2%" 
          isUp={true} 
          comparison="vs last month"
          chartType="bar-up"
        />
        <KPICard 
          title="Active Users" 
          value="23,847" 
          change="+14.2%" 
          isUp={true} 
          comparison="vs last month"
          chartType="line-up"
        />
        <KPICard 
          title="Pending Requests" 
          value="124" 
          change="-5.4%" 
          isUp={false} 
          comparison="vs last month"
          chartType="line-down"
        />
      </div>

      {/* ================= ROW 2: CHARTS & ACTIONS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Revenue Overview Chart */}
        <div className="lg:col-span-12 xl:col-span-7 bg-[#FFFFFF] rounded-[20px] border border-[#ECE9E2] p-5 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.015)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 gap-4">
            <div>
              <h2 className="font-serif text-[20px] font-semibold text-[#182033]">Revenue Overview</h2>
              <p className="text-[13px] text-[#6F7787] mt-1">Track your revenue performance over time.</p>
            </div>
            <select defaultValue="This Year" className="text-[13px] font-medium bg-[#FAFAFA] border border-[#ECE9E2] text-[#182033] rounded-[10px] px-3 py-2 outline-none cursor-pointer hover:border-[#F5A000]/50 transition-colors">
              <option value="7 Days">7 Days</option>
              <option value="30 Days">30 Days</option>
              <option value="This Year">This Year</option>
            </select>
          </div>
          
          <div className="relative h-[260px] w-full flex items-end">
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
                    <stop offset="0%" stopColor="#F5A000" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#F5A000" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path 
                  d="M0,100 L0,70 C10,65 20,80 30,60 C40,40 50,75 60,30 C70,10 80,45 90,20 L100,10 L100,100 Z" 
                  fill="url(#goldGradient)"
                />
                <path 
                  d="M0,70 C10,65 20,80 30,60 C40,40 50,75 60,30 C70,10 80,45 90,20 L100,10" 
                  fill="none" 
                  className="stroke-[#F5A000]"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Y-Axis */}
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[11px] font-medium text-[#6F7787]">
              <span>₹50k</span><span>₹40k</span><span>₹30k</span><span>₹20k</span><span>₹10k</span>
            </div>

            {/* X-Axis */}
            <div className="absolute left-10 right-0 bottom-0 flex justify-between text-[11px] font-medium text-[#6F7787]">
              <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
            </div>
          </div>
        </div>

        {/* Booking Status Donut */}
        <div className="lg:col-span-6 xl:col-span-3 bg-[#FFFFFF] rounded-[20px] border border-[#ECE9E2] p-5 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.015)] flex flex-col transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <h2 className="font-serif text-[20px] font-semibold text-[#182033] mb-8">Booking Status</h2>
          
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="relative w-44 h-44 mb-8">
              {/* Donut SVG */}
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                {/* Background Ring */}
                <path className="text-[#FAF9F6]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                {/* Confirmed - Green */}
                <path className="text-[#16A36A]" strokeDasharray="65, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                {/* Pending - Gold */}
                <path className="text-[#F5A000]" strokeDasharray="20, 100" strokeDashoffset="-65" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                {/* Cancelled - Red */}
                <path className="text-[#E05252]" strokeDasharray="10, 100" strokeDashoffset="-85" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[#182033]">1,642</span>
                <span className="text-[12px] font-medium text-[#6F7787] mt-1">Total Bookings</span>
              </div>
            </div>

            <div className="w-full space-y-3">
              <DonutLegend color="bg-[#16A36A]" label="Confirmed" value="1,067" percent="65%" />
              <DonutLegend color="bg-[#F5A000]" label="Pending" value="328" percent="20%" />
              <DonutLegend color="bg-[#E05252]" label="Cancelled" value="164" percent="10%" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-6 xl:col-span-2 flex flex-col gap-6">
          <div className="bg-[#FFFFFF] rounded-[20px] border border-[#ECE9E2] p-7 shadow-[0_2px_10px_rgba(0,0,0,0.015)] flex-1 transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <h2 className="font-serif text-[20px] font-semibold text-[#182033] mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <QuickActionButton icon={<PartyPopper size={18}/>} label="Add Decoration" />
              <QuickActionButton icon={<Calendar size={18}/>} label="Create Booking" />
              <QuickActionButton icon={<UserPlus size={18}/>} label="Add Customer" />
              <QuickActionButton icon={<ImageIcon size={18}/>} label="Upload Gallery" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= ROW 3: TODAY'S OVERVIEW & SCHEDULE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Today's Overview */}
        <div className="lg:col-span-4 bg-[#FFFFFF] rounded-[20px] border border-[#ECE9E2] p-5 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.015)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <h2 className="font-serif text-[20px] font-semibold text-[#182033] mb-6">Today's Overview</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#ECE9E2]">
              <p className="text-[12px] font-medium text-[#6F7787] mb-1">Today's Events</p>
              <p className="text-2xl font-bold text-[#182033]">3</p>
            </div>
            <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#ECE9E2]">
              <p className="text-[12px] font-medium text-[#6F7787] mb-1">New Bookings</p>
              <p className="text-2xl font-bold text-[#182033]">12</p>
            </div>
            <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#ECE9E2]">
              <p className="text-[12px] font-medium text-[#6F7787] mb-1">Pending Req.</p>
              <p className="text-2xl font-bold text-[#F5A000]">8</p>
            </div>
            <div className="p-4 rounded-[14px] bg-[#FFF4D6] border border-[#F5A000]/20">
              <p className="text-[12px] font-medium text-[#F5A000] mb-1">Today's Rev.</p>
              <p className="text-2xl font-bold text-[#182033]">₹12k</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-[#182033] rounded-[14px] text-white">
             <div>
               <p className="text-[14px] font-semibold">3 setups scheduled</p>
               <p className="text-[12px] text-gray-400 mt-0.5">For today across Jaipur</p>
             </div>
             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
               <ArrowRight size={16} />
             </button>
          </div>
        </div>

        {/* Upcoming Schedule Timeline */}
        <div className="lg:col-span-8 bg-[#FFFFFF] rounded-[20px] border border-[#ECE9E2] p-5 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.015)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-[20px] font-semibold text-[#182033]">Today's Schedule</h2>
            <button className="text-[13px] font-medium text-[#F5A000] hover:text-[#d98c00] transition-colors flex items-center gap-1">
              View Calendar <ChevronRight size={14} />
            </button>
          </div>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[58px] before:-translate-x-px before:h-full before:w-[2px] before:bg-[#ECE9E2]">
            <ScheduleItem 
              time="10:30 AM" 
              name="Rahul Sharma" 
              event="Wedding Decoration" 
              location="Jaipur Marriott" 
              status="Confirmed" 
              statusColor="bg-[#16A36A]/10 text-[#16A36A]" 
            />
            <ScheduleItem 
              time="02:00 PM" 
              name="Amit Patel" 
              event="Corporate Setup" 
              location="WTP Office, Malviya Nagar" 
              status="In Progress" 
              statusColor="bg-[#4F7FFF]/10 text-[#4F7FFF]" 
            />
            <ScheduleItem 
              time="06:00 PM" 
              name="Priya Verma" 
              event="Birthday Setup" 
              location="Mansarovar" 
              status="Pending" 
              statusColor="bg-[#F5A000]/10 text-[#F5A000]" 
            />
          </div>
        </div>
      </div>

      {/* ================= ROW 4: RECENT BOOKINGS TABLE ================= */}
      <div className="bg-[#FFFFFF] rounded-[20px] border border-[#ECE9E2] p-5 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.015)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif text-[20px] font-semibold text-[#182033]">Recent Bookings</h2>
          <button className="text-[13px] font-medium text-[#6F7787] hover:text-[#182033] transition-colors flex items-center gap-1">
            View All <ArrowRight size={14} />
          </button>
        </div>
        
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-left border-collapse whitespace-nowrap">
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
              <TableRow id="BK-9021" name="Rahul Sharma" theme="Royal Wedding" date="Oct 12, 2026" amount="₹45,000" status="Confirmed" statusColor="bg-[#16A36A]/10 text-[#16A36A]" />
              <TableRow id="BK-9022" name="Sneha Gupta" theme="Birthday Glow" date="Oct 14, 2026" amount="₹8,500" status="Pending" statusColor="bg-[#F5A000]/10 text-[#F5A000]" />
              <TableRow id="BK-9023" name="Vikram Singh" theme="Floral Romance" date="Oct 15, 2026" amount="₹22,000" status="Completed" statusColor="bg-[#182033]/10 text-[#182033]" />
              <TableRow id="BK-9024" name="Anjali Desai" theme="Baby Welcome" date="Oct 18, 2026" amount="₹12,000" status="Cancelled" statusColor="bg-[#E05252]/10 text-[#E05252]" />
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= ROW 5: THEMES & BREAKDOWN ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top Decoration Themes */}
        <div className="lg:col-span-8 bg-[#FFFFFF] rounded-[20px] border border-[#ECE9E2] p-5 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.015)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-[20px] font-semibold text-[#182033]">Top Decoration Themes</h2>
            <button className="text-[#6F7787] hover:text-[#182033]"><MoreHorizontal size={20}/></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ThemeCard img="/wedding1.png" title="Royal Wedding" bookings="245" price="₹45,000" />
            <ThemeCard img="/candeldecoration.png" title="Romantic Candlelight" bookings="182" price="₹5,500" />
            <ThemeCard img="/birthdaypic.png" title="Birthday Glow" bookings="312" price="₹8,000" />
            <ThemeCard img="/welcomebabaydecoration.png" title="Baby Welcome Setup" bookings="145" price="₹12,000" />
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="lg:col-span-4 bg-[#FFFFFF] rounded-[20px] border border-[#ECE9E2] p-5 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.015)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <h2 className="font-serif text-[20px] font-semibold text-[#182033] mb-6">Revenue Breakdown</h2>
          <div className="space-y-6">
            <BreakdownRow label="Wedding" amount="₹28,500" percent={65} color="bg-[#F5A000]" />
            <BreakdownRow label="Birthday" amount="₹12,200" percent={25} color="bg-[#182033]" />
            <BreakdownRow label="Engagement" amount="₹5,400" percent={15} color="bg-[#16A36A]" />
            <BreakdownRow label="Other Events" amount="₹2,320" percent={8} color="bg-[#ECE9E2]" />
          </div>
        </div>
      </div>

      {/* ================= ROW 6: GALLERY & ACTIVITY ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Gallery */}
        <div className="lg:col-span-6 xl:col-span-7 bg-[#FFFFFF] rounded-[20px] border border-[#ECE9E2] p-5 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.015)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-[20px] font-semibold text-[#182033]">Recent Gallery Uploads</h2>
            <button className="text-[13px] font-medium text-[#F5A000] hover:text-[#d98c00] transition-colors flex items-center gap-1">
              View Gallery <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="aspect-square rounded-[14px] overflow-hidden bg-[#FAFAFA] relative group">
              <Image src="/pic1.png" alt="Gallery" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-square rounded-[14px] overflow-hidden bg-[#FAFAFA] relative group">
              <Image src="/pic2.png" alt="Gallery" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-square rounded-[14px] overflow-hidden bg-[#FAFAFA] relative group">
              <Image src="/party1.png" alt="Gallery" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-square rounded-[14px] overflow-hidden bg-[#FAFAFA] relative group">
              <Image src="/ganesh1.png" alt="Gallery" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-6 xl:col-span-5 bg-[#FFFFFF] rounded-[20px] border border-[#ECE9E2] p-5 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.015)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-[20px] font-semibold text-[#182033]">Activity Feed</h2>
          </div>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-[2px] before:bg-[#ECE9E2]">
            <ActivityRow icon={<Calendar size={12}/>} title="New booking received" desc="Rahul Sharma booked Royal Wedding" time="10m ago" color="text-[#182033] bg-[#FAFAFA] border-[#ECE9E2]" />
            <ActivityRow icon={<CreditCard size={12}/>} title="Payment confirmed" desc="₹15,000 advance received" time="2h ago" color="text-[#16A36A] bg-[#16A36A]/10 border-[#16A36A]/20" />
            <ActivityRow icon={<UserPlus size={12}/>} title="New customer registered" desc="Priya Verma joined" time="5h ago" color="text-[#4F7FFF] bg-[#4F7FFF]/10 border-[#4F7FFF]/20" />
            <ActivityRow icon={<CheckCircle2 size={12}/>} title="Booking status changed" desc="BK-9023 marked as Completed" time="1d ago" color="text-[#F5A000] bg-[#FFF4D6] border-[#F5A000]/20" />
          </div>
        </div>

      </div>
    </div>
  );
}

// ================= SUB COMPONENTS =================

function KPICard({ title, value, change, isUp, comparison, chartType }: { title: string, value: string, change: string, isUp: boolean, comparison: string, chartType: string }) {
  return (
    <div className="bg-[#FFFFFF] rounded-[20px] border border-[#ECE9E2] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.015)] flex flex-col group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[15px] font-semibold text-[#182033]">{title}</h3>
        <span className={`text-[12px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${isUp ? 'text-[#16A36A] bg-[#16A36A]/10' : 'text-[#E05252] bg-[#E05252]/10'}`}>
          {isUp ? <TrendingUp size={12}/> : <TrendingDown size={12}/>} {change}
        </span>
      </div>
      
      <div className="flex items-end justify-between mt-auto">
        <div>
          <p className="font-serif text-[28px] font-semibold text-[#182033] leading-none mb-1">{value}</p>
          <p className="text-[12px] text-[#6F7787]">{comparison}</p>
        </div>
        
        {/* Subtle decorative chart */}
        <div className="h-10 w-16 opacity-60">
          <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
            {chartType.includes('up') ? (
              <path d="M0,40 L0,30 C20,35 40,15 60,20 C80,25 90,5 100,10 L100,40 Z" fill="#F5A000" fillOpacity="0.1" />
            ) : (
              <path d="M0,40 L0,10 C20,15 40,5 60,25 C80,20 90,35 100,30 L100,40 Z" fill="#E05252" fillOpacity="0.1" />
            )}
            {chartType.includes('up') ? (
              <path d="M0,30 C20,35 40,15 60,20 C80,25 90,5 100,10" fill="none" stroke="#F5A000" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M0,10 C20,15 40,5 60,25 C80,20 90,35 100,30" fill="none" stroke="#E05252" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </div>
      </div>
    </div>
  )
}

function DonutLegend({ color, label, value, percent }: { color: string, label: string, value: string, percent: string }) {
  return (
    <div className="flex items-center justify-between text-[14px]">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <span className="font-medium text-[#6F7787]">{label}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-semibold text-[#182033]">{value}</span>
        <span className="text-[12px] font-medium text-[#6F7787] w-8 text-right">{percent}</span>
      </div>
    </div>
  )
}

function QuickActionButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#FAFAFA] border border-[#ECE9E2] hover:border-[#F5A000]/30 hover:bg-[#FFF4D6] text-[#182033] hover:text-[#F5A000] rounded-[12px] text-[14px] font-semibold transition-all duration-200 group">
      <span className="text-[#6F7787] group-hover:text-[#F5A000] transition-colors">{icon}</span>
      {label}
    </button>
  )
}

function ScheduleItem({ time, name, event, location, status, statusColor }: { time: string, name: string, event: string, location: string, status: string, statusColor: string }) {
  return (
    <div className="relative flex gap-6 pl-4 group">
      <div className="w-[80px] pt-0.5 text-right flex-shrink-0">
        <span className="text-[12px] font-bold text-[#182033] block">{time.split(' ')[0]}</span>
        <span className="text-[10px] font-medium text-[#6F7787]">{time.split(' ')[1]}</span>
      </div>
      
      {/* Timeline Dot */}
      <div className="absolute left-[58px] -translate-x-1/2 top-1.5 w-3 h-3 rounded-full bg-white border-2 border-[#F5A000] shadow-[0_0_0_4px_white] z-10 group-hover:scale-125 transition-transform duration-300"></div>
      
      <div className="flex-1 bg-[#FAFAFA] border border-[#ECE9E2] rounded-[14px] p-4 group-hover:border-[#F5A000]/30 transition-colors">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-[#182033]">{name}</h4>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor}`}>
            {status}
          </span>
        </div>
        <p className="text-[13px] text-[#182033] font-medium mb-1">{event}</p>
        <p className="text-[12px] text-[#6F7787] flex items-center gap-1">
          <MapPin size={12} /> {location}
        </p>
      </div>
    </div>
  )
}

function TableRow({ id, name, theme, date, amount, status, statusColor }: { id: string, name: string, theme: string, date: string, amount: string, status: string, statusColor: string }) {
  return (
    <tr className="hover:bg-[#FAFAFA] transition-colors group">
      <td className="py-4 pr-4 font-medium text-[#182033]">{id}</td>
      <td className="py-4 px-4 font-semibold text-[#182033]">{name}</td>
      <td className="py-4 px-4 text-[#6F7787]">{theme}</td>
      <td className="py-4 px-4 text-[#6F7787]">{date}</td>
      <td className="py-4 px-4 font-semibold text-[#182033]">{amount}</td>
      <td className="py-4 px-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${statusColor}`}>
          {status}
        </span>
      </td>
      <td className="py-4 pl-4 text-right">
        <button className="text-[13px] font-medium text-[#6F7787] hover:text-[#F5A000] transition-colors opacity-0 group-hover:opacity-100">
          View
        </button>
      </td>
    </tr>
  )
}

function ThemeCard({ img, title, bookings, price }: { img: string, title: string, bookings: string, price: string }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-[14px] hover:bg-[#FAFAFA] border border-transparent hover:border-[#ECE9E2] transition-colors cursor-pointer group">
      <div className="w-16 h-16 rounded-[10px] overflow-hidden bg-gray-100 relative shrink-0">
        <Image src={img} alt={title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div>
        <h4 className="font-semibold text-[#182033] text-[14px] leading-tight mb-1 group-hover:text-[#F5A000] transition-colors">{title}</h4>
        <div className="flex items-center gap-3 text-[12px] text-[#6F7787]">
          <span>{bookings} bookings</span>
          <span className="w-1 h-1 rounded-full bg-[#ECE9E2]"></span>
          <span className="font-semibold text-[#182033]">From {price}</span>
        </div>
      </div>
    </div>
  )
}

function BreakdownRow({ label, amount, percent, color }: { label: string, amount: string, percent: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between text-[13px] font-semibold mb-2">
        <span className="text-[#6F7787]">{label}</span>
        <span className="text-[#182033]">{amount}</span>
      </div>
      <div className="w-full h-2 bg-[#FAFAFA] border border-[#ECE9E2] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  )
}

function ActivityRow({ icon, title, desc, time, color }: { icon: React.ReactNode, title: string, desc: string, time: string, color: string }) {
  return (
    <div className="relative flex gap-4">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center relative z-10 border ${color}`}>
        {icon}
      </div>
      <div className="flex-1 pb-1">
        <div className="flex justify-between items-start mb-0.5">
          <p className="text-[14px] font-semibold text-[#182033] leading-tight">{title}</p>
          <span className="text-[11px] font-medium text-[#6F7787] shrink-0">{time}</span>
        </div>
        <p className="text-[12px] text-[#6F7787] leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}