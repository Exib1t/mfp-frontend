"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/entities/admin/products/api";
import type { AdminProduct } from "@/entities/admin/products/types";
import { ProductFormSchema } from "./schema";
import type { ProductForm, ProductFormInput, ProductFormValues } from "./types";

function toDefaults(product?: AdminProduct): ProductFormInput {
  return {
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    sku: product?.sku ?? null,
    brand: product?.brand ?? null,
    short_description: product?.short_description ?? null,
    description: product?.description ?? null,
    category_id: product?.category.id ?? 0,
    configurator_id: product?.configurator?.id ?? null,
    status: product?.status ?? "in_stock",
    price: product?.price ?? 0,
    compare_at_price: product?.compare_at_price ?? null,
    sale_price: product?.sale_price ?? null,
    sale_starts_at: product?.sale_starts_at ?? null,
    sale_ends_at: product?.sale_ends_at ?? null,
    stock: product?.stock ?? 0,
    is_featured: product?.is_featured ?? false,
    is_published: Boolean(product?.published_at),
    meta_title: product?.meta_title ?? null,
    meta_description: product?.meta_description ?? null,
  };
}

/** Maps form values onto the API payload, including the published_at toggle. */
function toPayload(values: ProductFormValues, wasPublished: boolean) {
  const { is_published, ...rest } = values;

  return {
    ...rest,
    // Keep the original timestamp when it was already live; stamp now on first
    // publish; null takes it back to draft.
    published_at: is_published
      ? wasPublished
        ? undefined
        : new Date().toISOString()
      : null,
  };
}

export function useProductForm(product?: AdminProduct) {
  const router = useRouter();
  const { toast } = useToast();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const form: ProductForm = useForm<
    ProductFormInput,
    unknown,
    ProductFormValues
  >({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: toDefaults(product),
  });

  const wasPublished = Boolean(product?.published_at);

  const submit = form.handleSubmit((values) => {
    const body = toPayload(values, wasPublished);

    if (product) {
      updateProduct.mutate(
        { params: { path: { id: product.id } }, body },
        {
          onSuccess: () => toast("Товар збережено", "success"),
          onError: () => toast("Не вдалося зберегти товар", "error"),
        },
      );
      return;
    }

    createProduct.mutate(
      { body },
      {
        onSuccess: (created) => {
          toast("Товар створено", "success");
          router.push(`/admin/products/${created.data.id}`);
        },
        onError: () => toast("Не вдалося створити товар", "error"),
      },
    );
  });

  return {
    form,
    submit,
    isSaving: createProduct.isPending || updateProduct.isPending,
  };
}
