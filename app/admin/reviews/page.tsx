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
} from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchAllReviewsAdmin,
  updateReviewStatus,
  deleteReviewAdmin,
  ReviewItem,
} from "@/app/lib/api";

const STATUS_TABS = [
  { key: undefined, label: "All" },
  { key: "PENDING", label: "Pending" },
  { key: "APPROVED", label: "Approved" },
  { key: "FEATURED", label: "Featured" },
  { key: "REJECTED", label: "Rejected" },
] as const;

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  APPROVED: "bg-green-100 text-green-800",
  FEATURED: "bg-purple-100 text-purple-800",
  REJECTED: "bg-red-100 text-red-800",
};

export default function AdminReviews() {
  const [activeFilter, setActiveFilter] = useState<string | undefined>(undefined);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [stats, setStats] = useState<{
    total: number; pending: number; approved: number; featured: number; rejected: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

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

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="bg-white border border-[#E8E8E3]/80 p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#202522]">
            Customer Reviews & Ratings
          </h2>
          <p className="text-[#6B706C] text-xs font-light mt-1">
            Approve, feature, or remove customer reviews. Only approved &amp; featured reviews appear on product pages.
          </p>
        </div>
        <button
          onClick={() => loadReviews(activeFilter)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EEF6EB] text-[#202522] text-xs font-bold hover:bg-[#d9edcf] transition cursor-pointer"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { label: "Total", value: stats.total, icon: MessageSquare, color: "text-neutral-700 bg-neutral-50" },
            { label: "Pending", value: stats.pending, icon: Clock, color: "text-amber-700 bg-amber-50" },
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
            {activeFilter ? `No ${activeFilter.toLowerCase()} reviews.` : "No reviews have been submitted yet."}
          </p>
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
                    <span className="font-serif font-bold text-[#202522] text-sm block">
                      {r.customerName}
                    </span>
                    {r.city && (
                      <span className="text-[11px] text-[#6B706C]">{r.city}</span>
                    )}
                    <span className="font-mono text-[10px] text-neutral-400 block mt-0.5">
                      Booking: {r.bookingId}
                    </span>
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
                <p className="text-[11px] text-[#8CBC67] font-semibold">
                  {r.productName}
                </p>

                {/* Comment */}
                <p className="text-xs text-[#6B706C] italic leading-relaxed">
                  "{r.comment}"
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
    </div>
  );
}