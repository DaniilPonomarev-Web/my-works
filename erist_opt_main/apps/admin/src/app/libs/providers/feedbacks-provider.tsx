import {
  GetAllFeedbacksDocument,
  GetAllFeedbacksQuery,
  GetAllFeedbacksQueryVariables,
  GetFeedbackByIdDocument,
  GetFeedbackByIdQuery,
  GetFeedbackByIdQueryVariables,
  UpdateFeedbackStatusDocument,
  UpdateFeedbackStatusMutation,
  UpdateFeedbackStatusMutationVariables,
} from '@erist-opt/meta-graphql';
import client from '../apollo';

export const fetcAllFeedbacks = async (params) => {
  try {
    const { pagination, filter } = params;
    if (!pagination) {
      console.error('пагинация обязательные');
      throw new Error('пагинация обязательные');
    }

    const { page, perPage } = pagination;

    const variables: GetAllFeedbacksQueryVariables = {
      pagination: {
        page,
        perPage,
      },
      filter: {
        ...filter,
        filterStatus: filter.filterStatus ? filter.filterStatus : null,
        filterText: filter.filterText ? filter.filterText : null,
        filterUserInn: filter.filterUserInn ? filter.filterUserInn : null,
      },
    };

    const { data } = await client.query<GetAllFeedbacksQuery>({
      query: GetAllFeedbacksDocument,
      variables,
    });

    if (!data || !data.getAllFeedbacks) {
      throw new Error('Ошибка получения запросов пользователей');
    }

    return {
      data: data.getAllFeedbacks.data,
      total: data.getAllFeedbacks.total,
    };
  } catch (error) {
    console.error('Ошибка получения запросов пользователей:', error);
    throw error;
  }
};

export const getOneFeedback = async (params) => {
  try {
    const variables: GetFeedbackByIdQueryVariables = {
      input: {
        id: params.id,
      },
    };
    const { data } = await client.mutate<GetFeedbackByIdQuery>({
      mutation: GetFeedbackByIdDocument,
      variables,
    });

    if (!data) {
      throw new Error('Ошибка получения запроса пользователя');
    }
    return {
      data: data.getFeedbackById,
    };
  } catch (error) {
    console.error('Ошибка получения запроса пользователя:', error);
    throw error;
  }
};

export const updateFeedBack = async (params) => {
  try {
    const variables: UpdateFeedbackStatusMutationVariables = {
      input: {
        id: params.id,
      },
    };

    const { data } = await client.mutate<UpdateFeedbackStatusMutation>({
      mutation: UpdateFeedbackStatusDocument,
      variables,
    });
    return { data: data?.updateFeedbackStatus };
  } catch (error) {
    console.error('Ошибка изменения статуса запроса:', error);
    throw error;
  }
};
