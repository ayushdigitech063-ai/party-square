"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  MapPin, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  XCircle,
  TrendingUp,
  Building2,
  RefreshCw
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { API_URL } from "@/config";

interface CityData {
  _id?: string;
  name: string;
  state?: string;
  icon?: string;
  isActive: boolean;
  isPopular: boolean;
  order: number;
}

export default function AdminCitiesPage() {
  const [cities, setCities] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<CityData>({
    name: "",
    state: "",
    isActive: true,
    isPopular: false,
    order: 0,
  });

  // Background body scroll lock when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/cities?all=true`);
      if (res.ok) {
        const data = await res.json();
        setCities(data);
      } else {
        toast.error("Failed to load cities");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error while loading cities");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      state: "",
      isActive: true,
      isPopular: false,
      order: cities.length,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (city: CityData) => {
    setEditingId(city._id || null);
    setFormData({
      name: city.name,
      state: city.state || "",
      isActive: city.isActive !== undefined ? city.isActive : true,
      isPopular: !!city.isPopular,
      order: city.order || 0,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter a city name");
      return;
    }

    setSubmitting(true);
    try {
      const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
      const url = editingId 
        ? `${API_URL}/api/cities/${editingId}`
        : `${API_URL}/api/cities`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminUser.token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save city");
      }

      toast.success(editingId ? "City updated successfully!" : "City added successfully!");
      closeModal();
      fetchCities();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: "Delete City?",
      text: `Are you sure you want to delete "${name}"? It will no longer appear on the website.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#F3F4F6",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "<span style='color:#182033'>Cancel</span>",
      background: "#ffffff",
      color: "#182033",
      customClass: { popup: "rounded-[20px] border border-[#ECE9E2] shadow-sm" },
    });

    if (result.isConfirmed) {
      try {
        const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
        const res = await fetch(`${API_URL}/api/cities/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${adminUser.token}`,
          },
        });

        if (res.ok) {
          toast.success(`"${name}" removed successfully!`);
          fetchCities();
        } else {
          const data = await res.json();
          toast.error(data.message || "Failed to delete city");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete city");
      }
    }
  };

  const handleToggleStatus = async (city: CityData) => {
    try {
      const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
      const res = await fetch(`${API_URL}/api/cities/${city._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminUser.token}`,
        },
        body: JSON.stringify({
          isActive: !city.isActive,
        }),
      });

      if (res.ok) {
        toast.success(`${city.name} status updated`);
        fetchCities();
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // Filter cities by search query
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (city.state && city.state.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-6 border border-neutral-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100/80 border border-amber-300/80 flex items-center justify-center text-amber-700">
              <MapPin size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#182033] tracking-tight">
                Cities &amp; Locations
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                Manage operational cities. Cities added here appear dynamically in the customer popup &amp; navbar selector.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={fetchCities}
            title="Refresh list"
            className="p-3 rounded-2xl border border-neutral-200 hover:border-amber-300 hover:bg-amber-50/50 text-neutral-600 hover:text-amber-700 transition cursor-pointer"
          >
            <RefreshCw size={17} className={loading ? "animate-spin text-amber-600" : ""} />
          </button>
          <button
            onClick={openCreateModal}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-sm shadow-md shadow-amber-500/20 transition cursor-pointer"
          >
            <Plus size={18} />
            <span>Add New City</span>
          </button>
        </div>
      </div>

      {/* Stats Quick Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600">
            <Building2 size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Total Cities</p>
            <p className="text-2xl font-bold text-[#182033] mt-0.5">{cities.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Active on Website</p>
            <p className="text-2xl font-bold text-emerald-600 mt-0.5">
              {cities.filter(c => c.isActive).length}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-center text-orange-600">
            <Sparkles size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Popular Hubs</p>
            <p className="text-2xl font-bold text-orange-600 mt-0.5">
              {cities.filter(c => c.isPopular).length}
            </p>
          </div>
        </div>
      </div>

      {/* Search & Actions Bar */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search city or state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/70 focus:bg-white text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-amber-400 transition"
          />
        </div>

        <p className="text-xs text-neutral-500 font-medium self-end sm:self-center">
          Showing <span className="font-bold text-neutral-800">{filteredCities.length}</span> of {cities.length} cities
        </p>
      </div>

      {/* Cities Table / Grid */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
            <RefreshCw size={26} className="animate-spin text-amber-500" />
            <p className="text-sm font-medium text-neutral-500">Loading cities from database...</p>
          </div>
        ) : filteredCities.length === 0 ? (
          <div className="py-16 text-center">
            <MapPin size={38} className="mx-auto text-neutral-300 mb-2" />
            <h3 className="text-base font-semibold text-neutral-700">No cities found</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
              {searchQuery ? `No results match "${searchQuery}". Try another keyword.` : "Click '+ Add New City' above to add your first delivery location."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200/80 bg-neutral-50/80 text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                  <th className="py-3.5 px-5">Order</th>
                  <th className="py-3.5 px-5">City Name</th>
                  <th className="py-3.5 px-5">State / Region</th>
                  <th className="py-3.5 px-5 text-center">Popular Hub</th>
                  <th className="py-3.5 px-5 text-center">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm">
                {filteredCities.map((city, idx) => (
                  <tr key={city._id || idx} className="hover:bg-amber-50/30 transition-colors group">
                    <td className="py-4 px-5 text-xs font-mono font-medium text-neutral-400">
                      #{city.order !== undefined ? city.order : idx + 1}
                    </td>

                    <td className="py-4 px-5 font-semibold text-neutral-900">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-100/70 border border-amber-200/80 flex items-center justify-center text-amber-700 text-sm font-bold">
                          📍
                        </div>
                        <span className="text-neutral-900">{city.name}</span>
                      </div>
                    </td>

                    <td className="py-4 px-5 text-neutral-600 text-xs">
                      {city.state ? city.state : <span className="text-neutral-400 italic">Not set</span>}
                    </td>

                    <td className="py-4 px-5 text-center">
                      {city.isPopular ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-orange-100 text-orange-800 border border-orange-200">
                          <Sparkles size={11} />
                          Popular
                        </span>
                      ) : (
                        <span className="text-neutral-400 text-xs">-</span>
                      )}
                    </td>

                    <td className="py-4 px-5 text-center">
                      <button
                        onClick={() => handleToggleStatus(city)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition ${
                          city.isActive
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300/60"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border border-neutral-300/60"
                        }`}
                        title="Click to toggle status"
                      >
                        {city.isActive ? (
                          <>
                            <CheckCircle2 size={12} />
                            Active
                          </>
                        ) : (
                          <>
                            <XCircle size={12} />
                            Inactive
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(city)}
                          className="p-2 rounded-xl text-neutral-600 hover:text-amber-700 hover:bg-amber-100/70 border border-neutral-200 hover:border-amber-300 transition cursor-pointer"
                          title="Edit City"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(city._id!, city.name)}
                          className="p-2 rounded-xl text-neutral-500 hover:text-rose-600 hover:bg-rose-50 border border-neutral-200 hover:border-rose-300 transition cursor-pointer"
                          title="Delete City"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit City Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-neutral-200 shadow-2xl p-6 sm:p-7 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 font-bold">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#182033]">
                    {editingId ? "Edit City Details" : "Add New City"}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {editingId ? "Update operational city info" : "Add a new city for website customers"}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  City Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune, Jaipur, Chandigarh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-amber-400 focus:outline-none text-sm text-neutral-800 placeholder:text-neutral-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  State / Region (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maharashtra, Rajasthan, Punjab"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-amber-400 focus:outline-none text-sm text-neutral-800 placeholder:text-neutral-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-amber-400 focus:outline-none text-sm text-neutral-800"
                  />
                  <p className="text-[11px] text-neutral-400 mt-1">Lower order appears first.</p>
                </div>

                <div className="space-y-3 pt-3">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-amber-500 rounded border-neutral-300 focus:ring-amber-400"
                    />
                    <span className="text-xs font-medium text-neutral-800">Active on Website</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.isPopular}
                      onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                      className="w-4 h-4 text-amber-500 rounded border-neutral-300 focus:ring-amber-400"
                    />
                    <span className="text-xs font-medium text-neutral-800">Mark as Popular</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2.5 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-100 font-medium text-sm transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-sm shadow-md shadow-amber-500/20 transition cursor-pointer disabled:opacity-50"
                >
                  {submitting && <RefreshCw size={14} className="animate-spin" />}
                  <span>{editingId ? "Save Changes" : "Create City"}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
