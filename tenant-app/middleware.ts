import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('tenant_session');
  
  // Protect /dashboard and /submit routes
  if (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/submit')) {
    if (!session) {
      // Redirect to login page if no session cookie is found
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Prevent logged-in users from seeing the login page
  if (request.nextUrl.pathname === '/') {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/submit'],
};
