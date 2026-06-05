import { NextRequest, NextResponse } from 'next/server'
import { db, generateId } from '@/lib/db'
import { classifyMaintenanceRequest } from '@/lib/gemini'

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (authHeader !== `Bearer ${process.env.SERVICE_API_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { tenantName, tenantEmail, tenantUnit, description, finalImageUrl, validImagesToProcess = [] } = body

    if (!tenantName || !description) {
      return NextResponse.json(
        { error: 'Tenant name and description are required' },
        { status: 400 }
      )
    }

    const classification = await classifyMaintenanceRequest(description, validImagesToProcess)

    const requestId = generateId()
    
    db.prepare(`
      INSERT INTO Request (id, tenantName, tenantEmail, tenantUnit, rawInput, title, category, severity, priority, summary, actionSteps, estimatedCost, imageUrl)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      requestId,
      tenantName,
      tenantEmail || '',
      tenantUnit || '',
      description,
      classification.title,
      classification.category,
      classification.severity,
      classification.priority,
      classification.summary,
      classification.actionSteps,
      classification.estimatedCost,
      finalImageUrl || null
    )

    const notificationId = generateId()
    db.prepare(`
      INSERT INTO Notification (id, requestId, type, recipient, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      notificationId,
      requestId,
      'CONFIRMATION',
      tenantName,
      `Ticket #${requestId.slice(-6).toUpperCase()} [${classification.title}]: Your maintenance request has been received and classified as ${classification.category} with ${classification.severity} severity. We will address it shortly.`
    )

    const request = db.prepare('SELECT * FROM Request WHERE id = ?').get(requestId)
    const notification = db.prepare('SELECT * FROM Notification WHERE id = ?').get(notificationId)

    return NextResponse.json({ request, notification }, { status: 201 })
  } catch (error) {
    console.error('Error creating request via external API:', error)
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 })
  }
}
