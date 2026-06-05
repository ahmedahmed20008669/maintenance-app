"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ToolsIcon, HomeIcon } from "./ui";

const navItems = [
  { href: "/dashboard", label: "My Requests", icon: <HomeIcon className="w-4 h-4" /> },
  { href: "/submit", label: "New Request", icon: <ToolsIcon className="w-4 h-4" /> },
];

export default function TenantNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  return (
    <nav className="glass sticky top-0 z-50 border-b border-[rgba(0,153,173,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="bg-white/95 p-2 rounded-xl backdrop-blur-sm shadow-md group-hover:shadow-lg group-hover:bg-white transition-all border border-[rgba(255,255,255,0.5)]">
              <img 
                src="/adeer-logo.png" 
                alt="Adeer International Logo" 
                className="h-8 w-auto object-contain drop-shadow-sm"
              />
            </div>
            <span className="text-sm font-bold text-[var(--primary-300)] font-prompt hidden sm:block">Tenant Portal</span>
          </Link>

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
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2 rounded-lg text-sm font-medium text-[var(--neutral-400)] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all border border-[var(--neutral-700)]"
            >
              Log Out
            </button>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-[var(--neutral-400)] hover:text-white p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-[var(--neutral-400)] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
