import { NextResponse } from 'next/server'

export function middleware(request) {
  // Simple middleware without next-auth to avoid Edge Runtime issues
  return NextResponse.next()
}

// Use Node.js runtime instead of Edge Runtime for compatibility with next-auth
export const runtime = 'nodejs'

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
