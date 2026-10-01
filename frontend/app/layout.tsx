"use client";

import { usePathname } from "next/navigation";
import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Preloader from "./components/Preloader";
import WhatsAppHelpButton from "./components/WhatsAppHelpButton";

import { WishlistProvider } from "./context/wishlistcontext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { CityProvider } from "./context/CityContext";
import { Toaster } from "react-hot-toast";

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
      <head>
        <title>Party Square | Premium Celebrations & Event Decor</title>
        <link rel="icon" href="/favicon.webp" type="image/webp" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.webp" />
      </head>
      <body className="antialiased overflow-x-hidden">
        <CityProvider>
          <Toaster
            position="top-center"
            reverseOrder={false}
            containerStyle={{
              zIndex: 999999999,
            }}
            toastOptions={{
              duration: 3500,
              style: {
                background: "#182033",
                color: "#fff",
                fontWeight: 600,
                fontSize: "13px",
                borderRadius: "16px",
                padding: "12px 18px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.15)",
                zIndex: 999999999,
              },
            }}
          />
          {!isAdminRoute && <Preloader />}
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                {!isAdminRoute && <Navbar />}

                {!isAdminRoute && <ScrollToTop />}

                <main className="w-full overflow-hidden">
                  {children}
                </main>

                {!isAdminRoute && <Footer />}
                {!isAdminRoute && <WhatsAppHelpButton />}
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </CityProvider>
      </body>
    </html>
  );
}