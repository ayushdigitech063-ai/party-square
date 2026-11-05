import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronRight, MapPin, Sparkles, Clock, Star, ShieldCheck } from "lucide-react";
import { fetchProducts, ProductItem } from "@/app/lib/api";
import CityProductsGrid from "../CityProductsGrid";
import CityFaqAccordion from "../CityFaqAccordion";
import CitySync from "@/app/components/CitySync";
import CityCategorySubNav from "./CityCategorySubNav";
import { decorationItems } from "@/app/data/decorationThemeData";

interface Props {
  params: Promise<{ city: string; category: string }>;
  searchParams?: Promise<{ sub?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, category } = await params;
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  const categoryName = category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const title = `Best ${categoryName} in ${cityName} | Balloon & Event Decorators | Party Square`;
  const description = `Explore top-rated ${categoryName} packages in ${cityName}. 2-Hour express setup, premium metallic balloons, 100% on-time guarantee. Book online!`;

  return {
    title,
    description,
    keywords: [
      `${categoryName.toLowerCase()} in ${cityName.toLowerCase()}`,
      `best ${categoryName.toLowerCase()} ${cityName.toLowerCase()}`,
      `balloon decoration ${cityName.toLowerCase()}`,
      `party decor in ${cityName.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_IN",
      siteName: "Party Square",
    },
    alternates: {
      canonical: `https://partysquare.in/${city.toLowerCase()}/${category.toLowerCase()}`,
    },
  };
}

