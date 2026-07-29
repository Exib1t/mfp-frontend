import { notFound } from "next/navigation";
import AdminOrderPageLoader from "@/views/admin/AdminOrderPage/AdminOrderPageLoader";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const orderId = Number(id);

  if (!Number.isInteger(orderId) || orderId <= 0) notFound();

  return <AdminOrderPageLoader orderId={orderId} />;
}
