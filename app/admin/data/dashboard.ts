import { CalendarCheck, Clock, Sparkle, Star, TrendingUp, Users } from "lucide-react";

export const REVENUE: Record<string, { labels: string[]; values: number[] }> = {
  "7D": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [42000, 38000, 51000, 47000, 65000, 88000, 72000],
  },
  "30D": {
    labels: ["W1", "W2", "W3", "W4", "W5"],
    values: [210000, 245000, 198000, 312000, 285000],
  },
  "90D": {
    labels: ["Jul", "Aug", "Sep"],
    values: [640000, 720000, 910000],
  },
};

export const CATEGORIES = [
  { name: "Birthday", value: 38, color: "#F59E0B" },
  { name: "Wedding", value: 24, color: "#B45309" },
  { name: "Festival", value: 20, color: "#1C1917" },
  { name: "Anniversary", value: 12, color: "#FCD34D" },
  { name: "Other", value: 6, color: "#A8A29E" },
];

export const TOP_THEMES = [
  { name: "Birthday Celebration", bookings: 182 },
  { name: "Ganpati Mandap", bookings: 141 },
  { name: "Romantic Candlelight", bookings: 118 },
  { name: "Baby Shower Bliss", bookings: 96 },
  { name: "Navratri Celebration", bookings: 74 },
];

export const KPI = [
  { title: "Total Bookings", value: "1,248", change: "+12%", icon: CalendarCheck, color: "bg-amber-500", href: "/admin/bookings", trend: [8, 10, 9, 13, 12, 16, 18] },
  { title: "Active Themes", value: "24", change: "+4 new", icon: Sparkle, color: "bg-stone-900 text-white", href: "/admin/themes", trend: [14, 15, 15, 18, 20, 22, 24] },
  { title: "Total Revenue", value: "₹24,80,000", change: "+18%", icon: TrendingUp, color: "bg-amber-400", href: "/admin/analytics", trend: [5, 7, 6, 9, 11, 10, 14] },
  { title: "Registered Users", value: "3,840", change: "+250", icon: Users, color: "bg-stone-800 text-white", href: "/admin/customers", trend: [20, 22, 25, 24, 28, 31, 34] },
  { title: "Pending Bookings", value: "", change: "needs action", icon: Clock, color: "bg-orange-500 text-white", href: "/admin/bookings", trend: [3, 5, 4, 6, 5, 7, 6] },
  { title: "Average Rating", value: "4.8 / 5", change: "+0.1", icon: Star, color: "bg-amber-300", href: "/admin/reviews", trend: [46, 47, 47, 48, 48, 48, 48] },
];

export const UPCOMING = [
  { date: "Oct 12", title: "Birthday Celebration", who: "Karan Mehta" },
  { date: "Oct 15", title: "Romantic Candlelight", who: "Amit Patel" },
  { date: "Oct 21", title: "Baby Shower Bliss", who: "Neha Gupta" },
];

export const STATUS_TABS = ["All", "Pending", "Confirmed", "Completed", "Cancelled"] as const;
