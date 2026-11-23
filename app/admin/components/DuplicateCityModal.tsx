"use client";

import React, { useState, useEffect } from "react";
import { X, Copy, Check, Loader2, AlertCircle, Building2, IndianRupee } from "lucide-react";
import toast from "react-hot-toast";
import { ProductItem, CityItem, fetchCities, duplicateProductToCities } from "@/app/lib/api";

interface DuplicateCityModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductItem | null;
  onSuccess?: () => void;
}

export default function DuplicateCityModal({
  isOpen,
  onClose,
  product,
  onSuccess
}: DuplicateCityModalProps) {
  const [cities, setCities] = useState<CityItem[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [customPrices, setCustomPrices] = useState<Record<string, number>>({});
  const [loadingCities, setLoadingCities] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadCities();
      setSelectedCities([]);
      setCustomPrices({});
    }
  }, [isOpen]);

  const loadCities = async () => {
    setLoadingCities(true);
    try {
      const data = await fetchCities(false);
      setCities(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load cities list");
    } finally {
      setLoadingCities(false);
    }
  };

  if (!isOpen || !product) return null;

  const currentProductCity = product.city || "Delhi";

  const handleToggleCity = (cityName: string) => {
    if (cityName === currentProductCity) return; // Prevent duplicating to current city
    setSelectedCities((prev) =>
      prev.includes(cityName) ? prev.filter((c) => c !== cityName) : [...prev, cityName]
    );
  };

  const handlePriceChange = (cityName: string, val: string) => {
    const num = Number(val);
    setCustomPrices((prev) => ({
      ...prev,
      [cityName]: isNaN(num) ? product.price : num
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCities.length === 0) {
      toast.error("Please select at least one target city.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await duplicateProductToCities(product._id, selectedCities, customPrices);
      if (res.success) {
        toast.success(`Successfully duplicated to ${res.createdCount} cities!`);
        if (res.skippedCities && res.skippedCities.length > 0) {
          toast(`Skipped existing: ${res.skippedCities.join(", ")}`, { icon: "ℹ️" });
        }
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to duplicate product to cities.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[#E8E8E3] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E3]">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#202522] flex items-center gap-2">
              <Copy size={20} className="text-[#8CBC67]" />
              <span>Duplicate Product to Cities</span>
            </h2>
            <p className="text-xs text-[#6B706C] mt-1">
              Create independent city-specific copies of <strong>"{product.name}"</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#6B706C] hover:text-[#202522] hover:bg-neutral-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Current City Notice */}
        <div className="p-3 bg-[#EEF6EB] text-[#202522] rounded-2xl border border-[#8CBC67]/30 text-xs flex items-center justify-between">
          <span>Current Product City:</span>
          <span className="font-bold bg-white px-2.5 py-1 rounded-xl border border-[#8CBC67]/40">
            📍 {currentProductCity}
          </span>
        </div>

        {/* Cities Selection List */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-1">
          <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider">
            Select Target Cities & Set City Prices
          </label>

          {loadingCities ? (
            <div className="py-8 flex justify-center text-xs text-[#6B706C]">
              <Loader2 className="animate-spin mr-2" size={16} /> Loading available cities...
            </div>
          ) : (
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {cities.map((c) => {
                const isCurrent = c.name.toLowerCase() === currentProductCity.toLowerCase();
                const isSelected = selectedCities.includes(c.name);

                return (
                  <div
                    key={c._id}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition ${
                      isCurrent
                        ? "bg-neutral-100 border-neutral-200 opacity-60"
                        : isSelected
                        ? "bg-[#EEF6EB]/40 border-[#8CBC67]"
                        : "bg-[#FCFBF7] border-[#E8E8E3] hover:border-[#8CBC67]/50"
                    }`}
                  >
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        disabled={isCurrent}
                        checked={isCurrent || isSelected}
                        onChange={() => handleToggleCity(c.name)}
                        className="w-4 h-4 accent-[#8CBC67] rounded cursor-pointer"
                      />
                      <span className="text-xs font-bold text-[#202522]">
                        {c.name} {isCurrent && "(Current Source City)"}
                      </span>
                    </label>

                    {isSelected && !isCurrent && (
                      <div className="flex items-center gap-1.5 w-32 shrink-0">
                        <span className="text-xs text-[#6B706C]">₹</span>
                        <input
                          type="number"
                          placeholder={String(product.price)}
                          value={customPrices[c.name] ?? product.price}
                          onChange={(e) => handlePriceChange(c.name, e.target.value)}
                          className="w-full px-2.5 py-1 text-xs border border-[#E8E8E3] rounded-lg bg-white font-bold text-[#202522] focus:outline-none focus:border-[#8CBC67]"
                          title="Custom price for this city"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer Submit */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#E8E8E3]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl border border-[#E8E8E3] text-[#202522] text-xs font-bold hover:bg-neutral-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || selectedCities.length === 0}
              className="px-6 py-2.5 rounded-2xl bg-[#8CBC67] text-white text-xs font-bold hover:bg-[#7AB055] transition shadow-md flex items-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Cloning to Cities...</span>
                </>
              ) : (
                <span>Duplicate to {selectedCities.length} Cities</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
