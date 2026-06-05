"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TenantNavbar from '@/components/TenantNavbar';
import { 
  StatusBadge, 
  SeverityIndicator, 
  CategoryIcon, 
  LoadingSpinner,
  EmptyState,
  InboxIcon,
  BellIcon
} from '@/components/ui';

export default function TenantDashboard() {
  const router = useRouter();
  const [tenant, setTenant] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const prevNotifsRef = useRef(0);
  const prevReqsRef = useRef('');

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetch('/api/tenant/data')
      .then(res => {
        if (res.status === 401) { router.push('/'); return null; }
        return res.json();
      })
      .then(data => {
        if (data) {
          setTenant(data.tenant);
          setRequests(data.requests);
          setNotifications(data.notifications);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [router]);

  // SSE real-time connection
  useEffect(() => {
    if (!tenant) return;

    const es = new EventSource('/api/sse');
    eventSourceRef.current = es;

    es.onopen = () => setConnected(true);

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setRequests(data.requests);
        setNotifications(data.notifications);
      } catch (err) {
        console.error('SSE parse error:', err);
      }
    };

    es.onerror = () => {
      setConnected(false);
      es.close();
      // Reconnect after 5s
      setTimeout(() => {
        if (eventSourceRef.current === es) {
          const newEs = new EventSource('/api/sse');
          eventSourceRef.current = newEs;
          newEs.onopen = () => setConnected(true);
          newEs.onmessage = es.onmessage;
          newEs.onerror = es.onerror;
        }
      }, 5000);
    };

    return () => {
      es.close();
      eventSourceRef.current = null;
    };
  }, [tenant]);

  // Handle flashes and browser notifications
  useEffect(() => {
    if (prevNotifsRef.current !== 0 && notifications.length > prevNotifsRef.current) {
      setFlash('notification');
      setTimeout(() => setFlash(null), 2000);
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Tenant Portal Update', { body: notifications[0]?.message, icon: '/icon.svg' });
      }
    }
    prevNotifsRef.current = notifications.length;
  }, [notifications]);

  useEffect(() => {
    const currentReqs = JSON.stringify(requests.map((r: any) => r.id + r.status));
    if (prevReqsRef.current !== '' && currentReqs !== prevReqsRef.current) {
      setFlash('status');
      setTimeout(() => setFlash(null), 2000);
    }
    prevReqsRef.current = currentReqs;
  }, [requests]);

  if (loading) return <div className="min-h-screen bg-[#0f131a] flex items-center justify-center"><LoadingSpinner /></div>;
  if (!tenant) return null;

  return (
    <div className="min-h-screen bg-[#0f131a] flex flex-col">
      <TenantNavbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 fade-in">
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-2">Welcome, {tenant.name.split(' ')[0]}</h1>
            <p className="text-[var(--neutral-400)] flex items-center gap-2">
              Unit {tenant.unit}
              <span className="flex items-center gap-1.5 text-xs">
                <span className={`w-2 h-2 rounded-full ${connected ? 'bg-[#6ee7b7] animate-pulse' : 'bg-[#f87171]'}`}></span>
                {connected ? 'Live' : 'Reconnecting...'}
              </span>
            </p>
          </div>
          <Link 
            href="/submit"
            className="bg-[var(--primary-500)] hover:bg-[var(--primary-600)] text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg flex items-center gap-2"
          >
            + New Request
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Requests */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Your Maintenance Requests
              <span className="bg-[var(--neutral-800)] text-[var(--neutral-300)] text-xs py-0.5 px-2 rounded-full border border-[var(--neutral-700)]">
                {requests.length}
              </span>
              {flash === 'status' && (
                <span className="text-xs text-[#6ee7b7] animate-pulse ml-2">Status updated!</span>
              )}
            </h2>

            {requests.length === 0 ? (
              <div className="glass rounded-xl p-8">
                <EmptyState 
                  icon={<InboxIcon className="w-12 h-12 stroke-[1.5]" />}
                  title="No Requests Yet"
                  description="Submit your first maintenance request and track it here in real-time."
                />
              </div>
            ) : (
              <div className="space-y-3">
                {requests.map((req) => (
                  <div key={req.id} className="glass rounded-xl p-5 border border-[var(--neutral-800)] card-hover">
                    <div className="flex justify-between items-start mb-3 gap-4">
                      <div className="flex items-center gap-3">
                        <CategoryIcon category={req.category} />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-[var(--primary-400)] bg-[var(--primary-900)] px-1.5 py-0.5 rounded">
                              #{req.id.slice(-6).toUpperCase()}
                            </span>
                            <h3 className="text-lg font-bold text-white">{req.title || req.category + ' Issue'}</h3>
                          </div>
                          <p className="text-sm font-medium text-[var(--neutral-300)]">{req.summary || req.rawInput.slice(0, 60) + '...'}</p>
                          <p className="text-xs text-[var(--neutral-500)] mt-1">Submitted {new Date(req.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <StatusBadge status={req.status} />
                        <SeverityIndicator severity={req.severity} />
                      </div>
                    </div>
                    <div className="bg-[var(--neutral-900)] rounded-lg p-3 text-sm text-[var(--neutral-300)] border border-[var(--neutral-800)]">
                      {req.rawInput}
                    </div>
                    {req.assignedTo && (
                      <div className="mt-3 text-xs text-[var(--neutral-400)] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#fbbf24]"></span>
                        Assigned: <strong className="text-[var(--neutral-300)]">{req.assignedTo}</strong>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notifications / Inbox */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <BellIcon className="w-5 h-5" />
              Updates
              {flash === 'notification' && (
                <span className="bg-[var(--primary-500)] text-white text-xs py-0.5 px-2 rounded-full animate-pulse">
                  New!
                </span>
              )}
            </h2>

            <div className="glass rounded-xl p-4 border border-[var(--neutral-800)] max-h-[600px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-[var(--neutral-500)] text-sm">No updates yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="bg-[var(--neutral-900)] p-4 rounded-xl border border-[var(--neutral-800)] hover:border-[var(--primary-500)] transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--primary-400)]">
                          {notif.type === 'CONFIRMATION' ? 'Confirmation' : 
                           notif.type === 'STATUS_UPDATE' ? 'Status Update' : 'Management Update'}
                        </span>
                        <span className="text-[10px] text-[var(--neutral-500)]">
                          {new Date(notif.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--neutral-300)] whitespace-pre-wrap leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
