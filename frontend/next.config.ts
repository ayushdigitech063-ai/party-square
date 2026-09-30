import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Build ke waqt TypeScript errors ko ignore karne ke liye
    ignoreBuildErrors: true,
  },
};

export default nextConfig;