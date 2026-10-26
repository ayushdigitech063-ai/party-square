"use client";

import React, { useState } from "react";
import { X, Calendar, MapPin, Phone, User, Clock, Loader2, Upload, Image as ImageIcon, Trash2 } from "lucide-react";
import { uploadImage } from "@/app/lib/api";
import toast from "react-hot-toast";

export interface NewBookingData {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  theme: string;
  productImage?: string;
  city: string;
  eventDate: string;
  eventTimeSlot: string;
  deliveryAddress: string;
  specialRequests?: string;
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
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (PNG, JPG, WebP)");
      return;
    }

    setIsUploading(true);
    try {
      const res = await uploadImage(file);
      if (res?.url) {
        setNewBooking((prev) => ({ ...prev, productImage: res.url }));
        toast.success("Decoration image uploaded successfully!");
      } else {
        // Fallback: FileReader Base64 preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewBooking((prev) => ({ ...prev, productImage: reader.result as string }));
          toast.success("Image selected for booking!");
        };
        reader.readAsDataURL(file);
      }
    } catch {
      // Fallback: FileReader Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBooking((prev) => ({ ...prev, productImage: reader.result as string }));
        toast.success("Image selected!");
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#8CBC67] shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
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

          {/* 1. PRODUCT / DECORATION IMAGE UPLOAD */}
          <div>
            <label className="block text-[#6B706C] font-bold mb-1">
              Decoration Image / Reference Photo
            </label>
            {newBooking.productImage ? (
              <div className="flex items-center gap-3 p-3 rounded-2xl border border-[#E8E8E3] bg-[#FCFBF7]">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-[#E8E8E3] shrink-0 relative">
                  <img
                    src={newBooking.productImage}
                    alt="Uploaded design"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#202522] truncate">Reference Image Attached</p>
                  <p className="text-[10px] text-[#6B706C]">Will be visible in booking details</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNewBooking((prev) => ({ ...prev, productImage: "" }))}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                  title="Remove image"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-[#E8E8E3] hover:border-[#8CBC67] bg-[#FCFBF7] hover:bg-[#EEF6EB]/30 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition text-center group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="hidden"
                />
                <div className="w-10 h-10 rounded-full bg-[#EEF6EB] flex items-center justify-center text-[#8CBC67] mb-2 group-hover:scale-105 transition">
                  {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                </div>
                <span className="text-xs font-bold text-[#202522]">
                  {isUploading ? "Uploading image..." : "Upload Reference Image"}
                </span>
                <span className="text-[10px] text-[#6B706C] mt-0.5">
                  Click to select photo from device (PNG, JPG, WebP)
                </span>
              </label>
            )}
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

          {/* 2. SPECIAL REQUESTS / BALLOON COLOR COMMENTS */}
          <div>
            <label className="block text-[#6B706C] font-bold mb-1">
              Special Requests / Balloon Color Customization
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Change balloon colors to pastel pink & rose gold, add custom LED 'Happy 25th' light..."
              value={newBooking.specialRequests || ""}
              onChange={(e) =>
                setNewBooking({
                  ...newBooking,
                  specialRequests: e.target.value,
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] focus:outline-none focus:border-[#8CBC67] resize-none"
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
              disabled={isSaving || isUploading}
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
