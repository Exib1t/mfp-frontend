"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";

import "./ConfiguratorPage.styles.scss";

/* ─── Types ──────────────────────────────────────────── */

type SizeId = "s" | "m" | "l";
type FabricId = "cotton" | "linen" | "velvet";
type ColorId = "cream" | "sage" | "pink" | "navy" | "terracotta" | "sand";
type AddonId = "pillows" | "rug" | "garland" | "basket" | "flags" | "window";

interface SizeOption {
  id: SizeId;
  label: string;
  description: string;
  dimensions: string;
  priceAdd: number;
}

interface FabricOption {
  id: FabricId;
  label: string;
  description: string;
  priceAdd: number;
  imageSeed: string;
}

interface ColorOption {
  id: ColorId;
  label: string;
  hex: string;
  imageSeed: string;
}

interface AddonOption {
  id: AddonId;
  label: string;
  description: string;
  price: number;
}

interface ConfigState {
  size: SizeId;
  fabric: FabricId;
  color: ColorId;
  addons: Set<AddonId>;
  name: string;
}

/* ─── Mock data ──────────────────────────────────────── */

const BASE_PRICE = 2800;
const NAME_PRICE = 150;

const SIZES: SizeOption[] = [
  {
    id: "s",
    label: "S",
    description: "для 1 дитини",
    dimensions: "110×110×150 см",
    priceAdd: 0,
  },
  {
    id: "m",
    label: "M",
    description: "для 2 дітей",
    dimensions: "140×140×170 см",
    priceAdd: 400,
  },
  {
    id: "l",
    label: "L",
    description: "просторий",
    dimensions: "160×160×190 см",
    priceAdd: 800,
  },
];

const FABRICS: FabricOption[] = [
  {
    id: "cotton",
    label: "Бавовна",
    description: "М'яка, дихаюча, легка у догляді",
    priceAdd: 0,
    imageSeed: "fabric-cotton",
  },
  {
    id: "linen",
    label: "Льон",
    description: "Натуральна текстура, міцна",
    priceAdd: 200,
    imageSeed: "fabric-linen",
  },
  {
    id: "velvet",
    label: "Оксамит",
    description: "Розкішна, ніжна на дотик",
    priceAdd: 500,
    imageSeed: "fabric-velvet",
  },
];

const COLORS: ColorOption[] = [
  { id: "cream", label: "Кремовий", hex: "#F5EFE0", imageSeed: "vigvam1" },
  { id: "sage", label: "Шавлія", hex: "#8FAF8B", imageSeed: "vigvam-sage" },
  { id: "pink", label: "Пудра", hex: "#E8C4C4", imageSeed: "vigvam3" },
  {
    id: "navy",
    label: "Темно-синій",
    hex: "#2C3E6B",
    imageSeed: "vigvam-navy",
  },
  { id: "terracotta", label: "Теракота", hex: "#C4714A", imageSeed: "vigvam2" },
  { id: "sand", label: "Пісок", hex: "#D4B896", imageSeed: "vigvam-sand" },
];

const ADDONS: AddonOption[] = [
  {
    id: "pillows",
    label: "Подушки",
    description: "Набір 3 подушок в стилі вігваму",
    price: 350,
  },
  {
    id: "rug",
    label: "Килимок",
    description: "М'який килимок всередину",
    price: 290,
  },
  {
    id: "garland",
    label: "Гірлянда",
    description: "Декоративна LED гірлянда",
    price: 150,
  },
  {
    id: "basket",
    label: "Корзина",
    description: "Плетена корзина для іграшок",
    price: 250,
  },
  {
    id: "flags",
    label: "Прапорці",
    description: "Паперові або тканинні прапорці",
    price: 120,
  },
  {
    id: "window",
    label: "Вікно",
    description: "Оглядове вікно з сітки",
    price: 180,
  },
];

/* ─── Component ──────────────────────────────────────── */

const BASE_CLASS = "configurator";

