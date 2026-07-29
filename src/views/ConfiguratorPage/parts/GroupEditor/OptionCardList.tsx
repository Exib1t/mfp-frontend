import { Check } from "lucide-react";
import RemoteImage from "@/components/common/RemoteImage/RemoteImage";
import Typography from "@/components/controls/Typography/Typography";
import type { ConfiguratorOption } from "@/entities/configurator/types";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";

/** What sits to the left of each row and says how many picks are allowed. */
export type OptionMarker = "radio" | "check" | "none";

interface OptionCardListProps {
  options: ConfiguratorOption[];
  picked: string[];
  marker: OptionMarker;
  withImages: boolean;
  onPick: (value: string) => void;
}

const BASE_CLASS = "group-editor";

/** Row list shared by the radio, checkbox and image steps. */
function OptionCardList({
  options,
  picked,
  marker,
  withImages,
  onPick,
}: OptionCardListProps) {
  return (
    <div className={`${BASE_CLASS}_cards`} data-images={withImages}>
      {options.map((option) => {
        const isPicked = picked.includes(option.value);

        return (
          <button
            type="button"
            key={option.id}
            className={cn(`${BASE_CLASS}_card`, { "-active": isPicked })}
            // Toggle buttons rather than role=radio/checkbox: the role would
            // have to be computed per marker, and a dynamic role defeats the
            // a11y lint. `aria-pressed` conveys the same state on a button.
            aria-pressed={isPicked}
            onClick={() => onPick(option.value)}
          >
            {withImages && option.image_url && (
              <RemoteImage
                className={`${BASE_CLASS}_card-image`}
                src={option.image_url}
                alt=""
                width={72}
                height={72}
              />
            )}

            {marker !== "none" && (
              <span
                className={cn(`${BASE_CLASS}_marker`, `-${marker}`, {
                  "-on": isPicked,
                })}
                aria-hidden="true"
              >
                {marker === "check" && isPicked && (
                  <Check size={12} strokeWidth={3} />
                )}
              </span>
            )}

            <span className={`${BASE_CLASS}_card-text`}>
              <Typography variant="subtitle2" as="span">
                {option.label}
              </Typography>
              {option.description && (
                <Typography variant="caption" color="muted">
                  {option.description}
                </Typography>
              )}
            </span>

            {option.price_modifier !== 0 && (
              <Typography variant="body2" color="primary">
                {option.price_modifier > 0 ? "+" : ""}
                {formatPrice(option.price_modifier)}
              </Typography>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default OptionCardList;
