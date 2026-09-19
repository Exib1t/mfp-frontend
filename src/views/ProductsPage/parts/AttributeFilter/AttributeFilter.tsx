"use client";

import { ChevronDown } from "lucide-react";
import Typography from "@/components/controls/Typography/Typography";
import {
  type Attribute,
  CHOICE_ATTRIBUTE_TYPES,
  isFilterableAttribute,
} from "@/entities/attributes/types";
import { cn } from "@/lib/utils/cn";
import NumberRangeFacet from "./NumberRangeFacet";

import "./AttributeFilter.styles.scss";

interface AttributeFilterProps {
  attribute: Attribute;
  picked: string[];
  onToggle: (value: string) => void;
  onRange: (range: string | null) => void;
  /**
   * Whether the facet starts expanded. Set once, at mount — after that the
   * `<details>` element owns its own state and React must not fight the
   * buyer over it.
   */
  defaultOpen?: boolean;
}

const BASE_CLASS = "attribute-filter";

/** One filterable attribute as a facet block in the catalogue sidebar. */
function AttributeFilter({
  attribute,
  picked,
  onToggle,
  onRange,
  defaultOpen = true,
}: AttributeFilterProps) {
  const isChoice = CHOICE_ATTRIBUTE_TYPES.includes(attribute.type);

  /* The sidebar filters these out before it lays sections out; this is the
     backstop for any other caller. */
  if (!isFilterableAttribute(attribute)) return null;

  return (
    <details className={BASE_CLASS} {...(defaultOpen && { open: true })}>
      <summary className={`${BASE_CLASS}_summary`}>
        <Typography
          variant="overline"
          color="muted"
          as="span"
          className={`${BASE_CLASS}_title`}
        >
          {attribute.name}
          {attribute.unit ? `, ${attribute.unit}` : ""}
        </Typography>
        <ChevronDown
          className={`${BASE_CLASS}_chevron`}
          size={14}
          strokeWidth={2}
          aria-hidden="true"
        />
      </summary>

      {attribute.type === "number" && (
        <NumberRangeFacet value={picked[0] ?? null} onChange={onRange} />
      )}

      {attribute.type === "boolean" && (
        <label className={`${BASE_CLASS}_check`}>
          <input
            type="checkbox"
            checked={picked.includes("true")}
            onChange={(event) => onRange(event.target.checked ? "true" : null)}
          />
          <span>Так</span>
        </label>
      )}

      {isChoice && attribute.type === "color" && (
        <div className={`${BASE_CLASS}_swatches`}>
          {attribute.options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={cn(`${BASE_CLASS}_swatch`, {
                "-active": picked.includes(option.value),
              })}
              style={{ backgroundColor: option.color_hex ?? "transparent" }}
              aria-label={option.label}
              aria-pressed={picked.includes(option.value)}
              title={option.label}
              onClick={() => onToggle(option.value)}
            />
          ))}
        </div>
      )}

      {isChoice && attribute.type !== "color" && (
        <div className={`${BASE_CLASS}_options`}>
          {attribute.options.map((option) => (
            <label key={option.id} className={`${BASE_CLASS}_check`}>
              <input
                type="checkbox"
                checked={picked.includes(option.value)}
                onChange={() => onToggle(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </details>
  );
}

export default AttributeFilter;
