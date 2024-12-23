import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOrdersUsersMutationVariables = Types.Exact<{
  sortBy?: Types.InputMaybe<Types.Scalars['String']>;
  sortOrder?: Types.InputMaybe<Types.Scalars['String']>;
  offset?: Types.InputMaybe<Types.Scalars['Float']>;
  limit?: Types.InputMaybe<Types.Scalars['Float']>;
  filter: Types.OrdersFilterDto;
}>;


export type GetOrdersUsersMutation = { __typename?: 'Mutation', getOrdersUsers: { __typename?: 'OrderListDTO', total: number, orders: Array<{ __typename?: 'OrderWithProductsDTO', id: string, currentID: number, userCompany_inn: string, userCompany_kpp?: string | null, userCompany_ogrn: string, userCompany_name: string, userCompany_bikBank: string, userCompany_bankName: string, userCompany_urAddress: string, userCompany_checkingAccount: string, userCompany_correspondentAccount: string, paymentMethod: string, totalAmount: number, discount?: number | null, total: number, state: string, hrefForInvoice?: string | null, registred: string, products: Array<{ __typename?: 'OrderProductDTO', id: string, model: string, price: number, name: string, image?: string | null, optionName?: string | null, quantity?: number | null }> }> } };


export const GetOrdersUsersDocument = gql`
    mutation getOrdersUsers($sortBy: String, $sortOrder: String, $offset: Float, $limit: Float, $filter: OrdersFilterDTO!) {
  getOrdersUsers(
    sortBy: $sortBy
    sortOrder: $sortOrder
    offset: $offset
    limit: $limit
    filter: $filter
  ) {
    orders {
      id
      currentID
      userCompany_inn
      userCompany_kpp
      userCompany_ogrn
      userCompany_name
      userCompany_ogrn
      userCompany_bikBank
      userCompany_bankName
      userCompany_urAddress
      userCompany_checkingAccount
      userCompany_correspondentAccount
      paymentMethod
      products {
        id
        model
        price
        name
        image
        optionName
        quantity
      }
      totalAmount
      discount
      total
      state
      hrefForInvoice
      registred
    }
    total
  }
}
    `;
export type GetOrdersUsersMutationFn = Apollo.MutationFunction<GetOrdersUsersMutation, GetOrdersUsersMutationVariables>;

/**
 * __useGetOrdersUsersMutation__
 *
 * To run a mutation, you first call `useGetOrdersUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getOrdersUsersMutation, { data, loading, error }] = useGetOrdersUsersMutation({
 *   variables: {
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetOrdersUsersMutation(baseOptions?: Apollo.MutationHookOptions<GetOrdersUsersMutation, GetOrdersUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetOrdersUsersMutation, GetOrdersUsersMutationVariables>(GetOrdersUsersDocument, options);
      }
export type GetOrdersUsersMutationHookResult = ReturnType<typeof useGetOrdersUsersMutation>;
export type GetOrdersUsersMutationResult = Apollo.MutationResult<GetOrdersUsersMutation>;
export type GetOrdersUsersMutationOptions = Apollo.BaseMutationOptions<GetOrdersUsersMutation, GetOrdersUsersMutationVariables>;