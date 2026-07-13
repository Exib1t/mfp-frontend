import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/config/api.config";
import type { ConfiguratorOption } from "./types";

export const BASE_PRICE = 2800;
export const NAME_PRICE = 150;

const MOCK_OPTIONS: ConfiguratorOption[] = [
  // sizes
  {
    id: "size-s",
    type: "size",
    label: "S",
    value: "s",
    price_modifier: 0,
    image_url: null,
    sort_order: 1,
    description: "для 1 дитини",
    dimensions: "110×110×150 см",
  },
  {
    id: "size-m",
    type: "size",
    label: "M",
    value: "m",
    price_modifier: 400,
    image_url: null,
    sort_order: 2,
    description: "для 2 дітей",
    dimensions: "140×140×170 см",
  },
  {
    id: "size-l",
    type: "size",
    label: "L",
    value: "l",
    price_modifier: 800,
    image_url: null,
    sort_order: 3,
    description: "просторий",
    dimensions: "160×160×190 см",
  },
  // fabrics
  {
    id: "fabric-cotton",
    type: "fabric",
    label: "Бавовна",
    value: "cotton",
    price_modifier: 0,
    image_url: "https://picsum.photos/seed/fabric-cotton/200/120",
    sort_order: 1,
    description: "М'яка, дихаюча, легка у догляді",
  },
  {
    id: "fabric-linen",
    type: "fabric",
    label: "Льон",
    value: "linen",
    price_modifier: 200,
    image_url: "https://picsum.photos/seed/fabric-linen/200/120",
    sort_order: 2,
    description: "Натуральна текстура, міцна",
  },
  {
    id: "fabric-velvet",
    type: "fabric",
    label: "Оксамит",
    value: "velvet",
    price_modifier: 500,
    image_url: "https://picsum.photos/seed/fabric-velvet/200/120",
    sort_order: 3,
    description: "Розкішна, ніжна на дотик",
  },
  // colors
  {
    id: "color-cream",
    type: "color",
    label: "Кремовий",
    value: "cream",
    price_modifier: 0,
    image_url: "https://picsum.photos/seed/vigvam1/600/700",
    sort_order: 1,
    hex: "#F5EFE0",
  },
  {
    id: "color-sage",
    type: "color",
    label: "Шавлія",
    value: "sage",
    price_modifier: 0,
    image_url: "https://picsum.photos/seed/vigvam-sage/600/700",
    sort_order: 2,
    hex: "#8FAF8B",
  },
  {
    id: "color-pink",
    type: "color",
    label: "Пудра",
    value: "pink",
    price_modifier: 0,
    image_url: "https://picsum.photos/seed/vigvam3/600/700",
    sort_order: 3,
    hex: "#E8C4C4",
  },
  {
    id: "color-navy",
    type: "color",
    label: "Темно-синій",
    value: "navy",
    price_modifier: 0,
    image_url: "https://picsum.photos/seed/vigvam-navy/600/700",
    sort_order: 4,
    hex: "#2C3E6B",
  },
  {
    id: "color-terracotta",
    type: "color",
    label: "Теракота",
    value: "terracotta",
    price_modifier: 0,
    image_url: "https://picsum.photos/seed/vigvam2/600/700",
    sort_order: 5,
    hex: "#C4714A",
  },
  {
    id: "color-sand",
    type: "color",
    label: "Пісок",
    value: "sand",
    price_modifier: 0,
    image_url: "https://picsum.photos/seed/vigvam-sand/600/700",
    sort_order: 6,
    hex: "#D4B896",
  },
  // addons
  {
    id: "addon-pillows",
    type: "addon",
    label: "Подушки",
    value: "pillows",
    price_modifier: 350,
    image_url: null,
    sort_order: 1,
    description: "Набір 3 подушок в стилі вігваму",
  },
  {
    id: "addon-rug",
    type: "addon",
    label: "Килимок",
    value: "rug",
    price_modifier: 290,
    image_url: null,
    sort_order: 2,
    description: "М'який килимок всередину",
  },
  {
    id: "addon-garland",
    type: "addon",
    label: "Гірлянда",
    value: "garland",
    price_modifier: 150,
    image_url: null,
    sort_order: 3,
    description: "Декоративна LED гірлянда",
  },
  {
    id: "addon-basket",
    type: "addon",
    label: "Корзина",
    value: "basket",
    price_modifier: 250,
    image_url: null,
    sort_order: 4,
    description: "Плетена корзина для іграшок",
  },
  {
    id: "addon-flags",
    type: "addon",
    label: "Прапорці",
    value: "flags",
    price_modifier: 120,
    image_url: null,
    sort_order: 5,
    description: "Паперові або тканинні прапорці",
  },
  {
    id: "addon-window",
    type: "addon",
    label: "Вікно",
    value: "window",
    price_modifier: 180,
    image_url: null,
    sort_order: 6,
    description: "Оглядове вікно з сітки",
  },
];

export function useConfiguratorOptions(type?: string) {
  return useQuery<ConfiguratorOption[]>({
    queryKey: ["configurator-options", type ?? "all"],
    queryFn: async () => {
      // TODO: replace with real API call when endpoint is available:
      const url = new URL(`${API_URL}/api/v1/configurator/options`);
      if (type) url.searchParams.set("type", type);
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch configurator options");
      const { data } = (await res.json()) as { data: ConfiguratorOption[] };
      return data;
      // return MOCK_OPTIONS.filter((o) => !type || o.type === type);
    },
    staleTime: Infinity,
  });
}
