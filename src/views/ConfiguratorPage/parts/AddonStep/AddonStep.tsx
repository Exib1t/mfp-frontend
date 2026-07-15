import { Check } from "lucide-react";
import Typography from "@/components/controls/Typography/Typography";
import type { ConfiguratorOption } from "@/entities/configurator/types";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";
import StepHeading from "../StepHeading/StepHeading";

import "../../ConfiguratorPage.styles.scss";

interface AddonStepProps {
  addons: ConfiguratorOption[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
}

const BASE_CLASS = "configurator";

function AddonStep({ addons, selectedIds, onToggle }: AddonStepProps) {
  return (
    <section className={`${BASE_CLASS}_section`}>
      <StepHeading step={4} title="Комплектація" />
      <div className={`${BASE_CLASS}_addon-grid`}>
        {addons.map((addon) => {
          const isSelected = selectedIds.has(addon.value);
          return (
            <button
              type="button"
              key={addon.id}
              className={cn(`${BASE_CLASS}_addon-card`, {
                "-active": isSelected,
              })}
              onClick={() => onToggle(addon.value)}
            >
              <div
                className={cn(`${BASE_CLASS}_addon-check`, {
                  "-checked": isSelected,
                })}
              >
                {isSelected && (
                  <Check size={12} strokeWidth={2.5} aria-hidden="true" />
                )}
              </div>
              <div className={`${BASE_CLASS}_addon-info`}>
                <Typography variant="subtitle2" as="span">
                  {addon.label}
                </Typography>
                <Typography variant="caption" color="muted">
                  {addon.description}
                </Typography>
              </div>
              <Typography
                variant="body2"
                color="primary"
                className={`${BASE_CLASS}_addon-price`}
              >
                +{formatPrice(addon.price_modifier)}
              </Typography>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default AddonStep;
