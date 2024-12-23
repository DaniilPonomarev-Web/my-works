import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteOptionValueMutationVariables = Types.Exact<{
  optionValueId: Types.Scalars['ID'];
}>;


export type DeleteOptionValueMutation = { __typename?: 'Mutation', deleteOptionValue: boolean };


export const DeleteOptionValueDocument = gql`
    mutation DeleteOptionValue($optionValueId: ID!) {
  deleteOptionValue(optionValueId: $optionValueId)
}
    `;
export type DeleteOptionValueMutationFn = Apollo.MutationFunction<DeleteOptionValueMutation, DeleteOptionValueMutationVariables>;

/**
 * __useDeleteOptionValueMutation__
 *
 * To run a mutation, you first call `useDeleteOptionValueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOptionValueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOptionValueMutation, { data, loading, error }] = useDeleteOptionValueMutation({
 *   variables: {
 *      optionValueId: // value for 'optionValueId'
 *   },
 * });
 */
export function useDeleteOptionValueMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOptionValueMutation, DeleteOptionValueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOptionValueMutation, DeleteOptionValueMutationVariables>(DeleteOptionValueDocument, options);
      }
export type DeleteOptionValueMutationHookResult = ReturnType<typeof useDeleteOptionValueMutation>;
export type DeleteOptionValueMutationResult = Apollo.MutationResult<DeleteOptionValueMutation>;
export type DeleteOptionValueMutationOptions = Apollo.BaseMutationOptions<DeleteOptionValueMutation, DeleteOptionValueMutationVariables>;