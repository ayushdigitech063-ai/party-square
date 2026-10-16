"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  MapPin,
  Home as HomeIcon,
  Info,
  LayoutList,
  Cake,
  PartyPopper,
  Gem,
  LayoutGrid,
  LucideIcon,
  Search,
  ShoppingBasket,
  X,
  User,
  Heart,
  Menu,
  ChevronRight,
} from "lucide-react";
import CityModal from "./CityModal"; // <-- CityModal import kiya hai (apne folder path ke hisaab se adjust kar lein)
import { useWishlist } from "../context/wishlistcontext";
import LoginModal from "./LoginModal";
import { useCart } from "../context/CartContext"; // path apne folder ke hisaab se adjust karein
import { useCity } from "../context/CityContext";

const CITIES = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Ahmedabad",
  "Faridabad",
  "Ghaziabad",
  "Gurugram",
  "Jaipur",
  "Kolkata",
  "Lucknow",
  "Mangalore",
  "Mysore",
  "Noida",
  "Pune",
  "Thane",
];

type LinkPill = { type: "link"; label: string; href: string; icon: LucideIcon };
type DropdownChild = { label: string; href: string; image?: string };
type DropdownPillData = {
  type: "dropdown";
  label: string;
  icon: LucideIcon;
  href?: string;
  children: DropdownChild[];
};

const NAV_PILLS: (LinkPill | DropdownPillData)[] = [
  { type: "link", label: "Decorations", href: "/", icon: HomeIcon },
  {
    type: "dropdown",
    label: "Birthday",
    icon: Cake,
    href: "/services/birthday",
    children: [
      {
        label: "Kids Birthday",
        href: "/services/birthday",
        image: "/birthdaydesign.png",
      },
      {
        label: "Mother Birthday",
        href: "/services/birthday/mother",
        image: "/motherbirthday.png",
      },
      {
        label: "Father Birthday",
        href: "/services/birthday/father",
        image: "/dad1.png",
      },
      {
        label: "Young Birthday Party",
        href: "/services/birthday/young",
        image: "/party.png",
      },
      {
        label: "Welcome Baby Program",
        href: "/services/birthday/babaywelcom",
        image: "/babaywelcom.png",
      },
    ],
  },
  {
    type: "link",
    label: "Theme Decoration",
    href: "/services",
    icon: LayoutList,
  },
  {
    type: "dropdown",
    label: "Festivals",
    icon: PartyPopper,
    children: [
      {
        label: "Ganesh Chaturthi",
        href: "/Festivals/ganeshchaturthi",
        image: "/ganeshcaturti.png",
      },
      { label: "Lohri", href: "/Festivals/lohri", image: "/lohri.png" },
      {
        label: "Janmashtami",
        href: "/Festivals/janmasthmi",
        image: "/janmasthmi.png",
      },
      {
        label: "Navratri",
        href: "/Festivals/navratri",
        image: "/navratridecoration.png",
      },
      {
        label: "Diwali",
        href: "/Festivals/diwali",
        image: "/diwalidecoration.png",
      },
      {
        label: "Christmas",
        href: "/Festivals/christmas",
        image: "/crismasdecoration.png",
      },
      {
        label: "Independence Day",
        href: "/Festivals/independenceday",
        image: "/independenceday.png",
      },
    ],
  },
  {
    type: "link",
    label: "Ring Decoration",
    href: "/services/ring-decoration",
    icon: Gem,
  },
  {
    type: "link",
    label: "Wall Decoration",
    href: "/services/wall-decoration",
    icon: LayoutGrid,
  },
  { type: "link", label: "Corporate Planner", href: "/about", icon: Info },
];

function WhatsAppIcon({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.7.44 3.36 1.28 4.82L2 22l5.4-1.42a9.9 9.9 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm0 18.1h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.2.84.85-3.12-.2-.32a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.28-8.19 8.28zm4.52-6.19c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28z" />
    </svg>
  );
}

const CLOSE_DELAY = 220; // ms grace period so the mouse can travel from pill to panel

