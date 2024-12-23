import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetParentCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetParentCategoriesQuery = { __typename?: 'Query', getParentCategories: Array<{ __typename?: 'CategoryDTO', id: string, image?: string | null, parent_id?: string | null, sort_order: number, status: boolean }> };


export const GetParentCategoriesDocument = gql`
    query GetParentCategories {
  getParentCategories {
    id
    image
    parent_id
    sort_order
    status
  }
}
    `;

/**
 * __useGetParentCategoriesQuery__
 *
 * To run a query within a React component, call `useGetParentCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetParentCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetParentCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetParentCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetParentCategoriesQuery, GetParentCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetParentCategoriesQuery, GetParentCategoriesQueryVariables>(GetParentCategoriesDocument, options);
      }
export function useGetParentCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetParentCategoriesQuery, GetParentCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetParentCategoriesQuery, GetParentCategoriesQueryVariables>(GetParentCategoriesDocument, options);
        }
export type GetParentCategoriesQueryHookResult = ReturnType<typeof useGetParentCategoriesQuery>;
export type GetParentCategoriesLazyQueryHookResult = ReturnType<typeof useGetParentCategoriesLazyQuery>;
export type GetParentCategoriesQueryResult = Apollo.QueryResult<GetParentCategoriesQuery, GetParentCategoriesQueryVariables>;