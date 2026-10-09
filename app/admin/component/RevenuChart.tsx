"use client";

import React, { useState } from "react";

type Range = "7D" | "30D" | "90D";
type Metric = "Revenue" | "Bookings" | "Customers";

/* DEMO DATA: replace with API values */
const DATA: Record<
  Range,
  { labels: string[]; period: string; Revenue: number[]; Bookings: number[]; Customers: number[] }
> = {
  "7D": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    period: "Daily",
    Revenue: [42000, 38000, 51000, 47000, 65000, 88000, 72000],
    Bookings: [6, 5, 8, 7, 10, 14, 11],
    Customers: [4, 3, 6, 5, 8, 11, 9],
  },
  "30D": {
    labels: ["W1", "W2", "W3", "W4", "W5"],
    period: "Weekly",
    Revenue: [210000, 245000, 198000, 312000, 285000],
    Bookings: [38, 44, 35, 58, 52],
    Customers: [26, 31, 24, 41, 36],
  },
  "90D": {
    labels: ["Jul", "Aug", "Sep"],
    period: "Monthly",
    Revenue: [640000, 720000, 910000],
    Bookings: [112, 128, 164],
    Customers: [80, 91, 118],
  },
};

const METRICS: Metric[] = ["Revenue", "Bookings", "Customers"];

const money = (v: number) =>
  v >= 100000
    ? `₹${(v / 100000).toFixed(1).replace(/\.0$/, "")}L`
    : v >= 1000
      ? `₹${Math.round(v / 1000)}K`
      : `₹${v}`;

const fmtValue = (metric: Metric, v: number) => (metric === "Revenue" ? money(v) : String(Math.round(v)));

// Picks a "nice" axis maximum so there are 4 clean intervals
const niceScale = (max: number) => {
  const raw = (max || 1) / 4;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const r = raw / mag;
  const step = (r <= 1 ? 1 : r <= 2 ? 2 : r <= 5 ? 5 : 10) * mag;
  return { step, max: step * 4 };
};

export default function RevenueChart({ range }: { range: Range }) {
  const [metric, setMetric] = useState<Metric>("Revenue");

  const d = DATA[range];
  const lineMetric: Metric = metric === "Bookings" ? "Customers" : "Bookings";
  const bars = d[metric];
  const line = d[lineMetric];

  const W = 640;
  const H = 290;
  const m = { l: 54, r: 44, t: 14, b: 34 };
  const innerW = W - m.l - m.r;
  const innerH = H - m.t - m.b;
  const n = bars.length;
  const band = innerW / n;
  const bw = Math.min(40, band * 0.5);

  const lScale = niceScale(Math.max(...bars));
  const rScale = niceScale(Math.max(...line));

  const cx = (i: number) => m.l + band * i + band / 2;
  const yL = (v: number) => m.t + innerH - (v / lScale.max) * innerH;
  const yR = (v: number) => m.t + innerH - (v / rScale.max) * innerH;

  const linePath = line.map((v, i) => `${i === 0 ? "M" : "L"}${cx(i)},${yR(v)}`).join(" ");

  return (
    <div className="lg:col-span-2 bg-white border border-amber-100 rounded-2xl p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-lg font-bold text-neutral-900">{metric} Overview</h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            {d.period} {metric.toLowerCase()} and {lineMetric.toLowerCase()} trend
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1.5" role="tablist" aria-label="Chart metric">
            {METRICS.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={metric === t}
                onClick={() => setMetric(t)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  metric === t ? "bg-amber-500 text-white shadow-sm" : "bg-amber-50 text-neutral-600 hover:text-amber-800"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <span className="hidden sm:inline-block border border-amber-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-neutral-600">
            {d.period}
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-64 mt-4" role="img" aria-label={`${metric} chart`}>
        <defs>
          <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
        </defs>

        {/* grid + axis labels */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = m.t + innerH - (i / 4) * innerH;
          return (
            <g key={i}>
              <line x1={m.l} x2={W - m.r} y1={y} y2={y} stroke="#F5E6C8" strokeDasharray="4 4" />
              <text x={m.l - 8} y={y + 4} textAnchor="end" fontSize="11" fill="#78716C">
                {fmtValue(metric, i * lScale.step)}
              </text>
              <text x={W - m.r + 8} y={y + 4} textAnchor="start" fontSize="11" fill="#78716C">
                {fmtValue(lineMetric, i * rScale.step)}
              </text>
            </g>
          );
        })}

        {/* bars */}
        {bars.map((v, i) => (
          <rect key={i} x={cx(i) - bw / 2} y={yL(v)} width={bw} height={m.t + innerH - yL(v)} rx="4" fill="url(#barFill)" />
        ))}

        {/* line */}
        <path d={linePath} fill="none" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {line.map((v, i) => (
          <circle key={i} cx={cx(i)} cy={yR(v)} r="4" fill="#fff" stroke="#B45309" strokeWidth="2" />
        ))}

        {/* x labels */}
        {d.labels.map((l, i) => (
          <text key={l} x={cx(i)} y={H - 10} textAnchor="middle" fontSize="11" fill="#78716C">
            {l}
          </text>
        ))}
      </svg>

      <div className="mt-2 flex items-center justify-center gap-6 text-xs text-neutral-600">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          {metric}
          {metric === "Revenue" ? " (₹)" : ""}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 bg-amber-700 rounded" />
          {lineMetric}
        </span>
      </div>
    </div>
  );
}