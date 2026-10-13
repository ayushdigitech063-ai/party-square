"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Loader2, Image as ImageIcon, CheckCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  uploadImage,
  CategoryItem
} from "@/app/lib/api";

interface CategoryFormProps {
  initialData?: CategoryItem;
  isEdit?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
  isModal?: boolean;
}

export default function CategoryForm({
  initialData,
  isEdit = false,
  onSuccess,
  onCancel,
  isModal = false,
}: CategoryFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [parentCategory, setParentCategory] = useState<string>(
    initialData?.parentCategory ? initialData.parentCategory._id : ""
  );
  const [image, setImage] = useState(initialData?.image || "");
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);
  const [order, setOrder] = useState<number>(initialData?.order ?? 0);

  const [parentCategories, setParentCategories] = useState<CategoryItem[]>([]);
  const [loadingParents, setLoadingParents] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    async function loadParents() {
      try {
        setLoadingParents(true);
        // Fetch only top-level categories as possible parents
        const res = await fetchCategories({ parentOnly: true });
        const list = Array.isArray(res) ? res : res.categories;
        // In edit mode, exclude self
        const filtered = isEdit && initialData?._id
          ? list.filter((c) => c._id !== initialData._id)
          : list;
        setParentCategories(filtered);
      } catch (err: any) {
        console.error("Failed to load parent categories", err);
      } finally {
        setLoadingParents(false);
      }
    }
    loadParents();
  }, [isEdit, initialData?._id]);

  // Auto-generate slug on name change if not editing an existing custom slug
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEdit || !slug) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");
      setSlug(generated);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    try {
      setUploadingImage(true);
      const res = await uploadImage(file);
      setImage(res.url);
      toast.success("Image uploaded successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setSubmitting(true);
    try {
      const payload: Partial<CategoryItem> = {
        name: name.trim(),
        slug: slug.trim() || undefined,
        description: description.trim(),
        image: image.trim(),
        parentCategory: parentCategory ? (parentCategory as any) : null,
        isActive,
        order: Number(order) || 0,
      };

      if (isEdit && initialData?._id) {
        await updateCategory(initialData._id, payload);
        toast.success("Category updated successfully!");
      } else {
        await createCategory(payload);
        toast.success("Category created successfully!");
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/admin/categories");
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to save category");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      {!isModal && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/categories"
              className="w-10 h-10 rounded-xl bg-white border border-[#E8E8E3] text-[#202522] flex items-center justify-center hover:bg-neutral-50 transition shadow-sm"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="font-serif text-2xl font-bold text-[#202522]">
                {isEdit ? "Edit Category" : "Add New Category"}
              </h1>
              <p className="text-xs text-[#6B706C] mt-0.5">
                {isEdit
                  ? `Update details for "${initialData?.name}"`
                  : "Create a new main category or subcategory"}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-[#E8E8E3] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Name */}
            <div>
              <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Birthday Decoration"
                className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30 focus:border-[#8CBC67] transition"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. birthday-decoration"
                className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30 focus:border-[#8CBC67] transition"
              />
              <span className="text-[11px] text-[#6B706C] mt-1 block">
                Leave blank or edit to customize the public URL path
              </span>
            </div>
          </div>

          {/* Parent Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
                Parent Category (Hierarchy)
              </label>
              <select
                value={parentCategory}
                onChange={(e) => setParentCategory(e.target.value)}
                disabled={loadingParents}
                className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30 focus:border-[#8CBC67] transition"
              >
                <option value="">None (Top-Level Main Category)</option>
                {parentCategories.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-[#6B706C] mt-1 block">
                Select a parent category if this is a subcategory (e.g. Balloon Kits under Birthday Decoration)
              </span>
            </div>

            {/* Display Order */}
            <div>
              <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
                Display Order / Priority
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                placeholder="0"
                className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30 focus:border-[#8CBC67] transition"
              />
              <span className="text-[11px] text-[#6B706C] mt-1 block">
                Lower numbers appear first in the customer menu
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a brief description of this category for SEO and customers..."
              className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30 focus:border-[#8CBC67] transition"
            />
          </div>

          {/* Image & Preview */}
          <div>
            <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
              Category Image
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 space-y-3">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.example.com/category.jpg"
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30 focus:border-[#8CBC67] transition"
                />
                <div className="flex items-center space-x-3">
                  <label className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-[#202522] text-xs font-bold cursor-pointer transition shadow-sm">
                    {uploadingImage ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-[#8CBC67]" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={16} />
                        <span>Upload File to Cloudinary</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                  {image && (
                    <button
                      type="button"
                      onClick={() => setImage("")}
                      className="text-xs text-red-600 hover:underline font-medium"
                    >
                      Clear Image
                    </button>
                  )}
                </div>
              </div>

              {/* Preview Box */}
              <div className="w-full h-32 rounded-2xl border border-dashed border-[#E8E8E3] bg-[#FCFBF7] overflow-hidden flex items-center justify-center relative">
                {image ? (
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-3 text-[#6B706C]">
                    <ImageIcon size={24} className="mx-auto mb-1 opacity-50" />
                    <span className="text-[10px]">No image selected</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active Status */}
          <div className="pt-2 border-t border-[#E8E8E3]">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded text-[#8CBC67] focus:ring-[#8CBC67] accent-[#8CBC67]"
              />
              <span className="text-sm font-semibold text-[#202522]">
                Active (Visible on frontend website)
              </span>
            </label>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end space-x-4">
          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 rounded-2xl border border-[#E8E8E3] text-[#202522] text-sm font-bold hover:bg-neutral-100 transition cursor-pointer"
            >
              Cancel
            </button>
          ) : (
            <Link
              href="/admin/categories"
              className="px-6 py-3 rounded-2xl border border-[#E8E8E3] text-[#202522] text-sm font-bold hover:bg-neutral-100 transition"
            >
              Cancel
            </Link>
          )}
          <button
            type="submit"
            disabled={submitting || uploadingImage}
            className="px-8 py-3 rounded-2xl bg-[#8CBC67] text-neutral-950 text-sm font-bold hover:bg-[#7AB055] transition shadow-md flex items-center space-x-2 disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>{isEdit ? "Update Category" : "Create Category"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
