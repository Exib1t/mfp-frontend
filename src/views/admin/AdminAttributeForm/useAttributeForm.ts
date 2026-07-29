"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import {
  useCreateAttribute,
  useUpdateAttribute,
} from "@/entities/admin/attributes/api";
import type { AdminAttribute } from "@/entities/admin/attributes/types";
import { AttributeFormSchema } from "./schema";
import type {
  AttributeForm,
  AttributeFormInput,
  AttributeFormValues,
} from "./types";

function toDefaults(attribute?: AdminAttribute): AttributeFormInput {
  return {
    name: attribute?.name ?? "",
    code: attribute?.code ?? "",
    type: attribute?.type ?? "text",
    unit: attribute?.unit ?? null,
    group_name: attribute?.group_name ?? null,
    is_filterable: attribute?.is_filterable ?? false,
    is_visible: attribute?.is_visible ?? true,
    sort_order: attribute?.sort_order ?? 0,
  };
}

export function useAttributeForm(attribute?: AdminAttribute) {
  const router = useRouter();
  const { toast } = useToast();
  const createAttribute = useCreateAttribute();
  const updateAttribute = useUpdateAttribute();

  const form: AttributeForm = useForm<
    AttributeFormInput,
    unknown,
    AttributeFormValues
  >({
    resolver: zodResolver(AttributeFormSchema),
    defaultValues: toDefaults(attribute),
  });

  const submit = form.handleSubmit((values) => {
    if (attribute) {
      updateAttribute.mutate(
        { params: { path: { id: attribute.id } }, body: values },
        {
          onSuccess: () => toast("Характеристику збережено", "success"),
          onError: () => toast("Не вдалося зберегти характеристику", "error"),
        },
      );
      return;
    }

    createAttribute.mutate(
      { body: values },
      {
        onSuccess: (created) => {
          toast("Характеристику створено", "success");
          router.push(`/admin/attributes/${created.data.id}`);
        },
        onError: () => toast("Не вдалося створити характеристику", "error"),
      },
    );
  });

  return {
    form,
    submit,
    isSaving: createAttribute.isPending || updateAttribute.isPending,
  };
}
