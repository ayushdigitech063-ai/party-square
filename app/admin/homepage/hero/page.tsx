"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Image as ImageIcon,
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
  CheckCircle2,
  X
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchHomePageSection, updateHomePageSection, uploadImage } from "@/app/lib/api";

interface HeroSlide {
  id?: number | string;
  image: string;
  subtitle: string;
  titleFirst: string;
  titleItalic: string;
  description: string;
  category?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface HeroData {
  autoplaySpeed?: number;
  slides: HeroSlide[];
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: "/homepage.png",
    subtitle: "PREMIUM EVENT DECORATION SERVICES",
    titleFirst: "Turning Your Dreams Into",
    titleItalic: "Beautiful Realities",
    description:
      "From intimate gatherings to grand celebrations, we create stunning decor experiences that make your special moments unforgettable.",
    category: "Weddings",
    buttonText: "Explore Our Services",
    buttonLink: "/services",
  },
  {
    id: 2,
    image: "/diwalidecoration.png",
    subtitle: "FESTIVE LIGHTING & DECOR",
    titleFirst: "Illuminate Your",
    titleItalic: "Festive Celebrations",
    description:
      "Bring home the warmth and radiance with our bespoke Diwali decoration and traditional lighting designs.",
    category: "Diwali",
    buttonText: "View Festival Setups",
    buttonLink: "/Festivals/diwali",
  },
  {
    id: 3,
    image: "/ganeshchaturthi.png",
    subtitle: "DIVINE MANDAP SETUP",
    titleFirst: "Welcome Bappa With",
    titleItalic: "Exquisite Mandaps",
    description:
      "Grand floral arrangements and elegant backdrops crafted specially for Ganesh Chaturthi celebrations.",
    category: "Ganesh Chaturthi",
    buttonText: "Explore Mandap Themes",
    buttonLink: "/Festivals/ganeshchaturthi",
  },
  {
    id: 4,
    image: "/marriageaniversary.png",
    subtitle: "ROMANTIC MILESTONES",
    titleFirst: "Celebrate Love With",
    titleItalic: "Timeless Elegance",
    description:
      "Recreate the magic of your special day with romantic candlelights, floral arches, and customized themes.",
    category: "Anniversary",
    buttonText: "Book Anniversary Theme",
    buttonLink: "/services/ring-decoration",
  },
];

