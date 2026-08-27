import type { components } from "@/lib/api/v1";

export type Attribute = components["schemas"]["AttributeDto"];
export type AttributeOption = Attribute["options"][number];
export type AttributeType = Attribute["type"];

/** Attribute types the catalogue filters as a list of option values. */
export const CHOICE_ATTRIBUTE_TYPES: AttributeType[] = [
  "select",
  "multiselect",
  "color",
];

/**
 * Active facets, keyed by attribute code. Option-backed attributes hold the
 * chosen values; a number attribute holds a single `min..max` entry.
 */
export type AttributeFacets = Record<string, string[]>;

/** Serialises facets into the `attributes[code]=a,b` shape the API expects. */
export function facetsToQuery(
  facets: AttributeFacets,
): Record<string, string> | undefined {
  const entries = Object.entries(facets).filter(
    ([, values]) => values.length > 0,
  );
  if (entries.length === 0) return undefined;

  return Object.fromEntries(
    entries.map(([code, values]) => [code, values.join(",")]),
  );
}

export function countActiveFacets(facets: AttributeFacets): number {
  return Object.values(facets).reduce((sum, values) => sum + values.length, 0);
}
