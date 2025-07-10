import { NextResponse } from 'next/server'

export function middleware(request) {
  // Simple middleware for basic routing
  return NextResponse.next()
}

export const runtime = 'experimental-edge'

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.png).*)"],
}
