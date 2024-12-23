import {
  CreateOptionDocument,
  CreateOptionMutation,
  CreateOptionMutationVariables,
  CreateOptionValuesDocument,
  CreateOptionValuesMutation,
  CreateOptionValuesMutationVariables,
  DeleteOptionDocument,
  DeleteOptionMutation,
  DeleteOptionMutationVariables,
  GetAllOptionsWithValuesDocument,
  GetAllOptionsWithValuesQuery,
  GetAllOptionsWithValuesQueryVariables,
  GetOptionByIdDocument,
  GetOptionByIdQuery,
  GetOptionByIdQueryVariables,
  UpdateOptionValuesDocument,
  UpdateOptionValuesMutation,
  UpdateOptionValuesMutationVariables,
} from '@erist-opt/meta-graphql';
import client from '../apollo';

export const fetchAllOptions = async (params) => {
  try {
    const { pagination, filter } = params;
    if (!pagination) {
      console.error(' пагинация обязательные');
      throw new Error('пагинация обязательные');
    }

    const { page, perPage } = pagination;

    const variables: GetAllOptionsWithValuesQueryVariables = {
      pagination: {
        page,
        perPage,
      },
    };
    const { data } = await client.query<GetAllOptionsWithValuesQuery>({
      query: GetAllOptionsWithValuesDocument,
      variables,
    });

    if (!data || !data.getAllOptionsWithValues) {
      throw new Error('Ошибка получения опций');
    }

    return {
      data: data.getAllOptionsWithValues.options,
      total: data.getAllOptionsWithValues.total,
    };
  } catch (error) {
    console.error('Ошибка получения опций:', error);
    throw error;
  }
};

export const getOneOption = async (params) => {
  try {
    const variables: GetOptionByIdQueryVariables = {
      id: params.id,
    };
    const { data } = await client.mutate<GetOptionByIdQuery>({
      mutation: GetOptionByIdDocument,
      variables,
    });

    if (!data) {
      throw new Error('Ошибка получения опции');
    }
    return {
      data: data.getOptionById,
    };
  } catch (error) {
    console.error('Ошибка получения опции:', error);
    throw error;
  }
};

export const createOption = async (params) => {
  try {
    const variables: CreateOptionMutationVariables = {
      createOptionInput: {
        name: params.data.name,
        type: params.data.type,
        sortOrder: params.data.sortOrder ?? 0,
        values: params.data.values.map((value) => ({
          name: value.name,
          colorCode: value.colorCode,
          sortOrder: value.sortOrder,
        })),
      },
    };

    const { data } = await client.mutate<CreateOptionMutation>({
      mutation: CreateOptionDocument,
      variables,
    });

    return { data: data?.createOption };
  } catch (error) {
    console.error('Ошибка создания опции:', error);
    throw error;
  }
};

export const deleteOption = async (params) => {
  try {
    const variables: DeleteOptionMutationVariables = {
      optionId: params.id,
    };
    await client.mutate<DeleteOptionMutation>({
      mutation: DeleteOptionDocument,
      variables,
    });
    return { data: { id: params.id } };
  } catch (error) {
    console.error('Delete option Error:', error);
    throw error;
  }
};

export const updateOptionValues = async (params) => {
  try {
    const variables: UpdateOptionValuesMutationVariables = {
      updateOptionValuesInput: {
        optionId: params.id,
        values: params.data.values.map((value) => {
          const valueObject: any = {
            name: value.name,
            sortOrder: value.sortOrder,
            colorCode: value.colorCode,
          };
          if (value.id) {
            valueObject.id = value.id;
          }
          return valueObject;
        }),
      },
    };
    const { data } = await client.mutate<UpdateOptionValuesMutation>({
      mutation: UpdateOptionValuesDocument,
      variables,
    });
    return { data: data?.updateOptionValues };
  } catch (error) {
    console.error('Ошибка изменения заничений опции:', error);
    throw error;
  }
};
