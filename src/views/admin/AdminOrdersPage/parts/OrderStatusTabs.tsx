"use client";

import {
  ORDER_STATUS_LABELS,
  type OrderStats,
  type OrderStatus,
} from "@/entities/admin/orders/types";
import { cn } from "@/lib/utils/cn";

interface OrderStatusTabsProps {
  stats?: OrderStats;
  value: OrderStatus | null;
  onChange: (status: OrderStatus | null) => void;
}

const BASE_CLASS = "admin-orders";

/** Status filter with live counts; null is the "all" tab. */
function OrderStatusTabs({ stats, value, onChange }: OrderStatusTabsProps) {
  const tabs: { id: OrderStatus | null; label: string; count?: number }[] = [
    { id: null, label: "Усі", count: stats?.total_orders },
    ...(stats?.by_status ?? []).map((row) => ({
      id: row.status,
      label: ORDER_STATUS_LABELS[row.status],
      count: row.orders,
    })),
  ];

  return (
    <div className={`${BASE_CLASS}_tabs`} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id ?? "all"}
          type="button"
          role="tab"
          aria-selected={value === tab.id}
          className={cn(`${BASE_CLASS}_tab`, { "-active": value === tab.id })}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`${BASE_CLASS}_tab-count`}>{tab.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export default OrderStatusTabs;
