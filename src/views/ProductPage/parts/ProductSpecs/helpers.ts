import type { ProductAttribute } from "@/entities/products/types";

export interface AttributeGroup {
  /** Empty string for attributes with no `group_name`. */
  name: string;
  attributes: ProductAttribute[];
}

/** Buckets attributes by `group_name`, preserving the server-side order. */
export function groupAttributes(
  attributes: ProductAttribute[],
): AttributeGroup[] {
  const visible = attributes.filter(
    (attribute) => renderAttributeValue(attribute) !== null,
  );

  const groups: AttributeGroup[] = [];
  for (const attribute of visible) {
    const name = attribute.group_name ?? "";
    const existing = groups.find((group) => group.name === name);
    if (existing) existing.attributes.push(attribute);
    else groups.push({ name, attributes: [attribute] });
  }

  return groups;
}

/** Flattens a typed attribute value into display text, or null when empty. */
export function renderAttributeValue(
  attribute: ProductAttribute,
): string | null {
  const { value, unit } = attribute;

  if (value === null || value === undefined) return null;

  if (Array.isArray(value)) {
    const labels = value.map((option) => option.label).filter(Boolean);
    return labels.length > 0 ? labels.join(", ") : null;
  }

  if (typeof value === "object") {
    return value.label || null;
  }

  if (typeof value === "boolean") return value ? "Так" : "Ні";

  const text = String(value).trim();
  if (!text) return null;

  return unit ? `${text} ${unit}` : text;
}
