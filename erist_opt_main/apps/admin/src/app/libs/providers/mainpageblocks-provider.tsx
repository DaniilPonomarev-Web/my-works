import {
  CreateMainPageBlockDocument,
  CreateMainPageBlockMutation,
  CreateMainPageBlockMutationVariables,
  GetMainPageBlockDocument,
  GetMainPageBlockQuery,
  GetMainPageBlockQueryVariables,
  MainPageBlocksDocument,
  MainPageBlocksQuery,
  MainPageBlocksQueryVariables,
  RemoveMainPageBlockDocument,
  RemoveMainPageBlockMutation,
  RemoveMainPageBlockMutationVariables,
  UpdateMainPageBlockDocument,
  UpdateMainPageBlockMutation,
  UpdateMainPageBlockMutationVariables,
} from '@erist-opt/meta-graphql';
import client from '../apollo';

export const fetchMainPageBlocks = async (params) => {
  try {
    const { sort, pagination } = params;
    const { field, order } = sort;

    const { page, perPage } = pagination;

    const variables: MainPageBlocksQueryVariables = {
      sortBy: field,
      sortOrder: order.toLowerCase(),
      pagination: {
        page,
        perPage,
      },
    };

    const { data } = await client.query<MainPageBlocksQuery>({
      query: MainPageBlocksDocument,
      variables,
    });

    if (!data || !data.mainPageBlocks) {
      throw new Error('Ошибка получения данных блоков на главной странице');
    }

    return {
      data: data.mainPageBlocks.blocks,
      total: data.mainPageBlocks.total,
    };
  } catch (error) {
    console.error('Ошибка получения блоков на главной странице:', error);
    throw error;
  }
};

export const getOneMainPageBlock = async (params) => {
  try {
    const variables: GetMainPageBlockQueryVariables = {
      IdMainPageBlockInputDTO: {
        id: params.id,
      },
    };
    const { data } = await client.mutate<GetMainPageBlockQuery>({
      mutation: GetMainPageBlockDocument,
      variables,
    });

    if (!data) {
      throw new Error('Ошибка получения данных Блока товаров');
    }
    return {
      data: data.getMainPageBlock,
    };
  } catch (error) {
    console.error('Ошибка получения Блока товаров:', error);
    throw error;
  }
};

export const updateMainPageBlock = async (params) => {
  try {
    const productIds = params.data.products
      .map((product) => {
        if (typeof product === 'object' && product.id) {
          if (Array.isArray(product.id)) {
            return product.id;
          }
          return product.id;
        }
        return '';
      })
      .flat(); // Если есть вложенные массивы, их нужно объединить
    const variables: UpdateMainPageBlockMutationVariables = {
      updateMainPageBlockInput: {
        id: params.id,
        name: params.data.name,
        title: params.data.title,
        link: params.data.link,
        sort: parseFloat(params.data.sort) || 0,
        status: params.data.status,
        products: productIds,
      },
    };
    const { data } = await client.mutate<UpdateMainPageBlockMutation>({
      mutation: UpdateMainPageBlockDocument,
      variables,
    });
    return { data: data?.updateMainPageBlock };
  } catch (error) {
    console.error('Ошибка изменения блока товаров:', error);
    throw error;
  }
};

export const createMainPageBlock = async (params) => {
  try {
    const variables: CreateMainPageBlockMutationVariables = {
      input: {
        name: params.data.name,
        title: params.data.title,
        link: params.data.link,
        sort: params.data.sort || 0,
        status: params.data.status,
        products: params.data.products,
      },
    };

    const { data } = await client.mutate<CreateMainPageBlockMutation>({
      mutation: CreateMainPageBlockDocument,
      variables,
    });

    return { data: data?.createMainPageBlock };
  } catch (error) {
    console.error('Ошибка созданеия блока:', error);
    throw error;
  }
};

export const deleteMainPageBlock = async (params) => {
  try {
    const variables: RemoveMainPageBlockMutationVariables = {
      IdMainPageBlockInputDTO: {
        id: params.id,
      },
    };
    const data = await client.mutate<RemoveMainPageBlockMutation>({
      mutation: RemoveMainPageBlockDocument,
      variables,
    });
    return { data: { id: params.id } };
  } catch (error) {
    console.error('Delete Error:', error);
    throw error;
  }
};
