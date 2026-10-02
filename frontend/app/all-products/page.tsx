"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Heart, Search, MapPin } from "lucide-react";
import { useWishlist } from "@/app/context/wishlistcontext";
import { useCity } from "@/app/context/CityContext";
import { API_URL } from "@/config";
import { useProducts } from "@/app/hooks/useProducts";

function WhatsAppIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.7.44 3.36 1.28 4.82L2 22l5.4-1.42a9.9 9.9 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm0 18.1h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.2.84.85-3.12-.2-.32a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.28-8.19 8.28zm4.52-6.19c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28z" />
    </svg>
  );
}

export default function AllProductsPage() {
  const { selectedCity, openCityModal } = useCity();
  const { products: combinedProducts, loading } = useProducts(undefined, undefined, selectedCity);
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [dbCategories, setDbCategories] = useState<string[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState("918010679679");

  // Fetch all categories and whatsapp number from API
  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const names = data.map((c: any) => c.name).filter(Boolean);
          setDbCategories(names);
        }
      })
      .catch(err => console.error("Error loading categories:", err));

    fetch(`${API_URL}/api/settings`)
      .then(res => res.json())
      .then(sData => {
        if (sData?.whatsappNumber) {
          const clean = sData.whatsappNumber.replace(/\D/g, "");
          setWhatsappNumber(clean.startsWith("91") && clean.length > 10 ? clean : `91${clean.slice(-10)}`);
        }
      })
      .catch(err => console.error("Error loading settings:", err));
  }, []);

  // Merge unique categories from DB categories AND product categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    dbCategories.forEach(c => cats.add(c));
    combinedProducts.forEach(p => {
      if (p.category) {
        cats.add(p.category);
      }
    });
    return ["All", ...Array.from(cats)];
  }, [dbCategories, combinedProducts]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (loading) return null;
    return combinedProducts.filter(p => {
      const matchesCategory = 
        activeCategory === "All" || 
        (p.category && p.category.toLowerCase().trim() === activeCategory.toLowerCase().trim()) ||
        (p.subcategory && p.subcategory.toLowerCase().trim() === activeCategory.toLowerCase().trim());
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, combinedProducts, loading]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans">
      {/* Header */}
      <div className="bg-[#1A1A1A] text-white pt-20 pb-12 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bgpic.png')] opacity-10 bg-cover bg-center" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-amber-400 text-xs uppercase tracking-widest font-medium border border-white/20">
            <Sparkles size={14} />
            <span>Party Square Collections</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight">
            Explore All <span className="text-amber-400 italic">Products</span>
          </h1>
          <p className="text-neutral-300 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Browse our complete catalog of premium decorations. From grand weddings and corporate events to intimate birthdays and festive celebrations.
          </p>
          
          {/* Search Bar & City Selector */}
          <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-3 mt-8">
            <div className="relative flex-1 w-full">
              <input 
                type="text" 
                placeholder="Search decorations, themes..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 px-5 py-3 pl-12 rounded-full focus:outline-none focus:border-amber-400 transition-colors text-sm"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={17} />
            </div>

            <button
              onClick={openCityModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 px-5 py-3 rounded-full text-xs font-bold transition shadow-md shrink-0 cursor-pointer"
            >
              <MapPin size={15} />
              <span>City: {selectedCity || "Select City"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Categories & City indicator */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div className="flex overflow-x-auto no-scrollbar gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-neutral-900 text-white shadow-md" 
                    : "bg-white text-neutral-600 border border-neutral-200 hover:border-amber-400 hover:text-amber-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {selectedCity && (
            <button
              onClick={openCityModal}
              className="inline-flex items-center gap-1.5 self-start sm:self-auto bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2 rounded-full text-xs font-semibold hover:bg-amber-100 transition shrink-0 cursor-pointer"
            >
              <MapPin size={13} className="text-amber-600" />
              <span>Showing for: <strong className="text-black underline">{selectedCity}</strong></span>
              <span className="text-[10px] text-amber-700 ml-1">(Change)</span>
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="w-9 h-9 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : !filteredProducts || filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-neutral-500">
            <p className="text-lg">No decorations found in <strong className="text-neutral-900">{selectedCity}</strong> matching your criteria.</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <button 
                onClick={() => {setActiveCategory("All"); setSearchQuery("");}}
                className="text-amber-600 font-medium hover:underline text-sm"
              >
                Clear search filters
              </button>
              <span className="text-neutral-300">|</span>
              <button 
                onClick={openCityModal}
                className="text-amber-700 font-bold hover:underline text-sm"
              >
                Change City
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => {
              // Extract the first image or main image
              const imageUrl = product.image || (product.images && product.images[0]) || "/default-placeholder.png";
              
              return (
                <div key={`${product.id}-${index}`} className="group bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:border-amber-300 hover:shadow-xl transition-all duration-500 flex flex-col">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-400 hover:text-red-500 hover:scale-110 transition-all z-10 shadow-sm"
                    >
                      <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} className={isInWishlist(product.id) ? "text-red-500" : ""} />
                    </button>
                    {product.category && (
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full font-semibold">
                        {product.category}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-neutral-900 leading-tight mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="mt-auto pt-4 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-neutral-900">
                          {typeof product.price === 'number' 
                            ? `₹${product.price.toLocaleString("en-IN")}` 
                            : String(product.price).includes('₹') || String(product.price).includes('')
                              ? String(product.price).replace('', '₹')
                              : `₹${String(product.price)}`
                          }
                        </span>
                        <Link
                          href={`/card/${product.id}`}
                          className="text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 px-4 py-1.5 rounded-full transition-colors"
                        >
                          Details
                        </Link>
                      </div>

                      {(() => {
                        const priceStr = typeof product.price === 'number' ? `₹${product.price.toLocaleString("en-IN")}` : `₹${product.price}`;
                        const pUrl = typeof window !== 'undefined' ? `${window.location.origin}/card/${product.id}` : '';
                        const wpMsg = `Hello Party Square! I want to order this product: "${product.name}" (${priceStr}). Product Link: ${pUrl}`;
                        const wpHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(wpMsg)}`;

                        return (
                          <a
                            href={wpHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#20bd5a] text-white transition flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <WhatsAppIcon size={14} />
                            <span>Order on WhatsApp</span>
                          </a>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
