import Typography from "@/components/controls/Typography/Typography";
import type { ConfiguratorOption } from "@/entities/configurator/types";
import { cn } from "@/lib/utils/cn";
import StepHeading from "../StepHeading/StepHeading";

import "../../ConfiguratorPage.styles.scss";

interface ColorStepProps {
  colors: ConfiguratorOption[];
  selectedValue: string;
  selectedLabel?: string;
  onSelect: (value: string) => void;
}

const BASE_CLASS = "configurator";

function ColorStep({
  colors,
  selectedValue,
  selectedLabel,
  onSelect,
}: ColorStepProps) {
  return (
    <section className={`${BASE_CLASS}_section`}>
      <StepHeading
        step={3}
        title={
          <>
            Колір&nbsp;
            <Typography variant="body1" as="span" color="muted">
              {selectedLabel ? `— ${selectedLabel}` : ""}
            </Typography>
          </>
        }
      />
      <div className={`${BASE_CLASS}_color-grid`}>
        {colors.map((color) => (
          <button
            type="button"
            key={color.id}
            className={cn(`${BASE_CLASS}_color-swatch`, {
              "-active": selectedValue === color.value,
            })}
            style={{ backgroundColor: color.hex ?? "transparent" }}
            onClick={() => onSelect(color.value)}
            aria-label={color.label}
            title={color.label}
          />
        ))}
      </div>
    </section>
  );
}

export default ColorStep;
