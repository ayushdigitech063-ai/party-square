"use client";

import { CalendarDays } from "lucide-react";

interface DashboardToolbarProps {
  range: "7D" | "30D" | "90D";
  setRange: (
    range: "7D" | "30D" | "90D"
  ) => void;
}

export default function DashboardToolbar({
  range,
  setRange,
}: DashboardToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">

      <div
        className="inline-flex bg-white border border-amber-200 rounded-full p-1 self-start"
        role="tablist"
        aria-label="Date range"
      >

        {(["7D", "30D", "90D"] as const).map(
          (item) => (
            <button
              key={item}
              role="tab"
              aria-selected={range === item}
              onClick={() => setRange(item)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                range === item
                  ? "bg-amber-500 text-stone-900"
                  : "text-neutral-500 hover:text-amber-800"
              }`}
            >
              {item === "7D"
                ? "7 days"
                : item === "30D"
                ? "30 days"
                : "90 days"}
            </button>
          )
        )}

      </div>

      <div className="flex items-center gap-2 text-xs text-neutral-500">

        <CalendarDays size={15} />

        <span>
          Showing the last{" "}
          {range === "7D"
            ? "7"
            : range === "30D"
            ? "30"
            : "90"}{" "}
          days
        </span>

      </div>

    </div>
  );
}