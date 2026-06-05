import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const tenantId = cookieStore.get('tenant_session')?.value

    if (!tenantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const tenant = db.prepare('SELECT id, name, email, unit, createdAt FROM Tenant WHERE id = ?').get(tenantId) as any
    if (!tenant) {
      const response = NextResponse.json({ error: 'Tenant not found' }, { status: 404 })
      response.cookies.delete('tenant_session')
      return response
    }

    try {
      const adminUrl = process.env.ADMIN_URL || 'http://localhost:3000';
      const adminRes = await fetch(`${adminUrl}/api/external/tenant-data?email=${encodeURIComponent(tenant.email)}&name=${encodeURIComponent(tenant.name)}`, { cache: 'no-store' });
      if (adminRes.ok) {
        const data = await adminRes.json();
        return NextResponse.json({
          tenant,
          requests: data.requests,
          notifications: data.notifications
        });
      }
    } catch(err) {
      console.error('Admin API fetch failed:', err);
    }

    // Fallback to local DB just in case Admin is down
    const requests = db.prepare('SELECT * FROM Request WHERE tenantEmail = ? ORDER BY createdAt DESC').all(tenant.email)
    
    const notifications = db.prepare(`
      SELECT * FROM Notification 
      WHERE type IN ('TENANT_UPDATE', 'CONFIRMATION') AND (recipient = ? OR recipient = ?)
      ORDER BY createdAt DESC
    `).all(tenant.name, tenant.email)

    return NextResponse.json({
      tenant,
      requests,
      notifications
    })
  } catch (error) {
    console.error('Fetch tenant data error:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
