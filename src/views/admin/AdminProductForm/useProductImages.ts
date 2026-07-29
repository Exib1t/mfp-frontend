"use client";

import { useState } from "react";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import {
  uploadFiles,
  useAddProductImages,
  useRemoveProductImage,
  useUpdateProductImage,
} from "@/entities/admin/products/images.api";
import type { AdminProduct } from "@/entities/admin/products/types";
import type { ProductImage } from "@/entities/products/types";

/** Upload, reorder, retag and delete for the product gallery. */
export function useProductImages(product: AdminProduct) {
  const { toast } = useToast();
  const addImages = useAddProductImages();
  const updateImage = useUpdateProductImage();
  const removeImage = useRemoveProductImage();
  const [isUploading, setUploading] = useState(false);

  const productPath = { id: product.id };
  const fail = () => toast("Не вдалося оновити зображення", "error");

  const upload = async (files: File[]) => {
    if (files.length === 0) return;

    setUploading(true);
    try {
      const fileIds = await uploadFiles(files);
      addImages.mutate(
        { params: { path: productPath }, body: { file_ids: fileIds } },
        {
          onSuccess: () =>
            toast(`Додано ${fileIds.length} зображень`, "success"),
          onError: fail,
        },
      );
    } catch (error) {
      toast(
        error instanceof Error ? error.message : "Помилка завантаження",
        "error",
      );
    } finally {
      setUploading(false);
    }
  };

  const patchImage = (
    imageId: number,
    body: {
      alt?: string | null;
      sort_order?: number;
      variant_id?: number | null;
    },
  ) =>
    updateImage.mutate(
      { params: { path: { ...productPath, imageId } }, body },
      { onError: fail },
    );

  /** Only images whose index actually moved get written. */
  const reorder = (next: ProductImage[]) => {
    next.forEach((image, index) => {
      if (image.sort_order === index) return;
      patchImage(image.id, { sort_order: index });
    });
  };

  const remove = (imageId: number) =>
    removeImage.mutate(
      { params: { path: { ...productPath, imageId } } },
      { onError: fail },
    );

  return {
    upload,
    patchImage,
    reorder,
    remove,
    isUploading,
    isMutating:
      addImages.isPending || updateImage.isPending || removeImage.isPending,
  };
}
