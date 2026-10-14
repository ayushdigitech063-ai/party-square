"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Edit3,
  ArrowUp,
  ArrowDown,
  Upload,
  RefreshCw,
  Sparkles,
  Eye,
  X
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchHomePageSection, updateHomePageSection, uploadImage } from "@/app/lib/api";

interface MostLovedItem {
  id?: number | string;
  name: string;
  image: string;
  price: string;
  slug: string;
}

interface MostLovedData {
  badge?: string;
  items: MostLovedItem[];
}

const DEFAULT_ITEMS: MostLovedItem[] = [
  { id: 1, name: "Royal Stage Floral Mandap", image: "/homepage.png", price: "₹14,999", slug: "royal-stage-mandap" },
  { id: 2, name: "Kids Cartoon Balloon Wonderland", image: "/birthdaykids.png", price: "₹6,499", slug: "kids-cartoon-balloon" },
  { id: 3, name: "Romantic Candlelight Canopy", image: "/marriageaniversary.png", price: "₹8,999", slug: "romantic-candlelight" },
  { id: 4, name: "Traditional Diya & Flower Decor", image: "/diwalidecoration.png", price: "₹5,999", slug: "traditional-diya-decor" },
  { id: 5, name: "Ganpati Grand Floral Backdrop", image: "/ganeshchaturthi.png", price: "₹11,999", slug: "ganpati-grand-floral" },
  { id: 6, name: "Pastel Luxe Balloon Arch", image: "/childbirthday1.png", price: "₹4,499", slug: "pastel-luxe-balloon" },
  { id: 7, name: "Neon Glow Couple Stage", image: "/ceremanybg.png", price: "₹12,499", slug: "neon-glow-couple-stage" },
  { id: 8, name: "Mom Special Golden Canopy", image: "/motherbirthdaymom.png", price: "₹7,499", slug: "mom-special-golden-canopy" },
];

