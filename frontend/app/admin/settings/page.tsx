"use client";

import React, { useState } from "react";
import { Settings, Shield, Bell, Save, CheckCircle2 } from "lucide-react";

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    businessName: "DreamDeco Events",
    adminEmail: "admin@dreamdeco.com",
    supportPhone: "+91 98765 43210",
    currency: "INR (₹)",
    autoConfirm: true,
    emailAlerts: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white border border-amber-200/80 p-6 rounded-3xl shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-neutral-900">Admin Portal Settings</h2>
        <p className="text-neutral-500 text-xs font-light mt-1">Configure business particulars, notification preferences, and security access.</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-2xl flex items-center space-x-2 text-xs font-bold shadow-sm">
          <CheckCircle2 size={16} />
          <span>Settings successfully saved and updated!</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-neutral-700 font-bold mb-2">Business Name</label>
            <input 
              type="text" 
              value={settings.businessName}
              onChange={e => setSettings({...settings, businessName: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-neutral-700 font-bold mb-2">Super Admin Email</label>
            <input 
              type="email" 
              value={settings.adminEmail}
              onChange={e => setSettings({...settings, adminEmail: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-neutral-700 font-bold mb-2">Support Phone Number</label>
            <input 
              type="text" 
              value={settings.supportPhone}
              onChange={e => setSettings({...settings, supportPhone: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-neutral-700 font-bold mb-2">Currency Symbol</label>
            <select 
              value={settings.currency}
              onChange={e => setSettings({...settings, currency: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500"
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
              onChange={e => setSettings({...settings, emailAlerts: e.target.checked})}
              className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button 
            type="submit" 
            className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-6 py-3 rounded-2xl flex items-center space-x-2 shadow-md transition"
          >
            <Save size={16} />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>

    </div>
  );
}