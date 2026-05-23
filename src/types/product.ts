export type ProductCategory =
  | "wigwam"
  | "pillows"
  | "basket"
  | "rug"
  | "set"
  | "accessory";

export type ProductBadge = "new" | "sale" | "bestseller" | "limited";

export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: ProductCategory;
  badges?: ProductBadge[];
  images: ProductImage[];
  inStock: boolean;
  featured?: boolean;
};
