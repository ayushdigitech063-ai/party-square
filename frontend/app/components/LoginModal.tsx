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
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  if (!isOpen) return null;

  const handleGetOtp = () => {
    if (mobile.length !== 10) return;

    setIsLoading(true);

    // Your OTP API logic will go here
    setTimeout(() => {
      setIsLoading(false);
      alert("Login successfully!");
      if(isOpen){
        onClose();
        setMobile("");
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">

      {/* ================= BACKDROP ================= */}

      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
      />

      {/* ================= LOGIN MODAL ================= */}

      <div className="relative z-10 w-full max-w-[430px] overflow-hidden rounded-[26px] bg-[#FFFDF9] shadow-[0_25px_80px_rgba(50,35,20,0.25)] border border-[#E9D7AE]">

        {/* Decorative top glow */}

        <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-[#F5C542]/20 blur-3xl pointer-events-none" />

        <div className="absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-[#D99A00]/10 blur-3xl pointer-events-none" />


        {/* ================= HEADER ================= */}

        <div className="relative px-7 pt-7">

          {/* Close Button */}

          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F0E7] text-[#5C5147] transition hover:bg-[#EDE4D6] hover:text-black"
            aria-label="Close login"
          >
            <X size={18} />
          </button>


          {/* Logo */}

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
              Log in or sign up
            </h2>

            <p className="mt-2 max-w-[320px] text-sm leading-5 text-[#756D66]">
              Track your decor, book faster and unlock
              exclusive member benefits.
            </p>

          </div>


          {/* ================= MOBILE INPUT ================= */}

          <div className="mb-3">

            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[1.5px] text-[#756D66]">
              Mobile Number
            </label>

            <div className="flex h-[52px] overflow-hidden rounded-xl border border-[#DCCFAF] bg-white transition focus-within:border-[#D99A00] focus-within:ring-2 focus-within:ring-[#F5C542]/20">

              {/* Country Code */}

              <div className="flex items-center border-r border-[#E7DED1] px-4 text-sm font-semibold text-[#4D443D]">
                +91
              </div>

              {/* Number */}

              <input
                type="tel"
                value={mobile}
                onChange={(e) =>
                  setMobile(
                    e.target.value.replace(/\D/g, "").slice(0, 10)
                  )
                }
                placeholder="10-digit mobile number"
                className="w-full bg-transparent px-4 text-sm text-[#302823] outline-none placeholder:text-[#A69C92]"
              />

            </div>

          </div>


          {/* ================= OTP BUTTON ================= */}

          <button
            onClick={handleGetOtp}
            disabled={mobile.length !== 10 || isLoading}
            className="group flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#F5C542] text-sm font-bold text-[#302823] shadow-[0_8px_20px_rgba(217,154,0,0.18)] transition-all duration-200 hover:bg-[#E8B52F] hover:shadow-[0_10px_25px_rgba(217,154,0,0.25)] disabled:cursor-not-allowed disabled:opacity-50"
          >

            {isLoading ? (
              <LoaderCircle  size={18}
               className="animate-spin"/>
            ) : (
              <>
                Login
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </>
            )}

          </button>


          {/* ================= DIVIDER ================= */}

          <div className="my-6 flex items-center gap-3">

            <div className="h-px flex-1 bg-[#E8DED2]" />

            <span className="text-[11px] font-medium text-[#9A9188]">
              or continue with
            </span>

            <div className="h-px flex-1 bg-[#E8DED2]" />

          </div>


          {/* ================= SOCIAL LOGIN ================= */}

          <div className="grid grid-cols-3 gap-2.5">

            {/* Google */}

            <button
              type="button"
              className="flex h-[44px] items-center justify-center gap-2 rounded-xl border border-[#E5DDD4] bg-white text-xs font-semibold text-[#4B433C] transition hover:border-[#D6C29A] hover:bg-[#FFFCF6]"
            >

              <span className="font-bold text-[#4285F4]">
                G
              </span>

              <span className="hidden sm:inline">
                Google
              </span>

            </button>


            {/* Facebook */}

            <button
              type="button"
              className="flex h-[44px] items-center justify-center gap-2 rounded-xl border border-[#E5DDD4] bg-white text-xs font-semibold text-[#4B433C] transition hover:border-[#D6C29A] hover:bg-[#FFFCF6]"
            >

              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1877F2] text-[10px] font-bold text-white">
                f
              </span>

              <span className="hidden sm:inline">
                Facebook
              </span>

            </button>


            {/* Email */}

            <button
              type="button"
              className="flex h-[44px] items-center justify-center gap-2 rounded-xl border border-[#E5DDD4] bg-white text-xs font-semibold text-[#4B433C] transition hover:border-[#D6C29A] hover:bg-[#FFFCF6]"
            >

              <Mail size={15} className="text-[#A66A00]" />

              <span className="hidden sm:inline">
                Email
              </span>

            </button>

          </div>


          {/* ================= TRUST MESSAGE ================= */}

          <div className="mt-6 flex items-center justify-center gap-2">

            <ShieldCheck
              size={14}
              className="text-[#A66A00]"
            />

            <p className="text-[10px] leading-4 text-[#958A80]">
              Your information is secure and protected.
            </p>

          </div>


          {/* ================= TERMS ================= */}

          <p className="mt-3 text-center text-[10px] leading-4 text-[#9A9188]">

            By continuing, you agree to our{" "}

            <button onClick={()=>{router.push('/terms-and-condition');onClose()}} className="font-semibold text-[#A66A00] hover:underline">
              Terms
            </button>

            {" "} & {" "}

            <button onClick={()=>{router.push('/privacy-Policy');onClose()}} className="font-semibold text-[#A66A00] hover:underline">
              Privacy Policy
            </button>

            .

          </p>

        </div>

      </div>
    </div>
  );
}