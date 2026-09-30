"use client";

import React, { useState } from "react";
import { Star, CheckCircle, Trash2, MessageSquare } from "lucide-react";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([
    { id: 1, client: "Rahul Sharma", rating: 5, comment: "Amazing Christmas decoration! The lighting setup was phenomenal.", status: "Featured" },
    { id: 2, client: "Priya Verma", rating: 4, comment: "Very professional team and timely execution for our Ganpati mandap.", status: "Approved" },
    { id: 3, client: "Amit Patel", rating: 5, comment: "Candlelight setup made our anniversary unforgettable!", status: "Approved" },
  ]);

  const deleteReview = (id: number) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="bg-white border border-amber-200/80 p-6 rounded-3xl shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-neutral-900">Customer Reviews & Ratings</h2>
        <p className="text-neutral-500 text-xs font-light mt-1">Monitor testimonials and choose which reviews to showcase on the homepage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map(r => (
          <div key={r.id} className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-serif font-bold text-neutral-900">{r.client}</span>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full">{r.status}</span>
              </div>
              <div className="flex text-amber-500 space-x-1">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs text-neutral-600 italic">"{r.comment}"</p>
            </div>

            <div className="pt-4 border-t border-amber-100 flex justify-end">
              <button onClick={() => deleteReview(r.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-xl transition flex items-center space-x-1 text-xs font-bold">
                <Trash2 size={14} />
                <span>Remove Review</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}