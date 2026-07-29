"use client";

import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import ConfirmDialog from "@/components/admin/ConfirmDialog/ConfirmDialog";
import Badge from "@/components/controls/Badge/Badge";
import Button from "@/components/controls/Button/Button";
import {
  type AdminOrder,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_VARIANTS,
} from "@/entities/admin/orders/types";
import { formatDateTime } from "@/lib/utils/formatDate";
import { itemsCount } from "../AdminOrdersPage/helpers";
import OrderCustomerCard from "./parts/OrderCustomerCard";
import OrderItemsCard from "./parts/OrderItemsCard";
import OrderNotesCard from "./parts/OrderNotesCard";
import OrderPaymentCard from "./parts/OrderPaymentCard";
import OrderToolbar from "./parts/OrderToolbar";
import { useOrderActions } from "./useOrderActions";

import "./AdminOrderPage.styles.scss";

interface AdminOrderPageProps {
  order: AdminOrder;
}

const BASE_CLASS = "admin-order";

function AdminOrderPage({ order }: AdminOrderPageProps) {
  const actions = useOrderActions(order);

  return (
    <div className={BASE_CLASS}>
      <AdminPageHeader
        title={`Замовлення #${order.id}`}
        description={`${formatDateTime(order.created_at)} · ${itemsCount(order)} шт.`}
        actions={
          <>
            <Badge variant={ORDER_STATUS_VARIANTS[order.status]}>
              {ORDER_STATUS_LABELS[order.status]}
            </Badge>
            <Button as={Link} href="/admin/orders" variant="ghost">
              До списку
            </Button>
            <Button type="button" variant="ghost" onClick={actions.openArchive}>
              Архівувати
            </Button>
          </>
        }
      />

      <OrderToolbar
        order={order}
        isSaving={actions.isSaving}
        onStatus={actions.setStatus}
      />

      <div className={`${BASE_CLASS}_grid`}>
        <div className={`${BASE_CLASS}_main`}>
          <OrderItemsCard order={order} />
          <OrderNotesCard order={order} onPatch={actions.patch} />
        </div>

        <div className={`${BASE_CLASS}_side`}>
          <OrderPaymentCard
            order={order}
            isSaving={actions.isSaving}
            onPaymentStatus={actions.setPaymentStatus}
          />
          <OrderCustomerCard order={order} onPatch={actions.patch} />
        </div>
      </div>

      <ConfirmDialog
        open={actions.isArchiveOpen}
        title="Архівувати замовлення?"
        description={`Замовлення #${order.id} зникне зі списку. Дані залишаться в базі.`}
        confirmLabel="Архівувати"
        isPending={actions.isArchiving}
        onConfirm={actions.archive}
        onCancel={actions.closeArchive}
      />
    </div>
  );
}

export default AdminOrderPage;
