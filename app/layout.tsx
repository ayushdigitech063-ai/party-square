import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistDivider = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DreamDeco - Special Moments",
  description: "Luxury Event & Wedding Decor",
};

// Mobile scaling fix ke liye viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistDivider.variable} antialiased overflow-x-hidden`}>
        <Navbar />
        <main className="w-full overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}