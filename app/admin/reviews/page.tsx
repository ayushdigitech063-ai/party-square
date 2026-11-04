"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  CheckCircle,
  Trash2,
  MessageSquare,
  Loader2,
  RefreshCw,
  Sparkles,
  ThumbsUp,
  XCircle,
  Clock,
  Plus,
  X,
  Package,
  User,
  MapPin,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchAllReviewsAdmin,
  updateReviewStatus,
  deleteReviewAdmin,
  createReviewAdmin,
  fetchProducts,
  ReviewItem,
  ProductItem,
} from "@/app/lib/api";

const STATUS_TABS = [
  { key: undefined, label: "All" },
  { key: "PENDING", label: "Pending" },
  { key: "APPROVED", label: "Approved" },
  { key: "FEATURED", label: "Featured" },
  { key: "REJECTED", label: "Rejected" },
] as const;

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-[#EEF6EB] text-[#202522]",
  APPROVED: "bg-green-100 text-green-800",
  FEATURED: "bg-purple-100 text-purple-800",
  REJECTED: "bg-red-100 text-red-800",
};

export default function AdminReviews() {
  const [activeFilter, setActiveFilter] = useState<string | undefined>(undefined);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [stats, setStats] = useState<{
    total: number;
    pending: number;
    approved: number;
    featured: number;
    rejected: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  // Manual Review Creation Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [productsList, setProductsList] = useState<ProductItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [customProductUrl, setCustomProductUrl] = useState("");
  const [customProductName, setCustomProductName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [city, setCity] = useState("Delhi");
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [initialStatus, setInitialStatus] = useState<"APPROVED" | "FEATURED">("APPROVED");
  const [submittingReview, setSubmittingReview] = useState(false);

  const loadReviews = async (status?: string) => {
    setLoading(true);
    try {
      const data = await fetchAllReviewsAdmin(status);
      setReviews(data.reviews || []);
      setStats(data.stats || null);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews(activeFilter);
  }, [activeFilter]);

  // Load products list for dropdown
  useEffect(() => {
    fetchProducts({ limit: 200 })
      .then((res: any) => {
        const list = Array.isArray(res) ? res : res?.products || [];
        setProductsList(list);
        if (list.length > 0 && !selectedProductId) {
          setSelectedProductId(list[0]._id);
          setCustomProductName(list[0].name);
        }
      })
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  const handleStatusUpdate = async (
    id: string,
    status: "PENDING" | "APPROVED" | "FEATURED" | "REJECTED"
  ) => {
    setActionId(id);
    try {
      await updateReviewStatus(id, status);
      toast.success(`Review marked as ${status.toLowerCase()}.`);
      loadReviews(activeFilter);
    } catch (err: any) {
      toast.error(err?.message || "Failed to update status.");
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review permanently?")) return;
    setActionId(id);
    try {
      await deleteReviewAdmin(id);
      toast.success("Review deleted.");
      setReviews((prev) => prev.filter((r) => r._id !== id));
      loadReviews(activeFilter);
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete.");
    } finally {
      setActionId(null);
    }
  };

  const handleOpenAddModal = () => {
    setCustomerName("");
    setComment("");
    setRating(5);
    setCity("Delhi");
    setInitialStatus("APPROVED");
    if (productsList.length > 0 && !selectedProductId) {
      setSelectedProductId(productsList[0]._id);
      setCustomProductName(productsList[0].name);
    }
    setIsAddModalOpen(true);
  };

  const handleProductSelect = (pId: string) => {
    setSelectedProductId(pId);
    const found = productsList.find((p) => p._id === pId);
    if (found) {
      setCustomProductName(found.name);
    }
  };

  // If user inputs a direct product URL/slug, resolve it
  const handleUrlBlur = () => {
    if (!customProductUrl.trim()) return;
    const clean = customProductUrl.trim().replace(/^https?:\/\/[^/]+/i, "");
    const parts = clean.split("/").filter(Boolean);
    const slugOrId = parts[parts.length - 1];
    if (slugOrId) {
      const match = productsList.find(
        (p) =>
          p._id === slugOrId ||
          p.slug === slugOrId ||
          p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slugOrId.toLowerCase()
      );
      if (match) {
        setSelectedProductId(match._id);
        setCustomProductName(match.name);
        toast.success(`Linked to product: "${match.name}"`);
      } else {
        setSelectedProductId(slugOrId);
        if (!customProductName) {
          setCustomProductName(
            slugOrId.charAt(0).toUpperCase() + slugOrId.slice(1).replace(/-/g, " ")
          );
        }
      }
    }
  };

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId.trim()) {
      toast.error("Please select a product or enter product URL");
      return;
    }
    if (!customerName.trim()) {
      toast.error("Customer name is required");
      return;
    }
    if (!comment.trim()) {
      toast.error("Review comment is required");
      return;
    }

    setSubmittingReview(true);
    try {
      const payload = {
        productId: selectedProductId.trim(),
        productName: customProductName.trim() || "Decoration Package",
        customerName: customerName.trim(),
        city: city.trim(),
        rating: Number(rating),
        comment: comment.trim(),
        status: initialStatus,
      };

      await createReviewAdmin(payload);
      toast.success("Review added and published successfully!");
      setIsAddModalOpen(false);
      loadReviews(activeFilter);
    } catch (err: any) {
      toast.error(err?.message || "Failed to add review.");
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="bg-white border border-[#E8E8E3]/80 p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#202522]">
            Customer Reviews & Ratings
          </h2>
          <p className="text-[#6B706C] text-xs font-light mt-1">
            Create verified product reviews, approve customer feedback, and feature 5-star testimonials on product pages.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => loadReviews(activeFilter)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-neutral-100 text-[#202522] text-xs font-bold hover:bg-neutral-200 transition cursor-pointer"
          >
            <RefreshCw size={14} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#8CBC67] text-white text-xs font-bold hover:bg-[#7AB055] transition shadow-sm cursor-pointer"
          >
            <Plus size={16} />
            <span>Add Review</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { label: "Total", value: stats.total, icon: MessageSquare, color: "text-neutral-700 bg-neutral-50" },
            { label: "Pending", value: stats.pending, icon: Clock, color: "text-[#8CBC67] bg-[#FCFBF7]" },
            { label: "Approved", value: stats.approved, icon: CheckCircle, color: "text-green-700 bg-green-50" },
            { label: "Featured", value: stats.featured, icon: Sparkles, color: "text-purple-700 bg-purple-50" },
            { label: "Rejected", value: stats.rejected, icon: XCircle, color: "text-red-700 bg-red-50" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className={`rounded-2xl p-4 border border-[#E8E8E3]/80 bg-white flex items-center gap-3`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={16} />
              </div>
              <div>
                <p className="text-[11px] text-[#6B706C]">{label}</p>
                <p className="text-lg font-extrabold text-[#202522]">{value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveFilter(tab.key)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
              activeFilter === tab.key
                ? "bg-[#202522] text-white"
                : "bg-white border border-[#E8E8E3] text-[#6B706C] hover:bg-neutral-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-[#6B706C]">
          <Loader2 size={22} className="animate-spin" />
          <span className="text-sm font-medium">Loading reviews...</span>
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-white border border-[#E8E8E3]/80 rounded-3xl p-12 text-center">
          <MessageSquare size={36} className="mx-auto text-neutral-300 mb-3" />
          <h4 className="font-bold text-[#202522]">No reviews found</h4>
          <p className="text-xs text-[#6B706C] mt-1">
            {activeFilter ? `No ${activeFilter.toLowerCase()} reviews.` : "No reviews have been added yet."}
          </p>
          <button
            onClick={handleOpenAddModal}
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8CBC67] text-white text-xs font-bold hover:bg-[#7AB055] transition cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Review Now</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="bg-white border border-[#E8E8E3]/80 rounded-3xl p-5 shadow-sm flex flex-col justify-between space-y-4"
            >
              {/* Top */}
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif font-bold text-[#202522] text-sm block">
                        {r.customerName}
                      </span>
                      {r.isManual && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                          Admin Added
                        </span>
                      )}
                    </div>
                    {r.city && (
                      <span className="text-[11px] text-[#6B706C]">{r.city}</span>
                    )}
                    {r.bookingId ? (
                      <span className="font-mono text-[10px] text-neutral-400 block mt-0.5">
                        Booking: {r.bookingId}
                      </span>
                    ) : (
                      <span className="text-[10px] text-neutral-400 block mt-0.5">
                        Verified Review
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_COLORS[r.status] || "bg-neutral-100 text-neutral-600"}`}>
                    {r.status}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < r.rating ? "fill-amber-400 text-amber-400" : "text-neutral-200"}
                    />
                  ))}
                  <span className="text-xs font-bold text-neutral-700 ml-1">{r.rating}/5</span>
                </div>

                {/* Product */}
                <p className="text-[11px] text-[#8CBC67] font-semibold flex items-center gap-1">
                  <Package size={12} />
                  <span>{r.productName}</span>
                </p>

                {/* Comment */}
                <p className="text-xs text-[#6B706C] italic leading-relaxed">
                  &ldquo;{r.comment}&rdquo;
                </p>

                <p className="text-[10px] text-neutral-400">
                  {new Date(r.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-[#E8E8E3] flex flex-wrap gap-2">
                {r.status !== "APPROVED" && (
                  <button
                    onClick={() => handleStatusUpdate(r._id, "APPROVED")}
                    disabled={actionId === r._id}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 text-xs font-bold transition cursor-pointer disabled:opacity-50"
                  >
                    <ThumbsUp size={12} />
                    Approve
                  </button>
                )}
                {r.status !== "FEATURED" && (
                  <button
                    onClick={() => handleStatusUpdate(r._id, "FEATURED")}
                    disabled={actionId === r._id}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-bold transition cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles size={12} />
                    Feature
                  </button>
                )}
                {r.status !== "REJECTED" && (
                  <button
                    onClick={() => handleStatusUpdate(r._id, "REJECTED")}
                    disabled={actionId === r._id}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition cursor-pointer disabled:opacity-50"
                  >
                    <XCircle size={12} />
                    Reject
                  </button>
                )}
                <button
                  onClick={() => handleDelete(r._id)}
                  disabled={actionId === r._id}
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 text-neutral-600 hover:bg-red-50 hover:text-red-600 text-xs font-bold transition cursor-pointer disabled:opacity-50"
                >
                  {actionId === r._id ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Trash2 size={12} />
                  )}
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD REVIEW MODAL (Point 21: Add Reviews As Per Product / Product URL) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-neutral-100 relative animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#EEF6EB] flex items-center justify-center text-[#8CBC67]">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-neutral-900">Add Product Review</h3>
                  <p className="text-[11px] text-neutral-500">
                    Add customer testimonial and rating for a specific package
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateReview} className="space-y-4 pt-4 overflow-y-auto flex-1 pr-1">
              {/* Product Selector */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Select Product <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => handleProductSelect(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-900 font-semibold focus:outline-none focus:border-[#8CBC67] cursor-pointer"
                >
                  {productsList.length === 0 ? (
                    <option value="">Loading products...</option>
                  ) : (
                    productsList.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Or Product URL / Direct Slug input */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Or Paste Product URL / Slug <span className="text-neutral-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={customProductUrl}
                  onChange={(e) => setCustomProductUrl(e.target.value)}
                  onBlur={handleUrlBlur}
                  placeholder="e.g. https://partysquare.in/card/65f123... or wedding-floral-mandap"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                />
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  Paste the product page link or slug to automatically link this review.
                </p>
              </div>

              {/* Customer Name & City */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Customer / Reviewer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. South Delhi, Gurgaon, Mumbai"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                  />
                </div>
              </div>

              {/* Rating Selector */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Star Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 p-2.5 rounded-xl border border-neutral-200 bg-neutral-50">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setRating(starVal)}
                      className="p-1 text-neutral-300 hover:text-[#8CBC67] transition cursor-pointer"
                    >
                      <Star
                        size={22}
                        className={starVal <= rating ? "fill-amber-400 text-amber-400" : "text-neutral-300"}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-neutral-700 ml-2">
                    {rating} Star{rating > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Review Text / Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="e.g. Absolutely loved the decoration! The balloon arch and fairy lights were set up in just 1.5 hours. Very professional staff."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                />
              </div>

              {/* Display Status */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Publishing Status
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center space-x-2.5 p-3 rounded-xl border cursor-pointer transition ${
                    initialStatus === "APPROVED" ? "border-green-400 bg-green-50/50" : "border-neutral-200 bg-neutral-50"
                  }`}>
                    <input
                      type="radio"
                      name="status"
                      checked={initialStatus === "APPROVED"}
                      onChange={() => setInitialStatus("APPROVED")}
                      className="accent-[#8CBC67]"
                    />
                    <div>
                      <p className="text-xs font-bold text-neutral-800">Approved</p>
                      <p className="text-[10px] text-neutral-500">Live on product page</p>
                    </div>
                  </label>

                  <label className={`flex items-center space-x-2.5 p-3 rounded-xl border cursor-pointer transition ${
                    initialStatus === "FEATURED" ? "border-purple-400 bg-purple-50/50" : "border-neutral-200 bg-neutral-50"
                  }`}>
                    <input
                      type="radio"
                      name="status"
                      checked={initialStatus === "FEATURED"}
                      onChange={() => setInitialStatus("FEATURED")}
                      className="accent-purple-600"
                    />
                    <div>
                      <p className="text-xs font-bold text-neutral-800">✨ Featured</p>
                      <p className="text-[10px] text-neutral-500">Highlighted on top</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="px-6 py-2.5 rounded-2xl bg-[#8CBC67] hover:bg-[#7AB055] text-white text-xs font-bold transition shadow-sm disabled:opacity-50 flex items-center space-x-1.5 cursor-pointer"
                >
                  {submittingReview && <Loader2 size={13} className="animate-spin" />}
                  <span>Publish Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
