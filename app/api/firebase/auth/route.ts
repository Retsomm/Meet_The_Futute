import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ message: 'Firebase auth endpoint' });
}
