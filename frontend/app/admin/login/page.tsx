"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Sparkles } from "lucide-react";
import Swal from "sweetalert2";

export default function SuperAdminLoginPage() {
  const [email, setEmail] = useState("superadmin@partysquare.com");
  const [password, setPassword] = useState("SuperAdmin@123");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      if (data.role !== "superadmin" && data.role !== "admin") {
        throw new Error("Access Denied: Super Admin privileges required.");
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data));

      // Top-right Toast Notification
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: "#171717",
        color: "#ffffff",
        customClass: {
          popup: "rounded-2xl border border-amber-500/30",
        },
      });

      Toast.fire({
        icon: "success",
        title: "Logged in successfully!",
      });

      // Automatic immediate redirect to Super Admin Dashboard
      router.push("/admin");
    } catch (err: any) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#171717",
        color: "#ffffff",
        customClass: {
          popup: "rounded-2xl border border-red-500/30",
        },
      });

      Toast.fire({
        icon: "error",
        title: err.message || "Unable to connect to backend server.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center p-4 selection:bg-amber-400 selection:text-neutral-950 font-sans bg-neutral-950 bg-[url('https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Dark Luxury Overlay */}
      <div className="absolute inset-0 bg-neutral-950/75 backdrop-blur-xs"></div>

      {/* Semi-Transparent Glassmorphism Form Card Container */}
      <div className="relative z-10 w-full max-w-[400px] bg-black/45 border border-amber-500/30 p-7 sm:p-8 rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.85)] space-y-6 backdrop-blur-2xl">
        
        {/* Company Logo & Branding */}
        <div className="text-center space-y-2.5">
          <div className="w-13 h-13 bg-amber-500/20 border border-amber-500/40 rounded-2xl mx-auto flex items-center justify-center text-2xl shadow-lg backdrop-blur-md">
            🌸
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-amber-400 drop-shadow-md">Party Square</h2>
            <span className="text-[11px] uppercase tracking-widest text-amber-300 font-extrabold block mt-0.5">Super Admin Portal</span>
          </div>
          <div className="pt-2 border-t border-white/10 mt-3">
            <h1 className="text-lg font-bold tracking-tight text-white">Welcome Back</h1>
            <p className="text-xs text-neutral-300 font-normal">Enter your credentials to access the Control Center</p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-amber-300/90 uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-neutral-400" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/15 focus:border-amber-400 rounded-xl pl-10 pr-3.5 py-3 text-xs text-white placeholder-neutral-500 outline-none transition-all font-medium backdrop-blur-md shadow-inner"
                placeholder="superadmin@partysquare.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-amber-300/90 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-neutral-400" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/15 focus:border-amber-400 rounded-xl pl-10 pr-3.5 py-3 text-xs text-white placeholder-neutral-500 outline-none transition-all font-medium backdrop-blur-md shadow-inner"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-extrabold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-500/25 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer mt-4"
          >
            <span>{loading ? "Authenticating..." : "Login to Control Center"}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="bg-black/60 border border-white/10 p-3.5 rounded-2xl space-y-1.5 text-[11px] backdrop-blur-md">
          <div className="flex items-center space-x-1.5 text-amber-400 font-extrabold uppercase tracking-wider text-[10px]">
            <Sparkles size={12} />
            <span>Default Super Admin Credentials</span>
          </div>
          <div className="space-y-0.5 text-neutral-300 font-mono text-[10px]">
            <p><strong className="text-amber-300">Email:</strong> superadmin@partysquare.com</p>
            <p><strong className="text-amber-300">Password:</strong> SuperAdmin@123</p>
          </div>
        </div>

      </div>

    </div>
  );
}
