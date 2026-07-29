"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import DragHandle from "@/components/admin/SortableList/parts/DragHandle";
import type { DragHandleProps } from "@/components/admin/SortableList/types";
import Input from "@/components/controls/Input/Input";
import Select from "@/components/controls/Select/Select";
import type { AdminProductVariant } from "@/entities/admin/products/types";
import type { ProductImage } from "@/entities/products/types";

interface ProductImageCardProps {
  image: ProductImage;
  index: number;
  variants: AdminProductVariant[];
  dragHandleProps: DragHandleProps;
  onPatch: (body: { alt?: string | null; variant_id?: number | null }) => void;
  onRemove: () => void;
}

const BASE_CLASS = "product-media";
const NO_VARIANT = "";

function ProductImageCard({
  image,
  index,
  variants,
  dragHandleProps,
  onPatch,
  onRemove,
}: ProductImageCardProps) {
  return (
    <figure className={`${BASE_CLASS}_card`}>
      <div className={`${BASE_CLASS}_thumb`}>
        <Image
          src={image.url}
          alt={image.alt ?? ""}
          fill
          sizes="200px"
          className={`${BASE_CLASS}_image`}
        />
        {index === 0 && (
          <span className={`${BASE_CLASS}_cover`}>Обкладинка</span>
        )}
      </div>

      <figcaption className={`${BASE_CLASS}_meta`}>
        <Input
          aria-label="Опис зображення (alt)"
          placeholder="alt-текст"
          defaultValue={image.alt ?? ""}
          onBlur={(event) => {
            const next = event.target.value.trim() || null;
            if (next !== image.alt) onPatch({ alt: next });
          }}
        />

        {variants.length > 0 && (
          <Select
            value={image.variant_id ? String(image.variant_id) : NO_VARIANT}
            options={[
              { value: NO_VARIANT, label: "Спільне фото" },
              ...variants.map((variant) => ({
                value: String(variant.id),
                label: variant.label || "Стандарт",
              })),
            ]}
            onChange={(value) =>
              onPatch({
                variant_id: value === NO_VARIANT ? null : Number(value),
              })
            }
            aria-label="Привʼязка до варіанта"
          />
        )}

        <div className={`${BASE_CLASS}_actions`}>
          <DragHandle handle={dragHandleProps} />
          <button
            type="button"
            className={`${BASE_CLASS}_remove`}
            aria-label="Видалити зображення"
            onClick={onRemove}
          >
            <Trash2 size={15} strokeWidth={2} />
          </button>
        </div>
      </figcaption>
    </figure>
  );
}

export default ProductImageCard;
