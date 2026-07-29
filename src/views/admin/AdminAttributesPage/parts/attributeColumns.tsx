import Link from "next/link";
import type { DataTableColumn } from "@/components/admin/DataTable/types";
import Badge from "@/components/controls/Badge/Badge";
import {
  type AdminAttribute,
  ATTRIBUTE_TYPE_LABELS,
  OPTION_BACKED_TYPES,
} from "@/entities/admin/attributes/types";

const BASE_CLASS = "admin-attributes";

interface ColumnsOptions {
  onDelete: (attribute: AdminAttribute) => void;
}

export function buildAttributeColumns({
  onDelete,
}: ColumnsOptions): DataTableColumn<AdminAttribute>[] {
  return [
    {
      key: "name",
      header: "Характеристика",
      width: "minmax(0, 2fr)",
      render: (attribute) => (
        <div className={`${BASE_CLASS}_name-cell`}>
          <Link
            href={`/admin/attributes/${attribute.id}`}
            className={`${BASE_CLASS}_name`}
          >
            {attribute.name}
          </Link>
          <code className={`${BASE_CLASS}_code`}>{attribute.code}</code>
        </div>
      ),
    },
    {
      key: "type",
      header: "Тип",
      width: "minmax(0, 1fr)",
      render: (attribute) => ATTRIBUTE_TYPE_LABELS[attribute.type],
    },
    {
      key: "group",
      header: "Група",
      width: "minmax(0, 1fr)",
      render: (attribute) => attribute.group_name ?? "—",
    },
    {
      key: "options",
      header: "Значень",
      width: "100px",
      align: "right",
      render: (attribute) =>
        OPTION_BACKED_TYPES.includes(attribute.type)
          ? String(attribute.options.length)
          : "—",
    },
    {
      key: "flags",
      header: "",
      width: "170px",
      render: (attribute) => (
        <div className={`${BASE_CLASS}_flags`}>
          {attribute.is_filterable && (
            <Badge variant="success" size="sm">
              Фільтр
            </Badge>
          )}
          {!attribute.is_visible && (
            <Badge variant="warning" size="sm">
              Прихована
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      header: "",
      width: "90px",
      align: "right",
      render: (attribute) => (
        <button
          type="button"
          className={`${BASE_CLASS}_delete`}
          onClick={() => onDelete(attribute)}
        >
          Видалити
        </button>
      ),
    },
  ];
}
