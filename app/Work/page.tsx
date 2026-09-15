"use client";

import React, { useRef } from "react";
import { Star, Sparkles, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    name: "Atharv Surana",
    location: "Bhopal",
    text: "Thank you for the decoration. It was nicely done and everyone loved it. Very cooperative and budget friendly.",
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    name: "Sourav Dugar",
    location: "Thane",
    text: "I have contacted this vendor just a day before my kid’s birthday and they have done an awesome job. Loved this whole decor. Staff were so cooperative and helpful.",
  },
  {
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    name: "Simran Nigam",
    location: "Ahmedabad",
    text: "Great Job Done.. Extremely Professional, Reasonable and great at work.. You get what you ask for and little more delights. Looking forward to more work together..",
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    name: "Pooja Rathore",
    location: "Indore",
    text: "Absolute stunning setup! The floral arrangement and candlelight detailing made our anniversary feel straight out of a fairy tale. Highly recommended!",
  },
  {
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    name: "Manish Khandelwal",
    location: "Jaipur",
    text: "Superb execution and very punctual team. They completed the entire venue transformation way before time. Amazing work ethic!",
  },
  {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    name: "Ananya Pillai",
    location: "Mumbai",
    text: "Very elegant and classy decor options. Loved how subtle yet luxurious everything looked. Will definitely book again for future family functions.",
  },
];

export default function CustomerReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: "smooth" });
    }
  };

  return (
    <section className="relative text-[#1A1A1A] py-24 px-6 md:px-16 overflow-hidden font-sans border-t border-[#E6DEC9]/40">
      
      {/* Background Image Setup - Clear & Crystal Sharp */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url('/bgpic.png')` }}
      />
      
      {/* Light Gentle Overlay */}
      <div className="absolute inset-0 bg-[#FFFDF9]/40 backdrop-blur-[0.5px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Section Header (Without Buttons) */}
        <div className="flex flex-col items-center text-center space-y-4 border-b border-[#D9CEB3]/40 pb-8 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-[#F3EAD3]/90 border border-[#E2D2B0] px-4 py-1.5 rounded-full text-[#7B6220] text-xs uppercase tracking-[0.25em] font-medium shadow-sm backdrop-blur-sm">
            <Sparkles size={13} />
            <span>Testimonials</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light tracking-wide text-[#1A1A1A]">
            Customer <span className="italic font-normal text-[#8C6D24]">Reviews</span>
          </h2>

          <div className="flex items-center justify-center space-x-2 pt-1">
            <div className="flex items-center space-x-1 text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm font-medium tracking-wide text-[#3A3A3A]">
              4.7 / 5 <span className="text-[#6A6A6A] font-light text-xs ml-1">(9 reviews)</span>
            </span>
          </div>
        </div>

        {/* Scrollable Reviews Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((item, index) => (
            <div 
              key={index} 
              className="min-w-[300px] sm:min-w-[380px] max-w-[400px] snap-start bg-[#FFFFFF] border border-[#E6DEC9] hover:border-[#C5A059] p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] relative group hover:-translate-y-1"
            >
              {/* Subtle Watermark Quote */}
              <Quote className="absolute top-6 right-6 text-[#EFEAD9] group-hover:text-[#E2D8BE] transition-colors pointer-events-none" size={44} />

              {/* Review Text */}
              <p className="text-[#2C2C2C] text-sm font-light leading-relaxed relative z-10 italic">
                "{item.text}"
              </p>

              {/* User Info & Dummy Image */}
              <div className="flex items-center space-x-4 pt-4 border-t border-[#F2ECE1]">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#D9CEB3] shadow-sm shrink-0" 
                />
                <div>
                  <h4 className="text-base font-serif font-medium text-[#1A1A1A]">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-[#8C6D24] font-medium tracking-wider uppercase">
                    {item.location}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Slider Arrow Controls (< >) placed neatly at the bottom center */}
        <div className="flex items-center justify-center space-x-4 pt-4">
          <button 
            onClick={() => scroll("left")}
            aria-label="Scroll Left"
            className="w-12 h-12 rounded-full bg-white border border-[#D9CEB3] hover:border-[#8C6D24] text-[#8C6D24] hover:bg-[#FAF5EC] flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>
          <button 
            onClick={() => scroll("right")}
            aria-label="Scroll Right"
            className="w-12 h-12 rounded-full bg-white border border-[#D9CEB3] hover:border-[#8C6D24] text-[#8C6D24] hover:bg-[#FAF5EC] flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>
        </div>

      </div>
    </section>
  );
}