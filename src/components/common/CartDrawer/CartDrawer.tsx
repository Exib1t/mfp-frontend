"use client";

import { ArrowRight, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Button from "@/components/controls/Button/Button";
import EmptyState from "@/components/controls/EmptyState/EmptyState";
import IconButton from "@/components/controls/IconButton/IconButton";
import Typography from "@/components/controls/Typography/Typography";
import { useCart } from "@/entities/cart/CartContext";
import { useCartDrawer } from "@/entities/cart/CartDrawerContext";
import { getCartItemKey } from "@/entities/cart/types";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";
import CartItemRow from "@/views/CartPage/parts/CartItemRow/CartItemRow";

import "./CartDrawer.styles.scss";

const BASE_CLASS = "cart-drawer";

function pluralItems(count: number): string {
  if (count === 1) return "товар";
  if (count < 5) return "товари";
  return "товарів";
}

const CartDrawer = () => {
  const { isOpen, close } = useCartDrawer();
  const pathname = usePathname();
  const { items, totalCount, subtotal, setQuantity, removeItem } = useCart();

  const hasAnyItems = items.length > 0;
  const totalItemCount = totalCount;

  // Close on route change (e.g. navigating to the full cart page).
  useEffect(() => {
    close();
    // Only react to pathname — close identity is stable per render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Escape to close + lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  return (
    <div className={cn(BASE_CLASS, { "-open": isOpen })} aria-hidden={!isOpen}>
      <button
        type="button"
        className={`${BASE_CLASS}_overlay`}
        aria-label="Закрити кошик"
        tabIndex={isOpen ? 0 : -1}
        onClick={close}
      />

      <aside
        className={`${BASE_CLASS}_panel`}
        role="dialog"
        aria-modal="true"
        aria-label="Кошик"
      >
        <header className={`${BASE_CLASS}_head`}>
          <Typography variant="h4" as="h2">
            Кошик
          </Typography>
          {hasAnyItems && (
            <Typography variant="body2" color="muted">
              {totalItemCount} {pluralItems(totalItemCount)}
            </Typography>
          )}
          <IconButton
            variant="ghost"
            size="sm"
            className={`${BASE_CLASS}_close`}
            aria-label="Закрити"
            onClick={close}
          >
            <X size={18} strokeWidth={2} />
          </IconButton>
        </header>

        <div className={`${BASE_CLASS}_body`}>
          {hasAnyItems ? (
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
          ) : (
            <EmptyState
              icon={<ShoppingBag size={40} strokeWidth={1.5} />}
              title="Кошик порожній"
              titleAs="h3"
              description="Додайте товари з каталогу, щоб оформити замовлення."
              action={
                <Button as={Link} href="/products" onClick={close}>
                  До каталогу
                </Button>
              }
            />
          )}
        </div>

        {hasAnyItems && (
          <footer className={`${BASE_CLASS}_foot`}>
            <div className={`${BASE_CLASS}_total`}>
              <Typography variant="subtitle1">Разом</Typography>
              <Typography variant="subtitle1">
                {formatPrice(subtotal)}
              </Typography>
            </div>
            <Button as={Link} href="/cart" fullWidth onClick={close}>
              Оформити замовлення
              <ArrowRight size={16} strokeWidth={2} />
            </Button>
            <Button variant="ghost" fullWidth onClick={close}>
              Продовжити покупки
            </Button>
          </footer>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
