import { notFound } from "next/navigation";
import AdminCategoryFormLoader from "@/views/admin/AdminCategoryForm/AdminCategoryFormLoader";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const categoryId = Number(id);

  if (!Number.isInteger(categoryId) || categoryId <= 0) notFound();

  return <AdminCategoryFormLoader categoryId={categoryId} />;
}
