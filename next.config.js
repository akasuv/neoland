/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Required:
    appDir: true,
  },
};

module.exports = nextConfig;
