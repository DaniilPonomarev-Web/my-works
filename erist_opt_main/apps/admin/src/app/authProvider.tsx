import {
  LoginCustomerDocument,
  LoginCustomerMutation,
  LoginCustomerMutationVariables,
  RefreshTokenCustomerDocument,
  RefreshTokenCustomerMutation,
  RefreshTokenCustomerMutationVariables,
  VerifyTokenCustomerDocument,
  VerifyTokenCustomerQuery,
  WhoIAmCustomerDocument,
  WhoIAmCustomerQuery,
} from '@erist-opt/meta-graphql';

import client from './libs/apollo';

const authProvider = {
  login: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const variables: LoginCustomerMutationVariables = {
        input: {
          login: username,
          password,
        },
      };
      const result = await client.mutate<LoginCustomerMutation>({
        mutation: LoginCustomerDocument,
        variables,
      });

      if (!result.data?.loginCustomer.access_token)
        throw Error('Token not found');

      const { access_token, refresh_token } = result.data.loginCustomer;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      return true;
    } catch (error) {
      console.error({ error });
      throw Error('error');
    }
  },
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return Promise.resolve();
  },
  checkAuth: async () => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) throw Error('token not found');

    const result = await client.query<VerifyTokenCustomerQuery>({
      query: VerifyTokenCustomerDocument,
      context: {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      },
    });

    if (result.data?.verifyTokenCustomer) return true;
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      const variables: RefreshTokenCustomerMutationVariables = {
        refreshToken,
      };

      const resultrefresh = await client.mutate<RefreshTokenCustomerMutation>({
        mutation: RefreshTokenCustomerDocument,
        variables,
      });

      if (!resultrefresh?.data?.refreshTokenCustomer)
        throw Error('token not verify');

      const { access_token, refresh_token } =
        resultrefresh.data.refreshTokenCustomer;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      return true;
    }

    throw Error('token not verify');
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('access_token');
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  getIdentity: async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      const Authorization = 'Bearer ' + access_token;
      const res = await client.query<WhoIAmCustomerQuery>({
        query: WhoIAmCustomerDocument,
        context: {
          headers: {
            Authorization,
          },
        },
      });
      return {
        id: res.data.whoIAmCustomer.id,
        fullName: res.data.whoIAmCustomer.login,
      };
    } catch (error) {
      // TODO обработать ошибку
      console.log({ error });
    }
  },
  getPermissions: () => Promise.resolve(''),
};

export default authProvider;
