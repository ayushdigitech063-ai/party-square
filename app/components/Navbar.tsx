// // "use client";

// // import React, { useEffect, useRef, useState } from "react";
// // import { createPortal } from "react-dom";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { usePathname } from "next/navigation";
// // import {
// //   ArrowRight,
// //   ChevronDown,
// //   MapPin,
// //   Home as HomeIcon,
// //   Info,
// //   LayoutList,
// //   Cake,
// //   PartyPopper,
// //   Gem,
// //   LayoutGrid,
// //   LucideIcon,
// //   Search,
// //   ShoppingBasket,
// //   X,
// // } from "lucide-react";

// // const CITIES = ["Delhi", "Mumbai", "Hyderabad", "Bengaluru", "Gurugram"];

// // type LinkPill = { type: "link"; label: string; href: string; icon: LucideIcon };
// // type DropdownChild = { label: string; href: string; image?: string };
// // type DropdownPillData = {
// //   type: "dropdown";
// //   label: string;
// //   icon: LucideIcon;
// //   href?: string; // if set, the label itself links here; the chevron still toggles the dropdown
// //   children: DropdownChild[];
// // };

// // const NAV_PILLS: (LinkPill | DropdownPillData)[] = [
// //   { type: "link", label: "Decorations", href: "/", icon: HomeIcon },
// //   {
// //     type: "dropdown",
// //     label: "Birthday",
// //     icon: Cake,
// //     href: "/services/birthday",
// //     children: [
// //       { label: "Kids Birthday", href: "/services/birthday", image: "/birthdaydesign.png" },
// //       { label: "Mother Birthday", href: "/services/birthday/mother", image: "/motherbirthday.png" },
// //       { label: "Father Birthday", href: "/services/birthday/father", image: "/dad1.png" },
// //       { label: "Young Birthday Party", href: "/services/birthday/young", image: "/party.png" },
// //         { label: "Welcome Baby  Program", href: "/services/birthday/babaywelcom", image: "/babaywelcom.png" },

// //     ],
// //   },
// //   { type: "link", label: "Theme Decoration", href: "/services", icon: LayoutList },
// //   {
// //     type: "dropdown",
// //     label: "Festivals",
// //     icon: PartyPopper,
// //     children: [
// //       { label: "Ganesh Chaturthi", href: "/Festivals/ganeshchaturthi", image: "/ganeshcaturti.png" },
// //       { label: "Lohri", href: "/Festivals/lohri", image: "/lohri.png" },
// //       { label: "Janmashtami", href: "/Festivals/janmasthmi", image: "/janmasthmi.png" },
// //       { label: "Navratri", href: "/Festivals/navratri", image: "/navratridecoration.png" },
// //       { label: "Diwali", href: "/Festivals/diwali", image: "/diwalidecoration.png" },
// //       { label: "Christmas", href: "/Festivals/christmas", image: "/crismasdecoration.png" },
// //          { label: "Independence Day", href: "/Festivals/independenceday", image: "/independenceday.png" },

// //     ],
// //   },
// //   { type: "link", label: "Ring Decoration", href: "/services/ring-decoration", icon: Gem },
// //   { type: "link", label: "Wall Decoration", href: "/services/wall-decoration", icon: LayoutGrid },
// //   { type: "link", label: "Corporate Planner", href: "/about", icon: Info },
// // ];

// // function WhatsAppIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
// //   return (
// //     <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
// //       <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.7.44 3.36 1.28 4.82L2 22l5.4-1.42a9.9 9.9 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm0 18.1h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.2.84.85-3.12-.2-.32a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.28-8.19 8.28zm4.52-6.19c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28z" />
// //     </svg>
// //   );
// // }

// // /**
// //  * Self-contained dropdown pill — now a hover-triggered mega-menu.
// //  *
// //  * Behaviour:
// //  *  - Desktop / mouse: hovering the pill (or the chevron) opens the panel
// //  *    immediately. Moving the mouse into the panel keeps it open. Leaving
// //  *    both the pill and the panel closes it after a short grace delay
// //  *    (CLOSE_DELAY) so users can travel diagonally from button to panel
// //  *    without it snapping shut.
// //  *  - Touch / click: tapping still toggles the panel open/closed, since
// //  *    there's no hover on touch devices.
// //  *
// //  * The open panel is rendered through a portal straight into
// //  * document.body (position: fixed, aligned under the button). A normal
// //  * absolutely-positioned panel here gets silently clipped, because the
// //  * pill row uses overflow-x-auto and the browser forces overflow-y to
// //  * auto/hidden on that same element the moment overflow-x isn't "visible".
// //  *
// //  * Mobile note: on narrow viewports the panel can't just sit at
// //  * `rect.left` with a fixed 640px width — it would run off the right
// //  * edge of the screen. `openPanel` below measures the viewport and picks
// //  * a width + clamped left offset so the panel always stays fully on
// //  * screen, and the panel itself switches from a side-by-side layout to a
// //  * stacked (list on top, image below) layout under the `sm` breakpoint.
// //  */
// // const CLOSE_DELAY = 180; // ms grace period before the panel actually closes
// // const MOBILE_BREAKPOINT = 640; // matches Tailwind's `sm`
// // const VIEWPORT_MARGIN = 16; // min gap kept between the panel and the screen edge

// // function DropdownPill({
// //   label,
// //   icon: Icon,
// //   href,
// //   children,
// //   pathname,
// // }: DropdownPillData & { pathname: string | null }) {
// //   const [open, setOpen] = useState(false);
// //   const [visible, setVisible] = useState(false); // drives the fade/scale transition
// //   const [coords, setCoords] = useState<{ top: number; left: number; width: number } | null>(null);
// //   const [activeChild, setActiveChild] = useState<DropdownChild>(children[0]);
// //   const buttonRef = useRef<HTMLButtonElement>(null);
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const panelRef = useRef<HTMLDivElement>(null);
// //   const closeTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