export default function AdminHeroPage() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [autoplaySpeed, setAutoplaySpeed] = useState(5000);
  const [slides, setSlides] = useState<HeroSlide[]>(DEFAULT_SLIDES);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Edit / Modal state
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [slideForm, setSlideForm] = useState<HeroSlide>({
    image: "",
    subtitle: "",
    titleFirst: "",
    titleItalic: "",
    description: "",
    category: "",
    buttonText: "Explore Our Services",
    buttonLink: "/services",
  });

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const sec = await fetchHomePageSection<HeroData>("hero_banner");
        if (sec) {
          setIsEnabled(sec.isEnabled ?? true);
          if (sec.contentData) {
            if (sec.contentData.autoplaySpeed) {
              setAutoplaySpeed(sec.contentData.autoplaySpeed);
            }
            if (Array.isArray(sec.contentData.slides) && sec.contentData.slides.length > 0) {
              setSlides(sec.contentData.slides);
            }
          }
        }
      } catch (err: any) {
        toast.error("Loaded default hero slides");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setSlideForm({
      id: Date.now(),
      image: "",
      subtitle: "EVENT DECORATION",
      titleFirst: "Celebrate Your",
      titleItalic: "Special Moments",
      description: "Crafting extraordinary decoration experiences tailored to your dream setup.",
      category: "Special",
      buttonText: "Explore Services",
      buttonLink: "/services",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (index: number) => {
    setEditingIndex(index);
    setSlideForm({ ...slides[index] });
    setIsModalOpen(true);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const res = await uploadImage(file);
      if (res?.url) {
        setSlideForm((prev) => ({ ...prev, image: res.url }));
        toast.success("Image uploaded to Cloudinary successfully!");
      }
    } catch (err: any) {
      toast.error(err.message || "Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideForm.image) {
      toast.error("Please provide or upload a background image");
      return;
    }
    if (editingIndex !== null) {
      const updated = [...slides];
      updated[editingIndex] = slideForm;
      setSlides(updated);
      toast.success("Slide updated in list");
    } else {
      setSlides([...slides, { ...slideForm, id: Date.now() }]);
      toast.success("New slide added to list");
    }
    setIsModalOpen(false);
  };

  const handleDeleteSlide = (index: number) => {
    if (slides.length <= 1) {
      toast.error("At least one slide is required in Hero Banner");
      return;
    }
    if (confirm("Are you sure you want to delete this slide?")) {
      setSlides(slides.filter((_, i) => i !== index));
      toast.success("Slide removed");
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= slides.length) return;
    const reordered = [...slides];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIdx, 0, moved);
    setSlides(reordered);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await updateHomePageSection("hero_banner", {
        title: "Hero Banner Slider",
        subtitle: "Rotating flagship carousel at the top of homepage",
        isEnabled,
        contentData: {
          autoplaySpeed,
          slides,
        },
      });
      toast.success("Hero Banner Slider saved to database!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save Hero Banner");
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
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <ImageIcon size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#111111]">
                Hero Banner Slider
              </h1>
              <p className="text-xs text-[#6B706C]">
                Rotating flagship carousel at top of homepage with high-res photos and call-to-actions.
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

      {/* Settings bar */}
      <div className="bg-white border border-[#E8E8E3] rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-[#202522]">
            Auto-Rotation Speed:
          </label>
          <select
            value={autoplaySpeed}
            onChange={(e) => setAutoplaySpeed(Number(e.target.value))}
            className="px-3 py-1.5 rounded-lg border border-[#E8E8E3] bg-neutral-50 text-xs font-medium text-[#202522] focus:outline-none focus:border-[#8CBC67]"
          >
            <option value={3000}>3 Seconds (Fast)</option>
            <option value={5000}>5 Seconds (Recommended)</option>
            <option value={7000}>7 Seconds (Relaxed)</option>
            <option value={10000}>10 Seconds (Slow)</option>
          </select>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-[#8CBC67] transition-all shadow-sm"
        >
          <Plus size={15} />
          <span>Add New Slide</span>
        </button>
      </div>

      {/* Slides List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#6B706C]">
          Active Slides ({slides.length})
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {slides.map((slide, index) => (
            <div
              key={slide.id || index}
              className="bg-white border border-[#E8E8E3] rounded-2xl p-5 shadow-sm hover:shadow transition-all flex flex-col md:flex-row items-start md:items-center gap-5 justify-between"
            >
              {/* Left: Thumbnail & Info */}
              <div className="flex items-start md:items-center gap-4 flex-1">
                <div className="w-28 h-20 rounded-xl overflow-hidden bg-neutral-100 border border-[#E8E8E3] shrink-0 relative">
                  <img
                    src={slide.image || "/homepage.png"}
                    alt={slide.titleFirst}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1 bg-black/60 text-white font-mono text-[10px] px-1.5 py-0.5 rounded">
                    #{index + 1}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {slide.category && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8CBC67]/15 text-[#8CBC67] border border-[#8CBC67]/30">
                        {slide.category}
                      </span>
                    )}
                    <span className="text-[11px] font-semibold text-[#8A8F8B] uppercase tracking-wider">
                      {slide.subtitle}
                    </span>
                  </div>

                  <h4 className="text-base font-serif font-bold text-[#111111]">
                    {slide.titleFirst}{" "}
                    <span className="text-[#8CBC67] italic">{slide.titleItalic}</span>
                  </h4>

                  <p className="text-xs text-[#6B706C] line-clamp-1 max-w-xl">
                    {slide.description}
                  </p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  onClick={() => handleMove(index, "up")}
                  disabled={index === 0}
                  title="Move up"
                  className="p-2 rounded-lg border border-[#E8E8E3] hover:border-[#8CBC67] text-[#6B706C] hover:text-[#8CBC67] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  onClick={() => handleMove(index, "down")}
                  disabled={index === slides.length - 1}
                  title="Move down"
                  className="p-2 rounded-lg border border-[#E8E8E3] hover:border-[#8CBC67] text-[#6B706C] hover:text-[#8CBC67] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  onClick={() => handleOpenEdit(index)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8E8E3] bg-white text-xs font-semibold text-[#202522] hover:border-[#8CBC67] hover:text-[#8CBC67] transition-all"
                >
                  <Edit3 size={13} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteSlide(index)}
                  className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                  title="Delete slide"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Add / Edit Slide */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E8E8E3] max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E3]">
              <h3 className="text-lg font-bold font-serif text-[#111111]">
                {editingIndex !== null ? `Edit Slide #${editingIndex + 1}` : "Add New Hero Slide"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#6B706C] hover:text-black p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              {/* Image Input + Upload */}
              <div>
                <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                  Background Image * (Cloudinary Upload or Path)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={slideForm.image}
                    onChange={(e) => setSlideForm({ ...slideForm, image: e.target.value })}
                    placeholder="/homepage.png or https://res.cloudinary.com/..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-[#8CBC67] transition-all cursor-pointer shrink-0">
                    <Upload size={13} />
                    <span>{uploadingImage ? "Uploading..." : "Upload File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      onChange={handleImageFileChange}
                      className="sr-only"
                    />
                  </label>
                </div>
                {slideForm.image && (
                  <div className="mt-2 w-32 h-20 rounded-lg overflow-hidden border border-[#E8E8E3] relative">
                    <img src={slideForm.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                    Category Tag (e.g. Weddings, Birthday, Diwali)
                  </label>
                  <input
                    type="text"
                    value={slideForm.category || ""}
                    onChange={(e) => setSlideForm({ ...slideForm, category: e.target.value })}
                    placeholder="Weddings"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                    Subtitle (Top small uppercase text)
                  </label>
                  <input
                    type="text"
                    value={slideForm.subtitle}
                    onChange={(e) => setSlideForm({ ...slideForm, subtitle: e.target.value })}
                    placeholder="PREMIUM EVENT DECORATION SERVICES"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                    Main Title (First part)
                  </label>
                  <input
                    type="text"
                    required
                    value={slideForm.titleFirst}
                    onChange={(e) => setSlideForm({ ...slideForm, titleFirst: e.target.value })}
                    placeholder="Turning Your Dreams Into"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                    Highlighted Title (Italic green text)
                  </label>
                  <input
                    type="text"
                    required
                    value={slideForm.titleItalic}
                    onChange={(e) => setSlideForm({ ...slideForm, titleItalic: e.target.value })}
                    placeholder="Beautiful Realities"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none text-[#8CBC67] font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                  Description Paragraph
                </label>
                <textarea
                  rows={3}
                  value={slideForm.description}
                  onChange={(e) => setSlideForm({ ...slideForm, description: e.target.value })}
                  placeholder="From intimate gatherings to grand celebrations..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={slideForm.buttonText || ""}
                    onChange={(e) => setSlideForm({ ...slideForm, buttonText: e.target.value })}
                    placeholder="Explore Our Services"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                    CTA Button Link
                  </label>
                  <input
                    type="text"
                    value={slideForm.buttonLink || ""}
                    onChange={(e) => setSlideForm({ ...slideForm, buttonLink: e.target.value })}
                    placeholder="/services"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E8E3] flex justify-end gap-3">
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
                  {editingIndex !== null ? "Update Slide" : "Add Slide"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
