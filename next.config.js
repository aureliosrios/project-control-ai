/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Disable ESLint during build to avoid ESLint v8/v9 conflict
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
