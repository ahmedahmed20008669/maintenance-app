import { NextRequest, NextResponse } from 'next/server'
import { db, generateId } from '@/lib/db'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, unit, password } = body

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const existing = db.prepare('SELECT * FROM Tenant WHERE email = ?').get(email)
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    const tenantId = generateId()
    
    db.prepare(`
      INSERT INTO Tenant (id, name, email, unit, password)
      VALUES (?, ?, ?, ?, ?)
    `).run(tenantId, name, email, unit || '', password)

    const cookieStore = await cookies()
    cookieStore.set('tenant_session', tenantId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    })

    return NextResponse.json({ success: true, tenantId })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Failed to register tenant' }, { status: 500 })
  }
}
