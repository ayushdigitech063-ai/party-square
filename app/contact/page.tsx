"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Sparkles, CheckCircle2, Clock, Calendar, HeartHandshake } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Wedding Decoration",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-neutral-900 font-sans pt-12 pb-24 px-6 md:px-16 relative overflow-hidden">
      
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-300/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-200/80 border border-amber-300 px-4 py-1.5 rounded-full text-xs font-bold text-amber-950 shadow-sm">
            <Sparkles size={13} className="text-amber-900" />
            <span>LET'S CREATE MAGICAL MOMENTS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-neutral-950 tracking-tight">
            Get in Touch with <span className="italic font-normal text-amber-800">Our Designers</span>
          </h1>
          <p className="text-neutral-700 text-base sm:text-lg font-medium leading-relaxed">
            Whether it’s a grand wedding, a royal reception, or an intimate celebration, we bring your vision to life with breathtaking floral and light designs.
          </p>
        </div>

        {/* Visual Banner Grid with Beautiful Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative h-64 rounded-3xl overflow-hidden group shadow-md border border-amber-300/60">
            <img 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" 
              alt="Wedding Setup" 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent flex flex-col justify-end p-6">
              <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">Grand Events</span>
              <h3 className="text-white font-serif text-xl font-bold">Royal Mandaps & Stages</h3>
            </div>
          </div>

          <div className="relative h-64 rounded-3xl overflow-hidden group shadow-md border border-amber-300/60">
            <img 
              src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80" 
              alt="Floral Walkway" 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent flex flex-col justify-end p-6">
              <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">Aisles & Entrances</span>
              <h3 className="text-white font-serif text-xl font-bold">Breathtaking Walkways</h3>
            </div>
          </div>

          <div className="relative h-64 rounded-3xl overflow-hidden group shadow-md border border-amber-300/60">
            <img 
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80" 
              alt="Celebration Setup" 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent flex flex-col justify-end p-6">
              <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">Personalized Decor</span>
              <h3 className="text-white font-serif text-xl font-bold">Intimate Celebrations</h3>
            </div>
          </div>
        </div>

        {/* Main Content: Form & Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Contact Info & Perks (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-amber-100/80 to-amber-50/80 backdrop-blur-md border border-amber-300/80 rounded-3xl p-8 shadow-sm space-y-8">
              <div>
                <h3 className="text-2xl font-serif font-bold text-neutral-950 mb-2">Let’s Talk Styling</h3>
                <p className="text-neutral-700 text-sm font-medium">
                  Connect directly with our senior event architects or visit our design studio in New Delhi.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-amber-300 flex items-center justify-center text-amber-800 shrink-0 shadow-sm">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 mb-1">Studio Address</h4>
                    <p className="text-sm font-medium text-neutral-800 leading-relaxed">
                      124 Luxury Avenue, Event Square, New Delhi, India 110001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-amber-300 flex items-center justify-center text-amber-800 shrink-0 shadow-sm">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 mb-1">Direct Line</h4>
                    <p className="text-sm font-medium text-neutral-800">
                      +91 98765 43210 / +91 91234 56789
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-amber-300 flex items-center justify-center text-amber-800 shrink-0 shadow-sm">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 mb-1">Email Inquiry</h4>
                    <p className="text-sm font-medium text-neutral-800">
                      support@aestheticdecor.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Perks Highlights */}
              <div className="pt-6 border-t border-amber-300/60 space-y-3">
                <div className="flex items-center space-x-3 text-sm font-semibold text-neutral-800">
                  <CheckCircle2 size={18} className="text-amber-800 shrink-0" />
                  <span>Free initial consultation & moodboard preview</span>
                </div>
                <div className="flex items-center space-x-3 text-sm font-semibold text-neutral-800">
                  <CheckCircle2 size={18} className="text-amber-800 shrink-0" />
                  <span>Customized themes tailored to your venue budget</span>
                </div>
                <div className="flex items-center space-x-3 text-sm font-semibold text-neutral-800">
                  <CheckCircle2 size={18} className="text-amber-800 shrink-0" />
                  <span>On-time professional setup guaranteed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Form (7 Columns) */}
          <div className="lg:col-span-7">
            <div className="bg-white/95 backdrop-blur-md border border-amber-300/80 rounded-3xl p-8 md:p-10 shadow-md">
              {submitted ? (
                <div className="text-center py-20 space-y-4">
                  <div className="w-20 h-20 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 size={42} />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-neutral-950">Thank You!</h3>
                  <p className="text-neutral-700 text-sm max-w-md mx-auto font-medium leading-relaxed">
                    Your inquiry has been successfully submitted. Our senior design specialist will review your request and get in touch with you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 bg-neutral-950 hover:bg-amber-800 text-white px-8 py-3.5 rounded-full text-sm font-bold transition shadow"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-neutral-950 mb-1">Book a Consultation</h3>
                    <p className="text-neutral-600 text-sm font-medium">Share your event details below to receive a custom proposal.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">Your Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Aarav Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-[#FAF7F2] border border-amber-300 px-4 py-3.5 rounded-xl text-sm text-neutral-950 focus:outline-none focus:border-amber-700 font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="aarav@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#FAF7F2] border border-amber-300 px-4 py-3.5 rounded-xl text-sm text-neutral-950 focus:outline-none focus:border-amber-700 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-[#FAF7F2] border border-amber-300 px-4 py-3.5 rounded-xl text-sm text-neutral-950 focus:outline-none focus:border-amber-700 font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">Event Theme / Category</label>
                      <select 
                        value={formData.eventType}
                        onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                        className="w-full bg-[#FAF7F2] border border-amber-300 px-4 py-3.5 rounded-xl text-sm text-neutral-950 focus:outline-none focus:border-amber-700 font-medium"
                      >
                        <option value="Wedding Decoration">Wedding Mandaps & Stages</option>
                        <option value="Anniversary Celebration">Anniversary Candlelight</option>
                        <option value="Kids Birthday Party">Kids Birthday Parties</option>
                        <option value="Home Makeover">Home Makeovers</option>
                        <option value="Festive & Housewarming">Festive & Housewarming</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">Event Vision & Requirements</label>
                    <textarea 
                      rows={4}
                      required
                      placeholder="Tell us about your event date, expected guest count, venue location, and color preferences..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-[#FAF7F2] border border-amber-300 px-4 py-3.5 rounded-xl text-sm text-neutral-950 focus:outline-none focus:border-amber-700 font-medium resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-neutral-950 hover:bg-amber-800 text-white py-4 rounded-xl text-sm font-bold transition flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <span>Submit Design Request</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}