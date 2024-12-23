import type { NextAuthConfig } from 'next-auth';
import { refreshToken, verifyTokenUser } from './app/lib/fetcher';
import {
  apiAuthPrefix,
  DEFAULT_HOME_REDIRECT,
  protectRoute,
  publicRoutes,
} from './routes';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [],
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isAuthenticated = auth?.user?.isAuth ?? false;

      const isProtectRoute = protectRoute.has(nextUrl.pathname);
      const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

      // API
      if (isApiAuthRoute) {
        return true;
      }

      // Публичный путь
      if (!isAuthenticated && isProtectRoute) {
        return false;
      }

      return true;
    },
    async jwt({ token, user, account, session }) {
      if (user) {
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;

        return token;
      }

      const isActive = await verifyTokenUser(token.access_token);
      if (isActive) {
        token.isAuth = true;
        return token;
      }

      if (!token?.refresh_token) throw new Error('Missing refresh token');

      const refreshTokenResult = await refreshToken(token.refresh_token);
      if (!refreshTokenResult) throw new Error('Missing new refresh token');

      token.access_token = refreshTokenResult.access_token;
      token.refresh_token = refreshTokenResult.refresh_token;

      return token;
    },
    session({ session, token }) {
      session.error = token.error;
      return {
        ...session,
        user: {
          access_token: token.access_token,
          refresh_token: token.refresh_token,
          isAuth: token.isAuth ?? false,
        },
      };
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/home`;
    },
  },
} satisfies NextAuthConfig;

declare module 'next-auth' {
  interface Session {
    error?: 'RefreshTokenError';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    refresh_token: string;
    error?: 'RefreshTokenError';
  }
}
