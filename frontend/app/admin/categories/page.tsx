"use client";
import Swal from "sweetalert2";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Layers, FolderTree, Search, Filter } from "lucide-react";
import toast from "react-hot-toast";
import { API_URL } from "@/config";

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "main" | "sub">("all");
  const [selectedParentFilter, setSelectedParentFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    parentCategory: "",
    image: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories");
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
        image: finalImageUrl,
        parentCategory: formData.parentCategory || null
      };

      const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
      const url = editingId 
        ? `${API_URL}/api/categories/${editingId}`
        : `${API_URL}/api/categories`;
      
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminUser.token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to save category");

      toast.success(editingId ? "Category updated successfully" : "Category created successfully");
      setIsModalOpen(false);
      setImageFile(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error("Error saving category");
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
      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminUser.token}`
        }
      });
      if (res.ok) {
        toast.success("Category deleted");
        fetchCategories();
      }
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const openModal = (category: any = null, defaultParentId: string = "") => {
    if (category) {
      setEditingId(category._id);
      const parentId = category.parentCategory
        ? (typeof category.parentCategory === "object" ? category.parentCategory._id : category.parentCategory)
        : "";
      setFormData({
        name: category.name || "",
        slug: category.slug || "",
        parentCategory: parentId ? String(parentId) : "",
        image: category.image || ""
      });
    } else {
      setEditingId(null);
      setFormData({ 
        name: "", 
        slug: "", 
        parentCategory: defaultParentId || "", 
        image: "" 
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const mainCategoriesList = categories.filter(c => !c.parentCategory || !c.parentCategory._id);
  const subCategoriesList = categories.filter(c => c.parentCategory && c.parentCategory._id);

  // Subcategories belonging to the selected parent in the modal
  const existingSubcategoriesOfSelectedParent = categories.filter(c => {
    if (!formData.parentCategory || !c.parentCategory) return false;
    const pid = typeof c.parentCategory === "object" ? c.parentCategory._id : c.parentCategory;
    return String(pid) === String(formData.parentCategory);
  });

  const selectedParentCategoryObject = mainCategoriesList.find(c => String(c._id) === String(formData.parentCategory));

  const filteredCategories = categories.filter(c => {
    const isSub = Boolean(c.parentCategory && c.parentCategory._id);
    if (activeTab === "main" && isSub) return false;
    if (activeTab === "sub" && !isSub) return false;

    // Filter by specific parent category dropdown
    if (selectedParentFilter !== "ALL") {
      const parentId = c.parentCategory 
        ? (typeof c.parentCategory === "object" ? c.parentCategory._id : c.parentCategory)
        : null;
      if (String(parentId) !== selectedParentFilter) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const parentName = c.parentCategory ? (c.parentCategory.name || "") : "";
      return c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q) || parentName.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-[#ECE9E2]">
        <div>
          <h2 className="text-2xl font-bold text-black flex items-center gap-2">
            Categories & Subcategories
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Total {categories.length} Categories ({mainCategoriesList.length} Main, {subCategoriesList.length} Subcategories)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => openModal(null, "")}
            className="bg-[#182033] hover:bg-[#F5A000] text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center space-x-2 shadow-sm"
          >
            <Plus size={18} />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs, Category Dropdown Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#ECE9E2]">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => { setActiveTab("all"); setSelectedParentFilter("ALL"); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "all" && selectedParentFilter === "ALL"
                ? "bg-[#182033] text-white shadow-sm"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            All ({categories.length})
          </button>
          <button
            onClick={() => { setActiveTab("main"); setSelectedParentFilter("ALL"); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === "main"
                ? "bg-[#F5A000] text-white shadow-sm"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            <Layers size={14} />
            Main Categories ({mainCategoriesList.length})
          </button>
          <button
            onClick={() => setActiveTab("sub")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === "sub"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            <FolderTree size={14} />
            Subcategories ({subCategoriesList.length})
          </button>
        </div>

        {/* Filter by Category Dropdown & Search Input */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-neutral-500 whitespace-nowrap hidden sm:inline">Filter:</span>
            <select
              value={selectedParentFilter}
              onChange={e => {
                setSelectedParentFilter(e.target.value);
                if (e.target.value !== "ALL") setActiveTab("sub");
              }}
              className="w-full sm:w-48 px-3 py-2 text-xs font-semibold rounded-xl border border-[#ECE9E2] bg-neutral-50 focus:border-[#F5A000] outline-none"
            >
              <option value="ALL">All Categories</option>
              {mainCategoriesList.map(c => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-56">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="p-8 text-center text-neutral-500">Loading...</div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-[#ECE9E2] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-[#ECE9E2]">
                <th className="p-4 text-sm font-semibold text-neutral-600">Image</th>
                <th className="p-4 text-sm font-semibold text-neutral-600">Category Name</th>
                <th className="p-4 text-sm font-semibold text-neutral-600">Level</th>
                <th className="p-4 text-sm font-semibold text-neutral-600">Slug</th>
                <th className="p-4 text-sm font-semibold text-neutral-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-neutral-400 text-sm">
                    No categories found.
                  </td>
                </tr>
              ) : (
                filteredCategories.map(cat => {
                  const isSub = Boolean(cat.parentCategory && cat.parentCategory.name);
                  return (
                    <tr key={cat._id} className="border-b border-[#ECE9E2] last:border-0 hover:bg-neutral-50/50">
                      <td className="p-4">
                        {cat.image ? (
                          <img src={cat.image} alt={cat.name} className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400">
                            <ImageIcon size={20} />
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-black text-sm">{cat.name}</div>
                        {isSub && (
                          <div className="text-xs text-neutral-500 mt-0.5">
                            Under: <span className="font-semibold text-neutral-800">{cat.parentCategory.name}</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        {isSub ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            Subcategory
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            Main Category
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-neutral-500 text-xs font-mono">{cat.slug}</td>
                      <td className="p-4 text-right space-x-2">
                        <button 
                          onClick={() => openModal(cat)} 
                          title="Edit"
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(cat._id)} 
                          title="Delete"
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 my-6">
            <div className="flex justify-between items-center p-6 border-b border-[#ECE9E2]">
              <div>
                <h3 className="text-xl font-bold text-black">
                  {editingId ? "Edit Category" : "Add New Category"}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Select category level and configure details
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-black p-1 rounded-lg">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Type Selection Tabs */}
              <div>
                <label className="block text-xs font-bold text-neutral-600 uppercase tracking-wider mb-2">
                  Category Level
                </label>
                <div className="grid grid-cols-2 gap-3 p-1.5 bg-neutral-100 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, parentCategory: "" })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      !formData.parentCategory
                        ? "bg-white text-black shadow-sm"
                        : "text-neutral-500 hover:text-black"
                    }`}
                  >
                    <Layers size={15} className={!formData.parentCategory ? "text-[#F5A000]" : ""} />
                    Main Category
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const firstMain = mainCategoriesList[0];
                      setFormData({
                        ...formData,
                        parentCategory: firstMain ? String(firstMain._id) : ""
                      });
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      !!formData.parentCategory
                        ? "bg-white text-black shadow-sm"
                        : "text-neutral-500 hover:text-black"
                    }`}
                  >
                    <FolderTree size={15} className={!!formData.parentCategory ? "text-blue-600" : ""} />
                    Subcategory
                  </button>
                </div>
              </div>

              {/* Parent Category Selection & Existing Subcategories Preview */}
              {!!formData.parentCategory && (
                <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-blue-950 uppercase tracking-wider mb-1.5">
                      Select Parent Main Category <span className="text-red-500">*</span>
                    </label>
                    <select 
                      required
                      value={formData.parentCategory}
                      onChange={e => setFormData({ ...formData, parentCategory: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white focus:border-[#F5A000] outline-none text-sm font-semibold"
                    >
                      <option value="" disabled>-- Select a Main Category --</option>
                      {mainCategoriesList
                        .filter(c => c._id !== editingId)
                        .map(c => (
                          <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                  </div>

                  {/* English helper instruction & Existing Subcategories Tags */}
                  <div className="pt-1">
                    <p className="text-[11px] font-semibold text-blue-900 mb-1.5">
                      Subcategories already under {selectedParentCategoryObject?.name || "this category"} ({existingSubcategoriesOfSelectedParent.length}):
                    </p>
                    {existingSubcategoriesOfSelectedParent.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                        {existingSubcategoriesOfSelectedParent.map(sub => (
                          <span 
                            key={sub._id} 
                            className="inline-block bg-white text-blue-800 text-[11px] font-medium px-2 py-0.5 rounded-lg border border-blue-200/80 shadow-2xs"
                          >
                            {sub.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-neutral-500 italic">
                        No subcategories exist yet under this category.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Name Input */}
              <div>
                <label className="block text-sm font-bold text-black mb-1.5">
                  {formData.parentCategory ? "Subcategory Name" : "Main Category Name"}
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({
                    ...formData, 
                    name: e.target.value, 
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
                  })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none text-sm"
                  placeholder={formData.parentCategory ? "e.g. Kids Birthday, Ring Setup" : "e.g. Birthday, Wedding"}
                />
              </div>

              {/* Slug Input */}
              <div>
                <label className="block text-sm font-bold text-black mb-1.5">Slug (Auto-generated)</label>
                <input 
                  type="text" 
                  required
                  value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none text-sm bg-neutral-50 font-mono text-xs"
                  placeholder={formData.parentCategory ? "e.g. kids-birthday" : "e.g. birthday"}
                />
              </div>

              {/* Image Input */}
              <div>
                <label className="block text-sm font-bold text-black mb-1.5">Category Image (Optional)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#FFF4D6] file:text-[#F5A000] hover:file:bg-[#F5A000] hover:file:text-white transition-all cursor-pointer"
                />
                {formData.image && !imageFile && (
                  <img src={formData.image} alt="Preview" className="mt-3 w-16 h-16 rounded-lg object-cover border border-[#ECE9E2]" />
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex justify-end space-x-3 border-t border-[#ECE9E2]">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="px-6 py-2.5 rounded-xl font-bold bg-[#182033] text-white hover:bg-[#F5A000] disabled:opacity-70 transition-colors shadow-sm"
                >
                  {uploading ? "Saving..." : (editingId ? "Update Category" : "Save Category")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}