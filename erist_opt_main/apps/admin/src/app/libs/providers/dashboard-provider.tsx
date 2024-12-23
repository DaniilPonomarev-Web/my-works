import { GetDashbordDocument, GetDashbordQuery } from '@erist-opt/meta-graphql';
import client from '../apollo';

export const getDashBoardData = async () => {
  try {
    const { data } = await client.query<GetDashbordQuery>({
      query: GetDashbordDocument,
    });

    if (!data || !data.getDashbord) {
      throw new Error('Ошибка получения дашборда');
    }
    console.warn(data.getDashbord);
    return data.getDashbord;
  } catch (error) {
    console.error('Ошибка получения дашборда:', error);
    throw error;
  }
};