// //   const clearCloseTimer = () => {
// //     if (closeTimerRef.current !== null) {
// //       window.clearTimeout(closeTimerRef.current);
// //       closeTimerRef.current = null;
// //     }
// //   };

// //   const finalizeClose = () => {
// //     setVisible(false);
// //     window.setTimeout(() => setOpen(false), 120);
// //   };

// //   // Closes immediately (used by click-outside, Escape, item click, etc.)
// //   const close = () => {
// //     clearCloseTimer();
// //     finalizeClose();
// //   };

// //   // Schedules a close after CLOSE_DELAY — cancel-able if the mouse re-enters
// //   // the pill or the panel before the timer fires.
// //   const scheduleClose = () => {
// //     clearCloseTimer();
// //     closeTimerRef.current = window.setTimeout(() => {
// //       finalizeClose();
// //     }, CLOSE_DELAY);
// //   };

// //   const openPanel = () => {
// //     clearCloseTimer();
// //     const anchor = containerRef.current ?? buttonRef.current;
// //     if (anchor) {
// //       const rect = anchor.getBoundingClientRect();
// //       const viewportWidth = window.innerWidth;
// //       const isMobile = viewportWidth < MOBILE_BREAKPOINT;

// //       // Desktop: fixed 640px panel. Mobile: fill the viewport minus a
// //       // small margin on each side so it never causes horizontal scroll.
// //       const width = isMobile
// //         ? Math.max(viewportWidth - VIEWPORT_MARGIN * 2, 260)
// //         : 640;

// //       // Clamp left so the panel's right edge never runs past the
// //       // viewport, and the left edge never goes negative.
// //       let left = rect.left;
// //       left = Math.min(left, viewportWidth - width - VIEWPORT_MARGIN);
// //       left = Math.max(left, VIEWPORT_MARGIN);

// //       setCoords({ top: rect.bottom + 8, left, width });
// //     }
// //     setActiveChild(children[0]);
// //     setOpen(true);
// //     requestAnimationFrame(() => setVisible(true));
// //   };

// //   const toggle = () => {
// //     if (open) {
// //       close();
// //     } else {
// //       openPanel();
// //     }
// //   };

// //   useEffect(() => {
// //     function handleClickOutside(e: MouseEvent) {
// //       const target = e.target as Node;
// //       if (
// //         buttonRef.current &&
// //         !buttonRef.current.contains(target) &&
// //         panelRef.current &&
// //         !panelRef.current.contains(target)
// //       ) {
// //         close();
// //       }
// //     }
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   // If the page (or the pill row) is scrolled or resized while a panel is
// //   // open, close it rather than let it float in the wrong spot (this also
// //   // covers mobile orientation changes).
// //   useEffect(() => {
// //     if (!open) return;
// //     const handleReposition = () => close();
// //     window.addEventListener("scroll", handleReposition, true);
// //     window.addEventListener("resize", handleReposition);
// //     return () => {
// //       window.removeEventListener("scroll", handleReposition, true);
// //       window.removeEventListener("resize", handleReposition);
// //     };
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [open]);

// //   useEffect(() => () => clearCloseTimer(), []);

// //   const isActive = pathname === href || children.some((c) => pathname === c.href);

// //   const megaPanel =
// //     open &&
// //     coords &&
// //     typeof document !== "undefined" &&
// //     createPortal(
// //       <div
// //         ref={panelRef}
// //         onMouseEnter={clearCloseTimer}
// //         onMouseLeave={scheduleClose}
// //         style={{
// //           position: "fixed",
// //           top: coords.top,
// //           left: coords.left,
// //           width: coords.width,
// //           transformOrigin: "top left",
// //         }}
// //         className={`flex flex-col sm:flex-row bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 border border-neutral-100 overflow-hidden z-[999] max-h-[80vh] transition-all duration-200 ease-out ${
// //           visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 -translate-y-2"
// //         }`}
// //       >
// //         {/* Left — item list. Hovering (or focusing, for keyboard users)
// //             an item swaps the preview image on the right. On mobile this
// //             sits on top and scrolls independently if the list is long. */}
// //         <div className="w-full sm:w-[250px] shrink-0 p-2 sm:p-4 border-b sm:border-b-0 sm:border-r border-neutral-100 overflow-y-auto max-h-[40vh] sm:max-h-none">
// //           {children.map((child) => {
// //             const childActive = pathname === child.href;
// //             const isPreviewed = activeChild?.href === child.href;
// //             return (
// //               <Link
// //                 key={child.href}
// //                 href={child.href}
// //                 onClick={close}
// //                 onMouseEnter={() => setActiveChild(child)}
// //                 onFocus={() => setActiveChild(child)}
// //                 className={`block px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base rounded-xl transition-colors ${
// //                   childActive
// //                     ? "text-amber-600 font-semibold bg-amber-50"
// //                     : isPreviewed
// //                     ? "text-amber-600 font-medium bg-amber-50/70"
// //                     : "text-neutral-700 hover:bg-amber-50 hover:text-amber-600"
// //                 }`}
// //               >
// //                 {child.label}
// //               </Link>
// //             );
// //           })}
// //         </div>

// //         {/* Right — preview image for whichever item is active. Shorter
// //             on mobile so the whole panel fits comfortably under the pill
// //             row without needing to scroll the page. */}
// //         <div className="flex-1 relative min-h-[160px] sm:min-h-[380px] bg-neutral-100">
// //           {activeChild?.image ? (
// //             <Image
// //               key={activeChild.href}
// //               src={activeChild.image}
// //               alt={activeChild.label}
// //               fill
// //               sizes="(max-width: 640px) 100vw, 400px"
// //               className="object-cover"
// //             />
// //           ) : (
// //             <span className="absolute inset-0 flex items-center justify-center text-neutral-300">
// //               <Icon size={32} />
// //             </span>
// //           )}
// //           <span className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-t from-black/65 to-transparent">
// //             {activeChild?.label}
// //           </span>
// //         </div>
// //       </div>,
// //       document.body
// //     );

