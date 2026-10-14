"use client";

import React from "react";
import ProductCard from "@/app/components/ProductCard";
import { useWishlist } from "@/app/context/wishlistcontext";
import { ProductItem } from "@/app/lib/api";
import { Product } from "@/app/types/product";
import { MapPin } from "lucide-react";

interface Props {
  products: ProductItem[];
  cityName: string;
}

export default function CityProductsGrid({ products, cityName }: Props) {
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!products || products.length === 0) {
    return (
      <div className="p-12 text-center rounded-3xl bg-white border border-[#E8E8E3] space-y-3">
        <MapPin size={32} className="mx-auto text-[#8CBC67] opacity-60" />
        <h3 className="font-serif text-lg font-bold text-[#202522]">
          All Standard Decoration Packages are Available in {cityName}
        </h3>
        <p className="text-xs text-[#6B706C] max-w-md mx-auto">
          Our decorator network operates across {cityName}. Browse our catalog to customize your party celebration.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((p) => {
        const mappedProduct: Product = {
          id: p._id,
          slug: p.slug,
          name: p.name,
          description: p.description,
          fullDescription: p.fullDescription,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          images: p.images,
          category: typeof p.category === "object" ? p.category.name : (p.category as any),
          subcategory: typeof p.subcategory === "object" ? p.subcategory?.name : (p.subcategory as any),
          availability: p.availability,
          included: p.included,
          notIncluded: p.notIncluded,
          cancellationPolicy: p.cancellationPolicy,
          rating: p.rating ?? 4.8,
          reviewCount: p.reviewCount ?? 24,
          theme: p.theme,
          gradientBg: p.gradientBg,
          isSpecialCard: p.isSpecialCard,
        };

        return (
          <ProductCard
            key={p._id}
            product={mappedProduct}
            isInWishlist={isInWishlist}
            toggleWishlist={toggleWishlist}
          />
        );
      })}
    </div>
  );
}
