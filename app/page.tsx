import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Services from "./components/Services";
import AestheticBannerPage from "./card/page";
import Work from "./Work/page";
import PRogress from "./PRogress/page";
import FAQSection from "./components/FAQSection";

export default function Home() {
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