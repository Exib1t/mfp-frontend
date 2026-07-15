import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

import "./RatingStars.styles.scss";

export type RatingStarsSize = "sm" | "md";

interface RatingStarsProps {
  value: number;
  onChange?: (value: number) => void;
  size?: RatingStarsSize;
  className?: string;
}

const BASE_CLASS = "rating-stars";
const STAR_VALUES = [1, 2, 3, 4, 5];

function RatingStars({
  value,
  onChange,
  size = "sm",
  className,
}: RatingStarsProps) {
  const iconSize = size === "sm" ? 15 : 22;

  if (!onChange) {
    return (
      <span
        className={cn(BASE_CLASS, className)}
        data-size={size}
        role="img"
        aria-label={`Оцінка ${value} з 5`}
      >
        {STAR_VALUES.map((v) => (
          <Star
            key={v}
            size={iconSize}
            strokeWidth={2}
            className={cn(`${BASE_CLASS}_star`, { "-filled": v <= value })}
          />
        ))}
      </span>
    );
  }

  return (
    <div
      className={cn(BASE_CLASS, className, { "-interactive": true })}
      data-size={size}
    >
      {STAR_VALUES.map((v) => (
        <button
          key={v}
          type="button"
          className={cn(`${BASE_CLASS}_btn`, { "-active": v <= value })}
          onClick={() => onChange(v)}
          aria-label={`${v} з 5`}
        >
          <Star size={iconSize} strokeWidth={2} />
        </button>
      ))}
    </div>
  );
}

export default RatingStars;
