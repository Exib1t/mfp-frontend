import cn from "classnames";
import type { components } from "@/lib/api/v1";
import "./ProductCard.styles.css";

type ProductDto = components["schemas"]["ProductDto"];

const BASE_CLASS = "product-card";

const STATUS_LABELS: Record<ProductDto["status"], string> = {
  in_stock: "В наявності",
  made_to_order: "Під замовлення",
  out_of_stock: "Немає в наявності",
};

const UA_COLOR_MAP: Record<string, string> = {
  білий: "#f5f0e8",
  молочний: "#faf0dc",
  чорний: "#2c2820",
  синій: "#4a6fa5",
  "темно-синій": "#1e3a5f",
  червоний: "#c0392b",
  "темно-червоний": "#8b1a1a",
  вишневий: "#7b2029",
  зелений: "#3d7a5a",
  жовтий: "#e8b84b",
  золотий: "#c9960c",
  рожевий: "#e8a0b4",
  бежевий: "#d4b896",
  сірий: "#9a9590",
  коричневий: "#8b6914",
  фіолетовий: "#7c5c8a",
  помаранчевий: "#cc6b1a",
  терракотовий: "#c06040",
};

function resolveColor(name: string): string {
  return UA_COLOR_MAP[name.toLowerCase()] ?? "#c8b49a";
}

interface Props {
  product: ProductDto;
}

const ProductCard = ({ product }: Props) => {
  const { name, slug, price, sale_price, status, new_category, variants, image_urls } =
    product;

  const discount = sale_price ? Math.round((1 - sale_price / price) * 100) : null;

  const uniqueColors = [
    ...new Set(variants.filter((v) => v.color !== null).map((v) => v.color as string)),
  ];
  const visibleColors = uniqueColors.slice(0, 5);
  const extraColors = uniqueColors.length > 5 ? uniqueColors.length - 5 : 0;
  const statusMod = status.replace(/_/g, "-");

  return (
    <article className={cn(BASE_CLASS, { [`${BASE_CLASS}--on-sale`]: !!sale_price })}>
      <a href={`/products/${slug}`} className={`${BASE_CLASS}__link`}>
        {/* Image */}
        <div className={`${BASE_CLASS}__image-wrap`}>
          {image_urls.length > 0 ? (
            <img
              src={image_urls[0]}
              alt={name}
              className={`${BASE_CLASS}__image`}
              loading="lazy"
            />
          ) : (
            <div className={`${BASE_CLASS}__placeholder`}>
              <span className={`${BASE_CLASS}__placeholder-glyph`} aria-hidden="true">
                ✦
              </span>
            </div>
          )}

          {discount !== null && (
            <div className={`${BASE_CLASS}__ribbon`}>−{discount}%</div>
          )}

          <div className={cn(`${BASE_CLASS}__badge`, `${BASE_CLASS}__badge--${statusMod}`)}>
            {STATUS_LABELS[status]}
          </div>
        </div>

        {/* Body */}
        <div className={`${BASE_CLASS}__body`}>
          <p className={`${BASE_CLASS}__category`}>{new_category.name}</p>
          <h3 className={`${BASE_CLASS}__name`}>{name}</h3>

          <div className={`${BASE_CLASS}__price-row`}>
            {sale_price ? (
              <>
                <s className={`${BASE_CLASS}__price-was`}>{price} ₴</s>
                <strong className={`${BASE_CLASS}__price-now`}>{sale_price} ₴</strong>
              </>
            ) : (
              <span className={`${BASE_CLASS}__price`}>{price} ₴</span>
            )}
          </div>

          {visibleColors.length > 0 && (
            <div className={`${BASE_CLASS}__swatches`}>
              {visibleColors.map((color) => (
                <span
                  key={color}
                  className={`${BASE_CLASS}__swatch`}
                  style={{ background: resolveColor(color) }}
                  title={color}
                />
              ))}
              {extraColors > 0 && (
                <span className={`${BASE_CLASS}__swatch-more`}>+{extraColors}</span>
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className={`${BASE_CLASS}__footer`}>
          <span className={`${BASE_CLASS}__cta`}>Детальніше</span>
        </div>
      </a>
    </article>
  );
};

export default ProductCard;
