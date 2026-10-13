"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FolderTree,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  XCircle,
  Layers,
  Image as ImageIcon
} from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchCategories,
  fetchSubcategories,
  deleteCategory,
  createCategory,
  updateCategory,
  CategoryItem
} from "@/app/lib/api";

export default function SubcategoriesHubPage() {
  const [parentCategories, setParentCategories] = useState<CategoryItem[]>([]);
  const [selectedParentId, setSelectedParentId] = useState<string>("");
  const [subcategories, setSubcategories] = useState<CategoryItem[]>([]);
  const [loadingParents, setLoadingParents] = useState(true);
  const [loadingSubs, setLoadingSubs] = useState(false);

  // Quick Add Subcategory Modal / Form
  const [showAddModal, setShowAddModal] = useState(false);
  const [subName, setSubName] = useState("");
  const [subSlug, setSubSlug] = useState("");
  const [subDesc, setSubDesc] = useState("");
  const [subCreating, setSubCreating] = useState(false);

  // Delete modal
  const [deleteTarget, setDeleteTarget] = useState<CategoryItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch all parent categories
  useEffect(() => {
    async function loadParents() {
      try {
        setLoadingParents(true);
        const res = await fetchCategories({ parentOnly: true });
        const list = Array.isArray(res) ? res : res.categories;
        setParentCategories(list);
        if (list.length > 0) {
          setSelectedParentId(list[0]._id);
        }
      } catch (err: any) {
        toast.error("Failed to load parent categories");
      } finally {
        setLoadingParents(false);
      }
    }
    loadParents();
  }, []);

  // Fetch subcategories when selectedParentId changes
  const loadSubcategories = useCallback(async () => {
    if (!selectedParentId) {
      setSubcategories([]);
      return;
    }
    try {
      setLoadingSubs(true);
      const data = await fetchSubcategories(selectedParentId);
      setSubcategories(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load subcategories");
    } finally {
      setLoadingSubs(false);
    }
  }, [selectedParentId]);

  useEffect(() => {
    loadSubcategories();
  }, [loadSubcategories]);

  const handleCreateSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subName.trim()) {
      toast.error("Subcategory name is required");
      return;
    }
    if (!selectedParentId) {
      toast.error("Please select a parent category");
      return;
    }

    try {
      setSubCreating(true);
      await createCategory({
        name: subName.trim(),
        slug: subSlug.trim() || undefined,
        description: subDesc.trim(),
        parentCategory: selectedParentId as any,
        isActive: true,
      });
      toast.success("Subcategory created!");
      setShowAddModal(false);
      setSubName("");
      setSubSlug("");
      setSubDesc("");
      loadSubcategories();
    } catch (err: any) {
      toast.error(err.message || "Failed to create subcategory");
    } finally {
      setSubCreating(false);
    }
  };

  const handleDeleteSubcategory = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteCategory(deleteTarget._id);
      toast.success(`Subcategory "${deleteTarget.name}" deleted successfully`);
      setDeleteTarget(null);
      loadSubcategories();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete subcategory");
    } finally {
      setIsDeleting(false);
    }
  };

  const selectedParent = parentCategories.find((p) => p._id === selectedParentId);

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#E8E8E3] p-6 rounded-3xl shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EEF6EB] text-[#8CBC67] flex items-center justify-center font-bold">
            <Layers size={20} />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#202522]">
              Subcategories Manager
            </h1>
            <p className="text-xs text-[#6B706C] mt-0.5">
              Browse, add, and organize subcategories under each main parent category
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/categories"
            className="px-4 py-2.5 rounded-2xl border border-[#E8E8E3] bg-[#FCFBF7] text-[#202522] hover:bg-neutral-100 text-xs font-bold transition"
          >
            All Categories
          </Link>
          <button
            onClick={() => setShowAddModal(true)}
            disabled={!selectedParentId}
            className="bg-[#8CBC67] hover:bg-[#7AB055] text-neutral-950 px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md transition disabled:opacity-50"
          >
            <Plus size={16} />
            <span>Add Subcategory</span>
          </button>
        </div>
      </div>

      {/* Main split grid: Parent Category selector on left, Subcategories list on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Parent Category Selector */}
        <div className="lg:col-span-4 bg-white border border-[#E8E8E3] rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E3]">
            <h2 className="font-serif text-base font-bold text-[#202522]">
              Select Parent Category
            </h2>
            <span className="text-xs font-bold text-[#8CBC67] bg-[#EEF6EB] px-2.5 py-0.5 rounded-full">
              {parentCategories.length}
            </span>
          </div>

          {loadingParents ? (
            <div className="p-8 text-center">
              <Loader2 size={24} className="animate-spin mx-auto text-[#8CBC67]" />
            </div>
          ) : parentCategories.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#6B706C]">
              No main categories available. Create one first!
            </div>
          ) : (
            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
              {parentCategories.map((cat) => {
                const isSelected = cat._id === selectedParentId;
                return (
                  <button
                    key={cat._id}
                    onClick={() => setSelectedParentId(cat._id)}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold flex items-center justify-between transition ${
                      isSelected
                        ? "bg-[#8CBC67]/15 text-[#202522] border-2 border-[#8CBC67] font-bold shadow-sm"
                        : "bg-[#FCFBF7] text-[#6B706C] hover:text-[#202522] hover:bg-neutral-100 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <FolderTree size={16} className={isSelected ? "text-[#8CBC67]" : "text-[#6B706C]"} />
                      <span className="truncate">{cat.name}</span>
                    </div>
                    {isSelected && <ArrowRight size={14} className="text-[#8CBC67] shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Subcategories for Selected Parent */}
        <div className="lg:col-span-8 bg-white border border-[#E8E8E3] rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-[#E8E8E3]">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8CBC67] tracking-wider">
                Current Hierarchy
              </span>
              <h2 className="font-serif text-xl font-bold text-[#202522]">
                {selectedParent ? `Subcategories of "${selectedParent.name}"` : "Subcategories"}
              </h2>
            </div>
            <span className="text-xs text-[#6B706C] bg-neutral-100 px-3 py-1 rounded-full font-bold">
              {subcategories.length} subcategories
            </span>
          </div>

          {loadingSubs ? (
            <div className="p-16 text-center space-y-3">
              <Loader2 size={32} className="animate-spin mx-auto text-[#8CBC67]" />
              <p className="text-xs text-[#6B706C]">Loading subcategories...</p>
            </div>
          ) : subcategories.length === 0 ? (
            <div className="p-16 text-center space-y-4">
              <Layers size={40} className="mx-auto text-[#6B706C] opacity-40" />
              <h3 className="font-serif text-lg font-bold text-[#202522]">No subcategories yet</h3>
              <p className="text-xs text-[#6B706C] max-w-sm mx-auto">
                {selectedParent
                  ? `There are no subcategories linked under "${selectedParent.name}". Click below to add one.`
                  : "Select a parent category to view its subcategories."}
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-[#8CBC67] text-neutral-950 text-xs font-bold shadow-sm"
              >
                <Plus size={14} />
                <span>Add Subcategory</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subcategories.map((sub) => (
                <div
                  key={sub._id}
                  className="bg-[#FCFBF7] border border-[#E8E8E3] rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E8E3] overflow-hidden flex items-center justify-center shrink-0">
                        {sub.image ? (
                          <img src={sub.image} alt={sub.name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={16} className="text-[#6B706C] opacity-40" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#202522]">{sub.name}</h4>
                        <p className="text-[10px] text-[#6B706C] font-mono">/{sub.slug}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Link
                        href={`/admin/categories/${sub._id}`}
                        className="p-1.5 rounded-lg text-[#202522] hover:bg-neutral-200 transition"
                        title="Edit Subcategory"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => setDeleteTarget(sub)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
                        title="Delete Subcategory"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {sub.description && (
                    <p className="text-xs text-[#6B706C] line-clamp-2">
                      {sub.description}
                    </p>
                  )}

                  <div className="pt-2 border-t border-[#E8E8E3] flex items-center justify-between text-[11px]">
                    <span className="text-[#6B706C]">
                      Order: <strong className="text-[#202522]">{sub.order}</strong>
                    </span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                        sub.isActive ? "bg-[#EEF6EB] text-emerald-700" : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {sub.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Add Subcategory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E8E8E3] shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#202522]">
                Add Subcategory under &quot;{selectedParent?.name}&quot;
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-[#6B706C] hover:text-black font-bold text-lg"
              >
                âœ•
              </button>
            </div>

            <form onSubmit={handleCreateSubcategory} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#202522] font-bold mb-1 uppercase tracking-wider">
                  Subcategory Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Balloon Kits"
                  value={subName}
                  onChange={(e) => {
                    setSubName(e.target.value);
                    if (!subSlug) {
                      setSubSlug(
                        e.target.value
                          .toLowerCase()
                          .trim()
                          .replace(/\s+/g, "-")
                          .replace(/[^\w-]+/g, "")
                      );
                    }
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30"
                />
              </div>

              <div>
                <label className="block text-[#202522] font-bold mb-1 uppercase tracking-wider">
                  Slug (URL path)
                </label>
                <input
                  type="text"
                  placeholder="e.g. balloon-kits"
                  value={subSlug}
                  onChange={(e) => setSubSlug(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30"
                />
              </div>

              <div>
                <label className="block text-[#202522] font-bold mb-1 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief description..."
                  value={subDesc}
                  onChange={(e) => setSubDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#E8E8E3] text-[#6B706C] font-bold hover:bg-neutral-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={subCreating}
                  className="px-5 py-2 rounded-xl bg-[#8CBC67] text-neutral-950 font-bold hover:bg-[#7AB055] transition shadow-sm flex items-center space-x-2"
                >
                  {subCreating ? <Loader2 size={14} className="animate-spin" /> : null}
                  <span>Save Subcategory</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E8E8E3] shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-serif text-xl font-bold text-[#202522]">
                Delete Subcategory?
              </h3>
              <p className="text-xs text-[#6B706C]">
                Are you sure you want to delete <strong>&quot;{deleteTarget.name}&quot;</strong>?
              </p>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2.5 rounded-xl border border-[#E8E8E3] text-xs font-bold text-[#6B706C] hover:bg-neutral-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteSubcategory}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-sm flex items-center space-x-2 disabled:opacity-60"
              >
                {isDeleting ? <Loader2 size={14} className="animate-spin" /> : null}
                <span>Delete Subcategory</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
