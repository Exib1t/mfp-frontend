import type { Metadata } from "next";
import { Onest } from "next/font/google";
import Providers from "@/app/Providers";

import "../assets/styles/main.scss";

/**
 * The whole system is one family — the admin panel's. Cyrillic is not optional
 * here: the catalogue, every product name and the entire UI are Ukrainian.
 */
const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Fairy Place",
  description: "Web store",
};

/**
 * Owns only the document shell. Storefront chrome lives in `(shop)/layout`,
 * the admin panel in `(admin)/layout` — they must not leak into each other.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="uk" className={onest.variable}>
        <body>{children}</body>
      </html>
    </Providers>
  );
}
