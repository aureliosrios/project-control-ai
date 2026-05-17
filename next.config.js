/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  eslint: {
    // Disable ESLint during build to avoid ESLint v8/v9 conflict
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

