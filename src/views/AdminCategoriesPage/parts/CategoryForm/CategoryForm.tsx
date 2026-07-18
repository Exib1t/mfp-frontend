"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/components/controls/Button/Button";
import Input from "@/components/controls/Input/Input";
import Typography from "@/components/controls/Typography/Typography";

import "../../AdminCategoriesPage.styles.scss";

export const categoryFormSchema = z.object({
  name: z.string().trim().min(1, "Введіть назву"),
  slug: z
    .string()
    .trim()
    .min(1, "Введіть slug")
    .regex(/^[a-z0-9-]+$/, "Тільки латиниця, цифри та дефіс"),
  description: z.string().trim(),
  sort_order: z.number().int("Ціле число").min(0, "Не менше 0"),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

const DEFAULT_VALUES: CategoryFormValues = {
  name: "",
  slug: "",
  description: "",
  sort_order: 0,
};

// Ukrainian Cyrillic -> Latin, so auto-slug works for real category names.
const TRANSLIT: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "h",
  ґ: "g",
  д: "d",
  е: "e",
  є: "ie",
  ж: "zh",
  з: "z",
  и: "y",
  і: "i",
  ї: "i",
  й: "i",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ю: "iu",
  я: "ia",
  ь: "",
  "'": "",
  "’": "",
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[а-щьюяєіїґ'’]/g, (char) => TRANSLIT[char] ?? char)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface CategoryFormProps {
  mode: "create" | "edit";
  defaultValues?: CategoryFormValues;
  onSubmit: (values: CategoryFormValues) => void;
  isPending: boolean;
}

const BASE_CLASS = "category-form";

function CategoryForm({
  mode,
  defaultValues,
  onSubmit,
  isPending,
}: CategoryFormProps) {
  const [slugTouched, setSlugTouched] = useState(mode === "edit");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: defaultValues ?? DEFAULT_VALUES,
  });

  const nameValue = watch("name");

  useEffect(() => {
    if (!slugTouched) setValue("slug", slugify(nameValue));
  }, [nameValue, slugTouched, setValue]);

  return (
    <form
      className={`${BASE_CLASS}_form`}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className={`${BASE_CLASS}_field`}>
        <Input placeholder="Назва *" {...register("name")} />
        {errors.name && (
          <Typography variant="caption" color="error">
            {errors.name.message}
          </Typography>
        )}
      </div>

      <div className={`${BASE_CLASS}_field`}>
        <Input
          placeholder="Slug *"
          {...register("slug", { onChange: () => setSlugTouched(true) })}
        />
        {errors.slug && (
          <Typography variant="caption" color="error">
            {errors.slug.message}
          </Typography>
        )}
      </div>

      <div className={`${BASE_CLASS}_field`}>
        <Input
          as="textarea"
          placeholder="Опис"
          rows={3}
          {...register("description")}
        />
      </div>

      <div className={`${BASE_CLASS}_field`}>
        <Input
          type="number"
          placeholder="Порядок сортування"
          {...register("sort_order", { valueAsNumber: true })}
        />
        {errors.sort_order && (
          <Typography variant="caption" color="error">
            {errors.sort_order.message}
          </Typography>
        )}
      </div>

      <Button type="submit" fullWidth loading={isPending}>
        {mode === "create" ? "Створити" : "Зберегти"}
      </Button>
    </form>
  );
}

export default CategoryForm;
