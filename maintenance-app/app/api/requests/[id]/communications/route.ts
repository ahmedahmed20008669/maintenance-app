import { NextRequest, NextResponse } from 'next/server'
import { db, generateId } from '@/lib/db'
import { generateCommunication } from '@/lib/gemini'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Fetch notifications related to this request that are specifically communications
    const communications = db.prepare(`
      SELECT * FROM Notification 
      WHERE requestId = ? AND type IN ('TENANT_UPDATE', 'PROVIDER_MESSAGE')
      ORDER BY createdAt DESC
    `).all(id)
    
    return NextResponse.json(communications)
  } catch (error) {
    console.error('Error fetching communications:', error)
    return NextResponse.json({ error: 'Failed to fetch communications' }, { status: 500 })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const { type } = body

    if (type !== 'TENANT_UPDATE' && type !== 'PROVIDER_MESSAGE') {
      return NextResponse.json({ error: 'Invalid communication type' }, { status: 400 })
    }

    const request = db.prepare('SELECT * FROM Request WHERE id = ?').get(id) as any
    if (!request) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    const rawMessage = await generateCommunication(request, type)
    const title = request.title || request.category + ' Issue';
    const message = `Ticket #${request.id.slice(-6).toUpperCase()} [${title}]:\n\n${rawMessage}`;

    // Save to Notification table
    const notificationId = generateId()
    const recipient = type === 'TENANT_UPDATE' ? request.tenantName : (request.assignedTo || 'Service Provider')
    
    db.prepare(`
      INSERT INTO Notification (id, requestId, type, recipient, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(notificationId, id, type, recipient, message)

    const newCommunication = db.prepare('SELECT * FROM Notification WHERE id = ?').get(notificationId)

    return NextResponse.json(newCommunication, { status: 201 })
  } catch (error) {
    console.error('Error generating communication:', error)
    return NextResponse.json({ error: 'Failed to generate communication' }, { status: 500 })
  }
}
