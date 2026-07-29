import { Check } from "lucide-react";
import Image from "next/image";
import Typography from "@/components/controls/Typography/Typography";
import type { ConfiguratorOption } from "@/entities/configurator/types";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";

interface OptionCardListProps {
  options: ConfiguratorOption[];
  picked: string[];
  isMultiple: boolean;
  withImages: boolean;
  onPick: (value: string) => void;
}

const BASE_CLASS = "group-editor";

/** Radio / select / checkbox / image steps all share this card list. */
function OptionCardList({
  options,
  picked,
  isMultiple,
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
            aria-pressed={isPicked}
            onClick={() => onPick(option.value)}
          >
            {withImages && option.image_url && (
              <Image
                className={`${BASE_CLASS}_card-image`}
                src={option.image_url}
                alt=""
                width={72}
                height={72}
              />
            )}

            {isMultiple && (
              <span
                className={cn(`${BASE_CLASS}_check`, { "-on": isPicked })}
                aria-hidden="true"
              >
                {isPicked && <Check size={12} strokeWidth={2.5} />}
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
