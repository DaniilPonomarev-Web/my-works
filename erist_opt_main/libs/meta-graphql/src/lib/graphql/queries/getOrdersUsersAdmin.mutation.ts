import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOrdersUsersAdminMutationVariables = Types.Exact<{
  sortBy?: Types.InputMaybe<Types.Scalars['String']>;
  sortOrder?: Types.InputMaybe<Types.Scalars['String']>;
  pagination: Types.OrdersPaginationAdminDto;
  filter?: Types.InputMaybe<Types.OrdersFilterAdminDto>;
}>;


export type GetOrdersUsersAdminMutation = { __typename?: 'Mutation', getOrdersUsersAdmin: { __typename?: 'OrderListDTO', total: number, orders: Array<{ __typename?: 'OrderWithProductsDTO', id: string, currentID: number, userCompany_inn: string, userCompany_kpp?: string | null, userCompany_ogrn: string, userCompany_name: string, userCompany_bikBank: string, userCompany_bankName: string, userCompany_urAddress: string, userCompany_checkingAccount: string, userCompany_correspondentAccount: string, paymentMethod: string, totalAmount: number, discount?: number | null, total: number, state: string, hrefForInvoice?: string | null, registred: string, products: Array<{ __typename?: 'OrderProductDTO', id: string, model: string, price: number, name: string, image?: string | null, optionName?: string | null, quantity?: number | null }> }> } };


export const GetOrdersUsersAdminDocument = gql`
    mutation getOrdersUsersAdmin($sortBy: String, $sortOrder: String, $pagination: OrdersPaginationAdminDTO!, $filter: OrdersFilterAdminDTO) {
  getOrdersUsersAdmin(
    sortBy: $sortBy
    sortOrder: $sortOrder
    pagination: $pagination
    filter: $filter
  ) {
    orders {
      id
      currentID
      userCompany_inn
      userCompany_kpp
      userCompany_ogrn
      userCompany_name
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
export type GetOrdersUsersAdminMutationFn = Apollo.MutationFunction<GetOrdersUsersAdminMutation, GetOrdersUsersAdminMutationVariables>;

/**
 * __useGetOrdersUsersAdminMutation__
 *
 * To run a mutation, you first call `useGetOrdersUsersAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersUsersAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getOrdersUsersAdminMutation, { data, loading, error }] = useGetOrdersUsersAdminMutation({
 *   variables: {
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetOrdersUsersAdminMutation(baseOptions?: Apollo.MutationHookOptions<GetOrdersUsersAdminMutation, GetOrdersUsersAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetOrdersUsersAdminMutation, GetOrdersUsersAdminMutationVariables>(GetOrdersUsersAdminDocument, options);
      }
export type GetOrdersUsersAdminMutationHookResult = ReturnType<typeof useGetOrdersUsersAdminMutation>;
export type GetOrdersUsersAdminMutationResult = Apollo.MutationResult<GetOrdersUsersAdminMutation>;
export type GetOrdersUsersAdminMutationOptions = Apollo.BaseMutationOptions<GetOrdersUsersAdminMutation, GetOrdersUsersAdminMutationVariables>;