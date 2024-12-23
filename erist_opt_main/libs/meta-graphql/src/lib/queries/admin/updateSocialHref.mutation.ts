import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateSocialHrefMutationVariables = Types.Exact<{
  input: Types.UpdateSocialHrefInputDto;
}>;


export type UpdateSocialHrefMutation = { __typename?: 'Mutation', updateSocialHref: { __typename?: 'SocialHrefDTO', id: string, name: string, href: string, sortOrder: number } };


export const UpdateSocialHrefDocument = gql`
    mutation updateSocialHref($input: UpdateSocialHrefInputDTO!) {
  updateSocialHref(input: $input) {
    id
    name
    href
    sortOrder
  }
}
    `;
export type UpdateSocialHrefMutationFn = Apollo.MutationFunction<UpdateSocialHrefMutation, UpdateSocialHrefMutationVariables>;

/**
 * __useUpdateSocialHrefMutation__
 *
 * To run a mutation, you first call `useUpdateSocialHrefMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSocialHrefMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSocialHrefMutation, { data, loading, error }] = useUpdateSocialHrefMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSocialHrefMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSocialHrefMutation, UpdateSocialHrefMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSocialHrefMutation, UpdateSocialHrefMutationVariables>(UpdateSocialHrefDocument, options);
      }
export type UpdateSocialHrefMutationHookResult = ReturnType<typeof useUpdateSocialHrefMutation>;
export type UpdateSocialHrefMutationResult = Apollo.MutationResult<UpdateSocialHrefMutation>;
export type UpdateSocialHrefMutationOptions = Apollo.BaseMutationOptions<UpdateSocialHrefMutation, UpdateSocialHrefMutationVariables>;