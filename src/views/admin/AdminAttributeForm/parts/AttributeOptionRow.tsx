"use client";

import { X } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField/ImageUploadField";
import DragHandle from "@/components/admin/SortableList/parts/DragHandle";
import type { DragHandleProps } from "@/components/admin/SortableList/types";
import Input from "@/components/controls/Input/Input";
import type {
  AdminAttributeOption,
  AttributeType,
} from "@/entities/admin/attributes/types";

interface AttributeOptionRowProps {
  option: AdminAttributeOption;
  type: AttributeType;
  dragHandleProps: DragHandleProps;
  onPatch: (patch: Partial<Omit<AdminAttributeOption, "id">>) => void;
  onRemove: () => void;
}

const BASE_CLASS = "attribute-options";

/** One stored value; edits commit on blur so typing never fires a request. */
function AttributeOptionRow({
  option,
  type,
  dragHandleProps,
  onPatch,
  onRemove,
}: AttributeOptionRowProps) {
  return (
    <div className={`${BASE_CLASS}_row`}>
      <DragHandle handle={dragHandleProps} />

      <Input
        defaultValue={option.label}
        aria-label="Підпис"
        onBlur={(event) => {
          const label = event.target.value.trim();
          if (label && label !== option.label) onPatch({ label });
        }}
      />

      <Input
        className={`${BASE_CLASS}_code`}
        defaultValue={option.value}
        aria-label="Значення"
        onBlur={(event) => {
          const value = event.target.value.trim();
          if (value && value !== option.value) onPatch({ value });
        }}
      />

      {type === "color" && (
        <input
          type="color"
          className={`${BASE_CLASS}_color`}
          defaultValue={option.color_hex ?? "#ffffff"}
          aria-label="Колір"
          onBlur={(event) => onPatch({ color_hex: event.target.value })}
        />
      )}

      {type === "image" && (
        <ImageUploadField
          value={option.image_url}
          folder="attributes"
          label={option.label}
          onChange={(image_url) => onPatch({ image_url })}
        />
      )}

      <button
        type="button"
        className={`${BASE_CLASS}_remove`}
        aria-label={`Видалити ${option.label}`}
        onClick={onRemove}
      >
        <X size={14} strokeWidth={2} />
      </button>
    </div>
  );
}

export default AttributeOptionRow;
