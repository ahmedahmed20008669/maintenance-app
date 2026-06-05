/**
 * @license
 * © 2026 Dr. Mohamed Samir Hassan, MSc, PhD R. All rights reserved.
 * 
 * This code is part of the technical challenge submission for the position of
 * AI and Innovation Manager. Unauthorized copying, modification, distribution,
 * or use of this source code or any portion of it without the express written
 * permission of Dr. Mohamed Samir Hassan is strictly prohibited.
 * 
 * Digital Signature / Verification: mohamedsamirhassan-portfolio-verification-2026
 */

import type { Metadata } from "next";
import { Poppins, Prompt } from "next/font/google";
import Link from "next/link";
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
  authors: [{ name: "Dr. Mohamed Samir Hassan, MSc, PhD R", url: "https://www.linkedin.com/in/mohamedsamirhassan/" }],
  other: {
    copyright: "© 2026 Dr. Mohamed Samir Hassan. All rights reserved. Verification signature: MSH-AI-INNOVATION-MANAGER-2026",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppinsFont.variable} ${promptFont.variable} h-full antialiased`}>
      <body 
        className="min-h-full flex flex-col gradient-bg"
        data-author="Dr. Mohamed Samir Hassan"
        data-signature="MSH-AI-INNOVATION-MANAGER-2026"
      >
        <div dangerouslySetInnerHTML={{ __html: "<!-- © 2026 Dr. Mohamed Samir Hassan, MSc, PhD R. All rights reserved. Verification Signature: MSH-AI-INNOVATION-MANAGER-2026 -->" }} />
        {children}
        <footer className="mt-auto py-8 border-t border-[rgba(255,255,255,0.03)] bg-[rgba(10,12,30,0.4)] backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-4 text-center flex flex-col items-center">
            <div className="mb-4">
              <Link href="/about" className="text-sm font-semibold text-[var(--primary-300)] hover:text-white transition-colors border-b border-[var(--primary-300)] hover:border-white pb-0.5 font-prompt">
                My Journey (About Me)
              </Link>
            </div>
            <p className="text-xs text-[var(--neutral-400)] leading-relaxed font-prompt">
              Designed & Developed by{" "}
              <span className="text-[var(--primary-300)] font-semibold">
                Dr. Mohamed Samir Hassan, MSc, PhD R
              </span>{" "}
              — AI and Innovation Manager Portfolio & MaintenanceAI Portal.
            </p>
            <p className="text-[10px] text-[var(--neutral-600)] mt-2 font-mono">
              © 2026 All rights reserved. Protected by digital signature: MSH-AI-INNOVATION-MANAGER-2026
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
