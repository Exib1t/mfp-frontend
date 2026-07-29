/**
 * Hosts `next/image` is allowed to optimise. Consumed twice: by
 * `next.config.ts` to build `images.remotePatterns`, and at runtime by
 * `RemoteImage` to decide whether a URL is safe to hand to `next/image` —
 * an unlisted host makes it throw, which would take the whole page down.
 */
export interface ImageHost {
  protocol: "http" | "https";
  hostname: string;
  port?: string;
}

export const IMAGE_HOSTS: ImageHost[] = [
  // Local MinIO (S3) — product images served from backend storage.
  { protocol: "http", hostname: "localhost", port: "9000" },
  // Production S3 storage via CloudFront CDN.
  { protocol: "https", hostname: "d3m27cxyyu0emg.cloudfront.net" },
  // Placeholder images used by seed/demo product data.
  { protocol: "https", hostname: "picsum.photos" },
];

/** False for anything `next/image` would refuse — including malformed URLs. */
export function isOptimizableImage(src: string): boolean {
  // Same-origin paths are always fine.
  if (src.startsWith("/")) return true;

  try {
    const url = new URL(src);
    return IMAGE_HOSTS.some(
      (host) =>
        host.hostname === url.hostname &&
        `${host.protocol}:` === url.protocol &&
        (host.port ?? "") === url.port,
    );
  } catch {
    return false;
  }
}
