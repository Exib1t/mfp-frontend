import type { components } from "@/lib/api/v1";

export type Configurator = components["schemas"]["ConfiguratorDto"];
export type ConfiguratorGroup = Configurator["groups"][number];
export type ConfiguratorOption = ConfiguratorGroup["options"][number];
export type ConfiguratorGroupUi = ConfiguratorGroup["ui"];

/**
 * What the buyer picked in one step. `text` groups store the typed string in
 * `label` and leave `value` empty; option groups store the option's `value`.
 */
export interface ConfiguratorSelection {
  groupCode: string;
  groupLabel: string;
  value: string;
  label: string;
  price: number;
  colorHex?: string | null;
  imageUrl?: string | null;
}

/** One built product waiting in the cart. */
export interface ConfiguratorCartItem {
  configuratorSlug: string;
  configuratorName: string;
  basePrice: number;
  selections: ConfiguratorSelection[];
  total: number;
}

/**
 * Live editor state: option groups hold the chosen `value`s (several only when
 * the group allows it), text groups hold the raw string under the same key.
 */
export type ConfiguratorChoices = Record<string, string[]>;

/** UIs whose choices come from the option list rather than buyer input. */
export const OPTION_BACKED_UI: ConfiguratorGroupUi[] = [
  "radio",
  "swatch",
  "image",
  "select",
  "checkbox",
];

/**
 * "Прапорці" is the multi-pick step by definition. The stored flag is still
 * honoured so presets saved before that rule keep working.
 */
export function isMultiGroup(group: ConfiguratorGroup): boolean {
  return group.is_multiple || group.ui === "checkbox";
}
