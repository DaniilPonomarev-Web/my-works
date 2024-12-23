import {
  GetAllLogsDocument,
  GetAllLogsQuery,
  GetAllLogsQueryVariables,
} from '@erist-opt/meta-graphql';
import client from '../apollo';

export const fetchAllLogs = async (params) => {
  try {
    const { pagination, filter } = params;
    if (!pagination) {
      console.error('пагинация обязательные');
      throw new Error('пагинация обязательные');
    }
    const { page, perPage } = pagination;

    const variables: GetAllLogsQueryVariables = {
      pagination: {
        page,
        perPage,
      },
      service: filter.service ? filter.service : null,
      admin: filter.admin ? filter.admin : null,
      dataId: filter.dataId ? filter.dataId : null,
      title: filter.title ? filter.title : null,
      fromDate: filter.fromDate ? filter.fromDate : null,
      toDate: filter.toDate ? filter.toDate : null,
    };

    const { data } = await client.query<GetAllLogsQuery>({
      query: GetAllLogsDocument,
      variables,
    });
    if (!data || !data.getAllLogs) {
      throw new Error('Ошибка получения данных логов с админки сайта');
    }
    return {
      data: data.getAllLogs.logs,
      total: data.getAllLogs.total,
    };
  } catch (error) {
    console.error('Ошибка получения данных логов с админки сайта:', error);
    throw error;
  }
};
