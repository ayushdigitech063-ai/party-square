"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
  Star,
  Search,
  Filter,
  SlidersHorizontal,
  Loader2,
  AlertCircle,
  Tag,
  ArrowUpDown,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import {
  weddingGifts as defaultWeddingGifts,
  festivalsProducts as defaultFestivalsProducts,
  pujaSection as defaultPujaSection,
  estheticProducts as defaultEstheticProducts,
} from "../data/allCollections";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "../context/wishlistcontext";
import { useRouter, useSearchParams } from "next/navigation";
import HeartButton from "../components/HeartButton";
import ProductCard from "../components/ProductCard";
import {
  fetchProducts,
  fetchCategories,
  fetchSubcategories,
  ProductItem,
  CategoryItem
} from "@/app/lib/api";

const toNumber = (v: any) =>
  Number(String(v ?? "").replace(/[^0-9.]/g, "")) || 0;

const getPricing = (item: any) => {
  const salePrice = toNumber(item.price);
  const originalPrice = toNumber(item.originalPrice) || (salePrice * 1.25);
  const hasDiscount = originalPrice > salePrice && salePrice > 0;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;
  return { salePrice, originalPrice, hasDiscount, discountPercent };
};

const DiscountBadge = ({ item }: { item: any }) => {
  const { hasDiscount, discountPercent } = getPricing(item);
  if (!hasDiscount) return null;
  return (
    <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
      {discountPercent}% OFF
    </span>
  );
};

const RatingRow = ({ item }: { item: any }) => {
  const rating = Number(item.rating) || 0;
  const reviewCount = Number(item.reviewCount) || 0;
  if (rating <= 0) return null;
  return (
    <div className="flex items-center space-x-1.5">
      <span className="inline-flex items-center space-x-1 bg-emerald-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
        <span>{rating.toFixed(1)}</span>
        <Star size={10} className="fill-white" />
      </span>
      {reviewCount > 0 && (
        <span className="text-[11px] text-[#6B706C]">
          ({reviewCount.toLocaleString("en-IN")} reviews)
        </span>
      )}
    </div>
  );
};

const PriceBlock = ({ item }: { item: any }) => {
  const { salePrice, originalPrice, hasDiscount } = getPricing(item);
  if (!hasDiscount) {
    return (
      <span className="text-[#202522] font-bold text-sm">₹{item.price}</span>
    );
  }
  return (
    <div className="flex flex-col leading-tight">
      <div className="flex items-baseline space-x-1.5">
        <span className="text-[#202522] font-bold text-sm">
          ₹{salePrice.toLocaleString("en-IN")}
        </span>
        <span className="text-[#6B706C] text-xs line-through">
          ₹{originalPrice.toLocaleString("en-IN")}
        </span>
      </div>
      <span className="text-[11px] font-semibold text-emerald-700">
        You save ₹{(originalPrice - salePrice).toLocaleString("en-IN")}
      </span>
    </div>
  );
};

