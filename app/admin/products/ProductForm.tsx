"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  Loader2,
  Image as ImageIcon,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  X,
  MapPin,
  Check
} from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchCategories,
  fetchSubcategories,
  fetchCities,
  createProduct,
  updateProduct,
  uploadImage,
  ProductItem,
  CategoryItem,
  CityItem
} from "@/app/lib/api";

interface ProductFormProps {
  initialData?: ProductItem;
  isEdit?: boolean;
  inModal?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ProductForm({
  initialData,
  isEdit = false,
  inModal = false,
  onSuccess,
  onCancel
}: ProductFormProps) {
  const router = useRouter();

  // Basic Details
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [sku, setSku] = useState(initialData?.sku || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [fullDescription, setFullDescription] = useState(initialData?.fullDescription || "");

  // Pricing & Stock
  const [price, setPrice] = useState<string>(initialData?.price !== undefined ? String(initialData.price) : "");
  const [originalPrice, setOriginalPrice] = useState<string>(
    initialData?.originalPrice !== undefined ? String(initialData.originalPrice) : ""
  );
  const [stock, setStock] = useState<string>(initialData?.stock !== undefined ? String(initialData.stock) : "100");
  const [availability, setAvailability] = useState<boolean>(initialData?.availability ?? true);

  // Category & Subcategory
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialData?.category ? (typeof initialData.category === "object" ? initialData.category._id : initialData.category) : ""
  );
  const [subcategories, setSubcategories] = useState<CategoryItem[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(
    initialData?.subcategory ? (typeof initialData.subcategory === "object" ? initialData.subcategory._id : initialData.subcategory) : ""
  );

  // Images
  const [image, setImage] = useState(initialData?.image || "");
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [uploadingPrimary, setUploadingPrimary] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // Inclusions & Extras
  const [includedList, setIncludedList] = useState<string[]>(
    initialData?.included && initialData.included.length > 0
      ? initialData.included
      : ["Premium setup materials", "Professional decorator on-site", "On-time arrival guarantee"]
  );
  const [newIncludedItem, setNewIncludedItem] = useState("");

  const [notIncludedList, setNotIncludedList] = useState<string[]>(
    initialData?.notIncluded && initialData.notIncluded.length > 0
      ? initialData.notIncluded
      : ["Venue charges", "Food & catering items"]
  );
  const [newNotIncludedItem, setNewNotIncludedItem] = useState("");

  const [cancellationPolicy, setCancellationPolicy] = useState(
    initialData?.cancellationPolicy ||
      "Please contact our team as early as possible if you need to cancel or reschedule your booking."
  );

  const [badge, setBadge] = useState(initialData?.badge || "Verified Quality Product");

  // Available Cities
  const [availableCities, setAvailableCities] = useState<string[]>(
    initialData?.availableCities || []
  );
  const [allCities, setAllCities] = useState<CityItem[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  // Loading & Submission State
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 1. Fetch Top-Level Categories
  useEffect(() => {
    async function loadCats() {
      try {
        setLoadingCategories(true);
        const res = await fetchCategories({ parentOnly: true });
        const list = Array.isArray(res) ? res : res.categories;
        setCategories(list);
      } catch (err: any) {
        toast.error("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    }
    loadCats();
  }, []);

  // 2. Fetch Subcategories when Category changes
  useEffect(() => {
    if (!selectedCategory) {
      setSubcategories([]);
      setSelectedSubcategory("");
      return;
    }

    async function loadSubs() {
      try {
        setLoadingSubs(true);
        const data = await fetchSubcategories(selectedCategory);
        setSubcategories(data);

        // If editing and current subcategory belongs to category, keep it; otherwise reset
        if (selectedSubcategory && !data.some((s) => s._id === selectedSubcategory)) {
          setSelectedSubcategory("");
        }
      } catch (err: any) {
        console.error("Failed to load subcategories for category", err);
      } finally {
        setLoadingSubs(false);
      }
    }

    loadSubs();
  }, [selectedCategory]);

  // 3. Fetch Serviceable Cities
  useEffect(() => {
    async function loadCitiesList() {
      try {
        setLoadingCities(true);
        const data = await fetchCities(false);
        setAllCities(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load cities for product form", err);
      } finally {
        setLoadingCities(false);
      }
    }
    loadCitiesList();
  }, []);

  // Handle Parent Category Change explicitly
  const handleCategoryChange = (newCatId: string) => {
    setSelectedCategory(newCatId);
    setSelectedSubcategory(""); // Reset subcategory when parent changes
  };

  // Auto slug generation from name
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

  // Primary image file upload
  const handlePrimaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    try {
      setUploadingPrimary(true);
      const res = await uploadImage(file);
      setImage(res.url);
      toast.success("Primary image uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploadingPrimary(false);
    }
  };

  // Gallery image upload
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploadingGallery(true);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
          const res = await uploadImage(file);
          setImages((prev) => [...prev, res.url]);
        }
      }
      toast.success("Gallery images added!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload gallery image");
    } finally {
      setUploadingGallery(false);
    }
  };

  const addIncluded = () => {
    if (newIncludedItem.trim()) {
      setIncludedList([...includedList, newIncludedItem.trim()]);
      setNewIncludedItem("");
    }
  };

  const removeIncluded = (idx: number) => {
    setIncludedList(includedList.filter((_, i) => i !== idx));
  };

  const addNotIncluded = () => {
    if (newNotIncludedItem.trim()) {
      setNotIncludedList([...notIncludedList, newNotIncludedItem.trim()]);
      setNewNotIncludedItem("");
    }
  };

  const removeNotIncluded = (idx: number) => {
    setNotIncludedList(notIncludedList.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (!price || Number(price) <= 0) {
      toast.error("Please provide a valid product price");
      return;
    }
    if (!selectedCategory) {
      toast.error("Please select a Category");
      return;
    }
    if (!image.trim()) {
      toast.error("Primary product image is required");
      return;
    }

    setSubmitting(true);
    try {
      const payload: any = {
        name: name.trim(),
        slug: slug.trim() || undefined,
        sku: sku.trim() || undefined,
        description: description.trim(),
        fullDescription: fullDescription.trim() || description.trim(),
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        stock: stock ? Number(stock) : 100,
        availability,
        category: selectedCategory,
        subcategory: selectedSubcategory || null,
        image: image.trim(),
        images,
        included: includedList,
        notIncluded: notIncludedList,
        cancellationPolicy: cancellationPolicy.trim(),
        badge: badge.trim(),
        availableCities,
      };

      if (isEdit && initialData?._id) {
        await updateProduct(initialData._id, payload);
        toast.success("Product updated successfully!");
      } else {
        await createProduct(payload);
        toast.success("Product created successfully!");
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/admin/products");
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`space-y-6 ${inModal ? "w-full" : "max-w-5xl mx-auto"}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#E8E8E3]">
        <div className="flex items-center space-x-4">
          {!inModal && (
            <Link
              href="/admin/products"
              className="w-10 h-10 rounded-xl bg-white border border-[#E8E8E3] text-[#202522] flex items-center justify-center hover:bg-neutral-50 transition shadow-sm"
            >
              <ArrowLeft size={18} />
            </Link>
          )}
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#202522]">
              {isEdit ? "Edit Product" : "Add New Product"}
            </h1>
            <p className="text-xs text-[#6B706C] mt-0.5">
              {isEdit ? `Updating "${initialData?.name}"` : "Create a new product or decoration theme"}
            </p>
          </div>
        </div>

        {inModal && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-9 h-9 rounded-xl bg-neutral-100 text-[#6B706C] hover:text-[#202522] hover:bg-neutral-200 flex items-center justify-center transition"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white border border-[#E8E8E3] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-serif text-lg font-bold text-[#202522] pb-3 border-b border-[#E8E8E3]">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Luxury Balloon Arch Setup"
                className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30 focus:border-[#8CBC67] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
                SKU / Identifier
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="e.g. PS-BAL-001"
                className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30 focus:border-[#8CBC67] transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="luxury-balloon-arch-setup"
                className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30 focus:border-[#8CBC67] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
                Badge / Tag
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Verified Quality Product"
                className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30 focus:border-[#8CBC67] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
              Short Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A concise summary of this decoration setup..."
              className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30 focus:border-[#8CBC67] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
              Full Description / Package Details
            </label>
            <textarea
              rows={4}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="Comprehensive details about the setup, materials, dimensions, and experience..."
              className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30 focus:border-[#8CBC67] transition"
            />
          </div>
        </div>

        {/* Pricing, Stock & Status */}
        <div className="bg-white border border-[#E8E8E3] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-serif text-lg font-bold text-[#202522] pb-3 border-b border-[#E8E8E3]">
            Pricing & Inventory
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
                Sale Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 4999"
                className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30 focus:border-[#8CBC67] transition font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
                Original Price (₹) (Optional strike-through)
              </label>
              <input
                type="number"
                min="0"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="e.g. 6499"
                className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30 focus:border-[#8CBC67] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
                Stock Quantity / Capacity
              </label>
              <input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="e.g. 50"
                className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30 focus:border-[#8CBC67] transition"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={availability}
                onChange={(e) => setAvailability(e.target.checked)}
                className="w-4 h-4 rounded text-[#8CBC67] focus:ring-[#8CBC67] accent-[#8CBC67]"
              />
              <span className="text-sm font-semibold text-[#202522]">
                Active & Available for Booking (Product visible on storefront)
              </span>
            </label>
          </div>
        </div>

        {/* Dynamic Category & Subcategory Selection */}
        <div className="bg-white border border-[#E8E8E3] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-serif text-lg font-bold text-[#202522] pb-3 border-b border-[#E8E8E3]">
            Category Hierarchy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                disabled={loadingCategories}
                className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30 focus:border-[#8CBC67] transition"
              >
                <option value="">-- Select Main Category --</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-[#6B706C] mt-1 block">
                Primary classification for this product
              </span>
            </div>

            {/* Cascading Subcategory Dropdown */}
            <div>
              <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
                Subcategory (Filtered by Selected Category)
              </label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                disabled={!selectedCategory || loadingSubs}
                className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30 focus:border-[#8CBC67] transition disabled:opacity-50"
              >
                <option value="">
                  {loadingSubs
                    ? "Loading subcategories..."
                    : subcategories.length === 0
                    ? "-- No subcategories under this category --"
                    : "-- Select Subcategory (Optional) --"}
                </option>
                {subcategories.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-[#6B706C] mt-1 block">
                Populates automatically based on the chosen parent category
              </span>
            </div>
          </div>
        </div>

        {/* City Coverage & Availability */}
        <div className="bg-white border border-[#E8E8E3] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#E8E8E3]">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#EEF6EB] text-[#8CBC67] flex items-center justify-center font-bold">
                <MapPin size={18} />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-[#202522]">
                  City Coverage & Availability
                </h2>
                <p className="text-xs text-[#6B706C]">
                  Select the cities where this decoration is serviceable and live for customer booking.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setAvailableCities([])}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  availableCities.length === 0
                    ? "bg-[#8CBC67] text-white shadow-xs"
                    : "bg-neutral-100 hover:bg-neutral-200 text-[#202522]"
                }`}
              >
                All Cities (Pan-India)
              </button>
              <button
                type="button"
                onClick={() => setAvailableCities(allCities.map((c) => c.name))}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-[#202522] transition cursor-pointer"
              >
                Select All
              </button>
              {availableCities.length > 0 && (
                <button
                  type="button"
                  onClick={() => setAvailableCities([])}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-neutral-500 hover:text-red-600 transition cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#202522] uppercase tracking-wider">
                Serviceable Cities
              </span>
              <span className="text-xs font-semibold text-[#8CBC67]">
                {availableCities.length === 0
                  ? "Available in All Cities (Pan-India)"
                  : `${availableCities.length} of ${allCities.length} cities selected`}
              </span>
            </div>

            {loadingCities ? (
              <div className="p-8 text-center text-xs text-[#6B706C]">
                <Loader2 size={18} className="animate-spin mx-auto text-[#8CBC67] mb-2" />
                Loading cities...
              </div>
            ) : allCities.length === 0 ? (
              <p className="text-xs text-[#6B706C]">
                No specific cities configured. The product will be available across all cities by default.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {allCities.map((c) => {
                  const isChecked =
                    availableCities.length === 0 ||
                    availableCities.includes(c.name) ||
                    availableCities.includes("All");

                  const toggleCity = () => {
                    if (availableCities.length === 0) {
                      // Currently Pan-India; unchecking this city means selecting all other cities
                      setAvailableCities(allCities.map((item) => item.name).filter((name) => name !== c.name));
                    } else if (availableCities.includes(c.name)) {
                      setAvailableCities(availableCities.filter((name) => name !== c.name));
                    } else {
                      setAvailableCities([...availableCities, c.name]);
                    }
                  };

                  return (
                    <button
                      key={c._id}
                      type="button"
                      onClick={toggleCity}
                      className={`flex items-center space-x-2.5 p-3 rounded-xl border text-left transition cursor-pointer ${
                        isChecked
                          ? "bg-[#EEF6EB] border-[#8CBC67] text-[#202522] font-semibold"
                          : "bg-white border-[#E8E8E3] text-[#6B706C] hover:border-neutral-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border transition ${
                          isChecked
                            ? "bg-[#8CBC67] border-[#8CBC67] text-white"
                            : "border-neutral-300 bg-white"
                        }`}
                      >
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span className="text-xs truncate">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Media & Images */}
        <div className="bg-white border border-[#E8E8E3] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-serif text-lg font-bold text-[#202522] pb-3 border-b border-[#E8E8E3]">
            Product Imagery
          </h2>

          {/* Primary Image */}
          <div>
            <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
              Primary Image <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 space-y-3">
                <input
                  type="text"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/product-image.jpg"
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-sm text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30 focus:border-[#8CBC67] transition"
                />
                <div className="flex items-center space-x-3">
                  <label className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-[#202522] text-xs font-bold cursor-pointer transition shadow-sm">
                    {uploadingPrimary ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-[#8CBC67]" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={16} />
                        <span>Upload Primary Image (Cloudinary)</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePrimaryUpload}
                      disabled={uploadingPrimary}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Preview */}
              <div className="w-full h-36 rounded-2xl border border-dashed border-[#E8E8E3] bg-[#FCFBF7] overflow-hidden flex items-center justify-center relative">
                {image ? (
                  <img src={image} alt="Primary Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-3 text-[#6B706C]">
                    <ImageIcon size={24} className="mx-auto mb-1 opacity-50" />
                    <span className="text-[10px]">No image selected</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Gallery Images */}
          <div className="pt-4 border-t border-[#E8E8E3]">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider">
                Additional Gallery Photos ({images.length})
              </label>
              <label className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold cursor-pointer transition">
                {uploadingGallery ? (
                  <Loader2 size={14} className="animate-spin text-[#8CBC67]" />
                ) : (
                  <Plus size={14} />
                )}
                <span>Add Photos</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryUpload}
                  disabled={uploadingGallery}
                  className="hidden"
                />
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {images.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative group aspect-square rounded-xl overflow-hidden border border-[#E8E8E3] bg-neutral-100"
                  >
                    <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition shadow"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Inclusions & Policies */}
        <div className="bg-white border border-[#E8E8E3] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-serif text-lg font-bold text-[#202522] pb-3 border-b border-[#E8E8E3]">
            What&apos;s Included & Policies
          </h2>

          {/* Inclusions */}
          <div>
            <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
              What&apos;s Included
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newIncludedItem}
                onChange={(e) => setNewIncludedItem(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addIncluded())}
                placeholder="e.g. 50 Pastel Balloons, 1 Happy Birthday Banner"
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30"
              />
              <button
                type="button"
                onClick={addIncluded}
                className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-[#202522]"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {includedList.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#EEF6EB] text-[#202522] text-xs font-medium"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeIncluded(idx)}
                    className="text-red-500 hover:text-red-700 ml-1 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Not Included */}
          <div>
            <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
              What&apos;s Not Included
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newNotIncludedItem}
                onChange={(e) => setNewNotIncludedItem(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addNotIncluded())}
                placeholder="e.g. Venue charges, extra lighting"
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30"
              />
              <button
                type="button"
                onClick={addNotIncluded}
                className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-[#202522]"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {notIncludedList.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#F7D6C7]/50 text-[#C23B22] text-xs font-medium"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeNotIncluded(idx)}
                    className="text-red-500 hover:text-red-700 ml-1 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Cancellation Policy */}
          <div>
            <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-2">
              Cancellation Policy
            </label>
            <textarea
              rows={2}
              value={cancellationPolicy}
              onChange={(e) => setCancellationPolicy(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30"
            />
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end space-x-4 pt-2">
          {inModal && onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 rounded-2xl border border-[#E8E8E3] text-[#202522] text-sm font-bold hover:bg-neutral-100 transition"
            >
              Cancel
            </button>
          ) : (
            <Link
              href="/admin/products"
              className="px-6 py-3 rounded-2xl border border-[#E8E8E3] text-[#202522] text-sm font-bold hover:bg-neutral-100 transition"
            >
              Cancel
            </Link>
          )}
          <button
            type="submit"
            disabled={submitting || uploadingPrimary || uploadingGallery}
            className="px-8 py-3 rounded-2xl bg-[#8CBC67] text-neutral-950 text-sm font-bold hover:bg-[#7AB055] transition shadow-md flex items-center space-x-2 disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving Product...</span>
              </>
            ) : (
              <span>{isEdit ? "Update Product" : "Publish Product"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
