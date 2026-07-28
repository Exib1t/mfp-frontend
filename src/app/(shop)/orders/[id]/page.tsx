import { notFound } from "next/navigation";
import OrderPage from "@/views/OrderPage/OrderPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const orderId = Number(id);

  if (!Number.isInteger(orderId) || orderId <= 0) notFound();

  return <OrderPage orderId={orderId} />;
}
