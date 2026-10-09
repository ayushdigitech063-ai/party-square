"use client";

import React, { useState } from "react";
import { apiRequest } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CalendarCheck,
  TrendingUp,
  LayoutGrid,
  AlertCircle,
} from "lucide-react";

const FEATURES = [
  {
    icon: CalendarCheck,
    title: "Bookings & customers",
    text: "Confirm, track and manage every event in one place.",
  },
  {
    icon: TrendingUp,
    title: "Revenue insights",
    text: "See what is trending and which themes earn the most.",
  },
  {
    icon: LayoutGrid,
    title: "Themes & gallery",
    text: "Update packages, prices and photos in a few clicks.",
  },
];

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next: { email?: string; password?: string } = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Enter a valid email address";
    if (!password) next.password = "Enter your password";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!validate()) return;

    setLoading(true);
    try {
      /*
       * Replace this with your real admin authentication
       * (your own API route, NextAuth signIn, Firebase, etc.).
       * Never check the password in the browser.
       */
      const res = await apiRequest("/super-admin/login", {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), password, remember }),
      });

      // apiRequest already returns parsed JSON data.
      if (!res.success || !res.token) {
        throw new Error(res.message || "Invalid email or password");
      }

      // Store the token for subsequent protected API requests.
      if (remember) {
        localStorage.setItem("token", res.token);
      } else {
        sessionStorage.setItem("token", res.token);
      }

      // Login succeeded; open the admin dashboard.
      router.push("/admin");
    } catch (err: any) {
      setFormError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full h-12 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition";

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#F3F0EA] font-sans">
      {/* =====================================================
          LEFT - BRAND PANEL (hidden on small screens)
      ====================================================== */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-neutral-950 via-stone-950 to-black text-white p-12">
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-amber-600/10 blur-3xl" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <Sparkles size={22} />
          </div>
          <div className="leading-tight">
            <p className="font-serif text-2xl font-bold text-amber-400">
              DreamDeco
            </p>
            <p className="text-[11px] tracking-[0.25em] uppercase text-neutral-400">
              Control Center
            </p>
          </div>
        </div>

        {/* Message */}
        <div className="relative max-w-md">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-amber-400">
            Super Admin Portal
          </p>
          <h2 className="mt-3 font-serif text-4xl xl:text-5xl font-bold leading-[1.15]">
            Manage every celebration,{" "}
            <span className="italic font-light text-amber-300">
              beautifully.
            </span>
          </h2>

          <ul className="mt-10 space-y-5">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-start gap-4">
                <span className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400">
                  <Icon size={18} />
                </span>
                <span>
                  <span className="block text-sm font-bold">{title}</span>
                  <span className="block text-sm text-neutral-400 mt-0.5">
                    {text}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-neutral-500">
          © {new Date().getFullYear()} DreamDeco. All rights reserved.
        </p>
      </aside>

      {/* =====================================================
          RIGHT - LOGIN FORM
      ====================================================== */}
      <main className="flex items-center justify-center px-4 sm:px-8 py-10">
        <div className="w-full max-w-[440px]">
          {/* Compact brand for mobile */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-stone-900 text-amber-400 flex items-center justify-center">
              <Sparkles size={20} />
            </div>
            <div className="leading-tight">
              <p className="font-serif text-xl font-bold text-neutral-900">
                DreamDeco
              </p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                Control Center
              </p>
            </div>
          </div>

          <div className="bg-white border border-amber-100 rounded-3xl shadow-xl p-7 sm:p-9">
            <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest">
              <ShieldCheck size={12} />
              Admin access
            </span>

            <h1 className="mt-4 font-serif text-3xl font-bold text-neutral-900">
              Welcome back
            </h1>
            <p className="mt-1.5 text-sm text-neutral-500">
              Sign in to manage bookings, themes and customers.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-1.5"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((p) => ({ ...p, email: undefined }));
                      setFormError("");
                    }}
                    placeholder="admin@dreamdeco.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? "admin-email-error" : undefined
                    }
                    className={`${inputBase} pl-10 pr-3 ${errors.email ? "border-rose-400" : "border-amber-200"}`}
                  />
                </div>
                {errors.email && (
                  <p
                    id="admin-email-error"
                    className="mt-1.5 text-xs text-rose-600"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="admin-password"
                    className="block text-[11px] font-bold uppercase tracking-widest text-neutral-500"
                  >
                    Password
                  </label>
                  <Link
                    href="/admin/forgot-password"
                    className="text-xs font-bold text-amber-700 hover:text-amber-900 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((p) => ({ ...p, password: undefined }));
                      setFormError("");
                    }}
                    onKeyUp={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                    onBlur={() => setCapsLock(false)}
                    placeholder="Enter your password"
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? "admin-password-error" : undefined
                    }
                    className={`${inputBase} pl-10 pr-11 ${errors.password ? "border-rose-400" : "border-amber-200"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-amber-800 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && (
                  <p
                    id="admin-password-error"
                    className="mt-1.5 text-xs text-rose-600"
                  >
                    {errors.password}
                  </p>
                )}
                {capsLock && (
                  <p className="mt-1.5 text-xs text-amber-700">
                    Caps Lock is on.
                  </p>
                )}
              </div>

              {/* Remember */}
              <label className="flex items-center gap-2.5 text-sm text-neutral-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-amber-300 accent-amber-600"
                />
                Keep me signed in on this device
              </label>

              {formError && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl bg-rose-50 border border-rose-100 px-3.5 py-2.5 text-xs text-rose-700"
                >
                  <AlertCircle size={15} className="shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-stone-900 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition cursor-pointer"
              >
                <span>{loading ? "Signing in..." : "Sign in"}</span>
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>

            <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-neutral-500">
              <ShieldCheck size={14} className="text-amber-700" />
              Authorized personnel only. Activity is logged.
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-neutral-500">
            <Link
              href="/"
              className="font-semibold text-amber-800 hover:underline"
            >
              ← Back to website
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
