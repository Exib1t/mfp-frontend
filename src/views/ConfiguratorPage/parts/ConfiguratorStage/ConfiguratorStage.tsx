import Image from "next/image";
import type { ReactNode } from "react";
import Typography from "@/components/controls/Typography/Typography";
import HotspotChip from "./HotspotChip";
import type { HotspotConfig } from "./hotspots.config";

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
  /** Tint from the chosen swatch, if the preset has a colour step. */
  overlayColor?: string | null;
  /** Free text the buyer entered, shown as a badge on the photo. */
  caption?: string;
  /** Extra picks worth showing on the photo, e.g. accessories. */
  tags?: { id: string; label: string }[];
  hotspots: StageHotspot[];
  openId: string | null;
  onToggle: (id: string) => void;
  onClose: () => void;
}

const BASE_CLASS = "cfg-stage";

function ConfiguratorStage({
  imageUrl,
  imageKey,
  overlayColor,
  caption,
  tags = [],
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
            alt="Превʼю збірки"
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

        {tags.length > 0 && (
          <div className={`${BASE_CLASS}_addon-tags`}>
            {tags.map((tag) => (
              <span key={tag.id} className={`${BASE_CLASS}_addon-tag`}>
                {tag.label}
              </span>
            ))}
          </div>
        )}

        {caption && (
          <div className={`${BASE_CLASS}_name-badge`}>
            <Typography variant="caption">✦ {caption}</Typography>
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
