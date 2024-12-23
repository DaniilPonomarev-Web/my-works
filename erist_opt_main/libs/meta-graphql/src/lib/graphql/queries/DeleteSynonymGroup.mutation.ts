import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteSynonymGroupMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type DeleteSynonymGroupMutation = { __typename?: 'Mutation', deleteSynonymGroup: boolean };


export const DeleteSynonymGroupDocument = gql`
    mutation DeleteSynonymGroup($id: ID!) {
  deleteSynonymGroup(id: $id)
}
    `;
export type DeleteSynonymGroupMutationFn = Apollo.MutationFunction<DeleteSynonymGroupMutation, DeleteSynonymGroupMutationVariables>;

/**
 * __useDeleteSynonymGroupMutation__
 *
 * To run a mutation, you first call `useDeleteSynonymGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSynonymGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSynonymGroupMutation, { data, loading, error }] = useDeleteSynonymGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSynonymGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSynonymGroupMutation, DeleteSynonymGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSynonymGroupMutation, DeleteSynonymGroupMutationVariables>(DeleteSynonymGroupDocument, options);
      }
export type DeleteSynonymGroupMutationHookResult = ReturnType<typeof useDeleteSynonymGroupMutation>;
export type DeleteSynonymGroupMutationResult = Apollo.MutationResult<DeleteSynonymGroupMutation>;
export type DeleteSynonymGroupMutationOptions = Apollo.BaseMutationOptions<DeleteSynonymGroupMutation, DeleteSynonymGroupMutationVariables>;