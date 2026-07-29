"use client";

import { Controller } from "react-hook-form";
import AdminCard from "@/components/admin/AdminCard/AdminCard";
import AdminCheckbox from "@/components/admin/AdminCheckbox/AdminCheckbox";
import AdminField from "@/components/admin/AdminField/AdminField";
import Input from "@/components/controls/Input/Input";
import Select from "@/components/controls/Select/Select";
import {
  ATTRIBUTE_TYPE_LABELS,
  OPTION_BACKED_TYPES,
} from "@/entities/admin/attributes/types";
import { codify } from "@/lib/utils/slugify";
import { ATTRIBUTE_TYPES } from "../schema";
import type { AttributeForm } from "../types";

interface AttributeGeneralCardProps {
  form: AttributeForm;
  /** Type is frozen once values exist — switching would orphan them. */
  isTypeLocked: boolean;
}

const TYPE_OPTIONS = ATTRIBUTE_TYPES.map((type) => ({
  value: type,
  label: ATTRIBUTE_TYPE_LABELS[type],
}));

function AttributeGeneralCard({
  form,
  isTypeLocked,
}: AttributeGeneralCardProps) {
  const { register, control, formState, setValue, getValues } = form;
  const { errors } = formState;

  return (
    <AdminCard title="Основне">
      <AdminField
        htmlFor="attribute-name"
        label="Назва"
        hint="Так її побачить покупець на сторінці товару"
        error={errors.name?.message}
      >
        <Input
          id="attribute-name"
          {...register("name", {
            // Derive the code once, on the way out, and only if it is still
            // blank — an admin who typed their own code keeps it.
            onBlur: (event) => {
              if (getValues("code")) return;
              setValue("code", codify(event.target.value), {
                shouldValidate: true,
              });
            },
          })}
        />
      </AdminField>

      <AdminField
        htmlFor="attribute-code"
        label="Код"
        hint="Технічний ключ. Використовується у фільтрах і API."
        error={errors.code?.message}
      >
        <Input id="attribute-code" {...register("code")} />
      </AdminField>

      <AdminField
        htmlFor="attribute-type"
        label="Тип значення"
        hint={
          isTypeLocked
            ? "Є збережені значення — доступні лише типи зі списком значень"
            : "Типи «Вибір», «Колір» і «Зображення» мають власний список значень"
        }
      >
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Select
              value={field.value}
              options={
                isTypeLocked
                  ? TYPE_OPTIONS.filter((option) =>
                      OPTION_BACKED_TYPES.includes(option.value),
                    )
                  : TYPE_OPTIONS
              }
              onChange={field.onChange}
              aria-label="Тип значення"
            />
          )}
        />
      </AdminField>

      <AdminField
        htmlFor="attribute-unit"
        label="Одиниця виміру"
        hint="Напр. см, кг, шт. Показується поруч зі значенням."
      >
        <Input id="attribute-unit" {...register("unit")} />
      </AdminField>

      <AdminField
        htmlFor="attribute-group"
        label="Група"
        hint="Характеристики з однаковою групою збираються разом у таблиці товару"
      >
        <Input id="attribute-group" {...register("group_name")} />
      </AdminField>

      <AdminField
        htmlFor="attribute-sort"
        label="Порядок"
        error={errors.sort_order?.message}
      >
        <Input
          id="attribute-sort"
          type="number"
          min={0}
          {...register("sort_order")}
        />
      </AdminField>

      <AdminCheckbox
        label="Використовувати як фільтр"
        hint="Зʼявиться в бічній панелі каталогу"
        {...register("is_filterable")}
      />

      <AdminCheckbox
        label="Показувати покупцям"
        hint="Вимкніть для внутрішніх даних, які не треба світити на сайті"
        {...register("is_visible")}
      />
    </AdminCard>
  );
}

export default AttributeGeneralCard;
