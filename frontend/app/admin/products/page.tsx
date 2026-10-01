"use client";
import Swal from "sweetalert2";

import React, { useState, useEffect, useMemo } from "react";
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Search, Filter, Layers, FolderTree, ChevronLeft, ChevronRight, PlusCircle, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { API_URL } from "@/config";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Background scroll lock when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Filters & Pagination State
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const defaultFaqs = [
    { question: "Can I customize the product?", answer: "Yes. Customization can be discussed with the team according to your event requirements and selected product." },
    { question: "How early should I book?", answer: "Booking in advance is recommended so the required date, materials and service team can be arranged." },
    { question: "Is setup included?", answer: "The service includes the setup items described in the What's Included section." },
    { question: "How do I confirm my booking?", answer: "Use the Book Now button to continue to the payment and booking flow." }
  ];

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    fullDescription: "",
    price: "",
    originalPrice: "",
    category: "",
    subcategory: "",
    image: "",
    badge: "Verified Quality Product",
    rating: "4.8",
    reviewCount: "98",
    cancellationPolicy: "Please contact our team as early as possible if you need to cancel or reschedule your booking. Cancellation and rescheduling availability may depend on the booking status, event date, and preparation already completed.",
    includedText: "Premium product / decoration\nQuality materials\nProfessional setup support\nOn-time service\nCustomer support",
    notIncludedText: "Venue booking charges\nCustom catering and food items\nAdditional power backup\nDamage caused by guests",
    faqs: defaultFaqs
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch(`${API_URL}/api/products`),
        fetch(`${API_URL}/api/categories`)
      ]);
      if (prodRes.ok && catRes.ok) {
        setProducts(await prodRes.json());
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

      // Parse line-by-line arrays
      const included = formData.includedText
        ? formData.includedText.split("\n").map(s => s.trim()).filter(Boolean)
        : [];
      const notIncluded = formData.notIncludedText
        ? formData.notIncludedText.split("\n").map(s => s.trim()).filter(Boolean)
        : [];
      
      const faqs = (formData.faqs || []).filter(f => f.question?.trim() && f.answer?.trim());

      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        fullDescription: formData.fullDescription,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : Math.round(Number(formData.price) * 1.25),
        category: formData.category,
        subcategory: formData.subcategory || null,
        image: finalImageUrl,
        badge: formData.badge,
        rating: Number(formData.rating) || 4.8,
        reviewCount: Number(formData.reviewCount) || 50,
        cancellationPolicy: formData.cancellationPolicy,
        included,
        notIncluded,
        faqs
      };

      const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
      const url = editingId 
        ? `${API_URL}/api/products/${editingId}`
        : `${API_URL}/api/products`;
      
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminUser.token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to save product");

      toast.success(editingId ? "Product updated" : "Product created");
      setIsModalOpen(false);
      setImageFile(null);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Error saving product");
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
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminUser.token}`
        }
      });
      if (res.ok) {
        toast.success("Product deleted");
        fetchData();
      }
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const openModal = (product: any = null) => {
    if (product) {
      setEditingId(product._id);
      
      const incText = Array.isArray(product.included) && product.included.length > 0
        ? product.included.join("\n")
        : "Premium product / decoration\nQuality materials\nProfessional setup support\nOn-time service\nCustomer support";
        
      const notIncText = Array.isArray(product.notIncluded) && product.notIncluded.length > 0
        ? product.notIncluded.join("\n")
        : "Venue booking charges\nCustom catering and food items\nAdditional power backup\nDamage caused by guests";

      const productFaqs = Array.isArray(product.faqs) && product.faqs.length > 0
        ? product.faqs.map((f: any) => ({ question: f.question || "", answer: f.answer || "" }))
        : defaultFaqs;

      setFormData({
        name: product.name || "",
        slug: product.slug || "",
        description: product.description || "",
        fullDescription: product.fullDescription || product.description || "",
        price: product.price ? product.price.toString() : "",
        originalPrice: product.originalPrice ? product.originalPrice.toString() : "",
        category: product.category ? (typeof product.category === "object" ? product.category._id : product.category) : "",
        subcategory: product.subcategory ? (typeof product.subcategory === "object" ? product.subcategory._id : product.subcategory) : "",
        image: product.image || "",
        badge: product.badge || "Verified Quality Product",
        rating: product.rating ? product.rating.toString() : "4.8",
        reviewCount: product.reviewCount ? product.reviewCount.toString() : "98",
        cancellationPolicy: product.cancellationPolicy || "Please contact our team as early as possible if you need to cancel or reschedule your booking. Cancellation and rescheduling availability may depend on the booking status, event date, and preparation already completed.",
        includedText: incText,
        notIncludedText: notIncText,
        faqs: productFaqs
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        slug: "",
        description: "",
        fullDescription: "",
        price: "",
        originalPrice: "",
        category: "",
        subcategory: "",
        image: "",
        badge: "Verified Quality Product",
        rating: "4.8",
        reviewCount: "98",
        cancellationPolicy: "Please contact our team as early as possible if you need to cancel or reschedule your booking. Cancellation and rescheduling availability may depend on the booking status, event date, and preparation already completed.",
        includedText: "Premium product / decoration\nQuality materials\nProfessional setup support\nOn-time service\nCustomer support",
        notIncludedText: "Venue booking charges\nCustom catering and food items\nAdditional power backup\nDamage caused by guests",
        faqs: defaultFaqs
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const mainCategories = useMemo(() => categories.filter(c => !c.parentCategory || !c.parentCategory._id), [categories]);

  // Subcategories for the modal form based on formData.category
  const subCategoriesForModal = useMemo(() => {
    return categories.filter(c => {
      if (!c.parentCategory || !formData.category) return false;
      const parentId = typeof c.parentCategory === "object" ? c.parentCategory._id : c.parentCategory;
      return String(parentId) === String(formData.category);
    });
  }, [categories, formData.category]);

  // Subcategories for the top filter bar based on selectedCategory
  const subCategoriesForFilter = useMemo(() => {
    if (selectedCategory === "ALL") return [];
    return categories.filter(c => {
      if (!c.parentCategory) return false;
      const parentId = typeof c.parentCategory === "object" ? c.parentCategory._id : c.parentCategory;
      return String(parentId) === String(selectedCategory);
    });
  }, [categories, selectedCategory]);

  // Filtered Products List
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Main Category Match
      if (selectedCategory !== "ALL") {
        const catId = p.category ? (typeof p.category === "object" ? p.category._id : p.category) : null;
        if (String(catId) !== String(selectedCategory)) return false;
      }

      // Subcategory Match
      if (selectedSubcategory !== "ALL") {
        const subId = p.subcategory ? (typeof p.subcategory === "object" ? p.subcategory._id : p.subcategory) : null;
        if (String(subId) !== String(selectedSubcategory)) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = p.name?.toLowerCase().includes(q);
        const slugMatch = p.slug?.toLowerCase().includes(q);
        const catName = p.category?.name?.toLowerCase().includes(q);
        const subName = p.subcategory?.name?.toLowerCase().includes(q);
        if (!nameMatch && !slugMatch && !catName && !subName) return false;
      }

      return true;
    });
  }, [products, selectedCategory, selectedSubcategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Reset to page 1 whenever filters change
  const handleCategoryFilterChange = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubcategory("ALL");
    setCurrentPage(1);
  };

  const handleSubcategoryFilterChange = (subId: string) => {
    setSelectedSubcategory(subId);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Top popular categories count calculation for quick-pills
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach(p => {
      const id = p.category ? (typeof p.category === "object" ? p.category._id : p.category) : null;
      if (id) {
        map[id] = (map[id] || 0) + 1;
      }
    });
    return map;
  }, [products]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-[#ECE9E2]">
        <div>
          <h2 className="text-2xl font-bold text-black flex items-center gap-2">Products</h2>
          <p className="text-sm text-neutral-500 mt-1">
            Total {products.length} products in catalog | Showing {filteredProducts.length} filtered
          </p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-[#182033] hover:bg-[#F5A000] text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center space-x-2 shadow-sm"
        >
          <Plus size={18} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Category Pills & Quick Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#ECE9E2] space-y-3.5 shadow-sm">
        {/* Quick Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => handleCategoryFilterChange("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === "ALL"
                ? "bg-[#182033] text-white shadow-sm"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            All Products ({products.length})
          </button>
          {mainCategories.map(cat => (
            <button
              key={cat._id}
              onClick={() => handleCategoryFilterChange(cat._id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat._id
                  ? "bg-[#F5A000] text-white shadow-sm"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === cat._id ? "bg-black/20 text-white" : "bg-neutral-200 text-neutral-700"}`}>
                {categoryCounts[cat._id] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Detailed Filters & Search Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2 border-t border-[#ECE9E2]">
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Select Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-500 whitespace-nowrap">Category:</span>
              <select
                value={selectedCategory}
                onChange={e => handleCategoryFilterChange(e.target.value)}
                className="px-3 py-2 text-xs font-semibold rounded-xl border border-[#ECE9E2] bg-neutral-50 focus:border-[#F5A000] outline-none"
              >
                <option value="ALL">All Categories</option>
                {mainCategories.map(c => (
                  <option key={c._id} value={c._id}>
                    {c.name} ({categoryCounts[c._id] || 0})
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Select Dropdown (Active only when category selected) */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-500 whitespace-nowrap">Subcategory:</span>
              <select
                value={selectedSubcategory}
                onChange={e => handleSubcategoryFilterChange(e.target.value)}
                disabled={selectedCategory === "ALL"}
                className={`px-3 py-2 text-xs font-semibold rounded-xl border border-[#ECE9E2] outline-none ${
                  selectedCategory === "ALL" 
                    ? "bg-neutral-100 text-neutral-400 cursor-not-allowed" 
                    : "bg-neutral-50 focus:border-[#F5A000]"
                }`}
              >
                <option value="ALL">
                  {selectedCategory === "ALL" ? "-- Choose Category First --" : "All Subcategories"}
                </option>
                {subCategoriesForFilter.map(s => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            {(selectedCategory !== "ALL" || selectedSubcategory !== "ALL" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("ALL");
                  setSelectedSubcategory("ALL");
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="text-xs font-bold text-red-500 hover:text-red-700 underline px-2 py-1"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Search product name or slug..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="p-8 text-center text-neutral-500">Loading products...</div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-[#ECE9E2] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-[#ECE9E2]">
                <th className="p-4 text-sm font-semibold text-neutral-600">Image</th>
                <th className="p-4 text-sm font-semibold text-neutral-600">Product Details</th>
                <th className="p-4 text-sm font-semibold text-neutral-600">Category & Subcategory</th>
                <th className="p-4 text-sm font-semibold text-neutral-600">Price</th>
                <th className="p-4 text-sm font-semibold text-neutral-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-neutral-400">
                    <p className="font-semibold text-neutral-600 text-sm">No products found</p>
                    <p className="text-xs text-neutral-400 mt-1">
                      Try selecting another category or clearing your search filter.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedProducts.map(p => (
                  <tr key={p._id} className="border-b border-[#ECE9E2] last:border-0 hover:bg-neutral-50/50">
                    <td className="p-4">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400">
                          <ImageIcon size={20} />
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-black text-sm">{p.name}</div>
                      <div className="text-xs text-neutral-500 mt-0.5 font-mono">{p.slug}</div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                        {p.category ? p.category.name : "-"}
                      </span>
                      {p.subcategory && (
                        <span className="ml-2 inline-flex bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                          {p.subcategory.name}
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-bold text-neutral-900 text-sm">â ¹{Number(p.price).toLocaleString("en-IN")}</td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => openModal(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(p._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-[#ECE9E2] bg-neutral-50/50">
              <span className="text-xs text-neutral-500 font-medium">
                Page {currentPage} of {totalPages} ({filteredProducts.length} total)
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-xl border border-[#ECE9E2] bg-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors flex items-center gap-1"
                >
                  <ChevronLeft size={14} /> Previous
                </button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 5 && currentPage > 3) {
                      pageNum = Math.min(totalPages - 4 + i, Math.max(1, currentPage - 2 + i));
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                          currentPage === pageNum
                            ? "bg-[#182033] text-white shadow-sm"
                            : "bg-white border border-[#ECE9E2] text-neutral-600 hover:bg-neutral-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-xl border border-[#ECE9E2] bg-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors flex items-center gap-1"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-3xl my-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
            <div className="sticky top-0 bg-white flex justify-between items-center p-6 border-b border-[#ECE9E2] rounded-t-3xl z-10">
              <h3 className="text-xl font-bold text-black">{editingId ? "Edit Product Details" : "Add New Product"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-black">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-black mb-1.5">Product Name</label>
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
                    placeholder="e.g. Premium Balloon Gate"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-1.5">Slug (Auto-generated)</label>
                  <input 
                    type="text" 
                    required
                    value={formData.slug}
                    onChange={e => setFormData({...formData, slug: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none text-sm bg-neutral-50 font-mono text-xs"
                    placeholder="e.g. premium-balloon-gate"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-1.5">Short Description</label>
                <textarea 
                  required
                  rows={2}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none text-sm resize-none"
                  placeholder="Short tagline or summary for cards..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-1.5">Full Detailed Description (Overview Tab)</label>
                <textarea 
                  rows={3}
                  value={formData.fullDescription}
                  onChange={e => setFormData({...formData, fullDescription: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none text-sm resize-none"
                  placeholder="Detailed explanation of the product, concept, theme and highlights..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-1.5">Price (â ¹)</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none text-sm"
                    placeholder="e.g. 1299"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-1.5">Original (MRP â ¹)</label>
                  <input 
                    type="number" 
                    min="0"
                    value={formData.originalPrice}
                    onChange={e => setFormData({...formData, originalPrice: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none text-sm"
                    placeholder="e.g. 1624"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-1.5">Rating (1-5)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={e => setFormData({...formData, rating: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none text-sm"
                    placeholder="4.8"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-1.5">Verified Reviews</label>
                  <input 
                    type="number" 
                    min="0"
                    value={formData.reviewCount}
                    onChange={e => setFormData({...formData, reviewCount: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none text-sm"
                    placeholder="98"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-1.5">Category</label>
                  <select 
                    required
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value, subcategory: ""})}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none text-sm font-medium"
                  >
                    <option value="">-- Select Category --</option>
                    {mainCategories.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-1.5">Subcategory</label>
                  <select 
                    value={formData.subcategory}
                    onChange={e => setFormData({...formData, subcategory: e.target.value})}
                    className={`w-full px-4 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none text-sm ${!formData.category ? "bg-neutral-100 text-neutral-400 cursor-not-allowed" : "bg-white"}`}
                    disabled={!formData.category}
                  >
                    <option value="">
                      {!formData.category 
                        ? "-- Select Category First --" 
                        : subCategoriesForModal.length === 0 
                          ? "-- No Subcategories Available --" 
                          : "-- Optional (Select Subcategory) --"}
                    </option>
                    {subCategoriesForModal.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-1.5">Badge Label</label>
                  <input 
                    type="text" 
                    value={formData.badge}
                    onChange={e => setFormData({...formData, badge: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none text-sm"
                    placeholder="Verified Quality Product"
                  />
                </div>
              </div>

              {/* What's Included & Not Included Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#FFF9E8]/60 p-4 rounded-2xl border border-amber-200/70">
                  <label className="block text-xs font-bold text-amber-900 mb-1">
                    â " What's Included (1 item per line)
                  </label>
                  <textarea 
                    rows={4}
                    value={formData.includedText}
                    onChange={e => setFormData({...formData, includedText: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-amber-200/80 bg-white focus:border-[#F5A000] outline-none text-xs leading-relaxed"
                    placeholder="Premium decoration setup&#10;Quality materials&#10;Professional setup support"
                  />
                </div>
                <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-200/60">
                  <label className="block text-xs font-bold text-rose-900 mb-1">
                    â - What's Not Included (1 item per line)
                  </label>
                  <textarea 
                    rows={4}
                    value={formData.notIncludedText}
                    onChange={e => setFormData({...formData, notIncludedText: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-rose-200/80 bg-white focus:border-[#F5A000] outline-none text-xs leading-relaxed"
                    placeholder="Venue booking charges&#10;Custom catering and food items&#10;Damage caused by guests"
                  />
                </div>
              </div>

              {/* Cancellation Policy */}
              <div>
                <label className="block text-sm font-bold text-black mb-1.5">Cancellation & Rescheduling Policy</label>
                <textarea 
                  rows={2}
                  value={formData.cancellationPolicy}
                  onChange={e => setFormData({...formData, cancellationPolicy: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#F5A000] outline-none text-xs resize-none"
                  placeholder="Policy for cancel and rescheduling..."
                />
              </div>

              {/* FAQ Section */}
              <div className="bg-neutral-50 p-4 rounded-2xl border border-[#ECE9E2] space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <label className="block text-sm font-bold text-black">Frequently Asked Questions (FAQs)</label>
                    <p className="text-[12px] text-neutral-500">Add dynamic questions & answers for customer doubts.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        faqs: [...formData.faqs, { question: "", answer: "" }]
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#182033] hover:bg-[#F5A000] text-white text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    <PlusCircle size={14} />
                    <span>Add New FAQ</span>
                  </button>
                </div>

                <div className="space-y-3 pt-2">
                  {formData.faqs.map((faq, index) => (
                    <div key={index} className="bg-white p-3.5 rounded-xl border border-[#ECE9E2] shadow-sm relative group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                          FAQ #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.faqs.filter((_, i) => i !== index);
                            setFormData({ ...formData, faqs: updated });
                          }}
                          className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded-lg transition cursor-pointer"
                          title="Remove FAQ"
                        >
                          <Trash size={14} />
                        </button>
                      </div>

                      <div className="space-y-2">
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const updated = [...formData.faqs];
                            updated[index].question = e.target.value;
                            setFormData({ ...formData, faqs: updated });
                          }}
                          placeholder="e.g. Can I customize the decoration theme?"
                          className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-[#ECE9E2] focus:border-[#F5A000] outline-none"
                        />
                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) => {
                            const updated = [...formData.faqs];
                            updated[index].answer = e.target.value;
                            setFormData({ ...formData, faqs: updated });
                          }}
                          placeholder="e.g. Yes, our team will coordinate with you to customize colors and themes."
                          className="w-full px-3 py-2 text-xs text-neutral-600 rounded-lg border border-[#ECE9E2] focus:border-[#F5A000] outline-none resize-none leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}
                  {formData.faqs.length === 0 && (
                    <p className="text-xs text-neutral-400 text-center py-2">No FAQs added yet. Click &quot;Add New FAQ&quot; to add one.</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-1.5">Product Image (Cloudinary)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#FFF4D6] file:text-[#F5A000] hover:file:bg-[#F5A000] hover:file:text-white transition-all cursor-pointer"
                />
                {formData.image && !imageFile && (
                  <img src={formData.image} alt="Preview" className="mt-3 w-20 h-20 rounded-lg object-cover border border-[#ECE9E2]" />
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
                  className="px-5 py-2.5 rounded-xl font-medium bg-[#182033] text-white hover:bg-[#F5A000] disabled:opacity-70 transition-colors shadow-sm"
                >
                  {uploading ? "Uploading to Cloudinary..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}