// app/types/product.ts

export interface Product {
  id: string;
  slug?: string;

  name: string;
  description: string;
   fullDescription?: string;

  price: number;
  originalPrice?: number;

  image: string;
  images?: string[];

  category: string;
  subcategory?: string;

  availability?: boolean;

  included?: string[];
  notIncluded?: string[];

  cancellationPolicy?: string;

  rating?: number | any;
  reviewCount?: number;
   theme?: string;
  gradientBg?: string;
  badgeColor?: string;
  isSpecialCard?: boolean;
}