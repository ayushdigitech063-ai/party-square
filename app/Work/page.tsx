"use client";

import React, { useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    initials: "AS",
    name: "Atharv Surana",
    rating: 4.9,
    location: "Bhopal",
    text: "Thank you for the decoration. It was nicely done and everyone loved it. Very cooperative and budget friendly.",
  },
  {
    initials: "SD",
    name: "Sourav Dugar",
    rating: 5.0,
    location: "Thane",
    text: "I have contacted this vendor just a day before my kid's birthday and they have done an awesome job. Loved this whole decor. Staff were so cooperative and helpful.",
  },
  {
    initials: "SN",
    name: "Simran Nigam",
    rating: 4.8,
    location: "Ahmedabad",
    text: "Great Job Done.. Extremely Professional, Reasonable and great at work.. You get what you ask for and little more delights. Looking forward to more work together..",
  },
  {
    initials: "PR",
    name: "Pooja Rathore",
    rating: 5.0,
    location: "Indore",
    text: "Absolute stunning setup! The floral arrangement and candlelight detailing made our anniversary feel straight out of a fairy tale. Highly recommended!",
  },
  {
    initials: "MK",
    name: "Manish Khandelwal",
    rating: 4.9,
    location: "Jaipur",
    text: "Superb execution and very punctual team. They completed the entire venue transformation way before time. Amazing work ethic!",
  },
  {
    initials: "AP",
    name: "Ananya Pillai",
    rating: 5.0,
    location: "Mumbai",
    text: "Very elegant and classy decor options. Loved how subtle yet luxurious everything looked. Will definitely book again for future family functions.",
  },
];

export default function CustomerReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -260 : 260;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-[#FCFBF7] text-[#202522] py-8 sm:py-14 px-4 sm:px-6 md:px-12 font-sans border-t border-[#E8E8E3]">
      <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">
        
        {/* Simple Top Bar (Title + Rating Pill + Arrow Controls) */}
        <div className="flex items-center justify-between gap-4 border-b border-[#E8E8E3] pb-4">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#8CBC67] rounded-full inline-block shrink-0" />
            <h2 className="text-lg sm:text-2xl font-serif font-bold text-[#202522]">
              Customer Reviews
            </h2>
          </div>

          {/* Desktop & Mobile Rating + Controls */}
          <div className="flex items-center gap-3">
            {/* Overall Rating Box */}
            <div className="hidden sm:flex items-center gap-2 bg-white border border-[#E8E8E3] px-3 py-1.5 rounded-xl shadow-2xs">
              <span className="text-base font-bold text-[#202522]">4.7</span>
              <div className="flex text-[#D7A84B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>
              <span className="text-xs text-[#6B706C] font-normal">(9 reviews)</span>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Previous reviews"
                className="w-8 h-8 rounded-full border border-[#E8E8E3] bg-white text-[#202522] hover:bg-[#EEF6EB] hover:border-[#8CBC67] hover:text-[#8CBC67] flex items-center justify-center transition shadow-2xs cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Next reviews"
                className="w-8 h-8 rounded-full border border-[#E8E8E3] bg-white text-[#202522] hover:bg-[#EEF6EB] hover:border-[#8CBC67] hover:text-[#8CBC67] flex items-center justify-center transition shadow-2xs cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Top Rating summary bar */}
        <div className="flex sm:hidden items-center justify-between bg-white border border-[#E8E8E3] px-3.5 py-2 rounded-xl shadow-2xs">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#202522]">4.7</span>
            <div className="flex text-[#D7A84B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="currentColor" />
              ))}
            </div>
          </div>
          <span className="text-[11px] text-[#6B706C] font-medium">9 verified reviews</span>
        </div>

        {/* Reviews Track (Showing 2 Cards on Mobile Screen!) */}
        <div
          ref={scrollRef}
          className="flex gap-2.5 sm:gap-4 overflow-x-auto scroll-smooth pb-2 pt-1 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((item, index) => (
            <div
              key={index}
              className="w-[165px] min-[400px]:w-[185px] sm:w-[280px] md:w-[320px] shrink-0 snap-start bg-white border border-[#E8E8E3] hover:border-[#8CBC67] p-3.5 sm:p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-md"
            >
              {/* User Header with Avatar Initials & Rating */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#EEF6EB] text-[#8CBC67] font-bold text-xs sm:text-sm flex items-center justify-center border border-[#8CBC67]/30 shrink-0">
                  {item.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-[#202522] truncate">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-[#202522]">{item.rating}</span>
                    <div className="flex text-[#D7A84B]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={9} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-[#6B706C] text-[11px] sm:text-xs leading-relaxed line-clamp-4 flex-1">
                &ldquo;{item.text}&rdquo;
              </p>

              {/* City Tag */}
              <div className="pt-2 border-t border-[#E8E8E3] flex items-center justify-between text-[10px] text-[#6B706C]">
                <span className="font-semibold uppercase tracking-wider text-[#8CBC67]">
                  {item.location}
                </span>
                <span className="text-[10px] text-neutral-400">Verified Client</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
