import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "local.art" },
      { protocol: "https", hostname: "ateljenatasabeljin.com" },
      { protocol: "https", hostname: "*.ateljenatasabeljin.com" },
    ],
  },
};

export default nextConfig;
