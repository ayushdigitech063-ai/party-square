"use client";

import React, { useState } from "react";
import { Sparkles, Plus, Trash2, Edit3, Check } from "lucide-react";

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
    setThemes([...themes, {
      id: Date.now(),
      name: form.name,
      category: form.category,
      price: `₹${form.price}`,
      status: "Active"
    }]);
    setForm({ name: "", category: "Party", price: "" });
    setShowModal(false);
  };

  const deleteTheme = (id: number) => {
    setThemes(themes.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-amber-200/80 p-6 rounded-3xl shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-neutral-900">Decorations & Themes Catalogue</h2>
          <p className="text-neutral-500 text-xs font-light mt-1">Manage decoration packages, prices, and catalog visibility.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-amber-500 hover:bg-amber-400 text-neutral-950 px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md transition"
        >
          <Plus size={16} />
          <span>Add New Theme</span>
        </button>
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <div key={theme.id} className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {theme.category}
                </span>
                <span className="text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  {theme.status}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-neutral-900 pt-2">{theme.name}</h3>
            </div>

            <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-neutral-400 block font-bold">Starting Package</span>
                <span className="font-serif font-bold text-xl text-neutral-900">{theme.price}</span>
              </div>
              <button 
                onClick={() => deleteTheme(theme.id)}
                className="w-9 h-9 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition"
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
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-amber-300 shadow-2xl space-y-6">
            <h3 className="font-serif text-xl font-bold text-neutral-900">Add New Decoration Theme</h3>
            <form onSubmit={handleAddTheme} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-600 font-bold mb-1">Theme Title</label>
                <input 
                  type="text" required placeholder="e.g. Royal Anniversary Setup"
                  value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-neutral-600 font-bold mb-1">Category</label>
                <select 
                  value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500"
                >
                  <option value="Party">Party</option>
                  <option value="Festive">Festive</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Wedding">Wedding</option>
                </select>
              </div>
              <div>
                <label className="block text-neutral-600 font-bold mb-1">Price (₹)</label>
                <input 
                  type="text" required placeholder="e.g. 5999"
                  value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl bg-neutral-100 text-neutral-600 font-bold hover:bg-neutral-200 transition">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold hover:bg-amber-400 transition shadow-sm">Publish Theme</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}