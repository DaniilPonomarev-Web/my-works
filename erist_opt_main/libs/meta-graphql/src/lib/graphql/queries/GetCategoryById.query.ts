import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCategoryByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetCategoryByIdQuery = { __typename?: 'Query', getCategoryById?: { __typename?: 'CategoryDTO', id: string, image?: string | null, parent_id?: string | null, sort_order: number, status: boolean, descriptions?: Array<{ __typename?: 'CategoryDescriptionDTO', id: string, name: string, description?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null, meta_keyword?: string | null }> | null, children?: Array<{ __typename?: 'CategoryDTO', id: string, image?: string | null, parent_id?: string | null, sort_order: number, status: boolean, descriptions?: Array<{ __typename?: 'CategoryDescriptionDTO', id: string, name: string, description?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null, meta_keyword?: string | null }> | null, children?: Array<{ __typename?: 'CategoryDTO', id: string, image?: string | null, parent_id?: string | null, sort_order: number, status: boolean, descriptions?: Array<{ __typename?: 'CategoryDescriptionDTO', id: string, name: string, description?: string | null, meta_title?: string | null, meta_h1?: string | null, meta_description?: string | null, meta_keyword?: string | null }> | null }> | null }> | null } | null };


export const GetCategoryByIdDocument = gql`
    query GetCategoryById($id: String!) {
  getCategoryById(id: $id) {
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
 * __useGetCategoryByIdQuery__
 *
 * To run a query within a React component, call `useGetCategoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCategoryByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
      }
export function useGetCategoryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
        }
export type GetCategoryByIdQueryHookResult = ReturnType<typeof useGetCategoryByIdQuery>;
export type GetCategoryByIdLazyQueryHookResult = ReturnType<typeof useGetCategoryByIdLazyQuery>;
export type GetCategoryByIdQueryResult = Apollo.QueryResult<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>;