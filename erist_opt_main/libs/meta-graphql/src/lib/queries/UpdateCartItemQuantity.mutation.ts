import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCartItemQuantityMutationVariables = Types.Exact<{
  input: Types.UpdateCartItemQuantityInput;
}>;


export type UpdateCartItemQuantityMutation = { __typename?: 'Mutation', updateCartItemQuantity: { __typename?: 'ChangeCartItemDTO', status: boolean, quantity: number } };


export const UpdateCartItemQuantityDocument = gql`
    mutation UpdateCartItemQuantity($input: UpdateCartItemQuantityInput!) {
  updateCartItemQuantity(input: $input) {
    status
    quantity
  }
}
    `;
export type UpdateCartItemQuantityMutationFn = Apollo.MutationFunction<UpdateCartItemQuantityMutation, UpdateCartItemQuantityMutationVariables>;

/**
 * __useUpdateCartItemQuantityMutation__
 *
 * To run a mutation, you first call `useUpdateCartItemQuantityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartItemQuantityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartItemQuantityMutation, { data, loading, error }] = useUpdateCartItemQuantityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCartItemQuantityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCartItemQuantityMutation, UpdateCartItemQuantityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCartItemQuantityMutation, UpdateCartItemQuantityMutationVariables>(UpdateCartItemQuantityDocument, options);
      }
export type UpdateCartItemQuantityMutationHookResult = ReturnType<typeof useUpdateCartItemQuantityMutation>;
export type UpdateCartItemQuantityMutationResult = Apollo.MutationResult<UpdateCartItemQuantityMutation>;
export type UpdateCartItemQuantityMutationOptions = Apollo.BaseMutationOptions<UpdateCartItemQuantityMutation, UpdateCartItemQuantityMutationVariables>;