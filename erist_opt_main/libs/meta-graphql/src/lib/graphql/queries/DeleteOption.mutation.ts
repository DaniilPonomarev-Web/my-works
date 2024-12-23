import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteOptionMutationVariables = Types.Exact<{
  optionId: Types.Scalars['ID'];
}>;


export type DeleteOptionMutation = { __typename?: 'Mutation', deleteOption: boolean };


export const DeleteOptionDocument = gql`
    mutation DeleteOption($optionId: ID!) {
  deleteOption(optionId: $optionId)
}
    `;
export type DeleteOptionMutationFn = Apollo.MutationFunction<DeleteOptionMutation, DeleteOptionMutationVariables>;

/**
 * __useDeleteOptionMutation__
 *
 * To run a mutation, you first call `useDeleteOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOptionMutation, { data, loading, error }] = useDeleteOptionMutation({
 *   variables: {
 *      optionId: // value for 'optionId'
 *   },
 * });
 */
export function useDeleteOptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOptionMutation, DeleteOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOptionMutation, DeleteOptionMutationVariables>(DeleteOptionDocument, options);
      }
export type DeleteOptionMutationHookResult = ReturnType<typeof useDeleteOptionMutation>;
export type DeleteOptionMutationResult = Apollo.MutationResult<DeleteOptionMutation>;
export type DeleteOptionMutationOptions = Apollo.BaseMutationOptions<DeleteOptionMutation, DeleteOptionMutationVariables>;