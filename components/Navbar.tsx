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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UserIcon, ToolsIcon, ChartIcon } from "./ui";

const navItems = [
  { href: "/", label: "Portfolio", icon: <UserIcon className="w-4 h-4" /> },
  { href: "/submit", label: "Maintenance Demo", icon: <ToolsIcon className="w-4 h-4" /> },
  { href: "/dashboard", label: "Dashboard", icon: <ChartIcon className="w-4 h-4" /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="glass sticky top-0 z-50 border-b border-[rgba(0,153,173,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-white/95 p-2 rounded-xl backdrop-blur-sm shadow-md group-hover:shadow-lg group-hover:bg-white transition-all border border-[rgba(255,255,255,0.5)]">
              <img 
                src="/adeer-logo.png" 
                alt="Adeer International Logo" 
                className="h-8 w-auto object-contain drop-shadow-sm"
              />
            </div>
          </Link>

          {/* Desktop Nav & Profile */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 font-prompt
                      ${
                        isActive
                          ? "bg-[rgba(0,153,173,0.15)] text-[var(--primary-300)] border border-[rgba(0,153,173,0.2)]"
                          : "text-[var(--foreground)] hover:text-[var(--link-hover)] hover:bg-[rgba(255,255,255,0.05)]"
                      }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2 pl-3 border-l border-[rgba(255,255,255,0.15)]">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[var(--primary-400)] shadow-sm">
                <img 
                  src="/profile-pic.png" 
                  alt="Mohamed Samir Hassan" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white leading-none">M. Samir</span>
                <span className="text-[10px] text-[var(--neutral-400)] leading-none mt-0.5 font-medium">PhD, R</span>
              </div>
            </div>
          </div>

          {/* Mobile Profile & Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--primary-400)]">
              <img 
                src="/profile-pic.png" 
                alt="Mohamed Samir Hassan" 
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-[var(--neutral-400)] hover:text-white p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-light border-t border-[rgba(0,153,173,0.1)] fade-in">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-all font-prompt
                    ${
                      isActive
                        ? "bg-[rgba(0,153,173,0.15)] text-[var(--primary-300)]"
                        : "text-[var(--foreground)] hover:text-[var(--link-hover)] hover:bg-[rgba(255,255,255,0.05)]"
                    }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-[rgba(255,255,255,0.08)] flex items-center gap-3 px-4 pb-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--primary-400)] shrink-0">
                <img 
                  src="/profile-pic.png" 
                  alt="Mohamed Samir Hassan" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">Mohamed Samir Hassan</span>
                <span className="text-xs text-[var(--neutral-400)]">AI & Innovation Manager, PhD R</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
