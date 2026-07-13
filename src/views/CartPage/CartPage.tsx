"use client";

import {
  ChevronLeft,
  CreditCard,
  Minus,
  Plus,
  Settings2,
  ShoppingBag,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/controls/Button/Button";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import Typography from "@/components/controls/Typography/Typography";
import { useCart } from "@/entities/cart/CartContext";
import { useConfiguratorCart } from "@/entities/configurator/ConfiguratorCartContext";
import { useCreateOrder } from "@/entities/orders/api";
import type { PaymentMethod } from "@/entities/orders/types";
import { formatPrice } from "@/lib/utils/formatPrice";

import "./CartPage.styles.scss";

const BASE_CLASS = "cart-page";

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string }[] = [
  { value: "cash_on_delivery", label: "Оплата при отриманні" },
  { value: "online", label: "Оплата онлайн" },
];

function pluralItems(count: number): string {
  if (count === 1) return "товар";
  if (count < 5) return "товари";
  return "товарів";
}

function buildConfiguratorNotes(
  configuratorItem: NonNullable<
    ReturnType<typeof useConfiguratorCart>["item"]
  >,
): string {
  const lines = [
    "=== Кастомний вігвам ===",
    `Розмір: ${configuratorItem.sizeLabel} (${configuratorItem.sizeDescription})`,
    `Тканина: ${configuratorItem.fabricLabel}`,
    `Колір: ${configuratorItem.colorLabel}`,
  ];
  if (configuratorItem.addons.length > 0) {
    lines.push(
      `Аксесуари: ${configuratorItem.addons.map((a) => a.label).join(", ")}`,
    );
  }
  if (configuratorItem.childName) {
    lines.push(`Ім'я для вишивки: ${configuratorItem.childName}`);
  }
  lines.push(`Сума: ${formatPrice(configuratorItem.total)}`);
  return lines.join("\n");
}

