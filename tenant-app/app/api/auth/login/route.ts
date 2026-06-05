import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const tenant = db.prepare('SELECT * FROM Tenant WHERE email = ?').get(email) as any
    if (!tenant || tenant.password !== password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const cookieStore = await cookies()
    cookieStore.set('tenant_session', tenant.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    })

    return NextResponse.json({ success: true, tenantId: tenant.id })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 })
  }
}
