import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateOptionMutationVariables = Types.Exact<{
  createOptionInput: Types.CreateOptionInput;
}>;


export type CreateOptionMutation = { __typename?: 'Mutation', createOption: { __typename?: 'OptionDTO', id: string, name: string, type: string, sortOrder: number, values: Array<{ __typename?: 'OptionValueDTO', id: string, name: string, sortOrder: number }> } };


export const CreateOptionDocument = gql`
    mutation CreateOption($createOptionInput: CreateOptionInput!) {
  createOption(createOptionInput: $createOptionInput) {
    id
    name
    type
    sortOrder
    values {
      id
      name
      sortOrder
    }
  }
}
    `;
export type CreateOptionMutationFn = Apollo.MutationFunction<CreateOptionMutation, CreateOptionMutationVariables>;

/**
 * __useCreateOptionMutation__
 *
 * To run a mutation, you first call `useCreateOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOptionMutation, { data, loading, error }] = useCreateOptionMutation({
 *   variables: {
 *      createOptionInput: // value for 'createOptionInput'
 *   },
 * });
 */
export function useCreateOptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateOptionMutation, CreateOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOptionMutation, CreateOptionMutationVariables>(CreateOptionDocument, options);
      }
export type CreateOptionMutationHookResult = ReturnType<typeof useCreateOptionMutation>;
export type CreateOptionMutationResult = Apollo.MutationResult<CreateOptionMutation>;
export type CreateOptionMutationOptions = Apollo.BaseMutationOptions<CreateOptionMutation, CreateOptionMutationVariables>;