import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils/cn";

import "./QuantityStepper.styles.scss";

export type QuantityStepperSize = "sm" | "md";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: QuantityStepperSize;
  className?: string;
}

const BASE_CLASS = "quantity-stepper";

function QuantityStepper({
  value,
  onChange,
  min = 1,
  max,
  size = "md",
  className,
}: QuantityStepperProps) {
  const iconSize = size === "sm" ? 14 : 16;

  return (
    <div className={cn(BASE_CLASS, className)} data-size={size}>
      <button
        type="button"
        className={`${BASE_CLASS}_btn`}
        aria-label="Зменшити"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus size={iconSize} strokeWidth={2} />
      </button>
      <span className={`${BASE_CLASS}_value`}>{value}</span>
      <button
        type="button"
        className={`${BASE_CLASS}_btn`}
        aria-label="Збільшити"
        disabled={max !== undefined && value >= max}
        onClick={() =>
          onChange(max !== undefined ? Math.min(max, value + 1) : value + 1)
        }
      >
        <Plus size={iconSize} strokeWidth={2} />
      </button>
    </div>
  );
}

export default QuantityStepper;
