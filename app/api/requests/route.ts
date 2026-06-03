import { NextRequest, NextResponse } from 'next/server'
import { db, generateId } from '@/lib/db'
import { classifyMaintenanceRequest } from '@/lib/gemini'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const requests = db.prepare('SELECT * FROM Request ORDER BY createdAt DESC').all()
    return NextResponse.json(requests)
  } catch (error) {
    console.error('Error fetching requests:', error)
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    let { tenantName, tenantEmail, tenantUnit, description, imageUrl } = body

    if (!tenantName || !description) {
      return NextResponse.json(
        { error: 'Tenant name and description are required' },
        { status: 400 }
      )
    }

    // Handle base64 image saving
    if (imageUrl && imageUrl.startsWith('data:image')) {
      try {
        const matches = imageUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const buffer = Buffer.from(matches[2], 'base64');
          const fileName = `upload-${Date.now()}-${Math.round(Math.random() * 1000)}.webp`;
          const uploadDir = path.join(process.cwd(), 'public', 'uploads');
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }
          fs.writeFileSync(path.join(uploadDir, fileName), buffer);
          imageUrl = `/uploads/${fileName}`;
        }
      } catch (err) {
        console.error('Failed to save image:', err);
        imageUrl = null; // Don't crash the request if image save fails
      }
    }

    // Classify the request using Gemini AI
    const classification = await classifyMaintenanceRequest(description)

    const requestId = generateId()
    
    // Create the request in the database
    db.prepare(`
      INSERT INTO Request (id, tenantName, tenantEmail, tenantUnit, rawInput, category, severity, priority, summary, actionSteps, estimatedCost, imageUrl)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      requestId,
      tenantName,
      tenantEmail || '',
      tenantUnit || '',
      description,
      classification.category,
      classification.severity,
      classification.priority,
      classification.summary,
      classification.actionSteps,
      classification.estimatedCost,
      imageUrl || null
    )

    // Create a notification for the tenant
    db.prepare(`
      INSERT INTO Notification (id, requestId, type, recipient, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      generateId(),
      requestId,
      'CONFIRMATION',
      tenantName,
      `Your maintenance request has been received and classified as ${classification.category} with ${classification.severity} severity. We will address it shortly.`
    )

    const request = db.prepare('SELECT * FROM Request WHERE id = ?').get(requestId)

    return NextResponse.json(request, { status: 201 })
  } catch (error) {
    console.error('Error creating request:', error)
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 })
  }
}
