import NextAuthProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import TwitterProvider from 'next-auth/providers/twitter';
import type { Account, Profile, User } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
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
            version: '2.0',
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
    }): Promise<JWT> {
      if (account && user) {
        token.accessToken = account.access_token;
        token.userId = user.id;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      session.accessToken = token.accessToken as string | undefined;
      session.refreshToken = token.refreshToken as string | undefined;
      return session;
    },
    async signIn(_params: {
      user: User;
      account: Account | null;
      profile?: Profile;
    }): Promise<boolean> {
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
};
