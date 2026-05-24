import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/controls/Badge/Badge";
import Button from "@/components/controls/Button/Button";
import Typography from "@/components/controls/Typography/Typography";
import { MOCK_PRODUCTS } from "@/entities/products/mocks";
import type { Product } from "@/entities/products/models";
import { formatPrice } from "@/lib/utils/formatPrice";

import "./CartPage.styles.scss";

interface MockCartItem {
  product: Product;
  quantity: number;
}

const MOCK_CART: MockCartItem[] = [
  { product: MOCK_PRODUCTS[0] as Product, quantity: 1 },
  { product: MOCK_PRODUCTS[2] as Product, quantity: 2 },
  { product: MOCK_PRODUCTS[3] as Product, quantity: 1 },
];

const BASE_CLASS = "cart-page";

function CartPage() {
  const subtotal = MOCK_CART.reduce((sum, { product, quantity }) => {
    return sum + (product.salePrice ?? product.price) * quantity;
  }, 0);

  const originalTotal = MOCK_CART.reduce((sum, { product, quantity }) => {
    return sum + product.price * quantity;
  }, 0);

  const discount = originalTotal - subtotal;
  const itemCount = MOCK_CART.reduce((sum, { quantity }) => sum + quantity, 0);

  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_inner`}>
        <div className={`${BASE_CLASS}_header`}>
          <Typography variant="h1" as="h1">
            Кошик
          </Typography>
          <Typography variant="body2" color="muted">
            {itemCount}{" "}
            {itemCount === 1 ? "товар" : itemCount < 5 ? "товари" : "товарів"}
          </Typography>
        </div>

        <div className={`${BASE_CLASS}_layout`}>
          {/* ─── Items list ─── */}
          <div className={`${BASE_CLASS}_items`}>
            {MOCK_CART.map(({ product, quantity }) => {
              const {
                id,
                slug,
                name,
                price,
                salePrice,
                images,
                category,
                badges,
              } = product;
              const image = images[0];
              const activePrice = salePrice ?? price;

              return (
                <div key={id} className={`${BASE_CLASS}_item`}>
                  <Link
                    href={`/products/${slug}`}
                    className={`${BASE_CLASS}_item-image-wrap`}
                  >
                    {image && (
                      <Image
                        className={`${BASE_CLASS}_item-image`}
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="120px"
                      />
                    )}
                  </Link>

                  <div className={`${BASE_CLASS}_item-body`}>
                    <div className={`${BASE_CLASS}_item-meta`}>
                      <Typography variant="overline" color="muted">
                        {category}
                      </Typography>
                      {badges && badges.length > 0 && (
                        <div className={`${BASE_CLASS}_item-badges`}>
                          {badges.slice(0, 1).map((b) => (
                            <Badge
                              key={b}
                              variant={
                                b === "sale"
                                  ? "error"
                                  : b === "new"
                                    ? "primary"
                                    : "warning"
                              }
                              size="sm"
                            >
                              {b === "new"
                                ? "Новинка"
                                : b === "bestseller"
                                  ? "Хіт"
                                  : b === "limited"
                                    ? "Останні"
                                    : "Знижка"}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/products/${slug}`}
                      className={`${BASE_CLASS}_item-name-link`}
                    >
                      <Typography
                        variant="subtitle1"
                        as="h3"
                        className={`${BASE_CLASS}_item-name`}
                      >
                        {name}
                      </Typography>
                    </Link>

                    <div className={`${BASE_CLASS}_item-footer`}>
                      <div className={`${BASE_CLASS}_item-qty`}>
                        <button
                          type="button"
                          className={`${BASE_CLASS}_qty-btn`}
                          aria-label="Зменшити"
                        >
                          −
                        </button>
                        <span className={`${BASE_CLASS}_qty-value`}>
                          {quantity}
                        </span>
                        <button
                          type="button"
                          className={`${BASE_CLASS}_qty-btn`}
                          aria-label="Збільшити"
                        >
                          +
                        </button>
                      </div>

                      <div className={`${BASE_CLASS}_item-price-wrap`}>
                        <span
                          className={`${BASE_CLASS}_item-price`}
                          data-sale={!!salePrice}
                        >
                          {formatPrice(activePrice * quantity)}
                        </span>
                        {salePrice && (
                          <span className={`${BASE_CLASS}_item-price-original`}>
                            {formatPrice(price * quantity)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`${BASE_CLASS}_item-remove`}
                    aria-label="Видалити"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          {/* ─── Summary ─── */}
          <aside className={`${BASE_CLASS}_summary`}>
            <Typography
              variant="h4"
              as="h2"
              className={`${BASE_CLASS}_summary-title`}
            >
              Підсумок
            </Typography>

            <div className={`${BASE_CLASS}_summary-rows`}>
              <div className={`${BASE_CLASS}_summary-row`}>
                <Typography variant="body2" color="muted">
                  Товари ({itemCount})
                </Typography>
                <Typography variant="body2">
                  {formatPrice(originalTotal)}
                </Typography>
              </div>
              {discount > 0 && (
                <div className={`${BASE_CLASS}_summary-row`}>
                  <Typography variant="body2" color="muted">
                    Знижка
                  </Typography>
                  <Typography variant="body2" color="error">
                    −{formatPrice(discount)}
                  </Typography>
                </div>
              )}
              <div className={`${BASE_CLASS}_summary-row -total`}>
                <Typography variant="subtitle1">Разом</Typography>
                <Typography variant="subtitle1">
                  {formatPrice(subtotal)}
                </Typography>
              </div>
            </div>

            <Button variant="primary" size="lg" fullWidth>
              Оформити замовлення
            </Button>
            <Button
              variant="ghost"
              size="md"
              fullWidth
              as={Link}
              href="/products"
            >
              ← Продовжити покупки
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
