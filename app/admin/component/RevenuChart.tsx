import { REVENUE } from "../data/dashboard";

interface RevenueChartProps {
  range: "7D" | "30D" | "90D";
}

const inr = (n: number) =>
  `₹${n.toLocaleString("en-IN")}`;

function AreaChart({
  labels,
  values,
}: {
  labels: string[];
  values: number[];
}) {
  const W = 600;
  const H = 220;

  const pad = {
    l: 8,
    r: 8,
    t: 12,
    b: 26,
  };

  const max =
    Math.max(...values) * 1.1;

  const x = (i: number) =>
    pad.l +
    (i / (values.length - 1)) *
      (W - pad.l - pad.r);

  const y = (value: number) =>
    pad.t +
    (1 - value / max) *
      (H - pad.t - pad.b);

  const line = values
    .map(
      (value, index) =>
        `${index === 0 ? "M" : "L"}${x(
          index
        )},${y(value)}`
    )
    .join(" ");

  const area = `${line}
    L${x(values.length - 1)},${H - pad.b}
    L${x(0)},${H - pad.b}
    Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-56"
      role="img"
      aria-label="Revenue over time"
    >
      <defs>
        <linearGradient
          id="revFill"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#F59E0B"
            stopOpacity="0.35"
          />

          <stop
            offset="100%"
            stopColor="#F59E0B"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75].map(
        (value) => (
          <line
            key={value}
            x1={pad.l}
            x2={W - pad.r}
            y1={
              pad.t +
              value *
                (H - pad.t - pad.b)
            }
            y2={
              pad.t +
              value *
                (H - pad.t - pad.b)
            }
            stroke="#F5E6C8"
            strokeDasharray="4 4"
          />
        )
      )}

      <path
        d={area}
        fill="url(#revFill)"
      />

      <path
        d={line}
        fill="none"
        stroke="#B45309"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {values.map((value, index) => (
        <circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r="4"
          fill="#fff"
          stroke="#B45309"
          strokeWidth="2"
        />
      ))}

      {labels.map((label, index) => (
        <text
          key={label}
          x={x(index)}
          y={H - 6}
          textAnchor="middle"
          fontSize="12"
          fill="#78716C"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

export default function RevenueChart({
  range,
}: RevenueChartProps) {
  const revenue = REVENUE[range];

  const revenueTotal =
    revenue.values.reduce(
      (total, value) => total + value,
      0
    );

  return (
    <div className="lg:col-span-2 bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm">

      <div className="flex items-start justify-between gap-3">

        <div>

          <h3 className="font-serif text-xl font-bold text-neutral-900">
            Revenue
          </h3>

          <p className="text-xs text-neutral-500 mt-0.5">
            Earnings over the selected period
          </p>

        </div>

        <p className="font-serif text-2xl font-bold text-amber-800 lining-nums">
          {inr(revenueTotal)}
        </p>

      </div>

      <div className="mt-4">
        <AreaChart
          labels={revenue.labels}
          values={revenue.values}
        />
      </div>

    </div>
  );
}