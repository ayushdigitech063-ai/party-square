"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Image as ImageIcon,
  Plus,
  Search,
  Edit3,
  Trash2,
  Upload,
  Sparkles,
  ExternalLink,
  RefreshCw,
  X,
  CheckCircle2,
  Eye,
  EyeOff,
  CloudUpload,
  Loader2
} from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchAdminGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  uploadImage,
  GalleryItem
} from "@/app/lib/api";

const PAGE_TARGETS = [
  { id: "all", label: "All Showcases", path: "" },
  { id: "wall-decoration", label: "🚪 Wall & Door Decor", path: "/services/wall-decoration" },
  { id: "birthday", label: "🎂 Birthday Showcase", path: "/services/birthday" },
  { id: "birthday-mother", label: "👩 Mother's Milestone", path: "/services/birthday/mother" },
  { id: "ring-decoration", label: "💍 Ring & Engagement", path: "/services/ring-decoration" },
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTarget, setSelectedTarget] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formTarget, setFormTarget] = useState("wall-decoration");
  const [formCategory, setFormCategory] = useState("Wall Decoration");
  const [formOrder, setFormOrder] = useState("1");
  const [formActive, setFormActive] = useState(true);

  // Cloudinary upload state
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load items
  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAdminGalleryItems();
      setItems(Array.isArray(data) ? data : []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load showcase gallery");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesTarget =
        selectedTarget === "all" || item.pageTarget === selectedTarget;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q);
      return matchesTarget && matchesSearch;
    });
  }, [items, selectedTarget, searchQuery]);

  // Handle Cloudinary file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, WEBP)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 10MB");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading image to Cloudinary...");
    try {
      const res = await uploadImage(file);
      setFormImage(res.url);
      toast.success("Image uploaded to Cloudinary successfully!", { id: toastId });
    } catch (err: any) {
      toast.error(err.message || "Failed to upload to Cloudinary", { id: toastId });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Open modal for create
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormTitle("");
    setFormImage("");
    setFormTarget(selectedTarget === "all" ? "wall-decoration" : selectedTarget);
    setFormCategory("Wall Decoration");
    setFormOrder("1");
    setFormActive(true);
    setIsModalOpen(true);
  };

  // Open modal for edit
  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormImage(item.image);
    setFormTarget(item.pageTarget || "wall-decoration");
    setFormCategory(item.category || "Showcase");
    setFormOrder(String(item.order || 1));
    setFormActive(item.isActive !== false);
    setIsModalOpen(true);
  };

  // Submit create or edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      toast.error("Please enter a title for the photo");
      return;
    }
    if (!formImage.trim()) {
      toast.error("Please upload or provide an image URL");
      return;
    }

    const payload = {
      title: formTitle.trim(),
      image: formImage.trim(),
      pageTarget: formTarget,
      category: formCategory.trim() || "Showcase",
      order: Number(formOrder) || 0,
      isActive: formActive,
    };

    setIsSubmitting(true);
    try {
      if (editingItem) {
        const updated = await updateGalleryItem(editingItem._id, payload);
        toast.success(`Showcase "${updated.title}" updated!`);
        setItems((prev) =>
          prev.map((i) => (i._id === editingItem._id ? updated : i))
        );
      } else {
        const created = await createGalleryItem(payload);
        toast.success(`Showcase "${created.title}" added to gallery!`);
        setItems((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to save showcase item");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete item
  const handleDelete = async (item: GalleryItem) => {
    if (!window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      return;
    }

    const toastId = toast.loading("Deleting photo...");
    try {
      await deleteGalleryItem(item._id);
      toast.success("Showcase photo removed", { id: toastId });
      setItems((prev) => prev.filter((i) => i._id !== item._id));
    } catch (err: any) {
      toast.error(err.message || "Failed to delete item", { id: toastId });
    }
  };

  // Toggle active status
  const handleToggleActive = async (item: GalleryItem) => {
    const nextVal = item.isActive === false;
    try {
      const updated = await updateGalleryItem(item._id, { isActive: nextVal });
      toast.success(
        nextVal
          ? `Activated "${item.title}" on live page`
          : `Hidden "${item.title}" from live page`
      );
      setItems((prev) =>
        prev.map((i) => (i._id === item._id ? updated : i))
      );
    } catch (err: any) {
      toast.error(err.message || "Could not update status");
    }
  };

  return (
    <div className="w-full space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-white border border-[#E8E8E3] rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-[#FAF5EB] text-[#D7A84B] rounded-xl border border-[#D7A84B]/20">
              <ImageIcon size={20} />
            </span>
            <span className="text-xs uppercase tracking-widest font-bold text-[#D7A84B]">
              Cloudinary Media Gallery
            </span>
          </div>
          <h1 className="font-serif text-2xl lg:text-3xl font-bold text-[#202522]">
            Visual Showcase Gallery Manager
          </h1>
          <p className="text-xs lg:text-sm text-[#6B706C] font-light max-w-2xl">
            Upload high-resolution event photos directly to Cloudinary and control which
            showcase galleries they appear in across Wall Decor, Birthday, and Ring Ceremony pages.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={loadData}
            title="Refresh Gallery"
            className="p-3 bg-neutral-100 hover:bg-neutral-200 text-[#202522] rounded-2xl transition border border-[#E8E8E3]"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={handleOpenCreate}
            className="flex-1 md:flex-initial flex items-center justify-center space-x-2 bg-[#D7A84B] hover:bg-[#c2953e] text-[#202522] font-bold px-6 py-3 rounded-2xl shadow-md transition"
          >
            <Plus size={18} />
            <span className="text-sm">Upload Showcase Photo</span>
          </button>
        </div>
      </div>

      {/* Target Pages Tabs & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
        {/* Page Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {PAGE_TARGETS.map((target) => {
            const count =
              target.id === "all"
                ? items.length
                : items.filter((i) => i.pageTarget === target.id).length;
            const isActive = selectedTarget === target.id;
            return (
              <button
                key={target.id}
                onClick={() => setSelectedTarget(target.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center space-x-2 border ${
                  isActive
                    ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                    : "bg-white text-[#6B706C] border-[#E8E8E3] hover:text-[#202522] hover:bg-neutral-50"
                }`}
              >
                <span>{target.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-neutral-100 text-[#6B706C]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative min-w-[280px]">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B706C]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search photo by title or category..."
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#E8E8E3] rounded-2xl text-xs text-[#202522] focus:outline-none focus:border-[#D7A84B] transition shadow-sm"
          />
        </div>
      </div>

      {/* Target Banner if filtered */}
      {selectedTarget !== "all" && (
        <div className="flex items-center justify-between bg-[#FAF5EB] border border-[#D7A84B]/30 px-5 py-3 rounded-2xl text-xs">
          <div className="flex items-center space-x-2 text-[#202522]">
            <Sparkles size={16} className="text-[#D7A84B]" />
            <span>
              Managing Showcase for:{" "}
              <strong>
                {PAGE_TARGETS.find((p) => p.id === selectedTarget)?.label}
              </strong>
            </span>
          </div>
          {PAGE_TARGETS.find((p) => p.id === selectedTarget)?.path && (
            <a
              href={PAGE_TARGETS.find((p) => p.id === selectedTarget)?.path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-[#D7A84B] hover:text-[#b08d4b] font-bold"
            >
              <span>View Live Gallery on Website</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      )}

      {/* Photos Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="bg-white rounded-3xl border border-[#E8E8E3] p-4 h-72 animate-pulse space-y-3"
            >
              <div className="h-44 bg-neutral-100 rounded-2xl" />
              <div className="h-4 bg-neutral-100 rounded w-2/3" />
              <div className="h-3 bg-neutral-100 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E8E8E3] p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-[#FAF5EB] text-[#D7A84B] rounded-2xl flex items-center justify-center mx-auto">
            <ImageIcon size={32} />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#202522]">
            No Showcase Photos Found
          </h3>
          <p className="text-xs text-[#6B706C] max-w-sm mx-auto">
            Upload your first photo to Cloudinary to display in this gallery showcase section.
          </p>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center space-x-2 bg-[#D7A84B] hover:bg-[#c2953e] text-[#202522] font-bold px-6 py-2.5 rounded-2xl text-xs transition"
          >
            <Plus size={16} />
            <span>Upload Photo</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const targetMeta = PAGE_TARGETS.find((p) => p.id === item.pageTarget);
            const isCloudinary = item.image.includes("cloudinary.com");
            return (
              <div
                key={item._id}
                className={`group relative bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl ${
                  item.isActive === false ? "opacity-60 border-neutral-300" : "border-[#E8E8E3]"
                }`}
              >
                {/* Status Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                  <span className="bg-neutral-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20 shadow">
                    {targetMeta?.label?.split(" ")[1] || item.pageTarget}
                  </span>
                  {isCloudinary && (
                    <span className="bg-[#8CBC67]/90 backdrop-blur-md text-neutral-950 text-[9px] font-bold px-2 py-0.5 rounded-full shadow border border-white/30">
                      Cloudinary
                    </span>
                  )}
                </div>

                {/* Visibility Toggle Button */}
                <button
                  onClick={() => handleToggleActive(item)}
                  title={item.isActive !== false ? "Hide from website" : "Show on website"}
                  className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-white/90 backdrop-blur-md text-[#202522] hover:bg-white shadow transition"
                >
                  {item.isActive !== false ? <Eye size={14} className="text-[#8CBC67]" /> : <EyeOff size={14} className="text-[#6B706C]" />}
                </button>

                {/* Photo Image */}
                <div>
                  <div className="relative h-52 w-full bg-neutral-100 overflow-hidden border-b border-[#E8E8E3]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 left-2 bg-neutral-950/75 backdrop-blur-md text-[#DFBC71] text-[10px] font-bold px-2.5 py-0.5 rounded-lg border border-white/10">
                      {item.category || "Showcase"}
                    </div>
                  </div>

                  {/* Photo Title */}
                  <div className="p-4 space-y-1">
                    <h3 className="font-serif font-bold text-[#202522] text-sm truncate group-hover:text-[#D7A84B] transition" title={item.title}>
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-[11px] text-[#6B706C]">
                      <span>Order: #{item.order || 0}</span>
                      <span className={item.isActive !== false ? "text-[#8CBC67] font-semibold" : "text-amber-600"}>
                        {item.isActive !== false ? "Live" : "Hidden"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 pt-0 border-t border-[#E8E8E3] mt-2 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="flex-1 flex items-center justify-center space-x-1 bg-[#FAF8F5] border border-[#E8E8E3] hover:border-[#D7A84B] text-[#202522] py-2 px-3 rounded-xl text-xs font-bold transition shadow-sm"
                  >
                    <Edit3 size={13} className="text-[#D7A84B]" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition border border-red-200"
                    title="Delete Photo"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-[#E8E8E3] shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 my-8">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-[#E8E8E3] pb-4">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#202522]">
                  {editingItem ? "Edit Showcase Photo" : "Upload Photo to Gallery"}
                </h3>
                <p className="text-xs text-[#6B706C] mt-1">
                  Upload to Cloudinary or specify image link for showcase galleries.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-[#6B706C] hover:bg-neutral-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Target Page */}
              <div>
                <label className="block text-[#202522] font-bold mb-1.5">
                  Display On Gallery <span className="text-red-500">*</span>
                </label>
                <select
                  value={formTarget}
                  onChange={(e) => setFormTarget(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FAF8F5] text-[#202522] font-medium focus:outline-none focus:border-[#D7A84B]"
                >
                  <option value="wall-decoration">🚪 Wall & Door Decoration (/services/wall-decoration)</option>
                  <option value="birthday">🎂 Birthday Main Theme (/services/birthday)</option>
                  <option value="birthday-mother">👩 Mother's Milestone Birthday (/services/birthday/mother)</option>
                  <option value="ring-decoration">💍 Ring Ceremony & Engagement (/services/ring-decoration)</option>
                </select>
              </div>

              {/* Photo Title */}
              <div>
                <label className="block text-[#202522] font-bold mb-1.5">
                  Photo Title / Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Entrance Gate Arch"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FAF8F5] text-[#202522] focus:outline-none focus:border-[#D7A84B]"
                />
              </div>

              {/* Category Tag */}
              <div>
                <label className="block text-[#202522] font-bold mb-1.5">
                  Category Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wall Decoration, Door Entrance, Stage"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FAF8F5] text-[#202522] focus:outline-none focus:border-[#D7A84B]"
                />
              </div>

              {/* Cloudinary File Upload Area */}
              <div>
                <label className="block text-[#202522] font-bold mb-1.5">
                  Upload Image File (Cloudinary)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                  id="cloudinary-upload-input"
                />
                <label
                  htmlFor="cloudinary-upload-input"
                  className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition ${
                    isUploading
                      ? "border-[#D7A84B] bg-[#FAF5EB]/50"
                      : "border-[#E8E8E3] hover:border-[#D7A84B] hover:bg-[#FAF8F5]"
                  }`}
                >
                  {isUploading ? (
                    <div className="flex items-center space-x-2 text-[#D7A84B]">
                      <Loader2 size={24} className="animate-spin" />
                      <span className="font-bold">Uploading to Cloudinary...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-1 text-center">
                      <CloudUpload size={28} className="text-[#D7A84B]" />
                      <span className="font-bold text-[#202522]">
                        Click to upload image file
                      </span>
                      <span className="text-[11px] text-[#6B706C]">
                        Directly saved to Cloudinary party_square folder (Max 10MB)
                      </span>
                    </div>
                  )}
                </label>
              </div>

              {/* Image URL fallback */}
              <div>
                <label className="block text-[#202522] font-bold mb-1.5">
                  Or Direct Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://res.cloudinary.com/... or /walldecoration.png"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FAF8F5] text-[#202522] focus:outline-none focus:border-[#D7A84B]"
                />
                {formImage && (
                  <div className="mt-3 relative h-36 w-full rounded-2xl overflow-hidden border border-[#E8E8E3] shadow-inner bg-neutral-100">
                    <img
                      src={formImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    {formImage.includes("cloudinary.com") && (
                      <span className="absolute top-2 right-2 bg-[#8CBC67] text-neutral-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                        Cloudinary Image
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Order & Active */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#202522] font-bold mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={(e) => setFormOrder(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FAF8F5] text-[#202522] focus:outline-none focus:border-[#D7A84B]"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E8E3] mt-auto">
                  <div>
                    <span className="font-bold text-[#202522] block">
                      Active
                    </span>
                    <span className="text-[10px] text-[#6B706C]">
                      Show on live page
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formActive}
                    onChange={(e) => setFormActive(e.target.checked)}
                    className="w-5 h-5 accent-[#8CBC67] rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 pt-4 border-t border-[#E8E8E3]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-4 rounded-xl border border-[#E8E8E3] text-[#6B706C] hover:text-[#202522] font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#D7A84B] hover:bg-[#c2953e] text-[#202522] font-bold shadow-md transition disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingItem
                    ? "Update Showcase"
                    : "Save to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}