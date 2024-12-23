import {
  CreateSynonymGroupDocument,
  CreateSynonymGroupMutation,
  CreateSynonymGroupMutationVariables,
  DeleteSynonymGroupDocument,
  DeleteSynonymGroupMutation,
  DeleteSynonymGroupMutationVariables,
  GetAllSynonymGroupsDocument,
  GetAllSynonymGroupsQuery,
  GetAllSynonymGroupsQueryVariables,
  GetSynonymGroupByIdDocument,
  GetSynonymGroupByIdQuery,
  GetSynonymGroupByIdQueryVariables,
  UpdateSynonymGroupDocument,
  UpdateSynonymGroupMutation,
  UpdateSynonymGroupMutationVariables,
} from '@erist-opt/meta-graphql';
import client from '../apollo';

export const fetcGroupsSynonyms = async (params) => {
  try {
    const { pagination, filter } = params;
    if (!pagination) {
      console.error(' пагинация обязательные');
      throw new Error('пагинация обязательные');
    }

    const { page, perPage } = pagination;

    const variables: GetAllSynonymGroupsQueryVariables = {
      pagination: {
        page,
        perPage,
      },
      filter: {
        ...filter,
        synonym: filter.synonym ? filter.synonym : null,
      },
    };

    const { data } = await client.query<GetAllSynonymGroupsQuery>({
      query: GetAllSynonymGroupsDocument,
      variables,
    });

    if (!data || !data.getAllSynonymGroups) {
      throw new Error('Ошибка получения групп синонимов');
    }

    return {
      data: data.getAllSynonymGroups.data,
      total: data.getAllSynonymGroups.total,
    };
  } catch (error) {
    console.error('Ошибка получения групп синонимов:', error);
    throw error;
  }
};

export const getOneGroupSynonyms = async (params) => {
  try {
    const variables: GetSynonymGroupByIdQueryVariables = {
      id: params.id,
    };
    const { data } = await client.mutate<GetSynonymGroupByIdQuery>({
      mutation: GetSynonymGroupByIdDocument,
      variables,
    });

    if (!data) {
      throw new Error('Ошибка получения группы синонимов');
    }
    return {
      data: data.getSynonymGroupById,
    };
  } catch (error) {
    console.error('Ошибка получения группы синонимов:', error);
    throw error;
  }
};

export const createGropuSynonyms = async (params) => {
  try {
    const variables: CreateSynonymGroupMutationVariables = {
      createSynonymGroupDto: {
        synonyms: params.data.synonyms ?? '',
      },
    };

    const { data } = await client.mutate<CreateSynonymGroupMutation>({
      mutation: CreateSynonymGroupDocument,
      variables,
    });

    return { data: data?.createSynonymGroup };
  } catch (error) {
    console.error('Ошибка создания группы синонимов:', error);
    throw error;
  }
};

export const deleteGropuSynonyms = async (params) => {
  try {
    const variables: DeleteSynonymGroupMutationVariables = {
      id: params.id,
    };
    const data = await client.mutate<DeleteSynonymGroupMutation>({
      mutation: DeleteSynonymGroupDocument,
      variables,
    });
    return { data: { id: params.id } };
  } catch (error) {
    console.error('Delete Error:', error);
    throw error;
  }
};

export const updateGropuSynonyms = async (params) => {
  try {
    const variables: UpdateSynonymGroupMutationVariables = {
      updateSynonymGroupDto: {
        id: params.id,
        synonyms: params.data.synonyms,
      },
    };

    const { data } = await client.mutate<UpdateSynonymGroupMutation>({
      mutation: UpdateSynonymGroupDocument,
      variables,
    });
    return { data: data?.updateSynonymGroup };
  } catch (error) {
    console.error('Ошибка изменения группы синонимов:', error);
    throw error;
  }
};
