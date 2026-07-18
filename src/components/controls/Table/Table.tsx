import type { ReactNode } from "react";
import EmptyState from "@/components/controls/EmptyState/EmptyState";
import { cn } from "@/lib/utils/cn";

import "./Table.styles.scss";

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  width?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string | number;
  emptyMessage?: string;
  className?: string;
}

const BASE_CLASS = "table";

function Table<T>({
  columns,
  rows,
  getRowKey,
  emptyMessage = "Немає даних",
  className,
}: TableProps<T>) {
  if (rows.length === 0) {
    return <EmptyState title={emptyMessage} />;
  }

  return (
    <div className={cn(BASE_CLASS, className)}>
      <table className={`${BASE_CLASS}_grid`}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ width: col.width }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((col) => (
                <td key={col.key}>{col.render(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
