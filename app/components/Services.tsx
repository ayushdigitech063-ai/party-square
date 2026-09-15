"use client";

import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const featured = {
  title: "Wedding Decoration",
  subtitle: "Make your big day magical",
  image: "/wedding.png",
  tag: "Royal Look",
};

const otherServices = [
  {
    title: "Birthday Decoration",
    subtitle: "Celebrate in style",
    image: "/birthdaykids.png",
    tag: "Fun & Kids",
  },
  {
    title: "Corporate Events",
    subtitle: "Professional & elegant",
    image: "/coprateoffice.png",
    tag: "Business",
  },
  {
    title: "Home Decoration",
    subtitle: "Beautiful spaces, better vibes",
    image: "/homedecoration.png",
    tag: "Cozy vibe",
  },
];

export default function Services() {
  return (
    <section className="bg-[#FAF7F2] py-24 px-6 md:px-16 text-[#241C15]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">

          {/* Left: heading & CTA */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <p className="text-sm text-amber-800/80 font-serif italic">the services</p>

            <h2 className="text-4xl sm:text-5xl font-serif font-normal leading-[1.15]">
              Decor for every
              <br />
              <span className="italic font-light">occasion, beautifully done</span>
            </h2>

            <p className="text-[#5A5248] text-sm md:text-base leading-relaxed max-w-sm">
              We specialize in creating beautiful, customized decorations for
              all types of events — bringing your vision to life with
              creativity and elegance.
            </p>

            <button className="group inline-flex items-center space-x-3 bg-[#241C15] text-white px-7 py-3.5 rounded-full font-medium text-sm hover:bg-amber-900 transition-all shadow-md hover:shadow-xl">
              <span>View all services</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: featured service + list */}
          <div className="lg:col-span-8 space-y-10">

            {/* Featured — the flagship service, given real weight */}
            <a href="#" className="group relative block h-80 md:h-96 rounded-2xl overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-8">
                <span className="text-amber-200 text-xs tracking-wide mb-2">{featured.tag}</span>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif text-white">{featured.title}</h3>
                    <p className="text-white/70 text-sm mt-1 font-light">{featured.subtitle}</p>
                  </div>
                  <span className="shrink-0 w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/30 flex items-center justify-center text-white group-hover:bg-amber-200 group-hover:text-[#241C15] group-hover:border-amber-200 transition-all">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </div>
            </a>

            {/* The rest — a quiet list, not a repeated card grid */}
            <div className="divide-y divide-[#241C15]/10 border-t border-b border-[#241C15]/10">
              {otherServices.map((service, index) => (
                <a
                  href="#"
                  key={index}
                  className="group flex items-center gap-5 py-5 hover:bg-white/60 -mx-4 px-4 rounded-lg transition-colors"
                >
                  <div className="shrink-0 w-20 h-16 md:w-24 md:h-20 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-serif text-[#241C15] group-hover:text-amber-900 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#5A5248] font-light mt-0.5">{service.subtitle}</p>
                  </div>

                  <span className="hidden sm:inline text-xs text-amber-800/70 shrink-0">
                    {service.tag}
                  </span>

                  <span className="shrink-0 w-9 h-9 rounded-full border border-[#241C15]/15 flex items-center justify-center text-[#241C15] group-hover:bg-[#241C15] group-hover:text-white group-hover:border-[#241C15] transition-all">
                    <ArrowUpRight size={15} />
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}