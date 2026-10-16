"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCity } from "./context/CityContext";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Services from "./components/Services";
import AestheticBannerPage from "./card/page";
import Work from "./Work/page";
import PRogress from "./PRogress/page";
import FAQSection from "./components/FAQSection";

export default function Home() {
  const router = useRouter();
  const { selectedCity } = useCity();

  useEffect(() => {
    const city = selectedCity || "jaipur";
    const citySlug = city.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    router.replace(`/${citySlug}`);
  }, [selectedCity, router]);

  return (
    <main>
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