export interface ConfiguratorOption {
  id: string;
  type: "size" | "fabric" | "color" | "addon";
  label: string;
  value: string;
  price_modifier: number;
  image_url: string | null;
  sort_order: number;
  description?: string;
  dimensions?: string;
  hex?: string;
}

export interface ConfiguratorAddonInCart {
  id: string;
  label: string;
  price: number;
}

export interface ConfiguratorCartItem {
  sizeId: string;
  sizeLabel: string;
  sizeDescription: string;
  fabricId: string;
  fabricLabel: string;
  colorId: string;
  colorLabel: string;
  colorHex: string;
  addons: ConfiguratorAddonInCart[];
  childName: string;
  basePrice: number;
  sizePrice: number;
  fabricPrice: number;
  addonsTotal: number;
  namePrice: number;
  total: number;
}
