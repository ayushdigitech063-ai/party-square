"use client";

import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import {
  X,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  LoaderCircle,
  Phone,
  User,
  CheckCircle2,
  Lock,
  Edit2,
  RotateCcw,
  Zap,
  AlertTriangle,
  UserCheck,
  UserPlus,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "@/config";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onSuccess,
}: LoginModalProps) {
  const { login } = useAuth();

  // Mode: "mobile_login" (existing account only) | "mobile_register" (new account only) | "email_login"
  const [authMode, setAuthMode] = useState<"mobile_login" | "mobile_register" | "email_login">("mobile_login");

  // Mobile OTP States
  const [mobileStep, setMobileStep] = useState<"phone" | "otp">("phone");
  const [mobile, setMobile] = useState("");
  const [fullName, setFullName] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [countdown, setCountdown] = useState(30);
  const [isCounting, setIsCounting] = useState(false);

  // Email form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Refs for 4 OTP inputs
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown effect for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCounting && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCounting(false);
    }
    return () => clearTimeout(timer);
  }, [isCounting, countdown]);

  // Focus first OTP input when transitioning to OTP step
  useEffect(() => {
    if (mobileStep === "otp") {
      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 100);
    }
  }, [mobileStep]);

  if (!isOpen) return null;

  // Reset inputs when switching modes
  const switchMode = (mode: "mobile_login" | "mobile_register" | "email_login") => {
    setAuthMode(mode);
    setMobileStep("phone");
    setErrorMessage("");
    setOtp(["", "", "", ""]);
  };

  // ============================================================
  // STEP 1: VALIDATE MOBILE & SEND OTP
  // ============================================================
  const handleCheckAndSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (mobile.length !== 10) {
      const msg = "Please enter a valid 10-digit mobile number";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    if (authMode === "mobile_register" && !fullName.trim()) {
      const msg = "Full Name is required for creating a new account";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);

    try {
      // 1. Check with backend whether mobile number exists in database
      const checkRes = await fetch(`${API_URL}/api/auth/check-mobile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: mobile }),
      });

      const checkData = await checkRes.json();

      // STRICT VALIDATION FOR LOGIN: Must already exist in database
      if (authMode === "mobile_login") {
        if (!checkData.exists) {
          const err = "Account not found! This mobile number is not registered. Please create an account.";
          setErrorMessage(err);
          toast.error(err, { duration: 4000 });
          setIsLoading(false);
          return;
        }

        // If exists, proceed to OTP step
        setMobileStep("otp");
        setCountdown(30);
        setIsCounting(true);
        toast.success(`Welcome back ${checkData.name ? checkData.name : ""}! OTP sent. (Test OTP: 1234)`, {
          duration: 4000,
        });
      }

      // STRICT VALIDATION FOR REGISTER: Must NOT already exist in database
      if (authMode === "mobile_register") {
        if (checkData.exists) {
          const err = "Mobile number is already registered! Please switch to Login directly.";
          setErrorMessage(err);
          toast.error(err, { duration: 4000 });
          setIsLoading(false);
          return;
        }

        // If does not exist, proceed to OTP verification
        setMobileStep("otp");
        setCountdown(30);
        setIsCounting(true);
        toast.success("Mobile number verified! OTP sent. (Test OTP: 1234)", {
          duration: 4000,
        });
      }
    } catch (err: any) {
      const errTxt = err.message || "Failed to verify mobile number. Please check connection.";
      setErrorMessage(errTxt);
      toast.error(errTxt);
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================
  // STEP 2: OTP INPUT HANDLING
  // ============================================================
  const handleOtpDigitChange = (index: number, value: string) => {
    const cleanVal = value.replace(/\D/g, "");
    if (!cleanVal && value !== "") return;

    const newOtp = [...otp];
    if (cleanVal.length > 1) {
      // Paste full 4 digits
      const pastedDigits = cleanVal.slice(0, 4).split("");
      for (let i = 0; i < 4; i++) {
        newOtp[i] = pastedDigits[i] || "";
      }
      setOtp(newOtp);
      const nextIndex = Math.min(pastedDigits.length, 3);
      otpInputsRef.current[nextIndex]?.focus();
      return;
    }

    newOtp[index] = cleanVal;
    setOtp(newOtp);

    // Auto-focus next box
    if (cleanVal && index < 3) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // 1-Click Auto Fill Demo OTP
  const handleAutoFillOtp = () => {
    setOtp(["1", "2", "3", "4"]);
    setErrorMessage("");
    toast.success("Test OTP 1234 applied!");
    setTimeout(() => {
      otpInputsRef.current[3]?.focus();
    }, 50);
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (isCounting) return;
    setOtp(["", "", "", ""]);
    setCountdown(30);
    setIsCounting(true);
    toast.success("New OTP sent! (Test OTP: 1234)");
  };

  // ============================================================
  // STEP 3: VERIFY OTP & EXECUTE STRICT LOGIN / REGISTER
  // ============================================================
  const handleVerifyOtpAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      const err = "Please enter complete 4-digit OTP";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      if (authMode === "mobile_login") {
        // STRICT LOGIN ENDPOINT
        const res = await fetch(`${API_URL}/api/auth/mobile-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: mobile,
            otp: enteredOtp,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Login failed");
        }

        login(data);
        toast.success(`Welcome back, ${data.name || "Customer"}! Logged in successfully.`);
        setTimeout(() => {
          onClose();
          if (onSuccess) onSuccess();
        }, 500);
      } else if (authMode === "mobile_register") {
        // STRICT REGISTER ENDPOINT
        const res = await fetch(`${API_URL}/api/auth/mobile-register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: mobile,
            name: fullName.trim(),
            email: email.trim() || undefined,
            otp: enteredOtp,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Registration failed");
        }

        login(data);
        toast.success(`Account created successfully! Welcome ${data.name}.`);
        setTimeout(() => {
          onClose();
          if (onSuccess) onSuccess();
        }, 500);
      }
    } catch (err: any) {
      const msg = err.message || "Verification failed. Please try again.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================
  // EMAIL / PASSWORD LOGIN
  // ============================================================
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      const err = "Please enter both email and password";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      login(data);
      toast.success("Logged in successfully!");
      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
      }, 500);
    } catch (err: any) {
      const msg = err.message || "Invalid email or password";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* ================= BACKDROP ================= */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
      />

      {/* ================= MODAL CARD ================= */}
      <div className="relative z-10 w-full max-w-[440px] overflow-hidden rounded-[28px] bg-[#FFFDF9] shadow-[0_25px_80px_rgba(50,35,20,0.3)] border border-[#E9D7AE]">
        {/* Soft Background Warm Glow */}
        <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-[#F5C542]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-[#D99A00]/15 blur-3xl pointer-events-none" />

        {/* ================= HEADER ================= */}
        <div className="relative px-7 pt-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white border border-[#F5C542]/70 shadow-xs p-1 shrink-0 overflow-hidden">
              <img src="/favicon.webp" alt="Party Square" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="font-serif text-xl font-bold text-[#302823]">
                Party<span className="text-[#B47A00]">Square</span>
              </p>
              <p className="text-[9px] uppercase tracking-[1.8px] text-[#9A8B7B] font-semibold">
                Celebration &amp; Decor Studio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F0E7] text-[#5C5147] transition hover:bg-[#EDE4D6] hover:text-black cursor-pointer"
            aria-label="Close login"
          >
            <X size={18} />
          </button>
        </div>

        {/* ================= PRIMARY NAVIGATION TABS ================= */}
        <div className="px-7 pt-5">
          <div className="grid grid-cols-3 rounded-xl bg-amber-100/60 p-1 border border-amber-200/60 text-xs font-semibold">
            <button
              type="button"
              onClick={() => switchMode("mobile_login")}
              className={`py-2 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                authMode === "mobile_login"
                  ? "bg-white text-neutral-900 shadow-xs font-bold"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <UserCheck size={14} className={authMode === "mobile_login" ? "text-amber-600" : ""} />
              <span>Login</span>
            </button>

            <button
              type="button"
              onClick={() => switchMode("mobile_register")}
              className={`py-2 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                authMode === "mobile_register"
                  ? "bg-white text-neutral-900 shadow-xs font-bold"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <UserPlus size={14} className={authMode === "mobile_register" ? "text-amber-600" : ""} />
              <span>Register</span>
            </button>

            <button
              type="button"
              onClick={() => switchMode("email_login")}
              className={`py-2 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                authMode === "email_login"
                  ? "bg-white text-neutral-900 shadow-xs font-bold"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Lock size={13} className={authMode === "email_login" ? "text-amber-600" : ""} />
              <span>Email</span>
            </button>
          </div>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mx-7 mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-in fade-in">
            <AlertTriangle size={16} className="text-rose-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* ================= FORM BODY ================= */}
        <div className="px-7 pb-7 pt-4">
          
          {/* ============================================================
              TAB 1: STRICT MOBILE LOGIN (ONLY FOR REGISTERED NUMBERS)
          ============================================================ */}
          {authMode === "mobile_login" && (
            <div>
              {mobileStep === "phone" ? (
                <form onSubmit={handleCheckAndSendOtp} className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-serif text-2xl font-bold leading-tight text-[#302823]">
                        Welcome Back!
                      </h2>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Login
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-4 text-[#756D66]">
                      Enter your registered 10-digit mobile number to verify and log in.
                    </p>
                  </div>

                  {/* Registered Mobile Input */}
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[1.5px] text-[#756D66]">
                      Registered Mobile Number *
                    </label>
                    <div className="flex h-12 overflow-hidden rounded-xl border border-[#DCCFAF] bg-white transition focus-within:border-[#D99A00] focus-within:ring-2 focus-within:ring-[#F5C542]/20">
                      <div className="flex items-center border-r border-[#E7DED1] px-3.5 text-xs font-semibold text-[#4D443D] bg-neutral-50/50">
                        +91
                      </div>
                      <input
                        type="tel"
                        required
                        autoFocus
                        value={mobile}
                        onChange={(e) =>
                          setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                        }
                        placeholder="10-digit registered number"
                        className="w-full bg-transparent px-3 text-sm text-[#302823] outline-none placeholder:text-[#A69C92]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={mobile.length !== 10 || isLoading}
                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F5C542] to-[#E5A81A] text-sm font-bold text-[#302823] shadow-md shadow-amber-500/20 transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <LoaderCircle size={18} className="animate-spin" />
                    ) : (
                      <>
                        <span>Get Login OTP</span>
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>

                  <div className="text-center pt-1 text-xs text-neutral-600">
                    Don&apos;t have an account yet?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("mobile_register")}
                      className="font-bold text-amber-700 hover:underline cursor-pointer"
                    >
                      Register Now
                    </button>
                  </div>
                </form>
              ) : (
                /* OTP Screen for Login */
                <form onSubmit={handleVerifyOtpAndSubmit} className="space-y-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold leading-tight text-[#302823]">
                      Verify Login OTP
                    </h2>
                    <div className="mt-1 flex items-center justify-between text-xs text-[#756D66]">
                      <span>
                        Sent 4-digit code to <strong>+91 {mobile}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileStep("phone");
                          setErrorMessage("");
                        }}
                        className="text-amber-700 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 size={11} /> Edit Number
                      </button>
                    </div>
                  </div>

                  {/* Bypass Notification Pill */}
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300/80 flex items-center justify-between text-xs text-amber-900">
                    <div className="flex items-center gap-1.5">
                      <Zap size={14} className="text-amber-600 shrink-0" />
                      <span className="font-medium">
                        Bypass Mode: <strong>1234</strong>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAutoFillOtp}
                      className="text-[11px] font-bold bg-amber-200/90 hover:bg-amber-300 text-amber-900 px-2.5 py-1 rounded-md cursor-pointer transition"
                    >
                      Auto-Fill OTP
                    </button>
                  </div>

                  {/* 4 Digit OTP Inputs */}
                  <div className="flex justify-center gap-3 py-2">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          otpInputsRef.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={otp[index]}
                        onChange={(e) =>
                          handleOtpDigitChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-13 h-14 text-center font-black text-2xl rounded-2xl border-2 border-[#DCCFAF] bg-white text-neutral-900 focus:border-[#D99A00] focus:ring-2 focus:ring-[#F5C542]/30 outline-none transition shadow-xs"
                      />
                    ))}
                  </div>

                  {/* Resend Timer */}
                  <div className="flex items-center justify-between text-xs pt-1 text-neutral-500">
                    <span>Didn&apos;t receive code?</span>
                    {isCounting ? (
                      <span className="font-mono text-neutral-600 font-semibold">
                        Resend in 00:{countdown < 10 ? `0${countdown}` : countdown}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-amber-800 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw size={12} /> Resend OTP
                      </button>
                    )}
                  </div>

                  {/* Verify & Login Button */}
                  <button
                    type="submit"
                    disabled={otp.join("").length !== 4 || isLoading}
                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F5C542] to-[#E5A81A] text-sm font-bold text-[#302823] shadow-md shadow-amber-500/20 transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <LoaderCircle size={18} className="animate-spin" />
                    ) : (
                      <>
                        <span>Verify &amp; Log In</span>
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ============================================================
              TAB 2: STRICT MOBILE REGISTER (NEW NUMBERS ONLY)
          ============================================================ */}
          {authMode === "mobile_register" && (
            <div>
              {mobileStep === "phone" ? (
                <form onSubmit={handleCheckAndSendOtp} className="space-y-3.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-serif text-2xl font-bold leading-tight text-[#302823]">
                        Create Account
                      </h2>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                        New User
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-4 text-[#756D66]">
                      Register your mobile number to manage bookings &amp; track event dates.
                    </p>
                  </div>

                  {/* Customer Full Name */}
                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-[1.5px] text-[#756D66]">
                      Full Name *
                    </label>
                    <div className="flex h-11 items-center gap-2 rounded-xl border border-[#DCCFAF] bg-white px-3 transition focus-within:border-[#D99A00] focus-within:ring-2 focus-within:ring-[#F5C542]/20">
                      <User size={16} className="text-[#A69C92] shrink-0" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-transparent text-sm text-[#302823] outline-none placeholder:text-[#A69C92]"
                      />
                    </div>
                  </div>

                  {/* Mobile Input */}
                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-[1.5px] text-[#756D66]">
                      Mobile Number *
                    </label>
                    <div className="flex h-11 overflow-hidden rounded-xl border border-[#DCCFAF] bg-white transition focus-within:border-[#D99A00] focus-within:ring-2 focus-within:ring-[#F5C542]/20">
                      <div className="flex items-center border-r border-[#E7DED1] px-3 text-xs font-semibold text-[#4D443D] bg-neutral-50/50">
                        +91
                      </div>
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) =>
                          setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                        }
                        placeholder="10-digit mobile number"
                        className="w-full bg-transparent px-3 text-sm text-[#302823] outline-none placeholder:text-[#A69C92]"
                      />
                    </div>
                  </div>

                  {/* Optional Email */}
                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-[1.5px] text-[#756D66]">
                      Email Address (Optional)
                    </label>
                    <div className="flex h-11 items-center gap-2 rounded-xl border border-[#DCCFAF] bg-white px-3 transition focus-within:border-[#D99A00] focus-within:ring-2 focus-within:ring-[#F5C542]/20">
                      <Mail size={16} className="text-[#A69C92] shrink-0" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rahul@example.com"
                        className="w-full bg-transparent text-sm text-[#302823] outline-none placeholder:text-[#A69C92]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={mobile.length !== 10 || !fullName.trim() || isLoading}
                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F5C542] to-[#E5A81A] text-sm font-bold text-[#302823] shadow-md shadow-amber-500/20 transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <LoaderCircle size={18} className="animate-spin" />
                    ) : (
                      <>
                        <span>Verify Number &amp; Register</span>
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>

                  <div className="text-center pt-1 text-xs text-neutral-600">
                    Already registered?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("mobile_login")}
                      className="font-bold text-amber-700 hover:underline cursor-pointer"
                    >
                      Login Here
                    </button>
                  </div>
                </form>
              ) : (
                /* OTP Screen for Registration */
                <form onSubmit={handleVerifyOtpAndSubmit} className="space-y-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold leading-tight text-[#302823]">
                      Verify Mobile Number
                    </h2>
                    <div className="mt-1 flex items-center justify-between text-xs text-[#756D66]">
                      <span>
                        Sent code to <strong>+91 {mobile}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileStep("phone");
                          setErrorMessage("");
                        }}
                        className="text-amber-700 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 size={11} /> Edit
                      </button>
                    </div>
                  </div>

                  {/* Bypass Notification Pill */}
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300/80 flex items-center justify-between text-xs text-amber-900">
                    <div className="flex items-center gap-1.5">
                      <Zap size={14} className="text-amber-600 shrink-0" />
                      <span className="font-medium">
                        Bypass Mode: <strong>1234</strong>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAutoFillOtp}
                      className="text-[11px] font-bold bg-amber-200/90 hover:bg-amber-300 text-amber-900 px-2.5 py-1 rounded-md cursor-pointer transition"
                    >
                      Auto-Fill OTP
                    </button>
                  </div>

                  {/* 4 Digit OTP Inputs */}
                  <div className="flex justify-center gap-3 py-2">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          otpInputsRef.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={otp[index]}
                        onChange={(e) =>
                          handleOtpDigitChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-13 h-14 text-center font-black text-2xl rounded-2xl border-2 border-[#DCCFAF] bg-white text-neutral-900 focus:border-[#D99A00] focus:ring-2 focus:ring-[#F5C542]/30 outline-none transition shadow-xs"
                      />
                    ))}
                  </div>

                  {/* Resend Timer */}
                  <div className="flex items-center justify-between text-xs pt-1 text-neutral-500">
                    <span>Didn&apos;t receive code?</span>
                    {isCounting ? (
                      <span className="font-mono text-neutral-600 font-semibold">
                        Resend in 00:{countdown < 10 ? `0${countdown}` : countdown}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-amber-800 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw size={12} /> Resend OTP
                      </button>
                    )}
                  </div>

                  {/* Create Account Button */}
                  <button
                    type="submit"
                    disabled={otp.join("").length !== 4 || isLoading}
                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F5C542] to-[#E5A81A] text-sm font-bold text-[#302823] shadow-md shadow-amber-500/20 transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <LoaderCircle size={18} className="animate-spin" />
                    ) : (
                      <>
                        <span>Complete Registration</span>
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ============================================================
              TAB 3: EMAIL / PASSWORD LOGIN
          ============================================================ */}
          {authMode === "email_login" && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <h2 className="font-serif text-2xl font-bold leading-tight text-[#302823]">
                  Email Sign In
                </h2>
                <p className="mt-1 text-xs leading-4 text-[#756D66]">
                  Sign in with your registered email and password.
                </p>
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[1.5px] text-[#756D66]">
                  Email Address *
                </label>
                <div className="flex h-12 items-center gap-2 rounded-xl border border-[#DCCFAF] bg-white px-3 focus-within:border-[#D99A00] focus-within:ring-2 focus-within:ring-[#F5C542]/20">
                  <Mail size={16} className="text-[#A69C92] shrink-0" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@gmail.com"
                    className="w-full bg-transparent text-sm text-[#302823] outline-none placeholder:text-[#A69C92]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[1.5px] text-[#756D66]">
                  Password *
                </label>
                <div className="flex h-12 items-center gap-2 rounded-xl border border-[#DCCFAF] bg-white px-3 focus-within:border-[#D99A00] focus-within:ring-2 focus-within:ring-[#F5C542]/20">
                  <Lock size={16} className="text-[#A69C92] shrink-0" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent text-sm text-[#302823] outline-none placeholder:text-[#A69C92]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#182033] hover:bg-[#F5A000] text-sm font-bold text-white shadow-md transition-all disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => switchMode("mobile_register")}
                  className="text-xs text-[#A66A00] hover:underline font-semibold cursor-pointer"
                >
                  New here? Register with mobile number
                </button>
              </div>
            </form>
          )}

          {/* Footer Security Badge */}
          <div className="mt-5 flex items-center justify-center gap-1.5 text-[#958A80]">
            <ShieldCheck size={14} className="text-[#A66A00]" />
            <p className="text-[10px] leading-4">
              Secured 256-bit encryption for safe booking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}