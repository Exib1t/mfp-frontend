"use client";

import AdminCard from "@/components/admin/AdminCard/AdminCard";
import AdminCheckbox from "@/components/admin/AdminCheckbox/AdminCheckbox";
import AdminField from "@/components/admin/AdminField/AdminField";
import Input from "@/components/controls/Input/Input";
import { slugify } from "@/lib/utils/slugify";
import type { ConfiguratorForm } from "../types";

interface ConfiguratorGeneralCardProps {
  form: ConfiguratorForm;
}

function ConfiguratorGeneralCard({ form }: ConfiguratorGeneralCardProps) {
  const { register, formState, setValue, getValues } = form;
  const { errors } = formState;

  return (
    <AdminCard title="Основне">
      <AdminField
        htmlFor="configurator-name"
        label="Назва"
        error={errors.name?.message}
      >
        <Input
          id="configurator-name"
          {...register("name", {
            // Derive the slug only while it is still blank.
            onBlur: (event) => {
              if (getValues("slug")) return;
              setValue("slug", slugify(event.target.value), {
                shouldValidate: true,
              });
            },
          })}
        />
      </AdminField>

      <AdminField
        htmlFor="configurator-slug"
        label="Slug"
        hint="Використовується в адресі сторінки конфігуратора"
        error={errors.slug?.message}
      >
        <Input id="configurator-slug" {...register("slug")} />
      </AdminField>

      <AdminField htmlFor="configurator-description" label="Опис">
        <Input
          as="textarea"
          id="configurator-description"
          rows={3}
          {...register("description")}
        />
      </AdminField>

      <AdminField
        htmlFor="configurator-base-price"
        label="Базова ціна"
        hint="Стартова ціна збірки. Товар зі своєю ціною перекриває її."
        error={errors.base_price?.message}
      >
        <Input
          id="configurator-base-price"
          type="number"
          step="0.01"
          min={0}
          {...register("base_price")}
        />
      </AdminField>

      <AdminCheckbox
        label="Активний"
        hint="Вимкнений конфігуратор недоступний покупцям"
        {...register("is_active")}
      />
    </AdminCard>
  );
}

export default ConfiguratorGeneralCard;
