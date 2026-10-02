"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Upload, 
  Sparkles, 
  Loader2, 
  Tag, 
  Calendar,
  Eye,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { API_URL } from "@/config";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

interface GalleryPhoto {
  id: string | number;
  title: string;
  category: string;
  image: string;
  price?: number;
  description?: string;
  date?: string;
}

const GALLERY_CATEGORIES = [
  "Wedding Decoration",
  "Birthday Decoration",
  "Anniversary Decoration",
  "Baby Welcome Decoration",
  "Proposal & Romantic Setup",
  "Festival & Mandap Setup",
];

export default function AdminGallery() {
  const { admin } = useAuth();
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Add Photo Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState<{
    title: string;
    category: string;
    image: string;
    price: number | string;
    description: string;
  }>({
    title: "",
    category: "Wedding Decoration",
    image: "",
    price: 4999,
    description: "Premium curated celebration decoration setup with floral accents and warm lights."
  });

  // Fetch current gallery photos from Homepage sections
  const fetchGalleryPhotos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/homepage`);
      if (res.ok) {
        const data = await res.json();
        const gallerySection = data.sections?.find((s: any) => s.sectionKey === 'gallery');
        if (gallerySection && gallerySection.contentData && Array.isArray(gallerySection.contentData.photos)) {
          setPhotos(gallerySection.contentData.photos);
        } else {
          // Initialize with default template items
          setPhotos([
            { id: "g1", title: "Royal Wedding Mandap Setup", category: "Wedding Decoration", image: "/wedding1.png", price: 45000, date: "Featured" },
            { id: "g2", title: "Birthday Balloon Garland Arch", category: "Birthday Decoration", image: "/aniversarry2.png", price: 6500, date: "Featured" },
            { id: "g3", title: "Candlelight Dinner Setup", category: "Proposal & Romantic Setup", image: "/aniversarry1.png", price: 8000, date: "Featured" },
            { id: "g4", title: "Floral Celebration Arch", category: "Anniversary Decoration", image: "/wedding3.png", price: 9500, date: "Featured" },
          ]);
        }
      }
    } catch (err) {
      console.error("Failed to load gallery photos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryPhotos();
  }, []);

  // Save gallery array to backend homepage section
  const saveGalleryToBackend = async (updatedPhotos: GalleryPhoto[]) => {
    try {
      setSaving(true);
      const token = admin?.token || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("adminUser") || "{}")?.token : "");

      const res = await fetch(`${API_URL}/api/homepage/sections/gallery`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: "Photo Gallery",
          subtitle: "Event gallery images and portfolios",
          contentData: {
            photos: updatedPhotos
          }
        })
      });

      if (res.ok) {
        setPhotos(updatedPhotos);
        toast.success("Gallery updated and synced with website!");
        return true;
      } else {
        toast.error("Failed to sync gallery with website");
        return false;
      }
    } catch (err: any) {
      toast.error(err.message || "Error saving gallery photo");
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Upload Photo to Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setNewPhoto(prev => ({ ...prev, image: data.url }));
        toast.success("Photo uploaded to Cloudinary!");
      } else {
        toast.error("Upload failed. Please check image format.");
      }
    } catch {
      toast.error("Network error during photo upload");
    } finally {
      setUploadingImage(false);
    }
  };

  // Submit new photo
  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.title.trim()) {
      toast.error("Please enter Photo Title");
      return;
    }
    if (!newPhoto.image.trim()) {
      toast.error("Please upload or provide an Image URL");
      return;
    }

    const photoToAdd: GalleryPhoto = {
      id: `custom-gallery-${Date.now()}`,
      title: newPhoto.title.trim(),
      category: newPhoto.category,
      image: newPhoto.image.trim(),
      price: Number(newPhoto.price) || 4999,
      description: newPhoto.description.trim(),
      date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })
    };

    const updated = [photoToAdd, ...photos];
    const success = await saveGalleryToBackend(updated);
    if (success) {
      setIsModalOpen(false);
      setNewPhoto({
        title: "",
        category: "Wedding Decoration",
        image: "",
        price: 4999,
        description: "Premium curated celebration decoration setup with floral accents and warm lights."
      });
    }
  };

  // Delete photo
  const handleDeletePhoto = async (id: string | number) => {
    const result = await Swal.fire({
      title: "Delete Showcase Photo?",
      text: "This photo will be permanently removed from both the Admin Panel and the Main Website Gallery.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      const updated = photos.filter(p => p.id !== id);
      await saveGalleryToBackend(updated);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6 w-full">
      {/* Header */}
      <div className="bg-white border border-amber-200/80 p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="font-serif text-2xl font-bold text-neutral-900">Event Gallery Manager</h2>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              Live Website Sync
            </span>
          </div>
          <p className="text-neutral-500 text-xs font-light mt-1">
            Upload new event decoration photos to instantly publish them on the main website portfolio gallery.
          </p>
        </div>

        <button 
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 text-neutral-950 px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-sm transition cursor-pointer shrink-0"
        >
          <Plus size={16} />
          <span>Upload Gallery Photo</span>
        </button>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="bg-white border border-amber-200/80 rounded-3xl p-12 text-center text-neutral-500 text-sm flex items-center justify-center space-x-2">
          <Loader2 size={18} className="animate-spin text-amber-500" />
          <span>Loading showcase gallery...</span>
        </div>
      ) : photos.length === 0 ? (
        <div className="bg-white border border-amber-200/80 rounded-3xl p-12 text-center space-y-3">
          <ImageIcon size={36} className="text-neutral-300 mx-auto" />
          <h4 className="font-bold text-neutral-800 text-sm">No Gallery Photos Added Yet</h4>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Click "Upload Gallery Photo" to add wedding, birthday, and anniversary decor themes.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map(p => (
            <div 
              key={p.id} 
              className="bg-white border border-amber-200/80 rounded-3xl p-4 shadow-sm space-y-3 flex flex-col justify-between hover:border-amber-400 transition group"
            >
              <div className="space-y-2.5">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-amber-50 relative group/img border border-amber-100">
                  <img 
                    src={p.image} 
                    alt={p.title}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  
                  <span className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-neutral-800 px-2 py-0.5 rounded-full shadow-xs">
                    {p.category}
                  </span>

                  <button 
                    onClick={() => handleDeletePhoto(p.id)}
                    disabled={saving}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-red-600 flex items-center justify-center shadow-md hover:scale-110 transition cursor-pointer"
                    title="Delete photo"
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="absolute bottom-2.5 left-2.5 text-white">
                    <span className="text-xs font-bold drop-shadow-sm">₹{Number(p.price || 0).toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-neutral-900 text-xs sm:text-sm line-clamp-1">{p.title}</h4>
                  <span className="text-[10px] text-neutral-400 block mt-0.5">Added: {p.date || "Active"}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-100 flex items-center justify-between text-[11px] text-neutral-500">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  Live on Website
                </span>
                <a 
                  href="/#gallery" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-amber-600 flex items-center gap-0.5"
                >
                  <span>Preview</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Photo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-amber-200 shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif text-xl font-bold text-neutral-900">Upload Showcase Photo</h3>
                <p className="text-neutral-500 text-xs font-light mt-0.5">Photo will be added into the Website Gallery portfolio.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPhoto} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-700 font-bold mb-1.5">Decoration / Theme Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Royal Crystal Mandap Setup"
                  value={newPhoto.title}
                  onChange={e => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-700 font-bold mb-1.5">Category *</label>
                  <select 
                    value={newPhoto.category}
                    onChange={e => setNewPhoto({ ...newPhoto, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 font-medium"
                  >
                    {GALLERY_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 font-bold mb-1.5">Price (₹)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 15000"
                    value={newPhoto.price}
                    onChange={e => setNewPhoto({ ...newPhoto, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1.5">Image File / Upload *</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <label className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-900 cursor-pointer font-semibold transition">
                      <Upload size={14} />
                      <span>{uploadingImage ? "Uploading to Cloudinary..." : "Choose File to Upload"}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        disabled={uploadingImage}
                        onChange={handleImageUpload} 
                      />
                    </label>
                    <span className="text-[11px] text-neutral-400">or paste URL below</span>
                  </div>

                  <input 
                    type="text" 
                    placeholder="https://example.com/photo.jpg or uploaded Cloudinary link"
                    value={newPhoto.image}
                    onChange={e => setNewPhoto({ ...newPhoto, image: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 text-[11px]"
                  />

                  {newPhoto.image && (
                    <div className="relative aspect-[16/9] w-full max-h-36 rounded-xl overflow-hidden border border-amber-200 bg-neutral-50 mt-2">
                      <img src={newPhoto.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1.5">Description</label>
                <textarea 
                  rows={2}
                  value={newPhoto.description}
                  onChange={e => setNewPhoto({ ...newPhoto, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 resize-none text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 font-bold hover:bg-neutral-50 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={saving || uploadingImage}
                  className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-6 py-2.5 rounded-xl shadow transition flex items-center space-x-2 cursor-pointer"
                >
                  {saving ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <span>Add to Gallery</span>
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