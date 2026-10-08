"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Camera,
  Globe,
  Share2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";


export default function Footer() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    setError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <footer className="relative bg-[#FAF7F2]/65 text-neutral-900 font-sans overflow-hidden border-t border-amber-300 pt-20 pb-10 px-6 md:px-16 backdrop-blur-[2px]">
      {/* Background Image with balanced opacity so flowers are clearly visible */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-50"
        style={{ backgroundImage: "url('/footerbackgroundimage.png')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAF7F2]/75 via-[#FAF7F2]/60 to-[#FAF7F2]/80 pointer-events-none" />

      {/* Soft Golden Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-300/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Newsletter / Call to Action Banner */}
        <div className="bg-gradient-to-r from-amber-100/90 to-amber-50/90 backdrop-blur-md border border-amber-300/90 rounded-3xl p-8 md:p-12 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-amber-200/90 border border-amber-400 px-3.5 py-1 rounded-full text-xs font-bold text-amber-950 mb-1 shadow-sm">
              <Sparkles size={13} className="text-amber-900" />
              <span>STAY INSPIRED</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950">
              Ready to create magical moments together?
            </h3>
            <p className="text-neutral-800 text-sm font-medium">
              Subscribe to get exclusive decor themes, seasonal offers, and
              event design tips.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            {/* Input + Error */}
            <div className="w-full sm:w-80 flex flex-col">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  handleEmailChange(e);
                  validateEmail();
                }}
                placeholder="Enter your email address"
                className="bg-white/90 border border-amber-400 px-5 py-3.5 rounded-full text-sm text-neutral-950 placeholder-neutral-500 focus:outline-none focus:border-amber-700 w-full shadow-inner font-medium backdrop-blur-sm"
              />

              {/* Error message directly below input */}
              {error && (
                <p className="text-red-500 text-sm mt-2 ml-4">{error}</p>
              )}
            </div>

            {/* Subscribe Button */}
            <button
              onClick={() =>{validateEmail(); 
                alert(error ? "Please fix the errors before subscribing." : `Subscribed`);
                setEmail("");
              }}
              className="bg-neutral-950 hover:bg-amber-700 text-white px-7 py-3.5 rounded-full text-sm font-bold transition flex items-center justify-center space-x-2 shadow-md h-fit"
            >
              <span>Subscribe</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-amber-300/70">
          {/* Brand Info (4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-2xl font-serif font-bold tracking-wide text-neutral-950">
              Aesthetic{" "}
              <span className="italic font-normal text-amber-800">Decor</span>
            </h2>
            <p className="text-neutral-800 text-sm font-medium leading-relaxed">
              Transforming your special occasions into breathtaking visual
              poetry. From grand weddings to intimate celebrations, we design
              memories that last forever.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#"
                aria-label="Social Camera Link"
                className="w-9 h-9 rounded-full bg-white/80 border border-amber-300 flex items-center justify-center text-amber-950 hover:bg-neutral-950 hover:text-white transition shadow-sm backdrop-blur-sm"
              >
                <Camera size={16} />
              </a>
              <a
                href="#"
                aria-label="Website Link"
                className="w-9 h-9 rounded-full bg-white/80 border border-amber-300 flex items-center justify-center text-amber-950 hover:bg-neutral-950 hover:text-white transition shadow-sm backdrop-blur-sm"
              >
                <Globe size={16} />
              </a>
              <a
                href="#"
                aria-label="Share Link"
                className="w-9 h-9 rounded-full bg-white/80 border border-amber-300 flex items-center justify-center text-amber-950 hover:bg-neutral-950 hover:text-white transition shadow-sm backdrop-blur-sm"
              >
                <Share2 size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-neutral-800">
              <li>
                <Link
                  href="/"
                  className="hover:text-amber-800 hover:underline transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-amber-800 hover:underline transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-amber-800 hover:underline transition"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-amber-800 hover:underline transition"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-amber-800 hover:underline transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories (3 Columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950">
              Decor Themes
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-neutral-800">
              <li>
                <Link
                  href="/services"
                  className="hover:text-amber-800 hover:underline transition"
                >
                  Wedding Mandaps & Stages
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ring-decoration"
                  className="hover:text-amber-800 hover:underline transition"
                >
                  Anniversary Candlelight
                </Link>
              </li>
              <li>
                <Link
                  href="/services/birthday"
                  className="hover:text-amber-800 hover:underline transition"
                >
                  Kids Birthday Parties
                </Link>
              </li>
              <li>
                <Link
                  href="/services/wall-decoration"
                  className="hover:text-amber-800 hover:underline transition"
                >
                  Home Makeovers
                </Link>
              </li>
              <li>
                <Link
                  href="/Festivals/ganeshchaturthi"
                  className="hover:text-amber-800 hover:underline transition"
                >
                  Festive & Housewarming
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details (3 Columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm font-semibold text-neutral-800">
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-amber-800 shrink-0 mt-1" />
                <span>124 Luxury Avenue, Event Square, New Delhi, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-amber-800 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-amber-800 shrink-0" />
                <span>support@aestheticdecor.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-700 font-semibold gap-4">
          <p>
            © {new Date().getFullYear()} Aesthetic Decor. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy-Policy"
              className="hover:text-amber-950 hover:underline transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-condition"
              className="hover:text-amber-950 hover:underline transition"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookie"
              className="hover:text-amber-950 hover:underline transition"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
