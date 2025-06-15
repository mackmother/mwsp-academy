import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true, // allow files outside of apps/web
  },
  transpilePackages: ["@mwsp-academy/ai", "openai"],
  eslint: {
    // Allow production builds to complete even if there are ESLint errors
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
