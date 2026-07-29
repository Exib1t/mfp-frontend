"use client";

import { Star, X } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField/ImageUploadField";
import DragHandle from "@/components/admin/SortableList/parts/DragHandle";
import type { DragHandleProps } from "@/components/admin/SortableList/types";
import Input from "@/components/controls/Input/Input";
import type {
  AdminConfiguratorOption,
  ConfiguratorGroupUi,
  UpdateOptionPayload,
} from "@/entities/admin/configurators/types";
import { cn } from "@/lib/utils/cn";

interface ConfiguratorOptionRowProps {
  option: AdminConfiguratorOption;
  ui: ConfiguratorGroupUi;
  dragHandleProps: DragHandleProps;
  onPatch: (patch: UpdateOptionPayload) => void;
  onRemove: () => void;
}

const BASE_CLASS = "configurator-options";

/** One choice. Text edits commit on blur; toggles commit immediately. */
function ConfiguratorOptionRow({
  option,
  ui,
  dragHandleProps,
  onPatch,
  onRemove,
}: ConfiguratorOptionRowProps) {
  return (
    <div className={cn(`${BASE_CLASS}_row`, { "-off": !option.is_active })}>
      <DragHandle handle={dragHandleProps} />

      {ui === "swatch" && (
        <input
          type="color"
          className={`${BASE_CLASS}_color`}
          defaultValue={option.color_hex ?? "#cccccc"}
          aria-label={`Колір: ${option.label}`}
          onBlur={(event) => {
            if (event.target.value !== option.color_hex) {
              onPatch({ color_hex: event.target.value });
            }
          }}
        />
      )}

      <Input
        defaultValue={option.label}
        aria-label="Назва варіанта"
        onBlur={(event) => {
          const label = event.target.value.trim();
          if (label && label !== option.label) onPatch({ label });
        }}
      />

      <Input
        type="number"
        step="0.01"
        className={`${BASE_CLASS}_price`}
        defaultValue={option.price_modifier}
        aria-label="Доплата"
        onBlur={(event) => {
          const price_modifier = Number(event.target.value);
          if (
            !Number.isNaN(price_modifier) &&
            price_modifier !== option.price_modifier
          ) {
            onPatch({ price_modifier });
          }
        }}
      />

      {ui === "image" && (
        <ImageUploadField
          value={option.image_url}
          folder="configurator"
          label={option.label}
          onChange={(image_url) => onPatch({ image_url })}
        />
      )}

      <button
        type="button"
        className={cn(`${BASE_CLASS}_icon`, { "-on": option.is_default })}
        aria-label={
          option.is_default ? "Прибрати з обраного" : "Обрати за замовчуванням"
        }
        title="Обраний за замовчуванням"
        onClick={() => onPatch({ is_default: !option.is_default })}
      >
        <Star
          size={14}
          strokeWidth={2}
          fill={option.is_default ? "currentColor" : "none"}
        />
      </button>

      <label className={`${BASE_CLASS}_active`}>
        <input
          type="checkbox"
          checked={option.is_active}
          onChange={(event) => onPatch({ is_active: event.target.checked })}
        />
        <span>Вкл.</span>
      </label>

      <button
        type="button"
        className={`${BASE_CLASS}_icon -danger`}
        aria-label={`Видалити ${option.label}`}
        onClick={onRemove}
      >
        <X size={14} strokeWidth={2} />
      </button>
    </div>
  );
}

export default ConfiguratorOptionRow;
