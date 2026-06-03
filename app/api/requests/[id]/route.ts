import { NextRequest, NextResponse } from 'next/server'
import { db, generateId } from '@/lib/db'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const request = db.prepare('SELECT * FROM Request WHERE id = ?').get(id)
    if (!request) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }
    return NextResponse.json(request)
  } catch (error) {
    console.error('Error fetching request:', error)
    return NextResponse.json({ error: 'Failed to fetch request' }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const { status, assignedTo } = body

    const existingRequest = db.prepare('SELECT * FROM Request WHERE id = ?').get(id) as any
    if (!existingRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    if (status !== undefined) {
      db.prepare('UPDATE Request SET status = ? WHERE id = ?').run(status, id)
    }
    if (assignedTo !== undefined) {
      db.prepare('UPDATE Request SET assignedTo = ? WHERE id = ?').run(assignedTo, id)
    }

    const request = db.prepare('SELECT * FROM Request WHERE id = ?').get(id) as any

    // Create notification about the update
    if (status) {
      db.prepare(`
        INSERT INTO Notification (id, requestId, type, recipient, message)
        VALUES (?, ?, ?, ?, ?)
      `).run(
        generateId(),
        request.id,
        'STATUS_UPDATE',
        request.tenantName,
        `Your maintenance request status has been updated to: ${status}.${assignedTo ? ` Assigned to: ${assignedTo}` : ''}`
      )
    }

    if (assignedTo) {
      db.prepare(`
        INSERT INTO Notification (id, requestId, type, recipient, message)
        VALUES (?, ?, ?, ?, ?)
      `).run(
        generateId(),
        request.id,
        'ASSIGNMENT',
        assignedTo,
        `You have been assigned a new ${request.category} maintenance request (${request.severity} severity) at unit ${request.tenantUnit || 'N/A'}.`
      )
    }

    return NextResponse.json(request)
  } catch (error) {
    console.error('Error updating request:', error)
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 })
  }
}
