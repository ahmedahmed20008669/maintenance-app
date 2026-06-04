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
  UserIcon,
  HomeIcon,
  CalendarIcon,
  RefreshIcon,
  InboxIcon,
  DollarIcon,
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
            className="px-4 py-2.5 rounded-lg bg-[var(--neutral-800)] border border-[var(--neutral-700)] text-[var(--neutral-400)] hover:text-white hover:border-[var(--primary-500)] transition-all text-sm flex items-center gap-2"
            title="Refresh"
          >
            <RefreshIcon className="w-4 h-4" />
            <span>Refresh</span>
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
                icon={<InboxIcon className="w-12 h-12 stroke-[1.5]" />}
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
                      <div className="flex items-center gap-4 text-xs text-[var(--neutral-500)] flex-wrap">
                        <span className="flex items-center gap-1">
                          <UserIcon className="w-3.5 h-3.5" />
                          {request.tenantName}
                        </span>
                        {request.tenantUnit && (
                          <span className="flex items-center gap-1">
                            <HomeIcon className="w-3.5 h-3.5" />
                            {request.tenantUnit}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-3.5 h-3.5" />
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

      </div>

      {/* Detail Panel Overlay */}
      {selectedRequest && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setSelectedRequest(null)}
        />
      )}

      {/* Detail Panel Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] z-50 bg-[var(--neutral-950)] border-l border-[rgba(0,153,173,0.2)] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          selectedRequest ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedRequest && (
          <>
            {/* Detail Header */}
            <div className="bg-gradient-to-r from-[rgba(0,153,173,0.15)] to-transparent px-5 py-4 border-b border-[rgba(0,153,173,0.1)] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <CategoryIcon category={selectedRequest.category} />
                <div>
                  <p className="text-xs text-[var(--neutral-500)] font-mono">
                    #{selectedRequest.id.slice(0, 8)}
                  </p>
                  <p className="text-sm font-semibold text-white font-prompt">
                    {selectedRequest.category}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-[var(--neutral-500)] hover:text-white transition-colors text-xl p-2"
                aria-label="Close detail panel"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Status + Severity */}
              <div className="flex items-center gap-2 flex-wrap">
                <StatusBadge status={selectedRequest.status} />
                <SeverityIndicator severity={selectedRequest.severity} />
                <PriorityBadge priority={selectedRequest.priority} />
              </div>

              {/* Attached Photo */}
              {selectedRequest.imageUrl && (
                <div>
                  <h4 className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider mb-2 font-prompt">
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
                <h4 className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider mb-2 font-prompt">
                  AI Summary
                </h4>
                <p className="text-sm text-[var(--foreground)] leading-relaxed bg-[rgba(255,255,255,0.02)] p-4 rounded-xl border border-[rgba(255,255,255,0.05)]">
                  {selectedRequest.summary}
                </p>
              </div>

              {/* Original Input */}
              <div>
                <h4 className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider mb-2 font-prompt">
                  Tenant Description
                </h4>
                <div className="bg-[var(--neutral-900)] rounded-xl p-4 border border-[var(--neutral-800)]">
                  <p className="text-sm text-[var(--neutral-400)] italic">
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
                    <h4 className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider mb-3 font-prompt">
                      Action Steps
                    </h4>
                    <div className="space-y-2">
                      {steps.map((step: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 text-sm text-[var(--foreground)] bg-[rgba(0,153,173,0.05)] p-3 rounded-lg border border-[rgba(0,153,173,0.1)]"
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
                <div className="flex items-center gap-3 bg-[rgba(245,158,11,0.08)] rounded-xl p-4 border border-[rgba(245,158,11,0.15)]">
                  <DollarIcon className="w-5 h-5 text-[#fbbf24] shrink-0" />
                  <span className="text-sm text-[#fbbf24] font-semibold">
                    {selectedRequest.estimatedCost}
                  </span>
                </div>
              )}

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[var(--neutral-900)] rounded-xl p-3 border border-[var(--neutral-800)]">
                  <p className="text-[10px] text-[var(--neutral-500)] uppercase font-prompt">
                    Tenant
                  </p>
                  <p className="text-xs text-white font-medium mt-1 truncate">
                    {selectedRequest.tenantName}
                  </p>
                </div>
                <div className="bg-[var(--neutral-900)] rounded-xl p-3 border border-[var(--neutral-800)]">
                  <p className="text-[10px] text-[var(--neutral-500)] uppercase font-prompt">
                    Unit
                  </p>
                  <p className="text-xs text-white font-medium mt-1 truncate">
                    {selectedRequest.tenantUnit || "N/A"}
                  </p>
                </div>
                <div className="bg-[var(--neutral-900)] rounded-xl p-3 border border-[var(--neutral-800)]">
                  <p className="text-[10px] text-[var(--neutral-500)] uppercase font-prompt">
                    Assigned To
                  </p>
                  <p className="text-xs text-white font-medium mt-1 truncate">
                    {selectedRequest.assignedTo || "Unassigned"}
                  </p>
                </div>
                <div className="bg-[var(--neutral-900)] rounded-xl p-3 border border-[var(--neutral-800)]">
                  <p className="text-[10px] text-[var(--neutral-500)] uppercase font-prompt">
                    Created
                  </p>
                  <p className="text-xs text-white font-medium mt-1 truncate">
                    {new Date(selectedRequest.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-[rgba(255,255,255,0.05)] pt-6 space-y-4">
                <h4 className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider font-prompt">
                  Actions
                </h4>

                {/* Status Update */}
                <div>
                  <label className="text-xs text-[var(--neutral-400)] mb-2 block">
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
                          className={`text-xs px-4 py-2 rounded-lg border transition-all ${
                            selectedRequest.status === s
                              ? "opacity-50 cursor-not-allowed border-[var(--neutral-700)] text-[var(--neutral-500)] bg-[var(--neutral-900)]"
                              : "border-[var(--neutral-700)] text-[var(--neutral-300)] hover:border-[var(--primary-500)] hover:text-[var(--primary-300)] hover:bg-[rgba(0,153,173,0.05)]"
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
                  <label className="text-xs text-[var(--neutral-400)] mb-2 block">
                    Assign to Service Provider
                  </label>
                  <select
                    value={selectedRequest.assignedTo || ""}
                    onChange={(e) =>
                      updateRequest(selectedRequest.id, {
                        assignedTo: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[var(--neutral-900)] border border-[var(--neutral-700)] text-white text-sm cursor-pointer focus:border-[var(--primary-500)] outline-none"
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
          </>
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
