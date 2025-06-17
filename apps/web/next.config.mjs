/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  transpilePackages: ["@mwsp-academy/ai", "openai"],
  eslint: {
    // Skip ESLint errors during production build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip TS errors during production build
    ignoreBuildErrors: true,
  },
  // Configure external image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
