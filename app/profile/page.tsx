import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoaderCircle, MapPin, Calendar, Clock, CreditCard, CheckCircle2 } from "lucide-react";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/");
  }

  // Fetch User Profile
  const profileRes = await fetch("http://localhost:5000/api/auth/profile", {
    headers: { Authorization: "Bearer " + token },
    cache: "no-store",
  });

  if (!profileRes.ok) {
    redirect("/");
  }

  const user = await profileRes.json();

  // Fetch Bookings
  const bookingsRes = await fetch("http://localhost:5000/api/bookings/my", {
    headers: { Authorization: "Bearer " + token },
    cache: "no-store",
  });

  const bookings = bookingsRes.ok ? await bookingsRes.json() : [];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* User Account Details */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5">
          <div className="border-b border-gray-100 bg-[#EEF6EB]/50 px-6 py-5 sm:px-8 sm:py-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">User Profile</h2>
              <p className="mt-1 text-sm text-gray-500">Account details and personal information.</p>
            </div>
            {/* Server component me logout button ke liye form or client component zaroorat hoti hai. Yahan client component logout button use kar sakte hain */}
            <form action={async () => {
              "use server";
              const c = await cookies();
              c.delete("token");
              c.delete("user");
              redirect("/");
            }}>
              <button type="submit" className="px-4 py-2 bg-[#F7D6C7] text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition">Logout</button>
            </form>
          </div>
          <div className="px-6 py-6 sm:px-8">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="mt-1 text-base text-gray-900 font-semibold">{user.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                <dd className="mt-1 text-base text-gray-900">{user.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd className="mt-1 text-base text-gray-900">+91 {user.phone}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* User Bookings */}
        <h3 className="mb-4 text-lg font-bold text-gray-900">My Bookings</h3>
        
        {bookings.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-900/5">
            <h4 className="text-gray-500 font-medium">No bookings found yet.</h4>
            <a href="/" className="mt-4 inline-block px-6 py-2 bg-[#8CBC67] text-white rounded-lg font-bold hover:bg-[#7AB055]">Browse Services</a>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {bookings.map((booking: any) => (
              <div key={booking._id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition hover:shadow-md">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-[#EEF6EB] px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      <CheckCircle2 size={12} />
                      {booking.bookingStatus}
                    </span>
                    <h4 className="mt-2 text-lg font-bold text-gray-900 line-clamp-1">{booking.productName}</h4>
                    <p className="text-xs text-gray-500 mt-1">ID: {booking.bookingId}</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{new Date(booking.eventDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span>{booking.eventTimeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="line-clamp-1">{booking.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-gray-400" />
                    <span className="font-semibold text-gray-900">₹{booking.totalAmount}</span>
                    <span className="text-xs text-gray-500 ml-1">({booking.paymentStatus})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}