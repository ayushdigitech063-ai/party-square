"use client";

import { ChevronDown } from "lucide-react";

type SortOption =
  | "recommended"
  | "price-low"
  | "price-high"

interface ProductSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function ProductSort({
  value,
  onChange,
}: ProductSortProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="
          appearance-none
          bg-white
          border border-neutral-300
          rounded-lg
          pl-4 pr-10 py-2.5
          text-sm
          text-neutral-700
          outline-none
          cursor-pointer
          hover:border-neutral-400
          focus:border-[#C5A059]
          transition
        "
      >
        <option value="recommended">Recommended</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>

      <ChevronDown
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500"
      />
    </div>
  );
}