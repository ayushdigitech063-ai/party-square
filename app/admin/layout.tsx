"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getAdminToken, API_BASE, fetchAllBookings } from "@/app/lib/api";
import {
  LayoutDashboard,
  Sparkles,
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
  HelpCircle,
  Package as PackageIcon,
  FolderTree,
  ChevronDown,
  ChevronRight,
  MapPin,
  Home as HomeIcon,
  Loader2
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [recentBookingsAlerts, setRecentBookingsAlerts] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Poll / fetch live bookings for bell alert
  const loadAlerts = async () => {
    try {
      const data = await fetchAllBookings();
      if (Array.isArray(data)) {
        // Latest 5 bookings
        const latest = data.slice(0, 6);
        setRecentBookingsAlerts(latest);
        // Count bookings from last 24 hours or unconfirmed
        const pending = data.filter((b) => (b.bookingStatus || "").toUpperCase() === "PENDING" || (b.bookingStatus || "").toUpperCase() === "CONFIRMED").length;
        setUnreadCount(pending > 0 ? Math.min(pending, 9) : 0);
      }
    } catch (e) {}
  };

  useEffect(() => {
    loadAlerts();
    const interval = setInterval(loadAlerts, 15000); // live check every 15s
    return () => clearInterval(interval);
  }, []);
  const pathname = usePathname();
  const router = useRouter();

  const [authChecking, setAuthChecking] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminExpiresAt");
    document.cookie = "adminToken=; path=/; max-age=0";
    router.push("/login");
  };

  // Auth protection guard with real-time session & backend verification
  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      setAuthChecking(false);
      router.push("/login");
      return;
    }

    const verifySession = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/super-admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          // Token expired or invalid on backend
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminExpiresAt");
          document.cookie = "adminToken=; path=/; max-age=0";
          router.push("/login");
        } else {
          setAuthChecking(false);
        }
      } catch (err) {
        setAuthChecking(false);
      }
    };

    verifySession();
  }, [pathname, router]);

  const [productsOpen, setProductsOpen] = useState(
    pathname?.startsWith("/admin/products") ?? false
  );
  const [categoriesOpen, setCategoriesOpen] = useState(
    pathname?.startsWith("/admin/categories") ?? false
  );
  const [homePageOpen, setHomePageOpen] = useState(
    pathname?.startsWith("/admin/homepage") ?? false
  );

  const productSubItems = [
    { name: "All Products", href: "/admin/products" },
    { name: "Add Product", href: "/admin/products/new" },
  ];

  const categorySubItems = [
    { name: "All Categories", href: "/admin/categories" },
    { name: "Add Category", href: "/admin/categories/new" },
    { name: "Subcategories", href: "/admin/categories/subcategories" },
  ];

  const homePageSubItems = [
    { name: "All Sections Hub", href: "/admin/homepage" },
    { name: "📢 Announcement Bar", href: "/admin/homepage/announcement" },
    { name: "🖼️ Hero Banner Slider", href: "/admin/homepage/hero" },
    { name: "🎥 Video Showcase", href: "/admin/homepage/video-showcase" },
    { name: "❤️ Most Loved Decor", href: "/admin/homepage/most-loved" },
    { name: "🛠️ Signature Services", href: "/admin/homepage/services" },
    { name: "📊 Stats & USP Bar", href: "/admin/homepage/stats" },
    { name: "❓ FAQ Section", href: "/admin/homepage/faqs" },
  ];

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Pricing Packages", href: "/admin/packages", icon: PackageIcon },
    { name: "Add-ons Manager", href: "/admin/addons", icon: Sparkles },
    { name: "Cities", href: "/admin/cities", icon: MapPin },
    { name: "Gallery Manager", href: "/admin/gallery", icon: Image },
    { name: "Coupons", href: "/admin/coupons", icon: Ticket },
    { name: "Reviews & Ratings", href: "/admin/reviews", icon: Star },
    { name: "Analytics", href: "/admin/analytics", icon: TrendingUp },
    { name: "Finance", href: "/admin/finance", icon: Briefcase },
    { name: "Staff Management", href: "/admin/staff", icon: Users2 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  if (authChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FCFBF7] space-y-3">
        <Loader2 className="animate-spin text-[#8CBC67]" size={32} />
        <p className="text-xs text-[#6B706C] font-semibold tracking-wide">
          Verifying security credentials...
        </p>
      </div>
    );
  }

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
            {/* Top items: Dashboard, Bookings, Customers */}
            {navItems.slice(0, 3).map((item) => {
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

            {/* Themes & Packages */}
            {(() => {
              const item = navItems[3];
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
            })()}

            {/* PRODUCT MANAGEMENT GROUP */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setProductsOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                  pathname?.startsWith("/admin/products")
                    ? "bg-gradient-to-r from-[#8CBC67]/20 to-transparent text-[#8CBC67] border-l-2 border-[#8CBC67]"
                    : "hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <PackageIcon size={18} className={pathname?.startsWith("/admin/products") ? "text-[#8CBC67]" : "text-[#6B706C]"} />
                  <span>Product Management</span>
                </div>
                {productsOpen ? <ChevronDown size={14} className="text-[#8CBC67]" /> : <ChevronRight size={14} className="text-[#6B706C]" />}
              </button>

              {productsOpen && (
                <div className="pl-8 pr-2 py-1 space-y-1">
                  {productSubItems.map((sub) => {
                    const isSubActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={`block px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isSubActive
                            ? "text-[#8CBC67] font-semibold bg-white/5"
                            : "text-[#8A8F8B] hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {sub.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CATEGORY MANAGEMENT GROUP */}
            <div>
              <button
                type="button"
                onClick={() => setCategoriesOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                  pathname?.startsWith("/admin/categories")
                    ? "bg-gradient-to-r from-[#8CBC67]/20 to-transparent text-[#8CBC67] border-l-2 border-[#8CBC67]"
                    : "hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FolderTree size={18} className={pathname?.startsWith("/admin/categories") ? "text-[#8CBC67]" : "text-[#6B706C]"} />
                  <span>Category Management</span>
                </div>
                {categoriesOpen ? <ChevronDown size={14} className="text-[#8CBC67]" /> : <ChevronRight size={14} className="text-[#6B706C]" />}
              </button>

              {categoriesOpen && (
                <div className="pl-8 pr-2 py-1 space-y-1">
                  {categorySubItems.map((sub) => {
                    const isSubActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={`block px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isSubActive
                            ? "text-[#8CBC67] font-semibold bg-white/5"
                            : "text-[#8A8F8B] hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {sub.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* HOME PAGE SECTIONS GROUP */}
            <div>
              <button
                type="button"
                onClick={() => setHomePageOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                  pathname?.startsWith("/admin/homepage")
                    ? "bg-gradient-to-r from-[#8CBC67]/20 to-transparent text-[#8CBC67] border-l-2 border-[#8CBC67]"
                    : "hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <HomeIcon size={18} className={pathname?.startsWith("/admin/homepage") ? "text-[#8CBC67]" : "text-[#6B706C]"} />
                  <span>Home Page</span>
                </div>
                {homePageOpen ? <ChevronDown size={14} className="text-[#8CBC67]" /> : <ChevronRight size={14} className="text-[#6B706C]" />}
              </button>

              {homePageOpen && (
                <div className="pl-8 pr-2 py-1 space-y-1">
                  {homePageSubItems.map((sub) => {
                    const isSubActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={`block px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isSubActive
                            ? "text-[#8CBC67] font-semibold bg-white/5"
                            : "text-[#8A8F8B] hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {sub.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Remaining items: Gallery, Coupons, Reviews, Analytics, Finance, Staff, Settings */}
            {navItems.slice(4).map((item) => {
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
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between px-2 pt-3 border-t border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#EEF6EB] text-[#202522] flex items-center justify-center font-bold text-xs">
                SA
              </div>
              <div>
                <p className="text-xs font-bold text-white">Super Admin</p>
                <p className="text-[10px] text-[#6B706C]">admin@partysquare.com</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-white/10 transition cursor-pointer"
              title="Logout from Admin"
            >
              <LogOut size={16} />
            </button>
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
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative w-10 h-10 rounded-2xl bg-neutral-100/80 hover:bg-[#EEF6EB] hover:text-[#558234] border border-[#E8E8E3] hover:border-[#8CBC67]/40 flex items-center justify-center text-[#202522] transition-all cursor-pointer shadow-2xs group"
                title="Booking Alerts & Notifications"
              >
                <Bell size={18} className="group-hover:scale-105 transition-transform" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-xs">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E8E8E3] rounded-3xl shadow-2xl py-3 z-50 overflow-hidden">
                  <div className="px-4 pb-3 border-b border-[#E8E8E3] flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-[#EEF6EB] text-[#8CBC67] flex items-center justify-center font-bold">
                        <Bell size={14} />
                      </div>
                      <h4 className="font-bold text-xs text-[#202522]">Live Booking Alerts</h4>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#EEF6EB] text-[#558234] font-bold">
                      {recentBookingsAlerts.length} Orders
                    </span>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-[#E8E8E3]/60">
                    {recentBookingsAlerts.length === 0 ? (
                      <div className="p-6 text-center text-xs text-[#6B706C]">
                        No new booking alerts at the moment.
                      </div>
                    ) : (
                      recentBookingsAlerts.map((b) => (
                        <Link
                          key={b._id}
                          href="/admin/bookings"
                          onClick={() => setNotificationsOpen(false)}
                          className="p-3.5 hover:bg-neutral-50 flex items-start space-x-3 transition block"
                        >
                          <div className="w-8 h-8 rounded-xl bg-neutral-100 text-[#8CBC67] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                            🎉
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-bold text-xs text-[#202522] truncate">
                                {b.customerName || b.user?.name || "New Customer"}
                              </p>
                              <span className="text-[10px] font-bold text-emerald-800 font-mono">
                                ₹{(b.totalAmount || 0).toLocaleString("en-IN")}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#6B706C] truncate mt-0.5 font-medium">
                              {b.productName || b.theme || "Decoration Setup"}
                            </p>
                            <div className="flex items-center space-x-2 text-[10px] text-neutral-400 mt-1">
                              <span>📍 {b.city || "Delhi"}</span>
                              <span>•</span>
                              <span>📅 {b.eventDate ? new Date(b.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "Upcoming"}</span>
                            </div>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>

                  <div className="px-4 pt-2.5 border-t border-[#E8E8E3] bg-[#FCFBF7] flex items-center justify-between">
                    <span className="text-[10px] text-neutral-400">Updates live every 15s</span>
                    <Link
                      href="/admin/bookings"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs font-bold text-[#8CBC67] hover:underline"
                    >
                      View All Bookings →
                    </Link>
                  </div>
                </div>
              )}
            </div>
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#FCFBF7] mt-16 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}


