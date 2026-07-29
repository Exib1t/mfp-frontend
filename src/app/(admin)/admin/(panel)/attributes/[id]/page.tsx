import { notFound } from "next/navigation";
import AdminAttributeFormLoader from "@/views/admin/AdminAttributeForm/AdminAttributeFormLoader";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const attributeId = Number(id);

  if (!Number.isInteger(attributeId) || attributeId <= 0) notFound();

  return <AdminAttributeFormLoader attributeId={attributeId} />;
}
