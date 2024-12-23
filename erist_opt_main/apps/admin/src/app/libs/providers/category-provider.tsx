import {
  CreateCategoryWithDescriptionDocument,
  CreateCategoryWithDescriptionMutation,
  CreateCategoryWithDescriptionMutationVariables,
  DeleteCategoryDocument,
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables,
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetCategoryByIdDocument,
  GetCategoryByIdQuery,
  GetCategoryByIdQueryVariables,
  GetCategoryTreeDocument,
  GetCategoryTreeQuery,
  GetCategoryTreeQueryVariables,
  GetChildrenCategoriesDocument,
  GetChildrenCategoriesQuery,
  GetParentCategoriesDocument,
  GetParentCategoriesQuery,
  UpdateCategoryDocument,
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
} from '@erist-opt/meta-graphql';
import client from '../apollo';

export const getCategoryTree = async (params) => {
  try {
    const { pagination, filter } = params;
    if (!pagination) {
      console.error(' пагинация обязательные');
      throw new Error('пагинация обязательные');
    }
    const { page, perPage } = pagination;
    const variables: GetCategoryTreeQueryVariables = {
      pagination: {
        page,
        perPage,
      },
      filter: {
        ...filter,
        filterStatus: filter.filterStatus ?? null,
        filterName: filter.filterName ? filter.filterName : null,
        filterDescription: filter.filterDescription
          ? filter.filterDescription
          : null,
        filterMainCategory: filter.filterMainCategory ?? null,
      },
    };
    console.warn(variables);

    const { data } = await client.query<GetCategoryTreeQuery>({
      query: GetCategoryTreeDocument,
      variables,
    });
    if (!data || !data.getCategoryTree) {
      throw new Error('Ошибка получения дерева категорий');
    }
    console.warn(data);

    return {
      data: data.getCategoryTree.data,
      total: data.getCategoryTree.total,
    };
  } catch (error) {
    console.error('Ошибка получения дерева категорий:', error);
    throw error;
  }
};

export const getAllCategories = async (params) => {
  try {
    const { data } = await client.query<GetAllCategoriesQuery>({
      query: GetAllCategoriesDocument,
    });
    if (!data || !data.getAllCategories) {
      throw new Error('Ошибка получения всех категорий');
    }
    console.log(data);

    return {
      data: data.getAllCategories,
    };
  } catch (error) {
    console.error('Ошибка получения всех категорий:', error);
    throw error;
  }
};

export const getCategoryById = async (params) => {
  try {
    const variables: GetCategoryByIdQueryVariables = {
      id: params.id,
    };
    const { data } = await client.mutate<GetCategoryByIdQuery>({
      mutation: GetCategoryByIdDocument,
      variables,
    });

    if (!data) {
      throw new Error('Ошибка получения категории');
    }
    return {
      data: data.getCategoryById,
    };
  } catch (error) {
    console.error('Ошибка получения категории:', error);
    throw error;
  }
};

export const createCategoryWithDescription = async (params) => {
  try {
    const variables: CreateCategoryWithDescriptionMutationVariables = {
      input: {
        image: params.data.image ?? null,
        parent_id: params.data.parent_id ?? null,
        sort_order: params.data.sort_order ?? '',
        status: params.data.status ?? false,
        descriptions: [
          {
            meta_title: params.data.description.meta_title ?? '',
            name: params.data.description.name ?? '',
            description: params.data.description.description ?? '',
            meta_h1: params.data.description.meta_h1 ?? '',
            meta_description: params.data.description.meta_description ?? '',
            meta_keyword: params.data.description.meta_keyword ?? '',
          },
        ],
      },
    };

    const { data } = await client.mutate<CreateCategoryWithDescriptionMutation>(
      {
        mutation: CreateCategoryWithDescriptionDocument,
        variables,
      }
    );

    return { data: data?.createCategoryWithDescription };
  } catch (error) {
    console.error('Ошибка создания категории:', error);
    throw error;
  }
};

export const deleteCategory = async (params) => {
  try {
    const variables: DeleteCategoryMutationVariables = {
      id: params.id,
    };
    const data = await client.mutate<DeleteCategoryMutation>({
      mutation: DeleteCategoryDocument,
      variables,
    });
    return { data: { id: params.id } };
  } catch (error) {
    console.error('DeleteCategory Error:', error);
    throw error;
  }
};

export const updateCategory = async (params) => {
  // console.warn(params.data.descriptions);

  try {
    const variables: UpdateCategoryMutationVariables = {
      input: {
        id: params.id ?? null,
        image: params.data.image ?? null,
        parent_id: params.data.parent_id ?? null,
        sort_order: params.data.sort_order ?? '',
        status: params.data.status ?? false,
        onHomePage: params.data.onHomePage ?? false,
        descriptions: [
          {
            id: params.data.descriptions[0].id ?? null,
            name: params.data.descriptions[0].name ?? '',
            meta_title: params.data.descriptions[0].meta_title ?? '',
            description: params.data.descriptions[0].description ?? '',
            meta_h1: params.data.descriptions[0].meta_h1 ?? '',
            meta_description:
              params.data.descriptions[0].meta_description ?? '',
            meta_keyword: params.data.descriptions[0].meta_keyword ?? '',
          },
        ],
      },
    };
    console.warn(variables);

    const { data } = await client.mutate<UpdateCategoryMutation>({
      mutation: UpdateCategoryDocument,
      variables,
    });
    return { data: data?.updateCategory };
  } catch (error) {
    console.warn(error);

    console.error('Ошибка изменения категории:', error);
    throw error;
  }
};

export const getParentCategories = async () => {
  try {
    const { data } = await client.query<GetParentCategoriesQuery>({
      query: GetParentCategoriesDocument,
    });

    if (!data || !data.getParentCategories) {
      throw new Error('Ошибка получения родительских категорий');
    }

    return {
      data: data.getParentCategories,
      total: data.getParentCategories,
    };
  } catch (error) {
    console.error('Ошибка получения родительских категорий:', error);
    throw error;
  }
};

export const getChildrenCategories = async () => {
  try {
    const { data } = await client.query<GetChildrenCategoriesQuery>({
      query: GetChildrenCategoriesDocument,
    });

    if (!data || !data.getChildrenCategories) {
      throw new Error('Ошибка получения дочерних категорий');
    }

    return {
      data: data.getChildrenCategories,
      total: data.getChildrenCategories,
    };
  } catch (error) {
    console.error('Ошибка получения дочерних категорий:', error);
    throw error;
  }
};
