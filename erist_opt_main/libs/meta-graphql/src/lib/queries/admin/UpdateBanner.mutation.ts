import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateBannerMutationVariables = Types.Exact<{
  updateBannerInput: Types.UpdateBannerInputDto;
}>;


export type UpdateBannerMutation = { __typename?: 'Mutation', updateBanner: { __typename?: 'BannerDTO', id: string, name: string, status: boolean, title?: string | null, link?: string | null, image: string, image_mob: string, image_href: string, image_mob_href: string } };


export const UpdateBannerDocument = gql`
    mutation UpdateBanner($updateBannerInput: UpdateBannerInputDTO!) {
  updateBanner(updateBannerInput: $updateBannerInput) {
    id
    name
    status
    title
    link
    image
    image_mob
    image_href
    image_mob_href
  }
}
    `;
export type UpdateBannerMutationFn = Apollo.MutationFunction<UpdateBannerMutation, UpdateBannerMutationVariables>;

/**
 * __useUpdateBannerMutation__
 *
 * To run a mutation, you first call `useUpdateBannerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBannerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBannerMutation, { data, loading, error }] = useUpdateBannerMutation({
 *   variables: {
 *      updateBannerInput: // value for 'updateBannerInput'
 *   },
 * });
 */
export function useUpdateBannerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBannerMutation, UpdateBannerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBannerMutation, UpdateBannerMutationVariables>(UpdateBannerDocument, options);
      }
export type UpdateBannerMutationHookResult = ReturnType<typeof useUpdateBannerMutation>;
export type UpdateBannerMutationResult = Apollo.MutationResult<UpdateBannerMutation>;
export type UpdateBannerMutationOptions = Apollo.BaseMutationOptions<UpdateBannerMutation, UpdateBannerMutationVariables>;