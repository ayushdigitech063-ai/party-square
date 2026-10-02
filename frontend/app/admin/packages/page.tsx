"use client";
import Swal from "sweetalert2";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Star } from "lucide-react";
import toast from "react-hot-toast";
import { API_URL } from "@/config";

export default function AdminPackages() {
  const [packages, setPackages] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    pageTarget: "",
    isPopular: false,
    features: [""]
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pkgRes, catRes] = await Promise.all([
        fetch(`${API_URL}/api/packages`),
        fetch(`${API_URL}/api/categories`)
      ]);
      if (pkgRes.ok && catRes.ok) {
        setPackages(await pkgRes.json());
        setCategories(await catRes.json());
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
    const token = adminUser.token;
    
    const fd = new FormData();
    fd.append("image", file);

    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: fd
    });

    if (!res.ok) throw new Error("Image upload failed");
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let finalImageUrl = formData.image;

      if (imageFile) {
        finalImageUrl = await uploadToCloudinary(imageFile);
      }

      const payload = {
        ...formData,
        price: Number(formData.price),
        image: finalImageUrl
      };

      const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
      const url = editingId 
        ? `${API_URL}/api/packages/${editingId}`
        : `${API_URL}/api/packages`;
      
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminUser.token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to save package");

      toast.success(editingId ? "Package updated" : "Package created");
      setIsModalOpen(false);
      setImageFile(null);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Error saving package");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!"
    });
    if (!result.isConfirmed) return;

    try {
      const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
      const res = await fetch(`${API_URL}/api/packages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminUser.token}`
        }
      });
      if (res.ok) {
        toast.success("Package deleted");
        fetchData();
      }
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const openModal = (pkg: any = null) => {
    if (pkg) {
      setEditingId(pkg._id);
      setFormData({
        name: pkg.name,
        description: pkg.description,
        price: pkg.price.toString(),
        image: pkg.image || "",
        pageTarget: pkg.pageTarget,
        isPopular: pkg.isPopular || false,
        features: pkg.features && pkg.features.length > 0 ? pkg.features : [""]
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", description: "", price: "", image: "", pageTarget: "", isPopular: false, features: [""] });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const getCategoryName = (slug: string) => {
    if (slug === "ring-decoration") return "Ring Decoration";
    if (slug === "wall-decoration") return "Wall & Door Decor";
    if (slug === "corporate-planner") return "Corporate Planner";
    const cat = categories.find(c => c.slug === slug);
    return cat ? cat.name : slug;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-[#ECE9E2]">
        <div>
          <h2 className="text-2xl font-bold text-black">Page Packages (Pricing Plans)</h2>
          <p className="text-sm text-neutral-500 mt-1">Manage standard packages for different category pages</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-[#182033] hover:bg-[#F5A000] text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>Add Package</span>
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-neutral-500">Loading...</div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-[#ECE9E2] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-[#ECE9E2]">
                <th className="p-4 text-sm font-semibold text-neutral-600">Image</th>
                <th className="p-4 text-sm font-semibold text-neutral-600">Package Details</th>
                <th className="p-4 text-sm font-semibold text-neutral-600">Assigned Page</th>
                <th className="p-4 text-sm font-semibold text-neutral-600">Price</th>
                <th className="p-4 text-sm font-semibold text-neutral-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map(p => (
                <tr key={p._id} className="border-b border-[#ECE9E2] last:border-0 hover:bg-neutral-50/50">
                  <td className="p-4">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-16 h-12 rounded-lg object-cover" />
                    ) : (
                      <div className="w-16 h-12 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-black flex items-center gap-2">
                      {p.name}
                      {p.isPopular && <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold">POPULAR</span>}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1 line-clamp-1">{p.description}</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                      {getCategoryName(p.pageTarget)}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-neutral-900">₹{p.price.toLocaleString("en-IN")}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => openModal(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(p._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {packages.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-neutral-500">No packages found. Add one above!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl my-8 shadow-2xl relative">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md flex justify-between items-center p-6 border-b border-[#ECE9E2] rounded-t-3xl z-10">
              <h3 className="text-xl font-bold text-black">{editingId ? "Edit Package" : "Add Package"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-black">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              <div>
                <label className="block text-sm font-bold text-black mb-1.5">Package Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none text-sm"
                  placeholder="e.g. Classic Wall Arch"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-1.5">Target Page (Where this shows)</label>
                <select 
                  required
                  value={formData.pageTarget}
                  onChange={e => setFormData({...formData, pageTarget: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none text-sm"
                >
                  <option value="">-- Select Target Page --</option>
                  <optgroup label="Dedicated Service Pages">
                    <option value="ring-decoration">Ring Decoration (/services/ring-decoration)</option>
                    <option value="wall-decoration">Wall Decoration (/services/wall-decoration)</option>
                    <option value="corporate-planner">Corporate Planner (/about)</option>
                  </optgroup>
                  <optgroup label="Category Pages">
                    {categories.map(c => (
                      <option key={c._id} value={c.slug}>{c.name}</option>
                    ))}
                  </optgroup>
                </select>
                <p className="text-xs text-neutral-500 mt-1">Select the service or category page where this package should appear.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-1.5">Description</label>
                <textarea 
                  required
                  rows={2}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none text-sm resize-none"
                  placeholder="e.g. Elegant and neat wall balloon styling, perfect for compact spaces."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-black mb-1.5">Price (₹)</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none text-sm"
                  />
                </div>
                
                <div className="flex items-center pt-8">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.isPopular}
                      onChange={e => setFormData({...formData, isPopular: e.target.checked})}
                      className="w-5 h-5 text-[#F5A000] rounded focus:ring-[#F5A000] border-[#ECE9E2]"
                    />
                    <span className="text-sm font-bold text-black">Mark as "Most Popular"</span>
                  </label>
                </div>
              </div>


              <div>
                <label className="block text-sm font-bold text-black mb-1.5">Package Features (Bullet Points)</label>
                {(formData.features || []).map((feat, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input 
                      type="text" 
                      value={feat}
                      onChange={e => {
                        const newFeatures = [...(formData.features || [])];
                        newFeatures[index] = e.target.value;
                        setFormData({...formData, features: newFeatures});
                      }}
                      className="w-full px-4 py-2 rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none text-sm"
                      placeholder="e.g. Half/Full Wall Balloon Arch"
                    />
                    <button 
                      type="button" 
                      onClick={() => {
                        const newFeatures = (formData.features || []).filter((_, i) => i !== index);
                        setFormData({...formData, features: newFeatures});
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, features: [...(formData.features || []), ""]})}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-1"
                >
                  <Plus size={14} /> Add Feature
                </button>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-1.5">Package Image (Cloudinary)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#FFF4D6] file:text-[#F5A000] hover:file:bg-[#F5A000] hover:file:text-white transition-all"
                />
                {formData.image && !imageFile && (
                  <img src={formData.image} alt="Preview" className="mt-3 w-40 h-24 rounded-lg object-cover border border-[#ECE9E2]" />
                )}
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-[#ECE9E2]">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-medium text-neutral-600 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="px-5 py-2.5 rounded-xl font-medium bg-[#182033] text-white hover:bg-[#F5A000] disabled:opacity-70 transition-colors"
                >
                  {uploading ? "Uploading to Cloudinary..." : "Save Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
