"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Edit3,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  X
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchHomePageSection, updateHomePageSection } from "@/app/lib/api";

interface FAQItem {
  id?: number | string;
  question: string;
  answer: string;
}

interface FAQData {
  badge?: string;
  heading?: string;
  description?: string;
  items: FAQItem[];
}

const DEFAULT_DATA: FAQData = {
  badge: "Frequently Asked Questions",
  heading: "Everything You Need to Know",
  description:
    "Find answers to the most common questions about our decorations, bookings, customization, and celebrations.",
  items: [
    {
      question: "How much in advance should I book my decoration?",
      answer:
        "We recommend booking at least 24 to 48 hours in advance for home and birthday setups. For grand weddings and stage setups, booking 1 to 2 weeks prior ensures all custom props and fresh florals are reserved.",
    },
    {
      question: "Can I pay 50% advance and the remaining after setup?",
      answer:
        "Yes! Party Square offers a convenient 50% advance booking option. You only pay 50% online to confirm your date and slot, and the remaining 50% can be paid after our decorators complete the setup at your venue.",
    },
    {
      question: "Do you provide on-site decoration at my home / venue?",
      answer:
        "Absolutely. Our professional decoration team visits your home, banquet hall, or outdoor venue with all equipment, balloons, fairy lights, and materials, completing the full setup 1-2 hours before your event begins.",
    },
    {
      question: "Can I customize the colors, names, or neon sign?",
      answer:
        "Yes, all our packages are 100% customizable. You can request custom name cutouts, LED neon numbers/letters, and your preferred color palette during checkout or by WhatsApping our support team.",
    },
    {
      question: "What happens in case of cancellation or date rescheduling?",
      answer:
        "You can reschedule your event date free of charge up to 24 hours before the setup time. For cancellations, refunds are processed according to our flexible cancellation policy.",
    },
  ],
};

export default function AdminFAQsPage() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [badge, setBadge] = useState(DEFAULT_DATA.badge || "Frequently Asked Questions");
  const [heading, setHeading] = useState(DEFAULT_DATA.heading || "Everything You Need to Know");
  const [description, setDescription] = useState(DEFAULT_DATA.description || "");
  const [items, setItems] = useState<FAQItem[]>(DEFAULT_DATA.items);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formFAQ, setFormFAQ] = useState<FAQItem>({
    question: "",
    answer: "",
  });

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const sec = await fetchHomePageSection<FAQData>("faqs");
        if (sec) {
          setIsEnabled(sec.isEnabled ?? true);
          if (sec.contentData) {
            if (sec.contentData.badge) setBadge(sec.contentData.badge);
            if (sec.contentData.heading) setHeading(sec.contentData.heading);
            if (sec.contentData.description) setDescription(sec.contentData.description);
            if (Array.isArray(sec.contentData.items) && sec.contentData.items.length > 0) {
              setItems(sec.contentData.items);
            }
          }
        }
      } catch (err: any) {
        toast.error("Loaded default FAQs");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setFormFAQ({
      id: Date.now(),
      question: "",
      answer: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (index: number) => {
    setEditingIndex(index);
    setFormFAQ({ ...items[index] });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFAQ.question.trim() || !formFAQ.answer.trim()) {
      toast.error("Question and Answer are required");
      return;
    }
    if (editingIndex !== null) {
      const updated = [...items];
      updated[editingIndex] = formFAQ;
      setItems(updated);
    } else {
      setItems([...items, { ...formFAQ, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (index: number) => {
    if (items.length <= 1) {
      toast.error("At least one FAQ is required");
      return;
    }
    setItems(items.filter((_, i) => i !== index));
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
      await updateHomePageSection("faqs", {
        title: "Frequently Asked Questions",
        subtitle: heading,
        isEnabled,
        contentData: {
          badge,
          heading,
          description,
          items,
        },
      });
      toast.success("FAQ Section saved successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save FAQs");
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
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
              <HelpCircle size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#111111]">
                FAQ Section Manager
              </h1>
              <p className="text-xs text-[#6B706C]">
                Interactive accordion questions & answers answering common customer concerns.
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

      {/* Headings */}
      <div className="bg-white border border-[#E8E8E3] rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
          Section Header Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Badge Text
            </label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="Frequently Asked Questions"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Main Heading
            </label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Everything You Need to Know"
              className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Description Paragraph
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Find answers to the most common questions about our decorations..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* FAQs List */}
      <div className="bg-white border border-[#E8E8E3] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E8E3]">
          <div>
            <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
              FAQ Questions & Answers ({items.length})
            </h3>
            <p className="text-xs text-[#6B706C]">
              Reorder, edit answers, or add new questions customers frequently ask.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-[#8CBC67] transition-all shadow-sm"
          >
            <Plus size={14} />
            <span>Add Question</span>
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-neutral-50 border border-[#E8E8E3] rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:border-[#8CBC67] hover:bg-white transition-all shadow-sm"
            >
              <div className="flex items-start gap-3.5 flex-1">
                <span className="w-7 h-7 rounded-full bg-white border border-[#E8E8E3] text-[#8CBC67] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  {index + 1}
                </span>
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm text-[#111111]">
                    {item.question}
                  </h4>
                  <p className="text-xs text-[#6B706C] line-clamp-2 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-end md:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => handleMove(index, "up")}
                  disabled={index === 0}
                  className="p-1.5 rounded border border-[#E8E8E3] text-[#6B706C] hover:text-[#8CBC67] disabled:opacity-20"
                  title="Move up"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, "down")}
                  disabled={index === items.length - 1}
                  className="p-1.5 rounded border border-[#E8E8E3] text-[#6B706C] hover:text-[#8CBC67] disabled:opacity-20"
                  title="Move down"
                >
                  <ArrowDown size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(index)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#E8E8E3] bg-white text-xs font-semibold text-[#202522] hover:border-[#8CBC67] hover:text-[#8CBC67]"
                >
                  <Edit3 size={13} />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="p-1.5 rounded border border-red-200 text-red-500 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Add / Edit FAQ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E8E8E3] max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E3]">
              <h3 className="text-base font-bold font-serif text-[#111111]">
                {editingIndex !== null ? `Edit Question #${editingIndex + 1}` : "Add FAQ Question"}
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
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={formFAQ.question}
                  onChange={(e) => setFormFAQ({ ...formFAQ, question: e.target.value })}
                  placeholder="e.g. Can I pay 50% advance and the remaining after setup?"
                  className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                  Detailed Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formFAQ.answer}
                  onChange={(e) => setFormFAQ({ ...formFAQ, answer: e.target.value })}
                  placeholder="Provide clear, reassuring information for customers..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
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
                  {editingIndex !== null ? "Update Question" : "Add Question"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
