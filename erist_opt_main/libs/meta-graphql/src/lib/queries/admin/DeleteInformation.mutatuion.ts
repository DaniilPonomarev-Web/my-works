import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteInformationMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteInformationMutation = { __typename?: 'Mutation', deleteInformation: boolean };


export const DeleteInformationDocument = gql`
    mutation DeleteInformation($id: String!) {
  deleteInformation(id: $id)
}
    `;
export type DeleteInformationMutationFn = Apollo.MutationFunction<DeleteInformationMutation, DeleteInformationMutationVariables>;

/**
 * __useDeleteInformationMutation__
 *
 * To run a mutation, you first call `useDeleteInformationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInformationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInformationMutation, { data, loading, error }] = useDeleteInformationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteInformationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteInformationMutation, DeleteInformationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteInformationMutation, DeleteInformationMutationVariables>(DeleteInformationDocument, options);
      }
export type DeleteInformationMutationHookResult = ReturnType<typeof useDeleteInformationMutation>;
export type DeleteInformationMutationResult = Apollo.MutationResult<DeleteInformationMutation>;
export type DeleteInformationMutationOptions = Apollo.BaseMutationOptions<DeleteInformationMutation, DeleteInformationMutationVariables>;