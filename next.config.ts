import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve images as-is so the Vercel image-optimization pipeline doesn't consume its limits.
  images: { unoptimized: true },
};

export default nextConfig;
