import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCategoryTreeForUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCategoryTreeForUserQuery = { __typename?: 'Query', getCategoryTreeForUser: Array<{ __typename?: 'CategoryDTO', id: string, image?: string | null, parent_id?: string | null, sort_order: number, status: boolean, onHomePage: boolean, descriptions?: Array<{ __typename?: 'CategoryDescriptionDTO', name: string, description?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null, meta_keyword?: string | null }> | null, children?: Array<{ __typename?: 'CategoryDTO', id: string, image?: string | null, parent_id?: string | null, sort_order: number, status: boolean, descriptions?: Array<{ __typename?: 'CategoryDescriptionDTO', name: string, description?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null, meta_keyword?: string | null }> | null, children?: Array<{ __typename?: 'CategoryDTO', id: string, image?: string | null, parent_id?: string | null, sort_order: number, status: boolean, descriptions?: Array<{ __typename?: 'CategoryDescriptionDTO', name: string, description?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null, meta_keyword?: string | null }> | null }> | null }> | null }> };


export const GetCategoryTreeForUserDocument = gql`
    query getCategoryTreeForUser {
  getCategoryTreeForUser {
    id
    image
    parent_id
    sort_order
    status
    onHomePage
    descriptions {
      name
      description
      meta_title
      meta_h1
      meta_description
      meta_keyword
    }
    children {
      id
      image
      parent_id
      sort_order
      status
      descriptions {
        name
        description
        meta_title
        meta_h1
        meta_description
        meta_keyword
      }
      children {
        id
        image
        parent_id
        sort_order
        status
        descriptions {
          name
          description
          meta_title
          meta_h1
          meta_description
          meta_keyword
        }
      }
    }
  }
}
    `;

/**
 * __useGetCategoryTreeForUserQuery__
 *
 * To run a query within a React component, call `useGetCategoryTreeForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryTreeForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryTreeForUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoryTreeForUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoryTreeForUserQuery, GetCategoryTreeForUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryTreeForUserQuery, GetCategoryTreeForUserQueryVariables>(GetCategoryTreeForUserDocument, options);
      }
export function useGetCategoryTreeForUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryTreeForUserQuery, GetCategoryTreeForUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryTreeForUserQuery, GetCategoryTreeForUserQueryVariables>(GetCategoryTreeForUserDocument, options);
        }
export type GetCategoryTreeForUserQueryHookResult = ReturnType<typeof useGetCategoryTreeForUserQuery>;
export type GetCategoryTreeForUserLazyQueryHookResult = ReturnType<typeof useGetCategoryTreeForUserLazyQuery>;
export type GetCategoryTreeForUserQueryResult = Apollo.QueryResult<GetCategoryTreeForUserQuery, GetCategoryTreeForUserQueryVariables>;