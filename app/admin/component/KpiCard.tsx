import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

import Sparkline from "./Sparkline";

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  href: string;
  trend: number[];
}

export default function KpiCard({
  title,
  value,
  change,
  icon: Icon,
  color,
  href,
  trend,
}: KpiCardProps) {
  return (
    <Link
      href={href}
      className="group bg-white border border-amber-200/80 p-5 rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition space-y-3"
    >

      <div className="flex items-center justify-between">

        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-md ${color}`}
        >
          <Icon size={20} />
        </div>

        <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
          {change}
        </span>

      </div>

      <div className="flex items-end justify-between gap-4">

        <div>

          <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
            {title}
          </span>

          <h3 className="font-serif text-2xl font-bold text-neutral-900 mt-0.5 lining-nums">
            {value}
          </h3>

        </div>

        <div className="w-24 shrink-0">
          <Sparkline data={trend} />
        </div>

      </div>

      <p className="text-[11px] text-neutral-400 flex items-center gap-1 group-hover:text-amber-700 transition">
        View details
        <ArrowUpRight size={12} />
      </p>

    </Link>
  );
}