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
    <div className="bg-white border border-[#E8E8E3]/80 rounded-3xl p-6 shadow-sm">

      <h3 className="font-serif text-lg font-bold text-[#202522] flex items-center gap-2">

        <Bell
          size={17}
          className="text-[#8CBC67]"
        />

        Needs your attention

      </h3>

      <ul className="mt-4 space-y-2.5 text-sm">

        <li className="flex items-center justify-between rounded-xl bg-[#EEF6EB] px-3.5 py-2.5">

          <span className="text-[#202522]">
            Bookings to confirm
          </span>

          <span className="font-bold text-[#202522]">
            {pendingCount}
          </span>

        </li>

        <li className="flex items-center justify-between rounded-xl bg-[#EEF6EB] px-3.5 py-2.5">

          <span className="text-[#202522] flex items-center gap-1.5">

            <MessageSquare size={14} />

            Reviews to approve

          </span>

          <span className="font-bold text-[#202522]">
            2
          </span>

        </li>

        <li className="flex items-center justify-between rounded-xl bg-[#EEF6EB] px-3.5 py-2.5">

          <span className="text-[#202522]">
            Coupons expiring soon
          </span>

          <span className="font-bold text-[#202522]">
            1
          </span>

        </li>

      </ul>

    </div>
  );
}