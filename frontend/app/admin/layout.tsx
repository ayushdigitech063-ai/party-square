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
  Star,
  ChevronDown,
  ChevronRight,
  Layers,
  Compass,
  Home,
  FileText,
  Sliders,
  Award
} from "lucide-react";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(true);
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Protection Check: If no adminToken, redirect to login page
  React.useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  // If visiting the login page, render full screen standalone without Sidebar or Topbar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to log out of Super Admin Portal?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#374151",
      confirmButtonText: "Yes, Log Out",
      background: "#171717",
      color: "#ffffff",
      customClass: {
        popup: "rounded-[28px] border border-amber-500/20",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        router.push("/admin/login");
      }
    });
  };

  const homePageSections = [
    { name: "Hero Banner", href: "/admin/homepage/hero", icon: Home },
    { name: "Most Loved Decor", href: "/admin/homepage/most-loved", icon: Sparkles },
    { name: "Festivals & Events", href: "/admin/homepage/festivals", icon: Award },
    { name: "Progress & Stats", href: "/admin/homepage/progress", icon: TrendingUp },
    { name: "Our Work Showcase", href: "/admin/homepage/work", icon: FileText },
    { name: "Gallery Highlights", href: "/admin/homepage/gallery", icon: Image },
  ];

  const navigationSections = [
    { name: "Topbar Links", href: "/admin/navigation/topbar", icon: Sliders },
    { name: "Sidebar Items", href: "/admin/navigation/sidebar", icon: Compass },
  ];

  const mainNavItems = [
    { name: "Decorations & Themes", href: "/admin/decorations", icon: Sparkles },
    { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
    { name: "Customers & Roles", href: "/admin/users", icon: Users },
    { name: "Gallery Manager", href: "/admin/gallery", icon: Image },
    { name: "Reviews & Ratings", href: "/admin/reviews", icon: Star },
    { name: "Analytics", href: "/admin/analytics", icon: TrendingUp },
    { name: "System Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div 
      className="min-h-screen bg-[#F3EFE9] text-neutral-900 flex selection:bg-amber-400 selection:text-neutral-950 font-sans"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      
      {/* Luxury Sidebar for Desktop & Mobile */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-neutral-950 text-white flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 border-r border-amber-500/10 shadow-2xl h-screen ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* Logo Brand Header - Height 78px perfectly aligned with header */}
        <div className="h-[78px] px-5 sm:px-6 flex items-center justify-between border-b border-neutral-900 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl shadow-inner shrink-0">
              🌸
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-amber-300 block leading-tight">Party Square</span>
              <span className="text-[10px] uppercase tracking-widest text-amber-500/90 font-bold">Super Admin Portal</span>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-neutral-400 hover:text-white p-2">
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Menu Scrollable Area */}
        <div 
          className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Navigation Links with Active Indicator */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-amber-400/80 font-bold px-3 block mb-1">Control & Overview</span>
            
            {/* Dashboard Link */}
            <Link
              href="/admin"
              className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 group ${
                pathname === "/admin" 
                  ? "bg-gradient-to-r from-amber-500 to-amber-400 text-neutral-950 font-bold shadow-lg shadow-amber-500/20" 
                  : "text-neutral-300 hover:bg-neutral-900/80 hover:text-amber-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <LayoutDashboard size={18} className={pathname === "/admin" ? "text-neutral-950" : "text-amber-400"} />
                <span>Dashboard</span>
              </div>
            </Link>

            {/* Home Page Sections Dropdown */}
            <div className="space-y-1 pt-1">
              <button
                onClick={() => setHomeDropdownOpen(!homeDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold text-neutral-300 hover:bg-neutral-900/80 hover:text-amber-300 transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <Layers size={18} className="text-amber-400" />
                  <span className="font-semibold text-amber-100">Home Page Sections</span>
                </div>
                {homeDropdownOpen ? <ChevronDown size={16} className="text-amber-400" /> : <ChevronRight size={16} className="text-neutral-500" />}
              </button>

              {homeDropdownOpen && (
                <div className="pl-4 space-y-1 border-l-2 border-amber-500/20 ml-4 py-1">
                  {homePageSections.map((sec) => {
                    const SecIcon = sec.icon;
                    const isActive = pathname === sec.href;
                    return (
                      <Link
                        key={sec.name}
                        href={sec.href}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-[11px] font-medium transition-all ${
                          isActive
                            ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30"
                            : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                        }`}
                      >
                        <SecIcon size={14} className={isActive ? "text-amber-300" : "text-neutral-500"} />
                        <span>{sec.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Navigation & Topbar Manager Dropdown */}
            <div className="space-y-1">
              <button
                onClick={() => setNavDropdownOpen(!navDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold text-neutral-300 hover:bg-neutral-900/80 hover:text-amber-300 transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <Compass size={18} className="text-amber-400" />
                  <span className="font-semibold text-amber-100">Navigation Manager</span>
                </div>
                {navDropdownOpen ? <ChevronDown size={16} className="text-amber-400" /> : <ChevronRight size={16} className="text-neutral-500" />}
              </button>

              {navDropdownOpen && (
                <div className="pl-4 space-y-1 border-l-2 border-amber-500/20 ml-4 py-1">
                  {navigationSections.map((navSec) => {
                    const NavIcon = navSec.icon;
                    const isActive = pathname === navSec.href;
                    return (
                      <Link
                        key={navSec.name}
                        href={navSec.href}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-[11px] font-medium transition-all ${
                          isActive
                            ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30"
                            : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                        }`}
                      >
                        <NavIcon size={14} className={isActive ? "text-amber-300" : "text-neutral-500"} />
                        <span>{navSec.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <span className="text-[10px] uppercase tracking-widest text-amber-400/80 font-bold px-3 block pt-4 mb-1">Business Management</span>
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 group ${
                    isActive 
                      ? "bg-gradient-to-r from-amber-500 to-amber-400 text-neutral-950 font-bold shadow-lg shadow-amber-500/20" 
                      : "text-neutral-300 hover:bg-neutral-900/80 hover:text-amber-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon size={18} className={isActive ? "text-neutral-950" : "text-amber-400"} />
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

        {/* Footer Exit & Logout Button */}
        <div className="p-5 sm:p-6 border-t border-neutral-900 shrink-0">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-transparent hover:border-red-500/20 cursor-pointer"
          >
            <LogOut size={18} />
            <span>Log Out & Exit</span>
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper - Full width flex container */}
      <div className="flex-1 lg:pl-[260px] flex flex-col min-h-screen w-full">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 bg-[#F3EFE9]/90 backdrop-blur-md border-b border-amber-200/60 px-6 sm:px-8 lg:px-9 py-4 sm:py-5 flex items-center justify-between shadow-xs h-[78px]">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-neutral-900 p-2 rounded-xl bg-white border border-amber-200 shadow-xs cursor-pointer">
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">Super Admin</h1>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <button className="w-10 h-10 rounded-full bg-white border border-amber-200/80 flex items-center justify-center text-neutral-700 hover:bg-amber-100 transition shadow-xs relative cursor-pointer">
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
            </button>

            {/* Profile Circle with Hover Dropdown */}
            <div className="relative group">
              <button className="w-10 h-10 rounded-full bg-amber-500 text-neutral-950 font-extrabold flex items-center justify-center text-xs shadow-md border-2 border-white cursor-pointer group-hover:scale-105 transition-transform">
                SA
              </button>

              {/* Hover / Click Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-72 bg-neutral-950 text-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-amber-500/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 space-y-3">
                <div className="flex items-center space-x-3 pb-3 border-b border-neutral-800">
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-neutral-950 font-extrabold flex items-center justify-center text-xs shrink-0 aspect-square">
                    SA
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-white leading-snug">Super Admin</h4>
                    <p className="text-[11px] text-neutral-400 truncate">superadmin@partysquare.com</p>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="px-3.5 py-2 bg-neutral-900 rounded-xl flex items-center justify-between border border-neutral-800">
                    <span className="text-neutral-400 text-[11px]">Role</span>
                    <span className="text-amber-400 font-bold text-[11px] uppercase tracking-wider">Super Admin</span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer border border-red-500/20"
                >
                  <LogOut size={14} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>

          </div>
        </header>

        {/* Page Content Render Area - Full Available Width Expansion */}
        <main className="flex-1 w-full px-6 py-7 sm:px-8 sm:py-8 lg:px-9 lg:py-8">
          {children}
        </main>
      </div>

    </div>
  );
}