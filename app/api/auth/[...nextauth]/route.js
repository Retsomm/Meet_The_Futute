import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import TwitterProvider from 'next-auth/providers/twitter'

// Debug function to log configuration
function logConfig() {
  if (process.env.NODE_ENV === 'development') {
    console.log('NextAuth Configuration:')
    console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
    console.log('Current HOST:', typeof window !== 'undefined' ? window.location.origin : 'Server Side')
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
          version: "2.0", // 明確指定使用 OAuth 2.0
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
        // Debug Twitter OAuth
        if (account.provider === 'twitter') {
          console.log('Twitter OAuth Success:', { userId: user.id, username: user.name });
        }
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.userId = token.userId
      return session
    },
    async signIn({ user, account, profile }) {
      // Debug OAuth sign in
      if (process.env.NODE_ENV === 'development') {
        console.log('Sign in attempt:', {
          provider: account?.provider,
          userId: user?.id,
          userName: user?.name,
        });
      }
      return true;
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

export { handler as GET, handler as POST };
