"use client";

import Input from "@/components/controls/Input/Input";

interface NumberRangeFacetProps {
  /** Stored as the API's `min..max` string, or null when unset. */
  value: string | null;
  onChange: (range: string | null) => void;
}

const BASE_CLASS = "attribute-filter";

function parse(value: string | null): [string, string] {
  if (!value) return ["", ""];
  const [min = "", max = ""] = value.split("..");
  return [min, max];
}

/** Two boxes that serialise to the `80..120` form the API parses. */
function NumberRangeFacet({ value, onChange }: NumberRangeFacetProps) {
  const [min, max] = parse(value);

  const emit = (nextMin: string, nextMax: string) => {
    const from = nextMin.trim();
    const to = nextMax.trim();
    onChange(from || to ? `${from}..${to}` : null);
  };

  return (
    <div className={`${BASE_CLASS}_range`}>
      <Input
        type="number"
        placeholder="від"
        aria-label="Від"
        value={min}
        onChange={(event) => emit(event.target.value, max)}
      />
      <span aria-hidden="true">—</span>
      <Input
        type="number"
        placeholder="до"
        aria-label="До"
        value={max}
        onChange={(event) => emit(min, event.target.value)}
      />
    </div>
  );
}

export default NumberRangeFacet;