// //   if (href) {
// //     return (
// //       <div
// //         ref={containerRef}
// //         onMouseEnter={openPanel}
// //         onMouseLeave={scheduleClose}
// //         className={`shrink-0 flex items-stretch rounded-full border overflow-hidden transition-colors ${
// //           isActive || open
// //             ? "bg-amber-500 border-amber-500 shadow-sm"
// //             : "bg-white border-neutral-200 hover:border-amber-300"
// //         }`}
// //       >
// //         <Link
// //           href={href}
// //           className={`flex items-center gap-1.5 sm:gap-2 pl-3 sm:pl-4 pr-2 sm:pr-2.5 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
// //             isActive || open ? "text-white" : "text-neutral-700 hover:text-amber-700 hover:bg-amber-50"
// //           }`}
// //         >
// //           <Icon size={16} className={isActive || open ? "text-white" : "text-amber-500"} />
// //           {label}
// //         </Link>
// //         <button
// //           ref={buttonRef}
// //           type="button"
// //           onClick={toggle}
// //           aria-expanded={open}
// //           aria-label={`Toggle ${label} menu`}
// //           className={`flex items-center pl-1.5 pr-3 sm:pr-3.5 py-2 border-l transition-colors ${
// //             isActive || open
// //               ? "border-white/30 text-white"
// //               : "border-neutral-200 text-neutral-500 hover:text-amber-700 hover:bg-amber-50"
// //           }`}
// //         >
// //           <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
// //         </button>

// //         {megaPanel}
// //       </div>
// //     );
// //   }

// //   return (
// //     <div
// //       ref={containerRef}
// //       onMouseEnter={openPanel}
// //       onMouseLeave={scheduleClose}
// //       className="relative shrink-0"
// //     >
// //       <button
// //         ref={buttonRef}
// //         type="button"
// //         onClick={toggle}
// //         aria-expanded={open}
// //         className={`flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-2 text-sm font-medium whitespace-nowrap border transition-colors ${
// //           isActive || open
// //             ? "bg-amber-500 text-white border-amber-500 shadow-sm"
// //             : "bg-white text-neutral-700 border-neutral-200 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50"
// //         }`}
// //       >
// //         <Icon size={16} className={isActive || open ? "text-white" : "text-amber-500"} />
// //         {label}
// //         <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
// //       </button>

// //       {megaPanel}
// //     </div>
// //   );
// // }

// // export default function Navbar() {
// //   const [locationOpen, setLocationOpen] = useState(false);
// //   const [selectedCity, setSelectedCity] = useState("Delhi");
// //   const [searchOpen, setSearchOpen] = useState(false); // mobile search overlay toggle
// //   const [searchValue, setSearchValue] = useState("");
// //   const basketCount = 0; // wire this up to real cart state once one exists

// //   const locationRef = useRef<HTMLDivElement>(null);
// //   const scrollRef = useRef<HTMLDivElement>(null);

// //   const pathname = usePathname();

// //   useEffect(() => {
// //     function handleClickOutside(e: MouseEvent) {
// //       if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
// //         setLocationOpen(false);
// //       }
// //     }
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const handleSearchSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!searchValue.trim()) return;
// //     // Route this to a real /search page once one exists.
// //     window.location.href = `/search?q=${encodeURIComponent(searchValue.trim())}`;
// //   };

// //   return (
// //     <nav className="w-full bg-white border-b border-neutral-200 sticky top-0 z-30">
// //       {/* Row 1 — brand + search + utilities */}
// //       <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
// //         <Link href="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
// //           <span className="text-xl sm:text-2xl leading-none">🪷</span>
// //           <span className="text-base sm:text-xl font-extrabold tracking-tight text-neutral-900 whitespace-nowrap">
// //             DreamDeco
// //           </span>
// //         </Link>

// //         {/* Search — inline pill on desktop, icon-only trigger on mobile */}
// //         <form
// //           onSubmit={handleSearchSubmit}
// //           className="hidden md:flex flex-1 max-w-md items-center gap-2 h-11 px-4 rounded-full border border-neutral-200 bg-neutral-50 focus-within:border-amber-400 focus-within:bg-white transition-colors"
// //         >
// //           <Search size={16} className="text-neutral-400 shrink-0" />
// //           <input
// //             type="text"
// //             value={searchValue}
// //             onChange={(e) => setSearchValue(e.target.value)}
// //             placeholder="Search decorations, themes, events..."
// //             className="w-full bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
// //           />
// //         </form>

// //         <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
// //           {/* Search — mobile trigger */}
// //           <button
// //             onClick={() => setSearchOpen((v) => !v)}
// //             aria-label="Search"
// //             className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-amber-300 hover:text-amber-600 transition-colors"
// //           >
// //             {searchOpen ? <X size={17} /> : <Search size={17} />}
// //           </button>

// //           {/* Location selector */}
// //           <div className="relative hidden sm:block" ref={locationRef}>
// //             <button
// //               onClick={() => setLocationOpen((v) => !v)}
// //               className="flex items-center gap-1.5 h-10 px-3.5 rounded-full border border-neutral-200 text-[15px] font-medium text-neutral-700 hover:border-amber-400 hover:text-amber-600 transition-colors"
// //             >
// //               <MapPin size={16} className="text-amber-500 shrink-0" />
// //               <span className="whitespace-nowrap">{selectedCity}</span>
// //               <ChevronDown
// //                 size={15}
// //                 className={`transition-transform shrink-0 ${locationOpen ? "rotate-180" : ""}`}
// //               />
// //             </button>

