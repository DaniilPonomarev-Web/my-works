import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VerifyTokenUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type VerifyTokenUserQuery = { __typename?: 'Query', verifyTokenUser: boolean };


export const VerifyTokenUserDocument = gql`
    query VerifyTokenUser {
  verifyTokenUser
}
    `;

/**
 * __useVerifyTokenUserQuery__
 *
 * To run a query within a React component, call `useVerifyTokenUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyTokenUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyTokenUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useVerifyTokenUserQuery(baseOptions?: Apollo.QueryHookOptions<VerifyTokenUserQuery, VerifyTokenUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyTokenUserQuery, VerifyTokenUserQueryVariables>(VerifyTokenUserDocument, options);
      }
export function useVerifyTokenUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyTokenUserQuery, VerifyTokenUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyTokenUserQuery, VerifyTokenUserQueryVariables>(VerifyTokenUserDocument, options);
        }
export type VerifyTokenUserQueryHookResult = ReturnType<typeof useVerifyTokenUserQuery>;
export type VerifyTokenUserLazyQueryHookResult = ReturnType<typeof useVerifyTokenUserLazyQuery>;
export type VerifyTokenUserQueryResult = Apollo.QueryResult<VerifyTokenUserQuery, VerifyTokenUserQueryVariables>;