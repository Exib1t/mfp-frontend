"use client";

import Image from "next/image";
import { useState, ViewTransition } from "react";
import { isVideoUrl } from "@/entities/products/helpers";
import { cn } from "@/lib/utils/cn";

import "./ProductGallery.styles.scss";

interface ProductGalleryProps {
  images: string[];
  name: string;
  slug: string;
}

const BASE_CLASS = "product-gallery";

/**
 * The gallery holds photos and clips in one ordered list, the way the admin
 * arranged it. A clip renders as a `<video>`; everything else goes through
 * `next/image` as before — the optimiser has nothing to do with a video, and
 * handing it one blanks the frame.
 */
function ProductGallery({ images, name, slug }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  if (!activeImage) {
    return (
      <div className={`${BASE_CLASS}_placeholder`}>
        <span aria-hidden="true">✦</span>
      </div>
    );
  }

  return (
    <div className={BASE_CLASS}>
      <ViewTransition name={`product-image-${slug}`} share="product-image">
        <div className={`${BASE_CLASS}_main`}>
          {isVideoUrl(activeImage) ? (
            // biome-ignore lint/a11y/useMediaCaption: shop-uploaded product footage carries no caption track, and an empty <track> would claim one exists
            <video
              className={cn(`${BASE_CLASS}_main-image`, `${BASE_CLASS}_fill`)}
              src={activeImage}
              controls
              playsInline
              preload="metadata"
            />
          ) : (
            <Image
              className={`${BASE_CLASS}_main-image`}
              src={activeImage}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="eager"
            />
          )}
        </div>
      </ViewTransition>

      {images.length > 1 && (
        <div className={`${BASE_CLASS}_thumbs`}>
          {images.map((img, idx) => (
            <button
              key={img}
              type="button"
              className={cn(`${BASE_CLASS}_thumb`, {
                "-active": idx === activeIndex,
              })}
              onClick={() => setActiveIndex(idx)}
              aria-label={
                isVideoUrl(img) ? `Відео ${idx + 1}` : `Фото ${idx + 1}`
              }
              aria-current={idx === activeIndex}
            >
              {isVideoUrl(img) ? (
                // Metadata only — the thumbnail needs a poster frame, not the
                // file. Muted and uncontrolled: this button selects, it does
                // not play.
                <video
                  src={img}
                  muted
                  preload="metadata"
                  className={cn(
                    `${BASE_CLASS}_thumb-image`,
                    `${BASE_CLASS}_fill`,
                  )}
                />
              ) : (
                <Image
                  src={img}
                  alt={`${name} — фото ${idx + 1}`}
                  fill
                  sizes="80px"
                  className={`${BASE_CLASS}_thumb-image`}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
