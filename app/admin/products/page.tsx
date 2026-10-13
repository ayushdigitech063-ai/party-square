"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Loader2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle,
  XCircle,
  ArrowUpDown,
  Tag,
  Layers,
  Image as ImageIcon
} from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchProducts,
  deleteProduct,
  fetchCategories,
  fetchSubcategories,
  ProductItem,
  CategoryItem
} from "@/app/lib/api";
import ProductForm from "./ProductForm";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add / Edit Product Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // Search & Filter State
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Pagination State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Category and subcategory filter dropdown options
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [subcategories, setSubcategories] = useState<CategoryItem[]>([]);

  // Delete Confirmation Modal State
  const [deleteTarget, setDeleteTarget] = useState<ProductItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load Main Categories for filter dropdown
  useEffect(() => {
    async function loadCats() {
      try {
        const res = await fetchCategories({ parentOnly: true });
        const list = Array.isArray(res) ? res : res.categories;
        setCategories(list);
      } catch (err: any) {
        console.error("Failed to load categories", err);
      }
    }
    loadCats();
  }, []);

  // Load Subcategories when Category filter changes
  useEffect(() => {
    if (!selectedCategory) {
      setSubcategories([]);
      setSelectedSubcategory("");
      return;
    }
    async function loadSubs() {
      try {
        const data = await fetchSubcategories(selectedCategory);
        setSubcategories(data);
      } catch (err: any) {
        console.error("Failed to load subcategories", err);
      }
    }
    loadSubs();
  }, [selectedCategory]);

  // Main Products Fetch
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params: any = {
        page,
        limit,
        search: search.trim() || undefined,
        category: selectedCategory || undefined,
        subcategory: selectedSubcategory || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        sort: sortBy,
      };

      const res = await fetchProducts(params);
      setProducts(res.products || []);
      setTotalPages(res.totalPages || 1);
      setTotalCount(res.total || 0);
    } catch (err: any) {
      setError(err.message || "Failed to load products");
      toast.error(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, selectedCategory, selectedSubcategory, statusFilter, sortBy]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteProduct(deleteTarget._id);
      toast.success(`Product "${deleteTarget.name}" deleted successfully`);
      setDeleteTarget(null);
      loadProducts();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#E8E8E3] p-6 rounded-3xl shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EEF6EB] text-[#8CBC67] flex items-center justify-center font-bold">
            <Package size={20} />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#202522]">
              All Products & Themes
            </h1>
            <p className="text-xs text-[#6B706C] mt-0.5">
              Manage inventory, themes, pricing and categories ({totalCount} total)
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingProduct(null);
            setShowProductModal(true);
          }}
          className="bg-[#8CBC67] hover:bg-[#7AB055] text-neutral-950 px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md transition cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white border border-[#E8E8E3] p-5 rounded-3xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B706C]" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name or SKU..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs text-[#202522] focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/30"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory("");
                setPage(1);
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs text-[#202522] focus:outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Filter */}
          <div>
            <select
              value={selectedSubcategory}
              onChange={(e) => {
                setSelectedSubcategory(e.target.value);
                setPage(1);
              }}
              disabled={!selectedCategory || subcategories.length === 0}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs text-[#202522] focus:outline-none disabled:opacity-50"
            >
              <option value="">
                {selectedCategory ? "All Subcategories" : "Select Category First"}
              </option>
              {subcategories.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs text-[#202522] focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>

        {/* Second row: Sort & Page size */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E8E8E3] text-xs">
          <div className="flex items-center space-x-2">
            <ArrowUpDown size={14} className="text-[#6B706C]" />
            <span className="text-[#6B706C]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-[#E8E8E3] bg-[#FCFBF7] text-xs font-semibold text-[#202522] focus:outline-none"
            >
              <option value="newest">Newest Added</option>
              <option value="oldest">Oldest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[#6B706C]">Per Page:</span>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-[#E8E8E3] bg-[#FCFBF7] text-xs font-semibold text-[#202522] focus:outline-none"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table Container */}
      <div className="bg-white border border-[#E8E8E3] rounded-3xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 size={36} className="animate-spin text-[#8CBC67]" />
            <p className="text-xs text-[#6B706C]">Loading products catalogue...</p>
          </div>
        ) : error ? (
          <div className="p-16 text-center space-y-4">
            <AlertTriangle size={36} className="mx-auto text-amber-600" />
            <p className="text-sm text-red-600 font-medium">{error}</p>
            <button
              onClick={loadProducts}
              className="px-5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold"
            >
              Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="p-20 text-center space-y-4">
            <Package size={44} className="mx-auto text-[#6B706C] opacity-40" />
            <h3 className="font-serif text-lg font-bold text-[#202522]">No products found</h3>
            <p className="text-xs text-[#6B706C] max-w-sm mx-auto">
              No products match your current search or filter filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setShowProductModal(true);
              }}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-[#8CBC67] text-neutral-950 text-xs font-bold shadow-sm cursor-pointer"
            >
              <Plus size={14} />
              <span>Add First Product</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E8E8E3] bg-[#FCFBF7] text-[#6B706C] uppercase font-bold tracking-wider">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Category / Subcategory</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6 text-center">Stock</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E3]">
                {products.map((prod) => {
                  const stockNum = prod.stock ?? 100;
                  const isLowStock = stockNum <= 5 && stockNum > 0;
                  const isOutOfStock = stockNum === 0;

                  return (
                    <tr key={prod._id} className="hover:bg-neutral-50/70 transition">
                      {/* Product details */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div
                            onClick={() => {
                              setEditingProduct(prod);
                              setShowProductModal(true);
                            }}
                            className="w-14 h-14 rounded-2xl bg-neutral-100 border border-[#E8E8E3] overflow-hidden flex items-center justify-center shrink-0 cursor-pointer hover:opacity-85 transition"
                            title="Edit product"
                          >
                            {prod.image ? (
                              <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon size={20} className="text-[#6B706C] opacity-40" />
                            )}
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingProduct(prod);
                                setShowProductModal(true);
                              }}
                              className="font-bold text-sm text-[#202522] hover:text-[#8CBC67] transition text-left cursor-pointer"
                            >
                              {prod.name}
                            </button>
                            <div className="flex items-center space-x-2 mt-0.5">
                              {prod.sku ? (
                                <span className="text-[10px] bg-neutral-100 px-2 py-0.5 rounded font-mono text-[#6B706C]">
                                  SKU: {prod.sku}
                                </span>
                              ) : (
                                <span className="text-[10px] text-[#6B706C] font-mono">
                                  slug: {prod.slug}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category & Subcategory */}
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <span className="inline-block bg-[#EEF6EB] text-[#202522] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                            {prod.category?.name || "Uncategorized"}
                          </span>
                          {prod.subcategory && (
                            <p className="text-[11px] text-[#6B706C]">
                              ↳ {prod.subcategory.name}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Pricing */}
                      <td className="py-4 px-6">
                        <div className="space-y-0.5">
                          <p className="font-bold text-sm text-[#202522]">
                            ₹{prod.price?.toLocaleString("en-IN")}
                          </p>
                          {prod.originalPrice && prod.originalPrice > prod.price && (
                            <p className="text-[11px] text-[#6B706C] line-through">
                              ₹{prod.originalPrice?.toLocaleString("en-IN")}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="py-4 px-6 text-center">
                        {isOutOfStock ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                            Out of Stock
                          </span>
                        ) : isLowStock ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            Low: {stockNum} left
                          </span>
                        ) : (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EEF6EB] text-emerald-700">
                            {stockNum} units
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6 text-center">
                        {prod.availability ? (
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
                          <Link
                            href={`/card/${prod.slug}`}
                            target="_blank"
                            className="p-2 rounded-xl text-[#6B706C] hover:text-[#202522] hover:bg-neutral-100 transition"
                            title="View on Storefront"
                          >
                            <Eye size={16} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(prod);
                              setShowProductModal(true);
                            }}
                            className="p-2 rounded-xl text-[#202522] hover:bg-[#EEF6EB] transition cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(prod)}
                            className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition"
                            title="Delete Product"
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
              Showing Page {page} of {totalPages} ({totalCount} total products)
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="p-2 rounded-xl border border-[#E8E8E3] hover:bg-neutral-100 disabled:opacity-40 transition"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="px-3 font-semibold text-[#202522]">
                {page} / {totalPages}
              </span>
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
                Delete Product?
              </h3>
              <p className="text-xs text-[#6B706C]">
                Are you sure you want to remove <strong>&quot;{deleteTarget.name}&quot;</strong>? This action cannot be undone.
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
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-sm flex items-center space-x-2 disabled:opacity-60"
              >
                {isDeleting ? <Loader2 size={14} className="animate-spin" /> : null}
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal Popup */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 border border-[#E8E8E3] shadow-2xl relative my-auto">
            <ProductForm
              key={editingProduct ? editingProduct._id : "new-product"}
              inModal={true}
              initialData={editingProduct || undefined}
              isEdit={!!editingProduct}
              onSuccess={() => {
                setShowProductModal(false);
                setEditingProduct(null);
                loadProducts();
              }}
              onCancel={() => {
                setShowProductModal(false);
                setEditingProduct(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
