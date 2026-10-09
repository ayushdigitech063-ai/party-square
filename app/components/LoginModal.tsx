"use client";

import React, { useState } from "react";
import {
  X,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  LoaderCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
}: LoginModalProps) {
  const [view, setView] = useState<"login" | "register">("login");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  if (!isOpen) return null;

  const handleClose = () => {
    setMobile("");
    setOtp("");
    setName("");
    setEmail("");
    setView("login");
    setStep("phone");
    setErrorMsg("");
    onClose();
  };

  const handleGetOtp = async () => {
    if (mobile.length !== 10) return;
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: mobile }),
      });
      const data = await res.json();

      if (res.ok) {
        setStep("otp");
      } else {
        if (data.message === "User not found. Please register.") {
           setErrorMsg(data.message);
           setTimeout(() => {
             setView("register");
             setErrorMsg("");
           }, 1500);
        } else {
           setErrorMsg(data.message || "Failed to send OTP");
        }
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: mobile, otp }),
      });
      const data = await res.json();

      if (res.ok) {
        document.cookie = `token=${data.token}; path=/; max-age=2592000;`;
        document.cookie = `user=${encodeURIComponent(JSON.stringify(data.user))}; path=/; max-age=2592000;`;
        alert("Login successful! Welcome " + data.user.name);
        router.push("/profile");
        handleClose();
      } else {
        setErrorMsg(data.message || "Invalid OTP");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!name || !email || mobile.length !== 10) return;
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: mobile }),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Registration successful! Please login.");
        setView("login");
        setStep("phone");
      } else {
        setErrorMsg(data.message || "Failed to register");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">

      {/* ================= BACKDROP ================= */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
      />

      {/* ================= LOGIN MODAL ================= */}
      <div className="relative z-10 w-full max-w-[430px] overflow-hidden rounded-[26px] bg-[#FFFDF9] shadow-[0_25px_80px_rgba(50,35,20,0.25)] border border-[#E9D7AE]">

        {/* Decorative top glow */}
        <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-[#F5C542]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-[#D99A00]/10 blur-3xl pointer-events-none" />

        {/* ================= HEADER ================= */}
        <div className="relative px-7 pt-7">
          <button
            onClick={handleClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F0E7] text-[#5C5147] transition hover:bg-[#EDE4D6] hover:text-black"
            aria-label="Close login"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF2C7] text-[#A66A00]">
              <Sparkles size={17} />
            </div>
            <div>
              <p className="font-serif text-xl font-bold text-[#302823]">
                Dream<span className="text-[#B47A00]">Deco</span>
              </p>
              <p className="text-[9px] uppercase tracking-[2px] text-[#9A8B7B]">
                Celebration Studio
              </p>
            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="relative px-7 pb-7 pt-8">

          {/* Heading */}
          <div className="mb-6">
            <h2 className="font-serif text-[28px] font-bold leading-tight text-[#302823]">
              {view === "register" ? "Create an account" : step === "phone" ? "Log in to your account" : "Verify OTP"}
            </h2>
            <p className="mt-2 max-w-[320px] text-sm leading-5 text-[#756D66]">
              {view === "register" 
                ? "Join us to track your decor, book faster and unlock benefits." 
                : step === "phone" 
                  ? "Enter your mobile number to get started." 
                  : `Enter the OTP sent to +91 ${mobile}`}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-600 border border-red-100 flex items-center">
              {errorMsg}
            </div>
          )}

          {view === "login" && step === "phone" && (
            <>
              {/* ================= MOBILE INPUT ================= */}
              <div className="mb-3">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[1.5px] text-[#756D66]">
                  Mobile Number
                </label>
                <div className="flex h-[52px] overflow-hidden rounded-xl border border-[#DCCFAF] bg-white transition focus-within:border-[#D99A00] focus-within:ring-2 focus-within:ring-[#F5C542]/20">
                  <div className="flex items-center border-r border-[#E7DED1] px-4 text-sm font-semibold text-[#4D443D]">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    placeholder="10-digit mobile number"
                    className="w-full bg-transparent px-4 text-sm text-[#302823] outline-none placeholder:text-[#A69C92]"
                  />
                </div>
              </div>

              {/* ================= GET OTP BUTTON ================= */}
              <button
                onClick={handleGetOtp}
                disabled={mobile.length !== 10 || isLoading}
                className="group flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#F5C542] text-sm font-bold text-[#302823] shadow-[0_8px_20px_rgba(217,154,0,0.18)] transition-all duration-200 hover:bg-[#E8B52F] hover:shadow-[0_10px_25px_rgba(217,154,0,0.25)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <>
                    Get OTP
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </>
          )}

          {view === "login" && step === "otp" && (
            <>
              {/* ================= OTP INPUT ================= */}
              <div className="mb-3">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[1.5px] text-[#756D66]">
                  Enter OTP
                </label>
                <div className="flex h-[52px] overflow-hidden rounded-xl border border-[#DCCFAF] bg-white transition focus-within:border-[#D99A00] focus-within:ring-2 focus-within:ring-[#F5C542]/20">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="Enter 6-digit OTP (e.g. 123456)"
                    className="w-full bg-transparent px-4 text-sm text-[#302823] outline-none placeholder:text-[#A69C92]"
                  />
                </div>
              </div>

              {/* ================= VERIFY BUTTON ================= */}
              <button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6 || isLoading}
                className="group flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#F5C542] text-sm font-bold text-[#302823] shadow-[0_8px_20px_rgba(217,154,0,0.18)] transition-all duration-200 hover:bg-[#E8B52F] hover:shadow-[0_10px_25px_rgba(217,154,0,0.25)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <>
                    Verify OTP
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
              
              <button 
                onClick={() => { setStep("phone"); setOtp(""); }}
                className="mt-4 w-full text-center text-xs font-semibold text-[#A66A00] hover:underline"
              >
                Change mobile number
              </button>
            </>
          )}

          {view === "register" && (
            <>
              {/* ================= MOBILE INPUT FOR REGISTRATION ================= */}
              <div className="mb-3">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[1.5px] text-[#756D66]">
                  Mobile Number
                </label>
                <div className="flex h-[52px] overflow-hidden rounded-xl border border-[#DCCFAF] bg-white transition focus-within:border-[#D99A00] focus-within:ring-2 focus-within:ring-[#F5C542]/20">
                  <div className="flex items-center border-r border-[#E7DED1] px-4 text-sm font-semibold text-[#4D443D]">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    placeholder="10-digit mobile number"
                    className="w-full bg-transparent px-4 text-sm text-[#302823] outline-none placeholder:text-[#A69C92]"
                  />
                </div>
              </div>

              {/* ================= REGISTER INPUT ================= */}
              <div className="mb-3">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[1.5px] text-[#756D66]">
                  Full Name
                </label>
                <div className="flex h-[52px] overflow-hidden rounded-xl border border-[#DCCFAF] bg-white transition focus-within:border-[#D99A00] focus-within:ring-2 focus-within:ring-[#F5C542]/20">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-transparent px-4 text-sm text-[#302823] outline-none placeholder:text-[#A69C92]"
                  />
                </div>
              </div>
              <div className="mb-5">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[1.5px] text-[#756D66]">
                  Email Address
                </label>
                <div className="flex h-[52px] overflow-hidden rounded-xl border border-[#DCCFAF] bg-white transition focus-within:border-[#D99A00] focus-within:ring-2 focus-within:ring-[#F5C542]/20">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-transparent px-4 text-sm text-[#302823] outline-none placeholder:text-[#A69C92]"
                  />
                </div>
              </div>

              {/* ================= REGISTER BUTTON ================= */}
              <button
                onClick={handleRegister}
                disabled={!name || !email || mobile.length !== 10 || isLoading}
                className="group flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#F5C542] text-sm font-bold text-[#302823] shadow-[0_8px_20px_rgba(217,154,0,0.18)] transition-all duration-200 hover:bg-[#E8B52F] hover:shadow-[0_10px_25px_rgba(217,154,0,0.25)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <>
                    Sign Up
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </>
          )}

          {/* ================= DIVIDER ================= */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E8DED2]" />
            <span className="text-[11px] font-medium text-[#9A9188]">
              or continue with
            </span>
            <div className="h-px flex-1 bg-[#E8DED2]" />
          </div>

          {/* ================= SOCIAL LOGIN ================= */}
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              className="flex h-[44px] items-center justify-center gap-2 rounded-xl border border-[#E5DDD4] bg-white text-xs font-semibold text-[#4B433C] transition hover:border-[#D6C29A] hover:bg-[#FFFCF6]"
            >
              <span className="font-bold text-[#4285F4]">G</span>
              <span className="hidden sm:inline">Google</span>
            </button>
            <button
              type="button"
              className="flex h-[44px] items-center justify-center gap-2 rounded-xl border border-[#E5DDD4] bg-white text-xs font-semibold text-[#4B433C] transition hover:border-[#D6C29A] hover:bg-[#FFFCF6]"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1877F2] text-[10px] font-bold text-white">
                f
              </span>
              <span className="hidden sm:inline">Facebook</span>
            </button>
            <button
              type="button"
              className="flex h-[44px] items-center justify-center gap-2 rounded-xl border border-[#E5DDD4] bg-white text-xs font-semibold text-[#4B433C] transition hover:border-[#D6C29A] hover:bg-[#FFFCF6]"
            >
              <Mail size={15} className="text-[#A66A00]" />
              <span className="hidden sm:inline">Email</span>
            </button>
          </div>

          {/* ================= SWITCH VIEW ================= */}
          <div className="mt-6 text-center text-xs text-[#756D66]">
            {view === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setView("register");
                    setErrorMsg("");
                  }}
                  className="font-bold text-[#A66A00] hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setView("login");
                    setErrorMsg("");
                  }}
                  className="font-bold text-[#A66A00] hover:underline"
                >
                  Log in
                </button>
              </>
            )}
          </div>

          {/* ================= TERMS ================= */}
          <p className="mt-6 text-center text-[10px] leading-4 text-[#9A9188]">
            By continuing, you agree to our{" "}
            <button onClick={()=>{router.push('/terms-and-condition');handleClose()}} className="font-semibold text-[#A66A00] hover:underline">
              Terms
            </button>
            {" "} & {" "}
            <button onClick={()=>{router.push('/privacy-Policy');handleClose()}} className="font-semibold text-[#A66A00] hover:underline">
              Privacy Policy
            </button>
            .
          </p>

        </div>
      </div>
    </div>
  );
}