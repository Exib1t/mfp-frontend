"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import {
  useCreateConfigurator,
  useUpdateConfigurator,
} from "@/entities/admin/configurators/api";
import type { AdminConfigurator } from "@/entities/admin/configurators/types";
import { ConfiguratorFormSchema } from "./schema";
import type {
  ConfiguratorForm,
  ConfiguratorFormInput,
  ConfiguratorFormValues,
} from "./types";

function toDefaults(configurator?: AdminConfigurator): ConfiguratorFormInput {
  return {
    name: configurator?.name ?? "",
    slug: configurator?.slug ?? "",
    description: configurator?.description ?? null,
    base_price: configurator?.base_price ?? 0,
    is_active: configurator?.is_active ?? true,
  };
}

export function useConfiguratorForm(configurator?: AdminConfigurator) {
  const router = useRouter();
  const { toast } = useToast();
  const createConfigurator = useCreateConfigurator();
  const updateConfigurator = useUpdateConfigurator();

  const form: ConfiguratorForm = useForm<
    ConfiguratorFormInput,
    unknown,
    ConfiguratorFormValues
  >({
    resolver: zodResolver(ConfiguratorFormSchema),
    defaultValues: toDefaults(configurator),
  });

  const submit = form.handleSubmit((values) => {
    // The generated payload types mark defaulted fields as required, so the
    // currency the preset already has is restated here.
    const body = { ...values, currency: configurator?.currency ?? "UAH" };

    if (configurator) {
      updateConfigurator.mutate(
        { params: { path: { id: configurator.id } }, body },
        {
          onSuccess: () => toast("Конфігуратор збережено", "success"),
          onError: () => toast("Не вдалося зберегти конфігуратор", "error"),
        },
      );
      return;
    }

    createConfigurator.mutate(
      { body },
      {
        onSuccess: (created) => {
          toast("Конфігуратор створено", "success");
          router.push(`/admin/configurator/${created.data.id}`);
        },
        onError: () => toast("Не вдалося створити конфігуратор", "error"),
      },
    );
  });

  return {
    form,
    submit,
    isSaving: createConfigurator.isPending || updateConfigurator.isPending,
  };
}
