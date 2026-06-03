import type { Metadata } from "next";
import { Poppins, Prompt } from "next/font/google";
import "./globals.css";

const poppinsFont = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const promptFont = Prompt({
  variable: "--font-prompt",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
    <html lang="en" className={`${poppinsFont.variable} ${promptFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col gradient-bg">{children}</body>
    </html>
  );
}
