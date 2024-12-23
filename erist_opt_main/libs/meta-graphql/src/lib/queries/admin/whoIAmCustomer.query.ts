import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type WhoIAmCustomerQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WhoIAmCustomerQuery = { __typename?: 'Query', whoIAmCustomer: { __typename?: 'CustomerDTO', id: string, role: Types.CustomerRole, login: string, email: string, lastLogin?: any | null } };


export const WhoIAmCustomerDocument = gql`
    query whoIAmCustomer {
  whoIAmCustomer {
    id
    role
    login
    email
    lastLogin
  }
}
    `;

/**
 * __useWhoIAmCustomerQuery__
 *
 * To run a query within a React component, call `useWhoIAmCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoIAmCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoIAmCustomerQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoIAmCustomerQuery(baseOptions?: Apollo.QueryHookOptions<WhoIAmCustomerQuery, WhoIAmCustomerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WhoIAmCustomerQuery, WhoIAmCustomerQueryVariables>(WhoIAmCustomerDocument, options);
      }
export function useWhoIAmCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WhoIAmCustomerQuery, WhoIAmCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WhoIAmCustomerQuery, WhoIAmCustomerQueryVariables>(WhoIAmCustomerDocument, options);
        }
export type WhoIAmCustomerQueryHookResult = ReturnType<typeof useWhoIAmCustomerQuery>;
export type WhoIAmCustomerLazyQueryHookResult = ReturnType<typeof useWhoIAmCustomerLazyQuery>;
export type WhoIAmCustomerQueryResult = Apollo.QueryResult<WhoIAmCustomerQuery, WhoIAmCustomerQueryVariables>;