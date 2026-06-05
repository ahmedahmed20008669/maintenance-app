import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const email = url.searchParams.get('email')
    const name = url.searchParams.get('name')

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name required' }, { status: 400 })
    }

    const requests = db.prepare('SELECT * FROM Request WHERE tenantEmail = ? ORDER BY createdAt DESC').all(email)
    const notifications = db.prepare(`
      SELECT * FROM Notification 
      WHERE type IN ('TENANT_UPDATE', 'CONFIRMATION', 'STATUS_UPDATE') AND (recipient = ? OR recipient = ?)
      ORDER BY createdAt DESC
    `).all(name, email)

    return NextResponse.json({ requests, notifications })
  } catch (error) {
    console.error('Error fetching tenant data:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
