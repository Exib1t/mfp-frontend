"use client";

import EmptyState from "@/components/controls/EmptyState/EmptyState";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import Typography from "@/components/controls/Typography/Typography";
import { DEFAULT_CONFIGURATOR_SLUG } from "@/entities/configurator/api";
import { useConfiguratorCart } from "@/entities/configurator/ConfiguratorCartContext";
import ConfiguratorStage from "./parts/ConfiguratorStage/ConfiguratorStage";
import { WIGWAM_BASE_IMAGE } from "./parts/ConfiguratorStage/hotspots.config";
import StickyBar from "./parts/StickyBar/StickyBar";
import { buildHotspots, stageDecorations } from "./stage.helpers";
import { useConfiguratorBuild } from "./useConfiguratorBuild";

import "./ConfiguratorPage.styles.scss";

interface ConfiguratorPageProps {
  /** Preset to build. Defaults to the standalone wigwam configurator. */
  slug?: string;
}

const BASE_CLASS = "configurator";

function ConfiguratorPage({
  slug = DEFAULT_CONFIGURATOR_SLUG,
}: ConfiguratorPageProps) {
  const build = useConfiguratorBuild(slug);
  const { setItem: setConfiguratorCartItem } = useConfiguratorCart();
  const { toast } = useToast();

  if (build.isError) {
    return <EmptyState title="Конфігуратор недоступний" titleAs="h1" />;
  }

  const { overlayColor, caption, tags } = stageDecorations(build.selections);

  const handleAddToCart = () => {
    const item = build.toCartItem();
    if (!item) return;

    setConfiguratorCartItem(item);
    toast(`${item.configuratorName} додано до кошика!`, "success");
  };

  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_inner`}>
        <div className={`${BASE_CLASS}_header`}>
          <Typography variant="h1" as="h1">
            {build.configurator?.name ?? "Конфігуратор"}
          </Typography>
          <Typography variant="body2" color="muted">
            {build.configurator?.description ??
              "Натисніть на позначку, щоб змінити крок збірки"}
          </Typography>
        </div>

        <ConfiguratorStage
          imageUrl={WIGWAM_BASE_IMAGE}
          imageKey={slug}
          overlayColor={overlayColor}
          caption={caption}
          tags={tags}
          hotspots={buildHotspots(build)}
          openId={build.openId}
          onToggle={build.toggleHotspot}
          onClose={build.closeHotspot}
        />
      </div>

      <StickyBar
        configSummary={build.summary}
        total={build.total}
        basePrice={build.basePrice}
        showBaseNote={build.total > build.basePrice}
        disabled={build.isLoading || build.missing.length > 0}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default ConfiguratorPage;
