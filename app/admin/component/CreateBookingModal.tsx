
"use client";

import React from "react";

interface Booking {
  customer: string;
  theme: string;
  date: string;
  amount: string;
}

interface CreateBookingModalProps {
  newBooking: Booking;
  setNewBooking: React.Dispatch<React.SetStateAction<Booking>>;
  handleAddBooking: (e: React.FormEvent<HTMLFormElement>) => void;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateBookingModal({
  newBooking,
  setNewBooking,
  handleAddBooking,
  setShowAddModal,
}: CreateBookingModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#8CBC67] shadow-2xl space-y-6">

        <h3 className="font-serif text-xl font-bold text-[#202522]">
          Create New Booking Entry
        </h3>

        <form
          onSubmit={handleAddBooking}
          className="space-y-4 text-xs"
        >
          {/* Customer */}
          <div>
            <label className="block text-[#6B706C] font-bold mb-1">
              Customer Full Name
            </label>

            <input
              type="text"
              required
              placeholder="e.g. Rohit Sharma"
              value={newBooking.customer}
              onChange={(e) =>
                setNewBooking({
                  ...newBooking,
                  customer: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FFFFFF] focus:outline-none focus:border-[#8CBC67]"
            />
          </div>

          {/* Theme */}
          <div>
            <label className="block text-[#6B706C] font-bold mb-1">
              Decoration Theme
            </label>

            <input
              type="text"
              required
              placeholder="e.g. Royal Wedding Decor"
              value={newBooking.theme}
              onChange={(e) =>
                setNewBooking({
                  ...newBooking,
                  theme: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FFFFFF] focus:outline-none focus:border-[#8CBC67]"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-[#6B706C] font-bold mb-1">
              Event Date
            </label>

            <input
              type="text"
              placeholder="e.g. Dec 31, 2026"
              value={newBooking.date}
              onChange={(e) =>
                setNewBooking({
                  ...newBooking,
                  date: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FFFFFF] focus:outline-none focus:border-[#8CBC67]"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-[#6B706C] font-bold mb-1">
              Amount (₹)
            </label>

            <input
              type="text"
              placeholder="e.g. 7500"
              value={newBooking.amount}
              onChange={(e) =>
                setNewBooking({
                  ...newBooking,
                  amount: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FFFFFF] focus:outline-none focus:border-[#8CBC67]"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2.5 rounded-xl bg-neutral-100 text-[#6B706C] font-bold hover:bg-neutral-200 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#8CBC67] text-neutral-950 font-bold hover:bg-[#8CBC67] transition shadow-sm"
            >
              Save Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
