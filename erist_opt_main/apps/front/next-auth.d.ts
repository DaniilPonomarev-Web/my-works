import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    isAuth: boolean;
    access_token: string; // new kostil
    refresh_token: string; // new kostil
  }
  interface Session {
    user: {
      isAuth: boolean;
      access_token: string; // new kostil
      refresh_token: string; // new kostil
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    refresh_token: string;
    isAuth: boolean;
  }
}