function DropdownPill({
  label,
  icon: Icon,
  href,
  children,
  pathname,
}: DropdownPillData & { pathname: string | null }) {
  const { selectedCity } = useCity();
  const citySlug = (selectedCity || "jaipur").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const toCityHref = (p?: string) => {
    if (!p) return "";
    if (p.startsWith("http") || p.startsWith("mailto:") || p.startsWith("tel:")) return p;
    if (p === "/") return `/${citySlug}`;
    const clean = p.startsWith("/") ? p : `/${p}`;
    return `/${citySlug}${clean}`;
  };
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number } | null>(null);
  const [activeChild, setActiveChild] = useState<DropdownChild | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(
    null,
  );

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const finalizeClose = () => {
    setVisible(false);
    setActiveChild(null);
    window.setTimeout(() => setOpen(false), 120);
  };

  const close = () => {
    clearCloseTimer();
    finalizeClose();
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      finalizeClose();
    }, CLOSE_DELAY);
  };

  const openPanel = () => {
    clearCloseTimer();
    const anchor = containerRef.current ?? buttonRef.current;
    if (anchor) {
  
      const navEl = anchor.closest("nav");
      const top = navEl
        ? navEl.getBoundingClientRect().bottom
        : anchor.getBoundingClientRect().bottom + 8;
      setCoords({ top });
    }
    setActiveChild(null);
    setOpen(true);
    requestAnimationFrame(() => setVisible(true));
  };

  const toggle = () => {
    if (open) {
      close();
    } else {
      openPanel();
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        panelRef.current &&
        !panelRef.current.contains(target)
      ) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleScroll = (e: Event) => {
      // Scrolling *inside* the panel (mobile, tall content) must not close it.
      if (
        panelRef.current &&
        e.target instanceof Node &&
        panelRef.current.contains(e.target)
      ) {
        return;
      }
      close();
    };
    const handleResize = () => close();
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  useEffect(() => () => clearCloseTimer(), []);

  const isActive =
    pathname === href || children.some((c) => pathname === c.href);

  const megaPanel =
    open &&
    coords &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        ref={panelRef}
        onMouseEnter={clearCloseTimer}
        onMouseLeave={scheduleClose}
        style={{
          position: "fixed",
          top: coords.top,
          left: 0,
          right: 0,
          maxHeight: `calc(100vh - ${coords.top}px - 16px)`,
        }}
        className={`z-[999] overflow-y-auto bg-white/95 backdrop-blur-xl border-t border-[#E8E8E3] rounded-b-3xl shadow-[0_28px_56px_-16px_rgba(0,0,0,0.25)] transition-all duration-200 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-5 sm:py-8 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5 md:gap-12">
          {/* Left â€” heading + text links */}
          <div>
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-extrabold text-[#202522] mb-3 sm:mb-4 pb-3 border-b-2 border-[#E8E8E3]">
              <Icon size={18} className="text-[#8CBC67]" />
              {label}
            </h3>

            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-2 gap-y-0.5">
              {children.map((child) => {
                const childActive = pathname === child.href;
                const isPreviewed = activeChild?.href === child.href;
                return (
                  <li key={child.href}>
                    <Link
                      href={toCityHref(child.href)}
                      onClick={close}
                      onMouseEnter={() => setActiveChild(child)}
                      onMouseLeave={() => setActiveChild(null)}
                      onFocus={() => setActiveChild(child)}
                      className={`block px-3 py-2 sm:py-2.5 rounded-lg text-sm sm:text-[15px] transition-colors ${
                        childActive
                          ? "text-[#8CBC67] font-semibold bg-[#EEF6EB]"
                          : isPreviewed
                            ? "text-[#8CBC67] font-semibold bg-[#EEF6EB]/70"
                            : "text-[#202522] font-medium hover:bg-[#EEF6EB] hover:text-[#8CBC67]"
                      }`}
                    >
                      {child.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right — image cards for the same items */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 content-start">
            {children.map((child) => {
              const isPreviewed = activeChild?.href === child.href;
              return (
                <Link
                  key={child.href}
                  href={toCityHref(child.href)}
                  onClick={close}
                  onMouseEnter={() => setActiveChild(child)}
                  onMouseLeave={() => setActiveChild(null)}
                  onFocus={() => setActiveChild(child)}
                  className="group block focus:outline-none"
                >
                  <div
                    className={`relative w-[160px] h-[120px] mx-auto rounded-xl overflow-hidden bg-neutral-100 ring-2 ring-offset-2 transition-all duration-200 ${
                      isPreviewed
                        ? "ring-[#8CBC67] shadow-lg"
                        : "ring-transparent group-hover:ring-[#8CBC67]/50"
                    }`}
                  >
                    {child.image ? (
                      <Image
                        src={child.image}
                        alt={child.label}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-neutral-300">
                        <Icon size={28} />
                      </span>
                    )}
                  </div>
                  <span
                    className={`mt-2.5 block text-center text-[13px] sm:text-sm font-semibold leading-snug transition-colors ${
                      isPreviewed
                        ? "text-[#8CBC67]"
                        : "text-[#202522] group-hover:text-[#8CBC67]"
                    }`}
                  >
                    {child.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>,
      document.body,
    );

  if (href) {
    return (
      <div
        ref={containerRef}
        onMouseEnter={openPanel}
        onMouseLeave={scheduleClose}
        className={`shrink-0 flex items-stretch rounded-full border overflow-hidden transition-colors ${
          isActive || open
            ? "bg-[#EEF6EB] border-[#8CBC67] shadow-xs"
            : "bg-white border-[#E8E8E3] hover:border-[#8CBC67] hover:bg-[#EEF6EB]/50"
        }`}
      >
        <Link
          href={toCityHref(href)}
          className={`flex items-center gap-1.5 sm:gap-2 pl-3 sm:pl-4 pr-2 sm:pr-2.5 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
            isActive || open
              ? "text-[#202522] font-semibold"
              : "text-[#202522] hover:text-[#202522]"
          }`}
        >
          <Icon
            size={16}
            className="text-[#8CBC67]"
          />
          {label}
        </Link>
        <button
          ref={buttonRef}
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-label={`Toggle ${label} menu`}
          className={`flex items-center pl-1.5 pr-3 sm:pr-3.5 py-2 border-l transition-colors ${
            isActive || open
              ? "border-[#8CBC67]/30 text-[#8CBC67]"
              : "border-[#E8E8E3] text-[#6B706C] hover:text-[#202522] hover:bg-[#EEF6EB]/50"
          }`}
        >
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${open ? "rotate-180 text-[#8CBC67]" : "text-[#6B706C]"}`}
          />
        </button>

        {megaPanel}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={openPanel}
      onMouseLeave={scheduleClose}
      className="relative shrink-0"
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className={`flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-2 text-sm font-medium whitespace-nowrap border transition-colors ${
          isActive || open
            ? "bg-[#EEF6EB] text-[#202522] border-[#8CBC67] font-semibold shadow-xs"
            : "bg-white text-[#202522] border-[#E8E8E3] hover:border-[#8CBC67] hover:text-[#202522] hover:bg-[#EEF6EB]/50"
        }`}
      >
        <Icon
          size={16}
          className="text-[#8CBC67]"
        />
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180 text-[#8CBC67]" : "text-[#6B706C]"}`}
        />
      </button>

      {megaPanel}
    </div>
  );
}

