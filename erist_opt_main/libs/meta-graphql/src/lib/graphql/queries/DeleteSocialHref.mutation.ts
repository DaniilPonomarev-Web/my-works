import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteSocialHrefMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type DeleteSocialHrefMutation = { __typename?: 'Mutation', deleteSocialHref: boolean };


export const DeleteSocialHrefDocument = gql`
    mutation DeleteSocialHref($id: ID!) {
  deleteSocialHref(id: $id)
}
    `;
export type DeleteSocialHrefMutationFn = Apollo.MutationFunction<DeleteSocialHrefMutation, DeleteSocialHrefMutationVariables>;

/**
 * __useDeleteSocialHrefMutation__
 *
 * To run a mutation, you first call `useDeleteSocialHrefMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSocialHrefMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSocialHrefMutation, { data, loading, error }] = useDeleteSocialHrefMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSocialHrefMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSocialHrefMutation, DeleteSocialHrefMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSocialHrefMutation, DeleteSocialHrefMutationVariables>(DeleteSocialHrefDocument, options);
      }
export type DeleteSocialHrefMutationHookResult = ReturnType<typeof useDeleteSocialHrefMutation>;
export type DeleteSocialHrefMutationResult = Apollo.MutationResult<DeleteSocialHrefMutation>;
export type DeleteSocialHrefMutationOptions = Apollo.BaseMutationOptions<DeleteSocialHrefMutation, DeleteSocialHrefMutationVariables>;