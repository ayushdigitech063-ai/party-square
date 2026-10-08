import { Product } from "../types/product";
import { allProducts } from "./allCollections";

export function getProductById(
  id: string
): Product | undefined {
  if (!id) {
    return undefined;
  }

  const normalizedId = id.trim().toLowerCase();

  return allProducts.find(
    (product) =>
      product.id.trim().toLowerCase() === normalizedId
  );
}

export function getProductByIdentifier(
  identifier: string
): Product | undefined {
  if (!identifier) {
    return undefined;
  }

  const normalizedIdentifier =
    identifier.trim().toLowerCase();

  return allProducts.find((product) => {
    const productId =
      product.id.trim().toLowerCase();

    const productSlug =
      product.slug?.trim().toLowerCase();

    return (
      productId === normalizedIdentifier ||
      productSlug === normalizedIdentifier
    );
  });
}


export function getAllProducts(): Product[] {
  return allProducts;
}

// Get related product 

export function getRelatedProducts(
  currentProduct: Product,
  limit: number = 8
): Product[] {
  if (!currentProduct) {
    return [];
  }

  const currentId = currentProduct.id
    .trim()
    .toLowerCase();

  const currentCategory =
    currentProduct.category?.trim().toLowerCase();

  const currentSubcategory =
    currentProduct.subcategory?.trim().toLowerCase();

  const currentTheme =
    currentProduct.theme?.trim().toLowerCase();

  const relatedProducts = allProducts
    .filter((product) => {
      // Don't show the current product
      return (
        product.id.trim().toLowerCase() !== currentId
      );
    })
    .map((product) => {
      const category =
        product.category?.trim().toLowerCase();

      const subcategory =
        product.subcategory?.trim().toLowerCase();

      const theme =
        product.theme?.trim().toLowerCase();

      let score = 0;

      // Same subcategory
      if (
        currentSubcategory &&
        subcategory === currentSubcategory
      ) {
        score += 5;
      }

      // Same theme
      if (
        currentTheme &&
        theme === currentTheme
      ) {
        score += 4;
      }

      // Same category
      if (
        currentCategory &&
        category === currentCategory
      ) {
        score += 3;
      }

      return {
        product,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  // Remove duplicate product IDs
  const uniqueProducts = Array.from(
    new Map(
      relatedProducts.map((item) => [
        item.product.id.trim().toLowerCase(),
        item.product,
      ])
    ).values()
  );

  return uniqueProducts.slice(0, limit);
}