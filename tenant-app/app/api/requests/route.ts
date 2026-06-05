import { NextRequest, NextResponse } from 'next/server'
import { db, generateId } from '@/lib/db'
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
            const baseUrl = process.env.BASE_URL || 'http://localhost:3001';
            savedImageUrls.push(`${baseUrl}/uploads/${fileName}`);
            validImagesToProcess.push(img);
          }
        } catch (err) {
          console.error('Failed to save image:', err);
        }
      }
    }

    const finalImageUrl = savedImageUrls.length > 0 ? JSON.stringify(savedImageUrls) : null;

    const adminUrl = process.env.ADMIN_URL || 'http://localhost:3000';
    const adminApiRes = await fetch(`${adminUrl}/api/external/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SERVICE_API_KEY}`
      },
      body: JSON.stringify({
        tenantName,
        tenantEmail,
        tenantUnit,
        description,
        finalImageUrl,
        validImagesToProcess
      })
    });

    if (!adminApiRes.ok) {
      const errText = await adminApiRes.text();
      console.error('Admin API failed:', errText);
      throw new Error('Failed to process ticket on Admin server');
    }

    const { request: adminReq, notification: adminNotif } = await adminApiRes.json();

    // Store local copy in Tenant Database for dashboard rendering
    db.prepare(`
      INSERT INTO Request (id, tenantName, tenantEmail, tenantUnit, rawInput, title, category, severity, priority, summary, actionSteps, estimatedCost, imageUrl, createdAt, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      adminReq.id,
      adminReq.tenantName,
      adminReq.tenantEmail || '',
      adminReq.tenantUnit || '',
      adminReq.rawInput,
      adminReq.title,
      adminReq.category,
      adminReq.severity,
      adminReq.priority,
      adminReq.summary,
      adminReq.actionSteps,
      adminReq.estimatedCost,
      adminReq.imageUrl,
      adminReq.createdAt,
      adminReq.status
    )

    db.prepare(`
      INSERT INTO Notification (id, requestId, type, recipient, message, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      adminNotif.id,
      adminNotif.requestId,
      adminNotif.type,
      adminNotif.recipient,
      adminNotif.message,
      adminNotif.createdAt
    )

    return NextResponse.json(adminReq, { status: 201 })
  } catch (error) {
    console.error('Error creating request:', error)
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 })
  }
}
