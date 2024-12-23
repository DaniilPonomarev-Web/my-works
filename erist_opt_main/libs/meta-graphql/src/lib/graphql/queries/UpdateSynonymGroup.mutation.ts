import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateSynonymGroupMutationVariables = Types.Exact<{
  updateSynonymGroupDto: Types.UpdateSynonymGroupDto;
}>;


export type UpdateSynonymGroupMutation = { __typename?: 'Mutation', updateSynonymGroup: { __typename?: 'SynonymGroupDto', id: string, synonyms: string } };


export const UpdateSynonymGroupDocument = gql`
    mutation UpdateSynonymGroup($updateSynonymGroupDto: UpdateSynonymGroupDto!) {
  updateSynonymGroup(updateSynonymGroupDto: $updateSynonymGroupDto) {
    id
    synonyms
  }
}
    `;
export type UpdateSynonymGroupMutationFn = Apollo.MutationFunction<UpdateSynonymGroupMutation, UpdateSynonymGroupMutationVariables>;

/**
 * __useUpdateSynonymGroupMutation__
 *
 * To run a mutation, you first call `useUpdateSynonymGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSynonymGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSynonymGroupMutation, { data, loading, error }] = useUpdateSynonymGroupMutation({
 *   variables: {
 *      updateSynonymGroupDto: // value for 'updateSynonymGroupDto'
 *   },
 * });
 */
export function useUpdateSynonymGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSynonymGroupMutation, UpdateSynonymGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSynonymGroupMutation, UpdateSynonymGroupMutationVariables>(UpdateSynonymGroupDocument, options);
      }
export type UpdateSynonymGroupMutationHookResult = ReturnType<typeof useUpdateSynonymGroupMutation>;
export type UpdateSynonymGroupMutationResult = Apollo.MutationResult<UpdateSynonymGroupMutation>;
export type UpdateSynonymGroupMutationOptions = Apollo.BaseMutationOptions<UpdateSynonymGroupMutation, UpdateSynonymGroupMutationVariables>;