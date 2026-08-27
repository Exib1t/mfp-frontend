import Link from "next/link";
import type { DataTableColumn } from "@/components/admin/DataTable/types";
import Badge from "@/components/controls/Badge/Badge";
import Price from "@/components/controls/Price/Price";
import type { AdminProduct } from "@/entities/admin/products/types";
import { PRODUCT_STATUS_LABELS } from "@/entities/products/constants";
import { hasPriceRange } from "@/entities/products/helpers";

const BASE_CLASS = "admin-products";

const STATUS_VARIANT = {
  in_stock: "success",
  made_to_order: "warning",
  out_of_stock: "error",
} as const;

interface ColumnsOptions {
  onDelete: (product: AdminProduct) => void;
}

export function buildProductColumns({
  onDelete,
}: ColumnsOptions): DataTableColumn<AdminProduct>[] {
  return [
    {
      key: "name",
      header: "Товар",
      width: "minmax(0, 2.4fr)",
      render: (product) => (
        <div className={`${BASE_CLASS}_name-cell`}>
          <Link
            href={`/admin/products/${product.id}`}
            className={`${BASE_CLASS}_name`}
          >
            {product.name}
          </Link>
          <span className={`${BASE_CLASS}_slug`}>/{product.slug}</span>
        </div>
      ),
    },
    {
      key: "category",
      header: "Категорія",
      width: "minmax(0, 1fr)",
      render: (product) => product.category.name,
    },
    {
      key: "price",
      header: "Ціна",
      width: "150px",
      align: "right",
      render: (product) =>
        hasPriceRange(product) ? (
          <Price value={product.price_range.min} prefix="від" size="sm" />
        ) : (
          <Price
            value={product.effective_price}
            compareAt={product.sale_active ? product.price : null}
            size="sm"
          />
        ),
    },
    {
      key: "stock",
      header: "Залишок",
      width: "110px",
      align: "right",
      render: (product) =>
        product.variants.length > 0
          ? `${product.variants.reduce((sum, v) => sum + v.stock, 0)} · ${product.variants.length} вар.`
          : String(product.stock),
    },
    {
      key: "status",
      header: "Статус",
      width: "150px",
      render: (product) => (
        <Badge variant={STATUS_VARIANT[product.status]} size="sm">
          {PRODUCT_STATUS_LABELS[product.status]}
        </Badge>
      ),
    },
    {
      key: "published",
      header: "Публікація",
      width: "120px",
      render: (product) =>
        product.is_published ? (
          <Badge size="sm">Опубліковано</Badge>
        ) : (
          <Badge variant="warning" size="sm">
            Чернетка
          </Badge>
        ),
    },
    {
      key: "actions",
      header: "",
      width: "90px",
      align: "right",
      render: (product) => (
        <button
          type="button"
          className={`${BASE_CLASS}_delete`}
          onClick={() => onDelete(product)}
        >
          Видалити
        </button>
      ),
    },
  ];
}
