import { CATEGORIES } from "../data/dashboard";

export default function CategoryChart() {
  let accumulated = 0;

  const donut = CATEGORIES
    .map((category) => {
      const start = accumulated;

      accumulated += category.value;

      return `${category.color} ${start}% ${accumulated}%`;
    })
    .join(", ");

  return (
    <div className="bg-white border border-[#E8E8E3]/80 rounded-3xl p-6 shadow-sm">

      <h3 className="font-serif text-xl font-bold text-[#202522]">
        Bookings by category
      </h3>

      <div className="mt-5 flex justify-center">

        <div
          className="relative w-40 h-40 rounded-full"
          style={{
            background: `conic-gradient(${donut})`,
          }}
          role="img"
          aria-label="Bookings by category"
        >

          <div className="absolute inset-5 rounded-full bg-white flex flex-col items-center justify-center">

            <span className="font-serif text-2xl font-bold text-[#202522] lining-nums">
              1,248
            </span>

            <span className="text-[10px] uppercase tracking-wider text-[#6B706C]">
              bookings
            </span>

          </div>

        </div>

      </div>

      <ul className="mt-5 space-y-2">

        {CATEGORIES.map((category) => (
          <li
            key={category.name}
            className="flex items-center justify-between text-xs"
          >

            <span className="flex items-center gap-2 text-[#202522]">

              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background:
                    category.color,
                }}
              />

              {category.name}

            </span>

            <span className="font-bold text-[#202522]">
              {category.value}%
            </span>

          </li>
        ))}

      </ul>

    </div>
  );
}