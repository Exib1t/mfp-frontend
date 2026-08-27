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
    short_description: product?.short_description ?? null,
    description: product?.description ?? null,
    category_id: product?.category.id ?? 0,
    status: product?.status ?? "in_stock",
    price: product?.price ?? 0,
    sale_price: product?.sale_price ?? null,
    stock: product?.stock ?? 0,
    is_featured: product?.is_featured ?? false,
    is_published: product?.is_published ?? false,
    meta_title: product?.meta_title ?? null,
    meta_description: product?.meta_description ?? null,
  };
}

/**
 * Values as the API wants them. `published_at` used to be a timestamp the form
 * had to stamp and preserve by hand; it is a plain boolean now, so the mapping
 * is the identity.
 */
function toPayload(values: ProductFormValues) {
  return values;
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

  const submit = form.handleSubmit((values) => {
    const body = toPayload(values);

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
