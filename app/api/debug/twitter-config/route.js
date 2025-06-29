import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const config = {
      hasTwitterClientId: !!process.env.TWITTER_CLIENT_ID,
      hasTwitterClientSecret: !!process.env.TWITTER_CLIENT_SECRET,
      nextAuthUrl: process.env.NEXTAUTH_URL,
      twitterClientIdLength: process.env.TWITTER_CLIENT_ID?.length || 0,
      twitterClientSecretLength: process.env.TWITTER_CLIENT_SECRET?.length || 0,
      expectedCallbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/twitter`,
      
      // 不暴露實際的密鑰，只顯示格式資訊
      twitterClientIdPrefix: process.env.TWITTER_CLIENT_ID?.substring(0, 8) + '...',
      
      // 檢查 Twitter Client ID 格式（Twitter OAuth 2.0 Client ID 通常是 base64 編碼）
      clientIdFormatCheck: {
        isBase64Like: /^[A-Za-z0-9+/=]+$/.test(process.env.TWITTER_CLIENT_ID || ''),
        length: process.env.TWITTER_CLIENT_ID?.length || 0,
        expectedLength: '應該是較長的 base64 編碼字串'
      },
      
      // NextAuth 配置檢查
      nextAuthConfig: {
        secretExists: !!process.env.NEXTAUTH_SECRET,
        urlSet: !!process.env.NEXTAUTH_URL,
      },
      
      recommendations: [
        '確認 Twitter 應用類型為 Web App',
        '確認已啟用 OAuth 2.0',
        '確認 Callback URL 設定正確',
        '確認應用權限設定為 Read',
        '確認使用的是 OAuth 2.0 憑證而非 OAuth 1.0a'
      ]
    };

    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json(
      { error: '配置檢查失敗', details: error.message },
      { status: 500 }
    );
  }
}
