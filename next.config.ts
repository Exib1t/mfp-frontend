import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    viewTransition: true,
  },
  images: {
    // MinIO runs on localhost (resolves to ::1). Next.js 16 blocks optimizing
    // images from local/private IPs by default — allow it in development only.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        // Local MinIO (S3) — product images served from backend storage.
        protocol: "http",
        hostname: "localhost",
        port: "9000",
      },
      {
        // Production S3 storage via CloudFront CDN.
        protocol: "https",
        hostname: "d3m27cxyyu0emg.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
