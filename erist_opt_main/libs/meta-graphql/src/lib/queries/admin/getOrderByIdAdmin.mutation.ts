import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOrderByIdAdminMutationVariables = Types.Exact<{
  orderId: Types.Scalars['ID'];
}>;


export type GetOrderByIdAdminMutation = { __typename?: 'Mutation', getOrderByIdAdmin: { __typename?: 'OrderWithProductsDTO', id: string, currentID: number, userCompany_inn: string, userCompany_kpp?: string | null, userCompany_name: string, userCompany_ogrn: string, userCompany_bikBank: string, userCompany_bankName: string, userCompany_urAddress: string, userCompany_checkingAccount: string, userCompany_correspondentAccount: string, paymentMethod: string, totalAmount: number, discount?: number | null, total: number, state: string, hrefForInvoice?: string | null, registred: string, products: Array<{ __typename?: 'OrderProductDTO', id: string, model: string, price: number, name: string, image?: string | null, optionName?: string | null, quantity?: number | null }> } };


export const GetOrderByIdAdminDocument = gql`
    mutation getOrderByIdAdmin($orderId: ID!) {
  getOrderByIdAdmin(orderId: $orderId) {
    id
    currentID
    userCompany_inn
    userCompany_kpp
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
}
    `;
export type GetOrderByIdAdminMutationFn = Apollo.MutationFunction<GetOrderByIdAdminMutation, GetOrderByIdAdminMutationVariables>;

/**
 * __useGetOrderByIdAdminMutation__
 *
 * To run a mutation, you first call `useGetOrderByIdAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetOrderByIdAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getOrderByIdAdminMutation, { data, loading, error }] = useGetOrderByIdAdminMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGetOrderByIdAdminMutation(baseOptions?: Apollo.MutationHookOptions<GetOrderByIdAdminMutation, GetOrderByIdAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetOrderByIdAdminMutation, GetOrderByIdAdminMutationVariables>(GetOrderByIdAdminDocument, options);
      }
export type GetOrderByIdAdminMutationHookResult = ReturnType<typeof useGetOrderByIdAdminMutation>;
export type GetOrderByIdAdminMutationResult = Apollo.MutationResult<GetOrderByIdAdminMutation>;
export type GetOrderByIdAdminMutationOptions = Apollo.BaseMutationOptions<GetOrderByIdAdminMutation, GetOrderByIdAdminMutationVariables>;