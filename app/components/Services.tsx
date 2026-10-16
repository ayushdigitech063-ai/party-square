"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import { fetchHomePageSection } from "../lib/api";

interface ServiceCard {
  id?: number | string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  link?: string;
}

interface ServicesData {
  badge?: string;
  description?: string;
  flagship: ServiceCard;
  otherServices: ServiceCard[];
  guarantees: string[];
}

const DEFAULT_DATA: ServicesData = {
  badge: "OUR SIGNATURE SERVICES",
  description:
    "We specialize in curating breathtaking, custom-tailored environments for all of life's most precious celebrations — seamlessly blending artistic vision with flawless execution.",
  flagship: {
    title: "Wedding Decoration",
    subtitle: "Make your big day magical with royal mandaps & floral setups",
    image: "/wedding.png",
    tag: "Royal Look & Grand Stages",
    link: "/services",
  },
  otherServices: [
    {
      id: 1,
      title: "Birthday Decoration",
      subtitle: "Celebrate in style with custom themes and balloon artistry",
      image: "/birthdaykids.png",
      tag: "Fun & Kids",
      link: "/services/birthday",
    },
    {
      id: 2,
      title: "Corporate Events",
      subtitle: "Professional, elegant setups for conferences and galas",
      image: "/coprateoffice.png",
      tag: "Business",
      link: "/services",
    },
    {
      id: 3,
      title: "Home Decoration",
      subtitle: "Beautiful spaces and festive makeovers with better vibes",
      image: "/homedecoration.png",
      tag: "Cozy Vibe",
      link: "/services/wall-decoration",
    },
  ],
  guarantees: [
    "100% Customized themes tailored to your unique preferences & budget.",
    "Premium fresh floral arrangements, luxury drapery & lighting effects.",
    "End-to-end on-site setup and professional event styling execution.",
  ],
};

export default function Services() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [subtitle, setSubtitle] = useState("Decor for every occasion, beautifully done");
  const [data, setData] = useState<ServicesData>(DEFAULT_DATA);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const sec = await fetchHomePageSection<ServicesData>("services");
        if (isMounted && sec) {
          if (typeof sec.isEnabled === "boolean") {
            setIsEnabled(sec.isEnabled);
          }
          if (sec.subtitle) setSubtitle(sec.subtitle);
          if (sec.contentData) {
            setData((prev) => ({ ...prev, ...sec.contentData }));
          }
        }
      } catch (e) {
        // Fallback default retained
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!isEnabled) {
    return null;
  }

  const { badge, description, flagship, otherServices, guarantees } = data;

  return (
    <section className="relative bg-[#FCFBF7] py-14 sm:py-20 md:py-28 px-4 sm:px-6 md:px-16 text-[#202522] overflow-hidden border-t border-[#E8E8E3]/80">
      
      {/* Soft Luxury Background Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#8CBC67]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D7A84B]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left: heading & Expanded Content */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4 sm:space-y-6">
            {badge && (
              <div className="inline-flex items-center space-x-2 bg-[#EEF6EB] border border-[#8CBC67]/40 px-3.5 py-1 rounded-full text-xs font-bold text-[#202522] shadow-sm">
                <Sparkles size={13} className="text-[#8CBC67]" />
                <span>{badge}</span>
              </div>
            )}

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold leading-[1.15] text-[#202522]">
              {subtitle}
            </h2>

            <div className="space-y-4 text-[#6B706C] text-sm md:text-base leading-relaxed font-normal">
              <p>
                {description || DEFAULT_DATA.description}
              </p>

              {/* Guarantees Checklist */}
              {guarantees && guarantees.length > 0 && (
                <div className="pt-2 space-y-2.5 border-t border-[#E8E8E3]">
                  {guarantees.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-[#202522]">
                      <CheckCircle2 size={16} className="text-[#8CBC67] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2">
              <Link 
                href="/services" 
                className="group inline-flex items-center space-x-3 bg-[#8CBC67] text-white px-7 py-4 rounded-full font-semibold text-sm hover:bg-[#7AB055] transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Explore all collections</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right: featured service + list */}
          <div className="lg:col-span-8 space-y-8">

            {/* Featured — the flagship service */}
            {flagship && (
              <Link
                href={flagship.link || "/services"}
                className="group relative block h-80 md:h-[420px] rounded-3xl overflow-hidden shadow-xl border border-[#E8E8E3] hover:border-[#8CBC67] transition-all"
              >
                <img
                  src={flagship.image || "/wedding.png"}
                  alt={flagship.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-8 sm:p-10">
                  {flagship.tag && (
                    <span className="inline-block w-max bg-[#D7A84B]/20 backdrop-blur-md border border-[#8CBC67]/40 text-[#D7A84B] text-xs px-3 py-1 rounded-full mb-3 tracking-wide">
                      {flagship.tag}
                    </span>
                  )}
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-serif text-white">{flagship.title}</h3>
                      <p className="text-white/80 text-sm mt-1 font-light max-w-md">{flagship.subtitle}</p>
                    </div>
                    <span className="shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#8CBC67] group-hover:text-white group-hover:border-[#8CBC67] transition-all shadow-md">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Other Services Tiles */}
            <div className="space-y-4">
              {otherServices?.map((service, index) => (
                <Link
                  href={service.link || "/services"}
                  key={service.id || index}
                  className="group flex items-center gap-5 p-4 sm:p-5 rounded-2xl bg-white hover:bg-white border border-[#E8E8E3] hover:border-[#8CBC67] shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="shrink-0 w-24 h-20 sm:w-28 sm:h-22 rounded-xl overflow-hidden bg-[#EEF6EB] border border-[#E8E8E3]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8CBC67] mb-1 block">
                      {service.tag}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif text-[#202522] group-hover:text-[#8CBC67] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B706C] font-light mt-0.5 line-clamp-1">{service.subtitle}</p>
                  </div>

                  <span className="shrink-0 w-10 h-10 rounded-full border border-[#E8E8E3] bg-[#EEF6EB] flex items-center justify-center text-[#202522] group-hover:bg-[#8CBC67] group-hover:text-white group-hover:border-[#8CBC67] transition-all">
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}