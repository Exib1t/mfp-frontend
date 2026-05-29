import Link from "next/link";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";

import "./ConfiguratorSection.styles.scss";

const BASE_CLASS = "configurator-section";

const COLORS = [
  { label: "Кремовий", hex: "#F5EFE0" },
  { label: "Шавлія", hex: "#8FAF8B" },
  { label: "Пудра", hex: "#E8C4C4" },
  { label: "Темно-синій", hex: "#2C3E6B" },
  { label: "Теракота", hex: "#C4714A" },
  { label: "Пісок", hex: "#D4B896" },
];

const SIZES = ["S", "M", "L"];

const FEATURES = [
  { label: "Розмір", detail: "3 варіанти для будь-якого простору" },
  { label: "Тканина", detail: "Бавовна, льон або оксамит" },
  { label: "Колір", detail: "6 кольорів палітри" },
  { label: "Аксесуари", detail: "Подушки, килимок, гірлянда та інше" },
  { label: "Персоналізація", detail: "Вишивка імені дитини" },
];

function ConfiguratorSection() {
  return (
    <section className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_inner`}>
        <div className={`${BASE_CLASS}_content`}>
          <Typography variant="overline" color="primary">
            Конфігуратор
          </Typography>
          <Typography variant="h2" as="h2" className={`${BASE_CLASS}_title`}>
            Зберіть свій вігвам
          </Typography>
          <Typography variant="body1" color="muted" className={`${BASE_CLASS}_desc`}>
            Оберіть розмір, тканину, кольори та аксесуари — і отримайте вігвам,
            який підходить саме вашій дитині.
          </Typography>

          <ul className={`${BASE_CLASS}_features`}>
            {FEATURES.map(({ label, detail }) => (
              <li key={label} className={`${BASE_CLASS}_feature`}>
                <span className={`${BASE_CLASS}_feature-mark`} aria-hidden="true">
                  ✦
                </span>
                <span className={`${BASE_CLASS}_feature-label`}>{label}</span>
                <Typography variant="caption" color="muted" as="span">
                  {detail}
                </Typography>
              </li>
            ))}
          </ul>

          <Button as={Link} href="/configurator" size="lg">
            Зібрати свій вігвам
          </Button>
        </div>

        <div className={`${BASE_CLASS}_visual`}>
          <div className={`${BASE_CLASS}_visual-inner`}>
            <Typography variant="overline" color="muted" className={`${BASE_CLASS}_visual-label`}>
              Колір
            </Typography>
            <div className={`${BASE_CLASS}_swatches`}>
              {COLORS.map(({ label, hex }) => (
                <div
                  key={label}
                  className={`${BASE_CLASS}_swatch`}
                  style={{ backgroundColor: hex }}
                  title={label}
                />
              ))}
            </div>

            <Typography variant="overline" color="muted" className={`${BASE_CLASS}_visual-label`}>
              Розмір
            </Typography>
            <div className={`${BASE_CLASS}_sizes`}>
              {SIZES.map((size) => (
                <div key={size} className={`${BASE_CLASS}_size-badge`}>
                  <Typography variant="subtitle2" as="span">
                    {size}
                  </Typography>
                </div>
              ))}
            </div>

            <div className={`${BASE_CLASS}_combo-count`}>
              <Typography variant="h3" as="p" color="primary">
                100+
              </Typography>
              <Typography variant="body2" color="muted">
                унікальних комбінацій
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConfiguratorSection;
