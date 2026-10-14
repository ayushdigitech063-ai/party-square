import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Clock, ShieldCheck, Sparkles, Star, ChevronRight, Phone, MessageSquare, CheckCircle2 } from "lucide-react";
import { fetchCityBySlugOrId, fetchProducts, fetchCities, CityItem } from "@/app/lib/api";
import CityProductsGrid from "./CityProductsGrid";
import CityFaqAccordion from "./CityFaqAccordion";
import CitySync from "@/app/components/CitySync";

interface Props {
  params: Promise<{ city: string }>;
}

// Dynamic SEO Metadata for Googlebot & Search Engines
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const cityData = await fetchCityBySlugOrId(citySlug);

  const cityName = cityData ? cityData.name : citySlug.charAt(0).toUpperCase() + citySlug.slice(1);

  const title =
    cityData?.metaTitle ||
    `Best Balloon & Birthday Decoration in ${cityName} | Party Square`;

  const description =
    cityData?.metaDescription ||
    `Book verified balloon decorators, theme birthday setups, and custom celebration decor in ${cityName}. Same-day 2-hour doorstep setups with 100% on-time guarantee.`;

  const keywords =
    cityData?.keywords && cityData.keywords.length > 0
      ? cityData.keywords
      : [
          `birthday decoration in ${cityName}`,
          `balloon decorators ${cityName}`,
          `party decoration ${cityName}`,
          `room decoration for birthday ${cityName}`,
          `anniversary decoration ${cityName}`,
        ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_IN",
      siteName: "Party Square",
    },
    alternates: {
      canonical: `https://partysquare.in/${citySlug.toLowerCase()}`,
    },
  };
}

