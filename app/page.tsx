import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Services from "./components/Services";
import AestheticBannerPage from "./card/page";
import Work from "./Work/page";
import PRogress from "./PRogress/page";
import MostLovedDecor from "./MostLovedDecor/page";

export default function Home() {
  return (
    <main>
      <Hero />
      <AestheticBannerPage />
      <PRogress />
      <MostLovedDecor />
      <Services />
      <Gallery />
      <Work />
    </main>
  );
}