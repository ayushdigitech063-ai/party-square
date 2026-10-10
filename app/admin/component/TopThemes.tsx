import { TOP_THEMES } from "../data/dashboard";

export default function TopThemes() {
  return (
    <div className="bg-white border border-[#E8E8E3]/80 rounded-3xl p-6 shadow-sm">

      <h3 className="font-serif text-lg font-bold text-[#202522]">
        Top themes
      </h3>

      <ul className="mt-4 space-y-3">

        {TOP_THEMES.map((theme) => (
          <li key={theme.name}>

            <div className="flex justify-between text-xs mb-1">

              <span className="text-[#202522]">
                {theme.name}
              </span>

              <span className="font-bold text-[#202522]">
                {theme.bookings}
              </span>

            </div>

            <div className="h-2 rounded-full bg-[#EEF6EB] overflow-hidden">

              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8CBC67] to-amber-700"
                style={{
                  width: `${
                    (theme.bookings /
                      TOP_THEMES[0]
                        .bookings) *
                    100
                  }%`,
                }}
              />

            </div>

          </li>
        ))}

      </ul>

    </div>
  );
}
