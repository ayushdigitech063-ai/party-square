export type Status =
  | "Confirmed"
  | "Pending"
  | "Completed"
  | "Cancelled";

export interface Booking {
  id: string;
  customer: string;
  theme: string;
  date: string;
  amount: number;
  status: Status;
}

export type DateRange = "7D" | "30D" | "90D";

export type BookingTab = "All" | Status;