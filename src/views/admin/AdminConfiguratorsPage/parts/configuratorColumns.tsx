import Link from "next/link";
import type { DataTableColumn } from "@/components/admin/DataTable/types";
import Badge from "@/components/controls/Badge/Badge";
import Price from "@/components/controls/Price/Price";
import type { AdminConfigurator } from "@/entities/admin/configurators/types";

const BASE_CLASS = "admin-configurators";

interface ColumnsOptions {
  onDelete: (configurator: AdminConfigurator) => void;
}

function countOptions(configurator: AdminConfigurator): number {
  return configurator.groups.reduce(
    (total, group) => total + group.options.length,
    0,
  );
}

export function buildConfiguratorColumns({
  onDelete,
}: ColumnsOptions): DataTableColumn<AdminConfigurator>[] {
  return [
    {
      key: "name",
      header: "Конфігуратор",
      width: "minmax(0, 2fr)",
      render: (configurator) => (
        <div className={`${BASE_CLASS}_name-cell`}>
          <Link
            href={`/admin/configurator/${configurator.id}`}
            className={`${BASE_CLASS}_name`}
          >
            {configurator.name}
          </Link>
          <span className={`${BASE_CLASS}_slug`}>/{configurator.slug}</span>
        </div>
      ),
    },
    {
      key: "steps",
      header: "Кроків",
      width: "100px",
      align: "right",
      render: (configurator) => String(configurator.groups.length),
    },
    {
      key: "options",
      header: "Варіантів",
      width: "110px",
      align: "right",
      render: (configurator) => String(countOptions(configurator)),
    },
    {
      key: "base_price",
      header: "Базова ціна",
      width: "140px",
      align: "right",
      render: (configurator) => (
        <Price value={configurator.base_price} size="sm" />
      ),
    },
    {
      key: "status",
      header: "Статус",
      width: "130px",
      render: (configurator) =>
        configurator.is_active ? (
          <Badge variant="success" size="sm">
            Активний
          </Badge>
        ) : (
          <Badge variant="warning" size="sm">
            Вимкнений
          </Badge>
        ),
    },
    {
      key: "actions",
      header: "",
      width: "90px",
      align: "right",
      render: (configurator) => (
        <button
          type="button"
          className={`${BASE_CLASS}_delete`}
          onClick={() => onDelete(configurator)}
        >
          Видалити
        </button>
      ),
    },
  ];
}
