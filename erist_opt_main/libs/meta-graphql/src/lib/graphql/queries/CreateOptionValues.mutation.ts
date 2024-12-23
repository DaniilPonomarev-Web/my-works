import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateOptionValuesMutationVariables = Types.Exact<{
  createOptionValueForOptionInput: Types.CreateOptionValueForOptionInput;
}>;


export type CreateOptionValuesMutation = { __typename?: 'Mutation', createOptionValues: Array<{ __typename?: 'OptionValueDTO', id: string, name: string, sortOrder: number, colorCode?: string | null }> };


export const CreateOptionValuesDocument = gql`
    mutation CreateOptionValues($createOptionValueForOptionInput: CreateOptionValueForOptionInput!) {
  createOptionValues(
    createOptionValueForOptionInput: $createOptionValueForOptionInput
  ) {
    id
    name
    sortOrder
    colorCode
  }
}
    `;
export type CreateOptionValuesMutationFn = Apollo.MutationFunction<CreateOptionValuesMutation, CreateOptionValuesMutationVariables>;

/**
 * __useCreateOptionValuesMutation__
 *
 * To run a mutation, you first call `useCreateOptionValuesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOptionValuesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOptionValuesMutation, { data, loading, error }] = useCreateOptionValuesMutation({
 *   variables: {
 *      createOptionValueForOptionInput: // value for 'createOptionValueForOptionInput'
 *   },
 * });
 */
export function useCreateOptionValuesMutation(baseOptions?: Apollo.MutationHookOptions<CreateOptionValuesMutation, CreateOptionValuesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOptionValuesMutation, CreateOptionValuesMutationVariables>(CreateOptionValuesDocument, options);
      }
export type CreateOptionValuesMutationHookResult = ReturnType<typeof useCreateOptionValuesMutation>;
export type CreateOptionValuesMutationResult = Apollo.MutationResult<CreateOptionValuesMutation>;
export type CreateOptionValuesMutationOptions = Apollo.BaseMutationOptions<CreateOptionValuesMutation, CreateOptionValuesMutationVariables>;