"use client";

import React, { useState, useEffect } from "react";
import { Settings, Shield, Bell, Save, CheckCircle2, PhoneCall, MessageCircle, AlertCircle, Loader2 } from "lucide-react";
import { API_URL } from "@/config";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function AdminSettings() {
  const { admin, isSuperAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    businessName: "Party Square Celebrations",
    adminEmail: "support@partysquare.com",
    supportPhone: "+91 8010679679",
    whatsappNumber: "8010679679",
    currency: "INR (₹)",
    emailAlerts: true
  });

  // Fetch current platform settings from backend API
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/settings`);
        if (res.ok) {
          const data = await res.json();
          setSettings(prev => ({
            ...prev,
            businessName: data.businessName || prev.businessName,
            adminEmail: data.adminEmail || prev.adminEmail,
            supportPhone: data.supportPhone || prev.supportPhone,
            whatsappNumber: data.whatsappNumber || prev.whatsappNumber,
            currency: data.currency || prev.currency,
            emailAlerts: data.emailAlerts !== undefined ? data.emailAlerts : prev.emailAlerts,
          }));
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user has permission
    const currentAdminUser = admin || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("adminUser") || "{}") : null);
    const token = currentAdminUser?.token;
    const userRole = currentAdminUser?.role;

    if (userRole !== "superadmin") {
      toast.error("Permission Denied: Only Super Admin can change settings and WhatsApp number!");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch(`${API_URL}/api/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      if (res.ok) {
        setSaved(true);
        toast.success("Settings & WhatsApp Number updated successfully!");
        // Update local storage cache if any
        if (typeof window !== "undefined") {
          localStorage.setItem("party_whatsapp_number", settings.whatsappNumber);
        }
        setTimeout(() => setSaved(false), 3000);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to update settings");
      }
    } catch (err: any) {
      toast.error("Error updating settings: " + (err.message || "Network error"));
    } finally {
      setSaving(false);
    }
  };

  const currentAdminUser = admin || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("adminUser") || "{}") : null);
  const canEdit = currentAdminUser?.role === "superadmin";

  return (
    <div className="space-y-5 sm:space-y-6 w-full">
      {/* Header */}
      <div className="bg-white border border-amber-200/80 p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-neutral-900">Admin Portal Settings</h2>
          <p className="text-neutral-500 text-xs font-light mt-1">
            Configure business particulars, WhatsApp support number, notification preferences, and contact details.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-900 self-start sm:self-auto">
          <Shield size={14} className="text-amber-600" />
          <span>Role: {currentAdminUser?.role || "Admin"}</span>
        </div>
      </div>

      {!canEdit && (
        <div className="bg-amber-50 border border-amber-300 text-amber-900 p-4 rounded-2xl flex items-center space-x-3 text-xs shadow-sm">
          <AlertCircle size={18} className="text-amber-600 shrink-0" />
          <div>
            <p className="font-bold">Super Admin Authorization Required</p>
            <p className="text-neutral-600 mt-0.5">Only accounts with the <strong>Super Admin</strong> role have permission to modify platform credentials and WhatsApp numbers.</p>
          </div>
        </div>
      )}

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-2xl flex items-center space-x-2 text-xs font-bold shadow-sm">
          <CheckCircle2 size={16} />
          <span>Settings & WhatsApp Number successfully saved and updated!</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-xs">
        
        {/* WhatsApp & Support Section Banner */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50/50 border border-emerald-200/70 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <MessageCircle size={20} />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-sm">WhatsApp Support Integration</h4>
              <p className="text-neutral-600 text-[11px] mt-0.5">
                The number below is actively linked to the floating WhatsApp button & Navbar chat button across the website.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold bg-emerald-100/80 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
            Live on Website
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-neutral-700 font-bold mb-2">
              WhatsApp Support Number (10 digits or with Country Code)
            </label>
            <div className="relative">
              <input 
                type="text" 
                value={settings.whatsappNumber}
                disabled={!canEdit || loading}
                placeholder="e.g. 8010679679 or +91 8010679679"
                onChange={e => setSettings({...settings, whatsappNumber: e.target.value})}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 disabled:opacity-60 disabled:cursor-not-allowed font-medium text-neutral-900"
              />
              <MessageCircle size={16} className="absolute left-3.5 top-3.5 text-emerald-600" />
            </div>
            <p className="text-[10px] text-neutral-500 mt-1.5">
              Super Admin can change this number anytime to redirect all visitor WhatsApp messages.
            </p>
          </div>

          <div>
            <label className="block text-neutral-700 font-bold mb-2">Direct Phone Call Number</label>
            <div className="relative">
              <input 
                type="text" 
                value={settings.supportPhone}
                disabled={!canEdit || loading}
                onChange={e => setSettings({...settings, supportPhone: e.target.value})}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <PhoneCall size={16} className="absolute left-3.5 top-3.5 text-amber-600" />
            </div>
            <p className="text-[10px] text-neutral-500 mt-1.5">
              Display phone number shown on terms, invoices, and contact pages.
            </p>
          </div>

          <div>
            <label className="block text-neutral-700 font-bold mb-2">Business Name</label>
            <input 
              type="text" 
              value={settings.businessName}
              disabled={!canEdit || loading}
              onChange={e => setSettings({...settings, businessName: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-neutral-700 font-bold mb-2">Super Admin / Support Email</label>
            <input 
              type="email" 
              value={settings.adminEmail}
              disabled={!canEdit || loading}
              onChange={e => setSettings({...settings, adminEmail: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-neutral-700 font-bold mb-2">Currency Symbol</label>
            <select 
              value={settings.currency}
              disabled={!canEdit || loading}
              onChange={e => setSettings({...settings, currency: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 disabled:opacity-60"
            >
              <option value="INR (₹)">INR (₹)</option>
              <option value="USD ($)">USD ($)</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-amber-100 space-y-4">
          <h3 className="font-serif font-bold text-sm text-neutral-900">Preferences & Alerts</h3>
          <div className="flex items-center justify-between py-2">
            <div>
              <span className="font-bold text-neutral-800 block">Instant Email Alerts</span>
              <span className="text-[11px] text-neutral-500">Receive email notification when a new customer books a decoration.</span>
            </div>
            <input 
              type="checkbox" 
              checked={settings.emailAlerts}
              disabled={!canEdit || loading}
              onChange={e => setSettings({...settings, emailAlerts: e.target.checked})}
              className="w-4 h-4 accent-amber-500 rounded cursor-pointer disabled:opacity-50"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button 
            type="submit" 
            disabled={!canEdit || saving || loading}
            className={`font-bold px-7 py-3 rounded-2xl flex items-center space-x-2 shadow-md transition ${
              canEdit && !saving
                ? "bg-amber-500 hover:bg-amber-400 text-neutral-950 cursor-pointer"
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            }`}
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Configuration</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}