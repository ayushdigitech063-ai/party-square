// "use client";
// import type { Metadata, Viewport } from "next";
// import { usePathname } from "next/navigation";
// import "./globals.css";
// import Navbar from "./components/Navbar"; 
// import Footer from "./components/Footer"; 
// import ScrollToTop from "./components/ScrollToTop";
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const pathname = usePathname();
  
//   // Check karein kya current page admin section ka hai ya nahi
//   const isAdminRoute = pathname?.startsWith("/admin");

//   return (
//     <html lang="en">
//       <body className="antialiased overflow-x-hidden">
//         {/* Agar admin route nahi hai, tabhi website ka Navbar dikhega */}
//         {!isAdminRoute && <Navbar />}
        
//         {!isAdminRoute && <ScrollToTop />}
        
//         <main className="w-full overflow-hidden">
//           {children}
//         </main>

//         {/* Agar admin route nahi hai, tabhi website ka Footer dikhega */}
//         {!isAdminRoute && <Footer />}
//       </body>
//     </html>
//   );
// }

"use client";
import type { Metadata, Viewport } from "next";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer"; 
import ScrollToTop from "./components/ScrollToTop";
import { WishlistProvider } from "./context/wishlistcontext";
import { CartProvider } from "./context/CartContext"; // <-- 1. Yahan import karein

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  // Check karein kya current page admin section ka hai ya nahi
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">
        {/* Agar admin route nahi hai, tabhi website ka Navbar dikhega */}
        
        {!isAdminRoute && <ScrollToTop />}
        <WishlistProvider>
        {!isAdminRoute && <Navbar />}
        <main className="w-full overflow-hidden">
          {children}
        </main>
        </WishlistProvider>
        {/* Agar admin route nahi hai, tabhi website ka Footer dikhega */}
        {!isAdminRoute && <Footer />}
        {/* 2. Yahan CartProvider se wrap kar dein */}
        <CartProvider>
          {/* Agar admin route nahi hai, tabhi website ka Navbar dikhega */}
          {!isAdminRoute && <Navbar />}
          
          {!isAdminRoute && <ScrollToTop />}
          
          <main className="w-full overflow-hidden">
            {children}
          </main>

          {/* Agar admin route nahi hai, tabhi website ka Footer dikhega */}
          {!isAdminRoute && <Footer />}
        </CartProvider>
      </body>
    </html>
  );
}