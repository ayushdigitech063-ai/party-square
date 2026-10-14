"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart3,
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Edit3,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  X
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchHomePageSection, updateHomePageSection } from "@/app/lib/api";

interface StatItem {
  id?: number | string;
  label: string;
  value: string;
  caption: string;
}

interface StatsData {
  topLabel?: string;
  heading?: string;
  stats: StatItem[];
}

const DEFAULT_DATA: StatsData = {
  topLabel: "Trusted since 2020",
  heading: "Event partner for 10,000+ celebrations",
  stats: [
    { id: 1, label: "Celebrations", value: "10,000+", caption: "Happy events decorated" },
    { id: 2, label: "Rating", value: "4.8 / 5", caption: "from 2,000+ customer reviews" },
    { id: 3, label: "Community", value: "50K+", caption: "followers on social media" },
    { id: 4, label: "Promise", value: "On-time Setup", caption: "Verified decorators, fixed pricing" },
  ],
};

export default function AdminStatsPage() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [topLabel, setTopLabel] = useState(DEFAULT_DATA.topLabel || "Trusted since 2020");
  const [heading, setHeading] = useState(DEFAULT_DATA.heading || "Event partner for 10,000+ celebrations");
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_DATA.stats);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Modal for Stat
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formStat, setFormStat] = useState<StatItem>({
    label: "",
    value: "",
    caption: "",
  });

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const sec = await fetchHomePageSection<StatsData>("stats");
        if (sec) {
          setIsEnabled(sec.isEnabled ?? true);
          if (sec.contentData) {
            if (sec.contentData.topLabel) setTopLabel(sec.contentData.topLabel);
            if (sec.contentData.heading) setHeading(sec.contentData.heading);
            if (Array.isArray(sec.contentData.stats) && sec.contentData.stats.length > 0) {
              setStats(sec.contentData.stats);
            }
          }
        }
      } catch (err: any) {
        toast.error("Loaded default stats");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setFormStat({
      id: Date.now(),
      label: "",
      value: "",
      caption: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (index: number) => {
    setEditingIndex(index);
    setFormStat({ ...stats[index] });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formStat.label || !formStat.value) {
      toast.error("Label and Value are required");
      return;
    }
    if (editingIndex !== null) {
      const updated = [...stats];
      updated[editingIndex] = formStat;
      setStats(updated);
    } else {
      setStats([...stats, { ...formStat, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (index: number) => {
    if (stats.length <= 1) {
      toast.error("At least one stat is required");
      return;
    }
    setStats(stats.filter((_, i) => i !== index));
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await updateHomePageSection("stats", {
        title: "Trusted Stats & Milestones",
        subtitle: heading,
        isEnabled,
        contentData: {
          topLabel,
          heading,
          stats,
        },
      });
      toast.success("Trusted Stats & USP Bar saved successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save stats");
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
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <BarChart3 size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#111111]">
                Trusted Stats & USP Bar
              </h1>
              <p className="text-xs text-[#6B706C]">
                Proof milestones counter: 10,000+ celebrations, 4.8 star rating, verified decorators.
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
          Top Header Labels
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Small Top Tagline
            </label>
            <input
              type="text"
              value={topLabel}
              onChange={(e) => setTopLabel(e.target.value)}
              placeholder="Trusted since 2020"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#202522] mb-1.5">
              Main Section Heading
            </label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Event partner for 10,000+ celebrations"
              className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Milestones Cards */}
      <div className="bg-white border border-[#E8E8E3] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E8E3]">
          <div>
            <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
              Stat Milestone Columns ({stats.length})
            </h3>
            <p className="text-xs text-[#6B706C]">
              Grid blocks highlighting credibility numbers, star rating, and customer guarantees.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-[#8CBC67] transition-all shadow-sm"
          >
            <Plus size={14} />
            <span>Add Stat Column</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((st, index) => (
            <div
              key={st.id || index}
              className="bg-neutral-50 border border-[#E8E8E3] rounded-2xl p-5 flex flex-col justify-between group hover:border-[#8CBC67] hover:bg-white transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                    {st.label}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(index)}
                      className="p-1 rounded bg-white border border-[#E8E8E3] hover:text-[#8CBC67]"
                      title="Edit"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="p-1 rounded bg-white border border-red-200 text-red-500 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <p className="text-3xl font-serif font-bold text-[#111111]">{st.value}</p>
                <p className="text-xs text-[#6B706C] mt-1.5">{st.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Stat */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E8E8E3] max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E3]">
              <h3 className="text-base font-bold font-serif text-[#111111]">
                {editingIndex !== null ? "Edit Stat Card" : "Add Stat Card"}
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
                  Category / Label *
                </label>
                <input
                  type="text"
                  required
                  value={formStat.label}
                  onChange={(e) => setFormStat({ ...formStat, label: e.target.value })}
                  placeholder="e.g. Celebrations or Rating"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none font-semibold uppercase tracking-wider"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                  Value Highlight *
                </label>
                <input
                  type="text"
                  required
                  value={formStat.value}
                  onChange={(e) => setFormStat({ ...formStat, value: e.target.value })}
                  placeholder="e.g. 10,000+ or 4.8 / 5"
                  className="w-full px-3.5 py-2 text-base font-bold rounded-xl border border-[#E8E8E3] bg-neutral-50 focus:bg-white focus:border-[#8CBC67] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202522] mb-1.5">
                  Caption / Subtitle
                </label>
                <input
                  type="text"
                  value={formStat.caption}
                  onChange={(e) => setFormStat({ ...formStat, caption: e.target.value })}
                  placeholder="e.g. Happy events decorated"
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
                  {editingIndex !== null ? "Update Stat" : "Add Stat"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
