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
        <link rel="icon" href="/logo-icon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <Preloader />
        <Toaster position="top-right" />
        <CartProvider>
          <WishlistProvider>
            <CityProvider>
            {!isExcludedRoute && <AnnouncementBar />}
            {!isExcludedRoute && <Navbar />}

            {!isExcludedRoute && <ScrollToTop />}
            {!isExcludedRoute && <WhatsAppFloat />}

            <main className="w-full overflow-hidden">
              {children}
            </main>
            {!isExcludedRoute && <USP />}
            {!isExcludedRoute && <Footer />}
            </CityProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}