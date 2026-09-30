"use client";

import React, { useState } from "react";
import { Users, Search, Mail, Phone, Calendar, ShieldAlert, CheckCircle } from "lucide-react";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul.sharma@gmail.com", phone: "+91 98765 43210", bookingsCount: 3, joined: "Jan 12, 2026", status: "Active" },
    { id: "2", name: "Priya Verma", email: "priya.verma@yahoo.com", phone: "+91 91234 56789", bookingsCount: 1, joined: "Feb 04, 2026", status: "Active" },
    { id: 3, name: "Amit Patel", email: "amit.patel@outlook.com", phone: "+91 99887 76655", bookingsCount: 5, joined: "Nov 20, 2025", status: "VIP" },
    { id: 4, name: "Sneha Gupta", email: "sneha.g@gmail.com", phone: "+91 94561 23789", bookingsCount: 2, joined: "Mar 01, 2026", status: "Active" },
  ]);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-amber-200/80 p-6 rounded-3xl shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-neutral-900">Registered Customers</h2>
          <p className="text-neutral-500 text-xs font-light mt-1">View and manage all customer accounts registered on DreamDeco.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Search clients..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-amber-200 text-xs focus:outline-none focus:border-amber-500 bg-[#FFFDF9]"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-amber-100 text-neutral-400 uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-semibold">Customer Name</th>
                <th className="pb-3 font-semibold">Email Address</th>
                <th className="pb-3 font-semibold">Phone Number</th>
                <th className="pb-3 font-semibold">Total Bookings</th>
                <th className="pb-3 font-semibold">Joined Date</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-amber-50/50 transition">
                  <td className="py-4 font-bold text-neutral-900 flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-serif text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <span>{user.name}</span>
                  </td>
                  <td className="py-4 text-neutral-600 flex items-center space-x-1.5 pt-6">
                    <Mail size={13} className="text-amber-600" />
                    <span>{user.email}</span>
                  </td>
                  <td className="py-4 text-neutral-600">
                    <span className="inline-flex items-center space-x-1.5">
                      <Phone size={13} className="text-amber-600" />
                      <span>{user.phone}</span>
                    </span>
                  </td>
                  <td className="py-4 font-mono font-bold text-neutral-900">{user.bookingsCount} Events</td>
                  <td className="py-4 text-neutral-500">{user.joined}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      user.status === "VIP" ? "bg-amber-500 text-neutral-950 shadow-sm" : "bg-green-100 text-green-800"
                    }`}>
                      <CheckCircle size={12} />
                      <span>{user.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}