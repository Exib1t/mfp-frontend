import Image from "next/image";
import Typography from "@/components/controls/Typography/Typography";
import type { ConfiguratorOption } from "@/entities/configurator/types";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";
import StepHeading from "../StepHeading/StepHeading";

import "../../ConfiguratorPage.styles.scss";

interface FabricStepProps {
  fabrics: ConfiguratorOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const BASE_CLASS = "configurator";

function FabricStep({ fabrics, selectedValue, onSelect }: FabricStepProps) {
  return (
    <section className={`${BASE_CLASS}_section`}>
      <StepHeading step={2} title="Тканина" />
      <div className={`${BASE_CLASS}_fabric-grid`}>
        {fabrics.map((fabric) => (
          <button
            type="button"
            key={fabric.id}
            className={cn(`${BASE_CLASS}_fabric-card`, {
              "-active": selectedValue === fabric.value,
            })}
            onClick={() => onSelect(fabric.value)}
          >
            <div className={`${BASE_CLASS}_fabric-card-img-wrap`}>
              {fabric.image_url && (
                <Image
                  src={fabric.image_url}
                  alt={fabric.label}
                  fill
                  sizes="160px"
                  className={`${BASE_CLASS}_fabric-card-img`}
                />
              )}
            </div>
            <div className={`${BASE_CLASS}_fabric-card-info`}>
              <Typography variant="subtitle2" as="span">
                {fabric.label}
              </Typography>
              <Typography variant="caption" color="muted">
                {fabric.description}
              </Typography>
              {fabric.price_modifier > 0 && (
                <Typography variant="caption" color="primary">
                  +{formatPrice(fabric.price_modifier)}
                </Typography>
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default FabricStep;
