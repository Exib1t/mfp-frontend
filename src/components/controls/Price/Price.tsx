import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";

import "./Price.styles.scss";

export type PriceSize = "sm" | "md" | "lg";

interface PriceProps {
  value: number;
  /** Original price. Ignored unless it is strictly higher than `value`. */
  compareAt?: number | null;
  prefix?: string;
  size?: PriceSize;
  className?: string;
}

const BASE_CLASS = "price";

function Price({
  value,
  compareAt = null,
  prefix,
  size = "md",
  className,
}: PriceProps) {
  const original = compareAt !== null && compareAt > value ? compareAt : null;

  return (
    <span
      className={cn(BASE_CLASS, className, { "-sale": original !== null })}
      data-size={size}
    >
      {prefix && <span className={`${BASE_CLASS}_prefix`}>{prefix}</span>}
      <span className={`${BASE_CLASS}_current`}>{formatPrice(value)}</span>
      {original !== null && (
        <span className={`${BASE_CLASS}_original`}>
          {formatPrice(original)}
        </span>
      )}
    </span>
  );
}

export default Price;
