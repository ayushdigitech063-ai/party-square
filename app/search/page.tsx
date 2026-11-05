"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Sparkles, Filter, ArrowRight, ArrowLeft } from "lucide-react";
import { allProducts } from "@/app/data/allCollections";
import { decorationItems } from "@/app/data/decorationThemeData";
import ProductCard from "@/app/components/ProductCard";
import { useWishlist } from "@/app/context/wishlistcontext";
import { useCity } from "@/app/context/CityContext";
import { fetchProducts, ProductItem } from "@/app/lib/api";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { selectedCity } = useCity();

  const [inputVal, setInputVal] = useState(query);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const citySlug = (selectedCity || "delhi").toLowerCase().replace(/[^a-z0-9]+/g, "-");

  useEffect(() => {
    setInputVal(query);
  }, [query]);

  useEffect(() => {
    let isMounted = true;
    async function performSearch() {
      setLoading(true);
      const cleanQuery = query.toLowerCase().trim();

      if (!cleanQuery) {
        setResults([]);
        setLoading(false);
        return;
      }

      let apiResults: any[] = [];
      try {
        const res = await fetchProducts({ search: cleanQuery, limit: 40 });
        if (Array.isArray(res?.products)) {
          apiResults = res.products;
        }
      } catch (err) {
        // Fallback to static catalog search
      }

      // Static search across allProducts + decorationItems
      const matchedStatic: any[] = [];
      const seenIds = new Set(apiResults.map((p) => String(p._id || p.id)));

      // Search in allProducts
      allProducts.forEach((p: any) => {
        const idStr = String(p.id);
        if (!seenIds.has(idStr)) {
          const match =
            p.name?.toLowerCase().includes(cleanQuery) ||
            p.description?.toLowerCase().includes(cleanQuery) ||
            p.category?.toLowerCase().includes(cleanQuery) ||
            (Array.isArray(p.tags) && p.tags.some((t: string) => t.toLowerCase().includes(cleanQuery)));
          if (match) {
            seenIds.add(idStr);
            matchedStatic.push(p);
          }
        }
      });

      // Search in decorationItems
      decorationItems.forEach((p) => {
        const idStr = String(p.id);
        if (!seenIds.has(idStr)) {
          const match =
            p.name?.toLowerCase().includes(cleanQuery) ||
            p.description?.toLowerCase().includes(cleanQuery) ||
            p.category?.toLowerCase().includes(cleanQuery) ||
            p.subcategory?.toLowerCase().includes(cleanQuery);
          if (match) {
            seenIds.add(idStr);
            matchedStatic.push(p);
          }
        }
      });

      if (isMounted) {
        setResults([...apiResults, ...matchedStatic]);
        setLoading(false);
      }
    }

    performSearch();
    return () => {
      isMounted = false;
    };
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    router.push(`/search?q=${encodeURIComponent(inputVal.trim())}`);
  };

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#202522]">
      {/* Search Header Banner */}
      <section className="bg-white border-b border-[#E8E8E3] py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs text-[#6B706C]">
            <Link href={`/${citySlug}`} className="hover:text-[#8CBC67] transition flex items-center gap-1">
              <ArrowLeft size={13} />
              <span>Back to Home</span>
            </Link>
            <span>/</span>
            <span className="text-[#202522] font-semibold">Search Results</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#202522]">
            {query ? (
              <>
                Search results for <span className="text-[#8CBC67]">"{query}"</span>
              </>
            ) : (
              "Search Decorations & Event Themes"
            )}
          </h1>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mt-4">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search balloons, birthday themes, romantic cabana, mandap..."
              className="w-full bg-[#FCFBF7] border-2 border-[#E8E8E3] focus:border-[#8CBC67] rounded-full py-3 pl-12 pr-28 text-sm text-[#202522] placeholder:text-[#6B706C] focus:outline-none transition shadow-xs"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8CBC67]" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#8CBC67] hover:bg-[#7AB055] text-white text-xs font-bold px-5 py-2 rounded-full transition shadow-2xs cursor-pointer"
            >
              Search
            </button>
          </form>

          <p className="text-xs text-[#6B706C] font-medium pt-1">
            {!loading && (
              <span>Found <strong>{results.length}</strong> verified decoration setups available in <strong>{selectedCity || "your city"}</strong></span>
            )}
          </p>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#6B706C] space-y-3">
            <div className="w-8 h-8 border-3 border-[#8CBC67] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold">Searching decorations...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {results.map((product, idx) => (
              <ProductCard
                key={`${product._id || product.id}-${idx}`}
                product={product}
                isInWishlist={isInWishlist}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E8E3] p-8 max-w-xl mx-auto space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-full bg-[#EEF6EB] text-[#8CBC67] flex items-center justify-center mx-auto">
              <Search size={26} />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#202522]">No decorations found</h3>
            <p className="text-xs sm:text-sm text-[#6B706C] leading-relaxed">
              We couldn't find any setups matching "{query}". Try searching for popular keywords like <strong>"birthday"</strong>, <strong>"canopy"</strong>, <strong>"balloon"</strong>, or <strong>"mandap"</strong>.
            </p>
            <div className="pt-2">
              <Link
                href={`/${citySlug}`}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#8CBC67] text-white text-xs font-bold hover:bg-[#7AB055] transition shadow-md"
              >
                <span>Browse All Categories</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-[#8CBC67] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
