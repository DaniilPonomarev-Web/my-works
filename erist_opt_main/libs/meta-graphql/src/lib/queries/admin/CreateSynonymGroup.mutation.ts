import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateSynonymGroupMutationVariables = Types.Exact<{
  createSynonymGroupDto: Types.CreateSynonymGroupDto;
}>;


export type CreateSynonymGroupMutation = { __typename?: 'Mutation', createSynonymGroup: { __typename?: 'SynonymGroupDto', id: string, synonyms: string } };


export const CreateSynonymGroupDocument = gql`
    mutation CreateSynonymGroup($createSynonymGroupDto: CreateSynonymGroupDto!) {
  createSynonymGroup(createSynonymGroupDto: $createSynonymGroupDto) {
    id
    synonyms
  }
}
    `;
export type CreateSynonymGroupMutationFn = Apollo.MutationFunction<CreateSynonymGroupMutation, CreateSynonymGroupMutationVariables>;

/**
 * __useCreateSynonymGroupMutation__
 *
 * To run a mutation, you first call `useCreateSynonymGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSynonymGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSynonymGroupMutation, { data, loading, error }] = useCreateSynonymGroupMutation({
 *   variables: {
 *      createSynonymGroupDto: // value for 'createSynonymGroupDto'
 *   },
 * });
 */
export function useCreateSynonymGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateSynonymGroupMutation, CreateSynonymGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSynonymGroupMutation, CreateSynonymGroupMutationVariables>(CreateSynonymGroupDocument, options);
      }
export type CreateSynonymGroupMutationHookResult = ReturnType<typeof useCreateSynonymGroupMutation>;
export type CreateSynonymGroupMutationResult = Apollo.MutationResult<CreateSynonymGroupMutation>;
export type CreateSynonymGroupMutationOptions = Apollo.BaseMutationOptions<CreateSynonymGroupMutation, CreateSynonymGroupMutationVariables>;