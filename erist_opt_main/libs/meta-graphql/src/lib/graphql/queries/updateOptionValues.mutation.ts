import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOptionValuesMutationVariables = Types.Exact<{
  updateOptionValuesInput: Types.UpdateOptionValueForOptionInput;
}>;


export type UpdateOptionValuesMutation = { __typename?: 'Mutation', updateOptionValues: { __typename?: 'OptionDTO', id: string, name: string, type: string, sortOrder: number, values: Array<{ __typename?: 'OptionValueDTO', id: string, name: string, sortOrder: number }> } };


export const UpdateOptionValuesDocument = gql`
    mutation UpdateOptionValues($updateOptionValuesInput: UpdateOptionValueForOptionInput!) {
  updateOptionValues(updateOptionValuesInput: $updateOptionValuesInput) {
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
export type UpdateOptionValuesMutationFn = Apollo.MutationFunction<UpdateOptionValuesMutation, UpdateOptionValuesMutationVariables>;

/**
 * __useUpdateOptionValuesMutation__
 *
 * To run a mutation, you first call `useUpdateOptionValuesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOptionValuesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOptionValuesMutation, { data, loading, error }] = useUpdateOptionValuesMutation({
 *   variables: {
 *      updateOptionValuesInput: // value for 'updateOptionValuesInput'
 *   },
 * });
 */
export function useUpdateOptionValuesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOptionValuesMutation, UpdateOptionValuesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOptionValuesMutation, UpdateOptionValuesMutationVariables>(UpdateOptionValuesDocument, options);
      }
export type UpdateOptionValuesMutationHookResult = ReturnType<typeof useUpdateOptionValuesMutation>;
export type UpdateOptionValuesMutationResult = Apollo.MutationResult<UpdateOptionValuesMutation>;
export type UpdateOptionValuesMutationOptions = Apollo.BaseMutationOptions<UpdateOptionValuesMutation, UpdateOptionValuesMutationVariables>;