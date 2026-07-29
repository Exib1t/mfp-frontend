import type { components } from "@/lib/api/v1";

export type AdminConfigurator = components["schemas"]["ConfiguratorDto"];
export type AdminConfiguratorGroup = AdminConfigurator["groups"][number];
export type AdminConfiguratorOption = AdminConfiguratorGroup["options"][number];
export type ConfiguratorGroupUi = AdminConfiguratorGroup["ui"];

export type CreateConfiguratorPayload =
  components["schemas"]["CreateConfiguratorDto"];
export type UpdateConfiguratorPayload =
  components["schemas"]["UpdateConfiguratorDto"];
export type CreateGroupPayload =
  components["schemas"]["CreateConfiguratorGroupDto"];
export type UpdateGroupPayload =
  components["schemas"]["UpdateConfiguratorGroupDto"];
export type CreateOptionPayload =
  components["schemas"]["CreateConfiguratorOptionDto"];
export type UpdateOptionPayload =
  components["schemas"]["UpdateConfiguratorOptionDto"];

export const GROUP_UI_LABELS: Record<ConfiguratorGroupUi, string> = {
  radio: "Список з крапками",
  swatch: "Кольорові плитки",
  image: "Плитки із зображенням",
  select: "Випадаючий список",
  checkbox: "Прапорці",
  text: "Поле для вводу",
};

export const GROUP_UI_HINTS: Record<ConfiguratorGroupUi, string> = {
  radio: "Один варіант із кількох. Підходить для розміру чи тканини.",
  swatch: "Один колір. Кожен варіант має свій відтінок.",
  image: "Один варіант, кожен зі своїм фото.",
  select: "Один варіант зі списку. Зручно, коли варіантів багато.",
  checkbox: "Кілька варіантів одночасно. Підходить для аксесуарів.",
  text: "Покупець вводить текст. Доплата задається для всієї групи.",
};

/** UIs whose choices come from the option list rather than buyer input. */
export const OPTION_BACKED_UI: ConfiguratorGroupUi[] = [
  "radio",
  "swatch",
  "image",
  "select",
  "checkbox",
];

/** UIs where several choices can be active at once. */
export const MULTI_CAPABLE_UI: ConfiguratorGroupUi[] = ["checkbox"];
