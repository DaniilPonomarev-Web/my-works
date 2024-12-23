import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateBannerMutationVariables = Types.Exact<{
  createBannerInput: Types.CreateBannerInputDto;
}>;


export type CreateBannerMutation = { __typename?: 'Mutation', createBanner: { __typename?: 'BannerDTO', id: string, name: string, status: boolean, title?: string | null, link?: string | null, image: string, image_mob: string, image_href: string, image_mob_href: string } };


export const CreateBannerDocument = gql`
    mutation CreateBanner($createBannerInput: CreateBannerInputDTO!) {
  createBanner(createBannerInput: $createBannerInput) {
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
export type CreateBannerMutationFn = Apollo.MutationFunction<CreateBannerMutation, CreateBannerMutationVariables>;

/**
 * __useCreateBannerMutation__
 *
 * To run a mutation, you first call `useCreateBannerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBannerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBannerMutation, { data, loading, error }] = useCreateBannerMutation({
 *   variables: {
 *      createBannerInput: // value for 'createBannerInput'
 *   },
 * });
 */
export function useCreateBannerMutation(baseOptions?: Apollo.MutationHookOptions<CreateBannerMutation, CreateBannerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBannerMutation, CreateBannerMutationVariables>(CreateBannerDocument, options);
      }
export type CreateBannerMutationHookResult = ReturnType<typeof useCreateBannerMutation>;
export type CreateBannerMutationResult = Apollo.MutationResult<CreateBannerMutation>;
export type CreateBannerMutationOptions = Apollo.BaseMutationOptions<CreateBannerMutation, CreateBannerMutationVariables>;