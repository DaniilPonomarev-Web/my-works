import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOrderByIdMutationVariables = Types.Exact<{
  orderId: Types.Scalars['ID'];
}>;


export type GetOrderByIdMutation = { __typename?: 'Mutation', getOrderById: { __typename?: 'OrderWithProductsDTO', id: string, currentID: number, userCompany_inn: string, userCompany_ogrn: string, userCompany_kpp?: string | null, userCompany_name: string, userCompany_bikBank: string, userCompany_bankName: string, userCompany_urAddress: string, userCompany_checkingAccount: string, userCompany_correspondentAccount: string, paymentMethod: string, totalAmount: number, discount?: number | null, total: number, state: string, hrefForInvoice?: string | null, products: Array<{ __typename?: 'OrderProductDTO', id: string, model: string, price: number, name: string, image?: string | null, optionName?: string | null, quantity?: number | null }> } };


export const GetOrderByIdDocument = gql`
    mutation GetOrderById($orderId: ID!) {
  getOrderById(orderId: $orderId) {
    id
    currentID
    userCompany_inn
    userCompany_ogrn
    userCompany_kpp
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
  }
}
    `;
export type GetOrderByIdMutationFn = Apollo.MutationFunction<GetOrderByIdMutation, GetOrderByIdMutationVariables>;

/**
 * __useGetOrderByIdMutation__
 *
 * To run a mutation, you first call `useGetOrderByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetOrderByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getOrderByIdMutation, { data, loading, error }] = useGetOrderByIdMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGetOrderByIdMutation(baseOptions?: Apollo.MutationHookOptions<GetOrderByIdMutation, GetOrderByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetOrderByIdMutation, GetOrderByIdMutationVariables>(GetOrderByIdDocument, options);
      }
export type GetOrderByIdMutationHookResult = ReturnType<typeof useGetOrderByIdMutation>;
export type GetOrderByIdMutationResult = Apollo.MutationResult<GetOrderByIdMutation>;
export type GetOrderByIdMutationOptions = Apollo.BaseMutationOptions<GetOrderByIdMutation, GetOrderByIdMutationVariables>;