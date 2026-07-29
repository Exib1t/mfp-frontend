"use client";

import Typography from "@/components/controls/Typography/Typography";
import {
  type Attribute,
  CHOICE_ATTRIBUTE_TYPES,
} from "@/entities/attributes/types";
import { cn } from "@/lib/utils/cn";
import NumberRangeFacet from "./NumberRangeFacet";

import "./AttributeFilter.styles.scss";

interface AttributeFilterProps {
  attribute: Attribute;
  picked: string[];
  onToggle: (value: string) => void;
  onRange: (range: string | null) => void;
}

const BASE_CLASS = "attribute-filter";

/** One filterable attribute as a facet block in the catalogue sidebar. */
function AttributeFilter({
  attribute,
  picked,
  onToggle,
  onRange,
}: AttributeFilterProps) {
  const isChoice = CHOICE_ATTRIBUTE_TYPES.includes(attribute.type);

  // Nothing to offer: a select with no options, or a type we cannot filter.
  if (isChoice && attribute.options.length === 0) return null;
  if (
    !isChoice &&
    attribute.type !== "number" &&
    attribute.type !== "boolean"
  ) {
    return null;
  }

  return (
    <div className={BASE_CLASS}>
      <Typography
        variant="overline"
        color="muted"
        className={`${BASE_CLASS}_title`}
      >
        {attribute.name}
        {attribute.unit ? `, ${attribute.unit}` : ""}
      </Typography>

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
    </div>
  );
}

export default AttributeFilter;
