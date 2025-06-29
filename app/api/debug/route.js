import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const diagnostics = {
      nodeEnv: process.env.NODE_ENV,
      nextauthUrl: process.env.NEXTAUTH_URL ? 'SET' : 'NOT_SET',
      nextauthSecret: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT_SET',
      googleClientId: process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT_SET',
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT_SET',
      githubId: process.env.GITHUB_ID ? 'SET' : 'NOT_SET',
      githubSecret: process.env.GITHUB_SECRET ? 'SET' : 'NOT_SET',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(diagnostics);
  } catch (error) {
    return NextResponse.json(
      { error: 'Diagnostic check failed', message: error.message },
      { status: 500 }
    );
  }
}
