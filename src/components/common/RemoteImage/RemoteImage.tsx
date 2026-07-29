import Image from "next/image";
import { isOptimizableImage } from "@/config/images.config";

interface RemoteImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

/**
 * `next/image` for URLs on a configured host, a plain `<img>` for anything
 * else. Admin-entered URLs can point anywhere, and `next/image` throws on an
 * unconfigured host — which would blank the page instead of one picture.
 */
function RemoteImage({ src, alt, width, height, className }: RemoteImageProps) {
  if (!isOptimizableImage(src)) {
    return (
      // biome-ignore lint/performance/noImgElement: host is not optimizable
      <img
        className={className}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
      />
    );
  }

  return (
    <Image
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
}

export default RemoteImage;
