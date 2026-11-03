"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCity } from "@/app/context/CityContext";
import { fetchHomePageSection, fetchCategories, CategoryItem } from "@/app/lib/api";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";

interface SEOContentData {
  isEnabled?: boolean;
  mainHeading?: string;
  introParagraph?: string;
  subHeading?: string;
  servicesIntro?: string;
  points?: Array<{ title: string; desc: string }>;
  customHtml?: string;
}

export default function SEOContentSection() {
  const pathname = usePathname();
  const { selectedCity } = useCity();

  const [isExpanded, setIsExpanded] = useState(false);
  const [homeSeoData, setHomeSeoData] = useState<SEOContentData | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Normalize city name
  const cityName = selectedCity
    ? selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1).replace(/-/g, " ")
    : "Jaipur";

  // Parse path segments to know if we are on homepage, category, or subcategory
  const segments = (pathname || "").split("/").filter(Boolean);
  
  // Excluded routes: admin, login, checkout, payment, profile
  const isExcluded =
    pathname?.startsWith("/admin") ||
    pathname === "/login" ||
    pathname?.startsWith("/payment") ||
    pathname?.startsWith("/PRogress");

  const isHome =
    segments.length === 0 ||
    (segments.length === 1 &&
      ["jaipur", "delhi", "bangalore", "mumbai", "pune", "hyderabad", "ahmedabad", "gurgaon", "noida", "kolkata"].includes(
        segments[0].toLowerCase()
      ));

  const isCategory = (segments.length >= 2 || pathname?.includes("/services") || pathname?.includes("/Festivals")) && !pathname?.startsWith("/admin");
  const currentCategorySlug = isCategory ? segments[1] : "";
  const currentSubcategorySlug = segments.length >= 3 ? segments[2] : "";

  // 1. Fetch live Homepage SEO Content configuration
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        if (isHome) {
          const sec = await fetchHomePageSection<SEOContentData>("seo_content");
          if (isMounted && sec && sec.contentData) {
            setHomeSeoData(sec.contentData);
          }
        } else if (isCategory && currentCategorySlug) {
          const res = await fetchCategories();
          const list: CategoryItem[] = Array.isArray(res) ? res : res.categories || [];
          const matched = list.find(
            (c) =>
              c.slug?.toLowerCase() === currentCategorySlug.toLowerCase() ||
              c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === currentCategorySlug.toLowerCase()
          );
          if (isMounted && matched) {
            setCategoryData(matched);
          }
        }
      } catch (err) {
        // Fallback default retained
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [pathname, isHome, isCategory, currentCategorySlug]);

  if (isExcluded) return null;

  // Format category display title
  const categoryTitle = categoryData?.name
    ? categoryData.name
    : currentCategorySlug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

  const subcategoryTitle = currentSubcategorySlug
    ? currentSubcategorySlug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "";

  /* ---------------- CONTENT RESOLUTION ---------------- */

  // A. If Home Page
  const homeMainHeading =
    homeSeoData?.mainHeading ||
    `Party Square - Your Ultimate Event Planner & Decoration Specialists in ${cityName}`;

  const homeIntro =
    homeSeoData?.introParagraph ||
    `Are you searching for the perfect birthday party decoration and celebration setup that will make your special day unforgettable? Look no further! Party Square is your dedicated, detail-oriented celebration and event planner in ${cityName}, specializing in creating magical and seamless experiences. We don't just plan events; we craft memories that perfectly match your vision and exceed every expectation.`;

  const homeSubHeading =
    homeSeoData?.subHeading || "Our Uniquely Crafted Services";

  const homeServicesIntro =
    homeSeoData?.servicesIntro ||
    `As India's leading kids birthday decoration and premier event planning company in ${cityName}, we offer a comprehensive suite of services to cover every aspect of your celebration:`;

  const defaultHomePoints = [
    {
      title: "Spectacular Theme Decorations",
      desc: "From fairytale castles and romantic candlelit canopies to superhero headquarters and pastel balloon arches, we transform any room, terrace, or banquet into the world of your dreams.",
    },
    {
      title: "2-Hour Doorstep Setup Guarantee",
      desc: "Our verified local decorators arrive punctually with all necessary equipment, electric inflators, and damage-free masking tapes for 100% clean, peel-free wall installations.",
    },
    {
      title: "Hassle-Free Personalization",
      desc: "Customize balloon shades, customized neon name boards, floral backdrops, and welcome easel stands with dedicated one-on-one event coordination support.",
    },
  ];

  const homePoints =
    homeSeoData?.points && homeSeoData.points.length > 0
      ? homeSeoData.points
      : defaultHomePoints;

  // B. If Category or Subcategory Page
  const categoryMainHeading =
    categoryData?.description && categoryData.description.length > 60
      ? `Party Square - Best ${categoryTitle} in ${cityName}`
      : `Party Square - Premier ${subcategoryTitle ? `${subcategoryTitle} & ` : ""}${categoryTitle} in ${cityName}`;

  const categoryIntro =
    categoryData?.description ||
    `Planning a stunning ${categoryTitle.toLowerCase()} celebration in ${cityName}? Party Square brings you handcrafted, verified decoration packages tailored to intimate home gatherings, terraces, and luxury venues. Every package includes professional styling, top-grade metallic and pastel balloons, and an on-time setup guarantee so you can host your guests without any stress.`;

  const categorySubHeading = `Why Choose Party Square for ${categoryTitle} in ${cityName}?`;

  const categoryServicesIntro = `We take care of every detail from design selection to flawless on-site execution across all neighbourhoods of ${cityName}:`;

  const defaultCategoryPoints = [
    {
      title: "Damage-Free Wall Installations",
      desc: "We exclusively use painter's removable masking tape and freestanding backdrops to ensure your wallpapers and wall paints remain 100% safe and unblemished.",
    },
    {
      title: "Verified & Background-Checked Decorators",
      desc: `All decorators serving ${cityName} are thoroughly vetted and trained to follow strict hygiene and punctuality standards for home celebrations.`,
    },
    {
      title: "Direct Customization & Same-Day Booking",
      desc: `Need emergency setups or personalized foil lettering? Our team provides same-day express slots across ${cityName} with transparent, fixed pricing.`,
    },
  ];

  const isCurrentHome = isHome;
  const heading = isCurrentHome ? homeMainHeading : categoryMainHeading;
  const intro = isCurrentHome ? homeIntro : categoryIntro;
  const subHeading = isCurrentHome ? homeSubHeading : categorySubHeading;
  const servicesIntro = isCurrentHome ? homeServicesIntro : categoryServicesIntro;
  const points = isCurrentHome ? homePoints : defaultCategoryPoints;

  return (
    <section className="w-full bg-[#FCFBF7] py-10 sm:py-16 border-t border-[#E8E8E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-[#E8E8E3] shadow-xs transition-all">
          {/* Main Green Heading matching brand */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#8CBC67] leading-tight mb-4">
            {heading}
          </h2>

          {/* Intro Paragraph */}
          <p className="text-xs sm:text-sm md:text-[15px] leading-relaxed text-[#6B706C]">
            {intro}
          </p>

          {/* Subheading & Services List */}
          <div className="mt-6 space-y-4">
            <h3 className="font-bold text-sm sm:text-base md:text-lg text-[#202522] mt-4 mb-2">
              {subHeading}
            </h3>

            <p className="text-xs sm:text-sm text-[#6B706C] leading-relaxed mb-4">
              {servicesIntro}
            </p>

            <div className="space-y-3 pt-1">
              {points.map((pt, idx) => (
                <div key={idx} className="text-xs sm:text-sm text-[#6B706C] leading-relaxed">
                  <span className="font-bold text-[#202522]">{pt.title}: </span>
                  <span>{pt.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expand / Collapse Button for Mobile & Clean UX */}
          <div className="mt-6 pt-4 border-t border-[#E8E8E3] flex items-center justify-between">
            <span className="text-xs text-[#6B706C] font-semibold flex items-center gap-2">
              <Sparkles size={14} className="text-[#8CBC67]" />
              <span>Party Square Verified Event & Decor Planning</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
