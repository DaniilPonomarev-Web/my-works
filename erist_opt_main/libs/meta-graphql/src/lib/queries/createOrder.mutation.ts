import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateOrderMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'OrderDTO', id: string, userCompany_inn: string, userCompany_kpp?: string | null, userCompany_name: string, userCompany_ogrn: string, userCompany_bikBank: string, userCompany_bankName: string, userCompany_urAddress: string, userCompany_checkingAccount: string, userCompany_correspondentAccount: string, paymentMethod: string, currentID: number, totalAmount: number, total: number, discount?: number | null, registred: string, hrefForInvoice?: string | null, user: { __typename?: 'UserDTOForOrder', name: string, id: string }, cart: Array<{ __typename?: 'CartInput', productId: string, quantity: number, optionValueId?: string | null }> } };


export const CreateOrderDocument = gql`
    mutation CreateOrder {
  createOrder {
    id
    user {
      name
      id
    }
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
    cart {
      productId
      quantity
      optionValueId
    }
    currentID
    totalAmount
    total
    discount
    registred
    hrefForInvoice
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;