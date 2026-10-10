import React from "react";
import { CheckCircle2, X } from "lucide-react";

export default function Toast({ show, message, image, onClose }: any) {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center bg-neutral-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#8CBC67]/30 animate-slide-up max-w-md">
      {image && (
        <img src={image} alt="product" className="w-12 h-12 object-cover rounded-xl mr-3 border border-neutral-700" />
      )}
      <div className="flex items-center space-x-2 flex-grow mr-4">
        <CheckCircle2 className="text-[#8CBC67] flex-shrink-0" size={20} />
        <p className="text-xs sm:text-sm font-medium">{message}</p>
      </div>
      <button onClick={onClose} className="text-[#6B706C] hover:text-white transition">
        <X size={16} />
      </button>
    </div>
  );
}