export default function CardPage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  // Scrolling containers for horizontal sections
  const weddingRef = useRef<HTMLDivElement>(null);
  const festivalRef = useRef<HTMLDivElement>(null);
  const pujaRef = useRef<HTMLDivElement>(null);
  const estheticRef = useRef<HTMLDivElement>(null);

  // Dynamic Storefront Filter State
  const initialCategory = searchParams.get("category") || "";
  const initialSubcategory = searchParams.get("subcategory") || "";
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialSubcategory);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [priceRange, setPriceRange] = useState<string>("all");

  // Dynamic Data
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [subcategories, setSubcategories] = useState<CategoryItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loadingFiltered, setLoadingFiltered] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFilteredCount, setTotalFilteredCount] = useState(0);

  // Curated collections from database (falling back to static defaults)
  const [weddingItems, setWeddingItems] = useState<any[]>(defaultWeddingGifts);
  const [festivalItems, setFestivalItems] = useState<any[]>(defaultFestivalsProducts);
  const [pujaItems, setPujaItems] = useState<any[]>(defaultPujaSection);
  const [estheticItems, setEstheticItems] = useState<any[]>(defaultEstheticProducts);

  // Load Categories on mount & sync with URL parameters
  useEffect(() => {
    async function loadCats() {
      try {
        const res = await fetchCategories({ parentOnly: true });
        const list = Array.isArray(res) ? res : res.categories;
        setCategories(list);

        // If URL has category name or slug (e.g. ?category=Birthday)
        if (initialCategory) {
          const matchedCat = list.find(
            (c: CategoryItem) =>
              c._id === initialCategory ||
              c.slug?.toLowerCase() === initialCategory.toLowerCase() ||
              c.name?.toLowerCase() === initialCategory.toLowerCase()
          );
          if (matchedCat) {
            setSelectedCategory(matchedCat._id);

            // Also load subcategories for this matched category
            const subs = await fetchSubcategories(matchedCat._id);
            setSubcategories(subs);

            if (initialSubcategory) {
              const matchedSub = subs.find(
                (s: CategoryItem) =>
                  s._id === initialSubcategory ||
                  s.slug?.toLowerCase() === initialSubcategory.toLowerCase() ||
                  s.name?.toLowerCase() === initialSubcategory.toLowerCase()
              );
              if (matchedSub) {
                setSelectedSubcategory(matchedSub._id);
              }
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    loadCats();
  }, [initialCategory, initialSubcategory]);

  // Load Subcategories when category changes
  useEffect(() => {
    if (!selectedCategory) {
      setSubcategories([]);
      setSelectedSubcategory("");
      return;
    }
    async function loadSubs() {
      try {
        const data = await fetchSubcategories(selectedCategory);
        setSubcategories(data);
      } catch (err) {
        console.error("Failed to fetch subcategories:", err);
      }
    }
    loadSubs();
  }, [selectedCategory]);

  // Load curated collections dynamically from database
  useEffect(() => {
    async function loadCurated() {
      try {
        const [wRes, fRes, pRes, eRes] = await Promise.all([
          fetchProducts({ category: "wedding", limit: 12 }),
          fetchProducts({ category: "festivals", limit: 12 }),
          fetchProducts({ category: "puja", limit: 12 }),
          fetchProducts({ category: "esthetic", limit: 12 })
        ]);

        if (wRes.products && wRes.products.length > 0) {
          setWeddingItems(wRes.products.map(p => ({ ...p, id: p._id })));
        }
        if (fRes.products && fRes.products.length > 0) {
          setFestivalItems(fRes.products.map(p => ({ ...p, id: p._id })));
        }
        if (pRes.products && pRes.products.length > 0) {
          setPujaItems(pRes.products.map(p => ({ ...p, id: p._id })));
        }
        if (eRes.products && eRes.products.length > 0) {
          setEstheticItems(eRes.products.map(p => ({ ...p, id: p._id })));
        }
      } catch (err) {
        console.error("Curated collections fetch error:", err);
      }
    }
    loadCurated();
  }, []);

  // Fetch products when user searches or filters
  const isFiltering = !!(search.trim() || selectedCategory || selectedSubcategory || priceRange !== "all" || sortBy !== "newest");

  const runDynamicFilter = useCallback(async () => {
    if (!isFiltering) {
      setHasSearched(false);
      return;
    }

    try {
      setLoadingFiltered(true);
      setHasSearched(true);

      const params: any = {
        search: search.trim() || undefined,
        category: selectedCategory || undefined,
        subcategory: selectedSubcategory || undefined,
        sort: sortBy,
        page,
        limit: 12,
      };

      if (priceRange === "under-3000") {
        params.maxPrice = 3000;
      } else if (priceRange === "3000-7000") {
        params.minPrice = 3000;
        params.maxPrice = 7000;
      } else if (priceRange === "above-7000") {
        params.minPrice = 7000;
      }

      const res = await fetchProducts(params);
      const mapped = (res.products || []).map(p => ({
        ...p,
        id: p._id,
      }));

      setFilteredProducts(mapped);
      setTotalPages(res.totalPages || 1);
      setTotalFilteredCount(res.total || 0);
    } catch (err) {
      console.error("Dynamic products filter error:", err);
    } finally {
      setLoadingFiltered(false);
    }
  }, [isFiltering, search, selectedCategory, selectedSubcategory, sortBy, priceRange, page]);

  useEffect(() => {
    runDynamicFilter();
  }, [runDynamicFilter]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedSubcategory("");
    setPriceRange("all");
    setSortBy("newest");
    setPage(1);
    setHasSearched(false);
  };

  const scrollContainer = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right",
  ) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const openProductDetailPage = (item: any) => {
    router.push(`/card/${item.slug || item.id}`);
  };

  return (
    <div className="bg-[#FCFBF7] text-[#202522] font-sans min-h-screen relative">
      {/* Hero Banner with Dynamic Filter Hub */}
      <section className="bg-gradient-to-b from-[#EEF6EB]/60 to-transparent pt-12 pb-8 px-6 md:px-12 border-b border-[#E8E8E3]/60">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#8CBC67] font-bold bg-white px-4 py-1.5 rounded-full shadow-sm border border-[#E8E8E3]">
              <Sparkles size={14} />
              <span>Live Catalogue</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#202522]">
              Party Square Collections
            </h1>
            <p className="text-[#6B706C] text-sm sm:text-base font-light">
              Explore our database-driven collection of luxury decoration themes, gift hampers, and sacred essentials.
            </p>
          </div>

          {/* Interactive Search & Filter Bar */}
          <div className="bg-white border border-[#E8E8E3] rounded-3xl p-4 sm:p-6 shadow-md max-w-5xl mx-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Product Search */}
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B706C]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search products & themes..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30"
                />
              </div>

              {/* Dynamic Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubcategory("");
                    setPage(1);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs text-[#202522] focus:outline-none font-medium"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dynamic Subcategory Filter */}
              <div>
                <select
                  value={selectedSubcategory}
                  onChange={(e) => {
                    setSelectedSubcategory(e.target.value);
                    setPage(1);
                  }}
                  disabled={!selectedCategory || subcategories.length === 0}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs text-[#202522] focus:outline-none font-medium disabled:opacity-40"
                >
                  <option value="">
                    {selectedCategory ? "All Subcategories" : "Subcategory (Select Category First)"}
                  </option>
                  {subcategories.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <select
                  value={priceRange}
                  onChange={(e) => {
                    setPriceRange(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs text-[#202522] focus:outline-none font-medium"
                >
                  <option value="all">Any Price Range</option>
                  <option value="under-3000">Under ₹3,000</option>
                  <option value="3000-7000">₹3,000 - ₹7,000</option>
                  <option value="above-7000">Above ₹7,000</option>
                </select>
              </div>
            </div>

            {/* Bottom Sort & Reset Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E8E8E3] text-xs">
              <div className="flex items-center space-x-2">
                <ArrowUpDown size={14} className="text-[#6B706C]" />
                <span className="text-[#6B706C]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                  className="px-2.5 py-1.5 rounded-lg border border-[#E8E8E3] bg-[#FCFBF7] text-xs font-semibold text-[#202522] focus:outline-none"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name (A-Z)</option>
                </select>
              </div>

              {isFiltering && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-red-600 font-bold hover:underline"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Filter Results Section (Shown when search/filters are active) */}
      {isFiltering ? (
        <section className="py-12 px-6 md:px-16 max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522]">
                Filtered Results
              </h2>
              <p className="text-xs text-[#6B706C] mt-1">
                Showing {totalFilteredCount} matching celebration products
              </p>
            </div>
          </div>

          {loadingFiltered ? (
            <div className="p-20 text-center space-y-3">
              <Loader2 size={36} className="animate-spin mx-auto text-[#8CBC67]" />
              <p className="text-xs text-[#6B706C]">Searching live database catalogue...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-16 text-center space-y-4 bg-white rounded-3xl border border-[#E8E8E3]">
              <AlertCircle size={40} className="mx-auto text-amber-600" />
              <h3 className="font-serif text-xl font-bold text-[#202522]">No matching products found</h3>
              <p className="text-xs text-[#6B706C] max-w-md mx-auto">
                We couldn&apos;t find any decorations or items matching your current filters. Try relaxing your search terms or category selection.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-2xl bg-[#8CBC67] text-neutral-950 font-bold text-xs shadow"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((item) => (
                  <ProductCard
                    key={item.id || item._id}
                    product={item}
                    isInWishlist={isInWishlist}
                    toggleWishlist={toggleWishlist}
                  />
                ))}
              </div>

              {/* Pagination controls for dynamic filter */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-6 border-t border-[#E8E8E3]">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="p-2 rounded-xl border border-[#E8E8E3] bg-white hover:bg-neutral-100 disabled:opacity-40 transition"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-xs font-semibold text-[#202522]">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="p-2 rounded-xl border border-[#E8E8E3] bg-white hover:bg-neutral-100 disabled:opacity-40 transition"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      ) : null}

      {/* 1. Wedding Gift Products Section */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-t border-[#E8E8E3]/50">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#202522] font-bold bg-[#EEF6EB] px-4 py-1.5 rounded-full inline-block">
            Special Collection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
            Wedding Gift Products
          </h2>
          <p className="text-[#6B706C] text-sm font-light">
            Handpicked luxury presents and hampers for grand weddings and couple milestones.
          </p>
        </div>

        <div
          ref={weddingRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
        >
          {weddingItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openProductDetailPage(item)}
              className="min-w-[240px] sm:min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border border-[#E8E8E3] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group snap-start cursor-pointer"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 block">
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-60"
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="relative w-full h-full object-contain group-hover:scale-105 transition duration-500"
                />
                <DiscountBadge item={item} />
                <HeartButton
                  product={item}
                  isInWishlist={isInWishlist}
                  toggleWishlist={toggleWishlist}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-1">
                  <Link href={`/card/${item.slug || item.id}`}>
                    <h3 className="font-serif text-sm font-bold text-[#202522] line-clamp-1 hover:text-[#202522] transition">
                      {item.name}
                    </h3>
                  </Link>
                  <RatingRow item={item} />
                  <p className="text-[#6B706C] text-xs leading-relaxed font-light line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8E8E3] flex items-center justify-between">
                  <PriceBlock item={item} />
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => openProductDetailPage(item)}
                      className="bg-[#8CBC67] text-[#FCFBF7] px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#7AB055] transition shadow"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => scrollContainer(weddingRef, "left")}
            className="bg-[#EEF6EB] text-[#202522] hover:bg-[#7AB055] hover:text-white p-3 rounded-full transition shadow-md cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => scrollContainer(weddingRef, "right")}
            className="bg-[#EEF6EB] text-[#202522] hover:bg-[#7AB055] hover:text-white p-3 rounded-full transition shadow-md cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </section>

      {/* 2. Festivals Products Section */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-t border-[#E8E8E3]/50">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#202522] font-bold bg-[#EEF6EB] px-4 py-1.5 rounded-full inline-block">
            Festive Vibes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
            Festivals Products
          </h2>
          <p className="text-[#6B706C] text-sm font-light">
            Brighten up seasonal celebrations with vibrant cultural and traditional decorations.
          </p>
        </div>

        <div
          ref={festivalRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
        >
          {festivalItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openProductDetailPage(item)}
              className="min-w-[240px] sm:min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border border-[#E8E8E3] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group snap-start cursor-pointer"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 block">
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-60"
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="relative w-full h-full object-contain group-hover:scale-105 transition duration-500"
                />
                <DiscountBadge item={item} />
                <HeartButton
                  product={item}
                  isInWishlist={isInWishlist}
                  toggleWishlist={toggleWishlist}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-1">
                  <Link href={`/card/${item.slug || item.id}`}>
                    <h3 className="font-serif text-sm font-bold text-[#202522] line-clamp-1 hover:text-[#202522] transition">
                      {item.name}
                    </h3>
                  </Link>
                  <RatingRow item={item} />
                  <p className="text-[#6B706C] text-xs leading-relaxed font-light line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8E8E3] flex items-center justify-between">
                  <PriceBlock item={item} />
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => openProductDetailPage(item)}
                      className="bg-[#8CBC67] text-[#FCFBF7] px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#7AB055] transition shadow"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => scrollContainer(festivalRef, "left")}
            className="bg-[#EEF6EB] text-[#202522] hover:bg-[#7AB055] hover:text-white p-3 rounded-full transition shadow-md cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => scrollContainer(festivalRef, "right")}
            className="bg-[#EEF6EB] text-[#202522] hover:bg-[#7AB055] hover:text-white p-3 rounded-full transition shadow-md cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </section>

      {/* 3. Puja Section */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-t border-[#E8E8E3]/50">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#202522] font-bold bg-[#EEF6EB] px-4 py-1.5 rounded-full inline-block">
            Sacred & Devotional
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
            Puja Section
          </h2>
          <p className="text-[#6B706C] text-sm font-light">
            Exquisite mandaps, sacred thalis, and serene decor elements for divine prayers.
          </p>
        </div>

        <div
          ref={pujaRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
        >
          {pujaItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openProductDetailPage(item)}
              className="min-w-[240px] sm:min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border border-[#E8E8E3] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group snap-start cursor-pointer"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 block">
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-60"
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="relative w-full h-full object-contain group-hover:scale-105 transition duration-500"
                />
                <DiscountBadge item={item} />
                <HeartButton
                  product={item}
                  isInWishlist={isInWishlist}
                  toggleWishlist={toggleWishlist}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-1">
                  <Link href={`/card/${item.slug || item.id}`}>
                    <h3 className="font-serif text-sm font-bold text-[#202522] line-clamp-1 hover:text-[#202522] transition">
                      {item.name}
                    </h3>
                  </Link>
                  <RatingRow item={item} />
                  <p className="text-[#6B706C] text-xs leading-relaxed font-light line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8E8E3] flex items-center justify-between">
                  <PriceBlock item={item} />
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => openProductDetailPage(item)}
                      className="bg-[#8CBC67] text-[#FCFBF7] px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#7AB055] transition shadow"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => scrollContainer(pujaRef, "left")}
            className="bg-[#EEF6EB] text-[#202522] hover:bg-[#7AB055] hover:text-white p-3 rounded-full transition shadow-md cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => scrollContainer(pujaRef, "right")}
            className="bg-[#EEF6EB] text-[#202522] hover:bg-[#7AB055] hover:text-white p-3 rounded-full transition shadow-md cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </section>

      {/* 4. Esthetic Products Section */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-t border-[#E8E8E3]/50 pb-20">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#202522] font-bold bg-[#EEF6EB] px-4 py-1.5 rounded-full inline-block">
            Modern Elegance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
            Esthetic Products
          </h2>
          <p className="text-[#6B706C] text-sm font-light">
            Minimalist and trend-setting artistic home decor accents for modern aesthetics.
          </p>
        </div>

        <div
          ref={estheticRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
        >
          {estheticItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openProductDetailPage(item)}
              className="min-w-[240px] sm:min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border border-[#E8E8E3] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group snap-start cursor-pointer"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 block">
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-60"
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="relative w-full h-full object-contain group-hover:scale-105 transition duration-500"
                />
                <DiscountBadge item={item} />
                <HeartButton
                  product={item}
                  isInWishlist={isInWishlist}
                  toggleWishlist={toggleWishlist}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-1">
                  <Link href={`/card/${item.slug || item.id}`}>
                    <h3 className="font-serif text-sm font-bold text-[#202522] line-clamp-1 hover:text-[#202522] transition">
                      {item.name}
                    </h3>
                  </Link>
                  <RatingRow item={item} />
                  <p className="text-[#6B706C] text-xs leading-relaxed font-light line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8E8E3] flex items-center justify-between">
                  <PriceBlock item={item} />
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => openProductDetailPage(item)}
                      className="bg-[#8CBC67] text-[#FCFBF7] px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#7AB055] transition shadow"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => scrollContainer(estheticRef, "left")}
            className="bg-[#EEF6EB] text-[#202522] hover:bg-[#7AB055] hover:text-white p-3 rounded-full transition shadow-md cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => scrollContainer(estheticRef, "right")}
            className="bg-[#EEF6EB] text-[#202522] hover:bg-[#7AB055] hover:text-white p-3 rounded-full transition shadow-md cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </section>
    </div>
  );
}
