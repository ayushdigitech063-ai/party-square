"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Wrench,
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Edit3,
  Upload,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  X
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchHomePageSection, updateHomePageSection, uploadImage } from "@/app/lib/api";

interface ServiceCard {
  id?: number | string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  link?: string;
}

interface ServicesData {
  badge?: string;
  description?: string;
  flagship: ServiceCard;
  otherServices: ServiceCard[];
  guarantees: string[];
}

const DEFAULT_DATA: ServicesData = {
  badge: "OUR SIGNATURE SERVICES",
  description:
    "We specialize in curating breathtaking, custom-tailored environments for all of life's most precious celebrations — seamlessly blending artistic vision with flawless execution.",
  flagship: {
    title: "Wedding Decoration",
    subtitle: "Make your big day magical with royal mandaps & floral setups",
    image: "/wedding.png",
    tag: "Royal Look & Grand Stages",
    link: "/services",
  },
  otherServices: [
    {
      id: 1,
      title: "Birthday Decoration",
      subtitle: "Celebrate in style with custom themes and balloon artistry",
      image: "/birthdaykids.png",
      tag: "Fun & Kids",
      link: "/services/birthday",
    },
    {
      id: 2,
      title: "Corporate Events",
      subtitle: "Professional, elegant setups for conferences and galas",
      image: "/coprateoffice.png",
      tag: "Business",
      link: "/services",
    },
    {
      id: 3,
      title: "Home Decoration",
      subtitle: "Beautiful spaces and festive makeovers with better vibes",
      image: "/homedecoration.png",
      tag: "Cozy Vibe",
      link: "/services/wall-decoration",
    },
  ],
  guarantees: [
    "100% Customized themes tailored to your unique preferences & budget.",
    "Premium fresh floral arrangements, luxury drapery & lighting effects.",
    "End-to-end on-site setup and professional event styling execution.",
  ],
};

