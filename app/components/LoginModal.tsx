"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  LoaderCircle,
  UserRound,
  LockKeyhole,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalMode = "login" | "register";

type FieldKey = "name" | "email" | "mobile" | "password" | "confirm";

const labelClass =
  "mb-1.5 block text-[10px] font-bold uppercase tracking-[1.5px] text-[#756D66]";

const shell = (hasError: boolean) =>
  `flex h-[46px] items-center overflow-hidden rounded-xl border bg-white transition focus-within:border-[#D99A00] focus-within:ring-2 focus-within:ring-[#F5C542]/20 ${
    hasError ? "border-red-300" : "border-[#DCCFAF]"
  }`;

const inputClass =
  "h-full w-full min-w-0 bg-transparent px-3 text-sm text-[#302823] outline-none placeholder:text-[#A69C92]";

const primaryButton =
  "group flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#F5C542] text-sm font-bold text-[#302823] shadow-[0_8px_20px_rgba(217,154,0,0.18)] transition hover:bg-[#E8B52F] disabled:cursor-not-allowed disabled:opacity-50";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[11px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [mode, setMode] = useState<ModalMode>("login");

  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});

  const router = useRouter();

  const resetForm = () => {
    setMobile("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setIsLoading(false);
    setTouched({});
  };

  const switchMode = (newMode: ModalMode) => {
    resetForm();
    setMode(newMode);
  };

  const handleClose = () => {
    resetForm();
    setMode("login");
    onClose();
  };

  // Escape closes the modal and the page behind it stops scrolling
  const closeRef = useRef(handleClose);
  closeRef.current = handleClose;

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  /* ---------------- validation ---------------- */

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const fieldErrors: Record<FieldKey, string> = {
    name: name.trim().length < 2 ? "Please enter your full name." : "",
    email: !emailValid ? "Enter a valid email address." : "",
    mobile: mobile.length !== 10 ? "Enter a valid 10-digit mobile number." : "",
    password: password.length < 8 ? "Use at least 8 characters." : "",
    confirm: confirmPassword !== password ? "Passwords do not match." : "",
  };

  const touch = (key: FieldKey) => setTouched((prev) => ({ ...prev, [key]: true }));
  const errorFor = (key: FieldKey) => (touched[key] ? fieldErrors[key] : "");

  // 0 = too short, 1-4 = weak to strong
  const strength =
    password.length < 8
      ? 0
      : 1 +
        (/[a-z]/.test(password) && /[A-Z]/.test(password) ? 1 : 0) +
        (/\d/.test(password) ? 1 : 0) +
        (/[^A-Za-z0-9]/.test(password) ? 1 : 0);

  const strengthLabel = ["Too short", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["bg-red-400", "bg-red-400", "bg-orange-400", "bg-[#F5C542]", "bg-green-500"][strength];

  const registerValid =
    !fieldErrors.name &&
    !fieldErrors.email &&
    !fieldErrors.mobile &&
    !fieldErrors.password &&
    !fieldErrors.confirm;

  /* ---------------- actions ---------------- */

  const handleLogin = async () => {
    setError("");

    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsLoading(true);

    try {
      // Connect your existing OTP/login API here.
      // Do not show a successful login until the API confirms it.
      setError("Please connect your login API to continue.");
    } catch {
      setError("Unable to log in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!registerValid) {
      setTouched({ name: true, email: true, mobile: true, password: true, confirm: true });
      setError(
        fieldErrors.name ||
          fieldErrors.email ||
          fieldErrors.mobile ||
          fieldErrors.password ||
          fieldErrors.confirm,
      );
      return;
    }

    setIsLoading(true);

    try {
      /*
       * Connect your backend registration API here.
       *
       * Example:
       * const result = await apiRequest("/auth/register", {
       *   method: "POST",
       *   body: JSON.stringify({ name, email, mobile, password }),
       * });
       *
       * Use the actual endpoint and request fields
       * defined by your backend.
       */

      setError("Registration API is not connected yet.");
    } catch {
      setError("Unable to create your account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const spinner = <LoaderCircle size={18} className="animate-spin" />;
  const arrow = (
    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
  );

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-5">
      {/* Backdrop */}
      <div onClick={handleClose} className="absolute inset-0 bg-black/50 backdrop-blur-md" />

      {/* Modal card: overflow-hidden clips the glows so no scrollbars appear */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className="relative z-10 w-full max-w-[460px] overflow-hidden rounded-[26px] border border-[#E9D7AE] bg-[#FFFDF9] shadow-[0_25px_80px_rgba(50,35,20,0.25)]"
      >
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#F5C542]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-[#D99A00]/10 blur-3xl" />

        {/* Close button stays in place while the form scrolls */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F0E7] text-[#5C5147] transition hover:bg-[#EDE4D6]"
        >
          <X size={18} />
        </button>

        {/* Scroll area (vertical only, only when the screen is short) */}
        <div className="relative max-h-[92vh] overflow-y-auto overflow-x-hidden overscroll-contain px-6 pb-6 pt-6 sm:px-7">
          {/* Brand */}
          <div className="flex items-center gap-2.5 pr-10">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF2C7] text-[#A66A00]">
              <Sparkles size={17} />
            </div>

            <div>
              <p className="font-serif text-xl font-bold leading-tight text-[#302823]">
                Dream<span className="text-[#B47A00]">Deco</span>
              </p>
              <p className="text-[9px] uppercase tracking-[2px] text-[#9A8B7B]">
                Celebration Studio
              </p>
            </div>
          </div>

          {/* Login / Sign up switch */}
          <div
            role="tablist"
            aria-label="Account options"
            className="mt-5 grid grid-cols-2 rounded-xl bg-[#F5F0E7] p-1"
          >
            {(["login", "register"] as ModalMode[]).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => mode !== m && switchMode(m)}
                className={`h-9 rounded-lg text-sm font-bold transition ${
                  mode === m
                    ? "bg-white text-[#302823] shadow-sm"
                    : "text-[#8B8177] hover:text-[#302823]"
                }`}
              >
                {m === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div className="mb-5 mt-5">
            <h2
              id="auth-title"
              className="font-serif text-[26px] font-bold leading-tight text-[#302823]"
            >
              {mode === "login" ? "Log in or sign up" : "Create your account"}
            </h2>

            <p className="mt-1.5 max-w-[340px] text-sm leading-5 text-[#756D66]">
              {mode === "login"
                ? "Track your decor, book faster and unlock exclusive member benefits."
                : "Join DreamDeco to discover beautiful celebrations and manage your bookings."}
            </p>
          </div>

          {/* ================= LOGIN ================= */}
          {mode === "login" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              noValidate
            >
              <Field id="login-mobile" label="Mobile Number">
                <div className={`${shell(false)} mb-3`}>
                  <div className="flex h-full items-center border-r border-[#E7DED1] px-4 text-sm font-semibold text-[#4D443D]">
                    +91
                  </div>

                  <input
                    id="login-mobile"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    autoFocus
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    placeholder="10-digit mobile number"
                    className={inputClass}
                  />
                </div>
              </Field>

              <button
                type="submit"
                disabled={mobile.length !== 10 || isLoading}
                className={primaryButton}
              >
                {isLoading ? (
                  spinner
                ) : (
                  <>
                    Login
                    {arrow}
                  </>
                )}
              </button>
            </form>
          )}

          {/* ================= REGISTER ================= */}
          {mode === "register" && (
            <form onSubmit={handleRegister} noValidate className="space-y-3.5">
              <Field id="register-name" label="Full Name" error={errorFor("name")}>
                <div className={shell(!!errorFor("name"))}>
                  <UserRound size={17} className="ml-3 shrink-0 text-[#A69C92]" />
                  <input
                    id="register-name"
                    type="text"
                    autoComplete="name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => touch("name")}
                    aria-invalid={!!errorFor("name")}
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </div>
              </Field>

              <Field id="register-mobile" label="Mobile Number" error={errorFor("mobile")}>
                <div className={shell(!!errorFor("mobile"))}>
                  <div className="flex h-full items-center border-r border-[#E7DED1] px-3 text-sm font-semibold text-[#4D443D]">
                    +91
                  </div>
                  <input
                    id="register-mobile"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    onBlur={() => touch("mobile")}
                    aria-invalid={!!errorFor("mobile")}
                    placeholder="10-digit mobile number"
                    className={inputClass}
                  />
                </div>
              </Field>

              <Field id="register-email" label="Email Address" error={errorFor("email")}>
                <div className={shell(!!errorFor("email"))}>
                  <Mail size={17} className="ml-3 shrink-0 text-[#A69C92]" />
                  <input
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => touch("email")}
                    aria-invalid={!!errorFor("email")}
                    placeholder="Enter your email"
                    className={inputClass}
                  />
                </div>
              </Field>

              {/* Password + confirm side by side to keep the form short */}
              <div className="grid gap-3.5 sm:grid-cols-2">
                <Field id="register-password" label="Password" error={errorFor("password")}>
                  <div className={shell(!!errorFor("password"))}>
                    <input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => touch("password")}
                      aria-invalid={!!errorFor("password")}
                      placeholder="Min. 8 characters"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="mr-3 shrink-0 text-[#8B8177] hover:text-[#302823]"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </Field>

                <Field id="register-confirm-password" label="Confirm" error={errorFor("confirm")}>
                  <div className={shell(!!errorFor("confirm"))}>
                    <input
                      id="register-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={() => touch("confirm")}
                      aria-invalid={!!errorFor("confirm")}
                      placeholder="Re-enter password"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      className="mr-3 shrink-0 text-[#8B8177] hover:text-[#302823]"
                    >
                      {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </Field>
              </div>

              {/* Strength meter + match hint */}
              {password.length > 0 && (
                <div className="-mt-1">
                  <div className="flex gap-1.5" aria-hidden="true">
                    {[1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className={`h-1.5 flex-1 rounded-full ${
                          i <= strength ? strengthColor : "bg-[#EDE4D6]"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-[11px]">
                    <span className="text-[#756D66]">
                      Password strength: <b className="text-[#302823]">{strengthLabel}</b>
                    </span>
                    {confirmPassword.length > 0 && confirmPassword === password && (
                      <span className="inline-flex items-center gap-1 font-semibold text-green-600">
                        <Check size={12} /> Passwords match
                      </span>
                    )}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !registerValid}
                className={primaryButton}
              >
                {isLoading ? (
                  spinner
                ) : (
                  <>
                    Create Account
                    {arrow}
                  </>
                )}
              </button>
            </form>
          )}

          {/* Error message */}
          {error && (
            <p
              role="alert"
              className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700"
            >
              {error}
            </p>
          )}

          {/* Divider and social buttons: login only */}
          {mode === "login" && (
            <>
              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#E8DED2]" />
                <span className="text-[11px] font-medium text-[#9A9188]">or continue with</span>
                <div className="h-px flex-1 bg-[#E8DED2]" />
              </div>

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
            </>
          )}

          {/* Trust message */}
          <div className="mt-5 flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-[#A66A00]" />
            <p className="text-[10px] leading-4 text-[#958A80]">
              Your information is secure and protected.
            </p>
          </div>

          {/* Terms and privacy */}
          <p className="mt-2.5 text-center text-[10px] leading-4 text-[#9A9188]">
            By continuing, you agree to our{" "}
            <button
              type="button"
              onClick={() => {
                handleClose();
                router.push("/terms-and-condition");
              }}
              className="font-semibold text-[#A66A00] hover:underline"
            >
              Terms
            </button>{" "}
            &{" "}
            <button
              type="button"
              onClick={() => {
                handleClose();
                router.push("/privacy-Policy");
              }}
              className="font-semibold text-[#A66A00] hover:underline"
            >
              Privacy Policy
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
}