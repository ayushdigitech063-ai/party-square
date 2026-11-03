"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFBF7]">
      <p className="text-sm font-semibold text-[#6B706C]">Redirecting to admin login...</p>
    </div>
  );
}
