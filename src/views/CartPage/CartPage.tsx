"use client";

import { ChevronLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/controls/Button/Button";
import EmptyState from "@/components/controls/EmptyState/EmptyState";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import Typography from "@/components/controls/Typography/Typography";
import { useCart } from "@/entities/cart/CartContext";
import { useConfiguratorCart } from "@/entities/configurator/ConfiguratorCartContext";
import { useCreateOrder } from "@/entities/orders/api";
import { formatPrice } from "@/lib/utils/formatPrice";
import CartItemRow from "./parts/CartItemRow/CartItemRow";
import CheckoutForm, {
  type CheckoutFormValues,
} from "./parts/CheckoutForm/CheckoutForm";
import ConfiguratorCartItemRow from "./parts/ConfiguratorCartItemRow/ConfiguratorCartItemRow";
import OrderSummary from "./parts/OrderSummary/OrderSummary";

import "./CartPage.styles.scss";

const BASE_CLASS = "cart-page";

function pluralItems(count: number): string {
  if (count === 1) return "товар";
  if (count < 5) return "товари";
  return "товарів";
}

function buildConfiguratorNotes(
  configuratorItem: NonNullable<ReturnType<typeof useConfiguratorCart>["item"]>,
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

  const hasAnyItems = items.length > 0 || !!configuratorItem;

  const grandTotal = subtotal + (configuratorItem?.total ?? 0);

  const handleCheckoutSubmit = (values: CheckoutFormValues) => {
    if (!hasAnyItems) return;

    const configuratorNotes = configuratorItem
      ? buildConfiguratorNotes(configuratorItem)
      : null;
    const combinedNotes = [configuratorNotes, values.notes]
      .filter(Boolean)
      .join("\n\n");

    createOrder.mutate(
      {
        body: {
          guest_name: values.guest_name,
          guest_email: values.guest_email,
          guest_phone: values.guest_phone,
          address: values.address,
          payment_method: values.payment_method,
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
          <EmptyState
            icon={<ShoppingBag size={48} strokeWidth={1.5} />}
            title="Кошик порожній"
            titleAs="h1"
            description="Додайте товари з каталогу, щоб оформити замовлення."
            action={
              <Button as={Link} href="/products">
                До каталогу
              </Button>
            }
          />
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
          <div className={`${BASE_CLASS}_items`}>
            {configuratorItem && (
              <ConfiguratorCartItemRow
                item={configuratorItem}
                onRemove={clearConfigurator}
              />
            )}

            {items.map((item) => (
              <CartItemRow
                key={item.variantId}
                item={item}
                onQuantityChange={(qty) => setQuantity(item.variantId, qty)}
                onRemove={() => removeItem(item.variantId)}
              />
            ))}
          </div>

          <aside className={`${BASE_CLASS}_summary`}>
            <Typography
              variant="h4"
              as="h2"
              className={`${BASE_CLASS}_summary-title`}
            >
              Оформлення
            </Typography>

            <OrderSummary
              itemsCount={totalCount}
              originalTotal={originalTotal}
              configuratorTotal={configuratorItem?.total}
              discount={discount}
              grandTotal={grandTotal}
            />

            <CheckoutForm
              onSubmit={handleCheckoutSubmit}
              isPending={createOrder.isPending}
            />

            <Button
              variant="ghost"
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
