/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://release-issue-tracker.vercel.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