// //             {locationOpen && (
// //               <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-neutral-100 py-1.5 z-40">
// //                 {CITIES.map((city) => (
// //                   <button
// //                     key={city}
// //                     onClick={() => {
// //                       setSelectedCity(city);
// //                       setLocationOpen(false);
// //                     }}
// //                     className={`w-full text-left px-4 py-2 text-sm transition-colors ${
// //                       selectedCity === city
// //                         ? "text-amber-600 font-semibold bg-amber-50"
// //                         : "text-neutral-700 hover:bg-amber-50 hover:text-amber-600"
// //                     }`}
// //                   >
// //                     {city}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           {/* Basket / cart */}
// //           <Link
// //             href="/basket"
// //             aria-label="Basket"
// //             className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-amber-300 hover:text-amber-600 transition-colors"
// //           >
// //             <ShoppingBasket size={18} />
// //             {basketCount > 0 && (
// //               <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-white text-[10px] font-semibold flex items-center justify-center">
// //                 {basketCount}
// //               </span>
// //             )}
// //           </Link>

// //           {/* WhatsApp */}
// //           <a
// //             href="https://wa.me/910000000000"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             aria-label="Chat on WhatsApp"
// //             className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:brightness-105 transition"
// //           >
// //             <WhatsAppIcon size={18} />
// //           </a>

// //           {/* Book Now — icon-only on phones (keeps the header from wrapping
// //               or overflowing), full label from `sm` up */}
// //           <button className="h-9 sm:h-11 px-3 sm:px-6 shrink-0 rounded-full bg-amber-200 text-black text-sm sm:text-[15px] font-semibold flex items-center gap-1.5 sm:gap-2 whitespace-nowrap hover:bg-amber-300 transition shadow-sm">
// //             <span className="hidden sm:inline">Book Now</span>
// //             <ArrowRight size={16} />
// //           </button>
// //         </div>
// //       </div>

// //       {/* Mobile search overlay row */}
// //       {searchOpen && (
// //         <div className="md:hidden border-t border-neutral-100 px-3 sm:px-6 py-3 bg-white">
// //           <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 h-11 px-4 rounded-full border border-neutral-200 bg-neutral-50 focus-within:border-amber-400 focus-within:bg-white transition-colors">
// //             <Search size={16} className="text-neutral-400 shrink-0" />
// //             <input
// //               type="text"
// //               autoFocus
// //               value={searchValue}
// //               onChange={(e) => setSearchValue(e.target.value)}
// //               placeholder="Search decorations, themes, events..."
// //               className="w-full bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
// //             />
// //           </form>
// //         </div>
// //       )}

// //       {/* Row 2 — pill navigation strip. Swipeable/scrollable, no arrow
// //           buttons — the left/right fades signal there's more to scroll. */}
// //       <div className="relative border-t border-neutral-100 bg-white">
// //         <div className="pointer-events-none absolute left-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-r from-white to-transparent z-10" />

// //         <div
// //           ref={scrollRef}
// //           className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-2.5 overflow-x-auto scroll-smooth"
// //           style={{ scrollbarWidth: "none" }}
// //         >
// //           <style jsx>{`
// //             div::-webkit-scrollbar {
// //               display: none;
// //             }
// //           `}</style>

// //           {NAV_PILLS.map((item) => {
// //             if (item.type === "link") {
// //               const { label, href, icon: Icon } = item;
// //               const isActive = pathname === href;
// //               return (
// //                 <Link
// //                   key={label}
// //                   href={href}
// //                   className={`shrink-0 flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-2 text-sm font-medium whitespace-nowrap border transition-colors ${
// //                     isActive
// //                       ? "bg-amber-500 text-white border-amber-500 shadow-sm"
// //                       : "bg-white text-neutral-700 border-neutral-200 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50"
// //                   }`}
// //                 >
// //                   <Icon size={16} className={isActive ? "text-white" : "text-amber-500"} />
// //                   {label}
// //                 </Link>
// //               );
// //             }

// //             return <DropdownPill key={item.label} {...item} pathname={pathname} />;
// //           })}
// //         </div>

