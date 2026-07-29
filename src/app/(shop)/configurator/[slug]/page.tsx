import ConfiguratorPage from "@/views/ConfiguratorPage/ConfiguratorPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <ConfiguratorPage slug={slug} />;
}
