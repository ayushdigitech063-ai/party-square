import { KPI } from "../data/dashboard";
import KpiCard from "./KpiCard";

interface KpiCardsProps {
  pendingCount: number;
}

export default function KpiCards({
  pendingCount,
}: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

      {KPI.map((kpi) => (
        <KpiCard
          key={kpi.title}
          {...kpi}
          value={
            kpi.title === "Pending Bookings"
              ? String(pendingCount)
              : kpi.value
          }
        />
      ))}

    </div>
  );
}