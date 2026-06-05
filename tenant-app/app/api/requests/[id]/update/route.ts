import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies()
    const tenantId = cookieStore.get('tenant_session')?.value
    if (!tenantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { updateText } = body

    if (!updateText || !updateText.trim()) {
      return NextResponse.json({ error: 'Update details are required' }, { status: 400 })
    }

    const adminUrl = process.env.ADMIN_URL || 'http://localhost:3000';
    const adminApiRes = await fetch(`${adminUrl}/api/external/requests/${id}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SERVICE_API_KEY}`
      },
      body: JSON.stringify({ updateText })
    })

    if (!adminApiRes.ok) {
      const errText = await adminApiRes.text()
      console.error('Admin update API failed:', errText)
      throw new Error('Failed to update ticket on Admin server')
    }

    const { request: adminReq, notification: adminNotif } = await adminApiRes.json()

    // Sync changes to local Tenant Database
    db.prepare(`
      UPDATE Request 
      SET rawInput = ?, title = ?, category = ?, severity = ?, priority = ?, summary = ?, actionSteps = ?, estimatedCost = ?, updatesLog = ?, updatedAt = datetime('now')
      WHERE id = ?
    `).run(
      adminReq.rawInput,
      adminReq.title,
      adminReq.category,
      adminReq.severity,
      adminReq.priority,
      adminReq.summary,
      adminReq.actionSteps,
      adminReq.estimatedCost,
      adminReq.updatesLog,
      id
    )

    // Store the updated notification locally
    db.prepare(`
      INSERT INTO Notification (id, requestId, type, recipient, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      adminNotif.id,
      adminNotif.requestId,
      adminNotif.type,
      adminNotif.recipient,
      adminNotif.message
    )

    return NextResponse.json(adminReq)
  } catch (error) {
    console.error('Error updating request on tenant side:', error)
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 })
  }
}
