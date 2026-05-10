import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    authorized({
      auth,
      request: { nextUrl },
    }: {
      auth: { user?: object } | null;
      request: { nextUrl: URL };
    }): boolean {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      if (isOnAdmin) {
        return isLoggedIn;
      }
      return true;
    },
    jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: object;
      account?: { access_token?: string; refresh_token?: string } | null;
    }): JWT {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
        };
      }
      return token;
    },
    session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Session {
      session.accessToken = token.accessToken as string | undefined;
      session.refreshToken = token.refreshToken as string | undefined;
      return session;
    },
  },
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export default authConfig;
