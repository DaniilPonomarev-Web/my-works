import {
  DeleteOrderDocument,
  DeleteOrderMutation,
  DeleteOrderMutationVariables,
  GetOrderByIdAdminDocument,
  GetOrderByIdAdminMutation,
  GetOrderByIdMutationVariables,
  GetOrdersUsersAdminDocument,
  UpdateOrderStatusDocument,
  UpdateOrderStatusMutation,
  UpdateOrderStatusMutationVariables,
} from '@erist-opt/meta-graphql';
import { convertDateFormat } from '../functions';
import client from '../apollo';

export const fetchOrders = async (params) => {
  try {
    const { sort, pagination, filter } = params;
    if (!sort || !pagination) {
      console.error('Сортировка и пагинация обязательные');
      throw new Error('Сортировка и пагинация обязательные');
    }

    const { field, order } = sort;
    const { page, perPage } = pagination;

    const variables = {
      sortBy: field,
      sortOrder: order.toLowerCase(),
      pagination: {
        page,
        perPage,
      },
      filter: {
        ...filter,
        orderNumber: filter.orderNumber
          ? parseFloat(filter.orderNumber)
          : undefined,
        totalAmountFrom: filter.totalAmountFrom
          ? parseFloat(filter.totalAmountFrom)
          : undefined,
        totalAmountTo: filter.totalAmountTo
          ? parseFloat(filter.totalAmountTo)
          : undefined,
        dateFrom: filter.dateFrom
          ? convertDateFormat(filter.dateFrom)
          : undefined,
        dateTo: filter.dateTo ? convertDateFormat(filter.dateTo) : undefined,
      },
    };

    const { data } = await client.mutate({
      mutation: GetOrdersUsersAdminDocument,
      variables,
    });

    if (!data || !data.getOrdersUsersAdmin) {
      throw new Error('Ошибка получения данных заказа');
    }

    return {
      data: data.getOrdersUsersAdmin.orders,
      total: data.getOrdersUsersAdmin.total,
    };
  } catch (error) {
    console.error('Ошибка получения заказов:', error);
    throw error;
  }
};

export const deleteOrder = async (params) => {
  try {
    const variables: DeleteOrderMutationVariables = {
      orderId: params.id,
    };
    const data = await client.mutate<DeleteOrderMutation>({
      mutation: DeleteOrderDocument,
      variables,
    });
    return { data: { id: params.id } };
  } catch (error) {
    console.error('Delete Error:', error);
    throw error;
  }
};

export const getOneOrder = async (params) => {
  try {
    const variables: GetOrderByIdMutationVariables = {
      orderId: params.id,
    };
    const { data } = await client.mutate<GetOrderByIdAdminMutation>({
      mutation: GetOrderByIdAdminDocument,
      variables,
    });

    if (!data) {
      throw new Error('Ошибка получения данных заказа');
    }
    return {
      data: data.getOrderByIdAdmin,
    };
  } catch (error) {
    console.error('Ошибка получения заказов:', error);
    throw error;
  }
};

export const updateOrderStatus = async (params) => {
  try {
    const variables: UpdateOrderStatusMutationVariables = {
      orderId: params.id,
      newState: params.state,
    };

    const { data } = await client.mutate<UpdateOrderStatusMutation>({
      mutation: UpdateOrderStatusDocument,
      variables,
    });
    return data?.updateOrderStatus;
  } catch (error) {
    console.error('Ошибка изменения статуса заказа:', error);
    throw error;
  }
};
