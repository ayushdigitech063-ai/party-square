import { UPCOMING } from "../data/dashboard";

export default function UpcomingEvents() {
  return (
    <div className="bg-white border border-[#E8E8E3]/80 rounded-3xl p-6 shadow-sm">

      <h3 className="font-serif text-lg font-bold text-[#202522]">
        Upcoming events
      </h3>

      <ul className="mt-4 space-y-3">

        {UPCOMING.map((event) => (
          <li
            key={
              event.date +
              event.title
            }
            className="flex items-center gap-3"
          >

            <span className="w-12 shrink-0 text-center rounded-xl bg-stone-900 text-[#8CBC67] py-1.5 text-[11px] font-bold leading-tight">
              {event.date}
            </span>

            <span className="text-sm leading-tight">

              <span className="font-semibold text-[#202522] block">
                {event.title}
              </span>

              <span className="text-xs text-[#6B706C]">
                {event.who}
              </span>

            </span>

          </li>
        ))}

      </ul>

    </div>
  );
}