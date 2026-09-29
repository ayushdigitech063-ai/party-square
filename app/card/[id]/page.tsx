
"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Truck, Sparkles, Star, ShoppingBag, Calendar, Check, Plus, Minus, X, Heart, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { bannerData, weddingGifts, festivalsProducts, pujaSection, estheticProducts } from "../productDetails";
import { useRef } from "react";

const allProducts = [
  // Wedding Gifts (Updated with 7 new items & IDs 25 to 31)
  { id: "1", slug: "royal-wedding-gift-hamper", name: "Royal Wedding Gift Hamper", price: "₹2,499", rawPrice: 2499, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR-3ymWTf0acXlIabXM19AgC8iOWQe07E9Vu7EWcohCg&s=10", desc: "Exquisite wedding present pack with traditional elegance. Handcrafted with premium items, beautiful packaging, and a touch of royal gold aesthetic.", category: "Wedding Gift Products", rating: 5.0, reviewsCount: 262 },
  { id: "2", slug: "bridal-couple-keepsake-box", name: "Bridal Couple Keepsake Box", price: "₹1,899", rawPrice: 1899, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW3jLbx1oesfpmPg39GDwSwAyXQkPjBPImHm4OJYKG4A&s=10", desc: "Luxurious keepsake box curated specifically for newlyweds to preserve their most cherished wedding memories and tokens.", category: "Wedding Gift Products", rating: 4.9, reviewsCount: 184 },
  { id: "3", slug: "traditional-wedding-present-set", name: "Traditional Wedding Present Set", price: "₹3,199", rawPrice: 3199, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO-8qJXN3nQw-NoqZaMprnVgGDl6DRqsncem-xpn9BKQ&s=10", desc: "Ornate gift collection crafted for grand wedding celebrations, featuring auspicious elements and premium presentation.", category: "Wedding Gift Products", rating: 4.8, reviewsCount: 210 },
  { id: "4", slug: "luxury-celebration-gift-basket", name: "Luxury Celebration Gift Basket", price: "₹2,999", rawPrice: 2999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlyuiqGdMZ3Au44FKLp3hqQ1_y9C8JyZm0_cumOxmuug&s=10", desc: "Premium assorted gift items for special wedding vows and celebrations, packed elegantly with luxury ribbons.", category: "Wedding Gift Products", rating: 5.0, reviewsCount: 315 },
  { id: "25", slug: "handcrafted-luxury-wedding-hamper-one", name: "Royal Wedding Present Hamper", price: "₹2,899", rawPrice: 2899, image: "https://tse2.mm.bing.net/th/id/OIP.-xKIhH_iRQfzmWuU1dV6sgHaEl?r=0&pid=Api&h=220&P=0", desc: "Handpicked luxury present and hamper designed specifically for grand weddings and couple milestones.", category: "Wedding Gift Products", rating: 4.9, reviewsCount: 190 },
  { id: "26", slug: "handcrafted-luxury-wedding-hamper-two", name: "Grand Couple Celebration Box", price: "₹3,499", rawPrice: 3499, image: "https://tse3.mm.bing.net/th/id/OIP.eu-9aa3xXL0XSXXtQiv5kQHaFF?r=0&pid=Api&h=220&P=0", desc: "Exquisite wedding gift collection packed with elegance, premium items, and traditional touch.", category: "Wedding Gift Products", rating: 5.0, reviewsCount: 245 },
  { id: "27", slug: "handcrafted-luxury-wedding-hamper-three", name: "Traditional Bridal Gift Tray", price: "₹2,299", rawPrice: 2299, image: "https://tse2.mm.bing.net/th/id/OIP.HvN6mIuPhxKdTPy1ggQsxAHaHa?r=0&pid=Api&h=220&P=0", desc: "Beautifully decorated gift set curated for auspicious couple milestones and wedding rituals.", category: "Wedding Gift Products", rating: 4.8, reviewsCount: 160 },
  { id: "28", slug: "handcrafted-luxury-wedding-hamper-four", name: "Opulent Wedding Gift Basket", price: "₹3,199", rawPrice: 3199, image: "https://tse2.mm.bing.net/th/id/OIP.D5iTwRmtT7p_aLYGH0xdmAHaHa?r=0&pid=Api&h=220&P=0", desc: "Handcrafted luxury present featuring premium elements for unforgettable wedding celebrations.", category: "Wedding Gift Products", rating: 4.9, reviewsCount: 210 },
  { id: "29", slug: "handcrafted-luxury-wedding-hamper-five", name: "Royal Milestone Present Pack", price: "₹2,699", rawPrice: 2699, image: "https://tse2.mm.bing.net/th/id/OIP.cvNILdgDNCd84NGa_W1aNAHaHa?r=0&pid=Api&h=220&P=0", desc: "Luxurious hampers crafted with rich aesthetics and vibrant details for grand wedding events.", category: "Wedding Gift Products", rating: 4.7, reviewsCount: 135 },
  { id: "30", slug: "handcrafted-luxury-wedding-hamper-six", name: "Elegance Wedding Gift Tray", price: "₹2,499", rawPrice: 2499, image: "https://tse3.mm.bing.net/th/id/OIP.tbaugcwldTMYlLjd2RzqOgHaHa?r=0&pid=Api&h=220&P=0", desc: "Stunning presentation box filled with precious curated items for newlyweds and celebrations.", category: "Wedding Gift Products", rating: 4.8, reviewsCount: 175 },
  { id: "31", slug: "handcrafted-luxury-wedding-hamper-seven", name: "Classic Wedding Milestone Kit", price: "₹3,899", rawPrice: 3899, image: "https://tse1.mm.bing.net/th/id/OIP.bvuZuLWudtBO6Qfw1Eu-2wHaE6?r=0&pid=Api&h=220&P=0", desc: "Ultimate luxury gift hamper designed to make wedding gifting grand and memorable.", category: "Wedding Gift Products", rating: 5.0, reviewsCount: 290 },

  // Festivals Products
  { id: "5", slug: "grand-festive-celebration-kit", name: "Grand Festive Celebration Kit", price: "₹1,599", rawPrice: 1599, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQemobADcx1wbzySQLE07XuCW7DkkpCQGAoREpKMMjhTw&s=10", desc: "Vibrant festive elements to lighten up every celebration, festival evening, and family gathering.", category: "Festivals Products", rating: 4.7, reviewsCount: 142 },
  { id: "6", slug: "traditional-festival-decoratives", name: "Traditional Festival Decoratives", price: "₹1,299", rawPrice: 1299, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5yvGM_PnSb3SL0omgZI1afaHHi-n6FEfACn0x2YNX_A&s=10", desc: "Colorful seasonal decorations designed especially for cultural gatherings and traditional home styling.", category: "Festivals Products", rating: 4.6, reviewsCount: 98 },
  { id: "7", slug: "auspicous-celebration-package", name: "Auspicous Celebration Package", price: "₹2,199", rawPrice: 2199, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVOcZ3MUvJE33_SoCKUbJ40Bv58z_y4gH4e4mjMNN4iw&s=10", desc: "Complete festive ornamentation kit for homes and celebration venues to bring prosperity and positive energy.", category: "Festivals Products", rating: 4.9, reviewsCount: 176 },

  // Puja Section
  { id: "8", slug: "divine-puja-thali-essentials", name: "Divine Puja Thali & Essentials", price: "₹999", rawPrice: 999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi2vzXMLs2vjByeMzynxIlAfn5OVQV41wln1yjt8HaxQ&s=10", desc: "Sacred ritual items decorated with traditional motifs, brass elements, and pious aesthetics.", category: "Puja Section", rating: 5.0, reviewsCount: 420 },
  { id: "9", slug: "blessed-mandap-floral-setup", name: "Blessed Mandap Floral Setup", price: "₹3,499", rawPrice: 3499, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfsLommkibFYXhoeTCneXzs4x0QQyE7gRjTZ1RcCGr5g&s", desc: "Pure devotional setup crafted with fresh aesthetics and divine fragrance for home pujas or ceremonies.", category: "Puja Section", rating: 4.9, reviewsCount: 289 },
  { id: "10", slug: "spiritual-home-temple-decor", name: "Spiritual Home Temple Decor", price: "₹1,799", rawPrice: 1799, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRtXWuvamj9L155RFsfVip7-d-Lv7SwREpu0pvhKFE4A&s=10", desc: "Serene decorative elements and warm lighting designed specifically for auspicious prayers and home temples.", category: "Puja Section", rating: 4.8, reviewsCount: 154 },
  { id: "11", slug: "traditional-ceremonial-aarti-set", name: "Traditional Ceremonial Aarti Set", price: "₹1,499", rawPrice: 1499, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj1AjsHLO--3ycMVInMLyIo9xmR90AzuCeB0DXIRXNfQ&s=10", desc: "Elegant brass and floral accents for daily or special festive pujas with complete devotional gear.", category: "Puja Section", rating: 4.7, reviewsCount: 112 },
  { id: "12", slug: "sacred-puja-essentials-kit", name: "Sacred Puja Essentials Kit", price: "₹1,299", rawPrice: 1299, image: "https://tse1.mm.bing.net/th/id/OIP.DgJFU1OONBwGlTFyiEBUZQHaHa?r=0&pid=Api&h=220&P=0", desc: "Complete sacred kit for daily prayers and auspicious rituals with traditional elements.", category: "Puja Section", rating: 4.9, reviewsCount: 135 },
  { id: "13", slug: "divine-mandap-decor-item", name: "Divine Mandap Decor Item", price: "₹3,899", rawPrice: 3899, image: "https://tse4.mm.bing.net/th/id/OIP.4q0OscjzO7dnGpnLi_s-kgHaF7?r=0&pid=Api&h=220&P=0", desc: "Exquisite mandap setup elements crafted for serene and divine spiritual ceremonies.", category: "Puja Section", rating: 5.0, reviewsCount: 180 },
  { id: "14", slug: "traditional-devotional-thali", name: "Traditional Devotional Thali Set", price: "₹1,199", rawPrice: 1199, image: "https://tse3.mm.bing.net/th/id/OIP.1jA3eUfBpQuZEmND22pSUwHaE8?r=0&pid=Api&h=220&P=0", desc: "Pious ritual items styled with authentic traditional aesthetics and brass accents.", category: "Puja Section", rating: 4.8, reviewsCount: 150 },
  { id: "15", slug: "serene-temple-decor-piece", name: "Serene Temple Decor Piece", price: "₹1,599", rawPrice: 1599, image: "https://tse1.mm.bing.net/th/id/OIP.2it6NFOnICKxWw6BoStxXwHaHa?r=0&pid=Api&h=220&P=0", desc: "Auspicious home temple ornamentation designed to bring positive energy and peace.", category: "Puja Section", rating: 4.7, reviewsCount: 120 },

  // Esthetic Products
  { id: "16", slug: "modern-minimalist-aesthetic-decor", name: "Modern Minimalist Aesthetic Decor", price: "₹2,299", rawPrice: 2299, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokJ-C704of19scix-aGgOw1238UjZbbhZitVcLWGaSA&s=10", desc: "Chic artistic styling pieces for modern living spaces, adding subtle elegance and contemporary charm.", category: "Esthetic Products", rating: 4.8, reviewsCount: 225 },
  { id: "17", slug: "boho-chic-elegance-arrangement", name: "Boho-Chic Elegance Arrangement", price: "₹1,899", rawPrice: 1899, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL-P9ELEKw25_RUnNECpvs5N4a7E8eS2Pus52FBgKHRA&s=10", desc: "Trendy aesthetic accents designed for subtle sophistication and warm bohemian interior vibes.", category: "Esthetic Products", rating: 4.7, reviewsCount: 165 },
  { id: "18", slug: "luxurious-designer-centerpiece", name: "Luxurious Designer Centerpiece", price: "₹2,799", rawPrice: 2799, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNKYb3x1S573LYJhYIwikKmn7Je7z_c57v758lLsgqUw&s=10", desc: "Stunning aesthetic decor centerpiece to elevate your room aesthetics and capture every guest's attention.", category: "Esthetic Products", rating: 5.0, reviewsCount: 380 },
  { id: "19", slug: "contemporary-artful-home-accent", name: "Contemporary Artful Home Accent", price: "₹1,699", rawPrice: 1699, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpjUzIqXeyRs6PdCf870b0X2Aara1qnLj6CqPxZyswvQ&s=10", desc: "Sleek artistic elements for modern home aesthetics combining fine texture with minimalist form.", category: "Esthetic Products", rating: 4.6, reviewsCount: 88 },
  { id: "20", slug: "aesthetic-decor-piece-one", name: "Modern Artistic Accent", price: "₹1,899", rawPrice: 1899, image: "https://tse4.mm.bing.net/th/id/OIP.0kUqjWnweLqW7FlC6XIKzgHaHa?r=0&pid=Api&h=220&P=0", desc: "Minimalist and trend-setting artistic home decor accents for modern aesthetics.", category: "Esthetic Products", rating: 4.8, reviewsCount: 140 },
  { id: "21", slug: "aesthetic-decor-piece-two", name: "Contemporary Design Centerpiece", price: "₹2,499", rawPrice: 2499, image: "https://tse3.mm.bing.net/th/id/OIP.aq6tM0osSVJa7U-3G-b_ugHaI8?r=0&pid=Api&h=220&P=0", desc: "Chic aesthetic styling piece to elevate contemporary living spaces.", category: "Esthetic Products", rating: 4.9, reviewsCount: 195 },
  { id: "22", slug: "aesthetic-decor-piece-three", name: "Artful Interior Styling Element", price: "₹1,699", rawPrice: 1699, image: "https://tse1.mm.bing.net/th/id/OIP.qfu0DofwpgMLIRc2ncZRCgHaE7?r=0&pid=Api&h=220&P=0", desc: "Elegant home accent crafted for subtle sophistication and modern vibes.", category: "Esthetic Products", rating: 4.7, reviewsCount: 110 },
  { id: "23", slug: "aesthetic-decor-piece-four", name: "Minimalist Aesthetic Ornament", price: "₹2,199", rawPrice: 2199, image: "https://tse4.mm.bing.net/th/id/OIP.HDh4eXsxbZFqoAtWVyjmpwHaHa?r=0&pid=Api&h=220&P=0", desc: "Sleek artistic decor piece designed for modern home styling.", category: "Esthetic Products", rating: 4.9, reviewsCount: 165 },
  { id: "24", slug: "aesthetic-decor-piece-five", name: "Luxurious Artistic Accent", price: "₹2,999", rawPrice: 2999, image: "https://tse4.mm.bing.net/th/id/OIP.fu8BmKcEABu6BL51yuXodQHaFQ?r=0&pid=Api&h=220&P=0", desc: "Premium designer accent for exquisite and trend-setting interior aesthetics.", category: "Esthetic Products", rating: 5.0, reviewsCount: 230 }
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
   const { addToCart } = useCart();
       const weddingRef = useRef<HTMLDivElement>(null);
       const festivalRef = useRef<HTMLDivElement>(null);
         const pujaRef = useRef<HTMLDivElement>(null);
         const estheticRef = useRef<HTMLDivElement>(null);
  
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const product = allProducts.find((p) => p.slug === id || p.id === id);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

   const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
      if (ref.current) {
        const scrollAmount = direction === "left" ? -300 : 300;
        ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    };
  

  const handleBookNowClick = () => {
    setShowModal(true);
    setIsConfirmed(false);
  };

  const handleConfirmOrder = () => {
    setIsConfirmed(true);
    // Add to cart automatically on confirmation if desired, or just show success
    if (product) {
      addToCart(product, quantity);
    }
    setTimeout(() => {
      setShowModal(false);
      router.push("/"); // Redirect to Home Page
    }, 2000);
  };

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

  const rawPrice = product.rawPrice || 1999;
  const totalPrice = rawPrice * quantity;

  return (
         <div className="min-h-screen bg-[#FAF7F2] text-[#1A1A1A] font-sans">


    {/* =====================================================
        PAGE CONTENT
    ====================================================== */}
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-8">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 mb-6">
        <Link
          href="/"
          className="hover:text-amber-800 transition"
        >
          Home
        </Link>

        <span>›</span>

        <Link
          href="/card"
          className="hover:text-amber-800 transition"
        >
          Decorations
        </Link>

        <span>›</span>

        <span className="text-neutral-900 font-medium truncate">
          {product.name}
        </span>
      </div>


      {/* =====================================================
          MAIN PRODUCT SECTION
      ====================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">

        {/* =================================================
            LEFT - IMAGE
        ================================================== */}
        <div className="lg:col-span-7">

          <div className="grid grid-cols-12 gap-4">

            {/* Thumbnail Column */}
            <div className="col-span-2 flex flex-col gap-3">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className={`
                    h-16 sm:h-[72px]
                    rounded-xl
                    overflow-hidden
                    border
                    bg-white
                    cursor-pointer
                    transition
                    ${
                      item === 1
                        ? "border-amber-500 ring-2 ring-amber-100"
                        : "border-amber-100 hover:border-amber-300"
                    }
                  `}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} preview ${item}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              <div className="h-16 sm:h-[72px] rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-xs font-semibold text-amber-800">
                +5
              </div>

            </div>


            {/* Main Image */}
            <div className="col-span-10">

              <div className="relative aspect-[16/16] rounded-3xl overflow-hidden bg-neutral-100 border border-amber-100 shadow-sm">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition duration-700 hover:scale-[1.03]"
                />

                {/* Product Category */}
                <div className="absolute top-5 left-5">
                  <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-amber-900 px-4 py-2 rounded-full text-xs font-bold shadow-sm">
                    <Sparkles size={13} />
                    {product.category}
                  </span>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-5 right-5 bg-black/65 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                  1 / 5
                </div>

                {/* Left Arrow */}
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-neutral-800 transition"
                >
                  ‹
                </button>

                {/* Right Arrow */}
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-neutral-800 transition"
                >
                  ›
                </button>

              </div>


              {/* Trust Strip */}
              <div className="mt-4 bg-white border border-amber-100 rounded-2xl px-4 py-4">
                <div className="grid grid-cols-3 gap-3 text-center">

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs text-neutral-700">
                    <span className="text-amber-600">✦</span>
                    <span>100% Verified</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs text-neutral-700">
                    <span className="text-amber-600">▣</span>
                    <span>Real Photos</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs text-neutral-700">
                    <span className="text-amber-600">♟</span>
                    <span>Real Buyers</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>


        {/* =================================================
            RIGHT - PRODUCT INFORMATION
        ================================================== */}
        <div className="lg:col-span-5">

          <div className="lg:sticky lg:top-24 space-y-4">

            {/* Product Information */}
            <div className="bg-white rounded-3xl border border-amber-100 p-5 shadow-sm">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4">
                <Sparkles size={12} />
                Verified Quality Product
              </div>


              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 leading-tight">
                {product.name}
              </h1>


              {/* Rating */}
              <div className="flex items-center gap-3 mt-4">

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={17}
                      className="fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>

                <span className="font-bold text-neutral-900">
                  {product.rating}
                </span>

                <span className="text-sm text-neutral-500">
                  ({product.reviewsCount} reviews)
                </span>

              </div>


              {/* Price */}
              <div className="flex flex-wrap items-center gap-3 mt-5">

                <span className="text-3xl font-extrabold text-neutral-900">
                  ₹{totalPrice.toLocaleString()}
                </span>

                <span className="text-sm text-neutral-400 line-through">
                  ₹{(product.rawPrice * 1.25).toFixed(0)}
                </span>

                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold">
                  25% OFF
                </span>

              </div>


              {/* Description */}
              <p className="mt-4 text-sm leading-6 text-neutral-600">
                {product.desc}
              </p>


              {/* Feature Pills */}
              <div className="grid grid-cols-3 gap-2 mt-4">

                <div className="text-center">
                  <div className="w-9 h-9 mx-auto rounded-full bg-amber-50 flex items-center justify-center">
                    <CheckCircle2 size={17} className="text-amber-700" />
                  </div>
                  <p className="mt-2 text-[10px] sm:text-xs text-neutral-600">
                    Customizable
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-9 h-9 mx-auto rounded-full bg-amber-50 flex items-center justify-center">
                    <Truck size={17} className="text-amber-700" />
                  </div>
                  <p className="mt-2 text-[10px] sm:text-xs text-neutral-600">
                    On-Time Setup
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-9 h-9 mx-auto rounded-full bg-amber-50 flex items-center justify-center">
                    <Sparkles size={17} className="text-amber-700" />
                  </div>
                  <p className="mt-2 text-[10px] sm:text-xs text-neutral-600">
                    Premium Quality
                  </p>
                </div>

              </div>


              {/* Availability */}
              <div className="mt-4 rounded-2xl bg-amber-50/70 border border-amber-100 px-4 py-3">

                <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                  <CheckCircle2 size={16} />
                  Service available in your area
                </div>

              </div>


              {/* Quantity */}
              <div className="flex items-center justify-between mt-4">

                <span className="text-sm font-semibold text-neutral-700">
                  Quantity
                </span>

                <div className="flex items-center border border-amber-300 rounded-xl overflow-hidden bg-white">

                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.max(1, prev - 1))
                    }
                    className="w-10 h-10 flex items-center justify-center text-amber-800 hover:bg-amber-50 transition"
                  >
                    <Minus size={15} />
                  </button>

                  <span className="w-10 text-center text-sm font-bold">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity((prev) => prev + 1)
                    }
                    className="w-10 h-10 flex items-center justify-center text-amber-800 hover:bg-amber-50 transition"
                  >
                    <Plus size={15} />
                  </button>

                </div>

              </div>


              {/* Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">

                <button
                  onClick={handleAddToCart}
                  className="h-12 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-sm flex items-center justify-center gap-2 transition"
                >

                  {added ? (
                    <>
                      <Check size={17} className="text-green-700" />
                      <span className="text-green-800">
                        Added to Cart!
                      </span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={17} />
                      <span>Add to Cart</span>
                    </>
                  )}

                </button>


                <button
                  onClick={()=>router.push('/payment-detail')}
                  className="h-12 rounded-xl bg-[#8B3F05] hover:bg-[#713200] text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg"
                >
                  <Calendar size={17} />
                  <span>Book Now</span>
                </button>

              </div>


              <p className="text-center text-xs text-neutral-400 mt-4">
                Secure checkout · Guaranteed satisfaction
              </p>

            </div>


            {/* =================================================
                BOOKING INFORMATION CARD
            ================================================== */}
          
          </div>
        </div>

      </section>


      {/* =====================================================
          LOWER INFORMATION SECTION
      ====================================================== */}
      <section className="mt-5 bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden">

        {/* Tabs */}
        <div className="border-b border-neutral-100 overflow-x-auto">

          <div className="flex min-w-max">

            {[
              "Overview",
              "What's Included",
              "What's Not Included",
              "Cancellation Policy",
              "Reviews",
              "FAQ",
            ].map((tab, index) => (
              <button
                key={tab}
                className={`
                  px-5 sm:px-7 py-5 text-sm font-medium transition
                  ${
                    index === 0
                      ? "text-amber-800 border-b-2 border-amber-500"
                      : "text-neutral-500 hover:text-amber-800"
                  }
                `}
              >
                {tab}
              </button>
            ))}

          </div>

        </div>


        {/* Overview Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-6">

          {/* Description */}
          <div className="lg:col-span-7">

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 leading-tight">
            Turn Your Special Moments Into Magical Memories
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-7 text-neutral-600">
              {product.desc}
          </p>


          {/* Feature Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7">

            <div className="rounded-2xl bg-amber-50 p-4">
              <Sparkles size={19} className="text-amber-700" />
              <p className="mt-3 text-xs font-semibold text-neutral-800">
                Premium Decor
              </p>
              <p className="text-[11px] text-neutral-500 mt-1">
                & Setup
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50 p-4">
              <CheckCircle2 size={19} className="text-amber-700" />
              <p className="mt-3 text-xs font-semibold text-neutral-800">
                Verified
              </p>
              <p className="text-[11px] text-neutral-500 mt-1">
                Quality
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50 p-4">
              <Truck size={19} className="text-amber-700" />
              <p className="mt-3 text-xs font-semibold text-neutral-800">
                On-Time
              </p>
              <p className="text-[11px] text-neutral-500 mt-1">
                Setup
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50 p-4">
              <Calendar size={19} className="text-amber-700" />
              <p className="mt-3 text-xs font-semibold text-neutral-800">
                Easy
              </p>
              <p className="text-[11px] text-neutral-500 mt-1">
                Booking
              </p>
            </div>

          </div>

        </div>


          {/* Included Card */}
          <div className="lg:col-span-5">

            <div className="rounded-2xl bg-[#FFF9E8] border border-amber-100 p-6">

              <h3 className="font-serif font-bold text-lg text-neutral-900">
              What's Included
            </h3>

            <div className="mt-5 space-y-3">

                {[
                  "Premium decoration setup",
                  "Professional setup team",
                  "Quality decoration materials",
                  "On-time service",
                  "Post-event cleanup",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-neutral-700"
                  >
                    <CheckCircle2
                      size={17}
                      className="text-amber-700 shrink-0"
                    />

                  <span>{item}</span>
                </div>

              ))}

            </div>

        </div>

        </div>

        </div>

      </section>


      {/* =====================================================
          REVIEW SECTION
      ====================================================== */}
      <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Rating Summary */}
        <div className="bg-white border border-amber-100 rounded-3xl p-6 sm:p-8">

          <div className="flex items-center justify-between">

            <div>

              <h3 className="text-xl font-serif font-bold text-neutral-900">
                Customer Reviews
              </h3>

              <div className="flex items-center gap-3 mt-3">

                <span className="text-3xl font-bold">
                  {product.rating}
                </span>

                <div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-amber-500 text-amber-500"
                      />
                    ))}
                  </div>

                  <p className="text-xs text-neutral-500 mt-1">
                    {product.reviewsCount} verified reviews
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* Rating Bars */}
          <div className="mt-6 space-y-3">

            {[
              ["5", "71%"],
              ["4", "29%"],
              ["3", "0%"],
              ["2", "0%"],
              ["1", "0%"],
            ].map(([rating, percentage]) => (

              <div
                key={rating}
                className="flex items-center gap-3 text-xs"
              >

                <span className="w-4 text-neutral-600">
                  {rating}
                </span>

                <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: percentage }}
                  />

                </div>

                <span className="w-10 text-right text-neutral-500">
                  {percentage}
                </span>

              </div>

            ))}

          </div>

        </div>


        {/* Quote Card */}
        <div className="bg-[#FFF9E8] border border-amber-100 rounded-3xl p-8 flex flex-col justify-center">

          <Sparkles
            size={24}
            className="text-amber-600"
          />

          <h3 className="mt-4 text-2xl font-serif font-bold text-neutral-900">
            Because the little moments matter.
          </h3>

          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Create beautiful celebrations with thoughtfully designed
            decorations and memorable experiences.
          </p>

        </div>

      </section>

    </main>

      {/* Confirmation Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-amber-200 space-y-6 relative animate-in fade-in zoom-in duration-200">
            
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 p-1.5 rounded-full bg-neutral-100 transition"
            >
              <X size={18} />
            </button>

            {isConfirmed ? (
              <div className="text-center space-y-4 py-6">
                <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-neutral-900">Your order is confirmed!</h3>
                <p className="text-neutral-600 text-sm">Redirecting you to the home page...</p>
              </div>
            ) : (
              <>
                <div className="space-y-2 text-center">
                  <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-bold bg-amber-100 px-3 py-1 rounded-full inline-block">Order Summary</span>
                  <h3 className="text-xl font-serif font-bold text-neutral-900">Confirm Your Booking</h3>
                  <p className="text-neutral-600 text-xs sm:text-sm">Review your item and quantity before finalizing.</p>
                </div>

                <div className="bg-amber-50/60 border border-amber-200/70 p-4 rounded-2xl flex items-center space-x-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-xl border border-amber-200 shadow-sm flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-neutral-900 text-sm truncate">{product.name}</h4>
                    <p className="text-xs text-neutral-500">Qty: {quantity}</p>
                    <p className="text-sm font-bold text-amber-900 mt-1">₹{totalPrice.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold py-3 rounded-xl text-sm transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleConfirmOrder}
                    className="flex-1 bg-amber-900 hover:bg-amber-950 text-white font-bold py-3 rounded-xl text-sm transition shadow-md cursor-pointer"
                  >
                    Confirm Order
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

      <div className="bg-[#FAF7F2] text-[#1A1A1A] font-sans min-h-screen relative">

         {/* 1. Wedding Gift Products Section */}
         {product.category === "Wedding Gift Products" && (
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-t border-amber-200/50">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-800 font-bold bg-amber-100 px-4 py-1.5 rounded-full inline-block">Related Products</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">Wedding Gift Products</h2>
          <p className="text-neutral-600 text-sm font-light">Handpicked luxury presents and hampers for grand weddings and couple milestones.</p>
        </div>

        <div ref={weddingRef} className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory">
          {weddingGifts.map((item) => (
            <div key={item.id} className="min-w-[240px] sm:min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border border-amber-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group snap-start">
              <div className="relative h-48 w-full overflow-hidden bg-neutral-100 block">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <button
            
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Heart
                      size={16}
                      className={
               "text-gray-700"
                      }
                    />
                  </button>
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-1">
                  <Link href={`/card/${item.slug}`}>
                    <h3 className="font-serif text-sm font-bold text-neutral-900 line-clamp-1 hover:text-amber-800 transition">{item.name}</h3>
                  </Link>
                  <p className="text-neutral-500 text-xs leading-relaxed font-light line-clamp-2">{item.desc}</p>
                </div>
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-neutral-900 font-bold text-sm">{item.price}</span>
                  <div className="flex items-center space-x-1.5">
                    <button 
                      type="button"
                      onClick={(e) => handleAddToCart()}
                      title="Add to Cart"
                      className="bg-amber-100 hover:bg-amber-200 text-amber-900 p-2 rounded-full transition shadow-sm cursor-pointer"
                    >
                      <ShoppingBag size={14} />
                    </button>
                    <Link href={`/card/${item.slug}`} className="bg-amber-800 text-white px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-900 transition shadow">
                      Book
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button onClick={() => scrollContainer(weddingRef, "left")} className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md cursor-pointer">
            <ChevronRight size={22} />
          </button>
          <button onClick={() => scrollContainer(weddingRef, "right")} className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md cursor-pointer">
            <ChevronRight size={22} />
          </button>
        </div>
      </section>
    )}

      {/* 2. Festivals Products Section */}
      {product.category === "Festivals Products" && (
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-t border-amber-200/50">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-800 font-bold bg-amber-100 px-4 py-1.5 rounded-full inline-block">Festive Vibes</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">Festivals Products</h2>
          <p className="text-neutral-600 text-sm font-light">Brighten up seasonal celebrations with vibrant cultural and traditional decorations.</p>
        </div>

        <div ref={festivalRef} className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory">
          {festivalsProducts.map((item) => (
            <div key={item.id} className="min-w-[240px] sm:min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border border-amber-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group snap-start">
              <div  className="relative h-48 w-full overflow-hidden bg-neutral-100 block">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <button
                   
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Heart
                      size={16}
                      className={
                      
                    "text-gray-700"
                      }
                    />
                  </button>
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-1">
                  <Link href={`/card/${item.slug}`}>
                    <h3 className="font-serif text-sm font-bold text-neutral-900 line-clamp-1 hover:text-amber-800 transition">{item.name}</h3>
                  </Link>
                  <p className="text-neutral-500 text-xs leading-relaxed font-light line-clamp-2">{item.desc}</p>
                </div>
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-neutral-900 font-bold text-sm">{item.price}</span>
                  <div className="flex items-center space-x-1.5">
                    <button 
                      type="button"
                      onClick={(e) => handleAddToCart()}
                      title="Add to Cart"
                      className="bg-amber-100 hover:bg-amber-200 text-amber-900 p-2 rounded-full transition shadow-sm cursor-pointer"
                    >
                      <ShoppingBag size={14} />
                    </button>
                    <Link href={`/card/${item.slug}`} className="bg-amber-800 text-white px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-900 transition shadow">
                      Book
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button onClick={() => scrollContainer(festivalRef, "left")} className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md cursor-pointer">
            <ChevronLeft size={22} />
          </button>
          <button onClick={() => scrollContainer(festivalRef, "right")} className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md cursor-pointer">
            <ChevronRight size={22} />
          </button>
        </div>
      </section>
      )}

      {/* 3. Puja Section */}
      {product.category === "Puja Section" && (
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-t border-amber-200/50">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-800 font-bold bg-amber-100 px-4 py-1.5 rounded-full inline-block">Related Products</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">Puja Section</h2>
          <p className="text-neutral-600 text-sm font-light">Exquisite mandaps, sacred thalis, and serene decor elements for divine prayers.</p>
        </div>

        <div ref={pujaRef} className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory">
          {pujaSection.map((item) => (
            <div key={item.id} className="min-w-[240px] sm:min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border border-amber-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group snap-start">
              <div className="relative h-48 w-full overflow-hidden bg-neutral-100 block">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <button
              
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Heart
                      size={16}
                      className={
                        
                        "text-gray-700"
                      }
                    />
                  </button>
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-1">
                  <Link href={`/card/${item.slug}`}>
                    <h3 className="font-serif text-sm font-bold text-neutral-900 line-clamp-1 hover:text-amber-800 transition">{item.name}</h3>
                  </Link>
                  <p className="text-neutral-500 text-xs leading-relaxed font-light line-clamp-2">{item.desc}</p>
                </div>
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-neutral-900 font-bold text-sm">{item.price}</span>
                  <div className="flex items-center space-x-1.5">
                    <button 
                      type="button"
                      onClick={(e) => handleAddToCart()}
                      title="Add to Cart"
                      className="bg-amber-100 hover:bg-amber-200 text-amber-900 p-2 rounded-full transition shadow-sm cursor-pointer"
                    >
                      <ShoppingBag size={14} />
                    </button>
                    <Link href={`/card/${item.slug}`} className="bg-amber-800 text-white px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-900 transition shadow">
                      Book
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button onClick={() => scrollContainer(pujaRef, "left")} className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md cursor-pointer">
            <ChevronLeft size={22} />
          </button>
          <button onClick={() => scrollContainer(pujaRef, "right")} className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md cursor-pointer">
            <ChevronRight size={22} />
          </button>
        </div>
      </section>
      )}

      {/* 4. Esthetic Products Section */}
      {product.category === "Esthetic Products" && (
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-t border-amber-200/50 pb-20">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-800 font-bold bg-amber-100 px-4 py-1.5 rounded-full inline-block">Related Products</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">Esthetic Products</h2>
          <p className="text-neutral-600 text-sm font-light">Minimalist and trend-setting artistic home decor accents for modern aesthetics.</p>
        </div>

        <div ref={estheticRef} className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory">
          {estheticProducts.map((item) => (
            <div key={item.id} className="min-w-[240px] sm:min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border border-amber-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group snap-start">
              <div className="relative h-48 w-full overflow-hidden bg-neutral-100 block">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <button
                  
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Heart
                      size={16}
                      className={
                        "text-gray-700"
                      }
                    />
                  </button>
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-1">
                  <Link href={`/card/${item.slug}`}>
                    <h3 className="font-serif text-sm font-bold text-neutral-900 line-clamp-1 hover:text-amber-800 transition">{item.name}</h3>
                  </Link>
                  <p className="text-neutral-500 text-xs leading-relaxed font-light line-clamp-2">{item.desc}</p>
                </div>
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-neutral-900 font-bold text-sm">{item.price}</span>
                  <div className="flex items-center space-x-1.5">
                    <button 
                      type="button"
                      onClick={(e) => handleAddToCart()}
                      title="Add to Cart"
                      className="bg-amber-100 hover:bg-amber-200 text-amber-900 p-2 rounded-full transition shadow-sm cursor-pointer"
                    >
                      <ShoppingBag size={14} />
                    </button>
                    <Link href={`/card/${item.slug}`} className="bg-amber-800 text-white px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-amber-900 transition shadow">
                      Book
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button onClick={() => scrollContainer(estheticRef, "left")} className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md cursor-pointer">
            <ChevronLeft size={22} />
          </button>
          <button onClick={() => scrollContainer(estheticRef, "right")} className="bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white p-3 rounded-full transition shadow-md cursor-pointer">
            <ChevronRight size={22} />
          </button>
        </div>
      </section>
      )}


      </div>

    </div>
  );
}