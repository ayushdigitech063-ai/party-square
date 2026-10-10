"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Image,
  Star,
  TrendingUp,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  MessageSquare,
  Ticket,
  Briefcase,
  Users2,
  LogOut,
  HelpCircle
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    document.cookie = "adminToken=; path=/; max-age=0";
    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Themes & Packages", href: "/admin/themes", icon: LayoutDashboard }, // Adjust icon if needed
    { name: "Gallery Manager", href: "/admin/gallery", icon: Image },
    { name: "Coupons", href: "/admin/coupons", icon: Ticket },
    { name: "Reviews & Ratings", href: "/admin/reviews", icon: Star },
    { name: "Analytics", href: "/admin/analytics", icon: TrendingUp },
    { name: "Finance", href: "/admin/finance", icon: Briefcase },
    { name: "Staff Management", href: "/admin/staff", icon: Users2 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#202522] font-sans flex selection:bg-[#8CBC67] selection:text-neutral-950">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#111111] text-[#6B706C] flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-6 px-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8 px-2">
            <div className="w-10 h-10 bg-white rounded-xl overflow-hidden flex items-center justify-center p-1">
              <img src="/logo-icon.png" alt="Party Square" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wide text-white block leading-tight">
                Party Square
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#8CBC67]/80 font-semibold">
                EVENT DECORATION
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden ml-auto text-[#6B706C] hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#8CBC67]/20 to-transparent text-[#8CBC67] border-l-2 border-[#8CBC67]"
                      : "hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-[#8CBC67]" : "text-[#6B706C]"} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-3 px-2 pt-4 border-t border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#EEF6EB] text-[#202522] flex items-center justify-center font-bold text-xs">
              SA
            </div>
            <div>
              <p className="text-xs font-bold text-white">Super Admin</p>
              <p className="text-[10px] text-[#6B706C]">admin@partysquare.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        {/* Topbar */}
        <header className="fixed top-0 right-0 left-0 lg:left-64 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E8E3] px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#202522]"
            >
              <Menu size={20} />
            </button>
            <div className="relative w-full max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B706C]" size={16} />
              <input 
                type="text" 
                placeholder="Search bookings, customers, themes..." 
                className="w-full pl-10 pr-4 py-2 bg-neutral-100/50 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/20"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <button className="relative text-[#6B706C] hover:text-[#202522]">
              <MessageSquare size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#F7D6C7]0 rounded-full border-2 border-white"></span>
            </button>
            <button className="relative text-[#6B706C] hover:text-[#202522]">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#F7D6C7]0 text-white text-[8px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                3
              </span>
            </button>
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 pl-4 border-l border-[#E8E8E3] focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-[#EEF6EB] text-[#202522] flex items-center justify-center font-bold text-xs hover:bg-[#F7D6C7] transition">
                  SA
                </div>
                <span className="text-sm font-semibold text-[#202522] hidden sm:block">Super Admin</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E8E8E3] rounded-xl shadow-lg py-1 z-50 overflow-hidden">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-[#F7D6C7] flex items-center space-x-3 transition"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 bg-[#FCFBF7] mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}


