"use client";

import { useToast } from "@/components/controls/Toast/ToastProvider";
import Typography from "@/components/controls/Typography/Typography";
import {
  BASE_PRICE,
  NAME_PRICE,
  useConfiguratorOptions,
} from "@/entities/configurator/api";
import { useConfiguratorCart } from "@/entities/configurator/ConfiguratorCartContext";
import AddonStep from "./parts/AddonStep/AddonStep";
import ColorStep from "./parts/ColorStep/ColorStep";
import FabricStep from "./parts/FabricStep/FabricStep";
import NameStep from "./parts/NameStep/NameStep";
import PreviewPanel from "./parts/PreviewPanel/PreviewPanel";
import SizeStep from "./parts/SizeStep/SizeStep";
import StickyBar from "./parts/StickyBar/StickyBar";
import { useConfiguratorStorage } from "./useConfiguratorStorage";

import "./ConfiguratorPage.styles.scss";

const BASE_CLASS = "configurator";

function ConfiguratorPage() {
  const { data: options = [], isLoading } = useConfiguratorOptions();
  const { setItem: setConfiguratorCartItem } = useConfiguratorCart();
  const { toast } = useToast();
  const { config, setConfig } = useConfiguratorStorage();

  const sizes = options.filter((o) => o.type === "size");
  const fabrics = options.filter((o) => o.type === "fabric");
  const colors = options.filter((o) => o.type === "color");
  const addons = options.filter((o) => o.type === "addon");

  const selectedSize = sizes.find((s) => s.value === config.size);
  const selectedFabric = fabrics.find((f) => f.value === config.fabric);
  const selectedColor = colors.find((c) => c.value === config.color);

  const selectedAddons = addons
    .filter((a) => config.addons.has(a.value))
    .map((a) => ({ id: a.value, label: a.label, price: a.price_modifier }));

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const namePrice = config.name.trim() ? NAME_PRICE : 0;
  const total =
    BASE_PRICE +
    (selectedSize?.price_modifier ?? 0) +
    (selectedFabric?.price_modifier ?? 0) +
    addonsTotal +
    namePrice;

  const toggleAddon = (id: string) => {
    setConfig((prev) => {
      const next = new Set(prev.addons);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ...prev, addons: next };
    });
  };

  const configSummary = [
    selectedSize?.label,
    selectedFabric?.label,
    selectedColor?.label,
    config.addons.size > 0 ? `+${config.addons.size} опц.` : null,
    config.name.trim() ? `«${config.name.trim()}»` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const handleAddToCart = () => {
    if (!selectedSize || !selectedFabric || !selectedColor) return;

    setConfiguratorCartItem({
      sizeId: selectedSize.value,
      sizeLabel: selectedSize.label,
      sizeDescription: selectedSize.description ?? "",
      fabricId: selectedFabric.value,
      fabricLabel: selectedFabric.label,
      colorId: selectedColor.value,
      colorLabel: selectedColor.label,
      colorHex: selectedColor.hex ?? "",
      addons: selectedAddons,
      childName: config.name.trim(),
      basePrice: BASE_PRICE,
      sizePrice: selectedSize.price_modifier,
      fabricPrice: selectedFabric.price_modifier,
      addonsTotal,
      namePrice,
      total,
    });

    toast("Вігвам додано до кошика!", "success");
  };

  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_inner`}>
        <div className={`${BASE_CLASS}_header`}>
          <Typography variant="h1" as="h1">
            Конфігуратор вігваму
          </Typography>
          <Typography variant="body2" color="muted">
            Зберіть вігвам під себе — оберіть розмір, тканину, колір та додатки
          </Typography>
        </div>

        <div className={`${BASE_CLASS}_layout`}>
          <PreviewPanel
            selectedColor={selectedColor}
            selectedAddons={selectedAddons}
            childName={config.name.trim()}
            configSummary={configSummary}
          />

          <div className={`${BASE_CLASS}_options`}>
            <SizeStep
              sizes={sizes}
              selectedValue={config.size}
              isLoading={isLoading}
              onSelect={(size) => setConfig((p) => ({ ...p, size }))}
            />
            <FabricStep
              fabrics={fabrics}
              selectedValue={config.fabric}
              onSelect={(fabric) => setConfig((p) => ({ ...p, fabric }))}
            />
            <ColorStep
              colors={colors}
              selectedValue={config.color}
              selectedLabel={selectedColor?.label}
              onSelect={(color) => setConfig((p) => ({ ...p, color }))}
            />
            <AddonStep
              addons={addons}
              selectedIds={config.addons}
              onToggle={toggleAddon}
            />
            <NameStep
              name={config.name}
              namePrice={NAME_PRICE}
              onChange={(name) => setConfig((p) => ({ ...p, name }))}
            />
          </div>
        </div>
      </div>

      <StickyBar
        configSummary={configSummary}
        total={total}
        basePrice={BASE_PRICE}
        showBaseNote={
          (selectedSize?.price_modifier ?? 0) > 0 ||
          (selectedFabric?.price_modifier ?? 0) > 0 ||
          addonsTotal > 0 ||
          namePrice > 0
        }
        disabled={
          isLoading || !selectedSize || !selectedFabric || !selectedColor
        }
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default ConfiguratorPage;
