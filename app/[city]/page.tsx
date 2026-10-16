import React from "react";
import type { Metadata } from "next";
import { fetchCityBySlugOrId } from "@/app/lib/api";
import CitySync from "@/app/components/CitySync";
import Hero from "@/app/components/Hero";
import AestheticBannerPage from "@/app/card/page";
import PRogress from "@/app/PRogress/page";
import Services from "@/app/components/Services";
import Gallery from "@/app/components/Gallery";
import Work from "@/app/Work/page";
import FAQSection from "@/app/components/FAQSection";

interface Props {
  params: Promise<{ city: string }>;
}

// Dynamic SEO Metadata for Googlebot & Search Engines
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const cityData = await fetchCityBySlugOrId(citySlug);

  const cityName = cityData ? cityData.name : citySlug.charAt(0).toUpperCase() + citySlug.slice(1).replace(/-/g, " ");

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

  const cityName = cityData ? cityData.name : citySlug.charAt(0).toUpperCase() + citySlug.slice(1).replace(/-/g, " ");

  const faqs =
    cityData?.faqs && cityData.faqs.length > 0
      ? cityData.faqs
      : [
          {
            question: `How early should I book decoration services in ${cityName}?`,
            answer: `We recommend booking at least 24 hours in advance to secure your preferred setup time. However, same-day and express 2-hour decoration slots are also available across ${cityName} based on daily availability.`,
          },
          {
            question: `Do decorators in ${cityName} bring all balloons and setup gear?`,
            answer: `Yes, our certified decorators carry all balloons, electric pumps, ribbons, stands, fairy lights, and removable non-marking tape. You don't need to provide any materials.`,
          },
        ];

  // Google Rich Snippet: FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f: any) => ({
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
    description: cityData?.metaDescription || `Best decoration services in ${cityName}`,
    url: `https://partysquare.in/${citySlug.toLowerCase()}`,
    priceRange: "₹₹",
    telephone: "+91-9876543210",
    address: {
      "@type": "PostalAddress",
      addressLocality: cityName,
      addressRegion: cityData?.state || cityName,
      addressCountry: "IN",
    },
  };

  return (
    <main>
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

      <Hero />
      <AestheticBannerPage />
      <PRogress />
      <Services />
      <Gallery />
      <Work />
      <FAQSection />
    </main>
  );
}
