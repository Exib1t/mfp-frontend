"use client";

import { ChevronLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/controls/Button/Button";
import EmptyState from "@/components/controls/EmptyState/EmptyState";
import { useToast } from "@/components/controls/Toast/ToastProvider";
import Typography from "@/components/controls/Typography/Typography";
import { useCart } from "@/entities/cart/CartContext";
import { getCartItemKey } from "@/entities/cart/types";
import { useCreateOrder } from "@/entities/orders/api";
import { saveConfirmedOrder } from "@/entities/orders/storage";
import { MAX_ORDER_LINES } from "@/entities/products/constants";
import { getApiErrorStatus } from "@/services/api/apiError";
import CartItemRow from "./parts/CartItemRow/CartItemRow";
import CheckoutForm, {
  type CheckoutFormValues,
} from "./parts/CheckoutForm/CheckoutForm";
import OrderSummary from "./parts/OrderSummary/OrderSummary";

import "./CartPage.styles.scss";

const BASE_CLASS = "cart-page";

function pluralItems(count: number): string {
  if (count === 1) return "товар";
  if (count < 5) return "товари";
  return "товарів";
}

function getCheckoutErrorMessage(error: unknown): string {
  switch (getApiErrorStatus(error)) {
    case 429:
      return "Забагато спроб оформити замовлення. Зачекайте хвилину та спробуйте знову.";
    case 400:
      return "Деякі товари вже недоступні або їх недостатньо на складі. Оновіть кошик та спробуйте ще раз.";
    default:
      return "Не вдалося оформити замовлення. Перевірте дані та спробуйте ще раз.";
  }
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
  const { toast } = useToast();
  const createOrder = useCreateOrder();

  const hasAnyItems = items.length > 0;

  const handleCheckoutSubmit = (values: CheckoutFormValues) => {
    if (!hasAnyItems) return;
    if (items.length > MAX_ORDER_LINES) {
      toast(
        `В одному замовленні може бути не більше ${MAX_ORDER_LINES} позицій.`,
        "error",
      );
      return;
    }

    createOrder.mutate(
      {
        body: {
          guest_name: values.guest_name,
          guest_email: values.guest_email,
          guest_phone: values.guest_phone,
          address: values.address,
          payment_method: values.payment_method,
          notes: values.notes || undefined,
          items: items.map((item) =>
            item.variantId != null
              ? { variant_id: item.variantId, quantity: item.quantity }
              : { product_id: item.productId, quantity: item.quantity },
          ),
        },
      },
      {
        onSuccess: (res) => {
          saveConfirmedOrder(res.data);
          clear();
          router.push(`/orders/${res.data.id}`);
        },
        onError: (error) => {
          toast(getCheckoutErrorMessage(error), "error");
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

  const totalItemCount = totalCount;

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
            {items.map((item) => (
              <CartItemRow
                key={getCartItemKey(item)}
                item={item}
                onQuantityChange={(qty) =>
                  setQuantity(getCartItemKey(item), qty)
                }
                onRemove={() => removeItem(getCartItemKey(item))}
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
              discount={discount}
              grandTotal={subtotal}
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
