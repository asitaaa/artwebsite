import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "b1398070.smushcdn.com",
        port: "",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
