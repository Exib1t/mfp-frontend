"use client";

import { EyeOff, Trash2 } from "lucide-react";
import DragHandle from "@/components/admin/SortableList/parts/DragHandle";
import type { DragHandleProps } from "@/components/admin/SortableList/types";
import Input from "@/components/controls/Input/Input";
import Select from "@/components/controls/Select/Select";
import {
  PRODUCT_BLOCK_COLUMN_LABELS,
  PRODUCT_BLOCK_LABELS,
  type ProductBlock,
} from "@/entities/products/layout";
import { cn } from "@/lib/utils/cn";
import { BLOCK_TEXT_SETTINGS } from "../layout.helpers";

interface LayoutBlockCardProps {
  block: ProductBlock;
  dragHandleProps: DragHandleProps;
  onPatch: (patch: Partial<ProductBlock>) => void;
  onSetting: (key: string, value: string) => void;
  onRemove: () => void;
}

const BASE_CLASS = "layout-blocks";

const COLUMN_OPTIONS = (
  Object.keys(PRODUCT_BLOCK_COLUMN_LABELS) as ProductBlock["column"][]
).map((column) => ({
  value: column,
  label: PRODUCT_BLOCK_COLUMN_LABELS[column],
}));

function LayoutBlockCard({
  block,
  dragHandleProps,
  onPatch,
  onSetting,
  onRemove,
}: LayoutBlockCardProps) {
  const textSettings = BLOCK_TEXT_SETTINGS[block.type];

  return (
    <div className={cn(`${BASE_CLASS}_card`, { "-disabled": !block.enabled })}>
      <div className={`${BASE_CLASS}_head`}>
        <DragHandle handle={dragHandleProps} />

        <span className={`${BASE_CLASS}_title`}>
          {PRODUCT_BLOCK_LABELS[block.type]}
        </span>

        <Select
          className={`${BASE_CLASS}_column`}
          value={block.column}
          options={COLUMN_OPTIONS}
          onChange={(column) => onPatch({ column })}
          aria-label="Розташування блока"
        />

        <button
          type="button"
          className={cn(`${BASE_CLASS}_toggle`, { "-off": !block.enabled })}
          aria-label={block.enabled ? "Приховати блок" : "Показати блок"}
          aria-pressed={!block.enabled}
          onClick={() => onPatch({ enabled: !block.enabled })}
        >
          <EyeOff size={15} strokeWidth={2} />
        </button>

        <button
          type="button"
          className={`${BASE_CLASS}_remove`}
          aria-label="Прибрати блок"
          onClick={onRemove}
        >
          <Trash2 size={15} strokeWidth={2} />
        </button>
      </div>

      {textSettings && (
        <div className={`${BASE_CLASS}_settings`}>
          {textSettings.title && (
            <Input
              aria-label="Заголовок блока"
              placeholder="Заголовок"
              value={
                typeof block.settings?.title === "string"
                  ? block.settings.title
                  : ""
              }
              onChange={(event) => onSetting("title", event.target.value)}
            />
          )}
          {textSettings.body && (
            <Input
              as="textarea"
              rows={3}
              aria-label="Текст блока"
              placeholder="Текст"
              value={
                typeof block.settings?.body === "string"
                  ? block.settings.body
                  : ""
              }
              onChange={(event) => onSetting("body", event.target.value)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default LayoutBlockCard;
