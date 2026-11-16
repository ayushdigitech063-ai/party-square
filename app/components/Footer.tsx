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
import toast from "react-hot-toast";


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
    <footer className="relative bg-[#EEF6EB]/90 text-[#202522] font-sans overflow-hidden border-t-2 border-[#8CBC67]/40 pt-12 sm:pt-20 pb-8 sm:pb-10 px-4 sm:px-6 md:px-16 backdrop-blur-[2px]">
      {/* Brand Green Ambient Overlay & Glows */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#EEF6EB] via-[#F4F9F2] to-[#EEF6EB] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8CBC67]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#8CBC67]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Newsletter / Call to Action Banner */}
        <div className="bg-gradient-to-r from-[#EEF6EB]/90 to-[#EEF6EB]/90 backdrop-blur-md border border-[#8CBC67]/90 rounded-3xl p-5 sm:p-8 md:p-12 mb-10 sm:mb-16 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 shadow-sm">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-[#EEF6EB] border border-[#8CBC67] px-3.5 py-1 rounded-full text-xs font-bold text-[#202522] mb-1 shadow-sm">
              <Sparkles size={13} className="text-[#202522]" />
              <span>STAY INSPIRED</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950">
              Ready to create magical moments together?
            </h3>
            <p className="text-[#202522] text-sm font-medium">
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
                className="bg-white/90 border border-[#8CBC67] px-5 py-3.5 rounded-full text-sm text-neutral-950 placeholder-neutral-500 focus:outline-none focus:border-amber-700 w-full shadow-inner font-medium backdrop-blur-sm"
              />

              {/* Error message directly below input */}
              {error && (
                <p className="text-[#D7A84B] text-sm mt-2 ml-4">{error}</p>
              )}
            </div>

            {/* Subscribe Button */}
            <button
              onClick={() => {
                if (!validateEmail()) {
                  toast.error(error || "Please enter a valid email address");
                  return;
                }
                toast.success("Subscribed successfully! Thank you.");
                setEmail("");
              }}
              className="bg-[#8CBC67] hover:bg-[#7AB055] text-white px-7 py-3.5 rounded-full text-sm font-bold transition flex items-center justify-center space-x-2 shadow-md h-fit cursor-pointer"
            >
              <span>Subscribe</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#8CBC67]/70">
          {/* Brand Info (4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-2xl font-serif font-bold tracking-wide text-neutral-950">
              Party{" "}
              <span className="italic font-normal text-[#8CBC67]">Square</span>
            </h2>
            <p className="text-[#202522] text-sm font-medium leading-relaxed">
              Transforming your special occasions into breathtaking visual
              poetry. From grand weddings to intimate celebrations, we design
              memories that last forever.
            </p>
            <div className="flex items-center flex-wrap gap-2.5 pt-2">
              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Follow us on Instagram"
                className="w-9 h-9 rounded-full bg-white/90 border border-[#8CBC67] flex items-center justify-center text-[#202522] hover:bg-[#8CBC67] hover:text-white hover:border-[#8CBC67] transition shadow-xs backdrop-blur-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Follow us on Facebook"
                className="w-9 h-9 rounded-full bg-white/90 border border-[#8CBC67] flex items-center justify-center text-[#202522] hover:bg-[#8CBC67] hover:text-white hover:border-[#8CBC67] transition shadow-xs backdrop-blur-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="Watch on YouTube"
                className="w-9 h-9 rounded-full bg-white/90 border border-[#8CBC67] flex items-center justify-center text-[#202522] hover:bg-[#8CBC67] hover:text-white hover:border-[#8CBC67] transition shadow-xs backdrop-blur-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://www.pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                title="Decor Inspiration on Pinterest"
                className="w-9 h-9 rounded-full bg-white/90 border border-[#8CBC67] flex items-center justify-center text-[#202522] hover:bg-[#8CBC67] hover:text-white hover:border-[#8CBC67] transition shadow-xs backdrop-blur-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.98-.12-2.5.02-3.58.14-.99.9-5.74.9-5.74s-.23-.46-.23-1.15c0-1.08.63-1.88 1.4-1.88.66 0 .98.5 1.4 1.1.84 0 1.63.78 1.63 2.14 0 1.9-1.21 4.75-1.84 7.39-.52 2.19 1.1 3.98 3.25 3.98 3.9 0 6.9-4.11 6.9-10.04 0-5.25-3.77-8.92-9.16-8.92-6.24 0-9.9 4.68-9.9 9.52 0 1.88.72 3.9 1.63 4.99.18.22.2.41.15.63-.05.23-.18.72-.23.94-.08.31-.25.37-.58.23-2.16-.99-3.51-4.11-3.51-6.62 0-5.39 3.92-10.34 11.3-10.34 5.93 0 10.54 4.23 10.54 9.88 0 5.89-3.71 10.63-8.87 10.63-1.73 0-3.36-.9-3.92-1.96l-1.07 4.07c-.39 1.48-1.44 3.34-2.15 4.49A11.98 11.98 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
                </svg>
              </a>

              {/* WhatsApp Direct Chat */}
              <a
                href="https://wa.me/919119119898?text=Hello%20Party%20Square,%20I%20want%20to%20enquire%20about%20event%20decoration"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="Chat with Us on WhatsApp"
                className="w-9 h-9 rounded-full bg-white/90 border border-[#8CBC67] flex items-center justify-center text-[#202522] hover:bg-[#8CBC67] hover:text-white hover:border-[#8CBC67] transition shadow-xs backdrop-blur-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.7.44 3.36 1.28 4.82L2 22l5.4-1.42a9.9 9.9 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm0 18.1h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.2.84.85-3.12-.2-.32a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.28-8.19 8.28zm4.52-6.19c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#202522]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-[#202522]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#8CBC67] hover:underline transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#8CBC67] hover:underline transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#8CBC67] hover:underline transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services/all-products"
                  className="hover:text-[#8CBC67] hover:underline transition"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation-and-refund"
                  className="hover:text-[#8CBC67] hover:underline transition"
                >
                  Cancellation & Refund
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories (3 Columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#202522]">
              Decor Themes
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-[#202522]">
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#202522] hover:underline transition"
                >
                  Wedding Mandaps & Stages
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ring-decoration"
                  className="hover:text-[#202522] hover:underline transition"
                >
                  Anniversary Candlelight
                </Link>
              </li>
              <li>
                <Link
                  href="/services/birthday"
                  className="hover:text-[#202522] hover:underline transition"
                >
                  Kids Birthday Parties
                </Link>
              </li>
              <li>
                <Link
                  href="/services/wall-decoration"
                  className="hover:text-[#202522] hover:underline transition"
                >
                  Home Makeovers
                </Link>
              </li>
              <li>
                <Link
                  href="/Festivals/ganeshchaturthi"
                  className="hover:text-[#202522] hover:underline transition"
                >
                  Festive & Housewarming
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details (3 Columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#202522]">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm font-semibold text-[#202522]">
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-[#202522] shrink-0 mt-1" />
                <span>Party Square Event Studio, Jaipur & Bangalore, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-[#202522] shrink-0" />
                <span>+91 91191 19898</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-[#202522] shrink-0" />
                <span>support@partysquare.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#202522] font-semibold gap-4">
          <p>
            © {new Date().getFullYear()} Party Square Events & Decorations. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/privacy-policy"
              className="hover:text-[#8CBC67] hover:underline transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-condition"
              className="hover:text-[#8CBC67] hover:underline transition"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/cancellation-and-refund"
              className="hover:text-[#8CBC67] hover:underline transition"
            >
              Payment, Cancellation & Refunds
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#8CBC67] hover:underline transition"
            >
              Contact Us
            </Link>
            <Link
              href="/cookie"
              className="hover:text-[#8CBC67] hover:underline transition"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

