import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CITIES = new Set([
  "jaipur",
  "delhi",
  "mumbai",
  "bangalore",
  "hyderabad",
  "chennai",
  "ahmedabad",
  "pune",
  "kolkata",
  "surat",
  "lucknow",
  "indore",
  "noida",
  "gurugram",
  "ghaziabad",
  "faridabad",
  "thane",
  "mangalore",
  "mysore"
]);

const KNOWN_INNER_ROUTES = [
  "/admin",
  "/login",
  "/services",
  "/services/all-products",
  "/services/birthday",
  "/services/birthday/all-products",
  "/services/birthday/babaywelcom",
  "/services/birthday/babaywelcom/all-products",
  "/services/birthday/father",
  "/services/birthday/father/all-products",
  "/services/birthday/mother",
  "/services/birthday/mother/all-products",
  "/services/birthday/young",
  "/services/birthday/young/all-products",
  "/services/ring-decoration",
  "/services/ring-decoration/all-products",
  "/services/wall-decoration",
  "/services/wall-decoration/all-products",
  "/Festivals/christmas",
  "/Festivals/christmas/all-products",
  "/Festivals/diwali",
  "/Festivals/diwali/all-products",
  "/Festivals/ganeshchaturthi",
  "/Festivals/ganeshchaturthi/all-products",
  "/Festivals/independenceday",
  "/Festivals/independenceday/all-products",
  "/Festivals/janmasthmi",
  "/Festivals/janmasthmi/all-products",
  "/Festivals/lohri",
  "/Festivals/lohri/all-products",
  "/Festivals/navratri",
  "/Festivals/navratri/all-products",
  "/about",
  "/about/all-products",
  "/contact",
  "/cookie",
  "/terms-and-condition",
  "/privacy-Policy",
  "/gallery"
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname.startsWith("/card") ||
    pathname === "/search" ||
    pathname.startsWith("/search") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return NextResponse.next();

  const firstSegment = segments[0].toLowerCase();

  // 1. If first segment is a recognized city (e.g. /mumbai/services or /mumbai)
  if (CITIES.has(firstSegment)) {
    if (segments.length === 1) {
      return NextResponse.next();
    }

    const restPath = "/" + segments.slice(1).join("/");
    const matchLower = restPath.toLowerCase();

    // If accessing admin under city prefix (e.g. /mumbai/admin or /mumbai/admin/...), redirect directly to /admin
    if (matchLower === "/admin" || matchLower.startsWith("/admin/")) {
      const url = request.nextUrl.clone();
      url.pathname = restPath;
      return NextResponse.redirect(url);
    }
    if (matchLower === "/login") {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    // Global static pages like /basket, /wishlist, /profile must NEVER be prefixed by city
    if (
      matchLower === "/basket" ||
      matchLower === "/wishlist" ||
      matchLower === "/payment-detail" ||
      matchLower === "/payments" ||
      matchLower === "/profile"
    ) {
      const url = request.nextUrl.clone();
      url.pathname = matchLower;
      return NextResponse.redirect(url);
    }

    const matchedRoute = KNOWN_INNER_ROUTES.find(r => r.toLowerCase() === matchLower);

    if (matchedRoute) {
      const url = request.nextUrl.clone();
      url.pathname = matchedRoute;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // 2. If first segment is NOT a city, but is a direct inner route (e.g. /services or /Festivals/lohri)
  const pathnameLower = pathname.toLowerCase();
  const isDirectInnerRoute = KNOWN_INNER_ROUTES.some(r => r.toLowerCase() === pathnameLower);
  if (isDirectInnerRoute) {
    const rawCookie = request.cookies.get("party_selected_city")?.value || "mumbai";
    const city = decodeURIComponent(rawCookie).toLowerCase().replace(/[^a-z0-9]+/g, "-") || "mumbai";
    const url = request.nextUrl.clone();
    url.pathname = `/${city}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)",
  ],
};
