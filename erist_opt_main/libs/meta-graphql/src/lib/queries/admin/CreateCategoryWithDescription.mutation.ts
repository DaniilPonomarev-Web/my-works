import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateCategoryWithDescriptionMutationVariables = Types.Exact<{
  input: Types.CreateCategoryWithDescriptionDto;
}>;


export type CreateCategoryWithDescriptionMutation = { __typename?: 'Mutation', createCategoryWithDescription: { __typename?: 'CategoryDTO', id: string, image?: string | null, parent_id?: string | null, sort_order: number, status: boolean, descriptions?: Array<{ __typename?: 'CategoryDescriptionDTO', id: string, name: string, description?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null, meta_keyword?: string | null }> | null, children?: Array<{ __typename?: 'CategoryDTO', id: string, image?: string | null, parent_id?: string | null, sort_order: number, status: boolean, descriptions?: Array<{ __typename?: 'CategoryDescriptionDTO', id: string, name: string, description?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null, meta_keyword?: string | null }> | null }> | null } };


export const CreateCategoryWithDescriptionDocument = gql`
    mutation CreateCategoryWithDescription($input: CreateCategoryWithDescriptionDTO!) {
  createCategoryWithDescription(createCategoryWithDescriptionInput: $input) {
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
export type CreateCategoryWithDescriptionMutationFn = Apollo.MutationFunction<CreateCategoryWithDescriptionMutation, CreateCategoryWithDescriptionMutationVariables>;

/**
 * __useCreateCategoryWithDescriptionMutation__
 *
 * To run a mutation, you first call `useCreateCategoryWithDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryWithDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryWithDescriptionMutation, { data, loading, error }] = useCreateCategoryWithDescriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCategoryWithDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryWithDescriptionMutation, CreateCategoryWithDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryWithDescriptionMutation, CreateCategoryWithDescriptionMutationVariables>(CreateCategoryWithDescriptionDocument, options);
      }
export type CreateCategoryWithDescriptionMutationHookResult = ReturnType<typeof useCreateCategoryWithDescriptionMutation>;
export type CreateCategoryWithDescriptionMutationResult = Apollo.MutationResult<CreateCategoryWithDescriptionMutation>;
export type CreateCategoryWithDescriptionMutationOptions = Apollo.BaseMutationOptions<CreateCategoryWithDescriptionMutation, CreateCategoryWithDescriptionMutationVariables>;