import { NextRequest, NextResponse } from 'next/server'
import { db, generateId } from '@/lib/db'
import { classifyMaintenanceRequest } from '@/lib/gemini'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (authHeader !== `Bearer ${process.env.SERVICE_API_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { updateText } = body

    if (!updateText || !updateText.trim()) {
      return NextResponse.json({ error: 'Update text is required' }, { status: 400 })
    }

    const request = db.prepare('SELECT * FROM Request WHERE id = ?').get(id) as any
    if (!request) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    // Parse existing updatesLog
    let logs: { timestamp: string; text: string }[] = []
    try {
      if (request.updatesLog) {
        logs = JSON.parse(request.updatesLog)
      }
    } catch (e) {
      logs = []
    }

    // If log is empty, log the original input as the first entry
    if (logs.length === 0) {
      logs.push({
        timestamp: request.createdAt || new Date().toISOString(),
        text: request.rawInput
      })
    }

    // Append new update
    const timestamp = new Date().toISOString()
    logs.push({
      timestamp,
      text: updateText
    })

    const updatedLogJson = JSON.stringify(logs)

    // Build history prompt for Gemini
    const historyText = logs
      .map((log, index) => {
        const dateStr = new Date(log.timestamp).toLocaleString()
        return `[Update ${index + 1} - ${dateStr}]: ${log.text}`
      })
      .join('\n\n')

    // Parse image urls if present for multi-modal context (re-feed same images)
    let validImagesToProcess: string[] = []
    // Since images are already saved as static URLs on Fly.io, we don't need to re-upload them.
    // If classifyMaintenanceRequest expects base64, we can handle URL parsing or fallback to text history.
    // Let's pass the text history as the main request description to classify.
    const classification = await classifyMaintenanceRequest(historyText, [])

    // Update Request: rawInput becomes the latest updateText, updatesLog stores full history.
    db.prepare(`
      UPDATE Request 
      SET rawInput = ?, title = ?, category = ?, severity = ?, priority = ?, summary = ?, actionSteps = ?, estimatedCost = ?, updatesLog = ?, updatedAt = datetime('now')
      WHERE id = ?
    `).run(
      updateText,
      classification.title,
      classification.category,
      classification.severity,
      classification.priority,
      classification.summary,
      classification.actionSteps,
      classification.estimatedCost,
      updatedLogJson,
      id
    )

    // Log a notification for the status update / modification
    const notificationId = generateId()
    db.prepare(`
      INSERT INTO Notification (id, requestId, type, recipient, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      notificationId,
      id,
      'STATUS_UPDATE',
      request.tenantName,
      `Ticket #${id.slice(-6).toUpperCase()} has been updated with new details. AI has re-classified it: ${classification.summary}`
    )

    const updatedRequest = db.prepare('SELECT * FROM Request WHERE id = ?').get(id)
    const notification = db.prepare('SELECT * FROM Notification WHERE id = ?').get(notificationId)

    return NextResponse.json({ request: updatedRequest, notification }, { status: 200 })
  } catch (error) {
    console.error('Error updating request via external API:', error)
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 })
  }
}
