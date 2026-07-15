import type { ConfiguratorOption } from "@/entities/configurator/types";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";
import StepHeading from "../StepHeading/StepHeading";

import "../../ConfiguratorPage.styles.scss";

interface SizeStepProps {
  sizes: ConfiguratorOption[];
  selectedValue: string;
  isLoading: boolean;
  onSelect: (value: string) => void;
}

const BASE_CLASS = "configurator";

function SizeStep({
  sizes,
  selectedValue,
  isLoading,
  onSelect,
}: SizeStepProps) {
  return (
    <section className={`${BASE_CLASS}_section`}>
      <StepHeading step={1} title="Розмір" />
      <div className={cn(`${BASE_CLASS}_size-grid`, { "-loading": isLoading })}>
        {sizes.map((size) => (
          <button
            type="button"
            key={size.id}
            className={cn(`${BASE_CLASS}_size-card`, {
              "-active": selectedValue === size.value,
            })}
            onClick={() => onSelect(size.value)}
          >
            <span className={`${BASE_CLASS}_size-card-label`}>
              {size.label}
            </span>
            <span className={`${BASE_CLASS}_size-card-desc`}>
              {size.description}
            </span>
            <span className={`${BASE_CLASS}_size-card-dims`}>
              {size.dimensions}
            </span>
            {size.price_modifier > 0 && (
              <span className={`${BASE_CLASS}_size-card-price`}>
                +{formatPrice(size.price_modifier)}
              </span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

export default SizeStep;
