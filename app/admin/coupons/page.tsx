"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Ticket,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Sparkles,
  Calendar,
  Percent,
  IndianRupee,
  RefreshCw,
  X,
  Loader2,
  AlertCircle,
  Check,
  Copy,
  Clock,
  Users
} from "lucide-react";
import toast from "react-hot-toast";
import {
  CouponItem,
  fetchCouponsAdmin,
  createCouponAdmin,
  updateCouponAdmin,
  deleteCouponAdmin
} from "@/app/lib/api";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "expired">("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<CouponItem | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState<"PERCENTAGE" | "FLAT">("PERCENTAGE");
  const [discountValue, setDiscountValue] = useState<number | "">("");
  const [minOrderValue, setMinOrderValue] = useState<number | "">("");
  const [maxDiscountAmount, setMaxDiscountAmount] = useState<number | "">("");
  const [expiryDate, setExpiryDate] = useState("");
  const [usageLimit, setUsageLimit] = useState<number | "">("");
  const [isActive, setIsActive] = useState(true);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<CouponItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const loadCoupons = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchCouponsAdmin();
      setCoupons(Array.isArray(data) ? data : []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load coupons");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCoupons();
  }, [loadCoupons]);

  const handleOpenCreate = () => {
    setEditingCoupon(null);
    setCode("");
    setDescription("");
    setDiscountType("PERCENTAGE");
    setDiscountValue(10);
    setMinOrderValue(999);
    setMaxDiscountAmount(500);
    setExpiryDate("");
    setUsageLimit("");
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (coupon: CouponItem) => {
    setEditingCoupon(coupon);
    setCode(coupon.code);
    setDescription(coupon.description || "");
    setDiscountType(coupon.discountType || "PERCENTAGE");
    setDiscountValue(coupon.discountValue);
    setMinOrderValue(coupon.minOrderValue ?? "");
    setMaxDiscountAmount(coupon.maxDiscountAmount ?? "");
    setExpiryDate(coupon.expiryDate ? coupon.expiryDate.split("T")[0] : "");
    setUsageLimit(coupon.usageLimit ?? "");
    setIsActive(coupon.isActive);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error("Coupon code is required");
      return;
    }
    if (discountValue === "" || Number(discountValue) <= 0) {
      toast.error("Please enter a valid discount value");
      return;
    }

    setSubmitting(true);
    try {
      const payload: Partial<CouponItem> = {
        code: code.toUpperCase().trim(),
        description: description.trim(),
        discountType,
        discountValue: Number(discountValue),
        minOrderValue: minOrderValue === "" ? 0 : Number(minOrderValue),
        maxDiscountAmount: maxDiscountAmount === "" ? null : Number(maxDiscountAmount),
        expiryDate: expiryDate ? new Date(expiryDate).toISOString() : null,
        usageLimit: usageLimit === "" ? null : Number(usageLimit),
        isActive,
      };

      if (editingCoupon?._id) {
        await updateCouponAdmin(editingCoupon._id, payload);
        toast.success(`Coupon "${code.toUpperCase()}" updated successfully!`);
      } else {
        await createCouponAdmin(payload);
        toast.success(`Coupon "${code.toUpperCase()}" created successfully!`);
      }

      setIsModalOpen(false);
      loadCoupons();
    } catch (err: any) {
      toast.error(err.message || "Failed to save coupon");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (coupon: CouponItem) => {
    try {
      await updateCouponAdmin(coupon._id, { isActive: !coupon.isActive });
      toast.success(`Coupon ${coupon.code} is now ${!coupon.isActive ? "active" : "inactive"}`);
      loadCoupons();
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteCouponAdmin(deleteTarget._id);
      toast.success(`Coupon "${deleteTarget.code}" deleted!`);
      setDeleteTarget(null);
      loadCoupons();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete coupon");
    } finally {
      setIsDeleting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    toast.success(`Copied "${text}"`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Filtered List
  const filteredCoupons = useMemo(() => {
    const now = new Date();
    return coupons.filter((c) => {
      const matchesSearch =
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        (c.description && c.description.toLowerCase().includes(search.toLowerCase()));

      const isExpired = c.expiryDate ? new Date(c.expiryDate) < now : false;

      if (!matchesSearch) return false;

      if (statusFilter === "active") return c.isActive && !isExpired;
      if (statusFilter === "inactive") return !c.isActive;
      if (statusFilter === "expired") return isExpired;

      return true;
    });
  }, [coupons, search, statusFilter]);

  // KPIs
  const totalCount = coupons.length;
  const activeCount = coupons.filter((c) => {
    const isExpired = c.expiryDate ? new Date(c.expiryDate) < new Date() : false;
    return c.isActive && !isExpired;
  }).length;
  const expiredCount = coupons.filter((c) => c.expiryDate && new Date(c.expiryDate) < new Date()).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522]">
              Coupons & Discounts Engine
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EEF6EB] text-[#558234] border border-[#8CBC67]/30">
              Promo Manager
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#6B706C] mt-1">
            Create promotional discount codes, manage percentage/flat offers, minimum order thresholds & expiry dates.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={loadCoupons}
            className="inline-flex items-center space-x-2 px-3 py-2.5 rounded-2xl border border-[#E8E8E3] bg-white hover:bg-neutral-50 text-xs font-semibold text-[#202522] shadow-xs cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw size={14} className={loading ? "animate-spin text-[#8CBC67]" : ""} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-[#8CBC67] hover:bg-[#7AB055] text-white text-xs font-bold transition shadow-sm cursor-pointer"
          >
            <Plus size={16} />
            <span>Create Coupon</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#E8E8E3] shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#6B706C]">Total Coupons</p>
          <p className="text-2xl font-bold text-[#202522] mt-1">{totalCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#EEF6EB]/60 border border-[#8CBC67]/30 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Active Promos</p>
          <p className="text-2xl font-bold text-emerald-900 mt-1">{activeCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FCFBF7]/60 border border-[#8CBC67]/30 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#202522]">Expired Promos</p>
          <p className="text-2xl font-bold text-[#202522] mt-1">{expiredCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-blue-800">Total Redemptions</p>
          <p className="text-2xl font-bold text-blue-900 mt-1">
            {coupons.reduce((acc, c) => acc + (c.timesUsed || 0), 0)}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#E8E8E3] shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B706C]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search coupon code or description..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs text-[#202522] focus:outline-none focus:border-[#8CBC67]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: "all", label: `All (${totalCount})` },
            { id: "active", label: `Active (${activeCount})` },
            { id: "expired", label: `Expired (${expiredCount})` },
            { id: "inactive", label: `Inactive (${totalCount - activeCount - expiredCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-[#8CBC67] text-white shadow-xs"
                  : "bg-neutral-100 hover:bg-neutral-200 text-[#6B706C]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-3xl border border-[#E8E8E3] shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 size={32} className="animate-spin text-[#8CBC67]" />
            <p className="text-xs text-[#6B706C]">Loading coupons & promo offers...</p>
          </div>
        ) : filteredCoupons.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#EEF6EB] text-[#8CBC67] mx-auto flex items-center justify-center">
              <Ticket size={24} />
            </div>
            <p className="text-sm font-bold text-[#202522]">No coupons found</p>
            <p className="text-xs text-[#6B706C]">
              {search ? "No coupons matched your search criteria." : "Create your first discount coupon for customers."}
            </p>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="mt-2 inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#8CBC67] text-white text-xs font-bold hover:bg-[#7AB055] transition cursor-pointer"
            >
              <Plus size={14} />
              <span>Create Coupon</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E8E8E3] bg-[#FCFBF7] text-[#6B706C] text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Coupon Code & Details</th>
                  <th className="py-4 px-6">Discount Offer</th>
                  <th className="py-4 px-6">Min Order / Cap</th>
                  <th className="py-4 px-6 text-center">Expiry & Usage</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E3]">
                {filteredCoupons.map((coupon) => {
                  const isExpired = coupon.expiryDate ? new Date(coupon.expiryDate) < new Date() : false;

                  return (
                    <tr key={coupon._id} className="hover:bg-neutral-50/70 transition">
                      {/* Code & Description */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-2xl bg-[#EEF6EB] border border-[#8CBC67]/30 text-[#8CBC67] flex items-center justify-center font-bold flex-shrink-0">
                            <Ticket size={18} />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-mono font-bold text-sm text-[#202522] tracking-wider bg-neutral-100 px-2 py-0.5 rounded-lg border border-neutral-200">
                                {coupon.code}
                              </span>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(coupon.code)}
                                className="text-neutral-400 hover:text-[#8CBC67] transition p-1"
                                title="Copy code"
                              >
                                {copiedCode === coupon.code ? (
                                  <Check size={13} className="text-emerald-600" />
                                ) : (
                                  <Copy size={13} />
                                )}
                              </button>
                            </div>
                            {coupon.description && (
                              <p className="text-[11px] text-[#6B706C] mt-1 line-clamp-1 max-w-xs">
                                {coupon.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Discount Value */}
                      <td className="py-4 px-6">
                        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs">
                          {coupon.discountType === "PERCENTAGE" ? (
                            <>
                              <Percent size={13} />
                              <span>{coupon.discountValue}% OFF</span>
                            </>
                          ) : (
                            <>
                              <IndianRupee size={13} />
                              <span>₹{coupon.discountValue} FLAT OFF</span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Thresholds */}
                      <td className="py-4 px-6 text-[#202522]">
                        <p className="font-semibold text-xs">
                          Min: {coupon.minOrderValue ? `₹${coupon.minOrderValue}` : "No minimum"}
                        </p>
                        {coupon.discountType === "PERCENTAGE" && coupon.maxDiscountAmount && (
                          <p className="text-[10px] text-[#6B706C]">
                            Max cap: ₹{coupon.maxDiscountAmount}
                          </p>
                        )}
                      </td>

                      {/* Expiry & Redemptions */}
                      <td className="py-4 px-6 text-center">
                        <div className="space-y-1">
                          <p
                            className={`text-[11px] font-medium flex items-center justify-center gap-1 ${
                              isExpired ? "text-red-600 font-bold" : "text-[#6B706C]"
                            }`}
                          >
                            <Calendar size={12} />
                            <span>
                              {coupon.expiryDate
                                ? new Date(coupon.expiryDate).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : "No Expiry"}
                            </span>
                          </p>
                          <p className="text-[10px] text-neutral-400 font-mono">
                            Used {coupon.timesUsed || 0} times
                            {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ""}
                          </p>
                        </div>
                      </td>

                      {/* Active Status Toggle */}
                      <td className="py-4 px-6 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(coupon)}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                            isExpired
                              ? "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                              : coupon.isActive
                              ? "bg-[#EEF6EB] text-emerald-800 hover:bg-emerald-100"
                              : "bg-red-50 text-red-700 hover:bg-red-100"
                          }`}
                          title="Click to toggle status"
                        >
                          {isExpired ? (
                            <>
                              <Clock size={12} className="text-neutral-500" />
                              <span>Expired</span>
                            </>
                          ) : coupon.isActive ? (
                            <>
                              <CheckCircle size={12} className="text-emerald-600" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <XCircle size={12} className="text-red-500" />
                              <span>Inactive</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(coupon)}
                            className="p-2 rounded-xl text-neutral-600 hover:text-[#8CBC67] hover:bg-neutral-100 transition cursor-pointer"
                            title="Edit Coupon"
                          >
                            <Edit2 size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteTarget(coupon)}
                            className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            title="Delete Coupon"
                          >
                            <Trash2 size={15} />
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
      </div>

      {/* CREATE / EDIT COUPON MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-neutral-100 relative animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#EEF6EB] flex items-center justify-center text-[#8CBC67]">
                  <Ticket size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-neutral-900">
                    {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    Configure promo codes and discount parameters
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-4 overflow-y-auto flex-1 pr-1">
              {/* Code */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Coupon Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, ""))}
                  placeholder="e.g. PARTY20, WELCOME100, DIWALI2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-mono font-bold text-neutral-900 uppercase focus:outline-none focus:border-[#8CBC67]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Description / Campaign Note
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. 10% off on all birthday party packages above ₹999"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                />
              </div>

              {/* Discount Type & Value */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Discount Type
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 font-semibold focus:outline-none focus:border-[#8CBC67]"
                  >
                    <option value="PERCENTAGE">Percentage (% Off)</option>
                    <option value="FLAT">Flat Amount (₹ Off)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Discount Value <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 font-bold text-xs">
                      {discountType === "PERCENTAGE" ? "%" : "₹"}
                    </span>
                    <input
                      type="number"
                      required
                      min={1}
                      max={discountType === "PERCENTAGE" ? 100 : undefined}
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value === "" ? "" : Number(e.target.value))}
                      placeholder={discountType === "PERCENTAGE" ? "10" : "200"}
                      className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                    />
                  </div>
                </div>
              </div>

              {/* Min Order & Max Discount */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Min Order Value (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={minOrderValue}
                    onChange={(e) => setMinOrderValue(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="e.g. 999 (0 for none)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Max Discount Cap (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    disabled={discountType === "FLAT"}
                    value={maxDiscountAmount}
                    onChange={(e) => setMaxDiscountAmount(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder={discountType === "FLAT" ? "N/A for flat" : "e.g. 500"}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67] disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Expiry Date & Usage Limit */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Total Usage Limit (Optional)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Unlimited if blank"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                  />
                </div>
              </div>

              {/* Active Toggle */}
              <label className="flex items-center space-x-3 p-3 rounded-xl border border-neutral-200 bg-neutral-50/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-[#8CBC67] rounded accent-[#8CBC67]"
                />
                <div>
                  <p className="text-xs font-bold text-neutral-800">Active Coupon</p>
                  <p className="text-[10px] text-neutral-500">
                    Enable this coupon so customers can redeem it during booking.
                  </p>
                </div>
              </label>

              {/* Footer */}
              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-2xl bg-[#8CBC67] hover:bg-[#7AB055] text-white text-xs font-bold transition shadow-sm disabled:opacity-50 flex items-center space-x-1.5 cursor-pointer"
                >
                  {submitting && <Loader2 size={13} className="animate-spin" />}
                  <span>{editingCoupon ? "Save Changes" : "Create Coupon"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-neutral-100 space-y-4">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle size={20} />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-sm text-neutral-900">Delete Coupon?</h3>
              <p className="text-xs text-neutral-500">
                Are you sure you want to delete coupon{" "}
                <span className="font-mono font-bold text-neutral-800">{deleteTarget.code}</span>? Customers will no
                longer be able to redeem this code.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition disabled:opacity-50 flex items-center space-x-1.5 cursor-pointer"
              >
                {isDeleting && <Loader2 size={13} className="animate-spin" />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
