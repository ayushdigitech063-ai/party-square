"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  MapPin,
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Star,
  RefreshCw,
  X,
  Globe,
  FileText,
  HelpCircle,
  Tag,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchCities,
  createCity,
  updateCity,
  deleteCity,
  CityItem,
  CityFaq
} from "@/app/lib/api";

export default function AdminCitiesPage() {
  const [cities, setCities] = useState<CityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "popular" | "seo-ready">("all");

  // Add / Quick Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<CityItem | null>(null);
  const [formName, setFormName] = useState("");
  const [formState, setFormState] = useState("");
  const [formOrder, setFormOrder] = useState<number>(0);
  const [formIsActive, setFormIsActive] = useState<boolean>(true);
  const [formIsPopular, setFormIsPopular] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);

  // SEO & Content Modal State
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [seoCity, setSeoCity] = useState<CityItem | null>(null);
  const [seoTab, setSeoTab] = useState<"meta" | "content" | "areas" | "faqs">("meta");
  const [seoSlug, setSeoSlug] = useState("");
  const [seoMetaTitle, setSeoMetaTitle] = useState("");
  const [seoMetaDescription, setSeoMetaDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [seoHeading, setSeoHeading] = useState("");
  const [seoSubheading, setSeoSubheading] = useState("");
  const [seoContent, setSeoContent] = useState("");
  const [seoServiceAreas, setSeoServiceAreas] = useState("");
  const [seoFaqs, setSeoFaqs] = useState<CityFaq[]>([]);
  const [savingSeo, setSavingSeo] = useState(false);

  // Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState<CityItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadCities = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchCities(true);
      setCities(Array.isArray(data) ? data : []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load cities");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCities();
  }, [loadCities]);

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingCity(null);
    setFormName("");
    setFormState("");
    setFormOrder(cities.length);
    setFormIsActive(true);
    setFormIsPopular(false);
    setIsModalOpen(true);
  };

  // Open modal for Quick Edit
  const handleOpenEdit = (city: CityItem) => {
    setEditingCity(city);
    setFormName(city.name);
    setFormState(city.state || "");
    setFormOrder(city.order ?? 0);
    setFormIsActive(city.isActive);
    setFormIsPopular(city.isPopular);
    setIsModalOpen(true);
  };

  // Open modal for SEO & Content Manager
  const handleOpenSeo = (city: CityItem) => {
    setSeoCity(city);
    setSeoTab("meta");
    setSeoSlug(city.slug || city.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
    setSeoMetaTitle(city.metaTitle || `Best Balloon & Event Decoration in ${city.name} | Party Square`);
    setSeoMetaDescription(
      city.metaDescription ||
        `Book verified balloon decorators, birthday setups, and custom celebration decor in ${city.name}. Same-day booking with 100% on-time guarantee.`
    );
    setSeoKeywords(
      Array.isArray(city.keywords) && city.keywords.length > 0
        ? city.keywords.join(", ")
        : `birthday decoration in ${city.name.toLowerCase()}, balloon decorators ${city.name.toLowerCase()}, party decor ${city.name.toLowerCase()}`
    );
    setSeoHeading(city.heading || `Best Birthday & Celebration Decoration in ${city.name}`);
    setSeoSubheading(
      city.subheading || `Premium balloon decor, anniversary setups & theme parties delivered across ${city.name}.`
    );
    setSeoContent(
      city.content ||
        `Looking for professional party and balloon decorators in ${city.name}? Party Square brings you stunning balloon arches, neon backdrops, theme birthday setups, and romantic room decor directly to your doorstep. Our verified decorators in ${city.name} ensure quick 2-hour setups, high-grade metallic balloons, and 100% on-time execution for birthdays, anniversaries, baby showers, and festive occasions.`
    );
    setSeoServiceAreas(
      Array.isArray(city.serviceAreas) && city.serviceAreas.length > 0
        ? city.serviceAreas.join(", ")
        : `Central ${city.name}, North ${city.name}, South ${city.name}, East ${city.name}, West ${city.name}`
    );
    setSeoFaqs(
      Array.isArray(city.faqs) && city.faqs.length > 0
        ? city.faqs
        : [
            {
              question: `How early should I book decoration services in ${city.name}?`,
              answer: `We recommend booking at least 24 hours in advance. However, same-day and urgent 3-hour decoration slots are also available across ${city.name} based on availability.`,
            },
            {
              question: `Do decorators in ${city.name} bring their own setup materials and ladder?`,
              answer: `Yes, our certified decorators carry all required materials, balloon pumps, ribbons, removable non-marking tape, and setup gear. You don't need to provide anything.`,
            },
            {
              question: `Can I customize the balloon theme or colors for my event in ${city.name}?`,
              answer: `Absolutely! All our packages can be customized with your choice of color palette, personalized neon signs, foil numbers, and bespoke themes.`,
            },
          ]
    );
    setIsSeoModalOpen(true);
  };

  // Submit Quick Add/Edit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      toast.error("City name is required");
      return;
    }

    setSubmitting(true);
    try {
      const payload: Partial<CityItem> = {
        name: formName.trim(),
        state: formState.trim(),
        order: Number(formOrder) || 0,
        isActive: formIsActive,
        isPopular: formIsPopular,
      };

      if (editingCity?._id) {
        await updateCity(editingCity._id, payload);
        toast.success(`City "${formName}" updated successfully!`);
      } else {
        await createCity(payload);
        toast.success(`City "${formName}" added successfully!`);
      }

      setIsModalOpen(false);
      loadCities();
    } catch (err: any) {
      toast.error(err.message || "Failed to save city");
    } finally {
      setSubmitting(false);
    }
  };

  // Submit SEO & Content Form
  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seoCity?._id) return;

    setSavingSeo(true);
    try {
      const parsedKeywords = seoKeywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);

      const parsedAreas = seoServiceAreas
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);

      const validFaqs = seoFaqs.filter((f) => f.question.trim() && f.answer.trim());

      const payload: Partial<CityItem> = {
        slug: seoSlug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        metaTitle: seoMetaTitle.trim(),
        metaDescription: seoMetaDescription.trim(),
        keywords: parsedKeywords,
        heading: seoHeading.trim(),
        subheading: seoSubheading.trim(),
        content: seoContent.trim(),
        serviceAreas: parsedAreas,
        faqs: validFaqs,
      };

      await updateCity(seoCity._id, payload);
      toast.success(`SEO & Content settings for "${seoCity.name}" saved! Google crawler updated.`);
      setIsSeoModalOpen(false);
      loadCities();
    } catch (err: any) {
      toast.error(err.message || "Failed to save SEO settings");
    } finally {
      setSavingSeo(false);
    }
  };

  // Add FAQ Item
  const handleAddFaq = () => {
    setSeoFaqs((prev) => [
      ...prev,
      { question: "", answer: "" }
    ]);
  };

  // Remove FAQ Item
  const handleRemoveFaq = (index: number) => {
    setSeoFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  // Update FAQ Item
  const handleFaqChange = (index: number, field: "question" | "answer", val: string) => {
    setSeoFaqs((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  // Quick toggle Active/Inactive
  const handleToggleActive = async (city: CityItem) => {
    try {
      const updated = !city.isActive;
      await updateCity(city._id, { isActive: updated });
      toast.success(`${city.name} is now ${updated ? "Active" : "Inactive"}`);
      setCities((prev) =>
        prev.map((c) => (c._id === city._id ? { ...c, isActive: updated } : c))
      );
    } catch (err: any) {
      toast.error(err.message || "Failed to update city status");
    }
  };

  // Quick toggle Popular
  const handleTogglePopular = async (city: CityItem) => {
    try {
      const updated = !city.isPopular;
      await updateCity(city._id, { isPopular: updated });
      toast.success(`${city.name} is ${updated ? "now marked as Popular" : "unmarked as Popular"}`);
      setCities((prev) =>
        prev.map((c) => (c._id === city._id ? { ...c, isPopular: updated } : c))
      );
    } catch (err: any) {
      toast.error(err.message || "Failed to update popular status");
    }
  };

  // Delete City
  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteCity(deleteTarget._id);
      toast.success(`City "${deleteTarget.name}" deleted successfully`);
      setDeleteTarget(null);
      loadCities();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete city");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered cities
  const filteredCities = cities.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.state && c.state.toLowerCase().includes(search.toLowerCase())) ||
      (c.slug && c.slug.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    if (statusFilter === "active") return c.isActive;
    if (statusFilter === "inactive") return !c.isActive;
    if (statusFilter === "popular") return c.isPopular;
    if (statusFilter === "seo-ready") return Boolean(c.metaTitle && c.metaTitle.trim());

    return true;
  });

  const totalCount = cities.length;
  const activeCount = cities.filter((c) => c.isActive).length;
  const popularCount = cities.filter((c) => c.isPopular).length;
  const seoConfiguredCount = cities.filter((c) => Boolean(c.metaTitle && c.metaTitle.trim())).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522]">
              Cities & Local SEO Manager
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EEF6EB] text-[#558234] border border-[#8CBC67]/30">
              CMS Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#6B706C] mt-1">
            Manage serviceable locations, on-page SEO keywords, Google meta tags, local content & rich FAQ schema.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={loadCities}
            className="inline-flex items-center space-x-2 px-3 py-2.5 rounded-2xl border border-[#E8E8E3] bg-white hover:bg-neutral-50 text-xs font-semibold text-[#202522] shadow-xs cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw size={14} className={loading ? "animate-spin text-[#8CBC67]" : ""} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-[#8CBC67] hover:bg-[#7AB055] text-white text-xs font-bold transition shadow-sm cursor-pointer"
          >
            <Plus size={16} />
            <span>Add City</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#E8E8E3] shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#6B706C]">Total Cities</p>
          <p className="text-2xl font-bold text-[#202522] mt-1">{totalCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#EEF6EB]/60 border border-[#8CBC67]/30 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Active Serviceable</p>
          <p className="text-2xl font-bold text-emerald-900 mt-1">{activeCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-800">SEO Configured</p>
            <Sparkles size={14} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-950 mt-1">{seoConfiguredCount} / {totalCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Popular / Featured</p>
          <p className="text-2xl font-bold text-amber-900 mt-1">{popularCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#E8E8E3] shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B706C]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by city name, state, or slug..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs text-[#202522] focus:outline-none focus:border-[#8CBC67]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: "all", label: `All (${totalCount})` },
            { id: "active", label: `Active (${activeCount})` },
            { id: "seo-ready", label: `SEO Ready (${seoConfiguredCount})` },
            { id: "popular", label: `Popular (${popularCount})` },
            { id: "inactive", label: `Inactive (${totalCount - activeCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-[#8CBC67] text-white shadow-xs"
                  : "bg-neutral-100 hover:bg-neutral-200 text-[#6B706C]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cities Table */}
      <div className="rounded-3xl bg-white border border-[#E8E8E3] shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-20 text-center space-y-3">
            <Loader2 size={32} className="animate-spin mx-auto text-[#8CBC67]" />
            <p className="text-xs text-[#6B706C]">Loading serviceable cities & SEO statuses...</p>
          </div>
        ) : filteredCities.length === 0 ? (
          <div className="p-20 text-center space-y-4">
            <MapPin size={40} className="mx-auto text-[#6B706C] opacity-40" />
            <h3 className="font-serif text-lg font-bold text-[#202522]">No cities found</h3>
            <p className="text-xs text-[#6B706C] max-w-sm mx-auto">
              No cities matched your search or status filter.
            </p>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-[#8CBC67] text-white text-xs font-bold cursor-pointer"
            >
              <Plus size={14} />
              <span>Add First City</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E8E8E3] bg-[#FCFBF7] text-[#6B706C] uppercase font-bold tracking-wider">
                  <th className="py-4 px-6">City & Slug</th>
                  <th className="py-4 px-6">State</th>
                  <th className="py-4 px-6 text-center">Google SEO Status</th>
                  <th className="py-4 px-6 text-center">Display Order</th>
                  <th className="py-4 px-6 text-center">Popular</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E3]">
                {filteredCities.map((city) => {
                  const hasCustomSeo = Boolean(city.metaTitle && city.metaTitle.trim());
                  const faqCount = city.faqs?.length || 0;

                  return (
                    <tr key={city._id} className="hover:bg-neutral-50/70 transition">
                      {/* City Name & Slug */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-[#EEF6EB] text-[#8CBC67] flex items-center justify-center font-bold">
                            <MapPin size={17} />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-[#202522]">{city.name}</p>
                            <p className="text-[11px] font-mono text-[#6B706C]">/{city.slug || city.name.toLowerCase()}</p>
                          </div>
                        </div>
                      </td>

                      {/* State */}
                      <td className="py-4 px-6 text-[#6B706C] font-medium">
                        {city.state || "—"}
                      </td>

                      {/* SEO Status & Quick Edit */}
                      <td className="py-4 px-6 text-center">
                        <button
                          type="button"
                          onClick={() => handleOpenSeo(city)}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition shadow-xs cursor-pointer ${
                            hasCustomSeo
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                              : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
                          }`}
                          title="Click to edit City SEO, Keywords, Content & FAQs"
                        >
                          <Globe size={13} className={hasCustomSeo ? "text-emerald-600" : "text-amber-600"} />
                          <span>{hasCustomSeo ? `SEO Ready (${faqCount} FAQs)` : "Configure SEO"}</span>
                        </button>
                      </td>

                      {/* Order */}
                      <td className="py-4 px-6 text-center font-mono font-semibold text-neutral-700">
                        #{city.order ?? 0}
                      </td>

                      {/* Popular Badge Toggle */}
                      <td className="py-4 px-6 text-center">
                        <button
                          type="button"
                          onClick={() => handleTogglePopular(city)}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                            city.isPopular
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                              : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                          }`}
                          title="Click to toggle popular status"
                        >
                          <Star size={12} className={city.isPopular ? "fill-amber-600 text-amber-600" : ""} />
                          <span>{city.isPopular ? "Popular" : "Standard"}</span>
                        </button>
                      </td>

                      {/* Service Status Toggle */}
                      <td className="py-4 px-6 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(city)}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                            city.isActive
                              ? "bg-[#EEF6EB] text-emerald-800 hover:bg-emerald-100"
                              : "bg-red-50 text-red-700 hover:bg-red-100"
                          }`}
                          title="Click to toggle live status"
                        >
                          {city.isActive ? (
                            <>
                              <CheckCircle size={13} className="text-emerald-600" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <XCircle size={13} className="text-red-500" />
                              <span>Inactive</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => handleOpenSeo(city)}
                            className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-[#FCFBF7] border border-[#E8E8E3] text-[#202522] hover:bg-[#EEF6EB] hover:text-[#558234] transition text-xs font-semibold cursor-pointer"
                            title="Manage SEO, Content & FAQs"
                          >
                            <Globe size={13} />
                            <span>SEO</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenEdit(city)}
                            className="p-2 rounded-xl text-neutral-600 hover:text-[#8CBC67] hover:bg-neutral-100 transition cursor-pointer"
                            title="Edit City"
                          >
                            <Edit2 size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteTarget(city)}
                            className="p-2 rounded-xl text-neutral-600 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            title="Delete City"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =======================================================
          CITY SEO, KEYWORDS & CONTENT MANAGER MODAL
      ======================================================== */}
      {isSeoModalOpen && seoCity && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-neutral-100 overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-[#FCFBF7]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EEF6EB] flex items-center justify-center text-[#8CBC67]">
                  <Globe size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#202522]">
                      SEO & Content Engine: {seoCity.name}
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-800">
                      /{seoSlug || seoCity.name.toLowerCase()}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B706C]">
                    Customize meta tags, target keywords, local headings & rich FAQ schema. Updates Google instantly!
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSeoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#E8E8E3] hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="px-6 border-b border-neutral-200 bg-white flex items-center space-x-2 overflow-x-auto">
              {[
                { id: "meta", label: "Google SERP & Meta", icon: Globe },
                { id: "content", label: "On-Page Headings & Content", icon: FileText },
                { id: "areas", label: "Coverage Areas", icon: Tag },
                { id: "faqs", label: `FAQs & Schema (${seoFaqs.length})`, icon: HelpCircle },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = seoTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSeoTab(tab.id as any)}
                    className={`inline-flex items-center space-x-2 py-3 px-3.5 border-b-2 text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "border-[#8CBC67] text-[#202522]"
                        : "border-transparent text-[#6B706C] hover:text-[#202522]"
                    }`}
                  >
                    <Icon size={14} className={isActive ? "text-[#8CBC67]" : ""} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Body / Scrollable Form */}
            <form onSubmit={handleSaveSeo} className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* TAB 1: GOOGLE SERP & META TAGS */}
              {seoTab === "meta" && (
                <div className="space-y-5">
                  {/* Google Search Live Preview Card */}
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                    <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-2">
                      Live Google Search Snippet Preview
                    </p>
                    <div className="bg-white p-3.5 rounded-xl border border-neutral-200/80 shadow-xs space-y-1">
                      <div className="flex items-center space-x-1.5 text-[11px] text-[#202124]">
                        <span className="font-semibold">Party Square</span>
                        <span className="text-neutral-400">›</span>
                        <span className="text-neutral-600 font-mono text-[10px]">
                          https://partysquare.in/{seoSlug || "delhi"}
                        </span>
                      </div>
                      <h4 className="text-blue-800 hover:underline text-sm font-medium line-clamp-1 cursor-pointer">
                        {seoMetaTitle || `Best Balloon & Birthday Decoration in ${seoCity.name} | Party Square`}
                      </h4>
                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {seoMetaDescription ||
                          `Book top-rated balloon decorators, birthday setups, and celebration decor in ${seoCity.name}. 100% on-time guarantee.`}
                      </p>
                    </div>
                  </div>

                  {/* URL Slug */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      URL Slug <span className="text-neutral-400 font-normal">(Lowercase, hyphenated)</span>
                    </label>
                    <div className="flex items-center">
                      <span className="px-3 py-2.5 rounded-l-xl border border-r-0 border-neutral-200 bg-neutral-100 text-xs text-neutral-500 font-mono">
                        partysquare.in/
                      </span>
                      <input
                        type="text"
                        required
                        value={seoSlug}
                        onChange={(e) => setSeoSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                        placeholder="e.g. delhi, mumbai, south-delhi"
                        className="flex-1 px-3.5 py-2.5 rounded-r-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 font-mono focus:outline-none focus:border-[#8CBC67]"
                      />
                    </div>
                  </div>

                  {/* Meta Title */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-neutral-800">
                        Meta Title <span className="text-red-500">*</span>
                      </label>
                      <span
                        className={`text-[10px] font-mono font-semibold ${
                          seoMetaTitle.length >= 50 && seoMetaTitle.length <= 60
                            ? "text-emerald-600"
                            : seoMetaTitle.length > 60
                            ? "text-amber-600"
                            : "text-neutral-400"
                        }`}
                      >
                        {seoMetaTitle.length}/60 chars (Recommended: 50-60)
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      value={seoMetaTitle}
                      onChange={(e) => setSeoMetaTitle(e.target.value)}
                      placeholder={`e.g. Best Balloon & Birthday Decoration in ${seoCity.name} | Party Square`}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                    />
                  </div>

                  {/* Meta Description */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-neutral-800">
                        Meta Description <span className="text-red-500">*</span>
                      </label>
                      <span
                        className={`text-[10px] font-mono font-semibold ${
                          seoMetaDescription.length >= 140 && seoMetaDescription.length <= 160
                            ? "text-emerald-600"
                            : seoMetaDescription.length > 160
                            ? "text-amber-600"
                            : "text-neutral-400"
                        }`}
                      >
                        {seoMetaDescription.length}/160 chars (Recommended: 140-160)
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      required
                      value={seoMetaDescription}
                      onChange={(e) => setSeoMetaDescription(e.target.value)}
                      placeholder={`e.g. Book verified balloon decorators, birthday setups, and custom celebration decor in ${seoCity.name}. Same-day booking with 100% on-time guarantee.`}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                    />
                  </div>

                  {/* Focus Keywords */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Focus Target Keywords <span className="text-neutral-400 font-normal">(Comma separated)</span>
                    </label>
                    <input
                      type="text"
                      value={seoKeywords}
                      onChange={(e) => setSeoKeywords(e.target.value)}
                      placeholder="e.g. birthday decoration delhi, balloon decorator delhi, room decoration delhi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                    />
                    <p className="text-[10px] text-neutral-400 mt-1">
                      Separate each keyword with a comma. These are indexed for localized search ranking.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: ON-PAGE HEADINGS & LOCAL CONTENT */}
              {seoTab === "content" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Main Page Heading (H1) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={seoHeading}
                      onChange={(e) => setSeoHeading(e.target.value)}
                      placeholder={`e.g. Best Birthday & Celebration Decoration in ${seoCity.name}`}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Subheading / Tagline
                    </label>
                    <input
                      type="text"
                      value={seoSubheading}
                      onChange={(e) => setSeoSubheading(e.target.value)}
                      placeholder={`e.g. Premium balloon decor, anniversary setups & theme parties delivered across ${seoCity.name}.`}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Localized Content & Area Narrative <span className="text-neutral-400 font-normal">(Crucial for Google Ranking)</span>
                    </label>
                    <textarea
                      rows={7}
                      value={seoContent}
                      onChange={(e) => setSeoContent(e.target.value)}
                      placeholder={`Describe services in ${seoCity.name}, mention local landmarks, delivery speed, setup guarantees, and balloon quality...`}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67] leading-relaxed"
                    />
                    <p className="text-[10px] text-neutral-400 mt-1">
                      Tip: Mention popular neighborhoods, 2-hour doorstep service, and why users in {seoCity.name} choose Party Square.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: COVERAGE AREAS */}
              {seoTab === "areas" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Service Localities & Neighborhoods <span className="text-neutral-400 font-normal">(Comma separated)</span>
                    </label>
                    <textarea
                      rows={4}
                      value={seoServiceAreas}
                      onChange={(e) => setSeoServiceAreas(e.target.value)}
                      placeholder="e.g. Connaught Place, Saket, Dwarka, Rohini, Vasant Kunj, Hauz Khas, Janakpuri, Lajpat Nagar..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                    />
                    <p className="text-[10px] text-neutral-400 mt-1">
                      These areas appear as clickable location tags on the city landing page, signaling local relevance to Google.
                    </p>
                  </div>

                  {/* Render Area Pills Preview */}
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                    <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-2">
                      Live Area Tags Preview
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {seoServiceAreas
                        .split(",")
                        .map((a) => a.trim())
                        .filter(Boolean)
                        .map((area, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-[11px] font-medium text-neutral-700 shadow-2xs"
                          >
                            <MapPin size={10} className="mr-1 text-[#8CBC67]" />
                            {area}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: FAQS & GOOGLE SCHEMA */}
              {seoTab === "faqs" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-neutral-800">
                        City-Specific FAQs
                      </h4>
                      <p className="text-[10px] text-neutral-500">
                        Automatically generated as official FAQPage JSON-LD Schema for Google Rich Snippets!
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddFaq}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#8CBC67] text-white text-xs font-bold hover:bg-[#7AB055] transition cursor-pointer"
                    >
                      <Plus size={13} />
                      <span>Add FAQ</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {seoFaqs.map((faq, index) => (
                      <div
                        key={index}
                        className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 relative group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#8CBC67] uppercase tracking-wider font-mono">
                            Question #{index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFaq(index)}
                            className="text-neutral-400 hover:text-red-500 p-1 transition cursor-pointer"
                            title="Delete FAQ"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                          placeholder="e.g. Can you decorate within 2 hours in Delhi?"
                          className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-900 font-semibold focus:outline-none focus:border-[#8CBC67]"
                        />

                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                          placeholder="e.g. Yes, we have express decorators stationed across Delhi for urgent setups."
                          className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-700 focus:outline-none focus:border-[#8CBC67]"
                        />
                      </div>
                    ))}

                    {seoFaqs.length === 0 && (
                      <div className="p-8 text-center rounded-2xl border border-dashed border-neutral-200 text-neutral-500 text-xs">
                        No FAQs added yet. Click &ldquo;Add FAQ&rdquo; above to boost Google Rich Snippet ranking.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <p className="text-[10px] text-neutral-400">
                  Changes take effect immediately on next Google crawl or page refresh.
                </p>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsSeoModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-100 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingSeo}
                    className="px-6 py-2.5 rounded-2xl bg-[#8CBC67] hover:bg-[#7AB055] text-white text-xs font-bold transition shadow-sm disabled:opacity-50 flex items-center space-x-1.5 cursor-pointer"
                  >
                    {savingSeo && <Loader2 size={13} className="animate-spin" />}
                    <span>Save & Publish SEO</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =======================================================
          QUICK ADD / EDIT CITY MODAL
      ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-100 relative animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#EEF6EB] flex items-center justify-center text-[#8CBC67]">
                  <MapPin size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-neutral-900">
                    {editingCity ? "Edit City Details" : "Add New Serviceable City"}
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    {editingCity ? "Update location attributes" : "Make decoration services available in a new city"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  City Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Mumbai, Chandigarh, Jaipur..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  State / Region (Optional)
                </label>
                <input
                  type="text"
                  value={formState}
                  onChange={(e) => setFormState(e.target.value)}
                  placeholder="e.g. Maharashtra, Rajasthan..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Display Order / Priority
                </label>
                <input
                  type="number"
                  value={formOrder}
                  onChange={(e) => setFormOrder(Number(e.target.value))}
                  placeholder="0"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                />
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  Lower numbers appear first in the customer city selector.
                </p>
              </div>

              {/* Toggles */}
              <div className="space-y-2.5 pt-2">
                <label className="flex items-center space-x-3 p-3 rounded-xl border border-neutral-200 bg-neutral-50/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="w-4 h-4 text-[#8CBC67] rounded accent-[#8CBC67]"
                  />
                  <div>
                    <p className="text-xs font-bold text-neutral-800">Active City</p>
                    <p className="text-[10px] text-neutral-500">
                      Enable this city so users can select it and book services.
                    </p>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 rounded-xl border border-neutral-200 bg-neutral-50/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsPopular}
                    onChange={(e) => setFormIsPopular(e.target.checked)}
                    className="w-4 h-4 text-[#8CBC67] rounded accent-[#8CBC67]"
                  />
                  <div>
                    <p className="text-xs font-bold text-neutral-800">Popular City</p>
                    <p className="text-[10px] text-neutral-500">
                      Feature this city with landmark icons in high priority slots.
                    </p>
                  </div>
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-[#8CBC67] hover:bg-[#7AB055] text-white text-xs font-bold transition shadow-sm disabled:opacity-50 flex items-center space-x-1.5 cursor-pointer"
                >
                  {submitting && <Loader2 size={13} className="animate-spin" />}
                  <span>{editingCity ? "Save Changes" : "Create City"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =======================================================
          DELETE CONFIRMATION MODAL
      ======================================================== */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-red-100 relative animate-in zoom-in-95 duration-150">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <AlertTriangle size={24} />
              </div>
              <h3 className="font-bold text-base text-neutral-900">Delete City?</h3>
              <p className="text-xs text-neutral-500">
                Are you sure you want to remove <span className="font-bold text-neutral-800">&ldquo;{deleteTarget.name}&rdquo;</span>? Products assigned only to this city may need updating.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-sm disabled:opacity-50 flex items-center space-x-1.5 cursor-pointer"
              >
                {isDeleting && <Loader2 size={13} className="animate-spin" />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
