import type { components } from "@/lib/api/v1";

export type Order = components["schemas"]["OrderDto"];
export type OrderItem = Order["items"][number];
export type CreateOrderInput = components["schemas"]["CreateOrderDto"];
export type PaymentMethod = CreateOrderInput["payment_method"];
