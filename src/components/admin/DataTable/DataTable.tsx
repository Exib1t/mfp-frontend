"use client";

import Typography from "@/components/controls/Typography/Typography";
import { cn } from "@/lib/utils/cn";
import type { DataTableProps } from "./types";

import "./DataTable.styles.scss";

const BASE_CLASS = "data-table";
const SKELETON_ROWS = [0, 1, 2, 3, 4];

/** CSS-grid table: columns are declared once and drive header and body alike. */
function DataTable<T>({
  rows,
  columns,
  getRowId,
  isLoading = false,
  emptyMessage = "Нічого не знайдено",
  onRowClick,
  className,
}: DataTableProps<T>) {
  const gridTemplate = columns
    .map((column) => column.width ?? "minmax(0, 1fr)")
    .join(" ");

  if (isLoading) {
    return (
      <div className={cn(BASE_CLASS, className)}>
        <div
          className={`${BASE_CLASS}_head`}
          style={{ gridTemplateColumns: gridTemplate }}
        >
          {columns.map((column) => (
            <span key={column.key} data-align={column.align ?? "left"}>
              {column.header}
            </span>
          ))}
        </div>
        {SKELETON_ROWS.map((key) => (
          <div key={key} className={`${BASE_CLASS}_skeleton`} />
        ))}
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className={cn(BASE_CLASS, className)}>
        <div className={`${BASE_CLASS}_empty`}>
          <Typography variant="body2" color="muted">
            {emptyMessage}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(BASE_CLASS, className)}>
      <div
        className={`${BASE_CLASS}_head`}
        style={{ gridTemplateColumns: gridTemplate }}
      >
        {columns.map((column) => (
          <span key={column.key} data-align={column.align ?? "left"}>
            {column.header}
          </span>
        ))}
      </div>

      <div className={`${BASE_CLASS}_body`}>
        {rows.map((row) => (
          <div
            key={getRowId(row)}
            className={cn(`${BASE_CLASS}_row`, {
              "-clickable": Boolean(onRowClick),
            })}
            style={{ gridTemplateColumns: gridTemplate }}
            {...(onRowClick && {
              role: "button",
              tabIndex: 0,
              onClick: () => onRowClick(row),
              onKeyDown: (event: React.KeyboardEvent) => {
                if (event.key === "Enter") onRowClick(row);
              },
            })}
          >
            {columns.map((column) => (
              <div
                key={column.key}
                className={`${BASE_CLASS}_cell`}
                data-align={column.align ?? "left"}
              >
                {column.render(row)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataTable;
