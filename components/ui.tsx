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

export function CategoryIcon({ category }: { category: string }) {
  const icons: Record<string, string> = {
    Plumbing: "🔧",
    Electrical: "⚡",
    HVAC: "❄️",
    Structural: "🏗️",
    Appliance: "🍳",
    "Pest Control": "🐛",
    Cleaning: "🧹",
    Security: "🔒",
    Landscaping: "🌿",
    General: "📋",
  };

  return (
    <span
      className="w-10 h-10 rounded-xl bg-[rgba(99,102,241,0.1)] flex items-center justify-center text-lg"
      title={category}
    >
      {icons[category] || "📋"}
    </span>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
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
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-[var(--neutral-400)] max-w-md">{description}</p>
    </div>
  );
}
