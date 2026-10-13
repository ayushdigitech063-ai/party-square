"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import CategoryForm from "../CategoryForm";
import { fetchCategoryById, CategoryItem } from "@/app/lib/api";

export default function EditCategoryPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [category, setCategory] = useState<CategoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategory() {
      if (!id) return;
      try {
        setLoading(true);
        const data = await fetchCategoryById(id);
        setCategory(data);
      } catch (err: any) {
        setError(err.message || "Failed to load category");
      } finally {
        setLoading(false);
      }
    }
    loadCategory();
  }, [id]);

  if (loading) {
    return (
      <div className="p-20 flex flex-col items-center justify-center space-y-3">
        <Loader2 size={32} className="animate-spin text-[#8CBC67]" />
        <p className="text-xs text-[#6B706C]">Loading category details...</p>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="p-16 max-w-md mx-auto text-center space-y-4 bg-white rounded-3xl border border-[#E8E8E3]">
        <AlertCircle size={36} className="mx-auto text-red-500" />
        <h2 className="font-serif text-xl font-bold text-[#202522]">Category Not Found</h2>
        <p className="text-xs text-[#6B706C]">{error || "Could not retrieve category data"}</p>
        <Link
          href="/admin/categories"
          className="inline-block px-5 py-2.5 rounded-2xl bg-[#8CBC67] text-neutral-950 text-xs font-bold"
        >
          Back to Categories
        </Link>
      </div>
    );
  }

  return <CategoryForm initialData={category} isEdit={true} />;
}
