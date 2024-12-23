import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetChildrenCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetChildrenCategoriesQuery = { __typename?: 'Query', getChildrenCategories: Array<{ __typename?: 'CategoryDTO', id: string, image?: string | null, parent_id?: string | null, sort_order: number, status: boolean }> };


export const GetChildrenCategoriesDocument = gql`
    query getChildrenCategories {
  getChildrenCategories {
    id
    image
    parent_id
    sort_order
    status
  }
}
    `;

/**
 * __useGetChildrenCategoriesQuery__
 *
 * To run a query within a React component, call `useGetChildrenCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChildrenCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChildrenCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChildrenCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetChildrenCategoriesQuery, GetChildrenCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChildrenCategoriesQuery, GetChildrenCategoriesQueryVariables>(GetChildrenCategoriesDocument, options);
      }
export function useGetChildrenCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChildrenCategoriesQuery, GetChildrenCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChildrenCategoriesQuery, GetChildrenCategoriesQueryVariables>(GetChildrenCategoriesDocument, options);
        }
export type GetChildrenCategoriesQueryHookResult = ReturnType<typeof useGetChildrenCategoriesQuery>;
export type GetChildrenCategoriesLazyQueryHookResult = ReturnType<typeof useGetChildrenCategoriesLazyQuery>;
export type GetChildrenCategoriesQueryResult = Apollo.QueryResult<GetChildrenCategoriesQuery, GetChildrenCategoriesQueryVariables>;