"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Sparkles, 
  CalendarCheck, 
  Users, 
  Settings, 
  TrendingUp, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Image,
  Star
} from "lucide-react";
// fguydju
//hudg
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Decorations & Themes", href: "/admin/decorations", icon: Sparkles },
    { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
    { name: "Customers", href: "/admin/users", icon: Users },
    { name: "Gallery Manager", href: "/admin/gallery", icon: Image },      // Naya add kiya
    { name: "Reviews & Ratings", href: "/admin/reviews", icon: Star },     // Naya add kiya
    { name: "Analytics", href: "/admin/analytics", icon: TrendingUp },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F3EFE9] text-neutral-900 font-sans flex selection:bg-amber-400 selection:text-neutral-950">
      
      {/* Luxury Sidebar for Desktop & Mobile */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-neutral-950 text-white flex flex-col justify-between p-6 transition-transform duration-300 lg:translate-x-0 border-r border-amber-500/10 shadow-2xl ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="space-y-8">
          
          {/* Logo Brand Header */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-900">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl shadow-inner">
                🌸
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-wider text-amber-300 block">DreamDeco</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">Control Center</span>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-neutral-400 hover:text-white p-2">
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links with Active Indicator */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest text-amber-400/80 font-bold px-4 mb-2 block">Menu & Management</span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-medium transition-all duration-200 group ${
                    isActive 
                      ? "bg-gradient-to-r from-amber-500 to-amber-400 text-neutral-950 font-bold shadow-lg shadow-amber-500/20 scale-[1.02]" 
                      : "text-neutral-300 hover:bg-neutral-900/80 hover:text-amber-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon size={18} className={isActive ? "text-neutral-950" : "text-amber-400 group-hover:scale-110 transition-transform"} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-950"></span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer Exit Button */}
        <div className="pt-6 border-t border-neutral-900">
          <Link 
            href="/" 
            className="flex items-center space-x-3 px-4 py-3.5 rounded-2xl text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-transparent hover:border-red-500/20"
          >
            <LogOut size={18} />
            <span>Exit to Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-[#F3EFE9]/85 backdrop-blur-md border-b border-amber-200/60 px-6 sm:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-neutral-900 p-2 rounded-xl bg-white border border-amber-200">
              <Menu size={20} />
            </button>
            <div>
              <h1 className="font-serif text-lg sm:text-2xl font-bold text-neutral-900">Super Admin Portal</h1>
              <p className="text-[11px] text-neutral-500 font-light hidden sm:block">Manage your event decoration business seamlessly</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="w-10 h-10 rounded-full bg-white border border-amber-200/80 flex items-center justify-center text-neutral-700 hover:bg-amber-100 transition shadow-sm relative">
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
            </button>
            <div className="flex items-center space-x-3 bg-white border border-amber-200/80 px-3.5 py-1.5 rounded-full shadow-sm">
              <div className="w-7 h-7 rounded-full bg-amber-500 text-neutral-950 font-bold flex items-center justify-center text-xs shadow-sm">SA</div>
              <span className="text-xs font-bold text-neutral-900 hidden sm:inline">Super Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content Render Area */}
        <main className="flex-1 p-6 sm:p-10">
          {children}
        </main>
      </div>

    </div>
  );
}