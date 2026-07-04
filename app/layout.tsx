import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marjolijn de Vries — Grafisch Vormgever & AI-automatisering",
  description:
    "Grafisch vormgever bij a.s.r. met specialisatie in AI & automatisering. Portfolio met zelfgebouwde tools die repeterend werk automatiseren, plus CV.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${inter.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
