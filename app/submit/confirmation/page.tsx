"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  StatusBadge,
  SeverityIndicator,
  PriorityBadge,
  CategoryIcon,
  LoadingSpinner,
  DollarIcon,
} from "@/components/ui";

interface RequestData {
  id: string;
  tenantName: string;
  tenantEmail: string;
  tenantUnit: string;
  rawInput: string;
  category: string;
  severity: string;
  priority: number;
  status: string;
  summary: string;
  actionSteps: string;
  estimatedCost: string | null;
  createdAt: string;
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [request, setRequest] = useState<RequestData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/requests/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRequest(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!request) {
    return (
      <div className="text-center py-20">
        <p className="text-[var(--neutral-400)]">Request not found.</p>
        <Link
          href="/submit"
          className="text-[var(--primary-400)] hover:underline mt-4 inline-block"
        >
          Submit a new request
        </Link>
      </div>
    );
  }

  let steps: string[] = [];
  try {
    steps = JSON.parse(request.actionSteps);
  } catch {
    steps = [];
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Success Header */}
      <div className="text-center mb-10 fade-in">
        <div className="w-16 h-16 rounded-2xl bg-[rgba(16,185,129,0.15)] flex items-center justify-center mx-auto mb-5 text-[var(--success-500)]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-3">
          Request Submitted Successfully
        </h1>
        <p className="text-[var(--neutral-400)]">
          Your request has been analyzed and classified by our AI system.
        </p>
      </div>

      {/* Ticket Card */}
      <div className="glass rounded-2xl overflow-hidden slide-up">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[rgba(99,102,241,0.15)] to-[rgba(167,139,250,0.1)] px-6 py-4 border-b border-[rgba(99,102,241,0.1)]">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <CategoryIcon category={request.category} />
              <div>
                <p className="text-xs text-[var(--neutral-500)] font-semibold uppercase tracking-wider mb-0.5">
                  Recommended Service Category
                </p>
                <p className="text-lg font-bold text-white">
                  {request.category}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={request.status} />
              <SeverityIndicator severity={request.severity} />
              <PriorityBadge priority={request.priority} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* AI Summary */}
          <div>
            <h3 className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider mb-2">
              AI Summary
            </h3>
            <p className="text-sm text-[var(--neutral-200)] leading-relaxed">
              {request.summary}
            </p>
          </div>

          {/* Original Description */}
          <div>
            <h3 className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider mb-2">
              Your Description
            </h3>
            <div className="bg-[var(--neutral-800)] rounded-xl p-4 border border-[var(--neutral-700)]">
              <p className="text-sm text-[var(--neutral-300)] italic leading-relaxed">
                &quot;{request.rawInput}&quot;
              </p>
            </div>
          </div>

          {/* Recommended Steps */}
          {steps.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-[var(--neutral-500)] uppercase tracking-wider mb-3">
                Recommended Action Steps
              </h3>
              <div className="space-y-2">
                {steps.map((step: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-[var(--neutral-800)] rounded-lg p-3 border border-[var(--neutral-700)]"
                  >
                    <span className="w-6 h-6 rounded-full bg-[rgba(99,102,241,0.15)] text-[var(--primary-400)] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-[var(--neutral-300)]">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Estimated Cost */}
          {request.estimatedCost && (
            <div className="flex items-center gap-3 bg-[rgba(245,158,11,0.08)] rounded-xl p-4 border border-[rgba(245,158,11,0.15)]">
              <DollarIcon className="w-5 h-5 text-[#fbbf24] shrink-0" />
              <div>
                <p className="text-xs text-[var(--neutral-500)] font-semibold uppercase">
                  Estimated Cost
                </p>
                <p className="text-sm text-[#fbbf24] font-semibold">
                  {request.estimatedCost}
                </p>
              </div>
            </div>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-[var(--neutral-800)] rounded-xl p-3 border border-[var(--neutral-700)]">
              <p className="text-xs text-[var(--neutral-500)]">Tenant</p>
              <p className="text-sm text-white font-medium mt-1">
                {request.tenantName}
              </p>
            </div>
            {request.tenantUnit && (
              <div className="bg-[var(--neutral-800)] rounded-xl p-3 border border-[var(--neutral-700)]">
                <p className="text-xs text-[var(--neutral-500)]">Unit</p>
                <p className="text-sm text-white font-medium mt-1">
                  {request.tenantUnit}
                </p>
              </div>
            )}
            <div className="bg-[var(--neutral-800)] rounded-xl p-3 border border-[var(--neutral-700)]">
              <p className="text-xs text-[var(--neutral-500)]">Submitted</p>
              <p className="text-sm text-white font-medium mt-1">
                {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[rgba(99,102,241,0.1)] flex flex-col sm:flex-row gap-3">
          <Link
            href="/submit"
            className="flex-1 text-center py-3 rounded-xl glass text-white font-medium text-sm hover:bg-[rgba(255,255,255,0.08)] transition-all"
          >
            Submit Another Request
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 text-center py-3 rounded-xl bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-500)] text-white font-medium text-sm hover:from-[var(--primary-500)] hover:to-[var(--primary-400)] transition-all shadow-lg shadow-[rgba(99,102,241,0.2)]"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 relative">
        <div className="orb w-[300px] h-[300px] bg-[var(--success-500)] top-[-100px] left-[20%]" />
        <Suspense fallback={<LoadingSpinner />}>
          <ConfirmationContent />
        </Suspense>
      </main>
    </>
  );
}
