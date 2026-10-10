"use client";

import { usePathname } from "next/navigation";
import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppFloat from "./components/WhatsAppFloat";

import { WishlistProvider } from "./context/wishlistcontext";
import { CartProvider } from "./context/CartContext";
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
      </head>
      <body className="antialiased overflow-x-hidden">
        <Toaster position="top-right" />
        <CartProvider>
          <WishlistProvider>
            {!isExcludedRoute && <Navbar />}

            {!isExcludedRoute && <ScrollToTop />}
            {!isExcludedRoute && <WhatsAppFloat />}

            <main className="w-full overflow-hidden">
              {children}
            </main>
            {!isExcludedRoute && <USP />}
            {!isExcludedRoute && <Footer />}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}