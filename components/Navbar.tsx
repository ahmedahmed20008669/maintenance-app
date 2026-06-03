"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/submit", label: "Submit Request", icon: "📝" },
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/notifications", label: "Notifications", icon: "🔔" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="glass sticky top-0 z-50 border-b border-[rgba(99,102,241,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--primary-500)] to-[#a78bfa] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[rgba(99,102,241,0.3)] group-hover:shadow-[rgba(99,102,241,0.5)] transition-shadow">
              M
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="gradient-text">Maintenance</span>
              <span className="text-[var(--neutral-400)]">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                    ${
                      isActive
                        ? "bg-[rgba(99,102,241,0.15)] text-[var(--primary-300)] border border-[rgba(99,102,241,0.2)]"
                        : "text-[var(--neutral-400)] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
                    }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[var(--neutral-400)] hover:text-white p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-light border-t border-[rgba(99,102,241,0.1)] fade-in">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-[rgba(99,102,241,0.15)] text-[var(--primary-300)]"
                        : "text-[var(--neutral-400)] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
                    }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
