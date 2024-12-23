import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateFeedbackStatusMutationVariables = Types.Exact<{
  input: Types.FeedBackIdInput;
}>;


export type UpdateFeedbackStatusMutation = { __typename?: 'Mutation', updateFeedbackStatus: { __typename?: 'FeedBackDto', id: string, text: string, status: boolean, user: { __typename?: 'UserDTO', id: string, name: string } } };


export const UpdateFeedbackStatusDocument = gql`
    mutation UpdateFeedbackStatus($input: FeedBackIdInput!) {
  updateFeedbackStatus(input: $input) {
    id
    text
    status
    user {
      id
      name
    }
  }
}
    `;
export type UpdateFeedbackStatusMutationFn = Apollo.MutationFunction<UpdateFeedbackStatusMutation, UpdateFeedbackStatusMutationVariables>;

/**
 * __useUpdateFeedbackStatusMutation__
 *
 * To run a mutation, you first call `useUpdateFeedbackStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFeedbackStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFeedbackStatusMutation, { data, loading, error }] = useUpdateFeedbackStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFeedbackStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFeedbackStatusMutation, UpdateFeedbackStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFeedbackStatusMutation, UpdateFeedbackStatusMutationVariables>(UpdateFeedbackStatusDocument, options);
      }
export type UpdateFeedbackStatusMutationHookResult = ReturnType<typeof useUpdateFeedbackStatusMutation>;
export type UpdateFeedbackStatusMutationResult = Apollo.MutationResult<UpdateFeedbackStatusMutation>;
export type UpdateFeedbackStatusMutationOptions = Apollo.BaseMutationOptions<UpdateFeedbackStatusMutation, UpdateFeedbackStatusMutationVariables>;