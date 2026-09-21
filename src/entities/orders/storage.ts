import type { Order } from "./types";

const STORAGE_KEY = "mfp-confirmed-order";

/**
 * Keeps the order `POST /orders` returned for the confirmation page. Session
 * storage, so a reload of `/orders/[id]` still shows it, while the customer's
 * contacts do not outlive the tab.
 */
export function saveConfirmedOrder(order: Order): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch {
    // storage unavailable — the page falls back to its not-found state
  }
}

/** The order saved at checkout, if it is the one asked for. */
export function readConfirmedOrder(id: number): Order | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const order = JSON.parse(raw) as Order;
    return order.id === id ? order : null;
  } catch {
    return null;
  }
}
