import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateMainPageBlockMutationVariables = Types.Exact<{
  input: Types.CreateMainPageBlockInputDto;
}>;


export type CreateMainPageBlockMutation = { __typename?: 'Mutation', createMainPageBlock: { __typename?: 'MainPageBlockDTO', id: string, name?: string | null, title?: string | null, link?: string | null, status: boolean, sort: number, products: Array<{ __typename?: 'ProductDTO', id: string, model: string, price: number, quantity: number, maincategory: string, categories: Array<string>, status: boolean, sortOrder: number, description: { __typename?: 'ProductDescriptionDTO', name: string, description?: string | null, tag?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null }, images?: Array<{ __typename?: 'ProductImageDTO', id: string, image?: string | null, sortOrder: number }> | null }> } };


export const CreateMainPageBlockDocument = gql`
    mutation createMainPageBlock($input: CreateMainPageBlockInputDTO!) {
  createMainPageBlock(createMainPageBlockInput: $input) {
    id
    name
    title
    link
    status
    sort
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
export type CreateMainPageBlockMutationFn = Apollo.MutationFunction<CreateMainPageBlockMutation, CreateMainPageBlockMutationVariables>;

/**
 * __useCreateMainPageBlockMutation__
 *
 * To run a mutation, you first call `useCreateMainPageBlockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMainPageBlockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMainPageBlockMutation, { data, loading, error }] = useCreateMainPageBlockMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMainPageBlockMutation(baseOptions?: Apollo.MutationHookOptions<CreateMainPageBlockMutation, CreateMainPageBlockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMainPageBlockMutation, CreateMainPageBlockMutationVariables>(CreateMainPageBlockDocument, options);
      }
export type CreateMainPageBlockMutationHookResult = ReturnType<typeof useCreateMainPageBlockMutation>;
export type CreateMainPageBlockMutationResult = Apollo.MutationResult<CreateMainPageBlockMutation>;
export type CreateMainPageBlockMutationOptions = Apollo.BaseMutationOptions<CreateMainPageBlockMutation, CreateMainPageBlockMutationVariables>;