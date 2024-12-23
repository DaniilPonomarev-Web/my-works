import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateInformationMutationVariables = Types.Exact<{
  data: Types.InputUpdateInformationDto;
}>;


export type UpdateInformationMutation = { __typename?: 'Mutation', updateInformation: { __typename?: 'InformationDTO', id: string, name: string, title: string, content: string, status: boolean } };


export const UpdateInformationDocument = gql`
    mutation UpdateInformation($data: InputUpdateInformationDTO!) {
  updateInformation(data: $data) {
    id
    name
    title
    content
    status
  }
}
    `;
export type UpdateInformationMutationFn = Apollo.MutationFunction<UpdateInformationMutation, UpdateInformationMutationVariables>;

/**
 * __useUpdateInformationMutation__
 *
 * To run a mutation, you first call `useUpdateInformationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInformationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInformationMutation, { data, loading, error }] = useUpdateInformationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateInformationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInformationMutation, UpdateInformationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInformationMutation, UpdateInformationMutationVariables>(UpdateInformationDocument, options);
      }
export type UpdateInformationMutationHookResult = ReturnType<typeof useUpdateInformationMutation>;
export type UpdateInformationMutationResult = Apollo.MutationResult<UpdateInformationMutation>;
export type UpdateInformationMutationOptions = Apollo.BaseMutationOptions<UpdateInformationMutation, UpdateInformationMutationVariables>;