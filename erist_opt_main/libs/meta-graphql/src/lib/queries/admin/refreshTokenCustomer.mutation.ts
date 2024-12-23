import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RefreshTokenCustomerMutationVariables = Types.Exact<{
  refreshToken: Types.Scalars['String'];
}>;


export type RefreshTokenCustomerMutation = { __typename?: 'Mutation', refreshTokenCustomer: { __typename?: 'RefreshResponseDTO', access_token: string, refresh_token: string } };


export const RefreshTokenCustomerDocument = gql`
    mutation refreshTokenCustomer($refreshToken: String!) {
  refreshTokenCustomer(refreshToken: $refreshToken) {
    access_token
    refresh_token
  }
}
    `;
export type RefreshTokenCustomerMutationFn = Apollo.MutationFunction<RefreshTokenCustomerMutation, RefreshTokenCustomerMutationVariables>;

/**
 * __useRefreshTokenCustomerMutation__
 *
 * To run a mutation, you first call `useRefreshTokenCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenCustomerMutation, { data, loading, error }] = useRefreshTokenCustomerMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshTokenCustomerMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenCustomerMutation, RefreshTokenCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenCustomerMutation, RefreshTokenCustomerMutationVariables>(RefreshTokenCustomerDocument, options);
      }
export type RefreshTokenCustomerMutationHookResult = ReturnType<typeof useRefreshTokenCustomerMutation>;
export type RefreshTokenCustomerMutationResult = Apollo.MutationResult<RefreshTokenCustomerMutation>;
export type RefreshTokenCustomerMutationOptions = Apollo.BaseMutationOptions<RefreshTokenCustomerMutation, RefreshTokenCustomerMutationVariables>;