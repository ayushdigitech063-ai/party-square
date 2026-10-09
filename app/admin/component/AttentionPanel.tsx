import {
  Bell,
  MessageSquare,
} from "lucide-react";

interface AttentionPanelProps {
  pendingCount: number;
}

export default function AttentionPanel({
  pendingCount,
}: AttentionPanelProps) {
  return (
    <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm">

      <h3 className="font-serif text-lg font-bold text-neutral-900 flex items-center gap-2">

        <Bell
          size={17}
          className="text-amber-600"
        />

        Needs your attention

      </h3>

      <ul className="mt-4 space-y-2.5 text-sm">

        <li className="flex items-center justify-between rounded-xl bg-amber-50 px-3.5 py-2.5">

          <span className="text-neutral-700">
            Bookings to confirm
          </span>

          <span className="font-bold text-amber-800">
            {pendingCount}
          </span>

        </li>

        <li className="flex items-center justify-between rounded-xl bg-amber-50 px-3.5 py-2.5">

          <span className="text-neutral-700 flex items-center gap-1.5">

            <MessageSquare size={14} />

            Reviews to approve

          </span>

          <span className="font-bold text-amber-800">
            2
          </span>

        </li>

        <li className="flex items-center justify-between rounded-xl bg-amber-50 px-3.5 py-2.5">

          <span className="text-neutral-700">
            Coupons expiring soon
          </span>

          <span className="font-bold text-amber-800">
            1
          </span>

        </li>

      </ul>

    </div>
  );
}