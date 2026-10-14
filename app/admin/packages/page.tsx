"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Package as PackageIcon,
  Plus,
  Search,
  Edit3,
  Trash2,
  Star,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  Eye,
  RefreshCw,
  X,
  Image as ImageIcon
} from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchPackages,
  createPackage,
  updatePackage,
  deletePackage,
  PricingPackage
} from "@/app/lib/api";

const PAGE_TARGETS = [
  { id: "all", label: "All Packages", path: "" },
  { id: "wall-decoration", label: "🚪 Wall & Door Decor", path: "/services/wall-decoration" },
  { id: "birthday", label: "🎂 Birthday Themes", path: "/services/birthday" },
  { id: "birthday-mother", label: "👩 Mother's Birthday", path: "/services/birthday/mother" },
  { id: "ring-decoration", label: "💍 Ring & Engagement", path: "/services/ring-decoration" },
];

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTarget, setSelectedTarget] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<PricingPackage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formTarget, setFormTarget] = useState("wall-decoration");
  const [formPopular, setFormPopular] = useState(false);
  const [formFeatures, setFormFeatures] = useState("");

  // Load packages
  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPackages();
      setPackages(Array.isArray(data) ? data : []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load packages");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered packages
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const matchesTarget =
        selectedTarget === "all" || pkg.pageTarget === selectedTarget;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        pkg.name.toLowerCase().includes(q) ||
        pkg.description?.toLowerCase().includes(q) ||
        String(pkg.price).includes(q);
      return matchesTarget && matchesSearch;
    });
  }, [packages, selectedTarget, searchQuery]);

  // Open modal for create
  const handleOpenCreate = () => {
    setEditingPkg(null);
    setFormName("");
    setFormPrice("");
    setFormDescription("");
    setFormImage("");
    setFormTarget(selectedTarget === "all" ? "wall-decoration" : selectedTarget);
    setFormPopular(false);
    setFormFeatures("");
    setIsModalOpen(true);
  };

  // Open modal for edit
  const handleOpenEdit = (pkg: PricingPackage) => {
    setEditingPkg(pkg);
    setFormName(pkg.name);
    setFormPrice(String(pkg.price));
    setFormDescription(pkg.description || "");
    setFormImage(pkg.image || "");
    setFormTarget(pkg.pageTarget || "wall-decoration");
    setFormPopular(!!pkg.isPopular);
    setFormFeatures((pkg.features || []).join("\n"));
    setIsModalOpen(true);
  };

  // Submit create or edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPrice) {
      toast.error("Please provide both name and price");
      return;
    }

    const priceNum = Number(formPrice.toString().replace(/[^0-9]/g, ""));
    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    const featuresList = formFeatures
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      name: formName.trim(),
      price: priceNum,
      description: formDescription.trim(),
      image:
        formImage.trim() ||
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=60",
      pageTarget: formTarget,
      isPopular: formPopular,
      features: featuresList,
    };

    setIsSubmitting(true);
    try {
      if (editingPkg) {
        const updated = await updatePackage(editingPkg._id, payload);
        toast.success(`Package "${updated.name}" updated successfully!`);
        setPackages((prev) =>
          prev.map((p) => (p._id === editingPkg._id ? updated : p))
        );
      } else {
        const created = await createPackage(payload);
        toast.success(`Package "${created.name}" created successfully!`);
        setPackages((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to save package");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete package
  const handleDelete = async (pkg: PricingPackage) => {
    if (!window.confirm(`Are you sure you want to delete package "${pkg.name}"?`)) {
      return;
    }

    const toastId = toast.loading("Deleting package...");
    try {
      await deletePackage(pkg._id);
      toast.success("Package deleted successfully", { id: toastId });
      setPackages((prev) => prev.filter((p) => p._id !== pkg._id));
    } catch (err: any) {
      toast.error(err.message || "Failed to delete package", { id: toastId });
    }
  };

  // Toggle popular
  const handleTogglePopular = async (pkg: PricingPackage) => {
    const nextVal = !pkg.isPopular;
    try {
      const updated = await updatePackage(pkg._id, { isPopular: nextVal });
      toast.success(
        nextVal
          ? `Marked "${pkg.name}" as Most Popular!`
          : `Removed Most Popular tag from "${pkg.name}"`
      );
      setPackages((prev) =>
        prev.map((p) => (p._id === pkg._id ? updated : p))
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
              <PackageIcon size={20} />
            </span>
            <span className="text-xs uppercase tracking-widest font-bold text-[#D7A84B]">
              Customizable Plans
            </span>
          </div>
          <h1 className="font-serif text-2xl lg:text-3xl font-bold text-[#202522]">
            Pricing Plans & Packages Manager
          </h1>
          <p className="text-xs lg:text-sm text-[#6B706C] font-light max-w-2xl">
            Super Admin control panel to add, edit prices, descriptions, and feature tags
            for each service page dynamically.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={loadData}
            title="Refresh Packages"
            className="p-3 bg-neutral-100 hover:bg-neutral-200 text-[#202522] rounded-2xl transition border border-[#E8E8E3]"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={handleOpenCreate}
            className="flex-1 md:flex-initial flex items-center justify-center space-x-2 bg-[#D7A84B] hover:bg-[#c2953e] text-[#202522] font-bold px-6 py-3 rounded-2xl shadow-md transition"
          >
            <Plus size={18} />
            <span className="text-sm">Add New Package</span>
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
                ? packages.length
                : packages.filter((p) => p.pageTarget === target.id).length;
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
            placeholder="Search plan by title or price..."
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#E8E8E3] rounded-2xl text-xs text-[#202522] focus:outline-none focus:border-[#D7A84B] transition shadow-sm"
          />
        </div>
      </div>

      {/* Page Link Banner if filtered */}
      {selectedTarget !== "all" && (
        <div className="flex items-center justify-between bg-[#FAF5EB] border border-[#D7A84B]/30 px-5 py-3 rounded-2xl text-xs">
          <div className="flex items-center space-x-2 text-[#202522]">
            <Sparkles size={16} className="text-[#D7A84B]" />
            <span>
              Managing plans for:{" "}
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
              <span>View Live Page</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      )}

      {/* Packages Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-white rounded-3xl border border-[#E8E8E3] p-6 h-96 animate-pulse space-y-4"
            >
              <div className="h-44 bg-neutral-100 rounded-2xl" />
              <div className="h-5 bg-neutral-100 rounded w-2/3" />
              <div className="h-4 bg-neutral-100 rounded w-1/3" />
              <div className="h-16 bg-neutral-100 rounded" />
            </div>
          ))}
        </div>
      ) : filteredPackages.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E8E8E3] p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-[#FAF5EB] text-[#D7A84B] rounded-2xl flex items-center justify-center mx-auto">
            <PackageIcon size={32} />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#202522]">
            No Packages Found
          </h3>
          <p className="text-xs text-[#6B706C] max-w-sm mx-auto">
            No packages match your active filter. Click below to add a brand new package for this page.
          </p>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center space-x-2 bg-[#D7A84B] hover:bg-[#c2953e] text-[#202522] font-bold px-6 py-2.5 rounded-2xl text-xs transition"
          >
            <Plus size={16} />
            <span>Create New Package</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => {
            const targetMeta = PAGE_TARGETS.find((p) => p.id === pkg.pageTarget);
            return (
              <div
                key={pkg._id}
                className={`relative bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl group ${
                  pkg.isPopular
                    ? "border-2 border-[#D7A84B] ring-4 ring-[#D7A84B]/10"
                    : "border-[#E8E8E3]"
                }`}
              >
                {/* Popular Pill */}
                {pkg.isPopular && (
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-[#DFBC71] to-[#D7A84B] text-[#202522] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center space-x-1">
                    <Star size={12} className="fill-[#202522]" />
                    <span>Most Popular</span>
                  </div>
                )}

                {/* Target Page Tag */}
                <div className="absolute top-4 right-4 z-10 bg-neutral-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 shadow">
                  {targetMeta?.label || pkg.pageTarget}
                </div>

                {/* Card Top: Image */}
                <div>
                  <div className="relative h-56 w-full bg-neutral-100 overflow-hidden border-b border-[#E8E8E3]">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 right-3 bg-neutral-950/80 backdrop-blur-md text-[#DFBC71] font-bold text-base px-3.5 py-1 rounded-xl border border-white/10 shadow">
                      ₹{pkg.price.toLocaleString("en-IN")}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#202522] group-hover:text-[#D7A84B] transition">
                        {pkg.name}
                      </h3>
                      <p className="text-[#6B706C] text-xs leading-relaxed mt-2 line-clamp-3">
                        {pkg.description || "Customized premium decoration theme setup."}
                      </p>
                    </div>

                    {/* Features list if present */}
                    {pkg.features && pkg.features.length > 0 && (
                      <div className="pt-2 border-t border-[#E8E8E3] space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-[#6B706C] tracking-wider block">
                          Included Inclusions:
                        </span>
                        <div className="space-y-1">
                          {pkg.features.slice(0, 3).map((f, i) => (
                            <div
                              key={i}
                              className="flex items-center space-x-2 text-xs text-[#202522]"
                            >
                              <CheckCircle2 size={13} className="text-[#8CBC67] shrink-0" />
                              <span className="line-clamp-1">{f}</span>
                            </div>
                          ))}
                          {pkg.features.length > 3 && (
                            <span className="text-[10px] text-[#6B706C] block italic">
                              +{pkg.features.length - 3} more items
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer: Actions */}
                <div className="p-6 pt-0 border-t border-[#E8E8E3] mt-4 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleTogglePopular(pkg)}
                    title={pkg.isPopular ? "Unmark Popular" : "Mark as Popular"}
                    className={`p-2.5 rounded-xl border transition flex items-center justify-center ${
                      pkg.isPopular
                        ? "bg-[#FAF5EB] text-[#D7A84B] border-[#D7A84B]/40 hover:bg-[#FAF5EB]/70"
                        : "bg-neutral-50 text-[#6B706C] border-[#E8E8E3] hover:text-[#D7A84B]"
                    }`}
                  >
                    <Star
                      size={16}
                      className={pkg.isPopular ? "fill-[#D7A84B]" : ""}
                    />
                  </button>

                  <div className="flex items-center space-x-2 flex-1 justify-end">
                    <button
                      onClick={() => handleOpenEdit(pkg)}
                      className="flex-1 max-w-[120px] flex items-center justify-center space-x-1.5 bg-[#FAF8F5] border border-[#E8E8E3] hover:border-[#D7A84B] text-[#202522] py-2.5 px-3 rounded-xl text-xs font-bold transition shadow-sm"
                    >
                      <Edit3 size={14} className="text-[#D7A84B]" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(pkg)}
                      className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition border border-red-200"
                      title="Delete Package"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
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
                  {editingPkg ? "Edit Package Plan" : "Create New Package Plan"}
                </h3>
                <p className="text-xs text-[#6B706C] mt-1">
                  Configure package details, pricing, and live page allocation.
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
                  Display On Page <span className="text-red-500">*</span>
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

              {/* Package Name */}
              <div>
                <label className="block text-[#202522] font-bold mb-1.5">
                  Package Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Floral & Ring Wall Decor"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FAF8F5] text-[#202522] focus:outline-none focus:border-[#D7A84B]"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-[#202522] font-bold mb-1.5">
                  Price in Rupees (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 5499"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FAF8F5] text-[#202522] focus:outline-none focus:border-[#D7A84B]"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-[#202522] font-bold mb-1.5">
                  Image URL / Link
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/... or /walldecoration.png"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FAF8F5] text-[#202522] focus:outline-none focus:border-[#D7A84B]"
                />
                {formImage && (
                  <div className="mt-2 h-24 w-full rounded-xl overflow-hidden border border-[#E8E8E3]">
                    <img
                      src={formImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-[#202522] font-bold mb-1.5">
                  Package Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Short description highlighting what this package offers..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-[#E8E8E3] bg-[#FAF8F5] text-[#202522] focus:outline-none focus:border-[#D7A84B]"
                />
              </div>

              {/* Features (One per line) */}
              <div>
                <label className="block text-[#202522] font-bold mb-1.5">
                  Inclusions / Bullet Points (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Metal ring backdrop&#10;LED neon sign&#10;150 metallic balloons"
                  value={formFeatures}
                  onChange={(e) => setFormFeatures(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-[#E8E8E3] bg-[#FAF8F5] text-[#202522] focus:outline-none focus:border-[#D7A84B]"
                />
              </div>

              {/* Popular Switch */}
              <div className="flex items-center justify-between p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8E8E3]">
                <div>
                  <span className="font-bold text-[#202522] block">
                    Mark as "Most Popular / Loved"
                  </span>
                  <span className="text-[11px] text-[#6B706C]">
                    Adds a glowing golden highlight badge on the card
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={formPopular}
                  onChange={(e) => setFormPopular(e.target.checked)}
                  className="w-5 h-5 accent-[#D7A84B] rounded cursor-pointer"
                />
              </div>

              {/* Buttons */}
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
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#D7A84B] hover:bg-[#c2953e] text-[#202522] font-bold shadow-md transition disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingPkg
                    ? "Update Package"
                    : "Create Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
