import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import Providers from "@/app/Providers";

import "../assets/styles/main.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
      <html lang="uk" className={`${geistSans.variable} ${inter.variable}`}>
        <body>{children}</body>
      </html>
    </Providers>
  );
}
