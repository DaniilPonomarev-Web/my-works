import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResetPasswordQueryVariables = Types.Exact<{
  resetPasswordInput: Types.ResetPasswordInputDto;
}>;


export type ResetPasswordQuery = { __typename?: 'Query', resetPassword: boolean };


export const ResetPasswordDocument = gql`
    query resetPassword($resetPasswordInput: ResetPasswordInputDTO!) {
  resetPassword(resetPasswordInput: $resetPasswordInput)
}
    `;

/**
 * __useResetPasswordQuery__
 *
 * To run a query within a React component, call `useResetPasswordQuery` and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResetPasswordQuery({
 *   variables: {
 *      resetPasswordInput: // value for 'resetPasswordInput'
 *   },
 * });
 */
export function useResetPasswordQuery(baseOptions: Apollo.QueryHookOptions<ResetPasswordQuery, ResetPasswordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ResetPasswordQuery, ResetPasswordQueryVariables>(ResetPasswordDocument, options);
      }
export function useResetPasswordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ResetPasswordQuery, ResetPasswordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ResetPasswordQuery, ResetPasswordQueryVariables>(ResetPasswordDocument, options);
        }
export type ResetPasswordQueryHookResult = ReturnType<typeof useResetPasswordQuery>;
export type ResetPasswordLazyQueryHookResult = ReturnType<typeof useResetPasswordLazyQuery>;
export type ResetPasswordQueryResult = Apollo.QueryResult<ResetPasswordQuery, ResetPasswordQueryVariables>;