"use client";

import { X } from "lucide-react";
import { useState } from "react";
import DragHandle from "@/components/admin/SortableList/parts/DragHandle";
import SortableList from "@/components/admin/SortableList/SortableList";
import Button from "@/components/controls/Button/Button";
import Input from "@/components/controls/Input/Input";
import type { AdminProductOption } from "@/entities/admin/products/types";

type OptionValue = AdminProductOption["values"][number];

interface OptionValueListProps {
  optionId: number;
  values: OptionValue[];
  onReorder: (values: OptionValue[]) => void;
  onAdd: (label: string, value: string) => void;
  onRemove: (valueId: number) => void;
}

const BASE_CLASS = "product-options";

/** Draggable choices of one axis, e.g. Білий / Шавлія. */
function OptionValueList({
  optionId,
  values,
  onReorder,
  onAdd,
  onRemove,
}: OptionValueListProps) {
  const [draft, setDraft] = useState("");

  const submitDraft = () => {
    const label = draft.trim();
    if (!label) return;
    // The machine-readable value is derived from the label; admins rarely care.
    onAdd(label, label.toLowerCase().replace(/\s+/g, "-"));
    setDraft("");
  };

  return (
    <div className={`${BASE_CLASS}_values`}>
      <SortableList
        items={values}
        getId={(value) => value.id}
        onReorder={onReorder}
        renderItem={(value, { dragHandleProps }) => (
          <div className={`${BASE_CLASS}_value`}>
            <DragHandle handle={dragHandleProps} />
            {value.color_hex && (
              <span
                className={`${BASE_CLASS}_swatch`}
                style={{ background: value.color_hex }}
                aria-hidden="true"
              />
            )}
            <span className={`${BASE_CLASS}_value-label`}>{value.label}</span>
            <button
              type="button"
              className={`${BASE_CLASS}_remove`}
              aria-label={`Видалити ${value.label}`}
              onClick={() => onRemove(value.id)}
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>
        )}
      />

      <div className={`${BASE_CLASS}_value-add`}>
        <Input
          id={`option-${optionId}-new-value`}
          placeholder="Нове значення"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              submitDraft();
            }
          }}
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={submitDraft}
          disabled={!draft.trim()}
        >
          Додати
        </Button>
      </div>
    </div>
  );
}

export default OptionValueList;
