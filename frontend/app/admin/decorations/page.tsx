"use client";

import React, { useState } from "react";
import { Sparkles, Plus, Trash2, Tag, Check, X } from "lucide-react";

export default function AdminDecorations() {
  const [themes, setThemes] = useState([
    { id: 1, name: "Christmas Magic Decor", category: "Festive", price: "₹6,499", status: "Active" },
    { id: 2, name: "Ganpati Mandap Setup", category: "Traditional", price: "₹8,999", status: "Active" },
    { id: 3, name: "Romantic Candlelight Vibe", category: "Party", price: "₹4,599", status: "Active" },
    { id: 4, name: "Birthday Balloon Bash", category: "Birthday", price: "₹3,999", status: "Active" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", category: "Party", price: "" });

  const handleAddTheme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    setThemes([
      ...themes,
      {
        id: Date.now(),
        name: form.name,
        category: form.category,
        price: `₹${form.price}`,
        status: "Active",
      },
    ]);
    setForm({ name: "", category: "Party", price: "" });
    setShowModal(false);
  };

  const deleteTheme = (id: number) => {
    setThemes(themes.filter((t) => t.id !== id));
  };

  return (
    <div 
      className="w-full space-y-7 sm:space-y-8 font-sans"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      
      {/* Header Banner - Full Width */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-amber-200/80 p-6 sm:p-7 rounded-[28px] shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">Decorations & Themes Catalogue</h2>
          <p className="text-neutral-500 text-xs font-medium mt-1">Manage decoration packages, prices, and catalog visibility across your business.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-amber-500 hover:bg-amber-400 text-neutral-950 px-5 py-3 rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Theme</span>
        </button>
      </div>

      {/* Themes Grid - Full Viewport Width (4 columns desktop, 2 tablet, 1 mobile) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {themes.map((theme) => (
          <div 
            key={theme.id} 
            className="bg-white border border-amber-200/80 rounded-[24px] p-6 shadow-xs space-y-5 flex flex-col justify-between hover:shadow-md transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="bg-amber-50 border border-amber-200/60 text-amber-900 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1">
                  <Tag size={10} className="text-amber-600" />
                  <span>{theme.category}</span>
                </span>
                <span className="text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1">
                  <Check size={10} />
                  <span>{theme.status}</span>
                </span>
              </div>
              <h3 className="text-base font-bold text-neutral-950 pt-1 leading-snug">{theme.name}</h3>
            </div>

            <div className="pt-4 border-t border-amber-100/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-neutral-400 block font-bold tracking-wider">Starting Package</span>
                <span className="text-xl font-extrabold text-neutral-950 tracking-tight">{theme.price}</span>
              </div>
              <button 
                onClick={() => deleteTheme(theme.id)}
                className="w-9 h-9 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors cursor-pointer border border-red-200/40"
                title="Delete Theme"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Theme Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] p-6 sm:p-8 max-w-md w-full border border-amber-300 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-amber-100 pb-4">
              <h3 className="text-lg font-bold text-neutral-900">Add New Decoration Theme</h3>
              <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-neutral-800 p-1 cursor-pointer">
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleAddTheme} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="block text-neutral-700 font-bold">Theme Title</label>
                <input 
                  type="text" required placeholder="e.g. Royal Anniversary Setup"
                  value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 text-xs font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-neutral-700 font-bold">Category</label>
                <select 
                  value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 text-xs font-medium"
                >
                  <option value="Party">Party</option>
                  <option value="Festive">Festive</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Wedding">Wedding</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-neutral-700 font-bold">Price (₹)</label>
                <input 
                  type="text" required placeholder="e.g. 5999"
                  value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 text-xs font-medium"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-amber-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl bg-neutral-100 text-neutral-600 font-bold hover:bg-neutral-200 transition cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold hover:bg-amber-400 transition shadow-sm cursor-pointer">Publish Theme</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}