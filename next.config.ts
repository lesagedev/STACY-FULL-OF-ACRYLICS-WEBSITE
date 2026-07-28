import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.21.16.1"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
  env: {
    ADMIN_SECRET: process.env.ADMIN_SECRET || "stacy-admin-x7k9m2p4",
  },
};

export default nextConfig;
