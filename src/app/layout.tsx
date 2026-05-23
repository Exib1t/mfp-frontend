import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import Providers from "@/app/Providers";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";

import "../assets/styles/main.css";

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
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
