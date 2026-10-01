import { useState, useEffect } from 'react';
import { API_URL } from '@/config';

export function useProducts(categorySlug?: string, subcategorySlug?: string) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = `${API_URL}/api/products`;
    const params = new URLSearchParams();
    if (categorySlug) params.append('category', categorySlug);
    if (subcategorySlug) params.append('subcategory', subcategorySlug);
    if (params.toString()) url += `?${params.toString()}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Format DB structure to match frontend static data structure
          const formatted = data.map(p => ({
            id: p._id,
            name: p.name,
            desc: p.description,
            fullDesc: p.fullDescription || p.description,
            price: p.price,
            image: p.image || (p.images && p.images[0]) || "/default-placeholder.png",
            images: p.images || [p.image],
            category: p.category ? p.category.name : "Uncategorized",
            features: p.included || [],
          }));
          setProducts(formatted);
        }
      })
      .catch(err => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, [categorySlug, subcategorySlug]);

  return { products, loading };
}