function ConfiguratorPage() {
  const [config, setConfig] = useState<ConfigState>({
    size: "m",
    fabric: "cotton",
    color: "cream",
    addons: new Set(),
    name: "",
  });

  const selectedSize = SIZES.find((s) => s.id === config.size);
  const selectedFabric = FABRICS.find((f) => f.id === config.fabric);
  const selectedColor = COLORS.find((c) => c.id === config.color);

  const addonsTotal = [...config.addons].reduce((sum, id) => {
    return sum + (ADDONS.find((a) => a.id === id)?.price ?? 0);
  }, 0);

  const namePrice = config.name.trim() ? NAME_PRICE : 0;
  const total =
    BASE_PRICE +
    (selectedSize?.priceAdd ?? 0) +
    (selectedFabric?.priceAdd ?? 0) +
    addonsTotal +
    namePrice;

  const toggleAddon = (id: AddonId) => {
    setConfig((prev) => {
      const addons = new Set(prev.addons);
      if (addons.has(id)) addons.delete(id);
      else addons.add(id);
      return { ...prev, addons };
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
          {/* ─── Preview ─── */}
          <div className={`${BASE_CLASS}_preview`}>
            <div className={`${BASE_CLASS}_preview-image-wrap`}>
              <Image
                className={`${BASE_CLASS}_preview-image`}
                src={`https://picsum.photos/seed/${selectedColor?.imageSeed ?? "vigvam1"}/600/700`}
                alt="Превью вігваму"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                key={selectedColor?.imageSeed}
              />
              <div
                className={`${BASE_CLASS}_preview-overlay`}
                style={{ backgroundColor: selectedColor?.hex ?? "transparent" }}
              />

              {config.addons.size > 0 && (
                <div className={`${BASE_CLASS}_preview-addon-tags`}>
                  {[...config.addons].map((id) => {
                    const addon = ADDONS.find((a) => a.id === id);
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
              <div className={`${BASE_CLASS}_preview-price-row`}>
                <Typography variant="h3" as="p">
                  {formatPrice(total)}
                </Typography>
                {(selectedSize?.priceAdd ?? 0) > 0 ||
                (selectedFabric?.priceAdd ?? 0) > 0 ||
                addonsTotal > 0 ||
                namePrice > 0 ? (
                  <Typography variant="caption" color="muted">
                    база {formatPrice(BASE_PRICE)}
                  </Typography>
                ) : null}
              </div>
              <Button variant="primary" size="lg" fullWidth>
                Додати до кошика
              </Button>
              <Button
                variant="ghost"
                size="md"
                fullWidth
                as={Link}
                href="/products"
              >
                ← До каталогу
              </Button>
            </div>
          </div>

          {/* ─── Options ─── */}
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
              <div className={`${BASE_CLASS}_size-grid`}>
                {SIZES.map((size) => (
                  <button
                    type="button"
                    key={size.id}
                    className={cn(`${BASE_CLASS}_size-card`, {
                      "-active": config.size === size.id,
                    })}
                    onClick={() => setConfig((p) => ({ ...p, size: size.id }))}
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
                    {size.priceAdd > 0 && (
                      <span className={`${BASE_CLASS}_size-card-price`}>
                        +{formatPrice(size.priceAdd)}
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
                {FABRICS.map((fabric) => (
                  <button
                    type="button"
                    key={fabric.id}
                    className={cn(`${BASE_CLASS}_fabric-card`, {
                      "-active": config.fabric === fabric.id,
                    })}
                    onClick={() =>
                      setConfig((p) => ({ ...p, fabric: fabric.id }))
                    }
                  >
                    <div className={`${BASE_CLASS}_fabric-card-img-wrap`}>
                      <Image
                        src={`https://picsum.photos/seed/${fabric.imageSeed}/200/120`}
                        alt={fabric.label}
                        fill
                        sizes="160px"
                        className={`${BASE_CLASS}_fabric-card-img`}
                      />
                    </div>
                    <div className={`${BASE_CLASS}_fabric-card-info`}>
                      <Typography variant="subtitle2" as="span">
                        {fabric.label}
                      </Typography>
                      <Typography variant="caption" color="muted">
                        {fabric.description}
                      </Typography>
                      {fabric.priceAdd > 0 && (
                        <Typography variant="caption" color="primary">
                          +{formatPrice(fabric.priceAdd)}
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
                    — {selectedColor?.label}
                  </Typography>
                </Typography>
              </div>
              <div className={`${BASE_CLASS}_color-grid`}>
                {COLORS.map((color) => (
                  <button
                    type="button"
                    key={color.id}
                    className={cn(`${BASE_CLASS}_color-swatch`, {
                      "-active": config.color === color.id,
                    })}
                    style={{ backgroundColor: color.hex }}
                    onClick={() =>
                      setConfig((p) => ({ ...p, color: color.id }))
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
                {ADDONS.map((addon) => {
                  const isSelected = config.addons.has(addon.id);
                  return (
                    <button
                      type="button"
                      key={addon.id}
                      className={cn(`${BASE_CLASS}_addon-card`, {
                        "-active": isSelected,
                      })}
                      onClick={() => toggleAddon(addon.id)}
                    >
                      <div
                        className={cn(`${BASE_CLASS}_addon-check`, {
                          "-checked": isSelected,
                        })}
                      >
                        {isSelected && <span aria-hidden="true">✓</span>}
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
                        +{formatPrice(addon.price)}
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
    </div>
  );
}

export default ConfiguratorPage;
