import type { NextConfig } from "next";
import { IMAGE_HOSTS } from "./src/config/images.config";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    viewTransition: true,
  },
  images: {
    // MinIO runs on localhost (resolves to ::1). Next.js 16 blocks optimizing
    // images from local/private IPs by default — allow it in development only.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    // Shared with the runtime guard in `RemoteImage`, so the two can't drift.
    remotePatterns: IMAGE_HOSTS,
  },
};

export default nextConfig;
