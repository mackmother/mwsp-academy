import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true, // allow files outside of apps/web
  },
  transpilePackages: ["@mwsp-academy/ai", "openai"],
};

export default nextConfig;
