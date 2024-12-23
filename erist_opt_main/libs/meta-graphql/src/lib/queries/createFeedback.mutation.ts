import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateFeedbackMutationVariables = Types.Exact<{
  input: Types.CreateFeedBackInput;
}>;


export type CreateFeedbackMutation = { __typename?: 'Mutation', createFeedback: { __typename?: 'FeedBackDto', id: string, text: string, status: boolean, user: { __typename?: 'UserDTO', id: string, name: string, phone: string, email: string, status: boolean, company: { __typename?: 'UserCompanyDTO', inn: string } } } };


export const CreateFeedbackDocument = gql`
    mutation CreateFeedback($input: CreateFeedBackInput!) {
  createFeedback(createFeedbackInput: $input) {
    id
    user {
      id
      name
      phone
      email
      company {
        inn
      }
      status
    }
    text
    status
  }
}
    `;
export type CreateFeedbackMutationFn = Apollo.MutationFunction<CreateFeedbackMutation, CreateFeedbackMutationVariables>;

/**
 * __useCreateFeedbackMutation__
 *
 * To run a mutation, you first call `useCreateFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFeedbackMutation, { data, loading, error }] = useCreateFeedbackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<CreateFeedbackMutation, CreateFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFeedbackMutation, CreateFeedbackMutationVariables>(CreateFeedbackDocument, options);
      }
export type CreateFeedbackMutationHookResult = ReturnType<typeof useCreateFeedbackMutation>;
export type CreateFeedbackMutationResult = Apollo.MutationResult<CreateFeedbackMutation>;
export type CreateFeedbackMutationOptions = Apollo.BaseMutationOptions<CreateFeedbackMutation, CreateFeedbackMutationVariables>;