"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("superadmin@partysquare.com");
  const [password, setPassword] = useState("SuperAdmin@123");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("http://localhost:5000/api/super-admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        document.cookie = `adminToken=${data.token}; path=/; max-age=86400; SameSite=Lax`;
        toast.success("Login successful! Redirecting to dashboard...");
        router.push("/admin");
      } else {
        toast.error(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      toast.error("Failed to connect to the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 selection:bg-[#8CBC67] selection:text-neutral-950">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" 
          alt="Event Decoration Background"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay for better contrast */}
        <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm"></div>
      </div>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-[2.5rem] shadow-2xl p-8 border border-white/20 relative z-10 overflow-hidden">
        {/* Subtle glow effects */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#8CBC67]/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#8CBC67]/20 blur-3xl rounded-full"></div>
        
        <div className="relative z-10 text-center mb-10 mt-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-white border border-[#8CBC67]/50 flex items-center justify-center p-2 mb-6 shadow-lg shadow-[#8CBC67]/20 overflow-hidden">
            <img src="/logo-icon.png" alt="Party Square" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-white mb-2">Party Square Portal</h1>
          <p className="text-sm text-neutral-300">Enter your credentials to access the control center</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B706C]" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@partysquare.com"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/50 focus:border-[#8CBC67]/50 transition-all backdrop-blur-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                Password
              </label>
              <button type="button" className="text-xs font-semibold text-[#8CBC67] hover:text-[#8CBC67] transition-colors">
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B706C]" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#8CBC67]/50 focus:border-[#8CBC67]/50 transition-all backdrop-blur-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-4 bg-gradient-to-r from-[#8CBC67] to-[#8CBC67] hover:from-[#8CBC67] hover:to-[#8CBC67] text-neutral-950 font-bold text-sm rounded-2xl shadow-lg shadow-[#8CBC67]/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <Loader2 className="animate-spin text-neutral-950" size={20} />
            ) : (
              <>
                <span>Secure Sign In</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}


