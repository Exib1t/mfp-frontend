"use client";

import { Controller } from "react-hook-form";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import AdminField from "@/components/admin/AdminField/AdminField";
import Input from "@/components/controls/Input/Input";
import Select from "@/components/controls/Select/Select";
import { useAdminConfigurators } from "@/entities/admin/configurators/api";
import { useCategories } from "@/entities/categories/api";
import { slugify } from "@/lib/utils/slugify";
import { NO_CONFIGURATOR, PRODUCT_STATUS_OPTIONS } from "../constants";
import type { ProductForm } from "../types";

interface GeneralTabProps {
  form: ProductForm;
}

function GeneralTab({ form }: GeneralTabProps) {
  const { register, control, formState, setValue, getValues } = form;
  const { errors } = formState;
  const { data: categories = [] } = useCategories();
  const { data: configurators = [] } = useAdminConfigurators();

  const categoryOptions = categories.map((category) => ({
    value: String(category.id),
    label: category.name,
  }));

  const configuratorOptions = [
    { value: NO_CONFIGURATOR, label: "— без конфігуратора —" },
    ...configurators.map((configurator) => ({
      value: String(configurator.id),
      label: configurator.name,
    })),
  ];

  return (
    <AdminCard title="Основна інформація">
      <AdminField
        htmlFor="product-name"
        label="Назва"
        error={errors.name?.message}
      >
        <Input
          id="product-name"
          {...register("name", {
            // Transliterate into the slug on the way out, and only while the
            // slug is still blank — a hand-written one is never overwritten.
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
        htmlFor="product-slug"
        label="Slug"
        hint="Використовується в адресі сторінки товару"
        error={errors.slug?.message}
      >
        <Input id="product-slug" {...register("slug")} />
      </AdminField>

      <AdminField
        htmlFor="product-category"
        label="Категорія"
        error={errors.category_id?.message}
      >
        <Controller
          control={control}
          name="category_id"
          render={({ field }) => (
            <Select
              value={field.value ? String(field.value) : ""}
              options={categoryOptions}
              onChange={(value) => field.onChange(Number(value))}
              aria-label="Категорія"
            />
          )}
        />
      </AdminField>

      <AdminField
        htmlFor="product-configurator"
        label="Конфігуратор"
        hint="Покупець збере товар за цими кроками перед додаванням у кошик"
      >
        <Controller
          control={control}
          name="configurator_id"
          render={({ field }) => (
            <Select
              value={field.value ? String(field.value) : NO_CONFIGURATOR}
              options={configuratorOptions}
              onChange={(value) =>
                field.onChange(value === NO_CONFIGURATOR ? null : Number(value))
              }
              aria-label="Конфігуратор"
            />
          )}
        />
      </AdminField>

      <AdminField htmlFor="product-status" label="Статус">
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select
              value={field.value}
              options={[...PRODUCT_STATUS_OPTIONS]}
              onChange={field.onChange}
              aria-label="Статус"
            />
          )}
        />
      </AdminField>

      <AdminField htmlFor="product-sku" label="Артикул (SKU)">
        <Input id="product-sku" {...register("sku")} />
      </AdminField>

      <AdminField htmlFor="product-brand" label="Бренд">
        <Input id="product-brand" {...register("brand")} />
      </AdminField>

      <AdminField
        htmlFor="product-short-description"
        label="Короткий опис"
        hint="Показується в картці товару та в превʼю"
        error={errors.short_description?.message}
      >
        <Input
          as="textarea"
          id="product-short-description"
          rows={2}
          {...register("short_description")}
        />
      </AdminField>

      <AdminField htmlFor="product-description" label="Повний опис">
        <Input
          as="textarea"
          id="product-description"
          rows={6}
          {...register("description")}
        />
      </AdminField>
    </AdminCard>
  );
}

export default GeneralTab;
