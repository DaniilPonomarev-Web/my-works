import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOrderStatusMutationVariables = Types.Exact<{
  orderId: Types.Scalars['ID'];
  newState: Types.StateOrder;
}>;


export type UpdateOrderStatusMutation = { __typename?: 'Mutation', updateOrderStatus: { __typename?: 'OrderWithProductsDTO', id: string, currentID: number, userCompany_inn: string, userCompany_kpp?: string | null, userCompany_ogrn: string, userCompany_name: string, userCompany_bikBank: string, userCompany_bankName: string, userCompany_urAddress: string, userCompany_checkingAccount: string, userCompany_correspondentAccount: string, paymentMethod: string, totalAmount: number, discount?: number | null, total: number, state: string, hrefForInvoice?: string | null, registred: string, products: Array<{ __typename?: 'OrderProductDTO', id: string, model: string, price: number, name: string, image?: string | null, optionName?: string | null, quantity?: number | null }> } };


export const UpdateOrderStatusDocument = gql`
    mutation UpdateOrderStatus($orderId: ID!, $newState: StateOrder!) {
  updateOrderStatus(orderId: $orderId, newState: $newState) {
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
}
    `;
export type UpdateOrderStatusMutationFn = Apollo.MutationFunction<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>;

/**
 * __useUpdateOrderStatusMutation__
 *
 * To run a mutation, you first call `useUpdateOrderStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderStatusMutation, { data, loading, error }] = useUpdateOrderStatusMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      newState: // value for 'newState'
 *   },
 * });
 */
export function useUpdateOrderStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>(UpdateOrderStatusDocument, options);
      }
export type UpdateOrderStatusMutationHookResult = ReturnType<typeof useUpdateOrderStatusMutation>;
export type UpdateOrderStatusMutationResult = Apollo.MutationResult<UpdateOrderStatusMutation>;
export type UpdateOrderStatusMutationOptions = Apollo.BaseMutationOptions<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>;