export default function AdminMostLovedPage() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [title, setTitle] = useState("Most Loved Decorations");
  const [subtitle, setSubtitle] = useState(
    "Explore our curated themes. Click on any circular picture to view full decoration details."
  );
  const [badge, setBadge] = useState("Our Speciality");
  const [items, setItems] = useState<MostLovedItem[]>(DEFAULT_ITEMS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formItem, setFormItem] = useState<MostLovedItem>({
    name: "",
    image: "",
    price: "₹4,999",
    slug: "",
  });

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const sec = await fetchHomePageSection<MostLovedData>("most_loved_decor");
        if (sec) {
          setIsEnabled(sec.isEnabled ?? true);
          if (sec.title) setTitle(sec.title);
          if (sec.subtitle) setSubtitle(sec.subtitle);
          if (sec.contentData) {
            if (sec.contentData.badge) setBadge(sec.contentData.badge);
            if (Array.isArray(sec.contentData.items) && sec.contentData.items.length > 0) {
              setItems(sec.contentData.items);
            }
          }
        }
      } catch (err: any) {
        toast.error("Loaded default themes");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setFormItem({
      id: Date.now(),
      name: "",
      image: "",
      price: "₹4,999",
      slug: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (index: number) => {
    setEditingIndex(index);
    setFormItem({ ...items[index] });
    setIsModalOpen(true);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const res = await uploadImage(file);
      if (res?.url) {
        setFormItem((prev) => ({ ...prev, image: res.url }));
        toast.success("Image uploaded to Cloudinary!");
      }
    } catch (err: any) {
      toast.error(err.message || "Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formItem.name || !formItem.image) {
      toast.error("Theme Name and Image are required");
      return;
    }
    const slugValue = formItem.slug || formItem.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const readyItem = { ...formItem, slug: slugValue };

    if (editingIndex !== null) {
      const updated = [...items];
      updated[editingIndex] = readyItem;
      setItems(updated);
      toast.success("Theme updated in list");
    } else {
      setItems([...items, { ...readyItem, id: Date.now() }]);
      toast.success("New theme added to list");
    }
    setIsModalOpen(false);
  };

  const handleDeleteItem = (index: number) => {
    if (items.length <= 1) {
      toast.error("At least one theme is required");
      return;
    }
    if (confirm("Delete this decoration theme?")) {
      setItems(items.filter((_, i) => i !== index));
      toast.success("Theme removed");
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const reordered = [...items];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIdx, 0, moved);
    setItems(reordered);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await updateHomePageSection("most_loved_decor", {
        title,
        subtitle,
        isEnabled,
        contentData: {
          badge,
          items,
        },
      });
      toast.success("Most Loved Decorations saved successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save themes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E8E8E3] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Link
              href="/admin/homepage"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B706C] hover:text-[#202522]"
            >
              <ArrowLeft size={14} /> Back to Homepage Sections
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-600">
              <Heart size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#111111]">
                Most Loved Decorations
              </h1>
              <p className="text-xs text-[#6B706C]">
                Interactive circular auto-scroll decor themes with price tags and direct booking links.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2.5 cursor-pointer bg-neutral-50 px-4 py-2 rounded-xl border border-[#E8E8E3]">
            <span className="text-xs font-medium text-[#202522]">
              {isEnabled ? "Visible on Frontend" : "Hidden"}
            </span>
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-10 h-5 rounded-full transition-colors relative ${
                isEnabled ? "bg-[#8CBC67]" : "bg-neutral-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-0.5 ${
                  isEnabled ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </div>
          </label>

          <button
            onClick={handleSaveAll}
            disabled={isSaving || isLoading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8CBC67] text-white text-xs font-semibold hover:bg-[#7ba859] transition-all shadow-sm disabled:opacity-50"
          >
            {isSaving ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Header text settings */}
      <div className="bg-white border border-[#E8E8E3] rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
          Section Header Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Top Badge Text
            </label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="Our Speciality"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Section Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Most Loved Decorations"
              className="w-full px-3.5 py-2 text-xs font-bold rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Subtitle
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Explore our curated themes..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Circular Themes Grid */}
      <div className="bg-white border border-[#E8E8E3] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E8E3]">
          <div>
            <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
              Circular Decoration Themes ({items.length})
            </h3>
            <p className="text-xs text-[#6B706C]">
              Circular pictures auto-sliding across the homepage with animated hover states.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-[#8CBC67] transition-all shadow-sm"
          >
            <Plus size={14} />
            <span>Add Theme</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-neutral-50 border border-[#E8E8E3] rounded-2xl p-4 flex flex-col items-center text-center relative group hover:border-[#8CBC67] hover:bg-white transition-all shadow-sm"
            >
              {/* Order index pill */}
              <div className="absolute top-3 left-3 bg-white border border-[#E8E8E3] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full text-[#6B706C]">
                #{index + 1}
              </div>

              {/* Action buttons on top right */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleOpenEdit(index)}
                  className="p-1 rounded bg-white border border-[#E8E8E3] hover:text-[#8CBC67] hover:border-[#8CBC67] transition-colors"
                  title="Edit theme"
                >
                  <Edit3 size={13} />
                </button>
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="p-1 rounded bg-white border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              {/* Circular Image Preview */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-white shadow-md relative bg-white my-3">
                <img
                  src={item.image || "/homepage.png"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <h4 className="font-semibold text-xs text-[#111111] line-clamp-1 max-w-[180px]">
                {item.name}
              </h4>
              <p className="text-[11px] font-bold text-[#8CBC67] mt-0.5">
                {item.price}
              </p>
              <p className="text-[10px] text-[#8A8F8B] font-mono mt-0.5 truncate max-w-[160px]">
                {item.slug}
              </p>

              {/* Move arrows */}
              <div className="flex items-center gap-1 mt-3 pt-2 border-t border-[#E8E8E3] w-full justify-center">
                <button
                  onClick={() => handleMove(index, "up")}
                  disabled={index === 0}
                  className="p-1 text-[#6B706C] hover:text-[#8CBC67] disabled:opacity-20"
                  title="Move left/up"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  onClick={() => handleMove(index, "down")}
                  disabled={index === items.length - 1}
                  className="p-1 text-[#6B706C] hover:text-[#8CBC67] disabled:opacity-20"
                  title="Move right/down"
                >
                  <ArrowDown size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E8E8E3] max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E3]">
              <h3 className="text-base font-bold font-serif text-[#111111]">
                {editingIndex !== null ? `Edit Theme #${editingIndex + 1}` : "Add Circular Decor Theme"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#6B706C] hover:text-black p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                  Decoration Theme Name *
                </label>
                <input
                  type="text"
                  required
                  value={formItem.name}
                  onChange={(e) => setFormItem({ ...formItem, name: e.target.value })}
                  placeholder="e.g. Royal Stage Floral Mandap"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                  Price Display Label
                </label>
                <input
                  type="text"
                  required
                  value={formItem.price}
                  onChange={(e) => setFormItem({ ...formItem, price: e.target.value })}
                  placeholder="e.g. ₹14,999 or Starting from ₹8,999"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                  Circular Image * (Cloudinary Upload or Path)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formItem.image}
                    onChange={(e) => setFormItem({ ...formItem, image: e.target.value })}
                    placeholder="/homepage.png or https://..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-[#8CBC67] transition-all cursor-pointer shrink-0">
                    <Upload size={13} />
                    <span>{uploadingImage ? "Uploading..." : "Upload"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      onChange={handleImageFileChange}
                      className="sr-only"
                    />
                  </label>
                </div>
                {formItem.image && (
                  <div className="mt-2 w-16 h-16 rounded-full overflow-hidden border-2 border-[#8CBC67] mx-auto">
                    <img src={formItem.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                  Product Slug / Link (optional)
                </label>
                <input
                  type="text"
                  value={formItem.slug}
                  onChange={(e) => setFormItem({ ...formItem, slug: e.target.value })}
                  placeholder="e.g. royal-stage-mandap"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none font-mono"
                />
              </div>

              <div className="pt-3 border-t border-[#E8E8E3] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E8E8E3] text-xs font-semibold text-[#6B706C] hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#8CBC67] text-white text-xs font-semibold hover:bg-[#7ba859] shadow-sm"
                >
                  {editingIndex !== null ? "Update Theme" : "Add Theme"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
