"use client";

import React from "react";
import { Sparkles, ArrowRight, Camera, Globe, Share2, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FAF7F2] text-[#1A1A1A] border-t border-amber-200/60 pt-20 pb-10 px-6 md:px-16 relative overflow-hidden font-sans">
      
      {/* Soft Golden Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-300/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Newsletter / Call to Action Banner */}
        <div className="bg-gradient-to-r from-amber-100/60 to-amber-50 border border-amber-300/50 rounded-3xl p-8 md:p-12 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-amber-200/60 px-3 py-1 rounded-full text-xs font-semibold text-amber-900 mb-1">
              <Sparkles size={13} className="text-amber-800" />
              <span>STAY INSPIRED</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-normal text-gray-900">
              Ready to create magical moments together?
            </h3>
            <p className="text-gray-600 text-sm font-light">
              Subscribe to get exclusive decor themes, seasonal offers, and event design tips.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-white border border-amber-300/80 px-5 py-3.5 rounded-full text-sm text-gray-800 focus:outline-none focus:border-amber-600 w-full sm:w-80 shadow-inner"
            />
            <button className="bg-black hover:bg-amber-900 text-white px-7 py-3.5 rounded-full text-sm font-medium transition flex items-center justify-center space-x-2 shadow-md">
              <span>Subscribe</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-amber-200/60">
          
          {/* Brand Info (4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-2xl font-serif font-normal tracking-wide text-gray-900">
              Aesthetic <span className="italic font-light text-amber-800">Decor</span>
            </h2>
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              Transforming your special occasions into breathtaking visual poetry. From grand weddings to intimate celebrations, we design memories that last forever.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" aria-label="Social Camera Link" className="w-9 h-9 rounded-full bg-white border border-amber-200 flex items-center justify-center text-amber-900 hover:bg-amber-900 hover:text-white transition shadow-sm">
                <Camera size={16} />
              </a>
              <a href="#" aria-label="Website Link" className="w-9 h-9 rounded-full bg-white border border-amber-200 flex items-center justify-center text-amber-900 hover:bg-amber-900 hover:text-white transition shadow-sm">
                <Globe size={16} />
              </a>
              <a href="#" aria-label="Share Link" className="w-9 h-9 rounded-full bg-white border border-amber-200 flex items-center justify-center text-amber-900 hover:bg-amber-900 hover:text-white transition shadow-sm">
                <Share2 size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-900">Quick Links</h4>
            <ul className="space-y-2.5 text-sm font-light text-gray-600">
              <li><a href="#" className="hover:text-amber-900 transition">Home</a></li>
              <li><a href="#" className="hover:text-amber-900 transition">About Us</a></li>
              <li><a href="#" className="hover:text-amber-900 transition">Collections</a></li>
              <li><a href="#" className="hover:text-amber-900 transition">Gallery</a></li>
              <li><a href="#" className="hover:text-amber-900 transition">Contact</a></li>
            </ul>
          </div>

          {/* Categories (3 Columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-900">Decor Themes</h4>
            <ul className="space-y-2.5 text-sm font-light text-gray-600">
              <li><a href="#" className="hover:text-amber-900 transition">Wedding Mandaps & Stages</a></li>
              <li><a href="#" className="hover:text-amber-900 transition">Anniversary Candlelight</a></li>
              <li><a href="#" className="hover:text-amber-900 transition">Kids Birthday Parties</a></li>
              <li><a href="#" className="hover:text-amber-900 transition">Home Makeovers</a></li>
              <li><a href="#" className="hover:text-amber-900 transition">Festive & Housewarming</a></li>
            </ul>
          </div>

          {/* Contact Details (3 Columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-900">Get in Touch</h4>
            <ul className="space-y-3 text-sm font-light text-gray-600">
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-light gap-4">
          <p>© {new Date().getFullYear()} Aesthetic Decor. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-amber-900 transition">Privacy Policy</a>
            <a href="#" className="hover:text-amber-900 transition">Terms of Service</a>
            <a href="#" className="hover:text-amber-900 transition">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}