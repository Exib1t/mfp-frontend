"use client";

import Image from "next/image";
import { useState } from "react";
import { ViewTransition } from "react";
import { cn } from "@/lib/utils/cn";
import type { ProductImage } from "@/entities/products/models";

import "./ProductGallery.styles.scss";

interface ProductGalleryProps {
  images: ProductImage[];
  slug: string;
}

const BASE_CLASS = "product-gallery";

function ProductGallery({ images, slug }: ProductGalleryProps) {
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
          <Image
            className={`${BASE_CLASS}_main-image`}
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </ViewTransition>

      {images.length > 1 && (
        <div className={`${BASE_CLASS}_thumbs`} role="list" aria-label="Фото товару">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              role="listitem"
              className={cn(`${BASE_CLASS}_thumb`, { "-active": idx === activeIndex })}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Фото ${idx + 1}`}
              aria-current={idx === activeIndex}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="80px"
                className={`${BASE_CLASS}_thumb-image`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
