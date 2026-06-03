"use client";

import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import { ToastProvider, useToast } from "@/components/Toast";
import {
  StatusBadge,
  SeverityIndicator,
  PriorityBadge,
  CategoryIcon,
  LoadingSpinner,
  EmptyState,
} from "@/components/ui";

interface Request {
  id: string;
  tenantName: string;
  tenantEmail: string;
  tenantUnit: string;
  rawInput: string;
  category: string;
  severity: string;
  priority: number;
  status: string;
  assignedTo: string | null;
  summary: string;
  actionSteps: string;
  estimatedCost: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

const SERVICE_PROVIDERS = [
  "QuickFix Plumbing Co.",
  "BrightSpark Electricians",
  "AirFlow HVAC Solutions",
  "BuildRight Structural",
  "AppliancePro Services",
  "GreenGuard Pest Control",
  "SparkleClean Janitorial",
  "SafeGuard Security",
  "EverGreen Landscaping",
  "HandyHelp General Services",
];

function DashboardContent() {
  const { addToast } = useToast();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchRequests = useCallback(async () => {
    try {
      const res = await fetch("/api/requests");
      const data = await res.json();
      setRequests(data);
    } catch {
      addToast({
        type: "error",
        title: "Error",
        message: "Failed to fetch requests.",
      });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const updateRequest = async (
    id: string,
    data: { status?: string; assignedTo?: string }
  ) => {
    try {
      const res = await fetch(`/api/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();

      addToast({
        type: "success",
        title: "Updated",
        message: `Request ${data.status ? `status changed to ${data.status}` : `assigned to ${data.assignedTo}`}.`,
      });

      fetchRequests();
      if (selectedRequest?.id === id) {
        const updated = await res.json();
        setSelectedRequest(updated);
      }
    } catch {
      addToast({
        type: "error",
        title: "Error",
        message: "Failed to update request.",
      });
    }
  };

  // Filter logic
  const filtered = requests.filter((r) => {
    if (filterStatus !== "All" && r.status !== filterStatus) return false;
    if (filterCategory !== "All" && r.category !== filterCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.tenantName.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.rawInput.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Stats
  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "Pending").length,
    inProgress: requests.filter((r) => r.status === "In Progress").length,
    resolved: requests.filter((r) => r.status === "Resolved").length,
    critical: requests.filter((r) => r.severity === "Critical").length,
  };

  const categories = [
    "All",
    ...Array.from(new Set(requests.map((r) => r.category))),
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 fade-in">
        <h1 className="text-3xl font-extrabold text-white mb-2">
          Operations Dashboard
        </h1>
        <p className="text-[var(--neutral-400)]">
          Manage and track all maintenance requests in real-time.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8 fade-in">
        {[
          {
            label: "Total",
            value: stats.total,
            color: "var(--primary-400)",
            bg: "rgba(99,102,241,0.1)",
          },
          {
            label: "Pending",
            value: stats.pending,
            color: "#fbbf24",
            bg: "rgba(245,158,11,0.1)",
          },
          {
            label: "In Progress",
            value: stats.inProgress,
            color: "#a5b4fc",
            bg: "rgba(99,102,241,0.1)",
          },
          {
            label: "Resolved",
            value: stats.resolved,
            color: "#6ee7b7",
            bg: "rgba(16,185,129,0.1)",
          },
          {
            label: "Critical",
            value: stats.critical,
            color: "#f87171",
            bg: "rgba(248,113,113,0.1)",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass rounded-xl p-4 card-hover"
          >
            <p className="text-xs text-[var(--neutral-500)] font-medium uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <p
              className="text-2xl font-extrabold"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center slide-up">
        <div className="flex-1 w-full">
          <input
            type="text"
            placeholder="Search by name, description, category, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-[var(--neutral-800)] border border-[var(--neutral-700)] text-white placeholder-[var(--neutral-500)] text-sm"
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-[var(--neutral-800)] border border-[var(--neutral-700)] text-white text-sm cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-[var(--neutral-800)] border border-[var(--neutral-700)] text-white text-sm cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
          <button
            onClick={fetchRequests}
            className="px-4 py-2.5 rounded-lg bg-[var(--neutral-800)] border border-[var(--neutral-700)] text-[var(--neutral-400)] hover:text-white hover:border-[var(--primary-500)] transition-all text-sm"
            title="Refresh"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Request List */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="glass rounded-xl">
              <EmptyState
                icon="📭"
                title="No Requests Found"
                description="No maintenance requests match your current filters. Try adjusting your search or submit a new request."
              />
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((request, i) => (
                <div
                  key={request.id}
                  onClick={() => setSelectedRequest(request)}
                  className={`glass rounded-xl p-4 cursor-pointer card-hover fade-in ${
                    selectedRequest?.id === request.id
                      ? "border-[var(--primary-500)] glow-primary"
                      : ""
                  }`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="flex items-start gap-4">
                    <CategoryIcon category={request.category} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-white truncate">
                          {request.summary || request.rawInput}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <StatusBadge status={request.status} />
                        <SeverityIndicator severity={request.severity} />
                        <PriorityBadge priority={request.priority} />
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[var(--neutral-500)]">
                        <span>👤 {request.tenantName}</span>
                        {request.tenantUnit && (
                          <span>🏠 {request.tenantUnit}</span>
                        )}
                        <span>
                          📅{" "}
                          {new Date(request.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selectedRequest && (
          <div className="lg:w-[420px] shrink-0 lg:sticky lg:top-24 h-fit">
            <div className="glass rounded-2xl overflow-hidden slide-up">
              {/* Detail Header */}
              <div className="bg-gradient-to-r from-[rgba(99,102,241,0.15)] to-[rgba(167,139,250,0.1)] px-5 py-4 border-b border-[rgba(99,102,241,0.1)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CategoryIcon category={selectedRequest.category} />
                    <div>
                      <p className="text-xs text-[var(--neutral-500)] font-mono">
                        #{selectedRequest.id.slice(0, 8)}
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {selectedRequest.category}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="text-[var(--neutral-500)] hover:text-white transition-colors text-lg"
                    aria-label="Close detail panel"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
                {/* Status + Severity */}
                <div className="flex items-center gap-2 flex-wrap">
                  <StatusBadge status={selectedRequest.status} />
                  <SeverityIndicator severity={selectedRequest.severity} />
                  <PriorityBadge priority={selectedRequest.priority} />
                </div>

                {/* Attached Photo */}
                {selectedRequest.imageUrl && (
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider mb-2">
                      Attached Photo
                    </h4>
                    <div className="rounded-xl overflow-hidden border border-[var(--neutral-700)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={selectedRequest.imageUrl} 
                        alt="Tenant Upload" 
                        className="w-full h-auto object-cover max-h-64"
                      />
                    </div>
                  </div>
                )}

                {/* Summary */}
                <div>
                  <h4 className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider mb-1">
                    AI Summary
                  </h4>
                  <p className="text-sm text-[var(--neutral-200)] leading-relaxed">
                    {selectedRequest.summary}
                  </p>
                </div>

                {/* Original Input */}
                <div>
                  <h4 className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider mb-1">
                    Tenant Description
                  </h4>
                  <div className="bg-[var(--neutral-800)] rounded-lg p-3 border border-[var(--neutral-700)]">
                    <p className="text-xs text-[var(--neutral-400)] italic">
                      &quot;{selectedRequest.rawInput}&quot;
                    </p>
                  </div>
                </div>

                {/* Action Steps */}
                {(() => {
                  let steps: string[] = [];
                  try {
                    steps = JSON.parse(selectedRequest.actionSteps);
                  } catch {
                    steps = [];
                  }
                  if (steps.length === 0) return null;
                  return (
                    <div>
                      <h4 className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider mb-2">
                        Action Steps
                      </h4>
                      <div className="space-y-1.5">
                        {steps.map((step: string, i: number) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-xs text-[var(--neutral-300)]"
                          >
                            <span className="text-[var(--primary-400)] font-bold shrink-0">
                              {i + 1}.
                            </span>
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Estimated Cost */}
                {selectedRequest.estimatedCost && (
                  <div className="flex items-center gap-2 bg-[rgba(245,158,11,0.08)] rounded-lg p-3 border border-[rgba(245,158,11,0.15)]">
                    <span>💰</span>
                    <span className="text-xs text-[#fbbf24] font-semibold">
                      {selectedRequest.estimatedCost}
                    </span>
                  </div>
                )}

                {/* Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[var(--neutral-800)] rounded-lg p-2.5 border border-[var(--neutral-700)]">
                    <p className="text-[10px] text-[var(--neutral-500)] uppercase">
                      Tenant
                    </p>
                    <p className="text-xs text-white font-medium mt-0.5">
                      {selectedRequest.tenantName}
                    </p>
                  </div>
                  <div className="bg-[var(--neutral-800)] rounded-lg p-2.5 border border-[var(--neutral-700)]">
                    <p className="text-[10px] text-[var(--neutral-500)] uppercase">
                      Unit
                    </p>
                    <p className="text-xs text-white font-medium mt-0.5">
                      {selectedRequest.tenantUnit || "N/A"}
                    </p>
                  </div>
                  <div className="bg-[var(--neutral-800)] rounded-lg p-2.5 border border-[var(--neutral-700)]">
                    <p className="text-[10px] text-[var(--neutral-500)] uppercase">
                      Assigned To
                    </p>
                    <p className="text-xs text-white font-medium mt-0.5">
                      {selectedRequest.assignedTo || "Unassigned"}
                    </p>
                  </div>
                  <div className="bg-[var(--neutral-800)] rounded-lg p-2.5 border border-[var(--neutral-700)]">
                    <p className="text-[10px] text-[var(--neutral-500)] uppercase">
                      Created
                    </p>
                    <p className="text-xs text-white font-medium mt-0.5">
                      {new Date(selectedRequest.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-[rgba(99,102,241,0.1)] pt-5 space-y-3">
                  <h4 className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider">
                    Actions
                  </h4>

                  {/* Status Update */}
                  <div>
                    <label className="text-xs text-[var(--neutral-400)] mb-1 block">
                      Update Status
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {["Pending", "In Progress", "Resolved", "Cancelled"].map(
                        (s) => (
                          <button
                            key={s}
                            onClick={() =>
                              updateRequest(selectedRequest.id, { status: s })
                            }
                            disabled={selectedRequest.status === s}
                            className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                              selectedRequest.status === s
                                ? "opacity-50 cursor-not-allowed border-[var(--neutral-700)] text-[var(--neutral-500)]"
                                : "border-[var(--neutral-700)] text-[var(--neutral-300)] hover:border-[var(--primary-500)] hover:text-[var(--primary-300)]"
                            }`}
                          >
                            {s}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Assign */}
                  <div>
                    <label className="text-xs text-[var(--neutral-400)] mb-1 block">
                      Assign to Service Provider
                    </label>
                    <select
                      value={selectedRequest.assignedTo || ""}
                      onChange={(e) =>
                        updateRequest(selectedRequest.id, {
                          assignedTo: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[var(--neutral-800)] border border-[var(--neutral-700)] text-white text-xs cursor-pointer"
                    >
                      <option value="">Select Provider...</option>
                      {SERVICE_PROVIDERS.map((sp) => (
                        <option key={sp} value={sp}>
                          {sp}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ToastProvider>
      <Navbar />
      <main className="flex-1 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="orb w-[400px] h-[400px] bg-[var(--primary-600)] top-[-200px] right-[-100px]" />
        </div>
        <DashboardContent />
      </main>
    </ToastProvider>
  );
}
