"use client";

import { useToast } from "@/components/controls/Toast/ToastProvider";
import {
  useCreateOption,
  useCreateOptionValue,
  useDeleteOption,
  useDeleteOptionValue,
  useUpdateOption,
  useUpdateOptionValue,
} from "@/entities/admin/products/options.api";
import type {
  AdminProduct,
  AdminProductOption,
} from "@/entities/admin/products/types";

type OptionValue = AdminProductOption["values"][number];

/** CRUD + drag-reorder persistence for a product's variation axes. */
export function useProductOptions(product: AdminProduct) {
  const { toast } = useToast();
  const createOption = useCreateOption();
  const updateOption = useUpdateOption();
  const deleteOption = useDeleteOption();
  const createValue = useCreateOptionValue();
  const updateValue = useUpdateOptionValue();
  const deleteValue = useDeleteOptionValue();

  const productPath = { id: product.id };
  const fail = () => toast("Не вдалося зберегти зміни", "error");

  const addOption = (name: string) =>
    createOption.mutate(
      { params: { path: productPath }, body: { name } },
      { onError: fail },
    );

  const renameOption = (optionId: number, name: string) =>
    updateOption.mutate(
      { params: { path: { ...productPath, optionId } }, body: { name } },
      { onError: fail },
    );

  const removeOption = (optionId: number) =>
    deleteOption.mutate(
      { params: { path: { ...productPath, optionId } } },
      { onError: fail },
    );

  /** Writes the new index of every option whose position actually changed. */
  const reorderOptions = (next: AdminProductOption[]) => {
    next.forEach((option, index) => {
      if (option.sort_order === index) return;
      updateOption.mutate(
        {
          params: { path: { ...productPath, optionId: option.id } },
          body: { sort_order: index },
        },
        { onError: fail },
      );
    });
  };

  const addValue = (optionId: number, label: string, value: string) =>
    createValue.mutate(
      {
        params: { path: { ...productPath, optionId } },
        body: { label, value },
      },
      { onError: fail },
    );

  const removeValue = (optionId: number, valueId: number) =>
    deleteValue.mutate(
      { params: { path: { ...productPath, optionId, valueId } } },
      { onError: fail },
    );

  const reorderValues = (optionId: number, next: OptionValue[]) => {
    next.forEach((value, index) => {
      if (value.sort_order === index) return;
      updateValue.mutate(
        {
          params: { path: { ...productPath, optionId, valueId: value.id } },
          body: { sort_order: index },
        },
        { onError: fail },
      );
    });
  };

  return {
    addOption,
    renameOption,
    removeOption,
    reorderOptions,
    addValue,
    removeValue,
    reorderValues,
    isMutating:
      createOption.isPending ||
      updateOption.isPending ||
      deleteOption.isPending ||
      createValue.isPending ||
      updateValue.isPending ||
      deleteValue.isPending,
  };
}
