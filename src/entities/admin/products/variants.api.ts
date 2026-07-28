"use client";

import { $adminApi } from "@/services/api/adminClient";
import { useInvalidateProducts } from "./api";

const VARIANTS_PATH = "/api/v1/admin/products/{id}/variants";
const VARIANT_PATH = "/api/v1/admin/products/{id}/variants/{variantId}";

export function useCreateVariant() {
  const invalidate = useInvalidateProducts();
  return $adminApi.useMutation("post", VARIANTS_PATH, {
    onSuccess: invalidate,
  });
}

export function useUpdateVariant() {
  const invalidate = useInvalidateProducts();
  return $adminApi.useMutation("patch", VARIANT_PATH, {
    onSuccess: invalidate,
  });
}

export function useDeleteVariant() {
  const invalidate = useInvalidateProducts();
  return $adminApi.useMutation("delete", VARIANT_PATH, {
    onSuccess: invalidate,
  });
}
