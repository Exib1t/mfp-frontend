"use client";

import Input from "@/components/controls/Input/Input";
import Select from "@/components/controls/Select/Select";
import type { AdminAttribute } from "@/entities/admin/attributes/types";
import { cn } from "@/lib/utils/cn";
import type { AttributeDraftValue } from "../useProductAttributes";

interface AttributeValueInputProps {
  attribute: AdminAttribute;
  value: AttributeDraftValue;
  onChange: (value: AttributeDraftValue) => void;
}

const BASE_CLASS = "product-attributes";
const EMPTY_OPTION = "";

/** Renders the editor that matches `attribute.type`. */
function AttributeValueInput({
  attribute,
  value,
  onChange,
}: AttributeValueInputProps) {
  const inputId = `attribute-${attribute.id}`;

  switch (attribute.type) {
    case "boolean":
      return (
        <label className={`${BASE_CLASS}_checkbox`} htmlFor={inputId}>
          <input
            id={inputId}
            type="checkbox"
            checked={value === true}
            onChange={(event) => onChange(event.target.checked)}
          />
          <span>{value === true ? "Так" : "Ні"}</span>
        </label>
      );

    case "number":
      return (
        <Input
          id={inputId}
          type="number"
          step="any"
          value={typeof value === "number" ? value : ""}
          onChange={(event) =>
            onChange(
              event.target.value === "" ? null : Number(event.target.value),
            )
          }
        />
      );

    case "date":
      return (
        <Input
          id={inputId}
          type="date"
          value={typeof value === "string" ? value.slice(0, 10) : ""}
          onChange={(event) =>
            onChange(
              event.target.value === ""
                ? null
                : new Date(event.target.value).toISOString(),
            )
          }
        />
      );

    case "multiselect": {
      const selected = Array.isArray(value) ? value : [];
      return (
        <div className={`${BASE_CLASS}_options`}>
          {attribute.options.map((option) => (
            <label
              key={option.id}
              className={cn(`${BASE_CLASS}_chip`, {
                "-selected": selected.includes(option.id),
              })}
            >
              <input
                type="checkbox"
                checked={selected.includes(option.id)}
                onChange={(event) =>
                  onChange(
                    event.target.checked
                      ? [...selected, option.id]
                      : selected.filter((id) => id !== option.id),
                  )
                }
              />
              {option.color_hex && (
                <span
                  className={`${BASE_CLASS}_swatch`}
                  style={{ background: option.color_hex }}
                  aria-hidden="true"
                />
              )}
              {option.label}
            </label>
          ))}
        </div>
      );
    }

    case "select":
    case "color":
    case "image":
      return (
        <Select
          value={typeof value === "number" ? String(value) : EMPTY_OPTION}
          options={[
            { value: EMPTY_OPTION, label: "— не вказано —" },
            ...attribute.options.map((option) => ({
              value: String(option.id),
              label: option.label,
            })),
          ]}
          onChange={(next) =>
            onChange(next === EMPTY_OPTION ? null : Number(next))
          }
          aria-label={attribute.name}
        />
      );

    case "richtext":
      return (
        <Input
          as="textarea"
          id={inputId}
          rows={4}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
        />
      );

    default:
      return (
        <Input
          id={inputId}
          type={attribute.type === "url" ? "url" : "text"}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
        />
      );
  }
}

export default AttributeValueInput;
