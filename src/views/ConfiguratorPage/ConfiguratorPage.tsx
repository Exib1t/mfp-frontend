"use client";

import { Check, ChevronLeft, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/controls/Button/Button";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import Typography from "@/components/controls/Typography/Typography";
import { BASE_PRICE, NAME_PRICE, useConfiguratorOptions } from "@/entities/configurator/api";
import { useConfiguratorCart } from "@/entities/configurator/ConfiguratorCartContext";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";

import "./ConfiguratorPage.styles.scss";

/* ─── Types ──────────────────────────────────────────── */

interface ConfigState {
  size: string;
  fabric: string;
  color: string;
  addons: Set<string>;
  name: string;
}

const DEFAULT_CONFIG: ConfigState = {
  size: "m",
  fabric: "cotton",
  color: "cream",
  addons: new Set(),
  name: "",
};

const STORAGE_KEY = "mfp-configurator";

function loadConfig(): ConfigState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw) as Omit<ConfigState, "addons"> & {
      addons: string[];
    };
    return { ...parsed, addons: new Set(parsed.addons ?? []) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

/* ─── Component ──────────────────────────────────────── */

const BASE_CLASS = "configurator";

function ConfiguratorPage() {
  const { data: options = [], isLoading } = useConfiguratorOptions();
  const { setItem: setConfiguratorCartItem } = useConfiguratorCart();
  const { toast } = useToast();

  const [config, setConfig] = useState<ConfigState>(DEFAULT_CONFIG);
  const [configReady, setConfigReady] = useState(false);

  // Hydrate from localStorage after mount to avoid SSR mismatch.
  useEffect(() => {
    setConfig(loadConfig());
    setConfigReady(true);
  }, []);

  // Persist to localStorage on every change.
  useEffect(() => {
    if (!configReady) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...config, addons: [...config.addons] }),
    );
  }, [config, configReady]);

  const sizes = options.filter((o) => o.type === "size");
  const fabrics = options.filter((o) => o.type === "fabric");
  const colors = options.filter((o) => o.type === "color");
  const addons = options.filter((o) => o.type === "addon");

  const selectedSize = sizes.find((s) => s.value === config.size);
  const selectedFabric = fabrics.find((f) => f.value === config.fabric);
  const selectedColor = colors.find((c) => c.value === config.color);

  const addonsTotal = [...config.addons].reduce(
    (sum, id) =>
      sum + (addons.find((a) => a.value === id)?.price_modifier ?? 0),
    0,
  );
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

    const selectedAddons = addons
      .filter((a) => config.addons.has(a.value))
      .map((a) => ({ id: a.value, label: a.label, price: a.price_modifier }));

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
          {/* ─── Preview (sticky) ─── */}
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
                style={{
                  backgroundColor: selectedColor?.hex ?? "transparent",
                }}
              />
              {config.addons.size > 0 && (
                <div className={`${BASE_CLASS}_preview-addon-tags`}>
                  {[...config.addons].map((id) => {
                    const addon = addons.find((a) => a.value === id);
                    return addon ? (
                      <span
                        key={id}
                        className={`${BASE_CLASS}_preview-addon-tag`}
                      >
                        {addon.label}
                      </span>
                    ) : null;
                  })}
                </div>
              )}
              {config.name.trim() && (
                <div className={`${BASE_CLASS}_preview-name-badge`}>
                  <Typography variant="caption">
                    ✦ {config.name.trim()}
                  </Typography>
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

          {/* ─── Options (scrolls) ─── */}
          <div className={`${BASE_CLASS}_options`}>
            {/* Step 1 — Size */}
            <section className={`${BASE_CLASS}_section`}>
              <div className={`${BASE_CLASS}_section-heading`}>
                <Typography
                  variant="overline"
                  color="muted"
                  className={`${BASE_CLASS}_section-step`}
                >
                  Крок 1
                </Typography>
                <Typography variant="h4" as="h2">
                  Розмір
                </Typography>
              </div>
              <div className={cn(`${BASE_CLASS}_size-grid`, { "-loading": isLoading })}>
                {sizes.map((size) => (
                  <button
                    type="button"
                    key={size.id}
                    className={cn(`${BASE_CLASS}_size-card`, {
                      "-active": config.size === size.value,
                    })}
                    onClick={() =>
                      setConfig((p) => ({ ...p, size: size.value }))
                    }
                  >
                    <span className={`${BASE_CLASS}_size-card-label`}>
                      {size.label}
                    </span>
                    <span className={`${BASE_CLASS}_size-card-desc`}>
                      {size.description}
                    </span>
                    <span className={`${BASE_CLASS}_size-card-dims`}>
                      {size.dimensions}
                    </span>
                    {size.price_modifier > 0 && (
                      <span className={`${BASE_CLASS}_size-card-price`}>
                        +{formatPrice(size.price_modifier)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Step 2 — Fabric */}
            <section className={`${BASE_CLASS}_section`}>
              <div className={`${BASE_CLASS}_section-heading`}>
                <Typography
                  variant="overline"
                  color="muted"
                  className={`${BASE_CLASS}_section-step`}
                >
                  Крок 2
                </Typography>
                <Typography variant="h4" as="h2">
                  Тканина
                </Typography>
              </div>
              <div className={`${BASE_CLASS}_fabric-grid`}>
                {fabrics.map((fabric) => (
                  <button
                    type="button"
                    key={fabric.id}
                    className={cn(`${BASE_CLASS}_fabric-card`, {
                      "-active": config.fabric === fabric.value,
                    })}
                    onClick={() =>
                      setConfig((p) => ({ ...p, fabric: fabric.value }))
                    }
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

            {/* Step 3 — Color */}
            <section className={`${BASE_CLASS}_section`}>
              <div className={`${BASE_CLASS}_section-heading`}>
                <Typography
                  variant="overline"
                  color="muted"
                  className={`${BASE_CLASS}_section-step`}
                >
                  Крок 3
                </Typography>
                <Typography variant="h4" as="h2">
                  Колір&nbsp;
                  <Typography variant="body1" as="span" color="muted">
                    {selectedColor ? `— ${selectedColor.label}` : ""}
                  </Typography>
                </Typography>
              </div>
              <div className={`${BASE_CLASS}_color-grid`}>
                {colors.map((color) => (
                  <button
                    type="button"
                    key={color.id}
                    className={cn(`${BASE_CLASS}_color-swatch`, {
                      "-active": config.color === color.value,
                    })}
                    style={{ backgroundColor: color.hex ?? "transparent" }}
                    onClick={() =>
                      setConfig((p) => ({ ...p, color: color.value }))
                    }
                    aria-label={color.label}
                    title={color.label}
                  />
                ))}
              </div>
            </section>

            {/* Step 4 — Addons */}
            <section className={`${BASE_CLASS}_section`}>
              <div className={`${BASE_CLASS}_section-heading`}>
                <Typography
                  variant="overline"
                  color="muted"
                  className={`${BASE_CLASS}_section-step`}
                >
                  Крок 4
                </Typography>
                <Typography variant="h4" as="h2">
                  Комплектація
                </Typography>
              </div>
              <div className={`${BASE_CLASS}_addon-grid`}>
                {addons.map((addon) => {
                  const isSelected = config.addons.has(addon.value);
                  return (
                    <button
                      type="button"
                      key={addon.id}
                      className={cn(`${BASE_CLASS}_addon-card`, {
                        "-active": isSelected,
                      })}
                      onClick={() => toggleAddon(addon.value)}
                    >
                      <div
                        className={cn(`${BASE_CLASS}_addon-check`, {
                          "-checked": isSelected,
                        })}
                      >
                        {isSelected && (
                          <Check
                            size={12}
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div className={`${BASE_CLASS}_addon-info`}>
                        <Typography variant="subtitle2" as="span">
                          {addon.label}
                        </Typography>
                        <Typography variant="caption" color="muted">
                          {addon.description}
                        </Typography>
                      </div>
                      <Typography
                        variant="body2"
                        color="primary"
                        className={`${BASE_CLASS}_addon-price`}
                      >
                        +{formatPrice(addon.price_modifier)}
                      </Typography>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Step 5 — Name */}
            <section className={`${BASE_CLASS}_section`}>
              <div className={`${BASE_CLASS}_section-heading`}>
                <Typography
                  variant="overline"
                  color="muted"
                  className={`${BASE_CLASS}_section-step`}
                >
                  Крок 5
                </Typography>
                <Typography variant="h4" as="h2">
                  Персоналізація&nbsp;
                  <Typography variant="caption" color="muted" as="span">
                    (опціонально, +{formatPrice(NAME_PRICE)})
                  </Typography>
                </Typography>
              </div>
              <div className={`${BASE_CLASS}_name-field`}>
                <label
                  htmlFor="wigwam-name"
                  className={`${BASE_CLASS}_name-label`}
                >
                  <Typography variant="body2" color="muted">
                    Ім'я дитини для вишивки на вігвамі
                  </Typography>
                </label>
                <input
                  id="wigwam-name"
                  type="text"
                  className={`${BASE_CLASS}_name-input`}
                  placeholder="Наприклад: Соня"
                  maxLength={20}
                  value={config.name}
                  onChange={(e) =>
                    setConfig((p) => ({ ...p, name: e.target.value }))
                  }
                />
                {config.name.trim() && (
                  <Typography variant="caption" color="primary">
                    +{formatPrice(NAME_PRICE)} за вишивку «{config.name.trim()}»
                  </Typography>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ─── Sticky bar ─── */}
      <div className={`${BASE_CLASS}_sticky-bar`}>
        <div className={`${BASE_CLASS}_sticky-bar-inner`}>
          <div className={`${BASE_CLASS}_sticky-bar-info`}>
            <Typography
              variant="caption"
              className={`${BASE_CLASS}_sticky-bar-summary`}
            >
              {configSummary}
            </Typography>
            <div className={`${BASE_CLASS}_sticky-bar-price-row`}>
              <Typography variant="h4" as="p">
                {formatPrice(total)}
              </Typography>
              {((selectedSize?.price_modifier ?? 0) > 0 ||
                (selectedFabric?.price_modifier ?? 0) > 0 ||
                addonsTotal > 0 ||
                namePrice > 0) && (
                <Typography
                  variant="caption"
                  className={`${BASE_CLASS}_sticky-bar-base`}
                >
                  база {formatPrice(BASE_PRICE)}
                </Typography>
              )}
            </div>
          </div>
          <div className={`${BASE_CLASS}_sticky-bar-actions`}>
            <Button
              variant="ghost"
              size="md"
              as={Link}
              href="/products"
              transitionTypes={["nav-back"]}
            >
              <ChevronLeft size={16} strokeWidth={2} />
              До каталогу
            </Button>
            <Button
              variant="primary"
              size="lg"
              disabled={isLoading || !selectedSize || !selectedFabric || !selectedColor}
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} strokeWidth={2} />
              Додати до кошика
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfiguratorPage;
