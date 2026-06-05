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

import { ReactNode } from "react";

// ===== SYSTEM THEMED SVG ICONS =====

export function UserIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function HomeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function CalendarIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function DollarIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

export function RefreshIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}

export function BellIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

export function InboxIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

export function RobotIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M9 15h.01M15 15h.01M12 8V4m0 0H8m4 0h4M2 14h2m16 0h2" />
    </svg>
  );
}

export function RocketIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5M12 2C6.5 2 2 6.5 2 12c0 2.1.6 4.1 1.7 5.7l12.6-12.6C14.7 4 13.5 3.1 12 2zM12 2c5.5 0 10 4.5 10 10 0 1.5-.9 2.7-2.1 4.3L7.3 3.7C8.9 2.5 10.5 2 12 2z" />
      <path d="M19 19s-2.5 1-3.5-2.5m-9-9 9.5 9.5" />
    </svg>
  );
}

export function ToolsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

export function ChartIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

// ===== EXISTING UI BADGES =====

export function StatusBadge({ status }: { status: string }) {
  const statusMap: Record<string, string> = {
    Pending: "badge-pending",
    "In Progress": "badge-in-progress",
    Resolved: "badge-resolved",
    Cancelled: "badge-cancelled",
  };

  const dotMap: Record<string, string> = {
    Pending: "bg-[#fbbf24]",
    "In Progress": "bg-[#a5b4fc]",
    Resolved: "bg-[#6ee7b7]",
    Cancelled: "bg-[#fca5a5]",
  };

  return (
    <span className={`badge ${statusMap[status] || "badge-pending"}`}>
      <span
        className={`w-1.5 h-1.5 rounded-full ${dotMap[status] || "bg-[#fbbf24]"}`}
      />
      {status}
    </span>
  );
}

export function SeverityIndicator({ severity }: { severity: string }) {
  const colorMap: Record<string, string> = {
    Low: "severity-low",
    Medium: "severity-medium",
    High: "severity-high",
    Critical: "severity-critical",
  };

  const bgMap: Record<string, string> = {
    Low: "bg-[rgba(16,185,129,0.1)]",
    Medium: "bg-[rgba(245,158,11,0.1)]",
    High: "bg-[rgba(251,146,60,0.1)]",
    Critical: "bg-[rgba(248,113,113,0.1)]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${colorMap[severity] || ""} ${bgMap[severity] || ""}`}
    >
      {severity === "Critical" && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#f87171] animate-pulse" />
      )}
      {severity}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: number }) {
  const colors: Record<number, string> = {
    1: "text-[#f87171] bg-[rgba(248,113,113,0.1)]",
    2: "text-[#fb923c] bg-[rgba(251,146,60,0.1)]",
    3: "text-[#fbbf24] bg-[rgba(245,158,11,0.1)]",
    4: "text-[#a5b4fc] bg-[rgba(165,180,252,0.1)]",
    5: "text-[#6ee7b7] bg-[rgba(16,185,129,0.1)]",
  };

  return (
    <span
      className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${colors[priority] || colors[3]}`}
    >
      P{priority}
    </span>
  );
}

// ===== CATEGORY SVG COMPONENT =====

function getCategorySvg(category: string) {
  const className = "w-5 h-5 stroke-[2px]";
  switch (category) {
    case "Plumbing":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case "Electrical":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "HVAC":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
        </svg>
      );
    case "Structural":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
        </svg>
      );
    case "Appliance":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="4" y1="10" x2="20" y2="10" />
          <circle cx="12" cy="6" r="1.5" />
          <circle cx="8" cy="15" r="1" />
          <circle cx="16" cy="15" r="1" />
        </svg>
      );
    case "Pest Control":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="6" y="6" width="12" height="12" rx="6" />
          <path d="M12 3v3M6 12H3M21 12h-3M6 9l-3-2M18 9l3-2M6 15l-3 2M18 15l3 2" />
        </svg>
      );
    case "Cleaning":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 3c-1.2 0-2.4.5-3.3 1.4L4.3 8.8c-.8.8-.8 2.1 0 2.9l8.8 8.8c.8.8 2.1.8 2.9 0l4.4-4.4c.9-.9 1.4-2.1 1.4-3.3m-9.8-9.8 8.8 8.8" />
          <path d="m3 21 9-9M14 3l1 1M18 7l1 1M16 4l2 2" />
        </svg>
      );
    case "Security":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "Landscaping":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 21 3c-1.5 4-2 5.5-3.1 11.2A7 7 0 0 1 11 20z" />
          <path d="M9 11l5 5" />
        </svg>
      );
    case "General":
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <line x1="9" y1="16" x2="15" y2="16" />
        </svg>
      );
  }
}

export function CategoryIcon({ category }: { category: string }) {
  return (
    <span
      className="w-10 h-10 rounded-xl bg-[rgba(99,102,241,0.1)] flex items-center justify-center text-[var(--primary-400)] shrink-0 border border-[rgba(99,102,241,0.15)]"
      title={category}
    >
      {getCategorySvg(category)}
    </span>
  );
}

// ===== LOADING & EMPTY STATES =====

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-12 ${className || ''}`}>
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-[var(--neutral-700)]" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--primary-500)] animate-spin" />
      </div>
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="text-4xl text-[var(--primary-400)] mb-4 flex items-center justify-center">
        {icon}
      </span>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-[var(--neutral-400)] max-w-md">{description}</p>
    </div>
  );
}
