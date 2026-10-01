"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Heart, Search } from "lucide-react";
import { useWishlist } from "@/app/context/wishlistcontext";
import { API_URL } from "@/config";
import { useProducts } from "@/app/hooks/useProducts";

export default function AllProductsPage() {
    const { products: allProducts, loading } = useProducts();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [dbProducts, setDbProducts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch products from backend
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Map DB product format to match the frontend static format
          const formattedDb = data.map(p => ({
            id: p._id,
            name: p.name,
            description: p.description,
            price: p.price,
            image: p.image,
            images: p.images || [p.image],
            category: p.category ? p.category.name : "Uncategorized"
          }));
          setDbProducts(formattedDb);
        }
      })
      .catch(err => console.error("Error fetching DB products:", err));
  }, []);

  const combinedProducts = useMemo(() => [...dbProducts, ...allProducts], [dbProducts]);

  // Extract unique categories (clean up names for display)
  const categories = useMemo(() => {
    const cats = new Set<string>();
    combinedProducts.forEach(p => {
      if (p.category) {
        cats.add(p.category);
      }
    });
    return ["All", ...Array.from(cats)];
  }, [combinedProducts]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div></div>;
    return combinedProducts.filter(p => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

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
            Explore All <span className="text-amber-400 italic">Decorations</span>
          </h1>
          <p className="text-neutral-300 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Browse our complete catalog of premium decorations. From grand weddings and corporate events to intimate birthdays and festive celebrations.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative mt-8">
            <input 
              type="text" 
              placeholder="Search decorations, themes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 px-5 py-3.5 pl-12 rounded-full focus:outline-none focus:border-amber-400 transition-colors"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
          </div>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex overflow-x-auto no-scrollbar gap-3 pb-4 border-b border-neutral-200">
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
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-neutral-500">
            <p className="text-lg">No decorations found matching your criteria.</p>
            <button 
              onClick={() => {setActiveCategory("All"); setSearchQuery("");}}
              className="mt-4 text-amber-600 font-medium hover:underline"
            >
              Clear filters
            </button>
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
                    
                    <div className="mt-auto pt-4 flex items-center justify-between">
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
                        className="bg-neutral-900 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-amber-500 hover:text-neutral-900 transition-colors shadow-sm"
                      >
                        Details
                      </Link>
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