export default function AdminServicesPage() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [title, setTitle] = useState("Our Signature Services");
  const [subtitle, setSubtitle] = useState("Decor for every occasion, beautifully done");
  const [content, setContent] = useState<ServicesData>(DEFAULT_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Uploading flagship state
  const [uploadingFlagship, setUploadingFlagship] = useState(false);

  // Other services modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [uploadingModal, setUploadingModal] = useState(false);
  const [formCard, setFormCard] = useState<ServiceCard>({
    title: "",
    subtitle: "",
    image: "",
    tag: "",
    link: "/services",
  });

  // Guarantee item temp text
  const [newGuarantee, setNewGuarantee] = useState("");

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const sec = await fetchHomePageSection<ServicesData>("services");
        if (sec) {
          setIsEnabled(sec.isEnabled ?? true);
          if (sec.title) setTitle(sec.title);
          if (sec.subtitle) setSubtitle(sec.subtitle);
          if (sec.contentData) {
            setContent({ ...DEFAULT_DATA, ...sec.contentData });
          }
        }
      } catch (err: any) {
        toast.error("Loaded default services");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const handleFlagshipUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFlagship(true);
    try {
      const res = await uploadImage(file);
      if (res?.url) {
        setContent((prev) => ({
          ...prev,
          flagship: { ...prev.flagship, image: res.url },
        }));
        toast.success("Flagship image uploaded!");
      }
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploadingFlagship(false);
    }
  };

  const handleOpenAddCard = () => {
    setEditingIndex(null);
    setFormCard({
      id: Date.now(),
      title: "",
      subtitle: "",
      image: "",
      tag: "Popular",
      link: "/services",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditCard = (index: number) => {
    setEditingIndex(index);
    setFormCard({ ...content.otherServices[index] });
    setIsModalOpen(true);
  };

  const handleModalUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingModal(true);
    try {
      const res = await uploadImage(file);
      if (res?.url) {
        setFormCard((prev) => ({ ...prev, image: res.url }));
        toast.success("Card image uploaded!");
      }
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploadingModal(false);
    }
  };

  const handleSaveModalCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCard.title || !formCard.image) {
      toast.error("Title and Image are required");
      return;
    }
    if (editingIndex !== null) {
      const updated = [...content.otherServices];
      updated[editingIndex] = formCard;
      setContent({ ...content, otherServices: updated });
    } else {
      setContent({
        ...content,
        otherServices: [...content.otherServices, { ...formCard, id: Date.now() }],
      });
    }
    setIsModalOpen(false);
  };

  const handleDeleteCard = (index: number) => {
    if (content.otherServices.length <= 1) {
      toast.error("At least one secondary service card is required");
      return;
    }
    setContent({
      ...content,
      otherServices: content.otherServices.filter((_, i) => i !== index),
    });
  };

  const handleAddGuarantee = () => {
    if (!newGuarantee.trim()) return;
    setContent({
      ...content,
      guarantees: [...(content.guarantees || []), newGuarantee.trim()],
    });
    setNewGuarantee("");
  };

  const handleDeleteGuarantee = (index: number) => {
    setContent({
      ...content,
      guarantees: content.guarantees.filter((_, i) => i !== index),
    });
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await updateHomePageSection("services", {
        title,
        subtitle,
        isEnabled,
        contentData: content,
      });
      toast.success("Signature Services saved to database!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save services");
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
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Wrench size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#111111]">
                Our Signature Services
              </h1>
              <p className="text-xs text-[#6B706C]">
                Flagship wedding card, occasion category tiles, and quality commitment guarantees.
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

      {/* Header and Left Column Setup */}
      <div className="bg-white border border-[#E8E8E3] rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
          Section Headings & Brand Story
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Badge Tag
            </label>
            <input
              type="text"
              value={content.badge || ""}
              onChange={(e) => setContent({ ...content, badge: e.target.value })}
              placeholder="OUR SIGNATURE SERVICES"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Main Heading
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Decor for every occasion, beautifully done"
              className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Description Paragraph
            </label>
            <textarea
              rows={2}
              value={content.description || ""}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              placeholder="We specialize in curating breathtaking, custom-tailored environments..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
            />
          </div>
        </div>

        {/* Guarantees checklist */}
        <div className="pt-3 border-t border-[#E8E8E3]">
          <label className="block text-xs font-semibold text-[#202522] mb-2">
            Quality Guarantees Checklist ({content.guarantees?.length || 0})
          </label>
          <div className="space-y-2 mb-3">
            {content.guarantees?.map((g, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 bg-neutral-50 px-3 py-2 rounded-lg border border-[#E8E8E3] text-xs text-[#202522]"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>{g}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteGuarantee(idx)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newGuarantee}
              onChange={(e) => setNewGuarantee(e.target.value)}
              placeholder="e.g. 100% Customized themes tailored to your unique preferences & budget."
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddGuarantee}
              className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-[#8CBC67] shrink-0"
            >
              Add Point
            </button>
          </div>
        </div>
      </div>

      {/* Flagship Wedding Card Setup */}
      <div className="bg-white border border-[#E8E8E3] rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
          Flagship Showcase Card (Large Top Card)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={content.flagship.title}
              onChange={(e) =>
                setContent({
                  ...content,
                  flagship: { ...content.flagship, title: e.target.value },
                })
              }
              placeholder="Wedding Decoration"
              className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Tag / Badge
            </label>
            <input
              type="text"
              value={content.flagship.tag}
              onChange={(e) =>
                setContent({
                  ...content,
                  flagship: { ...content.flagship, tag: e.target.value },
                })
              }
              placeholder="Royal Look & Grand Stages"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Subtitle
            </label>
            <input
              type="text"
              value={content.flagship.subtitle}
              onChange={(e) =>
                setContent({
                  ...content,
                  flagship: { ...content.flagship, subtitle: e.target.value },
                })
              }
              placeholder="Make your big day magical with royal mandaps & floral setups"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Image * (Cloudinary Upload or Path)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={content.flagship.image}
                onChange={(e) =>
                  setContent({
                    ...content,
                    flagship: { ...content.flagship, image: e.target.value },
                  })
                }
                placeholder="/wedding.png"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
              />
              <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-[#8CBC67] transition-all cursor-pointer shrink-0">
                <Upload size={13} />
                <span>{uploadingFlagship ? "Uploading..." : "Upload"}</span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingFlagship}
                  onChange={handleFlagshipUpload}
                  className="sr-only"
                />
              </label>
            </div>
            {content.flagship.image && (
              <div className="mt-2 w-40 h-24 rounded-xl overflow-hidden border border-[#E8E8E3]">
                <img
                  src={content.flagship.image}
                  alt="Flagship"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Service Cards List */}
      <div className="bg-white border border-[#E8E8E3] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E8E3]">
          <div>
            <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
              Secondary Service Tiles ({content.otherServices.length})
            </h3>
            <p className="text-xs text-[#6B706C]">
              Birthday, Corporate, Home decoration cards with photos & links.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAddCard}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-[#8CBC67] transition-all shadow-sm"
          >
            <Plus size={14} />
            <span>Add Service Card</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {content.otherServices.map((card, index) => (
            <div
              key={card.id || index}
              className="bg-neutral-50 border border-[#E8E8E3] rounded-2xl p-4 flex flex-col justify-between group hover:border-[#8CBC67] hover:bg-white transition-all shadow-sm"
            >
              <div>
                <div className="w-full h-32 rounded-xl overflow-hidden bg-neutral-100 border border-[#E8E8E3] mb-3 relative">
                  <img
                    src={card.image || "/homepage.png"}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {card.tag && (
                    <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {card.tag}
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-sm text-[#111111]">{card.title}</h4>
                <p className="text-xs text-[#6B706C] mt-1 line-clamp-2">{card.subtitle}</p>
              </div>

              <div className="pt-3 border-t border-[#E8E8E3] mt-3 flex items-center justify-between">
                <span className="text-[10px] text-[#8A8F8B] font-mono truncate max-w-[120px]">
                  {card.link}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEditCard(index)}
                    className="p-1 rounded bg-white border border-[#E8E8E3] hover:text-[#8CBC67]"
                    title="Edit"
                  >
                    <Edit3 size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCard(index)}
                    className="p-1 rounded bg-white border border-red-200 text-red-500 hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Add / Edit Secondary Card */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E8E8E3] max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E3]">
              <h3 className="text-base font-bold font-serif text-[#111111]">
                {editingIndex !== null ? "Edit Service Tile" : "Add Service Tile"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#6B706C] hover:text-black p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveModalCard} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={formCard.title}
                  onChange={(e) => setFormCard({ ...formCard, title: e.target.value })}
                  placeholder="e.g. Birthday Decoration"
                  className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                  Badge Tag (e.g. Fun & Kids, Business)
                </label>
                <input
                  type="text"
                  value={formCard.tag}
                  onChange={(e) => setFormCard({ ...formCard, tag: e.target.value })}
                  placeholder="Fun & Kids"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formCard.subtitle}
                  onChange={(e) => setFormCard({ ...formCard, subtitle: e.target.value })}
                  placeholder="Celebrate in style with custom themes and balloon artistry"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                  Image * (Cloudinary Upload or Path)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formCard.image}
                    onChange={(e) => setFormCard({ ...formCard, image: e.target.value })}
                    placeholder="/birthdaykids.png or https://..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-[#8CBC67] transition-all cursor-pointer shrink-0">
                    <Upload size={13} />
                    <span>{uploadingModal ? "Uploading..." : "Upload"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingModal}
                      onChange={handleModalUpload}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                  Target Link URL
                </label>
                <input
                  type="text"
                  value={formCard.link || ""}
                  onChange={(e) => setFormCard({ ...formCard, link: e.target.value })}
                  placeholder="/services/birthday"
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
                  {editingIndex !== null ? "Update Tile" : "Add Tile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
