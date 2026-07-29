import Typography from "@/components/controls/Typography/Typography";
import type { ConfiguratorOption } from "@/entities/configurator/types";
import { cn } from "@/lib/utils/cn";

interface SwatchGridProps {
  options: ConfiguratorOption[];
  picked: string[];
  onPick: (value: string) => void;
}

const BASE_CLASS = "group-editor";

/** Colour tiles. The chosen label is spelled out under the grid. */
function SwatchGrid({ options, picked, onPick }: SwatchGridProps) {
  const chosen = options.find((option) => picked.includes(option.value));

  return (
    <>
      <div className={`${BASE_CLASS}_swatches`}>
        {options.map((option) => (
          <button
            type="button"
            key={option.id}
            className={cn(`${BASE_CLASS}_swatch`, {
              "-active": picked.includes(option.value),
            })}
            style={{ backgroundColor: option.color_hex ?? "transparent" }}
            aria-label={option.label}
            aria-pressed={picked.includes(option.value)}
            title={option.label}
            onClick={() => onPick(option.value)}
          />
        ))}
      </div>

      {chosen && (
        <Typography variant="caption" color="muted">
          {chosen.label}
        </Typography>
      )}
    </>
  );
}

export default SwatchGrid;
