import Image from "next/image";
import Typography from "@/components/controls/Typography/Typography";
import type {
  ConfiguratorAddonInCart,
  ConfiguratorOption,
} from "@/entities/configurator/types";

import "../../ConfiguratorPage.styles.scss";

interface PreviewPanelProps {
  selectedColor?: ConfiguratorOption;
  selectedAddons: ConfiguratorAddonInCart[];
  childName: string;
  configSummary: string;
}

const BASE_CLASS = "configurator";

function PreviewPanel({
  selectedColor,
  selectedAddons,
  childName,
  configSummary,
}: PreviewPanelProps) {
  return (
    <div className={`${BASE_CLASS}_preview`}>
      <div className={`${BASE_CLASS}_preview-image-wrap`}>
        {selectedColor?.image_url && (
          <Image
            className={`${BASE_CLASS}_preview-image`}
            src={selectedColor.image_url}
            alt="Превью вігваму"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            key={selectedColor.value}
            loading="eager"
          />
        )}
        <div
          className={`${BASE_CLASS}_preview-overlay`}
          style={{ backgroundColor: selectedColor?.hex ?? "transparent" }}
        />
        {selectedAddons.length > 0 && (
          <div className={`${BASE_CLASS}_preview-addon-tags`}>
            {selectedAddons.map((addon) => (
              <span
                key={addon.id}
                className={`${BASE_CLASS}_preview-addon-tag`}
              >
                {addon.label}
              </span>
            ))}
          </div>
        )}
        {childName && (
          <div className={`${BASE_CLASS}_preview-name-badge`}>
            <Typography variant="caption">✦ {childName}</Typography>
          </div>
        )}
      </div>

      <div className={`${BASE_CLASS}_preview-summary`}>
        <Typography
          variant="caption"
          color="muted"
          className={`${BASE_CLASS}_preview-config-text`}
        >
          {configSummary}
        </Typography>
      </div>
    </div>
  );
}

export default PreviewPanel;
