import { CATEGORIES } from "../data/dashboard";

interface CategoryChartProps {
  breakdown?: Array<{ name: string; value: number; color: string }> | null;
}

export default function CategoryChart({ breakdown }: CategoryChartProps) {
  const data = breakdown && breakdown.length > 0 ? breakdown : CATEGORIES;
  const totalItems = data.reduce((sum, item) => sum + item.value, 0) || 1;

  let accumulated = 0;
  const donut = data
    .map((category) => {
      const percentage = Math.round((category.value / totalItems) * 100);
      const start = accumulated;
      accumulated += percentage;
      return `${category.color} ${start}% ${accumulated}%`;
    })
    .join(", ");

  return (
    <div className="bg-white border border-[#E8E8E3]/80 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-bold text-[#202522]">
          Products by category
        </h3>
        <span className="text-[10px] uppercase font-bold text-[#8CBC67] bg-[#EEF6EB] px-2 py-0.5 rounded-full">
          Live Data
        </span>
      </div>

      <div className="mt-5 flex justify-center">
        <div
          className="relative w-40 h-40 rounded-full"
          style={{
            background: `conic-gradient(${donut})`,
          }}
          role="img"
          aria-label="Products by category"
        >
          <div className="absolute inset-5 rounded-full bg-white flex flex-col items-center justify-center">
            <span className="font-serif text-2xl font-bold text-[#202522] lining-nums">
              {totalItems.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#6B706C]">
              products
            </span>
          </div>
        </div>
      </div>

      <ul className="mt-5 space-y-2">
        {data.map((category) => {
          const percentage = Math.round((category.value / totalItems) * 100);
          return (
            <li
              key={category.name}
              className="flex items-center justify-between text-xs"
            >
              <span className="flex items-center gap-2 text-[#202522]">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    background: category.color,
                  }}
                />
                <span className="truncate max-w-[150px]">{category.name}</span>
              </span>
              <span className="font-bold text-[#202522]">
                {category.value} ({percentage}%)
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}