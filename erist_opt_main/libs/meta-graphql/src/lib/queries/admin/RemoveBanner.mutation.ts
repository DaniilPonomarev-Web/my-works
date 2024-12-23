import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveBannerMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type RemoveBannerMutation = { __typename?: 'Mutation', removeBanner: Array<{ __typename?: 'BannerDTO', id: string, name: string, status: boolean, title?: string | null, link?: string | null, image: string, image_mob: string }> };


export const RemoveBannerDocument = gql`
    mutation RemoveBanner($id: ID!) {
  removeBanner(id: $id) {
    id
    name
    status
    title
    link
    image
    image_mob
  }
}
    `;
export type RemoveBannerMutationFn = Apollo.MutationFunction<RemoveBannerMutation, RemoveBannerMutationVariables>;

/**
 * __useRemoveBannerMutation__
 *
 * To run a mutation, you first call `useRemoveBannerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBannerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBannerMutation, { data, loading, error }] = useRemoveBannerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveBannerMutation(baseOptions?: Apollo.MutationHookOptions<RemoveBannerMutation, RemoveBannerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveBannerMutation, RemoveBannerMutationVariables>(RemoveBannerDocument, options);
      }
export type RemoveBannerMutationHookResult = ReturnType<typeof useRemoveBannerMutation>;
export type RemoveBannerMutationResult = Apollo.MutationResult<RemoveBannerMutation>;
export type RemoveBannerMutationOptions = Apollo.BaseMutationOptions<RemoveBannerMutation, RemoveBannerMutationVariables>;