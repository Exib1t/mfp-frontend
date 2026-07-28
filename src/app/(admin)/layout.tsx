import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Адмінпанель — My Fairy Place",
  // The panel must never end up in search results.
  robots: { index: false, follow: false },
};

export default function AdminAreaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
