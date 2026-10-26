"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Users2,
  Plus,
  Search,
  Edit2,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  XCircle,
  RefreshCw,
  X,
  Loader2,
  ShieldCheck,
  CalendarCheck,
  Briefcase
} from "lucide-react";
import toast from "react-hot-toast";
import {
  StaffItem,
  fetchStaffAdmin,
  createStaffAdmin,
  updateStaffAdmin,
  deleteStaffAdmin,
  fetchCities,
  CityItem
} from "@/app/lib/api";

const STAFF_ROLES = [
  "Lead Decorator",
  "Balloon Artist",
  "Delivery Specialist",
  "Event Manager",
  "Electrician / Lights",
];

export default function AdminStaffPage() {
  const [staffList, setStaffList] = useState<StaffItem[]>([]);
  const [cities, setCities] = useState<CityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("ALL");
  const [roleFilter, setRoleFilter] = useState("ALL");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffItem | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [role, setRole] = useState("Lead Decorator");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Delhi");
  const [serviceAreas, setServiceAreas] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<StaffItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [staffData, citiesData] = await Promise.all([
        fetchStaffAdmin(),
        fetchCities(true),
      ]);
      setStaffList(Array.isArray(staffData) ? staffData : []);
      setCities(Array.isArray(citiesData) ? citiesData : []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load staff roster");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOpenCreate = () => {
    setEditingStaff(null);
    setName("");
    setRole("Lead Decorator");
    setPhone("");
    setEmail("");
    setCity("Delhi");
    setServiceAreas("");
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member: StaffItem) => {
    setEditingStaff(member);
    setName(member.name);
    setRole(member.role);
    setPhone(member.phone);
    setEmail(member.email || "");
    setCity(member.city || "Delhi");
    setServiceAreas(member.serviceAreas?.join(", ") || "");
    setIsActive(member.isActive);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Name and Phone number are required");
      return;
    }

    setSubmitting(true);
    try {
      const payload: Partial<StaffItem> = {
        name: name.trim(),
        role,
        phone: phone.trim(),
        email: email.trim(),
        city: city.trim(),
        serviceAreas: serviceAreas
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        isActive,
      };

      if (editingStaff?._id) {
        await updateStaffAdmin(editingStaff._id, payload);
        toast.success(`Staff member "${name}" updated!`);
      } else {
        await createStaffAdmin(payload);
        toast.success(`Staff member "${name}" added to roster!`);
      }

      setIsModalOpen(false);
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Failed to save staff member");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (member: StaffItem) => {
    try {
      await updateStaffAdmin(member._id, { isActive: !member.isActive });
      toast.success(`${member.name} is now ${!member.isActive ? "active" : "inactive"}`);
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteStaffAdmin(deleteTarget._id);
      toast.success(`${deleteTarget.name} removed from roster`);
      setDeleteTarget(null);
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Failed to remove staff");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered List
  const filtered = useMemo(() => {
    return staffList.filter((s) => {
      const query = search.toLowerCase();
      const matchSearch =
        s.name.toLowerCase().includes(query) ||
        s.phone.toLowerCase().includes(query) ||
        s.role.toLowerCase().includes(query) ||
        (s.city && s.city.toLowerCase().includes(query));

      const matchCity = cityFilter === "ALL" || s.city === cityFilter;
      const matchRole = roleFilter === "ALL" || s.role === roleFilter;

      return matchSearch && matchCity && matchRole;
    });
  }, [staffList, search, cityFilter, roleFilter]);

  // KPIs
  const totalStaff = staffList.length;
  const activeStaff = staffList.filter((s) => s.isActive).length;
  const leadDecorators = staffList.filter((s) => s.role === "Lead Decorator").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-[#E8E8E3]/80 p-6 rounded-3xl shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522]">
              Staff & Decorator Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EEF6EB] text-[#558234] border border-[#8CBC67]/30">
              On-Ground Crew
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#6B706C] mt-1">
            Manage certified balloon decorators, venue lead staff, operating cities & local dispatch coverage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadData}
            disabled={loading}
            className="p-2.5 rounded-2xl border border-[#E8E8E3] hover:bg-neutral-50 text-[#6B706C] transition cursor-pointer"
            title="Refresh Roster"
          >
            <RefreshCw size={15} className={loading ? "animate-spin text-[#8CBC67]" : ""} />
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-2xl bg-[#8CBC67] hover:bg-[#7AB055] text-white text-xs font-bold transition shadow-sm cursor-pointer"
          >
            <Plus size={16} />
            <span>Add Decorator / Staff</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-5 rounded-3xl bg-white border border-[#E8E8E3] shadow-xs space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#6B706C]">Total Crew Roster</p>
          <p className="text-2xl font-bold text-[#202522]">{totalStaff}</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#EEF6EB]/70 border border-[#8CBC67]/30 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Active On-Duty</p>
            <CheckCircle size={15} className="text-emerald-700" />
          </div>
          <p className="text-2xl font-bold text-emerald-900">{activeStaff}</p>
        </div>

        <div className="p-5 rounded-3xl bg-purple-50/70 border border-purple-200 shadow-xs space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-purple-900">Lead Decorators</p>
          <p className="text-2xl font-bold text-purple-900">{leadDecorators}</p>
        </div>

        <div className="p-5 rounded-3xl bg-blue-50/60 border border-blue-200 shadow-xs space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-blue-900">Average Rating</p>
          <div className="flex items-center gap-1.5 mt-1">
            <Star size={18} className="fill-amber-400 text-amber-400" />
            <span className="text-2xl font-bold text-blue-950">4.85 / 5</span>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-white border border-[#E8E8E3] shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B706C]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, or assigned city..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs text-[#202522] focus:outline-none focus:border-[#8CBC67]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs font-semibold text-[#202522] focus:outline-none focus:border-[#8CBC67] cursor-pointer"
          >
            <option value="ALL">All Roles</option>
            {STAFF_ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          {/* City Filter */}
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-xs font-semibold text-[#202522] focus:outline-none focus:border-[#8CBC67] cursor-pointer"
          >
            <option value="ALL">All Cities</option>
            {cities.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="bg-white rounded-3xl border border-[#E8E8E3] shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 size={32} className="animate-spin text-[#8CBC67]" />
            <p className="text-xs text-[#6B706C]">Loading on-ground decorator roster...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <p className="text-sm font-bold text-[#202522]">No staff members found</p>
            <p className="text-xs text-[#6B706C]">Add certified decorators and venue specialists to dispatch them.</p>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#8CBC67] text-white text-xs font-bold hover:bg-[#7AB055] transition cursor-pointer"
            >
              <Plus size={14} />
              <span>Add Staff Member</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E8E8E3] bg-[#FCFBF7] text-[#6B706C] text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Staff Member</th>
                  <th className="py-4 px-6">Role & Specialty</th>
                  <th className="py-4 px-6">Assigned City & Coverage</th>
                  <th className="py-4 px-6 text-center">Quality Rating</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E3]">
                {filtered.map((member) => (
                  <tr key={member._id} className="hover:bg-neutral-50/70 transition">
                    {/* Name & Contact */}
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#EEF6EB] text-[#8CBC67] font-bold flex items-center justify-center border border-[#8CBC67]/20 flex-shrink-0">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[#202522]">{member.name}</p>
                          <div className="flex items-center space-x-2 text-[11px] text-[#6B706C] mt-0.5">
                            <span className="flex items-center gap-1 font-mono">
                              <Phone size={11} /> {member.phone}
                            </span>
                            {member.email && (
                              <span className="hidden sm:inline-block">• {member.email}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-xl bg-neutral-100 text-[#202522] font-semibold text-xs border border-neutral-200">
                        {member.role}
                      </span>
                    </td>

                    {/* City & Areas */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-xs text-[#202522] flex items-center gap-1">
                        <MapPin size={12} className="text-[#8CBC67]" />
                        <span>{member.city}</span>
                      </p>
                      {member.serviceAreas && member.serviceAreas.length > 0 && (
                        <p className="text-[11px] text-[#6B706C] line-clamp-1 max-w-xs mt-0.5">
                          {member.serviceAreas.join(", ")}
                        </p>
                      )}
                    </td>

                    {/* Rating */}
                    <td className="py-4 px-6 text-center">
                      <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span>{(member.rating || 4.8).toFixed(1)}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(member)}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                          member.isActive
                            ? "bg-[#EEF6EB] text-emerald-800 hover:bg-emerald-100"
                            : "bg-red-50 text-red-700 hover:bg-red-100"
                        }`}
                      >
                        {member.isActive ? (
                          <>
                            <CheckCircle size={12} className="text-emerald-600" />
                            <span>Active / Available</span>
                          </>
                        ) : (
                          <>
                            <XCircle size={12} className="text-red-500" />
                            <span>Off-Duty</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(member)}
                          className="p-2 rounded-xl text-neutral-600 hover:text-[#8CBC67] hover:bg-neutral-100 transition cursor-pointer"
                          title="Edit staff details"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(member)}
                          className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                          title="Remove from roster"
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

      {/* CREATE / EDIT STAFF MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-100 relative animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#EEF6EB] flex items-center justify-center text-[#8CBC67]">
                  <Users2 size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-neutral-900">
                    {editingStaff ? "Edit Staff Details" : "Add Decorator / Crew"}
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    Manage field staff contact and city assignments
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

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Role / Specialty <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                  >
                    {STAFF_ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Operating City <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                  >
                    {cities.map((c) => (
                      <option key={c._id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91-98XXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-mono text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="decorator@party.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Coverage Localities / Areas <span className="text-neutral-400 font-normal">(Comma separated)</span>
                </label>
                <input
                  type="text"
                  value={serviceAreas}
                  onChange={(e) => setServiceAreas(e.target.value)}
                  placeholder="e.g. South Delhi, Saket, Hauz Khas"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs text-neutral-900 focus:outline-none focus:border-[#8CBC67]"
                />
              </div>

              <label className="flex items-center space-x-3 p-3 rounded-xl border border-neutral-200 bg-neutral-50/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-[#8CBC67] rounded accent-[#8CBC67]"
                />
                <div>
                  <p className="text-xs font-bold text-neutral-800">Available For Bookings</p>
                  <p className="text-[10px] text-neutral-500">
                    Keep active to assign this staff member to upcoming events.
                  </p>
                </div>
              </label>

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
                  <span>{editingStaff ? "Save Changes" : "Add Staff"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-neutral-100 space-y-4">
            <h3 className="font-bold text-sm text-neutral-900">Remove from Roster?</h3>
            <p className="text-xs text-neutral-500">
              Are you sure you want to remove <span className="font-bold text-neutral-800">{deleteTarget.name}</span>?
            </p>
            <div className="flex items-center justify-end space-x-2 pt-2">
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
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
