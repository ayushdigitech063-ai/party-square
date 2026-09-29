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