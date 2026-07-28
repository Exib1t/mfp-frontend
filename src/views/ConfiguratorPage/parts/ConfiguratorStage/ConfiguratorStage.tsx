import Image from "next/image";
import type { ReactNode } from "react";
import Typography from "@/components/controls/Typography/Typography";
import type { ConfiguratorAddonInCart } from "@/entities/configurator/types";
import HotspotChip from "./HotspotChip";
import type { HotspotConfig, HotspotId } from "./hotspots.config";

import "./ConfiguratorStage.styles.scss";

export interface StageHotspot {
  config: HotspotConfig;
  /** Current selected value label shown on the chip. */
  value?: string;
  /** Editor content for the popover. */
  editor: ReactNode;
}

interface ConfiguratorStageProps {
  imageUrl?: string | null;
  imageKey?: string;
  overlayColor?: string;
  childName: string;
  selectedAddons: ConfiguratorAddonInCart[];
  hotspots: StageHotspot[];
  openId: HotspotId | null;
  onToggle: (id: HotspotId) => void;
  onClose: () => void;
}

const BASE_CLASS = "cfg-stage";

function ConfiguratorStage({
  imageUrl,
  imageKey,
  overlayColor,
  childName,
  selectedAddons,
  hotspots,
  openId,
  onToggle,
  onClose,
}: ConfiguratorStageProps) {
  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_image-wrap`}>
        {imageUrl && (
          <Image
            className={`${BASE_CLASS}_image`}
            src={imageUrl}
            alt="Превью вігваму"
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            key={imageKey}
            loading="eager"
          />
        )}
        <div
          className={`${BASE_CLASS}_overlay`}
          style={{ backgroundColor: overlayColor ?? "transparent" }}
        />

        {selectedAddons.length > 0 && (
          <div className={`${BASE_CLASS}_addon-tags`}>
            {selectedAddons.map((addon) => (
              <span key={addon.id} className={`${BASE_CLASS}_addon-tag`}>
                {addon.label}
              </span>
            ))}
          </div>
        )}

        {childName && (
          <div className={`${BASE_CLASS}_name-badge`}>
            <Typography variant="caption">✦ {childName}</Typography>
          </div>
        )}

        <div className={`${BASE_CLASS}_hotspots`}>
          {hotspots.map(({ config, value, editor }) => (
            <HotspotChip
              key={config.id}
              hotspot={config}
              value={value}
              isOpen={openId === config.id}
              onToggle={() => onToggle(config.id)}
              onClose={onClose}
            >
              {editor}
            </HotspotChip>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ConfiguratorStage;
