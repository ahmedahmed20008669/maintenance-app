import { NextRequest, NextResponse } from 'next/server'
import { db, generateId } from '@/lib/db'
import { classifyMaintenanceRequest } from '@/lib/gemini'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    let { tenantName, tenantEmail, tenantUnit, description, images = [] } = body

    if (!tenantName || !description) {
      return NextResponse.json(
        { error: 'Tenant name and description are required' },
        { status: 400 }
      )
    }

    const savedImageUrls: string[] = [];
    const validImagesToProcess: string[] = [];
    
    for (const img of images) {
      if (img && img.startsWith('data:image')) {
        try {
          const matches = img.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          if (matches && matches.length === 3) {
            const buffer = Buffer.from(matches[2], 'base64');
            const fileName = `upload-${Date.now()}-${Math.round(Math.random() * 1000)}.webp`;
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');
            if (!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir, { recursive: true });
            }
            fs.writeFileSync(path.join(uploadDir, fileName), buffer);
            savedImageUrls.push(`/uploads/${fileName}`);
            validImagesToProcess.push(img);
          }
        } catch (err) {
          console.error('Failed to save image:', err);
        }
      }
    }

    const finalImageUrl = savedImageUrls.length > 0 ? JSON.stringify(savedImageUrls) : null;

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
      finalImageUrl
    )

    db.prepare(`
      INSERT INTO Notification (id, requestId, type, recipient, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      generateId(),
      requestId,
      'CONFIRMATION',
      tenantName,
      `Ticket #${requestId.slice(-6).toUpperCase()} [${classification.title}]: Your maintenance request has been received and classified as ${classification.category} with ${classification.severity} severity. We will address it shortly.`
    )

    const request = db.prepare('SELECT * FROM Request WHERE id = ?').get(requestId)

    return NextResponse.json(request, { status: 201 })
  } catch (error) {
    console.error('Error creating request:', error)
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 })
  }
}
