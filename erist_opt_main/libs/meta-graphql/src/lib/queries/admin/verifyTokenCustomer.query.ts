import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VerifyTokenCustomerQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type VerifyTokenCustomerQuery = { __typename?: 'Query', verifyTokenCustomer: boolean };


export const VerifyTokenCustomerDocument = gql`
    query verifyTokenCustomer {
  verifyTokenCustomer
}
    `;

/**
 * __useVerifyTokenCustomerQuery__
 *
 * To run a query within a React component, call `useVerifyTokenCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyTokenCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyTokenCustomerQuery({
 *   variables: {
 *   },
 * });
 */
export function useVerifyTokenCustomerQuery(baseOptions?: Apollo.QueryHookOptions<VerifyTokenCustomerQuery, VerifyTokenCustomerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyTokenCustomerQuery, VerifyTokenCustomerQueryVariables>(VerifyTokenCustomerDocument, options);
      }
export function useVerifyTokenCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyTokenCustomerQuery, VerifyTokenCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyTokenCustomerQuery, VerifyTokenCustomerQueryVariables>(VerifyTokenCustomerDocument, options);
        }
export type VerifyTokenCustomerQueryHookResult = ReturnType<typeof useVerifyTokenCustomerQuery>;
export type VerifyTokenCustomerLazyQueryHookResult = ReturnType<typeof useVerifyTokenCustomerLazyQuery>;
export type VerifyTokenCustomerQueryResult = Apollo.QueryResult<VerifyTokenCustomerQuery, VerifyTokenCustomerQueryVariables>;