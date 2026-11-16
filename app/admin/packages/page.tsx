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
  Image as ImageIcon,
  Upload,
  Loader2,
  MapPin,
  Tag
} from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchPackages,
  createPackage,
  updatePackage,
  deletePackage,
  uploadImage,
  PricingPackage
} from "@/app/lib/api";

const PAGE_TARGETS = [
  { id: "all", label: "All Packages", path: "" },
  { id: "wall-decoration", label: "🚪 Wall & Door Decor", path: "/services/wall-decoration" },
  { id: "birthday", label: "🎂 Birthday Themes", path: "/services/birthday" },
  { id: "birthday-mother", label: "👩 Mother's Birthday", path: "/services/birthday/mother" },
  { id: "ring-decoration", label: "💍 Ring & Engagement", path: "/services/ring-decoration" },
];

const STANDARD_CITIES = [
  "All Cities",
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Ahmedabad",
  "Jaipur",
  "Pune",
  "Kolkata",
  "Lucknow",
  "Gurugram",
  "Noida",
  "Ghaziabad",
  "Faridabad"
];

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTarget, setSelectedTarget] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<PricingPackage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formOriginalPrice, setFormOriginalPrice] = useState("");
  const [formCity, setFormCity] = useState("All Cities");
  const [formDescription, setFormDescription] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formImages, setFormImages] = useState<string[]>([]);
  const [formTarget, setFormTarget] = useState("wall-decoration");
  const [formPopular, setFormPopular] = useState(false);
  const [formFeatures, setFormFeatures] = useState("");
  const [formPincodes, setFormPincodes] = useState("");

  // Image upload loaders
  const [uploadingPrimary, setUploadingPrimary] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

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

  // Filtered packages by Target, City, and Search
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const matchesTarget =
        selectedTarget === "all" || pkg.pageTarget === selectedTarget;

      const matchesCity =
        selectedCity === "all" ||
        !pkg.city ||
        pkg.city === "All Cities" ||
        pkg.city === "All" ||
        pkg.city.toLowerCase() === selectedCity.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        pkg.name.toLowerCase().includes(q) ||
        pkg.description?.toLowerCase().includes(q) ||
        (pkg.city && pkg.city.toLowerCase().includes(q)) ||
        String(pkg.price).includes(q);

      return matchesTarget && matchesCity && matchesSearch;
    });
  }, [packages, selectedTarget, selectedCity, searchQuery]);

  // Open modal for create
  const handleOpenCreate = () => {
    setEditingPkg(null);
    setFormName("");
    setFormPrice("");
    setFormOriginalPrice("");
    setFormCity(selectedCity !== "all" ? selectedCity : "All Cities");
    setFormDescription("");
    setFormImage("");
    setFormImages([]);
    setFormTarget(selectedTarget === "all" ? "wall-decoration" : selectedTarget);
    setFormPopular(false);
    setFormFeatures("");
    setFormPincodes("");
    setIsModalOpen(true);
  };

  // Open modal for edit
  const handleOpenEdit = (pkg: PricingPackage) => {
    setEditingPkg(pkg);
    setFormName(pkg.name);
    setFormPrice(String(pkg.price));
    setFormOriginalPrice(pkg.originalPrice ? String(pkg.originalPrice) : "");
    setFormCity(pkg.city || "All Cities");
    setFormDescription(pkg.description || "");
    setFormImage(pkg.image || "");
    setFormImages(pkg.images || []);
    setFormTarget(pkg.pageTarget || "wall-decoration");
    setFormPopular(!!pkg.isPopular);
    setFormFeatures((pkg.features || []).join("\n"));
    setFormPincodes(((pkg as any).serviceablePincodes || []).join(", "));
    setIsModalOpen(true);
  };

  // Upload Primary Image directly to Cloudinary
  const handlePrimaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image file size should be under 10MB");
      return;
    }

    try {
      setUploadingPrimary(true);
      const toastId = toast.loading("Uploading primary package image...");
      const uploaded = await uploadImage(file);
      setFormImage(uploaded.url);
      toast.success("Primary image uploaded successfully!", { id: toastId });
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploadingPrimary(false);
    }
  };

  // Upload Multiple Gallery Images
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    setUploadingGallery(true);
    const toastId = toast.loading(`Uploading ${fileList.length} image(s)...`);

    try {
      const uploadPromises = fileList.map(async (file) => {
        const res = await uploadImage(file);
        return res.url;
      });
      const urls = await Promise.all(uploadPromises);
      setFormImages((prev) => [...prev, ...urls]);
      toast.success(`${urls.length} gallery image(s) uploaded!`, { id: toastId });
    } catch (err: any) {
      toast.error(err.message || "Failed to upload one or more gallery images", { id: toastId });
    } finally {
      setUploadingGallery(false);
      e.target.value = "";
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setFormImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
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
      toast.error("Please enter a valid sale price");
      return;
    }

    let origPriceNum: number | undefined = undefined;
    if (formOriginalPrice.trim()) {
      const parsed = Number(formOriginalPrice.toString().replace(/[^0-9]/g, ""));
      if (!isNaN(parsed) && parsed > 0) {
        origPriceNum = parsed;
      }
    }

    const featuresList = formFeatures
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      name: formName.trim(),
      price: priceNum,
      originalPrice: origPriceNum,
      city: formCity || "All Cities",
      description: formDescription.trim(),
      image:
        formImage.trim() ||
        (formImages.length > 0 ? formImages[0] : "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=60"),
      images: formImages,
      pageTarget: formTarget,
      isPopular: formPopular,
      features: featuresList,
      serviceablePincodes: formPincodes
        .split(/[\n,]+/)
        .map((p) => p.trim())
        .filter((p) => /^\d{6}$/.test(p)),
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
            <span className="p-2 bg-[#EEF6EB] text-[#8CBC67] rounded-xl border border-[#8CBC67]/20">
              <PackageIcon size={20} />
            </span>
            <span className="text-xs uppercase tracking-widest font-bold text-[#8CBC67]">
              City-Wise Customizable Plans
            </span>
          </div>
          <h1 className="font-serif text-2xl lg:text-3xl font-bold text-[#202522]">
            Pricing Plans & Packages Manager
          </h1>
          <p className="text-xs lg:text-sm text-[#6B706C] font-light max-w-2xl">
            Super Admin control panel to manage packages, city-specific pricing (Sale & Actual MRP),
            and multi-image media uploads across all services.
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
            className="flex-1 md:flex-initial flex items-center justify-center space-x-2 bg-[#8CBC67] hover:bg-[#7AB055] text-white font-bold px-6 py-3 rounded-2xl shadow-md transition"
          >
            <Plus size={18} />
            <span className="text-sm">Add New Package</span>
          </button>
        </div>
      </div>

      {/* Target Pages Tabs, City Filter, & Search */}
      <div className="space-y-4">
        {/* Row 1: Category Filter Tabs */}
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
                    ? "bg-[#202522] text-white border-[#202522] shadow-sm"
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

        {/* Row 2: City Filter + Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* City Selection Dropdown Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-[#6B706C] whitespace-nowrap flex items-center gap-1.5">
              <MapPin size={14} className="text-[#8CBC67]" /> Filter by City:
            </span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-2 bg-white border border-[#E8E8E3] rounded-2xl text-xs font-semibold text-[#202522] focus:outline-none focus:border-[#8CBC67] transition shadow-sm cursor-pointer"
            >
              <option value="all">📍 All Cities ({packages.length})</option>
              {STANDARD_CITIES.filter((c) => c !== "All Cities").map((city) => {
                const count = packages.filter(
                  (p) =>
                    p.city?.toLowerCase() === city.toLowerCase() ||
                    p.city === "All Cities" ||
                    p.city === "All" ||
                    !p.city
                ).length;
                return (
                  <option key={city} value={city}>
                    {city} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Search */}
          <div className="relative min-w-[260px] sm:max-w-xs w-full">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B706C]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plan by title, city, or price..."
              className="w-full pl-11 pr-4 py-2 bg-white border border-[#E8E8E3] rounded-2xl text-xs text-[#202522] focus:outline-none focus:border-[#8CBC67] transition shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Page Link Banner if filtered */}
      {selectedTarget !== "all" && (
        <div className="flex items-center justify-between bg-[#EEF6EB] border border-[#8CBC67]/30 px-5 py-3 rounded-2xl text-xs">
          <div className="flex items-center space-x-2 text-[#202522]">
            <Sparkles size={16} className="text-[#8CBC67]" />
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
              className="flex items-center space-x-1 text-[#8CBC67] hover:text-[#7AB055] font-bold"
            >
              <span>View Live Page</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      )}

      {/* Packages Grid */}
      {isLoading ? (
        <div className="bg-white border border-[#E8E8E3] rounded-3xl p-16 text-center shadow-sm">
          <RefreshCw size={28} className="animate-spin text-[#8CBC67] mx-auto mb-3" />
          <p className="text-[#6B706C] text-sm">Loading packages database...</p>
        </div>
      ) : filteredPackages.length === 0 ? (
        <div className="bg-white border border-[#E8E8E3] rounded-3xl p-16 text-center shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-[#6B706C]">
            <Layers size={28} />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#202522]">
              No packages found
            </h3>
            <p className="text-xs text-[#6B706C] mt-1 max-w-sm mx-auto">
              {searchQuery || selectedCity !== "all"
                ? "No packages match your search criteria or selected city."
                : "No packages have been created for this category yet."}
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center space-x-2 bg-[#8CBC67] hover:bg-[#7AB055] text-white font-bold px-5 py-2.5 rounded-xl text-xs transition"
          >
            <Plus size={16} />
            <span>Create First Package</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => {
            const hasDiscount =
              pkg.originalPrice && pkg.originalPrice > pkg.price;
            const discountPercent = hasDiscount
              ? Math.round(((pkg.originalPrice! - pkg.price) / pkg.originalPrice!) * 100)
              : 0;

            return (
              <div
                key={pkg._id}
                className="bg-white border border-[#E8E8E3] rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative"
              >
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <div className="absolute top-3 left-3 z-10 bg-[#FAF5EB] border border-[#D7A84B] text-[#D7A84B] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow flex items-center space-x-1">
                    <Star size={11} className="fill-[#D7A84B]" />
                    <span>Most Loved</span>
                  </div>
                )}

                {/* City Badge Top Right */}
                <div className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-md text-[#202522] border border-[#E8E8E3] text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-xs flex items-center space-x-1">
                  <MapPin size={12} className="text-[#8CBC67]" />
                  <span>{pkg.city || "All Cities"}</span>
                </div>

                {/* Top Image & Price */}
                <div>
                  <div className="relative h-56 w-full bg-neutral-100 overflow-hidden border-b border-[#E8E8E3]">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Price Pill Bottom Right */}
                    <div className="absolute bottom-3 right-3 bg-neutral-950/85 backdrop-blur-md text-white font-bold text-sm px-3.5 py-1.5 rounded-xl border border-white/10 shadow flex items-center gap-2">
                      <span className="text-[#8CBC67]">₹{pkg.price.toLocaleString("en-IN")}</span>
                      {hasDiscount && (
                        <span className="text-white/60 line-through text-xs font-normal">
                          ₹{pkg.originalPrice?.toLocaleString("en-IN")}
                        </span>
                      )}
                      {discountPercent > 0 && (
                        <span className="text-[10px] bg-[#8CBC67] text-white px-1.5 py-0.5 rounded font-extrabold">
                          {discountPercent}% OFF
                        </span>
                      )}
                    </div>

                    {/* Gallery Images Count Indicator */}
                    {pkg.images && pkg.images.length > 0 && (
                      <div className="absolute bottom-3 left-3 bg-neutral-900/75 backdrop-blur-xs text-white text-[10px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1 border border-white/10">
                        <ImageIcon size={12} />
                        <span>+{pkg.images.length} photos</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] uppercase font-bold text-[#8CBC67] tracking-wider">
                          {PAGE_TARGETS.find((p) => p.id === pkg.pageTarget)?.label.replace(/[^\w\s&]/gi, "").trim() || pkg.pageTarget}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#202522] group-hover:text-[#8CBC67] transition">
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
                      className="flex-1 max-w-[120px] flex items-center justify-center space-x-1.5 bg-[#FCFBF7] border border-[#E8E8E3] hover:border-[#8CBC67] text-[#202522] py-2.5 px-3 rounded-xl text-xs font-bold transition shadow-xs"
                    >
                      <Edit3 size={14} className="text-[#8CBC67]" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(pkg)}
                      className="p-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-[#6B706C] hover:text-red-600 hover:border-red-200 transition"
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

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#E8E8E3] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto my-auto space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E3]">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#202522]">
                  {editingPkg ? "Edit Package & Pricing" : "Create New Package"}
                </h2>
                <p className="text-xs text-[#6B706C] mt-0.5">
                  Configure city-specific pricing, discount strike-through, and upload package photos.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-[#6B706C] hover:text-[#202522] hover:bg-neutral-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Row: Target Page & City Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Target Page */}
                <div>
                  <label className="block text-[#202522] font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                    Display On Page <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formTarget}
                    onChange={(e) => setFormTarget(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-[#202522] font-medium focus:outline-none focus:border-[#8CBC67]"
                  >
                    <option value="wall-decoration">🚪 Wall & Door Decoration (/services/wall-decoration)</option>
                    <option value="birthday">🎂 Birthday Main Theme (/services/birthday)</option>
                    <option value="birthday-mother">👩 Mother's Milestone Birthday (/services/birthday/mother)</option>
                    <option value="ring-decoration">💍 Ring Ceremony & Engagement (/services/ring-decoration)</option>
                  </select>
                </div>

                {/* City Selection */}
                <div>
                  <label className="block text-[#202522] font-bold mb-1.5 uppercase tracking-wider text-[11px] flex items-center gap-1">
                    <MapPin size={13} className="text-[#8CBC67]" /> City Coverage <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-[#202522] font-semibold focus:outline-none focus:border-[#8CBC67]"
                  >
                    <option value="All Cities">📍 All Cities (Pan-India)</option>
                    {STANDARD_CITIES.filter((c) => c !== "All Cities").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Package Title */}
              <div>
                <label className="block text-[#202522] font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                  Package Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Floral & Ring Wall Decor Setup"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-[#202522] focus:outline-none focus:border-[#8CBC67]"
                />
              </div>

              {/* Pricing Row: Sale Price & Actual Price (MRP) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#202522] font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                    Sale Price in ₹ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 5499"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-[#202522] font-bold focus:outline-none focus:border-[#8CBC67]"
                  />
                  <span className="text-[10px] text-[#6B706C] mt-1 block">
                    Actual customer booking price
                  </span>
                </div>

                <div>
                  <label className="block text-[#202522] font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                    Actual / Original Price in ₹ (MRP Strike-through)
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 7999"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-[#202522] focus:outline-none focus:border-[#8CBC67]"
                  />
                  <span className="text-[10px] text-[#6B706C] mt-1 block">
                    Shows crossed out with discount % OFF badge
                  </span>
                </div>
              </div>

              {/* Primary Image: File Upload + URL */}
              <div className="p-4 bg-[#FCFBF7] rounded-2xl border border-[#E8E8E3] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-[#202522] font-bold uppercase tracking-wider text-[11px]">
                    Primary Package Image <span className="text-red-500">*</span>
                  </label>
                  <label className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-100 text-[#202522] border border-[#E8E8E3] text-[11px] font-bold cursor-pointer transition shadow-xs">
                    {uploadingPrimary ? (
                      <>
                        <Loader2 size={13} className="animate-spin text-[#8CBC67]" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={13} className="text-[#8CBC67]" />
                        <span>Upload From Device</span>
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

                <input
                  type="text"
                  placeholder="Or paste image URL (https://images.unsplash.com/...)"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E8E3] bg-white text-[#202522] focus:outline-none focus:border-[#8CBC67]"
                />

                {formImage && (
                  <div className="relative h-28 w-full rounded-xl overflow-hidden border border-[#E8E8E3] group">
                    <img
                      src={formImage}
                      alt="Primary Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormImage("")}
                      className="absolute top-2 right-2 p-1.5 bg-neutral-900/80 hover:bg-red-600 text-white rounded-lg transition"
                      title="Remove image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Multiple Gallery Images Upload */}
              <div className="p-4 bg-[#FCFBF7] rounded-2xl border border-[#E8E8E3] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-[#202522] font-bold uppercase tracking-wider text-[11px]">
                      Multiple Gallery Photos ({formImages.length})
                    </label>
                    <span className="text-[10px] text-[#6B706C]">
                      Upload multiple setup angles and past work photos
                    </span>
                  </div>
                  <label className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-100 text-[#202522] border border-[#E8E8E3] text-[11px] font-bold cursor-pointer transition shadow-xs">
                    {uploadingGallery ? (
                      <>
                        <Loader2 size={13} className="animate-spin text-[#8CBC67]" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Plus size={13} className="text-[#8CBC67]" />
                        <span>Add Photos (Multiple)</span>
                      </>
                    )}
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

                {formImages.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-2">
                    {formImages.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className="relative h-16 rounded-xl overflow-hidden border border-[#E8E8E3] group"
                      >
                        <img
                          src={imgUrl}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition cursor-pointer"
                          title="Remove photo"
                        >
                          <Trash2 size={14} className="text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-[#202522] font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                  Package Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Short description highlighting what this package offers..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-[#202522] focus:outline-none focus:border-[#8CBC67]"
                />
              </div>

              {/* Features (One per line) */}
              <div>
                <label className="block text-[#202522] font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                  Inclusions / Bullet Points (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Metal ring backdrop&#10;LED neon sign&#10;150 metallic balloons&#10;Professional balloon artist on-site"
                  value={formFeatures}
                  onChange={(e) => setFormFeatures(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-[#202522] focus:outline-none focus:border-[#8CBC67]"
                />
              </div>

              {/* Serviceable Pincodes (Optional) */}
              <div>
                <label className="block text-[#202522] font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                  Serviceable Pincodes (Optional - Comma separated)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 302001, 302015, 302020 or leave blank to serve all areas"
                  value={formPincodes}
                  onChange={(e) => setFormPincodes(e.target.value)}
                  className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-[#202522] focus:outline-none focus:border-[#8CBC67] font-mono"
                />
                <span className="text-[10px] text-[#6B706C] mt-1 block">
                  Leave empty to allow this package in all pincodes of the selected city.
                </span>
              </div>

              {/* Popular Switch */}
              <div className="flex items-center justify-between p-3.5 bg-[#FAF5EB] rounded-xl border border-[#D7A84B]/30">
                <div>
                  <span className="font-bold text-[#202522] block text-xs">
                    Mark as "Most Popular / Loved"
                  </span>
                  <span className="text-[11px] text-[#6B706C]">
                    Adds a glowing golden highlight badge on the package card
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
                  disabled={isSubmitting || uploadingPrimary || uploadingGallery}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#8CBC67] hover:bg-[#7AB055] text-white font-bold shadow-md transition disabled:opacity-50"
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
