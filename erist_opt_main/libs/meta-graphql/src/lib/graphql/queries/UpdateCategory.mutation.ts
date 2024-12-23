import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCategoryMutationVariables = Types.Exact<{
  input: Types.UpdateCategoryDto;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'CategoryDTO', id: string, image?: string | null, parent_id?: string | null, sort_order: number, status: boolean, onHomePage: boolean, descriptions?: Array<{ __typename?: 'CategoryDescriptionDTO', id: string, name: string, description?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null, meta_keyword?: string | null }> | null, children?: Array<{ __typename?: 'CategoryDTO', id: string, image?: string | null, parent_id?: string | null, sort_order: number, status: boolean, descriptions?: Array<{ __typename?: 'CategoryDescriptionDTO', id: string, name: string, description?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null, meta_keyword?: string | null }> | null }> | null } };


export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($input: UpdateCategoryDTO!) {
  updateCategory(updateCategoryInput: $input) {
    id
    image
    parent_id
    sort_order
    status
    onHomePage
    descriptions {
      id
      name
      description
      meta_title
      meta_h1
      meta_description
      meta_keyword
    }
    children {
      id
      image
      parent_id
      sort_order
      status
      descriptions {
        id
        name
        description
        meta_title
        meta_h1
        meta_description
        meta_keyword
      }
    }
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;