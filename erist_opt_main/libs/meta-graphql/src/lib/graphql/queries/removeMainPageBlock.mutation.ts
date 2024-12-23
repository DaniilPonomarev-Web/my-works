import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveMainPageBlockMutationVariables = Types.Exact<{
  IdMainPageBlockInputDTO: Types.IdMainPageBlockInputDto;
}>;


export type RemoveMainPageBlockMutation = { __typename?: 'Mutation', removeMainPageBlock: Array<{ __typename?: 'MainPageBlockDTO', id: string, name?: string | null, title?: string | null }> };


export const RemoveMainPageBlockDocument = gql`
    mutation RemoveMainPageBlock($IdMainPageBlockInputDTO: IdMainPageBlockInputDTO!) {
  removeMainPageBlock(IdMainPageBlockInputDTO: $IdMainPageBlockInputDTO) {
    id
    name
    title
  }
}
    `;
export type RemoveMainPageBlockMutationFn = Apollo.MutationFunction<RemoveMainPageBlockMutation, RemoveMainPageBlockMutationVariables>;

/**
 * __useRemoveMainPageBlockMutation__
 *
 * To run a mutation, you first call `useRemoveMainPageBlockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMainPageBlockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMainPageBlockMutation, { data, loading, error }] = useRemoveMainPageBlockMutation({
 *   variables: {
 *      IdMainPageBlockInputDTO: // value for 'IdMainPageBlockInputDTO'
 *   },
 * });
 */
export function useRemoveMainPageBlockMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMainPageBlockMutation, RemoveMainPageBlockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMainPageBlockMutation, RemoveMainPageBlockMutationVariables>(RemoveMainPageBlockDocument, options);
      }
export type RemoveMainPageBlockMutationHookResult = ReturnType<typeof useRemoveMainPageBlockMutation>;
export type RemoveMainPageBlockMutationResult = Apollo.MutationResult<RemoveMainPageBlockMutation>;
export type RemoveMainPageBlockMutationOptions = Apollo.BaseMutationOptions<RemoveMainPageBlockMutation, RemoveMainPageBlockMutationVariables>;