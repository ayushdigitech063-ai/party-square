"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Plus, Trash2, Upload } from "lucide-react";

export default function AdminGallery() {
  const [photos, setPhotos] = useState([
    { id: 1, title: "Royal Wedding Mandap", category: "Wedding", date: "Jan 2026" },
    { id: 2, title: "Birthday Balloon Arch", category: "Birthday", date: "Feb 2026" },
    { id: 3, title: "Candlelight Dinner Setup", category: "Party", date: "Feb 2026" },
    { id: 4, title: "Ganpati Flower Decoration", category: "Festive", date: "Sep 2025" },
  ]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Wedding");

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setPhotos([{ id: Date.now(), title, category, date: "Just now" }, ...photos]);
    setTitle("");
  };

  const deletePhoto = (id: number) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="bg-white border border-amber-200/80 p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-neutral-900">Event Gallery Manager</h2>
          <p className="text-neutral-500 text-xs font-light mt-1">Upload and manage showcase photos displayed on the main website gallery.</p>
        </div>
        <form onSubmit={handleAddPhoto} className="flex gap-2 w-full sm:w-auto">
          <input 
            type="text" placeholder="Photo Title..." value={title} onChange={e => setTitle(e.target.value)}
            className="px-4 py-2 rounded-xl border border-amber-200 text-xs bg-[#FFFDF9] focus:outline-none focus:border-amber-500"
          />
          <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-neutral-950 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1 whitespace-nowrap shadow-sm">
            <Plus size={15} />
            <span>Add Photo</span>
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map(p => (
          <div key={p.id} className="bg-white border border-amber-200/80 rounded-3xl p-4 shadow-sm space-y-3">
            <div className="h-40 rounded-2xl bg-amber-100/60 border border-amber-200 flex flex-col items-center justify-center text-amber-900 relative group">
              <ImageIcon size={32} className="text-amber-600 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{p.category}</span>
              <button onClick={() => deletePhoto(p.id)} className="absolute top-3 right-3 bg-white/90 text-red-600 p-2 rounded-xl shadow hover:bg-red-50 transition">
                <Trash2 size={14} />
              </button>
            </div>
            <div>
              <h4 className="font-serif font-bold text-neutral-900 text-sm truncate">{p.title}</h4>
              <span className="text-[11px] text-neutral-400">Added: {p.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}