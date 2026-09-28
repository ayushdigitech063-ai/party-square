"use client";

import { usePathname } from "next/navigation";
import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import { WishlistProvider } from "./context/wishlistcontext";
import { CartProvider } from "./context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Admin routes par public Navbar/Footer hide rahenge
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">
        <CartProvider>
          <WishlistProvider>
            {!isAdminRoute && <Navbar />}

            {!isAdminRoute && <ScrollToTop />}

            <main className="w-full overflow-hidden">
              {children}
            </main>

            {!isAdminRoute && <Footer />}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}