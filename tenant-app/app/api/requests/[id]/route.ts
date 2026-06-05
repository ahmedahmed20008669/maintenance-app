import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

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
