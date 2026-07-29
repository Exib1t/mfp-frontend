import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

import "./StatusStepper.styles.scss";

export interface StatusStep<T extends string> {
  id: T;
  label: string;
}

interface StatusStepperProps<T extends string> {
  steps: StatusStep<T>[];
  current: T;
  /** Renders the whole track as void — used when an order is cancelled. */
  isVoided?: boolean;
  voidedLabel?: string;
  onSelect?: (id: T) => void;
  className?: string;
}

const BASE_CLASS = "status-stepper";

/** Horizontal pipeline: everything up to `current` reads as done. */
function StatusStepper<T extends string>({
  steps,
  current,
  isVoided = false,
  voidedLabel,
  onSelect,
  className,
}: StatusStepperProps<T>) {
  const currentIndex = steps.findIndex((step) => step.id === current);

  return (
    <ol className={cn(BASE_CLASS, className, { "-voided": isVoided })}>
      {steps.map((step, index) => {
        const isDone = !isVoided && index < currentIndex;
        const isCurrent = !isVoided && index === currentIndex;

        return (
          <li key={step.id}>
            <button
              type="button"
              className={cn(`${BASE_CLASS}_step`, {
                "-done": isDone,
                "-current": isCurrent,
              })}
              aria-current={isCurrent ? "step" : undefined}
              disabled={!onSelect || isVoided}
              onClick={() => onSelect?.(step.id)}
            >
              <span className={`${BASE_CLASS}_dot`} aria-hidden="true">
                {isDone ? <Check size={12} strokeWidth={3} /> : index + 1}
              </span>
              <span className={`${BASE_CLASS}_label`}>{step.label}</span>
            </button>
          </li>
        );
      })}

      {isVoided && voidedLabel && (
        <li className={`${BASE_CLASS}_voided`}>{voidedLabel}</li>
      )}
    </ol>
  );
}

export default StatusStepper;
