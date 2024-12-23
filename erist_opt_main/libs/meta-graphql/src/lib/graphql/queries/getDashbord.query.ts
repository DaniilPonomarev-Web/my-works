import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetDashbordQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetDashbordQuery = { __typename?: 'Query', getDashbord: { __typename?: 'DashboardDTO', countOrders: number, countUsers: number, countProducts: number, summOrders: number, customer: string, salesData: Array<{ __typename?: 'SalesDataDTO', date: string, amount: number }> } };


export const GetDashbordDocument = gql`
    query getDashbord {
  getDashbord {
    countOrders
    countUsers
    countProducts
    summOrders
    customer
    salesData {
      date
      amount
    }
  }
}
    `;

/**
 * __useGetDashbordQuery__
 *
 * To run a query within a React component, call `useGetDashbordQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashbordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashbordQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDashbordQuery(baseOptions?: Apollo.QueryHookOptions<GetDashbordQuery, GetDashbordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDashbordQuery, GetDashbordQueryVariables>(GetDashbordDocument, options);
      }
export function useGetDashbordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDashbordQuery, GetDashbordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDashbordQuery, GetDashbordQueryVariables>(GetDashbordDocument, options);
        }
export type GetDashbordQueryHookResult = ReturnType<typeof useGetDashbordQuery>;
export type GetDashbordLazyQueryHookResult = ReturnType<typeof useGetDashbordLazyQuery>;
export type GetDashbordQueryResult = Apollo.QueryResult<GetDashbordQuery, GetDashbordQueryVariables>;