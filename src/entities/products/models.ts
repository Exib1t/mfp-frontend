import { z } from "zod";

export const ProductCategorySchema = z.enum([
  "wigwam",
  "pillows",
  "basket",
  "rug",
  "set",
  "accessory",
]);
export type ProductCategory = z.infer<typeof ProductCategorySchema>;

export const ProductBadgeSchema = z.enum([
  "new",
  "sale",
  "bestseller",
  "limited",
]);
export type ProductBadge = z.infer<typeof ProductBadgeSchema>;

export const ProductImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
});
export type ProductImage = z.infer<typeof ProductImageSchema>;

export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  salePrice: z.number().optional(),
  category: ProductCategorySchema,
  badges: z.array(ProductBadgeSchema).optional(),
  images: z.array(ProductImageSchema),
  inStock: z.boolean(),
  featured: z.boolean().optional(),
});
export type Product = z.infer<typeof ProductSchema>;
