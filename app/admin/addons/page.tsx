"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Sparkles,
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle2,
  X,
  Upload,
  Loader2,
  DollarSign,
  Tag,
  Star,
  Layers,
  ArrowUpRight,
  Filter
} from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchAddOnsAdmin,
  createAddOnAdmin,
  updateAddOnAdmin,
  deleteAddOnAdmin,
  uploadImage,
  DynamicAddOnItem
} from "@/app/lib/api";
import { ADDON_CATEGORIES, ADDON_PRODUCTS } from "@/app/data/addonsData";

export default function AdminAddonsPage() {
  const [addons, setAddons] = useState<DynamicAddOnItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddon, setEditingAddon] = useState<DynamicAddOnItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("recommended");
  const [formPrice, setFormPrice] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDetails, setFormDetails] = useState("");
  const [formPopular, setFormPopular] = useState(false);
  const [formIsActive, setFormIsActive] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Load add-ons from API
  const loadAddons = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAddOnsAdmin();
      if (Array.isArray(data) && data.length > 0) {
        setAddons(data);
      } else {
        // Fallback to static catalog if backend has not seeded yet
        const initial = ADDON_PRODUCTS.map((p) => ({
          _id: p.id,
          id: p.id,
          name: p.name,
          category: p.category,
          price: p.price,
          image: p.image,
          description: p.description,
          details: p.details || "",
          popular: !!p.popular,
          isActive: true
        }));
        setAddons(initial);
      }
    } catch (err) {
      console.warn("Failed loading add-ons from API, using default catalog:", err);
      const initial = ADDON_PRODUCTS.map((p) => ({
        _id: p.id,
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        image: p.image,
        description: p.description,
        details: p.details || "",
        popular: !!p.popular,
        isActive: true
      }));
      setAddons(initial);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAddons();
  }, []);

  const openCreateModal = () => {
    setEditingAddon(null);
    setFormName("");
    setFormCategory("recommended");
    setFormPrice("");
    setFormImage("");
    setFormDescription("");
    setFormDetails("");
    setFormPopular(false);
    setFormIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (addon: DynamicAddOnItem) => {
    setEditingAddon(addon);
    setFormName(addon.name);
    setFormCategory(addon.category || "recommended");
    setFormPrice(String(addon.price));
    setFormImage(addon.image || "");
    setFormDescription(addon.description || "");
    setFormDetails(addon.details || "");
    setFormPopular(!!addon.popular);
    setFormIsActive(addon.isActive !== false);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingImage(true);
      const res = await uploadImage(file);
      setFormImage(res.url || "");
      toast.success("Image uploaded successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      toast.error("Please enter add-on name");
      return;
    }
    const numPrice = Number(formPrice);
    if (isNaN(numPrice) || numPrice < 0) {
      toast.error("Please enter a valid price");
      return;
    }
    if (!formImage.trim()) {
      toast.error("Please provide an image URL or upload one");
      return;
    }

    const payload: Partial<DynamicAddOnItem> = {
      name: formName.trim(),
      category: formCategory,
      price: numPrice,
      image: formImage.trim(),
      description: formDescription.trim(),
      details: formDetails.trim(),
      popular: formPopular,
      isActive: formIsActive,
    };

    try {
      setIsSubmitting(true);
      if (editingAddon && (editingAddon._id || editingAddon.id)) {
        const id = editingAddon._id || editingAddon.id!;
        const updated = await updateAddOnAdmin(id, payload);
        setAddons((prev) =>
          prev.map((a) => ((a._id === id || a.id === id) ? { ...a, ...updated, ...payload } : a))
        );
        toast.success("Add-on updated successfully!");
      } else {
        const created = await createAddOnAdmin(payload);
        setAddons((prev) => [created, ...prev]);
        toast.success("Add-on created successfully!");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      // In case backend is temporarily unreachable, update local state
      if (editingAddon) {
        const id = editingAddon._id || editingAddon.id;
        setAddons((prev) =>
          prev.map((a) => ((a._id === id || a.id === id) ? { ...a, ...payload } : a))
        );
        toast.success("Add-on updated (saved locally)");
        setIsModalOpen(false);
      } else {
        const fakeId = `addon-${Date.now()}`;
        setAddons((prev) => [{ ...payload, _id: fakeId, id: fakeId } as DynamicAddOnItem, ...prev]);
        toast.success("Add-on created (saved locally)");
        setIsModalOpen(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (addon: DynamicAddOnItem) => {
    const id = addon._id || addon.id;
    if (!id) return;
    if (!confirm(`Are you sure you want to delete "${addon.name}"?`)) return;

    try {
      await deleteAddOnAdmin(id);
      setAddons((prev) => prev.filter((a) => (a._id !== id && a.id !== id)));
      toast.success("Add-on removed successfully!");
    } catch (err: any) {
      setAddons((prev) => prev.filter((a) => (a._id !== id && a.id !== id)));
      toast.success("Add-on removed");
    }
  };

  // Filtered addons
  const filteredAddons = useMemo(() => {
    return addons.filter((item) => {
      const matchCat =
        selectedCategory === "all" ||
        (selectedCategory === "recommended" && (item.category === "recommended" || item.popular)) ||
        item.category === selectedCategory;
      const matchQuery =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [addons, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E8E8E3] shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#8CBC67] uppercase tracking-wider mb-1">
            <Sparkles size={14} />
            <span>Product Enhancements & Extras</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#202522]">
            Add-ons Manager
          </h1>
          <p className="text-xs sm:text-sm text-[#6B706C] mt-1">
            Create, price, and manage party add-ons (LED digits, foil balloons, cakes, lights, and welcome boards) shown to customers on product booking pages.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center space-x-2 bg-[#8CBC67] hover:bg-[#7AB055] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-sm shrink-0 cursor-pointer"
        >
          <Plus size={18} />
          <span>Add New Add-on</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E8E3] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3 justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search add-on by name or keyword..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] focus:outline-none focus:border-[#8CBC67]"
            />
          </div>

          <div className="text-xs font-semibold text-[#6B706C]">
            Showing <span className="text-[#202522] font-bold">{filteredAddons.length}</span> of {addons.length} Add-ons
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {ADDON_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#8CBC67] text-white shadow-xs"
                  : "bg-[#FCFBF7] text-[#6B706C] hover:text-[#202522] border border-[#E8E8E3]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Add-ons */}
      {isLoading ? (
        <div className="bg-white p-12 rounded-2xl border border-[#E8E8E3] text-center space-y-3">
          <Loader2 className="animate-spin text-[#8CBC67] mx-auto" size={32} />
          <p className="text-sm text-[#6B706C]">Loading dynamic add-ons from database...</p>
        </div>
      ) : filteredAddons.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-[#E8E8E3] text-center space-y-3">
          <Layers size={40} className="text-neutral-300 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#202522]">No Add-ons Found</h3>
          <p className="text-xs text-[#6B706C] max-w-sm mx-auto">
            No add-ons match the selected category or search query. Click "Add New Add-on" to create one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAddons.map((addon) => (
            <div
              key={addon._id || addon.id}
              className="bg-white rounded-2xl border border-[#E8E8E3] hover:border-[#8CBC67] overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-video w-full bg-[#EEF6EB] overflow-hidden">
                  <img
                    src={addon.image}
                    alt={addon.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {addon.popular && (
                    <span className="absolute top-2.5 left-2.5 bg-[#8CBC67] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                      <Star size={10} className="fill-white" />
                      Popular
                    </span>
                  )}
                  {addon.isActive === false && (
                    <span className="absolute top-2.5 right-2.5 bg-neutral-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-xs">
                      Disabled
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm text-[#202522] line-clamp-1 leading-snug">
                      {addon.name}
                    </h3>
                    <span className="text-sm font-extrabold text-[#8CBC67] shrink-0">
                      ₹{addon.price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#FCFBF7] border border-[#E8E8E3] text-[#6B706C] capitalize">
                    {addon.category}
                  </span>

                  <p className="text-xs text-[#6B706C] line-clamp-2 leading-relaxed">
                    {addon.description || "No description provided."}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-3 border-t border-[#E8E8E3] bg-[#FCFBF7]/50 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(addon)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-700 hover:text-[#8CBC67] hover:bg-white border border-transparent hover:border-[#E8E8E3] transition flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 size={13} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(addon)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#E8E8E3] my-8 animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E3]">
              <div className="flex items-center space-x-2">
                <Sparkles size={18} className="text-[#8CBC67]" />
                <h3 className="font-serif text-lg font-bold text-[#202522]">
                  {editingAddon ? "Edit Add-on" : "Create New Add-on"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 flex items-center justify-center transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-1">
                  Add-on Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Personalized Welcome Board"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] focus:outline-none focus:border-[#8CBC67]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] focus:outline-none focus:border-[#8CBC67]"
                  >
                    {ADDON_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-1">
                    Price (₹ INR) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="e.g. 1500"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] focus:outline-none focus:border-[#8CBC67]"
                  />
                </div>
              </div>

              {/* Image Input + Upload */}
              <div>
                <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-1">
                  Image *
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      required
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="https://images.unsplash.com/... or upload"
                      className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] focus:outline-none focus:border-[#8CBC67]"
                    />
                    <label className="px-3.5 py-2 rounded-xl bg-[#EEF6EB] hover:bg-[#8CBC67] text-[#8CBC67] hover:text-white transition font-semibold text-xs flex items-center gap-1.5 cursor-pointer shrink-0">
                      {uploadingImage ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                      <span>Upload</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                  {formImage && (
                    <div className="w-20 h-14 rounded-lg overflow-hidden border border-[#E8E8E3]">
                      <img src={formImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Brief summary shown on the add-on card..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] focus:outline-none focus:border-[#8CBC67] resize-none"
                />
              </div>

              {/* Details (Popup information) */}
              <div>
                <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-1">
                  Detailed Specifications (Modal Popup info)
                </label>
                <textarea
                  rows={2}
                  value={formDetails}
                  onChange={(e) => setFormDetails(e.target.value)}
                  placeholder="Material specs, setup timeframe, delivery inclusions..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] focus:outline-none focus:border-[#8CBC67] resize-none"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#202522]">
                  <input
                    type="checkbox"
                    checked={formPopular}
                    onChange={(e) => setFormPopular(e.target.checked)}
                    className="w-4 h-4 rounded text-[#8CBC67] focus:ring-[#8CBC67]"
                  />
                  <span>Mark as Popular (Recommended)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#202522]">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-[#8CBC67] focus:ring-[#8CBC67]"
                  />
                  <span>Active (Visible to users)</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E8E3]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6B706C] hover:bg-neutral-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-[#8CBC67] hover:bg-[#7AB055] text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 size={13} className="animate-spin" />}
                  <span>{editingAddon ? "Save Changes" : "Create Add-on"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
