import React from "react";
import type { Metadata } from "next";
import ProductDetailPage from "@/app/card/[id]/page";
import { fetchProductByIdOrSlug } from "@/app/lib/api";
import CitySync from "@/app/components/CitySync";
import { allProducts } from "@/app/data/allCollections";

interface Props {
  params: Promise<{ city: string; category: string; product: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, category, product } = await params;
  let productData: any = null;
  try {
    productData = await fetchProductByIdOrSlug(product);
  } catch (e) {
    // Fallback: check static catalog
  }

  if (!productData) {
    const staticItem = allProducts.find(
      (p) =>
        String(p.id).toLowerCase() === String(product).toLowerCase() ||
        p.slug?.toLowerCase() === String(product).toLowerCase() ||
        (p.name &&
          p.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") === String(product).toLowerCase())
    );
    if (staticItem) {
      productData = {
        name: staticItem.name,
        description: staticItem.description,
        price: Number(staticItem.price) || 1499,
        image: staticItem.image,
      };
    }
  }

  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  const categoryName = category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const productName = productData?.name || product.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const title = `${productName} in ${cityName} | ${categoryName} Decoration | Party Square`;
  const description = `Book ${productName} in ${cityName}. Same-day 2-hour doorstep balloon setup, 100% on-time guarantee. Transparent pricing & verified decorators across ${cityName}.`;

  return {
    title,
    description,
    keywords: [
      `${productName.toLowerCase()} in ${cityName.toLowerCase()}`,
      `${categoryName.toLowerCase()} decoration ${cityName.toLowerCase()}`,
      `balloon decoration ${cityName.toLowerCase()}`,
      `party decor in ${cityName.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_IN",
      siteName: "Party Square",
      images: productData?.image ? [{ url: productData.image, alt: productName }] : [],
    },
    alternates: {
      canonical: `https://partysquare.in/${city.toLowerCase()}/${category.toLowerCase()}/${product.toLowerCase()}`,
    },
  };
}

export default async function CityProductDetailPage({ params }: Props) {
  const { city, category, product } = await params;
  let productData: any = null;
  try {
    productData = await fetchProductByIdOrSlug(product);
  } catch (e) {
    // Fallback to static catalog
  }

  if (!productData) {
    const staticItem = allProducts.find(
      (p) =>
        String(p.id).toLowerCase() === String(product).toLowerCase() ||
        p.slug?.toLowerCase() === String(product).toLowerCase() ||
        (p.name &&
          p.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") === String(product).toLowerCase())
    );
    if (staticItem) {
      productData = {
        name: staticItem.name,
        description: staticItem.description,
        price: Number(staticItem.price) || 1499,
        image: staticItem.image,
      };
    }
  }

  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  const categoryName = category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const productName = productData?.name || product.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Google BreadcrumbList Schema
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
        item: `https://partysquare.in/${city.toLowerCase()}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: `https://partysquare.in/${city.toLowerCase()}/${category.toLowerCase()}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: productName,
        item: `https://partysquare.in/${city.toLowerCase()}/${category.toLowerCase()}/${product.toLowerCase()}`,
      },
    ],
  };

  // Google Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${productName} in ${cityName}`,
    image: productData?.image ? [productData.image] : [],
    description: productData?.description || `Premium ${categoryName} decoration setup in ${cityName}`,
    brand: {
      "@type": "Brand",
      name: "Party Square",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: productData?.price || 1499,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Party Square",
      },
    },
  };

  return (
    <>
      <CitySync cityName={cityName} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetailPage />
    </>
  );
}
