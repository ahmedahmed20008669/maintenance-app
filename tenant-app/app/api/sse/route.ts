import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const tenantId = cookieStore.get('tenant_session')?.value

  if (!tenantId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const tenant = db.prepare('SELECT id, name, email, unit FROM Tenant WHERE id = ?').get(tenantId) as any
  if (!tenant) {
    return new Response('Not found', { status: 404 })
  }

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      let lastRequestHash = ''
      let lastNotifHash = ''

      const sendUpdate = async () => {
        try {
          const adminRes = await fetch(`https://maintenance-app.fly.dev/api/external/tenant-data?email=${encodeURIComponent(tenant.email)}&name=${encodeURIComponent(tenant.name)}`, { cache: 'no-store' });
          if (!adminRes.ok) return;
          const dataFromAdmin = await adminRes.json();
          const requests = dataFromAdmin.requests;
          const notifications = dataFromAdmin.notifications;

          const reqHash = JSON.stringify(requests.map((r: any) => r.id + r.status + r.assignedTo))
          const notifHash = JSON.stringify(notifications.map((n: any) => n.id))

          // Only send if data actually changed
          if (reqHash !== lastRequestHash || notifHash !== lastNotifHash) {
            lastRequestHash = reqHash
            lastNotifHash = notifHash
            const data = JSON.stringify({ requests, notifications, timestamp: Date.now() })
            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
          } else {
            // Keep-alive ping to prevent proxy/load balancer from dropping idle connections
            controller.enqueue(encoder.encode(`: keep-alive\n\n`))
          }
        } catch (err) {
          console.error('SSE error:', err)
        }
      }

      // Send initial data immediately
      sendUpdate()

      // Check for updates every 2 seconds
      const interval = setInterval(sendUpdate, 2000)

      // Cleanup on abort
      req.signal.addEventListener('abort', () => {
        clearInterval(interval)
        try { controller.close() } catch {}
      })
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  })
}