// //         <div className="pointer-events-none absolute right-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-l from-white to-transparent z-10" />
// //       </div>
// //     </nav>
// //   );
// // }
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { createPortal } from "react-dom";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import {
//   ArrowRight,
//   ChevronDown,
//   MapPin,
//   Home as HomeIcon,
//   Info,
//   LayoutList,
//   Cake,
//   PartyPopper,
//   Gem,
//   LayoutGrid,
//   LucideIcon,
//   Search,
//   ShoppingBasket,
//   X,
// } from "lucide-react";
// import CityModal from "./CityModal"; // <-- CityModal import kiya hai (apne folder path ke hisaab se adjust kar lein)

// const CITIES = [
//   "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai",
//   "Ahmedabad", "Faridabad", "Ghaziabad", "Gurugram", "Jaipur",
//   "Kolkata", "Lucknow", "Mangalore", "Mysore", "Noida", "Pune", "Thane"
// ];

// type LinkPill = { type: "link"; label: string; href: string; icon: LucideIcon };
// type DropdownChild = { label: string; href: string; image?: string };
// type DropdownPillData = {
//   type: "dropdown";
//   label: string;
//   icon: LucideIcon;
//   href?: string;
//   children: DropdownChild[];
// };

// const NAV_PILLS: (LinkPill | DropdownPillData)[] = [
//   { type: "link", label: "Decorations", href: "/", icon: HomeIcon },
//   {
//     type: "dropdown",
//     label: "Birthday",
//     icon: Cake,
//     href: "/services/birthday",
//     children: [
//       { label: "Kids Birthday", href: "/services/birthday", image: "/birthdaydesign.png" },
//       { label: "Mother Birthday", href: "/services/birthday/mother", image: "/motherbirthday.png" },
//       { label: "Father Birthday", href: "/services/birthday/father", image: "/dad1.png" },
//       { label: "Young Birthday Party", href: "/services/birthday/young", image: "/party.png" },
//       { label: "Welcome Baby Program", href: "/services/birthday/babaywelcom", image: "/babaywelcom.png" },
//     ],
//   },
//   { type: "link", label: "Theme Decoration", href: "/services", icon: LayoutList },
//   {
//     type: "dropdown",
//     label: "Festivals",
//     icon: PartyPopper,
//     children: [
//       { label: "Ganesh Chaturthi", href: "/Festivals/ganeshchaturthi", image: "/ganeshcaturti.png" },
//       { label: "Lohri", href: "/Festivals/lohri", image: "/lohri.png" },
//       { label: "Janmashtami", href: "/Festivals/janmasthmi", image: "/janmasthmi.png" },
//       { label: "Navratri", href: "/Festivals/navratri", image: "/navratridecoration.png" },
//       { label: "Diwali", href: "/Festivals/diwali", image: "/diwalidecoration.png" },
//       { label: "Christmas", href: "/Festivals/christmas", image: "/crismasdecoration.png" },
//       { label: "Independence Day", href: "/Festivals/independenceday", image: "/independenceday.png" },
//     ],
//   },
//   { type: "link", label: "Ring Decoration", href: "/services/ring-decoration", icon: Gem },
//   { type: "link", label: "Wall Decoration", href: "/services/wall-decoration", icon: LayoutGrid },
//   { type: "link", label: "Corporate Planner", href: "/about", icon: Info },
// ];

// function WhatsAppIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
//       <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.7.44 3.36 1.28 4.82L2 22l5.4-1.42a9.9 9.9 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm0 18.1h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.2.84.85-3.12-.2-.32a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.28-8.19 8.28zm4.52-6.19c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28z" />
//     </svg>
//   );
// }

// const CLOSE_DELAY = 180;
// const MOBILE_BREAKPOINT = 640;
// const VIEWPORT_MARGIN = 16;

// function DropdownPill({
//   label,
//   icon: Icon,
//   href,
//   children,
//   pathname,
// }: DropdownPillData & { pathname: string | null }) {
//   const [open, setOpen] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const [coords, setCoords] = useState<{ top: number; left: number; width: number } | null>(null);
//   const [activeChild, setActiveChild] = useState<DropdownChild>(children[0]);
//   const buttonRef = useRef<HTMLButtonElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const panelRef = useRef<HTMLDivElement>(null);
//   const closeTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

//   const clearCloseTimer = () => {
//     if (closeTimerRef.current !== null) {
//       window.clearTimeout(closeTimerRef.current);
//       closeTimerRef.current = null;
//     }
//   };

//   const finalizeClose = () => {
//     setVisible(false);
//     window.setTimeout(() => setOpen(false), 120);
//   };

//   const close = () => {
//     clearCloseTimer();
//     finalizeClose();
//   };

//   const scheduleClose = () => {
//     clearCloseTimer();
//     closeTimerRef.current = window.setTimeout(() => {
//       finalizeClose();
//     }, CLOSE_DELAY);
//   };

//   const openPanel = () => {
//     clearCloseTimer();
//     const anchor = containerRef.current ?? buttonRef.current;
//     if (anchor) {
//       const rect = anchor.getBoundingClientRect();
//       const viewportWidth = window.innerWidth;
//       const isMobile = viewportWidth < MOBILE_BREAKPOINT;

//       const width = isMobile ? Math.max(viewportWidth - VIEWPORT_MARGIN * 2, 260) : 640;

//       let left = rect.left;
//       left = Math.min(left, viewportWidth - width - VIEWPORT_MARGIN);
//       left = Math.max(left, VIEWPORT_MARGIN);

//       setCoords({ top: rect.bottom + 8, left, width });
//     }
//     setActiveChild(children[0]);
//     setOpen(true);
//     requestAnimationFrame(() => setVisible(true));
//   };

//   const toggle = () => {
//     if (open) {
//       close();
//     } else {
//       openPanel();
//     }
//   };

//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       const target = e.target as Node;
//       if (
//         buttonRef.current &&
//         !buttonRef.current.contains(target) &&
//         panelRef.current &&
//         !panelRef.current.contains(target)
//       ) {
//         close();
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (!open) return;
//     const handleReposition = () => close();
//     window.addEventListener("scroll", handleReposition, true);
//     window.addEventListener("resize", handleReposition);
//     return () => {
//       window.removeEventListener("scroll", handleReposition, true);
//       window.removeEventListener("resize", handleReposition);
//     };
//   }, [open]);

//   useEffect(() => () => clearCloseTimer(), []);

//   const isActive = pathname === href || children.some((c) => pathname === c.href);

//   const megaPanel =
//     open &&
//     coords &&
//     typeof document !== "undefined" &&
//     createPortal(
//       <div
//         ref={panelRef}
//         onMouseEnter={clearCloseTimer}
//         onMouseLeave={scheduleClose}
//         style={{
//           position: "fixed",
//           top: coords.top,
//           left: coords.left,
//           width: coords.width,
//           transformOrigin: "top left",
//         }}
//         className={`flex flex-col sm:flex-row bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 border border-neutral-100 overflow-hidden z-[999] max-h-[80vh] transition-all duration-200 ease-out ${
//           visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 -translate-y-2"
//         }`}
//       >
//         <div className="w-full sm:w-[250px] shrink-0 p-2 sm:p-4 border-b sm:border-b-0 sm:border-r border-neutral-100 overflow-y-auto max-h-[40vh] sm:max-h-none">
//           {children.map((child) => {
//             const childActive = pathname === child.href;
//             const isPreviewed = activeChild?.href === child.href;
//             return (
//               <Link
//                 key={child.href}
//                 href={child.href}
//                 onClick={close}
//                 onMouseEnter={() => setActiveChild(child)}
//                 onFocus={() => setActiveChild(child)}
//                 className={`block px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base rounded-xl transition-colors ${
//                   childActive
//                     ? "text-amber-600 font-semibold bg-amber-50"
//                     : isPreviewed
//                     ? "text-amber-600 font-medium bg-amber-50/70"
//                     : "text-neutral-700 hover:bg-amber-50 hover:text-amber-600"
//                 }`}
//               >
//                 {child.label}
//               </Link>
//             );
//           })}
//         </div>

//         <div className="flex-1 relative min-h-[160px] sm:min-h-[380px] bg-neutral-100">
//           {activeChild?.image ? (
//             <Image
//               key={activeChild.href}
//               src={activeChild.image}
//               alt={activeChild.label}
//               fill
//               sizes="(max-width: 640px) 100vw, 400px"
//               className="object-cover"
//             />
//           ) : (
//             <span className="absolute inset-0 flex items-center justify-center text-neutral-300">
//               <Icon size={32} />
//             </span>
//           )}
//           <span className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-t from-black/65 to-transparent">
//             {activeChild?.label}
//           </span>
//         </div>
//       </div>,
//       document.body
//     );

//   if (href) {
//     return (
//       <div
//         ref={containerRef}
//         onMouseEnter={openPanel}
//         onMouseLeave={scheduleClose}
//         className={`shrink-0 flex items-stretch rounded-full border overflow-hidden transition-colors ${
//           isActive || open
//             ? "bg-amber-500 border-amber-500 shadow-sm"
//             : "bg-white border-neutral-200 hover:border-amber-300"
//         }`}
//       >
//         <Link
//           href={href}
//           className={`flex items-center gap-1.5 sm:gap-2 pl-3 sm:pl-4 pr-2 sm:pr-2.5 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
//             isActive || open ? "text-white" : "text-neutral-700 hover:text-amber-700 hover:bg-amber-50"
//           }`}
//         >
//           <Icon size={16} className={isActive || open ? "text-white" : "text-amber-500"} />
//           {label}
//         </Link>
//         <button
//           ref={buttonRef}
//           type="button"
//           onClick={toggle}
//           aria-expanded={open}
//           aria-label={`Toggle ${label} menu`}
//           className={`flex items-center pl-1.5 pr-3 sm:pr-3.5 py-2 border-l transition-colors ${
//             isActive || open
//               ? "border-white/30 text-white"
//               : "border-neutral-200 text-neutral-500 hover:text-amber-700 hover:bg-amber-50"
//           }`}
//         >
//           <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
//         </button>

//         {megaPanel}
//       </div>
//     );
//   }

//   return (
//     <div
//       ref={containerRef}
//       onMouseEnter={openPanel}
//       onMouseLeave={scheduleClose}
//       className="relative shrink-0"
//     >
//       <button
//         ref={buttonRef}
//         type="button"
//         onClick={toggle}
//         aria-expanded={open}
//         className={`flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-2 text-sm font-medium whitespace-nowrap border transition-colors ${
//           isActive || open
//             ? "bg-amber-500 text-white border-amber-500 shadow-sm"
//             : "bg-white text-neutral-700 border-neutral-200 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50"
//         }`}
//       >
//         <Icon size={16} className={isActive || open ? "text-white" : "text-amber-500"} />
//         {label}
//         <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
//       </button>

//       {megaPanel}
//     </div>
//   );
// }

// export default function Navbar() {
//   const [locationOpen, setLocationOpen] = useState(false);
//   const [selectedCity, setSelectedCity] = useState("Delhi");

//   // State for controlling the popup automatically on website load
//   const [isCityModalOpen, setIsCityModalOpen] = useState(false);

//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchValue, setSearchValue] = useState("");
//   const basketCount = 0;

//   const locationRef = useRef<HTMLDivElement>(null);
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const pathname = usePathname();

//   // Automatically open the city selection popup when website loads
//   useEffect(() => {
//     setIsCityModalOpen(true);
//   }, []);

//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
//         setLocationOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!searchValue.trim()) return;
//     window.location.href = `/search?q=${encodeURIComponent(searchValue.trim())}`;
//   };

//   return (
//     <>
//       {/* Automatic Popup on Website Load */}
//       <CityModal
//         isOpen={isCityModalOpen}
//         onClose={() => setIsCityModalOpen(false)}
//         onSelectCity={(city) => setSelectedCity(city)}
//         cities={CITIES}
//       />

//       <nav className="w-full bg-white border-b border-neutral-200 sticky top-0 z-30">
//         <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
//           <Link href="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
//             <span className="text-xl sm:text-2xl leading-none">🪷</span>
//             <span className="text-base sm:text-xl font-extrabold tracking-tight text-neutral-900 whitespace-nowrap">
//               DreamDeco
//             </span>
//           </Link>

//           <form
//             onSubmit={handleSearchSubmit}
//             className="hidden md:flex flex-1 max-w-md items-center gap-2 h-11 px-4 rounded-full border border-neutral-200 bg-neutral-50 focus-within:border-amber-400 focus-within:bg-white transition-colors"
//           >
//             <Search size={16} className="text-neutral-400 shrink-0" />
//             <input
//               type="text"
//               value={searchValue}
//               onChange={(e) => setSearchValue(e.target.value)}
//               placeholder="Search decorations, themes, events..."
//               className="w-full bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
//             />
//           </form>

//           <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
//             <button
//               onClick={() => setSearchOpen((v) => !v)}
//               aria-label="Search"
//               className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-amber-300 hover:text-amber-600 transition-colors"
//             >
//               {searchOpen ? <X size={17} /> : <Search size={17} />}
//             </button>

//             {/* Location selector trigger on navbar */}
//             <div className="relative hidden sm:block" ref={locationRef}>
//               <button
//                 onClick={() => setLocationOpen((v) => !v)}
//                 className="flex items-center gap-1.5 h-10 px-3.5 rounded-full border border-neutral-200 text-[15px] font-medium text-neutral-700 hover:border-amber-400 hover:text-amber-600 transition-colors"
//               >
//                 <MapPin size={16} className="text-amber-500 shrink-0" />
//                 <span className="whitespace-nowrap">{selectedCity}</span>
//                 <ChevronDown
//                   size={15}
//                   className={`transition-transform shrink-0 ${locationOpen ? "rotate-180" : ""}`}
//                 />
//               </button>

//               {locationOpen && (
//                 <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-neutral-100 py-1.5 z-40">
//                   {CITIES.slice(0, 5).map((city) => (
//                     <button
//                       key={city}
//                       onClick={() => {
//                         setSelectedCity(city);
//                         setLocationOpen(false);
//                       }}
//                       className={`w-full text-left px-4 py-2 text-sm transition-colors ${
//                         selectedCity === city
//                           ? "text-amber-600 font-semibold bg-amber-50"
//                           : "text-neutral-700 hover:bg-amber-50 hover:text-amber-600"
//                       }`}
//                     >
//                       {city}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <Link
//               href="/basket"
//               aria-label="Basket"
//               className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-amber-300 hover:text-amber-600 transition-colors"
//             >
//               <ShoppingBasket size={18} />
//               {basketCount > 0 && (
//                 <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-white text-[10px] font-semibold flex items-center justify-center">
//                   {basketCount}
//                 </span>
//               )}
//             </Link>

//             <a
//               href="https://wa.me/910000000000"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Chat on WhatsApp"
//               className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:brightness-105 transition"
//             >
//               <WhatsAppIcon size={18} />
//             </a>

//             <button className="h-9 sm:h-11 px-3 sm:px-6 shrink-0 rounded-full bg-amber-200 text-black text-sm sm:text-[15px] font-semibold flex items-center gap-1.5 sm:gap-2 whitespace-nowrap hover:bg-amber-300 transition shadow-sm">
//               <span className="hidden sm:inline">Book Now</span>
//               <ArrowRight size={16} />
//             </button>
//           </div>
//         </div>

//         {searchOpen && (
//           <div className="md:hidden border-t border-neutral-100 px-3 sm:px-6 py-3 bg-white">
//             <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 h-11 px-4 rounded-full border border-neutral-200 bg-neutral-50 focus-within:border-amber-400 focus-within:bg-white transition-colors">
//               <Search size={16} className="text-neutral-400 shrink-0" />
//               <input
//                 type="text"
//                 autoFocus
//                 value={searchValue}
//                 onChange={(e) => setSearchValue(e.target.value)}
//                 placeholder="Search decorations, themes, events..."
//                 className="w-full bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
//               />
//             </form>
//           </div>
//         )}

//         <div className="relative border-t border-neutral-100 bg-white">
//           <div className="pointer-events-none absolute left-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-r from-white to-transparent z-10" />

//           <div
//             ref={scrollRef}
//             className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-2.5 overflow-x-auto scroll-smooth"
//             style={{ scrollbarWidth: "none" }}
//           >
//             <style jsx>{`
//               div::-webkit-scrollbar {
//                 display: none;
//               }
//             `}</style>

//             {NAV_PILLS.map((item) => {
//               if (item.type === "link") {
//                 const { label, href, icon: Icon } = item;
//                 const isActive = pathname === href;
//                 return (
//                   <Link
//                     key={label}
//                     href={href}
//                     className={`shrink-0 flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-2 text-sm font-medium whitespace-nowrap border transition-colors ${
//                       isActive
//                         ? "bg-amber-500 text-white border-amber-500 shadow-sm"
//                         : "bg-white text-neutral-700 border-neutral-200 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50"
//                     }`}
//                   >
//                     <Icon size={16} className={isActive ? "text-white" : "text-amber-500"} />
//                     {label}
//                   </Link>
//                 );
//               }

//               return <DropdownPill key={item.label} {...item} pathname={pathname} />;
//             })}
//           </div>

//           <div className="pointer-events-none absolute right-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-l from-white to-transparent z-10" />
//         </div>
//       </nav>
//     </>
//   );
// }
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
  Heart,
} from "lucide-react";
import CityModal from "./CityModal"; // <-- CityModal import kiya hai (apne folder path ke hisaab se adjust kar lein)
import { useWishlist } from "../context/wishlistcontext";
import LoginModal from "./LoginModal";

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
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number } | null>(null);
  const [activeChild, setActiveChild] = useState<DropdownChild>(children[0]);
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
    setActiveChild(children[0]);
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
        className={`z-[999] overflow-y-auto bg-white/95 backdrop-blur-xl border-t border-neutral-100 rounded-b-3xl shadow-[0_28px_56px_-16px_rgba(0,0,0,0.25)] transition-all duration-200 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-5 sm:py-8 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5 md:gap-12">
          {/* Left — heading + text links */}
          <div>
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-extrabold text-neutral-800 mb-3 sm:mb-4 pb-3 border-b-2 border-amber-200">
              <Icon size={18} className="text-amber-500" />
              {label}
            </h3>

            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-2 gap-y-0.5">
              {children.map((child) => {
                const childActive = pathname === child.href;
                const isPreviewed = activeChild?.href === child.href;
                return (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onClick={close}
                      onMouseEnter={() => setActiveChild(child)}
                      onFocus={() => setActiveChild(child)}
                      className={`block px-3 py-2 sm:py-2.5 rounded-lg text-sm sm:text-[15px] transition-colors ${
                        childActive
                          ? "text-amber-600 font-semibold bg-amber-50"
                          : isPreviewed
                            ? "text-amber-600 font-semibold bg-amber-50/70"
                            : "text-neutral-800 font-medium hover:bg-amber-50 hover:text-amber-600"
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 content-start">
            {children.map((child) => {
              const isPreviewed = activeChild?.href === child.href;
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={close}
                  onMouseEnter={() => setActiveChild(child)}
                  onFocus={() => setActiveChild(child)}
                  className="group block focus:outline-none"
                >
                  <div
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 ring-2 ring-offset-2 transition-all duration-200 ${
                      isPreviewed
                        ? "ring-amber-400 shadow-lg"
                        : "ring-transparent group-hover:ring-amber-300"
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
                        ? "text-amber-600"
                        : "text-neutral-800 group-hover:text-amber-600"
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
            ? "bg-amber-500 border-amber-500 shadow-sm"
            : "bg-white border-neutral-200 hover:border-amber-300"
        }`}
      >
        <Link
          href={href}
          className={`flex items-center gap-1.5 sm:gap-2 pl-3 sm:pl-4 pr-2 sm:pr-2.5 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
            isActive || open
              ? "text-white"
              : "text-neutral-700 hover:text-amber-700 hover:bg-amber-50"
          }`}
        >
          <Icon
            size={16}
            className={isActive || open ? "text-white" : "text-amber-500"}
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
              ? "border-white/30 text-white"
              : "border-neutral-200 text-neutral-500 hover:text-amber-700 hover:bg-amber-50"
          }`}
        >
          <ChevronDown
            size={14}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
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
            ? "bg-amber-500 text-white border-amber-500 shadow-sm"
            : "bg-white text-neutral-700 border-neutral-200 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50"
        }`}
      >
        <Icon
          size={16}
          className={isActive || open ? "text-white" : "text-amber-500"}
        />
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {megaPanel}
    </div>
  );
}

export default function Navbar() {
  const { wishlist } = useWishlist();
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const [loginopen, setLoginOpen] = useState(false);

  // State for controlling the popup automatically on website load
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const basketCount = 0;

  const locationRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Automatically open the city selection popup when website loads
  useEffect(() => {
    setIsCityModalOpen(true);
  }, []);

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
        cities={CITIES}
      />

      <nav className="w-full bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 shrink-0"
          >
            <span className="text-xl sm:text-2xl leading-none">🪷</span>
            <span className="text-base sm:text-xl font-extrabold tracking-tight text-neutral-900 whitespace-nowrap">
              DreamDeco
            </span>
          </Link>

          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md items-center gap-2 h-11 px-4 rounded-full border border-neutral-200 bg-neutral-50 focus-within:border-amber-400 focus-within:bg-white transition-colors"
          >
            <Search size={16} className="text-neutral-400 shrink-0" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search decorations, themes, events..."
              className="w-full bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
            />
          </form>

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-amber-300 hover:text-amber-600 transition-colors"
            >
              {searchOpen ? <X size={17} /> : <Search size={17} />}
            </button>

            {/* Location selector trigger on navbar */}
            <div className="relative hidden sm:block" ref={locationRef}>
              <button
                onClick={() => setLocationOpen((v) => !v)}
                className="flex items-center gap-1.5 h-10 px-3.5 rounded-full border border-neutral-200 text-[15px] font-medium text-neutral-700 hover:border-amber-400 hover:text-amber-600 transition-colors"
              >
                <MapPin size={16} className="text-amber-500 shrink-0" />
                <span className="whitespace-nowrap">{selectedCity}</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform shrink-0 ${locationOpen ? "rotate-180" : ""}`}
                />
              </button>

              {locationOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-neutral-100 py-1.5 z-40">
                  {CITIES.slice(0, 5).map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setLocationOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        selectedCity === city
                          ? "text-amber-600 font-semibold bg-amber-50"
                          : "text-neutral-700 hover:bg-amber-50 hover:text-amber-600"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/basket"
              aria-label="Basket"
              className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-amber-300 hover:text-amber-600 transition-colors"
            >
              <ShoppingBasket size={18} />
              {basketCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-white text-[10px] font-semibold flex items-center justify-center">
                  {basketCount}
                </span>
              )}
            </Link>

            <Link
              href="/wishlist"
              aria-label={`Wishlist${wishlist.length > 0 ? `, ${wishlist.length} items` : ""}`}
              className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-amber-300 hover:text-amber-600 transition-colors"
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
              className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:brightness-105 transition"
            >
              <WhatsAppIcon size={18} />
            </a>

            <button onClick={()=> setLoginOpen(true)} className="h-9 sm:h-11 px-3 sm:px-6 shrink-0 rounded-full bg-amber-200 text-black text-sm sm:text-[15px] font-semibold flex items-center gap-1.5 sm:gap-2 whitespace-nowrap hover:bg-amber-300 transition shadow-sm">
              <span className="hidden sm:inline">Login</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="md:hidden border-t border-neutral-100 px-3 sm:px-6 py-3 bg-white">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 h-11 px-4 rounded-full border border-neutral-200 bg-neutral-50 focus-within:border-amber-400 focus-within:bg-white transition-colors"
            >
              <Search size={16} className="text-neutral-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search decorations, themes, events..."
                className="w-full bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
              />
            </form>
          </div>
        )}

        <div className="relative border-t border-neutral-100 bg-white">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-r from-white to-transparent z-10" />

          <div
            ref={scrollRef}
            className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-2.5 overflow-x-auto scroll-smooth"
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
                    href={href}
                    className={`shrink-0 flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-2 text-sm font-medium whitespace-nowrap border transition-colors ${
                      isActive
                        ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={isActive ? "text-white" : "text-amber-500"}
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

          <div className="pointer-events-none absolute right-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-l from-white to-transparent z-10" />
        </div>
      </nav>
       <LoginModal isOpen={loginopen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
