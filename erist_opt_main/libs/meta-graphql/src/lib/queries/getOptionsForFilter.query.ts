import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOptionsForFilterQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetOptionsForFilterQuery = { __typename?: 'Query', getOptionsForFilter: Array<{ __typename?: 'OptionFilterDTO', id: string, optionName: string, values: Array<string> }> };


export const GetOptionsForFilterDocument = gql`
    query getOptionsForFilter {
  getOptionsForFilter {
    id
    optionName
    values
  }
}
    `;

/**
 * __useGetOptionsForFilterQuery__
 *
 * To run a query within a React component, call `useGetOptionsForFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOptionsForFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOptionsForFilterQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOptionsForFilterQuery(baseOptions?: Apollo.QueryHookOptions<GetOptionsForFilterQuery, GetOptionsForFilterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOptionsForFilterQuery, GetOptionsForFilterQueryVariables>(GetOptionsForFilterDocument, options);
      }
export function useGetOptionsForFilterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOptionsForFilterQuery, GetOptionsForFilterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOptionsForFilterQuery, GetOptionsForFilterQueryVariables>(GetOptionsForFilterDocument, options);
        }
export type GetOptionsForFilterQueryHookResult = ReturnType<typeof useGetOptionsForFilterQuery>;
export type GetOptionsForFilterLazyQueryHookResult = ReturnType<typeof useGetOptionsForFilterLazyQuery>;
export type GetOptionsForFilterQueryResult = Apollo.QueryResult<GetOptionsForFilterQuery, GetOptionsForFilterQueryVariables>;