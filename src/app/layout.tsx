import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import AdminAwareChrome from "@/app/AdminAwareChrome";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" className={`${geistSans.variable} ${inter.variable}`}>
        <body>
          <AdminAwareChrome>{children}</AdminAwareChrome>
        </body>
      </html>
    </Providers>
  );
}
