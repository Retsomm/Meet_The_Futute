import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import TwitterProvider from 'next-auth/providers/twitter'

// Debug function to log configuration
function logConfig() {
  if (process.env.NODE_ENV === 'development') {
    console.log('NextAuth Configuration:')
    console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
    console.log('NEXTAUTH_SECRET exists:', !!process.env.NEXTAUTH_SECRET)
    console.log('GOOGLE_CLIENT_ID exists:', !!process.env.GOOGLE_CLIENT_ID)
    console.log('GOOGLE_CLIENT_SECRET exists:', !!process.env.GOOGLE_CLIENT_SECRET)
    console.log('GITHUB_ID exists:', !!process.env.GITHUB_ID)
    console.log('GITHUB_SECRET exists:', !!process.env.GITHUB_SECRET)
    console.log('TWITTER_CLIENT_ID exists:', !!process.env.TWITTER_CLIENT_ID)
    console.log('TWITTER_CLIENT_SECRET exists:', !!process.env.TWITTER_CLIENT_SECRET)
  }
}

logConfig();

const providers = [
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
      ]
    : []),
  ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET
    ? [
        GitHubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
      ]
    : []),
  ...(process.env.TWITTER_CLIENT_ID && process.env.TWITTER_CLIENT_SECRET
    ? [
        TwitterProvider({
          clientId: process.env.TWITTER_CLIENT_ID,
          clientSecret: process.env.TWITTER_CLIENT_SECRET,
          // 嘗試使用 OAuth 1.0a（更穩定）
          version: "1.0A",
        }),
      ]
    : []),
];

// Ensure we have at least one provider
if (providers.length === 0) {
  console.error('No OAuth providers configured. Please check your environment variables.');
}

export const authOptions = {
  providers,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token
        token.userId = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.userId = token.userId
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions);

// Add error handling wrapper
const wrappedHandler = async (req, res) => {
  try {
    return await handler(req, res);
  } catch (error) {
    console.error('NextAuth error:', error);
    throw error;
  }
};

export { wrappedHandler as GET, wrappedHandler as POST };
