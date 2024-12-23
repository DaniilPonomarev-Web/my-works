import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCategoryByIdForUserQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetCategoryByIdForUserQuery = { __typename?: 'Query', getCategoryByIdForUser?: { __typename?: 'CategoryDTO', id: string, image?: string | null, parent_id?: string | null, sort_order: number, status: boolean, onHomePage: boolean, descriptions?: Array<{ __typename?: 'CategoryDescriptionDTO', id: string, name: string, description?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null, meta_keyword?: string | null }> | null, children?: Array<{ __typename?: 'CategoryDTO', id: string, image?: string | null, parent_id?: string | null, sort_order: number, status: boolean, descriptions?: Array<{ __typename?: 'CategoryDescriptionDTO', id: string, name: string, description?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null, meta_keyword?: string | null }> | null, children?: Array<{ __typename?: 'CategoryDTO', id: string, image?: string | null, parent_id?: string | null, sort_order: number, status: boolean, descriptions?: Array<{ __typename?: 'CategoryDescriptionDTO', id: string, name: string, description?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null, meta_keyword?: string | null }> | null }> | null }> | null } | null };


export const GetCategoryByIdForUserDocument = gql`
    query getCategoryByIdForUser($id: String!) {
  getCategoryByIdForUser(id: $id) {
    id
    image
    parent_id
    sort_order
    status
    onHomePage
    descriptions {
      id
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
        id
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
          id
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
 * __useGetCategoryByIdForUserQuery__
 *
 * To run a query within a React component, call `useGetCategoryByIdForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryByIdForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryByIdForUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCategoryByIdForUserQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryByIdForUserQuery, GetCategoryByIdForUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryByIdForUserQuery, GetCategoryByIdForUserQueryVariables>(GetCategoryByIdForUserDocument, options);
      }
export function useGetCategoryByIdForUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryByIdForUserQuery, GetCategoryByIdForUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryByIdForUserQuery, GetCategoryByIdForUserQueryVariables>(GetCategoryByIdForUserDocument, options);
        }
export type GetCategoryByIdForUserQueryHookResult = ReturnType<typeof useGetCategoryByIdForUserQuery>;
export type GetCategoryByIdForUserLazyQueryHookResult = ReturnType<typeof useGetCategoryByIdForUserLazyQuery>;
export type GetCategoryByIdForUserQueryResult = Apollo.QueryResult<GetCategoryByIdForUserQuery, GetCategoryByIdForUserQueryVariables>;