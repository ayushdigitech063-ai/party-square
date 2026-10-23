"use client";

import React, { useState } from "react";
import { Star, X, Send, Loader2, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { submitReview } from "@/app/lib/api";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    bookingId: string;
    productName: string;
    productImage?: string;
    eventDate?: string;
  };
  onReviewSubmitted: () => void;
}

export default function ReviewModal({
  isOpen,
  onClose,
  booking,
  onReviewSubmitted,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }
    if (comment.trim().length < 10) {
      toast.error("Please write at least 10 characters.");
      return;
    }

    setSubmitting(true);
    try {
      await submitReview({ bookingId: booking.bookingId, rating, comment: comment.trim() });
      setSubmitted(true);
      toast.success("Review submitted! It will appear after admin approval.");
      setTimeout(() => {
        onReviewSubmitted();
        onClose();
      }, 2000);
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent!"];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-neutral-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-50 to-green-50 px-6 py-5 border-b border-neutral-100 flex items-start justify-between">
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8CBC67]">
              Verified Purchase
            </span>
            <h3 className="text-lg font-bold text-neutral-900 mt-0.5">
              Rate Your Experience
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1 font-medium">
              {booking.productName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500 transition ml-3 shrink-0 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        {submitted ? (
          <div className="p-10 flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-[#8CBC67]" />
            </div>
            <h4 className="font-bold text-lg text-neutral-900">Thank You!</h4>
            <p className="text-sm text-neutral-500">
              Your review is submitted and will appear after admin approval.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Product Image + Booking Info */}
            {booking.productImage && (
              <div className="flex items-center gap-3 bg-neutral-50 rounded-2xl p-3 border border-neutral-100">
                <img
                  src={booking.productImage}
                  alt={booking.productName}
                  className="w-14 h-14 rounded-xl object-cover border border-neutral-200 shrink-0"
                />
                <div>
                  <p className="text-xs font-bold text-neutral-900 line-clamp-1">
                    {booking.productName}
                  </p>
                  <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                    Booking ID: {booking.bookingId}
                  </p>
                  {booking.eventDate && (
                    <p className="text-[11px] text-neutral-400">
                      Event:{" "}
                      {new Date(booking.eventDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Star Rating */}
            <div>
              <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Overall Rating *
              </label>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                      className="transition-transform hover:scale-110 cursor-pointer"
                    >
                      <Star
                        size={32}
                        className={`transition-colors ${
                          star <= (hovered || rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-neutral-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {(hovered || rating) > 0 && (
                  <span className="text-sm font-bold text-amber-600 ml-1">
                    {ratingLabels[hovered || rating]}
                  </span>
                )}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Your Review *
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={1000}
                rows={4}
                placeholder="Tell us about the decoration quality, punctuality, and overall experience..."
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-neutral-50 p-3.5 text-sm text-neutral-800 outline-none focus:border-[#8CBC67] focus:ring-2 focus:ring-[#8CBC67]/20 resize-none transition placeholder:text-neutral-400"
              />
              <p className="text-[11px] text-neutral-400 text-right mt-1">
                {comment.length}/1000
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || rating === 0}
              className="w-full h-12 rounded-2xl bg-[#202522] hover:bg-black text-white font-bold text-sm flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer active:scale-95"
            >
              {submitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