export default async function CityCategoryPage({ params, searchParams }: Props) {
  const { city: citySlug, category: categorySlug } = await params;
  if (citySlug.toLowerCase() === "admin") {
    redirect(categorySlug.toLowerCase() === "login" ? "/login" : "/admin");
  }
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const activeSub = resolvedSearchParams.sub || "";
  const catLower = categorySlug.toLowerCase();
  if (catLower === "search" || catLower === "basket" || catLower === "wishlist" || catLower === "profile" || catLower === "payments" || catLower === "payment-detail") {
    redirect(`/${catLower}`);
  }

  const cityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
  const categoryName = categorySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Fetch products filtered by city and category
  let rawProducts: any[] = [];
  try {
    const res = await fetchProducts({
      city: cityName,
      category: categorySlug,
      limit: 30,
    });
    rawProducts = res.products || [];
  } catch (err) {
    rawProducts = [];
  }

  // Fallback to high-quality curated decoration items if backend returns empty list
  if (!rawProducts || rawProducts.length === 0) {
    const normCategory = categorySlug.toLowerCase().trim();
    const fallbackList = decorationItems.filter((item) => {
      const c = (item.category || "").toLowerCase();
      const sc = (item.subcategory || "").toLowerCase();
      return c.includes(normCategory) || normCategory.includes(c) || sc.includes(normCategory);
    });

    const source = fallbackList.length > 0 ? fallbackList : decorationItems;
    rawProducts = source.map((p) => ({
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      fullDescription: p.fullDescription,
      price: p.price,
      originalPrice: p.originalPrice,
      image: p.image,
      images: p.images,
      category: p.category as any,
      subcategory: p.subcategory as any,
      availability: p.availability,
      included: p.included,
      rating: p.rating || 0,
      reviewCount: p.reviewCount || 0,
      theme: p.theme,
      gradientBg: p.gradientBg,
      badgeColor: p.badgeColor,
      isSpecialCard: p.isSpecialCard,
      showUnitPrice: p.showUnitPrice,
    }));
  }

  // Filter products if a subcategory is selected
  let products = rawProducts;
  if (activeSub) {
    const cleanSub = activeSub.toLowerCase().replace(/[-_]/g, " ");
    const filtered = rawProducts.filter((p) => {
      const pName = (p.name || "").toLowerCase();
      const pSub =
        typeof p.subcategory === "object" && p.subcategory !== null
          ? ((p.subcategory as any).name || "").toLowerCase()
          : String(p.subcategory || "").toLowerCase();
      const pDesc = (p.description || "").toLowerCase();
      const pTheme = (p.theme || "").toLowerCase();
      return (
        pName.includes(cleanSub) ||
        pSub.includes(cleanSub) ||
        pDesc.includes(cleanSub) ||
        pTheme.includes(cleanSub)
      );
    });
    if (filtered.length > 0) {
      products = filtered;
    }
  }

  // Schema Markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://partysquare.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: cityName,
        item: `https://partysquare.in/${citySlug.toLowerCase()}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: `https://partysquare.in/${citySlug.toLowerCase()}/${categorySlug.toLowerCase()}`,
      },
    ],
  };

  const categoryFaqs = [
    {
      question: `How fast can you set up ${categoryName} in ${cityName}?`,
      answer: `Our certified decor artists across ${cityName} can complete full setups within 2 to 3 hours. Same-day express booking is also available.`,
    },
    {
      question: `Are the balloons and materials non-damaging for walls in ${cityName}?`,
      answer: `Yes, we use gentle, removable masking tapes and freestanding stands to ensure zero peeling or damage to your paint and wallpapers.`,
    },
    {
      question: `Can I customize colors and add personal neon signs?`,
      answer: `Absolutely! All ${categoryName} packages can be personalized with customized foil letters, neon greetings, and your choice of balloon color tones.`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FCFBF7]">
      <CitySync cityName={cityName} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header Banner & Sub-Categories Section */}
      <section className="pt-6 pb-10 sm:pt-10 sm:pb-14 bg-gradient-to-b from-[#EEF6EB]/70 via-[#FCFBF7] to-[#FCFBF7] border-b border-[#E8E8E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-[#6B706C] mb-4 sm:mb-6">
            <Link href="/" className="hover:text-[#202522] transition">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link
              href={`/${citySlug.toLowerCase()}`}
              className="hover:text-[#202522] transition"
            >
              {cityName}
            </Link>
            <ChevronRight size={12} />
            <span className="font-bold text-[#202522]">{categoryName}</span>
          </nav>

          {/* VISUAL CATEGORY & SUB-CATEGORY STRIP (As in Competitor Screenshot 2) */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.2em] text-[#8CBC67]">
                Popular {categoryName} Categories
              </span>
              <span className="text-[11px] text-[#6B706C] hidden sm:inline">
                Tap any category to filter
              </span>
            </div>
            <CityCategorySubNav
              citySlug={citySlug}
              cityName={cityName}
              categorySlug={categorySlug}
              categoryName={categoryName}
            />
          </div>

          {/* Page Main Heading & Badges (Matching Screenshot 1) */}
          <div className="max-w-4xl space-y-3.5 pt-2 border-t border-[#E8DFD1]/60">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EEF6EB] text-[#202522] border border-[#8CBC67]/40 text-xs font-semibold">
              <MapPin size={13} className="text-[#8CBC67]" />
              <span>
                {categoryName} Specialists in {cityName}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#202522] leading-tight">
              Best {categoryName} Event Organisers in {cityName} for Decoration, Games & Entertainment
            </h1>

            <p className="text-xs sm:text-sm text-[#6B706C] leading-relaxed max-w-2xl">
              Explore our curated {categoryName.toLowerCase()} collections for home, terrace, banquet, and outdoor events across {cityName}.
            </p>

            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              <div className="flex items-center space-x-2 text-xs text-[#202522] font-semibold bg-white p-2.5 rounded-xl border border-[#E8E8E3] shadow-2xs">
                <Clock size={16} className="text-[#8CBC67] shrink-0" />
                <span>2-Hour Express Setup</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-[#202522] font-semibold bg-white p-2.5 rounded-xl border border-[#E8E8E3] shadow-2xs">
                <Star size={16} className="text-amber-500 fill-amber-500 shrink-0" />
                <span>4.8/5 Verified Reviews</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-[#202522] font-semibold bg-white p-2.5 rounded-xl border border-[#E8E8E3] shadow-2xs">
                <Sparkles size={16} className="text-[#8CBC67] shrink-0" />
                <span>Custom Themes</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-[#202522] font-semibold bg-white p-2.5 rounded-xl border border-[#E8E8E3] shadow-2xs">
                <ShieldCheck size={16} className="text-[#8CBC67] shrink-0" />
                <span>100% On-Time Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522]">
              Available {categoryName} Packages in {cityName}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B706C] mt-1">
              Showing {products.length} curated packages. Choose your favourite package to customize colors, balloons, and date slots.
            </p>
          </div>
        </div>

        <CityProductsGrid products={products} cityName={cityName} />
      </section>

      {/* FAQs Section */}
      <section className="py-12 sm:py-16 bg-[#EEF6EB]/30 border-t border-[#E8E8E3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8CBC67]">
              FAQ
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522] mt-1">
              Frequently Asked Questions for {categoryName} in {cityName}
            </h2>
          </div>

          <CityFaqAccordion faqs={categoryFaqs} />
        </div>
      </section>
    </div>
  );
}
