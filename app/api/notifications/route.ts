import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const notifications = db.prepare('SELECT * FROM Notification ORDER BY createdAt DESC LIMIT 50').all()
    
    // Convert SQLite integers back to booleans
    const formatted = notifications.map((n: any) => ({
      ...n,
      read: n.read === 1
    }))
    
    return NextResponse.json(formatted)
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id } = body

    if (id) {
      db.prepare('UPDATE Notification SET read = 1 WHERE id = ?').run(id)
    } else {
      db.prepare('UPDATE Notification SET read = 1 WHERE read = 0').run()
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating notifications:', error)
    return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 })
  }
}
