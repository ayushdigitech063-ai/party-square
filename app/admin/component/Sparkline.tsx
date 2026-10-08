interface SparklineProps {
  data: number[];
}

export default function Sparkline({
  data,
}: SparklineProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);

  const range = max - min || 1;

  const pts = data
    .map(
      (value, index) =>
        `${
          (index / (data.length - 1)) * 100
        },${
          28 -
          ((value - min) / range) * 24
        }`
    )
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 30"
      className="w-full h-8"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        points={pts}
        fill="none"
        stroke="#D97706"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}