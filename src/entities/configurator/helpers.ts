import type {
  Configurator,
  ConfiguratorChoices,
  ConfiguratorGroup,
  ConfiguratorSelection,
} from "./types";
import { OPTION_BACKED_UI } from "./types";

/** Steps a buyer actually sees: switched on, and not empty when option-backed. */
export function visibleGroups(
  configurator: Configurator | undefined,
): ConfiguratorGroup[] {
  if (!configurator) return [];

  return configurator.groups.filter(
    (group) =>
      group.is_active &&
      (!OPTION_BACKED_UI.includes(group.ui) ||
        group.options.some((option) => option.is_active)),
  );
}

export function activeOptions(group: ConfiguratorGroup) {
  return group.options.filter((option) => option.is_active);
}

/** Pre-selects each group's default (or its first choice when required). */
export function initialChoices(
  groups: ConfiguratorGroup[],
): ConfiguratorChoices {
  const choices: ConfiguratorChoices = {};

  for (const group of groups) {
    if (!OPTION_BACKED_UI.includes(group.ui)) {
      choices[group.code] = [];
      continue;
    }

    const options = activeOptions(group);
    const preset = options.filter((option) => option.is_default);

    if (preset.length > 0) {
      choices[group.code] = preset.map((option) => option.value);
    } else if (group.is_required && !group.is_multiple && options[0]) {
      choices[group.code] = [options[0].value];
    } else {
      choices[group.code] = [];
    }
  }

  return choices;
}

/** Flattens the live choices into cart-ready rows, priced per row. */
export function toSelections(
  groups: ConfiguratorGroup[],
  choices: ConfiguratorChoices,
): ConfiguratorSelection[] {
  return groups.flatMap((group) => {
    const picked = choices[group.code] ?? [];

    if (!OPTION_BACKED_UI.includes(group.ui)) {
      const text = picked[0]?.trim();
      if (!text) return [];

      return [
        {
          groupCode: group.code,
          groupLabel: group.label,
          value: text,
          label: text,
          price: group.price_modifier,
        },
      ];
    }

    return activeOptions(group)
      .filter((option) => picked.includes(option.value))
      .map((option) => ({
        groupCode: group.code,
        groupLabel: group.label,
        value: option.value,
        label: option.label,
        price: option.price_modifier,
        colorHex: option.color_hex,
        imageUrl: option.image_url,
      }));
  });
}

export function totalOf(
  basePrice: number,
  selections: ConfiguratorSelection[],
) {
  return selections.reduce(
    (sum, selection) => sum + selection.price,
    basePrice,
  );
}

/** Required steps the buyer has not answered yet. */
export function missingGroups(
  groups: ConfiguratorGroup[],
  choices: ConfiguratorChoices,
): ConfiguratorGroup[] {
  return groups.filter((group) => {
    if (!group.is_required) return false;
    const picked = choices[group.code] ?? [];
    return picked.filter((entry) => entry.trim() !== "").length === 0;
  });
}

/** "M · Льон · Кремовий · +2 опц." */
export function summarise(selections: ConfiguratorSelection[]): string {
  return selections.map((selection) => selection.label).join(" · ");
}
