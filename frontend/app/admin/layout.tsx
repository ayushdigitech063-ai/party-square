"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Image as ImageIcon,
  Star,
  Search,
  ChevronDown,
  ChevronLeft,
  LayoutTemplate,
  ShoppingBag,
  List,
  Package,
  MapPin
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { admin, isAuthenticated, logout } = useAuth();
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(pathname.includes("/admin/home-settings"));

  const isLoginPage = pathname === "/admin/login";
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    if (!isAuthenticated && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, isLoginPage, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  if (isLoginPage) {
    return <div className="font-sans">{children}</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Home Page", href: "/admin/home-settings", icon: LayoutTemplate, isDropdown: true },
    { name: "Theme Decorations", href: "/admin/decorations", icon: Sparkles },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Categories", href: "/admin/categories", icon: List },
    { name: "Packages", href: "/admin/packages", icon: Package },
    { name: "Cities", href: "/admin/cities", icon: MapPin },
    { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
    { name: "Customers", href: "/admin/users", icon: Users },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Reviews", href: "/admin/reviews", icon: Star },
    { name: "Analytics", href: "/admin/analytics", icon: TrendingUp },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  let currentTab = "hero";
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    currentTab = params.get("tab") || "hero";
  }

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to sign out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#F5A000",
      cancelButtonColor: "#F3F4F6",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "<span style='color:#182033'>Cancel</span>",
      background: "#ffffff",
      color: "#182033",
      customClass: { popup: "rounded-[20px] border border-[#ECE9E2] shadow-sm" },
    });

    if (result.isConfirmed) {
      logout();
      toast.success("Logged out successfully!", {
        style: { background: "#fff", color: "#182033", border: "1px solid #ECE9E2" },
      });
      router.push("/admin/login");
    }
  };

  const renderNavItems = () => {
    return navItems.map((item) => {
      const Icon = item.icon;
      const isActive = pathname === item.href || (item.isDropdown && pathname.includes("/admin/home-settings"));
      
      if (item.isDropdown) {
        return (
          <div key={item.name} className="space-y-1">
            <button
              onClick={() => setHomeDropdownOpen(!homeDropdownOpen)}
              className={`w-full flex items-center justify-between py-2.5 rounded-[12px] text-[14px] font-medium transition-all duration-200 group ${
                isActive 
                  ? "bg-[#FFF4D6] text-[#F5A000]" 
                  : "text-[#6F7787] hover:bg-white/60 hover:text-[#182033]"
              } ${isCollapsed ? "px-3 lg:px-0 lg:justify-center" : "px-3"}`}
              title={isCollapsed ? item.name : ""}
            >
              <div className="flex items-center space-x-3">
                <Icon size={18} className={isActive ? "text-[#F5A000]" : "text-[#6F7787] group-hover:text-[#182033] transition-colors"} strokeWidth={isActive ? 2.5 : 2} />
                <span className={isCollapsed ? "lg:hidden" : ""}>{item.name}</span>
              </div>
              {!isCollapsed && <ChevronDown size={14} className={`transition-transform duration-200 ${homeDropdownOpen ? "rotate-180" : ""}`} />}
            </button>
            
            {/* Sub Menu */}
            {!isCollapsed && homeDropdownOpen && (
              <div className="pl-9 pr-3 py-1 space-y-1 animate-in slide-in-from-top-1 fade-in duration-200">
                {[
                  { id: "hero", name: "Hero Banners" },
                  { id: "live_showcase", name: "Live Showcase" },
                  { id: "services", name: "Signature Services" },
                  { id: "testimonials", name: "Testimonials" },
                  { id: "footer", name: "Footer Info" },
                ].map(sub => {
                  const isSubActive = pathname === "/admin/home-settings" && currentTab === sub.id;
                  return (
                    <Link
                      key={sub.id}
                      href={`/admin/home-settings?tab=${sub.id}`}
                      className={`block px-3 py-2 rounded-[8px] text-[13px] font-medium transition-colors ${
                        isSubActive 
                          ? "text-[#F5A000] bg-[#FFF4D6]/50" 
                          : "text-[#6F7787] hover:text-[#182033] hover:bg-white/60"
                      }`}
                    >
                      {sub.name}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        );
      }

      return (
        <Link
          key={item.name}
          href={item.href}
          title={isCollapsed ? item.name : ""}
          className={`flex items-center space-x-3 py-2.5 rounded-[12px] text-[14px] font-medium transition-all duration-200 group ${
            isActive 
              ? "bg-[#FFF4D6] text-[#F5A000]" 
              : "text-[#6F7787] hover:bg-white/60 hover:text-[#182033]"
          } ${isCollapsed ? "px-3 lg:px-0 lg:justify-center" : "px-3"}`}
        >
          <Icon size={18} className={isActive ? "text-[#F5A000]" : "text-[#6F7787] group-hover:text-[#182033] transition-colors"} strokeWidth={isActive ? 2.5 : 2} />
          <span className={isCollapsed ? "lg:hidden" : ""}>{item.name}</span>
        </Link>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#182033] font-sans flex selection:bg-[#FFF4D6] selection:text-[#F5A000]">
      <Toaster position="top-right" />
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#182033]/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Premium Minimal */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-[#FAFAFA] flex flex-col justify-between pt-8 pb-6 transition-all duration-300 border-r border-[#ECE9E2] ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 ${isCollapsed ? "w-[260px] lg:w-[80px] px-5 lg:px-3" : "w-[260px] px-5"}`}>
        
        {/* Desktop Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex items-center justify-center w-6 h-6 rounded-full bg-[#FFFFFF] border border-[#ECE9E2] text-[#6F7787] hover:text-[#F5A000] hover:border-[#F5A000] transition-colors absolute -right-3 top-9 z-50 shadow-sm"
        >
          <ChevronLeft size={14} className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} />
        </button>

        <div className="space-y-8 relative">
          
          {/* Logo Section */}
          <div className="flex items-center justify-between px-2">
            
            {/* Full Logo */}
            <div className={`transition-all ${isCollapsed ? "lg:hidden" : ""}`}>
              <Link href="/admin" className="block">
                <img src="/logo.png" alt="Party Square" className="h-12 w-auto object-contain" />
              </Link>
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#6F7787] font-semibold mt-1 block">
                Super Admin Panel
              </span>
            </div>

            {/* Mini Logo (Collapsed State) */}
            <div className={`hidden ${isCollapsed ? "lg:block" : ""} w-full text-center mt-1`}>
              <Link href="/admin" className="block">
                <img src="/favicon.webp" alt="PS" className="h-8 w-8 mx-auto object-contain" />
              </Link>
            </div>

            {/* Mobile Close Button */}
            <button onClick={() => setSidebarOpen(false)} className={`lg:hidden text-[#6F7787] hover:text-[#182033] p-1 transition-colors ${isCollapsed ? "hidden" : ""}`}>
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <div className="space-y-1 mt-8">
            {renderNavItems()}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 space-y-1.5">
          <div className="h-px w-full bg-[#ECE9E2] mb-4"></div>
          <Link 
            href="/" 
            title={isCollapsed ? "Visit Website" : ""}
            className={`flex items-center space-x-3 py-2.5 rounded-[12px] text-[14px] font-medium text-[#6F7787] hover:bg-white/60 hover:text-[#182033] transition-all ${isCollapsed ? "px-3 lg:px-0 lg:justify-center" : "px-3"}`}
          >
            <span className="text-base opacity-70">🌐</span>
            <span className={isCollapsed ? "lg:hidden" : ""}>Visit Website</span>
          </Link>
          <button 
            onClick={handleLogout}
            title={isCollapsed ? "Logout" : ""}
            className={`w-full flex items-center space-x-3 py-2.5 rounded-[12px] text-[14px] font-medium text-[#E05252] hover:bg-red-50 transition-all ${isCollapsed ? "px-3 lg:px-0 lg:justify-center" : "px-3"}`}
          >
            <LogOut size={18} strokeWidth={2} />
            <span className={isCollapsed ? "lg:hidden" : ""}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Layout Area */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isCollapsed ? "lg:pl-[80px]" : "lg:pl-[260px]"}`}>
        
        {/* Header - Clean & Premium */}
        <header className="sticky top-0 z-40 bg-[#FAFAFA]/95 backdrop-blur-md border-b border-[#ECE9E2] px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between">
          
          {/* Mobile Menu & Greeting */}
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#6F7787] hover:text-[#182033] p-2 -ml-2 transition-colors">
              <Menu size={22} />
            </button>
            <div className="hidden md:flex items-center gap-3">
          
              <div>
                <h1 className="font-serif text-[20px] font-semibold text-[#182033] leading-tight">
                  {getGreeting()}, {admin?.name || "Super Admin"}
                </h1>
                <p className="text-[13px] text-[#6F7787] mt-0.5">Here's what's happening with Party Square today.</p>
              </div>
            </div>
            {/* Mobile simplified greeting */}
            <div className="md:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white border border-[#ECE9E2] p-0.5 flex items-center justify-center shrink-0">
                <img src="/favicon.webp" alt="PS" className="w-full h-full object-contain" />
              </div>
              <h1 className="font-serif text-base font-semibold text-[#182033]">Party Square</h1>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search */}
            <div className="hidden sm:flex items-center bg-[#FFFFFF] border border-[#ECE9E2] rounded-full px-4 py-2 shadow-[0_2px_4px_rgba(0,0,0,0.01)] transition-all focus-within:border-[#F5A000]/50 focus-within:ring-2 focus-within:ring-[#FFF4D6]">
              <Search size={16} className="text-[#6F7787]" />
              <input 
                type="text" 
                placeholder="Search bookings..." 
                className="bg-transparent border-none outline-none text-[13px] text-[#182033] placeholder:text-[#6F7787] w-[180px] ml-2"
              />
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 text-[#6F7787] hover:text-[#182033] transition-colors rounded-full hover:bg-white">
              <Bell size={20} strokeWidth={2} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F5A000] rounded-full border-2 border-[#FAFAFA]"></span>
            </button>
            
            <div className="h-6 w-px bg-[#ECE9E2] hidden sm:block"></div>
            
            {/* Profile */}
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-[#FFF4D6] text-[#F5A000] font-bold flex items-center justify-center text-sm shadow-[0_2px_8px_rgba(245,160,0,0.15)] border border-[#F5A000]/20 group-hover:scale-105 transition-transform">
                {admin?.name ? admin.name.charAt(0).toUpperCase() : "S"}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[14px] font-semibold text-[#182033] leading-none group-hover:text-[#F5A000] transition-colors flex items-center gap-1">
                  {admin?.name || "Super Admin"}
                  <ChevronDown size={14} className="text-[#6F7787]" />
                </p>
                <p className="text-[12px] text-[#6F7787] mt-1">Admin Account</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 w-full max-w-[1600px] mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}