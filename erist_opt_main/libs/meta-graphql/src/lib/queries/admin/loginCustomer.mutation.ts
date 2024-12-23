import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LoginCustomerMutationVariables = Types.Exact<{
  input: Types.LoginCustomerInputDto;
}>;


export type LoginCustomerMutation = { __typename?: 'Mutation', loginCustomer: { __typename?: 'LoginResponseDTO', access_token: string, refresh_token: string } };


export const LoginCustomerDocument = gql`
    mutation loginCustomer($input: LoginCustomerInputDTO!) {
  loginCustomer(loginCustomerInput: $input) {
    access_token
    refresh_token
  }
}
    `;
export type LoginCustomerMutationFn = Apollo.MutationFunction<LoginCustomerMutation, LoginCustomerMutationVariables>;

/**
 * __useLoginCustomerMutation__
 *
 * To run a mutation, you first call `useLoginCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginCustomerMutation, { data, loading, error }] = useLoginCustomerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginCustomerMutation(baseOptions?: Apollo.MutationHookOptions<LoginCustomerMutation, LoginCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginCustomerMutation, LoginCustomerMutationVariables>(LoginCustomerDocument, options);
      }
export type LoginCustomerMutationHookResult = ReturnType<typeof useLoginCustomerMutation>;
export type LoginCustomerMutationResult = Apollo.MutationResult<LoginCustomerMutation>;
export type LoginCustomerMutationOptions = Apollo.BaseMutationOptions<LoginCustomerMutation, LoginCustomerMutationVariables>;