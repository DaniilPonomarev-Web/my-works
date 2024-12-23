import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { MongoDBAdapter } from '@auth/mongodb-adapter';

import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
} from '@erist-opt/meta-graphql';

import { authConfig } from './auth.config';
import { getClient } from './app/lib/apollo';
import client from './app/lib/db';
import { Adapter } from 'next-auth/adapters';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(client) as Adapter,
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      async authorize(credentials: any) {
        try {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);

          if (parsedCredentials.success) {
            const client = getClient();
            const variables: LoginMutationVariables = {
              input: {
                email: parsedCredentials.data.email,
                password: parsedCredentials.data.password,
              },
            };

            const res = await client.mutate<LoginMutation>({
              mutation: LoginDocument,
              variables,
            });

            if (!res.data?.login) return null;

            // Возвращаем объект, соответствующий типу User
            return {
              isAuth: true,
              access_token: res.data.login.access_token,
              refresh_token: res.data.login.refresh_token,
            };
          }

          return null;
        } catch (error) {
          console.error({ error });
          return null;
        }
      },
    }),
  ],
});
