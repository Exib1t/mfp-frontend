"use client";

import { cn } from "@/lib/utils/cn";

import "./AdminTabs.styles.scss";

export interface AdminTab<T extends string> {
  id: T;
  label: string;
  /** Small trailing counter, e.g. number of variants. */
  badge?: number;
}

interface AdminTabsProps<T extends string> {
  tabs: AdminTab<T>[];
  value: T;
  onChange: (id: T) => void;
  className?: string;
}

const BASE_CLASS = "admin-tabs";

function AdminTabs<T extends string>({
  tabs,
  value,
  onChange,
  className,
}: AdminTabsProps<T>) {
  return (
    <div className={cn(BASE_CLASS, className)} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={tab.id === value}
          className={cn(`${BASE_CLASS}_tab`, { "-active": tab.id === value })}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          {tab.badge !== undefined && (
            <span className={`${BASE_CLASS}_badge`}>{tab.badge}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export default AdminTabs;
