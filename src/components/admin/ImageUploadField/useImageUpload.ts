"use client";

import { useRef, useState } from "react";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import { type MediaFolder, uploadMedia } from "@/entities/admin/media/api";

interface UseImageUploadOptions {
  folder: MediaFolder;
  onChange: (url: string | null) => void;
}

/** File picker + drag-drop wiring around a single permanent image upload. */
export function useImageUpload({ folder, onChange }: UseImageUploadOptions) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setUploading] = useState(false);
  const [isDragOver, setDragOver] = useState(false);

  const send = async (file: File | undefined) => {
    if (!file) return;

    setUploading(true);
    try {
      onChange(await uploadMedia(file, folder));
    } catch (error) {
      toast(
        error instanceof Error ? error.message : "Помилка завантаження",
        "error",
      );
    } finally {
      setUploading(false);
    }
  };

  return {
    inputRef,
    isUploading,
    isDragOver,
    pick: () => inputRef.current?.click(),
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      void send(event.target.files?.[0]);
      // Reset so picking the same file twice still fires a change.
      event.target.value = "";
    },
    onDragOver: (event: React.DragEvent) => {
      event.preventDefault();
      setDragOver(true);
    },
    onDragLeave: () => setDragOver(false),
    onDrop: (event: React.DragEvent) => {
      event.preventDefault();
      setDragOver(false);
      void send(event.dataTransfer.files?.[0]);
    },
    clear: () => onChange(null),
  };
}
