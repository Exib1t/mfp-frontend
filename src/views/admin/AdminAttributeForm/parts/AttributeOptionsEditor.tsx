"use client";

import AdminCard from "@/components/admin/AdminCard/AdminCard";
import SortableList from "@/components/admin/SortableList/SortableList";
import Button from "@/components/controls/Button/Button";
import Input from "@/components/controls/Input/Input";
import Typography from "@/components/controls/Typography/Typography";
import type { AdminAttribute } from "@/entities/admin/attributes/types";
import { slugify } from "@/lib/utils/slugify";
import { useAttributeOptions } from "../useAttributeOptions";
import AttributeOptionRow from "./AttributeOptionRow";

import "./AttributeOptionsEditor.styles.scss";

interface AttributeOptionsEditorProps {
  attribute: AdminAttribute;
}

const BASE_CLASS = "attribute-options";

/** Value dictionary of a select / multiselect / color / image attribute. */
function AttributeOptionsEditor({ attribute }: AttributeOptionsEditorProps) {
  const options = useAttributeOptions(attribute);

  return (
    <AdminCard
      title="Значення"
      description="Те, з чого адміністратор обирає при заповненні товару. Порядок задається перетягуванням."
    >
      {attribute.options.length === 0 && (
        <Typography variant="body2" color="muted">
          Значень ще немає — додайте перше нижче.
        </Typography>
      )}

      <SortableList
        items={attribute.options}
        getId={(option) => option.id}
        onReorder={options.reorder}
        renderItem={(option, { dragHandleProps }) => (
          <AttributeOptionRow
            option={option}
            type={attribute.type}
            dragHandleProps={dragHandleProps}
            onPatch={(patch) => options.patch(option.id, patch)}
            onRemove={() => options.remove(option.id)}
          />
        )}
      />

      <div className={`${BASE_CLASS}_add`}>
        <Input
          placeholder="Підпис, напр. Шавлія"
          value={options.draft.label ?? ""}
          aria-label="Підпис нового значення"
          onChange={(event) => {
            const label = event.target.value;
            // Keep the machine value in step until the admin edits it directly.
            options.patchDraft(
              options.draft.value === slugify(options.draft.label ?? "")
                ? { label, value: slugify(label) }
                : { label },
            );
          }}
        />
        <Input
          className={`${BASE_CLASS}_code`}
          placeholder="значення"
          value={options.draft.value ?? ""}
          aria-label="Код нового значення"
          onChange={(event) =>
            options.patchDraft({ value: event.target.value })
          }
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          loading={options.isAdding}
          onClick={options.add}
        >
          Додати
        </Button>
      </div>

      {options.draftError && (
        <Typography variant="caption" className={`${BASE_CLASS}_error`}>
          {options.draftError}
        </Typography>
      )}
    </AdminCard>
  );
}

export default AttributeOptionsEditor;
