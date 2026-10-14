"use client";

import React from "react";
import { X, Calendar, MapPin, Phone, User, Clock, Loader2 } from "lucide-react";

export interface NewBookingData {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  theme: string;
  city: string;
  eventDate: string;
  eventTimeSlot: string;
  deliveryAddress: string;
  amount: string;
}

interface CreateBookingModalProps {
  newBooking: NewBookingData;
  setNewBooking: React.Dispatch<React.SetStateAction<NewBookingData>>;
  handleAddBooking: (e: React.FormEvent<HTMLFormElement>) => void;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  isSaving?: boolean;
}

export default function CreateBookingModal({
  newBooking,
  setNewBooking,
  handleAddBooking,
  setShowAddModal,
  isSaving = false,
}: CreateBookingModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#8CBC67] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E3]">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#202522]">
              Create Manual Booking
            </h3>
            <p className="text-xs text-[#6B706C] mt-0.5">
              Add offline/phone inquiry directly into the booking ledger
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(false)}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleAddBooking} className="space-y-4 text-xs">
          {/* Customer Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#6B706C] font-bold mb-1">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rohit Sharma"
                value={newBooking.customerName}
                onChange={(e) =>
                  setNewBooking({
                    ...newBooking,
                    customerName: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] focus:outline-none focus:border-[#8CBC67]"
              />
            </div>

            <div>
              <label className="block text-[#6B706C] font-bold mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="10-digit mobile"
                value={newBooking.customerPhone}
                onChange={(e) =>
                  setNewBooking({
                    ...newBooking,
                    customerPhone: e.target.value.replace(/\D/g, "").slice(0, 10),
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] focus:outline-none focus:border-[#8CBC67]"
              />
            </div>
          </div>

          {/* Theme & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#6B706C] font-bold mb-1">
                Theme / Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Royal Birthday Arch"
                value={newBooking.theme}
                onChange={(e) =>
                  setNewBooking({
                    ...newBooking,
                    theme: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] focus:outline-none focus:border-[#8CBC67]"
              />
            </div>

            <div>
              <label className="block text-[#6B706C] font-bold mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Delhi, Mumbai"
                value={newBooking.city}
                onChange={(e) =>
                  setNewBooking({
                    ...newBooking,
                    city: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] focus:outline-none focus:border-[#8CBC67]"
              />
            </div>
          </div>

          {/* Date & Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#6B706C] font-bold mb-1">
                Event Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={newBooking.eventDate}
                onChange={(e) =>
                  setNewBooking({
                    ...newBooking,
                    eventDate: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] focus:outline-none focus:border-[#8CBC67]"
              />
            </div>

            <div>
              <label className="block text-[#6B706C] font-bold mb-1">
                Time Slot
              </label>
              <select
                value={newBooking.eventTimeSlot}
                onChange={(e) =>
                  setNewBooking({
                    ...newBooking,
                    eventTimeSlot: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] focus:outline-none focus:border-[#8CBC67]"
              >
                <option value="Morning (09:00 AM - 01:00 PM)">Morning (09:00 AM - 01:00 PM)</option>
                <option value="Afternoon (01:00 PM - 05:00 PM)">Afternoon (01:00 PM - 05:00 PM)</option>
                <option value="Evening (04:00 PM - 08:00 PM)">Evening (04:00 PM - 08:00 PM)</option>
                <option value="Night (08:00 PM - 11:30 PM)">Night (08:00 PM - 11:30 PM)</option>
              </select>
            </div>
          </div>

          {/* Venue Address */}
          <div>
            <label className="block text-[#6B706C] font-bold mb-1">
              Venue / Setup Address
            </label>
            <input
              type="text"
              placeholder="e.g. Villa 14, Royal Palm Estate"
              value={newBooking.deliveryAddress}
              onChange={(e) =>
                setNewBooking({
                  ...newBooking,
                  deliveryAddress: e.target.value,
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] focus:outline-none focus:border-[#8CBC67]"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-[#6B706C] font-bold mb-1">
              Total Package Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              min={1}
              placeholder="e.g. 7500"
              value={newBooking.amount}
              onChange={(e) =>
                setNewBooking({
                  ...newBooking,
                  amount: e.target.value,
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] focus:outline-none focus:border-[#8CBC67]"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-[#E8E8E3]">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2.5 rounded-xl bg-neutral-100 text-[#6B706C] font-bold hover:bg-neutral-200 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-[#8CBC67] text-white font-bold hover:bg-[#7AB055] transition shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              {isSaving && <Loader2 size={14} className="animate-spin" />}
              <span>{isSaving ? "Saving..." : "Save to Database"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