export default function Navbar() {
  const { wishlist } = useWishlist();
  const { cartCount } = useCart();
  const {
    selectedCity,
    setSelectedCity,
    isCityModalOpen,
    setIsCityModalOpen,
    cityNames,
  } = useCity();
  const citySlug = (selectedCity || "jaipur").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const toCityHref = (p?: string) => {
    if (!p) return "";
    if (p.startsWith("http") || p.startsWith("mailto:") || p.startsWith("tel:")) return p;
    if (p === "/") return `/${citySlug}`;
    const clean = p.startsWith("/") ? p : `/${p}`;
    return `/${citySlug}${clean}`;
  };

  const [locationOpen, setLocationOpen] = useState(false);
  const [loginopen, setLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Profile");

  useEffect(() => {
    const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
    const localToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token || localToken) {
      setIsLoggedIn(true);
      const userCookie = document.cookie.split("; ").find(row => row.startsWith("user="))?.split("=")[1];
      const localUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
      if (userCookie) {
        try {
          const userObj = JSON.parse(decodeURIComponent(userCookie));
          if (userObj && userObj.name) {
            setUserName(userObj.name);
          }
        } catch(e) {}
      } else if (localUser) {
        try {
          const userObj = JSON.parse(localUser);
          if (userObj && userObj.name) {
            setUserName(userObj.name);
          }
        } catch(e) {}
      }
    }
  }, []);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const locationRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock background body scroll completely when mobile slide-over drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      const prevOverflow = document.body.style.overflow;
      const prevPosition = document.body.style.position;
      const prevTop = document.body.style.top;
      const prevWidth = document.body.style.width;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = prevPosition;
        document.body.style.top = prevTop;
        document.body.style.width = prevWidth;
        document.body.style.overflow = prevOverflow;
        window.scrollTo(0, scrollY);
      };
    }
  }, [mobileMenuOpen]);

  // Automatically open the city selection popup on first visit
  useEffect(() => {
    const hasSeenCityModal = localStorage.getItem("hasSeenCityModal");
    if (!hasSeenCityModal) {
      setIsCityModalOpen(true);
      localStorage.setItem("hasSeenCityModal", "true");
    }
  }, [setIsCityModalOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        locationRef.current &&
        !locationRef.current.contains(e.target as Node)
      ) {
        setLocationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    window.location.href = `/search?q=${encodeURIComponent(searchValue.trim())}`;
  };

  return (
    <>
      {/* Automatic Popup on Website Load */}
      <CityModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        onSelectCity={(city) => setSelectedCity(city)}
        cities={cityNames}
      />

      <nav className="w-full bg-white border-b border-[#E8E8E3] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          <Link href={`/${citySlug}`} className="flex items-center shrink-0"><div className="w-32 h-10 sm:w-40 sm:h-12 relative flex-shrink-0"><Image src="/logo-full.png" alt="Party Square" fill className="object-contain object-left" priority /></div></Link>

          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md items-center gap-2 h-11 px-4 rounded-full border border-[#E8E8E3] bg-neutral-50 focus-within:border-[#8CBC67] focus-within:bg-white transition-colors"
          >
            <Search size={16} className="text-[#6B706C] shrink-0" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search decorations, themes, events..."
              className="w-full bg-transparent text-sm text-[#202522] placeholder:text-[#6B706C] focus:outline-none"
            />
          </form>

          {/* Mobile Right Controls: Wishlist + Basket + Search + Hamburger Menu */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              href="/wishlist"
              aria-label={`Wishlist${wishlist.length > 0 ? `, ${wishlist.length} items` : ""}`}
              className="relative w-9 h-9 rounded-full border border-[#E8E8E3] bg-[#FCFBF7] flex items-center justify-center text-[#202522] hover:border-[#8CBC67] hover:text-[#8CBC67] transition-colors"
            >
              <Heart size={16} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              href="/basket"
              aria-label="Basket"
              className="relative w-9 h-9 rounded-full border border-[#E8E8E3] bg-[#FCFBF7] flex items-center justify-center text-[#202522] hover:border-[#8CBC67] hover:text-[#8CBC67] transition-colors"
            >
              <ShoppingBasket size={16} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              className="w-9 h-9 rounded-full border border-[#E8E8E3] bg-[#FCFBF7] flex items-center justify-center text-[#202522] hover:border-[#8CBC67] hover:text-[#8CBC67] transition-colors"
            >
              {searchOpen ? <X size={16} /> : <Search size={16} />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle Menu"
              className="w-9 h-9 rounded-full border border-[#E8E8E3] bg-[#FCFBF7] flex items-center justify-center text-[#202522] hover:border-[#8CBC67] hover:text-[#8CBC67] transition-colors"
            >
              <Menu size={17} />
            </button>
          </div>

          {/* Desktop Right Controls (All logic, profile and cart preserved) */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            {/* Location selector trigger on navbar */}
            <div className="relative" ref={locationRef}>
              <button
                onClick={() => setIsCityModalOpen(true)}
                className="flex items-center gap-1.5 h-10 px-3.5 rounded-full border border-[#E8E8E3] text-[15px] font-medium text-[#202522] hover:border-[#8CBC67] hover:text-[#8CBC67] transition-colors"
              >
                <MapPin size={16} className="text-[#8CBC67] shrink-0" />
                <span className="whitespace-nowrap">{selectedCity}</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform shrink-0 ${locationOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            <Link
              href="/basket"
              aria-label="Basket"
              className="relative w-10 h-10 shrink-0 rounded-full border border-[#E8E8E3] flex items-center justify-center text-[#6B706C] hover:border-[#8CBC67] hover:text-[#8CBC67] transition-colors"
            >
              <ShoppingBasket size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-semibold flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/wishlist"
              aria-label={`Wishlist${wishlist.length > 0 ? `, ${wishlist.length} items` : ""}`}
              className="relative w-10 h-10 shrink-0 rounded-full border border-[#E8E8E3] flex items-center justify-center text-[#6B706C] hover:border-[#8CBC67] hover:text-[#8CBC67] transition-colors"
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <a
              href="https://wa.me/910000000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="w-10 h-10 shrink-0 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:brightness-105 transition"
            >
              <WhatsAppIcon size={18} />
            </a>

            {isLoggedIn ? (
              <div className="relative group">
                <Link href="/profile" className="h-11 w-11 shrink-0 rounded-full bg-[#F7D6C7] text-black flex items-center justify-center hover:bg-[#D7A84B] transition shadow-sm" aria-label="User Profile">
                  <User size={20} />
                </Link>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pt-2 pb-1">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-sm font-bold text-gray-900 truncate">{userName}</p>
                  </div>
                  <Link href="/profile" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#EEF6EB] hover:text-[#8CBC67] transition">My Bookings</Link>
                  <Link href="/profile" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#EEF6EB] hover:text-[#8CBC67] transition">My Profile</Link>
                  <button onClick={() => { document.cookie = "token=; path=/; max-age=0;"; document.cookie = "user=; path=/; max-age=0;"; window.location.href = "/"; }} className="w-full text-left block px-4 py-2 text-sm font-medium text-red-600 hover:bg-[#F7D6C7] transition cursor-pointer">Logout</button>
                </div>
              </div>
            ) : (
              <button onClick={()=> setLoginOpen(true)} className="h-11 px-6 shrink-0 rounded-full bg-[#F7D6C7] text-black text-[15px] font-semibold flex items-center gap-2 whitespace-nowrap hover:bg-[#D7A84B] transition shadow-sm">
                <span>Login</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        {searchOpen && (
          <div className="md:hidden border-t border-[#E8E8E3] px-3 sm:px-6 py-3 bg-white">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 h-11 px-4 rounded-full border border-[#E8E8E3] bg-neutral-50 focus-within:border-[#8CBC67] focus-within:bg-white transition-colors"
            >
              <Search size={16} className="text-[#6B706C] shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search decorations, themes, events..."
                className="w-full bg-transparent text-sm text-[#202522] placeholder:text-[#6B706C] focus:outline-none"
              />
            </form>
          </div>
        )}

        {/* Categories Bar with smooth scroll and right arrow */}
        <div className="relative border-t border-[#E8E8E3] bg-white">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 flex items-center">
            <div
              ref={scrollRef}
              className="flex-1 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-2.5 overflow-x-auto scroll-smooth scrollbar-none"
              style={{ scrollbarWidth: "none" }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {NAV_PILLS.map((item) => {
                if (item.type === "link") {
                  const { label, href, icon: Icon } = item;
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={label}
                      href={toCityHref(href)}
                      className={`shrink-0 flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap border transition-colors ${
                        isActive
                          ? "bg-[#EEF6EB] text-[#202522] border-[#8CBC67] font-semibold shadow-xs"
                          : "bg-white text-[#202522] border-[#E8E8E3] hover:border-[#8CBC67] hover:text-[#202522] hover:bg-[#EEF6EB]/50"
                      }`}
                    >
                      <Icon
                        size={15}
                        className="text-[#8CBC67]"
                      />
                      {label}
                    </Link>
                  );
                }

                return (
                  <DropdownPill key={item.label} {...item} pathname={pathname} />
                );
              })}
            </div>

            {/* Right Arrow button for categories (matching reference) */}
            <button
              onClick={() => {
                if (scrollRef.current) scrollRef.current.scrollBy({ left: 180, behavior: "smooth" });
              }}
              aria-label="Scroll categories right"
              className="shrink-0 ml-1.5 sm:ml-2 w-8 h-8 rounded-full border border-[#E8E8E3] bg-[#FCFBF7] hover:bg-[#EEF6EB] hover:border-[#8CBC67] text-[#6B706C] hover:text-[#202522] flex items-center justify-center transition shadow-2xs cursor-pointer"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE SLIDE-OVER DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] md:hidden overscroll-none select-none">
          <div
            onClick={() => setMobileMenuOpen(false)}
            onTouchMove={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity touch-none"
          />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[340px] bg-white shadow-2xl flex flex-col overflow-y-auto overscroll-contain select-text">
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#E8E8E3] flex items-center justify-between">
              <div className="w-28 h-8 relative">
                <Image src="/logo-full.png" alt="Party Square" fill className="object-contain" priority />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FCFBF7] border border-[#E8E8E3] flex items-center justify-center text-[#6B706C] hover:text-black"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>

            {/* Location Selector */}
            <div className="p-4 border-b border-[#E8E8E3] bg-[#FCFBF7]">
              <p className="text-[10px] uppercase font-bold text-[#6B706C] tracking-wider mb-1.5">Your Selected City</p>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCityModalOpen(true);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#E8E8E3] bg-white text-xs font-semibold text-[#202522] hover:border-[#8CBC67]"
              >
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-[#8CBC67]" />
                  <span>{selectedCity}</span>
                </div>
                <span className="text-[#8CBC67] text-[11px] font-bold">Change City →</span>
              </button>
            </div>

            {/* Quick Actions Row */}
            <div className="p-4 grid grid-cols-3 gap-2 border-b border-[#E8E8E3]">
              <Link
                href="/basket"
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-[#E8E8E3] bg-white hover:bg-[#EEF6EB] relative transition"
              >
                <ShoppingBasket size={18} className="text-[#202522]" />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                <span className="text-[11px] font-semibold mt-1">Basket</span>
              </Link>

              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-[#E8E8E3] bg-white hover:bg-[#EEF6EB] relative transition"
              >
                <Heart size={18} className="text-[#202522]" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
                <span className="text-[11px] font-semibold mt-1">Wishlist</span>
              </Link>

              <a
                href="https://wa.me/910000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 transition"
              >
                <WhatsAppIcon size={18} />
                <span className="text-[11px] font-semibold mt-1">WhatsApp</span>
              </a>
            </div>

            {/* Profile / Login */}
            <div className="p-4 border-b border-[#E8E8E3]">
              {isLoggedIn ? (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-[#F7D6C7] flex items-center justify-center font-bold text-sm">
                      <User size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold truncate">{userName}</p>
                      <p className="text-[11px] text-[#6B706C]">Verified Customer</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center py-2 px-3 rounded-lg bg-[#EEF6EB] text-[#202522] text-xs font-semibold hover:bg-[#8CBC67] hover:text-white transition"
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={() => {
                        document.cookie = "token=; path=/; max-age=0;";
                        document.cookie = "user=; path=/; max-age=0;";
                        window.location.href = "/";
                      }}
                      className="text-center py-2 px-3 rounded-lg bg-rose-50 text-rose-600 text-xs font-semibold hover:bg-rose-100 transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLoginOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#8CBC67] text-white text-xs font-bold shadow-md hover:bg-[#7AB055] transition"
                >
                  <User size={16} />
                  <span>Login / Sign Up</span>
                </button>
              )}
            </div>

            {/* Navigation links & subcategories */}
            <div className="p-4 flex-1 space-y-1">
              <p className="text-[10px] uppercase font-bold text-[#6B706C] tracking-wider mb-2">Explore Services</p>
              {NAV_PILLS.map((item) => {
                if (item.type === "link") {
                  return (
                    <Link
                      key={item.label}
                      href={toCityHref(item.href)} onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#202522] hover:bg-[#EEF6EB] hover:text-[#8CBC67] transition"
                    >
                      <item.icon size={16} className="text-[#8CBC67]" />
                      <span>{item.label}</span>
                    </Link>
                  );
                }
                return (
                  <div key={item.label} className="border-b border-[#E8E8E3]/60 pb-1">
                    <div className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-[#202522]">
                      <div className="flex items-center gap-2.5">
                        <item.icon size={16} className="text-[#8CBC67]" />
                        <span>{item.label}</span>
                      </div>
                    </div>
                    <div className="pl-8 pr-2 space-y-0.5 pb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={toCityHref(child.href)}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1.5 px-2 rounded text-xs text-[#6B706C] hover:text-[#8CBC67] hover:bg-[#EEF6EB]/60 font-medium transition"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <LoginModal isOpen={loginopen} onClose={() => setLoginOpen(false)} />
    </>
  );
}


