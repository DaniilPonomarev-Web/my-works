import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateSocialHrefMutationVariables = Types.Exact<{
  input: Types.CreateUpdateSocialHrefInputDto;
}>;


export type CreateSocialHrefMutation = { __typename?: 'Mutation', createSocialHref: { __typename?: 'SocialHrefDTO', id: string, name: string, href: string, sortOrder: number } };


export const CreateSocialHrefDocument = gql`
    mutation CreateSocialHref($input: CreateUpdateSocialHrefInputDTO!) {
  createSocialHref(input: $input) {
    id
    name
    href
    sortOrder
  }
}
    `;
export type CreateSocialHrefMutationFn = Apollo.MutationFunction<CreateSocialHrefMutation, CreateSocialHrefMutationVariables>;

/**
 * __useCreateSocialHrefMutation__
 *
 * To run a mutation, you first call `useCreateSocialHrefMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSocialHrefMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSocialHrefMutation, { data, loading, error }] = useCreateSocialHrefMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSocialHrefMutation(baseOptions?: Apollo.MutationHookOptions<CreateSocialHrefMutation, CreateSocialHrefMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSocialHrefMutation, CreateSocialHrefMutationVariables>(CreateSocialHrefDocument, options);
      }
export type CreateSocialHrefMutationHookResult = ReturnType<typeof useCreateSocialHrefMutation>;
export type CreateSocialHrefMutationResult = Apollo.MutationResult<CreateSocialHrefMutation>;
export type CreateSocialHrefMutationOptions = Apollo.BaseMutationOptions<CreateSocialHrefMutation, CreateSocialHrefMutationVariables>;