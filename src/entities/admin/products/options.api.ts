"use client";

import { $adminApi } from "@/services/api/adminClient";
import { useInvalidateProducts } from "./api";

const OPTIONS_PATH = "/api/v1/admin/products/{id}/options";
const OPTION_PATH = "/api/v1/admin/products/{id}/options/{optionId}";
const VALUES_PATH = "/api/v1/admin/products/{id}/options/{optionId}/values";
const VALUE_PATH =
  "/api/v1/admin/products/{id}/options/{optionId}/values/{valueId}";

export function useCreateOption() {
  const invalidate = useInvalidateProducts();
  return $adminApi.useMutation("post", OPTIONS_PATH, { onSuccess: invalidate });
}

export function useUpdateOption() {
  const invalidate = useInvalidateProducts();
  return $adminApi.useMutation("patch", OPTION_PATH, { onSuccess: invalidate });
}

export function useDeleteOption() {
  const invalidate = useInvalidateProducts();
  return $adminApi.useMutation("delete", OPTION_PATH, {
    onSuccess: invalidate,
  });
}

export function useCreateOptionValue() {
  const invalidate = useInvalidateProducts();
  return $adminApi.useMutation("post", VALUES_PATH, { onSuccess: invalidate });
}

export function useUpdateOptionValue() {
  const invalidate = useInvalidateProducts();
  return $adminApi.useMutation("patch", VALUE_PATH, { onSuccess: invalidate });
}

export function useDeleteOptionValue() {
  const invalidate = useInvalidateProducts();
  return $adminApi.useMutation("delete", VALUE_PATH, { onSuccess: invalidate });
}
