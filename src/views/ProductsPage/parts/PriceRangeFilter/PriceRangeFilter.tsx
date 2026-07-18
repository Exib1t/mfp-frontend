import type React from "react";

import "../../ProductsPage.styles.scss";

interface PriceRangeFilterProps {
  boundMin: number;
  boundMax: number;
  effMin: number;
  effMax: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

const BASE_CLASS = "products-page";

function PriceRangeFilter({
  boundMin,
  boundMax,
  effMin,
  effMax,
  onMinChange,
  onMaxChange,
}: PriceRangeFilterProps) {
  const range = boundMax - boundMin;
  const minPct = range > 0 ? ((effMin - boundMin) / range) * 100 : 0;
  const maxPct = range > 0 ? ((effMax - boundMin) / range) * 100 : 100;

  return (
    <>
      <div
        className={`${BASE_CLASS}_range-wrap`}
        style={
          {
            "--min-pct": `${minPct}%`,
            "--max-pct": `${maxPct}%`,
          } as React.CSSProperties
        }
      >
        <input
          type="range"
          className={`${BASE_CLASS}_range-input`}
          value={effMin}
          min={boundMin}
          max={boundMax}
          step={1}
          disabled={range === 0}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v < effMax) onMinChange(v);
          }}
          aria-label="Мінімальна ціна"
        />
        <input
          type="range"
          className={`${BASE_CLASS}_range-input`}
          value={effMax}
          min={boundMin}
          max={boundMax}
          step={1}
          disabled={range === 0}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v > effMin) onMaxChange(v);
          }}
          aria-label="Максимальна ціна"
        />
      </div>
      <div className={`${BASE_CLASS}_price-vals`}>
        <span className={`${BASE_CLASS}_price-val`}>
          {effMin.toLocaleString("uk-UA")} ₴
        </span>
        <span className={`${BASE_CLASS}_price-val`}>
          {effMax.toLocaleString("uk-UA")} ₴
        </span>
      </div>
    </>
  );
}

export default PriceRangeFilter;
