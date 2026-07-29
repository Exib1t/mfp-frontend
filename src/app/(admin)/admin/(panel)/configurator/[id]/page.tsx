import { notFound } from "next/navigation";
import AdminConfiguratorFormLoader from "@/views/admin/AdminConfiguratorForm/AdminConfiguratorFormLoader";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const configuratorId = Number(id);

  if (!Number.isInteger(configuratorId) || configuratorId <= 0) notFound();

  return <AdminConfiguratorFormLoader configuratorId={configuratorId} />;
}
