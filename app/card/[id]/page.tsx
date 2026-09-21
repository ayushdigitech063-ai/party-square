"use client";

import React from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Truck, Sparkles, Star, ShoppingBag, Calendar } from "lucide-react";
import Link from "next/link";

const allProducts = [
  // Wedding Gifts (Updated with 7 new items & IDs 25 to 31)
  { id: "1", slug: "royal-wedding-gift-hamper", name: "Royal Wedding Gift Hamper", price: "₹2,499", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR-3ymWTf0acXlIabXM19AgC8iOWQe07E9Vu7EWcohCg&s=10", desc: "Exquisite wedding present pack with traditional elegance. Handcrafted with premium items, beautiful packaging, and a touch of royal gold aesthetic.", category: "Wedding Gift Products", rating: 5.0, reviewsCount: 262 },
  { id: "2", slug: "bridal-couple-keepsake-box", name: "Bridal Couple Keepsake Box", price: "₹1,899", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW3jLbx1oesfpmPg39GDwSwAyXQkPjBPImHm4OJYKG4A&s=10", desc: "Luxurious keepsake box curated specifically for newlyweds to preserve their most cherished wedding memories and tokens.", category: "Wedding Gift Products", rating: 4.9, reviewsCount: 184 },
  { id: "3", slug: "traditional-wedding-present-set", name: "Traditional Wedding Present Set", price: "₹3,199", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO-8qJXN3nQw-NoqZaMprnVgGDl6DRqsncem-xpn9BKQ&s=10", desc: "Ornate gift collection crafted for grand wedding celebrations, featuring auspicious elements and premium presentation.", category: "Wedding Gift Products", rating: 4.8, reviewsCount: 210 },
  { id: "4", slug: "luxury-celebration-gift-basket", name: "Luxury Celebration Gift Basket", price: "₹2,999", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlyuiqGdMZ3Au44FKLp3hqQ1_y9C8JyZm0_cumOxmuug&s=10", desc: "Premium assorted gift items for special wedding vows and celebrations, packed elegantly with luxury ribbons.", category: "Wedding Gift Products", rating: 5.0, reviewsCount: 315 },
  { id: "25", slug: "handcrafted-luxury-wedding-hamper-one", name: "Royal Wedding Present Hamper", price: "₹2,899", image: "https://tse2.mm.bing.net/th/id/OIP.-xKIhH_iRQfzmWuU1dV6sgHaEl?r=0&pid=Api&h=220&P=0", desc: "Handpicked luxury present and hamper designed specifically for grand weddings and couple milestones.", category: "Wedding Gift Products", rating: 4.9, reviewsCount: 190 },
  { id: "26", slug: "handcrafted-luxury-wedding-hamper-two", name: "Grand Couple Celebration Box", price: "₹3,499", image: "https://tse3.mm.bing.net/th/id/OIP.eu-9aa3xXL0XSXXtQiv5kQHaFF?r=0&pid=Api&h=220&P=0", desc: "Exquisite wedding gift collection packed with elegance, premium items, and traditional touch.", category: "Wedding Gift Products", rating: 5.0, reviewsCount: 245 },
  { id: "27", slug: "handcrafted-luxury-wedding-hamper-three", name: "Traditional Bridal Gift Tray", price: "₹2,299", image: "https://tse2.mm.bing.net/th/id/OIP.HvN6mIuPhxKdTPy1ggQsxAHaHa?r=0&pid=Api&h=220&P=0", desc: "Beautifully decorated gift set curated for auspicious couple milestones and wedding rituals.", category: "Wedding Gift Products", rating: 4.8, reviewsCount: 160 },
  { id: "28", slug: "handcrafted-luxury-wedding-hamper-four", name: "Opulent Wedding Gift Basket", price: "₹3,199", image: "https://tse2.mm.bing.net/th/id/OIP.D5iTwRmtT7p_aLYGH0xdmAHaHa?r=0&pid=Api&h=220&P=0", desc: "Handcrafted luxury present featuring premium elements for unforgettable wedding celebrations.", category: "Wedding Gift Products", rating: 4.9, reviewsCount: 210 },
  { id: "29", slug: "handcrafted-luxury-wedding-hamper-five", name: "Royal Milestone Present Pack", price: "₹2,699", image: "https://tse2.mm.bing.net/th/id/OIP.cvNILdgDNCd84NGa_W1aNAHaHa?r=0&pid=Api&h=220&P=0", desc: "Luxurious hampers crafted with rich aesthetics and vibrant details for grand wedding events.", category: "Wedding Gift Products", rating: 4.7, reviewsCount: 135 },
  { id: "30", slug: "handcrafted-luxury-wedding-hamper-six", name: "Elegance Wedding Gift Tray", price: "₹2,499", image: "https://tse3.mm.bing.net/th/id/OIP.tbaugcwldTMYlLjd2RzqOgHaHa?r=0&pid=Api&h=220&P=0", desc: "Stunning presentation box filled with precious curated items for newlyweds and celebrations.", category: "Wedding Gift Products", rating: 4.8, reviewsCount: 175 },
  { id: "31", slug: "handcrafted-luxury-wedding-hamper-seven", name: "Classic Wedding Milestone Kit", price: "₹3,899", image: "https://tse1.mm.bing.net/th/id/OIP.bvuZuLWudtBO6Qfw1Eu-2wHaE6?r=0&pid=Api&h=220&P=0", desc: "Ultimate luxury gift hamper designed to make wedding gifting grand and memorable.", category: "Wedding Gift Products", rating: 5.0, reviewsCount: 290 },

  // Festivals Products
  { id: "5", slug: "grand-festive-celebration-kit", name: "Grand Festive Celebration Kit", price: "₹1,599", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQemobADcx1wbzySQLE07XuCW7DkkpCQGAoREpKMMjhTw&s=10", desc: "Vibrant festive elements to lighten up every celebration, festival evening, and family gathering.", category: "Festivals Products", rating: 4.7, reviewsCount: 142 },
  { id: "6", slug: "traditional-festival-decoratives", name: "Traditional Festival Decoratives", price: "₹1,299", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5yvGM_PnSb3SL0omgZI1afaHHi-n6FEfACn0x2YNX_A&s=10", desc: "Colorful seasonal decorations designed especially for cultural gatherings and traditional home styling.", category: "Festivals Products", rating: 4.6, reviewsCount: 98 },
  { id: "7", slug: "auspicous-celebration-package", name: "Auspicous Celebration Package", price: "₹2,199", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVOcZ3MUvJE33_SoCKUbJ40Bv58z_y4gH4e4mjMNN4iw&s=10", desc: "Complete festive ornamentation kit for homes and celebration venues to bring prosperity and positive energy.", category: "Festivals Products", rating: 4.9, reviewsCount: 176 },

  // Puja Section
  { id: "8", slug: "divine-puja-thali-essentials", name: "Divine Puja Thali & Essentials", price: "₹999", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi2vzXMLs2vjByeMzynxIlAfn5OVQV41wln1yjt8HaxQ&s=10", desc: "Sacred ritual items decorated with traditional motifs, brass elements, and pious aesthetics.", category: "Puja Section", rating: 5.0, reviewsCount: 420 },
  { id: "9", slug: "blessed-mandap-floral-setup", name: "Blessed Mandap Floral Setup", price: "₹3,499", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfsLommkibFYXhoeTCneXzs4x0QQyE7gRjTZ1RcCGr5g&s", desc: "Pure devotional setup crafted with fresh aesthetics and divine fragrance for home pujas or ceremonies.", category: "Puja Section", rating: 4.9, reviewsCount: 289 },
  { id: "10", slug: "spiritual-home-temple-decor", name: "Spiritual Home Temple Decor", price: "₹1,799", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRtXWuvamj9L155RFsfVip7-d-Lv7SwREpu0pvhKFE4A&s=10", desc: "Serene decorative elements and warm lighting designed specifically for auspicious prayers and home temples.", category: "Puja Section", rating: 4.8, reviewsCount: 154 },
  { id: "11", slug: "traditional-ceremonial-aarti-set", name: "Traditional Ceremonial Aarti Set", price: "₹1,499", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj1AjsHLO--3ycMVInMLyIo9xmR90AzuCeB0DXIRXNfQ&s=10", desc: "Elegant brass and floral accents for daily or special festive pujas with complete devotional gear.", category: "Puja Section", rating: 4.7, reviewsCount: 112 },
  { id: "12", slug: "sacred-puja-essentials-kit", name: "Sacred Puja Essentials Kit", price: "₹1,299", image: "https://tse1.mm.bing.net/th/id/OIP.DgJFU1OONBwGlTFyiEBUZQHaHa?r=0&pid=Api&h=220&P=0", desc: "Complete sacred kit for daily prayers and auspicious rituals with traditional elements.", category: "Puja Section", rating: 4.9, reviewsCount: 135 },
  { id: "13", slug: "divine-mandap-decor-item", name: "Divine Mandap Decor Item", price: "₹3,899", image: "https://tse4.mm.bing.net/th/id/OIP.4q0OscjzO7dnGpnLi_s-kgHaF7?r=0&pid=Api&h=220&P=0", desc: "Exquisite mandap setup elements crafted for serene and divine spiritual ceremonies.", category: "Puja Section", rating: 5.0, reviewsCount: 180 },
  { id: "14", slug: "traditional-devotional-thali", name: "Traditional Devotional Thali Set", price: "₹1,199", image: "https://tse3.mm.bing.net/th/id/OIP.1jA3eUfBpQuZEmND22pSUwHaE8?r=0&pid=Api&h=220&P=0", desc: "Pious ritual items styled with authentic traditional aesthetics and brass accents.", category: "Puja Section", rating: 4.8, reviewsCount: 150 },
  { id: "15", slug: "serene-temple-decor-piece", name: "Serene Temple Decor Piece", price: "₹1,599", image: "https://tse1.mm.bing.net/th/id/OIP.2it6NFOnICKxWw6BoStxXwHaHa?r=0&pid=Api&h=220&P=0", desc: "Auspicious home temple ornamentation designed to bring positive energy and peace.", category: "Puja Section", rating: 4.7, reviewsCount: 120 },

  // Esthetic Products
  { id: "16", slug: "modern-minimalist-aesthetic-decor", name: "Modern Minimalist Aesthetic Decor", price: "₹2,299", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokJ-C704of19scix-aGgOw1238UjZbbhZitVcLWGaSA&s=10", desc: "Chic artistic styling pieces for modern living spaces, adding subtle elegance and contemporary charm.", category: "Esthetic Products", rating: 4.8, reviewsCount: 225 },
  { id: "17", slug: "boho-chic-elegance-arrangement", name: "Boho-Chic Elegance Arrangement", price: "₹1,899", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL-P9ELEKw25_RUnNECpvs5N4a7E8eS2Pus52FBgKHRA&s=10", desc: "Trendy aesthetic accents designed for subtle sophistication and warm bohemian interior vibes.", category: "Esthetic Products", rating: 4.7, reviewsCount: 165 },
  { id: "18", slug: "luxurious-designer-centerpiece", name: "Luxurious Designer Centerpiece", price: "₹2,799", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNKYb3x1S573LYJhYIwikKmn7Je7z_c57v758lLsgqUw&s=10", desc: "Stunning aesthetic decor centerpiece to elevate your room aesthetics and capture every guest's attention.", category: "Esthetic Products", rating: 5.0, reviewsCount: 380 },
  { id: "19", slug: "contemporary-artful-home-accent", name: "Contemporary Artful Home Accent", price: "₹1,699", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpjUzIqXeyRs6PdCf870b0X2Aara1qnLj6CqPxZyswvQ&s=10", desc: "Sleek artistic elements for modern home aesthetics combining fine texture with minimalist form.", category: "Esthetic Products", rating: 4.6, reviewsCount: 88 },
  { id: "20", slug: "aesthetic-decor-piece-one", name: "Modern Artistic Accent", price: "₹1,899", image: "https://tse4.mm.bing.net/th/id/OIP.0kUqjWnweLqW7FlC6XIKzgHaHa?r=0&pid=Api&h=220&P=0", desc: "Minimalist and trend-setting artistic home decor accents for modern aesthetics.", category: "Esthetic Products", rating: 4.8, reviewsCount: 140 },
  { id: "21", slug: "aesthetic-decor-piece-two", name: "Contemporary Design Centerpiece", price: "₹2,499", image: "https://tse3.mm.bing.net/th/id/OIP.aq6tM0osSVJa7U-3G-b_ugHaI8?r=0&pid=Api&h=220&P=0", desc: "Chic aesthetic styling piece to elevate contemporary living spaces.", category: "Esthetic Products", rating: 4.9, reviewsCount: 195 },
  { id: "22", slug: "aesthetic-decor-piece-three", name: "Artful Interior Styling Element", price: "₹1,699", image: "https://tse1.mm.bing.net/th/id/OIP.qfu0DofwpgMLIRc2ncZRCgHaE7?r=0&pid=Api&h=220&P=0", desc: "Elegant home accent crafted for subtle sophistication and modern vibes.", category: "Esthetic Products", rating: 4.7, reviewsCount: 110 },
  { id: "23", slug: "aesthetic-decor-piece-four", name: "Minimalist Aesthetic Ornament", price: "₹2,199", image: "https://tse4.mm.bing.net/th/id/OIP.HDh4eXsxbZFqoAtWVyjmpwHaHa?r=0&pid=Api&h=220&P=0", desc: "Sleek artistic decor piece designed for modern home styling.", category: "Esthetic Products", rating: 4.9, reviewsCount: 165 },
  { id: "24", slug: "aesthetic-decor-piece-five", name: "Luxurious Artistic Accent", price: "₹2,999", image: "https://tse4.mm.bing.net/th/id/OIP.fu8BmKcEABu6BL51yuXodQHaFQ?r=0&pid=Api&h=220&P=0", desc: "Premium designer accent for exquisite and trend-setting interior aesthetics.", category: "Esthetic Products", rating: 5.0, reviewsCount: 230 }
];

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;

  const product = allProducts.find((p) => p.slug === id || p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-2">Product Not Found</h2>
        <p className="text-neutral-600 mb-6 text-sm">The product you are looking for does not exist or has been removed.</p>
        <Link href="/card" className="bg-amber-800 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-amber-900 transition">
          Back to Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] text-[#1A1A1A] font-sans min-h-screen py-10 px-4 sm:px-8 md:px-16">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Back Button */}
        <Link href="/card" className="inline-flex items-center space-x-2 text-amber-900 hover:text-amber-950 transition text-sm font-medium bg-amber-100/60 px-4 py-2 rounded-full border border-amber-200/60 shadow-sm">
          <ArrowLeft size={16} />
          <span>Back to Collections</span>
        </Link>

        {/* Product Details Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-3xl border border-amber-200/80 shadow-2xl">
          
          {/* Left: Product Image & Badges */}
          <div className="lg:col-span-6 flex flex-col justify-start space-y-6">
            <div className="relative w-full h-[380px] sm:h-[480px] rounded-2xl overflow-hidden shadow-inner border border-amber-100 bg-neutral-100 group">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-4 left-4 bg-amber-900/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow">
                {product.category}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-around bg-amber-50/70 border border-amber-200/60 p-3 rounded-2xl text-xs font-medium text-amber-900">
              <span className="flex items-center space-x-1">✨ <span>100% Verified</span></span>
              <span className="flex items-center space-x-1">📸 <span>Real Photos</span></span>
              <span className="flex items-center space-x-1">👥 <span>Real Buyers</span></span>
            </div>
          </div>

          {/* Right: Info, Ratings & Action Bar */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              <div className="inline-flex items-center space-x-1.5 text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">
                <Sparkles size={12} />
                <span>Verified Quality Product</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-neutral-900 leading-tight">
                {product.name}
              </h1>

              {/* Customer Feedback & Ratings Section */}
              <div className="bg-neutral-50 border border-neutral-200/80 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-neutral-900">{product.rating}</span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{product.reviewsCount} reviews</span>
                </div>

                {/* Rating Breakdown Bars */}
                <div className="space-y-1.5 pt-1 border-t border-neutral-200/60 text-xs text-neutral-600">
                  <div className="flex items-center space-x-2">
                    <span className="w-3">5</span>
                    <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden"><div className="w-[71%] h-full bg-amber-500 rounded-full"></div></div>
                    <span className="w-8 text-right font-medium">71%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3">4</span>
                    <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden"><div className="w-[29%] h-full bg-amber-500 rounded-full"></div></div>
                    <span className="w-8 text-right font-medium">29%</span>
                  </div>
                  <div className="flex items-center space-x-2"><span className="w-3">3</span><div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden"><div className="w-[0%] h-full bg-amber-500 rounded-full"></div></div><span className="w-8 text-right font-medium">0%</span></div>
                  <div className="flex items-center space-x-2"><span className="w-3">2</span><div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden"><div className="w-[0%] h-full bg-amber-500 rounded-full"></div></div><span className="w-8 text-right font-medium">0%</span></div>
                  <div className="flex items-center space-x-2"><span className="w-3">1</span><div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden"><div className="w-[0%] h-full bg-amber-500 rounded-full"></div></div><span className="w-8 text-right font-medium">0%</span></div>
                </div>
              </div>

              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
                {product.desc}
              </p>

              {/* Trust Features */}
              <div className="space-y-2 pt-2 text-xs sm:text-sm text-neutral-700">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 size={16} className="text-amber-700 flex-shrink-0" />
                  <span>100% Handcrafted & Premium Quality Assured</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck size={16} className="text-amber-700 flex-shrink-0" />
                  <span>Safe & Timely Delivery Right to Your Doorstep</span>
                </div>
              </div>
            </div>

            {/* Pricing and Action Buttons */}
            <div className="space-y-4 pt-4 border-t border-amber-100">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Total Price</span>
                <span className="text-3xl font-extrabold text-amber-900 font-mono tracking-tight">{product.price}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link 
                  href="/contact" 
                  className="w-full bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition shadow-sm text-center"
                >
                  <ShoppingBag size={16} className="text-amber-800" />
                  <span>Add to cart</span>
                </Link>

                <Link 
                  href="/contact" 
                  className="w-full bg-amber-900 hover:bg-amber-950 text-white py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition shadow-lg transform hover:-translate-y-0.5 text-center"
                >
                  <Calendar size={16} className="text-amber-200" />
                  <span>Book now</span>
                </Link>
              </div>

              <p className="text-center text-[11px] text-neutral-400 font-light">
                Secure checkout. Guaranteed satisfaction on all bookings.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}