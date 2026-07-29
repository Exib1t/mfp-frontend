"use client";

import { BFF_BASE_PATH } from "@/config/admin.config";
import { $adminApi } from "@/services/api/adminClient";
import { useInvalidateProducts } from "./api";

const IMAGES_PATH = "/api/v1/admin/products/{id}/images";
const IMAGE_PATH = "/api/v1/admin/products/{id}/images/{imageId}";

/**
 * Uploads go straight through the BFF as multipart — openapi-fetch would have
 * to be told not to JSON-serialise the body, and a plain fetch is clearer.
 */
export async function uploadFiles(files: File[]): Promise<number[]> {
  const ids: number[] = [];

  for (const file of files) {
    const form = new FormData();
    form.append("file", file);

    const response = await fetch(`${BFF_BASE_PATH}/api/v1/files/upload`, {
      method: "POST",
      body: form,
    });

    if (!response.ok) throw new Error(`Не вдалося завантажити ${file.name}`);

    const payload = (await response.json()) as { data: { id: number } };
    ids.push(payload.data.id);
  }

  return ids;
}

export function useAddProductImages() {
  const invalidate = useInvalidateProducts();
  return $adminApi.useMutation("post", IMAGES_PATH, { onSuccess: invalidate });
}

export function useUpdateProductImage() {
  const invalidate = useInvalidateProducts();
  return $adminApi.useMutation("patch", IMAGE_PATH, { onSuccess: invalidate });
}

export function useRemoveProductImage() {
  const invalidate = useInvalidateProducts();
  return $adminApi.useMutation("delete", IMAGE_PATH, { onSuccess: invalidate });
}
