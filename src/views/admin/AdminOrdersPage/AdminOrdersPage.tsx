"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import DataTable from "@/components/admin/DataTable/DataTable";
import Button from "@/components/controls/Button/Button";
import Input from "@/components/controls/Input/Input";
import Price from "@/components/controls/Price/Price";
import Select from "@/components/controls/Select/Select";
import Typography from "@/components/controls/Typography/Typography";
import {
  type AdminOrdersQuery,
  ORDER_SORT_OPTIONS,
} from "@/entities/admin/orders/types";
import OrderStatusTabs from "./parts/OrderStatusTabs";
import { buildOrderColumns } from "./parts/orderColumns";
import { useOrdersList } from "./useOrdersList";

import "./AdminOrdersPage.styles.scss";

const BASE_CLASS = "admin-orders";

function AdminOrdersPage() {
  const router = useRouter();
  const state = useOrdersList();

  const columns = useMemo(
    () =>
      buildOrderColumns({
        isAdvancing: state.isAdvancing,
        onAdvance: state.advance,
      }),
    [state.isAdvancing, state.advance],
  );

  return (
    <div className={BASE_CLASS}>
      <AdminPageHeader
        title="Замовлення"
        description="Кнопка справа в рядку переводить замовлення на наступний крок — без відкриття картки."
        actions={
          state.stats && (
            <div className={`${BASE_CLASS}_revenue`}>
              <Typography variant="caption" color="muted">
                Виторг (без скасованих)
              </Typography>
              <Price value={state.stats.total_revenue} />
            </div>
          )
        }
      />

      <OrderStatusTabs
        stats={state.stats}
        value={state.status}
        onChange={state.changeStatus}
      />

      <div className={`${BASE_CLASS}_toolbar`}>
        <Input
          placeholder="Номер, імʼя, телефон або e-mail…"
          value={state.search}
          onChange={(event) => state.changeSearch(event.target.value)}
          aria-label="Пошук замовлень"
        />
        <Select
          value={state.sort ?? "newest"}
          options={[...ORDER_SORT_OPTIONS]}
          onChange={(value) =>
            state.changeSort(value as AdminOrdersQuery["sort"])
          }
          aria-label="Сортування"
        />
      </div>

      {state.isError ? (
        <Typography variant="body2" color="muted">
          Не вдалося завантажити замовлення.
        </Typography>
      ) : (
        <DataTable
          rows={state.orders}
          columns={columns}
          getRowId={(order) => order.id}
          isLoading={state.isLoading}
          emptyMessage="Замовлень не знайдено"
          onRowClick={(order) => router.push(`/admin/orders/${order.id}`)}
        />
      )}

      {state.meta && state.meta.pages > 1 && (
        <div className={`${BASE_CLASS}_pagination`}>
          <Button
            variant="ghost"
            size="sm"
            disabled={state.page <= 1}
            onClick={() => state.setPage(state.page - 1)}
          >
            Назад
          </Button>
          <Typography variant="caption" color="muted">
            {state.meta.page} / {state.meta.pages}
          </Typography>
          <Button
            variant="ghost"
            size="sm"
            disabled={state.page >= state.meta.pages}
            onClick={() => state.setPage(state.page + 1)}
          >
            Далі
          </Button>
        </div>
      )}
    </div>
  );
}

export default AdminOrdersPage;