function CartPage() {
  const router = useRouter();
  const {
    items,
    totalCount,
    subtotal,
    originalTotal,
    discount,
    isReady,
    setQuantity,
    removeItem,
    clear,
  } = useCart();
  const { item: configuratorItem, clear: clearConfigurator } =
    useConfiguratorCart();
  const { toast } = useToast();
  const createOrder = useCreateOrder();

  const [form, setForm] = useState({
    guest_name: "",
    guest_email: "",
    guest_phone: "",
    address: "",
    payment_method: "cash_on_delivery" as PaymentMethod,
    notes: "",
  });

  const setField =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const isFormValid =
    form.guest_name.trim().length > 0 &&
    /.+@.+\..+/.test(form.guest_email) &&
    form.guest_phone.trim().length >= 10 &&
    form.address.trim().length > 0;

  const hasAnyItems = items.length > 0 || !!configuratorItem;

  const grandTotal = subtotal + (configuratorItem?.total ?? 0);
  const grandOriginalTotal = originalTotal + (configuratorItem?.total ?? 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !hasAnyItems) return;

    const configuratorNotes = configuratorItem
      ? buildConfiguratorNotes(configuratorItem)
      : null;
    const combinedNotes = [configuratorNotes, form.notes.trim()]
      .filter(Boolean)
      .join("\n\n");

    createOrder.mutate(
      {
        body: {
          guest_name: form.guest_name.trim(),
          guest_email: form.guest_email.trim(),
          guest_phone: form.guest_phone.trim(),
          address: form.address.trim(),
          payment_method: form.payment_method,
          notes: combinedNotes || undefined,
          items: items.map((item) => ({
            variant_id: item.variantId,
            quantity: item.quantity,
          })),
        },
      },
      {
        onSuccess: (res) => {
          clear();
          clearConfigurator();
          router.push(`/orders/${res.data.id}`);
        },
        onError: () => {
          toast(
            "Не вдалося оформити замовлення. Перевірте дані та спробуйте ще раз.",
            "error",
          );
        },
      },
    );
  };

  // Empty cart (only once hydrated, to avoid a flash on first render).
  if (isReady && !hasAnyItems) {
    return (
      <div className={BASE_CLASS}>
        <div className={`${BASE_CLASS}_inner`}>
          <div className={`${BASE_CLASS}_empty`}>
            <ShoppingBag size={48} strokeWidth={1.5} />
            <Typography variant="h3" as="h1">
              Кошик порожній
            </Typography>
            <Typography variant="body1" color="muted">
              Додайте товари з каталогу, щоб оформити замовлення.
            </Typography>
            <Button variant="primary" size="md" as={Link} href="/products">
              До каталогу
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const totalItemCount = totalCount + (configuratorItem ? 1 : 0);

  return (
    <div className={BASE_CLASS}>
      <div className={`${BASE_CLASS}_inner`}>
        <div className={`${BASE_CLASS}_header`}>
          <Typography variant="h1" as="h1">
            Кошик
          </Typography>
          <Typography variant="body2" color="muted">
            {totalItemCount} {pluralItems(totalItemCount)}
          </Typography>
        </div>

        <div className={`${BASE_CLASS}_layout`}>
          {/* ─── Items list ─── */}
          <div className={`${BASE_CLASS}_items`}>
            {/* Configurator item */}
            {configuratorItem && (
              <div className={`${BASE_CLASS}_item`}>
                <div className={`${BASE_CLASS}_item-image-wrap`}>
                  <span
                    className={`${BASE_CLASS}_item-glyph`}
                    aria-hidden="true"
                    style={{
                      backgroundColor: configuratorItem.colorHex || undefined,
                    }}
                  >
                    <Settings2
                      size={28}
                      strokeWidth={1.5}
                      style={{ color: "white", opacity: 0.8 }}
                    />
                  </span>
                </div>

                <div className={`${BASE_CLASS}_item-body`}>
                  <Typography variant="overline" color="muted">
                    Кастомний вігвам
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    as="h3"
                    className={`${BASE_CLASS}_item-name`}
                  >
                    Вігвам «{configuratorItem.sizeLabel} ·{" "}
                    {configuratorItem.fabricLabel} ·{" "}
                    {configuratorItem.colorLabel}»
                  </Typography>

                  <div className={`${BASE_CLASS}_configurator-details`}>
                    {configuratorItem.addons.length > 0 && (
                      <Typography variant="caption" color="muted">
                        Аксесуари:{" "}
                        {configuratorItem.addons.map((a) => a.label).join(", ")}
                      </Typography>
                    )}
                    {configuratorItem.childName && (
                      <Typography variant="caption" color="muted">
                        Ім'я для вишивки: «{configuratorItem.childName}»
                      </Typography>
                    )}
                  </div>

                  <div className={`${BASE_CLASS}_item-footer`}>
                    <Typography variant="caption" color="muted">
                      1 шт. · кастомне виготовлення
                    </Typography>
                    <div className={`${BASE_CLASS}_item-price-wrap`}>
                      <span className={`${BASE_CLASS}_item-price`}>
                        {formatPrice(configuratorItem.total)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className={`${BASE_CLASS}_item-remove`}
                  aria-label="Видалити"
                  onClick={clearConfigurator}
                >
                  <X size={16} strokeWidth={2} />
                </button>
              </div>
            )}

            {/* Regular items */}
            {items.map((item) => {
              const lineTotal = item.unitPrice * item.quantity;
              const hasDiscount = item.unitPrice < item.basePrice;

              return (
                <div key={item.variantId} className={`${BASE_CLASS}_item`}>
                  <Link
                    href={`/products/${item.slug}`}
                    className={`${BASE_CLASS}_item-image-wrap`}
                  >
                    {item.image ? (
                      <Image
                        className={`${BASE_CLASS}_item-image`}
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="120px"
                      />
                    ) : (
                      <span
                        className={`${BASE_CLASS}_item-glyph`}
                        aria-hidden="true"
                      >
                        ✦
                      </span>
                    )}
                  </Link>

                  <div className={`${BASE_CLASS}_item-body`}>
                    <Typography variant="overline" color="muted">
                      {item.variantLabel}
                    </Typography>
                    <Link
                      href={`/products/${item.slug}`}
                      className={`${BASE_CLASS}_item-name-link`}
                    >
                      <Typography
                        variant="subtitle1"
                        as="h3"
                        className={`${BASE_CLASS}_item-name`}
                      >
                        {item.name}
                      </Typography>
                    </Link>

                    <div className={`${BASE_CLASS}_item-footer`}>
                      <div className={`${BASE_CLASS}_item-qty`}>
                        <button
                          type="button"
                          className={`${BASE_CLASS}_qty-btn`}
                          aria-label="Зменшити"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            setQuantity(item.variantId, item.quantity - 1)
                          }
                        >
                          <Minus size={14} strokeWidth={2} />
                        </button>
                        <span className={`${BASE_CLASS}_qty-value`}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className={`${BASE_CLASS}_qty-btn`}
                          aria-label="Збільшити"
                          disabled={item.quantity >= item.maxStock}
                          onClick={() =>
                            setQuantity(item.variantId, item.quantity + 1)
                          }
                        >
                          <Plus size={14} strokeWidth={2} />
                        </button>
                      </div>

                      <div className={`${BASE_CLASS}_item-price-wrap`}>
                        <span
                          className={`${BASE_CLASS}_item-price`}
                          data-sale={hasDiscount}
                        >
                          {formatPrice(lineTotal)}
                        </span>
                        {hasDiscount && (
                          <span className={`${BASE_CLASS}_item-price-original`}>
                            {formatPrice(item.basePrice * item.quantity)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`${BASE_CLASS}_item-remove`}
                    aria-label="Видалити"
                    onClick={() => removeItem(item.variantId)}
                  >
                    <X size={16} strokeWidth={2} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* ─── Summary + checkout ─── */}
          <aside className={`${BASE_CLASS}_summary`}>
            <Typography
              variant="h4"
              as="h2"
              className={`${BASE_CLASS}_summary-title`}
            >
              Оформлення
            </Typography>

            <div className={`${BASE_CLASS}_summary-rows`}>
              {items.length > 0 && (
                <div className={`${BASE_CLASS}_summary-row`}>
                  <Typography variant="body2" color="muted">
                    Товари ({totalCount})
                  </Typography>
                  <Typography variant="body2">
                    {formatPrice(originalTotal)}
                  </Typography>
                </div>
              )}
              {configuratorItem && (
                <div className={`${BASE_CLASS}_summary-row`}>
                  <Typography variant="body2" color="muted">
                    Вігвам (кастомний)
                  </Typography>
                  <Typography variant="body2">
                    {formatPrice(configuratorItem.total)}
                  </Typography>
                </div>
              )}
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
                  {formatPrice(grandTotal)}
                </Typography>
              </div>
            </div>

            <form className={`${BASE_CLASS}_form`} onSubmit={handleSubmit}>
              <input
                className={`${BASE_CLASS}_input`}
                placeholder="Ім'я та прізвище *"
                value={form.guest_name}
                onChange={setField("guest_name")}
                required
              />
              <input
                type="email"
                className={`${BASE_CLASS}_input`}
                placeholder="Email *"
                value={form.guest_email}
                onChange={setField("guest_email")}
                required
              />
              <input
                type="tel"
                className={`${BASE_CLASS}_input`}
                placeholder="Телефон * (+380…)"
                value={form.guest_phone}
                onChange={setField("guest_phone")}
                required
              />
              <input
                className={`${BASE_CLASS}_input`}
                placeholder="Адреса доставки *"
                value={form.address}
                onChange={setField("address")}
                required
              />
              <select
                className={`${BASE_CLASS}_input`}
                value={form.payment_method}
                onChange={setField("payment_method")}
              >
                {PAYMENT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <textarea
                className={`${BASE_CLASS}_textarea`}
                placeholder="Коментар до замовлення"
                rows={2}
                value={form.notes}
                onChange={setField("notes")}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={!isFormValid}
                loading={createOrder.isPending}
              >
                <CreditCard size={18} strokeWidth={2} />
                Підтвердити замовлення
              </Button>
            </form>

            <Button
              variant="ghost"
              size="md"
              fullWidth
              as={Link}
              href="/products"
              transitionTypes={["nav-back"]}
            >
              <ChevronLeft size={16} strokeWidth={2} />
              Продовжити покупки
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
