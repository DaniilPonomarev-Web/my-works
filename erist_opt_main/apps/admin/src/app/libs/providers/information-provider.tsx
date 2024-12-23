import {
  CreateInformationDocument,
  CreateInformationMutationVariables,
  DeleteInformationDocument,
  DeleteInformationMutation,
  DeleteInformationMutationVariables,
  GetAllInformationsDocument,
  GetAllInformationsQuery,
  GetAllInformationsQueryVariables,
  GetInformationDocument,
  GetInformationQuery,
  GetInformationQueryVariables,
  UpdateInformationDocument,
  UpdateInformationMutation,
  UpdateInformationMutationVariables,
} from '@erist-opt/meta-graphql';
import client from '../apollo';

export const fetcInformations = async (params) => {
  try {
    const { pagination } = params;
    if (!pagination) {
      console.error(' пагинация обязательные');
      throw new Error('пагинация обязательные');
    }

    const { page, perPage } = pagination;

    const variables: GetAllInformationsQueryVariables = {
      pagination: {
        page,
        perPage,
      },
    };

    const { data } = await client.query<GetAllInformationsQuery>({
      query: GetAllInformationsDocument,
      variables,
    });

    if (!data || !data.getAllInformations) {
      throw new Error('Ошибка получения информационных страниц');
    }

    return {
      data: data.getAllInformations.data,
      total: data.getAllInformations.total,
    };
  } catch (error) {
    console.error('Ошибка получения групп синонимов:', error);
    throw error;
  }
};

export const getOneInformation = async (params) => {
  try {
    const variables: GetInformationQueryVariables = {
      id: params.id,
    };
    const { data } = await client.mutate<GetInformationQuery>({
      mutation: GetInformationDocument,
      variables,
    });

    if (!data) {
      throw new Error('Ошибка получения информационной страницы');
    }
    return {
      data: data.getInformation,
    };
  } catch (error) {
    console.error('Ошибка получения информационной страницы:', error);
    throw error;
  }
};

export const createInformation = async (params) => {
  try {
    const variables: CreateInformationMutationVariables = {
      data: {
        name: params.data.name ?? '',
        title: params.data.title ?? '',
        content: params.data.content ?? '',
        status: params.data.status ?? false,
      },
    };

    const { data } = await client.mutate<CreateInformationMutationVariables>({
      mutation: CreateInformationDocument,
      variables,
    });

    console.warn(data);

    return { data: data.createInformation };
  } catch (error) {
    console.error('Ошибка создания информации:', error);
    throw error;
  }
};

export const deleteInformation = async (params) => {
  try {
    const variables: DeleteInformationMutationVariables = {
      id: params.id,
    };
    const data = await client.mutate<DeleteInformationMutation>({
      mutation: DeleteInformationDocument,
      variables,
    });
    return { data: { id: params.id } };
  } catch (error) {
    console.error('Delete Error:', error);
    throw error;
  }
};

export const updateInformation = async (params) => {
  try {
    const variables: UpdateInformationMutationVariables = {
      data: {
        id: params.id,
        name: params.data.name ?? '',
        title: params.data.title ?? '',
        content: params.data.content ?? '',
        status: params.data.status ?? false,
      },
    };

    const { data } = await client.mutate<UpdateInformationMutation>({
      mutation: UpdateInformationDocument,
      variables,
    });
    return { data: data?.updateInformation };
  } catch (error) {
    console.error('Ошибка изменения информации:', error);
    throw error;
  }
};
