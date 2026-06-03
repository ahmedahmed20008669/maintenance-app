import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MaintenanceAI — Smart Property Management",
  description:
    "AI-powered maintenance request system for property managers. Automate classification, prioritization, and coordination of tenant requests.",
  keywords: [
    "property management",
    "maintenance",
    "AI",
    "automation",
    "tenant requests",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col gradient-bg overflow-x-hidden">{children}</body>
    </html>
  );
}
