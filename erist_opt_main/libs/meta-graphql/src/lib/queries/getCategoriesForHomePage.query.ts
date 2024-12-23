import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCategoriesForHomePageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCategoriesForHomePageQuery = { __typename?: 'Query', getCategoriesForHomePage: Array<{ __typename?: 'CategoryDTO', id: string, image?: string | null, descriptions?: Array<{ __typename?: 'CategoryDescriptionDTO', name: string }> | null }> };


export const GetCategoriesForHomePageDocument = gql`
    query getCategoriesForHomePage {
  getCategoriesForHomePage {
    id
    image
    descriptions {
      name
    }
  }
}
    `;

/**
 * __useGetCategoriesForHomePageQuery__
 *
 * To run a query within a React component, call `useGetCategoriesForHomePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesForHomePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesForHomePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesForHomePageQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesForHomePageQuery, GetCategoriesForHomePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesForHomePageQuery, GetCategoriesForHomePageQueryVariables>(GetCategoriesForHomePageDocument, options);
      }
export function useGetCategoriesForHomePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesForHomePageQuery, GetCategoriesForHomePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesForHomePageQuery, GetCategoriesForHomePageQueryVariables>(GetCategoriesForHomePageDocument, options);
        }
export type GetCategoriesForHomePageQueryHookResult = ReturnType<typeof useGetCategoriesForHomePageQuery>;
export type GetCategoriesForHomePageLazyQueryHookResult = ReturnType<typeof useGetCategoriesForHomePageLazyQuery>;
export type GetCategoriesForHomePageQueryResult = Apollo.QueryResult<GetCategoriesForHomePageQuery, GetCategoriesForHomePageQueryVariables>;