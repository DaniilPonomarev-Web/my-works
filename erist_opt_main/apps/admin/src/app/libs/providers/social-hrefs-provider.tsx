import {
  CreateSocialHrefDocument,
  CreateSocialHrefMutation,
  CreateSocialHrefMutationVariables,
  DeleteSocialHrefDocument,
  DeleteSocialHrefMutation,
  DeleteSocialHrefMutationVariables,
  GetAllSocialHrefsDocument,
  GetAllSocialHrefsQuery,
  GetAllSocialHrefsQueryVariables,
  GetSocialHrefDocument,
  GetSocialHrefQuery,
  GetSocialHrefQueryVariables,
  UpdateSocialHrefDocument,
  UpdateSocialHrefMutation,
  UpdateSocialHrefMutationVariables,
} from '@erist-opt/meta-graphql';
import client from '../apollo';

export const fetchSocialHrefs = async (params) => {
  try {
    const { pagination } = params;
    if (!pagination) {
      console.error(' пагинация обязательные');
      throw new Error('пагинация обязательные');
    }

    const { page, perPage } = pagination;

    const variables: GetAllSocialHrefsQueryVariables = {
      pagination: {
        page,
        perPage,
      },
    };

    const { data } = await client.query<GetAllSocialHrefsQuery>({
      query: GetAllSocialHrefsDocument,
      variables,
    });

    if (!data || !data.getAllSocialHrefs) {
      throw new Error('Ошибка получения соц ссылок');
    }

    return {
      data: data.getAllSocialHrefs.data,
      total: data.getAllSocialHrefs.total,
    };
  } catch (error) {
    console.error('Ошибка получения групп синонимов:', error);
    throw error;
  }
};

export const getSocialHref = async (params) => {
  try {
    const variables: GetSocialHrefQueryVariables = {
      id: params.id,
    };
    const { data } = await client.mutate<GetSocialHrefQuery>({
      mutation: GetSocialHrefDocument,
      variables,
    });

    if (!data) {
      throw new Error('Ошибка получения группы синонимов');
    }
    return {
      data: data.getSocialHref,
    };
  } catch (error) {
    console.error('Ошибка получения группы синонимов:', error);
    throw error;
  }
};

export const createSocialHref = async (params) => {
  try {
    const variables: CreateSocialHrefMutationVariables = {
      input: {
        name: params.data.name ?? '',
        href: params.data.href ?? '',
        sortOrder: params.data.sortOrder ?? '',
      },
    };

    const { data } = await client.mutate<CreateSocialHrefMutation>({
      mutation: CreateSocialHrefDocument,
      variables,
    });

    return { data: data?.createSocialHref };
  } catch (error) {
    console.error('Ошибка создания группы синонимов:', error);
    throw error;
  }
};

export const deleteSocialHref = async (params) => {
  try {
    const variables: DeleteSocialHrefMutationVariables = {
      id: params.id,
    };
    const data = await client.mutate<DeleteSocialHrefMutation>({
      mutation: DeleteSocialHrefDocument,
      variables,
    });
    return { data: { id: params.id } };
  } catch (error) {
    console.error('DeleteSocialHref Error:', error);
    throw error;
  }
};

export const updateSocialHref = async (params) => {
  try {
    const variables: UpdateSocialHrefMutationVariables = {
      input: {
        id: params.id,
        name: params.data.name ?? '',
        href: params.data.href ?? '',
        sortOrder: params.data.sortOrder ?? '',
      },
    };

    const { data } = await client.mutate<UpdateSocialHrefMutation>({
      mutation: UpdateSocialHrefDocument,
      variables,
    });
    return { data: data?.updateSocialHref };
  } catch (error) {
    console.error('Ошибка изменения соц ссылки:', error);
    throw error;
  }
};
