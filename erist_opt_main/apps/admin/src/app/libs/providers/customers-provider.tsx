import {
  CreateCustomerDocument,
  CreateCustomerMutation,
  CreateCustomerMutationVariables,
  DeleteCustomerDocument,
  DeleteCustomerMutation,
  DeleteCustomerMutationVariables,
  GetAllCustomersDocument,
  GetAllCustomersQuery,
  GetAllCustomersQueryVariables,
  GetCustomerDocument,
  GetCustomerQuery,
  GetCustomerQueryVariables,
  UpdateCustomerDocument,
  UpdateCustomerMutation,
  UpdateCustomerMutationVariables,
} from '@erist-opt/meta-graphql';
import client from '../apollo';

export const fetchCustomers = async (params) => {
  try {
    const { sort, pagination, filter } = params;
    if (!sort || !pagination) {
      console.error('Сортировка и пагинация обязательные');
      throw new Error('Сортировка и пагинация обязательные');
    }

    const { field, order } = sort;
    const { page, perPage } = pagination;

    const variables: GetAllCustomersQueryVariables = {
      sortBy: field,
      sortOrder: order.toLowerCase(),
      pagination: {
        page,
        perPage,
      },
      filter: {
        ...filter,
        filterLogin: filter.filterLogin ? filter.filterLogin : null,
        filterEmail: filter.filterEmail ? filter.filterEmail : null,
      },
    };

    const { data } = await client.query<GetAllCustomersQuery>({
      query: GetAllCustomersDocument,
      variables,
    });

    console.warn(data);

    if (!data || !data.getAllCustomers) {
      throw new Error('Ошибка получения данных пользователей админ панели');
    }

    return {
      data: data.getAllCustomers.customers,
      total: data.getAllCustomers.total,
    };
  } catch (error) {
    console.error('Ошибка получения данных пользователей сайта:', error);
    throw error;
  }
};

export const getOneCustomer = async (params) => {
  try {
    const variables: GetCustomerQueryVariables = {
      id: params.id,
    };
    const { data } = await client.mutate<GetCustomerQuery>({
      mutation: GetCustomerDocument,
      variables,
    });

    if (!data) {
      throw new Error('Ошибка получения данных пользователя админ панели');
    }
    return {
      data: data.getCustomer,
    };
  } catch (error) {
    console.error('Ошибка получения Пользователя админ панели:', error);
    throw error;
  }
};

export const createCustomer = async (params) => {
  try {
    const variables: CreateCustomerMutationVariables = {
      createCustomerDto: {
        login: params.data.login,
        email: params.data.email,
        password: params.data.password,
        role: params.data.role,
      },
    };

    const { data } = await client.mutate<CreateCustomerMutation>({
      mutation: CreateCustomerDocument,
      variables,
    });

    return { data: data?.createCustomer };
  } catch (error) {
    console.error('Ошибка создания пользователя админки:', error);
    throw error;
  }
};

export const updateСustomer = async (params) => {
  try {
    const variables: UpdateCustomerMutationVariables = {
      updateCustomerDto: {
        id: params.id,
        login: params.data.login,
        email: params.data.email,
        role: params.data.role,
        password: params.data.password || null,
      },
    };

    const { data } = await client.mutate<UpdateCustomerMutation>({
      mutation: UpdateCustomerDocument,
      variables,
    });
    return { data: data?.updateCustomer };
  } catch (error) {
    console.error('Ошибка изменения данных пользователя админ панели:', error);
    throw error;
  }
};

export const deleteCustomer = async (params) => {
  try {
    const variables: DeleteCustomerMutationVariables = {
      id: params.id,
    };
    const data = await client.mutate<DeleteCustomerMutation>({
      mutation: DeleteCustomerDocument,
      variables,
    });
    return { data: { id: params.id } };
  } catch (error) {
    console.error('Ошибка удаления:', error);
    throw error;
  }
};
