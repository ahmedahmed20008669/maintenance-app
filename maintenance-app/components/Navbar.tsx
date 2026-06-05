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

function InfoIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );
}

const navItems = [
  { href: "/", label: "Portfolio", icon: <UserIcon className="w-4 h-4" /> },
  { href: "/submit", label: "Maintenance Demo", icon: <ToolsIcon className="w-4 h-4" /> },
  { href: "/dashboard", label: "Dashboard", icon: <ChartIcon className="w-4 h-4" /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

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

            <div className="relative">
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 pl-3 border-l border-[rgba(255,255,255,0.15)] hover:opacity-90 transition-opacity focus:outline-none cursor-pointer text-left"
              >
                <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[var(--primary-400)] shadow-sm">
                  <img 
                    src="/profile-pic.png" 
                    alt="Mohamed Samir Hassan" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white leading-none flex items-center gap-1">
                    M. Samir
                    <svg className={`w-3 h-3 text-[var(--neutral-400)] transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  <span className="text-[10px] text-[var(--neutral-400)] leading-none mt-0.5 font-medium">PhD, R</span>
                </div>
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-[#090b16]/95 border border-[rgba(0,153,173,0.3)] shadow-2xl p-5 fade-in z-50 text-left backdrop-blur-md">
                  {/* Header */}
                  <div className="flex items-center gap-3 border-b border-[rgba(255,255,255,0.08)] pb-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--primary-400)] shrink-0">
                      <img 
                        src="/profile-pic.png" 
                        alt="Mohamed Samir Hassan" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-prompt">Dr. Mohamed Samir Hassan</h4>
                      <p className="text-[10.5px] text-[var(--primary-300)] font-medium font-prompt mt-0.5">Principal AI Solutions Architect (PhD R)</p>
                    </div>
                  </div>

                  {/* Expertise Brief */}
                  <div className="space-y-3 mb-5">
                    <h5 className="text-[11px] font-bold text-[var(--neutral-400)] uppercase tracking-wider font-prompt">Core Expertise</h5>
                    <ul className="space-y-2.5 text-xs text-[var(--foreground)]">
                      <li className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-[var(--primary-400)] mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                        <div>
                          <strong className="text-white">AI & Agentic Systems:</strong> Deep Learning, LLMs, and <strong className="text-[var(--primary-300)]">MSHR++</strong> SLM architecture.
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-[var(--primary-400)] mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <div>
                          <strong className="text-white">Cloud & Web Solutions:</strong> Next.js, FastAPI, Azure ML, Docker, and Zoho migrations.
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-[var(--primary-400)] mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                          <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                        <div>
                          <strong className="text-white">Immersive Tech:</strong> VR, AR, XR, 3D Metaverse engines, and Hologram systems.
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Quick Actions / Links */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[rgba(255,255,255,0.05)]">
                    <a 
                      href="https://github.com/MohamedSamirHassanPhD"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-500)] text-white text-xs font-bold hover:from-[var(--primary-500)] hover:to-[var(--primary-400)] transition-all font-prompt shadow-sm text-center"
                    >
                      <span>GitHub</span>
                      <span className="text-[10px]">↗</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/mohamedsamirhassan/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl glass text-white text-xs font-bold hover:bg-[rgba(255,255,255,0.08)] transition-all font-prompt text-center"
                    >
                      <span>LinkedIn</span>
                      <span className="text-[10px]">↗</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Profile & Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-8 h-8 rounded-full overflow-hidden border border-[var(--primary-400)] hover:opacity-90 transition-opacity focus:outline-none cursor-pointer"
            >
              <img 
                src="/profile-pic.png" 
                alt="Mohamed Samir Hassan" 
                className="w-full h-full object-cover"
              />
            </button>
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

            <div className="pt-4 mt-2 border-t border-[rgba(255,255,255,0.08)] px-2 pb-2">
              <div className="flex items-center gap-3 px-2 mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--primary-400)] shrink-0">
                  <img 
                    src="/profile-pic.png" 
                    alt="Mohamed Samir Hassan" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">Mohamed Samir Hassan</span>
                  <span className="text-xs text-[var(--neutral-400)] font-prompt">Principal AI Solutions Architect, PhD R</span>
                </div>
              </div>

              {/* Mobile Expertise Brief */}
              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-xl p-3 mb-4 space-y-2">
                <p className="text-[10px] text-[var(--primary-300)] font-bold uppercase tracking-wider font-prompt">Core Expertise</p>
                <div className="text-[11px] text-[var(--neutral-300)] space-y-1.5 leading-relaxed">
                  <p>• <strong className="text-white">AI & Agents:</strong> LLMs, ML/DL, MSHR++ (SLMs)</p>
                  <p>• <strong className="text-white">Web & Cloud:</strong> Next.js, FastAPI, Azure Functions</p>
                  <p>• <strong className="text-white">Immersive:</strong> VR/AR/XR, 3D Metaverse engines</p>
                </div>
              </div>

              {/* Mobile Links */}
              <div className="grid grid-cols-2 gap-2 px-2">
                <a 
                  href="https://github.com/MohamedSamirHassanPhD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 py-2 rounded-lg bg-[var(--primary-600)] text-white text-xs font-semibold hover:bg-[var(--primary-500)] text-center font-prompt"
                >
                  <span>GitHub</span>
                  <span>↗</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/mohamedsamirhassan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 py-2 rounded-lg glass text-white text-xs font-semibold hover:bg-[rgba(255,255,255,0.05)] text-center font-prompt"
                >
                  <span>LinkedIn</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
