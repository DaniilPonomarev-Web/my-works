import {
  GetAllUsersDocument,
  GetAllUsersMutation,
  GetAllUsersMutationVariables,
  GetDadataDataDocument,
  GetDadataDataMutation,
  GetDadataDataMutationVariables,
  GetUserByIdDocument,
  GetUserByIdQuery,
  GetUserByIdQueryVariables,
  UpdateUserAdminDocument,
  UpdateUserAdminMutation,
  UpdateUserAdminMutationVariables,
  CreateUserAdminMutation,
  CreateUserAdminDocument,
  CreateUserAdminMutationVariables,
} from '@erist-opt/meta-graphql';
import client from '../apollo';

export const fetchUsers = async (params) => {
  try {
    const { sort, pagination, filter } = params;
    if (!sort || !pagination) {
      console.error('Сортировка и пагинация обязательные');
      throw new Error('Сортировка и пагинация обязательные');
    }

    const { field, order } = sort;
    const { page, perPage } = pagination;

    const variables: GetAllUsersMutationVariables = {
      sortBy: field,
      sortOrder: order,
      pagination: {
        page,
        perPage,
      },
      filter: {
        ...filter,
        filterStatus: filter.filterStatus ? filter.filterStatus : null,
        filterName: filter.filterName ? filter.filterName : null,
        filterPhone: filter.filterPhone ? filter.filterPhone : null,
        filterEmail: filter.filterEmail ? filter.filterEmail : null,
      },
    };
    const { data } = await client.query<GetAllUsersMutation>({
      query: GetAllUsersDocument,
      variables,
    });

    if (!data || !data.getAllUsers) {
      throw new Error('Ошибка получения данных пользователей сайта');
    }

    return {
      data: data.getAllUsers.users,
      total: data.getAllUsers.total,
    };
  } catch (error) {
    console.error('Ошибка получения данных пользователей сайта:', error);
    throw error;
  }
};

export const getOneUser = async (params) => {
  try {
    const variables: GetUserByIdQueryVariables = {
      id: params.id,
    };
    const { data } = await client.mutate<GetUserByIdQuery>({
      mutation: GetUserByIdDocument,
      variables,
    });

    if (!data) {
      throw new Error('Ошибка получения данных пользователя');
    }
    return {
      data: data.getUserById,
    };
  } catch (error) {
    console.error('Ошибка получения данных пользователя:', error);
    throw error;
  }
};

export const updateUser = async (params) => {
  try {
    const variables: UpdateUserAdminMutationVariables = {
      updateUserForAdminDto: {
        id: params.id,
        name: params.data.name,
        phone: params.data.phone,
        status: params.data.status,
      },
    };

    const { data } = await client.mutate<UpdateUserAdminMutation>({
      mutation: UpdateUserAdminDocument,
      variables,
    });
    return { data: data?.updateUserAdmin };
  } catch (error) {
    console.error('Ошибка изменения основных данных пользователя:', error);
    throw error;
  }
};

export const getDadataDataUser = async (params: any, inn: string) => {
  try {
    const variables: GetDadataDataMutationVariables = {
      inn: inn,
    };
    console.warn(variables);

    const { data } = await client.mutate<GetDadataDataMutation>({
      mutation: GetDadataDataDocument,
      variables,
    });

    if (!data) {
      throw new Error('Ошибка получения данных пользователя dadata');
    }

    console.warn(data.getDadataData);

    return {
      data: data.getDadataData,
    };
  } catch (error) {
    console.error('Ошибка получения данных пользователя dadata:', error);
    throw error;
  }
};

export const createUser = async (params) => {
  console.log(params);

  try {
    const variables: CreateUserAdminMutationVariables = {
      createUserAdminInput: {
        name: params.data.name?.toString() ?? '',
        email: params.data.email?.toString() ?? '',
        phone: params.data.phone?.toString() ?? '',
        password: params.data.password?.toString() ?? '',
        secondPassword: params.data.password?.toString() ?? '',
        company: {
          inn: params.data.company.inn?.toString() ?? '',
          kpp: params.data.company.kpp?.toString() ?? null,
          name: params.data.company.name?.toString() ?? '',
          urAddress: params.data.company.urAddress?.toString() ?? '',
          bankName: params.data.company.bankName?.toString() ?? '',
          bikBank: params.data.company.bikBank?.toString() ?? '',
          checkingAccount:
            params.data.company.checkingAccount?.toString() ?? '',
          correspondentAccount:
            params.data.company.correspondentAccount?.toString() ?? '',
        },
        addresses: [
          {
            city: params.data.addresses[0].city?.toString() ?? '',
            country: params.data.addresses[0].country?.toString() ?? '',
            street: params.data.addresses[0].street?.toString() ?? '',
            home: params.data.addresses[0].home?.toString() ?? '',
            apartmentORoffice:
              params.data.addresses[0].apartmentORoffice?.toString() ?? '',
          },
        ],
      },
    };

    const { data } = await client.mutate<CreateUserAdminMutation>({
      mutation: CreateUserAdminDocument,
      variables,
    });

    return { data: data?.createUserAdmin };
  } catch (error) {
    console.error('Ошибка создания пользователя сайта:', error);
    throw error;
  }
};
