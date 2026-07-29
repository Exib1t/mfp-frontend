"use client";

import { ImagePlus, X } from "lucide-react";
import type { MediaFolder } from "@/entities/admin/media/api";
import { cn } from "@/lib/utils/cn";
import { useImageUpload } from "./useImageUpload";

import "./ImageUploadField.styles.scss";

interface ImageUploadFieldProps {
  /** Current image URL, or null when empty. */
  value: string | null;
  folder: MediaFolder;
  onChange: (url: string | null) => void;
  label?: string;
  className?: string;
}

const BASE_CLASS = "image-upload";

/**
 * Uploads to our own storage and stores the resulting URL. Deliberately a
 * plain <img>, not next/image: the value can be a legacy external URL, and
 * next/image throws for hosts missing from next.config.
 */
function ImageUploadField({
  value,
  folder,
  onChange,
  label = "Зображення",
  className,
}: ImageUploadFieldProps) {
  const upload = useImageUpload({ folder, onChange });

  return (
    <div className={cn(BASE_CLASS, className)}>
      <input
        ref={upload.inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={upload.onInputChange}
      />

      <button
        type="button"
        className={cn(`${BASE_CLASS}_zone`, {
          "-over": upload.isDragOver,
          "-filled": Boolean(value),
        })}
        aria-label={value ? `Замінити: ${label}` : `Завантажити: ${label}`}
        onClick={upload.pick}
        onDragOver={upload.onDragOver}
        onDragLeave={upload.onDragLeave}
        onDrop={upload.onDrop}
      >
        {value ? (
          // biome-ignore lint/performance/noImgElement: value may be any host
          <img className={`${BASE_CLASS}_preview`} src={value} alt="" />
        ) : (
          <ImagePlus size={18} strokeWidth={2} aria-hidden="true" />
        )}

        {upload.isUploading && <span className={`${BASE_CLASS}_busy`}>…</span>}
      </button>

      {value && (
        <button
          type="button"
          className={`${BASE_CLASS}_clear`}
          aria-label={`Прибрати: ${label}`}
          onClick={upload.clear}
        >
          <X size={12} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

export default ImageUploadField;
