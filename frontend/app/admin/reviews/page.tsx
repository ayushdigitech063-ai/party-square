"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { 
  Star, 
  Trash2, 
  MessageSquare, 
  Plus, 
  Upload, 
  MapPin, 
  User, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Loader2 
} from "lucide-react";
import { API_URL } from "@/config";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

interface ReviewItem {
  id?: string | number;
  image?: string;
  name: string;
  location?: string;
  text: string;
  rating?: number;
  status?: string;
  createdAt?: string;
}

export default function AdminReviews() {
  const { admin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Homepage testimonials content data
  const [testimonialsData, setTestimonialsData] = useState<{
    badge: string;
    heading1: string;
    heading2: string;
    rating: string;
    reviewCount: number;
    reviews: ReviewItem[];
  }>({
    badge: "Testimonials",
    heading1: "Customer",
    heading2: "Reviews",
    rating: "4.8",
    reviewCount: 15,
    reviews: []
  });

  // Modal / Form state for adding review
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState<{
    name: string;
    location: string;
    text: string;
    rating: number;
    image: string;
  }>({
    name: "",
    location: "",
    text: "",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  });

  // Fetch current reviews from Homepage sections
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/homepage`);
      if (res.ok) {
        const data = await res.json();
        const tSection = data.sections?.find((s: any) => s.sectionKey === 'testimonials');
        if (tSection && tSection.contentData && Array.isArray(tSection.contentData.reviews)) {
          setTestimonialsData({
            badge: tSection.contentData.badge || "Testimonials",
            heading1: tSection.contentData.heading1 || "Customer",
            heading2: tSection.contentData.heading2 || "Reviews",
            rating: tSection.contentData.rating || "4.8",
            reviewCount: tSection.contentData.reviews.length,
            reviews: tSection.contentData.reviews
          });
        }
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Save updated reviews array to backend
  const saveReviewsToBackend = async (updatedReviews: ReviewItem[]) => {
    try {
      setSaving(true);
      const token = admin?.token || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("adminUser") || "{}")?.token : "");

      const payload = {
        ...testimonialsData,
        reviewCount: updatedReviews.length,
        reviews: updatedReviews
      };

      const res = await fetch(`${API_URL}/api/homepage/sections/testimonials`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: "Customer Reviews",
          contentData: payload
        })
      });

      if (res.ok) {
        setTestimonialsData(payload);
        toast.success("Reviews updated and live on Homepage!");
        return true;
      } else {
        toast.error("Failed to update reviews in backend");
        return false;
      }
    } catch (e: any) {
      toast.error(e.message || "Error saving reviews");
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Upload custom customer avatar
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const token = admin?.token || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("adminUser") || "{}")?.token : "");

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        setNewReview(prev => ({ ...prev, image: data.url }));
        toast.success("Photo uploaded successfully!");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (err) {
      toast.error("Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  // Submit new review
  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.text.trim()) {
      toast.error("Please enter Client Name and Review Comment");
      return;
    }

    const reviewToAdd: ReviewItem = {
      name: newReview.name.trim(),
      location: newReview.location.trim() || "Verified Customer",
      text: newReview.text.trim(),
      rating: newReview.rating,
      image: newReview.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      status: "Approved",
      createdAt: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })
    };

    const updated = [reviewToAdd, ...testimonialsData.reviews];
    const success = await saveReviewsToBackend(updated);
    if (success) {
      setIsModalOpen(false);
      setNewReview({
        name: "",
        location: "",
        text: "",
        rating: 5,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      });
    }
  };

  // Delete review
  const handleDeleteReview = async (index: number) => {
    const result = await Swal.fire({
      title: "Remove Review?",
      text: "This will remove this review from both the Admin Panel and the Website Homepage.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      const updated = [...testimonialsData.reviews];
      updated.splice(index, 1);
      await saveReviewsToBackend(updated);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6 w-full">
      {/* Header */}
      <div className="bg-white border border-amber-200/80 p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="font-serif text-2xl font-bold text-neutral-900">Customer Reviews & Ratings</h2>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              Live Homepage Sync
            </span>
          </div>
          <p className="text-neutral-500 text-xs font-light mt-1">
            Manage real customer testimonials shown in the "Customer Reviews" section of the main website.
          </p>
        </div>

        <button 
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 text-neutral-950 px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-sm transition cursor-pointer shrink-0"
        >
          <Plus size={16} />
          <span>Add Real Review</span>
        </button>
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <div className="bg-white border border-amber-200/80 rounded-3xl p-12 text-center text-neutral-500 text-sm flex items-center justify-center space-x-2">
          <Loader2 size={18} className="animate-spin text-amber-500" />
          <span>Loading customer reviews...</span>
        </div>
      ) : testimonialsData.reviews.length === 0 ? (
        <div className="bg-white border border-amber-200/80 rounded-3xl p-12 text-center space-y-3">
          <MessageSquare size={36} className="text-neutral-300 mx-auto" />
          <h4 className="font-bold text-neutral-800 text-sm">No Customer Reviews Yet</h4>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Click "Add Real Review" to publish client feedback or let customers write reviews directly on the website.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.reviews.map((r, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between hover:border-amber-400 transition group"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3.5">
                  <img 
                    src={r.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"} 
                    alt={r.name}
                    className="w-11 h-11 rounded-full object-cover border border-amber-200 shadow-xs shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-neutral-900 text-sm truncate">{r.name}</h4>
                    <span className="text-[11px] text-amber-800 font-medium block truncate">
                      📍 {r.location || "Verified Client"}
                    </span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0">
                    Active
                  </span>
                </div>

                <div className="flex text-amber-500 space-x-1">
                  {[...Array(Number(r.rating) || 5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                <p className="text-xs text-neutral-600 italic leading-relaxed line-clamp-4">
                  "{r.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-amber-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-neutral-400">Position: #{idx + 1}</span>
                <button 
                  onClick={() => handleDeleteReview(idx)} 
                  disabled={saving}
                  className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-xl transition flex items-center space-x-1 text-xs font-bold cursor-pointer"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-amber-200 shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif text-xl font-bold text-neutral-900">Add Customer Review</h3>
                <p className="text-neutral-500 text-xs font-light mt-0.5">This review will appear live on the website homepage.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-700 font-bold mb-1.5">Client Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Pooja & Ankit Saxena"
                  value={newReview.name}
                  onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-700 font-bold mb-1.5">City / Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Jaipur or Mumbai"
                    value={newReview.location}
                    onChange={e => setNewReview({ ...newReview, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-bold mb-1.5">Rating (1 to 5 Stars)</label>
                  <select 
                    value={newReview.rating}
                    onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 font-medium"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1.5">Client Photo</label>
                <div className="flex items-center space-x-3">
                  <img 
                    src={newReview.image} 
                    alt="Preview" 
                    className="w-12 h-12 rounded-full object-cover border border-amber-200 shadow-xs shrink-0" 
                  />
                  <div className="flex-1">
                    <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-900 cursor-pointer font-semibold transition">
                      <Upload size={14} />
                      <span>{uploadingImage ? "Uploading..." : "Upload Photo"}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        disabled={uploadingImage}
                        onChange={handleAvatarUpload} 
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1.5">Review Comment *</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Share what the client said about the decoration quality, timing, setup, and support..."
                  value={newReview.text}
                  onChange={e => setNewReview({ ...newReview, text: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 font-bold hover:bg-neutral-50 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-6 py-2.5 rounded-xl shadow transition flex items-center space-x-2"
                >
                  {saving ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Publish Review</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}