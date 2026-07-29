"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import {
  useCreateCategory,
  useUpdateCategory,
} from "@/entities/admin/categories/api";
import type { AdminCategory } from "@/entities/admin/categories/types";
import { CategoryFormSchema } from "./schema";
import type {
  CategoryForm,
  CategoryFormInput,
  CategoryFormValues,
} from "./types";

function toDefaults(category?: AdminCategory): CategoryFormInput {
  return {
    name: category?.name ?? "",
    slug: category?.slug ?? "",
    description: category?.description ?? null,
    parent_id: category?.parent_id ?? null,
    image_url: category?.image_url ?? null,
    meta_title: category?.meta_title ?? null,
    meta_description: category?.meta_description ?? null,
    sort_order: category?.sort_order ?? 0,
  };
}

export function useCategoryForm(category?: AdminCategory) {
  const router = useRouter();
  const { toast } = useToast();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const form: CategoryForm = useForm<
    CategoryFormInput,
    unknown,
    CategoryFormValues
  >({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: toDefaults(category),
  });

  const submit = form.handleSubmit((values) => {
    if (category) {
      updateCategory.mutate(
        { params: { path: { id: category.id } }, body: values },
        {
          onSuccess: () => toast("Категорію збережено", "success"),
          onError: () => toast("Не вдалося зберегти категорію", "error"),
        },
      );
      return;
    }

    createCategory.mutate(
      { body: values },
      {
        onSuccess: (created) => {
          toast("Категорію створено", "success");
          router.push(`/admin/categories/${created.data.id}`);
        },
        onError: () => toast("Не вдалося створити категорію", "error"),
      },
    );
  });

  return {
    form,
    submit,
    isSaving: createCategory.isPending || updateCategory.isPending,
  };
}
