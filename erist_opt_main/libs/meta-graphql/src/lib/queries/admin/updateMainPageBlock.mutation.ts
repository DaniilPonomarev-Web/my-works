import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateMainPageBlockMutationVariables = Types.Exact<{
  updateMainPageBlockInput: Types.UpdateMainPageBlockInputDto;
}>;


export type UpdateMainPageBlockMutation = { __typename?: 'Mutation', updateMainPageBlock: { __typename?: 'MainPageBlockDTO', id: string, name?: string | null, title?: string | null, link?: string | null, status: boolean, products: Array<{ __typename?: 'ProductDTO', id: string, model: string, price: number, quantity: number, maincategory: string, categories: Array<string>, status: boolean, sortOrder: number, description: { __typename?: 'ProductDescriptionDTO', name: string, description?: string | null, tag?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null }, images?: Array<{ __typename?: 'ProductImageDTO', id: string, image?: string | null, sortOrder: number }> | null }> } };


export const UpdateMainPageBlockDocument = gql`
    mutation UpdateMainPageBlock($updateMainPageBlockInput: UpdateMainPageBlockInputDTO!) {
  updateMainPageBlock(updateMainPageBlockInput: $updateMainPageBlockInput) {
    id
    name
    title
    link
    status
    products {
      id
      model
      price
      quantity
      maincategory
      categories
      status
      sortOrder
      description {
        name
        description
        tag
        meta_title
        meta_h1
        meta_description
      }
      images {
        id
        image
        sortOrder
      }
    }
  }
}
    `;
export type UpdateMainPageBlockMutationFn = Apollo.MutationFunction<UpdateMainPageBlockMutation, UpdateMainPageBlockMutationVariables>;

/**
 * __useUpdateMainPageBlockMutation__
 *
 * To run a mutation, you first call `useUpdateMainPageBlockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMainPageBlockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMainPageBlockMutation, { data, loading, error }] = useUpdateMainPageBlockMutation({
 *   variables: {
 *      updateMainPageBlockInput: // value for 'updateMainPageBlockInput'
 *   },
 * });
 */
export function useUpdateMainPageBlockMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMainPageBlockMutation, UpdateMainPageBlockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMainPageBlockMutation, UpdateMainPageBlockMutationVariables>(UpdateMainPageBlockDocument, options);
      }
export type UpdateMainPageBlockMutationHookResult = ReturnType<typeof useUpdateMainPageBlockMutation>;
export type UpdateMainPageBlockMutationResult = Apollo.MutationResult<UpdateMainPageBlockMutation>;
export type UpdateMainPageBlockMutationOptions = Apollo.BaseMutationOptions<UpdateMainPageBlockMutation, UpdateMainPageBlockMutationVariables>;