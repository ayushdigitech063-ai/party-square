"use client";

import { usePathname } from "next/navigation";
import "./globals.css";

import Navbar from "./components/Navbar";
import AnnouncementBar from "./components/AnnouncementBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Preloader from "./components/Preloader";

import { WishlistProvider } from "./context/wishlistcontext";
import { CartProvider } from "./context/CartContext";
import { CityProvider } from "./context/CityContext";
import USP from "./components/USP";
import AboveFooterUSP from "./components/AboveFooterUSP";
import SEOContentSection from "./components/SEOContentSection";

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Admin routes par public Navbar/Footer hide rahenge
  const isExcludedRoute = pathname?.startsWith("/admin") || pathname === "/login";

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/logo-icon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Modern, clean & readable Manrope typography as per Design Guide */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased overflow-x-hidden bg-[#FCFBF7] text-[#202522]">
        <Preloader />
        <Toaster position="top-right" />
        <CartProvider>
          <WishlistProvider>
            <CityProvider>
            {!isExcludedRoute && <AnnouncementBar />}
            {!isExcludedRoute && <Navbar />}

            {children}

            {!isExcludedRoute && <USP />}
            {!isExcludedRoute && <SEOContentSection />}
            {!isExcludedRoute && <AboveFooterUSP />}
            {!isExcludedRoute && <Footer />}
            <ScrollToTop />
            {!isExcludedRoute && <WhatsAppFloat />}
            </CityProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
