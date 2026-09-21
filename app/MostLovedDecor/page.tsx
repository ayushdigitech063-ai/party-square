"use client";

import React, { useState, useRef } from "react";
import { Sparkles, X, ArrowRight } from "lucide-react";

const decorationItems = [
  {
    id: 1,
    title: "Birthday Celebration",
    subtitle: "Joyful & Vibrant Setups",
    image: "/birthdaydesign.png",
    description: "Make birthdays extra special with vibrant balloon arches, custom backdrops, fairy lights, and personalized theme setups designed to create everlasting memories.",
  },
  {
    id: 2,
    title: "Romantic Vibes",
    subtitle: "Candlelight & Roses",
    image: "/romaticvibe.png",
    description: "Ignite the romance with breathtaking candlelight pathways, cascading rose petals, cozy cabanas, and intimate dinner decor tailored for anniversaries and dates.",
  },
  {
    id: 3,
    title: "Ganpati Utsav",
    subtitle: "Divine Mandap Decor",
    image: "/ganpatidecoration.png",
    description: "Welcome Lord Ganesha home with exquisite traditional mandaps, fresh floral hangings, gold accents, and serene lighting setups crafted with deep devotion.",
  },
  {
    id: 4,
    title: "Navratri Celebration",
    subtitle: "Traditional & Colorful",
    image: "/navratridecoration.png",
    description: "Celebrate the festive nine nights with vibrant ethnic props, marigold floral styling, traditional elements, and bright festive illumination.",
  },
  {
    id: 5,
    title: "Janmashtami",
    subtitle: "Divine Krishna Jhula",
    image: "/janmasthmi.png",
    description: "Transform your space into a divine Vrindavan with beautifully decorated jhulas, peacock feather motifs, butter pots, and glowing traditional lights.",
  },
  {
    id: 6,
    title: "Christmas Magic",
    subtitle: "Festive Winter Wonderland",
    image: "/crismasdecoration.png",
    description: "Bring home the Christmas cheer with frosted pine trees, glittering ornaments, warm fairy lights, and cozy winter-themed festive corners.",
  },
  {
    id: 7,
    title: "Diwali Festivities",
    subtitle: "Traditional Lighting & Diya Decor",
    image: "/diwalidecoration.png",
    description: "Brighten up your home with bespoke floral rangolis, traditional diyas, ambient lighting, and elegant festive corners for Laxmi Pujan.",
  },
  {
    id: 8,
    title: "Grand Celebrations",
    subtitle: "Luxury Stage & Events",
    image: "/homepage.png",
    description: "From grand receptions to premium family milestones, experience breathtaking stage styling, floral ceilings, and immaculate attention to detail.",
  },
];

export default function MostLovedDecor() {
  const [selectedItem, setSelectedItem] = useState<typeof decorationItems[0] | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0); // Track actual movement to support smooth clicking

  // Mouse Drag to Scroll Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragDistance.current = 0;
    startX.current = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;
    
    dragDistance.current += Math.abs(walk); // Accumulate distance moved

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  return (
    <section className="relative bg-[#FBF8F2] text-[#1A1A1A] py-24 px-6 md:px-16 overflow-hidden font-sans border-t border-[#E6DEC9]">
      
      {/* Background Soft Ambient Warm Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EEDCB9]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#E6DEC9] pb-8 text-center md:text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 bg-[#F3EAD3] border border-[#E2D2B0] px-4 py-1.5 rounded-full text-[#7B6220] text-xs uppercase tracking-[0.25em] font-medium shadow-sm">
              <Sparkles size={13} />
              <span>Our Speciality</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light tracking-wide text-[#1A1A1A]">
              Most Loved <span className="italic font-normal text-[#8C6D24]">Decorations</span>
            </h2>
            <p className="text-[#5A5A5A] text-sm max-w-xl font-light">
              Explore our curated themes. Click and drag your mouse horizontally, or click on any picture to view full decoration details.
            </p>
          </div>
        </div>

        {/* Drag-to-Scroll Cards Container */}
        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 select-none cursor-grab active:cursor-grabbing snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {decorationItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => {
                // Only open modal if user clicked without dragging
                if (dragDistance.current < 5) {
                  setSelectedItem(item);
                }
              }}
              className="min-w-[280px] sm:min-w-[320px] max-w-[340px] h-[400px] snap-start relative rounded-3xl overflow-hidden border border-[#EAE2CE] hover:border-[#C5A059] transition-all duration-300 group shadow-[0_10px_30px_rgba(0,0,0,0.06)] bg-white flex flex-col justify-end shrink-0 cursor-pointer"
            >
              {/* Card Background Image */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                {/* Subtle bottom gradient for title readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Minimal Card Title Overlay */}
              <div className="relative z-10 p-6 space-y-1 text-white pointer-events-none">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#E5C575] font-medium">
                  {item.subtitle}
                </span>
                <h3 className="text-xl font-serif font-normal text-white flex items-center justify-between">
                  <span>{item.title}</span>
                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xs group-hover:bg-[#C5A059] group-hover:text-black transition-colors">
                    <ArrowRight size={14} />
                  </span>
                </h3>
              </div>

            </div>
          ))}
        </div>

      </div>
{/* Interactive Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-[#FFFDF9] border border-[#E2D2B0] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl text-[#1A1A1A] p-6 sm:p-8 pt-14 space-y-6">
            
            {/* Properly Positioned Close Button */}
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#F4EFE6] border border-[#D9CEB3] text-[#8C6D24] hover:bg-[#EBE2D0] flex items-center justify-center transition shadow-sm cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Image */}
            <div className="w-full h-60 rounded-2xl overflow-hidden relative border border-[#D9CEB3]">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title} 
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-4 left-4 text-xs tracking-widest text-[#7B6220] uppercase font-medium bg-[#FFFDF9]/90 px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                {selectedItem.subtitle}
              </span>
            </div>

            {/* Modal Content */}
            <div className="space-y-3">
              <h3 className="text-2xl font-serif text-[#1A1A1A]">
                {selectedItem.title}
              </h3>
              <p className="text-[#4A4A4A] text-sm leading-relaxed font-light">
                {selectedItem.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-2">
              <button 
                onClick={() => setSelectedItem(null)}
                className="flex-1 bg-[#8C6D24] text-white py-3 rounded-full font-medium text-sm hover:bg-[#72571D] transition shadow-md cursor-pointer"
              >
                Book This Theme
              </button>
              <button 
                onClick={() => setSelectedItem(null)}
                className="px-6 py-3 rounded-full border border-[#D9CEB3] hover:border-[#8C6D24] text-sm text-[#4A4A4A] transition cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}