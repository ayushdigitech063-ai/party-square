"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, LogIn, LoaderCircle, PartyPopper, Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

import { API_URL } from "@/config";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields!", {
        style: { background: "#1a1a1a", color: "#fff", border: "1px solid #F5C542" },
        iconTheme: { primary: "#ef4444", secondary: "#fff" },
      });
      return;
    }

    setIsLoading(true);
    toast.loading("Authenticating...", { id: "login-toast", style: { background: "#1a1a1a", color: "#fff" } });

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.dismiss("login-toast");
        await Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: data.message || "Invalid email or password",
          background: "#1a1a1a",
          color: "#fff",
          confirmButtonColor: "#F5C542",
          confirmButtonText: "Try Again",
          customClass: { popup: "rounded-3xl border border-amber-500/30" },
        });
        return;
      }

      if (data.role !== "superadmin" && data.role !== "admin") {
        toast.dismiss("login-toast");
        await Swal.fire({
          icon: "warning",
          title: "Access Denied!",
          text: "You don't have admin privileges.",
          background: "#1a1a1a",
          color: "#fff",
          confirmButtonColor: "#F5C542",
          customClass: { popup: "rounded-3xl border border-amber-500/30" },
        });
        return;
      }

      // Success
      login(data);
      toast.dismiss("login-toast");
      toast.success("Welcome back, Super Admin! 🎉", {
        duration: 2000,
        style: { background: "#1a1a1a", color: "#fff", border: "1px solid #22c55e" },
        iconTheme: { primary: "#22c55e", secondary: "#fff" },
      });

      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${data.name}!`,
        background: "#1a1a1a",
        color: "#fff",
        confirmButtonColor: "#F5C542",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        customClass: { popup: "rounded-3xl border border-amber-500/30" },
      });

      router.push("/admin");
    } catch {
      toast.dismiss("login-toast");
      await Swal.fire({
        icon: "error",
        title: "Connection Error!",
        text: "Unable to connect to server. Please try again later.",
        background: "#1a1a1a",
        color: "#fff",
        confirmButtonColor: "#F5C542",
        customClass: { popup: "rounded-3xl border border-amber-500/30" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen relative flex items-center justify-center px-4 py-10 overflow-hidden">

        {/* ========= PARTY BG IMAGE ========= */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/party1.png')" }}
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

        {/* Floating decorative particles */}
        <div className="absolute top-10 left-10 text-5xl opacity-20 animate-bounce">🎈</div>
        <div className="absolute top-20 right-16 text-4xl opacity-15 animate-pulse">🎊</div>
        <div className="absolute bottom-20 left-20 text-4xl opacity-20 animate-bounce" style={{ animationDelay: "0.5s" }}>✨</div>
        <div className="absolute bottom-10 right-10 text-5xl opacity-15 animate-pulse" style={{ animationDelay: "1s" }}>🎉</div>
        <div className="absolute top-1/2 left-5 text-3xl opacity-10 animate-bounce" style={{ animationDelay: "0.3s" }}>🪅</div>

        {/* ========= LOGIN CARD ========= */}
        <div className="relative z-10 w-full max-w-[440px]">

          {/* Glassmorphism card */}
          <div className="rounded-[32px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.4)] overflow-hidden">

            {/* Top gold accent strip */}
            <div className="h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />

            <div className="px-8 pt-8 pb-10 sm:px-10">

              {/* Logo */}
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="bg-white rounded-2xl p-3 shadow-xl mb-3 border border-amber-400/40 inline-block">
                  <img src="/logo.png" alt="Party Square Logo" className="h-12 w-auto object-contain" />
                </div>
                <div className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 px-3.5 py-1 rounded-full">
                  <Sparkles size={12} className="text-amber-300" />
                  <span className="text-[10px] uppercase tracking-[2px] text-amber-300 font-bold">Super Admin Portal</span>
                </div>
                <p className="text-neutral-300 text-sm mt-2.5 font-light">
                  Sign in to manage Party Square celebrations
                </p>
              </div>

              {/* ========= AUTO FILL BUTTON ========= */}
              <button
                type="button"
                onClick={() => {
                  setEmail("superadmin@partysquare.com");
                  setPassword("SuperAdmin@123");
                  toast.success("Credentials auto-filled! 🚀", {
                    duration: 1500,
                    style: { background: "#1a1a1a", color: "#fff", border: "1px solid #F5C542" },
                    iconTheme: { primary: "#F5C542", secondary: "#1a1a1a" },
                  });
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-amber-400/40 bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-wider hover:bg-amber-500/20 hover:border-amber-400/60 transition-all duration-200"
              >
                <Sparkles size={14} />
                Auto Fill Admin Credentials
              </button>

              {/* ========= FORM ========= */}
              <form onSubmit={handleLogin} className="space-y-5">

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-amber-200/80 block">
                    Email Address
                  </label>
                  <div className="flex items-center h-[52px] rounded-xl border border-white/15 bg-white/5 transition focus-within:border-amber-400/50 focus-within:ring-2 focus-within:ring-amber-400/15 overflow-hidden">
                    <div className="flex items-center justify-center w-12 h-full border-r border-white/10">
                      <Mail size={16} className="text-amber-400/70" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@partysquare.com"
                      className="w-full h-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-neutral-500"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-amber-200/80 block">
                    Password
                  </label>
                  <div className="flex items-center h-[52px] rounded-xl border border-white/15 bg-white/5 transition focus-within:border-amber-400/50 focus-within:ring-2 focus-within:ring-amber-400/15 overflow-hidden">
                    <div className="flex items-center justify-center w-12 h-full border-r border-white/10">
                      <Lock size={16} className="text-amber-400/70" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full h-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-neutral-500"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="flex items-center justify-center w-12 h-full text-neutral-400 hover:text-amber-300 transition"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full h-[52px] rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(245,197,66,0.25)] transition-all duration-200 hover:shadow-[0_12px_35px_rgba(245,197,66,0.35)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <LoaderCircle size={20} className="animate-spin" />
                  ) : (
                    <>
                      <LogIn size={18} />
                      Sign In to Dashboard
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Authorized Access Only</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Footer note */}
              <div className="text-center space-y-2">
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  🔒 This portal is restricted to authorized administrators only.
                  Unauthorized access attempts will be logged.
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="text-[11px] text-amber-400 hover:text-amber-300 hover:underline transition font-semibold"
                >
                  ← Back to Website
                </button>
              </div>

            </div>
          </div>

          {/* Bottom branding */}
          <p className="text-center text-[10px] text-neutral-500 mt-5 tracking-wider">
            © 2026 Party Square Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