export default async function CityLandingPage({ params }: Props) {
  const { city: citySlug } = await params;
  const cityData = await fetchCityBySlugOrId(citySlug);

  if (!cityData) {
    notFound();
  }

  const cityName = cityData.name;
  const heading = cityData.heading || `Best Birthday & Celebration Decoration in ${cityName}`;
  const subheading =
    cityData.subheading ||
    `Premium balloon styling, theme setups, and surprise party decorations delivered directly to your doorstep across ${cityName}.`;

  const contentParagraph =
    cityData.content ||
    `Party Square is your premier event styling and balloon decoration partner in ${cityName}. Whether you are celebrating a first birthday, romantic anniversary, baby shower, or festival celebration, our certified decor artists craft unforgettable experiences. We use safe, metallic latex balloons and non-damaging tapes so your walls remain pristine while your celebration dazzles.`;

  const serviceAreas =
    cityData.serviceAreas && cityData.serviceAreas.length > 0
      ? cityData.serviceAreas
      : [
          `Central ${cityName}`,
          `North ${cityName}`,
          `South ${cityName}`,
          `East ${cityName}`,
          `West ${cityName}`,
          `Main Market & Suburbs`,
        ];

  const faqs =
    cityData.faqs && cityData.faqs.length > 0
      ? cityData.faqs
      : [
          {
            question: `How early should I book decoration services in ${cityName}?`,
            answer: `We recommend booking at least 24 hours in advance to secure your preferred setup time. However, same-day and express 3-hour decoration slots are also available across ${cityName} based on daily availability.`,
          },
          {
            question: `Do decorators in ${cityName} bring all balloons and setup gear?`,
            answer: `Yes, our certified decorators carry all balloons, electric pumps, ribbons, stands, fairy lights, and removable non-marking tape. You don't need to provide any materials.`,
          },
          {
            question: `Can I customize colors and neon signs for my event in ${cityName}?`,
            answer: `Absolutely! All packages can be customized with your choice of pastel, chrome, or metallic balloon palettes, personalized name banners, and age foil numbers.`,
          },
        ];

  // Fetch products serviceable in this city
  let products = [];
  try {
    const res = await fetchProducts({ city: cityName, limit: 12 });
    products = res.products || [];
  } catch (e) {
    products = [];
  }

  // Google Rich Snippet: FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  // Google Rich Snippet: LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Party Square - Balloon & Event Decoration in ${cityName}`,
    description: cityData.metaDescription || subheading,
    url: `https://partysquare.in/${citySlug.toLowerCase()}`,
    areaServed: serviceAreas,
    priceRange: "₹₹",
    telephone: "+91-9876543210",
    address: {
      "@type": "PostalAddress",
      addressLocality: cityName,
      addressRegion: cityData.state || cityName,
      addressCountry: "IN",
    },
  };

  return (
    <div className="min-h-screen bg-[#FCFBF7]">
      <CitySync cityName={cityName} />
      {/* Inject Structured Data for Google SERP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero Section */}
      <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-[#EEF6EB]/60 via-[#FCFBF7] to-[#FCFBF7] border-b border-[#E8E8E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-[#6B706C] mb-6">
            <Link href="/" className="hover:text-[#202522] transition">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-[#202522] transition">
              Cities
            </Link>
            <ChevronRight size={12} />
            <span className="font-bold text-[#202522]">{cityName}</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            {/* Location Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EEF6EB] text-[#202522] border border-[#8CBC67]/40 text-xs font-semibold tracking-wide">
              <MapPin size={13} className="text-[#8CBC67]" />
              <span>Doorstep Decoration Available Across {cityName}</span>
            </div>

            {/* Main H1 */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#202522] leading-tight tracking-tight">
              {heading}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#6B706C] leading-relaxed">
              {subheading}
            </p>

            {/* Trust Badges */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex items-center space-x-2 text-xs text-[#202522] font-semibold bg-white p-2.5 rounded-xl border border-[#E8E8E3] shadow-2xs">
                <Clock size={16} className="text-[#8CBC67] shrink-0" />
                <span>2-Hour Express Setup</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-[#202522] font-semibold bg-white p-2.5 rounded-xl border border-[#E8E8E3] shadow-2xs">
                <Star size={16} className="text-amber-500 fill-amber-500 shrink-0" />
                <span>4.8/5 Rated Decorators</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-[#202522] font-semibold bg-white p-2.5 rounded-xl border border-[#E8E8E3] shadow-2xs">
                <Sparkles size={16} className="text-[#8CBC67] shrink-0" />
                <span>Premium Metallic Balloons</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-[#202522] font-semibold bg-white p-2.5 rounded-xl border border-[#E8E8E3] shadow-2xs">
                <ShieldCheck size={16} className="text-[#8CBC67] shrink-0" />
                <span>100% On-Time Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City Products Grid */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522]">
              Popular Party Packages in {cityName}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B706C] mt-1">
              Handcrafted balloon setups, birthday themes, and romantic decor available for booking in {cityName}.
            </p>
          </div>
          <Link
            href="/services/all-products"
            className="inline-flex items-center text-xs font-bold text-[#8CBC67] hover:text-[#7AB055] transition group"
          >
            <span>View All Packages</span>
            <ChevronRight size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <CityProductsGrid products={products} cityName={cityName} />
      </section>

      {/* On-Page Local SEO Narrative Section */}
      <section className="py-12 bg-white border-y border-[#E8E8E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8CBC67]">
                Local Event Styling
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522]">
                Why Celebrate with Party Square in {cityName}?
              </h2>
              <div className="text-sm text-[#6B706C] leading-relaxed space-y-3 whitespace-pre-line">
                {contentParagraph}
              </div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 size={18} className="text-[#8CBC67] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#202522]">Certified Local Stylists</h4>
                    <p className="text-[11px] text-[#6B706C]">Background-checked artists trained for hassle-free home decoration.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 size={18} className="text-[#8CBC67] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#202522]">Zero Damage to Walls</h4>
                    <p className="text-[11px] text-[#6B706C]">We use specialized adhesive and stands that leave no marks.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact & Booking Assistance Card */}
            <div className="p-6 rounded-3xl bg-[#FCFBF7] border border-[#E8E8E3] shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-[#EEF6EB] flex items-center justify-center text-[#8CBC67]">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#202522]">
                  Need Custom Decor in {cityName}?
                </h3>
                <p className="text-xs text-[#6B706C] mt-1">
                  Have a specific theme, corporate event, or milestone birthday? Speak directly with our {cityName} event coordinator.
                </p>
              </div>
              <div className="space-y-2 pt-2">
                <a
                  href="https://wa.me/919876543210?text=Hello%20Party%20Square,%20I%20want%20to%20book%20decoration%20in%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition shadow-xs"
                >
                  <MessageSquare size={14} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Coverage Areas Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8CBC67]">
            Doorstep Coverage
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522] mt-1">
            Serviceable Localities in {cityName}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B706C] mt-1">
            Our decor teams provide doorstep delivery and same-day setup across all primary neighborhoods and sectors in {cityName}.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {serviceAreas.map((area, idx) => (
            <div
              key={idx}
              className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-white border border-[#E8E8E3] hover:border-[#8CBC67] text-xs font-medium text-[#202522] transition shadow-2xs"
            >
              <MapPin size={12} className="text-[#8CBC67] mr-1.5" />
              <span>{area}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic FAQs Section with Google Rich Snippets Accordion */}
      <section className="py-12 sm:py-16 bg-[#EEF6EB]/30 border-t border-[#E8E8E3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8CBC67]">
              Got Questions?
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522] mt-1">
              Frequently Asked Questions in {cityName}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B706C] mt-1">
              Everything you need to know about booking party and balloon decoration in {cityName}.
            </p>
          </div>

          <CityFaqAccordion faqs={faqs} />
        </div>
      </section>
    </div>
  );
}
