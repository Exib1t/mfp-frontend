"use client";

import Select from "@/components/controls/Select/Select";
import type { ConfiguratorOption } from "@/entities/configurator/types";
import { formatPrice } from "@/lib/utils/formatPrice";

interface OptionSelectProps {
  options: ConfiguratorOption[];
  picked: string[];
  label: string;
  isRequired: boolean;
  onPick: (value: string) => void;
}

const EMPTY_VALUE = "";

/**
 * Dropdown variant of a single-choice step — for long lists, where a row per
 * option would swamp the popover. The surcharge is folded into the label
 * because a native-looking option row has nowhere else to put it.
 */
function OptionSelect({
  options,
  picked,
  label,
  isRequired,
  onPick,
}: OptionSelectProps) {
  const items = options.map((option) => ({
    value: option.value,
    label:
      option.price_modifier === 0
        ? option.label
        : `${option.label} · ${option.price_modifier > 0 ? "+" : ""}${formatPrice(option.price_modifier)}`,
  }));

  return (
    <Select
      value={picked[0] ?? EMPTY_VALUE}
      options={
        isRequired
          ? items
          : [{ value: EMPTY_VALUE, label: "— не обрано —" }, ...items]
      }
      onChange={onPick}
      aria-label={label}
    />
  );
}

export default OptionSelect;
