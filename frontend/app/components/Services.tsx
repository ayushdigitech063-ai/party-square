"use client";

import React from "react";
import { ArrowRight, ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";

const featured = {
  title: "Wedding Decoration",
  subtitle: "Make your big day magical with royal mandaps & floral setups",
  image: "/wedding.png",
  tag: "Royal Look & Grand Stages",
};

const otherServices = [
  {
    title: "Birthday Decoration",
    subtitle: "Celebrate in style with custom themes and balloon artistry",
    image: "/birthdaykids.png",
    tag: "Fun & Kids",
  },
  {
    title: "Corporate Events",
    subtitle: "Professional, elegant setups for conferences and galas",
    image: "/coprateoffice.png",
    tag: "Business",
  },
  {
    title: "Home Decoration",
    subtitle: "Beautiful spaces and festive makeovers with better vibes",
    image: "/homedecoration.png",
    tag: "Cozy Vibe",
  },
];

export default function Services() {
  return (
    <section className="relative bg-gradient-to-b from-[#FAF7F2] via-[#FDF5F2] to-[#F9EBEA] py-28 px-6 md:px-16 text-[#241C15] overflow-hidden border-t border-red-200/40">
      
      {/* Soft Luxury Red & Golden Background Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-red-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-300/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          
          {/* Left: heading & Expanded Content */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-red-100/80 border border-red-300/60 px-3.5 py-1 rounded-full text-xs font-bold text-red-950 shadow-sm">
              <Sparkles size={13} className="text-red-700" />
              <span>OUR SIGNATURE SERVICES</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-serif font-normal leading-[1.15] text-[#241C15]">
              Decor for every
              <br />
              <span className="italic font-light text-red-900">occasion, beautifully done</span>
            </h2>

            <div className="space-y-4 text-[#5A5248] text-sm md:text-base leading-relaxed font-medium">
              <p>
                We specialize in curating breathtaking, custom-tailored environments for all of life's most precious celebrations — seamlessly blending artistic vision with flawless execution.
              </p>
              <p className="text-xs md:text-sm text-neutral-600">
                From grand destination weddings and luxury anniversary celebrations to intimate home gatherings and vibrant festive setups, we transform ordinary spaces into timeless visual poetry.
              </p>

              {/* Extra bullet points added to increase length and detail */}
              <div className="pt-2 space-y-2.5 border-t border-red-900/10">
                <div className="flex items-start space-x-2.5 text-xs text-neutral-700">
                  <CheckCircle2 size={16} className="text-red-800 shrink-0 mt-0.5" />
                  <span>100% Customized themes tailored to your unique preferences & budget.</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs text-neutral-700">
                  <CheckCircle2 size={16} className="text-red-800 shrink-0 mt-0.5" />
                  <span>Premium fresh floral arrangements, luxury drapery & lighting effects.</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs text-neutral-700">
                  <CheckCircle2 size={16} className="text-red-800 shrink-0 mt-0.5" />
                  <span>End-to-end on-site setup and professional event styling execution.</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a 
                href="/services" 
                className="group inline-flex items-center space-x-3 bg-red-950 text-white px-7 py-4 rounded-full font-medium text-sm hover:bg-red-900 transition-all shadow-lg hover:shadow-xl"
              >
                <span>Explore all collections</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right: featured service + list */}
          <div className="lg:col-span-8 space-y-8">

            {/* Featured — the flagship service */}
            <a href="#" className="group relative block h-80 md:h-[420px] rounded-3xl overflow-hidden shadow-xl border border-red-200/50">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-8 sm:p-10">
                <span className="inline-block w-max bg-amber-300/20 backdrop-blur-md border border-amber-300/40 text-amber-200 text-xs px-3 py-1 rounded-full mb-3 tracking-wide">
                  {featured.tag}
                </span>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-serif text-white">{featured.title}</h3>
                    <p className="text-white/80 text-sm mt-1 font-light max-w-md">{featured.subtitle}</p>
                  </div>
                  <span className="shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-amber-200 group-hover:text-[#241C15] group-hover:border-amber-200 transition-all shadow-md">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </div>
            </a>

            {/* The rest — rich card rows with glassmorphism */}
            <div className="space-y-4">
              {otherServices.map((service, index) => (
                <a
                  href="#"
                  key={index}
                  className="group flex items-center gap-5 p-4 sm:p-5 rounded-2xl bg-white/80 hover:bg-white border border-red-200/50 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="shrink-0 w-24 h-20 sm:w-28 sm:h-22 rounded-xl overflow-hidden bg-red-50 border border-red-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-red-800 mb-1 block">
                      {service.tag}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif text-[#241C15] group-hover:text-red-900 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A5248] font-light mt-0.5 line-clamp-1">{service.subtitle}</p>
                  </div>

                  <span className="shrink-0 w-10 h-10 rounded-full border border-red-900/15 flex items-center justify-center text-[#241C15] group-hover:bg-red-950 group-hover:text-white group-hover:border-red-950 transition-all">
                    <ArrowUpRight size={16} />
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