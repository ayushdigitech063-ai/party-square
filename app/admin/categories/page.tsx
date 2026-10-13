"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  FolderTree,
  Loader2,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchCategories, deleteCategory, CategoryItem, PaginatedCategories } from "@/app/lib/api";
import CategoryForm from "./CategoryForm";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "main" | "sub">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  // Add / Edit modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CategoryItem | null>(null);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<CategoryItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params: any = {
        page,
        limit,
        search: search.trim() || undefined,
      };

      if (filterType === "main") {
        params.parentOnly = true;
      }
      if (statusFilter === "active") {
        params.isActive = true;
      } else if (statusFilter === "inactive") {
        params.isActive = false;
      }

      const res = await fetchCategories(params);

      if ("categories" in res) {
        let list = res.categories;
        if (filterType === "sub") {
          list = list.filter((c) => !!c.parentCategory);
        }
        setCategories(list);
        setTotalPages(res.totalPages || 1);
        setTotalCount(res.total || list.length);
      } else {
        let list = res;
        if (filterType === "sub") {
          list = list.filter((c) => !!c.parentCategory);
        }
        setCategories(list);
        setTotalPages(1);
        setTotalCount(list.length);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load categories");
      toast.error(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, [page, search, filterType, statusFilter]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteCategory(deleteTarget._id);
      toast.success(`Category "${deleteTarget.name}" removed successfully`);
      setDeleteTarget(null);
      loadCategories();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete category");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#E8E8E3] p-6 rounded-3xl shadow-sm">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EEF6EB] text-[#8CBC67] flex items-center justify-center font-bold">
              <FolderTree size={20} />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-[#202522]">
                Category Management
              </h1>
              <p className="text-xs text-[#6B706C] mt-0.5">
                Organize main categories and subcategories ({totalCount} total)
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Link
            href="/admin/categories/subcategories"
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl border border-[#E8E8E3] bg-[#FCFBF7] text-[#202522] hover:bg-neutral-100 text-xs font-bold transition flex items-center justify-center space-x-2"
          >
            <span>Subcategories Hub</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 sm:flex-none bg-[#8CBC67] hover:bg-[#7AB055] text-neutral-950 px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 shadow-md transition cursor-pointer"
          >
            <Plus size={16} />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white border border-[#E8E8E3] p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B706C]" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Hierarchy Filter */}
          <div className="flex rounded-xl bg-[#FCFBF7] border border-[#E8E8E3] p-1 text-xs">
            <button
              onClick={() => {
                setFilterType("all");
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                filterType === "all" ? "bg-white text-[#202522] shadow-sm font-bold" : "text-[#6B706C]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                setFilterType("main");
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                filterType === "main" ? "bg-white text-[#202522] shadow-sm font-bold" : "text-[#6B706C]"
              }`}
            >
              Main Categories
            </button>
            <button
              onClick={() => {
                setFilterType("sub");
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                filterType === "sub" ? "bg-white text-[#202522] shadow-sm font-bold" : "text-[#6B706C]"
              }`}
            >
              Subcategories
            </button>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as any);
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs text-[#202522] focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white border border-[#E8E8E3] rounded-3xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center space-y-3">
            <Loader2 size={32} className="animate-spin text-[#8CBC67]" />
            <p className="text-xs text-[#6B706C]">Loading categories...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center space-y-4">
            <AlertTriangle size={36} className="mx-auto text-amber-600" />
            <p className="text-sm text-red-600 font-medium">{error}</p>
            <button
              onClick={loadCategories}
              className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold"
            >
              Retry
            </button>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <FolderTree size={40} className="mx-auto text-[#6B706C] opacity-40" />
            <h3 className="font-serif text-lg font-bold text-[#202522]">No categories found</h3>
            <p className="text-xs text-[#6B706C] max-w-sm mx-auto">
              No categories match your search or filter criteria. Create a new category to get started.
            </p>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-[#8CBC67] hover:bg-[#7AB055] text-neutral-950 text-xs font-bold shadow-sm transition cursor-pointer"
            >
              <Plus size={14} />
              <span>Add First Category</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E8E8E3] bg-[#FCFBF7] text-[#6B706C] uppercase font-bold tracking-wider">
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Type & Parent</th>
                  <th className="py-4 px-6 text-center">Products</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E3]">
                {categories.map((cat) => {
                  const isSub = !!cat.parentCategory;
                  return (
                    <tr key={cat._id} className="hover:bg-neutral-50/70 transition">
                      {/* Name & Image */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-xl bg-neutral-100 border border-[#E8E8E3] overflow-hidden flex items-center justify-center shrink-0">
                            {cat.image ? (
                              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon size={18} className="text-[#6B706C] opacity-40" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-[#202522]">{cat.name}</p>
                            <p className="text-[11px] text-[#6B706C] font-mono">/{cat.slug}</p>
                            {cat.description && (
                              <p className="text-[11px] text-[#6B706C] line-clamp-1 max-w-xs mt-0.5">
                                {cat.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Parent / Type */}
                      <td className="py-4 px-6">
                        {isSub ? (
                          <div className="space-y-1">
                            <span className="inline-block bg-[#F7D6C7]/50 text-[#C23B22] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                              Subcategory
                            </span>
                            <p className="text-xs text-[#202522] font-semibold">
                              Parent: {cat.parentCategory?.name}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <span className="inline-block bg-[#EEF6EB] text-[#202522] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                              Main Category
                            </span>
                            {cat.subcategoriesCount !== undefined && cat.subcategoriesCount > 0 && (
                              <p className="text-[11px] text-[#6B706C]">
                                {cat.subcategoriesCount} Subcategories
                              </p>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Products Count */}
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-neutral-100 text-[#202522] font-bold text-xs">
                          {cat.productCount ?? 0}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 text-center">
                        {cat.isActive ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#EEF6EB] text-emerald-700">
                            <CheckCircle size={12} />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-neutral-100 text-neutral-500">
                            <XCircle size={12} />
                            <span>Inactive</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setEditTarget(cat)}
                            className="p-2 rounded-xl text-[#202522] hover:bg-[#EEF6EB] transition cursor-pointer"
                            title="Edit Category"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(cat)}
                            className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition"
                            title="Delete Category"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {!loading && totalPages > 1 && (
          <div className="p-4 border-t border-[#E8E8E3] flex items-center justify-between text-xs text-[#6B706C]">
            <span>
              Showing Page {page} of {totalPages}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="p-2 rounded-xl border border-[#E8E8E3] hover:bg-neutral-100 disabled:opacity-40 transition"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="p-2 rounded-xl border border-[#E8E8E3] hover:bg-neutral-100 disabled:opacity-40 transition"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E8E8E3] shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-serif text-xl font-bold text-[#202522]">
                Delete Category?
              </h3>
              <p className="text-xs text-[#6B706C]">
                Are you sure you want to delete <strong>&quot;{deleteTarget.name}&quot;</strong>?
              </p>
              {deleteTarget.productCount && deleteTarget.productCount > 0 ? (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-left text-xs text-red-700 space-y-1">
                  <p className="font-bold">Cannot delete:</p>
                  <p>
                    This category is currently linked to {deleteTarget.productCount} products.
                    Please reassign or delete those products first.
                  </p>
                </div>
              ) : null}
              {deleteTarget.subcategoriesCount && deleteTarget.subcategoriesCount > 0 ? (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-left text-xs text-amber-800 space-y-1">
                  <p className="font-bold">Child Subcategories:</p>
                  <p>
                    This category has {deleteTarget.subcategoriesCount} child subcategories.
                    Please remove or reassign them first.
                  </p>
                </div>
              ) : null}
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
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-sm flex items-center space-x-2 disabled:opacity-60"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Category</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Category Popup Modal */}
      {(isAddModalOpen || editTarget) && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-[#E8E8E3] shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Top Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E8E3] bg-[#FCFBF7]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EEF6EB] text-[#8CBC67] flex items-center justify-center font-bold">
                  <FolderTree size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#202522]">
                    {editTarget ? "Edit Category" : "Add New Category"}
                  </h3>
                  <p className="text-xs text-[#6B706C]">
                    {editTarget
                      ? `Update details for "${editTarget.name}"`
                      : "Fill in details to create a new category or subcategory"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditTarget(null);
                }}
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#202522] flex items-center justify-center transition cursor-pointer"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body with CategoryForm */}
            <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
              <CategoryForm
                key={editTarget ? editTarget._id : "new-category"}
                initialData={editTarget || undefined}
                isEdit={!!editTarget}
                isModal={true}
                onSuccess={() => {
                  setIsAddModalOpen(false);
                  setEditTarget(null);
                  loadCategories();
                }}
                onCancel={() => {
                  setIsAddModalOpen(false);
                  setEditTarget(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
